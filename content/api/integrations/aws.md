---
title: AWS
type: apicontent
order: 13.1
external_redirect: /api/#aws
---

## AWS

Configure your Datadog-AWS integration directly through Datadog API.  
[Read more about Datadog-AWS integration](/integrations/amazon_web_services)

##### ARGUMENTS

* **`account_id`** [*required*]:  
    Your AWS Account ID without dashes.  
    [Consult our Datadog AWS integration to learn more](https://docs.datadoghq.com/integrations/amazon_web_services/#configuration) about your AWS account ID.

* **`role_name`** [*required*]:  
    Your Datadog role delegation name.  
    [Consult our Datadog AWS integration to learn more](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) about your AWS account Role name.

* **`filter_tags`** [*optional*, *default*=**None**]:  
    Array of EC2 tags (in the form `key:value`) defines a filter that Datadog use when collecting metrics from EC2. Wildcards, such as `?` (for single characters) and `*` (for multiple characters) can also be used.  
    Only hosts that match one of the defined tags will be imported into Datadog. The rest will be ignored. Host matching a given tag can also be excluded by adding `!` before the tag.  
    e.x. `env:production,instance-type:c1.*,!region:us-east-1`  
    [Read more about EC2 tagging in AWS tagging documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html).

* **`host_tags`** [*optional*, *default*=**None**]:  
    Array of tags (in the form `key:value`) to add to all hosts and metrics reporting through this integration.