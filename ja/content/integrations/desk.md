---
last_modified: 2015/07/05
translation_status: complete
language: ja
title: Datadog-Desk Integration
integration_title: Desk
kind: integration
git_integration_title: desk
doclevel:
---

<!-- ## Overview

Connect Desk to Datadog to:

- Receive new case events in the event stream
- Visualize case stats by user and status
- View trends in support tickets alongside DevOps issues -->

## 概要

次の目的の為に、DeskとDatadogを連携します:

- Deskで発生した新しいイベントをDatadogのイベントストリームで表示する
- ユーザーやステータスごとのケース統計を可視化する
- サポートチケットのトレンドを、DevOpsの問題点と合わせて把握する

<!-- ## Configuration

From your Desk account, add an API application on the Settings -> API -> My Applications page (you made need administrator privileges.

Fill out the form as shown, leaving the latter two URL fields blank. Desk should then generate a consumer key, consumer secret, access token, and access secret for your application.

{{< img src="desk_config.png" >}}

Then from your Datadog account, enter the corresponding information on the [Desk tile](https://app.datadoghq.com/account/settings#integrations/desk). You will also need to enter your company's unique Desk domain name.

Hit the install button, and then you're all set! You will soon be able to select desk.* metrics on a custom dashboard or view them on the provided [Desk dashboard](https://app.datadoghq.com/screen/integration/desk). (You can also read about this integration on [our blog](https://www.datadoghq.com/blog/keep-support-team-page-salesforce-desk-integration/).) -->

## 設定

Deskのアカウントにログインし、`Setting` -> `API` -> `My Application` ページと移動し、APIアプリケーションを追加します。(この操作には、Admin権限が必要です。)

以下の画像のように、**Name** と **Website URL** に入力を済ませ、それ以外のURL項目はブランクにしておきます。Addをクリックすると、Deskが自動でconsumer key、 consumer secret、 access token、access secretを生成します。

{{< img src="integrations/desk/desk_config.png" alt="desk config" >}}

次に、Datadogインテグレーションページから[Deskのタイル](https://app.datadoghq.com/account/settings#integrations/desk)を選択し、先ほどDeskで生成した認証情報を入力します。
又このタイルでは、あなたの会社に割り当てられたDeskドメイン名を入力する必要があります。

最後に、`install`ボタンをクリックすると設定は終了です。しばらくすると、Deskから取得したメトリクス( desk.* )をカスタムダッシュボードで選択出来るようになります。又、予めDeskインテグレーションに備え付けられた[ダッシュボード](https://app.datadoghq.com/screen/integration/desk)でも、メトリクスが表示されるようになります。

Deskのインテグレーションに関しては、blog記事[「Keep support on the same page with the Salesforce Desk integration」](https://www.datadoghq.com/blog/keep-support-team-page-salesforce-desk-integration/)でも紹介しています。
