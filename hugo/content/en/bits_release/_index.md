---
title: Bits Release
description: "Learn how Bits Release validates your pull requests in production after deployment and reports whether the change behaved as intended."
private: true
is_beta: true
further_reading:
  - link: "https://www.datadoghq.com/blog/bits-release/"
    tag: "Blog"
    text: "Validate every release in production with Bits Release"
  - link: "/bits_ai/bits_code/"
    tag: "Documentation"
    text: "Automate code fixes with Bits Code"
  - link: "/source_code/"
    tag: "Documentation"
    text: "Connect your source code with Source Code Integration"
  - link: "/source_code/service-mapping/"
    tag: "Documentation"
    text: "Link your services to source code with service mapping"
---

<div class="alert alert-info">Bits Release is in private preview and available to selected design partners only. Contact your Datadog representative to request access.</div>

## Overview

Merging and deploying a change is not the same as knowing it worked. Most teams confirm a release by watching a dashboard for a few minutes, or by waiting for an alert that may never fire for the specific behavior they changed. Problems that monitors do not cover surface days later, through a support ticket or a colleague.

Bits Release closes that gap. After you merge a pull request, it reads the code change, decides what should be different in production, waits for the change to deploy, and then examines your production telemetry to report a verdict on the pull request.

Bits Release does not modify your code, and it does not create permanent instrumentation or long-lived monitors. It reads the observability data you already send to Datadog, creates temporary artifacts when a check needs to run over time, and removes them when the validation ends.

## How it works

1. **Trigger**: A pull request merges to the default branch of an onboarded repository.
2. **Impact analysis**: Bits Release reads the diff and queries production data for the affected service to determine the change type, the risk level, and the code paths involved.
3. **Validation plan**: It produces a plan describing the expected impact of the change. Each item states either that a behavior must move, or that a behavior must stay stable. Items are labeled as an expected impact or an expected regression risk, so you can see what the change is supposed to do separately from what it might break.
4. **Deploy detection**: The plan stays pending until Bits Release confirms your commit is running in production. It selects the service to watch and, on each deployment, checks whether your commit is an ancestor of what the service is running.
5. **Evaluation**: After deployment, Bits Release evaluates the plan over a soak window, comparing post-deploy behavior to the pre-deploy baseline it captured.
6. **Verdict**: It weighs the evidence from every source into a single verdict, delivered as a pull request comment, a Slack notification, and a full report in Datadog.

Validation runs against your production environment. Bits Release does not comment on every pull request. It reports when it reaches a meaningful conclusion or finds a real problem.

## What Bits Release looks at

Bits Release does not require a dedicated data source. It reads the Datadog products you already have enabled and adapts to what is available for each service. In practice, **logs and APM traces carry most validations**, with the other sources adding coverage depending on the change.

| Source | How it is used |
| ------ | -------------- |
| **APM traces and spans** | Error rates, latency, and throughput on the endpoints and services the change touches. Also supplies the commit SHA used for deploy detection. |
| **Logs** | Error messages, exceptions, and log-based evidence for behavior the change was meant to alter or preserve. |
| **Metrics and monitors** | Baseline-versus-post-deploy comparison. Bits Release can create a temporary monitor when a check needs to watch for a rare regression over days rather than minutes, and removes it afterward. |
| **RUM** | Frontend validation: errors, views, and user actions on the pages affected by the change. |
| **Synthetic tests** | Active validation by calling the modified endpoint or exercising the modified flow, rather than waiting for organic traffic. |
| **Events and change tracking** | Deployment events, which establish when the change went live and where the soak window starts. |
| **Change stories, dashboards, and incidents** | Context about what else changed around the same time, to help separate the effect of your change from unrelated activity. |
| **Live Debugger** | *Coming soon.* Temporary production instrumentation that reports when a specific code path actually executes. This is useful for code behind a condition or a feature flag, where telemetry alone cannot tell you whether the new path ran. |

A source Bits Release cannot read is a source it cannot validate against. A backend change on a service with APM and logs gets stronger evidence than a frontend change on an application without RUM.

### What it does not do

- It does not run in CI or touch your test suites. Validation happens after merge, in parallel with your existing pipeline.
- It does not replace A/B testing. Bits Release compares production before and after your change, not two concurrent cohorts.
- It does not take over long-term monitoring. Temporary monitors it creates are a means of watching during a validation, not coverage your team inherits.

## Verdicts

| Verdict | Meaning |
| ------- | ------- |
| **Passed** | The change shipped and production behavior matched the expected impact, with no unexpected side effects on the service being watched. |
| **Warning** | A potential problem. Bits Release found a signal worth your attention but could not confirm it. |
| **Failed** | A clear problem. Production behavior contradicted the expected impact. |
| **Not enough data** | The expected change could not be proven either way. For example, the affected code path saw too little traffic during the soak window. Use this signal to decide what to verify by hand. |
| **Inconclusive** | Validation did not complete. The most common cause is that the commit was never detected as deployed. |

**A failed verdict does not always mean your change broke something.** It also covers the case where a change was supposed to fix a problem and the problem is still there: you are no worse off, but you are not better off either. Bits Release reports what production is doing, not which line to change. Where relevant, it links to [Bits Code][1] to investigate and generate a fix.

## Prerequisites

Bits Release needs to connect a merged pull request to a running service.

### Required

| Requirement | Why it is needed |
| ----------- | ---------------- |
| [Source Code Integration][2] with read access to the repositories in scope | Reads the diff for the merged pull request. Write access to pull requests is strongly recommended. Without it, Bits Release loses the pull request comment as a notification surface. |
| [APM][3] or [RUM][4] reporting a version tag on the services in scope | Detects deployments. Either the version tag contains the commit SHA, or the commit is attached to traces as `git.commit.sha`. Without this link, the validation closes without a verdict. |
| A code-to-service mapping | Resolves which service a code change belongs to, from service metadata or from [service mapping][9]. |

### Recommended

| Requirement | What it adds |
| ----------- | ------------ |
| [Slack integration][5] | Push notification to the pull request author when a verdict is ready. |
| An existing [synthetic test][6] on the same domain | Lets Bits Release create synthetic validation for the change. It reuses the URL and authentication method from your existing test. Without one, it has no reliable way to reach and authenticate against your application. |
| Frequent deploys | A service that ships daily produces verdicts within hours. A service that ships every few weeks holds its plans pending until the next release. |

Complex deployment setups are hard to assess in advance. Datadog's recommendation is to enable Bits Release on a few repositories and review what deploy detection resolves, rather than trying to qualify the setup up front.

## Where results appear

- **Pull request comments**: Bits Release posts the validation plan after analysis, then a separate comment with the verdict after evaluation completes, so the verdict generates a fresh notification for the author.
- **Slack**: The pull request author is notified when a verdict is ready.
- **Bits Release in Datadog**: Go to [**Software Delivery > Bits Release**][7] for the full report: the list of validations, the lifecycle timeline for each plan, the verdict and its reasoning, expected impacts with the evidence behind each one, and metric charts annotated with the deploy marker.

## Trigger a validation manually

To validate a pull request that merged before your repository was onboarded, or to re-run a validation, comment on the merged pull request:

```text
@Datadog/release-agent:run
```

To override the service or environment that Bits Release resolved, pass them inline:

```text
@Datadog/release-agent:run service=my-service env=production
```

## Permissions

Access to Bits Release is controlled by two permissions:

| Permission | Grants |
| ---------- | ------ |
| `release_agent_read` | View validation plans, expected impacts, verdicts, and evidence. |
| `release_agent_feedback_write` | Submit feedback on a verdict. |

Both are granted to the Datadog Standard and Datadog Studio Admin roles by default. If your organization uses custom roles, a Datadog Admin adds the permissions to those roles in [**Organization Settings > Roles**][8].

## Limitations

During private preview:

- Validation runs against production only. Staging and pre-production environments are not supported.
- Validation covers backend services and web frontends. Mobile applications, SDKs, and libraries are not supported.
- Only repositories explicitly onboarded by Datadog are analyzed.
- **One service per pull request.** Bits Release selects a single service to watch, so a change to a shared library is validated against one of its consumers rather than all of them.
- Each pull request is validated on its own. Related pull requests are not grouped into one validation.
- Changes gated behind a feature flag are validated on deployment, not on flag activation, so a change that is still switched off reports little or no signal.
- Progressive rollouts are compared before-and-after across the whole service, not scoped to the slice running the new version.
- Evidence presentation is incomplete for some result types.

## Send feedback

Verdict quality depends on feedback, and the preview is the moment when it has the most effect. On any plan in [Bits Release][7], mark whether the verdict was correct and add a short reason. Cases where Bits Release reported nothing and a real problem existed are the most valuable to report. For onboarding help or questions during the preview, contact your Datadog representative.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_code/
[2]: /source_code/
[3]: /tracing/trace_collection/
[4]: /real_user_monitoring/
[5]: /integrations/slack/
[6]: /synthetics/
[7]: https://app.datadoghq.com/ci/bits-release
[8]: https://app.datadoghq.com/organization-settings/roles
[9]: /source_code/service-mapping/
