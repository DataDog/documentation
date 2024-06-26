---
title: Actions
kind: documentation
disable_toc: false
disable_sidebar: false
type: documentation
algolia:
  tags: ['workflow', 'workflows', 'workflow automation']
aliases:
- /workflows/generic_actions
- /service_management/workflows/actions_catalog/generic_actions/
further_reading:
- link: "/integrations/"
  tag: "Documentation"
  text: "Learn about integrations"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Workflow Automation is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Datadog provides a suite of workflow actions that are not associated with a specific tool or integration. These actions give you more control over your workflows by allowing you to do things like:
- Add logic to control the execution path of your workflow.
- Transform the data collected by an action.
- Make custom HTTP requests.

{{< whatsnext desc="Find out more about generic actions:" >}}
    {{< nextlink href="/service_management/workflows/actions/flow_control" >}}Use logic actions to add a sleep interval, branch on a condition, use iteration, and more.{{< /nextlink >}}
    {{< nextlink href="/service_management/workflows/actions/data_transformation" >}}Perform custom data transformations within your workflows using JavaScript.{{< /nextlink >}}
    {{< nextlink href="/service_management/workflows/actions/http" >}}Use the HTTP action to make a request to a custom endpoint.{{< /nextlink >}}
    {{< nextlink href="/service_management/workflows/actions/saved_actions" >}}Use the <i>Saved Actions</i> feature to store and reuse an action and its parameters.{{< /nextlink >}}
{{< /whatsnext >}}

If your use case is not covered by an integration or generic Datadog action, you can [request a new action or an entire integration][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][2].

[1]: https://forms.gle/JzPazvxXox7fvA2R8
[2]: https://datadoghq.slack.com/
