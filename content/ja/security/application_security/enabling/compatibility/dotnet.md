---
code_lang: dotnet
code_lang_weight: 10
kind: documentation
title: .NET 互換性要件
type: multi-code-lang
---

## ASM の機能サポート

.NET ライブラリでは、指定されたトレーサーのバージョンで、以下の ASM 機能がサポートされています。

| ASM の機能                   | .NET トレーサーの最小バージョン |
| -------------------------------- | ----------------------------|
| Threat Detection | 2.23.0|
| Threat Protection  | 2.26.0|
| ブロックされたリクエストへの対応をカスタマイズする | 2.27.0 |
| Vulnerability Management for Open Source Software (OSS) |  2.16.0  |
| Vulnerability Management for Code-level (ベータ版)| 2.42.0  |
| ユーザーアクティビティイベントの自動追跡 | 2.32.0 |

.NET でサポートされるすべての ASM 機能を得るためのトレーサーの最小バージョンは 2.42.0 です。

**注**: Threat Protection を使用するには、[リモート構成][3]を有効にする必要があり、これはリストされている最小トレーサーバージョンに含まれています。

### サポートされるデプロイメントタイプ
|タイプ   | Threat Detection のサポート |  OSS の脆弱性管理のサポート |
| ---   |   ---             |           ----        |
| Docker | {{< X >}}  | {{< X >}} |
| トレーシング | {{< X >}}  | {{< X >}} |
| Amazon ECS | {{< X >}}  | {{< X >}} |
| AWS Fargate | {{< X >}}  | {{< X >}} |
| AWS Lambda | {{< X >}} | |
| Azure App Service | {{< X >}}  | {{< X >}} |

**注**: Azure App Service は **Web アプリケーションでのみ**サポートされています。ASM は Azure Functions をサポートしていません。

## 言語とフレームワークの互換性

### サポートされている .NET バージョン

| .NET Framework バージョン  | マイクロソフトサポート終了 | サポートレベル                       | パッケージバージョン             |
| ----------------------- | --------------------- | ----------------------------------- | --------------------------- |
| 4.8                     |                       | GA   | 最新                      |
| 4.7.2                   |                       | GA | 最新                      |
| 4.7                     |                       | GA | 最新                      |
| 4.6.2                   |                       | GA | 最新                      |
| 4.6.1                   | 04/26/2022            | GA   | 最新 |


これらは、以下のアーキテクチャでサポートされています。
- Linux (GNU) x86-64、ARM64
- Alpine Linux (musl) x86-64、ARM64
- macOS (Darwin) x86-64、ARM64
- Windows (msvc) x86、x86-64



### Web フレームワークの互換性

- 攻撃元の HTTP リクエストの詳細
- HTTP リクエスト用のタグ (ステータスコード、メソッドなど)
- アプリケーション内の攻撃フローを確認するための分散型トレーシング

##### ASM の機能に関する備考
- **Vulnerability Management for OSS** はすべてのフレームワークでサポートされています。
- ご利用のフレームワークが下記に掲載されていない場合でも、**Vulnerability Management for Code-level** が危険な Cookie の脆弱性を検知します。


| フレームワーク                  | Threat Detection のサポートの有無 | Threat Detection のサポートの有無 | Vulnerability Management for Code-level のサポートの有無 |
| ----------------------- | --------------- | ---------------------------------------------- | ---------------------------------------------- |
| ASP.NET MVC | {{< X >}}  |{{< X >}}  | {{< X >}} |
| ASP.NET Web API 2 | {{< X >}} | {{< X >}} | {{< X >}}  |

<div class="alert alert-info">ご希望のフレームワークが掲載されていない場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

### データストアの互換性

**データストアのトレーシングでは以下の確認が可能です**

- SQL 攻撃の検知
- クエリ情報 (サニタイジングされたクエリ文字列など)
- エラーとスタックトレースの取得

##### ASM の機能に関する備考
- **Threat Protection** は HTTP リクエスト (input) レイヤーでも機能するため、下表に掲載されていなくても、デフォルトですべてのデータベースで機能します。

| フレームワーク         | Threat Detection のサポートの有無    | Threat Detection のサポートの有無 | Vulnerability Management for Code-level のサポートの有無 |
|-------------------|-----------------|---------------------|---|
| OracleDB         | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| ADO.NET         | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| SQL Server         | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| MySQL       | {{< X >}} |   {{< X >}}    |{{< X >}}    |
| SQLite         | {{< X >}} |   {{< X >}}    |{{< X >}}    |

### User Authentication Frameworks の互換性

**User Authentication Frameworks へのインテグレーションは以下を提供します。**

- ユーザー ID を含むユーザーログインイベント
- ユーザーサインアップイベント (組み込みの SignInManager を使用するアプリ)
- ユーザーログインイベントのアカウント乗っ取り検出モニタリング

| フレームワーク         |
|-------------------|
| > .Net Core 2.1   |

[1]: /ja/tracing/trace_collection/compatibility/dotnet-core/
[2]: /ja/tracing/trace_collection/compatibility/dotnet-framework/
[3]: /ja/agent/remote_config/#enabling-remote-configuration