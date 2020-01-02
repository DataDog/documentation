---
title: Generate External IDs
type: apicontent
order: 15.06
external_redirect: /api/#generate-external-ids
---

## Generate External IDs

Generate a new AWS external id for a given AWS account id and role name pair.

**ARGUMENTS**:

* **`account_id`** [*required*]:

    Your AWS Account ID without dashes.
    [Consult the Datadog AWS integration to learn more][1] about your AWS account ID.

* **`role_name`** [*required*]:

    Your Datadog role delegation name.
    For more information about your AWS account Role name, [see the Datadog AWS integration configuration info][2].

[1]: /integrations/amazon_web_services/#configuration
[2]: /integrations/amazon_web_services/#installation
