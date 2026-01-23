---
title: Set up SCA in your running services
disable_toc: false
aliases:
- /security/application_security/enabling/tracing_libraries/sca/
---
## Overview
SCA can detect vulnerabilities that affect open source libraries running in your services based on Datadog's application telemetry.

Before setting up runtime detection, ensure the following prerequisites are met:

1. **Datadog Agent Installation:** The Datadog Agent is installed and configured for your application's operating system or container, cloud, or virtual environment.
2. **Datadog APM Configuration:** Datadog APM is configured for your application or service, and web traces (`type:web`) are being received by Datadog.
3. **Supported Tracing Library:** The Datadog Tracing Library used by your application or service supports Software Composition Analysis capabilities for the language of your application or service. For more details, refer to the [Library Compatibility][2] page for each AAP product.

## Software Composition Analysis enablement types

### In-app service enablement

You can enable runtime Software Composition Analysis (SCA) in-app through [**Security** > **Code Security**][3].

1. Navigate to the [Security Settings][3] page.
2. In **Activate runtime detection of library vulnerabilities**, click **Manage Services**.
3. Check the services where you want to identify library vulnerabilities, and select **Bulk Actions**.
4. Click **Activate Runtime Software Composition Analysis (SCA)**.

### Datadog tracing library configuration

Add an environment variable or a new argument to your Datadog Tracing Library configuration.

By following these steps, you will successfully set up Software Composition Analysis for your application, ensuring comprehensive monitoring and identification of vulnerabilities in open source libraries used by your applications or services.

You can use Datadog Software Composition Analysis (SCA) to monitor the open source libraries in your apps.

SCA is configured by setting the `-Ddd.appsec.sca.enabled` flag or the `DD_APPSEC_SCA_ENABLED` environment variable to `true` in supported languages:

- Java
- .NET
- Go
- Ruby
- PHP
- Node.js
- Python

This topic explains how to set up SCA using a Java example.

**Example: enabling Software Composition Analysis in Java**

1. **Update your [Datadog Java library][1]** to at least version 0.94.0 (at least version 1.1.4 for Software Composition Analysis detection features):

   {{< tabs >}}
   {{% tab "Wget" %}}
   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "cURL" %}}
   ```shell
   curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "Dockerfile" %}}
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar
   ```
{{% /tab %}}
{{< /tabs >}}
   To check that your service's language and framework versions are supported, see [Compatibility][2].

1. **Run your Java application with SCA enabled.** From the command line:
   ```shell
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.sca.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   Or one of the following methods, depending on where your application runs:

   **Note:** Read-only file systems are not supported at this time. The application must have access to a writable `/tmp` directory.

   {{< tabs >}}
{{% tab "Docker CLI" %}}

Update your configuration container for APM by adding the following argument in your `docker run` command:


```shell
docker run [...] -e DD_APPSEC_SCA_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Add the following environment variable value to your container Dockerfile:

```Dockerfile
ENV DD_APPSEC_SCA_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Update your deployment configuration file for APM and add the SCA environment variable:

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_APPSEC_SCA_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

Update your ECS task definition JSON file, by adding this in the environment section:

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_SCA_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}
{{% tab "AWS Fargate" %}}

Set the `-Ddd.appsec.sca.enabled` flag or the `DD_APPSEC_SCA_ENABLED` environment variable to `true` in your service invocation:

```shell
java -javaagent:dd-java-agent.jar \
     -Ddd.appsec.sca.enabled=true \
     -jar <YOUR_SERVICE>.jar \
     <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}

   {{< /tabs >}}

## Data Retention

Datadog stores findings in accordance with our [Data Rentention Periods](https://docs.datadoghq.com/data_security/data_retention_periods/). Datadog does not store or retain customer source code.

[1]: /security/code_security/software_composition_analysis/setup_runtime/compatibility/java
[2]: /security/code_security/software_composition_analysis/setup_runtime/compatibility/
[3]: https://app.datadoghq.com/security/configuration/code-security/setup
