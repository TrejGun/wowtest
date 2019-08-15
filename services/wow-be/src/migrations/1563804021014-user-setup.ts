import {MigrationInterface, QueryRunner} from "typeorm";

export class UserSetup1563804021014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const currentDateTime = new Date().toISOString();
    const passwordHash = "d95407c19ab4161df88bca23ca1cbce3ec58d582dbd07f648dddccaebab75eb1"; // qwerty

    await queryRunner.query("TRUNCATE TABLE wow.user RESTART IDENTITY CASCADE;");

    await queryRunner.query(`INSERT INTO wow.user
      (email, status, role, created_at, updated_at, "password")
      VALUES
      ('trejgun@gmail.com', 'active', 'marketer', '${currentDateTime}', '${currentDateTime}', '${passwordHash}');`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("TRUNCATE TABLE wow.user RESTART IDENTITY CASCADE;");
  }
}
