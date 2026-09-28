---
title: Bits Release
description: "Learn how Bits Release validates your pull requests in production after deployment and reports whether the change behaved as intended."
private: true
further_reading:
  - link: "https://www.datadoghq.com/blog/bits-release/"
    tag: "Blog"
    text: "Validate every release in production with Bits Release"
  - link: "/bits_ai/bits_code/"
    tag: "Documentation"
    text: "Automate code fixes with Bits Code"
  - link: "/tracing/trace_collection/"
    tag: "Documentation"
    text: "Instrument your services with APM"
  - link: "/integrations/github/"
    tag: "Documentation"
    text: "Set up the GitHub integration"
---

<div class="alert alert-info">Bits Release is in private preview and available to selected design partners only. Contact your Datadog representative to request access.</div>

## Overview

Merging and deploying a change is not the same as knowing it worked. Most teams confirm a release by watching a dashboard for a few minutes, or by waiting for an alert that may never fire for the specific behavior they changed.

Bits Release closes that gap. After you merge a pull request, Bits Release reads the code change, determines what should be different in production, and waits for the change to deploy. It then watches production telemetry for the affected service and reports a verdict on the pull request: the change behaved as intended, it did not, or there was not enough signal to tell.

Each verdict comes with the evidence behind it—the metrics, traces, logs, and synthetic results used to reach the conclusion—so you can act on it without reconstructing the investigation yourself.

## How it works

1. **Trigger**: A pull request merges to the default branch of an onboarded repository.
2. **Impact analysis**: Bits Release reads the diff and queries production data for the affected service to determine the change type, the risk level, and the files and entry points involved.
3. **Validation plan**: It builds a plan of checks describing the behavior expected after the change ships. Checks are backed by monitors and synthetic tests, or evaluated directly against production telemetry. Bits Release verifies that each metric a check depends on exists before adding the check to the plan.
4. **Deploy detection**: The plan stays pending until Bits Release confirms your commit is running in production. It watches deployment events, service telemetry, and served application versions to make that determination.
5. **Evaluation**: After deployment, Bits Release evaluates the plan over a soak window, comparing post-deploy behavior to the pre-deploy baseline it captured.
6. **Verdict**: It combines the results of every check into a single verdict, weighing the full context rather than failing on any one signal. Temporary monitors and synthetic tests created for the validation are removed when the validation ends.

Validation runs against your production environment. A plan that never sees its commit deployed closes without a verdict.

## Verdicts

| Verdict | Meaning |
| ------- | ------- |
| **Passed** | The change shipped and production behavior matched the expected impact, with no unexpected side effects in the affected service. |
| **Failed** | Production behavior contradicted the expected impact, or the change introduced a regression. The verdict names the failing behavior and points to the evidence. |
| **Not enough data** | Bits Release could not prove the expected change materialized—for example, the affected code path saw too little traffic during the soak window. Use this signal to decide what to verify manually. |

A **Failed** verdict describes what production is doing, not which line of code to change. Where relevant, Bits Release links to [Bits Code][1] to investigate the failure and generate a fix.

## Prerequisites

Bits Release needs to connect a merged pull request to a running service. Before onboarding, confirm the following for each repository and service in scope:

| Requirement | Why it is needed |
| ----------- | ---------------- |
| [GitHub integration][2] configured for the repositories in scope | Receives merge events and posts plan and verdict comments back on the pull request. |
| [APM][3] enabled on the services in scope, or service ownership metadata present | Resolves which service a code change belongs to. |
| `git.commit.sha` reported in APM traces, or the commit SHA present in the service `version` tag | Confirms your merged commit is the code running in production. Without it, deploy detection cannot complete and plans close without a verdict. |
| Deployment events or version changes visible in Datadog for the service | Establishes when the change went live and where the soak window starts. |
| A `service.datadog.yaml` file for frontend-only services | Supplies the code-to-service mapping for services that do not emit APM traces. |

Frequent deploys produce results faster. A service that deploys once every few weeks holds its plans pending until the next release.

## Where results appear

- **Pull request comments**: Bits Release posts a comment with the validation plan after analysis, then a separate comment with the verdict after evaluation completes, so the verdict generates a fresh notification for the author.
- **Slack**: The pull request author is notified when a verdict is ready, if your organization has the [Slack integration][4] configured.
- **Bits Release in Datadog**: Go to [**Software Delivery > Bits Release**][5] for the full investigation surface—the list of validations, the lifecycle timeline for each plan, the verdict and its reasoning, checks grouped by impact, and metric charts annotated with the deploy marker.

## Trigger a validation manually

To validate a pull request that merged before your repository was onboarded, or to re-run a validation, comment on the merged pull request:

```text
@Datadog/release-agent:run
```

To override the service or environment Bits Release resolved, pass them inline:

```text
@Datadog/release-agent:run service=my-service env=production
```

## Permissions

Access to Bits Release is controlled by two permissions:

| Permission | Grants |
| ---------- | ------ |
| `release_agent_read` | View validation plans, checks, verdicts, and evidence. |
| `release_agent_feedback_write` | Submit feedback on a verdict. |

Both permissions are granted to the Datadog Standard and Datadog Studio Admin roles by default. If your organization uses custom roles, a Datadog Admin adds the permissions to those roles in [**Organization Settings > Roles**][6].

## Limitations

During private preview:

- Validation is supported for backend services and web frontends. Mobile applications, SDKs, and libraries are not supported.
- Validation runs against production only. Staging and pre-production environments are not supported.
- Only repositories explicitly onboarded by Datadog are analyzed.
- Evidence presentation is incomplete for some check types.
- Each pull request is validated on its own. Related pull requests are not grouped into a single validation.

## Send feedback

Verdict quality improves with feedback. On any plan in [Bits Release][5], use the feedback controls to mark whether the verdict was correct and add a short reason. For onboarding help or questions during the preview, contact your Datadog representative.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_code/
[2]: /integrations/github/
[3]: /tracing/trace_collection/
[4]: /integrations/slack/
[5]: https://app.datadoghq.com/ci/bits-release
[6]: https://app.datadoghq.com/organization-settings/roles
