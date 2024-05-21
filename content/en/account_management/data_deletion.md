---
title: Data Deletion
kind: documentation
private: true
---

## Product Scope

| Product            | Deletion via Support |  Deletion via API | Deletion via UI | Constraints |
|:-----------------|:--:|:------:|:---:|--|
| Logs              | Yes |  No | Limited Beta | <li>Cannot scope deletion to specific index or storage type.</li><li>Logs embedded within Security Signals are not deleted.</li><li>Metrics generated from Logs are not deleted.</li> | 
| Metrics           | Yes |  No | No | Contact support to learn more.
| Traces               | Yes |  No | No | Contact support to learn more.
| RUM               | Yes |  Limited Beta | No | Contact support to learn more.


Have questions regarding something else? Reach out to Datadog [Support](https://www.datadoghq.com/support/).

## Overview
### Deletion via Datadog Support
Contact [support](https://www.datadoghq.com/support/) with your request.

### Deletion via UI
#### Accessing Deletion
- Users must first be assigned the Data Deletion [permission](https://docs.datadoghq.com/account_management/rbac/permissions/) for at least one product.
- Self-service deletion can be accessed in Organization Settings → Data Management → Data Deletion

#### Auditing Deletions
- Deletions will logged in Job History for 90 days.
- Deletions will be logged to Audit Trail alongside the requesting user's details.

#### Starting Deletions
- Deletions will start 2 hours after confirmation; matches that arrive during this period will be included in deletion.
- In some cases records arriving after the job has started may not be deleted since the time window for that record has already been processed.

#### Stopping Deletions
- Deletions that are in progress can be canceled, but:
    - This only prevents data that has not yet been processed for a particular job to not be deleted.
    - Deleted data can never be recovered.
    - Deletions cannot be undone.
