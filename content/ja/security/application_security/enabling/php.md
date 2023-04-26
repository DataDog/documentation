---
aliases:
- /ja/security_platform/application_security/getting_started/php
- /ja/security/application_security/getting_started/php
code_lang: php
code_lang_weight: 40
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentation
  text: トレースへのユーザー情報追加
- link: https://github.com/DataDog/dd-trace-php
  tag: GitHub
  text: PHP Datadog トレーサーライブラリソースコード
- link: /security/default_rules/#cat-application-security
  tag: Documentation
  text: すぐに使える Application Security Management ルール
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Application Security Management のトラブルシューティング
kind: documentation
title: PHP の ASM を有効にする
type: multi-code-lang
---

Docker、Kubernetes、AWS ECS、AWS Fargate で動作する NodeJS アプリのアプリケーションセキュリティを監視することができます。

{{% appsec-getstarted %}}

## 詳細はこちら

1. インストーラーをダウンロードし、実行することで**最新の Datadog PHP ライブラリをインストール**します。
   ```shell
   wget https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php -O datadog-setup.php
   php datadog-setup.php --php-bin all --enable-appsec
   ```
   サービスの言語やフレームワークのバージョンが ASM 機能に対応しているかどうかは、[互換性][1]をご参照ください。

2. PHP-FPM または Apache を再起動することで、**コード内でライブラリを有効化します**。コンテナ環境では、以前に ASM を有効にせずにライブラリをインストールした場合、以下の環境変数を設定することで、オプションで後から有効にすることができます。
   {{< tabs >}}
{{% tab "Docker CLI" %}}

APM 用の構成コンテナを更新するには、`docker run` コマンドに以下の引数を追加します。

```shell
docker run [...] -e DD_APPSEC_ENABLED=true [...]
```

{{< /tabs >}}
{{% tab "Dockerfile" %}}

コンテナの Dockerfile に以下の環境変数の値を追加します。

```Dockerfile
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

APM 用の構成 yaml ファイルコンテナを更新し、AppSec の環境変数を追加します。

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_APPSEC_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "AWS ECS" %}}

以下を環境セクションに追加して、ECS タスク定義 JSON ファイルを更新します。

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}

{{< /tabs >}}

{{% appsec-getstarted-2-canary %}}

{{< img src="/security/application_security/application-security-signal.png" alt="Security Signal 詳細ページでは、タグ、メトリクス、次のステップの提案、脅威と関連する攻撃者の IP アドレスが表示されます。" style="width:100%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/enabling/compatibility/php