---
last_modified: 2015/07/17
translation_status: complete
language: ja
title: Datadog-VictorOps Integration
integration_title: VictorOps
kind: integration
doclevel: basic
---

<!-- Send Datadog alerts to VictorOps and gain fine-grained control over routing and escalation.

Get the right eyes on a problem faster, and reduce time to resolution.
Create alerts using @victorops
From your event stream
By taking a snapshot
When a metric alert is triggered -->

<!-- # Enable Datadog integration on VictorOps

1. On your VictorOps settings page, click "Integrations"
2. Click "Datadog", then "Enable Integration"
3. Copy your key
4. Back to Datadog, paste the API key in the next section here -->

## 概要

VictorOpsと連携することで、Datadogで検知したアラートを、非常に高い制度での通知とエスカレーションを実現します。

## 設定

1. VictorOpsのサイトでインテグレーションの設定ページを表示します。

2. 右側にあるメニューより"Datadog"を選択し、"Enable Integration"をクリックします。

    {{< img src="integrations/victorops/VO_settings.jpg" alt="vo_settings" >}}

3. VictorOps APIキーをコピーします。

    {{< img src="integrations/victorops/VO_settings_2.jpg" alt="vo_settings_2" >}}

4. DatadogのVictorOpsインテグレーションのポップアップ画面で、先にコピーしたAPIキーを記述します。

5. Datadogの各Monitorのアラートの通知欄に @victorops を追記して、メッセージを記述しておきます。

## VictorOps Routing Keysについて

### VictorOps上の特定のユーザーに対してのアラート

VictorOps上の特定ユーザーの"Routing Key"を、全てDatadog側に追加しておいてください。(もしもこの欄に指定がない場合は、VictorOpsは、デフォルトグループに対してアラートを通知します。)

使用可能な文字列は、大小文字英数、`_`と`-`が使用可能です。**それ以外の特殊文字などは使用出来ません。**
