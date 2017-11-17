---
aliases: []
description: Monitor zone changes and track queries per second by zone or record.
git_integration_title: dyn
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-Dyn Integration
---

{{< img src="integrations/dyn/dyn_overview.png" alt="Dyn Overview" responsive="true" >}}

## Overview

Monitor your zones with advanced graphs and events.

* Keep track of the changes made when a zone is updated
* Analyze the QPS made by zone or record type thanks to advanced graphing tools

## Setup
### Configuration 

If you have not created a 'datadog' read-only user on Dyn yet, please go [HERE](https://manage.dynect.net/login/) and follow these instructions:

1. Choose a username and a password   
{{< img src="integrations/dyn/create_dyn_user.png" alt="Create dyn user" style="width:75%;" responsive="true" >}}

2. Select the 'READONLY' user group 
{{< img src="integrations/dyn/choose_dyn_group.png" alt="Choose dyn group" style="width:75%;" responsive="true" >}}

3. Click on 'Add New User'

Once you have created a Datadog Read only user:

4. Configure your [Dyn integration](https://app.datadoghq.com/account/settings#integrations/dyn) inside your Datadog application.
{{< img src="integrations/dyn/dyn_integration.png" alt="Dyn Integration" style="width:75%;" responsive="true" >}}

5. Select the zones (*Zone notes*) that you wish to collect events and the `dyn.changes` metric from:<br>

{{< img src="integrations/dyn/dyn_zone.png" alt="Dyn zone" style="width:75%;" responsive="true" >}}

**Dyn “QPS” metrics are collected by default for all zones**,

<div class="alert alert-info">
IP ACLs must be disabled for the Dyn integration.
</div>

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The Dyn integration does not include any event at this time.

### Service Checks
The Dyn integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
