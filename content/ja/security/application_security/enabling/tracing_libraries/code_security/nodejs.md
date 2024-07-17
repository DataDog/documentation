---
aliases:
- /ja/security_platform/application_security/getting_started/nodejs
- /ja/security/application_security/getting_started/nodejs
code_lang: nodejs
code_lang_weight: 50
further_reading:
- link: /security/application_security/add-user-info/
  tag: ドキュメント
  text: トレースへのユーザー情報追加
- link: https://github.com/DataDog/dd-trace-js
  tag: Source Code
  text: Node.js Datadog ライブラリソースコード
- link: /security/default_rules/?category=cat-application-security
  tag: ドキュメント
  text: すぐに使える Application Security Management ルール
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: Application Security Management のトラブルシューティング
kind: ドキュメント
title: Enabling ASM for Node.js
type: multi-code-lang
---

Docker、Kubernetes、Amazon ECS、AWS Fargate で実行されている Node.js アプリのアプリケーションセキュリティを監視することができます。

{{% appsec-getstarted %}}

## Enabling Code Security
If your service runs a [tracing library version that supports code security vulnerability detection][3], enable the capability by setting the `DD_IAST_ENABLED=true` environment variable and restarting your service.


To leverage code-level vulnerability detection capabilities for your service:

1. [Datadog Agent][4] をバージョン 7.41.1 以上に更新します。
2. Update your tracing library to at least the minimum version needed to turn on Code Security. For details, see [ASM capabilities support][3].
3. アプリケーションの構成に `DD_IAST_ENABLED=true` 環境変数を追加します。

   Node.js の `--require` オプションを使用してコマンドラインで APM ライブラリを初期化する場合

   ```shell
   node --require dd-trace/init app.js
   ```
   そして、環境変数を使って ASM を有効にします。
   ```shell
   DD_IAST_ENABLED=true node app.js
   ```
   その方法は、サービスがどこで実行されているかによって変わります。
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
5. To see Code Security in action, browse your service and the code-level vulnerabilities will appear in the [Vulnerability Explorer][5]. The `SOURCE` column shows the Code value.

{{< img src="/security/application_security/Code-Level-Vulnerability-Details.mp4" alt="Vulnerabilities タブ、Code ソース、コードレベルの脆弱性を検査する様子を示すビデオ" video="true" >}}

さらにサポートが必要な場合は、[Datadog サポート][6]にお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[2]: /ja/security/application_security/enabling/compatibility/nodejs
[3]: /ja/security/application_security/enabling/compatibility/nodejs#asm-capabilities-support
[4]: /ja/agent/versions/upgrade_between_agent_minor_versions/
[5]: https://app.datadoghq.com/security/appsec/vm
[6]: /ja/help