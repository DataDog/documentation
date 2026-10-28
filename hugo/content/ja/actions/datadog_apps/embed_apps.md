---
description: 公開済みの Datadog アプリを、ダッシュボード、ノートブック、Internal Developer Portal のホームページ、およびカタログのサイドパネルに埋め込みます。
further_reading:
- link: /actions/datadog_apps/
  tag: ドキュメント
  text: Datadog Apps
- link: /actions/app_builder/embedded_apps/
  tag: ドキュメント
  text: App Builder アプリを埋め込む
- link: https://www.npmjs.com/package/@datadog/apps-frontend
  tag: 外部サイト
  text: npm 上の @datadog/apps-frontend パッケージ
title: アプリを埋め込む
---
{{< callout url="https://www.datadoghq.com/product-preview/apps/" btn_hidden="false" header="プレビューに参加しましょう。">}}
Datadog Apps はプレビュー版です。このフォームを使用してアクセスをリクエストしてください。
{{< /callout >}}

[Datadog アプリ][1]を他の Datadog 製品に埋め込むことで、ユーザーが問題を調査してアクションを実行する画面に直接運用ツールを配置できます。埋め込みアプリは、既存のエクスペリエンスを表示したり、ダッシュボードのタイムレンジやテンプレート変数などのホストから提供されるライブコンテキストに応答したりできます。

## 前提条件{#prerequisites}

- 構築済み、アップロード済み、および公開済みの Datadog アプリ
- アプリを使用して送信先の領域を編集する権限

アプリの構築、アップロード、公開に関する詳細については、[Datadog アプリ][1]を参照してください。

## アプリを埋め込む {#embed-an-app}

<div class="alert alert-info">アプリは Datadog UI にのみ埋め込むことができます。AI エージェントはアプリを埋め込むことができません。</div>

アプリをアップロードして公開した後、アプリを変更することなく、サポートされている Datadog の画面に追加できます。

アプリ自体から、またはアプリを表示させたい領域から、アプリを埋め込むことができます。

### アプリから埋め込む {#embed-from-the-app}

1. [アプリリスト][2]で、埋め込みたい公開済みのアプリを開きます。
1. ページ上部にある [**+ Add to Dashboard**] をクリックするか、その横にある下矢印をクリックして、メニューから送信先タイプを選択します。
1. 送信先を選択し、[**保存**] をクリックします。

### 送信先から埋め込む {#embed-from-the-destination}

{{< tabs >}}
{{% tab "Dashboard" %}}

1. アプリを追加したいダッシュボードを開きます。
1.  [**Add Widgets**] をクリックしてウィジェットトレイを開きます。
1. **Apps** タブを選択し、**Apps** ウィジェットをダッシュボードにドラッグします。
1. エディターで、**Select app** ドロップダウンからアプリを選択します。所有するアプリのみにリストを制限するには、**My Apps Only** を有効にします。
1. ウィジェットのサイズを変更し、ダッシュボードを保存します。

{{% /tab %}}
{{% tab "ノートブック" %}}

1. アプリを追加したいノートブックを開きます。
1. セルを追加し、**アプリ**セルタイプを選択します。
1. ドロップダウンからアプリを選択します。
1. ノートブックを保存します。

**アプリ**セルは、ノートブックのタイムレンジを使用します。アプリでタイムレンジを読み取るには、`datadogNotebook` 入力を使用します。

{{% /tab %}}
{{% tab "カタログ" %}}

1. [カタログ][1]に移動し、サービスを選択します。
1. サービスのサイドパネルで、**+ アプリを追加**タブを選択します。
1. ドロップダウンからアプリを選択します。所有するアプリのみにリストを制限するには、**My Apps Only** を有効にします。

[1]: https://app.datadoghq.com/services

{{% /tab %}}
{{< /tabs >}}

アプリを埋め込んだ後、必要に応じて[アプリを構成](#customize-the-embedded-experience)し、ホストのコンテキスト、テーマ、または共有リンクの状態に応答するようにします。次に、[それを検証](#verify-the-app)します。埋め込みアプリには最新の公開バージョンが表示されるため、埋め込む前に変更を公開してください。

## 埋め込みエクスペリエンスをカスタマイズする {#customize-the-embedded-experience}

アプリに [`@datadog/apps-frontend`][3] パッケージをインストールしていない場合は、インストールします。

```shell
npm install @datadog/apps-frontend
```

埋め込みアプリを Datadog ホストに応答させるには、アプリケーションルートで `DatadogAppProvider` を保持します。プロバイダーは Datadog ホストとの通信を確立し、ホスト入力をフックで利用可能にし、共有 Datadog リンク内のアプリの URL 状態を保持します。

```typescript
import { DatadogAppProvider } from '@datadog/apps-frontend/embedding/react';

export function Root() {
  return (
    <DatadogAppProvider>
      <App />
    </DatadogAppProvider>
  );
}
```

標準の Datadog Apps スキャフォールドには、デフォルトでこのプロバイダーが含まれています。すべての `@datadog/apps-frontend` フックはその下にレンダリングされる必要があるため、アプリを再構築する際はプロバイダーをそのまま保持してください。

### ホスト入力を読み取る {#read-host-inputs}

ホスト入力とは、アプリを含む Datadog 製品によって提供される値と関数です。たとえば、ダッシュボードは現在のタイムレンジとテンプレート変数を提供することができ、カタログサイドパネルは表示しているサービスを提供することができます。

ホスト値は、周囲の製品コンテキストが変更されると自動的に更新されます。

`useDatadogAppInput` および関連する製品サーフェスの入力スキーマをインポートします。

```typescript
import { useDatadogAppInput } from '@datadog/apps-frontend/inputs/react';
import {
  datadogDashboard,
  datadogIdp,
  datadogNotebook,
  datadogServicePanel,
  datadogTheme,
} from '@datadog/apps-frontend/inputs/schema';
```

完全な TypeScript 定義については、[npm の`@datadog/apps-frontend` ソース][4]を参照してください。

#### 入力状態 {#input-states}

`useDatadogAppInput` は、`status` が `pending`、`ready`、`unavailable`、または `failed` である状態オブジェクトを返します。値は、ステータスが `ready` の場合にのみ `fields` で利用可能です。

`unavailable`はエラーではなく正常な結果です。これは、ノートブック内で `datadogDashboard` を読み取るなど、その入力が提供されないサーフェス上でアプリが実行されていることを意味します。このケースではフォールバックをレンダリングしてください。

例:

```typescript
function PanelHeader() {
  const panel = useDatadogAppInput(datadogServicePanel);

  switch (panel.status) {
    case 'pending':
      return <Spinner />;
    case 'unavailable':
      return <p>Open this app from a Catalog side panel.</p>;
    case 'failed':
      return <p>{panel.error.message}</p>;
    case 'ready':
      return (
        <header>
          {panel.fields.service}
          <button onClick={() => panel.fields.close()}>×</button>
        </header>
      );
  }
}
```

### 利用可能な入力 {#available-inputs}

{{< tabs >}}
{{% tab "テーマ" %}}

`datadogTheme` を使用して、Datadog ホストが現在使用しているテーマに応答します。

```typescript
const theme = useDatadogAppInput(datadogTheme);
```

ステータスが `ready` の場合、`fields` は以下を提供します。

```typescript
{
  theme: 'light' | 'dark';
}
```

ユーザーが Datadog のテーマを変更すると、値が更新されます。

アプリが [DRUIDS][1] を使用している場合は、`DruidsEnvironmentWithThemeInput` を使用してホストのテーマを自動的に適用できます。

```typescript
import { DruidsEnvironmentWithThemeInput } from '@datadog/apps-frontend/druids/react';

<DatadogAppProvider>
  <DruidsEnvironmentWithThemeInput defaultThemePreference="light">
    <App />
  </DruidsEnvironmentWithThemeInput>
</DatadogAppProvider>
```

[1]: /ja/actions/datadog_apps/#ui-components

{{% /tab %}}
{{% tab "Dashboard" %}}

`datadogDashboard` を使用して、ダッシュボードの現在のタイムレンジとテンプレート変数を読み取ります。

```typescript
const dashboard = useDatadogAppInput(datadogDashboard);
```

ステータスが `ready` の場合、`fields` は以下を提供します。

```typescript
{
  dashboard: {
    timeframe: {
      start: number;
      end: number;
      isLive: boolean;
    };
    templateVariables: {
      name: string;
      value: string;
      values?: string[];
      prefix?: string;
      default?: string;
    }[];
  };
}
```

タイムレンジを使用して、アプリのクエリをダッシュボードにスコープします。テンプレート変数を使用して、周囲のダッシュボードで使用されているものと同じサービス、環境、チーム、またはその他のフィルターを適用します。

{{% /tab %}}
{{% tab "ノートブック" %}}

`datadogNotebook` を使用して、ノートブックの現在のタイムレンジとテンプレート変数を読み取ります。

```typescript
const notebook = useDatadogAppInput(datadogNotebook);
```

ステータスが `ready` の場合、`fields` は以下を提供します。

```typescript
{
  notebook: {
    timeframe: {
      start: number;
      end: number;
      isLive: boolean;
    };
    templateVariables: {
      name: string;
      value: string;
      values?: string[];
      availableValues?: string[];
      prefix?: string;
      default?: string;
    }[];
  };
}
```

このコンテキストを使用して、アプリをノートブックに適用されているタイムレンジおよびフィルターと同期させます。

{{% /tab %}}
{{% tab "IDP ホームページ" %}}

`datadogIdp` を使用して、Internal Developer Portal ホームページ上のアプリの位置を読み取り、変更します。

```typescript
const idp = useDatadogAppInput(datadogIdp);
```

ステータスが `ready` の場合、`fields` は以下を提供します。

```typescript
{
  position: number;
  move: (inputs: { delta: number }) => number;
}
```

`position` を使用して、ホームページ上のアプリの現在の位置を読み取ります。アプリを複数の位置に移動させるには、`move()` を呼び出します。これにより、アプリの新しい位置が決定されます。

```typescript
const newPosition = await idp.fields.move({ delta: 1 });
```

{{% /tab %}}
{{% tab "カタログサイドパネル" %}}

`datadogServicePanel` を使用して、カタログサイドパネルに表示されているサービスを特定します。

```typescript
const servicePanel = useDatadogAppInput(datadogServicePanel);
```

ステータスが `ready` の場合、`fields` は以下を提供します。

```typescript
{
  service: string;
  close: () => undefined;
}
```

`service` を使用して、アプリのコンテンツを選択されたサービスにスコープします。アプリのアクションでサイドパネルを閉じる必要がある場合は、`close()` を呼び出します。

{{% /tab %}}
{{< /tabs >}}

ある製品サーフェスで利用可能な入力が別の製品サーフェスでも利用可能であるとは限りません。アプリが必要とするコンテキストのみをリクエストし、そのコンテキストが存在しない場合は有用なエクスペリエンスを提供してください。

## 共有リンクで状態を保持する {#preserve-state-in-shared-links}

`DatadogAppProvider` は、共有された Datadog リンク内でアプリのクエリ文字列と URL フラグメントを保持します。選択されたサービス、フィルター、レコード、アプリ内ルートなどの共有可能な状態を URL に保存します。別のユーザーが共有リンクを開くと、埋め込みアプリは同じ状態を復元できます。[ディープリンク][5]は、アプリが `DatadogAppProvider` でラップされたままである限り、追加設定なしで特定のアプリ状態に対して機能します。

## アプリを確認する {#verify-the-app}

アプリを埋め込んだ後、埋め込み先のサーフェスで以下をチェックします。

- **アクセス**: アプリを使用する権限はあるもののアプリを埋め込んでいないユーザーとしてサーフェスを開きます。権限エラーではなくアプリがレンダリングされます。
- **サイズ**: アプリのサイズを、ユーザーが設定すると予想される最小サイズに変更します。コンテンツはオーバーフローやクリッピングが発生することなく読み取り可能な状態を維持します。
- **ホストコンテキスト**: ダッシュボードのタイムレンジやテンプレート変数の値などホストのコンテキストを変更して、アプリの更新を確認します。アプリが代わりに `unavailable` フォールバックをレンダリングする場合は、サーフェスが提供していない入力を読み取っています。
- **共有リンク**: アプリ内の状態を変更し、Datadog の共有リンクをコピーし、新しいブラウザセッションで開きます。アプリが同じ状態に復元されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/actions/datadog_apps/
[2]: https://app.datadoghq.com/app-builder/apps/list
[3]: https://www.npmjs.com/package/@datadog/apps-frontend
[4]: https://www.npmjs.com/package/@datadog/apps-frontend?activeTab=code
[5]: /ja/actions/datadog_apps/#share-embedded-app-state-with-deep-links