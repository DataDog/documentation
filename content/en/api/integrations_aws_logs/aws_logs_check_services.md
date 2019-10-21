---
title: Check permissions for log services
type: apicontent
order: 16.12
external_redirect: /api/#check-aws-services
---

## Check permissions for Log Services

Test if permissions are present to add log-forwarding triggers for the
given services + AWS account. Input is the same as for save_services.
Done async, so can be repeatedly polled in a non-blocking fashion until
the async request completes.

Returns a status of 'created' when initialized.
Returns a status of 'waiting' while checking.
Returns a status of 'checked and ok' if the permissions exist.
Returns a status of 'error' if the permissions do not exist.

NOTE: You MUST have the given AWS Lambda configured in the main AWS Integration tiles logs tab for this to successfully verify.

**ARGUMENTS**:

* **`account_id`** [*required*]:

    Your AWS Account ID without dashes.
    [Consult the Datadog AWS integration to learn more][1] about your AWS account ID.

* **services** [*required*]:
    Array of services IDs set to enable automatic log collection.
    Discover the list of available services with the [Get list of AWS log ready services][2] API endpoint

[1]: /integrations/amazon_web_services/#configuration
[2]: /api/#get-list-of-aws-log-ready-services
