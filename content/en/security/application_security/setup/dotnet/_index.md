---
title: Enabling AAP for .NET
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 0
aliases:
  - /security_platform/application_security/getting_started/dotnet
  - /security/application_security/getting_started/dotnet
  - /security/application_security/threats/setup/threat_detection/dotnet
  - /security/application_security/threats_detection/dotnet
further_reading:
- link: "/security/application_security/add-user-info/"
  tag: "Documentation"
  text: "Adding user information to traces"
- link: 'https://github.com/DataDog/dd-trace-dotnet'
  tag: "Source Code"
  text: '.NET Datadog library source code'
- link: "/security/default_rules/?category=cat-application-security"
  tag: "Documentation"
  text: "OOTB App and API Protection Rules"
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting App and API Protection"
---
{{< partial name="app_and_api_protection/callout.html" >}}

{{% app_and_api_protection_dotnet_overview showSetup="false"%}}

## Environments

### Hosts
{{< appsec-integrations >}}
  {{< appsec-integration name="Linux" avatar="linux" link="./linux" >}}
  {{< appsec-integration name="Windows" avatar="windows" link="./windows" >}}
{{< /appsec-integrations >}}
## Additional Resources

- [Troubleshooting Guide](dotnet/troubleshooting)
- [Compatibility Information](dotnet/compatibility)
