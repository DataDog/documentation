---
title: Linux
code_lang: linux
type: multi-code-lang
code_lang_weight: 2
further_reading:
- link: "/opentelemetry/setup/ddot_collector/install/linux"
  tag: "Documentation"
  text: "Install the DDOT Collector on Linux"
---

This guide explains how to build a DDOT Collector OCI package with additional OpenTelemetry components not included in the default DDOT Collector, for use on Linux bare-metal hosts. To see a list of components already included in the DDOT Collector by default, see [Included components][1].

## Prerequisites

To complete this guide, you need the following:

- [Docker][2]
- GitHub and access to the [Datadog Agent][3] source code that contains DDOT Collector.
- A private OCI-compatible container registry to host your custom package.
- The OpenTelemetry components you plan to include must be compatible with the DDOT Collector version.

**Recommended**:

- Familiarity with [building a custom collector][4] and [OpenTelemetry Collector Builder][5] (OCB).
- Basic understanding of the [Go](https://go.dev/) compilation process and [Go modules](https://go.dev/blog/using-go-modules).

## Store the desired Datadog Agent version in a shell variable

This ensures all files are compatible:

```shell
DD_AGENT_VERSION="7.78.0-rc.4"
```

## Download the Dockerfile

1. Go to your preferred file location in a terminal. Run the following commands to create a new folder (for example, named `agent-ddot`) and cd into it.
   ```shell
   mkdir -p agent-ddot
   cd agent-ddot
   ```
2. Download the Dockerfile:
   ```shell
   curl -o Dockerfile https://raw.githubusercontent.com/DataDog/datadog-agent/refs/tags/$DD_AGENT_VERSION/Dockerfiles/agent-ddot/Dockerfile.agent-otel
   ```

The Dockerfile:

- Uses Ubuntu 24.04 as the build environment.
- Installs Go and necessary dependencies.
- Downloads and unpacks the DDOT Collector source code.
- Builds the DDOT Collector (also known as OTel Agent).
- Builds the [`build-ddot-byoc`][6] tool, which replaces the `otel-agent` binary inside the source OCI package (`AGENT_OCI`) and pushes the result to `OUTPUT_OCI`.

## Create an OpenTelemetry Collector Builder manifest

Create and customize an OpenTelemetry Collector Builder (OCB) manifest file, which defines the components to be included in your custom DDOT Collector.

1. Download the Datadog default manifest:
   ```shell
   curl -o manifest.yaml https://raw.githubusercontent.com/DataDog/datadog-agent/refs/tags/$DD_AGENT_VERSION/comp/otelcol/collector-contrib/impl/manifest.yaml
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

## Build and push the DDOT Collector (Agent) package

The build process replaces the `otel-agent` binary inside the Datadog Agent OCI package and pushes the result directly to your registry using the `build-ddot-byoc` tool. This process must be repeated each time you update the Agent version to maintain compatibility with new Agent releases.

The build requires:
- `AGENT_OCI`: the source Datadog Agent OCI package URL (for example, `install.datadoghq.com/agent-package:7.78.0-1`)
- `OUTPUT_OCI`: your destination registry and image reference. The tag must exactly match the tag used in `AGENT_OCI` (for example, `<YOUR-REGISTRY>/agent-package:7.78.0-1`)

<div class="alert alert-warning">The tag for <code>OUTPUT_OCI</code> must exactly match the version tag of <code>AGENT_OCI</code>. The installer uses this tag to verify compatibility between the custom OCI package and the installed Agent version. A mismatched tag will cause the installation to fail.</div>

Choose one of the following authentication methods for your registry:

<div class="alert alert-info"><strong>Bug bash</strong>: Use the following command to build and push to the shared Datadog Sandbox registry:

```shell
REGISTRY_AUTH=password \
REGISTRY_USERNAME=oauth2accesstoken \
REGISTRY_PASSWORD=$(gcloud auth print-access-token) \
docker build . \
  --target builder \
  --build-arg REGISTRY_AUTH \
  --secret id=registry_username,env=REGISTRY_USERNAME \
  --secret id=registry_password,env=REGISTRY_PASSWORD \
  --build-arg AGENT_VERSION=$DD_AGENT_VERSION \
  --build-arg PACKAGE_TYPE=linux \
  --build-arg AGENT_OCI=install.datad0g.com/agent-package:${DD_AGENT_VERSION}-1 \
  --build-arg OUTPUT_OCI=us-central1-docker.pkg.dev/datadog-sandbox/ddot-byoc-linux/agent-package:${DD_AGENT_VERSION}-1
```
</div>

**Docker config file (default)**:
```shell
docker build . \
  --target builder \
  --secret id=dockerconfig,src=$HOME/.docker/config.json \
  --build-arg AGENT_VERSION=$DD_AGENT_VERSION \
  --build-arg PACKAGE_TYPE=linux \
  --build-arg AGENT_OCI=install.datadoghq.com/agent-package:${DD_AGENT_VERSION}-1 \
  --build-arg OUTPUT_OCI=<YOUR-REGISTRY>/agent-package:${DD_AGENT_VERSION}-1
```

**Google Cloud (GCR / Artifact Registry)**:
```shell
docker build . \
  --target builder \
  --build-arg AGENT_VERSION=$DD_AGENT_VERSION \
  --build-arg PACKAGE_TYPE=linux \
  --build-arg AGENT_OCI=install.datadoghq.com/agent-package:${DD_AGENT_VERSION}-1 \
  --build-arg OUTPUT_OCI=<YOUR-REGISTRY>/agent-package:${DD_AGENT_VERSION}-1 \
  --build-arg REGISTRY_AUTH=gcr
```

**Username and password**:
```shell
REGISTRY_AUTH=password \
REGISTRY_USERNAME=<YOUR-USERNAME> \
REGISTRY_PASSWORD=<YOUR-PASSWORD> \
docker build . \
  --target builder \
  --build-arg REGISTRY_AUTH \
  --secret id=registry_username,env=REGISTRY_USERNAME \
  --secret id=registry_password,env=REGISTRY_PASSWORD \
  --build-arg AGENT_VERSION=$DD_AGENT_VERSION \
  --build-arg PACKAGE_TYPE=linux \
  --build-arg AGENT_OCI=install.datadoghq.com/agent-package:${DD_AGENT_VERSION}-1 \
  --build-arg OUTPUT_OCI=<YOUR-REGISTRY>/agent-package:${DD_AGENT_VERSION}-1
```

The tool replaces the `otel-agent` binary inside the OCI package and pushes the result directly to `OUTPUT_OCI`. No separate `docker push` step is needed.

## Install the DDOT Collector (Agent) package

After the build completes, verify the custom `otel-agent` binary includes your additional components by installing the custom DDOT Collector package.

1. Edit the OpenTelemetry configuration file at `/etc/datadog-agent/otel-config.yaml` to include the additional components.
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
       sending_queue:
         batch:
           flush_timeout: 10s
           min_size:  100
           max_size: 1000

   connectors:
     datadog/connector:
       traces:

   service:
     pipelines:
       traces:
         receivers: [otlp]
         processors: [infraattributes]
         exporters: [datadog, datadog/connector]
       metrics:
         receivers: [otlp, datadog/connector, prometheus]
         processors: [metricstransform, infraattributes]
         exporters: [datadog]
       logs:
         receivers: [otlp]
         processors: [infraattributes]
         exporters: [datadog]
   ```
2. <div class="alert alert-info"><strong>Bug bash</strong>: Grant your VM access to datadog-sandbox

   Run the following to get the VM service account email:
   ```shell
   curl -s "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/email"    -H "Metadata-Flavor: Google"
   ```
   
   Run the following on your local machine to give the VM service account permissions:
   ```shell
   gcloud artifacts repositories add-iam-policy-binding ddot-byoc-linux \
     --location=us-central1 \
     --project=datadog-sandbox \
     --member="serviceAccount:<VM-SERVICE-ACCOUNT>" \
     --role="roles/artifactregistry.reader"
   ```
   </div>
3. Install the custom DDOT Collector package using the following commands:
   ```shell
   DD_INSTALLER_REGISTRY_AUTH=gcr DD_INSTALLER_REGISTRY_URL=install.datad0g.com
   sudo datadog-installer install "oci://us-central1-docker.pkg.dev/datadog-sandbox/ddot-byoc-linux/agent-package:${DD_AGENT_VERSION}-1"
   sudo datadog-installer extension install "oci://us-central1-docker.pkg.dev/datadog-sandbox/ddot-byoc-linux/agent-package:${DD_AGENT_VERSION}-1" ddot
   ```
4. If the DDOT Collector (Agent) starts, then the build process was successful.

## Troubleshooting

This section discusses some common issues you might encounter while building your custom DDOT Collector, along with their solutions:

### Compatibility issues with `awscontainerinsightreceiver`

**Problem**: You may encounter errors related to `awscontainerinsightreceiver` during the build:
```text
# github.com/opencontainers/runc/libcontainer/cgroups/ebpf
/go/pkg/mod/github.com/opencontainers/runc@v1.1.12/libcontainer/cgroups/ebpf/ebpf_linux.go:190:3: unknown field Replace in struct literal of type link.RawAttachProgramOptions
# github.com/open-telemetry/opentelemetry-collector-contrib/receiver/awscontainerinsightreceiver/internal/k8sapiserver
/go/pkg/mod/github.com/open-telemetry/opentelemetry-collector-contrib/receiver/awscontainerinsightreceiver@v0.115.0/internal/k8sapiserver/k8sapiserver.go:47:68: undefined: record.EventRecorderLogger
```

**Solution**: Remove `awscontainerinsightreceiver` from the `manifest.yaml` file. This receiver has incompatible libraries and cannot be included in the build.

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
[6]: https://github.com/DataDog/datadog-agent/tree/main/tools/build-ddot-byoc
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/metricstransformprocessor/README.md
