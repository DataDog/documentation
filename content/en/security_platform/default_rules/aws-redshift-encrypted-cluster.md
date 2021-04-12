---
aliases:
- ca8-9ec-a27
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: redshift
security: compliance
source: redshift
title: Redshift cluster is encrypted
type: security_rules
---

## Description

Ensure that AWS RedShift clusters are encrypted.

## Rationale

Encrypting Redshift clusters protects your sensitive data from unauthorized access.

## Remediation

### Console

Follow the [Changing cluster encryption][1] docs to ensure your clusters are encrypted.

### CLI

1. Run `describe-clusters` with your [cluster identifier][2].

    {{< code-block lang="bash" filename="describe-cluster.sh" >}}
    aws redshift describe-clusters
        --cluster-identifier cluster-name
    {{< /code-block >}}

2. Run `create-cluster` using the configuration details returned in step 1 along with the [`encrypted` flag][3].

    {{< code-block lang="bash" filename="create-cluster.sh" >}}
    aws redshift create-cluster
        --cluster-identifier cluster-name
        ...
        --encrypted
    {{< /code-block >}}

3. Run `describe-cluster` with a [query filter][2] to expose the new endpoint address.

    {{< code-block lang="bash" filename="describe-cluster.sh" >}}
    aws redshift describe-clusters
        --cluster-identifier cluster-name
        --query 'Clusters[*].Endpoint.Address'
    {{< /code-block >}}

4. Use the cluster endpoint URL with the [Amazon Redshift Unload/Copy][4] tool.

5. Update your encrypted Redshift cluster configuration with the new Redshift cluster endpoint URL.

6. Once the endpoint is changed, run `delete-cluster` to [remove the old unencrypted cluster][5].

    {{< code-block lang="bash" filename="delete-cluster.sh" >}}
    aws redshift delete-cluster
        --cluster-identifier old-cluster
        --final-cluster-snapshot-identifier old-cluster-finalsnapshot
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/redshift/latest/mgmt/changing-cluster-encryption.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/redshift/describe-clusters.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/redshift/create-cluster.html
[4]: https://github.com/awslabs/amazon-redshift-utils/tree/master/src/UnloadCopyUtility
[5]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/redshift/delete-cluster.html
