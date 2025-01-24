-- CreateTable
CREATE TABLE `clientCanal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NULL,
    `numAbonne` BIGINT NULL,
    `finAbonn` DATETIME(3) NOT NULL,

    UNIQUE INDEX `clientCanal_telephone_key`(`telephone`),
    UNIQUE INDEX `clientCanal_numAbonne_key`(`numAbonne`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `commissionDuMois` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `mom_service` ENUM('CANAL_PLUS', 'MALIVISION', 'WAVE', 'ORANGE_MONEY', 'MOBICASH', 'SAMA_MONEY', 'CREDIT_ORANGE', 'CREDIT_MALITEL', 'CREDIT_TELECEL', 'W_MG_RIA') NOT NULL DEFAULT 'ORANGE_MONEY',
    `debit` INTEGER NOT NULL,
    `montant` INTEGER NOT NULL,
    `sold` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `creditEntreprise` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nomClient` VARCHAR(191) NOT NULL,
    `prenomClient` VARCHAR(191) NOT NULL,
    `motif` VARCHAR(191) NOT NULL,
    `montant` INTEGER NOT NULL,
    `montant_paye` INTEGER NULL,
    `montant_restant` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prepayee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `nom_client` VARCHAR(191) NOT NULL,
    `montant_initial` INTEGER NOT NULL,
    `montant_depense` INTEGER NULL,
    `montant_restant` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `serviceEntreprise` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `mom_service` ENUM('CANAL_PLUS', 'MALIVISION', 'WAVE', 'ORANGE_MONEY', 'MOBICASH', 'SAMA_MONEY', 'CREDIT_ORANGE', 'CREDIT_MALITEL', 'CREDIT_TELECEL', 'W_MG_RIA') NOT NULL DEFAULT 'ORANGE_MONEY',
    `solde_a_nouveau` INTEGER NOT NULL,
    `montant_final` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transInternation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `montant_initial` INTEGER NOT NULL,
    `nom_service` ENUM('WESTERUNION', 'MONEYGRAM', 'RIA') NOT NULL DEFAULT 'WESTERUNION',
    `montant_trans` INTEGER NULL,
    `montant_recus` INTEGER NULL,
    `date_debut` DATETIME(3) NOT NULL,
    `date_fin` DATETIME(3) NULL,
    `soldes` INTEGER NULL,
    `Decouvert` INTEGER NULL,
    `credit` INTEGER NULL,
    `debit_caisse` INTEGER NULL,
    `debit_BNDA` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `uvAbonnement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `produit` ENUM('CANALPlus', 'MALIVISION') NOT NULL DEFAULT 'CANALPlus',
    `montant` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `caisse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `service` ENUM('CANAL_PLUS', 'MALIVISION', 'WAVE', 'ORANGE_MONEY', 'MOBICASH', 'SAMA_MONEY', 'CREDIT_ORANGE', 'CREDIT_MALITEL', 'CREDIT_TELECEL', 'W_MG_RIA') NOT NULL,
    `stock_initial` INTEGER NOT NULL,
    `stock_final` INTEGER NOT NULL,
    `depenses` INTEGER NOT NULL,
    `fonts` INTEGER NOT NULL,
    `solde` INTEGER NOT NULL,
    `montant` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bio` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NULL,
    `prenom` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
