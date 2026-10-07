---
aliases:
- /ja/tracing/advanced/setting_primary_tags_to_scope/
description: プライマリタグを設定して APM データを適切に整理し、環境、サービス、バージョンごとにデータの範囲をスコープしたりフィルタリングしたりする方法を学びましょう。
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/
  tag: ドキュメント
  text: ログとトレースを接続する
- link: /tracing/manual_instrumentation/
  tag: ドキュメント
  text: トレースを生成するために、アプリケーションを手動でインスツルメントします。
- link: /tracing/opentracing/
  tag: ドキュメント
  text: アプリケーション全体に Opentracing を実装します。
- link: /tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースを調査する
title: スコープ用のプライマリタグを設定する
---
## 定義{#definition}

Datadog APM アプリケーション全体をスコープするために利用可能なディメンションがいくつかあります。これには、集計統計 (リクエスト/秒、レイテンシー、エラー率、Apdex スコアなど) や、表示可能な[トレース][1]が含まれます。これらのディメンションはプライマリタグを通じて設定され、アプリケーションの動作をより詳細に把握することが可能になります。プライマリタグのユースケースには、環境、アベイラビリティーゾーン、データセンターなどがあります。

プライマリタグは、従来の [Datadog タグ][2]とは異なる一連のルールに従う必要があります。

## セットアップ{#setup}

### 環境{#environment}

デフォルトかつ必須のプライマリタグは、トレースが収集される環境です。そのタグキーは `env` であり、タグ付けされていないデータのデフォルト値は `env:none` です。

#### トレーサー環境{#tracer-environment}

Datadog では、SDK で `env` を設定することを推奨しています。これにより、`env` の定義がサービスの実際のランタイム内に存在するため、より高い柔軟性が得られます。

`DD_ENV` がサービスプロセスに公開されている場合、SDK はそれを自動的に使用します。`DD_ENV` やその他の標準的なサービス環境変数の設定については、「[Unified Service Tagging][3]」を参照してください。

また、コード内で `env` を SDK のグローバルタグとして手動で設定することもできます。詳細については、「[APM でのタグの割り当て][4]」を参照してください。

#### Agent の環境設定{#agent-environment}

`env` タグは Agent 設定で指定することもできます。
**トレーサーと Agent で異なる `env` タグを設定しないでください。これを行うと、[トレースメトリクス][5]でタグの重複が発生する可能性があります。**

オプション:

1. 最上位レベルの Agent 設定:

    ```yaml
    env: <ENVIRONMENT>
    ...
    ```

    **Containerized environments**: The Agent also supports configuration of the top-level `env` through the environment variable `DD_ENV`.

2. Agent ホストタグ:

    ```yaml
    tags:
        env: <ENVIRONMENT>
        ...
    ```

    **Containerized environments**: The Agent also supports configuration of top-level `tags` through the environment variable `DD_TAGS`.

#### 環境別のデータ{#data-by-environment}

環境は APM ページの上部に表示されます。`env` ドロップダウンを使用して、現在のページに表示されるデータのスコープを指定できます。

## Datadog で追加のプライマリタグを追加する{#add-additional-primary-tags-in-datadog}

追加のディメンション全体でトレースメトリクスを集計する必要がある場合、Datadog では必須のプライマリタグ `env:<ENVIRONMENT>` に加えて、追加のプライマリタグを設定することを推奨しています。設定が完了すると、[{{< ui >}}Catalog Performance{{< /ui >}}] タブで 2 つ目のドロップダウンが利用可能になります。

[APM 設定][6]ページに移動して、プライマリタグの定義、変更、削除を行います。

**注**:

* このページにアクセスできるのは組織の管理者のみです。
* 変更が UI に反映されるまで最大 2 時間かかる場合があります。
* SDK は常にスパンに、`resource` タグ、`name` タグ、`service` タグを追加します。混乱を避けるため、Datadog ではこれらをホストレベルのタグとして追加しないことを推奨しています。
* 追加のプライマリタグは、タグごとに最大 100 個の一意の値をサポートします。詳細については、「[APM データ量ガイドライン][9]」を参照してください。
* 追加のプライマリタグには、ホストタグまたはコンテナタグを使用できます。SDK によって追加されたスパンレベルのタグは、プライマリタグとして使用できません。

以前に設定したプライマリタグを変更する場合は、以下の点に注意してください。

* 以前に設定されたタグによって集計された過去の APM データにはアクセスできなくなります。
* 以前のタグにスコープ設定された APM モニターは、{{< ui >}}No Data{{< /ui >}} のステータスを表示します。

## コンテナベースの追加プライマリタグ{#container-based-additional-primary-tags}

Linux ベースのプラットフォームでは、Docker コンテナおよび Kubernetes Pod のメタデータから派生したタグに基づいて、トレースメトリクスをインデックス化できます。

コンテナベースのプライマリタグは、Datadog Agent バージョン 7.65.0 以降でデフォルトで有効になっています。[APM 設定][6]ページに移動し、使用する追加プライマリタグを選択します。この設定の変更が有効になるまで、最大 2 時間かかる場合があります。

[Catalog][7] では、コンテナ化されたサービスによって送信されているタグでサービスをフィルタリングできます。Dashboards や Monitors で使用されるトレースメトリクスも、コンテナプライマリタグで集計できます。

**注**: プライマリタグの値には、大文字や特殊文字 (アンダースコア、マイナス、コロン、ピリオド、スラッシュを除く) を含めないでください。含めた場合、一部の機能が正常に動作しない可能性があります。

### コンテナベースのプライマリタグを無効にする{#disable-container-based-primary-tags}

コンテナベースのプライマリタグを無効にするには、`disable_cid_stats` APM 機能を設定し、Agent を再起動してください。`DD_APM_FEATURES` がすでに設定されている場合は、カンマ区切りのリストに `disable_cid_stats` を追加してください。手順は、Agent のインストール方法によって異なります。

{{< tabs >}}
{{% tab "Helm" %}}

values ファイルに以下を追加してください。

```yaml
#...
datadog:
  #...
  env:
    - name: DD_APM_FEATURES
      value: 'disable_cid_stats'
```

{{% /tab %}}

{{% tab "Kubernetes (Helm なし)" %}}

Agent の DaemonSet で以下の環境変数を使用してください。Agent プロセスごとにコンテナを実行している場合は、すべてのコンテナに以下の環境変数を追加してください。それ以外の場合は、Agent コンテナに追加してください。

```yaml
# (...)
  env:
    # (...)
    - name: DD_APM_FEATURES
      value: 'disable_cid_stats'
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

[docker-compose.yml][1] ファイルに以下を追加してください。

```yaml
services:
  #...
  datadog:
    #...
    environment:
     - DD_APM_FEATURES=disable_cid_stats
```


[1]: /ja/agent/guide/compose-and-the-datadog-agent/
{{% /tab %}}
{{% tab "環境変数" %}}

Docker や ECS のインストールで一般的なように、環境変数を使用して Agent を設定する場合は、以下の環境変数をトレース Agent に渡してください。

```
DD_APM_FEATURES=disable_cid_stats
```

{{% /tab %}}
{{< /tabs >}}

### タグとしてのカスタムラベル{#custom-labels-as-tags}

まだ設定していない場合は、[Assigning Tags][8] を使用して、コンテナまたは Pod のラベルをトレースのカスタムタグとして送信するように Agent を設定することもできます。

## プライマリタグ別にデータを表示する{#view-data-by-primary-tag}

プライマリタグは、APM ページの上部に表示されます。これらのセレクターを使用して、現在のページに表示されるデータをフィルタリングできます。プライマリタグに関係なくすべてのデータを表示するには、ドロップダウンから [`<TAG_NAME>:*`] を選択します。

{{< img src="tracing/guide/setting_primary_tags/second-primary-tag-dropdown.png" alt="2 番目のプライマリタグを持つスコープを選択するためのオプションを表示するドロップダウンメニュー" style="width:90%;">}}


## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/glossary/#trace
[2]: /ja/getting_started/tagging/
[3]: /ja/getting_started/tagging/unified_service_tagging
[4]: /ja/getting_started/tagging/assigning_tags/#traces
[5]: /ja/tracing/metrics/metrics_namespace/
[6]: https://app.datadoghq.com/apm/settings/default-settings
[7]: https://app.datadoghq.com/services
[8]: /ja/getting_started/tagging/assigning_tags
[9]: /ja/tracing/troubleshooting/#data-volume-guidelines