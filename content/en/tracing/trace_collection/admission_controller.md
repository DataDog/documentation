---
title: Injecting Libraries Using Admission Controller
kind: documentation
description: "Inject tracing libraries into applications using Cluster Agent and Admission Controller"
is_beta: true
---

{{< beta-callout url="#" btn_hidden="true">}}
  Tracing library injection using Admission Controller is in beta. 
{{< /beta-callout >}}

## Install Datadog Agent
First, configure the Datadog Agent. Our recommended method of installation for Kubernetes environments is via Helm Charts. Learn how to configure the [Datadog Agent in Kubernetes via Helm Charts][3] by reading our documentation.

## Unified Service Tagging
For your Kubernetes applications that send traces to Datadog Agent, you can configure the Datadog admission controller to inject Java, JavaScript and Python libraries automatically. To inject the Java and Javascript libraries, use Datadog Cluster Agent v7.39+. To inject the Python library, use Datadog Cluster Agent v7.40+.

We highly recommend using our Unified Service Tagging approach to connect your infrastructure, applications and logs to get the maximum value out of Datadog. Learn how to apply [Unified Service Tagging][4] to your services by reading our documentation.

## Annotate your Pods
By automating the injection of tracer libraries through the Admission Controller, you don't have to change your application images, helping you get up and running with APM quickly.

After you install the [Cluster Agent][1], do one of the following:
- Add the label `admission.datadoghq.com/enabled: "true"` to your pod.
- Configure the Cluster Agent admission controller by setting `mutateUnlabelled` (or `DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED`, depending on your configuration method) to `true`.

To opt-in your container for library injection, use Pod annotations inside your application's YAML file to specify language tracers and versions.

The annotations are a `key: value` pair in the following format:
```yaml
    admission.datadoghq.com/<language>-lib.version: <lib-version>
```

Adding this annotation results in the injection of the tracer library for that language and version into the containerized application.
Valid `<language>` values are:
- `java`
- `js`
- `python`

For example to inject the Java tracer v0.114.0:

```yaml
annotations:
    admission.datadoghq.com/java-lib.version: "v0.114.0"
```

**Note**: Use caution specifying `latest` as major library releases can introduce breaking changes.

Although it's an uncommon scenario, you can add multiple `<language>-lib.version` annotations to inject multiple language tracers into one container.

For example to inject the Java tracer v0.114.0, and Node tracer v3.6.0:
```yaml
annotations:
    admission.datadoghq.com/java-lib.version: "v0.114.0"
    admission.datadoghq.com/js-lib.version: "v3.6.0"
```

You can also inject the latest version of a tracer library for the Java and Python language via the following annotation:
```yaml
annotations:
    admission.datadoghq.com/java-lib.version: "latest"
    admission.datadoghq.com/python-lib.version: "latest"
```

**Note**: Use caution specifying `latest`, as it may raise errors because of major version differences between your newly injected applications and your existing applications that have already been deployed. 

Adding a `mutateUnlabelled: true` Agent config in the Helm chart causes the Cluster Agent to attempt to intercept every unlabelled pod.

To prevent pods from receiving environment variables, add the label `admission.datadoghq.com/enabled: "false"`. This works even if you set `mutateUnlabelled: true`.

If `mutateUnlabelled` is set to `false`, the pod label must be set to `admission.datadoghq.com/enabled: "true"`.

Possible options:

| mutateUnlabelled | Pod label                               | Injection |
|------------------|-----------------------------------------|-----------|
| `true`           | No label                                | Yes       |
| `true`           | `admission.datadoghq.com/enabled=true`  | Yes       |
| `true`           | `admission.datadoghq.com/enabled=false` | No        |
| `false`          | No label                                | No        |
| `false`          | `admission.datadoghq.com/enabled=true`  | Yes       |
| `false`          | `admission.datadoghq.com/enabled=false` | No        |

## Configure the Tracer from a Different Registry
You may pyll the APM library from a different registry using the `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` environment variable in the Datadog Cluster Agent.

The default value is set to `grc.io/datadoghq`. The supported values are `docker.io/datadog` and `public.ecr.aws/datadog`.

[1]: /containers/cluster_agent/setup/?tab=helm
[2]: /containers/cluster_agent/admission_controller/
[3]: /containers/kubernetes/installation/?tab=helm
[4]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes
