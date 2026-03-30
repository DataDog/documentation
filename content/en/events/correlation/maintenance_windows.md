---
title: Maintenance Windows
aliases:
- /service_management/events/correlation/maintenance_windows/
further_reading:
- link: "service_management/events/correlation/"
  tag: "Documentation"
  text: "Learn about Event Correlation"
---
## Overview
Datadog Event Management supports maintenance windows to suppress case notifications during scheduled system maintenance. A case that matches a maintenance condition and occurs within the maintenance time window will be automatically archived.

## Create a Maintenance Window
<div class="alert alert-danger">You must have Case Management Shared Settings Write (cases_shared_settings_write) permissions. For more information, see [Datadog Role Permissions][1].</div>

To create a Maintenance Window:
1. Navigate to Event Management Settings.
1. Select **Maintenance Windows** next to Case Attributes in the left navigation bar.
1. Click **New Maintenance Window** in the top right.
1. Enter a Maintenance Window name.
1. Set conditions for the cases that should be impacted by this maintenance window using tags or attributes. By default, Event Management cases inherit tags from the alerts they correlate.
1. Select the start and end times for the Maintenance Window.
1. Review Maintenance Window details and Save.

After you save, your Maintenance Window will be added to the Maintenance Window list where you can review its details, update by selecting its row, or delete by selecting the trash icon on the right of the row.

## Sync Maintenance Windows with ServiceNow Changes

To sync Maintenance Windows with ServiceNow Changes so your ServiceNow Changes create, update, or delete case Maintenance Windows:
1. See [Forward change requests to Datadog][2] and follow the steps to ingest ServiceNow Changes.
1. Navigate to Event Management Settings.
1. Select **Maintenance Windows** next to Case Attributes in the left navigation bar.
1. Click **Sync from ServiceNow** in the top right
1. Optionally, define a filter for the ServiceNow changes that should create, update, or delete maintenance windows.
1. Set conditions for the cases that should be impacted by this maintenance window using tags or attributes. You can dynamically reference a value from your ServiceNow changes by prefacing the attribute with “$”.
1. Set the ServiceNow change datetime fields that should be used for maintenance window start and end time.


[1]: https://docs.datadoghq.com/account_management/rbac/permissions/#case_management
[2]: https://docs.datadoghq.com/integrations/servicenow/?tab=changerequesteventforwarding#forward-change-request-events-to-datadog
