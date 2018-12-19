---
title: Deploying the Agent on RaspberryPI
kind: faq
---

**Using raspbian**

1. Begin with the update of your local cache
```
sudo apt-get update
```

2. Then install "sysstat".
```
sudo apt-get install sysstat
```

3. [Navigate to the Agent Install Screen][1] in the Datadog Application and select "from source"
4. Execute the installation command.
```
DD_API_KEY=<YOUR-API-KEY> sh -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/setup_agent.sh)"
```

Note: The installation process may take up to 30 minutes on some models of Raspberry PI.

If installed correctly you should see an output that looks like:
{{< img src="developers/faq/rasberypi_install.png" alt="rasberypi_install"  responsive="true" >}}

The Agent will run in the foreground. Some users may find benefit in creating an RC script for it or putting it into the /etc/rc.local like this:
```
nohup sh /root/.datadog-agent/bin/agent &
```

You should now see metrics being ingested from your RasberryPI device:
{{< img src="developers/faq/rasberry_dashboard.png" alt="rasberry_dashboard"  responsive="true" >}}

Thank you to Karim Vaes for the [excellent blog post][2]!

[1]: https://app.datadoghq.com/account/settings#agent/source
[2]: https://kvaes.wordpress.com/2015/12/29/datadog-on-raspberry-pi
