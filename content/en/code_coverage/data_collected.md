---
title: Code Coverage Data Collected
description: "Learn about the data collected by Code Coverage including source code provider webhooks, coverage reports, and git metadata."
further_reading:
  - link: "/code_coverage"
    tag: "Documentation"
    text: "Code Coverage"
  - link: "/code_coverage/setup"
    tag: "Documentation"
    text: "Set up Code Coverage"
---

{{< callout url="#" btn_hidden="true" header="Try the Preview!" >}}
Code Coverage is in Preview. There is no charge for using Code Coverage during the Preview. This product replaces Test Optimization's <a href="https://docs.datadoghq.com/tests/code_coverage">code coverage</a> feature, which is being deprecated.
{{< /callout >}}

## Source Code Provider Integration

The exact data received by Datadog depends on your source code provider type:

{{< tabs >}}
{{% tab "GitHub" %}}

Code Coverage relies on the following GitHub webhooks:
* Pull request
* Pull request review
* Pull request review comment
* Push

None of the webhooks include your source code content; they only include metadata about the pull request, such as title, description, author, labels, and commit SHAs.

See GitHub's [webhook events and payloads documentation][1] for a detailed description of the data sent by these webhooks.

[1]: https://docs.github.com/en/webhooks/webhook-events-and-payloads

{{% /tab %}}
{{% tab "Gitlab" %}}

Code Coverage relies on Gitlab webhooks. The webhooks do not include your source code content. They only include metadata about the merge request, such as the title, description, author, labels, and commit SHAs.

See Gitlab's [webhook events and payloads documentation][1] for a detailed description of the data sent by webhooks.

[1]: https://docs.gitlab.com/user/project/integrations/webhook_events/

{{% /tab %}}
{{% tab "Azure DevOps" %}}

Code Coverage relies on Azure DevOps webhooks. The webhooks do not include your source code content. They only include metadata about the pull request, such as the title, description, author, labels, and commit SHAs.

See Azure DevOps' [webhook events and payloads documentation][1] for a detailed description of the data sent by webhooks.

[1]: https://learn.microsoft.com/en-us/azure/devops/service-hooks/events?view=azure-devops#git.pullrequest.created

{{% /tab %}}
{{< /tabs >}}

By default, when synchronizing your repositories, Datadog doesn’t store the actual content of files in your repository, only the Git commit and tree objects.

See [Datadog Source Code Integration][1] for more information about how Datadog integrates with your source code provider.

## Code Coverage Report Upload

The `datadog-ci coverage upload` command sends the following data to Datadog:
- **Coverage reports**: The report files, which contain the coverage data for your codebase. The data depends on the coverage tool and report format you are using, and normally includes file paths, line numbers, and coverage percentages.
- **Git metadata**: Git repository URL, branch name, commit SHA, timestamp, author information, and list of file paths that were changed in the commit. You can disable Git metadata upload by adding `--skip-git-metadata-upload=1` to the command.
- **Git diff summary**: List of file paths that were changed in the commit, along with the numbers of added and removed lines. You can disable Diff data upload by adding `--upload-git-diff=0` to the command.
- **CI metadata**: Information about the CI environment, such as the CI provider, job ID, and pipeline ID.

No source code is uploaded to Datadog.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/guide/source-code-integration
