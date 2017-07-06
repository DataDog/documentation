#!/bin/sh

## The script executed by the Docker dev image

nohup /usr/sbin/nginx -g 'daemon on;'
bundle exec guard -i -G DockerGuardfile
