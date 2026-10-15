---
title: Bits Release
description: "Learn how Bits Release validates your pull requests in production after deployment and reports whether the change behaved as intended."
further_reading:
  - link: "https://www.datadoghq.com/blog/bits-release/"
    tag: "Blog"
    text: "Validate every release in production with Bits Release"
  - link: "/bits_ai/bits_code/"
    tag: "Documentation"
    text: "Automate code fixes with Bits Code"
  - link: "/integrations/github/"
    tag: "Documentation"
    text: "Set up the Datadog GitHub App"
  - link: "/source_code/service-mapping/"
    tag: "Documentation"
    text: "Link your services to source code with service mapping"
---

{{< callout url="https://www.datadoghq.com/product-preview/bits-release/" >}}
  Bits Release is in Preview. Click {{< ui >}}Request Access{{< /ui >}} to join the Preview program.
{{< /callout >}}

## Overview

Bits Release validates that a merged pull request behaves as intended in production. It learns what your change was meant to do, watches the service once that change is live, and reports a verdict on the pull request itself.

Standard release checks rarely cover the specific behavior a change targets. A dashboard watched for a few minutes shows the service is up, and an alert may never fire for the thing you changed, so a change that shipped broken, or shipped with no effect at all, can go unnoticed for days. Bits Release checks that behavior directly, on every merge.

Bits Release does not modify your code or add permanent instrumentation. It reads the observability data you already send to Datadog. When a check must run over time, it creates temporary resources and removes them when validation ends.

{{< img src="bits_release/bits_release_demo.mp4" alt="Video walking through a Bits Release validation: a merged pull request is deployed to production, validation starts, and a verdict arrives with the evidence behind it" video="true" style="width:100%;" >}}

## How Bits Release works

1. **Detect the merge**: Bits Release picks up a pull request when it merges to the default branch of a repository in scope.
2. **Analyze the change**: It reads the code change alongside your production data to work out what the change is for: the effect it should have in production once it ships (expected impact), and the behavior it should leave untouched (expected regression risk).
3. **Wait for deployment**: Validation waits until Bits Release confirms your pull request is running in production.
4. **Evaluate production**: Bits Release measures production against what it expected until it reaches a verdict. It then delivers the verdict as a pull request comment, a Slack notification, and a full report in Datadog.

Validation runs against your production environment.

### Data sources for Bits Release

Bits Release does not require a dedicated data source. It validates your change with the core Datadog telemetry your services already send, primarily [logs][3] and [APM][4] traces for backend services and [RUM][5] for web frontends, and it adapts to what each service has enabled.

Coverage follows your instrumentation. A backend change on a service with APM and logs gets stronger evidence than a frontend change on an application without RUM.

## Verdicts

A validation ends in one of four verdicts. **Passed** and **Failed** are conclusions about your change. **Not enough data** and **Inconclusive** mean Bits Release could not reach one, and need your attention.

| Verdict | Meaning |
| ------- | ------- |
| **Passed** | Your service is healthy after the deploy. If your change was expected to make something happen, Bits Release also saw at least one of those things happen. A healthy service on its own is not enough to pass a change that was supposed to have a visible effect. For a change with nothing specific to look for, a healthy service is enough. |
| **Failed** | Bits Release has clear evidence that something is wrong: your change caused a regression, or the changed code ran and the effect you wanted is missing or went the wrong way. For example, the bug you fixed still happens, the latency or error rate you meant to improve did not improve, or a new feature is throwing errors. |
| **Not enough data** | Production did not give Bits Release enough to judge. Either no relevant telemetry arrived, or too few requests reached the changed code to draw a conclusion. This also covers a healthy service where nothing confirmed the expected effect, for example because your change shipped during quiet hours, sits behind a feature flag that is still off, or serves a path that saw no traffic while Bits Release was watching. |
| **Inconclusive** | There was enough data, but it points in different directions, or it cannot be confidently pinned on your change rather than on something else happening at the same time. |

While a validation is running, it shows as **In Progress**. It shows as **Pending** when Bits Release already has a provisional answer but is holding it back, because the watch window is still short or a signal it needs has not arrived. In both cases it keeps watching and reports when it has more.

Bits Release reports how production behaves after a change. It does not identify the code to fix. Use the context it gathered while validating (the expected impact, the evidence behind the verdict, and the telemetry it read) as the starting point for a fix. Hand the verdict to [Bits Code][1] to investigate and open a pull request, or use that context in your own AI coding tools.

## Prerequisites

Bits Release needs to read the code you merged, and to recognize the moment that code is live in production. **Bits Release supports GitHub only.** Repositories hosted on GitLab, Azure DevOps, or Bitbucket cannot be validated.

### Required

| Requirement | Why it is needed |
| ----------- | ---------------- |
| The Datadog [GitHub App][2] installed on the repositories in scope, with `Contents: Read` and `Pull Requests: Write` | `Contents: Read` lets Bits Release read the code change it is validating. `Pull Requests: Write` lets it post the plan and the verdict back on the pull request, which is where most developers see the result. |
| A `version` tag on the services in scope | Identifies each deployment, so Bits Release can tell when a new one happens. Services report it with their [APM][4] or [RUM][5] telemetry. |
| The deployed commit SHA on every deployment | Links a deployment back to the code you merged, which is what starts validation. Report it either as a `git.commit.sha` tag on the service's telemetry, or as the SHA carried inside the `version` tag. See [service mapping][8] to set this up. |

### Recommended

| Requirement | What it adds |
| ----------- | ------------ |
| [Slack integration][6] | Notifies the pull request author directly when a verdict is ready, instead of relying on them seeing the pull request comment. |
| An existing [synthetic test][7] on the same domain | Lets Bits Release validate a change by actively calling your application rather than waiting for organic traffic. It reuses the entry point and sign-in method your existing test already establishes. |

## Where results appear

- **Pull request comments**: Bits Release posts the validation plan after analysis, then a separate comment with the verdict after evaluation completes, so the verdict generates a fresh notification for the author.
- **Slack**: The pull request author is notified when a verdict is ready.
- **Bits Release in Datadog**: The Bits Release page holds the full report: the list of validations, the lifecycle timeline for each plan, the verdict and its reasoning, expected impacts with the evidence behind each one, and metric charts annotated with the deploy marker. During the preview, reach it from the link in your pull request comment. It is not in the Datadog side navigation yet.

## Billing

Bits Release is free during the Preview. It does not consume [AI Credits][9], and any temporary resources it creates while validating a change are not billed.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_code/
[2]: /integrations/github/
[3]: /logs/
[4]: /tracing/trace_collection/
[5]: /real_user_monitoring/
[6]: /integrations/slack/
[7]: /synthetics/
[8]: /source_code/service-mapping/
[9]: /account_management/billing/ai_credits/
