---
aliases:
- /ja/continuous_integration/setup_tests/python
further_reading:
- link: /continuous_integration/tests/containers/
  tag: ドキュメント
  text: コンテナ内でテスト用に環境変数を転送する
- link: /continuous_integration/tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: トラブルシューティング CI
kind: documentation
title: Python テスト
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

<div class="alert alert-info">Python のテストインスツルメンテーションはベータ版です。
</div>

## 互換性

サポートされている Python インタープリター:
* Python >= 2.7 および >= 3.5

サポートされているテストフレームワーク:
* pytest >= 3.0.0
  * Python 2 を使用する場合は pytest < 5

## Datadog Agent をインストールする

Datadog にテスト結果を報告するには、Datadog Agent をインストールする必要があります。

### オンプレミスの CI プロバイダーを使用する

Jenkins や自己管理型の GitLab CI などのオンプレミスの CI プロバイダー上でテストを実行している場合は、[Agent のインストール手順][1]に従って各ワーカーノードに Datadog Agent をインストールします。

CI プロバイダーがコンテナベースのエグゼキューターを使用している場合は、ビルド内の `localhost` の使用で Datadog Agent が実行されている基底のワーカーノードではなく、コンテナ自体を参照するため、すべてのビルド (デフォルトは `http://localhost:8126`) の `DD_AGENT_HOST` 環境変数をビルドコンテナ内からアクセス可能なエンドポイントに設定します。

Kubernetes エグゼキューターを使用している場合、Datadog は [Datadog Admission Controller][2] を使用することをお勧めします。これにより、ビルドポッドの `DD_AGENT_HOST` 環境変数が自動的に設定されてローカルの Datadog Agent と通信します。

### クラウドの CI プロバイダーを使用する

GitHub Actions や CircleCI など、基底のワーカーノードにアクセスできないクラウドの CI プロバイダーを使用している場合は、コンテナ内の Datadog Agent をビルドサービスとして実行します。このメソッドは、各ワーカーノードへの Datadog Agent のインストールというオプションがない場合に、コンテナベースのエグゼキューターを使用するオンプレミス CI プロバイダーでも使用できます。

単純な結果フォワーダーとして機能するコンテナとして Datadog Agent を実行するには、Docker イメージ `gcr.io/datadoghq/agent:latest` と次の環境変数を使用します。

`DD_API_KEY` (必須)
: テスト結果のアップロードに使用される [Datadog API キー][3]。<br/>
**デフォルト**: (なし)

`DD_INSIDE_CI` (必須)
: 基底のホストにアクセスできないため、Datadog Agent コンテナの監視を無効にします。<br/>
**デフォルト**: `false`<br/>
**必要な値**: `true`

`DD_HOSTNAME` (必須)
: 基底のホストを監視できないため、テストに関連付けられたホスト名のレポートを無効にします。<br/>
**デフォルト**: (自動検出)<br/>
**必要な値**: `none`

{{< site-region region="us3,us5,eu,ap1" >}}
さらに、選択したサイトを使用するように Datadog サイトを構成します ({{< region-param key="dd_site_name" >}}):

`DD_SITE`
: 結果をアップロードする Datadog サイト。<br/>
**デフォルト**: `datadoghq.com`<br/>
**選択したサイト**: {{< region-param key="dd_site" code="true" >}}
{{< /site-region >}}

#### CI プロバイダーのコンフィギュレーション例

次のセクションでは、Agent を実行し、テスト情報を報告するよう構成するために必要となる CI プロバイダー固有の手順をご説明します。

{{< tabs >}}
{{% tab "Azure Pipelines" %}}

Azure Pipelines で Datadog Agent を実行するには、[リソースセクション][1]で新しいコンテナを定義し、それを [サービスコンテナ][2]として宣言しているジョブと関連付けます。

{{< site-region region="us" >}}
{{< code-block lang="yaml" filename="azure-pipeline.yml" >}}
variables:
  ddApiKey: $(DD_API_KEY)

resources:
  containers:
    - container: dd_agent
      image: gcr.io/datadoghq/agent:latest
      ports:
        - 8126:8126
      env:
        DD_API_KEY: $(ddApiKey)
        DD_INSIDE_CI: "true"
        DD_HOSTNAME: "none"

jobs:
  - job: test
    services:
      dd_agent: dd_agent
    steps:
      - script: make test
{{< /code-block >}}
{{< /site-region >}}
{{< site-region region="us3,us5,eu,ap1" >}}
`<DD_SITE>` を選択したサイトに置き換えます: {{< region-param key="dd_site" code="true" >}}

{{< code-block lang="yaml" filename="azure-pipeline.yml" >}}
variables:
  ddApiKey: $(DD_API_KEY)

resources:
  containers:
    - container: dd_agent
      image: gcr.io/datadoghq/agent:latest
      ports:
        - 8126:8126
      env:
        DD_API_KEY: $(ddApiKey)
        DD_INSIDE_CI: "true"
        DD_HOSTNAME: "none"
        DD_SITE: "<DD_SITE>"

jobs:
  - job: test
    services:
      dd_agent: dd_agent
    steps:
      - script: make test
{{< /code-block >}}
{{< /site-region >}}

[Datadog API キー][3]を、キー `DD_API_KEY` と合わせて[プロジェクト環境変数][4]に追加します。

[1]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/resources?view=azure-devops&tabs=schema
[2]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/service-containers?view=azure-devops&tabs=yaml
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbatch
{{% /tab %}}
{{% tab "GitLab CI" %}}

GitLab で Agent を実行するには、 [サービス][1]下で Agent コンテナを定義します。

{{< site-region region="us" >}}
{{< code-block lang="yaml" filename=".gitlab-ci.yml" >}}
variables:
  DD_API_KEY: $DD_API_KEY
  DD_INSIDE_CI: "true"
  DD_HOSTNAME: "none"
  DD_AGENT_HOST: "datadog-agent"

test:
  services:
    - name: gcr.io/datadoghq/agent:latest
  script:
    - make test
{{< /code-block >}}
{{< /site-region >}}
{{< site-region region="us3,us5,eu,ap1" >}}

`<DD_SITE>` を選択したサイトに置き換えます: {{< region-param key="dd_site" code="true" >}}

{{< code-block lang="yaml" filename=".gitlab-ci.yml" >}}
variables:
  DD_API_KEY: $DD_API_KEY
  DD_INSIDE_CI: "true"
  DD_HOSTNAME: "none"
  DD_AGENT_HOST: "datadog-agent"
  DD_SITE: "<DD_SITE>"

test:
  services:
    - name: gcr.io/datadoghq/agent:latest
  script:
    - make test
{{< /code-block >}}
{{< /site-region >}}

[Datadog API キー][2]を、キー `DD_API_KEY` と合わせて[プロジェクト環境変数][3]に追加します。

[1]: https://docs.gitlab.com/ee/ci/docker/using_docker_images.html#what-is-a-service
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.gitlab.com/ee/ci/variables/README.html#custom-environment-variables
{{% /tab %}}
{{% tab "GitHub Actions" %}}

GitHub Actions で Agent を実行するには、[Datadog Agent GitHub Action][1] `datadog/agent-github-action` を使用します。

{{< site-region region="us" >}}
{{< code-block lang="yaml" >}}
jobs:
  test:
    steps:
      - name: Start the Datadog Agent locally
        uses: datadog/agent-github-action@v1
        with:
          api_key: ${{ secrets.DD_API_KEY }}
      - run: make test
{{< /code-block >}}
{{< /site-region >}}
{{< site-region region="us3,us5,eu,ap1" >}}

`<datadog_site>` を選択したサイトに置き換えます: {{< region-param key="dd_site" code="true" >}}

{{< code-block lang="yaml" >}}
jobs:
  test:
    steps:
      - name: Start the Datadog Agent locally
        uses: datadog/agent-github-action@v1
        with:
          api_key: ${{ secrets.DD_API_KEY }}
          datadog_site: <datadog_site>
      - run: make test
{{< /code-block >}}
{{< /site-region >}}

[Datadog API キー][2]を、キー `DD_API_KEY` と合わせて[プロジェクト環境変数][3]に追加します。

[1]: https://github.com/marketplace/actions/datadog-agent
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.github.com/en/actions/reference/encrypted-secrets
{{% /tab %}}
{{% tab "CircleCI" %}}

CircleCI で Agent を実行するには、テストを実行する前に  [datadog/agent CircleCI orb][1] を使用して Agent コンテナを起動し、結果が Datadog に送信されたことを確認してから停止します。

{{< site-region region="us" >}}
{{< code-block lang="yaml" filename=".circleci/config.yml" >}}
version: 2.1

orbs:
  datadog-agent: datadog/agent@0

jobs:
  test:
    docker:
      - image: circleci/<language>:<version_tag>
    steps:
      - checkout
      - datadog-agent/setup
      - run: make test
      - datadog-agent/stop

workflows:
  test:
    jobs:
      - test
{{< /code-block >}}
{{< /site-region >}}
{{< site-region region="us3,us5,eu,ap1" >}}

`<DD_SITE>` を選択したサイトに置き換えます: {{< region-param key="dd_site" code="true" >}}

{{< code-block lang="yaml" filename=".circleci/config.yml" >}}
version: 2.1

orbs:
  datadog-agent: datadog/agent@0

jobs:
  test:
    docker:
      - image: circleci/<language>:<version_tag>
    environment:
      DD_SITE: "<DD_SITE>"
    steps:
      - checkout
      - datadog-agent/setup
      - run: make test
      - datadog-agent/stop

workflows:
  test:
    jobs:
      - test
{{< /code-block >}}
{{< /site-region >}}

[Datadog API キー][2]を、キー `DD_API_KEY` と合わせて[プロジェクト環境変数][3]に追加します。

[1]: https://circleci.com/developer/orbs/orb/datadog/agent
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://circleci.com/docs/2.0/env-vars/
{{% /tab %}}
{{< /tabs >}}


## Python トレーサーのインストール

次のコマンドを実行して、Python トレーサーをインストールします。

{{< code-block lang="shell" >}}
pip install -U ddtrace
{{< /code-block >}}

詳細については、[Python トレーサーのインストールドキュメント][4]を参照してください。

## テストのインスツルメンテーション

`pytest` テストのインスツルメンテーションを有効にするには、`pytest` の実行時に `--ddtrace` オプションを追加し、`DD_SERVICE` 環境変数でテスト対象のサービスまたはライブラリの名前を、`DD_ENV` 環境変数でテストが実行されている環境を指定します (たとえば、開発者ワークステーションでテストを実行する場合は `local`、CI プロバイダーでテストを実行する場合は `ci`)。

{{< code-block lang="shell" >}}
DD_SERVICE=my-python-app DD_ENV=ci pytest --ddtrace
{{< /code-block >}}

もし、残りの APM インテグレーションも有効にして flamegraph でより多くの情報を取得したい場合は、`--ddtrace-patch-all` オプションを追加します。

{{< code-block lang="shell" >}}
DD_SERVICE=my-python-app DD_ENV=ci pytest --ddtrace --ddtrace-patch-all
{{< /code-block >}}

### テストにカスタムタグを追加する

テストの引数に `ddspan` と宣言することで、テストにカスタムタグを追加することができます。

```python
from ddtrace import tracer

# テストの引数として `ddspan` を宣言します
def test_simple_case(ddspan):
    # タグを設定します
    ddspan.set_tag("test_owner", "my_team")
    # テストは正常に続きます
    # ...
```

これらのタグに対して、フィルターや `group by` フィールドを作成するには、まずファセットを作成する必要があります。タグの追加についての詳細は、Python カスタムインスツルメンテーションドキュメントの[タグの追加][5]セクションを参照してください。

## コンフィギュレーション設定

以下は、コードか、または環境変数を使用した、トレーサーで使用できる最も重要なコンフィギュレーション設定のリストです。

`ddtrace.config.service`
: テスト中のサービスまたはライブラリの名前。<br/>
**環境変数**: `DD_SERVICE`<br/>
**デフォルト**: `pytest`<br/>
**例**: `my-python-app`

`ddtrace.config.env`
: テストが実行されている環境の名前。<br/>
**環境変数**: `DD_ENV`<br/>
**デフォルト**: `none`<br/>
**例**: `local`、`ci`

次の環境変数を使用して、Datadog Agent の場所を構成できます。

`DD_TRACE_AGENT_URL`
: `http://hostname:port` の形式のトレース収集用の Datadog Agent URL。<br/>
**デフォルト**: `http://localhost:8126`

他のすべての [Datadog トレーサーコンフィギュレーション][6]オプションも使用できます。

### Git のメタデータを収集する

Datadog は、テスト結果を可視化し、リポジトリ、ブランチ、コミットごとにグループ化するために Git の情報を使用します。Git のメタデータは、CI プロバイダーの環境変数や、プロジェクトパス内のローカルな `.git` フォルダがあれば、そこからテストインスツルメンテーションによって自動的に収集されます。

サポートされていない CI プロバイダーでテストを実行する場合や、`.git` フォルダがない場合は、環境変数を使って Git の情報を手動で設定することができます。これらの環境変数は、自動検出された情報よりも優先されます。Git の情報を提供するために、以下の環境変数を設定します。

`DD_GIT_REPOSITORY_URL`
: コードが格納されているリポジトリの URL。HTTP と SSH の両方の URL に対応しています。<br/>
**例**: `git@github.com:MyCompany/MyApp.git`、`https://github.com/MyCompany/MyApp.git`

`DD_GIT_BRANCH`
: テスト中の Git ブランチ。タグ情報を指定する場合は、空のままにしておきます。<br/>
**例**: `develop`

`DD_GIT_TAG`
: テストされる Git タグ (該当する場合)。ブランチ情報を指定する場合は、空のままにしておきます。<br/>
**例**: `1.0.1`

`DD_GIT_COMMIT_SHA`
: フルコミットハッシュ。<br/>
**例**: `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

`DD_GIT_COMMIT_MESSAGE`
: コミットのメッセージ。<br/>
**例**: `Set release number`

`DD_GIT_COMMIT_AUTHOR_NAME`
: コミット作成者名。<br/>
**例**: `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: コミット作成者メールアドレス。<br/>
**例**: `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE`
: ISO 8601 形式のコミット作成者の日付。<br/>
**例**: `2021-03-12T16:00:28Z`

`DD_GIT_COMMIT_COMMITTER_NAME`
: コミットのコミッター名。<br/>
**例**: `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: コミットのコミッターのメールアドレス。<br/>
**例**: `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE`
: ISO 8601 形式のコミットのコミッターの日付。<br/>
**例**: `2021-03-12T16:00:28Z`

## 収集した情報

CI Visibility を有効にすると、プロジェクトから以下のデータが収集されます。

* テストの名前と時間。
* CI プロバイダーが設定する事前定義された環境変数。
* Git のコミット履歴。ハッシュ、メッセージ、作成者情報、変更されたファイル (ファイルの内容は含まず) が含まれます。
* CODEOWNERS ファイルからの情報。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/
[2]: https://docs.datadoghq.com/ja/agent/cluster_agent/admission_controller/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /ja/tracing/trace_collection/dd_libraries/python/
[5]: /ja/tracing/trace_collection/custom_instrumentation/python?tab=locally#adding-tags
[6]: /ja/tracing/trace_collection/library_config/python/?tab=containers#configuration