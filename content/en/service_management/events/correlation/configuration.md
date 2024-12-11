---
title: Configuration
further_reading:
- link: "service_management/events/correlation/triage_and_notify"
  tag: "Documentation"
  text: "Learn about triaging and notifiying on cases"
- link: "service_management/events/correlation/analytics"
  tag: "Documentation"
  text: "Analytics on cases"
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
Event Correlation is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).
</div>
{{% /site-region %}}

## Overview

There are two types of correlations: 

- **Pattern-based**: you control how the events are correlated. Datadog also automatically enriches your pattern-based correlation with intelligent alerts powered by ML model.
- **Intelligent**: uses a ML modeling approach, where Datadog automatically correlates on your behalf, without the need for any configuration. You can optionally filter the scope of events considered for intelligent correlation.


### Configure Correlation

{{< whatsnext desc=" " >}}
   {{< nextlink href="service_management/events/correlation/patterns" >}}Pattern-based correlation{{< /nextlink >}}
   {{< nextlink href="service_management/events/correlation/intelligent" >}}Intelligent correlation{{< /nextlink >}}
{{< /whatsnext >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
