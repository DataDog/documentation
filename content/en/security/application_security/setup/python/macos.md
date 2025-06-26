---
title: Setup App and API Protection for Python on macOS
code_lang: macos
type: multi-code-lang
code_lang_weight: 40
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

This guide explains how to set up App and API Protection (AAP) for Python applications running on macOS. The setup involves:
1. Installing the Datadog Python library
2. Configuring your Python application
3. Enabling AAP monitoring
4. Configure service identification

{{% appsec-getstarted %}}

## Operating System Prerequisites

- macOS operating system
- Homebrew (recommended for Agent installation)
- Administrator privileges for some configuration steps
- Python 3.6 or higher

## Setup

### 1. Install the Datadog Agent

#### Using Homebrew (recommended)

```bash
brew install datadog/datadog/datadog-agent
```

#### Manual installation

1. Download the macOS installer from the [Datadog Agent installation page][2]
2. Open the downloaded `.dmg` file
3. Follow the installation wizard

### 2. Update your Datadog Python library package

**Update your Datadog Python library package** to at least version 1.2.2. Run the following:

```shell
pip install --upgrade ddtrace
```

To check that your service's language and framework versions are supported for AAP capabilities, see [Compatibility][1].

### 3. Enable AAP when starting your application

Set the environment variable and use `ddtrace-run`:

```bash
export DD_APPSEC_ENABLED=true
ddtrace-run python app.py
```

### 4. Configure service identification

Set the following environment variables for proper service identification:

```bash
export DD_SERVICE=your-service-name
export DD_ENV=your-environment
```

#### 4.1. Using launchd service (optional)

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

#### 4.2. Using Homebrew services (optional)

If you installed Python via Homebrew, you can also use Homebrew services:

```bash
brew services start your-app
```

{{% appsec-verify-setup %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/compatibility/python/
