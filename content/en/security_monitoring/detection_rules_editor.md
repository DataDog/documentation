---
title: Security Detection Rules
kind: documentation
further_reading:
- link: "/security_monitoring/explorer"
  tag: "Documentation"
  text: "Search through all of your security signals and perform Security Analytics"
- link: "https://www.datadoghq.com/blog/announcing-security-monitoring/"
  tag: "Blog"
  text: "Security Monitoring"
---

## Overview

A Security Detection Rule generates a signal when at least one case defined in the rule is matched over a given period of time.

## Security Detection Rule Creation

To create a [Security Rule][1] in Datadog, use the main navigation: *Security → Detection Rules --> New Rule*.

### Define the search queries

1. Each query has a label which is a lowercase ASCII letter and is not user controllable.
2. Construct a search query using the same logic as a [log explorer search][2].
3. Define the alert grouping (optional). **Note**: The defined grouping is used to reduce the number of signals generated. The group by is also used to join the queries together.  
4. Additional queries can be added by clicking the *Add Query* button. 


### Define the rule cases
1. The rule cases are evaluated as case statements. Thus, the first case to match generates the signal. The case number signifies the ordering.
2. A rule case contains logical operations (`>, <, >=, <=, &&, ||, !`) to determine if a signal should be generated based on the event counts in the previously defined queries. The ASCII lowercase query labels are referenced in this section. 
3. Each rule case must provide a “name”. This name will be appended to the rule name when a signal is generated. 
4. “Status” represents the severity of the security signal. The dropdown allows you to select an appropriate severity level for each case. 
5. The “Notify your team” section allows you to configure zero or more notification target for each rule case. 
6. Additional cases can be added by clicking the *Add Case* button. 
7. A time window is specified to match when at least one of the cases matches true. This is a sliding window and evaluates in real time. 
8. Once a signal is generated, the signal will remain “open”, if a case is matched at least once within this specified time. Each time a new event matches the case, the “last updated” timestamp will be updated for the signal. 
9. A signal will “close” regardless of the query being matched once this time threshold is met. This time is calculated from the time the signal is generated. 



{{< img src="" alt="" responsive="true" style="width:60%;" >}}




### Security Signal Message
1. The “Preview” button allows you to visualize your markdown message.
2. The “Edit” button allows you to edit your markdown formatted message.
3. The “Rule name” allows you to configure the rule name which will appear in the rules list view and as the title of the signal when it is generated. 
4. The content editor allows you to write markdown which will be displayed in the Signa Explorer Panel. 
5. You can tag your rules with different tags such as MITRE ATT&CK Tactics and Techniques.. The following tag is used for classification and formatting purposes
* Security:{tag-name} define the classification of the signal (ex: attack, anomaly, compliance, threat-intel). 





## Further Reading 
{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/monitors#create/log
[2]: /logs/explorer/search
