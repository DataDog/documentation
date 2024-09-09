---
title: Events
aliases:
- /app_builder/events
disable_toc: false
further_reading:
- link: "/service_management/app_builder/build/"
  tag: "Documentation"
  text: "Build Apps"
- link: "/service_management/app_builder/components/"
  tag: "Documentation"
  text: "Components"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">App Builder is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

UI components can trigger reactions on an **Event**. Event triggers differ according to the component. For example, a button component can trigger a reaction on a click event, and a table component event can trigger a reaction on a page change or table row click event. To see what event triggers are available for a given component, see [Components][1].

An event can set the state of a UI component, open or close a modal, trigger another query, or even run custom JavaScript.

For example, the [GitHub PR summarizer][2] blueprint uses a **Summarize** button with an event that triggers on a click. The event uses the **Trigger Query** reaction which runs the `summarizePulls` query.

### State functions

App Builder provides functions for some types of app state changes on specific components.

setIsOpen
: Sets the status of a modal to open or closed based on the boolean value that you provide.<br>
**Example**: See the [Components][1] documentation page section for the **modal** component.

setPageIndex
: Sets the `pageIndex` property of the table component to the page that you specify. Works with the server side pagination type.<br>
**Example**: See the [Components][1] documentation page section for the **table** component.

setSelectedRow
: Sets the `selectedRow` property of the table component to the row that you specify.<br>
**Example**: See the [Components][1] documentation page section for the **table** component.

setTabIndex
: Sets the `selectedTabIndex` property of the table component to the tab index that you specify.<br>
**Example**: See the [Components][1] documentation page section for the **tab** component.

setValue
: Sets the value of an element to the value that you provide to the function.<br>
**Examples**: See the [Components][1] documentation page sections for the **number input**, **radio button**, **search**, **select**, **text area**, and **text input** components.

To see what state functions are available for a given component, see [Components][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#app-builder** channel on the [Datadog Community Slack][8].

[1]: /service_management/app_builder/components
[2]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[8]: https://datadoghq.slack.com/