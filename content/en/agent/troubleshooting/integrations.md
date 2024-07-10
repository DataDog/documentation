---
title: Getting Integrations Working
aliases:
    - /integrations/faq/issues-getting-integrations-working
further_reading:
- link: "/agent/troubleshooting/debug_mode/"
  tag: "Documentation"
  text: "Agent debug mode"
- link: "/agent/troubleshooting/send_a_flare/"
  tag: "Documentation"
  text: "Send an Agent flare"
- link: "/agent/troubleshooting/agent_check_status/"
  tag: "Documentation"
  text: "Get the status of an Agent check"
---

Datadog integrations are configured through the Datadog Agent using YAML configuration files. For the path to the configuration directory for your operating system, consult the [Agent Configuration Files][1] documentation.

If an integration that you've configured is not showing up in Datadog, run the [`status` CLI command][2] and look for the integration under the *Running Checks* heading.

**Note**: Community, Partner, and Marketplace integrations are not retained when the Agent is upgraded. These integrations need to be re-installed upon upgrading the Agent version.

If the integration is listed under **Running Checks**, but is not visible in the Datadog app:
1. Make sure there are no errors or warnings listed under the integration's entry in the `status` output.
1. Check the [Metrics Explorer][3] to see if system metrics are showing up from the host. For example, on the host where you configured the integration, look for `system.cpu.user`.
1. If there are still no metrics, check the [Datadog logs][4] for errors and send them along with the `status` command output to [Datadog support][5].

If the integration is not listed under **Running Checks**:
1. Make sure that the configuration file for the integration is in the right location and named correctly.
1. [Consult the documentation][6] for the integration to check that you've configured it correctly.
1. Check the configuration file using a [YAML parser][7] to make sure the YAML is valid.
1. Each time you move or change the file, [restart the Agent][8] and run the `status` command again to check for changes.
1. If you still can't get the integration to appear in the `status` output, check the [Datadog Logs][4] for errors and send them to [Datadog support][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/configuration/agent-configuration-files/#agent-configuration-directory
[2]: /agent/configuration/agent-commands/#agent-information
[3]: https://app.datadoghq.com/metric/explorer
[4]: /agent/configuration/agent-log-files/
[5]: /help/
[6]: /integrations/
[7]: https://codebeautify.org/yaml-parser-online
[8]: /agent/configuration/agent-commands/#start-stop-restart-the-agent
