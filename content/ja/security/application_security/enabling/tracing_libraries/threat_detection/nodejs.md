---
title: Enabling ASM for NodeJs
kind: documentation
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 50
aliases:
  - /security_platform/application_security/getting_started/nodejs
  - /security/application_security/getting_started/nodejs
  - /security/application_security/enabling/nodejs
further_reading:
    - link: /security/application_security/add-user-info/
      tag: Documentation
      text: Adding user information to traces
    - link: "https://github.com/DataDog/dd-trace-js"
      tag: ソースコード
      text: Node.js Datadog library source code
    - link: /security/default_rules/?category=cat-application-security
      tag: Documentation
      text: OOTB Application Security Management Rules
    - link: /security/application_security/troubleshooting
      tag: Documentation
      text: Troubleshooting Application Security Management
---

You can monitor application security for Node.js apps running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

{{% appsec-getstarted %}}

## Enabling threat detection
### 詳細はこちら

1. **Update your Datadog Node.js library package** to at least version 5.0.0 (for Node 18+) or 4.0.0 (for Node 16+) or 3.10.0 (for NodeJS 14+), by running one of these commands:
   ```shell
   npm install dd-trace@^5
   npm install dd-trace@^4
   npm install dd-trace@^3.10.0
   ```
   Use this [migration guide][1] to assess any breaking changes if you upgraded your library.

   Application Security Management is compatible with Express v4+ and NodeJS v14+. For additional information, see [Compatibility][2].

2. **APM 用の Node.js ライブラリをインポートして初期化する場合は、ASM も有効にしてください。**これは、コードの中か、環境変数の中か、どちらかでしょう。コードで APM を初期化した場合は、init 文に `{appsec: true}` を追加してください。
      {{< tabs >}}
{{% tab "JavaScript のコード内" %}}

```js
// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init({
  appsec: true
})
```

{{% /tab %}}
{{% tab "TypeScript のコード内" %}}

EcmaScript モジュール構文をサポートする TypeScript およびバンドラーの場合、正しいロード順序を維持するために、別のファイルでトレーサーを初期化します。
```typescript
// server.ts
import './tracer'; // インスツルメントされたいずれのモジュールのインポートより前である必要があります。

// tracer.ts
import tracer from 'dd-trace';
tracer.init({
  appsec: true
}); // ホイストを避けるため異なるファイルで初期化。
export default tracer;
```
If the default config is sufficient, or all configuration is done through environment variables, you can also use `dd-trace/init`, which loads and initializes in one step.
```typescript
import `dd-trace/init`;
```
{{% /tab %}}

{{< /tabs >}}

**または** Node.js の `--require` オプションを使用してコマンドラインで APM ライブラリを初期化する場合
   ```shell
   node --require dd-trace/init app.js
   ```
そして、環境変数を使って ASM を有効にします。
   ```shell
   DD_APPSEC_ENABLED=true node app.js
   ```
この方法は、サービスの実行場所によって異なります。
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

コード内で ASM を初期化するか、サービス起動時に環境変数 `DD_APPSEC_ENABLED` を `true` に設定します。
```shell
DD_APPSEC_ENABLED=true node app.js
```

{{% /tab %}}
{{< /tabs >}}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}


さらにサポートが必要な場合は、[Datadog サポート][6]にお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[2]: /security/application_security/enabling/compatibility/nodejs
[3]: /security/application_security/enabling/compatibility/nodejs#asm-capabilities-support
[4]: /agent/versions/upgrade_between_agent_minor_versions/
[5]: https://app.datadoghq.com/security/appsec/vm
[6]: /help
