---
aliases:
- /ja/tracing/advanced/setting_primary_tags_to_scope/
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/
  tags: トレースの加工
  text: ログとトレースの接続
- link: /tracing/manual_instrumentation/
  tags: トレースの加工
  text: 手動でアプリケーションのインスツルメンテーションを行いトレースを作成します。
- link: /tracing/opentracing/
  tags: トレースの加工
  text: アプリケーション全体に Opentracing を実装します。
- link: /tracing/glossary/
  tag: APM の UI を利用する
  text: サービス、リソース、トレースの詳細
title: プライマリタグをスコープに設定
---

## 定義

Datadog APM アプリケーション全体をスコープに設定するために使用できるディメンションが複数あります。これには、集計統計（リクエスト/秒、レイテンシー、エラー率、Apdex スコアなど）および表示可能な[トレース][1]が含まれます。こうしたディメンションは、アプリケーションの動作をさらに詳細に把握できるプライマリタグを介して設定されます。プライマリタグのユースケースには、環境、アベイラビリティゾーン、データセンターなどがあります。

プライマリタグは、従来の [Datadog タグ][2]とは異なるルールセットに従う必要があります。

## セットアップ

### 環境

デフォルトの必須プライマリタグは、トレースの収集元の環境です。タグキーは `env` で、タグなしデータのデフォルト値は `env:none` です。

#### トレーサー環境

Datadog は、トレーサーに `env` を設定することをお勧めします。`env` の定義はサービスの実際のランタイム内に存在するため、これにより柔軟性も向上します。

`DD_ENV` がサービスのプロセスに公開されている場合、トレーサーはそれを自動的に使用します。`DD_ENV` およびその他の標準サービス環境変数の設定については、[統合サービスタグ付け][3]を参照してください。

コードでトレーサーのグローバルタグとして `env` を手動で設定することもできます。詳細については、[APM でのタグの割り当て][4]を参照してください。

#### Agent 環境

`env` タグは、Agent コンフィギュレーションで設定できます。
**トレーサーと Agent に異なる `env` タグを設定しないでください。これを行うと、[トレースメトリクス][5]でタグが重複する可能性があります。**

オプション

1. トップレベル Agent コンフィギュレーション:

    ```yaml
    env: <ENVIRONMENT>
    ...
    ```

    **コンテナ化環境**: Agent は、環境変数 `DD_ENV` によるトップレベルの `env` のコンフィギュレーションもサポートしています。

2. Agent ホストタグ:

    ```yaml
    tags:
        env: <ENVIRONMENT>
        ...
    ```

    **コンテナ化環境**: Agent は、環境変数 `DD_TAGS` によるトップレベルの `tags` のコンフィギュレーションもサポートしています。

#### 環境ごとのデータ

環境は、APM ページの上部に表示されます。`env` ドロップダウンを使用して、現在のページに表示されるデータのスコープを設定します。

## Datadog に 2 番目のプライマリタグを追加する

トレースメトリクスを追加のディメンションにわたって集計する必要がある場合、デフォルトで必須のプライマリタグ `env:<ENVIRONMENT>` に加えて、2 つ目のプライマリタグを設定することをお勧めします。構成すると、**Service Catalog Performance** タブで 2 つ目のドロップダウンが利用可能になります。

[APM 設定][6]ページで、プライマリタグの定義、変更、削除を行います。

**注**:

* 組織管理者のみがこのページにアクセスできます。
* 変更が UI に反映されるまでに最大 2 時間かかる場合があります。
* トレーサーは常に `resource`、`name`、`service` タグをスパンに追加します。Datadog は、混乱を避けるために、これらをホストレベルのタグとして追加しないことをお勧めします。
* 2 つ目のプライマリタグは最大 30 個のユニークな値をサポートします。詳しくは [APM データ量ガイドライン][9]を参照してください。

以前に設定したプライマリタグを変更する場合は、次のことに注意してください。

* 以前に設定されたタグによって集計された履歴 APM データにはアクセスできなくなります。
* 前のタグをスコープとする APM モニターには、_No Data_ のステータスが表示されます。

## コンテナベースの第 2 プライマリタグ

Linux ベースのプラットフォームで、Docker コンテナや Kubernetes ポッドのメタデータに由来するタグに基づいて、トレースメトリクスのインデックスを作成することができます。コンテナベースの第 2 プライマリタグは、Datadog Agent バージョン 7.35.0 以降で利用可能です。

コンテナベースの第 2 プライマリタグを有効にするには、Agent バージョン 7.35.0 以降をインストールし、CID 統計の設定を以下のように更新し、Agent を再起動します。有効化の手順は、Agent のインストール方法によって異なります。

{{< tabs >}}
{{% tab "Helm" %}}

Datadog Helm チャートバージョン 2.26.2 以降を使用して、values ファイルに以下を追加します。

```yaml
#...
datadog:
  #...
  env:
    - name: DD_APM_FEATURES
      value: 'enable_cid_stats'
```

{{< /tabs >}}

{{% tab "Kubernetes (Helm を使用しない)" %}}

Agent DaemonSet で以下の環境変数を使用します。Agent プロセスごとにコンテナを実行する場合は、すべてのコンテナに以下の環境変数を追加します。それ以外の場合は、Agent コンテナに追加します。

```yaml
# (...)
  env:
    # (...)
    - name: DD_APM_FEATURES
      value: 'enable_cid_stats'
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

以下を [docker-compose.yml][1] ファイルに追加します。

```yaml
services:
  #...
  datadog:
    #...
    environment:
     - DD_APM_FEATURES: 'enable_cid_stats'
```


[1]: /ja/agent/guide/compose-and-the-datadog-agent/
{{% /tab %}}
{{% tab "環境変数" %}}

Docker や ECS のインストールでよくあるように、Agent を環境変数で構成する場合、Docker イメージのアップグレード後に以下の環境変数をトレース Agent に渡します。

```
DD_APM_FEATURES=enable_cid_stats
```

{{% /tab %}}
{{< /tabs >}}

Agent を再起動します。[APM 設定][6]ページに移動し、使用する第 2 プライマリタグを選択します。この設定の変更が反映されるまで、最大で 2 時間かかることがあります。

これで、[サービスカタログ][7]で、コンテナ化されたサービスから送信されるタグによって、サービスをフィルターすることができます。ダッシュボードやモニターで使用されるトレースメトリクスも、コンテナのプライマリタグで集計することができます。

### タグとしてのカスタムラベル

まだの方は、[タグの割り当て][8]で、コンテナやポッドのラベルをトレースのカスタムタグとして送信するように Agent を構成することも可能です。

## プライマリタグごとのデータの表示

プライマリタグは、APM ページの上部に表示されます。これらのセレクターを使用して、現在のページに表示されるデータをフィルターします。プライマリタグに依存しないすべてのデータを表示するには、ドロップダウンから `<タグ名>:*` を選択します。

{{< img src="tracing/guide/setting_primary_tags/second-primary-tag-dropdown.png" alt="第 2 プライマリタグを持つスコープを選択するためのオプションを示すドロップダウンメニュー" style="width:90%;">}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/glossary/#trace
[2]: /ja/getting_started/tagging/
[3]: /ja/getting_started/tagging/unified_service_tagging
[4]: /ja/getting_started/tagging/assigning_tags/#traces
[5]: /ja/tracing/metrics/metrics_namespace/
[6]: https://app.datadoghq.com/apm/settings
[7]: https://app.datadoghq.com/services
[8]: /ja/getting_started/tagging/assigning_tags
[9]: /ja/tracing/troubleshooting/#data-volume-guidelines