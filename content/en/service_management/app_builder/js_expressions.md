---
title: JavaScript expressions
kind: documentation
further_reading:
- link: ""
  tag: "Documentation"
  text: ""
---

TODO
- [ ] Retake video
- [ ] Fix missing image
- [ ] Add examples

---

Use JavaScript (JS) expressions to create interactions between components in your app. You can use a JS expression enclosed in `${}` anywhere in App Builder.

For example, to interpolate the values of two text input components named `textInput0` and `textInput1` into a text component (and add an exclamation mark), use the expression `${textInput0?.value} ${textInput1?.value}!`.

{{< img src="service_management/app_builder/interpolation.png" alt="The text component fills with the words 'Hello' and 'World', each interpolated from a text input component value" style="width:100%;" >}}

Most UI components provide built-in options such as toggles and text alignment that cover basic app usage. To add a custom interaction to a component, click the code editor symbol (**</>**) and enter a JS expression. For example, if you want a text component to be visible only when two text input components named `textInput0` and `textInput1` have values, use the expression `${textInput0?.value && textInput1?.value}`.

{{< img src="service_management/app_builder/expression_example.mp4" alt="The text box is only visible if both the textInput0 and textInput1 components have values" video=true >}}

As you type an expression, App Builder offers autocomplete suggestions based on the existing queries and components in your app. Use your arrow keys or click on an autocomplete suggestion to use it in your expression. Expressions default to using the [optional chaining operator][1] (`?.`) to prevent the app from throwing an error on an `undefined` or `null` value.

The result of the JS expression you enter must match the result expected by the component property. For example, the text component's **Is Visible** property expects a Boolean. To get an idea of what data type is expected by the component, use the **Inspect Data** section. For more information, see [View component properties](#view-component-properties).

<div class="alert alert-info">Some fields in App Builder, like <a href="/service_management/app_builder/build/#post-query-transformation">post-query transformations</a> display a code editor by default, usually pre-populated with some JS comments. In these situations, you do not need to use <code>${}</code> syntax.</div>

## View component properties

Before you create an expression, it's helpful to know the available properties and defaults or current values for the component you want to interact with.

You can view the available properties and values for a component using:
- **App State**: Provides properties and values for all components and queries in your app.
- **Inspect Data**: Provides properties and values for a specific component or query in your app.
- The **Admin Console**: The **Data** tab of the **Admin Console** provides properties and values for all components and queries in your app.

{{% collapse-content title="App State" level="h3" %}}
To access **App State**:
1. Click **App Properties** in the left side-panel.
1. Scroll down to the **App State** section.

{{< img src="service_management/app_builder/app-state.png" alt="The App State section in App Properties" style="width:100%;" >}}
{{% /collapse-content %}}

{{% collapse-content title="Inspect Data" level="h3" %}}
To access **Inspect Data**:
1. Click on the query or component you want to inspect.
1. Scroll down to the **Inspect Data** section.

{{< img src="service_management/app_builder/inspect-data.png" alt="The App State section in App Properties" style="width:100%;" >}}
{{% /collapse-content %}}

{{% collapse-content title="Admin Console" level="h3" %}}
To access the **Admin Console**:
1. Click on the cog (**Settings**) icon and select **Admin Console**.
1. Click **Data**.

{{< img src="service_management/app_builder/admin-console.png" alt="The App State section in App Properties" style="width:100%;" >}}
{{% /collapse-content %}}

## Examples

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
