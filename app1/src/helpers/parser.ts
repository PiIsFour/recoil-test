import { Flavor } from "./brand";

export type CodeExpression = Flavor<string, 'CodeExpression'>

export const isCodeExpression = (definition: unknown): definition is CodeExpression => {
	if(typeof definition !== 'string')
		return false
	try {
		parse(definition)
		return true
	} catch(e) {
		return false
	}
}

type Parser = (definition: CodeExpression) => {
	evaluate: (context: unknown) => unknown;
	dependencies: () => string[];
};

const expressionRegex = /^(.*)\{\{(.*)\}\}(.*)$/;

export const parse: Parser = definition => {
	const match = expressionRegex.exec(definition);
	if (!match || !match[2])
		throw new Error('not a code expression');

	const [, before = '', inside, after = ''] = match;
	const expressionText = `${ before }this.value${ after }`;
	const insert = parsePipe(inside.trim());

	// eslint-disable-next-line
	const executeExpression = new Function(`
		var result = ${ expressionText };
		return result;
	`);

	return {
		evaluate: context => {
			return executeExpression.call({
				value: insert.evaluate(context),
			}) as unknown;
		},
		dependencies: insert.dependencies,
	};
};

const getProp = <Key extends string>(object: unknown, key: Key): unknown => {
	if (!object || typeof object !== 'object')
		throw new Error(`could not find [${ key }]`);
	if (!(key in object))
		throw new Error(`could not find [${ key }]`);

	return (object as Record<Key, unknown>)[key];
};

export const parseAccessor: Parser = definition => {
	const path = definition.split('.');

	return {
		evaluate: context => path.reduce(getProp, context),
		dependencies: () => [definition],
	};
};

const functionRegex = /^(.+)\((.*)\)$/;

export const parseFunction: Parser = definition => {
	const match = functionRegex.exec(definition);
	if (match && match[1]) {
		const [, baseDefinition, args] = match;
		const baseAccessor = parseAccessor(baseDefinition);
		const argAccessors = (args?.split(',') ?? [])
			.map(s => s.trim())
			.filter(x => x !== '')
			.map(parseArg);

		return {
			evaluate: context => {
				const fn = baseAccessor.evaluate(context);
				if (typeof fn !== 'function')
					throw new Error(`[${ baseDefinition }] is not a function`);

				const args = argAccessors.map(a => a.evaluate(context));
				return (fn as (...args: unknown[]) => unknown)(...args);
			},
			dependencies: () => [
				...baseAccessor.dependencies(),
				...argAccessors.flatMap(arg => arg.dependencies()),
			],
		};
	}
	const accessor = parseAccessor(definition);
	return {
		evaluate: context => accessor.evaluate(context),
		dependencies: accessor.dependencies,
	};
};

const parseArg: Parser = definition => {
	try {
		const primitiveValue = JSON.parse(definition) as unknown;
		return {
			evaluate: () => primitiveValue,
			dependencies: () => [],
		};
	} catch (e) {
		return parseFunction(definition);
	}
};

const pipeValue = (value: unknown, fn: unknown) => {
	if (typeof fn !== 'function')
		throw new Error('pipe target is not a function');

	return (fn as (x: unknown) => unknown)(value);
};

export const parsePipe: Parser = definition => {
	const accessors = definition
		.split('|')
		.map(s => s.trim())
		.map(parseFunction);

	return {
		evaluate: context => accessors
			.map(accessor => accessor.evaluate(context))
			.reduce(pipeValue),
		dependencies: () => accessors.flatMap(a => a.dependencies()),
	};
};
