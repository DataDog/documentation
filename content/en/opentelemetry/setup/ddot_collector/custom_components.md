---
title: Use Custom OpenTelemetry Components with Datadog Distribution of OpenTelemetry (DDOT) Collector
aliases:
- "/opentelemetry/agent/agent_with_custom_components"
further_reading:
- link: "/opentelemetry/setup/ddot_collector/install/"
  tag: "Documentation"
  text: "Use Custom OpenTelemetry Components with DDOT Collector"
---

This guide explains how to build a DDOT Collector image with additional OpenTelemetry components not included in the default DDOT Collector. To see a list of components already included in the DDOT Collector by default, see [Included components][1].

## Prerequisites

To complete this guide, you need the following:

- [Docker][2]
- GitHub and access to the [Datadog Agent][3] source code that contains DDOT Collector.
- The OpenTelemetry components you plan to include in the Agent source code must be compatible with DDOT Collector version.

**Recommended**:

- Familiarity with [building a custom collector][4] and [OpenTelemetry Collector Builder][5] (OCB).
- Basic understanding of the [Go](https://go.dev/) compilation process and [Go modules](https://go.dev/blog/using-go-modules).

## Download the Dockerfile

Download the Dockerfile template:

1. Go to your preferred file location in a terminal. Run the following commands to create a new folder (for example, named `agent-ddot`) and cd into it.
   ```shell
   mkdir -p agent-ddot
   cd agent-ddot
   ```
2. Download the Dockerfile
   ```shell
   curl -o Dockerfile https://raw.githubusercontent.com/DataDog/datadog-agent/refs/tags/{{< version key="agent_version" >}}/Dockerfiles/agent-ddot/Dockerfile.agent-otel
   ```

The Dockerfile:

- Creates a [multi-stage build][6] with Ubuntu 24.04 and `datadog/agent:{{% version key="agent_tag" %}}`.
- Installs Go, Python, and necessary dependencies.
- Downloads and unpacks the DDOT Collector source code.
- Creates a virtual environment and installs required Python packages.
- Builds the DDOT Collector (also known as OTel Agent) and copies the resulting binary to the final image.

<div class="alert alert-info">The <code>main</code> branch has the most up-to-date version of the <a href="https://github.com/DataDog/datadog-agent/blob/main/Dockerfiles/agent-ddot/Dockerfile.agent-otel">Dockerfile</a>. However, it is a development branch that is subject to frequent changes and is less stable than the release tags. For production and other stable use cases, use the tagged versions as listed in this guide.</div>

## Create an OpenTelemetry Collector Builder manifest

Create and customize an OpenTelemetry Collector Builder (OCB) manifest file, which defines the components to be included in your custom Datadog Agent.

1. Download the Datadog default manifest:
   ```shell
   curl -o manifest.yaml https://raw.githubusercontent.com/DataDog/datadog-agent/refs/tags/{{< version key="agent_version" >}}/comp/otelcol/collector-contrib/impl/manifest.yaml
   ```
2. Open the `manifest.yaml` file and add the additional OpenTelemetry components to the corresponding sections (extensions, exporters, processors, receivers, or connectors).
   The highlighted line in this example adds a [metrics transform processor][7]:
   {{< highlight json "hl_lines=22" >}}
connectors:
# You will see a list of connectors already included by Datadog
# Add your desired connectors here

dist:
  description: Datadog OpenTelemetry Collector
  module: github.com/DataDog/datadog-agent/comp/otelcol/collector-contrib/impl
  name: otelcol-contrib
  output_path: ./comp/otelcol/collector-contrib/impl
  version: {{< version key="collector_version" >}}

exporters:
# You will see a list of exporters already included by Datadog
# Add your desired exporters here

extensions:
# You will see a list of extensions already included by Datadog
# Add your desired extensions here

processors:
# adding metrics transform processor to modify metrics
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/processor/metricstransformprocessor v{{< version key="collector_version" >}}

providers:
# You will see a list of config providers already included by Datadog
# Add your desired providers here

receivers:
# You will see a list of receivers already included by Datadog
# Add your desired receivers here

replaces:
# You will see a list of go module replacements included by Datadog
# Add your desired dependency overrides here
{{< /highlight >}}
1. Save your changes to the manifest file.

## Build and push the DDOT Collector (Agent) image

The custom DDOT Collector (Agent) image you build needs to be stored in your organization's private container registry for your clusters to access it. Additionally, this build process must be repeated each time you update the Agent version to maintain compatibility with new Agent releases.

Build your custom Datadog Agent image and push it to a container registry.

1. Build the image with Docker:
   ```shell
   docker build . -t agent-ddot --no-cache \
     --build-arg AGENT_REPO="datadog/agent" \
     --build-arg AGENT_VERSION="{{< version key="agent_tag" >}}" \
     --build-arg AGENT_BRANCH="{{< version key="agent_branch" >}}"
   ```
2. Tag and push the image:
   ```shell
   docker tag agent-ddot datadog/agent:<IMAGE-TAG>
   docker push datadog/agent:<IMAGE-TAG>
   ```
   Ensure your custom image name is `datadog/agent` to guarantee that all platform features work correctly. If the target repository is not Docker Hub, you need to include the repository name:
   ```shell
   docker push <REPOSITORY-NAME>/datadog/agent:<IMAGE-TAG>
   ```

3. For a Helm chart installation, set the image tag in your values file:
   {{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
agents:
  image:
    repository: <YOUR-REPO>
    tag: <IMAGE-TAG>
    doNotCheckTag: true
   {{< /code-block >}}
   Replace `<YOUR-REPO>` and `<IMAGE-TAG>` with your repository name and desired image tag.

## Test and validate

Create a sample configuration file and run your custom DDOT Collector (Agent) to ensure everything is working correctly.

1. Create a sample OpenTelemetry configuration file with the additional components.
  The following example configures an additional [metrics transform processor][7]:
   ```yaml
   receivers:
     otlp:
       protocols:
         http:
           endpoint: "0.0.0.0:4318"
         grpc:
           endpoint: "0.0.0.0:4317"

   processors:
     batch:
       send_batch_max_size: 1000
       send_batch_size: 100
       timeout: 10s
     # Rename system.cpu.usage to system.cpu.usage_time
     metricstransform:
       transforms:
         - include: system.cpu.usage
           action: update
           new_name: system.cpu.usage_time

   exporters:
     datadog:
       api:
         site: ${env:DD_SITE}
         key: ${env:DD_API_KEY}

   connectors:
     datadog/connector:
       traces:

   service:
     pipelines:
       traces:
         receivers: [otlp]
         processors: [infraattributes, batch]
         exporters: [datadog, datadog/connector]
       metrics:
         receivers: [otlp, datadog/connector, prometheus]
         processors: [metricstransform, infraattributes, batch]
         exporters: [datadog]
       logs:
         receivers: [otlp]
         processors: [infraattributes, batch]
         exporters: [datadog]
   ```
2. Run the DDOT Collector (Agent) using the following Docker command.
   ```shell
   docker run -it \
     -e DD_API_KEY=XX \
     -e DD_SITE=datadoghq.com \
     -e DD_HOSTNAME=datadog \
     -v $(pwd)/config.yaml:/config.yaml \
     -p 4317:4317 \
     -p 4318:4318 \
     --entrypoint otel-agent \
     agent-ddot --config /config.yaml
   ```
3. If the DDOT Collector (Agent) starts, then the build process was successful.

You can now use this new image to install the DDOT Collector. This enables Datadog monitoring capabilities along with the additional OpenTelemetry components you've added.

For detailed instructions on installing and configuring the DDOT Collector with added OpenTelemetry components, see the [Install the Datadog Distribution of OTel Collector][9] guide.

## Troubleshooting

This section discusses some common issues you might encounter while building and running your custom DDOT Collector, along with their solutions:

### Compatibility issues with `awscontainerinsightreceiver`

**Problem**: You may encounter errors related to `awscontainerinsightreceiver` during the build:
```text
#0 0.879 go: downloading github.com/tidwall/gjson v1.17.1
#0 0.889 go: downloading code.cloudfoundry.org/go-diodes v0.0.0-20240604201846-c756bfed2ed3
#0 0.916 go: downloading github.com/hashicorp/go-retryablehttp v0.7.5
#0 0.940 go: downloading github.com/tidwall/pretty v1.2.1
#0 88.24 # github.com/opencontainers/runc/libcontainer/cgroups/ebpf
#0 88.24 /go/pkg/mod/github.com/opencontainers/runc@v1.1.12/libcontainer/cgroups/ebpf/ebpf_linux.go:190:3: unknown field Replace in struct literal of type link.RawAttachProgramOptions
#0 89.14 # github.com/open-telemetry/opentelemetry-collector-contrib/receiver/awscontainerinsightreceiver/internal/k8sapiserver
#0 89.14 /go/pkg/mod/github.com/open-telemetry/opentelemetry-collector-contrib/receiver/awscontainerinsightreceiver@v0.115.0/internal/k8sapiserver/k8sapiserver.go:47:68: undefined: record.EventRecorderLogger
------
```

**Solution**: Remove `awscontainerinsightreceiver` from the `manifest.yaml` file. This receiver has incompatible libraries and cannot be included in the build.

### Build process failures

**Problem**: You receive the following error:
```text
ERROR: failed to solve: process "/bin/sh -c . venv/bin/activate && invoke otel-agent.build" did not complete successfully: chown /var/lib/docker/overlay2/r75bx8o94uz6t7yr3ae6gop0b/work/work: no such file or directory
```

**Solution**: Run the build command again:
```shell
docker build . -t agent-otel --no-cache
```

### Insufficient disk space

**Problem**: You may encounter errors related to insufficient disk space, such as:
```text
no space left on device
```

**Solution**: Clear up Docker space:
```shell
docker system prune -a
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/agent/#included-components
[2]: https://docs.docker.com/engine/install/
[3]: https://github.com/DataDog/datadog-agent
[4]: https://opentelemetry.io/docs/collector/custom-collector/
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/cmd/builder/README.md
[6]: https://docs.docker.com/build/building/multi-stage/
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/metricstransformprocessor/README.md
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/jmxreceiver/README.md
[9]: /opentelemetry/setup/ddot_collector/install/
