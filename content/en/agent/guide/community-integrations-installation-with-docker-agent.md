---
title: Install a community integration with the Agent
kind: guide
disable_toc: true
further_reading:
- link: "agent/troubleshooting/"
  tag: "Documentation"
  text: "Agent Troubleshooting"
- link: "agent/guide/agent-configuration-files/"
  tag: "FAQ"
  text: "Agent configuration files"
- link: "agent/guide/agent-commands/"
  tag: "FAQ"
  text: "Agent commands"
---

Datadog community integrations are stored in the [Integrations-extra][1] Github repository. Since they are non-officially supported by Datadog, they are not packaged with the Datadog Agent and needs to be build locally in order to be included in the Agent. Find below how to install them with your Datadog Agent running as a binary on a host or as a container.

{{< tabs >}}
{{% tab "Agent 6.8+" %}}

To install the `<INTEGRATION_NAME>` check on your host:

1. Install the [developer toolkit][1] on one host.
2. Run `ddev -e release build <INTEGRATION_NAME>` to build the `<INTEGRATION_NAME>` package.
3. [Download the Datadog Agent][2].
4. Upload the build artifact of step 2. to any host with an Agent and run `datadog-agent integration install -w <PATH_OF_INTEGRATION_NAME_PACKAGE>/<ARTIFACT_NAME>.whl`.
5. Configure your integration like any other packaged integration.
6. [Restart the Agent][3].

[1]: https://docs.datadoghq.com/developers/integrations/new_check_howto/#developer-toolkit
[2]: https://app.datadoghq.com/account/settings#agent
[3]: /agent/guide/agent-commands/?tab=agentv6#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

The best way to use an integration from integrations-extra with the Docker Agent is to build the Agent with this integration installed. Use the following Dockerfile to build an updated version of the Agent that includes the `<INTEGRATION_NAME>` integration from integrations-extras.

```dockerfile
FROM python:2.7 AS wheel_builder
WORKDIR /wheels
RUN pip install "datadog-checks-dev[cli]"
RUN git clone https://github.com/DataDog/integrations-extras.git
RUN ddev config set extras ./integrations-extras
RUN ddev -e release build <INTEGRATION_NAME>

FROM datadog/agent:latest
COPY --from=wheel_builder /wheels/integrations-extras/<INTEGRATION_NAME>/dist/ /dist
RUN agent integration install -r -w /dist/*.whl
```

The use this new Agent image in combination with [Autodiscovery][1] in order to enable the `<INTEGRATION_NAME>` check.

[1]: agent/autodiscovery
{{% /tab %}}
{{% tab "Agent 6.8-" %}}

To install the `<INTEGRATION_NAME>` check on your host:

1. [Download the Datadog Agent][1] on your host.
2. Download the `<INTEGRATION_NAME>.py` file in the `<INTEGRATION_NAME>/datadog_checks/<INTEGRATION_NAME>/` folder from the [integrations-extra repository][2]
3. Place it in the Agent's `checks.d` directory.
4. Download the `conf.yaml.example` file in the `<INTEGRATION_NAME>/datadog_checks/<INTEGRATION_NAME>/data/` folder from the [integrations-extra repository][2]
5. Rename this file into `conf.yaml`.
6. Create a new `<INTEGRATION_NAME>.d/` folder in your [Agent configuration directory][3].
7. Place the `conf.yaml` file in the directory created in step 6.
8. Configure your integration like any other packaged integration.
9. [Restart the Agent][4].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-extras
[3]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: /agent/guide/agent-commands/?tab=agentv6#restart-the-agent
{{% /tab %}}
{{< /tabs >}}
[1]: https://github.com/DataDog/integrations-extras
