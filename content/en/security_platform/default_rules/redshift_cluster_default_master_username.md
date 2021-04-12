---
aliases:
- 8f3-21b-c86
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: redshift
security: compliance
source: redshift
title: Redshift cluster is not using a custom master user name
type: security_rules
---

## Description

Confirm [Redshift clusters][1] are using a custom master user name, versus the default master user name.

## Rationale

Default master user names for publicly accessible clusters can be a backdoor for hacking. While setting a customer master user name alone does not fully protect against attacks, restricting the root account only to privileged users and using additional password measures can add an additional layer of protection.

## Remediation

### Console

Follow the [Getting information about cluster configuration][2] docs to access your cluster configuration information. If the cluster has a master user name of `awsuser`, it is the default master user name. Modify the user name to a custom user name in the console.

### CLI

1. Run `describe-clusters` with a `cluster-identifier` to [retrieve cluster metadata][3].

    {{< code-block lang="bash" filename="describe-clusters.sh" >}}
    aws redshift describe-clusters
	    --cluster-identifier cluster-name
    {{< /code-block >}}

2. Run `create-cluster` with the returned cluster metadata to [launch a new cluster][4] with the existing metadata and a new master user name.

    {{< code-block lang="bash" filename="create-cluster.sh" >}}
    aws redshift create-cluster
	    --cluster-identifier old-cluster-identifier
	    --master-username awsmasterusr
        --vpc-security-group-ids id-012a3b4c
        ...
    {{< /code-block >}}

3. Re-run `describe-clusters` with a [custom query filter][5] to retrieve the database cluster endpoint.

    {{< code-block lang="bash" filename="describe-clusters.sh" >}}
    aws redshift describe-clusters
	    --cluster-identifier new-cluster-identifier
	    --query 'Clusters[*].Endpoint.Address'
    {{< /code-block >}}

4. Reload the old cluster data into the new database cluster with the [Unload Copy Utility][6].
5. Use the returned new database cluster endpoint URL from step 3 to update your application's configuration to point to the new cluster endpoint.
6. Run `delete-cluster` to [delete the old cluster][7].

    {{< code-block lang="bash" filename="delete-cluster.sh" >}}
    aws redshift create-cluster
	    --cluster-identifier old-cluster-identifier
	    ...
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html
[2]: https://docs.aws.amazon.com/redshift/latest/mgmt/managing-clusters-console.html#describe-cluster
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ecs/describe-clusters.html
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/emr/create-cluster.html
[5]: https://docs.aws.amazon.com/documentdb/latest/developerguide/db-cluster-endpoints-find.html
[6]: https://github.com/awslabs/amazon-redshift-utils/tree/master/src/UnloadCopyUtility
[7]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/redshift/delete-cluster.html
