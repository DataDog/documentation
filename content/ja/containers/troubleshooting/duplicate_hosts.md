---
title: Duplicate hosts with Kubernetes on AWS (EC2 or EKS)
---

AWS 上の Kubernetes 環境 (EC2 上の完全自己管理、または EKS を使用) で Datadog Agent を実行している場合、ホストが重複している問題が発生することがあります。1 つのホストは Datadog Agent から来るホスト名を使用しており、もう 1 つは Datadog の AWS インテグレーションによって収集された AWS `instance-id` です。

## バックグラウンド

ホスト名解決を行うには、Datadog Agent がローカルの EC2 メタデータエンドポイントにクエリし、EC2 の `instance-id` を検出します。次に Agent は、この `instance-id` をホスト名のエイリアスとして送信します。Datadog は Agent からのデータと AWS インテグレーションからのデータを 1 つのホストにマージします。

Datadog Agent が EC2 メタデータエンドポイントにクエリできない場合、重複したホスト名が発生することがあります。

## 診断

Agent flare コマンドでフレアを生成します。その後、`diagnose.log` を見ます。以下のような失敗が見つかるかもしれません。

```
=== Running EC2 Metadata availability diagnosis ===
[ERROR] error: unable to fetch EC2 API, Get http://169.254.169.254/latest/meta-data/hostname: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers) - 1563565207662176204
===> FAIL
```

## 修復

EC2 メタデータエンドポイントへのアクセスを許可するよう、構成を更新します。

また、IMDSv2 を使用している場合は、こちらも必要です。
1. 環境変数 `DD_EC2_PREFER_IMDSV2` を `true` に設定します。
2. [ホップリミット][1]を `1` から `2` に増やします。

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-data-retrieval.html