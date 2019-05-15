#!/bin/bash

GUACBOT_EMAILS=("guacbot@users.noreply.github.com" "robot-guacbot-guacamole@datadoghq.com")

# get email of user that did the commit
EMAIL=$(git show -s --format="%ae" HEAD)

# get list of files that changed and save to file
git log -m -1 --name-only --pretty="format:" $CI_COMMIT_SHA > changelist.txt

# determine if this was a guacbot commit
if [[ " ${GUACBOT_EMAILS[*]} " == *"$EMAIL"* ]];
then
    echo "Skipping, guacbot commits"
else
    echo "Ready to send translated files.."
    echo "Files that were added or changed during this merge commit"
    cat changelist.txt

    # command to run pushing translated files here
fi
