---
aliases:
- /ja/agent/tagging
- /ja/tagging/assigning_tags/
description: Datadog でタグを割り当てる方法について説明します。
further_reading:
- link: /getting_started/tagging/
  tag: よくあるご質問
  text: タグの概要
- link: /getting_started/tagging/using_tags/
  tag: よくあるご質問
  text: Datadog でのタグの使用方法
title: タグの付け方
---
## 概要 {#overview}

タグ付けは、モニターするマシンとメトリクスにクエリを実行するために Datadog 全体で使用されます。タグに基づく割り当てとフィルターの機能がないと、環境内の問題を発見し、根本的な原因を見つけられるまで絞り込むことが難しくなります。先に進む前に、Datadog での [タグの定義][1] 方法について学んでください。

タグはさまざまな方法で構成することができます。

- Datadog Agent [構成ファイル](#configuration-file)または各インテグレーションの構成ファイル
- Datadog [UI](#ui) を使用
- Datadog [API](#api) を使用
- [DogStatsD](#dogstatsd) を使用

{{< tabs >}}
{{% tab "非コンテナ化環境" %}}
非コンテナ化環境では、Agent が自動で[ホストタグ](#host-tags)を割り当て、インテグレーションからタグを継承します。これらのタグは、手動でタグ付け可能なその他のタグと同様に、[Datadog Agent 構成ファイル](#configuration-file)で構成されます。
{{% /tab %}}

{{% tab "コンテナ化環境" %}}
コンテナ化環境では、Datadog で [Autodiscovery][1] を使用することを推奨します。[unified service tagging][2] が可能となるため、すべての Datadog テレメトリの構成を管理する単体ポイントとして機能します。

Autodiscovery の目的は、任意のコンテナに対する Agent チェックの実行中に Datadog インテグレーションの構成を適用することです。Autodiscovery を使用すると、Datadog Agent は新しいコンテナで実行されているサービスを自動で識別し、対応するモニタリングの構成を検索してメトリクスの収集を開始します。タグはその後、Autodiscovery の [構成テンプレート][3] から構成することができます。

Autodiscovery を使用しない場合、Agent は自動で[ホストタグ](#host-tags)を割り当て、非コンテナ化環境の場合と同様にインテグレーションからタグを継承します。これらのタグは、手動で追加されたタグと併せて、[Datadog Agent 構成ファイル](#configuration-file)で構成されます。


[1]: /ja/getting_started/agent/autodiscovery/
[2]: /ja/getting_started/tagging/unified_service_tagging
[3]: /ja/getting_started/agent/autodiscovery/?tab=docker#integration-templates
{{% /tab %}}
{{< /tabs >}}

## タグの割り当て方法 {#methods-to-assign-tags}

### 構成ファイル {#configuration-file}

{{< tabs >}}
{{% tab "Agent v6 と v7" %}}

#### ファイルの場所 {#file-location}

Datadog Agent 構成ファイル (`datadog.yaml`) は、Datadog Agent によって転送されるすべてのメトリクス、トレース、ログに適用されるホストタグの設定に使用されます。

Agent とともにインストールされる [インテグレーション][1] のタグは、Agent インストールの **conf.d** ディレクトリにある YAML ファイルで構成されます。構成ファイルの場所については、[Agent 構成ファイル][2] を参照してください。

#### YAML 形式 {#yaml-format}

YAML ファイルでは、`tags` キーの下の文字列のリストを使用してタグのリストを割り当てます。YAML では、リストは 2 つの異なるが機能的に同等の形式で定義されます。

```yaml
tags: ["<KEY_1>:<VALUE_1>", "<KEY_2>:<VALUE_2>", "<KEY_3>:<VALUE_3>"]
```

または

```yaml
tags:
    - "<KEY_1>:<VALUE_1>"
    - "<KEY_2>:<VALUE_2>"
    - "<KEY_3>:<VALUE_3>"
```

タグは `<KEY>:<VALUE>` のペアで割り当てることをお勧めしますが、キー (`<KEY>`) のみで構成されるタグも使用できます。詳細については、[タグの定義][3] を参照してください。

#### ホストタグ {#host-tags}

ホスト名 (タグキー `host`) は、Datadog Agent によって [自動的に割り当てられます][4]。ホスト名をカスタマイズするには、Datadog Agent 構成ファイル `datadog.yaml` を使用します。

```yaml
# Set the hostname (default: auto-detected)
# Must comply with RFC-1123, which permits only:
# "A" to "Z", "a" to "z", "0" to "9", and the hyphen (-)
hostname: mymachine.mydomain
```

##### ホスト名の変更 {#changing-the-hostname}

* 古いホスト名は 2 時間にわたって UI に残存しますが、新しいメトリクスは表示されません。
* 古いホスト名を持つホストからのデータは、API でクエリを実行できます。
* 古いホスト名と新しいホスト名のグラフ メトリクスを 1 つのグラフに表示するには、[2 メトリクス間の数式][5] を使用します。


[1]: /ja/getting_started/integrations/
[2]: /ja/agent/configuration/agent-configuration-files/
[3]: /ja/getting_started/tagging/#define-tags
[4]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/#host-tag-key
[5]: /ja/dashboards/querying/#arithmetic-between-two-metrics
{{% /tab %}}
{{% tab "Agent v5" %}}

#### ファイルの場所 {#file-location-1}

Datadog Agent 構成ファイル (`datadog.conf`) は、Datadog Agent によって転送されるすべてのメトリクス、トレース、ログに適用されるホストタグの設定に使用されます。

Agent とともにインストールされる [インテグレーション][1] のタグは、Agent インストールの **conf.d** ディレクトリにある YAML ファイルで構成されます。構成ファイルの場所については、[Agent 構成ファイル][2] を参照してください。

#### YAML 形式 {#yaml-format-1}

YAML ファイルでは、`tags` キーの下の文字列のリストを使用してタグのリストを割り当てます。YAML では、リストは 2 つの異なるが機能的に同等の形式で定義されます。

```yaml
tags: <KEY_1>:<VALUE_1>, <KEY_2>:<VALUE_2>, <KEY_3>:<VALUE_3>
```

タグは `<KEY>:<VALUE>` のペアで割り当てることをお勧めしますが、キー (`<KEY>`) のみで構成されるタグも使用できます。詳細については、[タグの定義][3] を参照してください。

#### ホストタグ {#host-tags-1}

ホスト名 (タグキー `host`) は、Datadog Agent によって [自動的に割り当てられます][4]。ホスト名をカスタマイズするには、Datadog Agent 構成ファイル `datadog.conf` を使用します。

```yaml
# Set the hostname (default: auto-detected)
# Must comply with RFC-1123, which permits only:
# "A" to "Z", "a" to "z", "0" to "9", and the hyphen (-)
hostname: mymachine.mydomain
```

##### ホスト名の変更 {#changing-the-hostname-1}

* 古いホスト名は 2 時間にわたって UI に残存しますが、新しいメトリクスは表示されません。
* 古いホスト名を持つホストからのデータは、API でクエリを実行できます。
* 古いホスト名と新しいホスト名のグラフ メトリクスを 1 つのグラフに表示するには、[2 メトリクス間の数式][5] を使用します。


[1]: /ja/getting_started/integrations/
[2]: /ja/agent/configuration/agent-configuration-files/
[3]: /ja/getting_started/tagging/#define-tags
[4]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/#host-tag-key
[5]: /ja/dashboards/querying/#arithmetic-between-two-metrics
{{% /tab %}}
{{< /tabs >}}

#### インテグレーションの継承 {#integration-inheritance}

タグを割り当てる最も効率的な方法は、インテグレーションの継承を利用することです。AWS インスタンス、Chef レシピ、およびその他のインテグレーションに割り当てるタグは、Datadog に送信するホストとメトリクスによって自動的に継承されます。

コンテナ化環境では、[unified service tagging][2] のドキュメントに従って、すべての Datadog テレメトリの構成を管理する単一ポイントを構築することをお勧めします。

##### クラウドインテグレーション {#cloud-integrations}

[クラウドインテグレーション][3] は認証ベースです。Datadog では、メインのクラウドインテグレーションタイル（AWS、Azure、Google Cloud など）を使用し、可能な場合は、[Agent をインストール][4] することを推奨しています。**注**: Agent のみの使用を選択した場合、一部のインテグレーションタグは利用できません。

##### Web インテグレーション {#web-integrations}

[Web インテグレーション][5] は認証ベースです。メトリクスは API 呼び出しで収集されます。**注**: `CamelCase` タグは、Datadog によってアンダースコアに変換されます (例: `TestTag` --> `test_tag`)。

#### 環境変数 {#environment-variables}

コンテナ化された Datadog Agent をインストールしたら、Agent のメイン構成ファイルにある環境変数 `DD_TAGS` を使用してホストタグを設定します。複数のタグを指定する場合は、スペースで区切ってください。

**注**: `DD_TAGS` 環境変数では、タグの区切り文字としてスペースを使用します。たとえば、`DD_TAGS="key1:val1 key2:val2"` の場合は 2 つのタグが設定されます。`DD_TAGS="test:this is a test"` という値の場合は、スペースで区切られた各トークンが個別のタグとして扱われるため、4 つの異なるタグ (`test:this`、`is`、`a`、`test`) が生成されます。タグ値にスペースを含めるには、代わりに YAML 構成またはインテグレーションアノテーションを使用してタグを設定します。これらの方法では、スペースがアンダースコアに変換されます (たとえば、`test:this is a test` は `test:this_is_a_test`になります)。

Datadog は、[Docker、Kubernetes、ECS、Swarm、Mesos、Nomad、Rancher][6] から一般的なタグを自動的に収集します。さらに多くのタグを抽出するには、次のオプションを使用します。

| 環境変数               | 説明                                                                                             |
|------------------------------------|---------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_LABELS_AS_TAGS`      | コンテナラベルを抽出します。この環境は、古い `DD_DOCKER_LABELS_AS_TAGS` 環境と同等です。            |
| `DD_CONTAINER_ENV_AS_TAGS`         | コンテナ環境変数を抽出します。この環境は、古い `DD_DOCKER_ENV_AS_TAGS` 環境と同等です。|
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | Pod ラベルを抽出します。                                                                                    |
| `DD_CHECKS_TAG_CARDINALITY`        | チェックメトリクスにタグを追加します (低、オーケストレーター、高)。                                                   |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | Custom Metrics にタグを追加します (低、オーケストレーター、高)。                                                  |

**例:**

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app","release":"helm_release"}'
DD_CONTAINER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

`DD_KUBERNETES_POD_LABELS_AS_TAGS` を使用する場合、次の形式のワイルドカードを使用できます。

```text
{"foo": "bar_%%label%%"}
```

たとえば、`{"app*": "kube_%%label%%"}` はラベル `application` のタグ名 `kube_application` に解決されます。さらに、`{"*": "kube_%%label%%"}` はすべての Pod ラベルを `kube_` で始まるタグとして追加します。

Docker Swarm `docker-compose.yaml` ファイル内で `DD_CONTAINER_LABELS_AS_TAGS` 変数を使用する際は、次の例のように、アポストロフィーを削除します。

```yaml
- DD_CONTAINER_LABELS_AS_TAGS={"com.docker.compose.service":"service_name"}
```

Docker コンテナにラベルを追加する際は、`docker-compose.yaml` ファイル内で `labels:` キーワードをどこに配置するかが重要となります。問題が発生しないようにするには、[Docker unified service tagging][2] に関するドキュメントを参照してください。

この構成の外部でコンテナにラベル付けを行う必要がある場合は、`labels:` キーワードを `services:` セクションの**内部**に配置します。`deploy:` セクションの内部には配置**しません**。`labels:` キーワードを `deploy:` セクション内に配置するのは、サービスに対してラベル付けが必要な場合のみです。この配置が正しくないと、Datadog Agent はコンテナからラベルを抽出することができません。

以下は `docker-compose.yaml` ファイル内でこのラベルの配置を行う場合のサンプルです。この例では、`myapplication:`セクションのラベル `my.custom.label.project` と `my.custom.label.version` のそれぞれに固有の値が設定されています。`datadog:` セクションの `DD_CONTAINER_LABELS_AS_TAGS` 環境変数を使用してラベルを抽出し、`myapplication` コンテナ用のタグを生成します。

`myapplication` コンテナ内のラベルは、`my.custom.label.project` および `my.custom.label.version` です。

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
    image: 'registry.datadoghq.com/agent:latest'
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

##### タグカーディナリティ {#tags-cardinality}

タグカーディナリティを設定する環境変数には、`DD_CHECKS_TAG_CARDINALITY` と `DD_DOGSTATSD_TAG_CARDINALITY` の 2 つがあります。DogStatsD の料金設定が異なるため、それに応じて DogStatsD タグカーディナリティも細かく構成できるように分けられています。それ以外は、これらの変数は同じように機能します。使用できる値は、`low`、`orchestrator`、または `high` です。どちらもデフォルトは `low` で、Kubernetes クラスターレベルのタグを取り込みます。

カーディナリティの設定によって、次のように対象が異なります。
* `low`: `kube_namespace` のような Kubernetes クラスターレベルのタグ。
* `orchestrator`: `pod_name` のような Pod レベルのタグ。
* `high`: `container_id` のようなコンテナレベルのタグ。

カーディナリティによって、[Kubernetes と OpenShift][7] および [Docker、Rancher、Mesos][8] とで異なるタグのセットがすぐに使えるように用意されています。ECS と Fargate では、変数を `orchestrator` に設定すると `task_arn` タグが追加されます。

**注**:
- DogStatsD メトリクス用のコンテナタグを送信すると、作成されるメトリクスが増える場合があります (ホストごとではなく、コンテナごとに 1 つ)。これにより、Custom Metrics の請求額が変化する場合があります。
- メトリクスでは、タイムスタンプは最も近い秒に丸められます。同じタイムスタンプのポイントが複数ある場合は、最新のポイントで以前のポイントが上書きされます。設定するカーディナリティの値を大きくすることで、この問題を防止できることがあります。

#### トレース {#traces}

Datadog SDK は環境変数、システムプロパティ、またはコード内の構成を通じて構成することができます。各 SDK のタグ付けオプションと構成の情報は、[Datadog トレース設定][9] に関するドキュメントを参照してください。[unified service tagging][2] のドキュメントでも、unified service tagging 用の SDK を構成する方法をご覧いただけます。

使用する SDK にかかわらず、スパンメタデータはタイプ化されたツリー構造に従う必要があります。ツリーの各ノードは `.` で分割され、各ノードのタイプは 1 つのみとなります。

たとえば、ノードをオブジェクト (およびサブノード) と文字列の両方に設定することはできません。

```json
{
  "key": "value",
  "key.subkey": "value_2"
}
```

上記のスパンメタデータは、`key` の値が文字列 (`"value"`) を参照できないこと、またサブツリー (`{"subkey": "value_2"}`) であることから無効となります。

### UI {#ui}

{{< tabs >}}
{{% tab "Host Map (ホストマップ)" %}}

UI でホストタグを割り当てる場合は、[ホストマップページ][1] を使用します。任意の六角形 (ホスト) をクリックすると、ページの下部にホストオーバーレイが表示されます。次に、[*User*] (ユーザー) セクションにある、[**Add Tags**] (タグを追加) ボタンをクリックします。タグをカンマ区切りのリストとして入力したら、[**Save Tags**] (タグを保存) をクリックします。UI でのホストタグの変更は、適用されるまで最大 5 分かかる場合があります。

{{< img src="tagging/assigning_tags/host_add_tags.png" alt="[Add Tags] ボタンが強調表示されたホストの詳細が開いている Host Map" style="width:80%;">}}


[1]: /ja/infrastructure/hostmap/
{{% /tab %}}
{{% tab "Infrastructure List (インフラストラクチャーリスト)" %}}

[インフラストラクチャーリストページ] を使用して、UI でホストタグを割り当てます。ホストをクリックすると、ページの右側にホストオーバーレイが表示されます。次に、[*User*] (ユーザー) セクションにある、[**Add Tags**] (タグを追加) ボタンをクリックします。タグをカンマ区切りのリストとして入力したら、[**Save Tags**] (タグを保存) をクリックします。UI でのホストタグの変更は、適用されるまで最大 5 分かかる場合があります。タグを追加したら、タグが UI に表示されていることを確認してから、さらにタグを追加してください。

{{< img src="tagging/assigning_tags/infrastructure_add_tags.png" alt="[Add Tags] ボタンが強調表示された [Infrastructure details] パネルが開いている Infrastructure List" style="width:80%;">}}


[1]: /ja/infrastructure/
{{% /tab %}}
{{% tab "モニター" %}}

[モニターの管理][1] ページで、各モニターの隣にあるチェックボックスをオンにしてタグを追加します (1 つ以上のモニターを選択します)。[**Edit Tags**] (タグを編集) ボタンをクリックします。タグを入力するか、以前に使用したものを選択します。次に、[**Add Tag`tag:name`**] または [**Apply Changes**] (変更を適用) をクリックします。以前にタグを追加してある場合は、タグチェックボックスを使用して一度に複数のタグを割り当てることができます。詳しくは、[モニターの管理ドキュメント][2] を参照してください。

モニターを作成する場合は、ステップ 4 [*Say what's happening*] (発生している事象を説明する) または [*Notify your Team*] (チームへの通知) でモニタータグを割り当てます。

{{< img src="monitors/notifications/notifications_add_required_tags.png" alt="ポリシータグ構成のビュー。[Policy tags] (ポリシータグ) の下には、cost_center、product_id、および env の 3 つのサンプルタグがあり、その横に [Select value] (値を選択) ドロップダウンがあります。" style="width:80%;" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: /ja/monitors/manage/
{{% /tab %}}
{{% tab "Distribution Metrics (ディストリビューションメトリクス)" %}}

最大 10 個のタグの許可リストをメトリクスに適用することにより、[ディストリビューションメトリクス][1] 内でパーセンタイル集計を作成します。これにより、タグ値のクエリ可能な組み合わせすべての時系列が作成されます。ディストリビューションメトリクスから出力される Custom Metrics と時系列のカウントの詳細については、[Custom Metrics][2] を参照してください。

**最大 10 個のタグを適用します。除外タグは使用できません。**

{{< img src="tagging/assigning_tags/global_metrics_selection.png" alt="モニタータグの作成" style="width:80%;">}}

[1]: /ja/metrics/distributions/
[2]: /ja/metrics/custom_metrics/
{{% /tab %}}
{{% tab "インテグレーション" %}}

[AWS][1] インテグレーションタイルでは、アカウントレベルのすべてのメトリクス、および [自動サブスクリプショントリガー][2] によって送信されたログに追加のタグを割り当てることができます。`<KEY>:<VALUE>` の形式で、タグのカンマ区切りのリストを使用します。

{{< img src="tagging/assigning_tags/integrationtags.png" alt="AWS タグ" style="width:80%;">}}

[1]: /ja/integrations/amazon_web_services/
[2]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#automatically-set-up-triggers
{{% /tab %}}
{{% tab "サービスレベル目標" %}}

SLO を作成する場合は、ステップ 3 [**Add name and tags**] (名前とタグを追加) でタグを割り当てます。

{{< img src="tagging/assigning_tags/slo_individual_tags.png" alt="SLO タグの作成" style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

### API {#api}

{{< tabs >}}
{{% tab "割り当て" %}}

[Datadog API][1] を使用して、さまざまな方法でタグを割り当てることができます。これらのセクションへのリンクは、以下のリストを参照してください。

* [チェック実行のポスト][1]
* [イベントのポスト][2]
* [AWS インテグレーション][3]
* [時系列ポイントのポスト][4]
* モニターの [作成][5] または [編集][6]
* ホストタグの [追加][7] または [更新][8]
* [トレースの送信][9]
* サービスレベル目標の [作成][10] または [更新][11]

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
{{% tab "例" %}}

Datadog 内でのタグ付けは、メトリクスを収集する強力な方法です。簡単な例として、Web サイト (example.com) の次のメトリクスの合計を確認したいとします。

```text
Web server 1: api.metric('page.views', [(1317652676, 100), ...], host="example_prod_1")
Web server 2: api.metric('page.views', [(1317652676, 500), ...], host="example_prod_2")
```

Datadog では、タグ `domain:example.com` を追加し、ホスト名を省略することをお勧めします (Datadog API がホスト名を自動的に決定します)。

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

### DogStatsD {#dogstatsd}

[DogStatsD][10] に送信するメトリクス、イベント、サービスチェックにタグを追加します。たとえば、アルゴリズムのバージョンでタイマーメトリクスをタグ付けすると、2 つのアルゴリズムのパフォーマンスを比較できます。

```python

@statsd.timed('algorithm.run_time', tags=['algorithm:one'])
def algorithm_one():
    # Do fancy things here ...

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # Do fancy things (maybe faster?) here ...
```

**注**: タグ付けは、StatsD の [Datadog 固有の拡張機能][11] です。

`host` タグを DogStatsD メトリクスに割り当てる場合は、特別な考慮事項が必要です。ホストタグキーの詳細については、[メトリクスの送信: DogStatsD][12] のドキュメントを参照してください。

## 参考資料 {#further-reading}

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
[10]: /ja/extend/dogstatsd/
[11]: /ja/extend/community/libraries/
[12]: /ja/metrics/dogstatsd_metrics_submission/#host-tag