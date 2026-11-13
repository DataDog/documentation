---
title: Bits Code Review
description: "Learn how Bits Code Review checks your pull requests against production telemetry before you merge, and posts its findings as review comments."
further_reading:
  - link: "/bits_release/"
    tag: "Documentation"
    text: "Validate merged changes in production with Bits Release"
  - link: "/bits_ai/bits_code/"
    tag: "Documentation"
    text: "Automate code fixes with Bits Code"
  - link: "/integrations/github/"
    tag: "Documentation"
    text: "Set up the Datadog GitHub App"
  - link: "/tracing/live_debugger/"
    tag: "Documentation"
    text: "Capture runtime data with Live Debugger"
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
  Bits Code Review is in Preview. To request access, contact your Datadog Customer Success Manager.
{{< /callout >}}

Bits Code Review is an AI agent that catches risky changes before they reach production. It reviews your pull requests against how your services behave in production, and posts its findings directly on the pull request, before you merge.

Most AI code reviewers only see the diff and the repository, so they have to guess how a change behaves at runtime. Bits Code Review replaces those guesses with evidence from the traces, logs, metrics, RUM events, and Live Debugger captures you already send to Datadog. It flags the issues a diff alone can't reveal, such as a change that:

- Removes an endpoint that still serves production traffic
- Relies on an incorrect assumption about runtime behavior
- Attempts to fix a production issue that the code alone can't explain

There's no new instrumentation to set up: Bits Code Review works with the telemetry your services already send.

Bits Code Review is non-blocking. Its review is not a required check, and merging and deploying remain your decision.

**Note**: During the Preview, usage is capped per organization each week, including on-demand reviews. After your organization reaches the cap, Bits Code Review skips pull requests without posting a comment.

## How it works

1. **Detect the pull request**: Bits Code Review reviews a pull request in a repository in scope when the pull request is opened or marked ready for review. It reviews it again when you push new commits or change its base branch. Draft pull requests are not reviewed automatically.
2. **Analyze the change**: It reads the code change, your custom instructions, and the production telemetry for the services the change affects.
3. **Post the review**: Bits Code Review publishes a review on the pull request, with a summary verdict and inline comments anchored to the relevant lines. When a finding's lines are part of the diff, the finding can include a GitHub suggestion you can apply directly.

Bits Code Review does not post a comment every time it runs. It posts nothing when it skips the pull request, when a re-review finds nothing new and reaches the same verdict, or when the pull request is closed.

### Data sources

Bits Code Review uses core Datadog telemetry, such as [APM][1] traces, [logs][2], [metrics][3], and [RUM][4] events. It adapts to what each service has enabled.

Coverage follows your instrumentation. For the most detailed inputs, enable [Live Debugger][5] on the services you work in. Live Debugger captures require a tracer that supports Dynamic Instrumentation. For supported versions, see the [Live Debugger requirements][7]. During the Preview, Live Debugger captures are available only for services that Datadog has enabled.

Reviews of public repositories never use production data. Bits Code Review reviews them from the code alone.

## Prerequisites

Bits Code Review supports only GitHub repositories. Repositories hosted on GitLab, Azure DevOps, or Bitbucket are not supported.

| Requirement | Why it is needed |
| ----------- | ---------------- |
| The Datadog [GitHub App][6] installed on the repositories in scope, with `Contents: Read`, `Issues: Read & Write`, and `Pull Requests: Read & Write` | `Contents: Read` lets Bits Code Review read the code change. Write access lets it post the review and inline comments. It also lets it add status reactions to the pull request and to `@datadog review` comments: 👀 while it works, then 👍 when it finishes. |
| The `pull_request` and `issue_comment` webhook events | `pull_request` tells Bits Code Review when a pull request is opened or updated. `issue_comment` lets it detect `@datadog review` comments. |

Your GitHub App must meet the requirements of the following Datadog features in the [GitHub integration][8]:

- {{< ui >}}Read Repository Contents{{< /ui >}}
- {{< ui >}}Pull Request Information{{< /ui >}}
- {{< ui >}}Pull Request Comments{{< /ui >}}
- {{< ui >}}Bits Code: Monitor CI Status{{< /ui >}}, if you want to use `@datadog review`. This feature sends pull request comments to Datadog, which Bits Code Review needs to detect the command.

## Request a review on demand

To request a review of a single pull request, comment `@datadog review` on the pull request. Bits Code Review reviews the pull request and posts its findings as comments.

## Give custom instructions

Bits Code Review takes into account the global custom instructions you define for Bits Code. To set them, go to {{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}General{{< /ui >}}][9] and use the {{< ui >}}Global Agent Instructions{{< /ui >}} section.

Use these instructions to describe your review conventions, such as architecture rules, patterns to flag, or areas to ignore. Global agent instructions also apply to your other Bits Code sessions.

## Give feedback on reviews

React to a Bits Code Review comment with 👍 or 👎, or reply to it, to share whether a finding was useful. Bits Code Review does not post anything to your pull request in response to your feedback.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/
[2]: /logs/
[3]: /metrics/
[4]: /real_user_monitoring/
[5]: /tracing/live_debugger/
[6]: /integrations/github/
[7]: /tracing/live_debugger/#requirements
[8]: /integrations/github/#update-an-existing-github-app
[9]: https://app.datadoghq.com/code/settings
