---
aliases:
- /ja/tracing/serverless_functions/enable_aws_xray/
description: AWS X-Ray で Lambda 関数をトレース
title: AWS X-Ray トレーシングを有効にする
---
## AWS X-Ray を有効にする

**前提条件:** [AWS インテグレーションのインストール][1]。

1. 以下のアクセス許可が AWS/Datadog ロールのポリシードキュメントに含まれていることを確認します。

```text
xray:BatchGetTraces,
xray:GetTraceSummaries
```

    完全なトレースを返すには、`BatchGetTraces` 許可を使用します。`GetTraceSummaries` 許可は、最近のトレースの要約をリストで取得するために使用します。

2. [Datadog 内で X-Ray インテグレーションを有効にします][2]。

3. カスタマーマスターキーを使用してトレースを暗号化している場合は、X-Ray に使用されるカスタマーマスターキーがリソースとなっているポリシーに `kms:Decrypt` メソッドを追加してください。

**注:** AWS X-Ray インテグレーションを有効にすると Indexed Span の消費量が増加するため、請求額が増加する場合があります。

### 関数の AWS X-Ray を有効化する

AWS X-Ray インテグレーションを最大限活用するには:

- Serverless Framework プラグインを使用または手動で、Lambda 関数および API Gateway 上で有効にします。
- Lambda 関数でトレーシングライブラリをインストールします。

#### [推奨] Datadog Serverless Framework プラグイン

[Datadog Serverless Framework プラグイン][3]は、Lambda 関数と API Gateway インスタンスの X-Ray を自動的に有効化します。また、このプラグインは [Datadog Lambda レイヤー][4]を Node.js および Python 関数に自動的に追加します。

[Serverless Framework プラグインの使用を開始][5]するには、[ドキュメントを参考にしてください][3]。

最後に、[X-Ray クライアントライブラリをインストールして Lambda 関数にインポートします](#X-Ray クライアントライブラリのインストール)。

#### 手動セットアップ

サーバーレスアプリケーションのデプロイに Serverless Framework を使用しない場合は、以下の方法で手動でセットアップします。

1. AWS コンソールで、インスツルメントする Lambda 関数に移動します。「デバッグとエラー処理」セクションで、**アクティブトレースを有効にします**の隣のチェックボックスをオンにします。これにより、その関数の X-Ray がオンになります。
2. [API Gateway コンソール][6]に移動します。API を選択し、次にステージを選択します。
3. **Logs/Tracing** タブで **Enable X-Ray Tracing** を選択します。
4. この変更を有効にするには、左のナビゲーションパネルで **Resources** に移動し、**Actions** を選択して **Deploy API** をクリックします。

**注:** Datadog Lambda レイヤーとクライアントライブラリには依存関係として X-Ray SDK が含まれているため、プロジェクトに明示的にインストールする必要はありません。

最後に、[X-Ray クライアントライブラリをインストールして Lambda 関数にインポートします](#X-Ray クライアントライブラリのインストール)。

#### X-Ray クライアントライブラリをインストールする

X-Ray クライアントライブラリから、API への HTTP リクエストと、DynamoDB、S3、MySQL、PostgreSQL (自己ホスト型、Amazon RDS、Amazon Aurora)、SQS、SNS へのコールに関する洞察を得られます。

ライブラリをインストールして Lambda プロジェクトにインポートし、インスツルメントするサービスにパッチを適用します。

{{< programming-lang-wrapper langs="nodejs,python,go,ruby,java,.NET" >}}

{{< programming-lang lang="nodejs" >}}

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

その他のコンフィギュレーション、サブセグメントの作成、アノテーションの記録については、[X-Ray Node.js ドキュメント][1]を参照してください。

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-nodejs.html
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

X-Ray トレーシングライブラリをインストールする

```bash
pip install aws-xray-sdk
```

デフォルトで[すべてのライブラリ][1]にパッチを適用するには、Lambda ハンドラーが含まれるファイルに次のコードを追加します。

```python
from aws_xray_sdk.core import xray_recorder
from aws_xray_sdk.core import patch_all
patch_all()
```

`aiohttp` のトレースには[特定のインスツルメンテーション][2]が必要です。

その他のコンフィギュレーション、サブセグメントの作成、アノテーションの記録については、[X-Ray Python ドキュメント][3]を参照してください。


[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-python-patching.html
[2]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-python-httpclients.html
[3]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-python.html
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
参照:
- [Go 対応 X-Ray SDK ドキュメント][1]。

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-go.html
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
参照:
- [Ruby 対応 X-Ray SDK ドキュメント][1]。

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-ruby.html
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

参照:
- [Java 対応 X-Ray SDK ドキュメント][1]。

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-java.html
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

参照:
- [.Net 対応 X-Ray SDK ドキュメント][1]。

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-dotnet.html
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

[1]: /ja/integrations/amazon_web_services/#setup
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_xray
[3]: https://github.com/DataDog/serverless-plugin-datadog
[4]: https://docs.datadoghq.com/ja/integrations/amazon_lambda/?tab=python#installing-and-using-the-datadog-layer
[5]: https://www.datadoghq.com/blog/serverless-framework-plugin
[6]: https://console.aws.amazon.com/apigateway/