---
title: Security Signal Management
kind: documentation
further_reading:
- link: "/cloud_siem/default_rules"
  tag: "Documentation"
  text: "Explore default detection rules"
- link: "https://www.datadoghq.com/blog/detect-abuse-of-functionality-with-datadog/"
  tag: "Blog"
  text: "Detect Abuse of Functionality with Datadog"
- link: "https://www.datadoghq.com/blog/impossible-travel-detection-rules/"
  tag: "Blog"
  text: "Detect suspicious login activity with impossible travel detection rules"
---
## Overview

With Cloud SIEM and CWS Security Signal Management, users with the “Security Signals Write” permission can take action on security signal detections generated within the last two days, such as change state, and view signal action history in the Audit Log. Within the signal explorer, users can use dedicated facets to filter signals that have been acted upon, as well as view high level information about actions within a row. After signals have actions taken against them, activity is captured in the Audit Log.

Security signals can be viewed and managed by navigating to Security > Security Signals > selecting a Cloud SIEM or CWS signal, and taking actions through the header in the side panel view.

## Role-based access control for security signal management
Learn more about Datadog’s default roles [here](https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication#pagetitle) and granular role-based access control permissions available for the Cloud Security Platform [here](https://docs.datadoghq.com/account_management/rbac/permissions/#cloud-security-platform).

In order to modify signal state, the “Security Signals Write” permission to be enabled for the user. The Datadog Admin and Standard roles allow signal modification by default, while users with the Datadog Read Only Role do not have access to edit within Datadog’s Cloud Security Platform.

## View and eespond to security signals
If Datadog detects a threat based on any rules, it creates a security signal. You can view all security signals in the Signal Explorer, making it easy to search, filter, and correlate them without needing to learn a dedicated query language. You can either monitor signals from the Datadog Cloud Security Platform or you can configure [Notification Rules](https://docs.datadoghq.com/security_platform/notification_rules/) to send Signals to Third-Party Tools. The status of a signal can be one of the following:
* **Open–** The Datadog Cloud Security Platform triggered a detection based on a rule and the resulting signal is not yet resolved.
* **Under Review–** During an active investigation, a user can switch the signal state to Under Review. From the Under Review state, the user can move the signal state to Resolved or Open as needed.
* **Resolved–** When the detection that caused the signal has been resolved, users can transition it to the Resolved state. If a resolved issue resurfaces, or if further investigation is necessary, a signal can be changed back to an open state within two days of being created.

When an action is taken on a signal, a confirmation toast appears that allows the user to "Undo" the action. When an action is saved, it is reflected in a banner above the signal side panel showing which user took the action, at what time it was performed and what action was taken.

## View signal actions in the Security Signal Explorer
The Security Signal Explorer displays all signals that your role permits you to view. After selecting “Security Signals”, filter the signals as follows:
* The column "Signal State” can be added by selecting the "Options" button in the top right corner above the table and adding the following facet: @workflow.triage.state". This displays signal status and allows for sorting by status through the header.
* To search through signals by state, use the following search syntax “@workflow.triage.state:” and include the desired state to filter on in the query.
* Select the "Signal State" facet on the facet panel to filter on signals using facets.

## Signal management and triage
To change signal state, follow the instructions below:

1. In Datadog, select Security from the main navigation menu on the left, select Security Signals from the menu.
2. Select a Log Detection or Workload Security Signal from the table.
3. Navigate to the top-right corner of the Signal Side Panel and select your desired status from the dropdown menu. The default status is “Open”.

**Open–** The Datadog Cloud Security Platform triggered a detection based on a rule and the resulting signal is not yet resolved.

**Under Review–** During an active investigation, a user can switch the signal state to Under Review. From the Under Review state, the user can move the signal state to Resolved or Open as needed.
**Resolved–** When the detection that caused the signal has been resolved, users can transition it to the Resolved state. If a resolved issue resurfaces, or if further investigation is necessary, a signal can be changed back to an open state within two days of being created.

4. Once the status is saved, a confirmation toast will appear that states which action was taken with the opportunity to “Undo” the action. A banner automatically appears above the Signal Side Panel showing which user took the action, at what time it was performed and what action was taken.

## Audit logs for security signal actions
As an administrator or security team member, you can use the [Audit Logs](https://docs.datadoghq.com/account_management/audit_logs/#overview) (Public Beta) to see what actions are being taken against Security Signals within Datadog. As an individual, you can see a stream of your own actions, too.
Signal action history retention is on the set Audit Log [retention](https://docs.datadoghq.com/account_management/audit_logs/#retention). The default retention period for an audit log is seven days. You can set a retention period between three and 90 days.
The Audit Log Explorer displays all signal actions taken. Navigate to Organization Settings and select Audit Logs Settings under Security.

To exclusively show Audit Logs generated by actions taken in the Cloud Security Platform:
* Use the following search syntax @evt.name:"Security Monitoring" 
* Select the "Security Monitoring" facet under the "Event Name" facet.


## Further Reading
{{< partial name="whats-next/whats-next.html" >}}



