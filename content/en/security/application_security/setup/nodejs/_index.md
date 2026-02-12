---
title: Enabling App and API Protection for Node.js
aliases:
  - /security_platform/application_security/getting_started/nodejs
  - /security/application_security/getting_started/nodejs
  - /security/application_security/enabling/tracing_libraries/threat_detection/nodejs/
  - /security/application_security/threats/setup/threat_detection/nodejs
  - /security/application_security/threats_detection/nodejs
  - /security/application_security/setup/aws/fargate/nodejs
  - /security/application_security/setup/standalone/nodejs
further_reading:
  - link: "/security/application_security/add-user-info/"
    tag: "Documentation"
    text: "Adding user information to traces"
  - link: 'https://github.com/DataDog/dd-trace-js'
    tag: "Source Code"
    text: 'Node.js Datadog library source code'
  - link: "/security/default_rules/?category=cat-application-security"
    tag: "Documentation"
    text: "OOTB App and API Protection Rules"
  - link: "/security/application_security/troubleshooting"
    tag: "Documentation"
    text: "Troubleshooting App and API Protection"
---
{{< partial name="app_and_api_protection/callout.html" >}}

{{% aap/aap_and_api_protection_nodejs_overview showSetup="false" %}}

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
{{< appsec-integration name="AWS Lambda" avatar="amazon-lambda" link="../aws/lambda/nodejs" >}}
{{< appsec-integration name="AWS Fargate" avatar="aws-fargate" link="./aws-fargate" >}}
{{< /appsec-integrations >}}

### Google Cloud Platform
{{< appsec-integrations >}}
{{< appsec-integration name="Google Cloud Run" avatar="google-cloud-run" link="../gcp/cloud-run/nodejs" >}}
{{< /appsec-integrations >}}

### Microsoft Azure
{{< appsec-integrations >}}
{{< appsec-integration name="Azure App Service" avatar="azure-appserviceenvironment" link="/security/application_security/setup/azure/app-service/?tab=nodenetphppython" >}}
{{< /appsec-integrations >}}

## Additional Resources

- [Troubleshooting Guide](./troubleshooting)
- [Compatibility Information](./compatibility)
