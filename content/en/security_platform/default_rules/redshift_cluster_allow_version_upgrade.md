---
aliases:
- 4da-22a-46b
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: redshift
security: compliance
source: redshift
title: Version upgrade is enabled for Redshift cluster
type: security_rules
---

## Description

Confirm `AllowVersionUpgrade` is enabled so [Redshift clusters][1] can automatically upgrade to the latest version.

## Rationale

Enablement allows the latest version to automatically install, deploying the most recent bug fixes and security patches.

## Remediation

### Console

Follow the [Cluster maintenance][4] docs to permit automatic upgrade for your clusters.

### CLI

1. Run `modify-cluster` to [set `allow-version-upgrade` for a cluster][2].

    {{< code-block lang="bash" filename="allow-version-upgrade.sh" >}}
    aws redshift modify-cluster
	    --cluster-identifier cluster-id-name
	    --allow-version-upgrade
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html
[2]: https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html#rs-cluster-maintenance
