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
テスト結果を Datadog に報告するには、[Datadog Agent][1] が必要です。

CI 環境で Agent をセットアップする方法は 2 つあります。

* Agent を、各ワーカーノードで長時間実行されるプロセスとしてインストールします。
* Agent の一時インスタンスを各ビルドのサービスコンテナとして実行します。

## CI の各ワーカーノードに Agent をインストールする

オンプレミスの CI プロバイダー上でテストを実行しており、テストプロセスから下位のワーカーホストへのネットワークアクセスがある場合は、[Agent のインストール手順][2]に従って各ワーカーノードに Datadog Agent をインストールします。

Agent をインストールおよび実行したら、トレーサーがテスト結果を `localhost:8126` に送信できるようになります。

## Datadog Agent を各ビルドのサービスコンテナとしてインストールする

お使いの CI プロバイダーがコンテナ内でテストを実行する場合は (Docker や Kubernetes エグゼキューターを使用しているオンプレミスの CI プロバイダー、または SaaS CI プロバイダーなど)、コンテナ内で Datadog Agent をビルドサービスとして実行します。

APM を有効化してコンテナのモニタリングを無効にする場合は、Agent コンテナに次の環境変数を設定します。

{{< code-block lang="text" >}}
DD_INSIDE_CI=true
DD_HOSTNAME=none
{{< /code-block >}}

これにより、トレーサーがテスト結果を Agent コンテナのポート `8126` に送信できるようになります。


### Docker Compose を使用して Datadog Agent を実行する

お使いの CI プロバイダーの種類にかかわらず、Docker Compose を使用してテストを実行している場合、Agent はひとつのサービスとして実行されます:

{{< code-block lang="yaml" filename="docker-compose.yml" >}}
version: '3'
services:
  datadog-agent:
    image: "datadog/agent:latest"
    environment:
      - DD_API_KEY
      - DD_HOSTNAME=none
      - DD_INSIDE_CI=true
    ports:
      - 8126/tcp

  tests:
    build: .
    environment:
      - DD_AGENT_HOST=datadog-agent
{{< /code-block >}}

代わりに、Agent コンテナとテストコンテナ間で同じネットワークのネームスペースを共有します:

{{< code-block lang="yaml" filename="docker-compose.yml" >}}
version: '3'
services:
  datadog-agent:
    image: "datadog/agent:latest"
    environment:
      - DD_API_KEY
      - DD_HOSTNAME=none
      - DD_INSIDE_CI=true

  tests:
    build: .
    network_mode: "service:datadog-agent"
{{< /code-block >}}

この場合、`DD_AGENT_HOST` は必要ありません。デフォルトで `localhost` に設定されています。

その後、`DD_API_KEY` 環境変数に [Datadog API キー][3]を入力してテストを実行します。

{{< code-block lang="bash" >}}
DD_API_KEY=<MY_API_KEY> docker-compose up --build --abort-on-container-exit tests
{{< /code-block >}}

**注:** この場合、必要となるすべての CI プロバイダーの環境変数を受け渡す必要があります。こうすることで、[コンテナテスト][4]で記載の通り、各テスト結果にビルド情報が追加されます。

## CI プロバイダー固有の手順

次のセクションでは、Agent を実行し、テスト情報を報告するよう構成するために必要となる CI プロバイダー固有の手順をご説明します。

### Azure pipelines

Azure パイプラインで Agent を実行するには、[`resources` セクション][5]で Agent コンテナを定義し、それを [`service` コンテナ[6]として宣言しているジョブと関連付けます:

{{< code-block lang="yaml" filename="azure-pipeline.yml" >}}
variables:
  ddApiKey: $(DD_API_KEY)

resources:
  containers:
    - container: dd_agent
      image: datadog/agent:latest
      ports:
        - 8126:8126
        env:
          DD_API_KEY: $(ddApiKey)
          DD_HOSTNAME: "none"
          DD_INSIDE_CI: "true"

jobs:   
  - job: test
    services:
      dd_agent: dd_agent
    steps:
      - script: make test
{{< /code-block >}}

[Datadog API キー][3]を、キー `DD_API_KEY` と合わせて [プロジェクトの環境変数][7]に追加します。


### GitLab CI

GitLab で Agent を実行するには、 [`services`][8] 下で Agent コンテナを定義します:

{{< code-block lang="yaml" filename=".gitlab-ci.yml" >}}
variables:
  DD_AGENT_HOST: "datadog-agent"
  DD_HOSTNAME: "none"
  DD_INSIDE_CI: "true"
  DD_API_KEY: $DD_API_KEY

test:
  services:
    - name: datadog/agent:latest
  script:
    - make test
{{< /code-block >}}

[Datadog API キー][3]を、キー `DD_API_KEY` と合わせて[プロジェクト環境変数][9]に追加します。


### GitHub Actions

GitHub Actions で Agent を実行するには、[`services`][10] 下で Agent コンテナを定義します:

{{< code-block lang="yaml" >}}
jobs:
  test:
    services:
      datadog-agent:
        image: datadog/agent:latest
        ports:
          - 8126:8126
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_HOSTNAME: "none"
          DD_INSIDE_CI: "true"
    steps:
      - run: make test
{{< /code-block >}}

[Datadog API キー][3]を、キー `DD_API_KEY` と合わせて[プロジェクト環境変数][11]に追加します。


### CircleCI

CircleCI で Agent を実行するには、テストを実行する前に  [datadog/agent CircleCI orb][12] を使用して Agent コンテナを起動し、結果が Datadog に送信されたことを確認してから停止します。

例:

{{< code-block lang="yaml" filename=".circleci/config.yml" >}}
version: 2.1

orbs:
  datadog-agent: datadog/agent@0.0.1

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

[Datadog API キー][3]を、キー `DD_API_KEY` と合わせて[プロジェクト環境変数][13]に追加します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://app.datadoghq.com/account/settings#api
[4]: /ja/continuous_integration/setup_tests/containers/
[5]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/resources?view=azure-devops&tabs=schema
[6]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/service-containers?view=azure-devops&tabs=yaml
[7]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbatch
[8]: https://docs.gitlab.com/ee/ci/docker/using_docker_images.html#what-is-a-service
[9]: https://docs.gitlab.com/ee/ci/variables/README.html#custom-environment-variables
[10]: https://docs.github.com/en/actions/guides/about-service-containers
[11]: https://docs.github.com/en/actions/reference/encrypted-secrets
[12]: https://circleci.com/developer/orbs/orb/datadog/agent
[13]: https://circleci.com/docs/2.0/env-vars/