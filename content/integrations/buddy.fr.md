---
creates_events: false
ddtype: crawler
display_name: Buddy
doc_link: https://docs.datadoghq.com/integrations/buddy/
git_integration_title: buddy
has_logo: true
integration_title: Buddy
is_public: true
kind: integration
maintainer: support@buddy.works
manifest_version: 1.0.2
name: buddy
public_title: Datadog-Buddy Integration
short_description: One-click delivery automation with working website previews for
  web developers.
---

## Overview

Enabling this integration will let you:

*   Send events about deployments to Datadog
*   Correlate deployment details with your Datadog metrics
*   Detect the sources of performance spikes

![](https://raw.githubusercontent.com/DataDog/integrations-extras/master/buddy/images/datadog-integration.png)

## Setup

* In your Datadog account settings go to [Integrations -> APIs](https://app.datadoghq.com/account/settings#api) and copy the **API Key** token

* [Sign in to your Buddy account](https://app.buddy.works/login) and go to the pipeline with the deployment action that you want to track

* Click the plus at the end of the pipeline and select **Datadog** in the **Notifications** section

* Enter the name of your Datadog account and paste the API key that you copied

* You can use [Buddy parameters](https://buddy.works/knowledge/deployments/what-parameters-buddy-use) to define the title of the event and content sent, for example:

```

${'${execution.pipeline.name} execution #${execution.id}'}


${'${execution.to_revision.revision} - ${execution.to_revision.message}'}
```

* When ready, click **Add action** and run the pipeline. On every successful deployment, Buddy will send an event to Datadog:

![snapshot](https://raw.githubusercontent.com/DataDog/integrations-extras/master/buddy/images/snapshot.png)

## Data Collected
### Metrics
The Buddy check does not include any metrics at this time.

### Events
All Buddy deployment events are sent to your [Datadog Event Stream](https://docs.datadoghq.com/graphing/event_stream/)

### Service Checks
The Buddy check does not include any service checks at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/).

