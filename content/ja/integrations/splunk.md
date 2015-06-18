---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Datadog-Splunk Integration
integration_title: Splunk
kind: integration
---

### Overview
{:#int-overview}

Connect your Splunk log monitoring to be able to:

- Get notified of your reports.
- Correlate these reports with your other metrics
- Collaborate with your team on thse events

To receive your reports from Splunk into Datadog, you need to have `dogapi` installed

    pip install dogapi

Once it is done, [get your api key and an application key](https://app.datadoghq.com/account/settings#api) and drop the following `dog-splunk.sh` script into $SPLUNK_HOME/bin/scripts

    #!/bin/bash
    API_KEY= your_api_key
    APP_KEY= your_application_key
    dog --api-key $API_KEY --application-key $APP_KEY event post \
    "Found $SPLUNK_ARG_1 events in splunk" \
    "Matching $SPLUNK_ARG_2 based on $SPLUNK_ARG_5, from report $SPLUNK_ARG_4. More details at $SPLUNK_ARG_6." \
    --aggregation_key $SPLUNK_ARG_3 --type splunk

You can modify the text of the events by for example using datadog's @mention to notify people of these reports.

Refer [here](https://wiki.splunk.com/Community:Use_Splunk_alerts_with_scripts_to_create_a_ticket_in_your_ticketing_system) to see the information available from Splunk.

You can now configure your splunk reports to exectue this script in order to get published into Datadog
