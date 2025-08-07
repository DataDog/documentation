---
aliases:
- /ja/security_platform/application_security/getting_started/nodejs
- /ja/security/application_security/getting_started/nodejs
code_lang: nodejs
code_lang_weight: 50
further_reading:
- link: /security/application_security/code_security/#code-level-vulnerabilities-list
  tag: ドキュメント
  text: Supported code-level vulnerabilities list
- link: https://www.datadoghq.com/blog/iast-datadog-code-security/
  tag: ブログ
  text: Datadog Code Security で本番環境のアプリケーションセキュリティを強化
- link: https://www.datadoghq.com/blog/application-code-vulnerability-detection/
  tag: ブログ
  text: Datadog Code Security でコードの脆弱性を発見
- link: https://www.datadoghq.com/blog/code-security-owasp-benchmark/
  tag: ブログ
  text: Datadog Code Security は IAST アプローチを採用し、OWASP Benchmark で 100% の精度を達成
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: Troubleshooting Application Security
title: Node.js 向け Code Security を有効化する
type: multi-code-lang
---

You can detect code-level vulnerabilities and monitor application security in Node.js applications running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

Follow these steps to enable Code Security in your service:

1. [Datadog Agent][4] をバージョン 7.41.1 以上に更新します。
2. Update your Datadog Tracing Library to at least the minimum version needed to turn on Code Security. For details, see [Library Compatibility][3] page.
3. アプリケーションの構成に `DD_IAST_ENABLED=true` 環境変数を追加します。

   If you initialize the APM library on the command line using the `--require` option to Node.js:

   ```shell
   node --require dd-trace/init app.js
   ```
   環境変数を使用して ASM を有効にします:
   ```shell
   DD_IAST_ENABLED=true node app.js
   ```
   How you do this varies depending on where your service runs:
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
ENV DD_IAST_ENABLED=true
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
            - name: DD_IAST_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

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
5. Code Security が動作していることを確認するには、サービスをブラウズすると、コード レベルの脆弱性が [Vulnerability Explorer][5] に表示されます。

{{< img src="/security/application_security/Code-Level-Vulnerability-Details-New.mp4" alt="Video showing Code Vulnerabilities" video="true" >}}

さらにサポートが必要な場合は、[Datadog サポート][6]にお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[2]: /ja/security/application_security/code_security/setup/nodejs/
[3]: /ja/security/application_security/code_security/setup/compatibility/
[4]: /ja/agent/versions/upgrade_between_agent_minor_versions/
[5]: https://app.datadoghq.com/security/appsec/vm/code
[6]: /ja/help