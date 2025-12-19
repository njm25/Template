import { BaseService } from "./baseService.ts";

type ServiceConstructor<T extends BaseService = BaseService> = new (app: any, services: ServiceContainer) => T;

export class ServiceContainer {
	private services = new Map<ServiceConstructor, BaseService>();
	private instantiating = new Set<ServiceConstructor>();

	register<T extends BaseService>(ServiceClass: ServiceConstructor<T>, instance: T): void {
		this.services.set(ServiceClass, instance);
	}

	get<T extends BaseService>(ServiceClass: ServiceConstructor<T>): T {
		const service = this.services.get(ServiceClass);
		if (!service) {
			throw new Error(`Service ${ServiceClass.name} not found in container`);
		}
		return service as T;
	}

	isInstantiating(ServiceClass: ServiceConstructor): boolean {
		return this.instantiating.has(ServiceClass);
	}

	markInstantiating(ServiceClass: ServiceConstructor): void {
		if (this.instantiating.has(ServiceClass)) {
			throw new Error(`Circular dependency detected: ${ServiceClass.name} is already being instantiated`);
		}
		this.instantiating.add(ServiceClass);
	}

	markInstantiated(ServiceClass: ServiceConstructor): void {
		this.instantiating.delete(ServiceClass);
	}

	has(ServiceClass: ServiceConstructor): boolean {
		return this.services.has(ServiceClass);
	}
}