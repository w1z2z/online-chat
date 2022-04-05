import {MigrationInterface, QueryRunner} from "typeorm";

export class newMigrate1646229451771 implements MigrationInterface {
    name = 'newMigrate1646229451771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "color" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" character varying NOT NULL, "roomId" character varying NOT NULL, "currentUserId" character varying NOT NULL, "currentUserName" character varying NOT NULL, "recipientUserId" character varying NOT NULL, "recipientUserName" character varying NOT NULL, "message" character varying NOT NULL, "date" TIMESTAMP NOT NULL, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rooms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usersId" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "rooms"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
