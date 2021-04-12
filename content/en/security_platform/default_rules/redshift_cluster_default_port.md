---
aliases:
- 6a4-aa4-a76
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: redshift
security: compliance
source: redshift
title: Redshift cluster is not using the default port
type: security_rules
---

## Description

Confirm [Redshift clusters][1] are not using default port 5439 to protect against non-targeted attacks.

## Rationale

Using a custom port can protect your publicly accessible AWS Redshift clusters against potential brute-force and dictionary attacks. Although setting a custom port can help fend off these attacks, it is also recommended to restrict public access, use SSL to encrypt client connections to database clusters, and control cluster access through security groups and Network Access Control Lists (NACLs) to add an additional layer of security for your account.

## Remediation

### Console

Follow the [Getting information about cluster configuration][7] docs to access your cluster configuration information. If the cluster has a port 5439, it is the default port. Modify the port number in the console.

### CLI

1. Run `describe-clusters` with a `cluster-identifier` to [retrieve cluster metadata][2].

    {{< code-block lang="bash" filename="describe-clusters.sh" >}}
    aws redshift describe-clusters
	    --cluster-identifier cluster-name
    {{< /code-block >}}

2. Run `create-cluster-snapshot` with [create a snapshot of your database cluster][3].

    {{< code-block lang="bash" filename="create-cluster-snapshot.sh" >}}
    aws redshift create-cluster-snapshot
        --cluster-identifier cluster-name
        --snapshot-identifier snapshot-identifier
    {{< /code-block >}}

3. Run `restore-from-cluster-snapshot` to [create a new cluster from the snapshot created above][4]. Use the retrieved metadata in step one to configure a new port number.

    {{< code-block lang="bash" filename="restore-from-cluster-snapshot.sh" >}}
    aws redshift restore-from-cluster-snapshot
        ...
        --cluster-identifier cluster-name
        --snapshot-identifier snapshot-identifier
        --port 2000
     {{< /code-block >}}

[1]: https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/redshift/describe-clusters.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/redshift/create-cluster-snapshot.html
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/redshift/restore-from-cluster-snapshot.html
