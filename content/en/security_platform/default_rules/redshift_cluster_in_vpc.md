---
aliases:
- b7c-ce0-a71
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: redshift
security: compliance
source: redshift
title: Redshift cluster is using the EC2-VPC platform
type: security_rules
---

## Description

Confirm [Redshift Clusters][1] are using the [AWS EC2-VPC platform][2] for better cluster security.

## Rationale

The AWS EC2-VPC platform offers better security control and traffic routing for clusters than the outdated EC2-Classic platform.

## Remediation

### Console

Follow the [Use EC2-VPC when you create your cluster][3] docs to learn how to use the EC2-VPC platform in the console to secure your clusters.

### CLI

1. Run `describe-clusters` with a `cluster-identifier` to [retrieve cluster metadata][2].

    {{< code-block lang="bash" filename="describe-clusters.sh" >}}
    aws redshift describe-clusters
	    --cluster-identifier cluster-id
    {{< /code-block >}}

2. Run `create-cluster` with the metadata to [launch a new cluster within a VPC][4].

    {{< code-block lang="bash" filename="describe-clusters.sh" >}}
        aws redshift create-cluster
            --cluster-identifier cluster-id
            --vpc-security-group-ids id-012a3b4c
            --port 5439
            ...
    {{< /code-block >}}

3. Re-run `describe-clusters` with a [custom query filter][5] to retrieve the database cluster endpoint.

    {{< code-block lang="bash" filename="describe-clusters.sh" >}}
    aws redshift describe-clusters
	    --cluster-identifier cluster-id
	    --query 'Clusters[*].Endpoint.Address'
    {{< /code-block >}}

4. Reload the old cluster data into the new database cluster with the [Unload Copy Utility][6].

5. Run `delete-cluster` to [delete the old cluster][7].

    {{< code-block lang="bash" filename="delete-cluster.sh" >}}
    aws redshift create-cluster
	    --cluster-identifier old-cluster-identifier
	    ...
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html
[2]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.FindDefaultVPC.html
[3]: https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html#cluster-platforms
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/emr/create-cluster.html
[5]: https://docs.aws.amazon.com/documentdb/latest/developerguide/db-cluster-endpoints-find.html
[6]: https://github.com/awslabs/amazon-redshift-utils/tree/master/src/UnloadCopyUtility
[7]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/redshift/delete-cluster.html
