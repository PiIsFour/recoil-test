import { PageCodeBehind } from "./mockCodeBehind"

export class CodeBehindService {
	public page?: Record<string, unknown>
	loadPage(): void {
		this.page = new PageCodeBehind() as any
	}
	hasProp(name: string): boolean {
		if(!this.page)
			return false

		return name in this.page
	}
	getProp(name: string): unknown {
		if(!this.page)
			return undefined

		return this.page[name]
	}
}