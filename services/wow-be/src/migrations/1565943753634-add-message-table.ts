import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AddUserTable1565943753634 implements MigrationInterface {
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
          name: "sender_id",
          type: "int",
        },
        {
          name: "recipient_id",
          type: "int",
        },
        {
          name: "text",
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
          columnNames: ["sender_id"],
          referencedColumnNames: ["id"],
          referencedTableName: "wow.user",
          onDelete: "CASCADE",
        },
        {
          columnNames: ["recipient_id"],
          referencedColumnNames: ["id"],
          referencedTableName: "wow.user",
          onDelete: "CASCADE",
        },
      ],
      indices: [
        {
          name: "message_sender_recipient_index",
          columnNames: ["sender_id", "recipient_id"],
        },
      ],
    });

    await queryRunner.createTable(table, true);
  }
}
