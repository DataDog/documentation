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

Bits Code Review is an AI agent that reviews your pull requests using your production data. It posts its findings as comments on the pull request before you merge.

Conventional AI reviewers infer how a change behaves from the diff and the repository alone. Bits Code Review checks those assumptions against how your services run in production. It uses the traces, logs, metrics, RUM events, and Live Debugger captures you already send to Datadog. This lets it flag issues that the diff alone does not reveal. For example, a change removes an endpoint that still serves production traffic, or relies on an incorrect assumption about runtime behavior.

Bits Code Review is non-blocking. Its review is not a required check, and merging and deploying remain your decision.

## How it works

1. **Detect the pull request**: Bits Code Review picks up a pull request when it is opened in a repository in scope. It reviews the pull request again when you push new commits.
2. **Analyze the change**: It reads the code change, your repository's custom instructions, and the production telemetry for the services the change affects.
3. **Post the review**: Bits Code Review publishes a review on the pull request, with a summary verdict and inline comments anchored to the relevant lines. When it can, a finding includes a GitHub suggestion you can apply directly.

### Data sources

Bits Code Review does not require a dedicated data source. It uses the core Datadog telemetry your services already send, such as [APM][1] traces, [logs][2], [metrics][3], and [RUM][4] events. It adapts to what each service has enabled.

Coverage follows your instrumentation. For the most detailed inputs, enable [Live Debugger][5] on the services you work in.

Reviews of public repositories never use production data. Bits Code Review reviews them from the code alone.

## Prerequisites

Bits Code Review supports only GitHub repositories. Repositories hosted on GitLab, Azure DevOps, or Bitbucket are not supported.

| Requirement | Why it is needed |
| ----------- | ---------------- |
| The Datadog [GitHub App][6] installed on the repositories in scope, with `Contents: Read`, `Issues: Read & Write`, and `Pull Requests: Read & Write` | `Contents: Read` lets Bits Code Review read the code change. `Issues` and `Pull Requests` access let it post its review and respond to comments on the pull request. |
| The `pull_request`, `push`, `pull_request_review`, `pull_request_review_comment`, and `issue_comment` webhook events | Tell Bits Code Review when a pull request is opened or updated, and when someone comments on it. |
| A Datadog Admin or Standard role | Lets you view and change the Bits Code Review settings. |

In the GitHub integration's feature list, Bits Code Review relies on these permission bundles: {{< ui >}}Read Repository Contents{{< /ui >}}, {{< ui >}}Pull Request Information{{< /ui >}}, and {{< ui >}}Pull Request Comments{{< /ui >}}. Other Software Delivery features, such as Code Coverage, CI Visibility, and Test Optimization, are not required.

## Enable automatic reviews

Automatic reviews are opt-in. To enable them, go to {{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Code Review{{< /ui >}}][7] and choose the scope:

- **Repository**: In the {{< ui >}}Repository{{< /ui >}} tab, turn on {{< ui >}}Review Enabled{{< /ui >}} for a repository. Bits Code Review reviews every pull request in that repository, regardless of the owning team.
- **Team**: In the {{< ui >}}Team{{< /ui >}} tab, turn on a GitHub team. Bits Code Review reviews every pull request owned by that team, in any repository.

Enabling either scope is enough for a pull request to be reviewed.

**Note**: The {{< ui >}}Team{{< /ui >}} tab lists GitHub teams, not [Datadog Teams][8]. Ownership is based on your repository's `CODEOWNERS` file. `CODEOWNERS` entries that name an individual user rather than a team are not supported. If you belong to several GitHub teams, enable each team whose pull requests you want reviewed.

## Request a review on demand

To review a single pull request without enabling automatic reviews, comment `@datadog review` on the pull request. Bits Code Review reviews the pull request and posts its findings as comments.

## Customize reviews

Bits Code Review uses the same [custom instructions][9] as Bits Code. It reads the following files from the repository root:

- `AGENTS.md`, `agents.md`, or `agent.md`
- `CLAUDE.md` or `claude.md`
- `.cursorrules`
- `.windsurfrules`
- `.github/copilot-instructions.md`

Use these files to describe team or repository review conventions, such as architecture rules, patterns to flag, or areas to ignore. Custom instructions extend the default review: Bits Code Review still reports its baseline findings, plus whatever your instructions add.

There is no file dedicated to Bits Code Review. Other coding agents read the same files, so your instructions apply to them too. To scope instructions to reviews only, add a line to `AGENTS.md` that points review agents to a separate file, for example: `Review agents should also read reviewers.md.`

## Give feedback on reviews

React to a Bits Code Review comment with 👍 or 👎, reply to it, or apply its suggestion. After the pull request merges, Bits Code Review reads this feedback from GitHub to evaluate the quality of its reviews. It does not post anything to your pull request during this evaluation.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/
[2]: /logs/
[3]: /metrics/
[4]: /real_user_monitoring/
[5]: /tracing/live_debugger/
[6]: /integrations/github/
[7]: https://app.datadoghq.com/code/settings/code-review
[8]: /account_management/teams/
[9]: /bits_ai/bits_code/setup/#configure-custom-instructions
