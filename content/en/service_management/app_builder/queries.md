---
title: Queries
aliases:
- /app_builder/queries
disable_toc: false
further_reading:
- link: "/service_management/app_builder/build/"
  tag: "Documentation"
  text: "Build Apps"
---


Queries populate your app with data from Datadog APIs or supported integrations. They take inputs from other queries or from UI components and return outputs for use in other queries or in UI components.

The [Action Catalog][10] within the Datadog App provides actions that can be performed as queries against your infrastructure and integrations using App Builder. You can orchestrate and automate your end-to-end processes by linking together actions that perform tasks in your cloud providers, SaaS tools, and Datadog accounts.

To add a query, click the plus (**+**) icon in the **Queries** section and search for an action to add to your app. After you've added the query action, it appears in the query list above the query editor. Click and drag queries to reorder them. Select a query to configure it.

Queries rely on [Connections][5] for authentication. App Builder shares connections with [Workflow Automation][6].

## Run settings

**Run Settings** determine when a query is executed. There are two options:

- **Auto**: The query runs when the app loads and whenever any query arguments change.
- **Manual**: The query runs when another portion of the app triggers it. For example, use a manual trigger if you want a query to execute only when a user clicks a UI button component. For more information on event triggers, see [Events][11].

## Debounce

Configuring debounce ensures that your query is only triggered once per user input. By default, debounce is set to `0` milliseconds (ms). To prevent a query from being called too frequently, increase the debounce. Configure debounce in the **Advanced** section of a query.

## Conditional queries

You can set a condition that must be met before a query can run. To set the condition for a query, enter an expression in the **Condition** field in the **Advanced** section of the query. This condition must evaluate to true before the query can run. For example, if you want a given query to run only if a UI component named `select0` exists and is not empty, use the following expression:

{{< code-block lang="js" >}}${select0.value && select0.value.length > 0}{{< /code-block >}}

## Post-query transformation

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

## Post-query hooks

Similar to UI component events, you can configure a reaction to trigger after a query executes. A **post-query hook** can set a UI component state, open or close a modal, trigger another query, or even run custom JavaScript. For example, the [ECS Task Manager][7] blueprint's `scaleService` query uses a post-query hook to rerun the `describeService` query after it executes.

## Error notifications

To display a toast (a brief notification message) to the user when the system returns an error, toggle **Show Toast on Errors** in the **Advanced** section of a query.

## Confirmation prompts

To prompt a user for confirmation before the query runs, toggle the **Requires Confirmation** option in the **Advanced** section of a query.

## Example app

### Return workflow results to an app
App Builder queries can trigger Workflow Automation workflows. Apps can then use the results of those workflows.

This app provides a button to trigger a workflow. The workflow sends a poll to a Slack channel asking the user to pick from one of two options. Based on the option the user chooses, the workflow issues one of two different HTTP GET requests, which then returns data that is displayed in the app.

{{< img src="service_management/app_builder/workflow-trigger-from-app.mp4" alt="Clicking Trigger Workflow polls Slack then returns a random cat or dog fact" video="true" width="486px">}}

{{% collapse-content title="Build the app" level="h4" %}}

##### Create workflow

1. In a new workflow canvas, under **Datadog Triggers**, click **App**. 
1. Under the **App** trigger step, click the plus (**+**) icon, then search for "Make a decision" and select the **Make a decision** Slack action.
1. Select your workspace and choose a channel to poll.
1. Fill in the prompt text "Cat fact or dog fact?" and change the button choices to "Cat fact" and "Dog fact".
1. Under the **Make a decision** step in the canvas, click the plus (**+**) icon above **Cat fact** and add the **Make request** HTTP action.
1. Name the step "Get cat fact". Under **Inputs**, for the **URL**, keep **GET** selected and enter the URL `https://catfact.ninja/fact`.
1. Under the **Make a decision** step in the canvas, click the plus (**+**) icon above **Dog fact**. Follow the same steps to add the **Make request** HTTP action, but this time name the step "Get dog fact" and use the following parameters:
    * **URL**: `https://dogapi.dog/api/v2/facts`.
    * **Request Headers**: `Content-Type` of `application/json`
1. Click the plus (**+**) icon under the cat fact step. Search for "Function" and choose the **Function** data transformation step.
1. Connect the plus (**+**) icon under the dog fact step to this **JS Function** step by clicking and dragging from the plus to the dot that appears above the JS Function step.
1. In the JS Function, under **Configure**, for **Script**, use the following code snippet:
    ```
    const catFact = $.Steps.Get_cat_fact?.body?.fact;
    const dogFactRaw = $.Steps.Get_dog_fact?.body;

    let dogFact;

    try {
        const parsedDogFact = JSON.parse(dogFactRaw);
        dogFact = parsedDogFact.data?.[0]?.attributes?.body;
    } catch {
        // Do nothing
    }

    return catFact != null ? catFact : dogFact;
    ```
1. In the workflow overview, under **Output Parameters**, add a parameter named `output` with the value `{{ Steps.Function.data }}` and the Data Type `string`.
1. Name your workflow "My AB Workflow", then save and publish the workflow.

##### Create app

To connect App Builder to the workflow, perform the following steps:

1. In your app, under **Queries**, click **+ New Query**.
1. Search for "Trigger Workflow" and select the **Trigger Workflow** Datadog Workflow Automation item.
1. Set **Run Settings** to Manual and name the query `triggerWorkflow0`.
1. Under **Inputs**, for **App Workflow**, select **My AB Workflow**.
1. Click **Run** to run the workflow, then go to your Slack channel and answer the poll question. This gives App Builder example data to display.
1. Add a text component. Under **Content**, enter the expression `${triggerWorkflow0?.outputs?.workflowOutputs?.output}`.
1. Add a button component. Use the following values:
    * **Label**: "Trigger Workflow"
    * **Is Loading**: `${triggerWorkflow0.isLoading}` (click **</>** to enter an expression)
1. Under the button's **Events**, click the plus (**+**) to add an event. Use the following values:
    * **Event**: click
    * **Reaction**: Trigger Query
    * **Query**: `triggerWorkflow0`
1. Save your app.

##### Test app

1. In your app, click **Preview**.
1. Click the **Trigger Workflow** button.
1. In the Slack channel you selected, answer the poll question.<br>
    Your app displays a result related to the option you chose.
{{% /collapse-content %}} 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#app-builder** channel on the [Datadog Community Slack][8].

[5]: /service_management/workflows/connections
[6]: /service_management/workflows
[7]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ecs_task_manager
[8]: https://datadoghq.slack.com/
[10]: https://app.datadoghq.com/app-builder/action-catalog
[11]: /service_management/app_builder/events