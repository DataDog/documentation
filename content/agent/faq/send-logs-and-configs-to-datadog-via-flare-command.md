---
title: Send logs and configs to Datadog via flare
kind: faq
further_reading:
- link: "/agent/"
  tag: "Documentation"
  text: Learn more about the Datadog Agent
---

## Overview

If you are running the 5.3 version (or higher) of the agent, you're able to send all necessary troubleshooting information to our Support Team, with one flare command!

`flare` gathers all of the agent's configuration files and logs, removes sensitive information including passwords, API keys, Proxy credentials, and SNMP community strings and uploads it to Datadog as an archive. Since the Datadog Agent is completely open source, you can [verify the code's behavior](https://github.com/DataDog/dd-agent/blob/master/utils/flare.py).

In the commands below, replace `<CASE_ID>` with your Datadog support case ID, if you don't specify a case ID, the command asks for an email address that is used to login in your organization and creates a new support case.

## Flare commands
### Debian, Ubuntu, Centos

* For **Agent 5.3** or higher:
    ```
    sudo /etc/init.d/datadog-agent flare <CASE_ID>
    ```

* For **Agent v6** (beta):
    ```
    $ sudo -u dd-agent -- datadog-agent flare <CASE_ID>
    ```

### Agent installed from source

```
sudo ~/.datadog-agent/bin/agent flare <CASE_ID>
```

### Docker

```
docker exec -it dd-agent /etc/init.d/datadog-agent flare <CASE_ID>
```

For an agent running in a container behind a proxy use:

```
sudo docker exec -it dd-agent /bin/bash
sed -i 's/# skip_ssl_validation: no/skip_ssl_validation: yes/' /etc/dd-agent/datadog.conf /etc/init.d/datadog-agent flare <CASE_ID>
```

### Alpine based docker

```
docker exec -it dd-agent /opt/datadog-agent/bin/agent flare <CASE_ID>
```

### Kubernetes 

```
kubectl exec <pod-name> -it /etc/init.d/datadog-agent flare <CASE_ID>
```

### Mac

```
datadog-agent flare <CASE_ID>
```

### Windows

To send Datadog support a copy of your Windows logs and configurations, do the following:

1. Open the Datadog Agent Manager
2. Select Actions
3. Select Flare
4. Enter your ticket number - if you don't have one leave the value as zero
5. Lastly, enter the email address you use to log into Datadog

That's it, you're done!

{{< img src="agent/faq/windows_flare.jpg" alt="Windows Flare" responsive="true" popup="true" style="width:75%;">}}

It's also possible to run the flare command using Powershell:

```
C:\Program Files\Datadog\Datadog Agent\embedded\python.exe" "C:\Program Files\Datadog\Datadog Agent\agent\agent.py" flare
```
or cmd.exe:
```
C:\Program Files\Datadog\Datadog Agent\embedded\python.exe" "C:\Program Files\Datadog\Datadog Agent\agent\agent.py" flare
```

## Flare Fails to Upload

On Linux and Mac OSX, the output of the flare command tells you where the compressed flare archive is saved. In case the file fails to upload to Datadog, you can retrieve it from this directory and manually add as an attachment to an email.  

For Windows, you can find the location of this file by running the following from the agent's python command prompt:

* Since Agent v5.12:  
    `C:\Program Files\Datadog\Datadog Agent\dist\shell.exe since`

* On older Agent version:  
    `C:\Program Files (x86)\Datadog\Datadog Agent\files\shell.exe`

```
import tempfile
print tempfile.gettempdir()
```

Example : 

{{< img src="agent/faq/flare_fail.png" alt="Flare Fail" responsive="true" popup="true" style="width:75%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
