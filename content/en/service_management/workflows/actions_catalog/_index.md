---
title: Actions Catalog
kind: documentation
type: actioncatalog
disable_toc: true
disable_sidebar: false
aliases:
- /workflows/actions_catalog
- /service_management/service_management/workflows/actions_catalog
cascade:
  disable_sidebar: true
  type: actioncatalog
  algolia:
      rank: 40
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Workflow Automation is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Datadog Workflow Automation provides actions that can be performed against your infrastructure and integrations. You can orchestrate and automate your end-to-end processes by linking together actions that perform tasks in your cloud providers, SaaS tools, and Datadog accounts.

In addition to the workflow actions listed below, you can:
- Use the [HTTP action][1] to make a request to any endpoint.
- Implement [data transformation actions][2] to perform necessary operations on the information flowing through your workflow.
- Leverage [logic actions][3] to control the execution path between steps in your workflow.

For information on creating workflows, see [build workflows][4].

See below for a list of all available workflow actions. Click an action to see its description, inputs, outputs, and parameters.

[1]: /service_management/workflows/actions_catalog/generic_actions/#http
[2]: /service_management/workflows/actions_catalog/generic_actions/#data-transformation
[3]: /service_management/workflows/actions_catalog/logic_actions/
[4]: /service_management/workflows/build/
