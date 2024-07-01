---
title: Use Community and Marketplace Integrations
aliases:
  - /agent/guide/community-integrations-installation-with-docker-agent
further_reading:
  - link: /agent/troubleshooting/
    tag: Documentation
    text: Agent Troubleshooting
  - link: /developers/integrations/agent_integration
    tag: Documentation
    text: Create a New Integration
---

## Overview

Community developed integrations for the Datadog Agent are stored in the Datadog [integrations-extra][1] GitHub repository. They are not packaged with the Agent, but can be installed as add-ons.

## Setup

For new users, download and install the latest version of the [Datadog Agent][2].

### Installation

{{< tabs >}}
{{% tab "Agent v7.21+ / v6.21+" %}}

For Agent v7.21+ / v6.21+:

1. Run the following command to install the Agent integration:

    ```
    datadog-agent integration install -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
    ```
   The version for the integration can be found in the respective changelog on the integration's Github repository
2. Configure your integration similar to core [integrations][1].
3. [Restart the Agent][2].

**Note**: If necessary, prepend `sudo -u dd-agent` to the install command.

[1]: /getting_started/integrations/
[2]: /agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

To use a community or Marketplace integration in a containerized environment, you must build a custom image that includes your desired community integration.

Use the following Dockerfile to build a custom version of the Agent that includes the `<INTEGRATION_NAME>` from [integrations-extras][2]. If you are installing a Marketplace integration, the `<INTEGRATION_NAME>` is available in the configuration instructions.

```dockerfile
FROM gcr.io/datadoghq/agent:latest
RUN datadog-agent integration install -r -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
```

The `datadog-agent integration install` command (run inside Docker) issues the following harmless warning: `Error loading config: Config File "datadog" Not Found in "[/etc/datadog-agent]": warn`. You can ignore this warning.

If you are using Kubernetes, update your Helm chart or Datadog Operator configuration to pull your custom image.

Use [Autodiscovery][1] to enable and configure the integration.

[1]: /agent/autodiscovery/
[2]: https://github.com/DataDog/integrations-extras
{{% /tab %}}

{{% tab "Agent earlier versions" %}}

For Agent < v7.21 / v6.21:

1. Download the files in the `<INTEGRATION_NAME>/datadog_checks/<INTEGRATION_NAME>/` folder from the [integrations-extra repository][1].
2. Place `<INTEGRATION_NAME>.py` and any other Python files in the Agent's `checks.d` directory.
3. Create a new `<INTEGRATION_NAME>.d/` folder in your [Agent configuration directory][2].
4. Place the `conf.yaml.example` file from the `<INTEGRATION_NAME>/datadog_checks/<INTEGRATION_NAME>/data/` folder in the created directory.
4. Rename this file to `conf.yaml`.
5. Configure your integration similar to core [integrations][3].
6. [Restart the Agent][4].



[1]: https://github.com/DataDog/integrations-extras
[2]: /agent/configuration/agent-configuration-files/#agent-configuration-directory
[3]: /getting_started/integrations/
[4]: /agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

If your site restricts network access, ensure you have added all of the [`ip-ranges`][3] to your inclusion list, or download the integration manually.



<br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-extras
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: /agent/configuration/network
