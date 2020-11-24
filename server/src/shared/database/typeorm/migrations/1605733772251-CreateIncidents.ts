import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateIncidents1605733772251 implements MigrationInterface {
  private incidentsTable = new Table({
    name: 'incidents',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'title',
        type: 'varchar',
      },
      {
        name: 'description',
        type: 'varchar',
      },
      {
        name: 'value',
        type: 'varchar',
      },
      {
        name: 'ong_id',
        type: 'integer',
      },
    ],
  });

  private foreignKey = new TableForeignKey({
    columnNames: ['ong_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'ongs',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.incidentsTable);
    await queryRunner.createForeignKey('incidents', this.foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('incidents', this.foreignKey);
    await queryRunner.dropTable(this.incidentsTable);
  }
}
