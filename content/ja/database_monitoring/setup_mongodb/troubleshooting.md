---
description: Database Monitoring セットアップのトラブルシューティング
title: MongoDB の Database Monitoring セットアップのトラブルシューティング
---

このページでは、MongoDB で Database Monitoring を設定および使用する際によく発生する問題の解決方法について説明します。Datadog では、最新の安定版 Agent を使用し、リリースごとに変更される可能性がある最新の [セットアップ ドキュメント][1] に従うことを推奨します。

## 一般的な問題の診断

### 大文字やスペースを含むクラスター名

MongoDB の `cluster_name` は [Datadog タグ命名規則][2] に従う必要があります。
MongoDB の `cluster_name` に大文字やスペースが含まれている場合、Agent はクラスター名を小文字に正規化し、スペースをアンダースコアに置き換えます。たとえば、クラスター名が `My Cluster` の場合、Agent はこれを `my_cluster` に正規化します。
不整合や想定外の動作を避けるため、`cluster_name` が Datadog タグ命名規則に従っていることを確認してください。

### MongoDB Atlas クラスターへの接続時に ServerSelectionTimeoutError が発生する場合

MongoDB Atlas を使用している場合、クラスターへの接続時に `ServerSelectionTimeoutError` が発生することがあります。このエラーは、ネットワークの問題または TLS の誤設定が原因で Agent が MongoDB Atlas クラスターに接続できないときに発生します。この問題を解決するには、統合の設定ファイルで `tls` が `true` に設定されていることを確認してください。それでも問題が解決しない場合は、MongoDB Atlas クラスターのネットワーク アクセス設定を確認し、Agent の IP アドレスがクラスターへ接続できるよう許可されていることを確認してください。

[1]: /ja/database_monitoring/setup_mongodb/
[2]: /ja/developers/guide/what-best-practices-are-recommended-for-naming-metrics-and-tags/#rules-and-best-practices-for-naming-tags