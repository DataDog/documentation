---
aliases:
- /es/guides/monitors/
- /es/guides/monitoring/
- /es/guides/alerting/
- /es/guides/monitors/the-conditions
- /es/monitoring
cascade:
  algolia:
    rank: 70
    tags:
    - alertas
    - alertar
    - monitorización
description: Crea monitores, configura notificaciones y automatizaciones, y gestiona
  tus monitores utilizando la plataforma de alertas
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Alerting
  tag: Notas de la versión
  text: ¡Mira cuáles son las últimas versiones de las alertas de Datadog! (Es necesario
    iniciar sesión en la aplicación).
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: Blog
  text: 'Introducción a la monitorización: alertar sobre lo importante'
- link: /api/v1/monitors/
  tag: Documentación
  text: API de monitores de Datadog
- link: https://www.datadoghq.com/blog/datadog-github-deployment-protection-rules/
  tag: Blog
  text: Detectar checks de calidad fallidos con las reglas de protección de implementación
    de GitHub y Datadog
- link: https://dtdg.co/fe
  tag: Establecer las bases
  text: Participa en una sesión interactiva sobre la creación de monitores eficaces
- link: https://www.datadoghq.com/blog/aws-recommended-monitors/
  tag: Blog
  text: Activa alertas preconfiguradas con monitores recomendados para AWS
title: Monitores
---

## Información general

Para hacer una monitorización de toda tu infraestructura desde un mismo sitio, es crucial que sepas cuándo se producen cambios críticos. Datadog te da la posibilidad de crear monitores que realizan checks de métricas, disponibilidad para la integración, endpoints de la red, entre otros aspectos.

Configurar monitores, configurar notificaciones y automatizaciones, y gestionar alertas de un vistazo en la plataforma de alertas.

**Nota**: Consulta y busca monitores en tu móvil con la aplicación de [Datadog][1], disponible en el [Apple App Store][2] y en [Google Play Store][3].

## Crear monitores

Para crear un monitor en Datadog:

1. Accede a [**Monitors** > **New monitor**][4] (Monitores > Nuevo monitor).
1. Selecciona un tipo de monitor correspondiente al tipo de telemetría sobre el que deseas alertar. Consulta [Tipos de monitores][5] para ver la lista completa.
1. [Configurar monitores][6]: alertar sobre métricas, eventos, logs, disponibilidad de la integración, endpoints de red y más.

{{< img src="/monitors/create.png" alt="Crear un monitor" style="width:90%;">}}

Para crear un monitor mediante programación, consulta la [API de Datadog][7] o [bibliotecas de la comunidad][8].

## Configurar notificaciones y automatizaciones

{{< img src="/monitors/notify.png" alt="Enviar una notificación cuando un monitor tiene una alerta" style="width:90%;">}}

Configura las [notificaciones de monitor][11] al crear monitores para mantener a tu equipo informado de los problemas. Dirige las notificaciones a las personas adecuadas, incluye [automatizaciones de flujos de trabajo][17], [casos][18] e [identificadores de equipo de Datadog][19], aprovecha las variables de plantilla para incluir detalles y adjunta snapshots cuando envíes las alertas por correo electrónico o Slack. Crea [tiempos de inactividad][12] para silenciar las alertas durante el mantenimiento de la aplicación.

## Gestionar monitores

{{< img src="/monitors/manage.png" alt="Gestiona todas las alertas de monitores" style="width:90%;">}}

Puedes [gestionar monitores][13] al editar, clonar, borrar, silenciar y resolver monitores, todo en el mismo lugar. Puedes enfocarte en las alertas de alta prioridad utilizando la búsqueda avanzada por facetas. Explora los detalles y alertas de monitor a lo largo del tiempo en la [página Lista de monitores][9].

## Exportación e importación de monitores

Para exportar un monitor:

1. En la página [**Manage Monitors**][9] (Gestionar monitores), haz clic en el monitor que deseas exportar.
1. Deberías ver la página Monitor Status (Estatus del monitor).
1. Haz clic en el engranaje de configuración (arriba a la derecha) y selecciona **Export** (Exportar) en el menú.

Para importar un monitor:

1. Ve a [**Monitors** > **New Monitor**][4] (Monitores > Nuevo monitor).
1. Haz clic en [**Import from JSON**][10] (Importar desde JSON) en la parte superior de la página.
1. Añade tu definición de monitor JSON y haz clic en **Save** (Guardar).

## Controla las etiquetas de los monitores mediante las políticas de etiquetas

Las [políticas de etiqueta del monitor][14] imponen la validación de datos en las etiquetas (tags) y los valores de etiqueta de tus monitores de Datadog. Añade una de las siguientes reglas para evitar que se creen monitores con etiquetas inesperadas.
- Requerir etiquetas con valores obligatorios
- Requerir únicamente etiquetas
- Etiquetas opcionales con valores obligatorios

## Consultar y buscar monitores en dispositivos móviles

[Monitores móviles en iOS y Android][15]: puedes ver, silenciar y anular el silencio de los monitores en cualquier dispositivo iOS o Android con la [aplicación móvil de Datadog][1], disponible en [Apple App Store][2] y [Google Play Store][3]. Escribe consultas en la barra de búsqueda para filtrar monitores en tiempo real. Utiliza [Vistas guardadas del monitor][16] para acceder a una colección de monitores con unos pocos toques en el móvil.

{{< img src="monitors/monitors_mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Monitors en la aplicación para móviles">}}

## Otras secciones

{{< whatsnext desc=" ">}}
    {{< nextlink href="/service_management/service_level_objectives" >}}<u>Objetivos de nivel de servicio (SLOs)</u>: crea, edita o visualiza tus Objetivos de nivel de servicio (SLOs) mediante métricas o monitores de Datadog.{{< /nextlink >}}
    {{< nextlink href="/monitors/incident_management" >}}<u>Gestión de incidencias</u>: declara y gestiona incidencias.{{< /nextlink >}}
    {{< nextlink href="/monitors/guide" >}}<u>Guías</u>: artículos útiles adicionales sobre monitores y alertas.{{< /nextlink >}}
{{< /whatsnext >}}

## Leer más

{{< nombre parcial="whats-next/whats-next.html" >}}

[1]: /es/mobile
[2]: https://apps.apple.com/app/datadog/id1391380318
[3]: https://play.google.com/store/apps/details?id=com.datadog.app
[4]: https://app.datadoghq.com/monitors/create
[5]: /es/monitors/types/
[6]: /es/monitors/configuration
[7]: /es/api/latest/monitors/
[8]: /es/developers/community/libraries/#managing-monitors
[9]: https://app.datadoghq.com/monitors/manage
[10]: https://app.datadoghq.com/monitors/create/import
[11]: /es/monitors/notify
[12]: /es/monitors/downtimes
[13]: /es/monitors/manage
[14]: /es/monitors/settings/
[15]: /es/service_management/mobile/?tab=ios#monitors
[16]: /es/monitors/manage/search/#saved-view
[17]: /es/monitors/notify/#workflows
[18]: /es/monitors/notify/#notifications
[19]: /es/monitors/notify/#teams