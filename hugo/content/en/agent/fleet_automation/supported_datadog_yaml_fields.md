---
title: Supported datadog.yaml Configuration Fields
description: "Reference of the Agent configuration fields supported by Fleet Automation."
further_reading:
- link: "/agent/fleet_automation/"
  tag: "Documentation"
  text: "Fleet Automation"
- link: "/agent/fleet_automation/configure_agents/"
  tag: "Documentation"
  text: "Configure Agents"
- link: "/api/latest/fleet-automation/"
  tag: "Documentation"
  text: "Fleet Automation API"
site_support_id: fleet-automation-standard-features
---

Fleet Automation supports a subset of `datadog.yaml` fields when you [configure Agents][1]. Every change you supply is validated against a schema, and any field not listed here is rejected with a schema validation error.

Expand a section below to see each supported field with its type, description, and valid values.

{{% fa-config-fields %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/fleet_automation/configure_agents/
