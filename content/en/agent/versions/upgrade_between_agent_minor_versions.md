---
title: Upgrade Between Datadog Agent Minor Versions
kind: documentation
aliases:
  - /agent/faq/upgrade-between-agent-minor-versions
  - /agent/guide/upgrade-between-agent-minor-versions
---

## Upgrade Between Minor Versions of Agent 6 and 7

{{< tabs >}}
{{% tab "Linux" %}}

The recommended way to upgrade between minor versions of Agent 6 and 7 is using the `install_script.sh` script. Following commands work on all supported Linux distributions.

Upgrading to a given Agent 6 minor version:

: `DD_AGENT_MAJOR_VERSION=6 DD_AGENT_MINOR_VERSION=<target_minor> bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_script.sh)"`

Upgrading to the latest Agent 6 minor version:

: `DD_AGENT_MAJOR_VERSION=6 bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_script.sh)"`

Upgrading to a given Agent 7 minor version:

: `DD_AGENT_MAJOR_VERSION=7 DD_AGENT_MINOR_VERSION=<target_minor> bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_script.sh)"`

Upgrading to the latest Agent 7 minor version:

: `DD_AGENT_MAJOR_VERSION=7 bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_script.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

Download and install the desired installation package.

URL for a given minor version of Agent 6:

: `https://ddagent-windows-stable.s3.amazonaws.com/ddagent-cli-6.<minor_version>.<bugfix_version>.msi`

URL for a given minor version of Agent 7:

: `https://ddagent-windows-stable.s3.amazonaws.com/ddagent-cli-7.<minor_version>.<bugfix_version>.msi`

{{% /tab %}}
{{% tab "MacOS" %}}

**Note**: There is currently no way to upgrade to a specific minor version.

Upgrading to the latest Agent 6 minor version:

: `DD_AGENT_MAJOR_VERSION=6 bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_mac_os.sh)"`

Upgrading to the latest Agent 7 minor version:

: `DD_AGENT_MAJOR_VERSION=7 bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_mac_os.sh)"`

{{% /tab %}}
{{< /tabs >}}
