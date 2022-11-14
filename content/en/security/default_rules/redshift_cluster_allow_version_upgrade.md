---
aliases:
- 4da-22a-46b
- /security_monitoring/default_rules/4da-22a-46b
- /security_monitoring/default_rules/redshift_cluster_allow_version_upgrade
disable_edit: true
integration_id: redshift
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: redshift
title: Version upgrade is enabled for Redshift cluster
type: security_rules
---

## Description

Confirm `AllowVersionUpgrade` is enabled so [Redshift clusters][1] can automatically upgrade to the latest version.

## Rationale

Enablement allows the latest version to automatically install, deploying the most recent bug fixes and security patches.

## Remediation

### From the console

Follow the [Cluster maintenance][4] docs to permit automatic upgrade for your clusters.

### From the command line

1. Run `modify-cluster` to [set `allow-version-upgrade` for a cluster][3].

    {{< code-block lang="bash" filename="allow-version-upgrade.sh" >}}
    aws redshift modify-cluster
	    --cluster-identifier cluster-id-name
	    --allow-version-upgrade
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/redshift/modify-cluster.html
[3]: https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html#rs-cluster-maintenance
