---
title: Datadog-PaperTrail Integration
integration_title: PaperTrail
kind: integration
git_integration_title: papertrail
newhlevel: true
doclevel: basic
---
# Overview

![Papertrail example](/static/images/papertrailexample.png)

Use Papertrail and Datadog to:

  * Turn freeform log data into actionable metrics
  * Centralize all text output: syslog, text log files, app hosting platforms (Heroku, Cloud Foundry)
  * Avoid silo-ed operational knowledge. See and correlate log-derived metrics alongside app- and system-level metrics.

# Installation

To capture metrics and events from Papertrail:

1.  In Papertrail's [event viewer](https://papertrailapp.com/tour/viewer), save a search for the log event(s) which should be graphed.
1.  Activate a Papertrail alert for the search.
1.  Provide your Datadog api key.
1.  Set a Metric name.
1.  *(optional)* Specify a set of tags to apply to the metric.

Papertrail will update Datadog every minute.

# Configuration

No configuration steps are required for this integration.

