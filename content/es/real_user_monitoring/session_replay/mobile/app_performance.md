---
aliases: null
description: Evaluación comparativa del rendimiento de Session Replay en móviles.
further_reading:
- link: /real_user_monitoring/session_replay/mobile
  tag: Documentación
  text: Session Replay para móviles
- link: /real_user_monitoring/session_replay/mobile/privacy_options
  tag: Documentación
  text: Opciones de privacidad de Session Replay en móviles
- link: /real_user_monitoring/session_replay/mobile/setup_and_configuration
  tag: Documentación
  text: Instalación y configuración de Session Replay en móviles
- link: /real_user_monitoring/session_replay/mobile/troubleshooting
  tag: Documentación
  text: Solucionar problemas de Session Replay en móviles
- link: /real_user_monitoring/session_replay
  tag: Documentación
  text: Session Replay
title: Cómo afecta Session Replay en móviles al rendimiento de las aplicaciones
---

## Información general
Session Replay aprovecha los mecanismos existentes de procesamiento por lotes y carga inteligente del núcleo del SDK de Datadog. Estos mecanismos permiten una transferencia de datos eficiente y optimizada desde tu aplicación a los servidores Datadog. Al agrupar varios eventos y cargarlos de forma inteligente en los intervalos adecuados, Session Replay minimiza el impacto general en la red y el uso del ancho de banda, al tiempo que garantiza una utilización eficiente de los recursos de red.

El SDK de Session Replay para móviles permite una experiencia de usuario fluida sin afectar al rendimiento de tu aplicación.

## Subproceso principal
El sistema responsable de capturar la pantalla actual de tu aplicación se ejecuta en el subproceso de la interfaz de usuario, lo que potencialmente puede causar que las actualizaciones de la interfaz de usuario se retrasen. Sin embargo, Datadog utiliza procesos altamente optimizado para minimizar la carga de trabajo que el SDK realiza en el subproceso de la interfaz de usuario.

Las pantallas se capturan entre 64 ms y 100 ms (dependiendo de la plataforma) y la captura de una sola pantalla tarda 3 ms. Todo el procesamiento de los datos recopilados ocurre en el subproceso en segundo plano, sin afectar al rendimiento de tu aplicación.

## Red
Para minimizar el volumen total de carga, Datadog emplea un formato de cable altamente optimizado. Como resultado, puedes esperar ver un uso medio de ancho de banda de unos 12 KB/s para los datos enviados a los servidores de Datadog en iOS, y de 1,22 KB/s en Android. Cuando la grabación de imágenes está habilitada, las aplicaciones con un contenido con muchas imágenes pueden experimentar un volumen inicial ligeramente superior. Cuando el dispositivo se desconecta de la red, los datos se almacenan en el disco duro del dispositivo hasta que se restablezca una conexión con un gran ancho de banda.

## Tamaño de la aplicación
El SDK de Datadog sigue normas estrictas y trata de minimizar la inclusión de dependencias de terceros. Este enfoque garantiza que el SDK aproveche todo el código nativo posible. En Android, el tamaño binario producido por el propio código de Datadog en el paquete AAR es de 480 kB. Para obtener más información sobre el impacto del tamaño de la aplicación, consulta [aquí][1]. En iOS, el tamaño del archivo exportado `*.ipa` será aproximadamente 200 kB superior.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/blob/develop/docs/sdk_performance.md?plain=1#L119