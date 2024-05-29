---
title: Supported Deployment Types for Cloud Security Management
kind: documentation
---

The following table summarizes the CSM features available relative to each deployment type.

<div class="alert alert-info">For more details, click each of the CSM feature headings to review additional requirements for that feature.</div>

| Deployment type     | Agent Required (7.46+) | CSM Misconfigurations | [CSM Threats][1] | [CSM Vulnerabilities][2] | [CSM Identity Risks][3] | [CSM Agentless Scanning][4] |
|---------------------|------------------------|-----------------------|------------------|--------------------------|--------------------------|------------------------------|
| Docker              | {{< X >}}              | {{< X >}}             | {{< X >}}        |                          |                          |                              |
| Kubernetes          | {{< X >}}              | {{< X >}}             | {{< X >}}        | {{< X >}}                |                          |                              |
| Linux               | {{< X >}}              | {{< X >}}             | {{< X >}}        | {{< X >}}                |                          |                              |
| Amazon ECS/EKS      | {{< X >}}              | {{< X >}}             | {{< X >}}        | {{< X >}}                |                          |                              |
| AWS Account         |                        | {{< X >}}             |                  |                          | {{< X >}}                | beta                         |
| Azure Account       |                        | {{< X >}}             |                  |                          | {{< X >}}                |                              |
| GCP Account         |                        | {{< X >}}             |                  |                          |                          |                              |
| Windows             | {{< X >}}              |                       | {{< X >}}        |                          |                          |                              |
| AWS Fargate ECS/EKS | {{< X >}}              |                       | beta             |                          |                          |                              |
| Terraform           |                        |                       |                  |                          |                          | beta                         |

[1]: /security/cloud_security_management/setup/#csm-threats
[2]: /security/cloud_security_management/setup/#csm-vulnerabilities
[3]: /security/cloud_security_management/setup/#csm-identity-risks
[4]: /security/cloud_security_management/setup/agentless_scanning?tab=crossaccountscanning#prerequisites