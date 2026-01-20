---
title: Ticketing Systems Troubleshooting
is_beta: false
private: false
further_reading:
  - link: '/integrations/jira/#configure-a-jira-webhook'
    tag: 'Documentation'
    text: 'Configure a Jira webhook'
---

If you experience unexpected behavior with Error Tracking ticketing integrations, the troubleshooting steps below can help you resolve the issue quickly. If you continue to have trouble, reach out to [Datadog support][1].

### Sync is broken between Jira and Error Tracking

If you experience syncing issues between your Jira tickets and the corresponding Error Tracking issues (such as the issue state not being updated when you close the Jira ticket), verify that the following steps are all properly configured:

1. In the issue panel, make sure that the issue is correctly linked to the Jira ticket.
2. A Case Management case was automatically created by Datadog to act as a linking point for the Error Tracking issue and the Jira ticket. You can access this case from the issue panel, to find the  Case Management project in which it was created. In Case Management settings, make sure that the Jira integration is enabled for this project, and the correct Jira account and board are configured.

{{< img src="error_tracking/enable-jira-for-case-management-project.png" alt="Enable Jira for your Case Management project" style="width:100%;" >}}

3. In Case Management settings, make sure that sync between Case Management and Jira is enabled for this project. Check that the fields you want to sync are configured for two-way sync between Datadog and Jira.

{{< img src="error_tracking/sync-data-between-case-management-and-jira.png" alt="Sync data between Case Management and Jira" style="width:100%;" >}}

4. A webhook must be configured to automatically sync updates between Datadog and Jira. In your Jira settings, check for this webhook. If the webhook is missing, follow [these steps][2] to add it and fix the sync between Datadog and Jira.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /integrations/jira/#configure-a-jira-webhook
