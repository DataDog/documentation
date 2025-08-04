---
title: Enabling App and API Protection for Go
aliases:
  - /security_platform/application_security/getting_started/go
  - /security/application_security/getting_started/go
  - /security/application_security/threats/setup/threat_detection/go
  - /security/application_security/threats_detection/go
further_reading:
- link: "/security/application_security/add-user-info/"
  tag: "Documentation"
  text: "Adding user information to traces"
- link: 'https://github.com/DataDog/dd-trace-go'
  tag: "Source Code"
  text: 'Go Datadog library source code'
- link: "/security/default_rules/?category=cat-application-security"
  tag: "Documentation"
  text: "OOTB App and API Protection Rules"
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting App and API Protection"
---

## Overview

App and API Protection (AAP) leverages the [Datadog Go library][5] to monitor and secure your Go service. The library integrates seamlessly into your workflow using [Orchestrion][6], an automatic compile-time instrumentation of Go code that does not require code changes. 

For detailed compatibility information, including supported Go versions, frameworks, and deployment environments, see [Go Compatibility Requirements][2].

## Environments

### Hosts
{{< appsec-integrations >}}
  {{< appsec-integration name="Linux" avatar="linux" link="./setup?tab=environmentvariable" >}}
  {{< appsec-integration name="macOS" avatar="apple" link="./setup?tab=environmentvariable" >}}
{{< /appsec-integrations >}}

### Cloud and Container Platforms
{{< appsec-integrations >}}
{{< appsec-integration name="Docker" avatar="docker" link="./setup?tab=dockercli" >}}
{{< appsec-integration name="Kubernetes" avatar="kubernetes" link="./setup?tab=kubernetes" >}}
{{< /appsec-integrations >}}

### AWS
{{< appsec-integrations >}}
{{< appsec-integration name="AWS ECS" avatar="aws-fargate" link="./setup?tab=amazonecs" >}}
{{< /appsec-integrations >}}

## Additional Resources

- [Troubleshooting][1]
- [Compatibility Information][2]
- [How to create a Dockerfile for Go][3]
- [App and API Protection SDK for Go][4]

[1]: /security/application_security/setup/go/troubleshooting
[2]: /security/application_security/setup/compatibility/go
[3]: /security/application_security/setup/go/dockerfile
[4]: /security/application_security/setup/go/sdk
[5]: https://github.com/DataDog/dd-trace-go/
[6]: https://datadoghq.dev/orchestrion/

