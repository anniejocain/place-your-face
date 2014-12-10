Place Your Face requires a DB and one table. Something like this.

    mysql -u root -psomepasshere
    mysql> create database placeyourface character set utf8; grant all on placeyourface.* to placeyourface@'%' identified by 'placeyourface';
    mysql -u placeyourface -pplaceyourface placeyourface


    CREATE TABLE `images` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `file_name` varchar(35) DEFAULT NULL,
      `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    ) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8


Be sure to update your config.php file with the DB values.
