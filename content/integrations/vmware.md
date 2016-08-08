---
title: Datadog-VMware Integration
integration_title: VMware
git_integration_title: vsphere
kind: integration
doclevel: basic
newhlevel: true
---

# Overview

![](/static/images/vsphere_graph.png)

Install the Datadog VMware vSphere integration to:

* Get your performance metrics from vSphere and see them all in Datadog.
* Get vSphere events in Datadog and overlay them on top of your metrics (vMotion, configuration changes, on/off...).
* Interact with your teams on dashboards and the event stream, showing all vSphere data at one glance.

We also have an awesome blog post on vSphere which can be seen [here][1].


# Installation

1.  Install the Datadog windows agent on your vCenter server.
1.  Create a Datadog user in the Administration section of vCenter, you can use the default Read-Only access group.

    ![](/static/images/vsphere_create_user.png)

# Configuration

1.  Configure the Agent to connect to your vCenter instance. Edit conf.d/vsphere.yaml:

        init_config:

        instances:
          - name: main-vcenter
            host: vcenter.domain.com
            username: datadog-readonly@vsphere.local
            password: mypassword
    {:.language-yaml}

1.  Restart the Agent

## Configuration Options

* `ssl_verify` (Optional) - Set to false to disable SSL verification, when connecting to vCenter optional
* `ssl_capath` (Optional) - Set to the absolute file path of a directory containing CA certificates in PEM format
* `host_include_only_regex` (Optional) - Use a regex like this if you want only the check to fetch metrics for these ESXi hosts and the VMs running on it
* `vm_include_only_regex` (Optional) - Use a regex to include only the VMs that are matching this pattern.
* `include_only_marked` (Optional) - Set to true if you'd like to only collect metrics on vSphere VMs which are marked by a custom field with the value 'DatadogMonitored'. To set this custom field with PowerCLI, use the follow command: `Get-VM <MyVMName> | Set-CustomField -Name "DatadogMonitored" -Value "DatadogMonitored"`
* `all_metrics` (Optional) - When set to true, this will collect EVERY metric from vCenter, which means a LOT of metrics you probably do not care about. We have selected a set of metrics that are interesting to monitor for you if false.
* `event_config` (Optional) - Event config is a dictionary. For now the only switch you can flip is collect_vcenter_alarms which will send as events the alarms set in vCenter.

<%= insert_example_links(conf:"vsphere", check:"vsphere")%>

# Validation

Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:

    Checks
    ======

      [...]

      vsphere
      -------
          - instance #0 [OK]
          - Collected 8 metrics & 0 events

# Metrics

<%= get_metrics_from_git() %>


# FAQ

##### How should the Datadog Agent be set up with vCenter and ESX?

![][3]

##### How will a VMware integration impact my monthly billing?

The base pricing is $15 per virtual machine per month. For general info on Datadog pricing, please visit our [Billing FAQ][4] page.






[1]: https://www.datadoghq.com/2014/08/unified-vsphere-app-monitoring-datadog/
[2]: https://github.com/DataDog/dd-agent/blob/v5.0.2/checks/libs/vmware/basic_metrics.py
[3]: /static/images/vmware_agent.png
[4]: http://docs.datadoghq.com/guides/billing/
