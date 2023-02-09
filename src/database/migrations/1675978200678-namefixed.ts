import { MigrationInterface, QueryRunner } from "typeorm";

export class namefixed1675978200678 implements MigrationInterface {
    name = 'namefixed1675978200678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" RENAME COLUMN "lastName" TO "last_name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" RENAME COLUMN "last_name" TO "lastName"`);
    }

}
