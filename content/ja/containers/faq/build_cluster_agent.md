---
aliases:
- /ja/agent/cluster_agent/build
- /ja/containers/cluster_agent/build
kind: faq
title: Datadog Cluster Agent の構築
---

Datadog Cluster Agent は、コンテナ化されたエコシステムで使用されるものです。構築するには:

1. [DataDog/datadog-agent GitHub リポジトリ][1]を複製します
2. ダウンロードした `datadog-agent/` フォルダーで、`inv -e cluster-agent.build` を実行してバイナリを作成します。これにより、`./bin/datadog-cluster-agent/` にバイナリが追加されます
3. 次に、同じフォルダーから `inv -e cluster-agent.image-build` を実行します。

[1]: https://github.com/DataDog/datadog-agent/