import { MigrationInterface, QueryRunner } from "typeorm";

export class User1728426734237 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`user\` (
                \`id\` VARCHAR(255) NOT NULL,
                \`firstName\` VARCHAR(255) NOT NULL,
                \`lastName\` VARCHAR(255) NOT NULL,
                \`accountNumber\` INT NOT NULL,
                \`userType\` VARCHAR(255) NOT NULL,
                \`email\` VARCHAR(255) NOT NULL,
                \`password\` VARCHAR(255) NOT NULL,
                \`balance\` INT NOT NULL,
                \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`deleted_at\` TIMESTAMP NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}