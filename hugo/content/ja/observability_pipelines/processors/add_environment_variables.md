---
description: Add Environment Variables プロセッサを使用して、環境変数名と値をログメッセージに追加する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Add Environment Variables プロセッサ
---
{{< product-availability >}}

## 概要 {#overview}

このプロセッサを使用して、環境変数のフィールド名と値をログメッセージに追加します。

## セットアップ {#setup}

このプロセッサを設定するには、

1. {{< ui >}}filter query{{< /ui >}} を定義します。詳細については、[ログ検索構文][1]を参照してください。
   - フィルターに一致するログのみが処理されます。
   - フィルタークエリに一致するかどうかにかかわらず、すべてのログがパイプラインの次のステップに送信されます。
1. 環境変数のフィールド名を入力します。
1. 環境変数名を入力します。
1. 別の環境変数を追加する場合は、{{< ui >}}Add Environment Variable{{< /ui >}}をクリックします。

### ブロックされた環境変数 {#blocked-environment-variables}

環境変数に機密データが含まれている可能性があるため、以下のいずれかのパターンに一致する環境変数は、ログメッセージへの追加がブロックされます。

- `CONNECTIONSTRING` / `CONNECTION-STRING` / `CONNECTION_STRING`
- `AUTH`
- `CERT`
- `CLIENTID` / `CLIENT-ID` / `CLIENT_ID`
- `CREDENTIALS`
- `DATABASEURL` / `DATABASE-URL` / `DATABASE_URL`
- `DBURL` / `DB-URL` / `DB_URL`
- `KEY`
- `OAUTH`
- `PASSWORD`
- `PWD`
- `ROOT`
- `SECRET`
- `TOKEN`
- `USER`

環境変数は、リテラル単語ではなくパターンと照合されます。たとえば、`PASSWORD` は、`USER_PASSWORD` や `PASSWORD_SECRET` のような環境変数がログメッセージに追加されるのをブロックします。

### 許可リスト {#allowlist}

パイプラインにプロセッサを追加して {{< ui >}}Next: Install{{< /ui >}} をクリックした後、{{< ui >}}Add environment variable processor(s) allowlist{{< /ui >}} フィールドに、このプロセッサで値を取得して使用する環境変数のリストをカンマ区切りで入力します。

許可リストは環境変数 `DD_OP_PROCESSOR_ADD_ENV_VARS_ALLOWLIST` に保存されます。

## Health メトリクス {#health-metrics}

すべてのプロセッサから出力される[コンポーネントメトリクス][2]および[プロセッサバッファメトリクス][3]については、[Pipelines 使用量メトリクス][4]のドキュメントを参照してください。Add Environment Variables プロセッサのメトリクスでフィルタリングまたはグループ化を行うには、タグ `component_type:add_env_vars` を使用します。

[1]: /ja/observability_pipelines/search_syntax/logs/
[2]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[3]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[4]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/