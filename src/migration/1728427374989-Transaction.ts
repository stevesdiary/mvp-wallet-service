import { MigrationInterface, QueryRunner } from "typeorm";

export class Transaction1728427374989 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`transaction\` (
                \`id\` VARCHAR(255) NOT NULL,
                \`amount\` DECIMAL(10, 2) NOT NULL,
                \`transactionType\` VARCHAR(255) NOT NULL,
                \`senderAccountNumber\` INT NOT NULL,
                \`senderName\` VARCHAR(255) NOT NULL,
                \`recipientName\` VARCHAR(255) NOT NULL,
                \`recipientAccountNumber\` INT NOT NULL,
                \`date\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
				        \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`deleted_at\` TIMESTAMP NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`transaction\``);
  }
}
