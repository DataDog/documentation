---
title: Agent Status and Information
kind: faq
customnav: agentnav
---

## Mac OS X

To check if the Agent is running: (since 3.8.0)
```
/usr/local/bin/datadog-agent status
```
To receive information about the Agent’s state:
```
/usr/local/bin/datadog-agent info
```
Tracebacks for errors can be retrieved by setting the -v flag: (since 3.8.0)
```
/usr/local/bin/datadog-agent info -v
```

## Linux

To check if the Agent is running: (since 3.8.0)
```
sudo /etc/init.d/datadog-agent status
```
To receive information about the Agent’s state:
```
sudo /etc/init.d/datadog-agent info
```
Tracebacks for errors can be retrieved by setting the -v flag: (since 3.8.0)
```
sudo /etc/init.d/datadog-agent info -v
```

## Docker

To check if the Agent is running:
```
sudo docker exec -it dd-agent /etc/init.d/datadog-agent status
```
To receive information about the Agent’s state:
```
sudo docker exec -it dd-agent /etc/init.d/datadog-agent info
```
Tracebacks for errors can be retrieved by setting the -v flag:
```
sudo docker exec -it dd-agent /etc/init.d/datadog-agent info -v
```
For the Alpine based Docker images, the command root is:
```
docker exec -it dd-agent /opt/datadog-agent/bin/agent
```
E.g.
```
docker exec -it dd-agent /opt/datadog-agent/bin/agent info
```

## SmartOS

To check if the Agent is running:
```
svcs datadog
```
To receive more information about the Agent’s state:
```
/opt/local/datadog/bin/info
```
Tracebacks for errors can be retrieved by setting the -v flag: (since 3.8.0)
```
/opt/local/datadog/bin/info -v
```

## Source

To check if the Agent is running:
```
sudo ~/.datadog-agent/bin/agent status
```
To receive more information about the Agent’s state:
```
sudo ~/.datadog-agent/bin/info
```
Tracebacks for errors can be retrieved by setting the -v flag: (since 3.8.0)
```
sudo ~/.datadog-agent/bin/info -v
```

## Windows

For 5.2 and later versions of the agent go to the Datadog Agent Manager->Settings->Agent Status

{{< img src="agent/faq/windows_status.png" alt="Windows Status" responsive="true" >}}

It's also possible to run the info command using Powershell:

```
"C:\Program Files\Datadog\Datadog Agent\embedded\python.exe" "C:\Program Files\Datadog\Datadog Agent\agent\agent.py" info
```
or cmd.exe:
```
C:\Program Files\Datadog\Datadog Agent\embedded\python.exe" "C:\Program Files\Datadog\Datadog Agent\agent\agent.py" info
```

If you're running on a version older than 5.2 visit the status page in your web browser:

http://localhost:17125/status
The status page is supported in Agent version 3.9.1-5.1.1