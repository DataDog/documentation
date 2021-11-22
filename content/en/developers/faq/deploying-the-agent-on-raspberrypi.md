---
title: Deploying the Agent on RaspberryPI
kind: faq
---

**Using Raspbian**

1. Begin with the update of your local cache

    ```shell
    sudo apt-get update
    ```

2. Then install `sysstat`.

    ```text
    sudo apt-get install sysstat
    ```

3. [Navigate to the Agent Install Screen][1] in Datadog and select "from source"
4. Execute the installation command.

    ```shell
    DD_API_KEY=<YOUR-API-KEY> sh -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/setup_agent.sh)"
    ```

**Note**: The installation process may take up to 30 minutes on some models of Raspberry PI.

Example output after successful installation:
{{< img src="developers/faq/rasberypi_install.png" alt="rasberypi_install" >}}

The Agent runs in the foreground. Some users find benefit in creating a `systemd` service for the Agent like this:

```text
#/etc/systemd/system/datadog.service

[Unit]
Description=Datadog Agent

[Service]
ExecStart=/path/to/.datadog-agent/bin/agent

[Install]
WantedBy=multi-user.target
```

Then, run:

```shell
systemctl daemon-reload
sudo systemctl enable datadog
systemctl start datadog
```

The Datadog Agent is installed in the working directory where you ran the installation command, for example: `/home/pi/.datadog-agent/`. 

Example of metrics being ingested from your Raspberry PI device:
{{< img src="developers/faq/rasberry_dashboard.png" alt="raspberry_dashboard" >}}

**Note**: Datadog does not officially support Raspbian.

[1]: https://app.datadoghq.com/account/settings#agent/source
