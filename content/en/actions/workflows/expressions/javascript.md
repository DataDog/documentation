---
title: JavaScript Expressions
description: Capabilities and limits of JavaScript expressions in App Builder
code_lang: javascript
type: multi-code-lang
code_lang_weight: 10
---

You can use JavaScript (JS) expressions anywhere in App Builder to create custom interactions between the different parts of your app. As you begin an expression, App Builder offers autocomplete suggestions based on the existing queries and components in your app. Click on an autocomplete suggestion to use it in your expression, or use the arrow keys on your keyboard and make a selection with the Enter key.

{{< img src="service_management/app_builder/app-builder-variable.png" alt="If you're not sure what to enter as an expression, type ${ to open a suggestion menu with all available expressions" style="width:70%;" >}}

Some fields, like [post-query transformation][1], display a code editor by default and accept plain JS. In all other fields, enclose your JS expressions in `${}`. For example, to interpolate the values of two text input components named `textInput0` and `textInput1` into the **Content** property of a text component (and add an exclamation mark), use the expression `${textInput0.value} ${textInput1.value}!`.

{{< img src="service_management/app_builder/interpolation-2.png" alt="The text component fills with the words 'Hello' and 'World', each interpolated from a text input component value" style="width:70%;" >}}

App Builder accepts standard vanilla JavaScript syntax, with the following caveats:
- The result of the expression must match the result expected by the component or query property. For example, the text component's **Is Visible** property expects a Boolean. To find out what type of data a component property expects, see [View component properties](#view-component-properties).
- Your code has read-only access to the app state, but App Builder executes the code in a sandboxed environment with no access to the Document Object Model (DOM) or browser APIs.

You can also use Bits AI to work with JS expressions:
   1. Click the **Build with AI** icon (**<i class="icon-bits-ai"></i>**).
   1. Enter a custom prompt, or try the prompt `How can you help me with JavaScript expressions?`.

## Custom query interactions

Similar to components, you can use JS expressions to alter your queries based on user interaction.

### Filter query results on user input

The [PagerDuty On-call Schedules blueprint][4] filters the result of the `listSchedules` query based on input from the user. The user selects a team and user from the `team` and `user` select components.

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

[1]: /actions/app_builder/queries/#post-query-transformation
[3]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ec2_instance_manager
[4]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=pagerduty_oncall_manager