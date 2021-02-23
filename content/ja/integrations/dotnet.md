---
categories:
  - 言語
  - ログの収集
ddtype: ライブラリ
dependencies: []
description: Datadog のクライアントライブラリを使用して .NET アプリケーションからカスタムメトリクスを送信
doc_link: 'https://docs.datadoghq.com/integrations/dotnet/'
draft: false
further_reading: []
git_integration_title: dotnet
has_logo: true
integration_title: .NET
is_public: true
kind: integration
manifest_version: '1.0'
name: dotnet
public_title: Datadog-.NET インテグレーション
short_description: Datadog のクライアントライブラリを使用して .NET アプリケーションからカスタムメトリクスを送信
version: '1.0'
---
## 概要

NET インテグレーションを利用して、.NET アプリケーションのログ、トレース、カスタムメトリクスを収集および監視できます。

## セットアップ

### メトリクスの収集

[DogStatsD を使用した .NET カスタムメトリクスの収集][1]に関するドキュメントを参照してください。

### トレースの収集

トレースを Datadog に送信するには、[.NET アプリケーションのインスツルメンテーション][2]に関するドキュメントを参照してください。

### ログの収集

_Agent v6.0 以上で使用可能_

ログを Datadog に転送するには、[.NET ログ収集のセットアップ][3]方法に関するドキュメントを参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "dotnet" >}}


### イベント

.NET インテグレーションには、イベントは含まれません。

### サービスのチェック

.NET インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/developers/dogstatsd/?tab=net
[2]: https://docs.datadoghq.com/ja/tracing/setup/dotnet/
[3]: https://docs.datadoghq.com/ja/logs/log_collection/csharp/
[4]: https://docs.datadoghq.com/ja/help/