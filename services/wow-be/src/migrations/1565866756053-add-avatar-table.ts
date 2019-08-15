import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AddUserTable1565866756053 implements MigrationInterface {
  public tableName = "wow.avatar";

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.tableName);
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    const table = new Table({
      name: this.tableName,
      columns: [
        {
          name: "id",
          type: "serial",
          isPrimary: true,
        },

        {
          name: "user_id",
          type: "int",
        },
        {
          name: "url",
          type: "varchar",
        },
        {
          name: "description",
          type: "varchar",
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
      foreignKeys: [
        {
          columnNames: ["user_id"],
          referencedColumnNames: ["id"],
          referencedTableName: "wow.user",
          onDelete: "CASCADE",
        },
      ],
    });

    await queryRunner.createTable(table, true);
  }
}
