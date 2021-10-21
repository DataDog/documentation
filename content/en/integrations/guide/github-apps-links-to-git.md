---
title: Setting Up Links to Git in Datadog
kind: guide
description: "Set up links to Git with Datadog."
further_reading:
- link: "https://docs.datadoghq.com/integrations/github-apps/"
  tag: "Integration"
  text: "GitHub Apps Integration"
- link: "https://docs.datadoghq.com/integrations/guide/github-apps-inline-source-code/"
  tag: "Guide"
  text: "Setting Up Inline Source Code in Datadog"
---
## Overview

<div class="alert alert-warning">
The source code integration is in public beta and is available for all JVM languages and Go.
</div>

By installing the Datadog-GitHub Apps integration, you can enrich your GitHub issues and pull requests in Datadog. With the source code integration, you can link your telemetry (such as stack traces) and source code. 

The GitHub Apps source code integration allows you to see code snippets in your errors and preview additional details about your issues and pull requests on GitHub.

### Links to Git

#### Continuous Profiler

In the [Continuous Profiler][1], you can directly access traces in the source repository on GitHub.

1. Navigate to **APM** > **Profile Search**.
2. Click on a profile and hover your cursor over a method in the flamegraph. A kebab icon with the **More actions** label appears to the right.
3. Click **More actions** > **View in repo** to open the source code repository.

#### Notebooks

In [Notebooks][2], GitHub issues and pull requests automatically generate a preview hoverbox with additional details including commit history, author, and date.

1. Navigate to **Notebooks** > **New Notebook**.
2. Add a **Text** cell and mention an issue or pull request on GitHub in the **Edit** field, for example: `https://github.com/project/repository/pull/#`.
3. Click **Done**. The GitHub icon appears next to your linked issue or pull request.
4. Click **Connect to Preview** and **Authorize**.
5. Hover over the linked issue or pull request to see the description preview.

{{< img src="integrations/guide/github_apps/notebooks-links-to-git.png" alt="Links to Git" style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/profiling/search
[2]: https://app.datadoghq.com/notebook
