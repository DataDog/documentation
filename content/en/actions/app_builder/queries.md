---
title: Queries
description: Populate apps with data from Datadog APIs and integrations using queries that connect UI components with backend actions.
aliases:
- /app_builder/queries
disable_toc: false
aliases:
    - /service_management/app_builder/queries
further_reading:
- link: "/service_management/app_builder/build/"
  tag: "Documentation"
  text: "Build Apps"
---

Queries populate your app with data from Datadog APIs or supported integrations. They take inputs from other queries or from UI components and return outputs for use in other queries or in UI components.

The [Action Catalog][10] within the Datadog App provides actions that can be performed as queries against your infrastructure and integrations using App Builder. You can orchestrate and automate your end-to-end processes by linking together actions that perform tasks in your cloud providers, SaaS tools, and Datadog accounts.

To add a query, click the Data (**{&nbsp;}**) icon to open the Data tab, click the plus (**+**), select **Query**, and search for an action to add to your app. After you've added the query action, it appears in the **Actions** List. Select a query to configure it.

Queries rely on [Connections][5] for authentication. App Builder shares connections with [Workflow Automation][6].

## Run settings

**Run Settings** determine when a query is executed. There are two options:

- **Auto**: The query runs when the app loads and whenever any query arguments change.
- **Manual**: The query runs when another portion of the app triggers it. For example, use a manual trigger if you want a query to execute only when a user clicks a UI button component. For more information on event triggers, see [Events][11].

## Advanced query options

### Debounce

Configuring debounce ensures that your query is only triggered once per user input. By default, debounce is set to `0` milliseconds (ms). To prevent a query from being called too frequently, increase the debounce. Configure debounce in the **Advanced** section of a query.

### Conditional queries

You can set a condition that must be met before a query can run. To set the condition for a query, enter an expression in the **Condition** field in the **Advanced** section of the query. This condition must evaluate to true before the query can run. For example, if you want a given query to run only if a UI component named `select0` exists and is not empty, use the following expression:

{{< code-block lang="js" >}}${select0.value && select0.value.length > 0}{{< /code-block >}}

### Post-query transformation

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

### Post-query hooks

Similar to UI component events, you can configure a reaction to trigger after a query executes. A **post-query hook** can set a UI component state, open or close a modal, trigger another query, or even run custom JavaScript. For example, the [ECS Task Balancer][7] blueprint's `scaleService` query uses a post-query hook to rerun the `describeService` query after it executes.

You can use [state functions][12] in post-query hooks.

### Error notifications

To display a toast (a brief notification message) to the user when the system returns an error, toggle **Show Toast on Errors** in the **Advanced** section of a query.

### Confirmation prompts

To prompt a user for confirmation before the query runs, toggle the **Requires Confirmation** option in the **Advanced** section of a query.

### Polling intervals

To run a query repeatedly at a set interval while the app is open on someone's screen, enter the interval in milliseconds (ms) as the **Polling interval** in the **Advanced** section of a query.

**Note**: The query does not run in the background; it only runs when someone has the app open.

## Mocked outputs

Sometimes when you are building or testing an app in the editor, you might want to avoid executing a real query, or avoid executing the same query repeatedly. When you enable **Mocked outputs** and run your query, App Builder populates outputs with mocked data instead of running the query action.

You can generate mocked outputs from a previous query run or provide them manually.

### Generate outputs from previous run

To generate mocked output data from a previous query run, perform the following steps:

1. Add a query and fill out the rest of your query's parameters.
1. Click **Run** to execute your query once.
1. In the **Mocked outputs** section of the query, click the **Generate** tab.
1. Click **Generate from outputs**. This automatically toggles **Use Mocked Outputs** on.<br>
    The **Run** button changes to say **Run (Mocked)**, and the next time you run your query, the output populates with the mocked data.

### Provide outputs manually

To provide mocked outputs manually, perform the following steps:

{{% collapse-content title="Using the GUI" level="p" %}}
1. Add a query and fill out the rest of your query's parameters.
1. In the **Mocked outputs** section of the query, click the **GUI** tab.
1. Fill in all required fields, which the GUI view automatically displays.
1. Optionally, to add additional fields, click **+ (plus)**. Choose a key from the dropdown and fill in a value. If you want to enter a value that is an object or an array, click the **{}** or **[]**, respectively, after the **Enter value** field.
{{% /collapse-content %}}

{{% collapse-content title="Using JSON" level="p" %}}
1. Add a query and fill out the rest of your query's parameters.
1. In the **Mocked outputs** section of the query, click the **JSON** tab.
1. Paste in JSON that matches the expected output format of the query.<br>
    If you do not know the expected output format, you can run the query once and then reference `outputs` in the **Inspect Data** section of the query.
{{% /collapse-content %}} 


## Order of operations

When executing a query, App Builder performs the following steps in the order listed:

1. Checks if there is a **Condition** expression for the query, and if so, checks that the condition is met. If it is not, execution stops.
2. Evaluates any expressions in **Inputs** to determine the input data for the query.
3. If the **Debounce** property is set, delays execution for the interval defined by the debounce value. If query inputs or their dependencies update during this time, the current query execution is stopped, and a new one starts from the beginning using the updated inputs.<br>
   **Note**: If more than one query request occurs within the debounce interval, all requests except the last execution request are canceled.  
4. Executes the query.
5. Stores the raw query response in `query.rawOutputs`.  
6. Runs any post query transformation and sets `query.outputs` equal to the result. This process takes a snapshot of app data and passes it to the post query transformation.<br>
   **Note**: Post query transformations should be pure functions without side effects. For example, do not update a state variable in your post query transformation.
7. Computes any expressions in the app that depend on data from the query output.
8. Runs all **Reactions** from the app's **Events**, in the order in which they are defined in the UI. This involves taking a snapshot of the app which is used throughout the reaction's run. A new snapshot is taken before each reaction runs, and changes made by a previous reaction are visible to a subsequent reaction.
9. If there is a **Polling interval** set, schedules the query to re-run the defined number of milliseconds in the future.


## Example apps

### Return workflow results to an app
App Builder queries can trigger Workflow Automation workflows. Apps can then use the results of those workflows.

This app provides a button to trigger a workflow. The workflow sends a poll to a Slack channel asking the user to pick from one of two options. Based on the option the user chooses, the workflow issues one of two different HTTP GET requests, which then returns data that is displayed in the app.

{{< img src="service_management/app_builder/workflow-trigger-from-app.mp4" alt="Clicking Trigger Workflow polls Slack then returns a random cat or dog fact" video="true" width="70%">}}

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
    ```javascript
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

1. In your app, click the Data (**{&nbsp;}**) icon, click the plus (**+**), and select **Query**.
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

### Combine and transform query output data
After you get data from a query in App Builder, you can use data transformers to combine and transform that data.

This app provides buttons to fetch facts about two numbers from an API. It then uses a data transformer to calculate and display the sum of the two numbers.

{{< img src="service_management/app_builder/data-transformer.mp4" alt="Clicking each button fetches a new number fact, and the sum of the two numbers updates along with the facts" video="true" width="70%">}}

{{% collapse-content title="Build the app" level="h4" %}}

##### Create queries

1. In a new app, click the Data (**{&nbsp;}**) icon to open the Data tab.
1. Click the plus (**+**), then select **Query**. Search for "Make request" and choose the **HTTP Make request** action.
1. Use the following values:
    * **Name**: `mathFact1`
    * Under **Inputs**, for **URL**: GET `http://numbersapi.com/random/trivia`
1. Click the **+ (plus)** to add another **HTTP Make request** query. Use the following values:
    * **Name**: `mathFact2`
    * Under **Inputs**, for **URL**: GET `http://numbersapi.com/random/trivia`

##### Add data transformer

1. Click the **Σ (sigma)** to open the **Transformers** panel.
1. Click **+ Create Transformer**.
1. Name the transformer `numberTransformer`. Under **Inputs**, under **function () {**, enter the following:
    ```javascript
    // get both random facts
    const fact1 = mathFact1.outputs.body;
    const fact2 = mathFact2.outputs.body;

    // parse the facts to get the first number that appears in them
    const num1 = fact1.match(/\d+/)[0];
    const num2 = fact2.match(/\d+/)[0];

    // complete arithmetic on the numbers to find the sum
    const numSum = Number(num1) + Number(num2)

    return numSum
    ```

##### Create app canvas components

1. In the app canvas, add a button and fill in the label "Generate fact 1".
1. Under the button's **Events**, use the following values:
    * **Event**: click
    * **Reaction**: Trigger Query
    * **Query**: mathFact1
1. Add another button and fill in the label "Generate fact 2".
1. Under the button's **Events**, use the following values:
    * **Event**: click
    * **Reaction**: Trigger Query
    * **Query**: mathFact2
1. Add a text element under the first button. For its **Content** property, click the **</>** and enter the expression `${mathFact1.outputs.body}`.
1. Add a text element under the second button. For its **Content** property, click the **</>** and enter the expression `${mathFact2.outputs.body}`.
1. Add a text element with the **Content** value "Sum of numbers".
1. Add a text element next to it. For its **Content** property, click the **</>** and use the expression `${numberTransformer.outputs}`.


##### Test app

1. In your app, click **Preview**.
1. Click **Generate fact 1**, then click **Generate fact 2**.<br>
    Your app updates the number facts and the sum of the numbers as you click each button.

{{% /collapse-content %}} 


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#app-builder** channel on the [Datadog Community Slack][8].

[5]: /service_management/workflows/connections
[6]: /service_management/workflows
[7]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ecs_task_manager
[8]: https://datadoghq.slack.com/
[10]: https://app.datadoghq.com/actions/action-catalog/
[11]: /service_management/app_builder/events
[12]: /service_management/app_builder/events/#state-functions