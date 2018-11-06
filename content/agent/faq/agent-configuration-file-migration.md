---
title: Agent configuration file migration
kind: faq
further_reading:
---

[If you haven't done it already, upgrade your Agent v5 to Agent v6][1]

To automatically transition Agent configuration paths and formats from Agent v5 to Agent v6, use the `import` command. The command parses an existing v5 `datadog.conf` and converts the configuration options to the new v6 `datadog.yaml` format. It also copies configuration files for checks that are currently enabled.

{{< tabs >}}
{{% tab "Linux" %}}

`sudo -u dd-agent -- datadog-agent import`

{{% /tab %}}
{{% tab "macOS" %}}

`datadog-agent import <OLD_CONFIGURATION_DIRECTORY> <DESTINATION_DIRECTORY>`

With:

* `<OLD_CONFIGURATION_DIRECTORY>` is the directory containing the `datadog.conf` file
* `<DESTINATION_DIRECTORY>` is the directory where the imported `datadog.yaml` is written (you can use the same directory as `<OLD_CONFIGURATION_DIRECTORY>`).

{{% /tab %}}
{{% tab "Windows" %}}

`datadog-agent import <OLD_CONFIGURATION_DIRECTORY> <DESTINATION_DIRECTORY>`

With:

* `<OLD_CONFIGURATION_DIRECTORY>` is the directory containing the `datadog.conf` file
* `<DESTINATION_DIRECTORY>` is the directory where the imported `datadog.yaml` is written (you can use the same directory as `<OLD_CONFIGURATION_DIRECTORY>`).

**Note**: `datadog.conf` is automatically upgraded to `datadog.yaml` on upgrade.

{{% /tab %}}
{{< /tabs >}}

[1]: /agent/faq/upgrade-to-agent-v6