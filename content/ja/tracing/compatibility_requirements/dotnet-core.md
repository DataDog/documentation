---
title: .NET Core 互換性要件
kind: ドキュメント
description: .NET トレーサーの互換性要件です。
further_reading:
  - link: tracing/setup/dotnet-core
    tag: Documentation
    text: アプリケーションのインスツルメンテーション
---
.NET Datadog Trace ライブラリはオープンソースです。詳細については、[GitHub リポジトリ][1]をご覧ください。

.NET トレーサーは、.NET コア 2.1 と 3.1 での自動インスツルメンテーションをサポートしています。また、[.NET フレームワーク][2]もサポートしています。

.NET トレーサーは .NET コア 2.0、2.2、3.0 で動作しますが、これらのバージョンはサポートが終了しており、Microsoft ではサポートされていません。詳細については、[Microsoft のサポートポリシー][3]を参照してください。.NET コア 2.1 または 3.1 の最新のパッチバージョンを使用することをお勧めします。Linux/x64 上の .NET コアの古いバージョンには、自動インスツルメンテーションの使用時にアプリケーションが例外をスローする可能性のある JIT コンパイラーのバグがあります。アプリケーションが .NET コア 2.0、2.1.0〜2.1.11、または 2.2.0〜2.2.5 で実行されている場合は、.NET コアランタイムを更新することを強くお勧めします。更新できない場合は、環境変数 `DD_CLR_DISABLE_OPTIMIZATIONS=true` を設定して問題を回避する必要がある場合があります。詳細については、[DataDog/dd-trace-dotnet/issues/302][4] を参照してください。

**注:** 手動と自動両方のインスツルメンテーションを使用する場合、MSI インストーラーと NuGet パッケージのバージョンの同期を保つ必要があります。

## インテグレーション

.NET トレーサーは次のライブラリのインスツルメンテーションを自動的に行うことができます:

| フレームワークまたはライブラリ            | NuGet パッケージ                                                           | インテグレーション名     |
|---------------------------------|-------------------------------------------------------------------------|----------------------|
| ASP.NET Core                    | `Microsoft.AspNetCore`</br>`Microsoft.AspNetCore.App`</br>2.0+ および 3.0+ | `AspNetCore`         |
| ADO.NET                         | `System.Data.Common`</br>`System.Data.SqlClient` 4.0+                   | `AdoNet`             |
| HttpClient / HttpMessageHandler | `System.Net.Http` 4.0+                                                  | `HttpMessageHandler` |
| WebClient / WebRequest          | `System.Net.Requests` 4.0+                                              | `WebRequest`         |
| Redis (StackExchange クライアント)    | `StackExchange.Redis` 1.0.187+                                          | `StackExchangeRedis` |
| Redis (ServiceStack クライアント)     | `ServiceStack.Redis` 4.0.48+                                            | `ServiceStackRedis`  |
| Elasticsearch                   | `Elasticsearch.Net` 5.3.0+                                              | `ElasticsearchNet`   |
| MongoDB                         | `MongoDB.Driver.Core` 2.1.0+                                            | `MongoDb`            |
| PostgreSQL                      | `Npgsql` 4.0+                                                           | `AdoNet`             |

**注:** ADO.NET インテグレーションは、基底の実装形態に関わらず、`DbCommand` 抽象クラスまたは IDbCommand` インターフェイス 経由で行われたコールをインスツルメントします。`SqlCommand` へのダイレクトコールのインスツルメントも行います。

希望するフレームワークが見つかりませんか？Datadog では継続的にサポートを追加しています。サポートが必要な場合は、[Datadog チーム][5]にお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet
[2]: /ja/tracing/compatibility_requirements/dotnet-framework/
[3]: https://dotnet.microsoft.com/platform/support/policy/dotnet-core
[4]: https://github.com/DataDog/dd-trace-dotnet/issues/302#issuecomment-603269367
[5]: /ja/help/