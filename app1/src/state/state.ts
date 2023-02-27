import { FieldDefinition, FieldDefinitionName, FieldState } from "./entities/field";
import { DataContextState } from "./entities/dataContext";

export type PageDefinition = {
	fields: {
		[name: FieldDefinitionName]: FieldDefinition | undefined
	},
	content: {
		fields: FieldDefinitionName[],
		data: unknown
	}
}

export type State = {
	fields: FieldState[];
	dataContexts: DataContextState[];
	pageDefinition: PageDefinition;
};
