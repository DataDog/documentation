---
disable_toc: false
further_reading:
- link: /observability_pipelines/guide/remap_reserved_attributes/
  tag: ドキュメント
  text: 予約済み属性の再マッピング
- link: /logs/guide/regex_log_parsing/
  tag: ガイド
  text: 正規表現を使用した効果的な Grok パースルールの作成
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: ブログ
  text: Observability Pipelines を使用して AI アプリから ClickHouse および Datadog へ OTel データをルーティングする
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: メトリクス
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: カスタムプロセッサ
---
{{< product-availability >}}

## 概要 {#overview}

このプロセッサを Vector Remap Language (VRL) と共に使用して、ログやメトリクスを変更およびエンリッチします。VRL は、データの変換用に設計された、式指向のドメイン固有言語です。可観測性のユースケース向けの組み込み関数を備えています。以下の方法でカスタム関数を使用できます。

- [配列](#array)、[文字列](#string)、およびその他のデータ型を操作する。
- [コーデック](#codec)を使用して値をエンコードおよびデコードする。
値を- [暗号化](#encrypt)および[復号化](#decrypt)する。
あるデータ型を別のデータ型に- [強制変換](#coerce)する (例: 整数から文字列へ)。
- [syslog の値を変換](#convert)して読み取り可能にする。
- [エンリッチメントテーブル](#enrichment)を使用して値をエンリッチする。
- [IP 値を操作する](#ip)。
- ハバーシン公式を使用して[地理的距離](#map)と方位を計算する。
カスタムルール (grok、正規表現など) や標準機能 (syslog、apache、VPC フローログなど) を使用して値を- [パース](#parse)する。詳細については、[正規表現を使用した効果的な Grok パースルールの作成][3]を参照してください。
- イベント[パス](#path)を操作する。

利用可能な関数の全リストについては、[カスタム関数](#custom-functions)を参照してください。

カスタムプロセッサを使用して手動および動的に属性を再マッピングする方法については、[予約済み属性の再マッピング][1]を参照してください。

## セットアップ{#setup}

このプロセッサをセットアップするには:

- まだ関数を作成していない場合は、[{{< ui >}}Add custom processor{{< /ui >}}] (カスタムプロセッサを追加) をクリックし、[関数を追加する](#add-a-function)の指示に従って関数を作成します。
- すでにカスタム関数を追加している場合は、[{{< ui >}}Manage custom processors{{< /ui >}}] (カスタムプロセッサを管理) をクリックします。リスト内の関数をクリックして、編集または削除します。検索バーを使用して、名前で関数を検索できます。[関数を追加](#add-a-function)するには [{{< ui >}}Add Custom Processor{{< /ui >}}] をクリックします。

### 関数を追加する {#add-a-function}

1. カスタムプロセッサの名前を入力します。
1. [カスタム関数][1]を使用してデータを変更するスクリプトを追加します。[{{< ui >}}Autofill with Example{{< /ui >}}] (例による自動入力) をクリックして、一般的なユースケースのいずれかを選択して開始することもできます。サンプルスクリプトのコピーアイコンをクリックし、スクリプトに貼り付けます。詳細については、[カスタムプロセッサの利用を開始する][2]を参照してください。
1. 処理中にエラーが発生したイベントを破棄する場合は、[{{< ui >}}Drop events on error{{< /ui >}}] (エラーが発生したらイベントを破棄する) をチェックします。
1. サンプルイベントを入力します。
1. [{{< ui >}}Run{{< /ui >}}] (実行) をクリックして、そのイベントを関数がどのように処理するかをプレビューします。スクリプトの実行後、イベントの出力結果を確認できます。
1.  [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

## カスタム関数 {#custom-functions}

{{< whatsnext desc="関数は以下のカテゴリに分類されています。" >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#array" >}}配列{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#codec" >}}コーデック{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#convert" >}}変換{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#cryptography" >}}暗号化{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#debug" >}}デバッグ{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#enrichment" >}}エンリッチメント{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#ip" >}}IP{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#map" >}}マップ{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#number" >}}数値{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#object" >}}オブジェクト{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#parse" >}}パース{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#path" >}}パス{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#random" >}}ランダム{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#string" >}}文字列{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#system" >}}システム{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#timestamp" >}}タイムスタンプ{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#type" >}}タイプ{{< /nextlink >}}
{{< /whatsnext >}}

{{< vrl-functions >}}

## ヘルスメトリクス {#health-metrics}

すべてのプロセッサから出力される[コンポーネントメトリクス][4]および[プロセッサバッファメトリクス][5]については、[パイプライン使用状況メトリクス][6]のドキュメントを参照してください。カスタムプロセッサメトリクスでフィルタリングまたはグループ化するには、タグ `component_type:remap_vrl` を使用します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/observability_pipelines/guide/remap_reserved_attributes
[2]: /ja/observability_pipelines/guide/get_started_with_the_custom_processor
[3]: /ja/logs/guide/regex_log_parsing/
[4]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[5]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[6]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/