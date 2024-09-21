---
aliases:
- /ja/continuous_integration/dora_metrics/setup/incidents
description: DORA Metrics のインシデントイベントの送信方法をご紹介します。
further_reading:
- link: /dora_metrics/failures
  tag: ドキュメント
  text: 他のインシデントデータソースのオプションを見る
- link: /tracing/service_catalog
  tag: ドキュメント
  text: サービスカタログについて
- link: /continuous_delivery/deployments
  tag: ドキュメント
  text: Deployment Visibility について
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: リリースノート
  text: Software Delivery の最新リリースをチェック！ (アプリログインが必要です)。
is_beta: true
title: DORA Metrics 用インシデントイベント送信の構成
---

{{< site-region region="gov" >}}
DORA Metrics は、選択されたサイト ({{&lt; region-param key="dd_site_name" &gt;}}) では現在利用できません。{{&lt; /site-region &gt;}} DORA Metrics は公開ベータ版です。

## 概要

独自のインシデントイベントを送信するには、[DORA Metrics API][1] を使用します。インシデントイベントは、変更障害率と平均復旧時間を計算するために使用されます。

インシデントが解決されたことを示すには、インシデントイベントに `finished_at` 属性を含めます。インシデントの開始時と解決後にイベントを送信できます。インシデントイベントは、`env`、`service`、および `started_at` 属性によって照合されます。

必須の属性は以下の通りです。

- `services` または `team` (いずれかが必須)
- `started_at`

オプションで以下の属性をインシデントイベントに追加できます。

- *解決済みインシデント*用の `finished_at`。この属性はサービス復旧時間の計算に必要です。
- インシデントの作成および解決時に識別するための `id`。これはユーザーが生成する属性で、指定しない場合は Datadog が生成する UUID がエンドポイントによって返されます。
- インシデントを説明するための `name`。
- `severity`
- [**DORA Metrics** ページ][3]で環境ごとに DORA Metrics をフィルタリングするための `env`。
- `repository_url`
- `commit_sha`

完全な仕様および追加のコードサンプルについては、[DORA Metrics API リファレンスドキュメント][1]をご覧ください。

### 例

```shell
curl -X POST "https://api.{{< region-param key="dd_site" >}}/api/v2/dora/incident" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d @- << EOF
  {
    "data": {
      "attributes": {
        "services": ["shopist"],
        "team": "shopist-devs",
        "started_at": 1693491974000000000,
        "finished_at": 1693491984000000000,
        "git": {
          "commit_sha": "66adc9350f2cc9b250b69abddab733dd55e1a588",
          "repository_url": "https://github.com/organization/example-repository"
        },
        "env": "prod",
        "name": "Web server is down failing all requests",
        "severity": "High"
      }
    }
  }
EOF
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/latest/dora-metrics/#send-an-incident-event-for-dora-metrics
[2]: /ja/dora_metrics/deployments
[3]: https://app.datadoghq.com/ci/dora