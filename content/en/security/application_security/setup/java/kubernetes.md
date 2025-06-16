---
title: Setup App and API Protection for Java in Kubernetes
code_lang: kubernetes
type: multi-code-lang
code_lang_weight: 20
further_reading:
- link: "/security/application_security/how-it-works/"
  tag: "Documentation"
  text: "How App and API Protection Works"
- link: "/security/default_rules/?category=cat-application-security"
  tag: "Documentation"
  text: "OOTB App and API Protection Rules"
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting App and API Protection"
---
{{< callout url="#" btn_hidden="true" header="false" >}}
You can enable App and API Protection for Java services with the following setup options:

1. If your Java service already has APM tracing, then skip to <a href="#2-configuring-your-java-application">service configuration</a>
2. Else, you can easily enable App and API Protection with Datadog's <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes/">Single Step Instrumentation</a>
3. Otherwise, keep reading for manual instructions
{{< /callout >}}

{{< partial name="app_and_api_protection/java/navigation_menu.html" >}}

{{% app_and_api_protection_java_overview %}}

## Prerequisites

- Kubernetes cluster
- Java application containerized with Docker
- kubectl configured to access your cluster
- Helm (recommended for Agent installation)
- Your Datadog API key
- Datadog Java tracing library (see version requirements [here][1])

## 1. Installing the Datadog Agent

Install the Datadog Agent by following the [setup instructions for Kubernetes](/agent/?tab=cloud_and_container).

## 2. Enabling App and API Protection monitoring
{{< partial name="app_and_api_protection/java/navigation_menu.html" >}}
{{% appsec-remote-config-activation %}}

### Manually enabling App and API Protection monitoring

Download the latest version of the Datadog Java library:

```dockerfile
ADD 'https://dtdg.co/latest-java-tracer' /dd-java-agent.jar
```

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}
{{< tabs >}}
{{% tab "Using command-line arguments" %}}

Start your Java application with the Datadog agent and App and API Protection enabled using command-line arguments:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-java-app
spec:
  template:
    spec:
      containers:
      - name: your-java-app
        image: your-java-app-image
        command: ["java"]
        args: ["-javaagent:/dd-java-agent.jar", "-Ddd.appsec.enabled=true", "-Ddd.service=<MY_SERVICE>", "-Ddd.env=<MY_ENV>", "-jar", "/app.jar"]
```

{{% /tab %}}
{{% tab "Using environment variables" %}}

Start your Java application with App and API Protection enabled using environment variables:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-java-app
spec:
  template:
    spec:
      containers:
      - name: your-java-app
        image: your-java-app-image
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
        command: ["java"]
        args: ["-javaagent:/dd-java-agent.jar", "-jar", "/app.jar"]
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h4" %}}
To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing variable to false.
{{< tabs >}}
{{% tab "Using command-line arguments" %}}

Start your Java application with the Datadog agent and App and API Protection enabled using command-line arguments:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-java-app
spec:
  template:
    spec:
      containers:
      - name: your-java-app
        image: your-java-app-image
        command: ["java"]
        args: ["-javaagent:/dd-java-agent.jar", "-Ddd.appsec.enabled=true", "-Ddd.apm.tracing.enabled=false", "-Ddd.service=<MY_SERVICE>", "-Ddd.env=<MY_ENV>", "-jar", "/app.jar"]
```

{{% /tab %}}
{{% tab "Using environment variables" %}}

Start your Java application with App and API Protection enabled using environment variables:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-java-app
spec:
  template:
    spec:
      containers:
      - name: your-java-app
        image: your-java-app-image
        env:
        - name: DD_APPSEC_ENABLED
          value: "true"
        - name: DD_APM_TRACING_ENABLED
          value: "false"
        - name: DD_SERVICE
          value: "<MY_SERVICE>"
        - name: DD_ENV
          value: "<MY_ENV>"
        command: ["java"]
        args: ["-javaagent:/dd-java-agent.jar", "-jar", "/app.jar"]
```

{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

## 3. Run your application

Apply your updated deployment:

```bash
kubectl apply -f your-deployment.yaml
```


{{% app_and_api_protection_verify_setup %}}

## Troubleshooting

If you encounter issues while setting up App and API Protection for your Java application, see the [Java App and API Protection troubleshooting guide][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/java/compatibility
[2]: /security/application_security/setup/java/troubleshooting
