---
title: Trace Qualification
kind: documentation
aliases:  
further_reading:
- link: "/security/application_security/"
  tag: "Documentation"
  text: "Protect against threats with Datadog Application Security Management"
---

## Overview

Application Security Management (ASM) continuously processes every trace your application generates, which contains an attack attempt. It can be hard to manually assess every individual trace for impact.

This is where trace qualification comes in - ASM will evaluate the conditions in which each trace was generated, and - when possible - label it as harmful or safe.

For example, a service that doesn't use SQL databases can not be harmed with a SQL injection. For this service, ASM will qualify SQL injection attacks as unsuccessful (*None successful* in the user interface).

## Possible qualification outcomes

{{< img src="security/application_security/threats/trace_qualification/trace-qualification-traces.png" alt="ASM trace list with the qualification facet showing the possible qualification results">}}

There are four types of qualification outcomes and you can use the facet menu to find the corresponding traces:

| Qualification result | Description |
|------|-------------|
| `Unknown` | ASM has qualification rules for this attack, but did not have enough information to make a qualification decision. |
| *No value* | ASM does not have qualification rules for this type of attack. |
| `None successful` | ASM determined that no attacks in this trace could be harmful. |
| `Harmful` | At least one attack in the trace was successful. |


### Trace sidepanel

The qualification result can also be seen when opening an individual trace. For example, this is what a safe trace looks like:

{{< img src="security/application_security/threats/trace_qualification/trace-none-successful.png" alt="ASM trace qualified as safe">}}

This is what a harmful trace looks like:

{{< img src="security/application_security/threats/trace_qualification/trace-harmful.png" alt="ASM trace qualified as harmful">}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

