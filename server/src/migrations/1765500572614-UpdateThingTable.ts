import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateThingTable1765500572614 implements MigrationInterface {
    name = 'UpdateThingTable1765500572614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`things\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`things\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`things\` ADD \`name\` varchar(25) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`things\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`things\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`things\` DROP COLUMN \`description\``);
    }

}
