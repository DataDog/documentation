---
title: Trace Qualification
aliases:  
further_reading:
- link: "/security/application_security/"
  tag: "Documentation"
  text: "Protect against threats with Datadog App and API Protection"
- link: "/security/application_security/how-it-works//"
  tag: "Documentation"
  text: "How App and API Protection Works"
---

## Overview

App and API Protection (AAP) provides observability into application-level attacks, and evaluates the conditions in which each trace was generated. AAP trace qualification then labels each attack as harmful or safe to help you take action on the most impactful attacks.

Filter by the **Qualification** facet in the AAP [Traces Explorer][1] to view the possible qualification results:

{{< img src="security/application_security/how-it-works/trace_qualification/trace-qualification-traces_2.png" alt="AAP trace list with the qualification facet showing the possible qualification results">}}

## Qualification outcomes

AAP runs qualification rules (closed-source) on every trace. There are four possible qualification outcomes, as listed in the facet menu:

| Qualification result | Description |
|------|-------------|
| Unknown | AAP has qualification rules for this attack, but did not have enough information to make a qualification decision. |
| None successful | AAP determined that attacks in this trace were not harmful. |
| Harmful | At least one attack in the trace was successful. |
| No value | AAP does not have qualification rules for this type of attack. |

### Trace sidepanel

The qualification result can also be seen when viewing the details of an individual trace. </br>
Example of a trace that AAP has qualified as safe:

{{< img src="security/application_security/how-it-works/trace_qualification/trace-none-successful_3.png" alt="AAP trace qualified as safe">}}

Example of a trace that AAP has qualified as harmful:

{{< img src="security/application_security/how-it-works/trace_qualification/trace-harmful_2.png" alt="AAP trace qualified as harmful">}}

[1]: https://app.datadoghq.com/security/appsec/traces
## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

