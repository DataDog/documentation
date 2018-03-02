---
categories:
- orchestration
ddtype: crawler
description: See and search on Fabric tasks in your Datadog event stream.
doc_link: https://docs.datadoghq.com/integrations/fabric/
git_integration_title: fabric
has_logo: true
integration_title: Fabric
is_public: true
kind: integration
manifest_version: '1.0'
name: fabric
public_title: Datadog-Fabric Integration
short_description: See and search on Fabric tasks in your Datadog event stream.
version: '1.0'
---

## Overview
**Warning**: This integration has been deprecated and is not being actively developed anymore.

Connect Fabric to Datadog in order to:

* Capture and search for deploy events in the event stream.
* Correlate deploy events with metric changes on dashboards.

## Setup
### Configuration

1. Install the dogapi package:

```
sudo easy_install --upgrade dogapi
```
or:

```
sudo pip install dogapi
```

2. Import dogapi and configure your API key:

```
from dogapi.fab import setup, notify
setup("<YOUR_DATADOG_API_KEY")
```

Then add the notify decorator to each task you want to connect to Datadog. Make sure @notify occurs just above @task

```
@notify
@task
def a_fabric_task(...):
    # do things
```

## Data Collected
### Metrics

The Fabric integration does not include any metric at this time.

### Events
The Fabric integration does not include any event at this time.

### Service Checks
The Fabric integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

