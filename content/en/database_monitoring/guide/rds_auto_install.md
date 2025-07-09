---
title: Automatically Monitoring RDS Instances With DBM

---

## Prerequisities
1. An AWS use with sufficient account privileges.
1. A VPC, S3 bucket, and at least one RDS instance to monitor. For demonstration, use the demo files.

## Automatic Database Montoring
### Install the Lambda
1. `cd lambda`
1. `AWS_REGION=us-east-2 aws-vault exec sso-dbm-sandbox-account-admin -- ./deploy.sh`

### Install the framework
1. `AWS_REGION=us-east-2 aws-vault exec sso-dbm-sandbox-account-admin -- ./deploy.sh`

### Install the agent


## Demo Files
1. Download the `resources/yaml/dbm/rds-auto-install` files.
1. Deploy the demo environment, which includes a VPC, S3 Bucket, and RDS instance: `AWS_REGION=us-east-2 aws-vault exec sso-dbm-sandbox-account-admin -- aws cloudformation deploy --template-file setup.yaml --stack-name rds-auto-install-demo`
