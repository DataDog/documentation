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

{{< callout url="https://www.datadoghq.com/product-preview/bits-release/" >}}
  Bits Release is in Preview. Request access to join the waiting list.
{{< /callout >}}

## Overview

Merging and deploying a change is not the same as knowing it worked. Most teams confirm a release by watching a dashboard for a few minutes, or by waiting for an alert that may never fire for the specific behavior they changed. Problems that monitors do not cover surface days later, through a support ticket or a colleague.

Bits Release closes that gap. After you merge a pull request, it reads the code change, decides what should be different in production, waits for the change to deploy, and then examines your production telemetry to report a verdict on the pull request.

Bits Release does not modify your code, and it does not create permanent instrumentation or long-lived monitors. It reads the observability data you already send to Datadog, creates temporary artifacts when a check needs to run over time, and removes them when the validation ends.

{{< img src="bits_release/bits_release_validation_timeline.png" alt="The Bits Release page for a merged pull request, showing a four-step timeline: pull request merged, deployed to production, validation started, and a passed verdict with the synthetic check and RUM error rate evidence behind it" style="width:100%;" >}}

## How it works

1. **Trigger**: A pull request merges to the default branch of a repository in scope.
2. **Impact analysis**: Bits Release reads the diff and queries production data for the affected service to determine the change type, the risk level, and the code paths involved.
3. **Validation plan**: It produces a plan describing the expected impact of the change. Each item states either that a behavior must move, or that a behavior must stay stable. Items are labeled as an expected impact or an expected regression risk, so you can see what the change is supposed to do separately from what it might break.
4. **Deploy detection**: The plan stays pending until Bits Release confirms your pull request is running in production.
5. **Evaluation**: After deployment, Bits Release evaluates the plan over a soak window, the period it watches production once your change is live, comparing post-deploy behavior to the pre-deploy baseline it captured.
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
| **Events and change tracking** | Deployment events, which establish when the change went live and where the soak window starts. |
| **Change stories, dashboards, and incidents** | Context about what else changed around the same time, to help separate the effect of your change from unrelated activity. |
| **[Bits Testing][9]** | Active validation by calling the modified endpoint or exercising the modified flow, rather than waiting for organic traffic. |

A source Bits Release cannot read is a source it cannot validate against. A backend change on a service with APM and logs gets stronger evidence than a frontend change on an application without RUM.

## Verdicts

A validation ends in one of four verdicts. **Passed** and **Failed** are conclusions about your change. **Not enough data** and **Inconclusive** mean Bits Release could not reach one, so the change is worth a look of your own.

| Verdict | Meaning |
| ------- | ------- |
| **Passed** | Your service is healthy after the deploy. If the plan expected your change to make something happen, Bits Release also saw at least one of those things happen. A healthy service on its own is not enough to pass a change that was supposed to have a visible effect. For a change with nothing specific to look for, a healthy service is enough. |
| **Failed** | Bits Release has clear evidence that something is wrong: your change caused a regression, or the changed code ran and the effect you wanted is missing or went the wrong way. For example, the bug you fixed still happens, the latency or error rate you meant to improve did not improve, or a new feature is throwing errors. |
| **Not enough data** | Production did not give Bits Release enough to judge. Either no relevant telemetry arrived, or too few requests reached the changed code to draw a conclusion. This also covers a healthy service where nothing confirmed the expected effect, for example because your change shipped during quiet hours, sits behind a feature flag that is still off, or serves a path that saw no traffic while Bits Release was watching. |
| **Inconclusive** | There was enough data, but it points in different directions, or it cannot be confidently pinned on your change rather than on something else happening at the same time. |

While a validation is running, it shows as **In Progress**. It shows as **Pending** when Bits Release already has a provisional answer but is holding it back, because the watch window is still short or a signal it needs has not arrived. In both cases it keeps watching and reports when it has more.

Bits Release reports what production is doing, not which line to change. From there, the context it gathered while validating (the expected impact, the evidence behind the verdict, and the telemetry it read) becomes the starting point for a fix. Hand the verdict to [Bits Code][1] to investigate and open a pull request, or take that context into your own AI coding tools and work the fix wherever you already do.

## Prerequisites

Bits Release needs to read the code you merged, and to recognize the moment that code is live in production.

### Required

| Requirement | Why it is needed |
| ----------- | ---------------- |
| [Source Code Integration][2] on the repositories in scope | Lets Bits Release read the code change it is validating. Grant write access to pull requests as well, so it can post plans and verdicts back on the pull request. |
| A `version` tag on the services in scope | Identifies each deployment, so Bits Release can tell when a new one happens. Services report it with their [APM][3] or [RUM][4] telemetry. |
| The deployed commit SHA on every deployment | Links a deployment back to the code you merged, which is what starts validation. Report it either as a `git.commit.sha` tag on the service's telemetry, or as the SHA carried inside the `version` tag. See [service mapping][7] to set this up. |

### Recommended

| Requirement | What it adds |
| ----------- | ------------ |
| [Slack integration][5] | Notifies the pull request author directly when a verdict is ready, instead of relying on them seeing the pull request comment. |
| An existing [synthetic test][6] on the same domain | Lets Bits Release validate a change by actively calling your application rather than waiting for organic traffic. It reuses the entry point and sign-in method your existing test already establishes. |

## Where results appear

- **Pull request comments**: Bits Release posts the validation plan after analysis, then a separate comment with the verdict after evaluation completes, so the verdict generates a fresh notification for the author.
- **Slack**: The pull request author is notified when a verdict is ready.
- **Bits Release in Datadog**: The Bits Release page holds the full report: the list of validations, the lifecycle timeline for each plan, the verdict and its reasoning, expected impacts with the evidence behind each one, and metric charts annotated with the deploy marker. During the preview, reach it from the link in your pull request comment. It is not in the Datadog side navigation yet.

## Billing

Bits Release is free during the private preview. It does not consume [AI Credits][8], and the temporary monitors and synthetic tests it creates while validating a change are not billed as Synthetic Monitoring or monitor usage.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_code/
[2]: /source_code/
[3]: /tracing/trace_collection/
[4]: /real_user_monitoring/
[5]: /integrations/slack/
[6]: /synthetics/
[7]: /source_code/service-mapping/
[8]: /account_management/billing/ai_credits/
[9]: /synthetics/bits_testing/
