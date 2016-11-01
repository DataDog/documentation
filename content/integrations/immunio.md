---
title: Datadog-Immunio Integration
integration_title: Immunio
kind: integration
doclevel: basic
newhlevel: true
git_integration_title: immunio
---
# Overview

![Immunio Dashboard](/static/images/immunio_dash.png)

Connect IMMUNIO's advanced application security monitoring with Datadog to visualize the impact Attacks have on your web application, and monitor IMMUNIO's automatic protection.

IMMUNIO monitors your applications to detect and defend against all of the following:

* Account Takeover attacks like Brute Force, Credential Stuffing, etc.,
* Code-level attacks like XSS, SQLi, and Remote Command Execution,
* Custom business-level attacks like credit card fraud and other abuse,
* General bad behaviour like scanning and scraping.

# Installation

1.  Login to [your IMMUNIO account](http://www.immun.io/).
1.  Navigate to the [integrations setup page](https://dashboard.immun.io/#/settings/integrations).
    ![Integration Setup Page](/static/images/immuniosetup1.png)
1.  Click "Add an API Key".
    ![Add API Key](/static/images/immuniosetup2.png)
1.  Add your API key.

# Configuration

No configuration steps are required for this integration.

# Validation

To validate your installation and configuration, restart the agent and execute the info command. The output should contain a section similar to the following:


    Checks
    ======
      [...]
      immunio
      -----
          - instance #0 [OK]
          - Collected 4 metrics & 0 events

# Metrics

<%= get_metrics_from_git()%>

# Events

No events are included with this integration.

