---
algolia:
  tags:
  - cd gates
description: モニターと APM の異常を自動的に評価して、パフォーマンスの低下が検出された場合にリリースを停止することで、デプロイメントによるインシデントを削減します。
further_reading:
- link: /deployment_gates/setup
  tag: ドキュメント
  text: デプロイメントゲートをセットアップしてください
- link: /deployment_gates/explore
  tag: ドキュメント
  text: Deployment Gates エクスプローラーについて学びます
- link: continuous_delivery
  tag: ドキュメント
  text: Continuous Delivery Visibility について学びます
- link: continuous_delivery/deployments
  tag: ドキュメント
  text: CD Visibility のセットアップ方法を学びます
title: デプロイメントゲート
---
デプロイメントゲートを使用すると、デプロイメントによって発生するインシデントの可能性と影響を軽減できます。

本番環境へのロールアウトを実行する際、デプロイメントゲートを使用して、[モニター][1]と APM の異常から新しい変更の影響を評価できます。
異常やパフォーマンスの低下が検出された場合、自動的にリリースを停止し、不安定なコードがより多くのユーザーに影響を与えるのを防ぐことができます。さらに、デプロイメントゲートを問題調査の入り口として使用することもできます。

セットアップの手順については、「[Set up Deployment Gates][2]」を参照してください。セットアップが完了したら、「[Deployment Gates Evaluations][3]」ページからゲートの評価を追跡および分析できます。

{{< img src="/deployment_gates/explore/deployment_gates_explorer.png" text="The Deployment Gate evaluation page in Datadog" style="width:100%" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/
[2]: /ja/deployment_gates/setup
[3]: /ja/deployment_gates/explore