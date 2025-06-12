#!/bin/bash

aws cloudformation deploy \
--template-file cloudformation.yaml \
--stack-name rds-auto-install \
--capabilities CAPABILITY_IAM \
--parameters \
"ParameterKey=VPC,ParameterValue=$(aws cloudformation describe-stacks --stack-name "rds-auto-install-demo" --query "Stacks[0].Outputs[?ExportName=='VPCId'].OutputValue" --output text)" \
ParameterKey=LambdaBucket,ParameterValue=rds-auto-install-demo \
"ParameterKey=LambdaKey,ParameterValue=$(tar c -C lambda index.js package.json package-lock.json | md5 -q).zip"
