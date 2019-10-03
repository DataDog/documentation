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

最初に、[AWS インテグレーションを有効にし][3]、AWS/Datadog ロールのポリシードキュメントに以下のアクセス許可を追加します。

```
xray:BatchGetTraces,
xray:GetTraceSummaries
```

`GetTraceSummaries` アクセス許可は、最新のトレースのリストを取得するために使用されます。`BatchGetTraces` は、実際にトレース全体を返します。

次に、[Datadog 内で X-Ray インテグレーションを有効にします][4]。

カスタマーマスターキーを使用してトレースを暗号化している場合は、X-Ray に使用されるカスタマーマスターキーがリソースとなっているポリシーに `kms:Decrypt` メソッドを追加してください。

推奨の X-Ray 設定方法は以下のとおりです。

- AWS コンソールで、計測する Lambda 関数に移動します。「デバッグとエラー処理」セクションで、「アクティブトレースを有効にします」の隣のチェックボックスをオンにします。これで、その関数の X-Ray がオンになります。

- 関数に X-Ray SDK をインポートし、サポートされているすべてのライブラリのパッチを適用します。これで、X-Ray は、すべての AWS 呼び出しと X-Ray がサポートする他のインテグレーションを自動的にトレースするようになります。[Python での実装例][5]を参照してください。

## 収集データ
AWS X-Ray インテグレーションは、AWS からトレースデータを取得しますが、メトリクスやログは収集しません。

[1]: http://app.datadoghq.com/functions
[2]: http://docs.datadoghq.com/graphing/infrastructure/serverless_functions
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[4]: https://app.datadoghq.com/account/settings#integrations/amazon_xray
[5]: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-python-patching.html


{{< get-dependencies >}}