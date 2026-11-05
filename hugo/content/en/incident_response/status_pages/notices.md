---
title: Notices
description: Publish degradations and schedule maintenance windows to communicate service impact on a status page.
further_reading:
- link: "/incident_response/status_pages/"
  tag: "Documentation"
  text: "Datadog Status Pages"
---

Notices are messages published to a status page to communicate system status. Status Pages support two types of notices: **degradations** for unplanned service impact and **maintenance windows** for planned downtime.

{{< img src="incident_response/status_pages/select_notice_type_status_page.png" alt="Status page notice type selector with degradation and scheduled maintenance options" style="width:60%;" >}}

## Publish a degradation

{{< img src="incident_response/status_pages/shopist_status_page_degradations2.png" alt="Example status page showing service components experience degradation" style="width:100%;" >}}

Degradation notices communicate **unplanned service impact**, such as incidents or service disruptions. Use degradation notices to keep users informed as an issue is investigated, mitigated, and resolved.

From a status page, click **Publish Notice** and select **Degradation**, then provide:

| Field | Description |
| ---- | ---- |
| **Notice title** | Short, clear description of the issue <br>*Example: Increased error rates in US region* |
| **Status** | Current state of the issue: <br>- Investigating <br>- Identified <br>- Monitoring <br>- Resolved |
| **Message** | Additional details for your users <br>*Example: We are aware of the issue and are actively working on a fix.* |
| **Components impacted** | One or more components affected by the degradation |
| **Impact** | Impact level per component: <br>- Operational <br>- Degraded Performance <br>- Partial Outage <br>- Major Outage |
| **Notify subscribers** | Toggle to send updates to subscribed users. Email also requires the page-level [**Notify subscribers**][1] setting. |

{{< img src="incident_response/status_pages/publish_status_page_degradation_1.png" alt="Example publish notice modal for degradations" style="width:60%;" >}}

After a degradation notice is reviewed and published, it:
- Appears on the **Status Pages List** under Active Notices.
- Updates the uptime bars for impacted components. Components set to **Partial Outage** or **Major Outage** also have their uptime percentage reduced for the duration of the impact.
- Is visible in the notice history timeline.

You can publish updates over time and mark the notice as **Resolved** when the issue is fully mitigated.

**Note**: Each status page supports a maximum of 100 active (unresolved) degradations at a time.

## Backfill a degradation

Backfilled degradations allow you to retroactively document service disruptions that were not previously announced. Each update can be assigned its original timestamp, so the incident timeline appears accurately in your uptime history.

From a status page, select the dropdown next to **Publish Notice**, select **Publish Backfilled Notice** > **Degradation**, then provide:

| Field | Description |
| ---- | ---- |
| **Notice title** | Short, clear description of the incident <br>*Example: Increased error rates in US region* |
| **Updates** | Exactly two timestamped updates representing the start and end of the degradation. Each update requires a started at timestamp, status (Investigating or Resolved), description, and affected components. |

{{< img src="incident_response/status_pages/publish_status_page_backfill_degradation.png" alt="Example publish backfilled notice modal for degradations" style="width:60%;" >}}

## Edit a degradation update

After publishing a degradation update, you can edit its status and message to correct typos, fix an inaccurate status selection, or clarify the description. To edit an update, open the degradation notice on the status page, hover over the update you want to modify, and click the edit icon that appears. Make your changes in the **Edit Update** modal.

{{< img src="incident_response/status_pages/edit_degradation_update.png" alt="Edit Update modal showing Notice Status options and a Message field" style="width:60%;" >}}

Only the **Notice Status** and **Message** fields can be edited. To resolve the notice or update affected components, add a new update instead. Click **Save Changes** to apply the edits.

## Delete a degradation update

To delete an update posted by mistake, open the degradation notice on the status page, hover over the update you want to delete, and click the delete icon that appears. Confirm in the **Delete Update** modal.

{{< img src="incident_response/status_pages/delete_degradation_update.png" alt="Delete Update confirmation modal" style="width:60%;" >}}

Deleting an update replaces it on the timeline with a note indicating it was deleted by the page administrator. This action cannot be undone.

## Schedule a maintenance window

{{< img src="incident_response/status_pages/shopist_maintenance_example.png" alt="Example status page showing service components undergoing maintenance" style="width:100%;" >}}

Maintenance windows allow you to proactively communicate planned downtime or service impact before it happens. Unlike degradations which are used for unplanned incidents, maintenance windows are scheduled in advance for infrastructure upgrades, system maintenance, database migrations, and other planned work. This allows you to keep customers informed and reduce support volume.

From the status page, click **Schedule Maintenance**, or click **Publish Notice** and select **Scheduled Maintenance**. Then, provide the following details:

| Field | Description |
| ---- | ---- |
| **Notice title** | Clear description of the maintenance activity <br>*Example: Database infrastructure upgrade* |
| **Maintenance window** | Scheduled start and end time for the maintenance |
| **Messages** | Messages that are automatically published as the maintenance progresses |
| **Components impacted** | Components affected during the maintenance window |
| **Notify subscribers** | Toggle to send advance notification to subscribers. Email also requires the page-level [**Notify subscribers**][1] setting. |

{{< img src="incident_response/status_pages/publish_status_page_maintenance.png" alt="Example publish notice modal for maintenance windows" style="width:60%;" >}}

After reviewing and scheduling, the maintenance window:
- Appears under **Upcoming Maintenance** on the status page
- Automatically updates component status to **Maintenance** when the window begins
- Returns components to **Operational** when the window ends (unless manually overridden)

You can post updates if plans change or reschedule the maintenance window as needed.

**Note**: Each status page supports a maximum of 100 scheduled or in-progress maintenance windows at a time.

## Cancel a maintenance window

To cancel a scheduled maintenance window before it starts, open the maintenance notice, click the three-dot icon, and select **Cancel Maintenance**. Confirm the cancellation in the dialog that appears.

{{< img src="incident_response/status_pages/cancel-maintenance-window.png" alt="Cancel Maintenance confirmation dialog for a scheduled maintenance window" style="width:60%;" >}}

Canceling a maintenance window removes it from **Upcoming Maintenance** on the status page. This action cannot be undone.

**Note**: An in-progress maintenance window can't be canceled.

## Backfill a maintenance window

Backfilled maintenance windows allow you to retroactively document planned downtime that was not previously announced. Each update can be assigned its original timestamp, so the maintenance timeline appears accurately in your uptime history.

From a status page, select the dropdown next to **Publish Notice**, select **Publish Backfilled Notice** > **Scheduled Maintenance**, then provide:

| Field | Description |
| ---- | ---- |
| **Notice title** | Clear description of the maintenance activity <br>*Example: Database infrastructure upgrade* |
| **Updates** | Exactly two timestamped updates representing the start and end of the maintenance window. Each update requires a started at timestamp, status (In Progress or Completed), description, and affected components. |

{{< img src="incident_response/status_pages/publish_status_page_backfill_maintenance.png" alt="Example publish backfilled notice modal for maintenance windows" style="width:60%;" >}}

## Edit a maintenance update

After publishing a maintenance update, you can edit its message to correct typos or clarify the description. To edit a past update, open the maintenance notice on the status page, hover over the update you want to modify in the timeline, and click the edit icon that appears. Make your changes in the **Edit Update** modal.

{{< img src="incident_response/status_pages/edit_maintenance_update.png" alt="Edit Update modal showing a Message field for a past maintenance update" style="width:60%;" >}}

Only the **Message** field can be edited. Click **Save Changes** to apply the edits.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/status_pages/subscriptions/#enable-email-subscriptions
