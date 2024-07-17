---
aliases:
- /ja/security_platform/application_security/getting_started/python
- /ja/security/application_security/getting_started/python
- /ja/security/application_security/enabling/python
code_lang: python
code_lang_weight: 50
further_reading:
- link: /security/application_security/add-user-info/
  tag: ドキュメント
  text: トレースへのユーザー情報追加
- link: https://github.com/DataDog/dd-trace-php
  tag: Source Code
  text: Python Datadog ライブラリソースコード
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: すぐに使える Application Security Management ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: Application Security Management のトラブルシューティング
title: Python の ASM を有効にする
type: multi-code-lang
---

You can monitor the security of your Python apps running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

{{% appsec-getstarted %}}

## Enabling threat detection
### Get started

1. **Update your Datadog Python library package** to at least version 1.2.2 (at least version 1.5.0 for Software Composition Analysis detection features). Run the following:
   ```shell
   pip install --upgrade ddtrace
   ```

   To check that your service's language and framework versions are supported for ASM capabilities, see [Compatibility][1].

2. **Enable ASM when starting the Python application**.

   ```bash
   DD_APPSEC_ENABLED=true ddtrace-run python app.py
   ```

    You can also use one of the following methods, depending on where your application runs:
   {{< tabs >}}
   {{% tab "Docker CLI" %}}

   Update your configuration container for APM by adding the following argument in your `docker run` command:

   ```shell
   docker run [...] -e DD_APPSEC_ENABLED=true [...]
   ```

   {{% /tab %}}
   {{% tab "Dockerfile" %}}

   Add the following environment variable value to your container Dockerfile:

   ```Dockerfile
   ENV DD_APPSEC_ENABLED=true
   ```

   {{% /tab %}}
   {{% tab "Kubernetes" %}}

   Update your configuration YAML file container for APM and add the `DD_APPSEC_ENABLED` environment variable:

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

   Update your ECS task definition JSON file by adding the following in the environment section:

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

   Initialize ASM in your code or set the `DD_APPSEC_ENABLED` environment variable to `true` in your service invocation:
   ```shell
   DD_APPSEC_ENABLED=true ddtrace-run python app.py
   ```

   {{% /tab %}}
   {{< /tabs >}}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/enabling/compatibility/python