---
title: Tabs
---

## Overview

This page contains examples of the tabs component.

## Test cases

- The first tab in each group is selected on initial load.
- Only the active tab's content is visible in each group.
- Tab buttons display the correct labels.
- Clicking a tab reveals its content and hides the previously active tab's content.
- The mixed content tab displays nested components (code block, alert) when selected.
- The tables tab displays table content when selected.
- The URL updates with a `tab` query parameter when a tab is clicked.
- When there are too many tabs to fit in a traditional layout, the tabs automatically switch to pills.

## Examples

### Two tabs

{% tabs %}

{% tab label="Python" %}
Install the Datadog Python library:

```python {% filename="install.sh" collapsible=false disable_copy=false wrap=false %}
pip install datadog
```
{% /tab %}

{% tab label="Ruby" %}
Install the Datadog Ruby library:

```ruby {% filename="install.sh" collapsible=false disable_copy=false wrap=false %}
gem install datadog
```
{% /tab %}

{% /tabs %}

### Three tabs

{% tabs %}

{% tab label="Linux" %}
Run the following command to install the Agent on Linux:

```bash {% filename="install.sh" collapsible=false disable_copy=false wrap=false %}
DD_API_KEY=YOUR_API_KEY bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script.sh)"
```
{% /tab %}

{% tab label="macOS" %}
Run the following command to install the Agent on macOS:

```bash {% filename="install.sh" collapsible=false disable_copy=false wrap=false %}
DD_API_KEY=YOUR_API_KEY bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
```
{% /tab %}

{% tab label="Windows" %}
Download and run the MSI installer from the Datadog Agent integration page.
{% /tab %}

{% /tabs %}

### Tabs with plain text

{% tabs %}

{% tab label="Overview" %}
The Datadog Agent is lightweight software that runs on your hosts. It collects events and metrics from hosts and sends them to Datadog.
{% /tab %}

{% tab label="Requirements" %}
The Agent requires:

- A supported operating system
- A valid API key
- Network access to the Datadog intake endpoint
{% /tab %}

{% /tabs %}

### Tabs with mixed content

{% tabs %}

{% tab label="Configuration" %}
Update the main configuration file:

```yaml {% filename="datadog.yaml" collapsible=false disable_copy=false wrap=false %}
api_key: YOUR_API_KEY
logs_enabled: true
```

{% alert level="info" %}
Restart the Agent after modifying the configuration.
{% /alert %}
{% /tab %}

{% tab label="Validation" %}
Run the status command to verify the Agent is running:

```bash {% filename="status.sh" collapsible=false disable_copy=false wrap=false %}
datadog-agent status
```

Look for `API Key status: OK` in the output.
{% /tab %}

{% /tabs %}

### Tabs with tables

{% tabs %}

{% tab label="Required parameters" %}
{% table %}
* Parameter
* Description
---
* `api_key`
* Your Datadog API key. Required.
---
* `site`
* The Datadog site to send data to. Defaults to `datadoghq.com`.
{% /table %}
{% /tab %}

{% tab label="Optional parameters" %}
{% table %}
* Parameter
* Description
---
* `hostname`
* Override the detected hostname.
---
* `tags`
* A list of tags to attach to every metric, event, and service check.
{% /table %}
{% /tab %}

{% /tabs %}

### Many tabs (pill layout)

{% tabs %}

{% tab label="Amazon Linux" %}
Install the Agent on Amazon Linux using the RPM package.
{% /tab %}

{% tab label="CentOS / Red Hat" %}
Install the Agent on CentOS or Red Hat using the RPM package.
{% /tab %}

{% tab label="Debian / Ubuntu" %}
Install the Agent on Debian or Ubuntu using the DEB package.
{% /tab %}

{% tab label="Fedora" %}
Install the Agent on Fedora using the RPM package.
{% /tab %}

{% tab label="SUSE / openSUSE" %}
Install the Agent on SUSE or openSUSE using the RPM package.
{% /tab %}

{% tab label="macOS" %}
Install the Agent on macOS using the DMG package.
{% /tab %}

{% tab label="Windows" %}
Install the Agent on Windows using the MSI installer.
{% /tab %}

{% tab label="Docker" %}
Run the Agent as a Docker container.
{% /tab %}

{% tab label="Kubernetes" %}
Deploy the Agent on Kubernetes using the Helm chart.
{% /tab %}

{% /tabs %}
