export type Brand<BaseType, Tag extends symbol | string>
	// eslint-disable-next-line @typescript-eslint/naming-convention
	= BaseType & { __tag: Tag };

export type Flavor<BaseType, Tag extends symbol | string>
	// eslint-disable-next-line @typescript-eslint/naming-convention
	= BaseType & { __tag?: Tag };
