---
title: Upgrade to Datadog Agent v6
kind: guide
aliases:
  - /agent/faq/upgrade-to-agent-v6
---

<div class="alert alert-info">
To do a fresh install of Datadog Agent v6, refer to the Agent <a href="https://app.datadoghq.com/account/settings#agent">installation process</a>.
</div>

## What is the Agent v6?

Agent 6 is the latest major version of the Datadog Agent. The big difference between Agent 5 and Agent 6 is that Agent 6 is a complete rewrite of the core Agent in Golang. Golang has allowed the Agent to take advantage of concurrency. In place of the three processes the Agent v5 used to run—*the Forwarder*, *the Collector*, and *DogStatsD*—there is now only one process: *the Agent*. It also comes with a number of other core improvements:

* Agent v6 has significantly improved resource usage over Agent v5:
  * It has decreased CPU usage
  * It has decrease memory usage
  * It uses fewer file descriptors
  * It has an all around decreased footprint

* Agent 6 uses [two additional ports][1]:
    * `5000` to expose its runtime metrics.
    * `5001` for the [Agent CLI/GUI commands][2].

    **Note**: You can specify different ports for `expvar_port` and `cmd_port` in the `datadog.yaml` file.

* Custom build your Agent v6 and [DogStatsD][3] much easier and with many more configuration options, to include or exclude almost anything.

### Agent v6 new functionalities

To see all changes between Agent v5 and v6, consult the [Datadog Agent dedicated changes][4] documentation, but here are the key differentiators:

* [Distributions metrics][5] can be performed on the server directly to calculate real, effective global percentiles. (NOTE: this feature is in BETA. Contact support for details on how to have it enabled for your account.)

* [DogStatsD][3] can be used over a Unix socket instead of over UDP.

* [Live Process monitoring is available for Windows][6].

* [Prometheus OpenMetrics is supported natively][7].

* [All your logs can be sent to Datadog for alerting, analysis, and correlation with metrics][8].

## Upgrade to Agent 6

If you have Agent v5 already installed, a script is available to automatically install or upgrade to the new Agent. It sets up the package repositories and installs the Agent package for you. When upgrading, the import tool also searches for an existing `datadog.conf` from a prior version, and converts Agent and Check configurations according to the new v6 format. Select your platform for specific instructions:

* [Amazon Linux](#amazon-linux)
* [CentOS](#centos)
* [Debian](#debian)
* [Fedora](#fedora)
* [MacOSx](#macosx)
* [Red Hat](#red-hat)
* [SUSE](#suse)
* [Ubuntu](#ubuntu)
* [Windows](#windows)

### Amazon Linux
#### One-step Upgrade

The Agent v6 installer can automatically convert v5 configurations during the upgrade:
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

**Note:** The import process won't automatically move **custom** Agent checks. This is by design as we cannot guarantee full backwards compatibility out of the box.

#### Manual Upgrade

1. Set up Datadog's Yum repo on your system by creating `/etc/yum.repos.d/datadog.repo` with the contents:
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
           https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
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
#### One-step Upgrade

The Agent v6 installer can automatically convert v5 configurations during the upgrade:
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

**Note:** The import process won't automatically move **custom** Agent checks. This is by design as we cannot guarantee full backwards compatibility out of the box.

#### Manual Upgrade

1. Set up Datadog's Yum repo on your system by creating `/etc/yum.repos.d/datadog.repo` with the contents:
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
           https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
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
#### One-step Upgrade

The Agent v6 installer can automatically convert v5 configurations during the upgrade:
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

**Note:** The import process won't automatically move **custom** Agent checks. This is by design as we cannot guarantee full backwards compatibility out of the box.

#### Manual Upgrade

1. Enable HTTPS support for APT:
    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. Set up the Datadog API repo on your system and import Datadog's APT key:
    ```shell
    sudo sh -c "echo 'deb https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 A2923DFF56EDA6E76E55E492D3A80E30382E94DE
    ```

    Note: You might need to install `dirmngr` to import Datadog's APT key.

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
#### One-step Upgrade

The Agent v6 installer can automatically convert v5 configurations during the upgrade:
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

**Note:** The import process won't automatically move **custom** Agent checks. This is by design as we cannot guarantee full backwards compatibility out of the box.

#### Manual Upgrade

1. Set up Datadog's Yum repo on your system by creating `/etc/yum.repos.d/datadog.repo` with the contents:
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
           https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
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


### MacOSx

You can either download the DMG package and install it manually, or use the one-line install script.

#### One-step Upgrade

The Agent v6 installer can automatically convert v5 configurations during the upgrade:
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_mac_os.sh)"
```

**Note:** The import process won't automatically move **custom** Agent checks. This is by design as we cannot guarantee full backwards compatibility out of the box.

#### Manual Upgrade

1. Download the DMG package of the latest Agent version, use the latest macOS release listed on the [release page][9] of the repository
2. Install the DMG package
3. Add your API key to `/opt/datadog-agent/etc/datadog.yaml`
4. Transition your Agent configuration paths and formats from Agent v5 to Agent v6, with the `import` command. The command parses an existing v5 `datadog.conf` and converts the configuration options to the new v6 `datadog.yaml` format. It also copies configuration files for checks that are currently enabled:
    `datadog-agent import /opt/datadog-agent/etc/ /opt/datadog-agent/etc/`

Then start the Datadog Agent application (once started, you should see it in the system tray), and manage the Agent from there. Agent v6 includes a web-based GUI to edit the Agent configuration files and much more.

### Red Hat
#### One-step Upgrade

The Agent v6 installer can automatically convert v5 configurations during the upgrade:
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

**Note:** The import process won't automatically move **custom** Agent checks. This is by design as we cannot guarantee full backwards compatibility out of the box.

#### Manual Upgrade

1. Set up Datadog's Yum repo on your system by creating `/etc/yum.repos.d/datadog.repo` with the contents:
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
           https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
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

5. Restart the Agent:

    * Red Hat 7 and above:
    ```
    sudo systemctl restart datadog-agent.service
    ```

    * Red Hat 6:
    ```
    sudo initctl restart datadog-agent
    ```

### SUSE
#### One-step Upgrade

The Agent v6 installer can automatically convert v5 configurations during the upgrade:
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```
**Note:** The import process won't automatically move **custom** Agent checks. This is by design as we cannot guarantee full backwards compatibility out of the box.

#### Manual Upgrade

1. Set up Datadog's Yum repo on your system by creating `/etc/zypp/repos.d/datadog.repo` with the contents:
  ```ini
  [datadog]
  name=Datadog, Inc.
  enabled=1
  baseurl=https://yum.datadoghq.com/suse/stable/6/x86_64
  type=rpm-md
  gpgcheck=1
  repo_gpgcheck=0
  gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
         https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
  ```

2. Update your local Zypper repo and install the Agent:
  ```
  sudo zypper refresh
  sudo rpm --import https://yum.datadoghq.com/DATADOG_RPM_KEY.public
  sudo rpm --import https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
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

### Ubuntu
#### One-step Upgrade

The Agent v6 installer can automatically convert v5 configurations during the upgrade:
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

**Note:** The import process won't automatically move **custom** Agent checks. This is by design as full backwards compatibility out of the box is not guaranteed.

### Manual Upgrade

1. Enable HTTPS support for APT:
    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. Set up the Datadog API repo on your system and import Datadog's APT key:
    ```shell
    sudo sh -c "echo 'deb https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 A2923DFF56EDA6E76E55E492D3A80E30382E94DE
    ```

    Note: You might need to install `dirmngr` to import Datadog's APT key.

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


### Windows

Download the latest version available [from here][10] and run the installation package.

Transition your Agent configuration paths and formats from Agent v5 to Agent v6, with the `import` command. The command parses an existing v5 `datadog.conf` and converts the configuration options to the new v6 `datadog.yaml` format. It also copies configuration files for checks that are currently enabled.:

`datadog-agent import <OLD_CONFIGURATION_DIRECTORY> <DESTINATION_DIRECTORY>`

With:

* `<OLD_CONFIGURATION_DIRECTORY>` is the directory containing the `datadog.conf` file
* `<DESTINATION_DIRECTORY>` is the directory where the imported `datadog.yaml` is written (you can use the same directory as `<OLD_CONFIGURATION_DIRECTORY>`).

**Note**: `datadog.conf` is automatically upgraded to `datadog.yaml` on upgrade.

[1]: /agent/#agent-architecture
[2]: /agent/guide/agent-commands
[3]: /developers/dogstatsd/unix_socket
[4]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md
[5]: /developers/metrics/types
[6]: /graphing/infrastructure/process
[7]: https://www.datadoghq.com/blog/monitor-prometheus-metrics
[8]: /logs
[9]: https://github.com/DataDog/datadog-agent/releases
[10]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-6.14.2.msi
