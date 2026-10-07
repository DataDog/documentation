---
title: IMDSv2 Enablement by Default
aliases:
  - /ec2_imdsv2_transition_payload_enabled
---

With the release of Agent v7.64.0, the Datadog Agent defaults to using IMDSv2 for enhanced security and consistency in retrieving AWS metadata.
If your host has already configured the `ec2_prefer_imdsv2` flag to `true`, you should not notice any changes as IMDSv2 is already enabled.

If you upgrade to Agent v7.64.0 without any custom configuration changes, you may see a change to how hostnames appear in Datadog. In particular, Datadog ensures that displayed hostnames refer to instance IDs.
This change only impacts how hostnames are displayed. Metric tagging continues to use your original hostnames. Monitoring, alerting, and dashboards should not be affected.

### Canonical hostname

The hostname chosen to associate tags with metrics is named the _canonical hostname_. This hostname is the unique ID used to identify your host. Even if your hostname changes after upgrading to v7.64.0+, the canonical hostname of your host does not change, and you can continue to refer to the previous hostname.

### Known issues

Hosts updated from a version preceding v7.64.0 to a later release may exhibit an average reporting delay of approximately five minutes.

If any issues arise after updating a host, you can revert to the previous behavior by setting `ec2_imdsv2_transition_payload_enabled` to `false` in your host configuration. You can also [contact Support](/help).
