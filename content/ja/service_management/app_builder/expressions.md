---
title: JavaScript Expressions
kind: documentation
further_reading:
- link: /service_management/app_builder/build/
  tag: Documentation
  text: Build Apps
- link: /service_management/app_builder/components/
  tag: Documentation
  text: Components
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">App Builder is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

You can use JavaScript (JS) expressions anywhere in App Builder to create custom interactions between the different parts of your app. As you type an expression, App Builder offers autocomplete suggestions based on the existing queries and components in your app. Click on an autocomplete suggestion to use it in your expression, or use the arrow keys on your keyboard and make a selection with the Enter key.

Some fields, like [post-query transformation][1], display a code editor by default and accept plain JS. In all other fields, enclose your JS expressions in `${}`. For example, to interpolate the values of two text input components named `textInput0` and `textInput1` into the **Content** property of a text component (and add an exclamation mark), use the expression `${textInput0.value} ${textInput1.value}!`.

{{< img src="service_management/app_builder/interpolation.png" alt="The text component fills with the words 'Hello' and 'World', each interpolated from a text input component value" style="width:100%;" >}}

App Builder accepts standard vanilla JavaScript syntax, with the following caveats:
- The result of the expression must match the result expected by the component or query property. For example, the text component's **Is Visible** property expects a Boolean. To find out what type of data a component property expects, see [View component properties](#view-component-properties).
- Your code has read-only access to the app state, but App Builder executes the code in a sandboxed environment with no access to the Document Object Model (DOM) or browser APIs.

## View component properties

Before you create an expression, it's helpful to know the available properties and defaults or current values for the component you want to interact with.

You can view the available properties and values for a component in the following ways:
- **App State**: Provides properties and values for all components and queries in your app, as well as global variables such as state variables or dashboard template variables.
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

## Custom component interactions

Most UI components provide built-in options, such as toggles and text alignment, that cover basic app usage. To add a custom interaction to a component, click the code editor symbol (**</>**) and enter a JS expression.

### Conditional visibility

You can make the visibility of a component dependent on other components.

For example, if you want a text component to be visible only when two text input components named `textInput0` and `textInput1` have values, use the expression `${textInput0.value && textInput1.value}` in the **Is Visible** property.

### Disable a component conditionally

Similar to visibility, you can disable a component unless conditions are met by other components in your app.

For example, if your app has a button that uses the content from a text component to send a message, you can disable the button unless the text component is visible:
1. Click the button component on your canvas.
1. Click the code editor symbol (**</>**) next to the **Is Disabled** property.
1. Add the expression `${!text0.isVisible}`.

The text component is invisible and the button is disabled unless both text input fields have content.

{{< img src="service_management/app_builder/is-disabled.png" alt="The text component is invisible and the button is disabled unless both text input fields have content." style="width:100%;" >}}

### Disable a component while loading

Another common use case is disabling a component while a query is in a loading state. In the [EC2 Instance Manager blueprint][3], the `instanceType` select component is disabled while the `listInstances` query is loading. To accomplish this, the **Is Disabled** property uses the expression `${listInstances.isLoading}`.

{{< img src="service_management/app_builder/isloading.png" alt="The 'instanceType' Select component is disabled while the 'listInstances' query is loading." style="width:100%;" >}}

## Custom query interactions

Similar to components, you can use JS expressions to alter your queries based on user interaction.

### Filter query results on user input

The [PagerDuty On-call Manager blueprint][4] filters the result of the `listSchedules` query based on input from the user. The user selects a team and user from the `team` and `user` select components.

Inside the `listSchedules` query, the following post-query transformation filters the results based on the values of `team` and `user`:

{{< code-block lang="js" disable_copy="true" >}}
return outputs.body.schedules.map( s => {
    return {
        ...s,
        users: s.users.map(u => u.summary),
        teams: s.teams.map(u => u.summary)
    }
}).filter(s => {

        const matchesName = !name.value.length ? true : s.name.toLowerCase().includes(name.value.toLowerCase());
        const matchesTeam = team.value === 'Any Team' ? true : s.teams.includes(team.value);
        const matchesUser = user.value === 'Any User' ? true : s.users.includes(user.value);

        return matchesName && matchesUser && matchesTeam ;
    }) || []
{{< /code-block >}}

Setting the query's **Run Settings** to **Auto** allows the query to run each time a user changes a value in the `team` or `user` components.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/app_builder/build/#post-query-transformation
[3]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ec2_instance_manager
[4]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=pagerduty_oncall_manager
