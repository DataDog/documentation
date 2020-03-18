---
title: Create an AWS integration
type: apicontent
order: 15.02
external_redirect: /api/#create-an-aws-integration
---

## Create an AWS integration

Create a Datadog-Amazon Web Services integration.

**Note**: Using the `POST` method updates your integration configuration by **adding** your new configuration to the existing one in your Datadog organization.

**ARGUMENTS**:

* **`account_id`** [*required*]:

    Your AWS Account ID without dashes.
    [Consult the Datadog AWS integration to learn more][1] about your AWS account ID.

* **`role_name`** [*required*]:

    Your Datadog role delegation name.
    For more information about you AWS account Role name, [see the Datadog AWS integration configuration info][2].

* **`access_key_id`** [*required*]:

    Your AWS access key ID. 
    Only required if your AWS account is a GovCloud or China account.

* **`secret_access_key`** [*required*]:

    Your AWS secret access key. 
    Only required if your AWS account is a GovCloud or China account.

* **`filter_tags`** [*optional*, *default*=**None**]:

    The array of EC2 tags (in the form `key:value`) defines a filter that Datadog uses when collecting metrics from EC2. Wildcards, such as `?` (for single characters) and `*` (for multiple characters) can also be used.
    Only hosts that match one of the defined tags will be imported into Datadog. The rest will be ignored. Host matching a given tag can also be excluded by adding `!` before the tag.
    e.x. `env:production,instance-type:c1.*,!region:us-east-1`
    For more information on EC2 tagging, see the [AWS tagging documentation][3].

* **`host_tags`** [*optional*, *default*=**None**]:

    Array of tags (in the form `key:value`) to add to all hosts and metrics reporting through this integration.

* **`account_specific_namespace_rules`** [*optional*, *default*=**None**]:

    An object (in the form `{"namespace1":true/false, "namespace2":true/false}`) that enables or disables metric collection for specific AWS namespaces for this AWS account only. A list of namespaces can be found at the `/v1/integration/aws/available_namespace_rules` endpoint.

* **`excluded_regions`** [*optional*, *default*=**None**]:

    Array of AWS regions that will be excluded from metrics collection. 

[1]: /integrations/amazon_web_services/#configuration
[2]: /integrations/amazon_web_services/#installation
[3]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html
