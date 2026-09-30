---
aliases:
- /ja/observability_pipelines/live_capture/
description: Live Capture を使用して、Observability Pipelines パイプラインを通じてソースが受信するデータとプロセッサが送信するデータを確認する方法を学びます。
disable_toc: false
further_reading:
- link: /observability_pipelines/configuration/set_up_pipelines/
  tag: ドキュメント
  text: パイプラインをセットアップする
- link: https://www.datadoghq.com/blog/observability-pipelines-google-secops/
  tag: ブログ
  text: Observability Pipelines を使用してセキュリティログを Google SecOps UDM に正規化する
- link: https://www.datadoghq.com/blog/mitre-attack-enrichment-packs-observability-pipelines/
  tag: ブログ
  text: SIEM に到達する前に、MITRE ATT&CK コンテキストを用いてセキュリティログを自動的にエンリッチ化する
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: メトリクス
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Live Capture
---
{{< product-availability >}}

## 概要 {#overview}

Live Capture を使用して、ソースがパイプラインを通じて送信するデータと、プロセッサが受信および送信するデータを確認します。
具体的には、以下の情報が表示されます。
- データが受信されたタイムスタンプ
- 送信されたデータと、そのデータが以下のいずれであるか:
    - 修正済み
    - 未修正
    - ドロップ済み
    - 縮小済み

Parse JSON プロセッサによって処理される前後のログの `message` フィールドを示す Live Capture の例です。

{{< img src="observability_pipelines/live_capture_parse_json.png" alt="entry 列には元のメッセージフィールドの値が表示され、exit 列には JSON として解析された値が表示されます。" style="width:100%;" >}}

## 権限 {#permissions}

`Observability Pipelines Live Capture Write` 権限を持つユーザーのみがキャプチャを設定できます。`Observability Pipelines Live Capture Read` 権限を持つユーザーは、すでにキャプチャされたイベントの表示のみが可能です。Observability Pipelines アセットの権限リストについては、[Observability Pipelines 権限][1] を参照してください。

管理者はデフォルトで読み取り権限と書き込み権限を持っています。標準ユーザーはデフォルトで読み取り権限のみを持っています。デフォルトの Datadog ロールおよびカスタムロールの作成方法の詳細については、[Access Control][2] を参照してください。

### ファイアウォールの許可リストにドメインを追加します {#add-domains-to-firewall-allowlist}

Live Capture を使用し、かつファイアウォールを利用している場合は、これらのドメインを許可リストに追加する必要があります。

- `api。{{< region-param key="dd_site" >}}`
- `obpipeline-intake。{{< region-param key="dd_site" >}}`
- `config。{{< region-param key="dd_site" >}}`

## イベントのキャプチャ {#capture-events}

1. [Observability Pipelines][3] に移動します。
1. パイプラインを選択します。
1. イベントをキャプチャするソースまたはプロセッサの歯車をクリックします。
1. サイドパネルで {{< ui >}}Capture and view events{{< /ui >}} を選択します。
1. {{< ui >}}Capture{{< /ui >}} をクリックします。
1. **任意の構成**:
  {{< img src="observability_pipelines/live_capture_optional_config.png" alt="フィルタークエリ、キャプチャ期間、および Worker 選択オプションを示す Live Capture の任意の構成モーダル" style="width:60%;" >}}
  **注**: 任意の構成は、すべてのアクティブな Worker がバージョン 2.13 以降である場合にのみ使用できます。
    1. キャプチャするイベントを指定するクエリを入力します。詳細については、[ログの検索構文][4] または [メトリクスの検索構文][5] を参照してください。
    1. イベントをキャプチャする期間 (秒または分) を入力します。
        - 最小期間 (期間が指定されていない場合のデフォルト): 30 秒
        - 最大期間: 300 秒 (5 分)
    1. イベントをキャプチャする Worker を選択します。Worker が選択されていない場合は、ランダムに Worker が選択されます。
1. イベントのキャプチャを開始するには、{{< ui >}}Capture{{< /ui >}} をクリックします。<br>**注**: キャプチャされたイベントが UI に表示されるまで最大 60 秒かかる場合があります。キャプチャされたデータは、表示権限を持つすべてのユーザーに表示され、Datadog Platform に 72 時間保存されます。
1. キャプチャが完了した後:
    1. 特定のキャプチャイベントをクリックすると、受信および送信されたデータを確認できます。検索バーで特定のイベントを検索することもできます。検索バーの横にあるドロップダウンメニューを使用して、ステータス (`MODIFIED`、`UNMODIFIED`、`DROPPED`、および`REDUCED`) に基づいてイベントを表示します。
    1. {{< ui >}}Workers - Capture Execution Details{{< /ui >}} セクションで、{{< ui >}}View Logs{{< /ui >}} をクリックして、キャプチャの Worker のログを表示します。
1. 同じコンポーネントの他のキャプチャを表示するには、サイドパネルの左上にある {{< ui >}}Captures{{< /ui >}} をクリックします。**注**: 他のキャプチャの表示は、すべてのアクティブな Worker がバージョン 2.13 以降である場合にのみ適用されます。
   - キャプチャイベント ID、フィルタのクエリ、パイプラインバージョン、またはステータス (`in_progress` または `completed`) でキャプチャをフィルタリングできます。
   - {{< ui >}}Total Events{{< /ui >}} 列の場合、イベントの入力と出力の両方を含めると、Worker あたりの最大キャプチャイベント数は 200 です。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/permissions/#observability-pipelines
[2]: /ja/account_management/rbac/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /ja/observability_pipelines/search_syntax/logs
[5]: /ja/observability_pipelines/search_syntax/metrics