#!/usr/bin/env bash
if [ "$CORDOVA_ENV" == "production" ]
then
  npm run build
else
  npm run build-dev
fi
