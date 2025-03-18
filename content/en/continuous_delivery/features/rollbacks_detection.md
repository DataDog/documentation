---
title: Rollbacks Detection
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

Rollbacks Detection allows Datadog to identify when a deployment is reverting to a previously deployed version. This is particularly valuable to:
- Understand deployment stability and the frequency of rollbacks across your services
- Identify patterns in deployment issues that lead to rollbacks

To detect rollbacks, Datadog compares the current deployment version with the previous deployment version. A rollback is identified when:
1. The current version is different from the previous version
2. The current version matches a version that was previously deployed

This detection helps teams understand when they're reverting to a known good state, which can be crucial for incident response and post-mortem analysis.

Rollback information is visible in the [Deployment Executions page][1], where you can see which deployments were rollbacks and what version they rolled back to. You can query for them using the `@deployment.is_rollback` tag.

{{< img src="continuous_delivery/features/rollbacks-deployment-executions.png" alt="Rollback indicator in Deployment Executions page" style="width:100%;">}}

You can also see more detailed information in the event detail:

{{< img src="continuous_delivery/features/rollbacks-detail.png" alt="Rollback detail" style="width:100%;">}}

## How it works

Datadog detects rollbacks by maintaining a history of deployed versions for each service and environment. When a new deployment occurs:

1. The system compares the current deployment version with the previous deployment version
2. If the versions are different, it checks if the current version matches any previously deployed version
3. If a match is found, the deployment is marked as a rollback

This detection is automatic and requires no additional configuration beyond the standard deployment tracking setup.

## Requirements

Rollback detection works for deployments that have:
- A service (`@deployment.service`)
- An environment (`@deployment.env`)
- A version identifier

### Version for CI Based providers
For CI-based providers, Datadog uses the `--revision` parameter that you pass to the `datadog ci` command. This parameter should contain the version identifier for your deployment (such as a commit SHA, image tag, or version number).

### Version for ArgoCD
For ArgoCD deployments, Datadog uses the `revision` value to detect rollbacks. Note that when using ArgoCD's revert functionality, a new revision is created, which means Datadog won't detect it as a rollback. To properly track rollbacks in Datadog with ArgoCD, you need to redeploy using an older revision.

We are working with the ArgoCD team to improve this mechanism. You can track the progress in [this GitHub issue](https://github.com/argoproj/argo-cd/issues/20896).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/deployments/executions
