---
title: Error Tracking Issue Ownership
is_beta: true
private: false
description: Learn about how to set issue owners to ensure that you are seeing the issues that matter to you.
further_reading:
- link: '/error_tracking/suspect_commits'
  tag: 'Documentation'
  text: 'Learn about how Error Tracking can identify suspect commits'
- link: '/error_tracking'
  tag: 'Documentation'
  text: 'Learn about Error Tracking'
---

{{< beta-callout url="https://www.datadoghq.com/product-preview/auto-filter-assign-error-tracking-issues/" btn_hidden="false"  >}}
Issue Ownership for Error Tracking is currently in Preview.
{{< /beta-callout >}}

## Overview

Defining issue ownership allows you to discard irrelevant information to help  prioritize and focus on what matters. Error Tracking leverages the GitHub CODEOWNERS file to link issues to the relevant person or team for focused investigations.

We can automatically filter the list of issues, alert the owning teams, and assign issues automatically to the suspect commit author. Datadog defines ownership based on Datadog teams with code owners, service owners, and view owners. Assignees are assigned based on the suspect commit or through manual assigns. 


## Setup

1. Ensure that you have [Source Code Integration][1] set up for your [backend services][2] and [frontend applications][3]. 
2. [Configure your GitHub repository][4] with the `Members Read` permission. If you already have a GitHub app created, you can see if you have the proper permissions listed under **Link GitHub teams with Datadog teams** feature. 

{{< img src="error_tracking/issue-owner-github-setup.png" alt="Error Tracking Issue Ownership GitHub Setup" style="width:90%" >}}

3. Link your Datadog Team to your Datadog Team
Navigate to **Organization Settings** > **Teams** > Select your team > **Settings** > **GitHub Connection** and search for the GitHub team(s) you'd like to connect with your Datadog Team. 

{{< img src="/error_tracking/github_connection_setup.mp4" alt="Link your GitHub team to Datadog team" video=true >}}




## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/guide/source-code-integration/
[2]: https://app.datadoghq.com/source-code/setup/apm
[3]: https://app.datadoghq.com/source-code/setup/rum
[4]: https://app.datadoghq.com/integrations/github/configuration?