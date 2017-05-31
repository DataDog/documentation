---
title: Datadog-Catchpoint Integration
integration_title: Catchpoint
kind: integration
doclevel: basic
---

### Overview

Catchpoint is a Digital Performance Analytics platform that gives you the power to deliver amazing user experiences.

Connect Catchpoint and Datadog to:

* Configure comprehensive alerts in your event stream
* Direct links to Analysis Charts in the Catchpoint Portal
* Alert Type tags for easy filtering


### Installation

No installation is required.

### Configuration

To get Catchpoint alerts into your stream, login into the Catchpoint Portal and goto Settings > API.

1. In the Alerts API select Enable
1. Enter the DataDog Endpoint URL. You will also need the DataDog API Key which can be created in the DataDog portal.
1. Set Status to Active
1. Select Template for Format
1. Add a new template
1. Enter the template Name e.g. DataDog and set the Format to JSON.
1. Use the following JSON Template and Save it.

    {:.language-json}
        {
            "title": "${TestName} [${TestId}] - ${switch(${notificationLevelId},'0','WARNING','1','CRITICAL','3','OK')}",
            "text": "${TestName} - http://portal.catchpoint.com/ui/Content/Charts/Performance.aspx?tList=${testId}&uts=${alertProcessingTimestampUtc}&z=&chartView=1",
            "priority": "normal",
            "tags": ["alertType:${Switch(${AlertTypeId},'0', 'Unknown','2', 'Byte Length','3','Content Match','4', 'Host Failure','7', 'Timing','9', 'Test Failure', '10',Insight', '11','Javascript Failure', '12', 'Ping',13, 'Requests')}"],
            "alert_type": "${switch(${notificationLevelId},'0','warning','1','error','3','success')}",
            "source_type_name": "catchpoint"
        }


Catchpoint will now send any alerts directly to the Events stream in DataDog.


### Metrics

This integration does not include metrics at this time.

### Events

This integration will push Catchpoint events to your Datadog event stream.
