@ECHO OFF

if not exist database mkdir database
mongod --dbpath ./database/