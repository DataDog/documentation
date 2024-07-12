---
categories:
- 言語
dependencies: []
description: Datadog のクライアントライブラリを使用して .NET アプリケーションからランタイムメトリクスを送信。
doc_link: https://docs.datadoghq.com/integrations/dotnet/
draft: false
further_reading: []
git_integration_title: dotnet
has_logo: true
integration_id: dotnet
integration_title: .NET
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: dotnet
public_title: Datadog-.NET インテグレーション
short_description: Datadog のクライアントライブラリを使用して .NET アプリケーションからランタイムメトリクスを送信。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

NET インテグレーションを利用して、.NET アプリケーションのログ、トレース、カスタムメトリクスを収集および監視できます。

## 計画と使用

### メトリクスの収集

[DogStatsD を使用した .NET カスタムメトリクスの収集][1]に関するドキュメントを参照してください。

### トレースの収集

トレースを Datadog に送信するには、[.NET アプリケーションのインスツルメンテーション][2]に関するドキュメントを参照してください。

### 収集データ

_Agent v6.0 以上で使用可能_

ログを Datadog に転送するには、[.NET ログ収集のセットアップ][3]方法に関するドキュメントを参照してください。

### プロファイルの収集

[.NET プロファイラを有効にするための][4]専用ドキュメントをご覧ください。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "dotnet" >}}


### ヘルプ

.NET インテグレーションには、イベントは含まれません。

### ヘルプ

.NET インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/developers/dogstatsd/?tab=net
[2]: https://docs.datadoghq.com/ja/tracing/setup/dotnet/
[3]: https://docs.datadoghq.com/ja/logs/log_collection/csharp/
[4]: https://docs.datadoghq.com/ja/profiler/enabling/dotnet/
[5]: https://docs.datadoghq.com/ja/help/