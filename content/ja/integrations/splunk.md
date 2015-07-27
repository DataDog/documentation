---
last_modified: 2015/07/17
translation_status: complete
language: ja
title: Datadog-Splunk Integration
integration_title: Splunk
kind: integration
doclevel: basic
---

<!-- ### Overview
{:#int-overview}

Connect your Splunk log monitoring to be able to:

- Get notified of your reports.
- Correlate these reports with your other metrics
- Collaborate with your team on the events -->

### 概要
{:#int-overview}

次の目的の為に、Splunkのログ監視とDatadogを連携します:

* ログレポートに基づいて、通知を受ける
* ログレポートと他のアプリケーションの情報を連携し状況を把握する
* イベントの発生を検知し、チームで共同して作業をする


<!-- To receive your reports from Splunk into Datadog, you need to have `dogapi` installed

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

You can now configure your splunk reports to exectue this script in order to get published into Datadog -->

### 設定
{:#int-configuration}

1. pythonパッケージの`datadog`をインストールします。

        pip install datadog

2. `Integrations`タブ -> [`APIs`](https://app.datadoghq.com/account/settings#api)を選択し、APIキーを取得します。

3. $SPLUNK_HOME/bin/scriptsディレクトリに、`dog-splunk.sh`を準備します。

        #!/bin/bash
        API_KEY= your_api_key
        APP_KEY= your_application_key
        dog --api-key $API_KEY --application-key $APP_KEY event post \
        "Found $SPLUNK_ARG_1 events in splunk" \
        "Matching $SPLUNK_ARG_2 based on $SPLUNK_ARG_5, from report $SPLUNK_ARG_4. More details at $SPLUNK_ARG_6." \
        --aggregation_key $SPLUNK_ARG_3 --type splunk

    - メッセージ部分に @mention 記法を追加することにより、Datadogの通知機能を使って、特定のメンバーにイベントを再転送することも出来ます。
    - メッセージ部分に使用しているSplunk専用の引数に関しては、Splunkサイトにある[「Community:Use Splunk alerts with scripts to create a ticket in your ticketing system Generate a ticket in your ticketing system from a Splunk alert」](https://wiki.splunk.com/Community:Use_Splunk_alerts_with_scripts_to_create_a_ticket_in_your_ticketing_system)を参照していください。

4. Splunk側でsplunk reportsに`dog-splunk.sh`を実行するように設定し、SplunkのイベントをDatadogへ送信するようにします。
