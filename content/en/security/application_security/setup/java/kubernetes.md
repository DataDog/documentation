---
title: Set up App and API Protection for Java in Kubernetes
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
{{% app_and_api_protection_java_setup_options platform="kubernetes" %}}

{{% app_and_api_protection_java_overview %}}

## Prerequisites

- Kubernetes cluster
- Java application containerized with Docker
- kubectl configured to access your cluster
- Helm (recommended for Agent installation)
- Your Datadog API key
- Datadog Java tracing library (see version requirements [here][1])

## 1. Installing the Datadog Agent

Install the Datadog Agent by following the [setup instructions for Kubernetes][3].

## 2. Enabling App and API Protection monitoring

{{% app_and_api_protection_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Manually enabling App and API Protection monitoring

Download the latest version of the Datadog Java library using an init container:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-java-app
spec:
  template:
    spec:
      initContainers:
      - name: download-agent
        image: busybox
        command: ['sh', '-c', 'wget -O /shared/dd-java-agent.jar https://dtdg.co/latest-java-tracer']
        volumeMounts:
        - name: agent-volume
          mountPath: /shared
      volumes:
      - name: agent-volume
        emptyDir: {}
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
        volumeMounts:
        - name: agent-volume
          mountPath: /dd-java-agent.jar
          subPath: dd-java-agent.jar
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
        volumeMounts:
        - name: agent-volume
          mountPath: /dd-java-agent.jar
          subPath: dd-java-agent.jar
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
        volumeMounts:
        - name: agent-volume
          mountPath: /dd-java-agent.jar
          subPath: dd-java-agent.jar
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
        volumeMounts:
        - name: agent-volume
          mountPath: /dd-java-agent.jar
          subPath: dd-java-agent.jar
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
[3]: /agent/?tab=cloud_and_container
