---
title: Rollback Detection
description: Learn how CD Visibility detects deployment rollbacks.
further_reading:
- link: "/continuous_delivery/deployments/"
  tag: "Documentation"
  text: "Learn about Deployment Visibility"
- link: "/continuous_delivery/explorer"
  tag: "Documentation"
  text: "Learn how to query and visualize deployments"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CD Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Join the Preview!" >}}
CD Visibility is in Preview. If you're interested in this feature, complete the form to request access.
{{< /callout >}}

## Overview

Knowing when specific deployments are performing a rollback is useful to:
- Understand deployment stability and the frequency of rollbacks across your services.
- Identify patterns in deployment issues that lead to rollbacks.

To detect rollbacks, Datadog compares the current deployment version with the previous versions deployed for the same service and environment. A rollback is identified when both of the following occur:
- The current version is different from the previous version. This ensures that redeploying the same version does not constitute a rollback.
- The current version matches a version that was previously deployed.

You can search for rollback deployments in [Deployment Executions][1], using the `@deployment.is_rollback` tag:

{{< img src="continuous_delivery/features/rollbacks-deployment-executions.png" alt="Rollback indicator in Deployment Executions page" style="width:100%;">}}

You can also see more detailed information in the event detail:

{{< img src="continuous_delivery/features/rollbacks-detail.png" alt="Rollback detail" style="width:100%;">}}

## Requirements

Rollback detection works for deployments that have all of the following:
- A service (`@deployment.service`)
- An environment (`@deployment.env`)
- A version identifier (`@deployment.version`)

### Version for CI-based providers
For CI-based providers, Datadog uses the `--revision` parameter that you pass to the `datadog ci` command. This parameter should contain the version identifier for your deployment (such as a commit SHA, image tag, or version number).

### Version for Argo CD
For Argo CD deployments, Datadog uses the `revision` value to detect rollbacks. Note that when using Argo CD's revert functionality, a new revision is created, which means Datadog won't detect it as a rollback. To properly track rollbacks in Datadog with Argo CD, you need to redeploy using an older revision.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments/executions
