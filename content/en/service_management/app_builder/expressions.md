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

You can use JavaScript (JS) expressions anywhere to create custom interactions between the different parts of your app.

Some fields, like the [post-query transformation][1], display a code editor by default and accept plain JS. In all other fields, enclose your JS expressions in `${}`. For example, to interpolate the values of two text input components named `textInput0` and `textInput1` into the **Content** property of a text component (and add an exclamation mark), use the expression `${textInput0?.value} ${textInput1?.value}!`.

{{< img src="service_management/app_builder/interpolation.png" alt="The text component fills with the words 'Hello' and 'World', each interpolated from a text input component value" style="width:100%;" >}}

App Builder accepts standard vanilla JavaScript syntax, however:
- The result of the expression must match the result expected by the component or query property. For example, the text component's **Is Visible** property expects a Boolean. To get an idea of what data type is expected by the component, see [View component properties](#view-component-properties).
- Your code has read-only access to the app state, but App Builder executes the code in a sandboxed environment with no access to the Document Object Model (DOM) or browser APIs.
- Expressions default to using the [optional chaining operator][2] (`?.`) to prevent the app from throwing an error on an `undefined` or `null` value.

## Custom component interactions

Most UI components provide built-in options such as toggles and text alignment that cover basic app usage. To add a custom interaction to a component, click the code editor symbol (**</>**) and enter a JS expression. For example, if you want a text component to be visible only when two text input components named `textInput0` and `textInput1` have values, use the expression `${textInput0?.value && textInput1?.value}` in the **Is Visible** property.


{{< img src="service_management/app_builder/expression_example.mp4" alt="The text box is only visible if both the textInput0 and textInput1 components have values" video=true >}}

<div class="alert alert-info">As you type an expression, App Builder offers autocomplete suggestions based on the existing queries and components in your app. Click on an autocomplete suggestion to use it in your expression, or use the arrow keys on your keyboard and make a selection with the Enter key.</div>

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

[1]: /service_management/app_builder/build/#post-query-transformation
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
