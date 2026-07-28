---
app_id: akamas
categories:
- kubernetes
- コスト管理
- クラウド
- logs-restriction-queries-update-a-restriction-query
custom_kind: integration
description: Datadog の Akamas Insights で Kubernetes のパフォーマンスと効率を最適化する
integration_version: 1.0.0
media:
- caption: Akamas Insights ダッシュボード
  image_url: images/DD-Dash.png
  media_type: image
- caption: 最適化の機会と効果
  image_url: images/DD-Insights-1.png
  media_type: image
- caption: フル スタックの推奨事項と影響
  image_url: images/DD-Insights-2.png
  media_type: image
supported_os:
- linux
- windows
- macos
title: Akamas
---
## 概要

Akamas は、Kubernetes 環境でアプリケーションのパフォーマンス、信頼性、リソース効率を最適化したい開発者、DevOps、SRE を支援します。Pod のサイジングやクラスター オートスケーリングだけでなく、JVM や Node.js のヒープ設定、ガベージ コレクション設定まで含めたフル スタックの推奨事項を提供します。

このインテグレーションを使うと、Akamas が見つけた効率性や信頼性の改善ポイントを Datadog 上で直接確認できます。

Akamas は、Datadog から Kubernetes 関連のメトリクスを収集します。対象には、インフラストラクチャー (クラスター、ノード、ワークロード) とアプリケーション (例: JVM、Node.js) の両方が含まれます。これらのメトリクスを分析して最適化の機会を特定し、その結果をイベントとして Datadog に送り返します。

## セットアップ

1. Akamas Insights インスタンスにログインします。
1. **Datasources** > **Datadog** に移動します。
1. [Datadog site パラメーター](https://docs.datadoghq.com/getting_started/site/#access-the-datadog-site) を指定します (例: US1 または EU1)。
1. Datadog API key と Application key を入力します。
1. **Test Connection** をクリックして、インテグレーションが正しく動作していることを確認します。

## アンインストール

1. Akamas Insights インスタンスにログインします。
1. **Datasources** > **Datadog** に移動します。
1. **Delete** ボタンをクリックします。

## サポート

サポートが必要な場合は、[Akamas サポート](mailto:support@akamas.io) にお問い合わせください。