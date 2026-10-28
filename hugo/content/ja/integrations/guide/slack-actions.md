---
description: Datadog アプリがインストールされている Slack ワークスペースから直接、Slack Actions を使用してインシデント、On-Call、モニター、ダッシュボード、Workflows、Forms、アカウントを管理します。
further_reading:
- link: /integrations/slack/?tab=datadogforslack
  tag: ドキュメント
  text: Slack インテグレーション
title: Slack Actions
---
## 概要 {#overview}

Slack Actions は、Datadog アプリがインストールされているすべての Slack ワークスペースで利用できます。ワークスペースで `/dd` と入力すると、利用可能なすべてのアクションが一覧表示されたアクショントレイが開きます。または、コマンド全体を直接入力することも可能です。

## インシデント {#incidents}
インシデント関連の操作には、以下のコマンドを使用します。すべてのコマンドで、`/dd in` のエイリアスとして `/dd incident` を使用できます。詳細については、「[Datadog Incident Management と Slack のインテグレーション][2]」を参照してください。

| コマンド | 説明|
| ------------------ | ---------- |
| `/dd in` または `/dd incident` | インシデントを宣言する。|
| `/dd in test` | テストインシデントを宣言する。|
| `/dd in update`または `/dd in edit`| インシデントのタイトル、状態、重大度、属性を更新する。|
| `/dd in responders`| インシデントの対応チームを管理する。|
| `/dd in investigate` | Bits Investigation をトリガーする。|
| `/dd in summary` | AI を使用してインシデントのサマリーを生成する。Gov および Gov2 リージョンでは利用不可。|
| `/dd in notify` | @ハンドルにインシデントについて通知する。|
| `/dd in list` | オープンなインシデントを一覧表示する。|
| `/dd in private`| 現在のチャンネルをアーカイブし、プライベートチャンネルを作成して、既存のすべての対応者を追加する。|
| `/dd in public` | インシデントの読み取り権限を持つすべてのユーザーがインシデントとそのタイムラインを表示できるようにする。|
| `/dd followup` | 新しいフォローアップを作成する。|
| `/dd followup list`  | インシデントのフォローアップを一覧表示する。|
| `/dd task` | インシデントタスクを作成する。|
| `/dd task list` | インシデントタスクを一覧表示する。|
| `/dd shortcuts` | インシデントアクションを表示する。|

## On-Call {#on-call}
On-Call には以下のコマンドを使用します。詳細については、[On-Call ページ][3]を参照してください。

| コマンド | 説明|
| ------------------ | ---------- |
| `/dd page` | On-Call チームをページングする。|
| `/dd shifts`| 今後の On-Call シフトを確認する。|
| `/dd override`| On-Call シフトの代行を依頼する。|

## モニター {#monitors}
モニターには以下のコマンドを使用します。モニターへの Slack の追加に関する詳細については、「[Monitor Notifications][4]」を参照してください。

| コマンド | 説明|
| ------------------ | ---------- |
| `/dd monitors` | 現在アラートを出しているモニターを一覧表示する。|


## Dashboard {#dashboard}
[ダッシュボード][5]には以下のコマンドを使用します。

| コマンド | 説明|
| ------------------ | ---------- |
| `/dd dashboard` | ダッシュボードウィジェットをこのチャンネルに共有する。|


## Workflows {#workflows}
Workflows には以下のコマンドを使用します。Workflows での Slack の使用に関する詳細については、「[Workflows をトリガーする][6]」を参照してください。

| コマンド | 説明|
| ------------------ | ---------- |
| `/dd workflow` | 自動化ワークフローを実行する。|


## Forms {#forms}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">
<strong>Share a Form</strong> Slack Action は、 {{< region-param key="dd_site_name" >}} サイトでは利用できません。
</div>
{{% /site-region %}}

Forms には、以下のコマンドを使用してください。詳しくは、「[Forms][8]」を参照してください。

| コマンド | 説明|
| ------------------ | ---------- |
| `/dd`、次に [**Share a Form**] を選択**** | Datadog フォームを検索してこのチャンネルに共有すると、受信者は Slack 上でフォームに記入したり、Datadog で開いたりできる。|


## アカウント {#accounts}
[アカウント管理][7]には、以下のコマンドを使用します。

| コマンド | 説明|
| ------------------ | ---------- |
| `/dd accounts` | リンクされた Datadog アカウントを管理する。|


[1]: /ja/integrations/slack/?tab=datadogforslack
[2]: /ja/incident_response/incident_management/setup_and_configuration/integrations/slack/#slack-commands
[3]: /ja/incident_response/on-call/pages/#through-slack
[4]: /ja/monitors/notify/#notification-recipients
[5]: /ja/dashboards/
[6]: /ja/actions/workflows/trigger/#slack-triggers
[7]: /ja/account_management/
[8]: /ja/actions/forms/