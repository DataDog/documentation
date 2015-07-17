---
last_modified: 2015/07/17
translation_status: complete
language: ja
title: Datadog-Slack Integration
integration_title: Slack
kind: integration
doclevel: basic
---

### 概要
{:#int-overview}

次の目的で、SlackとDatadogを連携します:

* Datadog上でアラートが発生した場合に、Slackにも通知を送る
* ダッシュボード上で、キャプチャしたグラフをSlack上で共有する


<!-- * In your Slack account Administration page, go to the Integration tab and choose Datadog.
* Copy paste the service hook into the field below.
* Add the channels you want to be able to post to.
* Tick the checkbox if you want to be notified for every comment, otherwise you will need to use the @slack-channel_name syntax. -->

### 設定
{:#configuration}

* Slackのアカウント管理ページの`Integration`タブに移動し、Datadogを選択します。
* 管理ページに表示されている **Slack Service Hook** をコピーし、Datadogのインテグレーションタイルの`configuration`タブの該当欄へペーストします。
* 更に、`Channel to post to`欄に、メッセージを通知するチャネルを追加していきます。
* イベントストリームで発生している全てのコメントをSlackと連携したい場合は、`Transfer all user comments`の列にチェックマークをつけます。(チェックがない場合は、毎回 @slack-channel_name の記述が必要です。)
