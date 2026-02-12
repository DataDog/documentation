---
title: TeamCity Setup for CI Visibility
aliases:
  - /continuous_integration/setup_pipelines/teamcity
further_reading:
  - link: "/continuous_integration/pipelines"
    tag: "Documentation"
    text: "Explore Pipeline Execution Results and Performance"
  - link: "/continuous_integration/troubleshooting/"
    tag: "Documentation"
    text: "Troubleshooting CI Visibility"
---

## Overview

[TeamCity][1] is a continuous integration and delivery server that optimizes and automates software development processes.

Set up CI Visibility for TeamCity to collect data about your pipeline executions, debug performance bottlenecks, address operational issues, and optimize your development workflows.

### Compatibility

| Pipeline Visibility | Platform | Definition |
|---|---|---|
| [Partial retries][14] | Retry build triggers | View partially retried pipeline executions. |
| [Queue time][15] | Queue time | View the amount of time pipeline jobs sit in the queue before processing. |
| [Pipeline failure reasons][16] | Pipeline failure reasons | Identify pipeline failure reasons from error messages. |
| [Filter CI Jobs on the critical path][17] | Filter CI Jobs on the critical path | Filter by jobs on the critical path. |
| [Execution time][18] | Execution time  | View the amount of time pipelines have been running jobs. |

The following TeamCity versions are supported:

- TeamCity >= 2021.2 or later

### Terminology

This table shows the mapping of concepts between Datadog CI Visibility and TeamCity:

| Datadog                    | TeamCity    |
|----------------------------|-------------|
| Pipeline                   | Build Chain |
| Job                        | Build       |
| _Not available in Datadog_ | Step        |

## Configure the Datadog integration

The integration between [TeamCity][1] and Datadog CI Visibility is provided through a TeamCity plugin. The [source code][8] of the Datadog CI Integration plugin is open source under the Apache 2.0 license.

To set up the integration:

1. Download the [Datadog CI Integration plugin][5] on the TeamCity server by going to
**Administration** -> **Plugins** -> **Browse Plugin Repository**.
2. If you don't already have one, add a [TeamCity composite build][6] as the last build of the build chain. This build must have a dependency on the current last build of the chain and no other builds depending on it.

   Build chains that do not end with a composite build are ignored by the plugin. For example, consider an expected build chain where `Aggregating Results` is the last composite build:

   {{< img src="ci/teamcity_build_chain.png" alt="TeamCity build chain with composite build at the end" style="width:100%;">}}

   The final composite build must be properly configured in terms of version control settings, with the VCS Root attached and the [VCS Trigger][13] configured.

3. The following configuration parameters need to be present for TeamCity projects:

   * **datadog.ci.api.key**: Your [Datadog API Key][2]. Supports type **Password** in plugin version 0.0.5 and later.
   * **datadog.ci.site**: {{< region-param key="dd_site" code="true" >}}
   * **datadog.ci.enabled**: `true` (`false` can be used to disable the plugin for a specific project).

   You can add them to either TeamCity subprojects or the [TeamCity Root Project][10]. When added to the Root project, they are propagated to all its subprojects. For example, to enable the plugin for all projects, add `datadog.ci.enabled` with the value `true` to the Root Project.

   For more information on defining configuration parameters, see the [TeamCity Project Hierarchy documentation][9].

4. To enable the plugin, click on **Enable uploaded plugins** in the **Administration** -> **Plugins** page.
Alternatively, restart the TeamCity server.

## Advanced configuration

### Configure Git user information

The plugin retrieves the Git author name and email based on the [TeamCity username style][7]. Datadog recommends using either **Author Name and Email** or **Author Email** username styles, as they
provide information about the user email.

When one of the other username styles is used (**UserId** or **Author Name**), the plugin automatically generates an email for the user by appending `@Teamcity` to the username. For example, if the **UserId** username style is used and the Git author username is `john.doe`, the plugin generates `john.doe@Teamcity` as the Git author email. The username style is defined for [VCS Roots][11], and can be modified in the VCS Root settings.

<div class="alert alert-danger"> The Git author email is used for
<a href="https://www.datadoghq.com/pricing/?product=ci-visibility#ci-visibility">billing purposes</a>,
therefore there might be cost implications when username styles not providing email
(<strong>UserId</strong> or <strong>Author Name</strong>) are used. <a href="/help/">Reach out to the Datadog support team</a> if you have any questions about your use case.
</div>

## Visualize pipeline data in Datadog

View your data on the [**CI Pipeline List**][3] and [**Executions**][4] pages after the pipelines finish.

The **CI Pipeline List** page shows data for only the default branch of each repository. For more information, see [Search and Manage CI Pipelines][12].

## Troubleshooting

All the logs generated by the Datadog CI Integration plugin are stored inside the `teamcity-server.log` file and can be
accessed from the TeamCity Server by going to **Administration** -> **Diagnostic** -> **Server Logs**.
Check these logs to get additional context on any issues with the plugin.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.jetbrains.com/teamcity/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/ci/pipelines
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: https://plugins.jetbrains.com/plugin/20852-datadog-ci-integration
[6]: https://www.jetbrains.com/help/teamcity/composite-build-configuration.html
[7]: https://www.jetbrains.com/help/teamcity/git.html#General+Settings
[8]: https://github.com/DataDog/ci-teamcity-plugin
[9]: https://www.jetbrains.com/help/teamcity/project-administrator-guide.html#Project+Hierarchy
[10]: https://www.jetbrains.com/help/teamcity/project-administrator-guide.html#Root+Project
[11]: https://www.jetbrains.com/help/teamcity/configuring-vcs-roots.html
[12]: /continuous_integration/search/#search-for-pipelines
[13]: https://www.jetbrains.com/help/teamcity/configuring-vcs-triggers.html#Trigger+build+on+changes+in+snapshot+dependencies
[14]: /glossary/#partial-retry
[15]: /glossary/#queue-time
[16]: /glossary/#pipeline-failure
[17]: /continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[18]: /glossary/#pipeline-execution-time
