---
title: Upgrade SDKs
description: "Remotely upgrade SDKs that power APM, Profiler, and Dynamic Instrumentation."
further_reading:
- link: "/agent/fleet_automation/"
  tag: "Documentation"
  text: "Fleet Automation"
site_support_id: fleet-automation-standard-features
---

{{< callout url="https://www.datadoghq.com/product-preview/remote-upgrade-of-sdk-versions/" btn_hidden="false" header="Join the Preview!" >}}
Remotely upgrade the SDKs that power APM, Profiler, Dynamic Instrumentation, and more. Request access to join the preview.
{{< /callout >}}

Fleet Automation can centrally manage remote upgrades to the SDKs that power APM, Continuous Profiler, Dynamic Instrumentation, and more. Keeping your services' SDK versions up to date lets you benefit from the latest features, performance improvements, bug fixes, and security updates.

<div class="alert alert-info">
Scheduling SDK upgrades is not supported.
</div>

## Prerequisites

- Services must be instrumented with [Single Step Instrumentation (SSI)][1].
- Services must be running on Linux or Windows VMs. Remotely upgrading SDKs in containerized or Kubernetes environments is not supported.

## Upgrade SDK versions

1. In Fleet Automation, open the [Upgrade Agents][2] tab and click {{< ui >}}Upgrade Now{{< /ui >}}.

   {{< img src="/agent/fleet_automation/upgrade-screen2.png" alt="The Upgrade Agents tab with the Upgrade Now button." style="width:100%;" >}}

1. Select the {{< ui >}}SDK language{{< /ui >}} and {{< ui >}}version{{< /ui >}}. You can update one language SDK at a time.

   {{< img src="agent/fleet_automation/sdk-upgrade-language.png" alt="SDK language and version selection dropdown." style="width:100%;" >}}

1. Select the hosts to upgrade. Filter by host information or tags to target a specific group.

   {{< img src="agent/fleet_automation/sdk-upgrade-hosts.png" alt="Service selection screen with filtering options to narrow the list of services to upgrade." style="width:100%;" >}}

1. Review the deployment plan and click {{< ui >}}Upgrade Hosts{{< /ui >}} to start the upgrade.

   {{< img src="agent/fleet_automation/sdk-upgrade-plan.png" alt="Deployment plan view showing the list of services staged for SDK upgrade." style="width:100%;" >}}

1. Restart the services to start using the upgraded SDKs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/
[2]: https://app.datadoghq.com/fleet/agent-upgrades
