---
title: Agent FAQ
kind: documentation
customnav: agentnav
---

## Agent
### Is the agent necessary to use Datadog?


* No, it is not. You don't have to install an agent if you only want to submit
metrics via our API. You can read more about our API [here][agent-1].
* In general, most folks find a lot of value in installing an agent because
they get system metrics for free and metrics on common software like mysql,
postgres, etc. with just a little bit of configuration. Another advantage is
that there is a small statsd server built-in to the agent.


### Can I use my own StatsD client?


Any StatsD client will work just fine, but using the Datadog DogStatsD client
will give you a few extra features. You can read more about our clients extra
features [here][agent-2].


### How can I change the hostname


You can change the hostname by updating your agent’s configuration file called
datadog.conf and replacing the value for the “hostname” key.  Use the following
link, select your OS in the left column, and go to
the [Configuration section][agent-3] to find the location of your
agent’s configuration file.

### How do I uninstall the agent

* Mac OS:

  Stop and Close the Datadog Agent: via the bone icon in the Tray.

  Drag the Datadog Application from the application folder to the Trash Bin.

  `$ sudo rm -rf /opt/datadog-agent` <br />
  `$ sudo rm -rf /usr/local/bin/datadog-agent` <br />
  `$ sudo rm -rf ~/.datadog-agent/**​ #to remove broken symlinks`


  If you ran the optional install commands to have the Agent run at boot time, you will also need to run the following to finish uninstalling:


  `$ sudo launchctl unload -w /Library/LaunchDaemons/com.datadoghq.agent.plist` <br />
  `$ sudo  rm /Library/LaunchDaemons/com.datadoghq.agent.plist` <br />


* Windows: You can uninstall the agent in Add/Remove Programs
* Linux: `$ sudo apt-get remove datadog-agent -y`
* CentOS 5: `$ sudo yum remove datadog-agent-base`
* CentOS 6: `$ sudo yum remove datadog-agent`

### I stopped my agent but I’m still seeing the host in my Datadog account. Why is that?


It can take up to 24h for the host to disappear from the infrastructure page,
but it will only be part of the host count for billing purposes if we're
actually receiving data.

### Other Agent-related questions?


Please refer to the [Basic Agent Usage Guide][agent-3].

[agent-1]: /api/
[agent-2]: /developers/dogstatsd/
[agent-3]: /agent/