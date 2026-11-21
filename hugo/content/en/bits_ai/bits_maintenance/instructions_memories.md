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

## Overview

{{< callout url="https://www.datadoghq.com/product-preview/bits-maintenance/" btn_hidden="false" header="Join the Preview!" >}}
Bits Maintenance is in Preview. Use this form to request access.
{{< /callout >}}

Teach [Bits Maintenance][1] to work the way your team works with upgrade instructions and memories. Bits uses this information when developing [campaigns and plans][2] for your team.
<!-- TODO: confirm that^ statement about Bits using it for campaigns/plans -->

## Upgrade instructions

Provide upgrade instructions to Bits Maintenance to teach it how your team performs upgrades, such as who does what, in which order, and which repositories or workflows to use.

Bits Maintenance has a default upgrade runbook, which it combines with the instructions you provide to create a complete upgrade campaign. View the default instructions at {{< ui >}}Bits Maintenance{{< /ui>}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Upgrade Instructions{{< /ui >}} > {{< ui >}}View Default Instructions{{< /ui >}}.

### Add upgrade instructions

To add upgrade instructions:
1. Navigate to {{< ui >}}Bits Maintenance{{< /ui>}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Upgrade Instructions{{< /ui >}}.
1. Click {{< ui >}}Create Instructions{{< /ui>}}.
<!-- TODO -->
1. Click {{< ui >}}Create Draft for Review{{< /ui >}}.
<!-- TODO -->

## Memories

As Bits Maintenance builds or executes a plan, it may pause to ask you a question. It records your answer as a memory, so that you don't have to answer the same questions repeatedly.

To view the memories Bits has collected, or to delete a memory, navigate to {{< ui >}}Bits Maintenance{{< /ui>}} > {{< ui >}}Settings{{< /ui>}} > {{< ui >}}Memories{{< /ui>}}.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_maintenance/
[2]: /bits_ai/bits_maintenance/campaigns_plans/