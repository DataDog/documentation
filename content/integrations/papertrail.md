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
{: style="max-width:600px;"}

Use Papertrail and Datadog to:

  * Turn freeform log data into actionable metrics
  * Avoid silo-ed operational knowledge. See and correlate log-derived metrics alongside app- and system-level metrics.

# Installation

To capture metrics from Papertrail:

1.  In Papertrail's [event viewer](https://papertrailapp.com/events), save a search for the log event(s) which should be graphed.
1.  Enter the name for the search and click the **Save & Setup an Alert** button.
1.  Choose Datadog under Graphing & Metrics.

    ![Papertrail notifications](/static/images/papertrailnotify.png)
    {: style="max-width:500px;"}

1.  Choose your alert frequency and other details.
1.  Provide your Datadog API key, enter what you want to name your metric, and optionally enter some tags to associate with the metric.

    ![Papertrail notifications](/static/images/papertraildetails.png)
    {: style="max-width:500px;"}

1.  Click the **Create Alert** button.

Papertrail will update Datadog at your chosen interval.

# Configuration

No configuration steps are required for this integration.

