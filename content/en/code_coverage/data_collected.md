---
title: Code Coverage Data Collected
further_reading:
  - link: "/code_coverage"
    tag: "Documentation"
    text: "Code Coverage"
  - link: "/code_coverage/setup"
    tag: "Documentation"
    text: "Set up Code Coverage"
---

{{< callout url="http://datadoghq.com/product-preview/code-coverage/" >}}
Code Coverage is in Preview. This product replaces Test Optimization's <a href="https://docs.datadoghq.com/tests/code_coverage">code coverage</a> feature, which is being deprecated. Complete the form to request access for the new Code Coverage product.
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

None of the webhooks include your source code content, only metadata about the pull request, such as: title, description, author, labels, commit SHAs.

You can check GitHub's [webhook events and payloads documentation][1] for detailed description of the data sent by these webhooks.

[1]: https://docs.github.com/en/webhooks/webhook-events-and-payloads

{{% /tab %}}
{{< /tabs >}}

By default, when synchronizing your repositories, Datadog doesn’t store the actual content of files in your repository, only the Git commit and tree objects.

See [Datadog Source Code Integration][1] for more information about how Datadog integrates with your source code provider.

## Code Coverage Report Upload

The `datadog-ci coverage upload` command sends the following data to Datadog:
- **Coverage reports**: the report files, which contain the coverage data for your codebase. The data depends on the coverage tool and report format you are using, and normally includes file paths, line numbers, and coverage percentages.
- **Git metadata**: git repository URL, branch name, commit SHA, timestamp, author information, and list of file paths that were changed in the commit. Git metadata upload can be disabled by adding `--skip-git-metadata-upload=1` to the command.
- **Git diff summary**: list of file paths that were changed in the commit, along with the numbers of added and removed lines. Diff data upload can be disabled by adding `--upload-git-diff=0` to the command.
- **CI metadata**: information about the CI environment, such as the CI provider, job ID, and pipeline ID.

No source code is uploaded to Datadog.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/guide/source-code-integration
