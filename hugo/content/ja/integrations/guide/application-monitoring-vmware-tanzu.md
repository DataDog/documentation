---
description: VMware Tanzu のための Datadog アプリケーションモニタリング
further_reading:
- link: https://www.datadoghq.com/blog/monitor-tanzu-application-service/
  tag: ブログ
  text: VMware Tanzu Application Service 上で動作するアプリケーションの監視
- link: /integrations/guide/cluster-monitoring-vmware-tanzu/
  tag: ドキュメント
  text: VMware Tanzu のための Datadog クラスターモニタリング
- link: /tracing/
  tag: ドキュメント
  text: アプリケーションパフォーマンスの監視
- link: /developers/dogstatsd/
  tag: ドキュメント
  text: DogstatsD を使用してカスタムメトリクスを Datadog に転送する
title: VMware Tanzu のための Datadog アプリケーションモニタリング
---


## 概要

Datadog Application for VMWare Tanzu を使用すると、VMware Tanzu ユーザーはアプリケーションの健全性とパフォーマンスを監視することができます。
以下の 3 つのコンポーネントで構成されています。

* DogStatsD
* トレースエージェント
* コンテナ Agent

DogStatsD を使用すると、カスタムアプリケーションメトリクスを Datadog に取り込むことができます。DogStatsD はメトリクス集約サービスで、StatsD プロトコルを実装し、Datadog 特有の拡張機能をいくつか追加しています。詳しくは [DogStatsD][5] のドキュメントをご覧ください。さらに、Datadog は DogStatsD のライブラリリストを提供しており、アプリケーションと互換性のある[ライブラリ][9]を見つけることができます。

トレース Agent は、さまざまなソースからアプリケーショントレースを収集し、Datadog APM に転送するサービスです。詳細については、[トレーシング][7]のドキュメントを参照してください。

コンテナ Agent は、[Datadog Agent][6] の小型軽量版で、メトリクスとログ を Datadog に転送することができます。 詳細は[ログ][8]のドキュメントを参照してください。有効にすると、デフォルトの動作として、`stdout` および `stderr` からのすべてのログが収集され、TCP 経由でコンテナ Agent に転送されます。

## 主な特徴
Datadog Application Monitoring for VMware Tanzu には、次のような主な機能があります。

* アプリケーションパフォーマンスモニタリング
* メトリクス、ログ、トレースの Datadog への転送

## 前提条件
Datadog Application Monitoring for VMware Tanzu には、次のような要件があります。

* タイルを構成する前に、[Datadog アカウント][4]を持っているか、作成する必要があります。
* [Datadog API キー][3]を生成する必要があります。

## インストール

1. [Tanzu ネットワーク][10]から、**Datadog Application Monitoring for VMware Tanzu** の製品ファイルをダウンロードしてください。
2. Tanzu Ops Manager インストールダッシュボードにアクセスし、**Import a Product** をクリックして製品ファイルをアップロードします。
3. ステップ **1**でダウンロードした製品ファイルを選択します。これにより、ステージングエリアにタイルが追加されます。
4. 新しく追加された **Datadog Application Monitoring for VMware Tanzu** のタイルをクリックします。
5. **Save** をクリックします。
6. Tanzu Ops Manager インストールダッシュボードに戻り、**Apply changes** をクリックして、Datadog Application Monitoring for VMware Tanzu のタイルをインストールします。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ja/help
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/signup
[5]: /ja/developers/dogstatsd/?tab=hostagent
[6]: /ja/agent/
[7]: /ja/tracing/
[8]: /ja/logs/
[9]: /ja/libraries/
[10]: https://network.pivotal.io/products/datadog-application-monitoring/