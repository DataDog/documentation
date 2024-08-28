---
title: High CPU or Memory Consumption
disable_toc: false
further_reading:
- link: "/agent/troubleshooting/send_a_flare/"
  tag: "Documentation"
  text: "Send an Agent Flare"
- link: "/agent/troubleshooting/agent_check_status/"
  tag: "Documentation"
  text: "Get the Status of an Agent Check"
---

Several factors can cause high Agent CPU or memory consumption. If you try the steps below and continue to have trouble, [contact Datadog Support for further assistance](#reach-out-to-datadog-support).

### Common causes of high CPU or memory consumption

- An integration is returning thousands of metrics, or is running a large number of check instances. You can see a summary of the running check instances, as well as the number of metrics collected, by running [the `status` CLI command][2] and checking the **Collector** section.
- The Agent's Python or Go runtime is causing high resource consumption. Enable [Live Processes Monitoring][3] to check if the Agent process is consuming unexpected amounts of memory or CPU. You can also use your operating system's activity manager to check Agent process resource consumption.
- The Agent is monitoring a large number of processes. This is configured in the [Process Check configuration file][4].
- The Agent's behavior is triggering Windows anti-malware or antivirus tools, causing high CPU usage.
- The Agent is forwarding a very large number of log lines or DogStatsD metrics.

### Adjustments to reduce resource usage

Here are some adjustments you can make to your Agent configuration to reduce resource usage:

- For integrations that have many check instances or are collecting large numbers of metrics, adjust the `min_collection_interval` in the integration's `conf.yaml` file. In general, the Agent runs each check instance every 10 to 15 seconds. Setting `min_collection_interval` to 60 seconds or more can help reduce resource consumption. For more information on the check collection interval, see the [Custom Agent Check documentation][5].
- Check if an integration is configured to use Autodiscovery, or if an integration is using a wildcard (`*`) that could be scoped more specifically. For more information on Autodiscovery, see [Basic Agent Autodiscovery][6].

## Reach out to Datadog Support

If none of the above solutions are right for your situation, [reach out to Datadog Support][1]. Make sure you've enabled [Live Processes Monitoring][3] to confirm that the Agent process is consuming unexpected amounts of memory or CPU.

When opening a ticket, include information on how you are confirming the issue and what steps you have taken so far. Depending on whether or not you can isolate the problem to a single integration, include information from one of the following sections.

### High consumption isolated to a single integration

If only one integration is consuming high amounts of memory, send a debug-level flare along with Python memory profile output:
1. To enable debug mode, [follow the Debug Mode documentation][7].
1. To send a profile, append the `--profile 30` flag to the flare command:
   {{< code-block lang="shell">}}sudo datadog-agent flare --profile 30{{< /code-block >}}
   The command takes approximately 30 seconds to run while it collects profile information.

1. For the Python memory profile, capture the output of this command:
   {{< code-block lang="shell">}}sudo -u dd-agent -- datadog-agent check <check name> -m -t 10{{< /code-block >}}

### High consumption not associated with a single integration

If the high memory consumption is not associated with a single integration, send a debug-level flare with a profile, collected during a period when the Agent is using more memory or CPU than expected:
1. To enable debug mode, [follow the Debug Mode documentation][7].
1. To send a profile, append the `--profile 30` flag to the flare command:
   {{< code-block lang="shell">}}sudo datadog-agent flare --profile 30{{< /code-block >}}
   The command takes approximately 30 seconds to run while it collects profile information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /agent/basic_agent_usage/#cli
[3]: /infrastructure/process/
[4]: /integrations/process/#configuration
[5]: /developers/write_agent_check/#collection-interval
[6]: /getting_started/containers/#enable-autodiscovery
[7]: /agent/troubleshooting/debug_mode/
