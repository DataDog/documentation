---
aliases:
- /ja/internal_developer_portal/plugins/
description: React、バックエンド関数、および CLI を使用したコードベースの開発ワークフローで、カスタムアプリをローカルで構築およびデプロイします。
further_reading:
- link: https://www.datadoghq.com/blog/internal-applications-datadog-apps/
  tag: ブログ
  text: Datadog Apps を使用して AI Agent から社内アプリケーションをリリース
- link: https://www.youtube.com/watch?v=HEDjpMyqkSE
  tag: ビデオ
  text: Datadog Apps デモ
- link: /actions/app_builder/
  tag: ドキュメント
  text: App Builder
- link: /actions/app_builder/embedded_apps/
  tag: ドキュメント
  text: 埋め込みアプリ
- link: /actions/app_builder/access_and_auth/
  tag: ドキュメント
  text: アクセスと認証
title: Apps
---
{{< callout url="https://www.datadoghq.com/product-preview/apps/" btn_hidden="false" header="プレビューに参加しましょう。">}}
Datadog Apps はプレビュー版です。このフォームを使用してアクセスをリクエストしてください。
{{< /callout >}}

## 概要 {#overview}

Apps を使用すると、標準的な開発ワークフローを使用して、React および TypeScript (または JavaScript) でローカルでアプリケーションをコードとして構築できます。

Apps は [App Builder アプリ][2] と同じ [権限モデル][1] を使用します。また、他の Datadog 製品 ([ダッシュボードや Internal Developer Portal][3] など) に埋め込むこともできます。

以下が必要な場合には Apps を選択してください。

- **チームコラボレーション**: 複数のエンジニアが、既存のソースコントロールによるコードレビューとバージョン履歴を使用して、同じアプリに貢献する。
- **ソースコントロールと CI/CD**: アプリを GitHub に保存し、マージ時に自動的にデプロイする。
- **AI 支援開発**: お好みのローカルツール (Cursor、GitHub Copilot、Claude など) を使用して、コードを生成および改善する。
- **カスタムクラウドプロバイダーと API**: 独自のバックエンドコードを使用して、[Action Catalog][4] 以外のサービスと統合する。
- **複雑な UI とロジック**: コンポーネント、状態、レンダリングを React と TypeScript で完全に制御する。

## 前提条件 {#prerequisites}

- **Node.js バージョン 20.12.0 以降**。ご使用のバージョンをご確認ください。
  ```shell
  node --version
  ```
- オプション: Datadog **API キー**と、[アクション API アクセス][5] が有効な**アプリケーションキー**。API キーによるビルドテレメトリ (ビルドメトリクスおよび Error Tracking ソースマップアップロード) および CI/CD アップロードに必要です。手順については、[API キーとアプリケーションキー][6] を参照してください。

  アプリケーションキーでアクション API アクセスを有効にするには、次のようにします。

  1. [**[Organization Settings] (オーガニゼーション設定) > [Application Keys] (アプリケーションキー)**][7] に移動します。
  1. アプリケーションキーを選択します。
  1. **アクション API アクセス**を有効にします。

## アプリのスキャフォールディング {#scaffold-an-app}

1. アプリを作成するスキャフォールディングコマンドを実行します。
   ```shell
   npm create @datadog/apps@latest
   ```
2. 対話型のプロンプトに従って、アプリ名とテンプレートを構成します。

### 生成されたアプリの構造 {#generated-app-structure}

スキャフォールディングされたプロジェクトには以下が含まれます。

| ファイルまたはディレクトリ | 説明 |
|---|---|
| `src/App.tsx` | ルート UI コンポーネント (React) |
| `src/**/*.backend.ts` | [Datadog コネクション][8] にアクセスしてサーバー側で実行されるバックエンド関数 |
| `vite.config.ts` | [`@datadog/vite-plugin`][9] が事前設定されたビルド構成 |
| `package.json` | 依存関係とスクリプト (`dev`、`build`、`upload`) |

## スキルの使用`datadog-app`{#use-the-datadog-app-skill}

[`datadog-app` エージェントスキル][20] は、スキャフォールディング、ローカル開発、アップロード、公開、CI/CD、トラブルシューティング、DDSQL、Action Catalog の使用など、Datadog Apps のワークフローに関するガイダンスを AI コーディングエージェントに提供します。このスキルは、[agent-skills GitHub リポジトリ][21] で入手できます。

### インストール {#install}

```shell
npx skills add datadog-labs/agent-skills \
  --skill datadog-app \
  --full-depth -y
```

`skills` CLI では、Claude Code、Codex、Cursor、Gemini CLI、OpenCode、およびその他のコーディングエージェントがサポートされています。特定のエージェントをターゲットにするには、[skills CLI ドキュメント][22] を参照してください。インストール後にスキルが表示されない場合は、コーディングエージェントを再起動してください。

### プロンプトの例 {#example-prompts}

- `Scaffold a Datadog App called my-app.`
- `Run this Datadog App locally.`
- `Upload and publish this Datadog App.`
- `Set up CI/CD for this Datadog App.`
- `Troubleshoot this Datadog App authentication error.`
- `Add a table component to this Datadog App using Druids.`

## アプリをローカルで開発する {#develop-your-app-locally}

1. 開発サーバーを起動します。
   ```shell
   npm run dev
   ```
2. ターミナルに表示される URL (例: `http://localhost:5173/`) を開き、アプリをプレビューします。

開発サーバーが Datadog を呼び出す必要がある場合 (ローカルでバックエンド関数を実行する場合など)、デフォルトで OAuth が使用されます。認証が必要な場合、コマンドによってブラウザのプロンプトが開きます。認証が完了すると、トークンはオペレーティングシステムの資格情報ストアにキャッシュされます。

`DD_API_KEY` と `DD_APP_KEY` の両方を設定すると、生成されたアプリは OAuth の代わりにそれらのキーを使用します。

### バックエンド関数 {#backend-functions}

`*.backend.ts` または `*.backend.js` に一致するファイルには、バックエンド関数が含まれています。バックエンド関数は、[コネクション][8] にアクセスしてサーバー側で実行されます。フロントエンドは、標準の ES モジュールのようにバックエンド関数をインポートして呼び出します。

バックエンド関数は、[`@datadog/action-catalog`][10] ライブラリを介して Datadog の [Action Catalog][4] 内のアクションを呼び出すことができます。Action Catalog は、クラウドプロバイダー、SaaS ツール、および Datadog API を操作するための再利用可能な構築済みアクションを提供します。API クライアントをゼロから作成する代わりに、既存のインテグレーションを利用して構築できます。

このライブラリは、完全に型付けされた TypeScript クライアントであり、AWS、Azure、GCP、Datadog API、GitHub、GitLab、Slack、Jira、PagerDuty、ServiceNow、OpenAI、Anthropic、および汎用 HTTP などのインテグレーションをラップします。`@datadog/action-catalog` からアクションをインポートすると、各アクションの型付けされた入力と応答を得ることができます。

バックエンドユーティリティは、[@datadog/apps-backend][24] パッケージから表示できます。ユーティリティを使用して、呼び出し元ユーザーの情報の取得などの一般的なアクションを支援します。

   ```
import { getInitiatingUser, type User } from '@datadog/apps-backend/user';

export async function getCurrentUser(): Promise<User> {
    return getInitiatingUser();
}
   ```

{{% collapse-content title="バックエンド関数の例" level="h4" expanded=false %}}

Action Catalog を使用してホストを一覧表示するバックエンド関数を作成します。

**src/listHosts.backend.ts**

```typescript
import { listHosts, type ListHostsResponse } from '@datadog/action-catalog/dd/hosts';

export async function getHosts(filter?: string): Promise<ListHostsResponse> {
    const response = await listHosts({
        inputs: {
            filter: filter ?? '*',
            count: 10,
            include_hosts_metadata: true,
        },
    });
    return response;
}
```

次に、アプリの `App.tsx` からこれを呼び出します。

**src/App.tsx**

```tsx
import { useState, useEffect } from 'react';
import { getHosts } from './listHosts.backend';

function App() {
    const [hostCount, setHostCount] = useState<number>(0);

    useEffect(() => {
        getHosts().then((response) => {
            setHostCount(response.host_list?.length ?? 0);
        });
    }, []);

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Welcome to my-app</h1>
            <p>Monitoring {hostCount} hosts</p>
        </div>
    );
}

export default App;
```
{{% /collapse-content %}}

### UI コンポーネント {#ui-components}

[`@datadog/druids`][23] を使用して、Datadog 製品全体で使用されているものと同じ React コンポーネント (テーブル、ボタン、チャート、フォームなど) でアプリの UI を構築します。Druids を使用して構築することで、アプリの見た目と操作感を他の Datadog 製品と統一できます。

ライブラリをインストールします。

```shell
npm install @datadog/druids
```

他の React コンポーネントと同じ方法でコンポーネントをインポートします。

```tsx
import { Button } from '@datadog/druids';
```

Druids は、ピア依存関係として React 18 または 19 を必要とします。利用可能なコンポーネントのセットについては、[npm のパッケージ][23] を参照してください。

<div class="alert alert-info">
Druids コンポーネントは、Datadog Apps および App Builder でのみ使用できます。詳細については、パッケージのライセンスを参照してください。
</div>

## アプリのビルドとアップロード {#build-and-upload-your-app}

`npm run build` を使用して、アプリをローカルで作成します (アップロードは行いません)。これはローカル開発における推奨されるデフォルトです。ローカル開発では通常、すべてのビルドをアップロードする必要はありません。

`npm run upload` を使用してアプリをビルドし、Datadog にアップロードします。これは、`DD_APPS_UPLOAD_ASSETS=1` を指定した `vite build` を実行します。

```shell
npm run upload
```

アップロードではデフォルトで OAuth が使用されます。初回にブラウザの認証フローが開く場合があります。`DD_API_KEY` と `DD_APP_KEY` の両方を設定した場合、アップロードでは代わりに API キーとアプリケーションキー認証が使用されます。

次の環境変数が利用可能です。

| 変数 | 説明 |
|---|---|
| `DD_API_KEY` | オプション。ローカルの開発とアップロードで `DD_APP_KEY` とともに使用される Datadog API キー。また、ビルドメトリクスや Error Tracking のソースマップアップロードなど、API キーによるビルドテレメトリも有効になります。|
| `DD_APP_KEY` | オプション。ローカルの開発およびアップロードで `DD_API_KEY` とともに使用されるアプリケーションキー。|
| `DD_APPS_AUTH_METHOD` | オプション。生成されたアプリの認証方法をオーバーライドするには、`oauth` または `apiKey` に設定します。|
| `DD_APPS_VERSION_NAME` | オプション。アップロードされたアプリバージョンのバージョン名。アプリごとに一意の文字列である必要があります。設定されていない場合、Datadog がバージョン名を割り当てます。|
| `DD_APPS_UPLOAD_ASSETS` | 設定すると、ビルドされたアセットが Datadog にアップロードされます。`npm run upload` によって自動的に設定されます。|

本番環境へのデプロイには、[GitHub Actions を使用して CI/CD を設定します](#set-up-cicd-with-github-actions)。[`DataDog/apps-github-action`][11] がアップロードステップを自動的に処理します。

アップロードが成功すると、Datadog でアプリにアクセスできる URL がビルド出力に表示されます。

## アプリの公開と管理 {#publish-and-manage-your-apps}

アップロードしたアプリは、[App Builder][12] のアプリリストに表示されます。App Builder から以下の操作を実行できます。

- [アプリを公開する][13]
- [アプリ名と説明を編集する][13]
- [権限][14] を管理する
- ダッシュボード、ノートブック、Internal Developer Portal に [アプリを埋め込む][3]

<div class="alert alert-danger">
以下の App Builder 機能は、ローカルでビルドされたアプリでは利用できません。
<ul>
<li>ドラッグアンドドロップコンポーネントによる UI 編集</li>
<li>App Builder UI で管理される変数、イベント、および式</li>
</ul>
アプリの UI やロジックを変更するには、ローカルプロジェクトのコードを更新して再アップロードします。
</div>

## GitHub Actions を使用した CI/CD のセットアップ {#set-up-cicd-with-github-actions}

`main` ブランチへのプッシュごとにアプリを自動的にアップロードするには、[`DataDog/apps-github-action`][11] GitHub Action を使用します。このアクションはアプリをビルドして Datadog にアップロードします。

CI/CD アップロードには、API キーおよびアプリケーションキーによる認証が必要です。[アクション API アクセス][5] が有効な Datadog API キーおよびアプリケーションキーを作成し、それらを GitHub シークレットとして保存します。

オーガニゼーションが US1 (`datadoghq.com`) にない場合は、`vite.config.ts` の `auth.site` を [Datadog サイト][15] に設定してください。ビルド時にこの設定が読み込まれてアプリがアップロードされるため、同じ設定がローカル開発にも適用されます。使用している Datadog サイトは `{{< region-param key="dd_site" >}}` です。

{{< site-region region="us3,us5,eu,ap1,ap2,uk1" >}}

```ts
datadogVitePlugin({
  auth: {
    site: '<YOUR_DATADOG_SITE>',
  },
});
```
{{< /site-region >}}

アプリのリポジトリに `.github/workflows/cd.yml` を作成します。

```yaml
name: Continuous Deployment
on:
  push:
    branches:
      - main

permissions:
  contents: read

jobs:
  deploy-app:
    name: Deploy Datadog App
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write

    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Setup Node.js
        uses: actions/setup-node@v6

      - name: Deploy
        uses: DataDog/apps-github-action@v0.0.2
        with:
          datadog-api-key: ${{ secrets.DATADOG_API_KEY }}
          datadog-app-key: ${{ secrets.DATADOG_APP_KEY }}
          app-directory: .
```

## トラブルシューティング {#troubleshooting}

### 認証エラー {#authentication-errors}

ローカルでの開発とアップロードにおいて OAuth 認証エラーが発生する場合、以下のいずれかの原因が考えられます。

- OAuth ブラウザフローが完了していない。
- キャッシュされた OAuth トークンが無効である。
- `auth.site`が Datadog サイトと一致しない。

コマンドを再実行し、ブラウザの認証フローを完了してください。

API キーおよびアプリケーションキー認証を使用している場合、認証エラーは通常、資格情報が不足しているか無効であることを示しています。バックエンドの関数呼び出しの失敗は、同じ原因で発生する可能性があります。`DD_API_KEY` と `DD_APP_KEY` が設定されていること、およびアプリケーションキーで [アクション API アクセス][5] が有効になっていることを確認してください。

### ビルドは成功するが何もアップロードされない{#build-succeeds-but-nothing-uploads}

`npm run upload` を実行したこと (`npm run build`ではないこと)、および `vite.config.ts` の `dryRun` が `true` に設定されていないことを確認してください。

### スキャフォールディング中の Node.js バージョンエラー{#nodejs-version-errors-during-scaffolding}

スキャフォールディングツールを使用するには、Node.js 20.12.0 以降が必要です。サポートされているバージョンでもエラーが表示される場合は、v22 にアップグレードしてください。[nvm][16]、[Volta][17]、または [fnm][18] などのバージョンマネージャーを使用するか、[Node.js のウェブサイト][19] からダウンロードしてください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/actions/app_builder/access_and_auth/
[2]: /ja/actions/app_builder/
[3]: /ja/actions/app_builder/embedded_apps/
[4]: /ja/actions/actions_catalog/
[5]: /ja/account_management/api-app-keys/#actions-api-access
[6]: /ja/account_management/api-app-keys/
[7]: https://app.datadoghq.com/organization-settings/application-keys
[8]: /ja/actions/connections/
[9]: https://github.com/DataDog/build-plugin
[10]: https://www.npmjs.com/package/@datadog/action-catalog
[11]: https://github.com/DataDog/apps-github-action
[12]: https://app.datadoghq.com/app-builder/apps/list
[13]: /ja/actions/app_builder/build/#customize-your-app
[14]: /ja/actions/app_builder/access_and_auth/#app-permissions
[15]: /ja/getting_started/site/
[16]: https://github.com/nvm-sh/nvm
[17]: https://volta.sh
[18]: https://github.com/Schniz/fnm
[19]: https://nodejs.org
[20]: https://github.com/datadog-labs/agent-skills/tree/main/dd-apps/datadog-app
[21]: https://github.com/datadog-labs/agent-skills/blob/main/README.md
[22]: https://github.com/vercel-labs/skills
[23]: https://www.npmjs.com/package/@datadog/druids
[24]: https://www.npmjs.com/package/@datadog/apps-backend