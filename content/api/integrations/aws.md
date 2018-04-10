---
title: AWS
type: apicontent
order: 14.1
external_redirect: /api/#aws
---

## AWS

Configure your Datadog-AWS integration directly through Datadog API.  
[Read more about Datadog-AWS integration][1]

##### ARGUMENTS

* **`account_id`** [*required*]:  
    Your AWS Account ID without dashes.  
    [Consult our Datadog AWS integration to learn more][2] about your AWS account ID.

* **`role_name`** [*required*]:  
    Your Datadog role delegation name.  
    [Consult our Datadog AWS integration to learn more][3] about your AWS account Role name.

* **`filter_tags`** [*optional*, *default*=**None**]:  
    Array of EC2 tags (in the form `key:value`) defines a filter that Datadog use when collecting metrics from EC2. Wildcards, such as `?` (for single characters) and `*` (for multiple characters) can also be used.  
    Only hosts that match one of the defined tags will be imported into Datadog. The rest will be ignored. Host matching a given tag can also be excluded by adding `!` before the tag.  
    e.x. `env:production,instance-type:c1.*,!region:us-east-1`  
    [Read more about EC2 tagging in AWS tagging documentation][4].

* **`host_tags`** [*optional*, *default*=**None**]:  
    Array of tags (in the form `key:value`) to add to all hosts and metrics reporting through this integration.

* **`account_specific_namespace_rules`** [*optional*, *default*=**None**]:
    An object (in the form `{"namespace1":True/False, "namespace2":True/False}`) that enables or disables metric collection for specific AWS namespaces for this AWS account only. A list of namespaces can be found at the `https://api.datadoghq.com/api/v1/integration/aws/available_namespace_rules` endpoint.


[1]: /integrations/amazon_web_services
[2]: https://docs.datadoghq.com/integrations/amazon_web_services/#configuration
[3]: https://docs.datadoghq.com/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html
