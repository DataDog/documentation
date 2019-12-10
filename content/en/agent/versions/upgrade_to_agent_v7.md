---
title: Upgrade to Datadog Agent v7
kind: documentation
further_reading:
- link: "/agent/guide/python-3"
  tag: "Documentation"
  text: "Migrate your Custom Checks from python 2 to python 3"
---


## From Agent v6 to Agent v7

Run the Agent installation command with the environment variable `DD_AGENT_MAJOR_VERSION=7` in order to upgrade your Agent from version 6 to version 7:

{{< tabs >}}
{{% tab "Linux" %}}

| Platform     | Command                                                                                                                                                                   |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Amazon Linux | `DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"` |
| CentOS       | `DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"` |
| Debian       | `DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"` |
| Fedora       | `DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"` |
| Red Hat      | `DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"` |
| Ubuntu       | `DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"` |
| SUSE         | `DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"` |

{{% /tab %}}
{{% tab "Windows" %}}

XXXXXXX

{{% /tab %}}
{{% tab "MacOS" %}}

```shell
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_mac_os.sh)"
```

{{% /tab %}}
{{< /tabs >}}

## From Agent v5 to Agent v7

Run the Agent installation command with the environment variable `DD_AGENT_MAJOR_VERSION=7` and `DD_UPGRADE="true"` in order to upgrade your Agent from version 5 to version 7. The Agent v7 installer can automatically convert v5 configurations during the upgrade:

{{< tabs >}}
{{% tab "Linux" %}}

| Platform     | Command                                                                                                                                                      |
|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Amazon Linux | `DD_AGENT_MAJOR_VERSION=7 DD_UPGRADE="true" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"` |
| CentOS       | `DD_AGENT_MAJOR_VERSION=7 DD_UPGRADE="true" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"` |
| Debian       | `DD_AGENT_MAJOR_VERSION=7 DD_UPGRADE="true" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"` |
| Fedora       | `DD_AGENT_MAJOR_VERSION=7 DD_UPGRADE="true" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"` |
| Red Hat      | `DD_AGENT_MAJOR_VERSION=7 DD_UPGRADE="true" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"` |
| Ubuntu       | `DD_AGENT_MAJOR_VERSION=7 DD_UPGRADE="true" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"` |
| SUSE         | `DD_AGENT_MAJOR_VERSION=7 DD_UPGRADE="true" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"` |

{{% /tab %}}
{{% tab "Windows" %}}

XXXXX

{{% /tab %}}
{{% tab "MacOS" %}}

```shell
DD_UPGRADE="true" DD_AGENT_MAJOR_VERSION=7 bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_mac_os.sh)"
```

{{% /tab %}}
{{< /tabs >}}

**Note:** The import process won't automatically move **custom** Agent checks. This is by design as we cannot guarantee full backwards compatibility out of the box.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
