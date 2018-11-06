---
title: Upgrade to Datadog Agent v6
kind: faq
---

## Amazon Linux

A script is available to automatically install or upgrade to the new Agent. It sets up the package repositories and installs the Agent package for you. When upgrading, the import tool also searches for an existing `datadog.conf` from a prior version, and converts Agent and Check configurations according to the new v6 format.

### One-step install

The Agent v6 installer can automatically convert v5 configurations during the upgrade:
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

**Note:** The import process won't automatically move **custom** Agent checks. This is by design as we cannot guarantee full backwards compatibility out of the box.

#### Fresh install

This is very similar to the upgrade method above, except instead of specifying the upgrade flag, you must supply your API key. This method will also work on Agent v5 machines, however the existing configuration will *not* be converted.
```shell
DD_API_KEY=YOUR_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

### Manual install

1. Set up Datadog's Yum repo on your system by creating `/etc/yum.repos.d/datadog.repo` with the contents:
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
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

4. (Re-)start the Agent:

    * Amazon Linux 2.0:
    ```
    sudo systemctl restart datadog-agent.service
    ```

    * Amazon Linux 1.0:
    ```
    sudo initctl start datadog-agent
    ```

## CentOs

A script is available to automatically install or upgrade to the new Agent. It sets up the package repositories and installs the Agent package for you. When upgrading, the import tool also searches for an existing `datadog.conf` from a prior version, and converts Agent and Check configurations according to the new v6 format.

### One-step install

#### Upgrade

The Agent v6 installer can automatically convert v5 configurations during the upgrade:
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

**Note:** The import process won't automatically move **custom** Agent checks. This is by design as we cannot guarantee full backwards compatibility out of the box.

#### Fresh install

This is very similar to the upgrade method above, except instead of specifying the upgrade flag, you must supply your API key. This method will also work on Agent v5 machines, however the existing configuration will *not* be converted.
```shell
DD_API_KEY=YOUR_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

### Manual install

1. Set up Datadog's Yum repo on your system by creating `/etc/yum.repos.d/datadog.repo` with the contents:
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
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

4. Restart the Agent:

    * Centos 7 and above:
    ```
    sudo systemctl restart datadog-agent.service
    ```

    * Centos 6:
    ```
    sudo initctl restart datadog-agent
    ```

## Debian

A script is available to automatically install or upgrade to the new Agent. It sets up the package repositories and installs the Agent package for you. When upgrading, the import tool also searches for an existing `datadog.conf` from a prior version, and converts Agent and Check configurations according to the new v6 format.

### One-step install

#### Upgrade

The Agent v6 installer can automatically convert v5 configurations during the upgrade:
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

**Note:** The import process won't automatically move **custom** Agent checks. This is by design as we cannot guarantee full backwards compatibility out of the box.

#### Fresh install

This is very similar to the upgrade method above, except instead of specifying the upgrade flag, you must supply your API key. This method will also work on Agent v5 machines, however the existing configuration will *not* be converted.
```shell
DD_API_KEY=YOUR_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

### Manual install

1. Enable HTTPS support for APT:
    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. Set up the Datadog API repo on your system and import Datadog's APT key:
    ```shell
    sudo sh -c "echo 'deb https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 382E94DE
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

5. Start the Agent:
    ```
    sudo service datadog-agent start
    ```

## Fedora

A script is available to automatically install or upgrade to the new Agent. It sets up the package repositories and installs the Agent package for you. When upgrading, the import tool also searches for an existing `datadog.conf` from a prior version, and converts Agent and Check configurations according to the new v6 format.

### One-step install

#### Upgrade

The Agent v6 installer can automatically convert v5 configurations during the upgrade:
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

**Note:** The import process won't automatically move **custom** Agent checks. This is by design as we cannot guarantee full backwards compatibility out of the box.

#### Fresh install

This is very similar to the upgrade method above, except instead of specifying the upgrade flag, you must supply your API key. This method will also work on Agent v5 machines, however the existing configuration will *not* be converted.
```shell
DD_API_KEY=YOUR_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

### Manual install

1. Set up Datadog's Yum repo on your system by creating `/etc/yum.repos.d/datadog.repo` with the contents:
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
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

4. Restart the Agent
    ```
    sudo systemctl restart datadog-agent.service
    ```


## MacOSx

You can either download the DMG package and install it manually, or use the one-line install script.

### Manual installation

1. Download the DMG package of the latest Agent version, use the latest macOS release listed on the [release page][4] of the repository
2. Install the DMG package
3. Add your API key to `/opt/datadog-agent/etc/datadog.yaml`

Then start the Datadog Agent app (once started, you should see it in the system tray), and manage the Agent from there. Agent v6 includes a web-based GUI to edit the Agent configuration files and much more.

### Install script
#### Upgrade

The Agent v6 installer can automatically convert v5 configurations during the upgrade:
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_mac_os.sh)"
```

**Note:** The import process won't automatically move **custom** Agent checks. This is by design as we cannot guarantee full backwards compatibility out of the box.

#### To Install Fresh

This is very similar to the upgrade method above, except instead of specifying the upgrade flag, you must supply your API key. This method will also work on Agent v5 machines, however the existing configuration will *not* be converted.
```shell
DD_API_KEY=YOUR_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_mac_os.sh)"
```

## Redhat

A script is available to automatically install or upgrade to the new Agent. It sets up the package repositories and installs the Agent package for you. When upgrading, the import tool also searches for an existing `datadog.conf` from a prior version, and converts Agent and Check configurations according to the new v6 format.

### One-step install

#### Upgrade

The Agent v6 installer can automatically convert v5 configurations during the upgrade:
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

**Note:** The import process won't automatically move **custom** Agent checks. This is by design as we cannot guarantee full backwards compatibility out of the box.

#### Fresh install

This is very similar to the upgrade method above, except instead of specifying the upgrade flag, you must supply your API key. This method will also work on Agent v5 machines, however the existing configuration will *not* be converted.
```shell
DD_API_KEY=YOUR_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

### Manual install

1. Set up Datadog's Yum repo on your system by creating `/etc/yum.repos.d/datadog.repo` with the contents:
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
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

4. Restart the Agent:

    * Red Hat 7 and above:
    ```
    sudo systemctl restart datadog-agent.service
    ```

    * Red Hat 6:
    ```
    sudo initctl restart datadog-agent
    ```

## Suze

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
  ```

2. Update your local Zypper repo and install the Agent:
  ```
  sudo zypper refresh
  sudo rpm --import https://yum.datadoghq.com/DATADOG_RPM_KEY.public
  sudo zypper install datadog-agent
  ```

3. Copy the example configuration into place and plug in your API key:
  ```shell
  sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
  ```

4. Re-start the Agent:
  ```
  sudo systemctl restart datadog-agent.service
  ```

## Ubuntu

A script is available to automatically install or upgrade to the new Agent. It sets up the package repositories and installs the Agent package for you. When upgrading, the import tool also searches for an existing `datadog.conf` from a prior version, and converts Agent and Check configurations according to the new v6 format.

### One-step install

#### Upgrade

The Agent v6 installer can automatically convert v5 configurations during the upgrade:
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

**Note:** The import process won't automatically move **custom** Agent checks. This is by design as we cannot guarantee full backwards compatibility out of the box.

#### Fresh install

This is very similar to the upgrade method above, except instead of specifying the upgrade flag, you must supply your API key. This method will also work on Agent v5 machines, however the existing configuration will *not* be converted.
```shell
DD_API_KEY=YOUR_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

### Manual install

1. Enable HTTPS support for APT:
    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. Set up the Datadog API repo on your system and import Datadog's APT key:
    ```shell
    sudo sh -c "echo 'deb https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 382E94DE
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

5. Start the Agent:

    * Ubuntu 16.04 or higher:
    ```
    sudo systemctl start datadog-agent
    ```

    * Ubuntu 14.04 or lower:
    ```
    sudo initctl start datadog-agent
    ```


## Windows

Download the latest version available [from here][2] and run the installation package.

[2]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-6-latest.amd64.msi