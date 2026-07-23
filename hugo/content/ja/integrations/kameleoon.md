---
app_id: kameleoon
categories:
- 構成とデプロイ
- 開発ツール
- イベント管理
custom_kind: インテグレーション
description: Kameleoon を Datadog RUM と連携して、フィーチャー デプロイおよびリリースをリアルタイム パフォーマンス データで監視します。
integration_version: 1.0.0
media:
- caption: Datadog RUM と Kameleoon フィーチャー フラグの概要
  image_url: images/rum_dashboard.png
  media_type: image
- caption: Datadog RUM と Kameleoon フィーチャー フラグの詳細
  image_url: images/rum_details.png
  media_type: image
supported_os:
- linux
- windows
- macos
title: Kameleoon
---
## 概要

Kameleoon は、ウェブ、モバイル、サーバーサイドの各アプリケーションでフィーチャー リリースを精密に管理・最適化できるようチームを支援します。

Datadog RUM と統合することで、特定フィーチャーがユーザー行動やアプリケーション メトリクスに与える影響をリアルタイムに把握できます。

## セットアップ

Feature flag tracking is available in the RUM Browser SDK. For detailed set up instructions, visit [Getting started with feature flag data in RUM](https://docs.datadoghq.com/real_user_monitoring/guide/setup-feature-flag-data-collection/).

1. ブラウザ RUM SDK バージョンを 4.25.0 以上に更新します。
1. RUM SDK を初期化し、`["feature_flags"]` で `enableExperimentalFeatures` 初期化パラメーターを構成します。
1. Initialize [Kameleoon's SDK](https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/js-sdk/) and define an `onEvent` handler to watch `Evaluation` events.

```javascript
client.onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```

## サポート

For more information see the [Kameleoon SDK documentation](https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/js-sdk/), or join the [Kameleoon Slack community](https://join.slack.com/t/kameleooncommunity/shared_invite/zt-1s6m8s09e-~yA1EUgn5pLWW_mrgf8TrQ) for support on the Kameleoon Datadog integration.