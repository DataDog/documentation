---
title: Adding a custom python package to the Agent
kind: documentation
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: Collect your logs
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: Collect your processes
- link: "tracing"
  tag: "Documentation"
  text: Collect your traces
---

### Linux

The python version embedded with the Agent is located here: `/opt/datadog-agent/embedded/bin/python`.
The Agent also comes with pip; install python libraries using:

```bash
sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip install <package_name>
```

### Windows

Custom python packages can be installed using the Agent's embedded Python using the following command in Powershell:

```
C:\"Program Files"\Datadog\"Datadog Agent"\embedded\python -m install <package_name>
```

Or the package can be added in the library zipped folder that can be found at 
```
C:\Program Files (x86)\Datadog\Datadog Agent\files
```
then [restart your Agent][1].

{{< img src="agent/windows_python_package.png" alt="windows python package" responsive="true" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/basic_agent_usage/windows
