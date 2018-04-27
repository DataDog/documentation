---
description: Send your Catchpoint alerts to your Datadog event stream.
doclevel: basic
integration_title: Catchpoint
kind: integration
placeholder: true
title: Datadog-Catchpoint Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

{{< img src="integrations/catchpoint/catchpoint_event.png" alt="catchpoint event" >}}

## Overview

Catchpoint is a Digital Performance Analytics platform that gives you the power to deliver amazing user experiences.

Connect Catchpoint and Datadog to:

* Configure comprehensive alerts in your event stream
* Direct links to Analysis Charts in the Catchpoint Portal
* Alert Type tags for easy filtering

## Setup
### Installation

No installation is required.

### Configuration

To get Catchpoint alerts into your stream, login into the Catchpoint Portal and goto Settings > API.

1. In the Alerts API select Enable
2. . Enter the Datadog Endpoint URL. 
```
https://api.datadoghq.com/api/v1/events?api_key=<YOUR_DATADOG_API_KEY>
```
You will also need the Datadog API Key which can be created in the Datadog portal.
3. Set Status to Active
4. Select Template for Format
5. Add a new template
6. Enter the template Name e.g. Datadog and set the Format to JSON.
7. Use the following JSON Template and Save it.
{{< highlight json >}}
{
    "title": "${TestName} [${TestId}] - ${switch(${notificationLevelId},'0','WARNING','1','CRITICAL','3','OK')}",
    "text": "${TestName} - http://portal.catchpoint.com/ui/Content/Charts/Performance.aspx?tList=${testId}&uts=${alertProcessingTimestampUtc}&z=&chartView=1",
    "priority": "normal",
    "tags": ["alertType:${Switch(${AlertTypeId},'0', 'Unknown','2', 'Byte Length','3','Content Match','4', 'Host Failure','7', 'Timing','9', 'Test Failure', '10',Insight', '11','Javascript Failure', '12', 'Ping',13, 'Requests')}"],
    "alert_type": "${switch(${notificationLevelId},'0','warning','1','error','3','success')}",
    "source_type_name": "catchpoint"
}
{{< /highlight >}}
Catchpoint will now send any alerts directly to the Events stream in DataDog.
{{< img src="integrations/catchpoint/catchpoint_configuration.png" alt="Catchpoint configuration" >}}

## Data Collected
### Metrics

This integration does not include metrics at this time.

### Events

This integration will push Catchpoint events to your Datadog event stream.
