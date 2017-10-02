---
title: Datadog-Immunio Integration
integration_title: Immunio
kind: integration
doclevel: basic
newhlevel: true
git_integration_title: immunio
---

{{< img src="integrations/immunio/immunio_dash.png" alt="Immunio Dashboard" >}}

## Overview

Connect IMMUNIO's advanced application security monitoring with Datadog to visualize the impact Attacks have on your web application, and monitor IMMUNIO's automatic protection.

IMMUNIO monitors your applications to detect and defend against all of the following:

* Account Takeover attacks like Brute Force, Credential Stuffing, etc.,
* Code-level attacks like XSS, SQLi, and Remote Command Execution,
* Custom business-level attacks like credit card fraud and other abuse,
* General bad behaviour like scanning and scraping.

## Setup
### Installation

1.  Login to [your IMMUNIO account](http://www.immun.io/).
1.  Navigate to the [integrations setup page](https://dashboard.immun.io/#/settings/integrations).
    {{< img src="integrations/immunio/immuniosetup1.png" alt="Integration Setup Page" >}}
1.  Click "Add an API Key".
    {{< img src="integrations/immunio/immuniosetup2.png" alt="Add API Key" >}}
1.  Add your API key.

### Configuration

No configuration steps are required for this integration.

### Validation

To validate your installation and configuration, restart the agent and execute the info command. The output should contain a section similar to the following:

{{< highlight shell>}}
Checks
======
  [...]
  immunio
  -----
      - instance #0 [OK]
      - Collected 4 metrics & 0 events
{{< /highlight >}}

## Data Collected
### Metrics

{{< get-metrics-from-git >}}

### Events

No events are included with this integration.

