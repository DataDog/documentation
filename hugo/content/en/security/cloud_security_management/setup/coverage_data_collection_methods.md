---
title: Cloud Security Coverage and Data Collection Methods
aliases:
  - /security/cloud_security_management/setup/supported_deployment_types/
---

{{< partial name="security-platform/CSW-billing-note.html" >}}

Cloud Security helps you find and fix security issues in production and before deployment. Choose one or more data collection methods, then use the coverage tables to compare what each capability supports.

## Data collection methods

### Agentless

- [Connect a cloud account][1] to enable Misconfigurations and Identity Risks.
- [Enable Agentless Scanning][2] to find vulnerabilities in supported production environments.

### Unified Datadog Agent

- [Deploy the Unified Datadog Agent][3] to collect security context from hosts, Docker, and Kubernetes environments.

### Repository and CI/CD integrations

- Scan container images in a [registry][4] or [CI/CD pipeline][5].
- Connect [repositories][6] for IaC checks, code locations, and remediation.

## Production coverage by capability

| Environment   | Misconfigurations | Identity Risks | Vulnerabilities |
|---------------|-------------------|----------------|-----------------|
| Cloud account | {{< X >}}         | {{< X >}}      | Not applicable  |
| Hosts         | {{< X >}}         | Not applicable | {{< X >}}       |
| Docker        | {{< X >}}         | Not applicable | {{< X >}}       |
| Kubernetes    | {{< X >}}         | Not applicable | {{< X >}}       |
| Serverless    | {{< X >}}         | Not applicable | {{< X >}}       |

- Misconfigurations is available for AWS, Azure, GCP, and OCI.
- Identity Risks is available for AWS, Azure, and GCP.
- Vulnerability coverage varies by environment and collection method. See [Cloud Security Vulnerabilities compatibility][10].

## Find and fix issues before production

| Where you work     | What Datadog supports                                                                                                           | Primary product and documentation                                          |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| Container registry | Scan images in supported registries for vulnerabilities.                                                                        | [Agentless Scanning container image registries][4]                         |
| CI/CD pipeline     | Scan container images before deployment and link findings to the Dockerfile and commit that introduced them.                    | [Container Image Scanning in CI/CD][5]                                     |
| Repository         | Run IaC checks before merge, and map Cloud Security findings to the IaC repository, file, line, and code owner for remediation. | [Code Security][8], [source-code integration][6], and [IaC remediation][9] |

You can combine these methods: scan before deployment, and use Agentless or Agent deployments to find issues in production.

## Detailed compatibility

For provider, operating-system, registry, platform, and implementation details, see the following pages:

{{< whatsnext desc="Overall description goes here:" >}}
   {{< nextlink href="/security/cloud_security_management/setup/cloud_integrations/" >}}Cloud integrations{{< /nextlink >}}
   {{< nextlink href="/security/cloud_security_management/setup/agentless_scanning/compatibility/" >}}Agentless Scanning compatibility{{< /nextlink >}}
   {{< nextlink href="/security/cloud_security_management/setup/agent/" >}}Deploy Cloud Security on the Unified Datadog Agent{{< /nextlink >}}
   {{< nextlink href="/security/cloud_security_management/setup/ci_cd/" >}}Container Image Scanning in CI/CD{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /security/cloud_security_management/setup/cloud_integrations/
[2]: /security/cloud_security_management/setup/agentless_scanning/enable/
[3]: /security/cloud_security_management/setup/agent/
[4]: /security/cloud_security_management/setup/agentless_scanning/compatibility/#container-image-registries
[5]: /security/cloud_security_management/setup/ci_cd/
[6]: /security/cloud_security_management/code_locations/
[8]: /security/code_security/
[9]: /security/cloud_security_management/setup/iac_remediation/
[10]: /security/cloud_security_management/vulnerabilities/hosts_containers_compatibility/
