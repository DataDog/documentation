---
title: Datadog-VMware Integration
integration_title: VMware
git_integration_title: vsphere
kind: integration
doclevel: basic
---

#### _Overview_

Install the Datadog VMware vSphere integration to:

* Get your performance metrics from vSphere and see them all in Datadog.
* Get vSphere events in Datadog and overlay them on top of your metrics (vMotion, configuration changes, on/off...).
* Interact with your teams on dashboards and the event stream, showing all vSphere data at one glance.

We also have an awesome blog post on vSphere which can be seen [here][1].

<%= insert_example_links(conf:"vsphere", check:"vsphere")%>

## Metrics

<%= get_metrics_from_git() %>


#### _FAQ_

##### How should the Datadog Agent be set up with vCenter and ESX?

![][3]

##### How will a VMware integration impact my monthly billing?

The base pricing is $15 per virtual machine per month. For general info on Datadog pricing, please visit our [Billing FAQ][4] page.






[1]: https://www.datadoghq.com/2014/08/unified-vsphere-app-monitoring-datadog/
[2]: https://github.com/DataDog/dd-agent/blob/v5.0.2/checks/libs/vmware/basic_metrics.py
[3]: /static/images/vmware_agent.png
[4]: http://docs.datadoghq.com/guides/billing/
