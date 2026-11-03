---
aliases:
- /es/real_user_monitoring/mobile_and_tv_monitoring/
- /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/
- /es/real_user_monitoring/mobile_and_tv_monitoring/data_collected/
- /es/real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries/
- /es/real_user_monitoring/mobile_and_tv_monitoring/other_frameworks/
- /es/real_user_monitoring/mobile_and_tv_monitoring/setup/
- /es/real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/
description: Recopile datos de RUM desde sus aplicaciones de navegador, móviles y
  de TV.
further_reading:
- link: /session_replay/
  tag: Documentación
  text: Session Replay
title: Seguimiento de aplicaciones
---
## Descripción general {#overview}

Datadog Real User Monitoring (RUM) proporciona una visión profunda del rendimiento del frontend de su aplicación. Haga un seguimiento de los datos de usuarios reales para optimizar su experiencia web y brindar experiencias de usuario excepcionales. Correlacione pruebas Synthetic, métricas de backend, trazas y registros en un solo lugar para identificar y solucionar problemas de rendimiento en toda la pila.

Datadog le ayuda a comprender el nivel actual de experiencia del usuario, identificar áreas de mejora y medir el éxito de cada cambio y/o despliegue. Utilice esta información para identificar y resolver problemas inesperados de frontend antes de que los usuarios se vean afectados, para así ofrecer la mejor experiencia.

La responsabilidad de mantener seguros los datos de los usuarios es compartida entre Datadog y los desarrolladores que utilizan los SDK de RUM. Obtenga más información sobre [Responsabilidad compartida][1].

## Comience {#get-started}

Seleccione una plataforma para comenzar a recopilar datos de RUM en su aplicación:

{{< card-grid image_width="200" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/browser/setup" src="integrations_logos/javascript_large.svg" alt="Navegador" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/android/setup" src="integrations_logos/android_large.svg" alt="Android" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/android/setup" src="integrations_logos/android_tv_large.svg" alt="Android TV" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/cpp/setup/" src="integrations_logos/cpp_large.svg" alt="C / C++" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/flutter/setup/" src="integrations_logos/flutter_large.svg" alt="Flutter" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/ios/setup/" src="integrations_logos/ios_large.svg" alt="iOS" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/ios/setup/" src="integrations_logos/tv_os_large.svg" alt="tvOS" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup/" src="integrations_logos/kotlin-multiplatform_large.svg" alt="kotlin-multiplatform" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/maui/setup/" src="integrations_logos/maui_large.svg" alt=".NET MAUI" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/react_native/setup/" src="integrations_logos/react-native_large.svg" alt="React Native" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/react_native/setup/codepush/" src="integrations_logos/react-codepush_large.svg" alt="react-codepush" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/react_native/setup/expo/" src="integrations_logos/rum-expo_large.svg" alt="rum-expo" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/roku/setup/" src="integrations_logos/roku_large.svg" alt="Roku" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/unity/setup" src="integrations_logos/rum-unity_large.svg" alt="rum-unity" >}}
{{< /card-grid >}}

[1]: /es/data_security/real_user_monitoring/#shared-responsibility