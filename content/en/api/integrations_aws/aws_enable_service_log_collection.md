---
title: Enable an AWS service log collection
type: apicontent
order: 15.09
external_redirect: /api/#enable-an-aws-service-log-collection
---

## Enable an AWS service log collection

Enable Automatic Log collection for your AWS services.

**ARGUMENTS**:

* **`account_id`** [*required*]:

    Your AWS Account ID without dashes.
    [Consult the Datadog AWS integration to learn more][1] about your AWS account ID.

* **services** [*required*]:
    Array of services IDs set to enable automatic log collection.
    Discover the list of available services with the [Get list of AWS log ready services][2] API endpoint

[1]: /integrations/amazon_web_services/#configuration
[2]: /api/#get-list-of-aws-log-ready-services
