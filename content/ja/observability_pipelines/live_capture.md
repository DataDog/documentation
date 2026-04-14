---
disable_toc: false
further_reading:
- link: /observability_pipelines/set_up_pipelines/
  tag: ドキュメント
  text: パイプラインをセットアップ
title: Live Capture
---

## 概要

Live Capture を使用すると、ソースがパイプライン経由で送信するデータと、プロセッサが受信および送信するデータを確認できます。
具体的には、次の情報が表示されます。
- データがいつ受信されたかを示すタイムスタンプ
- 送信されたデータと、そのデータが以下のいずれに該当するか
    - Modified
    - Unmodified
    - Dropped
    - Reduced

ログの `message` フィールドが Parse XML プロセッサによって処理される前後を示す Live Capture の例。

{{< img src="observability_pipelines/processors/live-capture-example.png" alt="entry 列には message フィールドの元の値が表示され、exit 列には XML としてパースされた値が表示されている" style="width:100%;" >}}

## 権限

キャプチャを設定できるのは、`Observability Pipelines Live Capture Write` 権限を持つユーザーのみです。`Observability Pipelines Live Capture Read` 権限を持つユーザーは、キャプチャ済みのイベントのみを表示できます。Observability Pipelines アセットに対する権限の一覧は、[Observability Pipelines の権限][1] を参照してください。

管理者にはデフォルトで読み取りと書き込みの権限があります。標準ユーザーにはデフォルトで読み取り権限のみが付与されます。デフォルトの Datadog ロールとカスタムロールの作成方法の詳細は、[アクセス制御][2] を参照してください。

## イベントをキャプチャする

1. [Observability Pipelines][3] に移動します。
1. パイプラインを選択します。
1. イベントをキャプチャするソースまたはプロセッサの歯車アイコンをクリックします。
1. サイドパネルの **Capture and view events** を選択します。
1. **Capture** をクリックします。
1. **Confirm** をクリックしてイベントのキャプチャを開始します。<br>**注**: イベントのキャプチャには最大 60 秒程度かかります。キャプチャされたデータは閲覧権限を持つすべてのユーザーに表示され、Datadog Platform に 72 時間保存されます。
1. キャプチャ完了後、特定のキャプチャイベントをクリックすると、受信および送信されたデータを確認できます。検索バーで特定のイベントを検索できます。検索バー横のドロップダウンメニューで、ステータス (`MODIFIED`、`UNMODIFIED`、`DROPPED`、`REDUCED`) に基づいてイベントを表示できます。
    - **Capture N** はキャプチャのリクエスト番号を表します。例えば、最初のキャプチャでは `1`、6 番目のキャプチャでは `6` です。
    - 赤でハイライトされているデータは、変更または破棄されたことを示します。
    - 緑字でハイライトされている部分は、新しく追加されたデータを示します。

## 関連情報

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/permissions/#observability-pipelines
[2]: /ja/account_management/rbac/
[3]: https://app.datadoghq.com/observability-pipelines