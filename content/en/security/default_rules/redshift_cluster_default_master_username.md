---
aliases:
- 8f3-21b-c86
- /security_monitoring/default_rules/8f3-21b-c86
- /security_monitoring/default_rules/redshift_cluster_default_master_username
disable_edit: true
integration_id: redshift
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: redshift
title: Redshift cluster is not using a custom master user name
type: security_rules
---

## Description

Confirm [Redshift clusters][1] are using a custom master user name, versus the default master user name.

## Rationale

Default master user names for publicly accessible clusters can be a backdoor for hacking. While setting a customer master user name alone does not fully protect against attacks, restricting the root account only to privileged users and using additional password measures can add an additional layer of protection.

## Remediation

### From the console

Follow the [Getting information about cluster configuration][7] docs to access your cluster configuration information. If the cluster has a master user name of `awsuser`, it is the default master user name. Modify the user name to a custom user name in the console.

### From the command line

1. Run `describe-clusters` with a `cluster-identifier` to [retrieve cluster metadata][2].

    {{< code-block lang="bash" filename="describe-clusters.sh" >}}
    aws redshift describe-clusters
	    --cluster-identifier cluster-name
    {{< /code-block >}}

2. Run `create-cluster` with the returned cluster metadata to [launch a new cluster][3] with the existing metadata and a new master user name.

    {{< code-block lang="bash" filename="create-cluster.sh" >}}
    aws redshift create-cluster
	    --cluster-identifier old-cluster-identifier
	    --master-username awsmasterusr
        --vpc-security-group-ids id-012a3b4c
        ...
    {{< /code-block >}}

3. Re-run `describe-clusters` with a [custom query filter][4] to retrieve the database cluster endpoint.

    {{< code-block lang="bash" filename="describe-clusters.sh" >}}
    aws redshift describe-clusters
	    --cluster-identifier new-cluster-identifier
	    --query 'Clusters[*].Endpoint.Address'
    {{< /code-block >}}

4. Reload the old cluster data into the new database cluster with the [Unload Copy Utility][5].
5. Use the returned new database cluster endpoint URL from step 3 to update your application's configuration to point to the new cluster endpoint.
6. Run `delete-cluster` to [delete the old cluster][6].

    {{< code-block lang="bash" filename="delete-cluster.sh" >}}
    aws redshift create-cluster
	    --cluster-identifier old-cluster-identifier
	    ...
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ecs/describe-clusters.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/emr/create-cluster.html
[4]: https://docs.aws.amazon.com/documentdb/latest/developerguide/db-cluster-endpoints-find.html
[5]: https://github.com/awslabs/amazon-redshift-utils/tree/master/src/UnloadCopyUtility
[6]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/redshift/delete-cluster.html
[7]: https://docs.aws.amazon.com/redshift/latest/mgmt/managing-clusters-console.html#describe-cluster
