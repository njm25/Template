import fs from "fs";
import path from "path";
import { Express } from "express";
import { BaseService } from "./baseService.ts";
import { ServiceContainer } from "./serviceContainer.ts";
import { pathToFileURL } from "url";

type ServiceConstructor = new (app: Express, services: ServiceContainer) => BaseService;

export async function registerServices(app: Express): Promise<void> {
	const servicesDir = path.join(import.meta.dirname, "../../services");

	// Phase 1: Discover all service classes
	const serviceClasses: ServiceConstructor[] = [];
	const files = fs
		.readdirSync(servicesDir)
		.filter(f => f.endsWith("Service.js") || f.endsWith("Service.ts"));

	for (const file of files) {
		const full = path.join(servicesDir, file);
		const mod = await import(pathToFileURL(full).href);

		for (const exported of Object.values(mod)) {
			if (typeof exported === "function" && exported.prototype instanceof BaseService) {
				serviceClasses.push(exported as ServiceConstructor);
			}
		}
	}

	// Phase 2: Create container and instantiate services
	const container = new ServiceContainer();
	
	for (const ServiceClass of serviceClasses) {
		if (container.has(ServiceClass)) {
			continue; // Already instantiated
		}
		
		container.markInstantiating(ServiceClass);
		try {
			const instance = new ServiceClass(app, container);
			container.register(ServiceClass, instance);
		} finally {
			container.markInstantiated(ServiceClass);
		}
	}
}