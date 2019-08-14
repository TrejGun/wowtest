import {MigrationInterface, QueryRunner} from "typeorm";

export class AddWowSchema1561991006215 implements MigrationInterface {
  public SCHEMA_WOW = "wow";

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropSchema(this.SCHEMA_WOW);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createSchema(this.SCHEMA_WOW, true);
  }
}
