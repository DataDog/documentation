---
further_reading:
- link: /integrations/consul/
  tag: ドキュメント
  text: Consul インテグレーションについて
title: Datadog を使用した HCP Consul の監視
---

## 概要

[Datadog Consul インテグレーション][1]は、Consul クライアントを通じて、HCP Consul 環境の情報を収集することができます。HCP Consul は、コントロールプレーンを [HashiCorp Cloud Platform][10] で管理する Consul のバージョンです。

## セットアップ

Consul メトリクスの収集を開始するには

1. [HCP Consul の概要ドキュメント][2] に従って HCP Consul を設定していることを確認します。
2. [Consul クライアント][3]に Datadog Agent をインストールします。
3. [Agent のコンフィギュレーションディレクトリ][5]のルートにある `conf.d/` フォルダーにある [`consul.d/conf.yaml` ファイル][4]を編集し、`url` コンフィギュレーションオプションを Consul クライアントの URL に設定します。
5. [Agent][6] を再起動します。

## 収集されるメトリクス

Datadog Consul と HCP Consul のインテグレーションを使用することで、[サーバーの健全性][8]に関係しない Consul インテグレーションの[デフォルトメトリクス][7]のサブセットを収集します。これには次のものが含まれます。

- Consul ノードに関する情報
- ネットワーク座標系 (データセンター間およびデータセンター内のレイテンシー)
- [クラスターの健全性][9]メトリクス

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/consul/?tab=host
[2]: https://developer.hashicorp.com/consul/tutorials/get-started-hcp
[3]: https://developer.hashicorp.com/hcp/docs/consul/usage/clients
[4]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/conf.yaml.example
[5]: /ja/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[6]: /ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: /ja/integrations/consul/?tab=host#metrics
[8]: https://www.consul.io/docs/agent/telemetry#server-health
[9]: https://www.consul.io/docs/agent/telemetry#cluster-health
[10]: https://developer.hashicorp.com/hcp/docs/consul