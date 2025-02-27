---
title: IMDSv2 Enablement by Default
aliases:
  - /ec2_imdsv2_transition_payload_enabled
---


With the release of Agent v7.64.0, Datadog defaults to using IMDSv2 for enhanced security and consistency in retrieving AWS metadata. 

If you upgrade to Agent v7.64.0 without any custom configuration changes, you may see a change to how hostnames appear in Datadog. After this update, Datadog displays hostnames as instance IDs in Fleet Automation and on the Infrastructure list. 

This change only impacts how hostnames are displayed. Metric tagging continues to use your original hostnames. Monitoring, alerting, and dashboards are not affected.
