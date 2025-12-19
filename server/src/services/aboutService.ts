import { Request, Response } from "express";
import { BaseService } from "../core/services/baseService.ts";
import { ThingService } from "./thingService.ts";

const secrets = [
	"Shhh super secret!!!",
	"Ahhh now thats a secret!!!",
	"Ooooooh dont tell anyone!!!",
	"This is a mystic secret!!!",
	"Wowza balowza secret!!!",
	"I know a secret!!!",
	"Shhhh dont tell anyone!!!",
];

export class AboutService extends BaseService {
	protected registerRoutes(): void {
		this.app.get("/about/error", (req: Request, res: Response) => {
			res.status(500).json({ error: "Error" });
		});

		this.app.get("/about/secret", async (req: Request, res: Response) => {
			const thing = await this.services.get(ThingService).getRandomThing();
			console.log("thing", thing);
			res.status(200).send(secrets[Math.floor(Math.random() * secrets.length)] + " " + thing.name);
		});
	}
}
