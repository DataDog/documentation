---
app_id: rum-react
app_uuid: e112aa24-4dc9-465f-9f23-c1284c4d0d63
assets: {}
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
- network
- tracing
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rum_react/README.md
display_on_public_website: true
draft: false
git_integration_title: rum_react
integration_id: rum-react
integration_title: React
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rum_react
public_title: React
short_description: Datadog RUM を使用して React アプリケーションを監視し、メトリクスを生成します
supported_os:
- android
- linux
- windows
- ios
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Network
  - Category::Tracing
  - Supported OS::Android
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::iOS
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Datadog RUM を使用して React アプリケーションを監視し、メトリクスを生成します
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: React
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Datadog RUM React インテグレーションにより、次の方法で React コンポーネント内のパフォーマンス問題を迅速に解決できます:

- サーバーの応答時間の遅延、レンダー ブロッキング リソース、コンポーネント内部のエラーなど、パフォーマンス ボトルネックの根本原因をデバッグします
- Web パフォーマンス データを、ユーザー ジャーニー、HTTP コール、ログと自動的に相関付けます
- 重要な Web パフォーマンス メトリクス (たとえば Core Web Vitals) がユーザー体験を損なうしきい値を下回ったときに、エンジニアリング チームへアラートを送信します

次の方法で React アプリケーションをエンド ツー エンドで監視します:

- スタック全体にわたるユーザー ジャーニーを追跡して可視化します
- 読み込み時間の遅さの根本原因をデバッグします。原因は React コード、ネットワーク パフォーマンス、または基盤インフラストラクチャーにある可能性があります
- ユーザー ID、メール、名前などの属性で、すべてのユーザー セッションを分析して文脈化します
- フロント エンド と バック エンド の開発チーム向けに、フル スタック監視を 1 つのプラットフォームに統合します

## セットアップ

まず、React アプリケーションに [Datadog RUM][1] をセットアップします。Datadog App で新しい RUM アプリケーションを作成する場合は、アプリケーション タイプとして React を選択します。すでに既存の RUM アプリケーションがある場合は、そのタイプを React に更新できます。構成後、Datadog App が、[RUM-React プラグイン][2] を Browser SDK と統合する手順を提供します。

## エラー トラッキング

React コンポーネントのレンダリング エラーを追跡するには、次のいずれかを使用します:

- エラーを捕捉して Datadog に報告する `ErrorBoundary` コンポーネント ([React ドキュメント][3] を参照)。
- 独自の `ErrorBoundary` コンポーネントからエラーを報告するために使用できる関数。

#### `ErrorBoundary` の使用

```javascript
import { ErrorBoundary } from '@datadog/browser-rum-react'

function App() {
  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <MyComponent />
    </ErrorBoundary>
  )
}

function ErrorFallback({ resetError, error }) {
  return (
    <p>
      Oops, something went wrong! <strong>{String(error)}</strong> <button onClick={resetError}>Retry</button>
    </p>
  )
}
```

### 独自の `ErrorBoundary` から React エラーを報告する

```javascript
import { addReactError } from '@datadog/browser-rum-react'

class MyErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    addReactError(error, errorInfo)
  }

  render() {
    ...
  }
}
```

## React Router インテグレーション

`react-router` v6 では、次の方法でルートを宣言できます:

- [`createMemoryRouter`][4]、[`createHashRouter`][5]、または [`createBrowserRouter`][6] 関数でルーターを作成します。
- [`useRoutes`][7] フックを使用します。
- [`Routes`][8] コンポーネントを使用します。

Datadog RUM Browser SDK でルート変更を追跡するには、まず `router: true` オプションで `reactPlugin` を初期化し、その後、これらの関数を `@datadog/browser-rum-react/react-router-v6` から提供される同等の関数に置き換えます。例:

```javascript
import { RouterProvider } from 'react-router-dom'
import { datadogRum } from '@datadog/browser-rum'
import { reactPlugin } from '@datadog/browser-rum-react'
// react-router-dom の代わりに、@datadog/browser-rum-react/react-router-v6 の "createBrowserRouter" を使用します:
import { createBrowserRouter } from '@datadog/browser-rum-react/react-router-v6'

datadogRum.init({
  ...
  plugins: [reactPlugin({ router: true })],
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    ...
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
```

## Datadog React インテグレーションのさらなる活用

### トレース

RUM とトレース データを接続して、アプリケーションのパフォーマンスを包括的に可視化します。[RUM と Traces を接続][9] を参照してください。

### ログ

React アプリケーションのログを Datadog に転送するには、[JavaScript ログ 収集][10] を参照してください。

### メトリクス

RUM アプリケーションからカスタム メトリクスを生成するには、[メトリクス 生成][11] を参照してください。

## トラブル シューティング

お困りの際は、[Datadog サポート][12] へご連絡ください。

## 参考資料

お役に立つドキュメント、リンクや記事:

- [React Monitoring][13]

[1]: https://docs.datadoghq.com/ja/real_user_monitoring/browser/setup/client
[2]: https://www.npmjs.com/package/@datadog/browser-rum-react
[3]: https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
[4]: https://reactrouter.com/en/main/routers/create-memory-router
[5]: https://reactrouter.com/en/main/routers/create-hash-router
[6]: https://reactrouter.com/en/main/routers/create-browser-router
[7]: https://reactrouter.com/en/main/hooks/use-routes
[8]: https://reactrouter.com/en/main/components/routes
[9]: https://docs.datadoghq.com/ja/real_user_monitoring/platform/connect_rum_and_traces/?tab=browserrum
[10]: https://docs.datadoghq.com/ja/logs/log_collection/javascript/
[11]: https://docs.datadoghq.com/ja/real_user_monitoring/generate_metrics
[12]: https://docs.datadoghq.com/ja/help/
[13]: https://www.datadoghq.com/blog/datadog-rum-react-components/