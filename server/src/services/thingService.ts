import { Thing } from "../entities/Thing.ts";
import { BaseService } from "../core/services/baseService.ts";
import { AppDataSource } from "../../data-source.ts";

export class ThingService extends BaseService {

    protected registerRoutes(): void {
        this.app.get("/thing/random", async (req, res) => {
            const thing = await this.getRandomThing();
            res.json(thing);
        });
        this.app.get("/thing/recent20", async (req, res) => {
            const things = await AppDataSource.getRepository(Thing).find({ order: { createdAt: "DESC" }, take: 20 } );
            res.json(things);
        });
        this.app.post("/thing/create", async (req, res) => {
            const { name, description } = req.body;
            if (!name || !description) {
                return res.status(400).json({ error: "Name and description are required" });
            }
            if (name.length > 25) {
                return res.status(400).json({ error: "Name must be less than 25 characters" });
            }
            if (description.length > 255) {
                return res.status(400).json({ error: "Description must be less than 255 characters" });
            }
            if (name.length < 1) {
                return res.status(400).json({ error: "Name must be at least 1 character" });
            }
            if (description.length < 1) {
                return res.status(400).json({ error: "Description must be at least 1 character" });
            }
            if (name.trim() === "") {
                return res.status(400).json({ error: "Name must be at least 1 character" });
            }
            if (description.trim() === "") {
                return res.status(400).json({ error: "Description must be at least 1 character" });
            }
            
            const thing = await AppDataSource.getRepository(Thing).create({ name, description });
            await AppDataSource.getRepository(Thing).save(thing);
            res.json(thing);
        });
    }

    public async getRandomThing(): Promise<Thing> {
        const thing = await AppDataSource.getRepository(Thing)
        .createQueryBuilder("thing")
        .orderBy("RAND()")
        .limit(1)
        .getOne();
        if (!thing) {
            throw new Error("No thing found");
        }
        return thing;
    }

}