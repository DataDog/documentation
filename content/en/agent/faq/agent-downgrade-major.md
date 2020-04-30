---
title: Downgrade the Agent to a prior major version
kind: faq
aliases:
- /agent/faq/agent-downgrade
---

## Downgrade the Agent from v7 to v6

{{< tabs >}}
{{% tab "Linux" %}}

First, [uninstall Agent v7 from your system][1].

Then, if you followed the instructions to [upgrade from v6 to v7][2], run the Agent installation command with the environment variable `DD_AGENT_MAJOR_VERSION=6` in order to downgrade your Agent from version 7 to version 6:

| Platform     | Command                                                                                                                                                                   |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Amazon Linux | `DD_AGENT_MAJOR_VERSION=6 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"` |
| CentOS       | `DD_AGENT_MAJOR_VERSION=6 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"` |
| Debian       | `DD_AGENT_MAJOR_VERSION=6 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"` |
| Fedora       | `DD_AGENT_MAJOR_VERSION=6 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"` |
| Red Hat      | `DD_AGENT_MAJOR_VERSION=6 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"` |
| Ubuntu       | `DD_AGENT_MAJOR_VERSION=6 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"` |
| SUSE         | `DD_AGENT_MAJOR_VERSION=6 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"` |

[1]: /agent/faq/how-do-i-uninstall-the-agent/
[2]: /agent/versions/upgrade_to_agent_v6/
{{% /tab %}}
{{% tab "Windows" %}}

1. [Uninstall Agent v7 from your system][1].
2. [Download the Datadog Agent installer][2].
3. Run the installer (as **Administrator**) by opening `datadog-agent-6-latest.amd64.msi`.
4. Follow the prompts, accept the license agreement, and enter your [Datadog API key][3].
5. When the install finishes, you are given the option to launch the Datadog Agent Manager.

**Note**: Links to all available versions of the Windows Installer are [provided in JSON format][4].

[1]: /agent/faq/how-do-i-uninstall-the-agent/
[2]: https://ddagent-windows-stable.s3.amazonaws.com/datadog-agent-6-latest.amd64.msi
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://s3.amazonaws.com/ddagent-windows-stable/installers.json
{{% /tab %}}
{{% tab "MacOS" %}}

First, [uninstall Agent v7 from your system][1].

Then, if you followed the instructions to [upgrade from v6 to v7][2], run the Agent installation command with the environment variable `DD_AGENT_MAJOR_VERSION=6` in order to downgrade your Agent from version 7 to version 6:

```shell
DD_AGENT_MAJOR_VERSION=6 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_mac_os.sh)"
```

[1]: /agent/faq/how-do-i-uninstall-the-agent/
[2]: /agent/versions/upgrade_to_agent_v6/
{{% /tab %}}
{{< /tabs >}}

## Downgrade the Agent from v6 to v5

This guide assumes you upgraded to the Agent v6 using the [upgrade guide][1]. If so, choose your OS to see the detailed instructions on how to downgrade your Agent from version 6 to version 5:

{{< tabs >}}
{{% tab "Linux" %}}

**Debian Flavored Systems**:

1. Set up apt so it can download through https

    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. Remove Beta Repo and Ensure the stable repo is present:

    ```shell
    sudo rm /etc/apt/sources.list.d/datadog-beta.list
    [ ! -f /etc/apt/sources.list.d/datadog.list ] &&  echo 'deb https://apt.datadoghq.com/ stable main' | sudo tee /etc/apt/sources.list.d/datadog.list
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 A2923DFF56EDA6E76E55E492D3A80E30382E94DE
    ```

3. Update apt and downgrade the Agent:

    ```shell
    sudo apt-get update
    sudo apt-get remove datadog-agent
    sudo apt-get install datadog-agent
    ```

4. Back-sync configurations and AutoDiscovery templates (optional)

    If you have made any changes to your configurations or templates, you might want to sync these back for agent 5.

    **Note**: if you have made any changes to your configurations to support new agent6-only options, these will not work anymore with Agent version 5.

5. Back-sync custom checks (optional):

    If you made any changes or added any new custom checks while testing Agent 6 you might want to enable them back on Agent 5. Note that you only need to copy back    checks you changed.

    ```shell
    sudo -u dd-agent -- cp /etc/datadog-agent/checks.d/<CHECK>.py /etc/dd-agent/checks.d/
    ```

6. Restart the agent

    ```shell
    # Systemd
    sudo systemctl restart datadog-agent
    # Upstart
    sudo /etc/init.d/datadog-agent restart
    ```

7. Clean out `/etc/datadog-agent` (optional):

    ```shell
    sudo -u dd-agent -- rm -rf /etc/datadog-agent/
    ```

**Red Hat Flavored Systems**:

1. Remove the Beta Yum repo from your system:

    ```shell
    rm /etc/yum.repos.d/datadog-beta.repo
    [ ! -f /etc/yum.repos.d/datadog.repo ] && echo -e '[datadog]\nname = Datadog, Inc.\nbaseurl = https://yum.datadoghq.com/rpm/x86_64/   \nenabled=1\ngpgcheck=1\nrepo_gpgcheck=0\npriority=1\ngpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public\n       https://yum.datadoghq.com/  DATADOG_RPM_KEY_E09422B3.public' | sudo tee /etc/yum.repos.d/datadog.repo
    ```

2. Update your local yum cache and downgrade the Agent

    ```shell
    sudo yum clean expire-cache metadata
    sudo yum check-update
    sudo yum remove datadog-agent
    sudo yum install datadog-agent
    ```

3. Back-sync configurations and AutoDiscovery templates (optional)

    If you have made any changes to your configurations or templates, you might want to sync these back for agent 5.

    **Note**: if you have made any changes to your configurations to support new agent6-only options, these will not work anymore with Agent version 5.

4. Back-sync custom checks (optional):

    If you made any changes or added any new custom checks while testing Agent 6 you might want to enable them back on Agent 5. Note that you only need to copy back    checks you changed.

    ```shell
    sudo -u dd-agent -- cp /etc/datadog-agent/checks.d/<CHECK>.py /etc/dd-agent/checks.d/
    ```

5. Restart the agent

    ```shell
    # Systemd
    sudo systemctl restart datadog-agent
    # Upstart
    sudo /etc/init.d/datadog-agent restart
    ```

6. Clean out `/etc/datadog-agent` (optional):

    ```shell
    sudo -u dd-agent -- rm -rf /etc/datadog-agent/
    ```

{{% /tab %}}
{{% tab "Windows" %}}

Run the agent installer package for the latest 5.x version,  instructions can be found
[in the Datadog agent integration page][1].

[1]: https://app.datadoghq.com/account/settings#agent/windows
{{% /tab %}}
{{% tab "MacOS" %}}

1. Stop the Agent with the systray app, if it's running.
2. Exit the systray app.
3. Uninstall the Datadog Agent application.
4. Install the Agent 5 DMG package using your preferred installation method.

{{% /tab %}}
{{< /tabs >}}

[1]: /agent/guide/upgrade-to-agent-v6/
