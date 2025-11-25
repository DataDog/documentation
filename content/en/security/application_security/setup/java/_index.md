---
title: Enabling App and API Protection for Java
aliases:
  - /security_platform/application_security/getting_started/java
  - /security/application_security/getting_started/java
  - /security/application_security/threats/setup/threat_detection/java
  - /security/application_security/threats_detection/java
further_reading:
- link: "/security/application_security/add-user-info/"
  tag: "Documentation"
  text: "Adding user information to traces"
- link: 'https://github.com/DataDog/dd-trace-java'
  tag: "Source Code"
  text: 'Java Datadog library source code'
- link: "/security/default_rules/?category=cat-application-security"
  tag: "Documentation"
  text: "OOTB App and API Protection Rules"
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting App and API Protection"
---
{{< partial name="app_and_api_protection/callout.html" >}}

{{% app_and_api_protection_java_overview showSetup="false" %}}

## Environments

### Hosts
{{< appsec-integrations >}}
  {{< appsec-integration name="Linux" avatar="linux" link="./linux" >}}
  {{< appsec-integration name="macOS" avatar="apple" link="./macos" >}}
  {{< appsec-integration name="Windows" avatar="windows" link="./windows" >}}
{{< /appsec-integrations >}}

### Container Platforms
{{< appsec-integrations >}}
{{< appsec-integration name="Docker" avatar="docker" link="./docker" >}}
{{< appsec-integration name="Kubernetes" avatar="kubernetes" link="./kubernetes" >}}
{{< /appsec-integrations >}}

### AWS
{{< appsec-integrations >}}
{{< appsec-integration name="AWS Fargate" avatar="aws-fargate" link="./aws-fargate" >}}
{{< appsec-integration name="AWS Lambda" avatar="amazon-lambda" link="../aws/lambda/java" >}}
{{< /appsec-integrations >}}

### Google Cloud Platform
{{< appsec-integrations >}}
{{< appsec-integration name="Google Cloud Run" avatar="google-cloud-run" link="../gcp/cloud-run/java" >}}
{{< /appsec-integrations >}}

### Microsoft Azure
{{< appsec-integrations >}}
{{< appsec-integration name="Azure App Service" avatar="azure-appserviceenvironment" link="../azure/app-service/?tab=java" >}}
{{< /appsec-integrations >}}

## Additional Resources

- [Troubleshooting Guide][1]
- [Compatibility Information][2]

[1]: /security/application_security/setup/java/troubleshooting
[2]: /security/application_security/setup/java/compatibility
