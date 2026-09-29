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

{{< callout url="#" btn_hidden="true" header="false" >}}
  Bits Release is in private preview and available to selected design partners only. Contact your Datadog representative to request access.
{{< /callout >}}

## Overview

Merging and deploying a change is not the same as knowing it worked. Most teams confirm a release by watching a dashboard for a few minutes, or by waiting for an alert that may never fire for the specific behavior they changed. Problems that monitors do not cover surface days later, through a support ticket or a colleague.

Bits Release closes that gap. After you merge a pull request, it reads the code change, decides what should be different in production, waits for the change to deploy, and then examines your production telemetry to report a verdict on the pull request.

Bits Release does not modify your code, and it does not create permanent instrumentation or long-lived monitors. It reads the observability data you already send to Datadog, creates temporary artifacts when a check needs to run over time, and removes them when the validation ends.

## How it works

1. **Trigger**: A pull request merges to the default branch of an onboarded repository.
2. **Impact analysis**: Bits Release reads the diff and queries production data for the affected service to determine the change type, the risk level, and the code paths involved.
3. **Validation plan**: It produces a plan describing the expected impact of the change. Each item states either that a behavior must move, or that a behavior must stay stable. Items are labeled as an expected impact or an expected regression risk, so you can see what the change is supposed to do separately from what it might break.
4. **Deploy detection**: The plan stays pending until Bits Release confirms your pull request is running in production.
5. **Evaluation**: After deployment, Bits Release evaluates the plan over a soak window, comparing post-deploy behavior to the pre-deploy baseline it captured.
6. **Verdict**: It weighs the evidence from every source into a single verdict, delivered as a pull request comment, a Slack notification, and a full report in Datadog.

Validation runs against your production environment.

### What Bits Release looks at

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

## Verdicts

| Verdict | Meaning |
| ------- | ------- |
| **Passed** | The change shipped and production behavior matched the expected impact, with no unexpected side effects on the service being watched. |
| **Warning** | A potential problem. Bits Release found a signal worth your attention but could not confirm it. |
| **Failed** | A clear problem. Production behavior contradicted the expected impact. |
| **Not enough data** | The expected change could not be proven either way. For example, the affected code path saw too little traffic during the soak window. |
| **Inconclusive** | Bits Release could not reach a verdict. Either the signals it collected contradicted each other, so no conclusion was supported, or validation did not complete, most commonly because the commit was never detected as deployed. |

**A failed verdict does not always mean your change broke something.** It also covers the case where a change was supposed to fix a problem and the problem is still there: you are no worse off, but you are not better off either. Bits Release reports what production is doing, not which line to change. From there, the context it gathered while validating (the expected impact, the evidence behind the verdict, and the telemetry it read) becomes the starting point for a fix. Hand the verdict to [Bits Code][1] to investigate and open a pull request, or take that context into your own AI coding tools and work the fix wherever you already do.

## Preview scope and fit

Bits Release works by comparing a service's production behavior before and after your change reaches production. Teams whose delivery model matches that comparison get the clearest verdicts during the preview. You are a strong fit if most of the following describe your services:

- **You deploy straight to production.** Your changes go live for all traffic at once, rather than through a canary or a progressive rollout. A rollout that reaches a fraction of traffic dilutes the before-and-after comparison, because the service is serving both versions at the same time.
- **Few of your changes are gated behind feature flags.** Bits Release validates a change when it deploys, not when a flag turns it on, so code that ships switched off produces little signal.
- **Your services are backend services or web frontends.** Mobile applications, SDKs, and libraries are not yet supported.
- **You want validation after deploy, not a gate before merge.** Bits Release reports on what production did with your change. It does not block a merge or a release.

A setup that differs on one of these points still works, with weaker verdicts on the changes it affects. If your delivery model differs on most of them, the preview is likely to produce more inconclusive results than useful ones.

## Prerequisites

Everything Bits Release does depends on one link: knowing which running service your merged code became, and when it got there. The requirements below establish that link.

### Required

| Requirement | Why it is needed |
| ----------- | ---------------- |
| [Source Code Integration][2] on the repositories in scope | Lets Bits Release read the code change it is validating. Grant write access to pull requests as well, so it can post plans and verdicts back on the pull request. |
| [Code-to-service mapping][8] for the services in scope | Tells Bits Release which service a repository's code runs as. A pull request is a change to a repository, while telemetry belongs to a service, and the two are not the same thing: one repository can produce several services, and a monorepo produces many. Without this mapping, Bits Release cannot tell which service's behavior to examine. |
| A version identifying the deployed code | Tells Bits Release when your change reaches production, which is when validation starts. Your services report a version with their [APM][3] or [RUM][4] telemetry, and that version has to be traceable back to the commit it was built from. |

### Recommended

| Requirement | What it adds |
| ----------- | ------------ |
| [Slack integration][5] | Notifies the pull request author directly when a verdict is ready, instead of relying on them seeing the pull request comment. |
| An existing [synthetic test][6] on the same domain | Lets Bits Release validate a change by actively calling your application rather than waiting for organic traffic. It reuses the entry point and sign-in method your existing test already establishes. |

## Where results appear

- **Pull request comments**: Bits Release posts the validation plan after analysis, then a separate comment with the verdict after evaluation completes, so the verdict generates a fresh notification for the author.
- **Slack**: The pull request author is notified when a verdict is ready.
- **Bits Release in Datadog**: The [Bits Release page][7] holds the full report: the list of validations, the lifecycle timeline for each plan, the verdict and its reasoning, expected impacts with the evidence behind each one, and metric charts annotated with the deploy marker. During the preview, reach it through this link or the link in your pull request comment. It is not in the Datadog side navigation yet.

## Billing

Bits Release is free during the private preview. It does not consume [AI Credits][9], and the temporary monitors and synthetic tests it creates while validating a change are not billed as Synthetic Monitoring or monitor usage.

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
[8]: /source_code/service-mapping/
[9]: /account_management/billing/ai_credits/
