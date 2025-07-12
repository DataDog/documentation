#!/bin/bash

aws cloudformation deploy \
--template-file cloudformation.yaml \
--stack-name rds-auto-install \
--parameter-overrides \
"VPC=$(aws cloudformation describe-stacks --stack-name "rds-auto-install-demo" --query "Stacks[0].Outputs[?OutputKey=='VPCId'].OutputValue" --output text)" \
"SubnetId=$(aws cloudformation describe-stacks --stack-name "rds-auto-install-demo" --query "Stacks[0].Outputs[?OutputKey=='SubnetAId'].OutputValue" --output text)" \
"LambdaBucket=rds-auto-install-demo" \
"LambdaKey=$(tar c -C lambda index.js package.json package-lock.json | md5 -q).zip" \
--capabilities CAPABILITY_IAM
