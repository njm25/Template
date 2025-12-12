import { Request, Response } from "express";
import { BaseService } from "../core/baseService.ts";

export class AboutService extends BaseService {
	protected registerRoutes(): void {
		this.app.get("/about/error", (req: Request, res: Response) => {
			res.status(500).json({ error: "Error" });
		});

		this.app.get("/about/secret", (req: Request, res: Response) => {
			res.status(200).send("This is a secret!!!!");
		});
	}
}
