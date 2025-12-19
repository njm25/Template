import { Express } from "express";
import { ServiceContainer } from "./serviceContainer.ts";

export abstract class BaseService {
	protected app: Express;
	protected basePath: string;
	protected services: ServiceContainer;

	constructor(app: Express, services: ServiceContainer) {
		this.app = app;
		this.services = services;
		this.registerRoutes();
	}

	protected abstract registerRoutes(): void;
}