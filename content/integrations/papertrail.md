---
title: Datadog-PaperTrail Integration
integration_title: PaperTrail
kind: integration
git_integration_title: papertrail
newhlevel: true
doclevel: basic
---

# Overview

Use Papertrail and Datadog to:

  * Turn freeform log data into actionable metrics
  * Centralize all text output: syslog, text log files, app hosting platforms (Heroku, Cloud Foundry)
  * Avoid silo-ed operational knowledge. See and correlate log-derived metrics alongside app- and system-level metrics.

# Installation

_To capture metrics from Papertrail logs:_

  1. In Papertrail's [event viewer](https://papertrailapp.com/tour/viewer), save a search for the log event(s) which should be graphed.
  2. Activate a Papertrail alert for the search. Provide your Datadog credentials. Papertrail will update Datadog every minute.
