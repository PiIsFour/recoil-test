import { FieldDefinition, FieldDefinitionName, FieldState } from "./entities/field";
import { DataContextState } from "./entities/dataContext";

export type PageDefinition = {
	fields: {
		[name: FieldDefinitionName]: FieldDefinition | undefined
	}
}

export type State = {
	fields: FieldState[];
	dataContexts: DataContextState<unknown>[];
	pageDefinition: PageDefinition;
};
