---
title: How do I uninstall the agent ?
kind: faq
customnav: agentnav
---

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