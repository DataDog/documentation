---
title: Setting up Cloud Security Management
aliases:
  - /security_platform/cloud_workload_security/getting_started
  - /security/cloud_workload_security/getting_started
  - /security/cloud_workload_security/setup
  - /security/threats/setup
  - /security_platform/cspm/getting_started
  - /security/cspm/getting_started
  - /security/cspm/setup
  - /security/misconfigurations/setup
  - /security/vulnerabilities/setup
  - /security/infrastructure_vulnerabilities/setup/
  - /security/cloud_security_management/setup/csm_enterprise
  - /security/cloud_security_management/setup/csm_cloud_workload_security
  - /security/cloud_security_management/setup/csm_pro
further_reading:
    - link: "/security/cloud_security_management/setup/supported_deployment_types"
      tag: "Documentation"
      text: "Supported Deployment Types"
    - link: "/security/cloud_security_management/setup/agentless_scanning"
      tag: "Documentation"
      text: "Agentless Scanning Quick Start"
    - link: "/security/cloud_security_management/setup/custom_onboarding"
      tag: "Documentation"
      text: "Custom Onboarding for Cloud Security Management"
    - link: "/security/cloud_security_management/guide/agent_variables/"
      tag: "Guide"
      text: "Cloud Security Management Agent Variables"
---

To set up Cloud Security Management, you can choose between two main approaches: the streamlined [Agentless Scanning quick start](#quick-start) or the flexible [custom onboarding workflow](#custom-onboarding).

## Quick start

The [Agentless Scanning quick start][1] provides a streamlined setup workflow for Cloud Security Management, allowing you to start monitoring your AWS resources immediately.

**Agentless Scanning supported features**:

- **Misconfigurations**: Detect and manage security misconfigurations.
- **Identity Risks (CIEM)**: Identify and mitigate identity-related risks.
- **Host Vulnerability Management**: Scan for vulnerabilities in your hosts.
- **Container Vulnerability Management**: Ensure the security of your containerized applications.

**Note:** Agentless Scanning supports only AWS environments.

Once the onboarding workflow is complete, you can configure additional features, including Agent-based capabilities, on the [Features][2] page to further enhance your security setup.

## Custom onboarding

The [custom onboarding workflow][3] offers flexibility and customization during onboarding, enabling you to choose features that best fit your specific needs.

### When to use custom onboarding

Use custom onboarding if you:

- Need to work with Azure or Google Cloud Platform (GCP).
- Require Agent-based security features for enhanced visibility and control.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/setup/agentless_scanning
[2]: https://app.datadoghq.com/security/configuration/csm/features
[3]: /security/cloud_security_management/setup/custom_onboarding