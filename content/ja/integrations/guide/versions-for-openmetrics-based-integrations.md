---
description: Learn about the difference between the latest (V2) and legacy (V1) versions
  of OpenMetrics-based integrations.
title: Latest and Legacy Versioning For OpenMetrics-based Integrations
---

## 概要

一般的な OpenMetrics インテグレーションを含む、Datadog OpenMetrics ベースのインテグレーションには、最新とレガシーという 2 つの動作モードがあります。この 2 つのモードには、異なるデフォルトと構成パラメーターがあります。

最新
: Datadog は、最新の Agent バージョンで OpenMetrics ベースのインテグレーションをゼロからセットアップする場合、`latest` バージョンを使用し、ドキュメントの `latest` バージョンを参照することを推奨します。

レガシー
: `legacy` バージョンは、後方互換性のためにのみ維持されています (主に、Agent のアップグレード後も構成を変更することなくインテグレーションを継続できるようにするため)。 </br></br> 過去に OpenMetrics ベースのインテグレーションをセットアップしたことがある場合、古いバージョンを使用している可能性があります。その場合、ドキュメントからリンクされている `legacy` 構成例をリファレンスとして使用することができます。Datadog では、可能な限り `latest` バージョンに移行することを推奨しています。

## モード依存メトリクス

`latest` モードと `legacy` モードのインテグレーションでは、OpenMetrics V2 (`latest`) とOpenMetrics V1 (`legacy`) としてドキュメントやアプリ内のメトリクス説明で示されている、メトリクスの異なるサブセットが生成されることがあります。

`latest` モードでは、デフォルトでより正確にメトリクスが送信され、Prometheus のメトリクスタイプに近い挙動をします。例えば、Prometheus の `_count` や `_sum` で終わるメトリクスは、デフォルトでは `monotonic_count` として送信されます。

Datadog サイトでメトリクス名を探したり、[ダッシュボード][3]や[モニター][4]をセットアップする際には、インテグレーションバージョンに適したメトリクスを使用するようにしてください。

## OpenMetrics ベースのインテグレーションモード

OpenMetrics ベースのインテグレーションごとに異なるかもしれませんが、`latest` モードを有効にするには次のいずれかを行います。

* `openmetrics_endpoint` をターゲットエンドポイントに設定する。
* `use_openmetrics` を true に設定する。

## 最新バージョンとレガシーバージョンの履歴

<div class="alert alert-info">Datadog は、インテグレーションを破壊するような変更を可能な限り避けているため、お客様は大規模な構成変更を行うことなく Datadog Agent を更新することができます。この後方互換性へのコミットメントにより、構成やデフォルトの動作における既存の設計上の問題に対処することが難しくなります。</div>

OpenMetrics 形式はメトリクスのエクスポートに一般的に使用されているため、多くのインテグレーションが OpenMetrics をベースにしています。これらのインテグレーションは、一連の構成オプションとデフォルトの動作を共有しています。Datadog は、`latest` バージョンでは改善されたエクスペリエンスを提供し、`legacy` バージョンでは元のエクスペリエンスを維持することをお約束します。 

詳細については、該当する OpenMetrics ベースのインテグレーションドキュメントを参照してください。

[3]: /ja/dashboards/
[4]: /ja/monitors/