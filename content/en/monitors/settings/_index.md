---
title: Monitor Settings
kind: documentation
description: Configure settings related to your monitors
further_reading:
- link: "/monitors/create/"
  tag: "Documentation"
  text: "Create monitors"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Monitor Notifications"
---

# Tag Enforcement for Monitors

{{< beta-callout url="#" btn_hidden="true" >}}
  Interested in enforcing tags for monitors? Reach out to support@datadoghq.com!
{{< /beta-callout >}}

Monitor tag policies are configurations that enforce and validate the existence of tag keys and values on your Datadog monitors. These policies are useful for attribution as well as ensuring that monitor notifications include the tag keys and values neeeded for downstream services to process alerts properly.

Once set up, tag policies apply to **all** Datadog monitors as well as Synthetic tests of a given account. There are three ways to leverage tag policies:

- Enforce tag keys and values
- Enforce tag keys only
- Optional tag keys but mandatory values

**Note**: once a monitor tag policy which enforces tag keys and/or values is active, monitors that violate this policy are restricted from creation/update. In the latter case, monitors will still continue to evaluate and notify as expected.

## Enforce tag keys and values

{{< img src="monitors/settings/monitor_tag_enforcement_key_and_value.png" alt="Enforce monitor tag keys and values"  >}}

In order to make sure that each monitor is tagged properly, you can use monitor tag policies to enforce tag keys and values. This is useful not just for attribution use cases but also when alerts are routed to downstream systems and workflows for triaging and processing.

## Enforce tag keys only

{{< img src="monitors/settings/monitor_tag_enforcement_key_only.png" alt="Enforce monitor tag keys only"  >}}

You can use monitor tag policies to asure the presence of certain tag keys on monitors. This way, it is mandatory for each monitor to have a value set for the enforced key. In the example above, we make sure that every monitor has a tag value set for `product_id`.

## Optional tag keys but mandatory values

If your setup doesn't require monitor tags to be present at all times, but you would still like to enforce the values of a tag key *if* it's present, then you can build tag policies and leave the checkbox for *Required* unchecked.

{{< img src="monitors/settings/monitor_tag_enforcement_optional_key_with_values.png" alt="Enforce monitor tag keys only"  >}}

With the example above, monitors not using the `env` tag are able to be created/updated. However, monitors using the `env` tag will require to have values set to `dev`, `staging`, or `prod`. Not meeting this condition will result in failure of creation/update.

## RBAC

The creation/update of monitor tag policies is only permitted for users with the `MONITOR_CONFIG_POLICY_WRITE_PERMISSION` permission.

# Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/manage
