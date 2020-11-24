import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddSomeInfoToOng1605785758323 implements MigrationInterface {
  private whatsappColumn = new TableColumn({
    name: 'whatsapp',
    type: 'varchar',
  });
  private cityColumn = new TableColumn({
    name: 'city',
    type: 'varchar',
  });

  private stateColumn = new TableColumn({
    name: 'uf',
    type: 'varchar',
    length: '3',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('ongs', [
      this.whatsappColumn,
      this.stateColumn,
      this.cityColumn,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('ongs', [
      this.cityColumn,
      this.stateColumn,
      this.whatsappColumn,
    ]);
  }
}
