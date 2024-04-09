---
title: Configurate Correlation
kind: Documentation
further_reading:
- link: "service_management/events/correlation/triage_and_notify"
  tag: "Documentation"
  text: "Learn about triaging and notifiying on cases"
- link: "service_management/events/correlation/analytics"
  tag: "Documentation"
  text: "Analytics on cases"
---

## Overview

We offer two types of correltions, pattern-based and intelligent (private beta). 

- Pattern-based you control how the events/alerts are correlated, though the information available within them. 
- Intelligent uses a ML modeling approach, where based on the underlying telemetry gathered within Datadog, and other heuristics, we automatically correlate on your behalf, without the need for any configuration. 


### Configure Correlation

{{< whatsnext desc=" " >}}
   {{< nextlink href="service_management/events/correlation/patterns" >}}Pattern-based correlation{{< /nextlink >}}
   {{< nextlink href="service_management/events/correlation/intelligent" >}}Intelligent correlation{{< /nextlink >}}
{{< /whatsnext >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}