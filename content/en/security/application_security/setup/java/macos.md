---
title: Setup App and API Protection for Java on macOS
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

{{< callout btn_hidden="true" header="Shortcut options before manual setup:" >}}
**Single Step APM Instrumentation**: For faster setup with automatic instrumentation, consider using [Single Step APM Instrumentation][1] which automatically installs the Datadog SDK with no additional configuration required.

Once SSI is set up, you can enable App and API Protection by going to your APM service in the Datadog app → Service Configuration section → Enable Application Security Monitoring.
{{< /callout >}}

## Overview

Datadog Application Security Management (ASM) provides App and API Protection (AAP) capabilities including:
- **Application Security Monitoring**: Real-time threat detection and protection against attacks like SQL injection, XSS, and more
- **Software Composition Analysis (SCA)**: Identification of vulnerable dependencies in your codebase
- **Interactive Application Security Testing (IAST)**: Runtime vulnerability detection during testing

ASM works by leveraging the Datadog Java tracing library to monitor HTTP requests, analyze patterns, and detect security threats in real-time. The library integrates seamlessly with your existing macOS-hosted application without requiring code changes.

For detailed compatibility information, including supported Java versions, frameworks, and deployment environments, see [Single Step Instrumentation Compatibility][2].

This guide explains how to set up App and API Protection (AAP) for Java applications running on macOS. The setup involves:
1. Installing the Datadog Agent
2. Configuring your Java application
3. Enabling AAP monitoring

## Prerequisites

- macOS operating system
- Java application
- Homebrew (recommended for Agent installation)
- Administrator privileges for some configuration steps

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

## Library setup

To enable AAP capabilities, you need the Datadog Java tracing library (version 0.94.0 or higher) installed in your application environment.

### Download the library

Download the latest version of the Datadog Java library:

```bash
curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
```

### Verify compatibility

To check that your service's language and framework versions are supported for AAP capabilities, see [Single Step Instrumentation Compatibility][2].

## Service configuration

### Standalone billing alternative

If you want to use Application Security Management without APM tracing functionality, you can deploy with [Standalone App and API Protection][4]. This configuration reduces the amount of APM data sent to Datadog to the minimum required by App and API Protection products.

To enable standalone mode:
1. Set `DD_APM_TRACING_ENABLED=false` environment variable
2. Keep `DD_APPSEC_ENABLED=true` environment variable
3. This configuration will minimize APM data while maintaining full security monitoring capabilities

### Enabling AAP

#### Run your application with AAP enabled

Start your Java application with the Datadog agent and AAP enabled:

```bash
java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.enabled=true -Ddd.service=<MY_SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
```

**Important considerations:**
- **File system requirements**: Read-only file systems are not currently supported. The application must have access to a writable `/tmp` directory.
- **Service identification**: Always specify `DD_SERVICE` (or `-Ddd.service`) and `DD_ENV` (or `-Ddd.env`) for proper service identification in Datadog.

### 2. Configure the Datadog Agent

1. Create or edit the Agent configuration file:
   ```bash
   sudo nano /opt/datadog-agent/etc/datadog/datadog.yaml
   ```

2. Add the following configuration:
   ```yaml
   api_key: <YOUR_API_KEY>
   site: <YOUR_DD_SITE>
   apm_config:
     enabled: true
   logs_config:
     enabled: true
   ```

3. Start the Agent:
   ```bash
   sudo launchctl load -w /Library/LaunchDaemons/com.datadoghq.agent.plist
   ```

### 3. Configure your Java application

#### Set environment variables

Set the required environment variables in your shell:

```bash
export DD_APPSEC_ENABLED=true
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_ENV=<YOUR_ENVIRONMENT>
```

For permanent environment variables, add them to your shell profile (e.g., `~/.zshrc` or `~/.bash_profile`):

```bash
echo 'export DD_APPSEC_ENABLED=true' >> ~/.zshrc
echo 'export DD_SERVICE=<YOUR_SERVICE_NAME>' >> ~/.zshrc
echo 'export DD_ENV=<YOUR_ENVIRONMENT>' >> ~/.zshrc
```

## Verify setup

To verify that AAP is working correctly:

1. Send some traffic to your application
2. Check the [Application Signals Explorer][3] in Datadog
3. Look for security signals and vulnerabilities

## Troubleshooting

If you don't see data in Datadog:
1. Verify the Datadog Agent is running:
   ```bash
   sudo launchctl list | grep datadog
   ```
2. Check Agent logs:
   ```bash
   tail -f /opt/datadog-agent/logs/agent.log
   ```
3. Ensure environment variables are set correctly
4. Verify the Java agent is being loaded

Common issues:
- **Agent not running**: Check launchctl status
- **Permission issues**: Run as Administrator if needed
- **Path issues**: Use absolute paths for the Java agent
- **Firewall issues**: Check macOS firewall settings
- **Java version**: Verify Java version compatibility

For more detailed troubleshooting, see the [Troubleshooting guide][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=
[2]: https://app.datadoghq.com/fleet/install-agent/latest?platform=macos
[3]: https://app.datadoghq.com/security/appsec
[4]: /security/application_security/troubleshooting 