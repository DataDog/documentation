---
title: Upgrade Instructions and Memories
description: "Teach Bits Maintenance how your team performs upgrades with upgrade instructions, and manage the memories it records from your answers."
further_reading:
- link: "/bits_ai/bits_maintenance/"
  tag: "Documentation"
  text: "Bits Maintenance"
- link: "/bits_ai/bits_maintenance/setup/"
  tag: "Documentation"
  text: "Set up Bits Maintenance"
- link: "/bits_ai/bits_maintenance/campaigns_plans/"
  tag: "Documentation"
  text: "Bits Maintenance campaigns and plans"
- link: "/containers/monitoring/"
  tag: "Documentation"
  text: "Container Monitoring"
---

{{< callout url="https://www.datadoghq.com/product-preview/bits-maintenance/" btn_hidden="false" header="Join the Preview!" >}}
Bits Maintenance is in Preview. Use this form to request access.
{{< /callout >}}

Use upgrade instructions and memories to teach [Bits Maintenance][1] how your team works. Bits uses this information when developing [campaigns and plans][2] for your team.

## Upgrade instructions

Provide upgrade instructions to Bits Maintenance to teach it how your team performs upgrades, such as who does what, in which order, and which repositories or workflows to use.

Bits Maintenance has default upgrade instructions, which it combines with the instructions you provide to build upgrade campaigns. View the default instructions at {{< ui >}}Bits Maintenance{{< /ui>}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Upgrade Instructions{{< /ui >}} > {{< ui >}}View Default Instructions{{< /ui >}}.

### Add upgrade instructions

To add upgrade instructions:
1. Navigate to {{< ui >}}Bits Maintenance{{< /ui>}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Upgrade Instructions{{< /ui >}}.
1. Click {{< ui >}}Create Instructions{{< /ui>}}.
1. Fill in the fields:
    - {{< ui >}}Instructions name{{< /ui>}}: Enter an identifier for these upgrade instructions.
    - {{< ui >}}Match upgrades by tags (optional){{< /ui>}}: To scope which clusters, projects, namespaces, or environments these upgrade instructions apply to, select one or more tags. Leave empty to apply to all upgrades.
    - {{< ui >}}Your runbook{{< /ui>}}: Describe your upgrade process, such as who does what, in which order, and which repositories or workflows to use.
1. Click {{< ui >}}Create Draft for Review{{< /ui >}}.
    - Bits Maintenance parses the instructions you entered into a plan template.

{{< img src="bits_ai/maintenance/upgrade_instructions.png" alt="A set of upgrade instructions named Platform Component Upgrades, showing built-in and custom steps grouped into Before the upgrade and Upgrade changes and merge gates sections" style="width:100%;" >}}

## Memories

As Bits Maintenance builds or executes a plan, it may pause to ask you a question. If you select {{< ui >}}Remember this answer{{< /ui >}} when you respond, Bits records your answer as a memory so you don't have to answer the same question again.

To view the memories Bits has collected, or to delete a memory, navigate to {{< ui >}}Bits Maintenance{{< /ui>}} > {{< ui >}}Settings{{< /ui>}} > {{< ui >}}Memories{{< /ui>}}.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_maintenance/
[2]: /bits_ai/bits_maintenance/campaigns_plans/
