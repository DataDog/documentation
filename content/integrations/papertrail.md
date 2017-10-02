---
title: Datadog-PaperTrail Integration
integration_title: PaperTrail
kind: integration
git_integration_title: papertrail
newhlevel: true
doclevel: basic
---

{{< img src="integrations/papertrail/papertrailexample.png" style="max-width:600px;" alt="Papertrail example" >}}

## Overview

Use Papertrail and Datadog to:

  * Turn freeform log data into actionable metrics
  * Avoid silo-ed operational knowledge. See and correlate log-derived metrics alongside app- and system-level metrics.

## Setup
### Installation

To capture metrics from Papertrail:

1.  In Papertrail's [event viewer](https://papertrailapp.com/events), save a search for the log event(s) which should be graphed.
1.  Enter the name for the search and click the **Save & Setup an Alert** button.
1.  Choose Datadog under Graphing & Metrics.

    {{< img src="integrations/papertrail/papertrailnotify.png" style="max-width:500px;" alt="Papertrail notifications" >}}

1.  Choose your alert frequency and other details.
1.  Provide your Datadog API key, enter what you want to name your metric, and optionally enter some tags to associate with the metric.

    {{< img src="integrations/papertrail/papertraildetails.png" style="max-width:500px;" alt="Papertrail notifications" >}}

1.  Click the **Create Alert** button.

Papertrail will update Datadog at your chosen interval.

### Configuration

No configuration steps are required for this integration.

