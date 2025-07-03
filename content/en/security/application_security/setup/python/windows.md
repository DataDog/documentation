---
title: Setup App and API Protection for Python on Windows
code_lang: windows
type: multi-code-lang
code_lang_weight: 50
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

{{< partial name="app_and_api_protection/callout.html" >}}

{{< partial name="app_and_api_protection/python/overview.html" >}}

This guide explains how to set up App and API Protection (AAP) for Python applications running on Windows. The setup involves:
1. Installing the Datadog Python library
2. Configuring your Python application
3. Enabling AAP monitoring
4. Configure service identification

{{% appsec-getstarted %}}

## Operating System Prerequisites

- Windows system
- Administrator privileges for some configuration steps
- Python 3.6 or higher

## Setup

### 1. Install the Datadog Agent

If you haven't already, install the Datadog Agent on your Windows host. You can download the installer from the [Datadog Agent installation page](https://docs.datadoghq.com/agent/basic_agent_usage/windows/).

### 2. Update your Datadog Python library package

**Update your Datadog Python library package** to at least version 1.2.2. Run the following:

```shell
pip install --upgrade ddtrace
```

To check that your service's language and framework versions are supported for AAP capabilities, see [Compatibility][1].

### 3. Enable AAP when starting your application

Set the environment variable and use `ddtrace-run`:

```cmd
set DD_APPSEC_ENABLED=true
ddtrace-run python app.py
```

### 4. Configure service identification

Set the following environment variables for proper service identification:

```cmd
set DD_SERVICE=your-service-name
set DD_ENV=your-environment
```

#### 4.1. Using Windows Service (optional)

If you're using Windows Services to manage your application, you can create a batch file:

```batch
@echo off
set DD_APPSEC_ENABLED=true
set DD_SERVICE=your-service-name
set DD_ENV=your-environment
ddtrace-run python C:\path\to\your\app.py
```

#### 4.2. Using PowerShell (alternative)

You can also use PowerShell to set environment variables:

```powershell
$env:DD_APPSEC_ENABLED="true"
$env:DD_SERVICE="your-service-name"
$env:DD_ENV="your-environment"
ddtrace-run python app.py
```

{{% appsec-verify-setup %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/compatibility/python/
