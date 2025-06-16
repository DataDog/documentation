---
title: Setup App and API Protection for Java on Linux
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

{{< partial name="api_security/java/callout.html" >}}

{{< partial name="api_security/java/overview.html" >}}

This guide explains how to set up App and API Protection (AAP) for Java applications running on Linux. The setup involves:
1. Installing the Datadog Agent
2. Configuring your Java application
3. Enabling AAP monitoring

## Prerequisites

- Linux operating system
- Java application
- Root or sudo privileges
- Systemd (for service management)

## Setup

### 1. Install the Datadog Agent

#### Using the one-line install script (recommended)

```bash
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=<YOUR_API_KEY> DD_SITE=<YOUR_DD_SITE> bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"
```

#### Manual installation

For Debian/Ubuntu:
```bash
sudo apt-get update
sudo apt-get install -y apt-transport-https curl gnupg
sudo sh -c "echo 'deb https://apt.datadoghq.com/ stable 7' > /etc/apt/sources.list.d/datadog.list"
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys A2923DFF56EDA6E76E55E492D3A80E30382E94DE
sudo apt-get update
sudo apt-get install -y datadog-agent
```

For RHEL/CentOS:
```bash
sudo yum install -y https://yum.datadoghq.com/rpm/x86_64/datadog-agent-7.x.x-1.x86_64.rpm
```

## Library setup

To enable AAP capabilities, you need the Datadog Java tracing library (version 0.94.0 or higher) installed in your application environment.

### Download the library

Download the latest version of the Datadog Java library:

```bash
wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
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

## Verify setup

To verify that AAP is working correctly:

1. Send some traffic to your application
2. Check the [Application Signals Explorer][2] in Datadog
3. Look for security signals and vulnerabilities

## Troubleshooting

If you encounter issues while setting up App and API Protection for your Java application, see the [Java App and API Protection troubleshooting guide][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=linux
[2]: https://app.datadoghq.com/security/appsec
[3]: /security/application_security/setup/java/troubleshooting
[4]: /security/application_security/setup/java/standalone
