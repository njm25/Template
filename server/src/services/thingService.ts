import { Thing } from "../entities/Thing.ts";
import { BaseService } from "../core/baseService.ts";
import { AppDataSource } from "../../data-source.ts";
import { createQueryBuilder } from "typeorm";

export class ThingService extends BaseService {

    protected registerRoutes(): void {
        this.app.get("/thing/random", async (req, res) => {
            const thing = await AppDataSource.getRepository(Thing)
            .createQueryBuilder("thing")
            .orderBy("RAND()")
            .limit(1)
            .getOne();
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