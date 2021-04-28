---
title: Upgrade to Datadog Agent v6
kind: documentation
aliases:
  - /agent/faq/upgrade-to-agent-v6
  - /agent/guide/upgrade-to-agent-v6
---

<div class="alert alert-info">
Agent v7 is available. <a href="/agent/versions/upgrade_to_agent_v7">Upgrade to the newest version</a> to benefit from all new functionality.
</div>

## Upgrade to Agent 6

If you have Agent v5 already installed, a script is available to automatically install or upgrade to the new Agent. It sets up the package repositories and installs the Agent package for you. When upgrading, the import tool also searches for an existing `datadog.conf` from a prior version, and converts Agent and check configurations according to the new v6 format. Select your platform below for specific instructions. You can either download the [DMG package and install it manually](#manual-upgrade), or use the [one-line install script](#one-step-upgrade).

## One-step upgrade

{{< tabs >}}
{{% tab "Linux" %}}

The Agent v6 installer can automatically convert v5 configurations during the upgrade:

| Platform     | Command                                                                                                                           |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------|
| Amazon Linux | `DD_UPGRADE=true bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"` |
| CentOS       | `DD_UPGRADE=true bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"` |
| Debian       | `DD_UPGRADE=true bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"` |
| Fedora       | `DD_UPGRADE=true bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"` |
| Red Hat      | `DD_UPGRADE=true bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"` |
| Ubuntu       | `DD_UPGRADE=true bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"` |
| SUSE         | `DD_UPGRADE=true bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"` |

**Note:** The import process won't automatically move **custom** Agent checks. This is by design as Datadog cannot guarantee full backwards compatibility out of the box.

{{% /tab %}}
{{% tab "Windows" %}}

There is no one step install for Windows platforms, refer to the [Manual Upgrade](#manual-upgrade).

{{% /tab %}}
{{% tab "MacOS" %}}

The Agent v6 installer can automatically convert v5 configurations during the upgrade:

```shell
DD_UPGRADE=true bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_mac_os.sh)"
```

**Note:** The import process won't automatically move **custom** Agent checks. This is by design as Datadog cannot guarantee full backwards compatibility out of the box.

{{% /tab %}}
{{< /tabs >}}

## Manual upgrade

{{< tabs >}}
{{% tab "Linux" %}}

Find below the manual upgrade instructions for:

* [Amazon Linux](#amazon-linux)
* [CentOS](#centos)
* [Debian](#debian)
* [Fedora](#fedora)
* [Red Hat](#red-hat)
* [SUSE](#suse)
* [Ubuntu](#ubuntu)

### Amazon Linux

1. Set up Datadog's Yum repo on your system by creating `/etc/yum.repos.d/datadog.repo` with the contents:
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY.public
    ```

2. Update your local Yum repo and install the Agent:
    ```
    sudo yum makecache
    sudo yum install datadog-agent
    ```

3. Copy the example configuration into place and plug in your API key:
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. Transition your Agent configuration paths and formats from Agent v5 to Agent v6 with the `import` command. The command parses an existing v5 `datadog.conf` and converts the configuration options to the new v6 `datadog.yaml` format. It also copies configuration files for checks that are currently enabled:
    ```
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. (Re-)start the Agent:

    * Amazon Linux 2.0:
    ```
    sudo systemctl restart datadog-agent.service
    ```

    * Amazon Linux 1.0:
    ```
    sudo initctl start datadog-agent
    ```

### CentOS

1. Set up Datadog's Yum repo on your system by creating `/etc/yum.repos.d/datadog.repo` with the contents:
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY.public
    ```

   **Note**: due to a [bug in dnf](https://bugzilla.redhat.com/show_bug.cgi?id=1792506), use `repo_gpgcheck=0` instead of `repo_gpgcheck=1` on CentOS 8.1.

2. Update your local Yum repo and install the Agent:
    ```
    sudo yum makecache
    sudo yum remove datadog-agent-base
    sudo yum install datadog-agent
    ```

3. Copy the example configuration into place and plug in your API key:
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. Transition your Agent configuration paths and formats from Agent v5 to Agent v6, with the `import` command. The command parses an existing v5 `datadog.conf` and converts the configuration options to the new v6 `datadog.yaml` format. It also copies configuration files for checks that are currently enabled:
    ```
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Restart the Agent:

    * Centos 7 and above:
    ```
    sudo systemctl restart datadog-agent.service
    ```

    * Centos 6:
    ```
    sudo initctl restart datadog-agent
    ```

### Debian

1. Enable HTTPS support for APT:
    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. Set up the Datadog API repo on your system and import Datadog's APT keys:
    ```shell
    sudo sh -c "echo 'deb https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 A2923DFF56EDA6E76E55E492D3A80E30382E94DE
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 D75CEA17048B9ACBF186794B32637D44F14F620E
    ```

    Note: You might need to install `dirmngr` to import Datadog's APT keys.

3. Update your local APT cache and install the Agent:
    ```
    sudo apt-get update
    sudo apt-get install datadog-agent
    ```

4. Copy the example configuration into place and plug in your API key:
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

5. Transition your Agent configuration paths and formats from Agent v5 to Agent v6, with the `import` command. The command parses an existing v5 `datadog.conf` and converts the configuration options to the new v6 `datadog.yaml` format. It also copies configuration files for checks that are currently enabled:
    ```
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

6. Start the Agent:
    ```
    sudo service datadog-agent start
    ```

### Fedora

1. Set up Datadog's Yum repo on your system by creating `/etc/yum.repos.d/datadog.repo` with the contents:
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY.public
    ```

2. Update your local Yum repo and install the Agent:
    ```
    sudo yum makecache
    sudo yum remove datadog-agent-base
    sudo yum install datadog-agent
    ```

3. Copy the example configuration into place and plug in your API key:
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. Transition your Agent configuration paths and formats from Agent v5 to Agent v6, with the `import` command. The command parses an existing v5 `datadog.conf` and converts the configuration options to the new v6 `datadog.yaml` format. It also copies configuration files for checks that are currently enabled:
    ```
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Restart the Agent
    ```
    sudo systemctl restart datadog-agent.service
    ```

### Red Hat

1. Set up Datadog's Yum repo on your system by creating `/etc/yum.repos.d/datadog.repo` with the contents:
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY.public
    ```

   **Note**: due to a [bug in dnf](https://bugzilla.redhat.com/show_bug.cgi?id=1792506), use `repo_gpgcheck=0` instead of `repo_gpgcheck=1` on RHEL 8.1.

2. Update your local Yum repo and install the Agent:
    ```
    sudo yum makecache
    sudo yum remove datadog-agent-base
    sudo yum install datadog-agent
    ```

3. Copy the example configuration into place and plug in your API key:
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. Transition your Agent configuration paths and formats from Agent v5 to Agent v6, with the `import` command. The command parses an existing v5 `datadog.conf` and converts the configuration options to the new v6 `datadog.yaml` format. It also copies configuration files for checks that are currently enabled:
    ```
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Restart the Agent:

    * Red Hat 7 and above:
    ```
    sudo systemctl restart datadog-agent.service
    ```

    * Red Hat 6:
    ```
    sudo initctl restart datadog-agent
    ```

### Ubuntu

1. Enable HTTPS support for APT:
    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. Set up the Datadog API repo on your system and import Datadog's APT keys:
    ```shell
    sudo sh -c "echo 'deb https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 A2923DFF56EDA6E76E55E492D3A80E30382E94DE
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 D75CEA17048B9ACBF186794B32637D44F14F620E
    ```

    Note: You might need to install `dirmngr` to import Datadog's APT keys.

3. Update your local APT cache and install the Agent:
    ```
    sudo apt-get update
    sudo apt-get install datadog-agent
    ```

4. Copy the example configuration into place and plug in your API key:
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

5. Transition your Agent configuration paths and formats from Agent v5 to Agent v6, with the `import` command. The command parses an existing v5 `datadog.conf` and converts the configuration options to the new v6 `datadog.yaml` format. It also copies configuration files for checks that are currently enabled.:
    ```
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

6. Start the Agent:

    * Ubuntu 16.04 or higher:
    ```
    sudo systemctl start datadog-agent
    ```

    * Ubuntu 14.04 or lower:
    ```
    sudo initctl start datadog-agent
    ```

### SUSE

1. Set up Datadog's Yum repo on your system by creating `/etc/zypp/repos.d/datadog.repo` with the contents:
  ```ini
  [datadog]
  name=Datadog, Inc.
  enabled=1
  baseurl=https://yum.datadoghq.com/suse/stable/6/x86_64
  type=rpm-md
  gpgcheck=1
  repo_gpgcheck=1
  gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
         https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
         https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
         https://keys.datadoghq.com/DATADOG_RPM_KEY.public
  ```

2. Update your local Zypper repo and install the Agent:
  ```
  sudo zypper refresh
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY.public
  sudo zypper install datadog-agent
  ```

3. Copy the example configuration into place and plug in your API key:
  ```shell
  sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
  ```

4. Transition your Agent configuration paths and formats from Agent v5 to Agent v6, with the `import` command. The command parses an existing v5 `datadog.conf` and converts the configuration options to the new v6 `datadog.yaml` format. It also copies configuration files for checks that are currently enabled:
    ```
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Re-start the Agent:
  ```
  sudo systemctl restart datadog-agent.service
  ```

{{% /tab %}}
{{% tab "Windows" %}}

Download the [latest version available][1] and run the installation package.

Transition your Agent configuration paths and formats from Agent v5 to Agent v6, with the `import` command. The command parses an existing v5 `datadog.conf` and converts the configuration options to the new v6 `datadog.yaml` format. It also copies configuration files for checks that are currently enabled.:

`datadog-agent import <OLD_CONFIGURATION_DIRECTORY> <DESTINATION_DIRECTORY>`

With:

* `<OLD_CONFIGURATION_DIRECTORY>` is the directory containing the `datadog.conf` file
* `<DESTINATION_DIRECTORY>` is the directory where the imported `datadog.yaml` is written (you can use the same directory as `<OLD_CONFIGURATION_DIRECTORY>`).

**Note**: `datadog.conf` is automatically upgraded to `datadog.yaml` on upgrade.

[1]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-6-latest.amd64.msi
{{% /tab %}}
{{% tab "MacOS" %}}

1. Download the DMG package of the latest Agent version. Use the latest macOS release listed on the [release page][9] of the repository.
2. Install the DMG package.
3. Add your API key to `/opt/datadog-agent/etc/datadog.yaml`.
4. Transition your Agent configuration paths and formats from Agent v5 to Agent v6, with the `import` command. The command parses an existing v5 `datadog.conf` and converts the configuration options to the new v6 `datadog.yaml` format. It also copies configuration files for checks that are currently enabled:
    `datadog-agent import /opt/datadog-agent/etc/ /opt/datadog-agent/etc/`

Then start the Datadog Agent application (once started, you should see it in the system tray), and manage the Agent from there. Agent v6 includes a web-based GUI to edit the Agent configuration files and much more.

https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}
{{< /tabs >}}
