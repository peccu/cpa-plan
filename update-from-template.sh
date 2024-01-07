#!/bin/bash
cp -R $(
    export APP=vue-app
    ls -a1 $APP \
	| grep -Ev '^\.\.?$' \
	| grep -Ev '^\.git$' \
	| grep -Ev '^'$APP'$' \
	| grep -Ev '^update-from-template.sh$' \
	| xargs -I{} echo "$APP/"{}
   ) ./
