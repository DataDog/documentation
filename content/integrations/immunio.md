---
aliases: []
description: Collect data from Immunio to visualize and monitor attack patterns.
git_integration_title: immunio
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-Immunio Integration
---

{{< img src="integrations/immunio/immunio_dash.png" alt="Immunio Dashboard" responsive="true" >}}

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
    {{< img src="integrations/immunio/immuniosetup1.png" alt="Integration Setup Page" responsive="true" >}}
1.  Click "Add an API Key".
    {{< img src="integrations/immunio/immuniosetup2.png" alt="Add API Key" responsive="true" >}}
1.  Add your API key.

### Configuration

No configuration steps are required for this integration.

### Validation

To validate your installation and configuration, restart the agent and execute the info command. The output should contain a section similar to the following:

```shell
Checks
======
  [...]
  immunio
  -----
      - instance #0 [OK]
      - Collected 4 metrics & 0 events
```

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The IMMUNIO integration does not include any event at this time.

### Service Checks
The IMMUNIO integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

