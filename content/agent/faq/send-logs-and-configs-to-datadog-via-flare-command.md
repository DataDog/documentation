---
title: Send logs and configs to Datadog via flare command
kind: faq
customnav: agentnav
further_reading:
- link: "/agent/"
  tag: "Documentation"
  text: Learn more about the Datadog Agent
---

## Linux and Mac OS X

If you are running the 5.3 version of the agent, you're able to send all necessary troubleshooting information to our Support Team, with one command!

First, find the datadog-agent command:

* If you're using the packaged version of the agent (Debian, Ubuntu, Centos..) the command is: 
    ```
    sudo /etc/init.d/datadog-agent
    ```
* If you've installed the agent from the source it is: 
    ```
    sudo ~/.datadog-agent/bin/agent
    ```
* If you are running the docker agent use:
    ```
    docker exec -it dd-agent /etc/init.d/datadog-agent flare
    ```
* If you are running the alpine based docker agent use:
    ```
    docker exec -it dd-agent /opt/datadog-agent/bin/agent flare
    ```
* On Kubernetes, the command is: 
    ```
    kubectl exec <pod-name> -it /etc/init.d/datadog-agent flare
    ```
* On Mac, the command is:
    ```
    datadog-agent flare
    ```

Then just use this command with the flare {caseid} arguments, for example:
```
$ sudo /etc/init.d/datadog-agent flare 123456
```

This gathers all of the agent's configuration files and logs, remove sensitive information like passwords or SNMP community strings and upload it to our server as an archive.

If you have not specified a case ID, the command asks for an email address that is used to login in your organization and creates a new support case: 
```
$ sudo /etc/init.d/datadog-agent flare
```

That's it, you're done!

## Windows

To send Datadog support a copy of your Windows logs and configs, do the following:

1. Open the Datadog Agent Manager
2. Select Actions
3. Select Flare
4. Next you'll be prompted for your ticket number - if you don't have one leave the value as zero
5. Lastly, enter the email address you use to log into Datadog

That's it, you're done!

{{< img src="agent/faq/windows_flare.jpg" alt="Windows Flare" responsive="true" popup="true">}}

It's also possible to run the flare command using Powershell:

```
C:\Program Files\Datadog\Datadog Agent\embedded\python.exe" "C:\Program Files\Datadog\Datadog Agent\agent\agent.py" flare
```
or cmd.exe:
```
C:\Program Files\Datadog\Datadog Agent\embedded\python.exe" "C:\Program Files\Datadog\Datadog Agent\agent\agent.py" flare
```

## Kubernetes

To send Datadog support a copy of your pod logs and configs, do the following:
```
kubectl exec <pod-name> -it /etc/init.d/dd-agent flare
```

## Flare Fails to Upload

On Linux and Mac OSX, the output of the flare command tells you where the compressed flare archive is saved. In case the file fails to upload to Datadog, you can retrieve it from this directory and manually add as an attachment to an email. For Windows, you can find the location of this file by running the following from the agent's python command prompt (C:\Program Files\Datadog\Datadog Agent\dist\shell.exe since Agent v5.12, C:\Program Files (x86)\Datadog\Datadog Agent\files\shell.exe on older installations):

```
import tempfile
print tempfile.gettempdir()
```

Example : 

{{< img src="agent/faq/flare_fail.png" alt="Flare Fail" responsive="true" popup="true">}}


## What about my sensitive information? 

The flare searches for any fields like passwords, passwords in a URI, API keys, and Proxy credentials and prevent this info from being sent. 

Since the Datadog Agent is completely open source, you can check out the code for this at any time. See here: https://github.com/DataDog/dd-agent/blob/master/utils/flare.py

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}