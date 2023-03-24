---
aliases:
- /ja/security_platform/application_security/getting_started/nodejs
- /ja/security/application_security/getting_started/nodejs
code_lang: nodejs
code_lang_weight: 50
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentation
  text: トレースへのユーザー情報追加
- link: https://github.com/DataDog/dd-trace-js
  tag: GitHub
  text: Node.js Datadog ライブラリソースコード
- link: /security/default_rules/#cat-application-security
  tag: Documentation
  text: すぐに使える Application Security Management ルール
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Application Security Management のトラブルシューティング
kind: documentation
title: NodeJs の ASM を有効にする
type: multi-code-lang
---

Docker、Kubernetes、AWS ECS、AWS Fargate で動作する Node.js アプリのアプリケーションセキュリティを監視することができます。

{{% appsec-getstarted %}}

{{% appsec-getstarted-with-rc %}}

## 詳細はこちら

1. **Datadog Node.js ライブラリパッケージをバージョン 2.23.0 (NodeJS 12+ の場合) または 3.10.0 (NodeJS 14+ の場合) に更新します** (以下のいずれかのコマンドを実行)。
   ```shell
   npm install dd-trace@^2.23.0
   npm install dd-trace@^3.10.0
   ```
   または、以前にインストールした 1.x バージョンから更新するには
   ```shell
   npm install dd-trace@2
   ```
   ライブラリを 1.x から 2.x にアップグレードした場合、この[移行ガイド][1]を使用して、破壊的な変更を評価することができます。

   Application Security Management は、Express v4+ および NodeJS v12.17.0+ と互換性があります。詳細については、[互換性][2]を参照してください。

2. **APM 用の Node.js ライブラリをインポートして初期化する場合は、ASM も有効にしてください。**これは、コードの中か、環境変数の中か、どちらかでしょう。コードで APM を初期化した場合は、init 文に `{appsec: true}` を追加してください。
      {{< tabs >}}
{{% tab "JavaScript のコード内" %}}

```js
// この行は、インスツルメントされたいずれのモジュールのインポートより前である必要があります。
const tracer = require('dd-trace').init()
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
デフォルトのコンフィギュレーションで十分な場合、またはすべてのコンフィギュレーションが環境変数を介して行われる場合は、`dd-trace/init` を使用することもできます。これは 1 つのステップでロードおよび初期化されます。
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

{{< tabs >}}

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

コード内で ASM を初期化するか、サービス起動時に環境変数 `DD_APPSEC_ENABLED` を `true` に設定します。
```shell
DD_APPSEC_ENABLED=true node app.js
```

{{% /tab %}}
{{< /tabs >}}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln.mp4" alt="シグナルエクスプローラーとその詳細、脆弱性エクスプローラーとその詳細をビデオでご紹介しています。" video="true" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[2]: /ja/security/application_security/setup_and_configure/?code-lang=nodejs#compatibility