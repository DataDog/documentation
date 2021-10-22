---
title: Datadog Agent をインストールしてテストデータを収集する
kind: documentation
further_reading:
  - link: /continuous_integration/setup_tests/containers/
    tag: ドキュメント
    text: コンテナ内でテスト用に環境変数を転送する
  - link: /continuous_integration/setup_tests/
    tag: 次のステップ
    text: お使いの言語でテストのインスツルメンテーションを実施する
---
{{< site-region region="us,eu" >}}
テスト結果を Datadog に報告するには、[Datadog Agent][1] が必要です。

CI 環境で Agent をセットアップする方法は 2 つあります。

* Agent を長時間実行プロセスとして各ワーカーノードにインストールします (オンプレミスインストールに推奨)。
* 各ビルドでサービスコンテナとして Agent のエフェメラルインスタンスを実行します (SaaS CI プロバイダーに推奨)。

## CI の各ワーカーノードに Agent をインストールする

オンプレミスの CI プロバイダー上でテストを実行している場合は、[Agent のインストール手順][2]に従って各ワーカーノードに Datadog Agent をインストールします。

CI プロバイダーがコンテナベースのエグゼキューターを使用している場合は、ビルド内の `localhost` が Datadog Agent が実行されている基底のワーカーノードではなく、コンテナ自体を参照するため、すべてのビルド (デフォルトは `localhost`) の `DD_AGENT_HOST` 環境変数をビルドコンテナ内からアクセス可能なエンドポイントに設定します。

Kubernetes エグゼキューターを使用している場合、Datadog は [Admission Controller][3] を使用することをお勧めします。これにより、ビルドポッドの `DD_AGENT_HOST` 環境変数が自動的に設定されてローカルの Datadog Agent と通信します。

## Datadog Agent を各ビルドのサービスコンテナとしてインストールする

基底のワーカーノードにアクセスできない SaaS CI プロバイダーを使用している場合は、コンテナ内の Datadog Agent をビルドサービスとして実行します。このメソッドは、[各ワーカーノードへの Datadog Agent のインストール](#installing-the-agent-on-each-ci-worker-node)というオプションがない場合に、コンテナベースのエグゼキューターを使用するオンプレミス CI プロバイダーでも使用できます。

単純な結果フォワーダーとして機能するコンテナとして Datadog Agent を実行するには、Docker イメージ `gcr.io/datadoghq/agent:latest` と次の環境変数を使用します。

`DD_API_KEY` (必須)
: テスト結果のアップロードに使用される [Datadog API キー][4]。<br/>
**デフォルト**: (なし)

`DD_INSIDE_CI` (必須)
: 基底のホストにアクセスできないため、Datadog Agent コンテナの監視を無効にします。<br/>
**デフォルト**: `false`<br/>
**必要な値**: `true`

`DD_HOSTNAME` (必須)
: 基底のホストを監視できないため、テストに関連付けられたホスト名のレポートを無効にします。<br/>
**デフォルト**: (自動検出)<br/>
**必要な値**: `none`


{{< site-region region="eu" >}}
さらに、選択したサイトを使用するように Datadog サイトを構成します ({{< region-param key="dd_site_name" >}}):

`DD_SITE` (必須)
: 結果をアップロードする [Datadog サイト][1]。<br/>
**デフォルト**: `datadoghq.com`<br/>
**選択したサイト**: {{< region-param key="dd_site" code="true" >}}

[1]: /ja/getting_started/site/
{{< /site-region >}}

### CI プロバイダーのコンフィギュレーション例

次のセクションでは、Agent を実行し、テスト情報を報告するよう構成するために必要となる CI プロバイダー固有の手順をご説明します。

{{< tabs >}}
{{% tab "Azure Pipelines" %}}

Azure Pipelines で Datadog Agent を実行するには、[`resources` セクション][1]で新しいコンテナを定義し、それを [`service` コンテナ][2]として宣言しているジョブと関連付けます:

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
{{< site-region region="eu" >}}
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
        DD_SITE: "datadoghq.eu"

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
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbatch
{{% /tab %}}
{{% tab "GitLab CI" %}}

GitLab で Agent を実行するには、 [`services`][1] 下で Agent コンテナを定義します:

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
{{< site-region region="eu" >}}
{{< code-block lang="yaml" filename=".gitlab-ci.yml" >}}
variables:
  DD_API_KEY: $DD_API_KEY
  DD_INSIDE_CI: "true"
  DD_HOSTNAME: "none"
  DD_AGENT_HOST: "datadog-agent"
  DD_SITE: "datadoghq.eu"

test:
  services:
    - name: gcr.io/datadoghq/agent:latest
  script:
    - make test
{{< /code-block >}}
{{< /site-region >}}

[Datadog API キー][2]を、キー `DD_API_KEY` と合わせて[プロジェクト環境変数][3]に追加します。


[1]: https://docs.gitlab.com/ee/ci/docker/using_docker_images.html#what-is-a-service
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://docs.gitlab.com/ee/ci/variables/README.html#custom-environment-variables
{{% /tab %}}
{{% tab "GitHub Actions" %}}

GitHub Actions で Agent を実行するには、[`services`][1] 下で Agent コンテナを定義します:

{{< site-region region="us" >}}
{{< code-block lang="yaml" >}}
jobs:
  test:
    services:
      datadog-agent:
        image: gcr.io/datadoghq/agent:latest
        ports:
          - 8126:8126
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_INSIDE_CI: "true"
          DD_HOSTNAME: "none"
    steps:
      - run: make test
{{< /code-block >}}
{{< /site-region >}}
{{< site-region region="eu" >}}
{{< code-block lang="yaml" >}}
jobs:
  test:
    services:
      datadog-agent:
        image: gcr.io/datadoghq/agent:latest
        ports:
          - 8126:8126
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_INSIDE_CI: "true"
          DD_HOSTNAME: "none"
          DD_SITE: "datadoghq.eu"
    steps:
      - run: make test
{{< /code-block >}}
{{< /site-region >}}

[Datadog API キー][2]を、キー `DD_API_KEY` と合わせて[プロジェクト環境変数][3]に追加します。


[1]: https://docs.github.com/en/actions/guides/about-service-containers
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://docs.github.com/en/actions/reference/encrypted-secrets
{{% /tab %}}
{{% tab "CircleCI" %}}

CircleCI で Agent を実行するには、テストを実行する前に  [datadog/agent CircleCI orb][1] を使用して Agent コンテナを起動し、結果が Datadog に送信されたことを確認してから停止します。

例:

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
{{< site-region region="eu" >}}
{{< code-block lang="yaml" filename=".circleci/config.yml" >}}
version: 2.1

orbs:
  datadog-agent: datadog/agent@0

jobs:
  test:
    docker:
      - image: circleci/<language>:<version_tag>
    environment:
      DD_SITE: "datadoghq.eu"
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
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://circleci.com/docs/2.0/env-vars/
{{% /tab %}}
{{< /tabs >}}

### Docker Compose の使用

お使いの CI プロバイダーの種類にかかわらず、[Docker Compose][5] を使用してテストを実行している場合、Datadog Agent はひとつのサービスとして実行されます:

{{< site-region region="us" >}}
{{< code-block lang="yaml" filename="docker-compose.yml" >}}
version: '3'
services:
  datadog-agent:
    image: "gcr.io/datadoghq/agent:latest"
    environment:
      - DD_API_KEY
      - DD_INSIDE_CI=true
      - DD_HOSTNAME=none
    ports:
      - 8126/tcp

  tests:
    build: .
    environment:
      - DD_AGENT_HOST=datadog-agent
{{< /code-block >}}
{{< /site-region >}}
{{< site-region region="eu" >}}
{{< code-block lang="yaml" filename="docker-compose.yml" >}}
version: '3'
services:
  datadog-agent:
    image: "gcr.io/datadoghq/agent:latest"
    environment:
      - DD_API_KEY
      - DD_INSIDE_CI=true
      - DD_HOSTNAME=none
      - DD_SITE=datadoghq.eu
    ports:
      - 8126/tcp

  tests:
    build: .
    environment:
      - DD_AGENT_HOST=datadog-agent
{{< /code-block >}}
{{< /site-region >}}

代わりに、Agent コンテナとテストコンテナ間で同じネットワークのネームスペースを共有します:

{{< site-region region="us" >}}
{{< code-block lang="yaml" filename="docker-compose.yml" >}}
version: '3'
services:
  datadog-agent:
    image: "gcr.io/datadoghq/agent:latest"
    environment:
      - DD_API_KEY
      - DD_INSIDE_CI=true
      - DD_HOSTNAME=none

  tests:
    build: .
    network_mode: "service:datadog-agent"
{{< /code-block >}}
{{< /site-region >}}
{{< site-region region="eu" >}}
{{< code-block lang="yaml" filename="docker-compose.yml" >}}
version: '3'
services:
  datadog-agent:
    image: "gcr.io/datadoghq/agent:latest"
    environment:
      - DD_API_KEY
      - DD_INSIDE_CI=true
      - DD_HOSTNAME=none
      - DD_SITE=datadoghq.eu

  tests:
    build: .
    network_mode: "service:datadog-agent"
{{< /code-block >}}
{{< /site-region >}}

この場合、`DD_AGENT_HOST` は必要ありません。デフォルトで `localhost` に設定されています。

その後、`DD_API_KEY` 環境変数に [Datadog API キー][4]を入力してテストを実行します。

{{< code-block lang="bash" >}}
DD_API_KEY=<YOUR_DD_API_KEY> docker-compose up \
  --build --abort-on-container-exit \
  tests
{{< /code-block >}}

**注:** この場合、必要となるすべての CI プロバイダーの環境変数を追加する必要があります。こうすることで、[コンテナテスト][6]で記載の通り、各テスト結果にビルド情報が追加されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/cluster_agent/admission_controller/
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://docs.docker.com/compose/
[6]: /ja/continuous_integration/setup_tests/containers/
{{< /site-region >}}
{{< site-region region="us3,gov" >}}
選択した Datadog サイト ({{< region-param key="dd_site_name" >}}) は、現時点ではサポートされていません。
{{< /site-region >}}