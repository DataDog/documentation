---
aliases:
- /ja/security_platform/application_security/getting_started/python
- /ja/security/application_security/getting_started/python
code_lang: python
code_lang_weight: 50
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentation
  text: トレースへのユーザー情報追加
- link: https://github.com/DataDog/dd-trace-php
  tag: GitHub
  text: Python Datadog ライブラリソースコード
- link: /security/default_rules/#cat-application-security
  tag: Documentation
  text: すぐに使える Application Security Management ルール
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Application Security Management のトラブルシューティング
kind: documentation
title: Python の ASM を有効にする
type: multi-code-lang
---

Docker、Kubernetes、AWS ECS、AWS Fargate で動作する Python アプリのセキュリティを監視することができます。

{{% appsec-getstarted %}}

## 詳細はこちら

1. **Datadog Python ライブラリパッケージ**をバージョン 1.2.2 以上 (Application Vulnerability Management の脆弱性検出機能についてはバージョン 1.5.0 以上) に更新してください。以下を実行します。
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

   {{< tabs >}}

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
   以下を環境セクションに追加して、ECS タスク定義 JSON ファイルを更新します。

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

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln.mp4" alt="シグナルエクスプローラーとその詳細、脆弱性エクスプローラーとその詳細をビデオでご紹介しています。" video="true" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/enabling/compatibility/python
