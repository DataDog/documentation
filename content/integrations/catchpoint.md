---
title: Datadog-Catchpoint Integration
integration_title: Catchpoint
kind: integration
doclevel: basic
newhlevel: true
git_integration_title: catchpoint
---

# Overview

Connect to Catchpoint to:

* Configure comprehensive alerts in your event stream
* Direct links to Analysis Charts in the Catchpoint Portal
* Alert Type tags for easy filtering


# Installation

To get Catchpoint alerts into your stream, login into the Catchpoint Portal and goto **Settings > API**.

1.  In the Alerts API select Enable
2.  Enter the DataDog **Endpoint URL**. You will also need the DataDog **API Key** which can be created in the DataDog portal.

        https://app.datadoghq.com/api/v1/events?api_key=53c44b7986a84e9d3dfb288c153436d7

3.  Set **Status** to *Active*.
4.  Select *Template* for **Format**.
5.  Add a new template.
6.  Enter the template **Name** e.g. `DataDog` and set the **Format** to *JSON*.
7.  Use the following JSON Template and Save it.

        {
        "title": "${TestName} [${TestId}] - ${switch(${notificationLevelId},'0','WARNING','1','CRITICAL','3','OK')}",
        "text": "${TestName} - http://portal.catchpoint.com/ui/Content/Charts/Performance.aspx?tList=
        ${testId}&uts=${alertProcessingTimestampUtc}&z=&chartView=1",
        "priority": "normal",
        "tags": ["alertType:${Switch(${AlertTypeId},'0', 'Unknown','2', 'Byte Length','3',
        'Content Match','4', 'Host Failure','7', 'Timing','9', 'Test Failure', '10',
        'Insight', '11','Javascript Failure', '12', 'Ping',13, 'Requests')}"],
        "alert_type": "${switch(${notificationLevelId},'0','warning','1','error','3','success')}",
        "source_type_name": "catchpoint"
        }

Catchpoint will now send any alerts directly to the Events stream in DataDog.

# Configuration

Click the **Install Integration** button on the Catchpoint Integration Tile.

