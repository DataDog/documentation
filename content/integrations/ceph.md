---
title: Datadog-Ceph Integration
integration_title: Ceph
kind: integration
git_integration_title: ceph
---
### Overview

Enable the Datadog-Ceph integration to:
  * Track disk usage across storage pools
  * Receive service checks in case of issues
  * Monitor I/O performance metrics

The integration is meant to be enabled on each Ceph monitor host.

1. Adjust the configuration file to match your environment. The default command used to retrieve metrics is `/usr/bin/ceph`. If sudo access is required to run it, please enable the use_sudo flag.

2. Restart the agent.

3. Execute the info command `/etc/init.d/datadog-agent info` and verify that the integration check was successful. The output should contain a section similar to the following:

        Checks
        ======

          [...]

          ceph
          ----
              - instance #0 [OK]
              - Collected 19 metrics, 0 events & 2 service checks
