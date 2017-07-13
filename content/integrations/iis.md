---
title: Datadog-IIS Integration
integration_title: IIS
kind: integration
newhlevel: true
git_integration_title: iis
updated_for_agent: 5.8.5
---
## Overview

{{< img src="iisgraph.png" alt="IIS Graph" >}}

Connect IIS to Datadog in order to:

* Visualize your web server performance.
* Correlate the performance of IIS with the rest of your applications.

## Installation

1.  In order to be sure that IIS performance counters will be sent to WMI, resync the WMI counters.

    On Windows <= 2003 (or equivalent) run the following in cmd.exe:

        winmgmt /clearadap
        winmgmt /resyncperf

    On Windows >= 2008 (or equivalent) run the following in cmd.exe:

        winmgmt /resyncperf

## Configuration

1.  Configure the Agent to connect to IIS. Edit conf.d/iis.yaml and add this server to instances with (optional) tags:

        init_config:

        instances:
          - host: . # "." means the current host
            tags:
              - mytag1
              - mytag2


1.  Restart the Agent using the Agent Manager (or restart the service)

### Configuration Options

By default, this check will run against a single instance - the current machine that
the Agent is running on. It will check the WMI performance counters for IIS on that machine.

If you want to check other remote machines as well, you can add one instance per host.
Note: If you also want to check the counters on the current machine, you will have
to create an instance with empty params.

The optional `provider` parameter allows to specify a WMI provider (default to `32`
on Datadog Agent 32-bit or `64`). It is used to request WMI data from the non-default
provider. Available options are: `32` or `64`. For more information,
[review this MSDN article](https://msdn.microsoft.com/en-us/library/aa393067.aspx).

The `sites` parameter allows you to specify a list of sites you want to read metrics
from. With sites specified, metrics will be tagged with the site name. If you don't
define any sites, the check will pull the aggregate values across all sites.

Here's an example of configuration that would check the current machine and a remote machine
called MYREMOTESERVER. For the remote host we are only pulling metrics from the default site.

    - host: .
      tags:
        - myapp1
      sites:
        - Default Web Site
    - host: MYREMOTESERVER
      username: MYREMOTESERVER\fred
      password: mysecretpassword
      is_2008: false


* `is_2008` (Optional) - NOTE: because of a typo in IIS6/7 (typically on W2K8) where perfmon reports TotalBytesTransferred as TotalBytesTransfered, you may have to enable this to grab the IIS metrics in that environment.

{{< insert-example-links >}}

## Validation

Check the info page in the Agent Manager and verify that the integration check has passed. It should display a section similar to the following:

    Checks
    ======

      [...]

      iis
      ---
          - instance #0 [OK]
          - Collected 20 metrics & 0 events

## Metrics

{{< get-metrics-from-git >}}



