---
description: Docker または Docker Compose を使って、ローカルで CloudPrem を始める方法を説明します。
further_reading:
- link: /cloudprem/ingest/
  tag: ドキュメント
  text: ログ取り込みを設定する
- link: /cloudprem/configure/
  tag: ドキュメント
  text: CloudPrem を設定する
title: Docker で CloudPrem をローカルにインストールする
---


{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem は Preview 版です" >}}
  CloudPrem Preview に参加すると、新しいセルフ ホスト型のログ管理機能を利用できます。
{{< /callout >}}

## 概要

このインストール ガイドでは、単体の Docker コンテナ、または Docker Compose を使って Datadog CloudPrem をローカルで実行する方法を説明します。次の手順に沿って、手元のマシンに最小構成の CloudPrem 環境を立ち上げます。本番導入の前に、CloudPrem の機能を試したり、Datadog とのログ取り込みを検証したりする用途に適しています。

## 前提条件

CloudPrem を始める前に、次の項目を確認してください。

- CloudPrem 機能が有効な **Datadog アカウント** があること
- **API 認証情報**: [Datadog API キー][2] を用意していること
- **Docker**: マシンに [Docker][4] がインストールされ、起動していること
- **Docker Compose** (任意): 1 行のコマンドでセットアップできる [Docker Compose][5]

## インストール手順

以下のインストール方法のいずれかを使用します。

1. **スタンドアロン Docker コンテナ**: テスト向けの最小構成
2. **Docker Compose**: 1 行のコマンドで CloudPrem と Datadog Agent を起動

{{< tabs >}}
{{% tab "スタンドアロン Docker セットアップ" %}}

この方法では、個別の Docker コンテナを使って最小構成の CloudPrem 環境を立ち上げます。

Datadog の認証情報を環境変数として設定します。

```shell
export DD_SITE="datadoghq.com" # または利用中の Datadog site
export DD_API_KEY="your_datadog_api_key"
```

### ステップ 1: CloudPrem を起動する

データ ディレクトリを作成し、CloudPrem コンテナを起動します。

```shell
# CloudPrem を起動する
docker run -d \
  --name cloudprem \
  -v $(pwd)/qwdata:/quickwit/qwdata \
  -e DD_SITE=${DD_SITE} \
  -e DD_API_KEY=${DD_API_KEY} \
  -p 127.0.0.1:7280:7280 \
  datadog/cloudprem run
```

### ステップ 2: Datadog Agent を起動する

ローカル コンテナのログを収集して CloudPrem に送信するには、Datadog Agent を起動します。

```shell
docker run \
  --name dd-agent \
  -e DD_API_KEY=${DD_API_KEY} \
  -e DD_SITE=${DD_SITE} \
  -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
  -e DD_ENV=dev \
  -e DD_LOGS_ENABLED=true \
  -e DD_LOGS_CONFIG_LOGS_DD_URL=http://host.docker.internal:7280 \
  -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
  -e DD_CONTAINER_EXCLUDE="name:dd-agent" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
  registry.datadoghq.com/agent:latest
```
{{% /tab %}}

{{% tab "Docker Compose セットアップ" %}}

この方法では、Datadog Agent インテグレーションを含む CloudPrem 環境をまとめて構成できます。

### ステップ 1: Docker Compose ファイルを作成する

作業ディレクトリに `docker-compose.yml` ファイルを作成します。

```yaml
services:
  cloudprem:
    image: datadog/cloudprem:edge
    command: ["run"]
    ports:
      - "127.0.0.1:7280:7280"
    environment:
      - DD_SITE=${DD_SITE:-datadoghq.com}
      - DD_API_KEY=${DD_API_KEY}
    volumes:
      - ./qwdata:/quickwit/qwdata
    restart: unless-stopped

  datadog-agent:
    image: registry.datadoghq.com/agent:latest
    environment:
      - DD_API_KEY=${DD_API_KEY}
      - DD_SITE=${DD_SITE:-datadoghq.com}
      - DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true
      - DD_LOGS_ENABLED=true
      - DD_LOGS_CONFIG_LOGS_DD_URL=http://cloudprem:7280
      - DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true
      - DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION=100000
      - DD_CONTAINER_EXCLUDE="name:datadog-agent"
      - DD_ENV=dev
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /proc/:/host/proc/:ro
      - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
    depends_on:
      cloudprem:
        condition: service_healthy
    restart: unless-stopped
```

この Docker Compose 構成では、次の処理を行います。
1. CloudPrem を起動し、正常状態になるまで待機します。
2. Datadog Agent を起動して、コンテナ ログを収集します。

### ステップ 2: 環境変数を設定する

同じディレクトリに `.env` ファイルを作成します。

```shell
DD_SITE=datadoghq.com
DD_API_KEY=your_datadog_api_key
```

### ステップ 3: docker compose を起動する

```shell
docker compose up -d
```
{{% /tab %}}
{{< /tabs >}}

## 次のステップ

いずれかの方法で CloudPrem を起動したら、インストールが正常に動作しているか確認します。

### CloudPrem の状態を確認する

**CloudPrem が稼働していることを確認する**:

```shell
curl http://localhost:7280/api/v1/version
```

バージョン情報を含むレスポンスが返るはずです。

### ログを送信する

ターミナルで次のコマンドを実行し、API を使って "Hello World" のログ エントリをローカルの CloudPrem インスタンスへ直接送信します。

```shell
curl -X POST "http://localhost:7280/api/v2/logs" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d '[
    {
      "message": "Hello world from CloudPrem",
      "level": "info",
      "service": "demo"
    }
  ]'
```

### Logs Explorer でローカルのログを検索する

CloudPrem が動作していることを確認できたら、Logs Explorer で `cloudprem` インデックスを対象に検索し、ログを確認したり分析したりできます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.docker.com/get-docker/
[5]: https://docs.docker.com/compose/install/