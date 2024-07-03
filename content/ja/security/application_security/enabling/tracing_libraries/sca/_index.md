---
disable_toc: false
further_reading:
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: すぐに使える Application Security Management ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: Application Security Management のトラブルシューティング
- link: /security/application_security/how-appsec-works/
  tag: ドキュメント
  text: Datadog における Application Security Management の仕組み
- link: https://www.datadoghq.com/blog/secure-serverless-applications-with-datadog-asm/
  tag: ブログ
  text: Datadog ASM でサーバーレスアプリケーションのセキュリティを強化する
kind: documentation
title: Enabling Software Composition Analysis using Datadog tracing libraries
---

You can use Datadog Software Composition Analysis (SCA) to monitor the open source libraries in your apps.

SCA is configured by setting the `-Ddd.appsec.sca.enabled` flag or the `DD_APPSEC_SCA_ENABLED` environment variable to `true` in supported languages:

- Java
- .NET
- Go
- Ruby
- PHP
- Node.js
- Python

This topic explains how to set up SCA using a Java example.



## Example: enabling Software Composition Analysis in Java

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

1. **Run your Java application with SCA enabled.** From the command line:
   ```shell
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.sca.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   または、アプリケーションが実行される場所に応じて、以下の方法のいずれかを使用します。

   **Note:** Read-only file systems are not supported at this time. The application must have access to a writable `/tmp` directory.

   {{< tabs >}}
{{% tab "Docker CLI" %}}

APM 用の構成コンテナを更新するには、`docker run` コマンドに以下の引数を追加します。


```shell
docker run [...] -e DD_APPSEC_SCA_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

コンテナの Dockerfile に以下の環境変数の値を追加します。

```Dockerfile
ENV DD_APPSEC_SCA_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Update your deployment configuration file for APM and add the SCA environment variable:

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_APPSEC_SCA_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

以下を環境セクションに追加して、ECS タスク定義 JSON ファイルを更新します。

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_SCA_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}
{{% tab "AWS Fargate" %}}

Set the `-Ddd.appsec.sca.enabled` flag or the `DD_APPSEC_SCA_ENABLED` environment variable to `true` in your service invocation:

```shell
java -javaagent:dd-java-agent.jar \
     -Ddd.appsec.sca.enabled=true \
     -jar <YOUR_SERVICE>.jar \
     <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}

   {{< /tabs >}}



[1]: https://github.com/DataDog/dd-trace-java/releases
[2]: /ja/security/application_security/enabling/compatibility/java
[3]: /ja/security/application_security/enabling/compatibility/java/#asm-capabilities-support
[4]: https://app.datadoghq.com/security/appsec/vm
[5]: /ja/help
[6]: /ja/agent/versions/upgrade_between_agent_minor_versions/