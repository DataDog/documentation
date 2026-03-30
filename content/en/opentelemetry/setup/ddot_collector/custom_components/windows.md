---
title: Use Custom OpenTelemetry Components with Datadog Distribution of OpenTelemetry (DDOT) Collector
code_lang: windows
type: multi-code-lang
code_lang_weight: 3
further_reading:
- link: "/opentelemetry/setup/ddot_collector/install/windows"
  tag: "Documentation"
  text: "Install the DDOT Collector on Windows"
---

This guide explains how to build a custom DDOT Collector OCI package with additional OpenTelemetry components not included in the default DDOT Collector, for use on Windows bare-metal hosts. To see a list of components already included in the DDOT Collector by default, see [Included components][1].

## Prerequisites

To complete this guide, you need the following:

- [Docker][2] (running on Linux or macOS — the cross-compilation runs inside the build container)
- GitHub and access to the [Datadog Agent][3] source code that contains DDOT Collector.
- A private OCI-compatible container registry to host your custom package.
- The OpenTelemetry components you plan to include must be compatible with the DDOT Collector version.

**Recommended**:

- Familiarity with [building a custom collector][4] and [OpenTelemetry Collector Builder][5] (OCB).
- Basic understanding of the [Go](https://go.dev/) compilation process and [Go modules](https://go.dev/blog/using-go-modules).

## Store the desired Datadog Agent version in a shell variable

This ensures all files are compatible:

```shell
DD_AGENT_VERSION="{{< version key="agent_version" >}}"
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

## Create an OpenTelemetry Collector Builder manifest

Create and customize an OpenTelemetry Collector Builder (OCB) manifest file, which defines the components to be included in your custom DDOT Collector.

1. Download the Datadog default manifest:
   ```shell
   curl -o manifest.yaml https://raw.githubusercontent.com/DataDog/datadog-agent/refs/tags/$DD_AGENT_VERSION/comp/otelcol/collector-contrib/impl/manifest.yaml
   ```
2. Open the `manifest.yaml` file and add the additional OpenTelemetry components to the corresponding sections (extensions, exporters, processors, receivers, or connectors).
   The highlighted line in this example adds a [metrics transform processor][6]:
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

## Build and push the custom OCI package

The build process cross-compiles `otel-agent.exe` on Linux and replaces the binary inside the Datadog Agent OCI package for Windows, then pushes the result directly to your registry using the `build-ddot-byoc` tool. This process must be repeated each time you update the Agent version.

The build requires:
- `AGENT_OCI`: the source Datadog Agent OCI package URL (for example, `install.datadoghq.com/agent-package:${DD_AGENT_VERSION}-1`)
- `OUTPUT_OCI`: your destination registry and image reference. The tag must exactly match the tag used in `AGENT_OCI` (for example, `<YOUR-REGISTRY>/agent-package:${DD_AGENT_VERSION}-1`)

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
  --build-arg PACKAGE_TYPE=windows \
  --build-arg AGENT_OCI=install.datad0g.com/agent-package:${DD_AGENT_VERSION}-1 \
  --build-arg OUTPUT_OCI=us-central1-docker.pkg.dev/datadog-sandbox/ddot-byoc-windows/agent-package:${DD_AGENT_VERSION}-1
```
</div>

**Docker config file (default)**:
```shell
docker build . \
  --target builder \
  --secret id=dockerconfig,src=$HOME/.docker/config.json \
  --build-arg AGENT_VERSION=$DD_AGENT_VERSION \
  --build-arg PACKAGE_TYPE=windows \
  --build-arg AGENT_OCI=install.datadoghq.com/agent-package:${DD_AGENT_VERSION}-1 \
  --build-arg OUTPUT_OCI=<YOUR-REGISTRY>/agent-package:${DD_AGENT_VERSION}-1
```

**Google Cloud (GCR / Artifact Registry)**:
```shell
docker build . \
  --target builder \
  --build-arg AGENT_VERSION=$DD_AGENT_VERSION \
  --build-arg PACKAGE_TYPE=windows \
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
  --build-arg PACKAGE_TYPE=windows \
  --build-arg AGENT_OCI=install.datadoghq.com/agent-package:${DD_AGENT_VERSION}-1 \
  --build-arg OUTPUT_OCI=<YOUR-REGISTRY>/agent-package:${DD_AGENT_VERSION}-1
```

The tool cross-compiles the Windows binary, replaces `otel-agent.exe` inside the OCI package, and pushes the result directly to `OUTPUT_OCI`. No separate `docker push` step is needed.

## Install the custom OCI package

To install the custom OCI package on a Windows host, run from an **elevated PowerShell session**:
```powershell
$env:DD_INSTALLER_REGISTRY_AUTH="gcr"; $env:DD_INSTALLER_REGISTRY_URL="install.datad0g.com"; & "C:\Program Files\Datadog\Datadog Agent\bin\datadog-installer.exe" install "oci://us-central1-docker.pkg.dev/datadog-sandbox/ddot-byoc-windows/agent-package:${DD_AGENT_VERSION}-1"
```

```powershell
$env:DD_INSTALLER_REGISTRY_AUTH="gcr"; $env:DD_INSTALLER_REGISTRY_URL="install.datad0g.com"; & "C:\Program Files\Datadog\Datadog Agent\bin\datadog-installer.exe" extension install "oci://us-central1-docker.pkg.dev/datadog-sandbox/ddot-byoc-windows/agent-package:${DD_AGENT_VERSION}-1" ddot
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/agent/#included-components
[2]: https://docs.docker.com/engine/install/
[3]: https://github.com/DataDog/datadog-agent
[4]: https://opentelemetry.io/docs/collector/custom-collector/
[5]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/cmd/builder/README.md
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/metricstransformprocessor/README.md
