---
title: Custom rules
aliases:
  - /tracing/service_catalog/scorecards/custom_rules
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Service Catalog"
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

{{< img src="/tracing/service_catalog/scorecard-create-and-update-rule-ui.mp4" alt="User creating and evaluating a custom rule in the Scorecards UI" video="true" style="width:90%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /service_catalog/scorecards/scorecard_configuration/
[2]: /api/latest/service-scorecards/


