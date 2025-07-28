---
title: Enabling AAP for Ruby
aliases:
  - /security_platform/application_security/getting_started/ruby
  - /security/application_security/getting_started/ruby
  - /security/application_security/enabling/tracing_libraries/threat_detection/ruby/
  - /security/application_security/threats/setup/threat_detection/ruby
  - /security/application_security/threats_detection/ruby
  - /security/application_security/setup/aws/fargate/ruby
further_reading:
    - link: "/security/application_security/add-user-info/"
      tag: "Documentation"
      text: "Adding user information to traces"
    - link: 'https://github.com/DataDog/dd-trace-rb'
      tag: "Source Code"
      text: 'Ruby Datadog library source code'
    - link: "/security/default_rules/?category=cat-application-security"
      tag: "Documentation"
      text: "OOTB App and API Protection Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting App and API Protection"
---

{{% app-and-api-protection-ruby-overview showSetup="false" %}}

## Environments

{{< appsec-integrations >}}
  {{< appsec-integration name="Linux" avatar="linux" link="./linux" >}}
  {{< appsec-integration name="macOS" avatar="apple" link="./macos" >}}
{{< /appsec-integrations >}}

### Cloud and Container Platforms

{{< appsec-integrations >}}
{{< appsec-integration name="Docker" avatar="docker" link="./docker" >}}
{{< appsec-integration name="Kubernetes" avatar="kubernetes" link="./kubernetes" >}}
{{< /appsec-integrations >}}

### AWS

{{< appsec-integrations >}}
{{< appsec-integration name="AWS Fargate" avatar="aws-fargate" link="./aws-fargate" >}}
{{< /appsec-integrations >}}

## Additional Resources

- [Compatibility Information](/security/application_security/setup/ruby/compatibility)
- [Troubleshooting Guide](/security/application_security/setup/ruby/troubleshooting)
