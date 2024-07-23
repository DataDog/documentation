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

UI components can trigger reactions on an **Event**. Event triggers differ according to the component. For example, a button component can trigger a reaction on a click event, and a table component event can trigger a reaction on a page change or table row click event. To see what event triggers are available for a given component, see [Components][1].

An event can set the state of a UI component, open or close a modal, trigger another query, or even run custom JavaScript.

For example, the [GitHub PR summarizer][2] blueprint uses a **Summarize** button with an event that triggers on a click. The event uses the **Trigger Query** reaction which runs the `summarizePulls` query.

### State functions

App Builder provides functions for some types of app state changes with specific components.

setIsChecked
: Sets the value of a set of checkboxes to the array of boolean value that you provide.<br>
**Example**: To make a button that sets the first of a set of checkboxes to checked and the second to unchecked, in the button element's **Events** section, use the following values: <ul><li>Event: click</li><li>Reaction: Set Component State</li><li>Component: the name of the checkbox element that you want this button to act on</li><li>State Function: `setIsChecked`</li><li>Value: `${[true, false]}`</li><ul>

setValue
: Sets the value of an element to the value that you provide to the function.

setIsOpen
: Sets the stat us of a modal to open or closed based on the boolean value that you provide.

setSelectedRow
: Sets

setPageIndex
: Sets

To see what state functions are available for a given component, see [Components][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#app-builder** channel on the [Datadog Community Slack][8].

[1]: /service_management/app_builder/components
[2]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[8]: https://datadoghq.slack.com/