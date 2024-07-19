---
title: Upgrade Between Datadog Agent Minor Versions
aliases:
  - /agent/faq/upgrade-between-agent-minor-versions
  - /agent/guide/upgrade-between-agent-minor-versions
  - /agent/versions/upgrade_between_agent_minor_versions/
---

## Upgrade between minor versions of the Agent

{{< tabs >}}
{{% tab "Linux" %}}

The recommended way to upgrade between minor versions of the Agent is to use the `install_script_agent7.sh` script. The following commands work on all supported Linux distributions.

Upgrading to a given Agent minor version:

: `DD_AGENT_MINOR_VERSION=<target_minor> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"`

Upgrading to the latest Agent minor version:

: `bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

Download and install the specific version's installation package.

URL to download a specific Agent minor version

: `https://ddagent-windows-stable.s3.amazonaws.com/ddagent-cli-7.<minor_version>.<bugfix_version>.msi`

{{% /tab %}}
{{% tab "MacOS" %}}

The recommended way to upgrade between minor version of the Agent is to use the `install_mac_os.sh` script. The following commands work on all supported MacOS versions.

Upgrading to a given Agent minor version:

: `DD_AGENT_MINOR_VERSION=<target_minor> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"`

Upgrading to the latest Agent minor version:

: `bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"`

{{% /tab %}}
{{< /tabs >}}
