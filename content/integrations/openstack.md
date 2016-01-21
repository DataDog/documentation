---
title: Datadog-OpenStack Integration
integration_title: OpenStack
kind: integration
doclevel: basic
---


### Overview

Connects your OpenStack cluster to Datadog in order to:

* Track vital statistics about your Nova hypervisors
* Track resource usage and I/O on your Nova-managed servers
* Verify connectivity of your Neutron networks

![OpenStack default dashboard](/static/images/openstack.png)

Learn more about how to monitor OpenStack Nova performance metrics thanks to [our series of posts](https://www.datadoghq.com/blog/openstack-monitoring-nova/). We detail the key performance metrics, how to collect them, and how to use Datadog to monitor OpenStack Nova.

### Installation

Note: Installing the OpenStack Integration could increase the number of VMs that Datadog monitors. For more information on how this may affect your billing, please visit our Billing FAQ.

To capture OpenStack metrics you need to install the Datadog Agent on your hosts running hypervisors.

1. First configure a Datadog role and user with your identity server


        openstack role create datadog_monitoring
        openstack user create datadog \
            --password my_password \
            --project my_project_name
        openstack role add datadog_monitoring \
            --project my_project_name \
            --user datadog


2. Update your policy.json files to grant the needed permissions.
```role:datadog_monitoring``` requires access to the following operations:

    **Nova**

        - "compute_extension:aggregates",
        - "compute_extension:hypervisors",
        - "compute_extension:server_diagnostics",
        - "compute_extension:v3:os-hypervisors",
        - "compute_extension:v3:os-server-diagnostics",
        - "compute_extension:availability_zone:detail",
        - "compute_extension:v3:availability_zone:detail",
        - "compute_extension:used_limits_for_admin",
        - "os_compute_api:os-aggregates:index",
        - "os_compute_api:os-aggregates:show",
        - "os_compute_api:os-hypervisors",
        - "os_compute_api:os-hypervisors:discoverable",
        - "os_compute_api:os-server-diagnostics",
        - "os_compute_api:os-used-limits"


    **Neutron**

        - "get_network"


    **Keystone**

        - "identity:get_project"
        - "identity:list_projects"


    You may need to restart your Keystone, Neutron and Nova API services to ensure that the policy changes take.


3. Configure the Datadog Agent to connect to your Keystone server, and specify individual projects to monitor. Edit openstack.yaml. You can find a sample configuration in the conf.d directory in your agent install.

4. Restart the Agent
5. Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:

        Checks
        ======

          [...]

          openstack
          ---------
              - instance #0 [OK]
              - Collected 8 metrics & 0 events
