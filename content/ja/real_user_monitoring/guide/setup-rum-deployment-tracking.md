---
aliases:
- /ja/real_user_monitoring/guide/getting-started-rum-deployment-tracking/
description: Learn how to set up RUM to capture new releases, track your deployments,
  and analyze the performance in Datadog
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Visualize your RUM data in the RUM Explorer
- link: /tracing/version_tracking
  tag: Documentation
  text: Use Version tags within Datadog APM to monitor deployments
- link: https://www.datadoghq.com/blog/datadog-rum-deployment-tracking
  tag: Blog
  text: Troubleshoot faulty frontend deployments with Deployment Tracking in RUM
title: Getting Started with RUM Deployment Tracking
---


## 概要
チームが迅速に反復してコードを展開すると、エラーの急増やページロード時間の低下の原因となった正確な変更を見つけることが困難になることがあります。RUM デプロイメント追跡を使用すると、最近のデプロイメントやリリースがアプリケーション内でパフォーマンスの問題を引き起こしている場合に、その原因を特定することができます。

## セットアップ
`version` タグを使用すると、ソフトウェアデプロイメント戦略をサポートするために、デプロイメントとサービスの動作を監視することができます。RUM デプロイメント追跡を開始するには、アプリケーションに RUM バージョンを追加する必要があります。

### ブラウザ RUM
{{< tabs >}}
{{% tab "npm" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

// Datadog ブラウザ SDK の初期化
datadogRum.init({
  ...
  version: '1.0.0',
  ...
});
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      ...
      version: '1.0.0',
      ...
    })
})
```

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
      ...
      version: '1.0.0',
      ...
    })
```
{{% /tab %}}
{{< /tabs >}}

### モバイル RUM

#### Android RUM

The version tag is captured automatically from the application's manifest.

#### iOS RUM

The version tag is captured automatically from the application's `info.plist`.

## RUM でデプロイメントのパフォーマンスを分析する

{{< tabs >}}
{{% tab "ブラウザ RUM" %}}

### Application Overview ページでバージョンタグを使用する

バージョンタグで構成されたアプリケーションには、Application Overview ページに **Deployment Tracking** セクションがあります。**Deployment Tracking** セクションには、選択した時間間隔にアクティブだったアプリケーションとサービスのすべてのバージョンが表示されます。

これにより、問題に気づいたらすぐにリリース候補をロールバックすることができ、ネガティブなユーザー体験を回避することができます。これらのすぐに使えるグラフは、バージョン間で集計されるので、アプリケーションの問題が深刻な問題に発展する前に、簡単に特定することができます。

以下を確認できます。
- バージョン別 P75 ロード時間
- バージョン別総ユーザーセッション数
- バージョン別のエラー率

これらのウィジェットの下の表では、以下を確認できます。
- アプリケーションとそのサービスに対して、期間内にデプロイされたバージョン名。
- そのバージョンのユーザーセッション数
- ビューあたりの平均エラー数
- P75 ロード時間
- Core Web Vitals の P75

これらのウィジェットは、ダッシュボードやモニターにエクスポートすることができます。

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/browser-rum-app-overview-deployment-tracking.png" alt="RUM アプリケーション概要のブラウザデプロイメント追跡" style="width:100%;">}}


### デプロイメントの比較

**List of Versions*** 表の任意のバージョン行をクリックすると、バージョン比較ページが表示され、同じサービスの 2 つのバージョンを比較することができます。デフォルトでは、選択されたバージョンは過去のすべてのバージョンと比較されます。過去 30 日以内の任意の 2 つのバージョンを比較するように選択を変更することができます。

**Application Overview** ページにあるグラフと同様に、**User Sessions**、**Core Web Vitals**、**Errors** グラフは、デプロイメントロールアウトの概要やエラー率の急上昇を表示します。このページでは、グラフは比較のために選択したバージョンを強調表示し、その他のバージョンはすべてグレーで表示され、コンテキストを追加します。

リリースを監視する際に、コードのデプロイメントのパフォーマンスを既存のライブコードと比較し、新しいコードが適切に動作しているか、バージョン間で新しいエラーが表面化していないかを確認するのに役立ちます。

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/browser-deployment-tracking-comparison.png" alt="ブラウザデプロイメント追跡の比較" style="width:75%;">}}

**Issues** タブでは、2 つのバージョンで検出されたエラーの違いを表示し、以下をハイライトします。
- バージョン別のエラー数
- バージョン別のエラーが発生したビューの割合
- エラー追跡の問題

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/browser-deployment-tracking-comparison-error.png" alt="ブラウザデプロイメント追跡の比較エラー" style="width:75%;">}}

### RUM デプロイメント追跡パワーパックを確認する
ダッシュボードのパワーパックメニューから "Deployment Version Tracking" パワーパックを検索して、RUM サービスのデプロイメント追跡をダッシュボードに追加することができます。その後、繰り返し、他のウィジェットをダッシュボードに追加して、チームが新機能を安全にリリースできるようにすることができます。

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/browser-deployment-tracking-powerpack.png" alt="ブラウザデプロイメント追跡パワーパック" style="width:75%;">}}

{{% /tab %}}
{{% tab "モバイル RUM" %}}

### Application Overview ページでバージョンタグを使用する

バージョンタグで構成されたアプリケーションには、Application Overview ページに **Deployment Tracking** セクションがあります。**Deployment Tracking** セクションには、選択した時間間隔にアクティブだったアプリケーションとサービスのすべてのバージョンが表示されます。

これにより、問題を見つけたらすぐにリリース候補を素早くロールバックすることができ、ネガティブなユーザー体験を回避することができます。これらのすぐに使えるグラフは、バージョン間で集計されるので、アプリケーションの問題が深刻な問題に発展する前に、簡単に特定することができます。

以下を確認できます。
- バージョン別の平均アプリケーション開始時間
- バージョン別総ユーザーセッション数
- バージョン別のエラー率

これらのウィジェットの下の表では、以下を確認できます。
- アプリケーションとそのサービスに対して、期間内にデプロイされたバージョン名。
- そのバージョンのアプリの起動数
- エラー率
- クラッシュ率
- P90 アプリケーション開始時間

これらのウィジェットは、ダッシュボードやモニターにエクスポートすることができます。

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/mobile-rum-app-overview-deployment-tracking.png" alt="RUM アプリケーション概要のモバイルデプロイメント追跡" style="width:100%;">}}

### デプロイメントの比較

**List of Versions** 表の任意のバージョン行をクリックすると、バージョン比較ページが表示され、同じサービスの 2 つのバージョンを比較することができます。デフォルトでは、選択されたバージョンは過去のすべてのバージョンと比較されます。過去 30 日以内の任意の 2 つのバージョンを比較するように選択を変更することができます。

**Application Overview** ページにあるグラフと同様に、**User Sessions**、**Mobile Vitals**、**Errors** グラフは、デプロイメントロールアウトの概要やエラー率の急上昇を表示します。このページでは、グラフは比較のために選択したバージョンを強調表示し、その他のバージョンはすべてグレーで表示され、コンテキストを追加します。

リリースを監視する際に、コードのデプロイメントのパフォーマンスを既存のライブコードと比較し、新しいコードが適切に動作しているか、バージョン間で新しいエラーが表面化していないかを確認するのが簡単になります。

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/mobile-deployment-tracking-comparison.png" alt="モバイルデプロイメント追跡の比較" style="width:75%;">}}

**Issues** タブでは、2 つのバージョンで検出されたエラーの違いを表示し、以下をハイライトします。
- バージョン別のエラー数
- バージョン別のエラーが発生したビューの割合
- エラー追跡の問題

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/mobile-deployment-tracking-comparison-error.png" alt="モバイルデプロイメント追跡の比較エラー" style="width:75%;">}}

### RUM デプロイメント追跡パワーパックを確認する
ダッシュボードのパワーパックメニューから "Deployment Version Tracking" パワーパックを検索して、RUM サービスのデプロイメント追跡をダッシュボードに追加することができます。その後、繰り返し、他のウィジェットをダッシュボードに追加して、チームが新機能を安全にリリースできるようにすることができます。

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/mobile-deployment-tracking-powerpack.png" alt="ブラウザデプロイメント追跡パワーパック" style="width:75%;">}}


{{% /tab %}}
{{< /tabs >}}

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}