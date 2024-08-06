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

Datadog Application Monitoring for VMWare Tanzu は、VMware Tanzu ユーザーがアプリケーションの健全性とパフォーマンスを監視できるようにします。
以下の 3 つのコンポーネントで構成されています。

* 組織の設定
* トレースエージェント
* コンテナ Agent

DogStatsD を使用すると、カスタムアプリケーションメトリクスを Datadog に取り込むことができます。DogStatsD は StatsD プロトコルを実装し、Datadog 固有のいくつかの拡張機能を追加したメトリクス集計サービスです。詳細は [DogStatsD][5] ドキュメントを参照してください。さらに、Datadog は DogStatsD ライブラリのリストを提供しており、これを使うことでアプリケーションと互換性のある[ライブラリ][9]を見つけることができます。

Trace Agent は、様々なソースからアプリケーションのトレースを収集し、Datadog APM に転送するサービスです。詳細は、[トレーシング][7]のドキュメントを参照してください。

Container Agent は [Datadog Agent][6] の小型・軽量版で、メトリクスとログを Datadog に転送することができます。詳細は[ログ][8]のドキュメントを参照してください。有効にした場合、デフォルトの動作は `stdout` と `stderr` からのすべてのログが収集され、TCP で Container Agent に転送されます。

## 主な特徴
Datadog Application Monitoring for VMware Tanzu には、次のような主な機能があります。

* アプリケーションパフォーマンスの監視
* メトリクス、ログ、トレースの Datadog への転送

## 前提条件
Datadog Application Monitoring for VMware Tanzu には、以下の要件があります。

* タイルを構成する前に、[Datadog アカウント][4]を持つか作成する必要があります。
* [Datadog API キー][3]を生成する必要があります。

## インフラストラクチャーリスト

1. **Datadog Application Monitoring for VMware Tanzu** の製品ファイルは、[Tanzu Network][10] からダウンロードしてください。
2. Tanzu Ops Manager のインストールダッシュボードに移動し、**Import a Product** をクリックして製品ファイルをアップロードします。
3. ステップ **1** でダウンロードした製品ファイルを選択します。これでステージングエリアにタイルが追加されます。
4. 新しく追加された **Datadog Application Monitoring for VMware Tanzu** タイルをクリックします。
5. **Save** をクリックします。
6. Tanzu Ops Manager のインストールダッシュボードに戻り、**Apply changes** をクリックして、Datadog Application Monitoring for the VMware Tanzu タイルをインストールします。

## その他の参考資料

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