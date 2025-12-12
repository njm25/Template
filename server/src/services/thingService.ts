import { Thing } from "../entities/Thing.ts";
import { BaseService } from "../core/baseService.ts";
import { AppDataSource } from "../../data-source.ts";

export class ThingService extends BaseService {

    protected registerRoutes(): void {
        this.app.get("/thing/random", async (req, res) => {
            const maxId = await AppDataSource.getRepository(Thing).count();
            const thing = await AppDataSource.getRepository(Thing).findOne({ where: { id: Math.floor(Math.random() * maxId) + 1 } });
            res.json(thing);
        });
        this.app.get("/thing/recent20", async (req, res) => {
            const things = await AppDataSource.getRepository(Thing).find({ order: { createdAt: "DESC" }, take: 20 } );
            res.json(things);
        });
        this.app.post("/thing/create", async (req, res) => {
            const { name, description } = req.body;
            const thing = await AppDataSource.getRepository(Thing).create({ name, description });
            await AppDataSource.getRepository(Thing).save(thing);
            res.json(thing);
        });
    }

}