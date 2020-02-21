---
aliases:
  - /ja/integrations/awsxray/
categories:
  - クラウド
  - aws
ddtype: クローラー
dependencies: []
description: AWS サービス間で交わされるリクエストをトレース
doc_link: 'https://docs.datadoghq.com/integrations/amazon_xray/'
git_integration_title: amazon_xray
has_logo: true
integration_title: AWS X-Ray
is_public: true
kind: インテグレーション
manifest_version: 1
name: amazon_xray
public_title: Datadog-AWS X-Ray インテグレーション
short_description: AWS サービス間で交わされるリクエストをトレース
version: 1
---
## 概要

AWS X-Ray を使用すると、開発者は AWS 製品を使用して構築された分散アプリケーションをトレースできます。このインテグレーションは、[サーバーレス][1]関数詳細ページで Lambda 関数のトレースを提供します。サーバーレス監視の詳細については、[こちらのドキュメント][2]を参照してください。

## セットアップ

### インストール

最初に、[AWS インテグレーションを有効化][3]し、以下のアクセス許可が AWS/Datadog ロールのポリシードキュメントに含まれていることを確認します。

```text
xray:BatchGetTraces,
xray:GetTraceSummaries
```

`GetTraceSummaries` アクセス許可は、最新のトレースのリストを取得するために使用されます。`BatchGetTraces` は、実際にトレース全体を返します。

次に、[Datadog 内で X-Ray インテグレーションを有効にします][4]。

カスタマーマスターキーを使用してトレースを暗号化している場合は、X-Ray に使用されるカスタマーマスターキーがリソースとなっているポリシーに `kms:Decrypt` メソッドを追加してください。

### 関数の AWS X-Ray を有効化する

AWS X-Ray インテグレーションを最大限に活用するには、これを Lambda 関数と API Gateways _で_ 有効化し、**さらに** Lambda 関数_に_トレーシングライブラリをインストールする必要があります。

#### 推奨: Serverless Framework プラグインを使用する

[Datadog Serverless Framework プラグイン][16]は、Lambda 関数と API Gateway インスタンスの X-Ray を自動的に有効化します。また、このプラグインは [Datadog Lambda レイヤー][15]を Node 関数と Python 関数に自動的に追加します。

[Serverless Framework プラグインの使用を開始][7]するには、[ドキュメントを参考にしてください][16]。

最後に、[X-Ray クライアントライブラリをインストールして Lambda 関数にインポートします](#X-Ray クライアントライブラリのインストール)。

#### 手動セットアップ

1. AWS コンソールで、インスツルメントする Lambda 関数に移動します。「デバッグとエラー処理」セクションで、**アクティブトレースを有効にします**の隣のチェックボックスをオンにします。これにより、その関数の X-Ray がオンになります。
2. [API Gateway コンソール][6]に移動します。API > ステージの順に選択し、**ログ/トレース**タブで **X-Ray トレースの有効化**にチェックを入れます。この変更を有効にするには、左のナビゲーションパネルで**リソース**に移動し、**アクション** > **API のデプロイ**の順に選択します。

**注:** Datadog Lambda レイヤーとクライアントライブラリには依存関係として X-Ray SDK が含まれているため、プロジェクトに明示的にインストールする必要はありません。

最後に、[X-Ray クライアントライブラリをインストールして Lambda 関数にインポートします](#X-Ray クライアントライブラリのインストール)。

### X-Ray クライアントライブラリをインストールする

X-Ray クライアントライブラリから、API への HTTP リクエストと、DynamoDB、S3、MySQL、PostgreSQL (自己ホスト型、Amazon RDS、Amazon Aurora)、SQS、SNS へのコールに関する洞察を得られます。

ライブラリをインストールして Lambda プロジェクトにインポートし、インスツルメントするサービスにパッチを適用します。

{{< tabs >}}
{{% tab "Node.js" %}}

X-Ray トレーシングライブラリをインストールする

```bash

npm install aws-xray-sdk

# Yarn ユーザー向け
yarn add aws-xray-sdk
```

AWS SDK をインスツルメントするには

```js
var AWSXRay = require('aws-xray-sdk-core');
var AWS = AWSXRay.captureAWS(require('aws-sdk'));
```

すべてのダウンストリーム HTTP コールをインスツルメントするには

```js
var AWSXRay = require('aws-xray-sdk');
AWSXRay.captureHTTPsGlobal(require('http'));
var http = require('http');
```

PostgreSQL クエリをインスツルメントするには

```js
var AWSXRay = require('aws-xray-sdk');
var pg = AWSXRay.capturePostgres(require('pg'));
var client = new pg.Client();
```

MySQL クエリをインスツルメントするには

```js
var AWSXRay = require('aws-xray-sdk');
var mysql = AWSXRay.captureMySQL(require('mysql'));
//...
var connection = mysql.createConnection(config);
```

その他のコンフィギュレーション、サブセグメントの作成、アノテーションの記録については、[Node.js 対応 X-Ray ドキュメント][1]を参考にしてください。

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-nodejs.html

{{% /tab %}}
{{% tab "Python" %}}

X-Ray トレーシングライブラリをインストールする

```bash
pip install aws-xray-sdk
```

デフォルトで[すべてのライブラリ][2]にパッチを適用するには、Lambda ハンドラーが含まれるファイルに次のコードを追加します。

```python
from aws_xray_sdk.core import xray_recorder
from aws_xray_sdk.core import patch_all
patch_all()
```

`aiohttp` のトレースには[特定のインスツルメンテーション][3]が必要です。

その他のコンフィギュレーション、サブセグメントの作成、アノテーションの記録については、[Python 対応 X-Ray ドキュメント][1]を参考にしてください。

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-python.html
[2]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-python-patching.html
[3]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-python-httpclients.html

{{% /tab %}}
{{% tab "Go, Ruby, Java, .NET" %}}

その他のランタイムについては、X-Ray SDK ドキュメントを参考にしてください。

- [Go 対応 X-Ray SDK][1]
- [Ruby 対応 X-Ray SDK][2]
- [Java 対応 X-Ray SDK][3]
- [.NET 対応 X-Ray SDK][4]

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-go.html
[2]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-ruby.html
[3]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-java.html
[4]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-dotnet.html

{{% /tab %}}
{{< /tabs >}}

## 収集データ

AWS X-Ray インテグレーションは、AWS からトレースデータを取得しますが、メトリクスやログは収集しません。

[1]: http://app.datadoghq.com/functions
[2]: https://docs.datadoghq.com/ja/infrastructure/serverless/
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[4]: https://app.datadoghq.com/account/settings#integrations/amazon_xray
[5]: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-python-patching.html
[6]: https://console.aws.amazon.com/apigateway/
[7]: https://www.datadoghq.com/blog/serverless-framework-plugin
[8]: https://github.com/DataDog/serverless-plugin-datadog
[15]: https://docs.datadoghq.com/ja/integrations/amazon_lambda/?tab=python#installing-and-using-the-datadog-layer
[16]: https://github.com/DataDog/serverless-plugin-datadog