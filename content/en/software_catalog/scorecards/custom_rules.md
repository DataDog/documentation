---
title: Custom rules
aliases:
  - /tracing/software_catalog/scorecards/custom_rules
  - /tracing/service_catalog/scorecards/custom_rules
further_reading:
- link: "/tracing/software_catalog/"
  tag: "Documentation"
  text: "Software Catalog"
- link: /api/latest/service-scorecards/
  tag: "Documentation" 
  text: "Scorecards API" 
- link: "https://www.datadoghq.com/blog/service-scorecards/"
  tag: "Blog"
  text: "Prioritize and promote service observability best practices with Scorecards"
- link: "https://www.datadoghq.com/blog/datadog-custom-scorecards/"
  tag: "Blog"
  text: "Formalize best practices with custom Scorecards"
- link: "/continuous_integration/dora_metrics/"
  tag: "Documentation"
  text: "Track DORA Metrics with Datadog" 
---

{{< callout url="#" btn_hidden="true" header="false" >}}
Scorecards are in Preview.
{{< /callout >}}

Datadog provides [default rules][1] so you can get started quickly with Scorecards, but you can also create custom rules.

## Create custom rules

To add and evaluate custom rules using the [Scorecards API][2]: 

1. Specify the name of the rule, the scorecard it belongs to, a rule description, and an owner to pass to `/scorecard/rules`.
2. Send an outcome of `pass`, `fail`, or `skip` for each `{rule, service}` tuple that you are evaluating to `/scorecard/outcomes/batch`.
3. View an overview of outcomes and remarks in the Scorecards dashboard.

After initial setup, rules can also be enabled or disabled through the API. 


To evaluate and add custom rules in the Scorecards UI: 

1. Click **Create Rule** on the Scorecards page.
2. Specify the name of the rule, the scorecard it belongs to, a rule description, and the owning team.
3. Navigate to the rule you created and select **Edit Outcome** next to the service that you want to evaluate.
4. Select the relevant outcome of `pass`, `fail`, or `skip` and add an optional remark describing the reason for the outcome. 
5. View an overview of outcomes and remarks in the Scorecards dashboard.

{{< img src="/tracing/software_catalog/scorecard-create-and-update-rule-ui.mp4" alt="User creating and evaluating a custom rule in the Scorecards UI" video="true" style="width:90%;" >}}

## Evaluate custom rules using Workflow Automation

Workflow Automation allows you to automate the evaluation of your custom rules in Datadog using the [**Update scorecard rule outcome** action][3]. To set up a custom rule evaluation, create a Workflow from scratch or use one of the [Scorecards blueprints][4]. 

{{< img src="/tracing/software_catalog/scorecards_workflow_example.png" alt="Workflow evaluating whether a service has a tier defined in Software Catalog" style="width:90%;" >}}

To set up a custom rule evaluation using Workflow Automation: 

1. Create a custom rule in Scorecards.
2. [Create a Workflow][5].
3. Set a schedule for your Workflow to run on.
4. Click plus (+) icon to add a step.
5. Use the [**List service definitions** action][6] to fetch all defined services from Software Catalog.
6. Insert a [For loop][7] to iterate over each service one-by-one.
7. Select the action needed to fetch your evaluation data.
8. Transform the returned data using a custom JavaScript function to generate pass/fail outcomes for each service.
9. Use the [**Update scorecard rule outcome** action][3] to send results to Scorecards.
10. Run the Workflow and see your evaluations populate in Scorecards for your custom rule. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /software_catalog/scorecards/scorecard_configuration/
[2]: /api/latest/service-scorecards/
[3]: https://app.datadoghq.com/workflow/action-catalog#com.datadoghq.dd/com.datadoghq.dd.software_catalog/com.datadoghq.dd.software_catalog.updateScorecardRuleOutcome
[4]: https://app.datadoghq.com/workflow/blueprints?selected_category=SCORECARDS
[5]: /service_management/workflows/build/
[6]: https://app.datadoghq.com/workflow/action-catalog#com.datadoghq.dd/com.datadoghq.dd.software_catalog/com.datadoghq.dd.software_catalog.listServiceDefinitions
[7]: https://app.datadoghq.com/workflow/action-catalog#//com.datadoghq.core.forLoop
