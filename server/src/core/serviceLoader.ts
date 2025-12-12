import fs from "fs";
import path from "path";
import { Express } from "express";
import { BaseService } from "./baseService.ts";
import { pathToFileURL } from "url";

export async function registerServices(app: Express): Promise<void> {
	const servicesDir = path.join(import.meta.dirname, "../services");

	const files = fs
		.readdirSync(servicesDir)
		.filter(f => f.endsWith("Service.js") || f.endsWith("Service.ts"));

	for (const file of files) {
		const full = path.join(servicesDir, file);

		const mod = await import(pathToFileURL(full).href);

		for (const exported of Object.values(mod)) {
			if (typeof exported === "function" && exported.prototype instanceof BaseService) {
				new (exported as any)(app) as BaseService;
			}
		}
	}
}
