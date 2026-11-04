
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitialSchema1793768333552 implements MigrationInterface {
    name = 'InitialSchema1793768333552';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'admin',
                        type: 'boolean',
                        default: true,
                    },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: 'report',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'approved',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'price',
                        type: 'double precision',
                    },
                    {
                        name: 'make',
                        type: 'varchar',
                    },
                    {
                        name: 'model',
                        type: 'varchar',
                    },
                    {
                        name: 'year',
                        type: 'integer',
                    },
                    {
                        name: 'lng',
                        type: 'double precision',
                    },
                    {
                        name: 'lat',
                        type: 'double precision',
                    },
                    {
                        name: 'mileage',
                        type: 'integer',
                    },
                    {
                        name: 'userId',
                        type: 'integer',
                        isNullable: true,
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FK_report_user',
                        columnNames: ['userId'],
                        referencedTableName: 'user',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'NO ACTION',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('report');
        await queryRunner.dropTable('user');
    }
}
