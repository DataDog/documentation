---
title: Events
description: Configure UI component event triggers and reactions, including state functions for dynamic app interactions and behaviors.
aliases:
- /app_builder/events
- /service_management/app_builder/events
disable_toc: false
further_reading:
- link: "/service_management/app_builder/build/"
  tag: "Documentation"
  text: "Build Apps"
- link: "/service_management/app_builder/components/"
  tag: "Documentation"
  text: "Components"
- link: "https://learn.datadoghq.com/courses/app-builder-integration"
  tag: "Learning Center"
  text: "Build Self-Serve Apps with App Builder for Third-Party Integrations"
---

UI components can trigger reactions on an **Event**. Event triggers differ according to the component. For example, a button component can trigger a reaction on a click event, and a table component event can trigger a reaction on a page change or table row click event. To see what event triggers are available for a given component, see [Components][1].

An event can set the state of a UI component, open or close a modal, trigger another query, or even run custom JavaScript.

For example, the [GitHub PR summarizer][2] blueprint uses a **Summarize** button with an event that triggers on a click. The event uses the **Trigger Query** reaction which runs the `summarizePulls` query.

In addition to working with events manually, you can use Bits AI to set up event handlers, configure event-driven actions, and optimize event logic:
   1. Click the **Build with AI** icon (**<i class="icon-bits-ai"></i>**).
   1. Enter a custom prompt for an event, or try the prompt `How can you help me with events?`.


### Events and reactions

In App Builder, events and reactions work together to determine component behavior. 

Events are triggered both by components (such as a button click or a form submit) and actions (execution finished). Events differ depending on which component you use. For component-specific event details, see [Components][1].

Reactions specify what happens when an event is triggered. Any component that can trigger an event has the following available reactions: custom, close modal, download file, open modal, open side panel, close side panel, set component state, set state variable value, toast notification, and trigger action.

#### Custom reactions

Custom reactions allow for more advanced use cases or custom behavior beyond the built-in reactions. For example, you can execute actions conditionally based on other data in the app. The following example triggers different actions based on the current user's team:

```javascript
${() => {
    console.log("Trigger actions by team")
    const teams = global?.user?.teams ?? []
    if (teams.some(t => t?.name === "team1")) {
        makeRequest0?.fetch()
    } else if (teams.some(t => t?.name === "team2")) {
        makeRequest1?.fetch()
    } else {
        makeRequest2?.fetch()
    }
}}
```

### State functions

App Builder provides functions for some types of app state changes. These functions are available with the **Set Component State** reaction for specific components and in post-query hooks.

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
**Examples**: See the [Components][1] documentation page sections for the **form**, **number input**, **radio button**, **search**, **select**, **text area**, and **text input** components.

To see what state functions are available for a given component, see [Components][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#app-builder** channel on the [Datadog Community Slack][8].

[1]: /service_management/app_builder/components
[2]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[8]: https://chat.datadoghq.com/
