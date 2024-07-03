---
app_id: catchpoint
app_uuid: e80ef287-1a1a-4b73-94e7-3c1d6fe66eaf
assets:
  dashboards:
    catchpoint: assets/dashboards/Catchpoint_dashboard.json
  integration:
    auto_install: true
    events:
      creates_events: true
    metrics:
      check:
      - catchpoint.success.rate
      metadata_path: metadata.csv
      prefix: catchpoint.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 132
    source_type_name: Catchpoint
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
- issue tracking
- network
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: catchpoint
integration_id: catchpoint
integration_title: Catchpoint
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: catchpoint
public_title: Catchpoint
short_description: Send your Catchpoint alerts to your Datadog event stream.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Issue Tracking
  - Category::Network
  configuration: README.md#Setup
  description: Send your Catchpoint alerts to your Datadog event stream.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Catchpoint
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Catchpoint is a Digital Performance Analytics platform that provides you with complete, actionable insights and visibility into your entire digital ecosystem.

The Catchpoint integration allows you to:

-   Configure comprehensive alerts in your Event Stream.
-   Access direct links to Analysis Charts in the Catchpoint Portal.
-   Set Alert Type tags to filter events more effectively.

## セットアップ

### インストール

No installation is required.

### 構成

To get Catchpoint alerts into your Event Stream, login to the Catchpoint Portal and go to _Settings_ > _API_.

1. In the Alerts API, select Enable.

   {{< img src="integrations/catchpoint/catchpoint_configuration.png" alt="catchpoint event" popup="true">}}

2. Enter the Datadog API endpoint URL.

    ```text
    https://app.datadoghq.com/api/v1/events?api_key=<YOUR_DATADOG_API_KEY>
    ```

    You can choose an existing Datadog API key, or create an API key on the [**Configure** tab of the integration tile][1].

3. Set Status to Active.
4. Select Template for Format.
5. Add a new template.
6. Enter the template name, such as `DataDog`, and set the Format to JSON.
7. Use the following JSON template and save it.

   ```json
   {
       "title": "${TestName} [${TestId}] - ${switch(${notificationLevelId},'0','WARNING','1','CRITICAL','3','OK')}",
       "text": "${TestName} - http://portal.catchpoint.com/ui/Content/Charts/Performance.aspx?tList=${testId}&uts=${alertProcessingTimestampUtc}&z=&chartView=1",
       "priority": "normal",
       "tags": [
           "alertType:${Switch(${AlertTypeId},'0', 'Unknown','2', 'Byte Length','3','Content Match','4', 'Host Failure','7', 'Timing','9', 'Test Failure', '10',Insight', '11','Javascript Failure', '12', 'Ping',13, 'Requests')}"
       ],
       "alert_type": "${switch(${notificationLevelId},'0','warning','1','error','3','success')}",
       "source_type_name": "catchpoint"
   }
   ```

Catchpoint sends alerts directly to the [Events Explorer][2] in Datadog.

{{< img src="integrations/catchpoint/catchpoint_event.png" alt="catchpoint event" popup="true">}}

### Metric collection

To receive Catchpoint metrics in Datadog, create a Test Data Webhook in the Catchpoint Portal.

1. In the Test Data Webhook, add the Datadog API endpoint along with the API key.
2. Select "Template".
3. Click "Add New" from the dropdown menu.
4. Enter a name.
5. Select "JSON" under format.
6. Paste the following JSON template and click "Save".

```json
{
    "series": [
        {
            "metric": "catchpoint.error.error",
            "points": [["${timestampepoch}", "${if('${errorany}', 1, 0)}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}",
                "ErrorCode : ${errorcode}",
                "ErrorDescription : ${errorconnection}${errordns}${errorload}${errorloadobjects}${errorssl}${errorsystemlimit}${errortimeout}${errortransaction}"
            ],
            "type": "count"
        },
        {
            "metric": "catchpoint.success.rate",
            "points": [["${timestampepoch}", "1"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${testName}",
                "TestUrl: ${testurl}",
                "ErrorType:${if(${errordns},'DNS',${errorconnection},'Connection',${errorssl},'SSL',${errorload},'Response',${errortransaction},'Transaction',${errortimeout},'Timeout',${errorsystemlimit},'Limit','Success')}",
                "ErrorContent:${errorloadobjects}"
            ],
            "type": "count"
        },
        {
            "metric": "catchpoint.frontend.client_time",
            "points": [["${timestampepoch}", "${timingclient}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.network.tcp_connect_time",
            "points": [["${timestampepoch}", "${timingconnect}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.content_load_time",
            "points": [["${timestampepoch}", "${timingcontentload}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.network.dns_resolution_time",
            "points": [["${timestampepoch}", "${timingdns}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.document_complete_time",
            "points": [
                [
                    "${timestampepoch}",
                    "${timingdocumentcomplete}",
                    "TestUrl: ${testurl}"
                ]
            ],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.dom_content_load_time",
            "points": [["${timestampepoch}", "${timingdomcontentloadedevent}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.dom_interactive_time",
            "points": [
                [
                    "${timestampepoch}",
                    "${timingdominteractive}",
                    "TestName: ${TestName}",
                    "TestUrl: ${testurl}"
                ]
            ],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.dom_load_time",
            "points": [
                [
                    "${timestampepoch}",
                    "${timingdomload}",
                    "TestName: ${TestName}",
                    "TestUrl: ${testurl}"
                ]
            ],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.first_party_zone_impact",
            "points": [["${timestampepoch}", "${timingimpactself}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.third_party_zone_impact",
            "points": [["${timestampepoch}", "${timingimpactthirdparty}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.load_time",
            "points": [["${timestampepoch}", "${timingload}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.total_root_request_redirect_time",
            "points": [["${timestampepoch}", "${timingredirect}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.render_start_time",
            "points": [["${timestampepoch}", "${timingrenderstart}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.total_root_request_time",
            "points": [["${timestampepoch}", "${timingresponse}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.network.send_time",
            "points": [["${timestampepoch}", "${timingsend}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.network.ssl_time",
            "points": [["${timestampepoch}", "${timingssl}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.time_to_title",
            "points": [["${timestampepoch}", "${timingtimetotitle}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.total_test_time",
            "points": [["${timestampepoch}", "${timingtotal}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.network.wait_time",
            "points": [["${timestampepoch}", "${timingwait}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.webpage_response_time",
            "points": [["${timestampepoch}", "${timingwebpageresponse}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.wire_time",
            "points": [["${timestampepoch}", "${timingwire}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ping.percentage.ping_packet_loss",
            "points": [["${timestampepoch}", "${pingpacketlosspct}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ping.ping_round_trip_time",
            "points": [["${timestampepoch}", "${pingroundtriptimeavg}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.imap.message_fetch_time",
            "points": [["${timestampepoch}", "${timingfetch}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.imap.message_list_time",
            "points": [["${timestampepoch}", "${timinglist}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.imap.logout_time",
            "points": [["${timestampepoch}", "${timinglogout}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.imap.message_search_time",
            "points": [["${timestampepoch}", "${timingsearch}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ftp.total_download_bytes",
            "points": [["${timestampepoch}", "${bytedownload}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ftp.total_get_bytes",
            "points": [["${timestampepoch}", "${byteget}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ftp.uploaded_bytes",
            "points": [["${timestampepoch}", "${byteupload}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ftp.delete_time",
            "points": [["${timestampepoch}", "${timingdelete}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ftp.download_time",
            "points": [["${timestampepoch}", "${timingdownload}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ftp.get_time",
            "points": [["${timestampepoch}", "${timingget}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ftp.upload_time",
            "points": [["${timestampepoch}", "${timingupload}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ntp.root_delay_time",
            "points": [["${timestampepoch}", "${timingrootdelay}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ntp.root_dispersion_time",
            "points": [["${timestampepoch}", "${timingrootdispersion}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ntp.round_trip_delay_time",
            "points": [["${timestampepoch}", "${timingroundtripdelay}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.ntp.ntp_time",
            "points": [["${timestampepoch}", "${timinglocalclockoffset}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "millisecond"
        },
        {
            "metric": "catchpoint.frontend.total_self_zone_bytes",
            "points": [["${timestampepoch}", "${byteresponseselfzone}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "byte"
        },
        {
            "metric": "catchpoint.frontend.total_response_content_bytes",
            "points": [["${timestampepoch}", "${byteresponsetotalcontent}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "byte"
        },
        {
            "metric": "catchpoint.frontend.total_response_header_bytes",
            "points": [["${timestampepoch}", "${byteresponsetotalheaders}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "byte"
        },
        {
            "metric": "catchpoint.frontend.root_request_response_content_bytes",
            "points": [["${timestampepoch}", "${byteresponsecontent}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "byte"
        },
        {
            "metric": "catchpoint.frontend.root_request_response_header_bytes",
            "points": [["${timestampepoch}", "${byteresponseheaders}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "byte"
        },
        {
            "metric": "catchpoint.frontend.total_downloaded_bytes",
            "points": [["${timestampepoch}", "${bytereceive}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge",
            "unit": "byte"
        },
        {
            "metric": "catchpoint.frontend.total_number_of_connections",
            "points": [["${timestampepoch}", "${counterconnections}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge"
        },
        {
            "metric": "catchpoint.frontend.total_number_of_failed_requests",
            "points": [["${timestampepoch}", "${counterfailedrequests}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge"
        },
        {
            "metric": "catchpoint.frontend.total_number_of_filmstrip_images",
            "points": [["${timestampepoch}", "${counterfilmstripimages}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge"
        },
        {
            "metric": "catchpoint.frontend.total_number_of_hosts",
            "points": [["${timestampepoch}", "${counterhosts}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge"
        },
        {
            "metric": "catchpoint.frontend.total_number_of_js_errors",
            "points": [["${timestampepoch}", "${counterjsfailures}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge"
        },
        {
            "metric": "catchpoint.frontend.total_number_of_redirect",
            "points": [["${timestampepoch}", "${counterredirections}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge"
        },
        {
            "metric": "catchpoint.frontend.total_number_of_requests",
            "points": [["${timestampepoch}", "${counterrequests}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge"
        },
        {
            "metric": "catchpoint.frontend.page_speed_score",
            "points": [["${timestampepoch}", "${scorepagespeed}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge"
        },
        {
            "metric": "catchpoint.frontend.speed_index_score",
            "points": [["${timestampepoch}", "${scorespeedindex}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge"
        },
        {
            "metric": "catchpoint.frontend.above_the_fold_time",
            "points": [["${timestampepoch}", "${timingabovethefold}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge"
        },
        {
            "metric": "catchpoint.frontend.authentication_time",
            "points": [["${timestampepoch}", "${timingauth}"]],
            "tags": [
                "NodeName: ${nodename}",
                "TestId:${testid}",
                "TestName: ${TestName}",
                "TestUrl: ${testurl}"
            ],
            "type": "gauge"
        }
    ]
}
```

## 収集データ

### メトリクス
{{< get-metrics-from-git "catchpoint" >}}


### イベント

Events from Catchpoint appear in the Event Stream widget on the [Catchpoint Dashboard][4].

### サービスチェック

The Catchpoint integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://app.datadoghq.com/integrations/catchpoint
[2]: https://docs.datadoghq.com/ja/service_management/events/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/catchpoint/catchpoint_metadata.csv
[4]: https://app.datadoghq.com/dash/integration/32054/catchpoint-dashboard
[5]: https://docs.datadoghq.com/ja/help/