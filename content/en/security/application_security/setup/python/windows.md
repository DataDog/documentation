---
title: Setup App and API Protection for Python on Windows
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

{{< partial name="api_security/callout.html" >}}

{{< partial name="api_security/python/overview.html" >}}

This guide explains how to set up App and API Protection (AAP) for Python applications running on Windows. The setup involves:
1. Installing the Datadog Python library
2. Configuring your Python application
3. Enabling AAP monitoring

## Prerequisites

- Windows system
- Python application
- Datadog Agent installed
- Python 3.6 or higher

## Setup

### 1. Update your Datadog Python library package

Update your `ddtrace` package to at least version 1.2.2:

```cmd
pip install --upgrade ddtrace
```

### 2. Enable AAP when starting your application

Set the environment variable and use `ddtrace-run`:

```cmd
set DD_APPSEC_ENABLED=true
ddtrace-run python app.py
```

### 3. Configure service identification

Set the following environment variables for proper service identification:

```cmd
set DD_SERVICE=your-service-name
set DD_ENV=your-environment
```

### 4. Using Windows Service (optional)

If you're using Windows Services to manage your application, you can create a batch file:

```batch
@echo off
set DD_APPSEC_ENABLED=true
set DD_SERVICE=your-service-name
set DD_ENV=your-environment
ddtrace-run python C:\path\to\your\app.py
```

### 5. Using PowerShell (alternative)

You can also use PowerShell to set environment variables:

```powershell
$env:DD_APPSEC_ENABLED="true"
$env:DD_SERVICE="your-service-name"
$env:DD_ENV="your-environment"
ddtrace-run python app.py
```

## Verify setup

To verify that AAP is working correctly:

1. Start your application with the environment variables set
2. Send some traffic to your application
3. Check the [Application Signals Explorer][1] in Datadog
4. Look for security signals and vulnerabilities

## Troubleshooting

If you encounter issues while setting up App and API Protection for your Python application, see the [Python App and API Protection troubleshooting guide][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec
[2]: /security/application_security/setup/python/troubleshooting 