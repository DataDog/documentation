---
title: Agent Status and Information
kind: faq
---

## V6

### Status
### Info

## V5
## Status

### Mac OS X

To check if the Agent is running: (since 3.8.0)
```
/usr/local/bin/datadog-agent status
```

### Linux

To check if the Agent is running: (since 3.8.0)
```
sudo /etc/init.d/datadog-agent status
```

### Docker

To check if the Agent is running:
```
sudo docker exec -it dd-agent /etc/init.d/datadog-agent status
```

### SmartOS

To check if the Agent is running:
```
svcs datadog
```

### Source

To check if the Agent is running:
```
sudo ~/.datadog-agent/bin/agent status
```

### Infos

Running an info command displays the status of your Datadog agent, and the status of all integrations enabled for this Agent:

An Agent integration reports “OK” if it's properly configured as seen below:

```
  Checks
  ======

    network
    -------
      - instance #0 [OK]
      - Collected 15 metrics, 0 events & 1 service check
```

The `[OK]` in the Agent output implies that the check was configured/run correctly but does not refer to the value being returned by your check.  

### Mac OS X

To receive information about the Agent’s state:
```
/usr/local/bin/datadog-agent info
```
Tracebacks for errors can be retrieved by setting the -v flag: (since 3.8.0)
```
/usr/local/bin/datadog-agent info -v
```

### Linux

To receive information about the Agent’s state:
```
sudo /etc/init.d/datadog-agent info
```
Tracebacks for errors can be retrieved by setting the -v flag: (since 3.8.0)
```
sudo /etc/init.d/datadog-agent info -v
```

### Docker

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

### SmartOS

To receive more information about the Agent’s state:
```
/opt/local/datadog/bin/info
```
Tracebacks for errors can be retrieved by setting the -v flag: (since 3.8.0)
```
/opt/local/datadog/bin/info -v
```

### Source

To receive more information about the Agent’s state:
```
sudo ~/.datadog-agent/bin/info
```
Tracebacks for errors can be retrieved by setting the -v flag: (since 3.8.0)
```
sudo ~/.datadog-agent/bin/info -v
```

### Windows

For 5.2 and later versions of the agent go to the Datadog Agent Manager->Settings->Agent Status

{{< img src="agent/faq/windows_status.png" alt="Windows Status" responsive="true" popup="true">}}

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