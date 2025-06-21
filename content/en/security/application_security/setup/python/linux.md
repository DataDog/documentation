---
title: Setup App and API Protection for Python on Linux
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

This guide explains how to set up App and API Protection (AAP) for Python applications running on Linux systems. The setup involves:
1. Installing the Datadog Python library
2. Configuring your Python application
3. Enabling AAP monitoring

## Prerequisites

- Linux system (Ubuntu, CentOS, RHEL, etc.)
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

### 4. Using systemd service (optional)

If you're using systemd to manage your application, create a service file:

```ini
[Unit]
Description=Your Python App with AAP
After=network.target

[Service]
Type=simple
User=your-user
Environment=DD_APPSEC_ENABLED=true
Environment=DD_SERVICE=your-service-name
Environment=DD_ENV=your-environment
ExecStart=/usr/local/bin/ddtrace-run /usr/bin/python3 /path/to/your/app.py
Restart=always

[Install]
WantedBy=multi-user.target
```

Save this as `/etc/systemd/system/your-app.service` and enable it:

```bash
sudo systemctl daemon-reload
sudo systemctl enable your-app
sudo systemctl start your-app
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