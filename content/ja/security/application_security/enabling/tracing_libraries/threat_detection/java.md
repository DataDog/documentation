---
title: Enabling ASM for Java
kind: documentation
code_lang: java
type: multi-code-lang
code_lang_weight: 0
aliases:
  - /security_platform/application_security/getting_started/java
  - /security/application_security/getting_started/java
  - /security/application_security/enabling/java/
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentation
  text: Adding user information to traces
- link: "https://github.com/DataDog/dd-trace-java"
  tag: ソースコード
  text: Java Datadog library source code
- link: /security/default_rules/?category=cat-application-security
  tag: Documentation
  text: OOTB Application Security Management Rules
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Troubleshooting Application Security Management

---

You can monitor application security for Java apps running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

{{% appsec-getstarted %}}

## Enabling threat detection
### 詳細はこちら

1. **Update your [Datadog Java library][1]** to at least version 0.94.0 (at least version 1.1.4 for Software Composition Analysis detection features):

   {{< tabs >}}
   {{% tab "Wget" %}}
   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "cURL" %}}
   ```shell
   curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "Dockerfile" %}}
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar
   ```
{{% /tab %}}
{{< /tabs >}}

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

{{% /tab %}}
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
{{% tab "Amazon ECS" %}}

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

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}


さらにサポートが必要な場合は、[Datadog サポート][5]にお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/releases
[2]: /security/application_security/enabling/compatibility/java
[3]: /security/application_security/enabling/compatibility/java/#asm-capabilities-support
[4]: https://app.datadoghq.com/security/appsec/vm
[5]: /help
[6]: /agent/versions/upgrade_between_agent_minor_versions/
