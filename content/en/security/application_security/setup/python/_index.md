---
title: Enabling AAP for Python
code_lang: python
type: multi-code-lang
code_lang_weight: 0
aliases:
  - /security_platform/application_security/getting_started/python
  - /security/application_security/getting_started/python
  - /security/application_security/threats/setup/threat_detection/python
  - /security/application_security/threats_detection/python
  - /security/application_security/setup/aws/fargate/python
further_reading:
- link: "/security/application_security/how-it-works/add-user-info/?tab=python"
  tag: "Documentation"
  text: "Adding user information to traces"
- link: 'https://github.com/DataDog/dd-trace-py'
  tag: "Source Code"
  text: 'Python Datadog library source code'
- link: "/security/default_rules/?category=cat-application-security"
  tag: "Documentation"
  text: "OOTB App and API Protection Rules"
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting App and API Protection"
---

{{< partial name="app_and_api_protection/callout.html" >}}

{{< partial name="app_and_api_protection/python/overview.html" >}}

## Environments

### Hosts
{{< appsec-integrations >}}
  {{< appsec-integration name="Linux" avatar="linux" link="./linux" >}}
  {{< appsec-integration name="macOS" avatar="apple" link="./macos" >}}
  {{< appsec-integration name="Windows" avatar="windows" link="./windows" >}}
{{< /appsec-integrations >}}

### Cloud and Container Platforms
{{< appsec-integrations >}}
{{< appsec-integration name="Docker" avatar="docker" link="./docker" >}}
{{< appsec-integration name="Kubernetes" avatar="kubernetes" link="./kubernetes" >}}
{{< /appsec-integrations >}}

### AWS
{{< appsec-integrations >}}
{{< appsec-integration name="AWS Fargate" avatar="amazon-ecs" link="./aws_fargate" >}}
{{< /appsec-integrations >}}

## Additional Resources

- [Troubleshooting Guide](./python/troubleshooting)
- [Compatibility Information](./python/compatibility)
