---
title: Data Deletion
kind: documentation
private: true
---

## Product Scope

| Product            | Deletion via Support |  Deletion via API | Deletion via UI |
|:-----------------|:--:|:------:|:---:|
| Logs              | Yes |  No | Limited Beta |
| RUM               | Yes |  No | No | 
| Traces               | Yes |  No | No |
| Metrics           | Yes |  No | No | 
| DBM               | Yes |  No | No | 
| Incidents               | Yes |  No | No | 
| ASM               | Yes |  No | No | 


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
  - Deletions are searchable in Audit Trail via `@asset.name:"Data Deletion"`

#### Starting Deletions
- Deletions will start 2 hours after confirmation; matches that arrive during this period will be included in deletion.
- In some cases records arriving after the job has started may not be deleted since the time window for that record has already been processed.
- When deleting a record, data derived from that record is not deleted (e.g. Metrics generated from Logs).

#### Stopping Deletions
- Deletions that are in progress can be canceled, but:
    - This only prevents data that has not yet been processed for a particular job to not be deleted.
    - Deleted data can never be recovered.
    - Deletions cannot be undone.

## Guide - Deletion via UI

### Step 1 - Getting Access
1. Go to **Organization Settings** -> **Access** -> **Roles**
2. Request or create a role that has the 'Delete Data' permission for the product(s) you wish to delete from

### Step 2 - Search
1. Go to **Organization Settings** -> **Data Management** -> **Data Deletion**
2. Select a product to delete from.
3. Select a timeframe to search across. The default timeframe is 1 year but can be customized to a timeframe you prefer.
4. The searchbar will search across all fields (tags and attributes) for the provided search term. You can provide a targeted search by adding filters to the right.
5. Clicking a row will open a panel to see more details about each record.

### Step 3 - Delete & Confirm
1. Once confident in the search, click the 'Delete' button in the bottom right.
2. You will be prompted to confirm the deletion by selecting a checkbox and entering confirmation text.
3. Click **Confirm**.
4. The deletion request is queued to start in 2 hours.
5. Your name and request will be logged in Job History and Audit Trail.

### Step 4 - Validate
1. Click the **Deletion History** tab.
2. Deletion requests will be one of 4 statuses:
   - Upcoming
   - In Progress
   - Done
   - Canceled
3. Deletions are also searchable in Audit Trail via `@asset.name:"Data Deletion"`

### Step 5 (optional) - Cancel Deletion
1. To cancel a deletion, click **Cancel** on an **Upcoming** or **In Progress** job.
2. Deletions that are in progress can be canceled, but:
    - This only prevents data that has not yet been processed for a particular job to not be deleted.
    - Deleted data can never be recovered.
    - Deletions cannot be undone.
  
## Product Differences
| Product          | Details |
|:-----------------|--------------------|
| Logs             |   <li>Deletions cannot be scoped to a specific index</li> <li>Deletions occur across Index, Flex Indexes and Online Archives.</li>   | 
