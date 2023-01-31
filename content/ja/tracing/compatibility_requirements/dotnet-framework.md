---
title: .NET Framework 互換性要件
kind: ドキュメント
description: .NET トレーサーの互換性要件です。
further_reading:
  - link: tracing/setup/dotnet-framework
    tag: Documentation
    text: アプリケーションのインスツルメンテーション
---
.NET Datadog Trace ライブラリはオープンソースです。詳細については、[GitHub リポジトリ][1]をご覧ください。

.NET トレーサーは、.NET Framework 4.5 以上の自動インスツルメンテーションをサポートします。[.NET Core][2]にも対応しています。

**注:** 手動と自動両方のインスツルメンテーションを使用する場合、MSI インストーラーと NuGet パッケージのバージョンの同期を保つ必要があります。

## インテグレーション

.NET トレーサーは次のライブラリのインスツルメンテーションを自動的に行うことができます:

| フレームワークまたはライブラリ            | NuGet パッケージ                  | インテグレーション名     |
| ------------------------------- | ------------------------------ | -------------------- |
| ASP.NET (Web Forms を含む)   | 組み込み                       | `AspNet`             |
| ASP.NET MVC                     | `Microsoft.AspNet.Mvc` 4.0+    | `AspNetMvc`          |
| ASP.NET Web API 2               | `Microsoft.AspNet.WebApi` 5.1+ | `AspNetWebApi2`      |
| WCF (サーバー)                    | 組み込み                       | `Wcf`                |
| ADO.NET                         | 組み込み                       | `AdoNet`             |
| HttpClient / HttpMessageHandler | 組み込み                       | `HttpMessageHandler` |
| WebClient / WebRequest          | 組み込み                       | `WebRequest`         |
| Redis (StackExchange クライアント)    | `StackExchange.Redis` 1.0.187+ | `StackExchangeRedis` |
| Redis (ServiceStack クライアント)     | `ServiceStack.Redis` 4.0.48+   | `ServiceStackRedis`  |
| Elasticsearch                   | `Elasticsearch.Net` 5.3.0+     | `ElasticsearchNet`   |
| MongoDB                         | `MongoDB.Driver.Core` 2.1.0+   | `MongoDb`            |
| PostgreSQL                      | `Npgsql` 4.0+                  | `AdoNet`             |

**アップデート:** .NET トレーサーのバージョン `1.12.0` 以降では、ASP.NET のインテグレーションが自動で有効となります。NuGet パッケージ `Datadog.Trace.AspNet` または Datadog.Trace.ClrProfiler.Managed` は不要です。.NET トレーサーをアップデートする際にこれらをアプリケーションから削除してください。

**注:** ADO.NET インテグレーションは、基底の実装形態に関わらず、`DbCommand` 抽象クラスまたは IDbCommand` インターフェイス 経由で行われたコールをインスツルメントします。`SqlCommand` へのダイレクトコールのインスツルメントも行います。

希望するフレームワークが見つかりませんか？Datadog では継続的にサポートを追加しています。フレームワークのリクエストは、[サポートチーム][3]までお気軽にお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet
[2]: /ja/tracing/compatibility_requirements/dotnet-core/
[3]: /ja/help/