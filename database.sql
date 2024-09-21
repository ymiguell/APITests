CREATE DATABASE bancodedados;

USE bancodedados;

CREATE TABLE posts(
	`id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `body` TEXT NOT NULL,
    `authorId` INT NOT NULL
)
