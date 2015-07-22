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

### 概要
{:#int-overview}

VictorOpsと連携することで、Datadogで検知したアラートを、非常に高い制度での通知とエスカレーションを実現します。

### 設定
{:#int-setup}

1. VictorOpsのサイトでインテグレーションの設定ページを表示します。

2. 右側にあるメニューより"Datadog"を選択し、"Enable Integration"をクリックします。

    ![](/static/images//VO_settings.jpg)

3. VictorOps APIキーをコピーします。

    ![](/static/images//VO_settings_2.jpg)

4. DatadogのVictorOpsインテグレーションのポップアップ画面で、先にコピーしたAPIキーを記述します。

5. Datadogの各Monitorのアラートの通知欄に @victorops を追記して、メッセージを記述しておきます。


<!-- # VictorOps Routing Keys

Direct alerts to certain VictorOps users
Please list all the routing keys to be used on Datadog (if none are set up here, VictorOps will send the alert to the default group).

You will then be able to choose which VictorOps endpoint should receive the alert by using @victorops

Special characters are not allowed in the names. Upper/lower case letters, numbers, `_` and `-` are allowed.

# Choose a custom endpoint

If this field is left empty, the default endpoint will be `https://alert.victorops.com/integrations/datadog/20140523/alert` -->


### VictorOps Routing Keysについて

#### VictorOps上の特定のユーザーに対してのアラート

VictorOps上の特定ユーザーの"Routing Key"を、全てDatadog側に追加しておいてください。(もしもこの欄に指定がない場合は、VictorOpsは、デフォルトグループに対してアラートを通知します。)

使用可能な文字列は、大小文字英数、`_`と`-`が使用可能です。**それ以外の特殊文字などは使用出来ません。**
