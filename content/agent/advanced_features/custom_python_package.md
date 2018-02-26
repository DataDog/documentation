---
title: Adding a custom python package to the agent
kind: documentation
---


### Linux

The python version embedded with the agent is located here: `/opt/datadog-agent/embedded/bin/python`.  
The agent also comes with pip, install python libraries using:

```bash
sudo /opt/datadog-agent/embedded/bin/pip install <package_name>
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
then [restart your agent](/agent/basic_agent_usage/windows).

{{< img src="agent/advanced_features/windows_python_package.png" alt="windows python package" responsive="true" popup="true">}}