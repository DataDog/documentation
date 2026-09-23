---
description: Docker または Helm を使用して、自身でデプロイおよび管理するスタンドアロンのプライベートアクションランナーをインストール、接続、管理、更新します。
disable_toc: false
further_reading:
- link: actions/private_actions/
  tag: ドキュメント
  text: Private Actions の概要
- link: actions/private_actions/set_up_agent_based
  tag: ドキュメント
  text: Datadog Agent でプライベートアクションランナーをセットアップする
- link: actions/connections
  tag: ドキュメント
  text: コネクション
title: スタンドアロンのプライベートアクションランナーをセットアップする
---
## 概要 {#overview}

スタンドアロンのプライベートアクションランナーは、Docker または Helm を使用して Datadog Agent とは独立してインストールおよび管理できる専用コンテナです。これはサポートされており、メンテナンスモードになっています。セキュリティおよび安定性のアップデートは引き続き提供されますが、新機能の追加は予定されていません。新規デプロイの場合、および実行ポリシーを使用する場合は、代わりに Datadog Agent でランナーを実行してください。[Datadog Agent でプライベートアクションランナーをセットアップする][1] を参照してください。

ランナーのセットアップは 3 つのステップで行います。

1. [**インストール**](#install-the-runner): Docker、Docker Compose、または Kubernetes を使用してランナーをインストールします。
1. [**接続**](#connect-the-runner): コネクションを使用して、ランナーを Datadog に接続します。
1. [**更新**](#update-the-runner): 新しいバージョンがリリースされたら、ランナーを更新します。

スタンドアロンランナーは常に**所有**されます。以下のいずれかの方法で作成すると、常に作成したユーザーの下に登録され、[コネクション][2] で認証されます。

## 前提条件 {#prerequisites}

- Docker、または Kubernetes クラスター。
- Datadog へのネットワークアクセス (`https://{{< region-param key=dd_site >}}` and `https://config.{{< region-param key=dd_site >}}`)。

## ランナーをインストールする {#install-the-runner}

1. Datadog で、[**Action Catalog > プライベートアクションランナー**][3] に移動し、**新しいプライベートアクションランナー**をクリックします。
1. ランナーの名前を入力し、許可するアクションを選択します。
1. ランナーが構成を保存できるディレクトリをホスト上に作成します (例: `./config`)。
1. コンテナプラットフォームの手順に従って、ランナーをデプロイします。

{{< tabs >}}
{{% tab "Docker" %}}

1. **Docker** をクリックします。
1. `./config` をランナーの構成用に作成したディレクトリへのパスに置き換えて、ホスト上で提供された `docker run` コマンドを実行します。

**注**: エラー `DATADOG TRACER DIAGNOSTIC - Agent Error: connect ECONNREFUSED` は無視しても問題ありません。

{{% /tab %}}
{{% tab "Docker Compose" %}}

1. **Docker Compose** をクリックします。
1. `docker-compose.yaml` ファイルを作成し、指定 YAML を追加するか、既存の Docker Compose ファイルに `runner` スタンザを追加します。
1. `./config` をランナー構成用に作成したディレクトリのパスに置き換えます。
1. `docker compose up -d` を実行します。

**注**: エラー `DATADOG TRACER DIAGNOSTIC - Agent Error: connect ECONNREFUSED` は無視しても問題ありません。

{{% /tab %}}
{{% tab "Kubernetes (Helm)" %}}

1. **Kubernetes** をクリックします。
1. `kubectl` と `helm` がインストールされていること、およびクラスター内に Kubernetes リソースを作成するための十分な権限があることを確認します。
1. アプリで提供される手順に従って、ランナーの登録、構成の生成、プライベートアクションランナー Helm リポジトリの追加、およびチャートのインストールを行います。
1. `kubectl get pods -w` を実行し、プライベートアクションランナーのポッドのステータスが **Ready** になることを確認します。

{{% /tab %}}
{{< /tabs >}}

## 代替手段: プログラムによるインストール {#alternative-programmatic-installation}

上記の UI ベースのセットアップの代替として、API キーとアプリケーションキーを使用して、スタンドアロンランナーをプログラムで登録および構成できます。このアプローチは、自動化されたデプロイメント、CI/CD パイプライン、および Infrastructure as Code ワークフローに適しています。UI ベースのセットアップと同様、これは常に所有ランナーを作成します。`--with-api-key` フラグの名前にもかかわらず、このパスには依然としてアプリケーションキーが必要です。ランナーは両方の資格情報を組み合わせて使用し、自身を登録し、アプリケーションキーの所有者をランナーの Editor に割り当てます。

ランナーをプログラムでセットアップするには、以下の手順を実行します。

1. `DD_API_KEY` および `DD_APP_KEY` 環境変数を通じて Datadog API キーとアプリケーションキーを提供します。
1. `--with-api-key` フラグをランナーコンテナに渡します。

{{< tabs >}}
{{% tab "Docker" %}}

```bash
export DD_API_KEY="<YOUR_API_KEY>"
export DD_APP_KEY="<YOUR_APP_KEY>"

docker run -d \
  -e DD_BASE_URL=https://{{< region-param key=dd_site >}} \
  -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
  -e DD_API_KEY="$DD_API_KEY" \
  -e DD_APP_KEY="$DD_APP_KEY" \
  -e RUNNER_NAME=<YOUR_RUNNER_NAME> \
  -v ./config:/etc/dd-action-runner/config \
  gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}} \
  --with-api-key
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

```yaml
services:
  private-runner:
    image: gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}
    command: ["--with-api-key"]
    environment:
      DD_API_KEY: ${DD_API_KEY}
      DD_APP_KEY: ${DD_APP_KEY}
      DD_BASE_URL: https://{{< region-param key=dd_site >}}
      DD_PRIVATE_RUNNER_CONFIG_DIR: /etc/dd-action-runner/config
      RUNNER_NAME: my-compose-runner
    volumes:
      - "./config:/etc/dd-action-runner/config"
```

以下で実行します。

```bash
export DD_API_KEY="<YOUR_API_KEY>"
export DD_APP_KEY="<YOUR_APP_KEY>"
docker compose up -d
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

ランナー構成を生成します。

```bash
export DD_API_KEY="<YOUR_API_KEY>"
export DD_APP_KEY="<YOUR_APP_KEY>"

docker run \
  -e DD_BASE_URL=https://{{< region-param key=dd_site >}} \
  -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
  -e DD_API_KEY="$DD_API_KEY" \
  -e DD_APP_KEY="$DD_APP_KEY" \
  -e RUNNER_NAME="my-runner" \
  -v ./config:/etc/dd-action-runner/config \
  gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}} \
  --with-api-key --enroll -f helm-values > values.yaml
```

Helm チャートをデプロイします。

```bash
helm upgrade --install <RELEASE_NAME> datadog/private-action-runner -f values.yaml
```

{{% /tab %}}
{{< /tabs >}}

ランナーに **Ready to use** と表示されたら、コネクションを作成するか、または**プライベートアクションランナー**ページで確認してください。

## カスタム CA 証明書 {#custom-ca-certificates}

組織が HTTP エンドポイントや Jenkins などの内部サービス用の証明書を発行するためにカスタム認証局 (CA) を使用している場合、スタンドアロンのプライベートアクションランナーがその CA を信頼するように構成できます。

{{< tabs >}}
{{% tab "Docker" %}}

`SSL_CERT_DIR`環境変数を追加し、証明書を `docker run` コマンドにマウントし、その際、`<PATH_TO_YOUR_CA_CERTIFICATE>` を CA 証明書ファイルへのパスに置き換えてください。

{{< highlight bash "hl_lines=7 9" >}}
docker run -d \
  -e DD_BASE_URL=https://{{< region-param key=dd_site >}} \
  -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
  -e DD_API_KEY="$DD_API_KEY" \
  -e DD_APP_KEY="$DD_APP_KEY" \
  -e RUNNER_NAME=<YOUR_RUNNER_NAME> \
  -e SSL_CERT_DIR=/etc/dd-action-runner/config/ca-certificates \
  -v ./config:/etc/dd-action-runner/config \
  -v <PATH_TO_YOUR_CA_CERTIFICATE>:/etc/dd-action-runner/config/ca-certificates/ca.crt \
  gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}} \
  --with-api-key
{{< /highlight >}}

{{% /tab %}}
{{% tab "Docker Compose" %}}

`SSL_CERT_DIR`環境変数を追加し、証明書を `docker-compose.yaml` ファイルにマウントし、その際、`<PATH_TO_YOUR_CA_CERTIFICATE>` を CA 証明書ファイルへのパスに置き換えてください。

```yaml
services:
  private-runner:
    environment:
      SSL_CERT_DIR: /etc/dd-action-runner/config/ca-certificates
    volumes:
      - "<PATH_TO_YOUR_CA_CERTIFICATE>:/etc/dd-action-runner/config/ca-certificates/ca.crt"
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

1. CA 証明書を含む ConfigMap を作成します。

   ```bash
   kubectl create configmap my-ca-cert --from-file=ca.crt=./my-custom-ca.pem
   ```

1. Helm の `values.yaml` ファイルで、ConfigMap を参照します。

   ```yaml
   runner:
     customCaCert:
       configMapName: my-ca-cert
   ```

1. 更新された値を適用します。

   ```bash
   helm upgrade --install <RELEASE_NAME> datadog/private-action-runner -f values.yaml
   ```

{{% /tab %}}
{{< /tabs >}}

## ランナーを接続する {#connect-the-runner}

スタンドアロンランナーは常に所有されており、コネクション認証モデルを使用します。コネクションはサービスの認証情報を保存し、それらをランナーとペアリングします。コネクションを作成してランナーとペアリングするには、[コネクション][2] を参照してください。ランナー自体の権限の仕組みについては、[所有ランナーへのアクセスを管理する][4] を参照してください。

## ランナーを管理する {#manage-the-runner}

### コネクションを編集する、またはランナーを削除する {#edit-connections-or-delete-a-runner}

Action Catalog の**プライベートアクションランナー**ページから、それぞれを使用するワークフローやアプリと一緒にすべてのプライベートランナーを表示できます。ランナーのコネクションを編集するには、**詳細を表示**をクリックしてください。ランナーを削除するには、ゴミ箱アイコンをクリックしてください。

### 許可リストを変更する {#change-the-allowlist}

スタンドアロンランナーの許可リストを編集するには、ランナーの環境の `config.yaml` ファイルの `actionsAllowlist` セクションを編集し、その後、コンテナまたはデプロイメントを再起動してランナーを再起動してください。

## ランナーを更新する {#update-the-runner}

ランナーのインストール方法に一致するタブを選択してください。現在の `v{{< private-action-runner-version "private-action-runner" >}}` バージョンを使用し、ハードコードされたタグは使用しないでください。

{{< tabs >}}
{{% tab "Docker" %}}

コンテナの ID を確認します。

```bash
docker ps
```

コンテナを停止します。

```bash
docker stop <id>
```

[最新のイメージ][101] を使用して新しいコンテナを起動します。環境変数は不要です。すべては `config/config.yaml` ファイルで構成されます。

```bash
docker run -d \
  -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
  -v ./config:/etc/dd-action-runner/config \
  gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}
```

新しいバージョンが動作していることを確認したら、古いコンテナを削除してください。

```bash
docker rm <id>
```

[101]: https://api.datadoghq.com/api/v2/on-prem-management-service/runner/latest-image

{{% /tab %}}
{{% tab "Docker Compose" %}}

`docker-compose.yaml` ファイルが含まれるディレクトリに移動し、イメージバージョンを更新します。

```yaml
services:
  private-actions-runner:
    image: gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}
```

コンテナを再起動します。

```bash
docker compose up -d
```

{{% /tab %}}
{{% tab "Helm" %}}

Helm を使用したアップグレードには 2 つのオプションがあります。

1. **(推奨)** チャートをアップグレードします。これにより、最新バージョンのランナーが使用されます。チャートに変更が加えられている可能性があるため、[変更履歴][101] を確認します。
1. チャートをアップグレードせずに、ランナーのみをアップグレードします。

**チャートのアップグレード (推奨):**

```bash
helm repo update
helm upgrade <RELEASE_NAME> datadog/private-action-runner -f ./values.yaml
```

**ランナーのみのアップグレード:**`common.image.tag` キーの下の `values.yaml` で、[チャートの値ファイル][102] から値を指定して、ランナーのバージョンを指定します。

```yaml
common:
  image:
    tag: v{{< private-action-runner-version "private-action-runner" >}}
```

次に、以下を実行します。

```bash
helm upgrade <RELEASE_NAME> datadog/private-action-runner -f ./values.yaml
```

[101]: https://github.com/DataDog/helm-charts/blob/main/charts/private-action-runner/CHANGELOG.md
[102]: https://github.com/DataDog/helm-charts/blob/main/charts/private-action-runner/values.yaml

{{% /tab %}}
{{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/actions/private_actions/set_up_agent_based/
[2]: /ja/actions/connections/
[3]: https://app.datadoghq.com/actions/private-action-runners
[4]: /ja/actions/private_actions/enroll_runner/#manage-access-to-owned-runners