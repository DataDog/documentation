---
title: Start/Stop/Restart the Datadog Agent
kind: faq
customnav: agentnav
---

## Mac OS X

To manually start the Agent:
```
/usr/local/bin/datadog-agent start
```

To stop the Agent:
```
/usr/local/bin/datadog-agent stop 
```

To restart the Agent and to reload the configuration files:
```
/usr/local/bin/datadog-agent restart 
```
To reload only the integration configuration files:
```
/usr/local/bin/datadog-agent reload
```
(to reload full agent configuration, you must restart the agent)

## Linux

To manually start the Agent:
```
sudo /etc/init.d/datadog-agent start 
```
To stop the Agent:
```
sudo /etc/init.d/datadog-agent stop
```
To restart the Agent and to reload the configuration files:
```
sudo /etc/init.d/datadog-agent restart
```
To reload only the integration configuration files:
```
sudo /etc/init.d/datadog-agent reload
```

(to reload full agent configuration, you must restart the agent)

## SmartOS

To manually start the Agent:
```
svcadm enable datadog
```
To stop the Agent:
```
svcadm disable datadog
```
To restart the Agent and to reload the configuration files:
```
svcadm restart datadog
```

## Source

To manually start the Agent:
```
sudo ~/.datadog-agent/bin/agent start
```

To stop the Agent:
```
sudo ~/.datadog-agent/bin/agent stop
```

To restart the Agent:
```
sudo ~/.datadog-agent/bin/agent restart
```

To reload only the integration configuration files:
```
sudo ~/.datadog-agent/bin/agent reload
```
(to reload full agent configuration, you must restart the agent)

## Windows

To manually start the Agent, you can use the Datadog Agent Manager, once open you'll find service controls here:

{{< img src="agent/faq/manager-snapshot.png" alt="Manager snapshot" responsive="true" >}}

Alternatively, you can also access the Windows Service Manager for identical controls:

{{< img src="agent/faq/windows-service.png" alt="Windows Service" responsive="true" >}}

It's also possible to start and stop the agent using Powershell or cmd.exe:

To manually start the Agent:
```
net start datadogagent
```
To stop the Agent:
```
net stop datadogagent
```
To restart the Agent, run the stop and start commands in succession.