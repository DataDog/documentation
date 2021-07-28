---
title: Use Community Integrations
kind: guide
aliases:
  - /agent/guide/community-integrations-installation-with-docker-agent
further_reading:
  - link: "/agent/troubleshooting/"
    tag: "Documentation"
    text: "Agent Troubleshooting"
  - link: "/developers/integrations/new_check_howto"
    tag: "Documentation"
    text: "Create a New Integration"
---

## Overview

Community developed integrations for the Datadog Agent are stored in the Datadog [integrations-extra][1] Github repository. They are not packaged with the Agent, but can be installed as add-ons.

## Setup

For new users, download and install the latest version of the [Datadog Agent][2].

### Installation

Choose your version of the Agent:

{{< tabs >}}
{{% tab "Agent v6.x+" %}}

1. Run the following command to install the Agent integration:

    ```
    datadog-agent integration install --third-party datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
    ```

2. Configure your integration similar to core [integrations][1].
3. [Restart the Agent][2].

**Note**: If necessary, prepend `sudo -u dd-agent` to the install command.

[1]: /getting_started/integrations/
[2]: /agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

The recommended way to use a community integration with the Docker Agent is to build the Agent with the integration installed. Use the following Dockerfile to build an updated version of the Agent that includes the `<INTEGRATION_NAME>` from integrations-extras.

```dockerfile
FROM gcr.io/datadoghq/agent:latest
RUN agent integration install -r -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
```

The `agent integration install` command run inside Docker issues the following harmless warning: `Error loading config: Config File "datadog" Not Found in "[/etc/datadog-agent]": warn`. This warning can be ignored.

Use this new Agent image in combination with [Autodiscovery][1] to enable the `<INTEGRATION_NAME>`.

[1]: /agent/autodiscovery/
{{% /tab %}}
{{% tab "Agent v6.8 to v6.x" %}}

1. Run the following command to install the Agent integration:

    ```
    datadog-agent integration install -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
    ```

2. Configure your integration similar to core [integrations][1].
3. [Restart the Agent][2].


[1]: /getting_started/integrations/
[2]: /agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Agent < v6.8" %}}

1. Download the `<INTEGRATION_NAME>.py` file in the `<INTEGRATION_NAME>/datadog_checks/<INTEGRATION_NAME>/` folder from the [integrations-extra repository][1].
2. Place the `<INTEGRATION_NAME>.py` file in the Agent's `checks.d` directory.
3. Download the `conf.yaml.example` file in the `<INTEGRATION_NAME>/datadog_checks/<INTEGRATION_NAME>/data/` folder from the [integrations-extra repository][1].
4. Rename this file to `conf.yaml`.
5. Create a new `<INTEGRATION_NAME>.d/` folder in your [Agent configuration directory][2].
6. Place the `conf.yaml` file in the created directory.
7. Configure your integration similar to core [integrations][3].
8. [Restart the Agent][4].


[1]: https://github.com/DataDog/integrations-extras
[2]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /getting_started/integrations/
[4]: /agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

<br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-extras
[2]: https://app.datadoghq.com/account/settings#agent
