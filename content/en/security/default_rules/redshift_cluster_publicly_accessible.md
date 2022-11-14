---
aliases:
- a7e-e88-302
- /security_monitoring/default_rules/a7e-e88-302
- /security_monitoring/default_rules/redshift_cluster_publicly_accessible
disable_edit: true
integration_id: redshift
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: redshift
title: Redshift cluster is not publicly accessible
type: security_rules
---

## Description

Confirm [Redshift clusters][1] are not publicly available.

## Rationale

Publicly available Redshift clusters have a public IP address, which gives any machine the opportunity to attempt to connect to your clusters. Malicious activity, such as SQL injections or distributed denial-of-service (DDoS) attacks, can occur if a connection is established.

## Remediation

### From the console

Follow the [Managing clusters in a VPC][7] docs to learn how to modify public accessibility for your clusters.

[1]: https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html
[2]: https://docs.aws.amazon.com/redshift/latest/mgmt/managing-clusters-console.html#modify-cluster
[3]: https://docs.aws.amazon.com/redshift/latest/mgmt/managing-clusters-vpc.html
