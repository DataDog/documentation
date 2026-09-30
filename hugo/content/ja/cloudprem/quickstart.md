---
description: 5 分以内にローカルで CloudPrem を始める
further_reading:
- link: /cloudprem/install/docker/
  tag: ドキュメント
  text: CloudPrem の Docker インストール
- link: /cloudprem/ingest_logs/rest_api/
  tag: ドキュメント
  text: CloudPrem REST API
title: CloudPrem クイック スタート
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem は Preview 版です" >}}
  CloudPrem Preview に参加すると、新しいセルフ ホスト型のログ管理機能を利用できます。
{{< /callout >}}

## 概要

このクイック スタートでは、5 分以内にローカルで CloudPrem を使い始める方法を紹介します。内容は次のとおりです:
1. Docker を使って CloudPrem をローカルで起動する
2. クラスターの状態を確認する
3. 「Hello World」ログを送信する
4. Datadog Log Explorer でそのログを確認する

## 前提条件

- [CloudPrem Preview][1] に申し込んでください。
- **Datadog API キー**: [API キーを取得する][2]
- **Docker**: [Docker をインストールする][3]

## ステップ 1: CloudPrem を起動する

ターミナルで次のコマンドを実行して、ローカルの CloudPrem インスタンスを起動します。`<YOUR_API_KEY>` は実際の Datadog API キーに置き換えてください。

```shell
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE="datadoghq.com"

docker run -d \
  --name cloudprem \
  -v $(pwd)/qwdata:/quickwit/qwdata \
  -e DD_SITE=${DD_SITE} \
  -e DD_API_KEY=${DD_API_KEY} \
  -p 127.0.0.1:7280:7280 \
  datadog/cloudprem run
```

## ステップ 2: CloudPrem コンソールで状態を確認する

Datadog で [CloudPrem コンソール][4] を開き、クラスターが接続済みであることを確認します。ステータスには `connected` と表示されるはずです。

CloudPrem コンソールでは、クラスターのメタ データを編集して、クラスター名を `demo` に変更することもできます。

{{< img src="/cloudprem/quickstart/clouprem_console.png" alt="クラスターが connected 状態であることを示す CloudPrem コンソールのスクリーン ショット" style="width:100%;" >}}

## ステップ 3: ログを送信する

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

## ステップ 4: ログを確認する

1. [Datadog Log Explorer][5] を開きます。
2. 左側の facet パネルで、**CLOUDPREM INDEXES** の下にある自分のインデックスのチェックボックスをオンにします。
3. すると、"Hello world from CloudPrem" のログ エントリが表示されます。

{{< img src="/cloudprem/quickstart/cloudprem_indexes.png" alt="Datadog Log Explorer における CloudPrem インデックスの選択画面" style="width:100%;" >}}

## 次のステップ

CloudPrem を起動できたら、次のことも行えます:
- [Datadog Agent でログを送信する][6] - コンテナのログを自動で収集できます。
- [Observability Pipelines でログを送信する][7]

[1]: https://www.datadoghq.com/product-preview/cloudprem/
[2]: /ja/account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: https://docs.docker.com/get-docker/
[4]: https://app.datadoghq.com/cloudprem
[5]: https://app.datadoghq.com/logs?query=index=cloudprem-demo&storage=hot
[6]: /ja/cloudprem/ingest/agent/
[7]: /ja/cloudprem/ingest/observability_pipelines/