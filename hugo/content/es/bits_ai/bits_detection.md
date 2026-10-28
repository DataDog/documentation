---
description: Aprenda cómo Bits Detection identifica de forma autónoma los servicios
  críticos y gestiona la cobertura de seguimiento a medida que su sistema evoluciona.
further_reading:
- link: https://www.datadoghq.com/blog/bits-detection/
  tag: Blog
  text: Haga un seguimiento de forma autónoma de las degradaciones impactantes con
    Bits Detection
title: Bits Detection
---
{{< callout url="#" btn_hidden="true" header="false">}}
  Bits Detection está en versión preliminar. Comuníquese con su representante de Datadog para solicitar acceso.
{{< /callout >}}

## Descripción general {#overview}

La cobertura de seguimiento se desvía con el tiempo. A medida que los ingenieros agregan puntos de conexión, mueven dependencias y cambian los flujos de usuario, los seguimientos siguen reflejando el sistema tal como era. Un servicio puede parecer saludable en el nivel superior mientras una ruta crítica está fallando. Bits Detection identifica qué puntos de conexión necesitan cobertura, establece la lógica de detección a partir del comportamiento observado en producción y mantiene la cobertura actualizada sin que su equipo tenga que crear, ajustar y mantener manualmente cada seguimiento.

Cuando Bits Detection marca un problema, señala el punto de conexión afectado y la telemetría relacionada como punto de partida para la clasificación. Es el paso inicial en el flujo de trabajo de Bits AI, que continúa a través de la investigación con [Bits Investigation][4] hasta el análisis de la causa raíz y la remediación.

## Habilitar Bits Detection {#enable-bits-detection}

<div class="alert alert-danger">Bits Detection está en versión preliminar. Comuníquese con su representante de Datadog para solicitar acceso.</div>

Después de habilitar Bits Detection, este inicializa el seguimiento para los 100 servicios más críticos en su entorno, basándose en la telemetría del servicio, las dependencias, los metadatos de propiedad, los cambios recientes y las señales de impacto en el usuario. La cobertura es compatible con servicios HTTP y gRPC instrumentados con APM, priorizando el seguimiento en el borde de su aplicación. Para solicitar cobertura para tipos de recursos adicionales, comuníquese con [Datadog Support][1].

Los seguimientos existentes de su equipo permanecen en su lugar. Bits Detection trabaja junto a ellos, añadiendo cobertura adaptativa para las partes de su sistema que cambian demasiado rápido para modelarlas manualmente.

Puede habilitar Bits Detection para servicios adicionales desde varios puntos de entrada:

### Opción 1: Bits Detection Coverage Page {#enable-from-bits-ai}
1. En Datadog, vaya a [{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Detection{{< /ui >}}][5] y haga clic en {{< ui >}}Enable New Detection Coverage{{< /ui >}}.
1. Filtre la lista de servicios para encontrar los servicios que desea habilitar y seleccione uno o más servicios de la lista.
1. Configure un destino de notificación para que el equipo sepa cuándo Bits Detection encuentra una degradación crítica.
1. Revise la cobertura administrada una vez que se complete la inicialización. Recibirá un correo electrónico cuando su nueva postura de salud esté lista.

### Opción 2: Página de servicio {#enable-from-service-page}

1. En Datadog, vaya a [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Services{{< /ui >}}][2] y seleccione un servicio.
1. Abra la descripción general del seguimiento del servicio desde la barra de estado del monitor o la tarjeta de Bits Detection.
1. Siga las instrucciones para habilitar el seguimiento de Bits Detection para el servicio.
1. Revise la cobertura administrada una vez que se complete la inicialización. Recibirá un correo electrónico cuando su nueva postura de salud esté lista.

## Use Bits Detection {#use-bits-detection}

Bits Detection administra el seguimiento en tres etapas:

- **Identificar recursos críticos**: Bits Detection evalúa los servicios y recursos compatibles para determinar qué puntos de conexión, dependencias o flujos son probablemente importantes para sus usuarios y su negocio.
- **Detectar degradaciones significativas**: Bits Detection crea y ajusta seguimientos administrados para recursos críticos.
- **Adaptarse a medida que los servicios cambian**: Bits Detection mantiene el seguimiento alineado con la producción al reevaluar la criticidad de los recursos, la cobertura de seguimiento y el comportamiento de las alertas a medida que sus servicios evolucionan.

Use las secciones a continuación para revisar la cobertura, configurar el enrutamiento de alertas y proporcionar comentarios para ayudar a Bits a adaptarse con el tiempo.

### Revisar el monitoreo de Bits Detection {#review-bits-detection-monitoring}

Use la Página de cobertura de Bits Detection, la Página de servicio o la Lista de seguimientos para revisar cómo Bits Detection está haciendo un seguimiento de su sistema.

**Página de cobertura de Bits Detection**

Para revisar todos los contextos donde Bits Detection está activo, vaya a [{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Detection{{< /ui >}}][5]. Cada fila es un contexto de detección que muestra la cantidad de puntos de conexión críticos y seguimientos administrados que Bits mantiene, cuándo alertó el contexto por última vez, si las notificaciones de alerta están configuradas y si la investigación automática está habilitada. Seleccione un contexto para abrir sus Bits Detection Details, donde puede revisar el estado de salud durante un período de tiempo elegido, los puntos de conexión que Bits Detection considera críticos (cada uno con una justificación que explica por qué fue seleccionado), los seguimientos que Bits Detection administra y el historial de alertas del contexto.

Desde la página de Cobertura, usted puede:

- Revisar el estado de salud de Bits Detection para todos los servicios cubiertos.
- Habilitar una nueva cobertura de detección seleccionando los servicios que desea que Bits haga un seguimiento.
- Visualizar detalles para un contexto administrado.
- Revisar los puntos de conexión críticos cubiertos por Bits Detection.
- Marcar un punto de conexión como no crítico.
- Administrar reglas de notificación de alerta.

**Página de servicio**

Para abrir la vista de Bits Detection para un servicio, vaya a [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Services{{< /ui >}}][2], seleccione un servicio y abra la descripción general de seguimiento desde la barra de estado del monitor o la tarjeta de Bits Detection.

{{< img src="bits_ai/bits_detection/service_page_bits_detection_card.png" alt="La tarjeta de Bits Detection en la página de APM Services que muestra el estado de monitoreo y los puntos de conexión críticos para un servicio." style="width:90%;" >}}

La Página de servicio muestra los seguimientos de Bits Detection para el servicio, incluyendo su estado actual y el historial de alerta, junto con los puntos de conexión que Bits Detection considera críticos. Bits prioriza los puntos de conexión con mayor probabilidad de afectar directamente a los clientes (como las rutas de pago, registro o autenticación) y cada punto de conexión incluye una justificación de criticidad que explica por qué fue seleccionado.

Desde la Página de servicio, usted puede:

- Revisar el estado de salud de Bits Detection para el servicio.
- Abrir una alerta activa.
- Visualizar detalles para un tipo de detección administrado.
- Revisar los puntos de conexión críticos cubiertos por Bits Detection.
- Marcar un punto de conexión como no crítico.
- Administrar reglas de notificación de alerta.

**Lista de seguimientos**

Para visualizar los seguimientos de Bits Detection, vaya a [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}List{{< /ui >}}][3] y seleccione el filtro {{< ui >}}Bits Managed{{< /ui >}}. El banner de resumen muestra la cantidad de seguimientos administrados en cada estado. Expanda una fila de servicio para visualizar sus seguimientos administrados.

{{< img src="bits_ai/bits_detection/monitor_list_bits_managed.png" alt="La Lista de seguimientos filtrada por seguimientos administrados por Bits, que muestra los servicios agrupados por estado de seguimiento administrado." style="width:90%;" >}}

La Lista de seguimientos agrupa los seguimientos de Bits Detection por servicio. Para cada servicio, puede revisar el estado, la prioridad, el nombre del seguimiento y las etiquetas de cada seguimiento administrado. Los seguimientos de Bits Detection están etiquetados con un icono de destello para que pueda distinguirlos de los seguimientos que sus equipos crean y mantienen.

### Administre las notificaciones de Bits Detection {#manage-bits-detection-notifications}

Los seguimientos de Bits Detection están ajustados al comportamiento de producción, no a umbrales estáticos. Utilice reglas de notificación de alertas para dirigir las alertas a los equipos correctos. Para configurar una regla, vaya a la [descripción general de monitoreo de servicios][2] y haga clic en {{< ui >}}Set Up Alert Notification Rules{{< /ui >}}.

1. En {{< ui >}}Match notifications with specific tags{{< /ui >}}, revise la consulta. Datadog completa previamente la regla con etiquetas para el servicio seleccionado y los seguimientos administrados por Bits Detection. Puede filtrar aún más.
1. En {{< ui >}}Choose routing conditions and recipients{{< /ui >}}, seleccione {{< ui >}}Manual Routing{{< /ui >}} o {{< ui >}}Dynamic Routing{{< /ui >}}.
1. Agregue los destinatarios que deben recibir las notificaciones de seguimientos coincidentes.
1. Asigne un nombre a la regla.
1. Defina los permisos para la regla.
1. Haga clic en {{< ui >}}Create Rule{{< /ui >}}.

La regla de notificación se aplica a los seguimientos que coinciden con la consulta de etiquetas. El panel lateral muestra cuántos seguimientos coinciden con la regla y enumera ejemplos de seguimientos coincidentes.

### Ayude a Bits a aprender {#help-bits-learn}

Utilice los comentarios para ajustar Bits Detection para su entorno. Puede marcar las alertas como útiles o ruidosas, y actualizar qué puntos de conexión se consideran críticos desde la página de servicio.

**Proporcione comentarios sobre una alerta**

1. Abra la alerta de Bits Detection.
1. En el aviso de comentarios, haga clic en {{< ui >}}Yes{{< /ui >}} si Bits debería haberle alertado, o haga clic en {{< ui >}}No, Because…{{< /ui >}} si no debería haberlo hecho.
1. Si hizo clic en {{< ui >}}No, Because…{{< /ui >}}, seleccione un motivo.
1. Haga clic en {{< ui >}}Send Feedback{{< /ui >}}.

**Proporcione comentarios sobre la criticidad del recurso**

Bits Detection utiliza la criticidad para determinar qué recursos deben tener cobertura de seguimiento administrado. Desde la [descripción general del servicio monitoring][2], haga clic en {{< ui >}}Mark as Not Critical{{< /ui >}} junto a un punto de conexión que no debería tener cobertura crítica, o en {{< ui >}}Add a New Endpoint{{< /ui >}} para marcar uno como crítico.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help
[2]: https://app.datadoghq.com/apm/services
[3]: https://app.datadoghq.com/monitors/manage?bits_monitors=true
[4]: /es/bits_ai/bits_investigation/
[5]: https://app.datadoghq.com/bits-ai/detection/scopes