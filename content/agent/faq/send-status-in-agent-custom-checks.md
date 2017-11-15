---
title: Send status in agent custom checks
kind: faq
customnav: agentnav
---

By default the datadog agent sends one service check status for each check enabled. For instance, the nginx check collects 4 status: 1 for each instance of the check (3) + 1 for the check itself. At the moment this 'check status' cannot be used in Datadog, but this is something that we could do in the future.

If your custom check code explicitly sends a service check status (like our [ssh_check](/integrations/ssh_check) or the [nginx check](/integrations/nginx)) you will be able to find it in the 'Custom check' section of the monitors.

To submit a status within your custom agent check you can use the following syntax:
```python

from checks import AgentCheck

[...]

if everything_works_well:

    self.service_check('<NAME OF YOUR STATUS>', 0)

else:

    self.service_check('<NAME OF YOUR STATUS>', 2)
```

You'll find more information about the service_check function [here](https://gist.github.com/MartinDatadog/f72343f0e4d636c56398) and more information about status check [there](/monitors/).