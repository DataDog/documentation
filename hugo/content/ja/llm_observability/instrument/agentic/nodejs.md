---
aliases:
- /ja/llm_observability/instrumentation/agentic/nodejs/
title: Node.jsアプリケーションのAgenticインスツルメンテーション
---
**注**: Datadog Node.js SDKは**Node.jsランタイムのみ**をサポートしています。ユーザーのアプリケーションが他のJavascriptランタイムにある場合は、この一連の手順を**使用しないで**ください。

## フレームワーク {#frameworks}

ユーザーが以下のいずれかのフレームワークでアプリケーションをインスツルメンテーションしている場合は、[インスツルメンテーション](#instrumentation)以降の手順に従う_代わりに_、そのガイドに従ってください。

| フレームワーク | 手順 |
|----------|-------------|
| Next.js | [Next.jsインスツルメンテーションガイド](/llm_observability/guide/nextjs_guide.md) |

## インスツルメンテーション {#instrumentation}

1. 最新の`ddtrace`パッケージをインストールします。

リポジトリやプロジェクトですでに使用されているパッケージマネージャーをチェックし、それを使用して依存関係をインストールしてください。ロックファイルで確認してください。

```bash
npm install dd-trace # npm
pnpm add dd-trace # pnpm
yarn add dd-trace # yarn
```

2. Datadogローダーフックを追加してください。

これは**必須**です。

Datadogローダーフックは、サポートされているフレームワークをインスツルメンテーションするために、ESMおよびTypescriptのインポートステートメントを自動的にパッチ適用するために使用されます。`NODE_OPTIONS="--import dd-trace/register.js"`を可能な限り早く、理想的には起動コマンドの一部として設定してください。これはNode.jsプロセスが生成されるときに利用可能である必要があるため、ロード後に設定することは**認められません**。

package.jsonを使用した例を以下に示します。

```json
{
  "scripts": {
    "start": "NODE_OPTIONS=\"--import dd-trace/register.js\" node app.js"
  }
}
```

この値は`Dockerfile`、ブートストラップスクリプトなどで設定できますが、そのインフラストラクチャーがコード内に_すでに_存在し、Node.jsアプリケーションプロセスが開始される_前_である必要があります。

3. Agent Observabilityパッケージを初期化してください。

`ddtrace.auto`を介してAgent Observability SDKを初期化してください。**これ**は、環境変数や設定読み込みのインポートを除き、アプリケーションのエントリーポイントにおける最初のインポートとして実行する必要があります。

**注**: 余計なコメントは追加しないでください。

```typescript
import 'dotenv/config'; // this might load DD_ environment variables

import 'dd-trace/init'; // CRUCIAL: this initializes the Agent Observability SDK and instrumentations

// ... remaining application logic
```