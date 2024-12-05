---
title: Install Datadog Agent 5
further_reading:
- link: "/agent/basic_agent_usage/"
  tag: "Documentation"
  text: "Basic Agent Usage"
---

This guide covers installing Agent 5. Datadog recommends installing or upgrading to Agent 7 for the latest features. For information on installing the latest version of the Agent, follow the [Agent 7 Installation Instructions][1]. For information on upgrading to Agent 7 from an earlier version, see [Upgrade to Datadog Agent v7][2].

## macOS

### Install the Agent

#### Command line

Run the following command, replacing `MY_API_KEY` with your Datadog API key:
{{< code-block lang="shell" >}}
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/osx/install.sh)"
{{< /code-block >}}

To manage the Agent, use the `datadog-agent` command. By default, the `datadog-agent` binary is located in `/usr/local/bin`. Enable or disable integrations in `/opt/datadog-agent/etc/conf.d`.

#### GUI

1. Download and install the [DMG package][3].
1. Add the following line to `/opt/datadog-agent/etc/datadog.conf`, replacing `MY_API_KEY` with your Datadog API key:
   {{< code-block lang="shell" >}}
api_key:MY_API_KEY
{{< /code-block >}}

To manage the Agent, use the Datadog Agent app in the system tray. Enable or disable integrations in `/opt/datadog-agent/etc/conf.d`.

### Agent run behavior

By default, the Agent runs at login. You can disable it using the Datadog Agent app in the system tray. If you want to run the Agent at boot, use these commands:
{{< code-block lang="shell" >}}
sudo cp '/opt/datadog-agent/etc/com.datadoghq.agent.plist' /Library/LaunchDaemons
sudo launchctl load -w /Library/LaunchDaemons/com.datadoghq.agent.plist
{{< /code-block >}}

### Uninstall

1. Stop and close the Datadog Agent with the bone icon in the tray.
1. Drag the Datadog application from the application folder to the trash bin.
1. Run:

   ```shell
   sudo rm -rf /opt/datadog-agent
   sudo rm -rf /usr/local/bin/datadog-agent
   sudo rm -rf ~/.datadog-agent/** # to remove broken symlinks
   ```

If you ran the optional install commands to have the Agent run at boot time, run the following to finish uninstalling:

```shell
sudo launchctl unload -w /Library/LaunchDaemons/com.datadoghq.agent.plist
sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
```

## Windows

### Install the Agent

#### GUI

Download and run the Datadog Agent installer:
- [64-bit installer][4].
- [32-bit installer][5]. 32-bit installations are only supported up to Agent version 5.10.1.

Links to all available versions of the Windows installer are available in [JSON format][6].

#### Command line

1. Download the Agent:
   - For fresh installations, download the [Datadog Agent installer][4].
   - If you're upgrading from a Datadog Agent version <5.12.0, use the [EXE installation method][7].
1. In a `cmd.exe` shell in the directory where you downloaded the installer, run the following command. Replace `MY_API_KEY` with your Datadog API key:
   {{< code-block lang="shell" >}}
start /wait msiexec /qn /i ddagent-cli-latest.msi APIKEY="MY_API_KEY"
{{< /code-block >}}
   Optionally, add `TAG` and `HOSTNAME` values.

#### Deployment to Azure

To install the Agent on Azure, follow the [Microsoft Azure documentation][8].

### New upgrade procedure for 5.12

If you are an existing customer running a Windows Agent prior to 5.12, there may be additional steps required to upgrade your device. Specifically, the latest Agent is a "per-machine" installation. Prior versions of the Agent were "per-user" by default. There may also be additional steps required if you're deploying with Chef. For more information, see [Windows Agent Installation][9].

### Uninstall

There are two different methods to uninstall the Agent on Windows. Both methods remove the Agent, but do not remove the `C:\ProgramData\Datadog` configuration folder on the host.

**Note**: For Agent < v5.12.0, it's important to uninstall the Agent with the **original account** used to install the Agent, otherwise it may not be cleanly removed.

### Add or remove programs

1. Press **CTRL** and **Esc** or use the Windows key to run Windows Search.
1. Search for `add` and click **Add or remove programs**.
1. Search for `Datadog Agent` and click **Uninstall**.

### PowerShell

**Note:** Enable WinRM to use the commands below.

Use the following PowerShell command to uninstall the Agent without rebooting:

```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/norestart', '/q', '/x', (Get-CimInstance -ClassName Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber)
```

## Linux and Unix

{{< tabs >}}

{{% tab "Debian" %}}
### One-step install

The one-step command installs the APT packages for the Datadog Agent and prompts you for your password. If the Agent is not already installed on your machine and you don't want it to start automatically after the installation, prepend `DD_INSTALL_ONLY=true` to the command before running it.

Run the following command, replacing `MY_API_KEY` with your Datadog API key:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Multi-step install

1. Set up APT so it can download through HTTPS and install `curl` and `gnupg`:
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. Set up the Datadog Debian repo on your system and create a Datadog archive keyring:
   ```shell
   sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable main' > /etc/apt/sources.list.d/datadog.list"
   sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
   sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg

   curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   ```
1. If running Debian 8 or earlier, copy the keyring to `/etc/apt/trusted.gpg.d`:
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. Update your local APT repo and install the Agent:
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. Run the following command to copy the example config into place. Replace `MY_API_KEY` with your Datadog API key:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Start the Agent:
   ```shell
   sudo /etc/init.d/datadog-agent start
   ```

{{% /tab %}}

{{% tab "Ubuntu" %}}
### One-step install

The one-step command installs the APT packages for the Datadog Agent and prompts you for your password. If the Agent is not already installed on your machine and you don't want it to start automatically after the installation, prepend `DD_INSTALL_ONLY=true` to the command before running it.

Run the following command, replacing `MY_API_KEY` with your Datadog API key:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Multi-step install

1. Set up APT so it can download through HTTPS and install `curl` and `gnupg`:
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. Set up the Datadog Debian repo on your system and create a Datadog archive keyring:
   ```shell
   sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable main' > /etc/apt/sources.list.d/datadog.list"
   sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
   sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg

   curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   ```
1. If running Debian 8 or earlier, copy the keyring to `/etc/apt/trusted.gpg.d`:
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. Update your local APT repo and install the Agent:
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. Run the following command to copy the example config into place. Replace `MY_API_KEY` with your Datadog API key:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Start the Agent:
   ```shell
   sudo /etc/init.d/datadog-agent start
   ```

### Uninstall

To uninstall the Agent, run the following command:

```shell
sudo apt-get remove datadog-agent -y
```

This command removes the Agent, but does not remove:

* The `datadog.yaml` configuration file
* User-created files in the `/etc/dd-agent` configuration folder
* User-created files in the `/opt/datadog-agent` folder
* The `dd-agent` user
* Datadog log files

If you also want to remove these elements, run this command after removing the Agent:

```shell
sudo apt-get --purge remove datadog-agent -y
```

{{% /tab %}}

{{% tab "Amazon Linux" %}}
### One-step install

The one-step command installs the YUM packages for the Datadog Agent and prompts you for your password. If the Agent is not already installed on your machine and you don't want it to start automatically after the installation, prepend `DD_INSTALL_ONLY=true` to the command before running it.

Run the following command, replacing `MY_API_KEY` with your Datadog API key:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Multi-step install

1. Set up the Datadog YUM repo by creating `/etc/yum.repos.d/datadog.repo` with the following contents:
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   ```

   **Note**: On i386/i686 architecture, replace "x86_64" with "i386".

1. Update your local yum repo and install the Agent:
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```
1. Copy the example config into place. Replace `MY_API_KEY` with your Datadog API key:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Restart the Agent:
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```


### Uninstall

To uninstall the Agent, run the following command:

```shell
sudo yum remove datadog-agent
```

This command removes the Agent, but does not remove:

* The `datadog.yaml` configuration file
* User-created files in the `/etc/dd-agent` configuration folder
* User-created files in the `/opt/datadog-agent` folder
* The `dd-agent` user
* Datadog log files

If you also want to remove these elements, run this command after removing the Agent:

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}

{{% tab "CentOS and Red Hat" %}}
### One-step install

The one-step command installs the YUM packages for the Datadog Agent and prompts you for your password. If the Agent is not already installed on your machine and you don't want it to start automatically after the installation, prepend `DD_INSTALL_ONLY=true` to the command before running it.

Run the following command, replacing `MY_API_KEY` with your Datadog API key:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Multi-step install

1. Set up the Datadog YUM repo by creating `/etc/yum.repos.d/datadog.repo` with the following contents:
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   ```

   **Note**: On i386/i686 architecture, replace "x86_64" with "i386".

1. Update your local YUM repo and install the Agent:
   ```shell
   sudo yum makecache
   sudo yum remove datadog-agent-base 
   sudo yum install datadog-agent
   ```
1. Copy the example config into place. Replace `MY_API_KEY` with your Datadog API key:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Restart the Agent:
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```

### Uninstall

To uninstall the Agent, run the following command:

```shell
sudo yum remove datadog-agent
```

This command removes the Agent, but does not remove:

* The `datadog.yaml` configuration file
* User-created files in the `/etc/dd-agent` configuration folder
* User-created files in the `/opt/datadog-agent` folder
* The `dd-agent` user
* Datadog log files

If you also want to remove these elements, run this command after removing the Agent:

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```

{{% /tab %}}

{{% tab "Fedora" %}}
### One-step install

The one-step command installs the YUM packages for the Datadog Agent and prompts you for your password. If the Agent is not already installed on your machine and you don't want it to start automatically after the installation, prepend `DD_INSTALL_ONLY=true` to the command before running it.

Run the following command, replacing `MY_API_KEY` with your Datadog API key:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Multi-step install

1. Set up the Datadog YUM repo by creating `/etc/yum.repos.d/datadog.repo` with the following contents:
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   ```

   **Note**: On i386/i686 architecture, replace "x86_64" with "i386".

1. Update your local YUM repo and install the Agent:
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```
1. Copy the example config into place. Replace `MY_API_KEY` with your Datadog API key:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Restart the Agent:
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```

### Uninstall

To uninstall the Agent, run the following command:

```shell
sudo yum remove datadog-agent
```

This command removes the Agent, but does not remove:

* The `datadog.yaml` configuration file
* User-created files in the `/etc/dd-agent` configuration folder
* User-created files in the `/opt/datadog-agent` folder
* The `dd-agent` user
* Datadog log files

If you also want to remove these elements, run this command after removing the Agent:

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```

{{% /tab %}}

{{% tab "Suse" %}}
### One-step install

The one-step command installs the YUM packages for the Datadog Agent and prompts you for your password. If the Agent is not already installed on your machine and you don't want it to start automatically after the installation, prepend `DD_INSTALL_ONLY=true` to the command before running it.

Run the following command, replacing `MY_API_KEY` with your Datadog API key:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Multi-step install

1. Set up the Datadog YUM repo by creating `/etc/yum.repos.d/datadog.repo` with the following contents:
   ```conf
   [datadog]
   name=Datadog, Inc.
   enabled=1
   baseurl=https://yum.datadoghq.com/suse/rpm/x86_64
   type=rpm-md
   gpgcheck=1
   repo_gpgcheck=0
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   ```

1. Update your local zypper repo and install the Agent:
   ```shell
   sudo zypper refresh
   sudo zypper install datadog-agent
   ```
1. Copy the example config into place. Replace `MY_API_KEY` with your Datadog API key:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Restart the Agent:
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```

### Uninstall

To uninstall the Agent, run the following command:

```shell
sudo zypper remove datadog-agent
```

This command removes the Agent, but does not remove:
* The `datadog.yaml` configuration file
* User-created files in the `/etc/dd-agent` configuration folder
* User-created files in the `/opt/datadog-agent` folder
* The `dd-agent` user
* Datadog log files

If you also want to remove these elements, run this command after removing the Agent:

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```


{{% /tab %}}

{{% tab "AIX" %}}
### One-step install

The one-step command installs the latest BFF package for the Datadog Agent and prompts you for your password if necessary. If the Agent is not already installed on your machine and you don't want it to start automatically after the installation, prepend `DD_INSTALL_ONLY=true` to the command before running it.

Run the following command, replacing `MY_API_KEY` with your Datadog API key:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Upgrade from a previous installation

To install the Agent while keeping your existing configuration, run the following command:
```shell
DD_UPGRADE=true ksh -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-unix-agent/master/scripts/install_script.sh)"
```

For a full list of the available installation script environment variables, see [Basic Agent Usage for AIX][1].

### Multi-step install

1. Download the preferred BFF from the [datadog-unix-agent][2] repo releases:
1. Install the artifact as root with `installp`:
   ```shell
   installp -aXYgd datadog-unix-agent-latest.powerpc.aix..bff datadog-unix-agent
   ```
1. If you don't have an existing configuration file, copy the example config into place. Replace `MY_API_KEY` with your Datadog API key:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```
1. Ensure that the Datadog agent has the correct permissions:
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 660 /etc/datadog-agent/datadog.yaml"
   ```
1. Stop the Agent service:
   ```shell
   sudo stopsrc -s datadog-agent
   ```
1. Verify the Agent service has stopped:
   ```
   sudo lssrc -s datadog-agent
   ```
1. Restart the Agent service:
   ```shell
   sudo startsrc -s datadog-agent
   ```

### Uninstall

To uninstall the Agent, run the following command:

To remove an installed Agent, run the following `installp` command:

```shell
installp -e dd-aix-uninstall.log -uv datadog-unix-agent
```

Note: Agent uninstallation logs can be found in the `dd-aix-install.log` file. To disable this logging, remove the `-e` parameter in the uninstallation command.

[1]: /agent/basic_agent_usage/aix/#installation
[2]: https://github.com/DataDog/datadog-unix-agent/releases
{{% /tab %}}

{{< /tabs >}}

## Cloud and containers

{{< tabs >}}
{{% tab "Kubernetes" %}}
## Install the Agent
### Install with DaemonSets

If you're running Kubernetes >= 1.1.0, you can take advantage of [DaemonSets][1] to automatically deploy the Datadog Agent on all your nodes

1. Create a secret that contains your API key. This secret is used in the manifest to deploy the Datadog Agent. Replace `MY_API_KEY` with your Datadog API key:
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key =" MY_API_KEY"
   ```

1. Create the following manifest named `dd-agent.yaml`:

   ```yaml
   apiVersion: extensions/v1beta1
   kind: DaemonSet
   metadata:
   name: dd-agent
   spec:
   template:
      metadata:
         labels:
         app: dd-agent
         name: dd-agent
      spec:
         containers:
         - image: gcr.io/datadoghq/docker-dd-agent:latest
         imagePullPolicy: Always
         name: dd-agent
         ports:
            - containerPort: 8125
               name: dogstatsdport
               protocol: UDP
         env:
            - name: DD_API_KEY
               valueFrom:
               secretKeyRef:
                  name: datadog-secret
                  key: api-key
            - name: KUBERNETES
               value: "yes"
            - name: SD_BACKEND
               value: docker
            # Uncomment this variable if the agent has issues reaching kubelet
            # - name: KUBERNETES_KUBELET_HOST
            #   valueFrom:
            #     fieldRef:
            #       fieldPath: status.hostIP  # Kubernetes >= 1.7
            #       # or
            #       # fieldPath: spec.nodeName  # Kubernetes < 1.7
         resources:
            requests:
               memory: "256Mi"
               cpu: "200m"
            limits:
               memory: "256Mi"
               cpu: "200m"
         volumeMounts:
            - name: dockersocket
               mountPath: /var/run/docker.sock
            - name: procdir
               mountPath: /host/proc
               readOnly: true
            - name: cgroups
               mountPath: /host/sys/fs/cgroup
               readOnly: true
         livenessProbe:
            exec:
               command:
               - ./probe.sh
            initialDelaySeconds: 15
            periodSeconds: 5
         volumes:
         - hostPath:
               path: /var/run/docker.sock
            name: dockersocket
         - hostPath:
               path: /proc
            name: procdir
         - hostPath:
               path: /sys/fs/cgroup
            name: cgroups
   ```

1. Deploy the DaemonSet:
   ```shell
   kubectl create -f dd-agent.yaml
   ```

<div class="alert alert-info">This manifest enables autodiscovery's auto-configuration feature. To disable auto-configuration, remove the <code>SD_BACKEND</code> environment variable definition. To learn how to configure autodiscovery, see <a href="https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=kubernetesadv2">Kubernetes Integrations Autodiscovery</a>.</div>

### Run the Agent as a Docker container

If you are not running Kubernetes 1.1.0 or later, or you don't want to use DaemonSets, run the Agent as a Docker container on each node you want to monitor. Run the following command, replacing `MY_API_KEY` with your Datadog API key:

```shell
docker run -d --name dd-agent -h `hostname` -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e KUBERNETES=yes -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

## Send custom metrics

If you plan on sending [custom metrics][2] using DogStatsD:
1. Bind the container's StatsD port to the node's IP address by adding a `hostPort` to the `ports` section of your manifest:
   ```yaml
   ports:
     - containerPort: 8125
       hostPort: 8125
       name: dogstatsdport
       protocol: UDP
   ```

1. Configure your client library to send UDP packets to the node's IP. If using bridge networking, the default gateway of your application container matches the node's IP. You can also use the downward API to expose the node's hostname as an environment variable.

## Customize your Agent configuration

To customize your Agent configuration, see the documentation in the Agent 5 [docker-dd-agent][3] repo. To tune autodiscovery configuration, see [Kubernetes Integrations Autodiscovery][4]. To disable autodiscovery, remove the `SD_BACKEND` environment variable from your manifest.

For information on collecting metrics, service checks, and events, see the [Kubernetes integration][5] documentation.

[1]: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/
[2]: /metrics/custom_metrics
[3]: https://github.com/DataDog/docker-dd-agent
[4]: /containers/kubernetes/integrations/?tab=kubernetesadv2
[5]: /integrations/kubernetes/

{{% /tab %}}

{{% tab "Docker" %}}
### One-step install

The one-step install runs a Docker container which embeds the Datadog Agent to monitor your host. The Docker integration is enabled by default, as well as autodiscovery in auto config mode. To disable autodiscovery, remove the `SD_BACKEND` variable from the one-step install command.

#### Amazon Linux
Run the following command, replacing `MY_API_KEY` with your Datadog API key:
```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

#### Other operating systems
Run the following command, replacing `MY_API_KEY` with your Datadog API key:
```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

#### Troubleshooting

If the one-step install command does not work, it's possible that your system mounts the `cgroup` directory in an unexpected place or does not use CGroups for memory management. CGroups are required for the Docker check to succeed. To enable CGroups, see the documentation in the [docker-dd-agent][1] repo. If the check is failing because of an unexpected `cgroup` directory location:

1. Run `mount | grep "cgroup type tmpfs"` to retrieve the location of the `cgroup` directory.
1. Replace the first occurence of `/sys/fs/cgroup` in the one-step install command with the location of the `cgroup` directory.

### Send custom metrics

To send custom metrics using DogStatsD:
1. Add the `-p 8125:8125/udp` option to the install command. This binds the container's StatsD port to the host's IP address.
1. Configure your client library to send UDP packets to the host's IP address.

### Customize your Agent configuration

To customize your Agent configuration, see the documentation in the Agent 5 [docker-dd-agent][2] repo. To tune autodiscovery configuration, see [Docker Integrations Autodiscovery][3]. To disable autodiscovery, remove the `SD_BACKEND` environment variable from the one-step installation command.

[1]: https://github.com/DataDog/docker-dd-agent?tab=readme-ov-file#cgroups
[2]: https://github.com/DataDog/docker-dd-agent
[3]: https://docs.datadoghq.com/containers/docker/integrations/?tabs=docker

{{% /tab %}}

{{% tab "CoreOS" %}}
Running CoreOS Container Linux is supported with the Docker runtime. For installation instructions, see [Docker][1].

To run CoreOS Tectonic on Kubernetes, see [Kubernetes][2].

[1]: ?tab=docker#cloud-and-containers
[2]: ?tab=kubernetes#cloud-and-containers

{{% /tab %}}

{{% tab "OpenShift" %}}
For information on installing Datadog with OpenShift, see the [datadog-openshift][1] repo.

[1]: https://github.com/DataDog/datadog-openshift

{{% /tab %}}

{{% tab "Cloud Foundry" %}}
<div class="alert alert-info">The Datadog Agent BOSH release only works on Ubuntu and Red Hat stemcells.</a></div>

1. Upload the Datadog Agent release to your BOSH Director:

   ```shell
   # BOSH CLI v1
   bosh upload release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz

   # BOSH CLI v2
   bosh upload-release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
   ```

2. Configure Datadog as an addon in your runtime config. Replace `MY_API_KEY` with your Datadog API key::

   ```yaml
   # runtime.yml
   ---
   releases:
   - name: datadog-agent
      version: $UPLOADED_VERSION # e.g. 1.0.5140

   addons:
   - name: datadog
   jobs:
   - name: dd-agent
      release: datadog-agent
   properties:
      dd:
         use_dogstatsd: yes
         dogstatsd_port: 18125 # Many Cloud Foundry deployments have their own StatsD listening on port 8125
         api_key: MY_API_KEY
         tags: ["my-cloud-foundry-deployment"] # optional. Add any tags you wish
         # Optionally, enable any Agent Checks here
         # integrations:
         #   directory:
         #     init_config: {}
         #     instances:
         #       directory: "."
   ```

3. Add the runtime to your runtime config:

   ```shell
   # BOSH cli v1
   bosh update runtime-config runtime.yml

   # BOSH cli v2
   bosh update-runtime-config runtime.yml
   ```

4. Redeploy any existing deployments:
   ```shell
   # BOSH cli v1
   bosh deployment myDeployment.yml
   bosh -n deploy

   # BOSH cli v2
   bosh -n -d myDeployment deploy myDeployment.yml
   ```

{{% /tab %}}

{{< /tabs >}}

## Configuration management

{{< tabs >}}
{{% tab "Ansible" %}}

<div class="alert alert-info">The Datadog Ansible collection supports most Debian, RHEL-based and SUSE-based Linux distributions, macOS, and Windows.<br>Requires Ansible version 2.10 or higher.</div>

### Prerequisites

#### Windows
Before you can use the Datadog Ansible Collection to manage Windows hosts, you must install the `ansible.windows` collection:
```shell
ansible-galaxy collection install ansible.windows
```

#### openSUSE and SLES

Before you can use the Datadog Ansible Collection to manage openSUSE/SLES hosts, you must install the `community.general` collection:

```shell
ansible-galaxy collection install community.general
```

### Install Datadog

1. Install the Datadog Ansible collection from Ansible Galaxy on your Ansible server:
   ```shell
   ansible-galaxy collection install datadog.dd
   ```
   - The Datadog Ansible collection is also available through the [Red Hat Automation Hub][1] where it is officially certified by Red Hat.
   - Installing the collection is recommended. If needed, you can also install Datadog using the [standalone role][2].

2. To deploy the Datadog Agent on hosts, add the Datadog role and your API key to your playbook. Replace `MY_API_KEY` with your Datadog API key:
   ```yaml
   - hosts: servers
   tasks:
      - name: Import the Datadog Agent role from the Datadog collection
         import_role:
         name: datadog.dd.agent
   vars:
      datadog_api_key: "MY_API_KEY"
      datadog_agent_major_version: 5
   ```

   To ensure that the Agent can group your hosts together, only use node hostnames that the Datadog Agent is tracking. You can check what hostnames the Agent is tracking using the following command:

   ```shell
   service datadog-agent info
   ```

## Specific Agent checks

To use a specific Agent check or integration on one of your nodes, you can use the `datadog_checks` variable. Here is an example for the process check:
```yaml
- hosts: servers
  tasks:
    - name: Import the Datadog Agent role from the Datadog collection
      import_role:
        name: datadog.dd.agent
  vars:
    datadog_api_key: "MY_API_KEY"
    datadog_agent_major_version: 5
    datadog_checks:
      process:
        init_config:
        instances:
          - name: ssh
            search_string: ['ssh', 'sshd']
          - name: syslog
            search_string: ['rsyslog']
            cpu_check_interval: 0.2
            exact_match: true
            ignore_denied_access: true
```

You can find more examples of the Agent role usage on the Github repo for the [standalone role][3].

### Metrics and events

To get metrics and events on Datadog after Ansible runs, see the Ansible callback project's [Github page][4].

[1]: https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/
[2]: /agent/guide/ansible_standalone_role/#ansible-role-versus-ansible-collection
[3]: https://github.com/DataDog/ansible-datadog/#role-variables
[4]: https://github.com/DataDog/ansible-datadog-callback

{{% /tab %}}
{{% tab "Puppet" %}}
<div class="alert alert-info">The <code>datadog_agent</code> module only supports Linux nodes.<br>Requires Puppet Agent version 2.7 or higher.</a></div>

1. Install the `datadog_agent` module from the [Puppet Forge][1] on your Puppet server:
   - For fresh installs, run the `module install command`:
     ```shell
     puppet module install datadog-datadog_agent
     ```
   - If the module is already installed, upgrade it:
     ```shell
     puppet module upgrade datadog-datadog_agent
     ```

2. To deploy the Datadog agent on nodes, add this parametrized class to your manifests. Replace `MY_API_KEY` with your Datadog API key:
   ```puppet
   node "db1.mydomain.com" {
      class { "datadog_agent":
         api_key => "MY_API_KEY"
      }
   }
   ```

   To ensure that the Agent can group your hosts together, only use node hostnames that the Datadog Agent is tracking. You can check what hostnames the Agent is tracking using the following command:

   ```shell
   service datadog-agent info
   ```

3. Enable reporting to Datadog on your Puppet server:
   1. Add the following parameters to `/etc/puppet/puppet.conf`:
      ```conf
      [master]
      report = true
      reports = datadog_reports
      pluginsync = true

      [agent]
      report = true
      pluginsync = true
      ```
   1. In your manifest, add the `puppet_run_reports` option to your Puppet server. For example:
      ```puppet
      node "puppet" {
         class { "datadog_agent":
            api_key            => "MY_API_KEY",
            puppet_run_reports => true
            }
      }
      ```
1. Run Puppet on your Puppet server to install all necessary dependencies.
1. Restart your Puppet server to begin receiving Puppet data in Datadog.

## Specific Agent checks

To use a specific Agent check or integration on one of your nodes, see the relevant [integration manifest][2] for a code sample. Here is an example for the elasticsearch integration:

```puppet
node "elastic-node1.mydomain.com" {
    class { "datadog_agent":
        api_key => ""
    }
    include "datadog_agent::integrations::elasticsearch"
}
```

[1]: https://forge.puppetlabs.com/modules/datadog/datadog_agent/readme
[2]: https://github.com/DataDog/puppet-datadog-agent/tree/main/manifests/integrations

{{% /tab %}}

{{% tab "Chef" %}}

<div class="alert alert-info">Requires Chef version 10.14.x or higher.</a></div>

1. Add the Datadog cookbook:
   - If you are using [Berkshelf][1], add the cookbook to your Berksfile:
      ```shell
      cookbook 'datadog'
      ```

   - If you're not using Berkshelf, install the cookbook in to your repository using Knife:
     ```shell
     knife cookbook site install datadog 
     ```

1. Set the Datadog-specific attributes in either a role, environment, or another recipe. Replace `MY_API_KEY` with your Datadog API key:
   ```chef
   node.default['datadog']['api_key'] = "MY_API_KEY"
   # Use an existing application key or create a new one for Chef
   node.default['datadog']['application_key'] = "Generate Application Key"
   ```

1. Upload the updated cookbook to your Chef server:
   ```shell
   berks upload
   # or
   knife cookbook upload datadog
   knife cookbook list | grep datadog && 
   echo -e "e[0;32mdatadog cookbook - OKe[0m" ||
   echo -e "e[0;31mmissing datadog cookbook - OKe[0m"
   ```

1. Add the cookbook to your node's `run_list` or `role`:
   ```chef
   "run_list": [
    "recipe[datadog::dd-agent]"
   ]
   ```

1. Wait for the next scheduled `chef-client` run.

[1]: https://docs.chef.io/workstation/berkshelf/

{{% /tab %}}

{{% tab "SaltStack" %}}

<div class="alert alert-info">The Datadog Saltstack formula only supports Debian-based and RedHat-based systems.<br><br>
The following instructions add the Datadog formula to the base Salt environment. To add it to another Salt environment, replace references to <code>base</code> with the name of your Salt environment.</div>

<!-- vale Datadog.inclusive = NO -->

### Install using `gitfs_remotes`
1. Install the [Datadog formula][1] in the base environment of your Salt Master node, using the `gitfs_remotes` option in your Salt Master configuration file (by default `/etc/salt/master`):
   ```yaml
   fileserver_backend:
   - roots # Active by default, necessary to be able to use the local salt files we define in the next steps
   - gitfs # Adds gitfs as a fileserver backend to be able to use gitfs_remotes

   gitfs_remotes:
   - https://github.com/DataDog/datadog-formula.git:
     - saltenv:
       - base:
       - ref: 3.0 # Pin here the version of the formula you want to use
   ```

1. Restart your Salt Master service:
   ```shell
   systemctl restart salt-master
   ```
   or 
   ```shell
   service salt-master restart
   ```

### Install by cloning the Datadog formula

1. Clone the [Datadog formula][1] on your Salt Master node:
   ```shell
   mkdir -p /srv/formulas && cd /srv/formulas git clone https://github.com/DataDog/datadog-formula.git
   ```
1. Add the cloned formula to the base environment in the `file_roots` of your Salt Master configuration file (by default `/etc/salt/master`):
   ```yaml
   file_roots:
     base:
       - /srv/salt/
       - /srv/formulas/datadog-formula/
   ```

## Deploy the Agent to your hosts

1. Add the Datadog formula to your top file (by default `/srv/salt/top.sls`):
   ```yaml
   base:
     '*':
       - datadog
   ```

1. Add a `datadog.sls` pillar file to your pillar directory (by default `/srv/pillar/`) and add your API key. Replace `MY_API_KEY` with your Datadog API key:
   ```yaml
   datadog:
     config:
       api_key: MY_API_KEY
     install_settings:
       agent_version: <AGENT5_VERSION>
   ```

1. Add the `datadog.sls` pillar file to the top pillar file (by default `/srv/pillar/top.sls`):
   ```yaml
   base:
     '*':
       - datadog
   ```

1. To use a specific Agent check or integration on one of your hosts, you can use the checks variable. Here is an example for the directory integration:
   ```yaml
   datadog:
     config:
       api_key: MY_API_KEY
     install_settings:
       agent_version: <AGENT5_VERSION>
     checks:
       directory:
         config:
           instances:
             - directory: "/srv/pillar"
               name: "pillars"
   ```         

Refer to the formula [Github repository][1] for logs configuration, check examples, and advanced use cases.
<!-- vale Datadog.inclusive = YES -->
[1]: https://github.com/DataDog/datadog-formula
{{% /tab %}}

{{< /tabs >}}

## Install from source

<div class="alert alert-info">The Datadog Agent requires python 2.7 and <code>sysstat</code> on Linux.</div>

Use the one-step source install script. Replace `MY_API_KEY` with your Datadog API key:
```shell
DD_API_KEY=MY_API_KEY sh -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/setup_agent.sh)"
``` 

The script installs the Agent in its own self-contained sandbox located at `~/.datadog-agent`.

To make the installation permanent, set up your `init` daemon to run `$sandbox_dir/bin/agent` with `$sandbox_dir` set at the current working directory. The sandbox directory is portable and can run from any location on your file system. The sandbox directory is set to `~/.datadog-agent` by default.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /agent/versions/upgrade_to_agent_v7/
[3]: https://install.datadoghq.com/datadog-agent-5.11.3-1.dmg
[4]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.msi
[5]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-32bit-cli.msi
[6]: https://s3.amazonaws.com/ddagent-windows-stable/installers.json
[7]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.exe
[8]: /integrations/azure/
[9]: https://github.com/DataDog/dd-agent/wiki/Windows-Agent-Installation
