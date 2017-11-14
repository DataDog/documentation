---
title: How to use the Monitor Template Variables ?
kind: faq
customnav: monitornav
---

Monitoring offers you different templating options, either based on the tags related to your Monitor scope, or related to conditional Events. 

This FAQ will focus on the various conditional template variables. 

You can also view this article to create template variables based on your scope [here](/monitors/faq/how-do-i-add-custom-template-variables-to-my-monitor-message)
 

## {{comparator}}


The `{{comparator}}` template variable's value is always a relational operator. It will correlate to the relational value selected in the monitor's "Set alert conditions" section:

{{< img src="monitors/faq/monitor_template_variable.png" alt="monitor_template_variable" responsive="true">}}


For example, when an alert set to trigger when a value rises "above" 50, this syntax:

```
{{value}} {{comparator}} {{threshold}}
```

would yield a notification message like the following:

    51.47 > 50


## {{is_match}}


The `{{is_match}}` template variable is defined in our monitoring guide as well. 

This template variable allows you to trigger an alert based on the tags defined in your scope.

 The variable uses the following format:

``` 
{{#is_match "tag_variable" "comparison_string"}}
	This will show if comparison_string is in tag_variable.
{{/is_match}}
```  
 


## {{is_recovery}} or {{is_alert_recovery}} ? 


`{{is_recovery}}` will trigger and a monitor recovers indifferently either from a WARNING state or an ALERT state. 
`{{is_alert_recovery}}` will trigger when a monitor recovers directly from an ALERT state to OK state. 
`{{is_warning_recovery}}` will trigger when a monitor recovers from a WARNING state to OK state. 
 

This means that if the monitor switches from ALERT to WARNING then OK state:

- the `{{is_recovery}}` would trigger
- the `{{is_alert_recovery}}` wouldn't trigger 
- the `{{is_warning_recovery}}` would trigger. 

The @ notification inside the template variables will follow the same rules. 