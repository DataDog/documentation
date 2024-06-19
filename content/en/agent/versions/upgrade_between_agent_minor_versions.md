---
title: Upgrade Between Datadog Agent Minor Versions
aliases:
  - /agent/faq/upgrade-between-agent-minor-versions
  - /agent/guide/upgrade-between-agent-minor-versions
---

## Upgrade between minor versions of Agent 6 and 7

{{< tabs >}}
{{% tab "Linux" %}}

The recommended way to upgrade between minor versions of Agent 6 and 7 is to use the `install_script_agent6.sh` and `install_script_agent7.sh` scripts. The following commands work on all supported Linux distributions.

Upgrading to a given Agent 6 minor version:

: `DD_AGENT_MINOR_VERSION=<target_minor> bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_script_agent6.sh)"`

Upgrading to the latest Agent 6 minor version:

: `bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_script_agent6.sh)"`

Upgrading to a given Agent 7 minor version:

: `DD_AGENT_MINOR_VERSION=<target_minor> bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_script_agent7.sh)"`

Upgrading to the latest Agent 7 minor version:

: `bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

Download and install the specific version's installation package.

URL to download a specific Agent 6 minor version:

: `https://ddagent-windows-stable.s3.amazonaws.com/ddagent-cli-6.<minor_version>.<bugfix_version>.msi`

URL to download a specific Agent 7 minor version

: `https://ddagent-windows-stable.s3.amazonaws.com/ddagent-cli-7.<minor_version>.<bugfix_version>.msi`

{{% /tab %}}
{{% tab "MacOS" %}}

**Note**: It is not possible to upgrade to a specific minor version.

Command to upgrade to the latest Agent 6 minor version:

: `DD_AGENT_MAJOR_VERSION=6 bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_mac_os.sh)"`

Command to upgrade to the latest Agent 7 minor version:

: `DD_AGENT_MAJOR_VERSION=7 bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_mac_os.sh)"`

{{% /tab %}}
{{< /tabs >}}
