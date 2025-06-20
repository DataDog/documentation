---
title: Setup App and API Protection for Python on macOS
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

This guide explains how to set up App and API Protection (AAP) for Python applications running on macOS. The setup involves:
1. Installing the Datadog Python library
2. Configuring your Python application
3. Enabling AAP monitoring

## Prerequisites

- macOS system
- Python application
- Datadog Agent installed
- Python 3.6 or higher

## Setup

### 1. Update your Datadog Python library package

Update your `ddtrace` package to at least version 1.2.2:

```shell
pip install --upgrade ddtrace
```

### 2. Enable AAP when starting your application

Set the environment variable and use `ddtrace-run`:

```bash
export DD_APPSEC_ENABLED=true
ddtrace-run python app.py
```

### 3. Configure service identification

Set the following environment variables for proper service identification:

```bash
export DD_SERVICE=your-service-name
export DD_ENV=your-environment
```

### 4. Using launchd service (optional)

If you're using launchd to manage your application, create a plist file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.yourcompany.yourapp</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/ddtrace-run</string>
        <string>/usr/bin/python3</string>
        <string>/path/to/your/app.py</string>
    </array>
    <key>EnvironmentVariables</key>
    <dict>
        <key>DD_APPSEC_ENABLED</key>
        <string>true</string>
        <key>DD_SERVICE</key>
        <string>your-service-name</string>
        <key>DD_ENV</key>
        <string>your-environment</string>
    </dict>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
</dict>
</plist>
```

Save this as `~/Library/LaunchAgents/com.yourcompany.yourapp.plist` and load it:

```bash
launchctl load ~/Library/LaunchAgents/com.yourcompany.yourapp.plist
```

### 5. Using Homebrew services (optional)

If you installed Python via Homebrew, you can also use Homebrew services:

```bash
brew services start your-app
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