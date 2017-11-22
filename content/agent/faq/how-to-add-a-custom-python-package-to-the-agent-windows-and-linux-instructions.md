---
title: How to add a custom python package to the agent?
kind: faq
customnav: agentnav
---

## Linux

The python version embedded with the agent is located here: /opt/datadog-agent/embedded/bin/python.
The agent also comes with pip, and you can install python libraries using:
```
sudo /opt/datadog-agent/embedded/bin/pip install <package_name> .
```

## Windows

The current way to do so is to add the package in the library zipped folder that can be found at `C:\Program Files (x86)\Datadog\Datadog Agent\files`, and [restart the agent](/agent/faq/start-stop-restart-the-datadog-agent).

{{< img src="agent/faq/add_package_windows.png" alt="Add Package Windows" responsive="true" popup="true">}}