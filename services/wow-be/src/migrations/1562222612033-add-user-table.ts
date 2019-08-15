import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AddUserTable1562222612033 implements MigrationInterface {
  public tableName = "wow.user";

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.tableName);
    await queryRunner.query(`DROP TYPE wow.user_status_enum;`);
    await queryRunner.query(`DROP TYPE wow.user_role_enum;`);
    await queryRunner.query(`DROP TYPE wow.user_gender_enum;`);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TYPE wow.user_status_enum AS ENUM ('active', 'inactive');`);
    await queryRunner.query(`CREATE TYPE wow.user_role_enum AS ENUM ('influencer', 'marketer', 'watcher');`);
    await queryRunner.query(`CREATE TYPE wow.user_gender_enum AS ENUM ('male', 'female');`);

    const table = new Table({
      name: this.tableName,
      columns: [
        // common fields
        {
          name: "id",
          type: "serial",
          isPrimary: true,
        },
        {
          name: "email",
          type: "varchar",
        },
        {
          name: "password",
          type: "varchar",
        },
        {
          name: "first_name",
          type: "varchar",
        },
        {
          name: "last_name",
          type: "varchar",
        },

        // influencer specific fields
        {
          name: "birthday",
          type: "date",
        },
        {
          name: "gender",
          type: "wow.user_gender_enum",
        },

        // marketer specific fields
        {
          name: "description",
          type: "varchar",
        },
        {
          name: "phone",
          type: "varchar",
        },

        // system fields
        {
          name: "status",
          type: "wow.user_status_enum",
        },
        {
          name: "role",
          type: "wow.user_role_enum",
        },
        {
          name: "created_at",
          type: "timestamptz",
        },
        {
          name: "updated_at",
          type: "timestamptz",
        },
      ],
    });

    await queryRunner.createTable(table, true);
  }
}
