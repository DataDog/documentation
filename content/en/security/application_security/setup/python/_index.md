---
title: Enabling AAP for Python
aliases:
  - /security_platform/application_security/getting_started/python
  - /security/application_security/getting_started/python
  - /security/application_security/threats/setup/threat_detection/python
  - /security/application_security/threats_detection/python
  - /security/application_security/setup/aws/fargate/python
further_reading:
- link: "/security/application_security/add-user-info/"
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
{{< partial name="api_security/callout.html" >}}

{{< partial name="api_security/python/overview.html" >}}

## Environments

{{< appsec-integrations >}}
  {{< appsec-integration name="Docker" avatar="docker" link="./docker" >}}
  {{< appsec-integration name="Kubernetes" avatar="kubernetes" link="./kubernetes" >}}
  {{< appsec-integration name="Linux" avatar="linux" link="./linux" >}}
  {{< appsec-integration name="macOS" avatar="apple" link="./macos" >}}
  {{< appsec-integration name="Windows" avatar="windows" link="./windows" >}}
{{< /appsec-integrations >}}

## Additional Resources

- [Troubleshooting Guide](./python/troubleshooting)
- [Compatibility Information](./python/compatibility) 