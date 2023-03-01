import { CodeExpression } from "../helpers/parser"

export type IndependentValue<T> = {
	type: 'IndependentValue'
	value: T
}

export const independentValue = <T>(value: T): IndependentValue<T> => ({
	type: 'IndependentValue',
	value,
})

export type WithinStateDependency = {
	type: 'WithinStateDependency'
	expression: CodeExpression
}

export const withinStateDependency = (expression: CodeExpression): WithinStateDependency => ({
	type: "WithinStateDependency",
	expression,
})

export type ExternalDependency<T> = {
	type: 'ExternalDependency'
	value: T
	expression: CodeExpression
}

export const externalDependency = <T>(value: T, expression: CodeExpression): ExternalDependency<T> => ({
	type: "ExternalDependency",
	value,
	expression,
})

export type DependantValue<T> = IndependentValue<T> | WithinStateDependency | ExternalDependency<T>

export const isExternalDependency = <T>(value: DependantValue<T>): value is ExternalDependency<T> =>
	value.type === 'ExternalDependency'

export const hasValue = <T>(dep: DependantValue<T>): dep is IndependentValue<T> | ExternalDependency<T> =>
	'value' in dep
