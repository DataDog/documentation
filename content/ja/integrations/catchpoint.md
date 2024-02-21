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
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: catchpoint
integration_id: catchpoint
integration_title: Catchpoint
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: catchpoint
oauth: {}
public_title: Catchpoint
short_description: Catchpoint のアラートを Datadog イベントストリームへ送信。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::問題の追跡
  - Category::ネットワーク
  configuration: README.md#Setup
  description: Catchpoint のアラートを Datadog イベントストリームへ送信。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Catchpoint
---



## 概要

Catchpoint は、素晴らしいユーザーエクスペリエンスの提供に役立つデジタルパフォーマンス分析プラットフォームです。

Catchpoint を Datadog と接続すると、以下のことができます。

-   イベントストリームで包括的なアラートを構成できます。
-   Catchpoint ポータル内の分析チャートに直接リンクできます。
-   タイプタグに対してアラートを生成して簡単に絞り込むことができます。

{{< img src="integrations/catchpoint/catchpoint_event.png" alt="catchpoint event" popup="true">}}

## セットアップ

### APM に Datadog Agent を構成する

インストールは必要ありません。

### 構成

ストリームに Catchpoint のアラートを取り込むには、Catchpoint ポータルにログインし、_Settings -> API_ に移動します。

1. Alerts API で Enable を選択します。
2. DataDog エンドポイント URL を入力します。

    ```text
    https://app.datadoghq.com/api/v1/events?api_key=<YOUR_DATADOG_API_KEY>
    ```

    DataDog の API キーは、DataDog サイトで作成できます。

3. Status を Active に設定します。
4. Format は Template を選択します。
5. 新しいテンプレートを追加します。
6. テンプレート名 (例: `DataDog`) を入力し、Format を JSON に設定します。
7. 以下の JSON テンプレートを使用し、これを保存します。

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

セットアップ後、Catchpoint は Datadog の Events ストリームにアラートを直接送信します。
![s2][1]


### メトリクスのコンフィギュレーション

1. Test Data Webhook で Datadog API エンドポイントと API キーを追加します
2. "Template" を選択します
3. ドロップダウンで "Add New" をクリックします
4. 名前を入力します
5. フォーマット下で "JSON" を選択します
6. 以下の JSON テンプレートを貼り付けて "Save" をクリックします

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

Catchpoint インテグレーションは、Catchpoint イベントを Datadog のイベントストリームにプッシュします。

### サービスのチェック

Catchpoint インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: images/configuration.png
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/catchpoint/catchpoint_metadata.csv
[3]: https://docs.datadoghq.com/ja/help/