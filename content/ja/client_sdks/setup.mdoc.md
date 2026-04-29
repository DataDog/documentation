---
content_filters:
- label: SDK
  option_group_id: client_sdk_platform_options
  trait_id: platform
private: true
title: クライアントSDKのセットアップ
---
## 概要
  
以下の手順に従って、あなたのプラットフォーム用のDatadog SDKをインストールおよび構成してください。

<!-- Browser -->
{% if equals($platform, "browser") %}
{% partial file="sdk/setup/browser.mdoc.md" /%}
{% /if %}

<!-- Android -->
{% if equals($platform, "android") %}
{% partial file="sdk/setup/android.mdoc.md" /%}
{% /if %}

<!-- iOS -->
{% if equals($platform, "ios") %}
{% partial file="sdk/setup/ios.mdoc.md" /%}
{% /if %}

<!-- Flutter -->
{% if equals($platform, "flutter") %}
{% partial file="sdk/setup/flutter.mdoc.md" /%}
{% /if %}

<!-- React Native -->
{% if equals($platform, "react_native") %}

React Native SDKの最小サポートバージョンはReact Native v0.65+です。古いバージョンとの互換性は、初期設定では保証されていません。

{% tabs %}
{% tab label="React Native" %}

{% partial file="sdk/setup/react-native.mdoc.md" /%}

{% /tab %}
{% tab label="Expo" %}

{% partial file="sdk/setup/react-native-expo.mdoc.md" /%}

{% /tab %}
{% /tabs %}

{% /if %}

<!-- Kotlin Multiplatform -->
{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/setup/kotlin-multiplatform.mdoc.md" /%}
{% /if %}

<!-- Roku -->
{% if equals($platform, "roku") %}
{% partial file="sdk/setup/roku.mdoc.md" /%}
{% /if %}

<!-- Unity -->
{% if equals($platform, "unity") %}
{% partial file="sdk/setup/unity.mdoc.md" /%}
{% /if %}