---
title: FAQ
kind: faq
customnav: main_references
---

The host list and all its host information of the [Infrastructure List page](https://app.datadoghq.com/infrastructure) of Datadog is made available via the "JSON API permalink" at the bottom of the page.

You can programmatically access host information and get the insights you need, one example is this python script that prints the list of hosts:

* for which Datadog receives aws ec2 information from Cloudwatch, through our AWS integration.
* but that don't have the agent installed.

{{< img src="developers/faq/ec2_instances_without_dd_agent.png" alt="ec2_instances_without_dd_agent" responsive="true" >}}

See the script [here](https://gist.github.com/Martiflex/2803a28ec562fc9a15d404a539f85d38).
