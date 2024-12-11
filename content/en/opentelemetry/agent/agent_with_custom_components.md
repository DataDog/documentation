---
title: Use Custom OpenTelemetry Components with Datadog Agent
private: true
further_reading:
- link: "/opentelemetry/agent/install_agent_with_collector"
  tag: "Documentation"
  text: "Use Custom OpenTelemetry Components with Datadog Agent"
---

{{< callout url="https://www.datadoghq.com/private-beta/agent-with-embedded-opentelemetry-collector/" btn_hidden="false" header="Join the Preview!">}}
  The Datadog Agent with embedded OpenTelemetry Collector is in Preview. To request access, fill out this form.
{{< /callout >}}

This guide explains how to build a Datadog Agent image with additional OpenTelemetry components not included in the default Datadog Agent. To see a list of components already included in the Agent by default, see [Included components][1].

## Prerequisites

To complete this guide, you need the following:

- [Docker][2]
- GitHub and access to the [Datadog Agent][3] source code.
- The OpenTelemetry components you plan to include in the Agent must be compatible with embedded OpenTelemetry Collector version.

**Recommended**:

- Familiarity with [building a custom collector][4] and [OpenTelemetry Collector Builder][5] (OCB).
- Basic understanding of the [Go](https://go.dev/) compilation process and [Go modules](https://go.dev/blog/using-go-modules).

## Download the Dockerfile

Download the Dockerfile template:

1. Go to your preferred file location in a terminal. Run the following commands to create a new folder (for example, named `agent-with-otel`) and cd into it.
   ```shell
   mkdir -p agent-with-otel
   cd agent-with-otel
   ```
2. Download the Dockerfile
   ```shell
   curl -o Dockerfile https://raw.githubusercontent.com/DataDog/datadog-agent/main/Dockerfiles/agent-ot/Dockerfile.agent-otel
   ```

The Dockerfile:

- Creates a [multi-stage build][6] with Ubuntu 24.04 and `datadog/agent:7.59.0-v1.1.0-ot-beta-jmx`.
- Installs Go, Python, and necessary dependencies.
- Downloads and unpacks the Datadog Agent source code.
- Creates a virtual environment and installs required Python packages.
- Builds the OpenTelemetry agent and copies the resulting binary to the final image.

## Create an OpenTelemetry Collector Builder manifest

Create and customize an OpenTelemetry Collector Builder (OCB) manifest file, which defines the components to be included in your custom Datadog Agent.

1. Download the Datadog default manifest:
   ```shell
   curl -o manifest.yaml https://raw.githubusercontent.com/DataDog/datadog-agent/7.59.x/comp/otelcol/collector-contrib/impl/manifest.yaml
   ```
2. Open the `manifest.yaml` file and add the additional OpenTelemetry components to the corresponding sections (extensions, exporters, processors, receivers, or connectors).
   The highlighted line in this example adds a [metrics transform processor][7]:
   {{< highlight json "hl_lines=19" >}}
dist:
  module: github.com/DataDog/comp/otelcol/collector-contrib
  name: otelcol-contrib
  description: Datadog OpenTelemetry Collector
  version: 0.104.0
  output_path: ./comp/otelcol/collector-contrib/impl
  otelcol_version: 0.104.0

extensions:
# You will see a list of extensions already included by Datadog
# Add your desired extensions here

exporters:
# You will see a list of exporters already included by Datadog
# Add your desired exporters here

processors:
# adding metrics transform processor to modify metrics
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/processor/metricstransformprocessor v0.104.0

receivers:
  - gomod: go.opentelemetry.io/collector/receiver/nopreceiver v0.104.0
  - gomod: go.opentelemetry.io/collector/receiver/otlpreceiver v0.104.0
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/filelogreceiver v0.104.0
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/fluentforwardreceiver v0.104.0
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/hostmetricsreceiver v0.104.0
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/jaegerreceiver v0.104.0
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/prometheusreceiver v0.104.0
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/receivercreator v0.104.0
  - gomod: github.com/open-telemetry/opentelemetry-collector-contrib/receiver/zipkinreceiver v0.104.0

connectors:
# You will see a list of connectors already included by Datadog
# Add your desired connectors here
{{< /highlight >}}
1. Save your changes to the manifest file.

## Build and push the Agent image

Build your custom Datadog Agent image and push it to a container registry.

1. Build the image with Docker:
   ```shell
   docker build . -t agent-otel --no-cache
   ```
2. Tag and push the image:
   ```shell
   docker tag agent-otel <IMAGE-NAME>/<IMAGE-TAG>
   docker push <IMAGE-NAME>/<IMAGE-TAG>
   ```
   Replace `<IMAGE-NAME>` and `<IMAGE-TAG>` with your image name and desired tag. If the target repository is not Docker Hub, you need to include the repository name.
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

Create a sample configuration file and run your custom Agent to ensure everything is working correctly.

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
             compute_top_level_by_span_kind: true
             peer_tags_aggregation: true
             compute_stats_by_span_kind: true

   service:
     pipelines:
       metrics:
         receivers: [otlp, datadog/connector]
         processors: [metricstransform, batch]
         exporters: [datadog]
       traces:
         receivers: [otlp]
         processors: [batch]
         exporters: [datadog/connector]
       traces/2:
         receivers: [datadog/connector]
         processors: [batch]
         exporters: [datadog]
       logs:
         receivers: [otlp]
         processors: [batch]
         exporters: [datadog]
   ```
2. Run the Agent using the following Docker command.
   ```shell
   docker run -it \
     -e DD_API_KEY=XX \
     -e DD_SITE=datadoghq.com \
     -e DD_HOSTNAME=datadog \
     -v $(pwd)/config.yaml:/config.yaml \
     -p 4317:4317 \
     -p 4318:4318 \
     --entrypoint otel-agent \
     agent-otel --config /config.yaml
   ```
3. If the Agent starts, then the build process was successful.

You can now use this new image to install the Agent. This enables Datadog monitoring capabilities along with the additional OpenTelemetry components you've added.

For detailed instructions on installing and configuring the Agent with added OpenTelemetry components, see the [Install the Datadog Agent with Embedded OpenTelemetry Collector][9] guide.

## Troubleshooting

This section discusses some common issues you might encounter while building and running your custom Datadog Agent, along with their solutions:

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
#0 89.14 /go/pkg/mod/github.com/open-telemetry/opentelemetry-collector-contrib/receiver/awscontainerinsightreceiver@v0.104.0/internal/k8sapiserver/k8sapiserver.go:47:68: undefined: record.EventRecorderLogger
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
[9]: /opentelemetry/agent/install_agent_with_collector
