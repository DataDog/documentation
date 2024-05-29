---
title: Supported deployment types and features for Cloud Security Management
kind: documentation
---

The following table summarizes the CSM features available relative to each deployment type.

<div class="alert alert-info">For more details, click each of the CSM feature headings to review additional requirements for that feature.</div>

| Deployment type     | Agent Required (7.46+) | CSM Misconfigurations | [CSM Threats][8] | [CSM Vulnerabilities][9] | [CSM Identity Risks][10] | [CSM Agentless Scanning][11] |
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