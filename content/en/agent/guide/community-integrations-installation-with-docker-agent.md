---
title: Community integration installation
kind: guide
further_reading:
- link: "/agent/troubleshooting/"
  tag: "Documentation"
  text: "Agent Troubleshooting"
- link: "/agent/guide/agent-configuration-files/"
  tag: "FAQ"
  text: "Agent configuration files"
- link: "/agent/guide/agent-commands/"
  tag: "FAQ"
  text: "Agent commands"
---

Community developed integrations for the Datadog Agent are stored in the [Integrations-extra][1] Github repository. They are not packaged and built into the Datadog Agent, but can be installed as add-ons by following these instructions:

{{< tabs >}}
{{% tab "Agent above v6.8" %}}

To install the `<INTEGRATION_NAME>` check on your host:

1. [Download and launch the Datadog Agent][1].
2. Run the following command to install the integrations with the Agent:

    ```
    datadog-agent integration install -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
    ```

3. Configure your integration like [any other packaged integration][2].
4. [Restart the Agent][3].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /getting_started/integrations/
[3]: /agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

The best way to use an integration from integrations-extra with the Docker Agent is to build the Agent with this integration installed. Use the following Dockerfile to build an updated version of the Agent that includes the `<INTEGRATION_NAME>` integration from integrations-extras.

```dockerfile
FROM gcr.io/datadoghq/agent:latest
RUN agent integration install -r -t datadog-<INTEGRATION_NAME>==<INTEGRATION_VERSION>
```

The `agent integration install` command run inside docker will issue the following harmless warning: `Error loading config: Config File "datadog" Not Found in "[/etc/datadog-agent]": warn`. This warning can be ignored.

Then use this new Agent image in combination with [Autodiscovery][1] in order to enable the `<INTEGRATION_NAME>` check.

[1]: /agent/autodiscovery/
{{% /tab %}}
{{% tab "Agent prior to 6.8" %}}

To install the `<INTEGRATION_NAME>` check on your host:

1. [Download the Datadog Agent][1] on your host.
2. Download the `<INTEGRATION_NAME>.py` file in the `<INTEGRATION_NAME>/datadog_checks/<INTEGRATION_NAME>/` folder from the [integrations-extra repository][2]
3. Place it in the Agent's `checks.d` directory.
4. Download the `conf.yaml.example` file in the `<INTEGRATION_NAME>/datadog_checks/<INTEGRATION_NAME>/data/` folder from the [integrations-extra repository][2]
5. Rename this file into `conf.yaml`.
6. Create a new `<INTEGRATION_NAME>.d/` folder in your [Agent configuration directory][3].
7. Place the `conf.yaml` file in the directory created in step 6.
8. Configure your integration like [any other packaged integration][4].
9. [Restart the Agent][5].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-extras
[3]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: /getting_started/integrations/
[5]: /agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-extras
