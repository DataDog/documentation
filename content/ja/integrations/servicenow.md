---
last_modified: 2015/07/17
translation_status: original
language: ja
title: Datadog-ServiceNow Integration
integration_title: ServiceNow
kind: integration
doclevel: full
---

### 概要
{:#int-overview}

<!-- ServiceNow is an IT service management platform for recording, tracking, and managing a company’s enterprise-level IT processes in a single location. This integration allows you to create tickets from triggered alarms in Datadog. Additionally, you can add Datadog-generated graphs and comments to ServiceNow tickets, as well as manage the resolution workflow from within Datadog -->

ServiceNowは、エンタープライズレベルのプロセスを一箇所で記録、追跡、マネージするITサービス管理プラットフォームです。このインテグレーションを使うことにより、Datadogが検知したアラートをServiceNow上でチケットとして登録が出来るようになります。チケットには、Datadogでキャプチャしたグラフ画像やDatadogに設定したメッセージも追加出来ます。更に、Datadog側からメッセージを送信し、オープンしているチケットのクローズ処理をすることも出来ます。

<!-- ### Configure ServiceNow

To configure the ServiceNow integration, enter your ServiceNow instance name, and the username and password. We recommend creating a new user for the Datadog integration.

![servicenow integration](/static/images/servicenow-configuration.png) -->

### 設定
{:#configuration}

ServiceNowの統合を設定するには、ServiceNowインスタンス名、およびユーザ名とパスワードを入力します。Datadog統合のための新しいユーザーを作成することを推奨します。

![servicenow integration](/static/images/servicenow-configuration.png)


<!-- ### Auto-generate support tickets from Datadog alerts

Now, you can set these alerts to automatically create support tickets and send them to the ServiceNow ticketing queue. From there, your support team will be notified of issues using the communication workflows that you have already established inside ServiceNow. All you have to do is mention @servicenow in the alert message or add @servicenow to the notification list for that monitor.

![ServiceNow](/static/images/servicenow-02-monitor-page.png) -->

#### Datadogのアラートからサポートチケットを自動で生成する

自動的にサポートチケットを作成し、ServiceNowのチケットキューに送信するためにこれらのアラートを設定することができます。そこから、サポートチームには、すでにServiceNow内部に設置していた通信ワークフローを使用して問題が通知されます。しなければならないのは、警告メッセージに@servicenow言及か、そのモニターの通知リストに@servicenowの追加です。

![ServiceNow](/static/images/servicenow-02-monitor-page.png)


<!-- ### Automate support resolution workflow

Once the monitor state returns to normal, the associated support ticket is automatically marked as “resolved”.

![ServiceNow Resolved](/static/images/servicenow-03-servicenow-resolved.png) -->

#### Automate support resolution workflow

モニターの状態が正常に戻った後は、関連するサポートチケットは、自動的に「解決」としてマークされています。

![ServiceNow Resolved](/static/images/servicenow-03-servicenow-resolved.png)


<!-- ### Send Datadog graphs to ServiceNow

In addition to automating ticket creation and resolution, you can also use Datadog to create ServiceNow tickets on an ad hoc basis whenever you see something in Datadog that needs your team’s attention. Just click the camera icon to share a snapshot of any Timeboard graph, add some context in the comment box to help your colleagues interpret the graph, and @mention ServiceNow to send the graph and your comments to ServiceNow.

![annotation](/static/images/servicenow-04-mention-servicenow.png) -->

#### Send Datadog graphs to ServiceNow

チケットの作成と解決を自動化することに加えて、あなたも、あなたのチームの注意が必要Datadogで何かを見るたびに臨時にServiceNowチケットを作成する為にDatadogを使用することも出来ます。ただ、いずれのTimeboardグラフのスナップショットを共有するためにカメラのアイコンをクリックして、あなたの同僚が、グラフの解釈を助けるためにコメント欄に、いくつかのコンテキストを追加し、@mentionのServiceNowはグラフとServiceNowにコメントを送信します。

![annotation](/static/images/servicenow-04-mention-servicenow.png)
