---
title: Datadog-Dyn Integration
integration_title: Dyn
kind: integration
doclevel: basic
git_integration_title: dyn
---

{{< img src="integrations/dyn/dyn_overview.png" alt="Dyn Overview" >}}

## Overview

Monitor your zones with advanced graphs and events.

* Keep track of the changes made when a zone is updated
* Analyze the QPS made by zone or record type thanks to advanced graphing tools

## Configuration 

If you have not created a 'datadog' read-only user on Dyn yet, please go [HERE](https://manage.dynect.net/login/) and follow these instructions:


1. Choose a username and a password   
{{< img src="integrations/dyn/create_dyn_user.png" alt="Create dyn user" style="width:50%;" >}}

2. Select the 'READONLY' user group 
{{< img src="integrations/dyn/choose_dyn_group.png" alt="Choose dyn group" style="width:50%;">}}

3. Click on 'Add New User'

Once you have created a Datadog Read only user:

4. Configure your [Dyn integration](https://app.datadoghq.com/account/settings#integrations/dyn) inside your Datadog application.
{{< img src="integrations/dyn/dyn_integration.png" alt="Dyn Integration" style="width:75%;" >}}

5. Select your zones you want to monitor:
{{< img src="integrations/dyn/dyn_zone.png" alt="Dyn zone" style="width:50%;" >}}

**Note**: IP ACLs must be disabled for the Dyn integration.
## Metrics

{{< get-metrics-from-git >}}