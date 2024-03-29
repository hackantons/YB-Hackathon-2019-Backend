#!/bin/bash
set -e

for path in $(ls); do
    if [[ -d "$path" ]]
    then
        echo "deploying $path"
        cd "$path"
        npm install
        serverless deploy --stage prod --verbose
        cd $OLDPWD
    else 
        continue
    fi
done
