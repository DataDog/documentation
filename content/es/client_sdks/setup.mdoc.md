---
content_filters:
- label: SDK
  option_group_id: client_sdk_platform_options
  trait_id: platform
private: true
title: Configuración del SDK del cliente
---
## Descripción general {% #overview %}
  
Siga las instrucciones a continuación para instalar y configurar el SDK de Datadog para su plataforma.

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

La versión mínima soportada para el SDK de React Native es React Native v0.65+. La compatibilidad con versiones anteriores no está garantizada de forma predeterminada.

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