---
title: Issues getting integrations working
kind: faq
---

Datadog has quite a [few integrations][1] which are set up through YAML files in the Agent.

Here is a quick guide for troubleshooting getting integrations installed:

1. Run the [info command][2]
2. Is the integration showing up in the [info command][2]?
    * No, it's not.
        1. Check the configuration file, make sure it is in the right location and named correctly.
        2. Check it in a YAML parser to make sure it has the correct syntax. Example files can be found here.
        3. If you moved or changed the file, [restart the Agent][3] and then rerun the info command to see if it is now showing up.
    * Yes, it's there.
        1. Check the Metrics Explorer to see if system metrics are showing up from the host. For example, look for system.cpu.user from the host that is running the Agent and has that integration setup.
        2. If there are still no metrics, check the logs for errors and send them along, with the info command output, to support@datadoghq.com.

[1]: /integrations
[2]: /agent/faq/agent-status-and-information
[3]: /agent/faq/agent-commands/#start-stop-restart-the-agent
