---
kind: documentation
title: React Native Web ビュー追跡
---

## 概要

Real User Monitoring (RUM) により、React Native のハイブリッドアプリケーションの Web ビューを監視し、死角をなくすことができます。

以下を実行できます。

-   モバイルアプリケーションの Web とネイティブコンポーネントにまたがるユーザージャーニーの追跡
-   モバイルアプリケーションの Web ページやネイティブコンポーネントへのレイテンシーの根本原因を特定する
-   モバイルデバイスで Web ページの読み込みが困難なユーザーへの対応

RUM は [react-native-webview][3] を使って作成した Web ビューをサポートしています。

## セットアップ

### 前提条件

モバイル React Native アプリケーションでレンダリングしたい Web ページで RUM ブラウザ SDK を設定します。詳しくは、[RUM ブラウザモニタリング][1]をご参照ください。

[公式インストールドキュメント][4]に従って、`react-native-webview` をアプリケーションに追加します。

### Web ビューをインスツルメントする

`react-native-webview` ではなく、`@datadog/mobile-react-native-webview` から `WebView` をインポートします。

```javascript
import { WebView } from '@datadog/mobile-react-native-webview';
// または
import WebView from '@datadog/mobile-react-native-webview';
```

`@datadog/mobile-react-native-webview` の `WebView`コンポーネントは `react-native-webview` コンポーネントをラップしているので、`react-native-webview` の既存のすべての機能を使用することができます。

`WebView` コンポーネントの `allowedHosts` プロップを使用して、Datadog が追跡するホストのリストを Web ビュー内に提供します。

```javascript
<WebView
    source={{ uri: 'https://www.example.com' }}
    allowedHosts={['example.com']}
/>
```

## Web ビューにアクセスする

Web ビューは、関連する `service` と `source` 属性とともに [RUM エクスプローラー][2]に表示されます。`service` 属性は Web ビューが生成された Web コンポーネントを示し、`source` 属性は React Native などのモバイルアプリケーションのプラットフォームを表します。

React Native アプリケーションでフィルタリングし、セッションをクリックします。セッションのイベント一覧が表示されたサイドパネルが表示されます。

{{< img src="real_user_monitoring/react_native/reactnative_webview_session.png" alt="Web ビューセッションの例" >}}

**Open View waterfall** をクリックすると、セッションからビューの **Performance** タブにあるリソースウォーターフォールの視覚化へ移動します。

[1]: https://docs.datadoghq.com/ja/real_user_monitoring/browser/#npm
[2]: https://app.datadoghq.com/rum/explorer?_gl=1*1ftt3v2*_gcl_aw*R0NMLjE2NzE1MzAwMzUuQ2owS0NRaUExNFdkQmhEOEFSSXNBTmFvMDdnVzZFSGZaVXQ0dGRFY3ZwcERPVkpFUTJEWEZHYVhSd0djQmNGdDRnZ0pra0xGbW5uUjFHQWFBcjlZRUFMd193Y0I.*_ga*MTkyMzQ5MTc1MC4xNjc4MjczMTI3*_ga_KN80RDFSQK*MTY3ODI3OTIzNC4yLjAuMTY3ODI3OTIzNC42MC4wLjA.
[3]: https://github.com/react-native-webview/react-native-webview
[4]: https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md