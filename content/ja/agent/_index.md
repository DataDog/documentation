---
algolia:
  tags:
  - agent
aliases:
- /ja/agent/faq/agent-check-directory-structure
- /ja/agent/faq/install-core-extra
- /ja/logs/faq/can-the-datadog-agent-be-used-to-send-only-logs
- /ja/agent/faq/the-datadog-agent-for-logs-or-traces-only
cascade:
  algolia:
    rank: 70
description: Agent をインストールして、データ収集のために構成する
further_reading:
- link: /logs/
  tag: Documentation
  text: ログの収集
- link: /infrastructure/process/
  tag: Documentation
  text: プロセスの収集
- link: /tracing/
  tag: Documentation
  text: トレースの収集
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Documentation
  text: クラウドインスタンスに Agent をインストールするのはなぜですか？
- link: https://www.datadoghq.com/blog/dont-fear-the-agent/
  tag: ブログ
  text: Agent は難しくない
kind: documentation
title: Agent
---

<div class="alert alert-info">
Agent v7 が利用可能です。 <a href="/agent/versions/upgrade_to_agent_v7">最新バージョンにアップグレードすると</a>新しい機能を利用できます。
</div>

## 概要

Datadog Agent は、ホストで実行されるソフトウェアです。ホストからイベントとメトリクスを収集し、Datadog に送信します。ここで、モニタリングとパフォーマンスのデータを分析できます。Datadog Agent はオープンソースです。ソースコードは、GitHub の [DataDog/datadog-agent][1] から入手できます。

**Agent はフルでインストールすることが推奨されています。** ただし、Amazon Linux、CentOS、Debian、Fedora、Red Hat、SUSE、Ubuntu 用に、スタンドアロンの DogStatsD パッケージを使用することが可能です。このパッケージは、DogStatsD がサイドカーとして稼働するか、Agent の機能をフルに持たない DogStatsD サーバーを稼働させているコンテナ環境で使用されます。

スタンドアロンの DogStatsD パッケージは、Agent の [1 行のインストールコマンド][2]でインストールできますが、`datadog-agent` の部分をすべて `datadog-dogstatsd` に変える必要があります。[DogStatsD6 Docker イメージリポジトリ][3]にある Docker イメージも利用できます。

64-bit x86 および Arm v8 アーキテクチャ用のパッケージもご用意しています。その他のアーキテクチャについては、ソースインストールをご利用ください。

{{< partial name="platforms/platforms.html" links="platforms" >}}

<div class="alert alert-info"><p>
Datadog は、Datadog Agent をマイナーリリースとパッチリリースごとに、または少なくとも毎月更新することをお勧めします。</p>
<p>
Datadog Agent のメジャーバージョンにアップグレードして最新の状態に保つことが、最新の Agent 機能と修正を入手するためにサポートされている唯一の方法です。ただし、Agent は頻繁にアップデートをリリースしており、エンタープライズ規模でアップデートを管理することは困難な場合があります。これは、メジャーリリースまで更新を待つべきであるあるという意味ではありません。組織に適した更新の頻度は、インフラストラクチャーと構成管理の方法によって異なりますが、毎月が目標です。</p>
<p>
特定のホストの 2 つのマイナーバージョン間で Datadog Agent コアを更新するには、<a href="https://app.datadoghq.com/account/settings/agent/latest">プラットフォームに対応するインストールコマンド</a>を実行します。</p>
<p>
Datadog Agent のリリース番号は、<a href="https://semver.org/">SemVer</a> の規則に従います。</p>
</div>

{{< whatsnext desc="このセクションには、次のトピックが含まれています。">}}
  {{< nextlink href="/agent/basic_agent_usage">}}<u>基本的なエージェントの利用方法</u>: アーキテクチャの詳細、CLI、オーバーヘッド、構成管理ツールなど、Datadog Agent について詳しく説明します。{{< /nextlink >}}
  {{< nextlink href="/agent/docker">}}<u>Docker</u>: Datadog Agent を Docker にインストールして構成します。{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes">}}<u>Kubernetes</u>: Datadog Agent を Kubernetes にインストールして構成します。{{< /nextlink >}}
  {{< nextlink href="/agent/cluster_agent">}}<u>Cluster Agent</u>: オーケストレーションされたクラスターからモニタリングデータを効率的に収集するよう設計された Datadog Agent のバージョン、Cluster Agent for Kubernetes をインストールして構成します。{{< /nextlink >}}
  {{< nextlink href="/agent/amazon_ecs">}}<u>Amazon ECS</u>: Amazon ECS に Datadog Agent をインストールし構成します。{{< /nextlink >}}
  {{< nextlink href="integrations/ecs_fargate/">}}<u>AWS Fargate</u>: AWS Fargate上の Amazon ECS で Datadog Agent をインストールし、構成します。{{< /nextlink >}}
  {{< nextlink href="/agent/iot">}}<u>IoT</u>:  IoT デバイスや組み込みアプリケーションの監視に最適化された Datadog Agent のバージョンである Datadog IoT Agent をインストールし構成します。{{< /nextlink >}}
  {{< nextlink href="/agent/logs">}}<u>ログ収集</u>: Datadog Agent でログ収集を有効にし、構成します。{{< /nextlink >}}
  {{< nextlink href="/agent/configuration/proxy">}}<u>プロキシ</u>: ネットワーク構成によってアウトバウンドトラフィックが制限される場合は、Agent トラフィックにプロキシを使用します。{{< /nextlink >}}
  {{< nextlink href="/agent/versions/">}}<u>バージョン</u>: Agent 7 は Datadog Agent の最新メジャーバージョンです。Agent のメジャーバージョン間の違いやアップグレード方法について説明します。{{< /nextlink >}}
  {{< nextlink href="/agent/troubleshooting">}}<u>トラブルシューティング</u>: Datadog Agent のトラブルシューティング情報をご紹介します。{{< /nextlink >}}
  {{< nextlink href="/agent/guide">}}<u>ガイド</u>: Agent の使用に関するステップバイステップの詳細なチュートリアルです。{{< /nextlink >}}
  {{< nextlink href="/agent/security">}}<u>セキュリティ</u>: 安全な環境を維持するためにお客様が利用できる主なセキュリティ機能について説明します。{{< /nextlink >}}
  {{< nextlink href="/getting_started/observability_pipelines">}}<u>観測可能性パイプラインと Datadog の構成</u>: 観測可能性パイプラインワーカーをアグリゲーターとしてデプロイし、すべてのログとメトリクスを収集、変換し、任意の宛先にルーティングします。{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=aws
[3]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/dogstatsd/alpine