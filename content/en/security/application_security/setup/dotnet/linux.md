---
title: Set up App and API Protection for .NET on Linux
code_lang: linux
type: multi-code-lang
code_lang_weight: 30
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
{{% aap/aap_and_api_protection_dotnet_setup_options platform="linux" %}}
{{% aap/aap_and_api_protection_dotnet_overview %}}

## Prerequisites

- Linux operating system
- .NET application
- Root or sudo privileges
- Systemd (for service management)
- Your Datadog API key
- Datadog .NET tracing library (see version requirements [here][1])

## 1. Installing the Datadog Agent

Install the Datadog Agent by following the [setup instructions for Linux hosts][2].

## 2. Enabling App and API Protection monitoring

{{% aap/aap_and_api_protection_dotnet_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Manually enabling App and API Protection monitoring

**Go to [Datadog .NET Tracer package][3]** to find out the latest release to download.

{{< tabs >}}
{{% tab "AMD 64 Platforms" %}}

**Download and install** the latest *Datadog .NET Tracer package* that supports your operating system and architecture.

<div class="alert alert-danger">
  <strong>Note on version:</strong> replace <strong>&#60;TRACER_VERSION&#62;</strong> with the latest three component version of the library (ej: 3.21.0)
</div>

```bash
wget -O datadog-dotnet-apm-<TRACER_VERSION>.tar.gz 'https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>'
```

Run the following command to install the package and create the .NET tracer log directory `/var/log/datadog/dotnet` with the appropriate permissions:

```bash
sudo tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>.tar.gz && /opt/datadog/createLogPath.sh
```
{{% /tab %}}
{{% tab "ARM 64 Platforms" %}}

**Download and install** the latest *Datadog .NET Tracer package* that supports your operating system and architecture.

<div class="alert alert-danger">
  <strong>Note on version:</strong> replace <strong>&#60;TRACER_VERSION&#62;</strong> with the latest three component version of the library (ej: 3.21.0)
</div>

```bash
wget -O datadog-dotnet-apm-<TRACER_VERSION>.arm64.tar.gz 'https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>'
```

Run the following command to install the package and create the .NET tracer log directory `/var/log/datadog/dotnet` with the appropriate permissions:

```bash
sudo tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>.arm64.tar.gz && /opt/datadog/createLogPath.sh
```

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger">
  If you are having issues installing the Tracer library check the [Tracer Installation guide][5]
  *Note on version:* replace *<TRACER_VERSION>* with the latest three component version of the library (ej: 3.21.0)
</div>


{{% collapse-content title="APM Tracing Enabled" level="h4" %}}
Set the required environment variables and start your .NET application:

```bash
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
export CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
export DD_DOTNET_TRACER_HOME=/opt/datadog
export DD_SERVICE=<MY_SERVICE>
export DD_ENV=<MY_ENV>
export DD_APPSEC_ENABLED=true
```
{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h4" %}}
To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing variable to false.
```bash
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
export CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
export DD_DOTNET_TRACER_HOME=/opt/datadog
export DD_SERVICE=<MY_SERVICE>
export DD_ENV=<MY_ENV>
export DD_APPSEC_ENABLED=true
export DD_APM_TRACING_ENABLED=false
```

{{% /collapse-content %}}

## 3. Run your application

Start your .NET application with above settings.

{{% aap/aap_and_api_protection_verify_setup %}}

## Troubleshooting

If you encounter issues while setting up App and API Protection for your .NET application, see the [.NET App and API Protection troubleshooting guide][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/dotnet/compatibility
[2]: /agent/?tab=Linux
[3]: https://github.com/DataDog/dd-trace-dotnet/releases
[4]: /security/application_security/setup/dotnet/troubleshooting
[5]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/?tab=linux