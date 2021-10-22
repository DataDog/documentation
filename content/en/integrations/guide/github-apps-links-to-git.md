---
title: Setting Up the GitHub integration with GitHub apps
kind: guide
description: "Set up the GitHub integration with GitHub apps."
further_reading:
- link: "https://docs.datadoghq.com/integrations/github-apps/"
  tag: "Integration"
  text: "GitHub Apps Integration"
- link: "https://docs.datadoghq.com/integrations/guide/github-apps-inline-source-code/"
  tag: "Guide"
  text: "Setting Up Inline Source Code in Datadog"
---
## Overview

By installing the Datadog-GitHub Apps integration, you can enrich your GitHub issues and pull requests in Datadog. With [the source code integration][2], you can link your telemetry (such as stack traces) and source code.

The GitHub Apps source code integration allows you to see code snippets in your errors and preview additional details about your issues and pull requests on GitHub.

### Notebooks

In [Notebooks][3], GitHub issues and pull requests automatically generate a preview hoverbox with additional details including commit history, author, and date.

1. Navigate to **Notebooks** > **New Notebook**.
2. Add a **Text** cell and mention an issue or pull request on GitHub in the **Edit** field, for example: `https://github.com/project/repository/pull/#`.
3. Click **Done**. The GitHub icon appears next to your linked issue or pull request.
4. Click **Connect to Preview** and **Authorize**.
5. Hover over the linked issue or pull request to see the description preview.

{{< img src="integrations/guide/github_apps/notebooks-links-to-git.png" alt="Links to Git" style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/profiling/search
[2]: https://docs.datadoghq.com/fill-link-here
[3]: https://app.datadoghq.com/notebook
