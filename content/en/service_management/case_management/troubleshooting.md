---
title: Troubleshooting
---

## Overview

This guide is intended to help you resolve issues with third-party integrations in Case Management. If you continue to have trouble, reach out to [Datadog support][1] for further assistance.

## Jira

Jira issue types with custom fields, private Jira projects, and on-premises Jira instances are not supported. If you are having trouble with automatic Jira ticket creation with syncing, see the following sections:

### Configuration

1. If Jira projects are not populating the dropdown on the Jira integration configuration screen, check that you have the `manage_integrations` permission. 

1. Ensure that you have configured a webhook to receive events from Jira.

### Syncing and updates

1. If you move a case that is being synced with a Jira issue to a different Case Management project, the syncing stops. After it is moved, the case in the new project does not have a Jira issue attached to it. 
1. If you're updating the status of a case in a way that is disallowed by a Jira workflow, the case falls out of sync with the status mapping. 
1. Updates to comments, including deletions, in either Case Management or Jira are not reflected on the other side. 
1. Only cases created after the bidirectional integration was enabled are synced. Datadog does not retroactively sync cases that existed before the integration was enabled. 

### Jira issue reporter

1. There are a few scenarios where the Jira issue reporter is reflected as the Datadog user that set up the Jira integration. Some of these scenarios include:
    - When a Datadog user that creates a case does not have a Jira account
    - A Jira user has hidden email visibility
1. If the reporter on the mirrored Jira issue is updated, it is not reflected in Case Management, as the "created by" field is not editable. 



[1]: https://docs.datadoghq.com/help/