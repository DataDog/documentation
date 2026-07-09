---
aliases:
- /es/real_user_monitoring/mobile_and_tv_monitoring/
- /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/
- /es/real_user_monitoring/mobile_and_tv_monitoring/data_collected/
- /es/real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries/
- /es/real_user_monitoring/mobile_and_tv_monitoring/other_frameworks/
- /es/real_user_monitoring/mobile_and_tv_monitoring/setup/
- /es/real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/
description: Recopila datos de RUM de tu navegador y aplicaciones móviles y de TV.
further_reading:
- link: /real_user_monitoring/session_replay/browser/
  tag: Documentación
  text: Session Replay
title: Monitorización de aplicaciones
---

## Información general

En Real User Monitoring (RUM) de Datadog, se proporciona información detallada del rendimiento del frontend de tu aplicación. Monitoriza datos reales del usuario para optimizar tu experiencia web y proporcionar experiencias del usuario. Correlaciona tests Sintético, métricas, trazas (traces) y logs de backend en un único lugar para identificar y solucionar problemas de rendimiento en todo el stack tecnológico.

Datadog te ayuda a comprender el nivel actual de la experiencia del usuario, identificar áreas de mejora y medir el éxito de cada cambio y/o implementación. Utiliza esta información para identificar y solucionar problemas inesperados del frontend antes de que los usuarios se vean afectados para ofrecer la mejor experiencia.

La responsabilidad de mantener seguros los datos de los usuarios es compartida entre Datadog y los desarrolladores que utilizan los SDK de RUM. Obtén más información sobre la [responsabilidad compartida][1].

## Para empezar

Selecciona una plataforma para empezar a recopilar datos de RUM de tu aplicación:

{{< card-grid image_width="200" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/browser/setup" src="integrations_logos/javascript_large.svg" alt="browser" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/android/setup" src="integrations_logos/android_large.svg" alt="android" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/android/setup" src="integrations_logos/android_tv_large.svg" alt="android tv" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/ios/setup/" src="integrations_logos/ios_large.svg" alt="ios" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/ios/setup/" src="integrations_logos/tv_os_large.svg" alt="tv OS" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/react_native/setup/" src="integrations_logos/react-native_large.svg" alt="react-native" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/react_native/setup/codepush/" src="integrations_logos/react-codepush_large.svg" alt="react-codepush" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/react_native/setup/expo/" src="integrations_logos/rum-expo_large.svg" alt="rum-expo" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/flutter/setup/" src="integrations_logos/flutter_large.svg" alt="flutter" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/roku/setup/" src="integrations_logos/roku_large.svg" alt="Roku" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/unity/setup" src="integrations_logos/rum-unity_large.svg" alt="rum-unity" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup/" src="integrations_logos/kotlin-multiplatform_large.svg" alt="kotlin-multiplatform" >}}
{{< /card-grid >}}

[1]: /es/data_security/real_user_monitoring/#shared-responsibility