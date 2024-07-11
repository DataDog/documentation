---
aliases:
- /ja/agent/tagging
- /ja/tagging/assigning_tags/
description: Datadog でタグを割り当てる方法について説明します。
further_reading:
- link: /getting_started/tagging/
  tag: Documentation
  text: タグの概要
- link: /getting_started/tagging/using_tags/
  tag: Documentation
  text: Datadog でのタグの使用方法
title: タグの付け方
---

## 概要

タグ付けは、監視するマシンとメトリクスにクエリを実行するために Datadog 全体で使用されます。タグに基づく割り当てと絞り込みの機能がないと、環境内の問題を発見し、絞り込んで根本的な原因を見つけることが難しくなります。先に進む前に、Datadog での[タグの定義][1]方法を学習してください。

タグはさまざまな方法で構成することができます。

- Datadog Agent [コンフィギュレーションファイル](#コンフィギュレーションファイル) または各インテグレーションのコンフィギュレーションファイル
- Datadog [UI](#ui) 経由
- Datadog [API](#api)
- [DogStatsD](#dogstatsd)

{{< tabs >}}
{{% tab "非コンテナ化環境" %}}
非コンテナ化環境では、Agent が自動で[ホストタグ](#ホストタグ)を割り当て、インテグレーションからタグを継承します。これらのタグは、手動でタグ付け可能なその他のタグと同様に、[Datadog Agent コンフィギュレーションファイル](#コンフィギュレーションファイル)で構成可能です。{{% /tab %}}

{{% tab "コンテナ化環境" %}}
コンテナ化環境では、Datadog で[オートディスカバリー][1]を使用することを推奨します。[統合サービスタグ付け][2]が可能となるため、すべての Datadog テレメトリーのコンフィギュレーションを管理する単体ポイントとして機能します。

オートディスカバリーの目的は、任意のコンテナに対する Agent チェックの実行中に Datadog インテグレーションのコンフィギュレーションを適用することです。オートディスカバリーを使用すると、Datadog Agent は新しいコンテナで実行されているサービスを自動で識別し、対応するモニタリングのコンフィギュレーションを検索してメトリクスの収集を開始します。タグはその後、オートディスカバリーの[コンフィギュレーションテンプレート][3]内で構成することができます。

オートディスカバリーを使用しない場合、Agent は自動で[ホストタグ](#ホストタグ)を割り当て、非コンテナ化環境の場合と同様にインテグレーションからタグを継承します。これらのタグは、手動で追加されたタグと併せて、[Datadog Agent のコンフィギュレーションファイル](#コンフィギュレーションファイル)内で構成が可能です。


[1]: /ja/getting_started/agent/autodiscovery/
[2]: /ja/getting_started/tagging/unified_service_tagging
[3]: /ja/getting_started/agent/autodiscovery/?tab=docker#integration-templates
{{% /tab %}}
{{< /tabs >}}

## タグの割り当て方法

### 構成ファイル

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

#### ファイルの場所

Agent コンフィギュレーションファイル (`datadog.yaml`) は、Datadog Agent によって転送されるすべてのメトリクス、トレース、ログに適用されるホストタグの設定に使用されます。

Agent とともにインストールされる[インテグレーション][1]のタグは、Agent インストールの **conf.d** ディレクトリにある YAML ファイルで構成されます。コンフィギュレーションファイルの場所については、[Agent コンフィギュレーションファイル][2]を参照してください。

#### YAML 形式

YAML ファイルでは、`tags` キーの下の文字列のリストを使用してタグのリストを割り当てます。YAML では、リストは 2 つの異なるが機能的に同等の形式で定義されます。

```yaml
tags: ["<キー_1>:<値_1>", "<キー_2>:<値_2>", "<キー_3>:<値_3>"]
```

または

```yaml
tags:
    - "<キー_1>:<値_1>"
    - "<キー_2>:<値_2>"
    - "<キー_3>:<値_3>"
```

タグは `<キー>:<値>` のペアで割り当てることをお勧めしますが、キー（`<キー>`）のみで構成されるタグも使用できます。詳細については、[タグの定義][3]を参照してください。

#### ホストタグ

ホスト名 (タグキー `host`) は、Datadog Agent によって[自動的に割り当てられます][4]。ホスト名をカスタマイズするには、Agent コンフィギュレーションファイル `datadog.yaml` を使用します。

```yaml
# ホスト名を設定します (デフォルト: 自動検出)
# RFC-1123 に準拠する必要があり、以下のみが許可されます。
# "A" ～ "Z"、"a" ～ "z"、"0" ～ "9"、ハイフン (-)
hostname: mymachine.mydomain
```

##### ホスト名の変更

* 古いホスト名は 2 時間にわたって UI に残存しますが、新しいメトリクスは表示されません。
* 古いホスト名を持つホストからのデータは、API でクエリを実行できます。
* 古いホスト名と新しいホスト名のグラフ メトリクスを 1 つのグラフに表示するには、[2 メトリクス間の数式][5]を使用します。


[1]: /ja/getting_started/integrations/
[2]: /ja/agent/configuration/agent-configuration-files/
[3]: /ja/getting_started/tagging/#define-tags
[4]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/#host-tag-key
[5]: /ja/dashboards/querying/#arithmetic-between-two-metrics
{{% /tab %}}
{{% tab "Agent v5" %}}

#### ファイルの場所

Agent コンフィギュレーションファイル (`datadog.conf`) は、Datadog Agent によって転送されるすべてのメトリクス、トレース、ログに適用されるホストタグの設定に使用されます。

Agent とともにインストールされる[インテグレーション][1]のタグは、Agent インストールの **conf.d** ディレクトリにある YAML ファイルで構成されます。コンフィギュレーションファイルの場所については、[Agent コンフィギュレーションファイル][2]を参照してください。

#### YAML 形式

YAML ファイルでは、`tags` キーの下の文字列のリストを使用してタグのリストを割り当てます。YAML では、リストは 2 つの異なるが機能的に同等の形式で定義されます。

```yaml
tags: <キー_1>:<値_1>, <キー_2>:<値_2>, <キー_3>:<値_3>
```

タグは `<キー>:<値>` のペアで割り当てることをお勧めしますが、キー（`<キー>`）のみで構成されるタグも使用できます。詳細については、[タグの定義][3]を参照してください。

#### ホストタグ

ホスト名 (タグキー `host`) は、Datadog Agent によって[自動的に割り当てられます][4]。ホスト名をカスタマイズするには、Agent コンフィギュレーションファイル `datadog.conf` を使用します。

```yaml
# ホスト名を設定します (デフォルト: 自動検出)
# RFC-1123 に準拠する必要があり、以下のみが許可されます。
# "A" ～ "Z"、"a" ～ "z"、"0" ～ "9"、ハイフン (-)
hostname: mymachine.mydomain
```

##### ホスト名の変更

* 古いホスト名は 2 時間 UI に残りますが、新しいメトリクスは表示されません。
* 古いホスト名を持つホストからのデータは、API でクエリを実行できます。
* 古いホスト名と新しいホスト名のグラフ メトリクスを 1 つのグラフに表示するには、[2 メトリクス間の数式][5]を使用します。


[1]: /ja/getting_started/integrations/
[2]: /ja/agent/configuration/agent-configuration-files/
[3]: /ja/getting_started/tagging/#define-tags
[4]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/#host-tag-key
[5]: /ja/dashboards/querying/#arithmetic-between-two-metrics
{{% /tab %}}
{{< /tabs >}}

#### インテグレーションの継承

タグの付け方で最も効率的な方法は、インテグレーションの継承に依存することです。AWS インスタンス、Chef レシピ、およびその他のインテグレーションに割り当てるタグは、Datadog に送信するホストとメトリクスによって自動的に継承されます。

コンテナ化環境では、[統合サービスタグ付け][2]のドキュメントに従って、すべての Datadog テレメトリーのコンフィギュレーションを管理する単一ポイントを構築することをお勧めします。

##### クラウドインテグレーション

[クラウドインテグレーション][3]は認証ベースです。Datadog では、メインのクラウドインテグレーションタイル（AWS、Azure、Google Cloud など）を使用し、可能な場合は [Agent をインストール][4]することを推奨しています。**注**: Agent のみの使用を選択した場合、一部のインテグレーションタグは利用できません。

##### ウェブインテグレーション

[ウェブインテグレーション][5]は認証ベースです。メトリクスは API 呼び出しで収集されます。**注**: `CamelCase` タグは、Datadog によってアンダースコアに変換されます（例: `TestTag` --> `test_tag`）。

#### 環境変数

コンテナ化された Datadog Agent をインストールしたら、Agent のメインコンフィギュレーションファイルにある環境変数 `DD_TAGS を使用してホストタグを設定します。

Datadog は [Docker、Kubernetes、ECS、Swarm、Mesos、Nomad、Rancher][6] から一般的なタグを自動的に収集します。さらに多くのタグを抽出するには、次のオプションを使用します。

| 環境変数               | 説明                                                                                             |
|------------------------------------|---------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_LABELS_AS_TAGS`      | コンテナラベルを抽出します。この環境は、古い `DD_DOCKER_LABELS_AS_TAGS` 環境と同等です。             |
| `DD_CONTAINER_ENV_AS_TAGS`         | コンテナ環境変数を抽出します。この環境は、古い `DD_DOCKER_ENV_AS_TAGS` 環境と同等です。 |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | ポッドラベルを抽出します                                                                                      |
| `DD_CHECKS_TAG_CARDINALITY`        | チェックメトリクスにタグを追加 (低、オーケストレーター、高)                                                     |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | カスタムメトリクスにタグを追加 (低、オーケストレーター、高)                                                    |

**例:**

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app","release":"helm_release"}'
DD_CONTAINER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

`DD_KUBERNETES_POD_LABELS_AS_TAGS` を使用する場合、次の形式のワイルドカードを使用できます。

```text
{"foo": "bar_%%label%%"}
```

たとえば、`{"app*", "kube_%%label%%"}` は、ラベル `application` のタグ名 `kube_application` に解決されます。さらに、`{"*": "kube_%%label%%"}` は、すべてのポッドラベルを `kube_` で始まるタグとして追加します。

Docker Swarm `docker-compose.yaml` ファイル内で `DD_CONTAINER_LABELS_AS_TAGS` 変数を使用する場合は、次の例のように、アポストロフィーを削除します。

```yaml
- DD_CONTAINER_LABELS_AS_TAGS={"com.docker.compose.service":"service_name"}
```

Docker コンテナにラベルを追加する際は、`docker-compose.yaml` ファイル内で `labels:` キーワードをどこに配置するかが重要となります。スムーズに設定が進むよう、[Docker の統合サービスタグ付け][2]に関するドキュメントを参照してください。

 このコンフィギュレーションの外部でコンテナにラベル付けを行う必要がある場合は、`labels:` キーワードを `services:` セクションの **内部**に配置します。`deploy:` セクション内に**含めない**よう注意してください。`labels:` キーワードを `deploy:` セクション内に配置するのは、サービスに対してラベル付けが必要な場合のみです。この配置が正しくないと、Datadog Agent はコンテナからラベルを抽出することができません。

以下は `docker-compose.yaml` ファイル内でこの設定を行う場合のサンプルです。この例では `myapplication:` セクション、`my.custom.label.project`、`my.custom.label.version` のそれぞれに固有の値が割り振られます。`datadog:` セクションの `DD_CONTAINER_LABELS_AS_TAGS` 環境変数を使用してラベルを抽出し、`myapplication` コンテナ用のタグを生成します。

`myapplication` コンテナ内のラベル: `my.custom.label.project` `my.custom.label.version`

Agent がコンテナからラベルを抽出すると、タグは次のようになります。
`projecttag:projectA`
`versiontag:1`

**サンプル docker-compose.yaml:**

```yaml
services:
  datadog:
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock:ro'
      - '/proc:/host/proc:ro'
      - '/sys/fs/cgroup/:/host/sys/fs/cgroup:ro'
    environment:
      - DD_API_KEY= "<DATADOG_API_KEY>"
      - DD_CONTAINER_LABELS_AS_TAGS={"my.custom.label.project":"projecttag","my.custom.label.version":"versiontag"}
      - DD_TAGS="key1:value1 key2:value2 key3:value3"
    image: 'gcr.io/datadoghq/agent:latest'
    deploy:
      restart_policy:
        condition: on-failure
      mode: replicated
      replicas: 1
  myapplication:
    image: 'myapplication'
    labels:
      my.custom.label.project: 'projectA'
      my.custom.label.version: '1'
    deploy:
      restart_policy:
        condition: on-failure
      mode: replicated
      replicas: 1
```

変数は、カスタムの `datadog.yaml` で定義するか、環境変数で JSON マップとして設定します。マップキーはソース (`label/envvar`) 名、マップ値は Datadog タグ名です。

##### タグカーディナリティ

タグカーディナリティを設定する環境変数は、`DD_CHECKS_TAG_CARDINALITY` と `DD_DOGSTATSD_TAG_CARDINALITY` の 2 つあります。DogStatsD の料金設定が異なるため、それに応じて DogStatsD タグカーディナリティも細かく構成できるように分けられています。それ以外は、これらの変数は同じように機能します。使用できる値は、`low`、`orchestrator`、または `high` です。どちらもデフォルトは `low` で、ホストレベルのタグを取り込みます。

カーディナリティによって、[Kubernetes と OpenShift][7] と [Docker、Rancher、Mesos][8] では異なるタグがすぐに使えるように用意されています。ECS と Fargate では、変数を `orchestrator` に設定すると、`task_arn` タグが追加されます。

#### トレース

Datadog トレーサーは環境変数、システムプロパティ、またはコード内のコンフィギュレーションを通じて構成することができます。 各トレーサーのタグ付けオプションとコンフィギュレーションの情報は、[Datadog トレーシング設定][9]に関するドキュメントを参照してください。[統合サービスタグ付け][2]のドキュメントでも、統合サービスタグ付け用のトレーサーを構成する方法をご覧いただけます。

使用するトレーサーの種類に関わらず、スパンメタデータはタイプ化された 3 つの構造を考慮する必要があります。ツリーの各ノードは `.` で分割され、各ノードのタイプは 1 つのみとなります。

たとえば、ノードをオブジェクト (およびサブノード) と文字列の両方に設定することはできません。
```json
{
  "key": "value",
  "key.subkey": "value_2"
}
```
上記のスパンメタデータは、`key` の値が文字列 (`"value"`) を参照できないこと、またサブツリー (`{"subkey": "value_2"}`) であることから無効となります。

### UI

{{< tabs >}}
{{% tab "Host Map" %}}

[Host Map ページ][1]を使って UI でホストタグを割り当てます。ページの下部にホストオーバーレイを表示するには、六角形（ホスト）をクリックします。次に、*User* セクションで **Add Tags** ボタンをクリックします。タグをカンマで区切って入力し、**Save Tags** をクリックします。UI で行ったホストタグの変更が適用されるまで最大 5 分かかることがあります。

{{< img src="tagging/assigning_tags/host_add_tags.png" alt="ホストの詳細情報が開かれ、Add Tags ボタンがハイライト表示されているホストマップ" style="width:80%;">}}


[1]: /ja/infrastructure/hostmap/
{{% /tab %}}
{{% tab "Infrastructure List" %}}

[Infrastructure List ページ][1]を使って UI でホストタグを割り当てます。ページの右にホストオーバーレイを表示するには、ホストをクリックします。次に、*User* セクションで **Add Tags** ボタンをクリックします。タグをカンマ区切りリストで入力し、**Save Tags** をクリックします。UI でホストタグに加えた変更は、適用されるまでに最大 5 分かかる場合があります。タグを追加したら、タグが UI に表示されていることを確認してから、さらにタグを追加してください。

{{< img src="tagging/assigning_tags/infrastructure_add_tags.png" alt="インフラストラクチャーの詳細パネルが開かれ、Add Tags ボタンがハイライト表示されているインフラストラクチャーリスト" style="width:80%;">}}


[1]: /ja/infrastructure/
{{% /tab %}}
{{% tab "Monitors" %}}

[Manage Monitors][1] ページで、各モニターの隣にあるチェックボックスをオンにしてタグを追加します (1 つ以上のモニターを選択します)。**Edit Tags** ボタンをクリックします。タグを入力するか、以前に使用したタグを選択します。次に **Add Tag `tag:name`** または **Apply Changes** をクリックします。以前にタグを追加してある場合は、タグチェックボックスを使用して一度に複数のタグを割り当てることができます。詳しくは、[モニターの管理ドキュメント][2]を参照してください。

モニターを作成する場合は、ステップ 4 *Say what's happening* または *Notify your Team* でモニタータグを割り当てます。

{{< img src="monitors/notifications/notifications_add_required_tags.png" alt="ポリシータグ構成の表示。'Policy tags' の下には、'Select value' のドロップダウンの横に、cost_center、product_id、env の 3 つのタグの例が示されています。" style="width:80%;" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: /ja/monitors/manage/
{{% /tab %}}
{{% tab "Distribution Metrics" %}}

最大 10 個のタグの許可リストをメトリクスに適用することにより、[Distribution Metrics][1] 内でパーセンタイル集計を作成します。これにより、タグ値の潜在的にクエリ可能な組み合わせの時系列が作成されます。ディストリビューションメトリクスから出力されるカスタムメトリクスと時系列のカウントの詳細については、[カスタムメトリクス][2]を参照してください。

**最大 10 個のタグを適用します。除外タグは使用できません**。

{{< img src="tagging/assigning_tags/global_metrics_selection.png" alt="モニタータグを作成" style="width:80%;">}}

[1]: /ja/metrics/distributions/
[2]: /ja/metrics/custom_metrics/
{{% /tab %}}
{{% tab "Integrations" %}}

[AWS][1] インテグレーション タイルでは、アカウント レベルですべてのメトリクスに追加のタグを割り当てることができます。`<KEY>:<VALUE>` の形式で、タグのカンマ区切りのリストを使用します。

{{< img src="tagging/assigning_tags/integrationtags.png" alt="AWS タグ" style="width:80%;">}}

[1]: /ja/integrations/amazon_web_services/
{{% /tab %}}
{{% tab "サービスレベル目標" %}}

SLO を作成する場合は、ステップ 3 *Add name and tags* でタグを割り当てます。

{{< img src="tagging/assigning_tags/slo_individual_tags.png" alt="SLO タグを作成" style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

### API

{{< tabs >}}
{{% tab "Assignment" %}}

[Datadog API][1] では、タグはさまざまな方法で割り当てることができます。これらのセクションへのリンクは、以下のリストを参照してください。

* [チェック実行のポスト][1]
* [イベントのポスト][2]
* [AWS インテグレーション][3]
* [時系列ポイントのポスト][4]
* モニターの[作成][5]または[編集][6]
* ホストタグの[追加][7]または[更新][8]
* [トレースの送信][9]
* サービスレベル目標の[作成][10]または[更新][11]

[1]: /ja/api/v1/service-checks/#submit-a-service-check
[2]: /ja/api/v1/events/#post-an-event
[3]: /ja/api/v1/aws-integration/
[4]: /ja/api/v1/metrics/#submit-metrics
[5]: /ja/api/v1/monitors/#create-a-monitor
[6]: /ja/api/v1/monitors/#edit-a-monitor
[7]: /ja/api/v1/tags/#add-tags-to-a-host
[8]: /ja/api/v1/tags/#update-host-tags
[9]: /ja/tracing/guide/send_traces_to_agent_by_api/
[10]: /ja/api/v1/service-level-objectives/#create-a-slo-object
[11]: /ja/api/v1/service-level-objectives/#update-a-slo
{{% /tab %}}
{{% tab "Example" %}}

Datadog 内でのタグ付けは、メトリクスを収集する強力な方法です。簡単な例として、Web サイト (example.com) の次のメトリクスの合計を探しているとします。

```text
Web server 1: api.metric('page.views', [(1317652676, 100), ...], host="example_prod_1")
Web server 2: api.metric('page.views', [(1317652676, 500), ...], host="example_prod_2")
```

Datadog は、タグ `domain:example.com` を追加し、ホスト名を省略することをお勧めします（Datadog API がホスト名を自動的に決定します）。

```text
Web server 1: api.metric('page.views', [(1317652676, 100), ...], tags=['domain:example.com'])
Web server 2: api.metric('page.views', [(1317652676, 500), ...], tags=['domain:example.com'])
```

`domain:example.com` タグで、複数のホストのページビューを合計できます。

```text
sum:page.views{domain:example.com}
```

ホストによって分割するには、次のようにします。

```text
sum:page.views{domain:example.com} by {host}
```

{{% /tab %}}
{{< /tabs >}}

### DogStatsD

[DogStatsD][9] に送信したタグをメトリクス、イベント、サービスチェックに追加します。たとえば、アルゴリズムのバージョンでタイマー メトリクスをタグ付けして、2 つのアルゴリズムのパフォーマンスを比較します。

```python

@statsd.timed('algorithm.run_time', tags=['algorithm:one'])
def algorithm_one():
    # 何らかの処理 ...

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # 何らかの処理 (速度を比較) ...
```

**注**: タグ付けは、StatsD の [Datadog 固有の拡張機能][10]です。

`host` タグを DogStatsD メトリクスに割り当てる場合は、特別な考慮事項が必要です。ホスト タグ キーの詳細については、[DogStatsD セクション][11]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/#define-tags
[2]: /ja/getting_started/tagging/unified_service_tagging
[3]: /ja/integrations/#cat-cloud
[4]: /ja/getting_started/agent/#setup
[5]: /ja/integrations/#cat-web
[6]: /ja/agent/docker/?tab=standard#tagging
[7]: /ja/agent/kubernetes/tag/?tab=containerizedagent#out-of-the-box-tags
[8]: /ja/agent/docker/tag/?tab=containerizedagent#out-of-the-box-tagging
[9]: /ja/tracing/setup/
[10]: /ja/developers/dogstatsd/
[11]: /ja/developers/community/libraries/