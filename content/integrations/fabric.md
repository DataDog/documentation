---
title: Datadog-Fabric Integration
integration_title: Fabric
kind: integration
doclevel: basic
---
**Warning**: This integration has been deprecated and is not being actively developed anymore.


## Overview

Connect Fabric to Datadog in order to:

* Capture and search for deploy events in the event stream.
* Correlate deploy events with metric changes on dashboards.


## Configuration

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
Then add the notify decorator to each task you want to connect to Datadog. Make sure @notify occurs just above @task.
```
@notify
@task
def a_fabric_task(...):
    # do things
```