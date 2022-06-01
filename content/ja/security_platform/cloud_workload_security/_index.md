---
kind: documentation
title: クラウドワークロードセキュリティ
---

## 概要

Datadog ワークロードセキュリティは、本番ワークロードに対する脅威をリアルタイムで検出します。ワークロードセキュリティを使用すると、環境全体のファイルとプロセスのアクティビティを監視して、AWS EC2 インスタンス、Docker コンテナ、Kubernetes クラスターなどのインフラストラクチャーへの脅威をカーネルレベルでリアルタイムで検出できます。**ファイル整合性モニタリング (FIM)** を使用して、主要なファイルとディレクトリへの変更を監視します。**プロセス実行モニタリング**を使用して、疑わしい、悪意のある、または異常なアクティビティのプロセス実行を監視します。

{{< img src="security_platform/cws/workload_security_rules.png" alt="Datadog アプリのクラウドワークロードセキュリティ検出ルール" width="100%">}}

ワークロードセキュリティは Datadog Agent を使用するため、すでに Datadog を使用して環境を監視している場合は、追加のリソースをプロビジョニングしたり、新しい Agent を導入したりする必要はありません。Datadog Agent をまだセットアップしていない場合は、[まず Agent をセットアップします][1]。Datadog プラットフォームの一部として、リアルタイムの脅威検出をメトリクス、ログ、トレース、およびその他のテレメトリと組み合わせて、ワークロードに対する潜在的な攻撃を取り巻く完全なコンテキストを確認できます。

## はじめましょう

{{< whatsnext >}}
  {{< nextlink href="/security_platform/cloud_workload_security/getting_started">}}セットアップとコンフィギュレーションを完了する{{< /nextlink >}}
  {{< nextlink href="/security_platform/cloud_workload_security/workload_security_rules">}}クラウドワークロードセキュリティ検出ルールについて学ぶ{{< /nextlink >}}
  {{< nextlink href="/security_platform/default_rules/#cat-workload-security">}}すぐに使えるクラウドワークロードセキュリティ検出ルールの利用を開始する{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ja/agent/