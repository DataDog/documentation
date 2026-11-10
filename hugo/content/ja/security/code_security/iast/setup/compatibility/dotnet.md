---
code_lang: dotnet
code_lang_weight: 10
title: .NET 互換性要件
type: multi-code-lang
---
## アプリケーションセキュリティ機能のサポート {#application-security-capabilities-support}

指定されたトレーサーバージョンに対して、.NET ライブラリでサポートされるアプリケーションセキュリティ機能は以下のとおりです:

| アプリケーションセキュリティ機能  | 最小 .NET トレーサーバージョン |
| -------------------------------- | ----------------------------|
| Threat Detection | 2.23.0|
| Threat Protection  | 2.26.0|
| ブロックされたリクエストへの対応をカスタマイズする | 2.27.0 |
| Software Composition Analysis (SCA) |  2.16.0  |
| Code Security  | 2.42.0  |
| ユーザーアクティビティイベントの自動追跡 | 2.32.0 |
| API Security | 2.42.0 |

.NET でサポートされるすべてのアプリケーションセキュリティ機能を利用するための最小トレーサーバージョンは 2.42.0 です。

**注**: Threat Protection を利用するには [Remote Configuration][3] を有効にする必要があります。Remote Configuration は上記の最小トレーサーバージョンに含まれています。

### サポートされているデプロイメントタイプ {#supported-deployment-types}
| タイプ              | Threat Detection のサポート | Software Composition Analysis | Code Security |
|-------------------|--------------------------|-------------------------------|---------------|
| Docker            | {{< X >}}                | {{< X >}}                     | {{< X >}}     |
| Kubernetes        | {{< X >}}                | {{< X >}}                     | {{< X >}}     |
| Amazon ECS        | {{< X >}}                | {{< X >}}                     | {{< X >}}     |
| AWS Fargate       | {{< X >}}                | {{< X >}}                     | Preview (2.42.0) |
| AWS Lambda        | {{< X >}}                |                               |               |
| Azure App Service | {{< X >}}                | {{< X >}}                     | {{< X >}}     |

**注**: Azure App Service は、**Web アプリケーションのみ**サポートされています。Azure Functions では、アプリケーションセキュリティ機能はサポートされていません。

## 言語とフレームワークの互換性 {#language-and-framework-compatibility}

### サポートされている .NET バージョン {#supported-net-versions}

このセクションに記載されているすべてのバージョンは、一般提供 (GA) されています。

Code Security は、以下の .NET および .NET Core ランタイムをサポートしています。

| .NET バージョン  | Microsoft のサポート終了日 | パッケージバージョン    |
| ------------- | --------------------- | ------------------ |
| .NET 10       | _2028 年 11 月 14 日 _   | 最新版 (>= 3.31.0) |
| .NET 9        | _2026 年 11 月 10 日 _   | 最新版 (>= 3.6.0)  |
| .NET 8        | _2026 年 11 月 10 日 _   | 最新版 (>= 2.42.0) |
| .NET 7        | 2024 年 5 月 14 日          | 最新版 (>= 2.42.0) |
| .NET 6        | 2024 年 11 月 12 日     | 最新版 (>= 2.42.0) |
| .NET 5        | 2022 年 5 月 10 日          | 最新版 (>= 2.42.0) |
| .NET Core 3.1 | 2022 年 12 月 13 日     | 最新版 (>= 2.42.0) |

Code Security は、以下の .NET Framework バージョンをサポートしています。

| .NET Framework バージョン | Microsoft のサポート終了日 | パッケージバージョン |
| ---------------------- | --------------------- | --------------- |
| 4.8                    |                       | 最新版          |
| 4.7.2                  |                       | 最新版          |
| 4.7                    |                       | 最新版          |
| 4.6.2                  |                       | 最新版          |
| 4.6.1                  | 2022 年 4 月 26 日        | 最新版          |

これらは、以下のアーキテクチャでサポートされています。
- Linux (GNU) x86-64、ARM64
- Alpine Linux (musl) x86-64、ARM64
- Windows (msvc) x86、x86-64

.NET トレーサーがサポートするランタイムおよびオペレーティングシステムについては、[.NET および .NET Core の互換性要件][1]および [.NET Framework の互換性要件][2]を参照してください。

### Web フレームワークの互換性 {#web-framework-compatibility}

**Web フレームワークの統合によって提供されるもの:**

- 攻撃元の HTTP リクエストの詳細
- HTTP リクエスト用のタグ (ステータスコード、メソッドなど)
- アプリケーション内の攻撃フローを確認するための分散トレーシング

##### アプリケーションセキュリティ機能に関する注意事項 {#application-security-capability-notes}
- **Software Composition Analysis** はすべてのフレームワークでサポートされます。
- お使いのフレームワークが以下に記載されていない場合でも、**Code Security** は Insecure Cookie の脆弱性を検出します。


| フレームワーク                  | Threat Detection のサポート| Threat Protection のサポート| Code Security のサポート|
| ----------------------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| ASP.NET Core (minimal API を含む) | {{< X >}} | {{< X >}} | {{< X >}} |
| ASP.NET MVC | {{< X >}}  |{{< X >}}  | {{< X >}} |
| ASP.NET Web API 2 | {{< X >}} | {{< X >}} | {{< X >}}  |

<div class="alert alert-info">お使いのフレームワークがリストにない場合は、お知らせください。<a href="https://forms.gle/gHrxGQMEnAobukfn7">こちらの短いフォームに記入し、詳細を送信してください</a>。</div>

### データストアの互換性 {#data-store-compatibility}

**データストアのトレーシングでは以下の確認が可能です。**

- SQL 攻撃の検知
- クエリ情報 (サニタイジングされたクエリ文字列など)
- エラーとスタックトレースの取得

##### アプリケーションセキュリティ機能に関する注意事項 {#application-security-capability-notes-1}
- **Threat Protection** は HTTP リクエスト (input) レイヤーでも機能するため、下表に掲載されていなくても、デフォルトですべてのデータベースで機能します。

| フレームワーク         | Threat Detection のサポート   | Threat Protection のサポート| Code Security のサポート|
|-------------------|-----------------|---------------------|---|
| OracleDB         | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| ADO.NET         | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| SQL Server         | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| MySQL       | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| SQLite         | {{< X >}} |   {{< X >}}    |{{< X >}}    |

### ユーザー認証フレームワークの互換性 {#user-authentication-frameworks-compatibility}

**User Authentication Frameworks へのインテグレーションは以下を提供します。**

- ユーザー ID を含むユーザーログインイベント
- ユーザーサインアップイベント (組み込みの SignInManager を使用するアプリ)
- ユーザーログインイベントのアカウント乗っ取り検出モニタリング

| フレームワーク         |
|-------------------|
| > .Net Core 2.1   |

[1]: /ja/tracing/trace_collection/compatibility/dotnet-core/
[2]: /ja/tracing/trace_collection/compatibility/dotnet-framework/
[3]: /ja/remote_configuration#enabling-remote-configuration