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

Docker、Kubernetes、Amazon ECS、AWS Fargate で実行されている Node.js アプリのアプリケーションセキュリティを監視することができます。

{{% appsec-getstarted %}}

{{% appsec-getstarted-with-rc %}}

## 脅威検出を有効にする
### はじめに

1. 以下のコマンドのいずれかを実行して、**Datadog Node.js ライブラリパッケージを少なくともバージョン 2.23.0 (NodeJS 12+ の場合) または 3.10.0 (NodeJS 14+ の場合) に更新します**。
   ```shell
   npm install dd-trace@^2.23.0
   npm install dd-trace@^3.10.0
   ```
   または、以前にインストールした 1.x バージョンから更新するには
   ```shell
   npm install dd-trace@2
   ```
   ライブラリを 1.x から 2.x にアップグレードした場合は、この[移行ガイド][1]を使用して破壊的変更を評価してください。

   Application Security Management は、Express v4+ および NodeJS v12.17.0+ と互換性があります。詳細については、[互換性][2]を参照してください。

2. **APM 用の Node.js ライブラリをインポートして初期化する場合は、ASM も有効にしてください。**これは、コードの中か、環境変数の中か、どちらかでしょう。コードで APM を初期化した場合は、init 文に `{appsec: true}` を追加してください。
      {{< tabs >}}
{{% tab "JavaScript のコード内" %}}

```js
// この行は、インスツルメントされたいずれのモジュールのインポートより前である必要があります。
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
デフォルトの構成で十分であるか、またはすべての構成が環境変数を通じて行われる場合は、`dd-trace/init` を使用してもよく、これにより一度にロードと初期化が行えます。
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

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln.mp4" alt="シグナルエクスプローラーとその詳細、脆弱性エクスプローラーとその詳細をビデオでご紹介しています。" video="true" >}}

## コードレベルの脆弱性検出の有効化
[コードレベルの脆弱性検出のための Vulnerability Management をサポートするトレーシングライブラリのバージョン][3]を実行しているサービスでは、`DD_IAST_ENABLED=true` 環境変数に設定してサービスを再起動することで機能を有効にしてください。


サービスにコードレベルの脆弱性検出機能を活用するには

1. [Datadog Agent][4] をバージョン 7.41.1 以上に更新します。
2. トレーシングライブラリを、コードレベルの脆弱性検出を有効にするために必要な最小限のバージョンに更新します。詳しくは、[ASM 機能サポート][3]を参照してください。
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
ENV DD_IAST_ENABLED=true=true
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
5. コードレベルの脆弱性に対する Application Vulnerability Management の機能を実際に確認するには、サービスをブラウズし、[Vulnerability Explorer][5] でコードレベルの脆弱性が表示されるのを確認します。`SOURCE` 列には Code の値が表示されます。

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