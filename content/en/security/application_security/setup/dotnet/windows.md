---
title: Set up App and API Protection for .NET on Windows
code_lang: windows
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
{{% aap/aap_and_api_protection_dotnet_setup_options platform="windows" %}}
{{% aap/aap_and_api_protection_dotnet_overview %}}

## Prerequisites

- Windows operating system
- .NET application
- Administrator privileges for some configuration steps
- Your Datadog API key
- Datadog .NET tracing library (see version requirements [here][1])

## 1. Installing the Datadog Agent

Install the Datadog Agent by following the [setup instructions for Windows hosts][2].
## 2. Enabling App and API Protection monitoring

{{% aap/aap_and_api_protection_dotnet_navigation_menu %}}
{{% appsec-remote-config-activation %}}

### Manually enabling App and API Protection monitoring

**Download the latest [Datadog .NET Tracer MSI Installer][3]** that supports your operating system and architecture and install it with *Administrator privileges*.

{{% collapse-content title="APM Tracing Enabled" level="h4" %}}
To enable AAP alongside with APM, add the following Environment Variables:

```
DD_APPSEC_ENABLED=true
```
{{% /collapse-content %}}

{{% collapse-content title="APM Tracing Disabled" level="h4" %}}
To disable APM tracing while keeping App and API Protection enabled, add the following Environment Variables:

```
DD_APPSEC_ENABLED=true
DD_APM_TRACING_ENABLED=false
```

{{% /collapse-content %}}

## 3. Run your application

Start your .NET application with the previous settings.

{{< tabs >}}
{{% tab "IIS" %}}

Restart IIS

```cmd
net stop /y was
net start w3svc
# Also, start any other services that were stopped when WAS was shut down.
```

{{% /tab %}}
{{% tab "Standalone apps *(.NET Framework)*" %}}

<div class="alert alert-danger">
  <strong>Note:</strong> The .NET runtime tries to load the .NET library into <em>any</em> .NET process that is started with these environment variables set. You should limit instrumentation to only the applications that need to be instrumented. <strong>Don't set these environment variables globally as this causes <em>all</em> .NET processes on the host to be instrumented.</strong>
</div>

Set the following required environment variables for automatic instrumentation to attach to your application and relaunch it:

   ```
   COR_ENABLE_PROFILING=1
   ```

{{% /tab %}}
{{% tab "Standalone apps *(.NET Core)*" %}}

<div class="alert alert-danger">
  <strong>Note:</strong> The .NET runtime tries to load the .NET library into <em>any</em> .NET process that is started with these environment variables set. You should limit instrumentation to only the applications that need to be instrumented. <strong>Don't set these environment variables globally as this causes <em>all</em> .NET processes on the host to be instrumented.</strong>
</div>

Set the following required environment variables for automatic instrumentation to attach to your application and relaunch it:

```
CORECLR_ENABLE_PROFILING=1
```

{{% /tab %}}
{{< /tabs >}}


{{% aap/aap_and_api_protection_verify_setup %}}

## Troubleshooting

For a more detailed, see [the Datadog Tracer installation guide for .NET Framework][5] or [the Datadog Tracer installation guide for .NET Core][6].

If you encounter issues while setting up App and API Protection for your .NET application, see the [.NET App and API Protection troubleshooting guide][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/dotnet/compatibility
[2]: /agent/?tab=Windows
[3]: https://github.com/DataDog/dd-trace-dotnet/releases
[4]: /security/application_security/setup/dotnet/troubleshooting
[5]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-framework/?tab=windows
[6]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/?tab=windows
