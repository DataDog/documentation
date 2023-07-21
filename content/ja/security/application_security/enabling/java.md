---
aliases:
- /ja/security_platform/application_security/getting_started/java
- /ja/security/application_security/getting_started/java
code_lang: java
code_lang_weight: 0
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentation
  text: トレースへのユーザー情報追加
- link: https://github.com/DataDog/dd-trace-java
  tag: GitHub
  text: Java Datadog ライブラリソースコード
- link: /security/default_rules/#cat-application-security
  tag: Documentation
  text: すぐに使える Application Security Management ルール
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Application Security Management のトラブルシューティング
kind: documentation
title: Java の ASM を有効にする
type: multi-code-lang
---

Docker、Kubernetes、AWS ECS、AWS Fargate で動作する Java アプリのアプリケーションセキュリティを監視することができます。

{{% appsec-getstarted %}}

{{% appsec-getstarted-with-rc %}}

## 詳細はこちら

1. **[Datadog Java ライブラリ][1]をバージョン 0.94.0 以上 (Application Vulnerability Management の脆弱性検出機能についてはバージョン 1.1.4 以上) に更新してください**。
   ```shell
   wget -O dd-java-agent.jar 'https://github.com/DataDog/dd-trace-java/releases/latest/download/dd-java-agent.jar'
   ```

   サービスの言語やフレームワークのバージョンが ASM 機能に対応しているかどうかは、[互換性][2]をご参照ください。

2. **ASM を有効にした状態で Java アプリケーションを実行します。**コマンドラインから
   ```shell
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   または、アプリケーションが実行される場所に応じて、以下の方法のいずれかを使用します。

   **注:** 読み取り専用ファイルシステムは現在サポートされていません。アプリケーションは書き込み可能な `/tmp` ディレクトリへのアクセス権を持っている必要があります。

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

```shell
java -javaagent:dd-java-agent.jar \
     -Ddd.appsec.enabled=true \
     -jar <YOUR_SERVICE>.jar \
     <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}

   {{< /tabs >}}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln.mp4" alt="シグナルエクスプローラーとその詳細、脆弱性エクスプローラーとその詳細をビデオでご紹介しています。" video="true" >}}

## コードレベルの脆弱性検出の有効化

[コードレベルの脆弱性検出のための Vulnerability Management をサポートするトレーシングライブラリのバージョン][3]を実行しているサービスでは、`DD_IAST_ENABLED=true` 環境変数に設定してサービスを再起動することで機能を有効にしてください。

サービスのコードレベルの脆弱性を検出するには

1. [Datadog Agent][6] をバージョン 7.41.1 以上に更新します。
2. トレーシングライブラリを、コードレベルの脆弱性検出を有効にするために必要な最小限のバージョンに更新します。詳しくは、[ASM 機能サポート][3]を参照してください。
3. アプリケーションの構成に `DD_IAST_ENABLED=true` 環境変数を追加します。

   コマンドラインから

   ```shell
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.iast.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   または、アプリケーションが実行される場所に応じて、以下の方法のいずれかを使用します。

   **注**: 読み取り専用ファイルシステムはサポートされていません。アプリケーションは書き込み可能な `/tmp` ディレクトリへのアクセス権を持っている必要があります。


   {{< tabs >}}
{{% tab "Docker CLI" %}}

APM 用の構成コンテナを更新するには、`docker run` コマンドに以下の引数を追加します。


```shell
docker run [...] -e DD_IAST_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

コンテナの Dockerfile に以下の環境変数の値を追加します。

```Dockerfile
DD_IAST_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

APM 用のデプロイメント構成ファイルを更新し、IAST 環境変数を追加します。

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_IAST_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "AWS ECS" %}}

以下を環境セクションに追加して、ECS タスク定義 JSON ファイルを更新します。

```json
"environment": [
  ...,
  {
    "name": "DD_IAST_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}

   {{< /tabs >}}

4. サービスを再起動します。
5. コードレベルの脆弱性に対する Application Vulnerability Management を実際に見るには、サービスをブラウズすると、コードレベルの脆弱性が [Vulnerability Explorer][4] に表示されます。`SOURCE` 列には、Code の値が表示されます。

{{< img src="/security/application_security/Code-Level-Vulnerability-Details.mp4" alt="Vulnerabilities タブ、Code ソース、コードの脆弱性を検査する様子を示すビデオ" video="true" >}}

さらにサポートが必要な場合は、[Datadog サポート][5]にお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/releases
[2]: /ja/security/application_security/enabling/compatibility/java
[3]: /ja/security/application_security/enabling/compatibility/java/#asm-capabilities-support
[4]: https://app.datadoghq.com/security/appsec/vm
[5]: /ja/help
[6]: /ja/agent/versions/upgrade_between_agent_minor_versions/