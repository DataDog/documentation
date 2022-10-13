---
title: Injecting Libraries Using Admission Controller
kind: documentation
description: "Inject tracing libraries into applications using Cluster Agent and Admission Controller"
is_beta: true
---

{{< beta-callout url="#" btn_hidden="true">}}
  Tracing library injection using Admission Controller is in beta. 
{{< /beta-callout >}} 

For your Kubernetes applications that send traces to Datadog by the Cluster Agent (version 7.39 and higher), you can configure the Admission Controller to inject APM Java and JavaScript tracing libraries automatically.

After you [install the Cluster Agent][1], do one of the following:
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

For example to inject the latest Java tracer:

```yaml
annotations:
    admission.datadoghq.com/java-lib.version: "latest"
```

**Note**: Use caution specifying `latest` as major library releases can introduce breaking changes.

Although it's an uncommon scenario, you can add multiple `<language>-lib.version` annotations to inject multiple language tracers into one container.

For example to inject the latest Java tracer and Node tracer v3.0.0:
```yaml
annotations:
    admission.datadoghq.com/java-lib.version: "latest"
    admission.datadoghq.com/js-lib.version: "3.0.0"
```

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
