---
"categories":
- cloud
- network
"custom_kind": "integration"
"dependencies": []
"description": "Collect Salesforce real-time platform events as Datadog logs."
"doc_link": "https://docs.datadoghq.com/integrations/salesforce/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/monitor-salesforce-logs-datadog/"
  "tag": Blog
  "text": Monitor Salesforce logs with Datadog
"git_integration_title": "salesforce"
"has_logo": true
"integration_id": ""
"integration_title": "Salesforce"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "salesforce"
"public_title": "Salesforce"
"short_description": "Collect Salesforce real-time platform events as Datadog logs."
"team": "web-integrations"
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/salesforce/salesforce_dashboard.png" alt="The out of the box Salesforce dashboard in Datadog" popup="true">}}

## Overview

Salesforce provides a customer relationship management service and a complementary suite of enterprise applications focused on customer service, marketing automation, analytics, and application development. 

Integrate Salesforce with Datadog to:

- View and parse your Salesforce user activity, platform access activity, and security logs using [Datadog Log Management][1].
- Set [monitors][2] on [events][3] from your Salesforce Platform.
- Leverage the Datadog [Security Platform][4] to monitor and detect threats across your Salesforce Platform.
- Monitor your Salesforce API usage to ensure you are operating under API limits.

## Setup

### Installation

No installation is required.

### Configuration

To configure Salesforce to send data to Datadog, you need to have access to [Salesforce Event Monitoring][5], enable storage on your Salesforce events, and connect your Salesforce org to Datadog.

#### Permissions

If you are using [Salesforce Shield][6], you have the required permissions for all events. If you do not have Shield, you need the [Event Monitoring add-on][7].

#### Enabling event storage

If you plan on using the platform or real-time events, you need to set this up in the Event Manager. This step is not required for event log file events.

1. [Log into][8] your Salesforce account (using the Lightning interface).
2. Search for **Event Manager**.
3. On the Event Manager page, for each event you want to crawl, click the right arrow and select **Enable Storage**. You do not need to **Enable Streaming**. The list of supported
events can be found under the **Platform Events** section in the **Configuration** tab of the [Salesforce Integration tile][9].

#### Connecting your org

1. Create a unique system account in your Salesforce org. 
2. Click **New Production Org** or **New Sandbox Org** in the **Configuration** tab of the [Salesforce Integration tile][9].
3. Set any custom tags you want to attach to these events as a comma-separated list. You can choose which events to enable.

    {{< img src="integrations/salesforce/salesforce-1.png" alt="The success screen when you have successfully configured your Salesforce org on Datadog" popup="true" style="width:90%" >}}

4. Click **Save**. This prompts you to log into your Salesforce account and grant Datadog access permissions. 
5. Once you have completed the login flow, return to the [Salesforce Integration tile][9] in Datadog. Your org includes out-of-the-box default tags.

    {{< img src="integrations/salesforce/salesforce-default-tags.png" alt="The success screen when you have successfully configured your Salesforce org on Datadog" popup="true" style="width:90%" >}}

6. Select the tags you want to use and click **Connect**. 
7. Repeat these steps to connect your remaining organizations. You must have access to the organizations you are trying to add. 

**Note**: A default tag is added with your Salesforce org ID, but you can edit [the tags][10] with something more meaningful to your company.

#### Results

After some time, [logs][1] appear under the `salesforce` source. Salesforce writes the event log files infrequently, so it may take an hour or more for event log file-based events to appear in Datadog.

{{< img src="integrations/salesforce/salesforce_dashboard_logs.png" alt="The Salesforce Log Stream widget in the out of the box Salesforce dashboard" popup="true">}}

## Data Collected

### Metrics
{{< get-metrics-from-git "salesforce" >}}


### Events

For the full list of Log events, see [Real-Time Event Monitoring Data Storage][12] and [EventLogFile Events][13].

### Service Checks

The Salesforce integration does not include any service checks.

## Troubleshooting

If you encounter an `The authenticated connection does not have access` error in the Configuration tab, you may be missing permissions to access requested events. You can temporarily enable admin permissions for the Datadog role in Salesforce to confirm any missing access permissions.

At a minimum, the user must have the following permissions:

* API Enabled
* View Setup and Configuration
* View Real-Time Event Monitoring Events
* View Event Log Files
* View Threat Detection Events

The user must also have read permission on any underlying event objects that are selected in the configuration.

Need help? Contact [Datadog support][14].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/
[2]: /monitors/monitor_types/
[3]: /events/
[4]: /security_platform/
[5]: https://trailhead.salesforce.com/content/learn/modules/event_monitoring
[6]: https://www.salesforce.com/editions-pricing/platform/shield
[7]: https://help.salesforce.com/s/articleView?id=000339868&type=1
[8]: https://login.salesforce.com/
[9]: https://app.datadoghq.com/integrations/salesforce
[10]: /getting_started/tagging/using_tags/
[11]: https://github.com/DataDog/dogweb/blob/prod/integration/salesforce/salesforce_metadata.csv
[12]: https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/real_time_event_monitoring_storage.htm#storage-events
[13]: https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_eventlogfile_supportedeventtypes.htm
[14]: https://docs.datadoghq.com/help/

