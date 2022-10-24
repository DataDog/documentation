---
title: Injecting Libraries Using Admission Controller
kind: documentation
description: "Inject tracing libraries into applications using Cluster Agent and Admission Controller"
is_beta: true
---

{{< beta-callout url="#" btn_hidden="true">}}
  Tracing library injection using Admission Controller is in beta. 
{{< /beta-callout >}}

In most environments, configuring your application to send traces to Datadog involves two steps:
- Configuring the Datadog Agent for APM.
- Adding the Datadog Tracing Library to your code.

For your Kubernetes applications that send traces to Datadog by the Cluster Agent (version 7.39 and higher for Java and JavaScript, version 7.40 and higher for Python), you can configure the Admission Controller to inject APM Java and JavaScript tracing libraries automatically.

By automating the injection of tracer libraries through the admission controller, you don't have to change your application images, helping you get up and running with APM quickly.

After you install the Datadog Agent, and then the [Cluster Agent][1], do one of the following:
- Add the label `admission.datadoghq.com/enabled: "true"` to your pod.
- Configure the Cluster Agent admission controller by setting `mutateUnlabelled` (or `DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED`, depending on your configuration method) to `true`.

Read [Admission Controller][2] for more information about configuring the Admission Controller.

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

For example to inject the Java tracer v1.0.0:

```yaml
annotations:
    admission.datadoghq.com/java-lib.version: "1.0.0"
```

**Note**: Use caution specifying `latest` as major library releases can introduce breaking changes.

Although it's an uncommon scenario, you can add multiple `<language>-lib.version` annotations to inject multiple language tracers into one container.

For example to inject the Java tracer v1.0.0, Python tracer v1.0.0, and Node tracer v3.0.0:
```yaml
annotations:
    admission.datadoghq.com/java-lib.version: "1.0.0"
    admission.datadoghq.com/python-lib.version: "1.0.0"
    admission.datadoghq.com/js-lib.version: "3.0.0"
```

You can also inject the latest version of a tracer library for the Java, Python and Node language via the following annotation:
```yaml
annotations:
    admission.datadoghq.com/java-lib.version: "latest"
    admission.datadoghq.com/python-lib.version: "latest"
    admission.datadoghq.com/js-lib.version: "latest"
```

Note that the latest keyword should be used with caution, as it may risk potential errors due to major version differences from your newly injected applications versus your existing applications that have already been deployed. 

Adding a `mutateUnlabelled: true` annotation causes the cluster agent to attempt to intercept every unlabelled pod.

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


[1]: /containers/cluster_agent/
[2]: /containers/cluster_agent/admission_controller/
