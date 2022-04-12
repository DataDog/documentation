---
title: Security Signal Management
kind: documentation
---
## Overview

With Cloud SIEM and CWS Security Signal Management, users with the `Security Signals Write` permission can take action on security signal detections generated within the previous two days, such as change state, and view signal action history in the Audit Log. Within the signal explorer, users can use dedicated facets to filter signals that have been acted upon and view high-level information about actions within a row. After you take action on a signal, you can see your activity in the Audit Log.

Security signals can be viewed and managed by navigating to **Security** > **Security Signals** > selecting a Cloud SIEM or CWS signal, and taking actions through the header in the side panel view.

## Role-based access control for security signal management

Learn more about Datadog’s default roles [in the RBAC docs][1] and granular role-based access control permissions available for the Cloud Security Platform [in the Cloud Security RBAC docs][2].

To modify the signal state, enable the “Security Signals Write” permission for each user. 

## View and respond to Security Signals

If Datadog detects a threat based on any rules, it creates a security signal. You can view all security signals in the Signal Explorer, making it easy to search, filter, and correlate them without needing to learn a dedicated query language. You can either monitor signals from the Datadog Cloud Security Platform, or you can configure [Notification Rules][3] to send signals to third-party tools. The status of a signal can be one of the following:
* **Open**: The Datadog Cloud Security Platform triggered a detection based on a rule, and the resulting signal is not resolved.
* **Under Review**: During an active investigation, you can switch the signal state to Under Review. You can move the signal state to Archived or Open from the Under Review state as needed.
* **Archived**: When you resolve the detection that caused the signal, you can transition it to the **Archived** state. If an archived issue resurfaces, or if further investigation is necessary, a signal can be changed back to an open state within two days of being created.

When you take action on a signal, a confirmation toast appears that allows you to **Undo** the action. You'll see it in a banner above the signal side panel when you save the action. The banner shows the action taken, by who, and when.

## View signal actions in the Security Signal Explorer

The Security Signal Explorer displays all signals that your role permits you to view. After selecting **Security Signals**, filter the signals as follows:

* Add the column **Signal State** by selecting the **Options** button in the top right corner above the table and adding the following facet: `@workflow.triage.state`. This displays signal status and allows for sorting by status through the header.
* To search through signals by state, use the following search syntax `@workflow.triage.state:` and include the desired state to filter on in the query.
* Select the **Signal State** facet on the facet panel to filter on signals using facets.

## Signal management and triage

To change signal state, follow the instructions below:

1. In Datadog, select Security from the main navigation menu on the left, and select Security Signals from the menu.
2. Select a Log Detection or Workload Security Signal from the table.
3. Navigate to the top-right corner of the Signal Side Panel and select your desired status from the dropdown menu. The default status is **Open**.

    - **Open**: The Datadog Cloud Security Platform triggered a detection based on a rule, and the resulting signal is not yet resolved.
    - **Under Review**: During an active investigation, you can switch the signal state to **Under Review**. From the **Under Review** state, you can move the signal state to **Archived** or **Open** as needed.
    - **Archived**: When the detection that caused the signal has been resolved, you can transition it to the **Archived** state. If an archived issue resurfaces, or if further investigation is necessary, a signal can be changed back to an open state within two days of being created.

4. Once you save the status, a confirmation toast appears that states which action was taken with the opportunity to “Undo” the action. You'll see it in a banner above the signal side panel when you save the action. The banner shows the action taken, by who, and when.

## Audit logs for security signal actions

As an administrator or security team member, you can use the [Audit Logs][4] (Public Beta) to see what actions your team is taking against Security Signals within Datadog. As an individual, you can see a stream of your own actions, too.
Signal action history retention is on the set Audit Log [retention][5]. The default retention period for an audit log is seven days. You can set a retention period between three and 90 days.
The Audit Log Explorer displays all signal actions taken. Navigate to Organization Settings and select Audit Logs Settings under Security.

To exclusively show Audit Logs generated by actions taken in the Cloud Security Platform:
* Use the following search syntax @evt.name:"Security Monitoring" 
* Select the "Security Monitoring" facet under the "Event Name" facet.





[1]: /account_management/rbac/?tab=datadogapplication#pagetitle
[2]: /account_management/rbac/permissions/#cloud-security-platform
[3]: /security_platform/notification_rules/
[4]: /account_management/audit_logs/#overview
[5]: /account_management/audit_logs/#retention
