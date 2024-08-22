---
aliases: null
description: Cómo solucionar problemas de Session Replay en móviles
further_reading:
- link: /real_user_monitoring/session_replay/mobile
  tag: Documentación
  text: Session Replay para móviles
- link: /real_user_monitoring/session_replay/mobile/setup_and_configuration
  tag: Documentación
  text: Instalación y configuración de Session Replay en móviles
- link: /real_user_monitoring/session_replay/mobile/app_performance
  tag: Documentación
  text: Cómo afecta Session Replay en móviles al rendimiento de las aplicaciones
- link: /real_user_monitoring/session_replay/mobile/privacy_options
  tag: Documentación
  text: Opciones de privacidad de Session Replay en móviles
- link: /real_user_monitoring/session_replay
  tag: Documentación
  text: Session Replay
title: Solucionar problemas de Session Replay en móviles
---
## Reproducciones de sesiones
### Algunas partes de la aplicación están en blanco o no son visibles en el reproductor

Session Replay para móviles sólo es compatible con marcos nativos. Dentro de estos marcos, pueden estar ausentes algunos componentes o pantallas, como por ejemplo:

- Pantallas creadas con SwiftUI (iOS) o Jetpack Compose (Android)
- Ciertos elementos del sistema, como actionBar en Android, las barras de progreso y los spinners
- Amplios contenidos del sistema, como reproductores de vídeo, reproductores de música y widgets de asignación
- Vistas que utilizan los dibujos directos en el lienzo
- Estilo de texto avanzado

### El aspecto de la reproducción de la sesión no refleja exactamente mi aplicación
Session Replay para móviles combina rendimiento y capacidad de uso. Para lograrlo, no se trata de una recreación pixelada de tu aplicación, sino que se adopta un enfoque híbrido de lo visual: muestra un andamiaje de la pantalla que luego puede enriquecerse con estilos e imágenes contextuales.

### En las sesiones que son muy cortas, veo que hay una repetición adjunta, pero no puedo verla
Cuando las sesiones duran 1 nanosegundo, Datadog no puede procesar la grabación, por lo que no se adjunta ninguna repetición.

## Seguridad de los datos
### Necesito tener en cuenta el consentimiento de la aplicación móvil al recopilar repeticiones de sesiones móviles
Antes de que los datos se carguen en Datadog, se almacenan en texto claro en el directorio de caché de tu aplicación. Al iniciar el SDK, es necesario definir un valor de consentimiento del seguimiento en uno de los siguientes:

- Si el valor **no es concedido**, no se escribirán datos en el disco.
- Si el valor está **pendiente**, los datos se escriben en una carpeta temporal que no se puede cargar en Datadog.
- Si el valor es **concedido**, los datos se escriben en una carpeta de "carga", que se procesa en segundo plano y eventualmente se carga en Datadog.

En cualquier momento durante la vida útil de la aplicación host, es posible cambiar el consentimiento del seguimiento. Cuando el consentimiento pasa de pendiente a concedido, los datos de la carpeta temporal se trasladan a la carpeta de "carga".

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}