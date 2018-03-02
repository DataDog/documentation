---
categories:
- monitoring
- notification
ddtype: crawler
description: See Pingdom-collected uptimes, response times, and alerts in Datadog.
doc_link: https://docs.datadoghq.com/integrations/pingdom/
git_integration_title: pingdom
has_logo: true
integration_title: Pingdom
is_public: true
kind: integration
manifest_version: '1.0'
name: pingdom
public_title: Datadog-Pingdom Integration
short_description: See Pingdom-collected uptimes, response times, and alerts in Datadog.
version: '1.0'
---


## Overview

Track Pingdom user-centric performance metrics in Datadog, for correlation with other relevant events and metrics.

At this time we track the response_time metric for any sites you configure on the Pingdom website.

Pingdom events can be added by configuring the relevant [Integration Status Monitor](https://app.datadoghq.com/monitors#create/integration)

<div class="alert alert-info">
Metrics can only be imported for Pingdom customers at the Starter level or above.
</div>

## Setup
### Installation

1.  Open the Pingdom integration tile.
2.  Enter the username and password to your Pingdom account.
    (If you have a Team account, you can use your own credentials and specify the account you wish to pull checks from.)
3.  You can ignore some checks by unchecking them or add some tags to the events that are going to be generated.

## Data Collected
### Metrics
{{< get-metrics-from-git "pingdom" >}}


### Events
The Pingdom integration does not include any event at this time.

### Service Checks
{{< get-service-checks-from-git "pingdom" >}}


## Troubleshooting
### Why am I getting an error when updating user/password?
You may have seen the following when saving your pingdom credentials:

`“There was an issue while testing your Pingdom configuration: Not permitted for account type”`.

Add the email address of your pingdom account owner in the **(Optional) Account to query** field, then save.

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

