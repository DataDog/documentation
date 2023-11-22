---
title: Build Apps
kind: documentation
aliases:
- /app_builder/build
disable_toc: false
further_reading:
- link: "/service_management/workflows/actions_catalog/"
  tag: "Documentation"
  text: "Actions Catalog"
---

{{< callout url="https://www.datadoghq.com/dg/datadog-app-builder/" btn_hidden="false" header="Join the Beta!">}}
Datadog App Builder is in private beta. Complete the form to request access.
{{< /callout >}}

You can create an app or edit existing apps from the [App Builder][1] page. The page lists information about existing apps:
- The author
- The status
- The dates that each app was last modified
- Whether the app is published

On the App Builder page, access and filter your apps:
- Hover over an app for the options to edit, delete, view, or clone the app.
- Toggle **My apps** if you want to see only apps that you created.

{{< img src="service_management/app_builder/app_builder_page.png" alt="The App Builder page" style="width:100%;" >}}

## Create an app

### Build an app from a blueprint

Blueprints are helpful starter apps. They cover common use cases and come loaded with demo data that you can use to familiarize yourself with the app.

1. Click the [**Blueprints**][2] tab.
1. Find the blueprint you want to use, and click **Preview**.
1. Click **Use Blueprint** to open the app blueprint.
1. To change the app name and description, click the app name.
1. Each blueprint template comes loaded with demo data. You can begin customizing the app immediately by editing the **Connection** for each query.
1. To save the app, click **Save as New App**.
1. To preview the app, click **Preview**. Click **Edit** from the preview screen to return to the configuration view.
1. After you finish modifying the app, Click **Run** to test it.
1. When you're ready to publish your app, click **Publish**. Publishing an app makes it available to your dashboards.

[1]: https://app.datadoghq.com/app-builder/

### Create a starter app with AI

If you're not sure where to start, describe your app to the App Builder AI and let it create a starter app for you.

1. From [App Builder][1], click **New App**.
1. Click the AI button.
1. Enter a detailed description for your app. Specify the integrations, actions, and UI components you want the app to use.
1. Click the up arrow (**&#8593;**) to create your app.

{{< img src="/service_management/app_builder/app-builder-ai.png" alt="Generate a starter app with AI" style="width:100%;" >}}

### Create a custom app

1. From [App Builder][1], click **New App**.
1. To change the app name and description, click the app name.
1. To add a [UI component](#app-canvas-and-components) to the app canvas, select it or drag it onto the canvas.
1. Use [queries](#queries) to populate or interact with your canvas.
1. To save the app, click **Save as New App**.
1. To preview the app, click **Preview**. Click **Edit** from the preview screen to return to the configuration view.
1. After you finish modifying the app, Click **Run** to test it.
1. When you're ready to publish your app, click **Publish**. Publishing an app makes it available to your dashboards.

## Customize your app

Apps are made up of UI components and queries, which interact with each other to form the user experience and logic behind each app. The query list and editor appear on the left side of the page, while the app canvas and UI components make up the right side of the page.

Basic customization:
- To edit the **Name**, **Description**, or the **Canvas Color** of your app, click the app name at the top left.
- Click the **Preview** button to preview your app. Preview mode allows you to view the app from the user's perspective. Use preview mode to interact with the app UI and test your queries. When you're done, click **Edit** to return to the app builder.
- To save your app, click **Save**.
- When you're ready to publish your app, click **Publish**. Publishing an app makes it available to your dashboards.

### App canvas and components

The app canvas represents the graphical interface that your users interact with. Selecting a component adds it to the canvas. Alternatively, you can add components or move them around on the canvas by dragging and dropping. To see all available components, click **All Components**.

Each component features a list of corresponding configuration options that control how users interact with your app. For example, the **Text Input** component allows you to set a default value, placeholder text, and a label. The **Button** component includes a label and an event to trigger when pressed. Components also feature an **Appearance** section that changes the way the components look and act. For example, you can disable a button or control its visibility.

To delete or duplicate a component, select the component and click the three dot ellipsis (*...*) to display the **Delete** or **Duplicate** options.

Available UI components:
- Button
- Callout value
- Checkbox
- Container
- Date range picker
- JSON input
- Modal
- Number input
- Radio
- Search
- Select
- Table
- Text
- Text input

#### Events

UI components can trigger reactions on an **Event**. The event triggers differ according to the component. For example, a button component can trigger on a click event, and a table component event can trigger on a page change or table row click.

An event can set a UI component state, open or close a modal, trigger another query, or even run custom JavaScript.

For example, the [GitHub PR summarizer][4] blueprint uses a **Summarize** button with an event that triggers on a click. The event uses the **Trigger Query** reaction which runs the `summarizePulls` query.

#### Dynamic table values

Similar to [post-query transformation](#post-query-transformation), the table UI component allows you to customize the data source for the table. You can use the **Data Source** field to dynamically fill table values and constrain which objects are pulled into the table as columns.

For example, the [GitHub PR Summarizer][4] blueprint uses a series of GitHub queries to summarize a list of pull requests in a repository. The query uses the data source entry below to constrain the table to 6 columns: `title`,`Summary`,`updated_at`,`user`,`html_url`, and `state`. The highlighted code dynamically populates the user column for each pull request with the author's avatar and GitHub username.

{{< highlight js "hl_lines=17" >}}
${(() => {
    const summaryById = Object.fromEntries(
        summarizePulls.outputs.map(({id, summary}) => [id, summary])
    );
    return listPulls.outputs.map(result => {
        const {title, updated_at, user, state, html_url} = result;
        const updatedAt = new Date(result.updated_at);
        let summary;
        if (summarizePulls.isLoading) {
            summary = 'Summarizing';
        } else {
            summary = summaryById[result.id] ?? 'N/A';
        }
        return {
            title: `**${title}**`,
            updated_at: updatedAt.toLocaleString(),
            user: {label: user.login, src: user.avatar_url},
            summary,
            state, html_url};
    })
})()}
{{< /highlight >}}

In the table, the **User** column fills with an avatar and GitHub username for each PR author.

### Queries

Queries allow you to populate your app with data from Datadog APIs or a supported integration. Queries take inputs from other queries or from UI components, and return outputs for use in other queries or UI components.

To add a query, click the plus (**+**) icon in the **Queries** section and search for a query to add to your app. After you've added a query, it appears in the query list above the query editor. Click and drag queries to reorder them. Select a query to configure it.

Queries rely on [Connections][5] for authentication. App Builder shares connections with [Workflow Automation][6].

#### Run settings

**Run Settings** determine when a query is executed. There are two options:

- **Auto**: The query runs when the app loads and whenever any query arguments change.
- **Manual**: The query runs when another portion of the app triggers it. For example, use a manual trigger if you want a query to execute only when a user clicks a UI button component. For more information on event triggers, see [Events](#events).

#### Debounce

Configuring debounce ensures that your query is only triggered once per user input. By default, debounce is set to `0` milliseconds (ms). To prevent a query from being called too frequently, increase the debounce. Configure debounce in the **Advanced** section of a query.

#### Conditional queries

You can set a condition that must be met before a query can run. To set a query, enter an expression in the **Condition** field in the **Advanced** section of the query. The condition must evaluate to true before the query runs. For example, if you want a given query to run only if a UI component named `select0` exists and is not empty, use the expression:

{{< code-block lang="js" >}}${select0.value && select0.value.length > 0}{{< /code-block >}}

#### Post-query transformation

Perform a post-query transformation to simplify or transform the output of a query. Add a post-query transformation in the **Advanced** section of a query.

For example, the Slack _List Channels_ action returns an array of dictionaries containing the ID and name for each channel. To discard the IDs and return only an array of names, add the following query transformation:

{{< code-block lang="js" collapsible="false" >}}
// Use `outputs` to reference the query's unformatted output.
// TODO: Apply transformations to the raw query output
arr = []
object = outputs.channels
for (var item in object) {
    arr.push(object[item].name);
}

return arr
{{< /code-block >}}

#### Post-query hooks

Similar to UI component events, you can configure a reaction to trigger after a query executes. A **post-query hook** can set a UI component state, open or close a modal, trigger another query, or even run custom JavaScript. For example, the [ECS Task Manager][7] blueprint's `scaleService` query uses a post-query hook to rerun the `describeService` query after it executes.

#### Error notifications

To display a toast (a brief message notification) to the user when the system returns an error, toggle **Show Toast on Errors** in the **Advanced** section of a query.

#### Confirmation prompts

To prompt a user for confirmation before the query runs, toggle the **Requires Confirmation** option in the **Advanced** section of a query.

### Variables

Use app variables to pass data from one part of your app to another. Additionally, you can use app variables to pass in data from your dashboard using [dashboard template variables][3].

Variables are enclosed in braces, preceded by a dollar sign (`${}`). To use a variable, enter the query or UI component name and access the child fields using dot notation. For example, if you have a select component named `select0` and you want to access its default value field, use the syntax `${select0.defaultValue}`. If you're not sure what to enter as a variable, type `${` to open a suggestions menu with all available variables.

{{< img src="service_management/app_builder/app-builder-variable.mp4" alt="If you're not sure what to enter as a variable, type ${ to open a suggestions menu with all available variables" video=true >}}

### Customize an app with JSON

To edit an app with JSON, click the cog (settings) icon, and select **Switch to JSON**. The **Switch to GUI** option in the settings menu takes you back to the GUI editor.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/app-builder/apps/
[2]: https://app.datadoghq.com/app-builder/blueprints
[3]: /service_management/app_builder/embedded_apps
[4]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[5]: /service_management/workflows/connections
[6]: /service_management/workflows
[7]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ecs_task_manager