---
aliases:
- /ja/security_platform/application_security/getting_started/python
- /ja/security/application_security/getting_started/python
- /ja/security/application_security/enabling/python
code_lang: python
code_lang_weight: 50
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentation
  text: Adding user information to traces
- link: https://github.com/DataDog/dd-trace-py
  tag: ソースコード
  text: Python Datadog library source code
- link: /security/default_rules/?category=cat-application-security
  tag: Documentation
  text: OOTB Application Security Management Rules
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Troubleshooting Application Security Management
title: Enabling ASM for Python
type: multi-code-lang
---

Docker、Kubernetes、Amazon ECS、AWS Fargate で実行されている Python アプリのセキュリティを監視することができます。

{{% appsec-getstarted %}}

## Enabling threat detection
### 詳細はこちら

1. **Update your Datadog Python library package** to at least version 1.2.2 (at least version 1.5.0 for Software Composition Analysis detection features). Run the following:
   ```shell
   pip install --upgrade ddtrace
   ```

   サービスの言語やフレームワークのバージョンが ASM 機能に対応しているかどうかは、[互換性][1]をご参照ください。

2. **Python アプリケーションの起動時に ASM を有効にします**。

   ```bash
   DD_APPSEC_ENABLED=true ddtrace-run python app.py
   ```

   また、アプリケーションが実行される場所に応じて、以下の方法のいずれかを使用することもできます。
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

   APM 用の構成 YAML ファイルコンテナを更新し、`DD_APPSEC_ENABLED` 環境変数を追加します。

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

   {{% appsec-getstarted-2-canary %}}
   ```shell
   DD_APPSEC_ENABLED=true ddtrace-run python app.py
   ```

   {{% /tab %}}
   {{< /tabs >}}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/enabling/compatibility/python