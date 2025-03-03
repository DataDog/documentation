---
title: IMDSv2 Enablement by Default
aliases:
  - /ec2_imdsv2_transition_payload_enabled
---

With the release of Agent v7.64.0, Datadog defaults to using IMDSv2 for enhanced security and consistency in retrieving AWS metadata.
If your host has already configured the `ec2_prefer_imdsv2` flag to `true`, you won't notice any changes as IMDSv2 is already enabled.

If you upgrade to Agent v7.64.0 without any custom configuration changes, you may see a change to how hostnames appear in Datadog. After this update, Datadog displays hostnames as instance IDs in Fleet Automation and on the Infrastructure list.
This change only impacts how hostnames are displayed. Metric tagging continues to use your original hostnames. Monitoring, alerting, and dashboards are not affected.

### Canonical Hostname

The hostname picked to tag metrics is named the `canonical hostname`, this hostname is the unique ID used to identify your host. Even if your hostname change after upgrading to v7.64.0+, the `canonical hostname` of your host will not change, you can continue to refer to the previous one as before.
Nonetheless you can force the update of your `canonical hostnames` with the `sobotka_allow_override_canonical_name` feature flag.

### Known Issues

Furthermore, hosts updated from a version preceding v7.64.0 to a later release may exhibit an average reporting delay of approximately five minutes.

If any issues arise after updating a host, you can revert to the previous behavior by setting `ec2_imdsv2_transition_payload_enabled` to `false` in your host configuration. You can also [contact Support](/help).
