COPY trains
  (shortname, longname)
FROM '/Users/chas/shoebill/lawnguylandsnailroad/db/stations.csv'
    DELIMITER ',' CSV;
