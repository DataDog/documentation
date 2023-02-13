---
aliases:
- /ja/security_platform/application_security/getting_started/java
code_lang: java
code_lang_weight: 0
further_reading:
- link: /security/application_security/add-user-info/
  tag: ドキュメント
  text: トレースへのユーザー情報追加
- link: https://github.com/DataDog/dd-trace-java
  tag: GitHub
  text: Java Datadog ライブラリソースコード
- link: /security/default_rules/#cat-application-security
  tag: ドキュメント
  text: すぐに使える Application Security Management ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: Application Security Management のトラブルシューティング
kind: documentation
title: Java ASM 入門
type: multi-code-lang
---

Docker、Kubernetes、AWS ECS、AWS Fargate で動作する Java アプリのアプリケーションセキュリティを監視することができます。

{{% appsec-getstarted %}}

{{% appsec-getstarted-with-rc %}}

## 詳細はこちら

1. **[Datadog Java ライブラリ][1]をバージョン 0.94.0 以上 (Risk Management の脆弱性検出機能についてはバージョン 1.1.4 以上) に更新してください**。
   ```shell
   wget -O dd-java-agent.jar 'https://github.com/DataDog/dd-trace-java/releases/latest/download/dd-java-agent.jar'
   ```

   ライブラリが対応している言語やフレームワークのバージョンについては、[互換性][2]をご覧ください。

2. **ASM を有効にした状態で Java アプリケーションを実行します。**コマンドラインから
   ```shell
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   または、アプリケーションが実行される場所に応じて、以下の方法のいずれかを使用します。

   **注:** 読み取り専用ファイルシステムは現在サポートされていません。アプリケーションは書き込み可能な `/tmp` ディレクトリへのアクセス権を持っている必要があります。

   {{< tabs >}}
{{% tab "Docker CLI" %}}

{{< tabs >}}


```shell
docker run [...] -e DD_APPSEC_ENABLED=true [...] 
```

   {{< /tabs >}}

コンテナの Dockerfile に以下の環境変数の値を追加します。

```shell
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

APM 用のデプロイメント構成ファイルを更新し、ASM 環境変数を追加します。

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
{{% tab "AWS Fargate" %}}

サービス起動時に `-Ddd.appsec.enabled` フラグまたは `DD_APPSEC_ENABLED` 環境変数を `true` に設定します。

{{% /tab %}}

{{% /tab %}}

   {{< /tabs >}}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln.mp4" alt="シグナルエクスプローラーとその詳細、脆弱性エクスプローラーとその詳細をビデオでご紹介しています。" video="true" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/releases
[2]: /ja/security/application_security/setup_and_configure/?code-lang=java#compatibility