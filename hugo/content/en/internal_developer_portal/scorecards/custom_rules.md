---
title: Custom rules
description: Create custom Scorecard rules with a DDSQL query, the Scorecards API or Workflow Automation to codify your organization's expectations for software components.
aliases:
  - /tracing/software_catalog/scorecards/custom_rules
  - /tracing/service_catalog/scorecards/custom_rules
  - /service_catalog/scorecards/custom_rules
  - /software_catalog/scorecards/custom_rules
further_reading:
- link: "/internal_developer_portal/catalog/"
  tag: "Documentation"
  text: "Catalog"
- link: /api/latest/service-scorecards/
  tag: "Documentation" 
  text: "Scorecards API" 
- link: "https://www.datadoghq.com/blog/service-scorecards/"
  tag: "Blog"
  text: "Prioritize and promote service observability best practices with Scorecards"
- link: "https://www.datadoghq.com/blog/datadog-custom-scorecards/"
  tag: "Blog"
  text: "Formalize best practices with custom Scorecards"
- link: "/delivery_performance/dora_metrics/"
  tag: "Documentation"
  text: "Track DORA Metrics with Datadog" 
---

Custom rules allow you to codify your organizations' expectations about your software components, teams, and more. You decide the evaluation criteria, frequency, and data input. You can create custom rules by writing a [DDSQL][10] query, or by sending outcomes through the [Scorecards API][2] or through [Datadog Workflow Automation][8]. 


## Create custom rules

To create a custom rule, click **Create Rule** on the Scorecards page. 

1. Specify the name of the rule, the scorecard it belongs to, a rule description, the owning team, which level the rule belongs to, and a scope, if necessary.
2. Under **Define evaluation logic**, choose how Datadog evaluates the rule:
  - **Write a DDSQL Query**: Best for rules that evaluate data available in Datadog. See [Evaluate custom rules using DDSQL](#evaluate-custom-rules-using-ddsql).
  - **Use a Workflow or Scorecards API**: See [Evaluate custom rules using Workflow Automation](#evaluate-custom-rules-using-workflow-automation) and [Evaluate custom rules using the Scorecards API or the UI](#evaluate-custom-rules-using-the-scorecards-api-or-the-ui)

The scope defines which entities a rule applies to. A rule must be scoped to at least one entity kind. For rules that use a workflow or the Scorecards API, specify the scope in the rule form, using metadata from entity definitions in IDP Catalog such as `kind`, `team`, or `tier`. For rules that use DDSQL, define the scope in the query instead. For more information, see [Scope scorecard rules][9].

## Evaluate custom rules using DDSQL 

After you select **Write a DDSQL Query**: 

1. Write your query in the editor. Replace each placeholder in the query template, or copy a complete query from the **Examples** tab in the **DDSQL Help** panel. Use the **Data Sources** tab to view the available data sources and their column.
  - Optionally, click **Ask Bits** to open Bits Chat and draft a query from your prompt.
2. Click **Run Test** to evaluate the query against all entities in scope. You must run a successful test before you can save the rule.
3. Review the results in the **Preview** pane.
4. Save the rule.
5. View the query and an overview of outcomes on the rule page.

{{< img src="tracing/internal_developer_portal/custom_rule_ddsql.png" alt="A custom rule written with DDSQL, evaluating whether a service has docs defined." style="width:100%;" >}}

The query template contains the following: 
```sql
SELECT
  '<entity_kind>' AS entity_kind,
  <entity_key> AS entity_key,
  CASE WHEN <pass_condition> THEN 'pass' ELSE 'fail' END AS state
FROM <source_table>
WHERE <scope_filter>
```

Your query must meet the following reuqirements: 

1. Return an `entity_kind`, an `entity_key`, and a `state` for each entity.
2. Set `state` to `pass`, `fail`, or `skip`.
3. Use the `WHERE` clause to define the scope of the rule.


After you save the rule: 

1. Datadog evaluates the query every four hours.
2. Datadog updates an outcome only if it changed. The **Last Updated** column on the rule page shows the last time an outcome changed.
3. To view the query and when it last ran successfully, see the **Evaluation** section of the rule page. 
4. To edit the query, click **Edit** on the rule page.

<!-- TODO: Add screenshot of evaluation section and outcomes --> 

## Evaluate custom rules using the Scorecards API or the UI

To add and evaluate custom rules using the [Scorecards API][2]: 

1. Specify the name of the rule, the scorecard it belongs to, a rule description, the owning team, which level the rule belongs to, and a scope owner to pass to `/scorecard/rules`.
2. Send an outcome of `pass`, `fail`, or `skip` and an optional remark describing the reason for the outcome for each `{rule, entity}` tuple that you are evaluating to `/scorecard/outcomes/batch`.
3. View an overview of outcomes and remarks in the Scorecards dashboard.

After initial setup, rules can also be enabled or disabled through the API.

To evaluate and add custom rules in the Scorecards UI, after you [create the rule](#create-custom-rules): 

1. Navigate to the rule you created and select **Edit Outcome** next to the entity that you want to evaluate.
2. Select the relevant outcome of `pass`, `fail`, or `skip` and add an optional remark describing the reason for the outcome. 
3. View an overview of outcomes and remarks in the Scorecards dashboard.

{{< img src="/tracing/software_catalog/scorecard-create-and-update-rule-ui.mp4" alt="User creating and evaluating a custom rule in the Scorecards UI" video="true" style="width:90%;" >}}

## Evaluate custom rules using Workflow Automation

Workflow Automation allows you to automate the evaluation of your custom rules in Datadog using the [**Update scorecard rule outcome** action][3]. 

{{< img src="tracing/internal_developer_portal/custom-evaluation-prompt.png" alt="A custom rule side panel, showing two options for evaluating that rule: Add Workflow, and Explore the Scorecards API" style="width:100%;" >}}

### Create workflow 

After creating your custom rule, choose the **Add Workflow** option when prompted to configure its evaluation criteria. From there, you can create a workflow from scratch or use a blueprint.

{{% collapse-content title="From scratch" level="h4" expanded=false id="workflow-from-scratch" %}}

{{< img src="/tracing/software_catalog/scorecards_workflow_example.png" alt="Workflow evaluating whether an entity has a tier defined in Catalog" style="width:90%;" >}}

To create a workflow from scratch: 

1. Set a schedule for your workflow to run on.
1. Click the plus (+) icon to add a step.
1. Select the [**List entity definitions** action][6] to fetch all defined entities from Catalog.
1. Click the plus (+) icon to add a step.
1. Select the [For loop][7] to iterate over each entity one-by-one.
1. Select the action needed to fetch your evaluation data (for example: "List monitors" or "Get repository content" from GitHub). 
1. Transform the returned data using a custom JavaScript function to generate pass/fail outcomes for each entity.
1. Use the [**Update scorecard rule outcome** action][3] to send results to Scorecards.
1. Run the workflow to see your evaluations appear in Scorecards for your custom rule.
1. Publish the workflow; unpublished workflows do not run automatically. 

{{% /collapse-content %}}

{{% collapse-content title="From blueprint" level="h4" expanded=false id="workflow-from-blueprint" %}}

{{< img src="/tracing/internal_developer_portal/start-from-blueprint2.png" alt="'Start from a Blueprint' modal in the Datadog app, showing several tiles with sample Scorecards blueprints" style="width:90%;" >}}

Instead of creating a workflow from scratch, you can start with a Scorecards blueprint: 

1. Explore [Scorecards blueprints][4] and select one. 
1. Edit the blueprint to create your custom workflow. 
   
   **Note**: All Scorecards blueprints include the [**Update scorecard rule outcome** action][3] to send results to Scorecards. Do not delete this step.

1. Run the workflow to see your evaluations appear in Scorecards for your custom rule.
1. Publish the workflow; unpublished workflows do not run automatically. 

{{% /collapse-content %}}

After the workflow is created, it is automatically linked to the Scorecard rule. Click the link to open the workflow, make changes, and view details such as the owner, run history, and last modified date.

{{< img src="tracing/internal_developer_portal/linked-workflow.png" alt="The detailed panel for an individual Scorecard, highlighting the linked workflow automation" style="width:100%;" >}}

All Workflows created from the Scorecards page or from a Scorecards blueprint are automatically tagged with `source: scorecards` for searching and filtering. 

**Note**: Clicking the red unlink button on a Scorecard rule removes the workflow from the rule but does not automatically unpublish the workflow. To prevent evaluations from running, you should also unpublish any unlinked workflows.

### Link existing workflow

After creating your custom rule, choose the **Add Workflow** option to configure its evaluation criteria. Search for and select an existing workflow to link to the rule. 

You can also link an existing workflow to any custom rule that already generates outcomes:
1. Click the custom rule.
1. Select **Link Workflow**.
1. Search for a workflow and select it to link it to the rule.

{{< img src="tracing/internal_developer_portal/link-workflow.png" alt="Detailed panel for an individual custom rule with an arrow highlighting the <b>Link workflow<b> button" style="width:100%;" >}}

## Switch the evaluation method

You can switch a custom rule between DDSQL and a workflow or the Scorecards API. If you switch a rule that has a linked workflow to DDSQL, the linked workflow is removed from the rule. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /internal_developer_portal/scorecards/scorecard_configuration/
[2]: /api/latest/service-scorecards/
[3]: https://app.datadoghq.com/workflow/action-catalog#com.datadoghq.dd/com.datadoghq.dd.software_catalog/com.datadoghq.dd.software_catalog.updateScorecardRuleOutcome
[4]: https://app.datadoghq.com/workflow/blueprints?selected_category=SCORECARDS
[5]: /actions/workflows/build/
[6]: https://app.datadoghq.com/actions/action-catalog#/com.datadoghq.dd.softwarecatalog.listCatalogEntity
[7]: https://app.datadoghq.com/workflow/action-catalog#//com.datadoghq.core.forLoop
[8]: /actions/workflows/
[9]: /internal_developer_portal/scorecards/scorecard_configuration/#scope-scorecard-rules
[10]: /ddsql_reference/ 
