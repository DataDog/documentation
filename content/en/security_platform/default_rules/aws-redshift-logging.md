---
aliases:
- 8e1-hf3-j3b
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: redshift
security: compliance
source: redshift
title: Redshift cluster logging is enabled
type: security_rules
---

## Description

Enable logging for your Amazon Redshift cluster.

## Rationale

Logging data from Amazon Redshift clusters is helpful when troubleshooting or completing security and compliance audits.

## Remediation

### Console

Follow the Amazon Redshift [Configuring auditing using the console][1] docs to enable logging, create audit log files, and store them in an Amazon S3 bucket.

### CLI

1. Run `enable-logging` with your [cluster ID and the S3 bucket][2] where log files are to be stored.

  {{< code-block lang="bash" filename="list-buckets.sh" >}}
  aws redshift enable-logging
    --cluster-identifier your-cluster-id
    --bucket-name aws-redshift-logs
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/redshift/latest/mgmt/db-auditing-console.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/redshift/enable-logging.html#synopsis
