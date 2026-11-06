---
title: Custom rules
description: Create custom Scorecard rules with a DDSQL query, the Scorecards API, or Workflow Automation to codify your organization's expectations for software components.
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

Custom rules allow you to codify your organizations' expectations about your software components, teams, and more. You decide the evaluation criteria, frequency, and data input. You can create custom rules by writing a [DDSQL][1] query, or by sending outcomes through the [Scorecards API][2] or through [Datadog Workflow Automation][3]. 


## Create custom rules

1. Navigate to the [{{< ui >}}Scorecards{{< /ui >}} page][4] and click {{< ui >}}Create Rule{{< /ui >}}.
2. Specify the name of the rule, the scorecard it belongs to, a rule description, the owning team, which level the rule belongs to, and a scope, if necessary.
3. Under {{< ui >}}Define evaluation logic{{< /ui >}}, choose how Datadog evaluates the rule:
   - {{< ui >}}Write a DDSQL Query{{< /ui >}}: Best for rules that evaluate data available in Datadog. See [Evaluate custom rules using DDSQL](#evaluate-custom-rules-using-ddsql).
   - {{< ui >}}Use a Workflow or Scorecards API{{< /ui >}}: See [Evaluate custom rules using Workflow Automation](#evaluate-custom-rules-using-workflow-automation) and [Evaluate custom rules using the Scorecards API or the UI](#evaluate-custom-rules-using-the-scorecards-api-or-the-ui).

The scope defines which entities a rule applies to. A rule must be scoped to at least one entity kind. For rules that use a workflow or the Scorecards API, specify the scope in the rule form, using metadata from entity definitions in IDP Catalog such as `kind`, `team`, or `tier`. For rules that use DDSQL, define the scope in the query instead. For more information, see [Scope scorecard rules][5].

## Evaluate custom rules using DDSQL 

After you select {{< ui >}}Write a DDSQL Query{{< /ui >}}: 

1. Write your query in the editor. Replace each placeholder in the query template, or copy a complete query from the {{< ui >}}Examples{{< /ui >}} tab in the {{< ui >}}DDSQL Help{{< /ui >}} panel. Use the {{< ui >}}Data Sources{{< /ui >}} tab to view the available data sources and columns.
   - Optionally, click {{< ui >}}Ask Bits{{< /ui >}} to open Bits Chat and draft a query from your prompt.
2. Click {{< ui >}}Run Test{{< /ui >}} to evaluate the query against all entities in scope. You must run a successful test before you can save the rule.
3. Review the results in the {{< ui >}}Preview{{< /ui >}} pane.
4. Click {{< ui >}}Create Rule{{< /ui >}}.
5. View the query and an overview of outcomes on the rule page.

{{< img src="/internal_developer_portal/scorecards/custom_rule_ddsql.png" alt="A custom rule written with DDSQL, evaluating whether a service has docs defined." style="width:100%;" >}}

The query template contains the following: 
```sql
SELECT
  '<entity_kind>' AS entity_kind,
  <entity_key> AS entity_key,
  CASE WHEN <pass_condition> THEN 'pass' ELSE 'fail' END AS state
FROM <source_table>
WHERE <scope_filter>
```

Your query must meet the following requirements: 

- Return an `entity_kind`, an `entity_key`, and a `state` for each entity.
- Set `state` to `pass`, `fail`, or `skip`.
- Use the `WHERE` clause to define the scope of the rule.

After you save the rule, Datadog evaluates the query every 4 hours and updates an outcome only if it changed. The {{< ui >}}Last Updated{{< /ui >}} column on the rule page shows the last time an outcome changed.

On the rule page:

- To view the query and when it last ran successfully, see the {{< ui >}}Evaluation{{< /ui >}} section.
- To edit the query, click {{< ui >}}Edit{{< /ui >}}.

## Evaluate custom rules using the Scorecards API or the UI

To add and evaluate custom rules using the [Scorecards API][2]: 

1. Specify the name of the rule, the scorecard it belongs to, a rule description, the owning team, which level the rule belongs to, and a scope owner to pass to `/scorecard/rules`.
2. Send an outcome of `pass`, `fail`, or `skip` and an optional remark describing the reason for the outcome for each `{rule, entity}` tuple that you are evaluating to `/scorecard/outcomes/batch`.
3. View an overview of outcomes and remarks in the Scorecards dashboard.

After initial setup, rules can also be enabled or disabled through the API.

To evaluate and add custom rules in the Scorecards UI, after you [create the rule](#create-custom-rules): 

1. Navigate to the rule you created and select {{< ui >}}Edit Outcome{{< /ui >}} next to the entity that you want to evaluate.
2. Select the relevant outcome of `pass`, `fail`, or `skip` and add an optional remark describing the reason for the outcome. 
3. View an overview of outcomes and remarks in the Scorecards dashboard.

{{< img src="/tracing/software_catalog/scorecard-create-and-update-rule-ui.mp4" alt="User creating and evaluating a custom rule in the Scorecards UI" video="true" style="width:90%;" >}}

## Evaluate custom rules using Workflow Automation

Workflow Automation allows you to automate the evaluation of your custom rules in Datadog using the [{{< ui >}}Update scorecard rule outcome{{< /ui >}} action][6]. 

### Create workflow 

After creating your custom rule, choose the {{< ui >}}Add Workflow{{< /ui >}} option when prompted to configure its evaluation criteria. From there, you can create a workflow from scratch or use a blueprint.

{{% collapse-content title="From scratch" level="h4" expanded=false id="workflow-from-scratch" %}}

{{< img src="/tracing/software_catalog/scorecards_workflow_example.png" alt="Workflow evaluating whether an entity has a tier defined in Catalog" style="width:90%;" >}}

To create a workflow from scratch: 

1. Set a schedule for your workflow to run on.
1. Click the plus ({{< ui >}}+{{< /ui >}}) icon to add a step.
1. Select the [{{< ui >}}List entity definitions{{< /ui >}} action][7] to fetch all defined entities from Catalog.
1. Click the plus ({{< ui >}}+{{< /ui >}}) icon to add a step.
1. Select the [{{< ui >}}For loop{{< /ui >}}][8] to iterate over each entity one-by-one.
1. Select the action needed to fetch your evaluation data (for example: {{< ui >}}List monitors{{< /ui >}} or {{< ui >}}Get repository content{{< /ui >}} from GitHub). 
1. Transform the returned data using a custom JavaScript function to generate pass/fail outcomes for each entity.
1. Use the [{{< ui >}}Update scorecard rule outcome{{< /ui >}} action][6] to send results to Scorecards.
1. Run the workflow to see your evaluations appear in Scorecards for your custom rule.
1. Publish the workflow; unpublished workflows do not run automatically. 

{{% /collapse-content %}}

{{% collapse-content title="From blueprint" level="h4" expanded=false id="workflow-from-blueprint" %}}

Instead of creating a workflow from scratch, you can start with a Scorecards blueprint: 

1. Explore [Scorecards blueprints][9] and select one. 
1. Edit the blueprint to create your custom workflow. 
   
   **Note**: All Scorecards blueprints include the [{{< ui >}}Update scorecard rule outcome{{< /ui >}} action][6] to send results to Scorecards. Do not delete this step.

1. Run the workflow to see your evaluations appear in Scorecards for your custom rule.
1. Publish the workflow; unpublished workflows do not run automatically. 

{{% /collapse-content %}}

After the workflow is created, it is automatically linked to the Scorecard rule. Click the link to open the workflow, make changes, and view details such as the owner, run history, and last modified date.

{{< img src="/internal_developer_portal/scorecards/linked-workflow.png" alt="The detailed panel for an individual Scorecard, highlighting the linked workflow automation" style="width:100%;" >}}

All Workflows created from the {{< ui >}}Scorecards{{< /ui >}} page or from a Scorecards blueprint are automatically tagged with `source: scorecards` for searching and filtering. 

**Note**: Clicking the red unlink button on a Scorecard rule removes the workflow from the rule but does not automatically unpublish the workflow. To prevent evaluations from running, you should also unpublish any unlinked workflows.

### Link existing workflow

After creating your custom rule, choose the {{< ui >}}Add Workflow{{< /ui >}} option to configure its evaluation criteria. Search for and select an existing workflow to link to the rule. 

You can also link an existing workflow to any custom rule that already generates outcomes:
1. Click the custom rule.
1. Select {{< ui >}}Link Workflow{{< /ui >}}.
1. Search for a workflow and select it to link it to the rule.

## Switch the evaluation method

You can switch a custom rule between DDSQL and a workflow or the Scorecards API. If you switch a rule that has a linked workflow to DDSQL, the linked workflow is removed from the rule. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ddsql_reference/
[2]: /api/latest/service-scorecards/
[3]: /actions/workflows/
[4]: https://app.datadoghq.com/software/scorecards
[5]: /internal_developer_portal/scorecards/scorecard_configuration/#scope-scorecard-rules
[6]: https://app.datadoghq.com/workflow/action-catalog#com.datadoghq.dd/com.datadoghq.dd.software_catalog/com.datadoghq.dd.software_catalog.updateScorecardRuleOutcome
[7]: https://app.datadoghq.com/actions/action-catalog#/com.datadoghq.dd.softwarecatalog.listCatalogEntity
[8]: https://app.datadoghq.com/workflow/action-catalog#//com.datadoghq.core.forLoop
[9]: https://app.datadoghq.com/workflow/blueprints?selected_category=SCORECARDS
