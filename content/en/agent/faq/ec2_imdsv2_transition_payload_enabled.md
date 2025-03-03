---
title: IMDSv2 Enablement by Default
aliases:
  - /ec2_imdsv2_transition_payload_enabled
---

With the release of Agent v7.64.0, Datadog defaults to using IMDSv2 for enhanced security and consistency in retrieving AWS metadata.

If you upgrade to Agent v7.64.0 without any custom configuration changes, you may see a change to how hostnames appear in Datadog. After this update, Datadog displays hostnames as instance IDs in Fleet Automation and on the Infrastructure list.
This change only impacts how hostnames are displayed. Metric tagging **continues** to use your original hostnames. Monitoring, alerting, and dashboards are **not affected**.

Furthermore, hosts updated from a version preceding 7.64.0 to a later release **may** exhibit an average reporting delay of approximately five minutes.

If your host has already configured the `ec2_prefer_imdsv2` flag to `true`, you won't notice any change since IMDSv2 is already enabled.

Should any issues arise after updating a host, please revert to the previous behavior by setting `ec2_imdsv2_transition_payload_enabled` to `false` in your host configuration, and **contact Support** via the Contact support page in the application.
