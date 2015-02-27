---
title: Datadog-VMware Integration
sidebar:
  nav:
    - header: Integrations
    - text: Back to Overview
      href: "/ja/integrations/"
---

<div id="int-overview">
<h3>Overview</h3>

Install the Datadog VMware vSphere integration to:
<ul>
<li>Get your performance metrics from vSphere and see them all in Datadog.</li>
<li>Get vSphere events in Datadog and overlay them on top of your metrics (vMotion, configuration changes, on/off...).</li>
<li>Interact with your teams on dashboards and the event stream, showing all vSphere data at one glance.</li>
</ul>
</div>

We also have an awesome blog post on vSphere which can be seen
<a target="_blank" href="https://www.datadoghq.com/2014/08/unified-vsphere-app-monitoring-datadog/">here</a>.

The following metrics are collected by default with the VMware integration (for more info, please see
<a target="_blank" href="https://github.com/DataDog/dd-agent/blob/v5.0.2/checks/libs/vmware/basic_metrics.py">here</a>):

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


<h4 id="faq">FAQ</h4>
<div id="setup">
How should the Datadog Agent be set up with vCenter and ESX?
<img src="/static/images/vmware_agent.png" style="width:100%; border:1px solid #777777"/>
</div>

<div id="pricing">
The base pricing is $15 per VM per month. For general info on Datadog pricing, please see
<a target="_blank" href="http://docs.datadoghq.com/guides/billing/">here</a>.
</div>
