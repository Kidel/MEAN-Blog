#!/bin/bash

if [[ ! -e database ]]; then
    mkdir database
elif [[ ! -d database ]]; then
    echo "database already exists but it is not a directory" 1>&2
fi
mongod --dbpath ./database/