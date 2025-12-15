---
title: Set up Datadog Agent for OpenLineage Proxy
description: Configure the Datadog Agent to proxy OpenLineage events to Datadog Data Observability.
further_reading:
  - link: '/data_observability/data_quality'
    tag: 'Documentation'
    text: 'Learn about Data Quality monitoring'
---

## Overview

You can configure the Datadog Agent to act as a proxy for [OpenLineage events][1], forwarding them to Datadog. This is useful for centralizing configuration and avoiding the need to distribute API keys to every application.

Replace the hostname in the examples with the relevant [Datadog site][2] for your organization. You can find your Datadog site by [following these instructions][3]. This example uses `datadoghq.com`.

## Prerequisites

Ensure you have the Datadog Agent installed and running on your host. If not, follow the [official Datadog Agent installation instructions][4] for your operating system.

After installation, locate the `datadog.yaml` configuration file. This file is typically found in:

- **Linux**: `/etc/datadog-agent/datadog.yaml`
- **macOS**: `/opt/datadog-agent/etc/datadog.yaml`

## Enable the OpenLineage proxy

To enable the OpenLineage proxy:

1. Add the following configuration to your `datadog.yaml` file:

   ```yaml
   ol_proxy_config:
     enabled: true
     ddurl: datadoghq.com  # optional - defaults to regular Agent DD_SITE
     api_key: ***  # optional - defaults to regular Agent DD_API_KEY
   ```

2. After modifying `datadog.yaml`, restart the Datadog Agent for the changes to take effect:

   ```bash
   sudo systemctl restart datadog-agent
   # Or
   sudo service datadog-agent restart
   ```

You can verify the agent is running and the proxy is active by checking the Datadog Agent logs.

## Configure your application to use the proxy

After the Datadog Agent is configured as an OpenLineage proxy, direct your applications to send OpenLineage events to the Agent's listen port instead of directly to the OpenLineage collector.

### Set the OpenLineage environment variables

Change the `OPENLINEAGE_URL` environment variable in your application's environment to point to the Datadog Agent's proxy address. Assuming the Datadog Agent is running on the same host as your application, and the agent is listening on default port `8126`:

```bash
export OPENLINEAGE_URL="http://localhost:8126"
export OPENLINEAGE_ENDPOINT="openlineage/api/v1/lineage"
```

If your Datadog Agent is on a different host, replace `localhost` with the Agent's IP address or hostname.

### Ensure OpenLineage client is configured correctly

Your application should be using an OpenLineage client library (for example, `openlineage-python` or `openlineage-dbt`). The client library picks up the `OPENLINEAGE_URL` environment variable. There is no need to specify `OPENLINEAGE_API_KEY`, as the Agent uses its own.

### Run your application

Execute your application or data job that generates OpenLineage events. These events are sent to the Datadog Agent, which then forwards them to Datadog.

Example for dbt Core:

```bash
dbt-ol run --openlineage-dbt-job-name <YOUR_DBT_JOB_NAME>
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://openlineage.io/
[2]: https://openlineage.io/docs/client/python/#predefined-datadog-sites
[3]: /getting_started/site/#access-the-datadog-site
[4]: /getting_started/agent/
