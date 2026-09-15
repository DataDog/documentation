---
description: カスタムプロセッサーで Vector Remap Language (VRL) を使用して、ログ、メトリクス、またはトレースを変更およびリッチ化する方法を学びます。
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
  text: Observability Pipelines を使用して、AI アプリから ClickHouse と Datadog に OTel データをルーティングする
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: メトリクス
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: カスタムプロセッサー
---
{{< product-availability >}}

## 概要 {#overview}

このプロセッサーを Vector Remap Language (VRL) と共に使用して、ログやメトリクスを変更およびリッチ化します。VRL は、データ変換のために設計された、式指向のドメイン特化型言語です。監視可能性のユースケース向けの組み込み関数を備えています。カスタム関数は以下の方法で使用できます。

- [配列](#array)、[文字列](#string)、およびその他のデータ型を操作する。
- [コーデック](#codec)を使用して値をエンコード、デコードする。
- [暗号化](#encrypt)と[復号](#decrypt)を行う。
データ型を別のデータ型に- [変換](#coerce)する (たとえば、整数から文字列に変換する)。
- [syslog の値を読み取り可能な値に変換](#convert)する。
- [エンリッチメントテーブル](#enrichment)を使用して値をリッチ化する。
- [IP 値を操作する](#ip)。
- Haversine 公式を使用して[地理的距離](#map)と方位角を計算する。
カスタムルール (grok、regex など) や既成の関数 (syslog、apache、VPC フローログなど) を使って値を- [パース](#parse)する。詳細については、[正規表現を使用した効果的な Grok パースルールの作成][3] を参照してください。
- イベント[パス](#path)を操作する。

利用可能なすべての関数のリストについては、[カスタム関数](#custom-functions)を参照してください。

カスタムプロセッサーを使用して属性を手動および動的に再マップする方法については、[予約済み属性の再マッピング][1] を参照してください。

## セットアップ {#setup}

プロセッサーをセットアップするには、次のようにします。

- 関数をまだ作成していない場合は、[{{< ui >}}Add custom processor{{< /ui >}}] (追加) をクリックし、[関数の追加](#add-a-function)の説明に従って関数を作成してください。
- カスタム関数をすでに追加している場合は、[{{< ui >}}Manage custom processors{{< /ui >}}] (カスタムプロセッサーの管理) をクリックします。リスト内の関数をクリックして、編集または削除します。検索バーを使用して、関数を名前で検索できます。[{{< ui >}}Add Custom Processor{{< /ui >}}] (カスタムプロセッサーを追加) をクリックして、[関数を追加します](#add-a-function)。

### 関数の追加 {#add-a-function}

1. カスタムプロセッサーの名前を入力します。
1. [カスタム関数][1] を使用してデータを変更するスクリプトを追加します。[{{< ui >}}Autofill with Example{{< /ui >}}] (例を使用して自動入力) をクリックし、一般的なユースケースのいずれかを選択して開始することもできます。サンプルスクリプトのコピーアイコンをクリックし、スクリプトに貼り付けます。詳細については、[カスタムプロセッサーを使い始める][2] を参照してください。
1. 必要に応じて、処理中にエラーが発生したイベントを破棄する場合は [{{< ui >}}Drop events on error{{< /ui >}}] (エラー発生時にイベントを削除) をチェックします。
1. サンプルイベントを入力します。
1. [{{< ui >}}Run{{< /ui >}}] (実行) をクリックして、関数がイベントをどのように処理するかをプレビューします。スクリプトの実行が完了したら、イベントの出力結果を確認できます。
1. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

## カスタム関数 {#custom-functions}

{{< whatsnext desc="関数は以下のカテゴリに分類されています。" >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#array" >}}配列{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#codec" >}}コーデック{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#convert" >}}変換{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#cryptography" >}}暗号{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#debug" >}}デバッグ{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#enrichment" >}}リッチ化{{< /nextlink >}}
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

## 健全性メトリクス {#health-metrics}

すべてのプロセッサーから送信される [コンポーネントメトリクス][4] および [プロセッサーバッファメトリクス][5] については、[Pipelines 使用状況メトリクス][6] のドキュメントを参照してください。カスタムプロセッサーメトリクスでフィルタリングまたはグループ化するには、タグ `component_type:remap_vrl` を使用します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/observability_pipelines/guide/remap_reserved_attributes
[2]: /ja/observability_pipelines/guide/get_started_with_the_custom_processor
[3]: /ja/logs/guide/regex_log_parsing/
[4]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[5]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[6]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/