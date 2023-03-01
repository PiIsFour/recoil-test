import { Unsubscribe } from "./observable";

export class SubscriptionService {
	private map = new Map<string, Unsubscribe[]>()

	addSubscriptions(id: string, subscriptions: Unsubscribe[]): void {
		const existing = this.map.get(id) ?? []
		this.map.set(id, [...existing, ...subscriptions])
	}

	clearSubscriptions(id: string): void {
		const subs = this.map.get(id) ?? []
		subs.forEach(s => s())
		this.map.delete(id)
	}
}