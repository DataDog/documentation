# .NET Documentation Cross-Reference Analysis & Recommendations

> Generated on 2025-10-14
> Focus: Improving cross-references between main APM setup docs and serverless-specific pages

## Executive Summary

**Problem:** Users are ending up in the wrong documentation because we're not effectively guiding them to the correct docs based on their environment/platform.

**Root Cause:** The main APM setup pages (dotnet-core.md and dotnet-framework.md) have minimal serverless cross-references, while serverless pages don't consistently link back to foundational APM concepts.

**Impact:** Users following standard APM setup instructions for serverless environments will:
- Install components they don't need (Datadog Agent)
- Miss platform-specific requirements (Lambda layers, Azure extensions)
- Experience broken or incomplete instrumentation
- Create support tickets that could be avoided

---

## Current State Analysis

### Main APM Setup Pages Cross-References

#### dotnet-core.md (content/en/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core.md)

**Current Serverless Cross-References:**
- **Line 60-62:** Alert box at the top of installation section
  ```html
  <div class="alert alert-info">
      To set up Datadog APM in Serverless environments, such as AWS Lambda or Azure Functions, see <a href="/serverless">Serverless</a>.
  </div>
  ```
- **Lines 24-26:** In `further_reading` frontmatter
  ```yaml
  - link: "/serverless/azure_app_services/"
    tag: "Documentation"
    text: "Microsoft Azure App Service extension"
  ```

**Issues:**
1. **Vague link destination:** `/serverless` is too general - doesn't take users to language-specific docs
2. **Incomplete platform coverage:** Only Azure App Services in further reading, missing:
   - AWS Lambda .NET
   - Azure Functions .NET
   - Google Cloud Run .NET
3. **Placement timing:** Alert appears AFTER "Compatibility requirements" section - users may already be committed to wrong path
4. **No Azure App Service distinction:** Doesn't differentiate between Windows Code, Linux Code, and Linux Containers

#### dotnet-framework.md (content/en/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-framework.md)

**Current Serverless Cross-References:**
- **Lines 64-66:** Same generic alert box
  ```html
  <div class="alert alert-info">
    To set up Datadog APM in Serverless environments, such as AWS Lambda or Azure Functions, see <a href="/serverless">Serverless</a>.
  </div>
  ```
- **Lines 29-31:** In `further_reading` frontmatter
  ```yaml
  - link: "/serverless/azure_app_services/"
    tag: "Documentation"
    text: "Microsoft Azure App Service extension"
  ```

**Issues:**
1. Same vague `/serverless` link
2. .NET Framework is NOT supported on AWS Lambda (only .NET Core/.NET 5+), but no warning
3. Only references Azure App Services, missing Azure Functions
4. No indication which Azure App Service deployment models support Framework

### Serverless Pages Cross-References

#### AWS Lambda .NET (serverless/aws_lambda/instrumentation/dotnet.md)

**Current APM Cross-References:**
- **Line 310:** Custom spans section
  ```markdown
  For instructions on how to add spans, see [.NET custom instrumentation][10].
  ```
- **Line 339:** Link to custom instrumentation at bottom
  ```markdown
  [10]: https://docs.datadoghq.com/tracing/trace_collection/custom_instrumentation/dotnet/dd-api/
  ```

**Missing:**
- No link to main dotnet-core.md for compatibility information
- No link to library configuration docs
- No link to troubleshooting guides
- No explanation of how Lambda differs from standard APM setup

#### Azure Functions .NET (serverless/azure_functions/_index.md)

**Current APM Cross-References:**
- **Lines 166-170:** Configuration section
  ```markdown
  4. **Configure the Datadog .NET tracer**

     - [Configuring the .NET Core Tracing Library][1]
     - [Configuring the .NET Framework Tracing Library][2]

  [1]:/tracing/trace_collection/library_config/dotnet-core
  [2]:/tracing/trace_collection/library_config/dotnet-framework
  ```

**Good aspects:**
- Links to library config docs
- Distinguishes Core vs Framework

**Missing:**
- No link to main setup pages for compatibility info
- No explanation of what's different from standard APM
- No troubleshooting cross-reference
- No link to custom instrumentation docs

#### Azure App Service - Windows Code (serverless/azure_app_service/windows_code.md)

**Current APM Cross-References:**
- **Lines 295-301:** Logging section
  ```markdown
  - Use the [installation steps](#installation) on this page to enable APM with the Datadog APM extension. Then [enable Agentless logging][1].
  - Use [Agentless logging with the Serilog sink][2].

  [1]: /logs/log_collection/csharp/#agentless-logging-with-apm
  [2]: /logs/log_collection/csharp/#agentless-logging-with-serilog-sink
  ```
- **Line 561:** Further reading link
  ```markdown
  [2]: /tracing/setup/dotnet/
  ```

**Issues:**
- Link `/tracing/setup/dotnet/` is outdated (should be `/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core` or `dotnet-framework`)
- No link to library configuration
- No link to compatibility requirements
- Doesn't explain relationship between extension and standard tracer

#### Azure App Service - Linux Code (serverless/azure_app_service/linux_code.md)

**Current APM Cross-References:**
- **Lines 55-63:** .NET section
  ```markdown
  Add the `Datadog.Trace.Bundle` Nuget package to your project. See [the Nuget package page for more details][102].

  [102]: https://www.nuget.org/packages/Datadog.Trace.Bundle#readme-body-tab
  ```

**Issues:**
- Only links to NuGet package page (external)
- No link to main APM setup docs
- No link to library configuration
- Doesn't explain environment variables in .NET context (shown later at lines 252-278 but not cross-referenced)

#### Azure App Service - Linux Container (serverless/azure_app_service/linux_container.md)

**Current APM Cross-References:**
- **Line 140:** .NET tracing section
  ```markdown
  For more information, see [Tracing .NET Applications][401].

  [401]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
  ```
- **Lines 150-155:** Additional references
  ```markdown
  To set up logging in your application, see [C# Log Collection][403]. To set up trace log correlation, see [Correlating .NET Logs and Traces][404].

  [403]: /logs/log_collection/csharp
  [404]: /tracing/other_telemetry/connect_logs_and_traces/dotnet
  ```

**Good aspects:**
- Links to main dotnet-core.md page
- Links to log correlation
- Links to logging setup

**Missing:**
- No link to library configuration
- No link to compatibility requirements
- No troubleshooting cross-reference

---

## User Journey Problems

### Problem 1: .NET Developer with Azure Functions

**Current journey:**
1. Searches "Datadog .NET tracing" → finds dotnet-core.md
2. Sees small alert box mentioning "serverless" but reads compatibility section first
3. Follows installation instructions for machine-wide MSI installer
4. Gets confused why it doesn't work in Azure Functions
5. Re-reads page, clicks vague "/serverless" link
6. Lands on generic serverless page with multiple languages
7. Has to navigate to Azure Functions section
8. Discovers they need `Datadog.AzureFunctions` NuGet package instead

**What we should do:**
- Add Azure Functions-specific alert BEFORE compatibility section
- Link directly to `/serverless/azure_functions/` with .NET anchor
- Add "Which setup guide should I use?" decision tree at the top

### Problem 2: .NET Developer with AWS Lambda

**Current journey:**
1. Searches "Datadog .NET Lambda" → might find dotnet-core.md OR lambda/dotnet.md
2. If finds dotnet-core.md: sees generic serverless alert, follows to `/serverless`
3. Has to navigate through serverless landing page to find Lambda section
4. Finds Lambda .NET docs, follows layer installation
5. Tries to add custom instrumentation, finds link to custom instrumentation page
6. Custom instrumentation page doesn't mention Lambda-specific concerns
7. Gets confused about version compatibility between layer and custom instrumentation NuGet

**What we should do:**
- Add Lambda-specific alert in dotnet-core.md with direct link
- Lambda docs should link to compatibility matrix
- Custom instrumentation docs should have serverless-specific section

### Problem 3: .NET Framework Developer with Azure App Service

**Current journey:**
1. Searches "Datadog .NET Framework Azure App Service" → finds dotnet-framework.md
2. Sees generic serverless alert, but doesn't think "App Service" = "Serverless"
3. Installs MSI on App Service (doesn't work - no access to machine)
4. Opens support ticket
5. Support tells them to use Azure App Service extension instead

**What we should do:**
- Make alert explicitly mention "Azure App Service" not just generic "serverless"
- Add note that MSI installation doesn't work in Azure App Service
- Link directly to Azure App Service Windows Code docs

### Problem 4: Reverse Journey - Azure App Service User Wants Advanced Config

**Current journey:**
1. Successfully sets up Azure App Service monitoring using serverless docs
2. Wants to configure trace sampling / filtering
3. Azure App Service docs don't explain configuration in detail
4. Searches for "Datadog .NET configuration" → finds library_config/dotnet-core.md
5. Configuration page doesn't mention Azure App Service
6. User doesn't know if config applies to their environment
7. Sets environment variable, doesn't work (extension might not support all configs)

**What we should do:**
- Azure App Service docs should link to library configuration with caveat
- Library configuration should have "Serverless considerations" section
- Extension docs should explicitly list supported vs unsupported configs

---

## Recommendations

### Priority 1: Update Main APM Setup Pages (HIGH IMPACT)

#### A. Add Decision Tree at Top of dotnet-core.md and dotnet-framework.md

**Location:** After title, before "Compatibility requirements"

```markdown
## Before you begin

Choose the setup guide for your deployment environment:

| Environment | Setup Guide |
|------------|-------------|
| **AWS Lambda** | [Instrumenting .NET Serverless Applications on AWS Lambda](/serverless/aws_lambda/instrumentation/dotnet) |
| **Azure Functions** | [Install Serverless Monitoring for Azure Functions](/serverless/azure_functions/) |
| **Azure App Service (Windows)** | [Azure App Service - Windows Code](/serverless/azure_app_service/windows_code) |
| **Azure App Service (Linux - Code)** | [Azure App Service - Linux Code](/serverless/azure_app_service/linux_code) |
| **Azure App Service (Linux - Container)** | [Azure App Service - Linux Container](/serverless/azure_app_service/linux_container) |
| **Google Cloud Run** | [Google Cloud Run - .NET](/serverless/google_cloud_run/) |
| **All other environments** | Continue with this guide ↓ |

<div class="alert alert-warning">
<strong>Important:</strong> Serverless environments require different installation steps than traditional hosts. Do not install the Datadog Agent or MSI installer for serverless environments.
</div>
```

**Why:** Intercepts users BEFORE they start down the wrong path.

#### B. Replace Generic Serverless Alert (Lines 60-62)

**Current:**
```html
<div class="alert alert-info">
    To set up Datadog APM in Serverless environments, such as AWS Lambda or Azure Functions, see <a href="/serverless">Serverless</a>.
</div>
```

**Replace with:**
```html
<div class="alert alert-danger">
<strong>Are you deploying to a serverless environment?</strong><br/>
If you're using AWS Lambda, Azure Functions, Azure App Service, or Google Cloud Run, <strong>STOP</strong> and use the appropriate serverless setup guide instead:
<ul>
  <li><a href="/serverless/aws_lambda/instrumentation/dotnet">AWS Lambda .NET Setup</a></li>
  <li><a href="/serverless/azure_functions/">Azure Functions Setup</a></li>
  <li><a href="/serverless/azure_app_service/">Azure App Service Setup</a></li>
  <li><a href="/serverless/google_cloud_run/">Google Cloud Run Setup</a></li>
</ul>
<strong>The installation instructions below will NOT work for serverless environments.</strong>
</div>
```

**Why:**
- More urgent tone (danger alert vs info alert)
- Specific platform links
- Explicitly states standard instructions won't work

#### C. Update Further Reading Section

**Add to dotnet-core.md further_reading (lines 17-47):**
```yaml
further_reading:
  # ... existing links ...
  - link: "/serverless/aws_lambda/instrumentation/dotnet"
    tag: "Documentation"
    text: "Instrumenting .NET on AWS Lambda"
  - link: "/serverless/azure_functions/"
    tag: "Documentation"
    text: "Azure Functions Serverless Monitoring"
  - link: "/serverless/azure_app_service/windows_code"
    tag: "Documentation"
    text: "Azure App Service - Windows"
  - link: "/serverless/azure_app_service/linux_code"
    tag: "Documentation"
    text: "Azure App Service - Linux Code"
```

#### D. Add dotnet-framework.md Specific Warnings

**Add after line 58 (after Framework version compatibility):**

```markdown
### Serverless platform support

.NET Framework is supported on:
- **Azure App Service (Windows only)** - see [Azure App Service - Windows Code](/serverless/azure_app_service/windows_code)
- **Azure Functions (In-Process model only)** - see [Azure Functions Setup](/serverless/azure_functions/)

.NET Framework is **NOT supported** on:
- AWS Lambda (requires .NET Core 3.1+ or .NET 5+)
- Azure App Service Linux
- Google Cloud Run
```

**Why:** Prevents .NET Framework users from trying unsupported platforms.

---

### Priority 2: Update Serverless Pages (HIGH IMPACT)

#### A. AWS Lambda .NET (serverless/aws_lambda/instrumentation/dotnet.md)

**Add after line 20 (## Setup):**

```markdown
## Prerequisites

Before instrumenting your Lambda function:

1. **Review compatibility requirements:** See [.NET Core Compatibility](/tracing/trace_collection/compatibility/dotnet-core) for supported .NET versions and integrations.
2. **Understand Lambda-specific differences:**
   - Uses Lambda layers instead of MSI/system installation
   - Custom instrumentation requires matching layer and NuGet package versions
   - Environment variables are set in Lambda configuration, not system-wide
3. **Learn about .NET tracing:** If you're new to Datadog .NET tracing, read [Tracing .NET Core Applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core) for background concepts.

<div class="alert alert-info">
Looking for traditional host-based setup instead? See <a href="/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core">Tracing .NET Core Applications</a>.
</div>
```

**Add in "Custom Spans" section (after line 302):**

```markdown
## Configuration

Lambda functions support most standard .NET tracer configuration options. See [.NET Core Library Configuration](/tracing/trace_collection/library_config/dotnet-core/) for the full list of environment variables.

**Lambda-specific configuration notes:**
- Set environment variables in Lambda function configuration, not in code
- Some Agent-related settings (like `DD_AGENT_HOST`) are managed by the Datadog Extension
- Tracer version is determined by the Lambda layer version

## Troubleshooting

For common issues and debugging steps, see:
- [.NET Diagnostic Tool](/tracing/troubleshooting/dotnet_diagnostic_tool)
- [Troubleshoot Serverless Monitoring](/serverless/guide/troubleshoot_serverless_monitoring)
```

**Why:** Connects Lambda-specific docs to foundational APM concepts.

#### B. Azure Functions .NET (serverless/azure_functions/_index.md)

**Add after line 18 (before Setup section):**

```markdown
## Prerequisites

1. **Install the Azure integration:** The [Datadog-Azure integration](/integrations/azure/) provides infrastructure metrics. Install it first for full observability.
2. **Review .NET compatibility:** See compatibility requirements for:
   - [.NET Core](/tracing/trace_collection/compatibility/dotnet-core) (Isolated Worker model)
   - [.NET Framework](/tracing/trace_collection/compatibility/dotnet-framework) (In-Process model)
3. **Understand Azure Functions-specific approach:** This guide uses the `Datadog.AzureFunctions` NuGet package, which is different from standard .NET APM setup. See [Tracing .NET Core Applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core) for comparison.

<div class="alert alert-info">
Deploying to Azure App Service instead? See <a href="/serverless/azure_app_service/">Azure App Service documentation</a>.
</div>
```

**Update configuration section (after line 164):**

```markdown
4. **Configure the Datadog .NET tracer**

   The `Datadog.AzureFunctions` package includes the Datadog .NET tracer. For configuration options, see:
   - [Configuring the .NET Core Tracing Library](/tracing/trace_collection/library_config/dotnet-core)
   - [Configuring the .NET Framework Tracing Library](/tracing/trace_collection/library_config/dotnet-framework)

   **Azure Functions considerations:**
   - Configuration is set via Function App Settings, not local files
   - Some configurations may not be supported in the Functions sandbox environment
   - The compatibility layer automatically handles some Agent-related settings

## Custom Instrumentation

To add custom spans and metrics:
- [.NET Custom Instrumentation with Datadog API](/tracing/trace_collection/custom_instrumentation/dotnet/dd-api/)
- [Submitting Custom Metrics](/serverless/custom_metrics/)

## Troubleshooting

- [Troubleshoot Serverless Monitoring](/serverless/guide/troubleshoot_serverless_monitoring)
- [.NET Diagnostic Tool](/tracing/troubleshooting/dotnet_diagnostic_tool)
- [Enable Debug Logs](#enable-debug-logs) (see section below)
```

#### C. Azure App Service - Windows Code (serverless/azure_app_service/windows_code.md)

**Add after line 36 (after extension-specific notes):**

```markdown
## Prerequisites

1. **Install the Azure integration:** Install the [Datadog-Azure integration](/integrations/azure/) first to correlate APM traces with Azure metrics.
2. **Understand the extension approach:** The Azure App Service extension is a specialized version of the Datadog .NET tracer. It differs from standard APM setup:
   - No MSI installer needed (extension handles installation)
   - No manual environment variable configuration for basic setup
   - Automatic integration with IIS
3. **Review .NET compatibility:** See [.NET Core Compatibility](/tracing/trace_collection/compatibility/dotnet-core) or [.NET Framework Compatibility](/tracing/trace_collection/compatibility/dotnet-framework) for supported versions.

<div class="alert alert-warning">
<strong>Do not install the Datadog .NET tracer MSI</strong> on Azure App Service. The extension provides all necessary components. Installing the MSI may cause conflicts.
</div>

<div class="alert alert-info">
Looking for Azure Functions instead? See <a href="/serverless/azure_functions/">Azure Functions Setup</a>. Using Linux? See <a href="/serverless/azure_app_service/linux_code">Linux Code</a> or <a href="/serverless/azure_app_service/linux_container">Linux Container</a> setup.
</div>
```

**Fix outdated link (line 561) and expand:**

```markdown
## Additional Resources

- [Tracing .NET Core Applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core) - Foundational APM concepts
- [Tracing .NET Framework Applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-framework) - Framework-specific guidance
- [.NET Core Library Configuration](/tracing/trace_collection/library_config/dotnet-core/) - All configuration options
- [.NET Framework Library Configuration](/tracing/trace_collection/library_config/dotnet-framework/) - Framework configuration
- [.NET Custom Instrumentation](/tracing/trace_collection/custom_instrumentation/dotnet/) - Adding custom spans
- [.NET Diagnostic Tool](/tracing/troubleshooting/dotnet_diagnostic_tool) - Troubleshooting traces
```

#### D. Azure App Service - Linux Code (serverless/azure_app_service/linux_code.md)

**Add after line 16 (after "Supported runtimes"):**

```markdown
## Prerequisites

1. **Install the Azure integration:** Install the [Datadog-Azure integration](/integrations/azure/) to collect Azure metrics and logs.
2. **Understand the sidecar approach:** This setup uses a sidecar container pattern, which differs from:
   - [Windows Code deployment](/serverless/azure_app_service/windows_code) (uses extension)
   - [Standard .NET APM setup](/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core) (uses Agent or NuGet)
3. **Review .NET compatibility:** See [.NET Core Compatibility](/tracing/trace_collection/compatibility/dotnet-core) for supported runtimes and integrations.

<div class="alert alert-info">
Using Windows instead? See <a href="/serverless/azure_app_service/windows_code">Windows Code setup</a>. Using containers? See <a href="/serverless/azure_app_service/linux_container">Linux Container setup</a>.
</div>
```

**Expand .NET section (after line 63):**

```markdown
{{% tab ".NET" %}}

Add the `Datadog.Trace.Bundle` Nuget package to your project. See [the Nuget package page for more details][102] or [Tracing .NET Core Applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core) for background.

For example:

```shell
dotnet add package Datadog.Trace.Bundle --version 3.21.0
```

**Important:** The environment variables shown in the [.NET: Additional required environment variables](#dotnet-additional-settings) section are critical for .NET to work with the sidecar pattern.

For more on these environment variables, see [Library Configuration](/tracing/trace_collection/library_config/dotnet-core/).

[102]: https://www.nuget.org/packages/Datadog.Trace.Bundle#readme-body-tab

{{% /tab %}}
```

**Add at end of document (before "Further reading"):**

```markdown
## Additional Resources

- [Tracing .NET Core Applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core) - Core APM concepts
- [.NET Core Library Configuration](/tracing/trace_collection/library_config/dotnet-core/) - Full configuration reference
- [.NET Custom Instrumentation](/tracing/trace_collection/custom_instrumentation/dotnet/) - Adding custom spans
- [Connecting .NET Logs and Traces](/tracing/other_telemetry/connect_logs_and_traces/dotnet) - Log correlation
```

#### E. Azure App Service - Linux Container (serverless/azure_app_service/linux_container.md)

**This page already has better cross-references, but add prerequisites section after line 22:**

```markdown
## Prerequisites

1. **Install the Azure integration:** Install the [Datadog-Azure integration](/integrations/azure/) to collect Azure metrics and logs.
2. **Understand container instrumentation:** This guide instruments a containerized app with a sidecar. For other deployment models, see:
   - [Windows Code](/serverless/azure_app_service/windows_code) - Extension-based
   - [Linux Code](/serverless/azure_app_service/linux_code) - Sidecar for non-containerized apps
3. **Review container setup basics:** If you're new to Datadog's .NET tracer in containers, see [Tracing .NET Core Applications](/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core) for background.
4. **Check compatibility:** See [.NET Core Compatibility](/tracing/trace_collection/compatibility/dotnet-core) for supported runtimes.
```

**Add configuration cross-reference after line 155:**

```markdown
## Configuration

The `.NET tracer supports configuration via environment variables. See [.NET Core Library Configuration](/tracing/trace_collection/library_config/dotnet-core/) for all available options.

**Container-specific notes:**
- Environment variables are set in your Azure App Service Application Settings
- The sidecar handles Agent connectivity automatically
- Logs should be written to `/home/LogFiles/` for collection

## Additional Resources

- [.NET Custom Instrumentation](/tracing/trace_collection/custom_instrumentation/dotnet/) - Adding custom spans
- [.NET Diagnostic Tool](/tracing/troubleshooting/dotnet_diagnostic_tool) - Troubleshooting
- [Connecting .NET Logs and Traces](/tracing/other_telemetry/connect_logs_and_traces/dotnet) - Log correlation
```

---

### Priority 3: Update Library Configuration Pages (MEDIUM IMPACT)

#### A. Add Serverless Section to library_config/dotnet-core.md

**Add after "Configuration methods" section:**

```markdown
## Serverless environment considerations

Configuration approaches differ by serverless platform:

### AWS Lambda
- Set environment variables in Lambda function configuration
- Use AWS Systems Manager Parameter Store or Secrets Manager for sensitive values
- Lambda layer version determines tracer version
- See [AWS Lambda .NET Setup](/serverless/aws_lambda/instrumentation/dotnet)

### Azure Functions
- Set environment variables in Function App Settings
- The `Datadog.AzureFunctions` package handles some configurations automatically
- See [Azure Functions Setup](/serverless/azure_functions/)

### Azure App Service
- **Windows Code:** Environment variables set in Application Settings, extension manages some configs
- **Linux Code/Container:** Environment variables set in Application Settings, sidecar pattern
- Some Agent-related settings are managed automatically
- See [Azure App Service Setup](/serverless/azure_app_service/)

### Configuration limitations
Some configuration options may not be available or behave differently in serverless environments:
- Agent host/port settings are managed by the serverless environment
- Unix Domain Sockets not available in most serverless environments
- Some profiler features may not be available
```

#### B. Add Serverless Section to library_config/dotnet-framework.md

**Add similar section with Framework-specific notes:**

```markdown
## Serverless environment considerations

.NET Framework is supported on:
- **Azure App Service Windows:** See [Azure App Service - Windows Code](/serverless/azure_app_service/windows_code)
- **Azure Functions (In-Process model):** See [Azure Functions Setup](/serverless/azure_functions/)

.NET Framework is **NOT supported** on:
- AWS Lambda (requires .NET Core 3.1+ or .NET 5+)
- Azure App Service Linux
- Google Cloud Run

Configuration for Azure App Service:
- Environment variables set in Application Settings
- Extension manages Agent connectivity automatically
- IIS-specific settings still apply
```

---

### Priority 4: Update Custom Instrumentation Pages (MEDIUM IMPACT)

#### A. Add Serverless Section to custom_instrumentation/dotnet/dd-api.md

```markdown
## Serverless environments

### AWS Lambda
When adding custom instrumentation to Lambda functions:
- Ensure your Lambda layer version matches your `Datadog.Trace` NuGet package version
- Custom spans must complete within Lambda execution time
- See [AWS Lambda .NET Custom Spans](/serverless/aws_lambda/instrumentation/dotnet#add-custom-spans)

### Azure Functions
- Works with `Datadog.AzureFunctions` package
- Custom instrumentation must be compatible with Function execution model
- See [Azure Functions Setup](/serverless/azure_functions/)

### Azure App Service
- Custom instrumentation works the same as standard APM
- Ensure `Datadog.Trace` NuGet version matches extension version (Windows) or Bundle package (Linux)
- See [Azure App Service Setup](/serverless/azure_app_service/)
```

---

### Priority 5: Create New "Which Setup Guide" Landing Page (NICE TO HAVE)

Create a new page: `content/en/tracing/trace_collection/setup_guide_selector/dotnet.md`

```markdown
---
title: .NET APM Setup - Which Guide Should I Use?
---

## Choose your .NET APM setup guide

Answer these questions to find the right setup guide for your environment:

### 1. Where are you deploying your .NET application?

<div class="grid">

<div class="card">
### AWS Lambda
- Serverless functions
- Event-driven
- Pay-per-invocation

**Setup guide:** [Instrumenting .NET on AWS Lambda →](/serverless/aws_lambda/instrumentation/dotnet)

**Supported:** .NET Core 3.1+, .NET 5+
</div>

<div class="card">
### Azure Functions
- Serverless functions
- Event-driven or HTTP-triggered
- Isolated Worker or In-Process model

**Setup guide:** [Azure Functions Serverless Monitoring →](/serverless/azure_functions/)

**Supported:** .NET Core, .NET 5+, .NET Framework (In-Process)
</div>

<div class="card">
### Azure App Service - Windows
- Managed web app hosting
- Windows OS
- IIS-based

**Setup guide:** [Azure App Service - Windows Code →](/serverless/azure_app_service/windows_code)

**Supported:** .NET Core, .NET 5+, .NET Framework 4.6.1+
</div>

<div class="card">
### Azure App Service - Linux
- Managed web app hosting
- Linux OS
- Code or container deployment

**Setup guides:**
- [Linux Code →](/serverless/azure_app_service/linux_code)
- [Linux Container →](/serverless/azure_app_service/linux_container)

**Supported:** .NET Core, .NET 5+ only
</div>

<div class="card">
### Google Cloud Run
- Containerized serverless
- HTTP-based
- Auto-scaling

**Setup guide:** [Google Cloud Run - .NET →](/serverless/google_cloud_run/containers/in_container/dotnet)

**Supported:** .NET Core, .NET 5+
</div>

<div class="card">
### Traditional Hosts
- VMs, bare metal
- Windows or Linux
- IIS, systemd, or standalone

**Setup guides:**
- [.NET Core →](/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core)
- [.NET Framework →](/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-framework)

**Supported:** .NET Core, .NET 5+, .NET Framework 4.6.1+
</div>

<div class="card">
### Kubernetes / Containers
- Self-managed containers
- Docker, Kubernetes, ECS, etc.
- Not cloud-managed serverless

**Setup guides:**
- [.NET Core →](/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core)
- [Kubernetes setup →](/containers/kubernetes/apm)

**Supported:** .NET Core, .NET 5+
</div>

</div>

### 2. Are you using .NET Core or .NET Framework?

| Version | AWS Lambda | Azure Functions | Azure App Service | Google Cloud | Traditional Hosts |
|---------|-----------|----------------|------------------|--------------|------------------|
| **.NET Framework 4.6.1+** | ❌ Not supported | ✅ In-Process only | ✅ Windows only | ❌ Not supported | ✅ Supported |
| **.NET Core 3.1** | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| **.NET 5** | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| **.NET 6** | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| **.NET 7** | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| **.NET 8** | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |
| **.NET 9** | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported | ✅ Supported |

### Quick decision flowchart

```
Is it serverless or managed cloud hosting?
├─ YES
│  ├─ AWS Lambda? → Use Lambda guide
│  ├─ Azure Functions? → Use Functions guide
│  ├─ Azure App Service?
│  │  ├─ Windows? → Use Windows Code guide
│  │  └─ Linux?
│  │     ├─ Container? → Use Linux Container guide
│  │     └─ Code? → Use Linux Code guide
│  └─ Google Cloud Run? → Use Cloud Run guide
│
└─ NO (traditional hosting)
   ├─ .NET Framework? → Use .NET Framework guide
   └─ .NET Core/5+? → Use .NET Core guide
```

## Still not sure?

If you're unsure which guide applies to your environment:
1. Check with your DevOps/infrastructure team
2. Review the [compatibility requirements](/tracing/trace_collection/compatibility/dotnet-core)
3. [Contact Datadog support](/help) with your environment details

## Related documentation

- [.NET Compatibility Requirements](/tracing/trace_collection/compatibility/dotnet-core)
- [.NET Library Configuration](/tracing/trace_collection/library_config/dotnet-core/)
- [.NET Custom Instrumentation](/tracing/trace_collection/custom_instrumentation/dotnet/)
- [.NET Troubleshooting](/tracing/troubleshooting/dotnet_diagnostic_tool)
```

**Then update dotnet-core.md and dotnet-framework.md to link to this page at the very top:**

```markdown
<div class="alert alert-info">
<strong>Not sure if this is the right guide?</strong> See <a href="/tracing/trace_collection/setup_guide_selector/dotnet">Which .NET Setup Guide Should I Use?</a>
</div>
```

---

## Implementation Plan

### Phase 1: High-Priority Pages (Week 1)
1. Update dotnet-core.md with decision tree and improved alerts
2. Update dotnet-framework.md with platform support warnings
3. Update AWS Lambda .NET with prerequisites and cross-references
4. Update Azure Functions with prerequisites and cross-references

### Phase 2: Azure App Service Pages (Week 2)
5. Update windows_code.md with prerequisites and fixed links
6. Update linux_code.md with prerequisites and expanded .NET section
7. Update linux_container.md with prerequisites

### Phase 3: Configuration and Custom Instrumentation (Week 3)
8. Add serverless sections to library_config pages
9. Add serverless sections to custom instrumentation pages

### Phase 4: Landing Page (Week 4)
10. Create setup guide selector page
11. Link to it from all main pages
12. Update navigation menus

### Phase 5: Validation (Week 5)
13. Test all links
14. Review with SMEs
15. User testing with sample journeys

---

## Success Metrics

Track these metrics before and after implementation:

1. **Support tickets** related to wrong setup guide usage
2. **Time on page** for main APM pages (should decrease if users find right page faster)
3. **Bounce rate** from serverless alert boxes (should decrease)
4. **Click-through rate** on serverless links
5. **User feedback** on documentation helpfulness

---

## Open Questions for SMEs

1. **Extension config support:** Which .NET tracer configurations are NOT supported in Azure App Service extension?
2. **Version compatibility:** Should we add warnings about keeping extension version in sync with NuGet packages?
3. **Profiler support:** Should we explicitly call out that Profiler doesn't work in Azure Functions?
4. **Cold start concerns:** Should we add sections about cold start performance for each serverless platform?
5. **Migration guides:** Do we need separate "migrating from X to Y" guides?

---

*End of Recommendations Document*
