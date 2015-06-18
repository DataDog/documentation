---
last_modified: 2015/04/21
translation_status: original
language: ja
title: Datadog-VMware Integration
integration_title: VMware

kind: integration
---

### Overview
{:#int-overview}

Install the Datadog VMware vSphere integration to:

Get your performance metrics from vSphere and see them all in Datadog.
- Get vSphere events in Datadog and overlay them on top of your metrics (vMotion, configuration changes, on/off...).
- Interact with your teams on dashboards and the event stream, showing all vSphere data at one glance.


We also have an awesome blog post on vSphere which can be seen [here](https://www.datadoghq.com/2014/08/unified-vsphere-app-monitoring-datadog/).

The following metrics are collected by default with the VMware integration (for more info, please see [here](https://github.com/DataDog/dd-agent/blob/v5.0.2/checks/libs/vmware/basic_metrics.py)):

    cpu.extra
    cpu.ready
    cpu.usage
    cpu.usagemhz
    disk.commandsAborted
    disk.deviceLatency
    disk.deviceReadLatency
    disk.deviceWriteLatency
    disk.queueLatency
    disk.totalLatency
    mem.active
    mem.compressed
    mem.consumed
    mem.overhead
    mem.vmmemctl


#### FAQ
{:#faq}

##### How should the Datadog Agent be set up with vCenter and ESX?
{:#setup}

<img src="/static/images/vmware_agent.png" style="width:100%; border:1px solid #777777"/>

##### How will a VMware integration impact my monthly billing?
{:#pricing}

The base pricing is $15 per virtual machine per month. For general info on Datadog pricing, please visit our [Billing FAQ](http://docs.datadoghq.com/guides/billing/) page.
