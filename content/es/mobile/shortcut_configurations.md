---
description: Configura los accesos directos de las aplicaciones móviles, la integración
  con Siri, el modo de enfoque, las acciones rápidas y las notificaciones del Apple
  Watch para mejorar la experiencia móvil en Datadog.
further_reading:
- link: /mobile/
  tag: Documentación
  text: Más información sobre aplicaciones móviles Datadog
title: Configuraciones de accesos directos
---

## Definir Datadog como aplicación predeterminada

Abre enlaces externos directamente en la aplicación Datadog, en lugar de en el navegador, configurando la aplicación móvil Datadog como tu aplicación predeterminada.

{{< tabs >}}
{{% tab "iOS" %}}

1. Copia el enlace de Datadog y pégalo en una aplicación que no acorte ni reescriba enlaces, como Notas o Correo electrónico.

2. Mantén presionado el enlace copiado y pulsa **Open in Datadog** (Abrir en Datadog).

**Nota**: Solo necesitas hacerlo **una vez** para que la aplicación móvil Datadog sea la predeterminada para abrir enlaces de Datadog.

{{% /tab %}}
{{% tab "Android" %}}

1. Abre **Settings** > **Apps** > **Datadog** (Configuración > Aplicaciones > Datadog).

2. Pulsa **Open by default** (Abrir por defecto) y luego pulsa **In the app** (En la aplicación). Confirma los enlaces verificados para configurar Datadog como predeterminado.

Para obtener más información sobre aplicaciones predeterminadas en Android, consulta [Configurar o eliminar una aplicación predeterminada][7].

[7]: https://support.google.com/pixelphone/answer/6271667?hl=en

{{% /tab %}}
{{< /tabs >}}

## Configurar Slack para abrir enlaces en la aplicación

Abre enlaces de Datadog desde Slack directamente en la aplicación Datadog.

1. En la aplicación Slack de tu dispositivo móvil, ve a tu perfil > **Preferences** > **Advanced** (Preferencias > Avanzado).
2. Activa el **In-App Browser** (Navegador en la aplicación) en la configuración **Web Browser** (Navegador web).

## Modo Focus

Para configurar un modo Focus para incluir o excluir la aplicación móvil Datadog:

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/iOS_Setting_1.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Pantalla de configuración de iOS que muestra opciones de Focus">}}

1. Abre **Settings** > **Focus** (Configuración > Focus).

   {{< img src="service_management/mobile/iOS_Setting_2.png" style="width:50%; background:none; border:none; box-shadow:none;" alt="Pantalla de configuración de iOS Focus">}}

2. Pulsa un **Focus** o crea el tuyo propio.

   {{< img src="service_management/mobile/iOS_Setting_3.png" style="width:50%; background:none; border:none; box-shadow:none;" alt="Pantalla de configuración de iOS Focus que muestra opciones de configuración de las preferencias de notificación">}}

3. Pulsa **Allow Notifications From** (Permitir notificaciones de) y añade la aplicación móvil Datadog. También puedes pulsar **Silence Notifications From** (Silenciar notificaciones de) y añade la aplicación móvil Datadog.

Para obtener más información, consulta [Configurar un Focus en iPhone][5].

[5]: https://support.apple.com/guide/iphone/set-up-a-focus-iphd6288a67f/ios

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Setting_1.png" style="width:50%; background:none; border:none; box-shadow:none;" alt="Pantalla de configuración de Android que muestra la opción Modos y rutinas">}}

1. Abre **Settings** > **Modes and Routines** (Configuración > Modos y rutinas).

   {{< img src="service_management/mobile/Android_Setting_2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Pantalla de configuración de Modos y rutinas en Android">}}

2. Pulsa un **Modo** o crea el tuyo propio.

   {{< img src="service_management/mobile/Android_Setting_3.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Pantalla de configuración de un modo en Android que muestra opciones de Focus">}}

3. Pulsa **Stay focused** > **Restrict app usage** (Mantenerse enfocado > Restringir el uso de la aplicación) y añade la aplicación móvil Datadog > **Done** (Listo). También puedes pulsar **Do not disturb** (No molestar) y añadir la aplicación móvil Datadog > **Done** (Listo).

Para obtener más información, consulte [Limitar las interrupciones con Modos][6].

[6]: https://support.google.com/android/answer/9069335?hl=en

{{% /tab %}}
{{< /tabs >}}

## Acciones rápidas

{{< img src="service_management/mobile/shortcut_shadow.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Icono de aplicación móvil con un menú de acciones rápidas que muestra los cinco dashboards consultados con mayor frecuencia">}}

Mantén presionado el icono de la aplicación para ver una hoja de acciones rápidas de los cinco dashboards [más consultados por mí][1] para iOS (según el número de vistas y la frecuencia), o los cinco dashboards en móviles para Android. Pulsa un resultado para abrir el dashboard en la aplicación.

## Buscar desde la pantalla de inicio

{{< img src="service_management/mobile/iphone_search_doc.png" alt="Búsqueda de la página de inicio de iPhone que muestra resultados de dashboard de Datadog" style="width:40%;">}}

**Solo iOS**: Dentro de la búsqueda de iPhone, filtra y busca el nombre del dashboard deseado. Pulsa un resultado para abrir la vista del dashboard directamente en la aplicación móvil o pulsa el botón **Search in App** (Buscar en la aplicación) para abrir la consulta de búsqueda en la página de la lista de dashboards en la aplicación.

## Accesos directos y sugerencias de Siri

{{< tabs >}}
{{% tab "iOS" %}}

Crea accesos directos de Siri para dashboards y monitores de Datadog a través de la aplicación Accesos directos de iOS. Antes de poder crear un acceso directo para un dashboard o monitor específico, primero debes abrir ese dashboard o monitor en la aplicación móvil Datadog al menos una vez. Por ejemplo, para crear un acceso directo llamado "Abrir dashboard de información general de AWS", primero debes navegar y ver el dashboard de información general de AWS en la aplicación móvil.

Con el acceso directo puedes acceder a tus dashboards y monitores realizando tres acciones clave:

- Ancla el acceso directo como si fuese un icono en tu pantalla de inicio. Para ello, ve a la aplicación Accesos directos y abre el menú de edición del acceso directo de tu dashboard.
- Voz de Siri: di el nombre del acceso directo, por ejemplo, "Open AWS Overview" (Abrir la información general de AWS) y Siri abrirá el dashboard en la aplicación.
- Sugerencias de Siri: Siri asimila tu rutina y te sugiere la creación de accesos directos a tus dashboards cuando más los necesitas. Puedes hacerlo mediante un banner visible en tu pantalla de inicio o de bloqueo, a través del apartado de búsqueda del iPhone o con los widgets de sugerencias de Siri de iOS 14.

{{< img src="service_management/mobile/siri_shadow.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Aplicación Accesos directos de iOS que muestra accesos directos a dashboards de Datadog con sugerencias de Siri">}}

Para obtener más información sobre accesos directos y sugerencias de Siri, consulta la [documentación de Siri de Apple][2].

[2]: https://support.apple.com/en-us/HT209055

{{% /tab %}}
{{% tab "Android" %}}

Crea iconos de acceso directo para tus dashboards pulsando prolongadamente el icono de la aplicación Datadog y luego quitando el dedo. Si la aplicación tiene accesos directos, mostrará una lista. Mantén pulsado el acceso directo deseado y luego arrástralo y suéltalo en otro lugar de la pantalla para crear un icono de acceso directo único.

{{% /tab %}}
{{< /tabs >}}

## Handoff

**Solo para iOS**: usa Handoff de Apple para continuar tus tareas en cualquier dispositivo de Apple. Cuando lo hagas, verás el icono de la aplicación móvil de Datadog en tu Mac, en el lado izquierdo del Dock. Haz clic en ese icono para abrir tu dashboard o monitor actual en el Mac.

Para que Handoff funcione, el dispositivo debe:

- Haber iniciado sesión en iCloud con el mismo identificador de Apple
- Tener el Bluetooth activado
- Tener el wifi activado
- Tener Handoff activado

Para obtener más información, consulta la [documentación de Apple Handoff][3].

## Apple Watch

Para activar las notificaciones del Apple Watch cuando está emparejado con el iPhone:
1. Abre la aplicación Watch en tu dispositivo móvil.
2. Pulsa **Notifications** (Notificaciones).
3. Activa **Notifications Indicator** (Indicador de notificaciones).

Apple no permite enviar notificaciones al iPhone y al Apple Watch al mismo tiempo. Si el iPhone está bloqueado o en reposo, las notificaciones solo se envían al Apple Watch. Para recibir siempre notificaciones en tu iPhone, abre la aplicación Watch y desactiva las notificaciones.

Para obtener más información, consulta la [documentación sobre las notificaciones en tu Apple Watch][4].

**Nota**: Para recibir notificaciones, debes emparejarte con tu iPhone y permanecer dentro de la proximidad bluetooth de tu teléfono emparejado.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists/preset/5
[2]: https://support.apple.com/en-us/HT209055
[3]: https://support.apple.com/en-us/HT209455
[4]: https://support.apple.com/en-au/108369
[5]: https://support.apple.com/guide/iphone/set-up-a-focus-iphd6288a67f/ios
[6]: https://support.google.com/android/answer/9069335?hl=en
[7]: https://support.google.com/pixelphone/answer/6271667?hl=en