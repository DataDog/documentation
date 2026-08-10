---
aliases:
- /ja/real_user_monitoring/react-native/
- /ja/real_user_monitoring/reactnative/
- /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/reactnative
- /ja/real_user_monitoring/mobile_and_tv_monitoring/react_native/setup
- /ja/real_user_monitoring/mobile_and_tv_monitoring/react_native/setup/reactnative/
- /ja/real_user_monitoring/application_monitoring/react_native/setup/expo/
- /ja/real_user_monitoring/reactnative/expo/
- /ja/real_user_monitoring/reactnative-expo/
- /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/expo
- /ja/real_user_monitoring/mobile_and_tv_monitoring/expo/setup
- /ja/real_user_monitoring/mobile_and_tv_monitoring/react_native/setup/expo/
content_filters:
- label: Setup Method
  option_group_id: rum_react_native_framework_options
  trait_id: platform
description: React Native プロジェクトから RUM とエラートラッキングのデータを収集します。
further_reading:
- link: /real_user_monitoring/application_monitoring/react_native/advanced_configuration
  tag: ドキュメント
  text: RUM React Native の高度な構成
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: ソースコード
  text: dd-sdk-reactnative のソースコード
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: ブログ
  text: React Native アプリケーションの監視
- link: real_user_monitoring/guide/monitor-hybrid-react-native-applications
  tag: ドキュメント
  text: ハイブリッド React Native アプリケーションのモニタリング
- link: real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM データの調査方法
title: React Native モニタリングのセットアップ
---
このページでは、React Native SDK を使用してアプリケーションに [Real User Monitoring (RUM)][1] をインスツルメントする方法について説明します。RUM にはデフォルトで Error Tracking が含まれていますが、Error Tracking をスタンドアロン製品として購入した場合は、特定の手順について [Error Tracking セットアップガイド][2]を参照してください。

React Native SDK の最小サポートバージョンは React Native v0.65+ です。古いバージョンとの互換性は、標準では保証されていません。

## セットアップ {% #setup %}

<!-- React Native -->
{% if equals($platform, "react_native") %}
{% partial file="sdk/setup/react-native.mdoc.md" /%}
{% /if %}

<!-- Expo -->
{% if equals($platform, "expo") %}
{% partial file="sdk/setup/react-native-expo.mdoc.md" /%}
{% /if %}

## デバイスがオフラインの時のデータ送信 {% #sending-data-when-device-is-offline %}

React Native SDK は、ユーザーのデバイスがオフラインの場合でもデータを利用できるようにします。ネットワークが不安定な地域やデバイスのバッテリー残量が少ない場合、すべてのイベントは最初にローカルデバイスにバッチで保存されます。ネットワークが利用可能になり、バッテリー残量が十分な状態になるとすぐに送信されるため、React Native SDK がエンドユーザーの体験に影響を与えることはありません。アプリケーションがフォアグラウンドで実行中にネットワークが利用できない場合、またはデータのアップロードが失敗した場合、送信に成功するまでバッチは保持されます。

つまり、ユーザーがオフラインでアプリケーションを開いても、データが失われることはありません。

**注**: ディスク上のデータは、古くなりすぎると自動的に削除されるため、React Native SDK がディスク容量を過度に消費することはありません。

## バックグラウンドイベントの追跡 {% #track-background-events %}

{% alert level="info" %}
バックグラウンドイベントの追跡は、追加のセッションを引き起こす可能性があり、課金に影響を与えることがあります。質問がある場合は、[Datadog サポートにお問い合わせください][12]。
{% /alert %}

アプリケーションがバックグラウンドにあるとき (例えば、アクティブなビューがないとき)、クラッシュやネットワークリクエストなどのイベントを追跡することができます。

Datadog の構成で、初期化時に以下のスニペットを追加します。

```javascript
rumConfiguration.trackBackgroundEvents = true;
```

[1]: /ja/real_user_monitoring/
[2]: /ja/error_tracking/
[12]: https://docs.datadoghq.com/ja/help/