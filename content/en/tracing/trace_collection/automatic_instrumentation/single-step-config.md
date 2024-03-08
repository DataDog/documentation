---
title: Configuring Single Step Instrumentation
kind: documentation
is_beta: true
further_reading:
  - link: /tracing/metrics/runtime_metrics/
    tag: Documentation
    text: Enable Runtime Metrics
---

This page covers configuration options for Single Step Instrumentation. For instructions on enabling Single Step Instrumentation, read [Enabling Single Step Instrumentation][3].

{{< tabs >}}
{{% tab "Linux host or VM" %}}

### Specifying tracing library versions {#lib-linux}

By default, enabling APM on your server installs support for Java, Python, Ruby, Node.js, and .NET Core services. If you only have services implemented in some of these languages, set `DD_APM_INSTRUMENTATION_LIBRARIES` in your one-line installation command:

```shell
DD_APM_INSTRUMENTATION_LIBRARIES="java:1.25.0,python" DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_ENV=staging bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
```

You can optionally provide a version number for the tracing library by placing a colon after the language name and specifying the tracing library version. If you don't specify a version, it defaults to the latest version. Language names are comma-separated.

Supported languages include:

- .NET (`dotnet`)
- Python (`python`)
- Java (`java`)
- Node.js (`js`)
- Ruby (`ruby`)

**Note**: For the Node.js tracing library, different versions of Node.js are compatible with different versions of the Node.js tracing library. See [DataDog/dd-trace-js: JavaScript APM Tracer][6] for more information.

### Tagging observability data by environment {#env-linux}

Set `DD_ENV` in your one-line installation command for Linux to automatically tag instrumented services and other telemetry that pass through the Agent with a specific environment. For example, if the Agent is installed in your staging environment, set `DD_ENV=staging` to associate your observability data with `staging`.

For example:

```shell
DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_ENV=staging bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
```

[2]: /agent/remote_config
[3]: /getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /tracing/service_catalog/
[6]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance

{{% /tab %}}

{{% tab "Docker" %}}

### Specifying tracing library versions {#lib-docker}

By default, enabling APM on your server installs support for Java, Python, Ruby, Node.js, and .NET services. If you only have services implemented in some of these languages, set `DD_APM_INSTRUMENTATION_LIBRARIES` when running the installation script.

For example, to install support for only v1.25.0 of the Java tracing library and the latest Python tracing library, add the following to the installation command:

```shell
DD_APM_INSTRUMENTATION_LIBRARIES="java:1.25.0,python" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_docker_injection.sh)"
```

You can optionally provide a version number for the tracing library by placing a colon after the language name and specifying the tracing library version. If you don't specify a version, it defaults to the latest version. Language names are comma-separated.

Supported languages include:

- .NET (`dotnet`)
- Python (`python`)
- Java (`java`)
- Node.js (`js`)
- Ruby (`ruby`)

**Note**: For the Node.js tracing library, different versions of Node.js are compatible with different versions of the Node.js tracing library. See [DataDog/dd-trace-js: JavaScript APM Tracer][7] for more information.

### Tagging observability data by environment {#env-docker}

Set `DD_ENV` in the library injector installation command for Docker to automatically tag instrumented services and other telemetry that pass through the Agent with a specific environment. For example, if the Agent is installed in your staging environment, set `DD_ENV=staging` to associate your observability data with `staging`.

For example:

{{< highlight shell "hl_lines=4" >}}
docker run -d --name dd-agent \
  -e DD_API_KEY=${YOUR_DD_API_KEY} \
  -e DD_APM_ENABLED=true \
  -e DD_ENV=staging \
  -e DD_APM_NON_LOCAL_TRAFFIC=true \
  -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
  -e DD_APM_RECEIVER_SOCKET=/opt/datadog/apm/inject/run/apm.socket \
  -e DD_DOGSTATSD_SOCKET=/opt/datadog/apm/inject/run/dsd.socket \
  -v /opt/datadog/apm:/opt/datadog/apm \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  gcr.io/datadoghq/agent:7
{{< /highlight >}}

[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /tracing/service_catalog/
[7]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance


{{% /tab %}}

{{% tab "Kubernetes" %}}

### Enabling or disabling instrumentation for namespaces

You can choose to selectively instrument specific namespaces or choose to not instrument them.

To enable instrumentation for specific namespaces, replace `enabled: true` with `enabledNamespaces` configuration in your `datadog-values.yaml` file:
{{< highlight yaml "hl_lines=6-8" >}}
      datadog:
        apiKeyExistingSecret: datadog-secret
        site: <DATADOG_SITE>
        apm:
          instrumentation:
            enabledNamespaces: # Add namespaces to instrument
               - namespace_1
               - namespace_2
 {{< /highlight >}}

<div class="alert alert-info">The <code>enabled: true</code> option enables instrumentation for the entire cluster. You need to remove this to only enable instrumentation for specific namespaces.</a></div>

To disable instrumentation for specific namespaces, add the `disabledNamespaces` configuration to your `datadog-values.yaml` file:
{{< highlight yaml "hl_lines=7-9" >}}
   datadog:
     apiKeyExistingSecret: datadog-secret
     site: <DATADOG_SITE>
     apm:
       instrumentation:
         enabled: true
         disabledNamespaces: # Add namespaces to not instrument
            - namespace_1
            - namespace_2
{{< /highlight >}}

### Specifying tracing library versions

You can optionally set specific tracing library versions to use. If you don't specify a version, it defaults to the latest version. To find the latest version for a library, go to **Releases** in the dd-trace-&lt;language&gt; GitHub repo. For example, [dd-trace-dotnet releases][15].

To set specific tracing library versions, add the following configuration to your `datadog-values.yaml` file:
{{< highlight yaml "hl_lines=7-12" >}}
   datadog:
     apiKeyExistingSecret: datadog-secret
     site: <DATADOG_SITE>
     apm:
       instrumentation:
         enabled: true
         libVersions: # Add any versions you want to set
            dotnet: v2.46.0
            python: v1.20.6
            java: v1.22.0
            js: v4.17.0
            ruby: v1.15.0
{{< /highlight >}}

Supported languages include:

- .NET (`dotnet`)
- Python (`python`)
- Java (`java`)
- Node.js (`js`)
- Ruby (`ruby`)

### Tagging observability data by environment {#env-k8}

Automatically tag instrumented services and other telemetry that pass through the Agent with a specific environment. For example, if the Agent is installed in your staging environment, set `env:staging` to associate your observability data with `staging`.

For example, add the following configuration to your `datadog-values.yaml` file:
{{< highlight yaml "hl_lines=4-5" >}}
   datadog:
     apiKeyExistingSecret: datadog-secret
     site: <DATADOG_SITE>
     tags:
         - env:staging
     apm:
       instrumentation:
         enabled: true
{{< /highlight >}}

[15]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /agent/remote_config
[3]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/
