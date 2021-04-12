---
aliases:
- 1iq-xaa-f51
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: redshift
security: compliance
source: redshift
title: Redshift cluster uses SSL to secure connections to clients
type: security_rules
---

## Description

Enable the `require_ssl` parameter for your Amazon Redshift cluster.

## Rationale

Redshift clusters that do not require an SSL connection are vulnerable to exploits, such as man-in-the-middle attacks. Securing your connections protects your sensitive and private data.

## Remediation

### Console

Amazon Redshift Clusters use AWS Certificate Manager (ACM)] to manage SSL certificates. To configure Redshift parameter groups in the console, follow the [Managing parameter groups using the console][1] docs.

### CLI

1. Run `modify-cluster-parameter-group` with name of [the default parameter group][2] you want to modify and the required parameters for SSL. This returns the group name and status if successful.

  {{< code-block lang="bash" filename="modify-cluster-parameter-group.sh" >}}

  aws redshift modify-cluster-parameter-group
    --parameter-group-name your-parameter-group
    --parameters ParameterName=require_ssl,ParameterValue=true

  {{< /code-block >}}

2. Run `reboot-cluster` with your [cluster identifier][3] to enable the configuration changes.

[1]: https://docs.aws.amazon.com/redshift/latest/mgmt/managing-parameter-groups-console.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/redshift/modify-cluster-parameter-group.html#synopsis
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/redshift/reboot-cluster.html#synopsis
