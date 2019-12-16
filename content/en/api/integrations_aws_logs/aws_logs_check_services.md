---
title: Check permissions for log services
type: apicontent
order: 16.12
external_redirect: /api/#check-aws-services
---

## Check permissions for Log Services

Test if permissions are present to add a log-forwarding triggers for the given services and AWS account. The input is the same as for [Enable an AWS service log collection][1].

The call is done asynchronously, so can be repeatedly polled in a non-blocking fashion until the asynchronous request completes.

* Returns a status of `created` when initialized.
* Returns a status of `waiting` while checking.
* Returns a status of `checked and ok` if the permissions exist.
* Returns a status of `error` if the permissions do not exist.

**Note**: You must have the given AWS Lambda configured in the main AWS Integration tiles logs tab for this to successfully verify.

**ARGUMENTS**:

* **`account_id`** [*required*]:

    Your AWS Account ID without dashes.
    [Consult the Datadog AWS integration to learn more][2] about your AWS account ID.

* **services** [*required*]:
    Array of services IDs set to enable automatic log collection.
    Discover the list of available services with the [Get list of AWS log ready services][3] API endpoint

[1]: /api/#enable-an-aws-service-log-collection
[2]: /integrations/amazon_web_services/#configuration
[3]: /api/#get-list-of-aws-log-ready-services
