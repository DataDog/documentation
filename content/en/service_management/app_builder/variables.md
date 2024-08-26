---
title: State Variables
aliases:
- /app_builder/variables
disable_toc: false
further_reading:
- link: "/service_management/app_builder/build/"
  tag: "Documentation"
  text: "Build Apps"
- link: "/service_management/app_builder/expressions/"
  tag: "Documentation"
  text: "JavaScript Expressions"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">App Builder is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

If you want to encapsulate logic within your app, you can use state variables.

## Create a state variable

To add a state variable to your app, perform the following steps:

1. In your app, click **{𝑥}** to open the **Variables** tab.
1. Click **Create Variable**.
1. Optionally, click the variable name and rename it.
1. Define the initial value for your state variable.

## Example app

{{< img src="service_management/app_builder/state-variables-example-app.mp4" alt="Clicking the button flips the callout value between a green Pass to a red Fail" video="true" width="360px">}}

To create an app that uses a button to change a callout value component's style and value, follow these instructions.

### Create the variables

1. In your app, click **{𝑥}** to open the **Variables** tab.
1. Click **Create Variable**.
1. Name the variable `callout_value` and set its **Initial Value** to `Pass`.
1. Click the **+ (plus)** to create another variable.
1. Name this variable `callout_color` and set its **Initial Value** to `green`.

### Create the components

1. Add a callout value component to your app. Give it the following values:
    * **Value**: `${callout_value.value}`
    * **Style**: `${callout_color.value}`
1. Add a button component to your app and set its label to `Change status`.
1. Under **Events**, add an event. Give it the following values:
    * **Event**: `click`
    * **Reaction**: `custom`
    * **Callback**:
        ```
        ${ () => {
            if(callout_color.value !== "green"){
                callout_color.setValue("green")
                callout_value.setValue("Pass")
            } else {
            callout_color.setValue("red")
            callout_value.setValue("Fail")
            }
        } }
        ```
1. Click **Preview** to preview your app.<br>
    When you click the **Change status** button in your app, the color and text of the callout value element alternate between a green Pass and a red Fail.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#app-builder** channel on the [Datadog Community Slack][1].

[1]: https://datadoghq.slack.com/