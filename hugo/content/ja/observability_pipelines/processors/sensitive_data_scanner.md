---
description: Sensitive Data Scanner プロセッサーを使用して、ログやトレースに含まれる個人識別情報 (PII) や決済カード業界
  (PCI) データなどの機密情報を検出し、マスキングやハッシュ化を行う方法を学びます。
disable_toc: false
further_reading:
- link: /logs/guide/regex_log_parsing/
  tag: ガイド
  text: 正規表現を使用した効果的な Grok パースルールの記述
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: ブログ
  text: Observability Pipelines を使用して AI アプリから ClickHouse および Datadog に OTel データをルーティングする
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Sensitive Data Scanner プロセッサー
---
{{< product-availability >}}

## 概要 {#overview}

Sensitive Data Scanner プロセッサーは、ログをスキャンして、PII、PCI、カスタム機密データなどの機密情報を検出し、マスキングやハッシュ化を行います。Datadog のライブラリから事前定義済みのルールを使用するか、機密情報をスキャンするカスタムの正規表現ルールを入力できます。

パイプラインとプロセッサーは、[UI](#set-up-the-processor-in-the-ui)、[API][10]、または [Terraform](#set-up-the-processor-using-terraform) でセットアップできます。

リソース使用量を削減するためのヒントについては、[パフォーマンスを最適化するためのベストプラクティス](#best-practices-to-optimize-performance)を参照してください。

## UI でプロセッサーをセットアップする {#set-up-the-processor-in-the-ui}

プロセッサーをセットアップするには:

1. {{< ui >}}filter query{{< /ui >}}を定義します。詳細については、[ログ検索構文][1]を参照してください。
    - フィルターに一致するイベントのみがスキャンおよび処理されます。
    - フィルタークエリに一致するかどうかに関係なく、すべてのイベントがパイプラインの次のステップに送信されます。
1. {{< ui >}}Add Scanning Rule{{< /ui >}} をクリックします。
1. 次のいずれかを選択します。

{{< tabs >}}
{{% tab "ライブラリルール" %}}

1. ドロップダウンメニューで、使用するライブラリルールを選択します。
1. 選択したライブラリルールに基づいて、推奨キーワードが自動的に追加されます。スキャンルールが追加された後に、[他のキーワードの追加や推奨キーワードの削除](#add-additional-keywords)が可能です。
1. {{< ui >}}Define rule target and conditions{{< /ui >}} セクションのドロップダウンメニューで、{{< ui >}}Entire Event{{< /ui >}}、{{< ui >}}Specific Attributes{{< /ui >}}、または {{< ui >}}Exclude Attributes{{< /ui >}} のいずれをスキャンするかを選択します。
    - イベント全体をスキャンする場合、オプションで特定の属性をスキャン対象から除外することができます。ネストされたキーにアクセスするには、[パス表記](#path-notation-example) (`outer_key.inner_key`) を使用します。指定した属性にネストされたデータがある場合、ネストされたすべてのデータが除外されます。
    - 特定の属性をスキャンする場合、スキャンする属性を指定します。ネストされたキーにアクセスするには、[パス表記](#path-notation-example) (`outer_key.inner_key`) を使用します。指定した属性にネストされたデータがある場合、ネストされたすべてのデータがスキャンされます。
1. {{< ui >}}Define actions on match{{< /ui >}} で、一致した情報に対して実行するアクションを選択します。**注**: マスキング、部分マスキング、およびハッシュ化は、いずれも元に戻すことができないアクションです。
    - {{< ui >}}Redact{{< /ui >}}: 一致するすべての値を、{{< ui >}}Replacement text{{< /ui >}} フィールドで指定したテキストに置き換えます。
    - {{< ui >}}Partially Redact{{< /ui >}}: 一致したすべてのデータのうち、指定した部分を置き換えます。{{< ui >}}Redact{{< /ui >}} セクションで、マスキングする文字数と、一致したデータのどの部分をマスキングするかを指定します。
    - {{< ui >}}Hash{{< /ui >}}: 一致したすべてのデータを一意の識別子に置き換えます。一致したデータの UTF-8 バイトは、FarmHash の 64 ビットフィンガープリントでハッシュ化されます。
1. 必要に応じて、{{< ui >}}Add Field{{< /ui >}} をクリックして、一致したイベントに関連付けるタグを追加します。
1. スキャンルールの名前を追加します。
1. 必要に応じて、ルールの説明を追加します。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

### 追加のキーワードを追加する{#add-additional-keywords}

ライブラリからスキャンルールを追加した後、各ルールを個別に編集し、キーワード辞書に追加のキーワードを追加できます。

1. [パイプライン][1]に移動します。
1. 編集するルールがある Sensitive Data Scanner プロセッサーで、{{< ui >}}Manage Scanning Rules{{< /ui >}} をクリックします。
1. ルールでそれらを使用する場合は、{{< ui >}}Use recommended keywords{{< /ui >}} を切り替えます。それ以外の場合は、{{< ui >}}Create keyword dictionary{{< /ui >}} フィールドに独自のキーワードを追加します。これらのキーワードが一致した値から指定された文字数以内に存在するよう条件を設定することも可能です。デフォルトでは、キーワードは一致した値から 30 文字前までにある必要があります。
1. {{< ui >}}Update{{< /ui >}} をクリックします。

[1]: https://app.datadoghq.com/observability-pipelines

{{% /tab %}}
{{% tab "カスタムルール" %}}

1. {{< ui >}}Define match conditions{{< /ui >}} セクションで、{{< ui >}}Define the regex{{< /ui >}} フィールドのイベントとの照合に使用する正規表現パターンを指定します。詳細については、[正規表現を使用した効果的な Grok パースルールの記述][1]を参照してください。
    Sensitive Data Scanner は Perl 互換正規表現 (PCRE) をサポートしていますが、次のパターンはサポートされていません。
    - 後方参照、およびサブマッチ文字列のキャプチャ (ルックアラウンド)
    - 任意のゼロ幅マッチ
    - サブルーチン参照および再帰的パターン
    - 条件付きパターン
    - バックトラック制御動詞
    - `\C` "シングルバイト" ディレクティブ (UTF-8 の文字列を分割)
    - `\R` 改行コードのマッチ
    - `\K` マッチの開始位置のリセットディレクティブ
    - コールアウトおよび埋め込みコード
    - アトミックグループおよび絶対最大量指定子
1. {{< ui >}}Add sample data{{< /ui >}} フィールドにサンプルデータを入力して、正規表現パターンが有効であることを確認します。
1. {{< ui >}}Create keyword dictionary{{< /ui >}} で、正規表現条件を照合する際の検出精度を高めるためのキーワードを追加します。たとえば、16 桁の Visa クレジットカード番号をスキャンする場合、`visa`、`credit`、`card` のようなキーワードを追加できます。これらのキーワードが一致した値から指定された文字数以内に存在するよう条件を設定することも可能です。デフォルトでは、キーワードは一致した値から 30 文字前までにある必要があります。
1. {{< ui >}}Define rule target and conditions{{< /ui >}} セクションのドロップダウンメニューで、{{< ui >}}Entire Event{{< /ui >}}、{{< ui >}}Specific Attributes{{< /ui >}}、または {{< ui >}}Exclude Attributes{{< /ui >}} のいずれをスキャンするかを選択します。
    - イベント全体をスキャンする場合、オプションで特定の属性をスキャン対象から除外することができます。ネストされたキーにアクセスするには、[パス表記](#path-notation-example) (`outer_key.inner_key`) を使用します。指定した属性にネストされたデータがある場合、ネストされたすべてのデータが除外されます。
    - 特定の属性をスキャンする場合、スキャンする属性を指定します。ネストされたキーにアクセスするには、[パス表記](#path-notation-example-custom) (`outer_key.inner_key`) を使用します。指定した属性にネストされたデータがある場合、ネストされたすべてのデータがスキャンされます。
1. {{< ui >}}Define actions on match{{< /ui >}} で、一致した情報に対して実行するアクションを選択します。**注**: マスキング、部分マスキング、およびハッシュ化は、いずれも元に戻すことができないアクションです。
    - {{< ui >}}Redact{{< /ui >}}: 一致するすべての値を、{{< ui >}}Replacement text{{< /ui >}} フィールドで指定したテキストに置き換えます。
    - {{< ui >}}Partially Redact{{< /ui >}}: 一致したすべてのデータのうち、指定した部分を置き換えます。{{< ui >}}Redact{{< /ui >}} セクションで、マスキングする文字数と、一致したデータのどの部分をマスキングするかを指定します。
    - {{< ui >}}Hash{{< /ui >}}: 一致したすべてのデータを一意の識別子に置き換えます。一致したデータの UTF-8 バイトは、FarmHash の 64 ビットフィンガープリントでハッシュ化されます。
1. 必要に応じて、{{< ui >}}Add Field{{< /ui >}} をクリックして、一致したイベントに関連付けるタグを追加します。
1. スキャンルールの名前を追加します。
1. 必要に応じて、ルールの説明を追加します。
1. {{< ui >}}Add Rule{{< /ui >}} をクリックします。

[1]: /ja/logs/guide/regex_log_parsing/

{{% /tab %}}
{{< /tabs >}}

### ルールを削除する {#delete-a-rule}

Sensitive Data Scanner でルールを削除するには:

1. [Observability Pipelines][2] に移動します。
1. パイプラインを選択します。
1. Sensitive Data Scanner プロセッサーをクリックして展開します。
1. {{< ui >}}Manage Scanning Rules{{< /ui >}} をクリックします。
1. 削除するルールを選択します。
1. {{< ui >}}Delete{{< /ui >}} をクリックします。

### パス表記の例{#path-notation-example}

{{% observability_pipelines/path_notation %}}

{{% observability_pipelines/path_notation_dots %}}

## Terraform を使用してプロセッサーをセットアップする{#set-up-the-processor-using-terraform}

[Datadog Observability Pipeline Terraform リソース][4]を使用して、Sensitive Data Scanner プロセッサーを含むパイプラインをセットアップできます。Terraform を使用して Sensitive Data Scanner プロセッサーにルールを追加するには、次の手順に従います。

1. [Datadog Sensitive Data Scanner Standard Pattern][5] データソースを使用して、Sensitive Data Scanner [ライブラリルール][6]のルール ID を取得します。

   {{< code-block lang="terraform" >}}
data "datadog_sensitive_data_scanner_standard_pattern" "<RULE_IDENTIFIER>" {
  filter = "<RULE_NAME>"
}
   {{< /code-block >}}

   プレースホルダーを次のように置き換えます。

   - `<RULE_IDENTIFIER>`: 後で Observability Pipeline リソースで Sensitive Data Scanner プロセッサーをセットアップする際に使用する名前に置き換えます。
   - `<RULE_NAME>`: ルールの正確な名前に置き換えます。ルールの全リストについては、[ライブラリルール][6]を参照してください。

   たとえば、[AWS Access Key ID Scanner][7] を使用する場合は、データソースを次のように構成します。

   {{< code-block lang="terraform" >}}
data "datadog_sensitive_data_scanner_standard_pattern" "aws_access_key" {
  filter = "AWS Access Key ID Scanner"
}
   {{< /code-block >}}
    複数のルールに対してデータソースを追加する方法については、[完全な構成例](#full-configuration-example)を参照してください。

1. ライブラリルールの Observability Pipelines リソースに [rule][9] ブロックを追加します。

   {{< code-block lang="terraform" >}}
...
  sensitive_data_scanner {
    rule {
      name = "<YOUR_RULE_NAME>"
      tags = []
      on_match {
        redact {
          replace = "***"
        }
      }
      pattern {
        library {
          id                       = data.datadog_sensitive_data_scanner_standard_pattern.<RULE_IDENTIFIER>.id
          use_recommended_keywords = true
        }
      }
      scope {
        all = true
      }
    }
  }
   {{< /code-block >}}

   プレースホルダーを次のように置き換えます。

   - `<YOUR_RULE_NAME>`: ルールの名前に置き換えます。この名前は Pipelines UI に表示されます。
   - `<RULE_IDENTIFIER>`: ステップ 1 でデータソースに使用したルール識別子に置き換えます。

   たとえば、ステップ 1 の [AWS Access Key ID Scanner][7] データソースを使用する場合は、rule ブロックを次のように構成します。

   {{< code-block lang="terraform" >}}
...
  sensitive_data_scanner {
    rule {
      name = "Redact AWS Access Key IDs"
      tags = []
      on_match {
        redact {
          replace = "***"
        }
      }
      pattern {
        library {
          id                       = data.datadog_sensitive_data_scanner_standard_pattern.aws_access_key.id
          use_recommended_keywords = true
        }
      }
      scope {
        all = true
      }
    }
  }
   {{< /code-block >}}

   複数のルールを追加する方法については、[完全な構成例](#full-configuration-example)を参照してください。

1. 追加するすべてのライブラリルールについて、ステップ 1 と 2 を繰り返します。

### 完全な構成例 {#full-configuration-example}

{{< img src="observability_pipelines/processors/sds_tf_ui.png" alt="「Redact AWS Access Key IDs」と「Redact US SSNs」という 2 つのスキャンルールが表示された Sensitive Data Scanner プロセッサーパネル" style="width:60%;" >}}

Sensitive Data Scanner プロセッサーを使用して AWS アクセスキー ID と米国社会保障番号をスキャンし、それらを文字列 `***` に置き換えてマスキングする場合は、次のようにします。

1. [Datadog Sensitive Data Scanner Standard Pattern][5] データソースを使用して、[AWS Access Key ID Scanner][7] と [US Social Security Number Scanner][8] のルール ID を取得します。
1. [Datadog Observability Pipeline][4] リソースの Sensitive Data Scanner プロセッサーで、データソースに定義されている Sensitive Data Scanner ルールを使用します。

{{< code-block lang="terraform" >}}
data "datadog_sensitive_data_scanner_standard_pattern" "aws_access_key" {
  filter = "AWS Access Key ID Scanner"
}
data "datadog_sensitive_data_scanner_standard_pattern" "us_ssn" {
  filter = "US Social Security Number Scanner"
}

resource "datadog_observability_pipeline" "sensitive_data_pipeline" {
  name = "Sensitive Data Pipeline"

  config {
    source {
      id = "source-0"
      datadog_agent {}
    }

    processor_group {
      display_name = "Processors"
      enabled      = true
      id           = "group-0"
      include      = "*"
      inputs       = ["source-0"]

      processor {
        display_name = "Sensitive Data Scanner"
        enabled      = true
        id           = "processor-sds-0"
        include      = "*"

        sensitive_data_scanner {
          rule {
            name = "Redact AWS Access Key IDs"
            tags = []
            on_match {
              redact {
                replace = "***"
              }
            }
            pattern {
              library {
                id                       = data.datadog_sensitive_data_scanner_standard_pattern.aws_access_key.id
                use_recommended_keywords = true
              }
            }
            scope {
              all = true
            }
          }
          rule {
            name = "Redact US SSNs"
            tags = []
            on_match {
              redact {
                replace = "***"
              }
            }
            pattern {
              library {
                id                       = data.datadog_sensitive_data_scanner_standard_pattern.us_ssn.id
                use_recommended_keywords = true
              }
            }
            scope {
              all = true
            }
          }
        }
      }
    }

    destination {
      id     = "destination-0"
      inputs = ["group-0"]
      datadog_logs {}
    }
  }
}
{{< /code-block >}}

## パフォーマンスを最適化するためのベストプラクティス {#best-practices-to-optimize-performance}

Sensitive Data Scanner プロセッサーは CPU を大量に消費します。パフォーマンスを最適化するために、下記のベストプラクティスに従ってください。

### Observability Pipelines Overview ダッシュボードでスキャンルールの使用状況を確認する {#view-scanning-rule-usage-with-the-observability-pipelines-overview-dashboard}

Observability Pipelines のすぐに使える [[Observability Pipelines Overview] (Observability Pipelines 概要)][16] ダッシュボードに、**[Sensitive data found by Observability Pipelines] (Observability Pipelines で見つかった機密データ)** というセクションがあります。そのセクションのウィジェットを使用して、どのスキャンルールがデータに一致しているかを確認します。

1. [Dashboards] (ダッシュボード) > [[Observability Pipelines Overview]][16] に移動します。
1. ダッシュボード上部のテンプレート変数 (`pipeline_id`、`host`、`worker_uuid`、`component_type`、`component_kind`、`component_id`) を使用して、特定のパイプラインまたはワーカーに表示を絞り込みます。
1. 時間セレクターを使用して時間枠を広げます。

次のウィジェットを使用して、Sensitive Data Scanner プロセッサーのスキャンルールの使用状況を評価します。

- **Logs containing sensitive data per scanning rule (スキャンルール別の機密データを含むログ)**: 各ルールの名前 (`visa_card_scanner_1x16_1x19_digits` や `redact_ipv4` など) の一覧を選択された時間枠における一致数と共に示します。カウントが高いルールは、アクティブにデータと一致しています。これは、どのルールが使用されているかを確認するための主要なウィジェットです。
- **Total count of logs containing sensitive data (機密データを含むログの合計数)**: すべてのルールの一致する機密データの総量を示します。
- **Logs containing sensitive data by Pipeline (パイプライン別の機密データを含むログ)**: 機密データを含む一致するログを示します。`pipeline_id` で一致を絞り込むことができます。これは、機密データを含むログがすべてのパイプラインで見つかるのか、特定のパイプラインのみで見つかるのかを確認するのに役立ちます。
- **Logs containing sensitive data per host (ホスト別の機密データを含むログ)**: 一致する機密データのワーカーホスト別の内訳を示します。このウィジェットを使用して、デプロイ全体でのカバレッジを確認します。
- **Patterns containing sensitive information (機密情報を含むパターン)** と **List of logs containing sensitive data (機密データを含むログの一覧)**: 機密データが見つかったログパターンとサンプルイベントを示します。

代表的な時間枠に一致がないルールを特定したら、それらが不要であることを確認して削除します。[ルールを削除する](#delete-a-rule)を参照してください。

**注**: 一致数がゼロのルールは、選択した時間枠に一致がなかったことを意味し、ルールが無効であることを意味するわけではありません。

### 必要なルールのみを有効にする {#only-enable-rules-you-need}

有効になっていて使用されていないルールは、不要なリソースを消費します。Sensitive Data Scanner プロセッサーをチェックして、過去 24 時間に各ルールで何件の一致があったかを確認します。

1. [Observability Pipelines][2] に移動します。
1. パイプラインを選択します。
1. Sensitive Data Scanner プロセッサーをクリックして展開します。
1. {{< ui >}}View Scanning Rules{{< /ui >}} をクリックしてサイドパネルを開き、各ルールの {{< ui >}}Matches in the last 24 hours{{< /ui >}} を確認します。

使用されていないルールを削除するには、[ルールを削除する](#delete-a-rule)を参照してください。

### 機密データのスキャンが必要なイベントとフィールドのみをスキャンする {#only-scan-the-events-and-fields-that-need-to-be-scanned-for-sensitive-data}

Sensitive Data Scanner でイベントをスキャンするのにかかる時間は、イベントのサイズにほぼ比例します。プロセッサーのパフォーマンスを最適化するには、次のようにします。

- スキャンするイベントの種類がわかっている場合は、プロセッサークエリを定義して、目的のイベントのみをプロセッサーに送信します。

- 特定のイベント属性をスキャン対象にしたり、イベント属性をスキャン対象から除外したりすることで、スキャン時間を短縮します。[プロセッサーをセットアップする](#set-up-the-processor-in-the-ui)の {{< ui >}}Define rule target and conditions{{< /ui >}} のステップを参照してください。

### パフォーマンスの最適化を評価およびベンチマークする{#evaluate-and-benchmark-performance-optimizations}

`pipelines.component_latency_seconds` メトリクスを使用して、次のことを行います。

- ルールを追加する際のプロセッサーのパフォーマンスをベンチマークする
- スキャンするフィールド数の削減や使用していないルールの削除など、最適化を行った後のパフォーマンスを評価する

`pipelines.component_latency_seconds` メトリクスを表示するには、次の手順に従います。

1. [Metrics Explorer][11] に移動します。
1. メトリクスフィールドに `pipelines.component_latency_seconds` と入力します。
1. {{< ui >}}from{{< /ui >}} フィールドにタグ `component_id:<COMPONENT_ID>` を入力します。`<COMPONENT_ID>` は Sensitive Data Scanner プロセッサーの ID です。

**注**: `pipelines.component_latency_seconds` は分布メトリクスであるため、そのメトリクスのパーセンタイルを有効にする必要があります。手順については、[高度なクエリ機能の有効化][12]を参照してください。

## ヘルスメトリクス {#health-metrics}

すべてのプロセッサーから出力される[コンポーネントメトリクス][13]および[プロセッサーバッファメトリクス][14]については、[Pipelines 使用状況メトリクス][15]のドキュメントを参照してください。

### Sensitive Data Scanner のメトリクス{#sensitive-data-scanner-metrics}

- 個々のコンポーネントでフィルタリングまたはグループ化するには、`component_id` タグを使用します。
- Sensitive Data Scanner プロセッサーのメトリクスの `component_type` タグは `sensitive_data_scanner` です。

`pipelines.sds_rule_matched_total`
: **説明**: Sensitive Data Scanner ルールに一致したイベントの数。一致するルールの名前のタグが付けられます。
: **メトリクスタイプ**: カウント

`pipelines.scanned_events`
: **説明**: Sensitive Data Scanner エンジンによってスキャンされたイベントの数。
: **メトリクスタイプ**: カウント

`pipelines.scanning.match_count`
: **説明**: Sensitive Data Scanner によって検出された一致の数。
: **メトリクスタイプ**: カウント

`pipelines.scanning.suppressed_match_count`
: **説明**: Sensitive Data Scanner によって抑制された一致の数。
: **メトリクスタイプ**: カウント

`pipelines.scanning.duration`
: **説明**: イベントのスキャンに要した累積実時間 (秒単位)。このメトリクスを使用して、プロセッサーのパフォーマンスをベンチマークし、最適化を評価します。
: **メトリクスタイプ**: カウント

`pipelines.scanning.cpu_duration`
: **説明**: イベントのスキャンに要した累積 CPU 時間 (秒単位)。
: **メトリクスタイプ**: カウント

`pipelines.scanner.total_count`
: **説明**: 現在実行中の Sensitive Data Scanner プロセッサーの数。
: **メトリクスタイプ**: ゲージ

`pipelines.scanner.total_regexes`
: **説明**: すべての Sensitive Data Scanner の保持されている正規表現の数。
: **メトリクスタイプ**: ゲージ

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/observability_pipelines/search_syntax/logs/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /ja/logs/guide/regex_log_parsing/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/data-sources/sensitive_data_scanner_standard_pattern
[6]: /ja/security/sensitive_data_scanner/scanning_rules/library_rules/
[7]: /ja/security/sensitive_data_scanner/scanning_rules/library_rules/?search=AWS+Access+Key+ID+Scanner
[8]: /ja/security/sensitive_data_scanner/scanning_rules/library_rules/?search=US+Social+Security+Number+Scanner
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline#nested-schema-for-configprocessor_groupprocessorsensitive_data_scanner
[10]: /ja/api/latest/observability-pipelines/#create-a-new-pipeline
[11]: https://app.datadoghq.com/metric/explorer
[12]: /ja/metrics/distributions/#enabling-advanced-query-functionality
[13]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[14]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[15]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[16]: https://app.datadoghq.com/dash/integration/32326/observability-pipelines-overview