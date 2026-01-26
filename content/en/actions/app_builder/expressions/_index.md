---
title: Expressions
description: Use expressions in App Builder to connect components, queries, and app state. Choose a language tab for details.
type: multi-code-lang
aliases:
    - /service_management/app_builder/expressions
further_reading:
- link: "/service_management/app_builder/build/"
  tag: "Documentation"
  text: "Build Apps"
- link: "/service_management/app_builder/components/"
  tag: "Documentation"
  text: "Components"
---

This page explains the general principles of using expressions in App Builder. To learn about language-specific principles, choose one of the following: 

{{< partial name="actions/expressions.html" >}}

<br>

## View component properties

Before you create an expression, it's helpful to know the available properties and defaults or current values for the component you want to interact with.

You can view the available properties and values for a component in the following ways:
- **App State**: Provides properties and values for all components and queries in your app, as well as global variables such as state variables or dashboard template variables.
- **Inspect Data**: Provides properties and values for a specific component or query in your app.
- The **Admin Console**: The **Data** tab of the **Admin Console** provides properties and values for all components and queries in your app.

{{% collapse-content title="App State" level="h4" %}}
To access **App State**:
1. Click **App Properties** in the left side-panel.
1. Scroll down to the **App State** section.

{{< img src="service_management/app_builder/app-state-2.png" alt="The App State section in App Properties" style="width:50%;" >}}
{{% /collapse-content %}}

{{% collapse-content title="Inspect Data" level="h4" %}}
To access **Inspect Data**:
1. Click on the query or component you want to inspect.
1. Scroll down to the **Inspect Data** section.

{{< img src="service_management/app_builder/inspect-data-2.png" alt="The App State section in App Properties" style="width:80%;" >}}
{{% /collapse-content %}}

{{% collapse-content title="Admin Console" level="h4" %}}
To access the **Admin Console**:
1. Click on the cog (**Settings**) icon and select **Admin Console**.
1. Click **Data**.

{{< img src="service_management/app_builder/admin-console-2.png" alt="The App State section in App Properties" style="width:50%;" >}}
{{% /collapse-content %}}


## Custom component interactions

Most UI components provide built-in options, such as toggles and text alignment, that cover basic app usage. To add a custom interaction to a component, click the code editor symbol (**</>**) and enter a JS expression.

### Conditional visibility

You can make the visibility of a component dependent on other components.

For example, if you want a text component to be visible only when two text input components named `textInput0` and `textInput1` have values, use the expression `${textInput0.value && textInput1.value}` in the **Is Visible** property.

### Disable a component conditionally

Similar to visibility, you can disable a component unless conditions are met by other aspects of your app, such as other components or the app context.

#### Disable a component based on visibility

If your app has a button that uses the content from a text component to send a message, you can disable the button unless the text component is visible:
1. Click the button component on your canvas.
1. Click the code editor symbol (**</>**) next to the **Is Disabled** property.
1. Add the expression `${!text0.isVisible}`.

The text component is invisible and the button is disabled unless both text input fields have content.

{{< img src="service_management/app_builder/is-disabled.png" alt="The text component is invisible and the button is disabled unless both text input fields have content." style="width:100%;" >}}

#### Disable a component based on the app context

You can also disable a component based on the app context, such as the team that the user is on.

For example, you can enable a component only for users who are in the Product Management team:
1. Click the button component on your canvas.
1. Click the code editor symbol (**</>**) next to the **Is Disabled** property.
1. Add the expression `${global.user.teams[0].name == 'Product Management'}`.

### Disable a component while loading

Another common use case is disabling a component while a query is in a loading state. In the [EC2 Management blueprint][3], the `instanceType` select component is disabled while the `listInstances` query is loading. To accomplish this, the **Is Disabled** property uses the expression `${listInstances.isLoading}`.

{{< img src="service_management/app_builder/isloading.png" alt="The 'instanceType' Select component is disabled while the 'listInstances' query is loading." style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}