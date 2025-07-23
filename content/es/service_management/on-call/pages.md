---
further_reading:
- link: /service_management/on-call/
  tag: Documentation
  text: Datadog On-Call
title: Enviar una página
---

Una Página se envía a un Equipo y, posteriormente, se enruta a través de las políticas de escalado y los cronogramas de ese Equipo. Una vez que tu equipo esté [integrado en Datadog On-Call][1], puedes empezar a enviar páginas.

### Página de notificaciones
Puedes enviar una Página mencionando el identificador de un Equipo y añadiendo `oncall-`. Por ejemplo: para enviar una Página al equipo de operaciones de pago (`@checkout-operations`), menciona `@oncall-checkout-operations`.

{{< img src="service_management/oncall/notification_page.png" alt="Notificación que menciona un Equipo de On-Call." style="width:80%;" >}}

Puedes enviar Páginas a los Equipos de On-Call siempre que se admitan @-handles, incluidos monitores, gestión de incidencias, reglas de detección de seguridad, gestión de eventos, etc.

#### Monitores y urgencias dinámicas

Si envías una Página a través de una alerta de monitor y la regla de procesamiento de tu Equipo utiliza urgencias dinámicas:
- Si se supera el umbral WARN (ADVERTENCIA), la urgencia de la página se establece en `low`.
- Si se supera el umbral de ALERT (ADVERTENCIA), la urgencia de la página se fija en `high`.

### Envío de páginas manual

Puedes enviar manualmente una Página directamente en la plataforma de Datadog, o a través de una herramienta como Slack o Microsoft Teams.

#### A través de Datadog

1. Ve a [**On-Call** > **Teams**][2] (On-Call > Equipos).
1. Busca el Equipo al que deseas enviar una página. Selecciona **Page** (Página).
   {{< img src="service_management/oncall/manual_page.png" alt="La lista de Equipos de On-Call, que muestra el equipo de operaciones de compra. Se muestran tres botones: cronogramas, políticas de escalada, página." style="width:80%;" >}}
1. Introduce un **Page title** (Título de página). También puedes seleccionar **Tags** (Etiquetas) y añadir más contexto en el campo **Description** (Descripción). Selecciona **Page** (Página).

El envío de páginas manual de un Equipo a través de Datadog siempre da como resultado una Página de urgencia `high`.

#### A través de Slack
1. Instalar la aplicación de Datadog 
1. Introduce `/datadog page` o `/dd page`.
1. Selecciona un Equipo al que enviar una Página.

El envío de páginas manual de un Equipo desde Slack siempre da como resultado una Página de urgencia `high`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/on-call/teams
[2]: https://app.datadoghq.com/on-call/teams