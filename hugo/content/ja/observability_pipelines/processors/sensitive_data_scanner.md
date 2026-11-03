---
description: Sensitive Data Scanner プロセッサーを使用して、ログやトレース内の個人識別情報 (PII) や決済カード業界 (PCI)
  データなどの機密情報を検出し、マスクまたはハッシュ化する方法を説明します。
disable_toc: false
further_reading:
- link: /logs/guide/regex_log_parsing/
  tag: ガイド
  text: 正規表現を使用した効果的な Grok パースルールの作成
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: ブログ
  text: Observability Pipelines を使用して AI アプリから ClickHouse と Datadog に OTel データをルーティングする
- link: https://www.datadoghq.com/architecture/observability-pipelines-sensitive-data-scanner-optimization/
  tag: Architecture Center
  text: Observability Pipelines Sensitive Data Scanner の最適化
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Sensitive Data Scanner プロセッサー
---
{{< product-availability >}}

## 概要{#overview}

Sensitive Data Scanner プロセッサーは、ログをスキャンして、PII、PCI、カスタム機密データなどの機密情報を検出し、マスクまたはハッシュ化します。Datadog の定義済みルールライブラリから選択するか、カスタム Regex ルールを入力して機密データをスキャンできます。

パイプラインとプロセッサーは、[UI](#set-up-the-processor-in-the-ui)、[API][10]、または [Terraform](#set-up-the-processor-using-terraform) で設定できます。

リソース使用量を削減するためのヒントについては、[パフォーマンスを最適化するためのベストプラクティス](#best-practices-to-optimize-performance)を参照してください。

## UI でプロセッサーを設定する{#set-up-the-processor-in-the-ui}

プロセッサーをセットアップするには、以下の手順に従います。

1. [{{< ui >}}filter query{{< /ui >}}] (フィルタークエリ) を定義します。詳細については、[ログ検索構文][1]を参照してください。
    - フィルターに一致するイベントのみがスキャンおよび処理されます。
    - フィルタークエリに一致するかどうかにかかわらず、すべてのイベントがパイプラインの次のステップに送信されます。
1. [{{< ui >}}Add Scanning Rule{{< /ui >}}] (スキャンルールの追加) をクリックします。
1. 次のいずれかを選択します。

{{< tabs >}}
{{% tab "ライブラリルール" %}}

1. ドロップダウンメニューで、使用するライブラリルールを選択します。
1. 選択したライブラリルールに基づいて、推奨キーワードが自動的に追加されます。スキャンルールを追加した後、[さらにキーワードを追加したり、推奨キーワードを削除したり](#add-additional-keywords)できます。
1. {{< ui >}}Define rule target and conditions{{< /ui >}}セクションで、ドロップダウンメニューから {{< ui >}}Entire Event{{< /ui >}}、{{< ui >}}Specific Attributes{{< /ui >}}、{{< ui >}}Exclude Attributes{{< /ui >}} のいずれをスキャンするかを選択します。
    - イベント全体をスキャンする場合、オプションで特定の属性をスキャン対象から除外できます。ネストされたキーにアクセスするには、[パス表記](#path-notation-example) (`outer_key.inner_key`) を使用してください。ネストされたデータを持つ指定された属性の場合、ネストされたすべてのデータが除外されます。
    - 特定の属性をスキャンする場合は、スキャンする属性を指定してください。ネストされたキーにアクセスするには、[パス表記](#path-notation-example) (`outer_key.inner_key`) を使用してください。ネストされたデータを持つ指定された属性の場合、すべてのネストされたデータがスキャンされます。
1. {{< ui >}}Define actions on match{{< /ui >}} には、一致した情報に対して実行するアクションを選択してください。**注**: マスク、部分的なマスク、およびハッシュ化はすべて元に戻せないアクションです。
    - {{< ui >}}Redact{{< /ui >}}: 一致するすべての値を [{{< ui >}}Replacement text{{< /ui >}}] (置換テキスト) フィールドで指定したテキストに置き換えます。
    - {{< ui >}}Partially Redact{{< /ui >}}: 一致したすべてのデータの指定された部分を置き換えます。[{{< ui >}}Redact{{< /ui >}}] (マスク) セクションで、マスクする文字数と、一致したデータのどの部分をマスクするかを指定します。
    - {{< ui >}}Hash{{< /ui >}}: 一致したすべてのデータを一意の識別子に置き換えます。一致した UTF-8 バイトは FarmHash の 64 ビットフィンガープリントでハッシュ化されます。
1. 必要に応じて、[{{< ui >}}Add Field{{< /ui >}}] (フィールドを追加) をクリックして、一致したイベントに関連付けるタグを追加します。
1. スキャンルールの名前を追加します。
1. 必要に応じて、ルールの説明を追加します。
1. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

### さらにキーワードを追加する{#add-additional-keywords}

ライブラリからスキャンルールを追加した後、各ルールを個別に編集して、キーワード辞書に他のキーワードを追加できます。

1. [パイプライン][1] に移動します。
1. 編集するルールがある Sensitive Data Scanner プロセッサーで、[{{< ui >}}Manage Scanning Rules{{< /ui >}}] (スキャンルールの管理) をクリックします。
1. ルールで推奨キーワードを使用する場合は、[{{< ui >}}Use recommended keywords{{< /ui >}}] (推奨キーワードの使用) を切り替えてください。それ以外の場合は、[{{< ui >}}Create keyword dictionary{{< /ui >}}] (キーワード辞書の作成) フィールドに独自のキーワードを追加します。これらのキーワードが一致した値から指定された文字数以内に存在するよう条件を設定することも可能です。デフォルトでは、キーワードは一致した値の前に 30 文字以内にあることが必要です。
1. [{{< ui >}}Update{{< /ui >}}] (更新) をクリックします。

[1]: https://app.datadoghq.com/observability-pipelines

{{% /tab %}}
{{% tab "カスタムルール" %}}

1. [{{< ui >}}Define match conditions{{< /ui >}}] (一致条件の定義) セクションで、{{< ui >}}Define the regex{{< /ui >}} (正規表現の定義) フィールドにイベントとの照合に使用する正規表現パターンを指定してください。詳細については、[正規表現を使用した効果的な Grok パースルールの作成][1] を参照してください。
    Sensitive Data Scanner は Perl 互換正規表現 (PCRE) をサポートしていますが、以下のパターンはサポートされていません。
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
1. 正規表現パターンが有効であることを確認するには、[{{< ui >}}Add sample data{{< /ui >}}] (サンプルデータの追加) フィールドにサンプルデータを入力してください。
1. [{{< ui >}}Create keyword dictionary{{< /ui >}}] (キーワード辞書の作成) については、正規表現条件と一致させる際に検出精度を高めるためのキーワードを追加してください。たとえば、16 桁の Visa クレジットカード番号をスキャンする場合、`visa`、`credit`、`card` のようなキーワードを追加できます。これらのキーワードが一致した値から指定された文字数以内に存在するよう条件を設定することも可能です。デフォルトでは、キーワードは一致した値の前に 30 文字以内にあることが必要です。
1. {{< ui >}}Define rule target and conditions{{< /ui >}}セクションで、ドロップダウンメニューから {{< ui >}}Entire Event{{< /ui >}}、{{< ui >}}Specific Attributes{{< /ui >}}、{{< ui >}}Exclude Attributes{{< /ui >}} のいずれをスキャンするかを選択します。
    - イベント全体をスキャンする場合、オプションで特定の属性をスキャン対象から除外できます。ネストされたキーにアクセスするには、[パス表記](#path-notation-example) (`outer_key.inner_key`) を使用してください。ネストされたデータを持つ指定された属性の場合、ネストされたすべてのデータが除外されます。
    - 特定の属性をスキャンする場合は、スキャンする属性を指定してください。ネストされたキーにアクセスするには、[パス表記](#path-notation-example-custom) (`outer_key.inner_key`) を使用してください。ネストされたデータを持つ指定された属性の場合、すべてのネストされたデータがスキャンされます。
1. {{< ui >}}Define actions on match{{< /ui >}} には、一致した情報に対して実行するアクションを選択してください。**注**: マスク、部分的なマスク、およびハッシュ化はすべて元に戻せないアクションです。
    - {{< ui >}}Redact{{< /ui >}}: 一致するすべての値を [{{< ui >}}Replacement text{{< /ui >}}] (置換テキスト) フィールドで指定したテキストに置き換えます。
    - {{< ui >}}Partially Redact{{< /ui >}}: 一致したすべてのデータの指定された部分を置き換えます。[{{< ui >}}Redact{{< /ui >}}] (マスク) セクションで、マスクする文字数と、一致したデータのどの部分をマスクするかを指定します。
    - {{< ui >}}Hash{{< /ui >}}: 一致したすべてのデータを一意の識別子に置き換えます。一致した UTF-8 バイトは、FarmHash の 64 ビットフィンガープリントでハッシュ化されます。
1. 必要に応じて、[{{< ui >}}Add Field{{< /ui >}}] (フィールドを追加) をクリックして、一致したイベントに関連付けるタグを追加します。
1. スキャンルールの名前を追加します。
1. 必要に応じて、ルールの説明を追加します。
1. [{{< ui >}}Add Rule{{< /ui >}}] (ルールの追加) をクリックします。

[1]: /ja/logs/guide/regex_log_parsing/

{{% /tab %}}
{{< /tabs >}}

### ルールを削除する {#delete-a-rule}

Sensitive Data Scanner でルールを削除するには、以下の手順に従います。

1. [Observability Pipelines][2] に移動します。
1. パイプラインを選択します。
1. Sensitive Data Scanner プロセッサーをクリックして展開してください。
1. [{{< ui >}}Manage Scanning Rules{{< /ui >}}] (スキャンルールの管理) をクリックしてください。
1. 削除するルールを選択してください。
1. [{{< ui >}}Delete{{< /ui >}}] (削除) をクリックします。

### パス表記の例{#path-notation-example}

{{% observability_pipelines/path_notation %}}

{{% observability_pipelines/path_notation_dots %}}

## Terraform を使用してプロセッサーをセットアップする{#set-up-the-processor-using-terraform}

[Datadog Observability Pipeline Terraform リソース][4] を使用して、Sensitive Data Scanner プロセッサーを含むパイプラインをセットアップできます。Terraform を使用して Sensitive Data Scanner プロセッサーにルールを追加するには、以下の手順に従います。

1. [Datadog Sensitive Data Scanner Standard Pattern][5] データソースを使用して、Sensitive Data Scanner [ライブラリルール][6] のルール ID を取得します。

   {{< code-block lang="terraform" >}}
data "datadog_sensitive_data_scanner_standard_pattern" "<RULE_IDENTIFIER>" {
  filter = "<RULE_NAME>"
}
   {{< /code-block >}}

   以下のようにプレースホルダーの値を置き換えてます。

   - `<RULE_IDENTIFIER>` は、後ほど Observability Pipelines リソースで Sensitive Data Scanner プロセッサーをセットアップする際に使用する名前に置き換えます。
   - `<RULE_NAME>` は、ルールの正確な名前に置き換えます。ルールの一覧については、「[ライブラリルール][6]」を参照してください。

   たとえば、[AWS Access Key ID Scanner][7] を使用する場合は、以下のようにデータソースを構成します。

   {{< code-block lang="terraform" >}}
data "datadog_sensitive_data_scanner_standard_pattern" "aws_access_key" {
  filter = "AWS Access Key ID Scanner"
}
   {{< /code-block >}}
    複数のルールのためのデータソースを追加する方法については、[詳細な構成例](#full-configuration-example)を参照してください。

1. ライブラリルール用に、Observability Pipelines リソースに [rule][9] ブロックを追加してください。

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

   以下のようにプレースホルダーの値を置き換えてます。

   - `<YOUR_RULE_NAME>` は、ルールの名前に置き換えます。この名前は Pipelines UI に表示されます。
   - `<RULE_IDENTIFIER>` は、ステップ 1 でデータソースに使用したルール識別子に置き換えます。

   たとえば、ステップ 1 の [AWS Access Key ID Scanner][7] データソースを使用する場合、ルールブロックを次のように構成します。

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

   複数のルールを追加する方法については、[詳細な構成例](#full-configuration-example)を参照してください。

1. 追加するすべてのライブラリルールについて、ステップ 1 と 2 を繰り返します。

### 詳細な構成例{#full-configuration-example}

{{< img src="observability_pipelines/processors/sds_tf_ui.png" alt="2 つのスキャンルール (Redact AWS Access Key IDs と Redact US SSNs) を表示する Sensitive Data Scanner プロセッサーパネル" style="width:60%;" >}}

Sensitive Data Scanner プロセッサーを使用して AWS Access Key ID と米国社会保障番号をスキャンし、それらを文字列 `***` に置き換えてマスクする場合は、次のようにします。

1. [Datadog Sensitive Data Scanner Standard Pattern][5] データソースを使用して、[AWS Access Key ID Scanner][7] および [US Social Security Number Scanner][8] のルール ID を取得します。
1. [Datadog Observability Pipeline][4] リソースの Sensitive Data Scanner プロセッサーで、データソースで定義された Sensitive Data Scanner ルールを使用します。

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

## パフォーマンスを最適化するためのベストプラクティス{#best-practices-to-optimize-performance}

Sensitive Data Scanner プロセッサーは CPU 集中型です。パフォーマンスを最適化するため、以下のベストプラクティスに従ってください。

### Observability Pipelines Overview ダッシュボードでスキャンルールの使用状況を確認する{#view-scanning-rule-usage-with-the-observability-pipelines-overview-dashboard}

Observability Pipelines には、すぐに使用できる [Observability Pipelines Overview][16] ダッシュボードと、**Observability Pipelines によって検出された機密データ**セクションがあります。そのセクションのウィジェットを使用して、どのスキャンルールがデータに一致しているかを確認します。

1. [Dashboards] (ダッシュボード) > [[Observability Pipelines Overview][16]] (Observability Pipelines 概要) に移動します。
1. ダッシュボード上部のテンプレート変数 (`pipeline_id`、`host`、`worker_uuid`、`component_type`、`component_kind`、`component_id`) を使用して、特定のパイプラインまたは Worker に表示を絞り込みます。
1. 時間セレクターを使用して、より広い時間枠を範囲にします。

以下のウィジェットを使用して、Sensitive Data Scanner プロセッサーのスキャンルールの使用状況を評価します。

- **スキャンルールに基づく機密データを含むログ**: 各ルールを名前 (例: `visa_card_scanner_1x16_1x19_digits` または `redact_ipv4`) で一覧表示し、選択した時間枠内の一致数を表示します。一致数が多いルールは、アクティブにデータと一致しています。これは、どのルールが使用されているかを確認するための主要なウィジェットです。
- **機密データを含むログの合計数**: すべてのルールで一致した機密データの総量を示します。
- **パイプライン別の機密データを含むログ**: 機密データを含む一致ログを表示します。`pipeline_id`で一致を絞り込むことができます。これは、機密データを含むログがすべてのパイプラインで見つかるのか、特定のパイプラインのみで見つかるのかを確認するのに役立ちます。
- **ホスト別の機密データを含むログ**: Worker ホスト別に機密データの一致を分類します。このウィジェットを使用して、デプロイメント全体でのカバレッジを確認してください。
- **機密情報を含むパターン**および**機密データを含むログの一覧**: 機密データが見つかったログパターンとサンプルイベントを表示します。

代表的な期間中に一致がなかったルールを特定したら、それらが不要であることを確認して削除できます。[ルールを削除する](#delete-a-rule)を参照してください。

**注**: 一致件数がゼロのルールは、そのルールが無効であることを意味するのではなく、選択した期間内に一致しなかったことを意味します。

### 必要なルールのみを有効にする{#only-enable-rules-you-need}

有効になっているが使用されていないルールは、不要なリソースを消費します。Sensitive Data Scanner プロセッサーをチェックして、過去 24 時間に各ルールで何件の一致があったかを表示してください。

1. [Observability Pipelines][2] に移動します。
1. パイプラインを選択します。
1. Sensitive Data Scanner プロセッサーをクリックして展開してください。
1. [{{< ui >}}View Scanning Rules{{< /ui >}}] (スキャンルールの表示) をクリックしてサイドパネルを開き、各ルールの [{{< ui >}}Matches in the last 24 hours{{< /ui >}}] (過去 24 時間に一致) を確認してください。

未使用のルールを削除するには、『[ルールを削除する](#delete-a-rule)』を参照してください。

### 機密データをスキャンする必要があるイベントとフィールドのみをスキャンする{#only-scan-the-events-and-fields-that-need-to-be-scanned-for-sensitive-data}

Sensitive Data Scanner がイベントをスキャンするのにかかる時間は、イベントのサイズにほぼ比例します。プロセッサーのパフォーマンスを最適化するには、以下のようにします。

- スキャンするイベントの種類がわかっている場合は、スキャン対象のイベントのみをプロセッサーに送信するプロセッサークエリを定義してください。

- スキャン対象のイベント属性を指定したり、スキャン対象からイベント属性を除外したりすることで、スキャン時間を短縮してください。『[プロセッサーのセットアップ](#set-up-the-processor-in-the-ui)』の {{< ui >}}Define rule target and conditions{{< /ui >}} ステップを参照してください。

### パフォーマンス最適化の評価およびベンチマーク{#evaluate-and-benchmark-performance-optimizations}

`pipelines.component_latency_seconds` メトリクスを使用して、次のことを行ってください。

- ルールを追加するときのプロセッサーパフォーマンスのベンチマーク
- スキャンされるフィールド数の削減や未使用ルールの削除など、最適化の変更を行った後のパフォーマンスの評価

`pipelines.component_latency_seconds` メトリクスを表示するには、以下の手順に従います。

1. [Metrics Explorer][11] に移動します。
1. メトリクスフィールドに `pipelines.component_latency_seconds` を入力します。
1. {{< ui >}}from{{< /ui >}}フィールドにタグ `component_id:<COMPONENT_ID>` を入力します。ここで `<COMPONENT_ID>` は Sensitive Data Scanner プロセッサーの ID です。

**注**: `pipelines.component_latency_seconds` は分布メトリクスであるため、そのメトリクスについてはパーセンタイルを有効にする必要があります。手順については、[高度なクエリ機能の有効化][12] を参照してください。

## 健全性メトリクス{#health-metrics}

すべてのプロセッサーから送信される [コンポーネントメトリクス][13] および [プロセッサーバッファメトリクス][14] については、[Pipelines 使用状況メトリクス][15] のドキュメントを参照してください。

### Sensitive Data Scanner メトリクス{#sensitive-data-scanner-metrics}

- `component_id` タグを使用して、個々のコンポーネントでフィルタリングまたはグループ化します。
- `component_type` タグは、Sensitive Data Scanner プロセッサーメトリクスの場合 `sensitive_data_scanner` です。

`pipelines.sds_rule_matched_total`
: **説明**: Sensitive Data Scanner ルールに一致したイベントの数。一致したルール名でタグ付けされます。
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
: **説明**: イベントのスキャンに費やされた累積ウォールクロック時間 (秒)。このメトリクスを使用して、プロセッサーパフォーマンスをベンチマークし、最適化を評価してください。
: **メトリクスタイプ**: カウント

`pipelines.scanning.cpu_duration`
: **説明**: イベントのスキャンに費やされた累積 CPU 時間 (秒)。
: **メトリクスタイプ**: カウント

`pipelines.scanner.total_count`
: **説明**: 現在実行中の Sensitive Data Scanner プロセッサーの数。
: **メトリクスタイプ**: ゲージ

`pipelines.scanner.total_regexes`
: **説明**: すべての Sensitive Data Scanner 全体で保持されている正規表現の数。
: **メトリクスタイプ**: ゲージ

## 参考資料{#further-reading}

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