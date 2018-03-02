---
categories:
- os & system
creates_events: true
ddtype: crawler
display_name: Uptime
doc_link: https://docs.datadoghq.com/integrations/uptime/
git_integration_title: uptime
has_logo: false
integration_title: Uptime
is_public: true
kind: integration
maintainer: jeremy-lq
manifest_version: 1.0.0
metric_prefix: uptime
metric_to_check: uptime.response_time
name: uptime
public_title: Datadog-Uptime Integration
short_description: Uptime & performance monitoring made easy
---



## Overview

Get events and metrics from your app in real time to:

* Track and notify of any downtime or interruptions.
* Visualize response time metrics from synthetic requests.

![Uptime.com Graph](https://raw.githubusercontent.com/DataDog/integrations-extras/ilan/uptime/uptime/images/snapshot.png)

## Setup

### Configuration

In order to activate the integration of Datadog within your Uptime account, you will go to [Alerting>Push Notifications](https://uptime.com/push-notifications/manage/) then choose Datadog as the provider type when adding a new push notifications profile.

The following describes the fields shown when configuring Datadog within your Uptime account: 

* Name: The reference name you desire to assign to your Datadog profile. It can assist you with organizing multiple provider profiles within your Uptime account.

* API key: <span class="hidden-api-key">${api_key}</span>

* Application Key: <span class="app_key" data-name="uptime.com"></span> 

<li>Once you've configured your Datadog profile, you will need to assign the profile to a contact group located under Alerting>Contacts. The profile is assigned at the Push Notifications field within the contact group.</li> 
</ul>

## Data Collected
### Metrics
{{< get-metrics-from-git "uptime" >}}


### Events
The Uptime check does not include any events at this time.

### Service Checks
The Uptime check does not include any service checks at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/).

