---
title: Update an AWS integration
type: apicontent
order: 15.03
external_redirect: /api/#update-an-aws-integration
---

## Update an AWS integration

Update a Datadog-Amazon Web Services integration.

**QUERY PARAMS** [*curl only*]:

* **`account_id`** [*required*]:

    Your **Existing** AWS Account ID without dashes. It needs to be passed as query parameter.
    Only required for Role based account configuration.
    [Consult the Datadog AWS integration to learn more][1] about your AWS account ID.

* **`role_name`** [*required*]:

    Your **Existing** Datadog role delegation name. It needs to be passed as query parameter.
    Only required for Role based account configuration.
    For more information about your AWS account Role name, [see the Datadog AWS integration configuration info][2].

* **`access_key_id`** [*required*]:

    Your **Existing** AWS access key ID. 
    Only required if your AWS account is a GovCloud or China account, enter the existing corresponding Access Key ID to be changed.
    It needs to be passed as query parameter.

* **`secret_access_key`** [*required*]:

    Your **Existing** AWS secret access key. 
    Only required if your AWS account is a GovCloud or China account, enter the corresponding Access Key ID.
    It needs to be passed as query parameter.

**CURL SPECIFIC ARGUMENTS**:

* **`account_id`** [*optional*, *curl only*]:

    Your **New** AWS Account ID without dashes. It needs to be passed as an argument.
    [Consult the Datadog AWS integration to learn more][1] about your AWS account ID.

* **`role_name`** [*optional*, *curl only*]:

    Your **New** Datadog role delegation name. It needs to be passed as an argument.
    For more information about your AWS account Role name, [see the Datadog AWS integration configuration info][2].

* **`access_key_id`** [*optional*, *curl only*]:

    Your **New** AWS access key ID. 
    Only applicable if your AWS account is a GovCloud or China account.

* **`secret_access_key`** [*optional*, *curl only*]:

    Your **New** AWS secret access key. 
    Only required if your AWS account is a GovCloud or China account.

**ARGUMENTS**:

* **`account_id`** [*required*, *Python and Ruby*]:

    Your **Existing** AWS Account ID without dashes. It needs to be passed as an argument.
    [Consult the Datadog AWS integration to learn more][1] about your AWS account ID.

* **`role_name`** [*required*, *Python and Ruby*]:

    Your **Existing** Datadog role delegation name. It needs to be passed as an argument.
    For more information about your AWS account Role name, [see the Datadog AWS integration configuration info][2].

* **`access_key_id`** [*required*, *Python and Ruby*]:

    Your **Existing** AWS access key ID. 
    Only required if your AWS account is a GovCloud or China account.

* **`secret_access_key`** [*required*, *Python and Ruby*]:

    Your **Existing** AWS secret access key. 
    Only required if your AWS account is a GovCloud or China account.

* **`new_account_id`** [*optional*, *Python and Ruby*]:

    Your **New** AWS Account ID without dashes. It needs to be passed as an argument.
    [Consult the Datadog AWS integration to learn more][1] about your AWS account ID.

* **`new_role_name`** [*optional*, *Python and Ruby*]:

    Your **New** Datadog role delegation name. It needs to be passed as an argument.
    For more information about your AWS account Role name, [see the Datadog AWS integration configuration info][2].

* **`new_access_key_id`** [*optional*, *Python and Ruby*]:

    Your **New** AWS access key ID. 
    Only applicable if your AWS account is a GovCloud or China account.

* **`new_secret_access_key`** [*optional*, *Python and Ruby*]:

    Your **New** AWS secret access key. 
    Only applicable if your AWS account is a GovCloud or China account.

* **`filter_tags`** [*optional*, *default*=**None**]:

    The array of EC2 tags (in the form `key:value`) defines a filter that Datadog uses when collecting metrics from EC2. Wildcards, such as `?` (for single characters) and `*` (for multiple characters) can also be used.
    Only hosts that match one of the defined tags are imported into Datadog. The rest are ignored. Host matching a given tag can also be excluded by adding `!` before the tag.
    e.x. `env:production,instance-type:c1.*,!region:us-east-1`
    For more information on EC2 tagging, see the [AWS tagging documentation][3].

* **`host_tags`** [*optional*, *default*=**None**]:

    Array of tags (in the form `key:value`) to add to all hosts and metrics reporting through this integration.

* **`account_specific_namespace_rules`** [*optional*, *default*=**None**]:

    An object (in the form `{"namespace1":true/false, "namespace2":true/false}`) that enables or disables metric collection for specific AWS namespaces for this AWS account only. A list of namespaces can be found at the `/v1/integration/aws/available_namespace_rules` endpoint.

[1]: /integrations/amazon_web_services/#configuration
[2]: /integrations/amazon_web_services/#installation
[3]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html
