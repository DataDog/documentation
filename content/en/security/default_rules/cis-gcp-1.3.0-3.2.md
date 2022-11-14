---
aliases:
- 9ds-657-jd8
- /security_monitoring/default_rules/9ds-657-jd8
- /security_monitoring/default_rules/cis-gcp-1.3.0-3.2
disable_edit: true
integration_id: google_compute_network
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_compute_network
title: Legacy networks do not exist for older projects
type: security_rules
---

## Description
To prevent use of legacy networks, a project should not have a legacy network
configured. Legacy networks can no longer be created, and their use is not recommended. This recommendation is to check old projects to ensure
that they are not using Legacy Networks.

## Rationale
Each legacy network has a single network IPv4 prefix range, and a single gateway IP address. The network is global in scope and spans all cloud regions.
Subnetworks cannot be created in a legacy network, and are unable to switch from legacy to
auto or custom subnet networks. Legacy networks can have an impact on high network
traffic projects, and are subject to a single point of contention or failure.

### Default value
By default, networks are not created in the legacy mode.

## Remediation

For each Google Cloud Platform project:
1. Read [Create and modify Virtual Private Cloud (VPC) networks][3] to create a non-legacy network suitable for the organization's requirements.
2. Read [Deleting a legacy network][2] to delete the networks in the `legacy` mode.

## References
1. [https://cloud.google.com/vpc/docs/using-legacy#creating_a_legacy_network][1]
2. [https://cloud.google.com/vpc/docs/using-legacy#deleting_a_legacy_network][2]

[1]: https://cloud.google.com/vpc/docs/using-legacy#creating_a_legacy_network
[2]: https://cloud.google.com/vpc/docs/using-legacy#deleting_a_legacy_network
[3]: https://cloud.google.com/vpc/docs/create-modify-vpc-networks
