---
aliases:
- /es/service_management/case_management/create_case/
- /es/incident_response/case_management/create_case/
further_reading:
- link: /incident_response/work_management/view_and_manage
  tag: Documentación
  text: Visualizar y administrar elementos de trabajo
- link: /incident_response/work_management/customization
  tag: Documentación
  text: Personalización de la gestión de trabajo
- link: https://www.datadoghq.com/blog/work-management/
  tag: Blog
  text: Centralice el trabajo humano y de agentes con Datadog Work Management
title: Crear un elemento de trabajo
---
## Descripción general {#overview}

Los elementos de trabajo se pueden crear [manualmente](#manual-work-item-creation), [automáticamente](#automatic-work-item-creation) desde Datadog, o [programáticamente](#api) con la API. Existen dos tipos de elementos de trabajo: standard y Security. Los elementos de trabajo creados a partir de señales de seguridad y Sensitive Data Scanner se convierten automáticamente en incidencias de Security. El tipo de trabajo Security tiene todas las funciones del tipo de trabajo estándar, junto con un campo obligatorio para especificar el motivo del cierre de un elemento de trabajo (prueba, falso positivo o excepción única).

## Creación manual de elementos de trabajo {#manual-work-item-creation}

1. Navegue a la [página de gestión de trabajo][1].
1. Seleccione un proyecto en el que crear el elemento de trabajo. **Nota**: Un elemento de trabajo solo puede pertenecer a un único proyecto.
1. Haga clic en **Nuevo elemento de trabajo**.
1. Escriba un título para el elemento de trabajo.
1. Seleccione un [tipo de trabajo](#work-types).
1. (Opcional) Agregue una descripción.
1. Haga clic en **Crear elemento de trabajo** para finalizar.

También puede crear elementos de trabajo manualmente desde los siguientes productos:

| Producto | Instrucciones    |
| ------  | ----------- |
| Monitors | - En una [monitor status page][2], opcionalmente, limite el monitor al contexto de un marco temporal y a uno o varios grupos de monitor específicos. Luego, en **Más acciones**, haga clic en **Crear un elemento de trabajo**.<br> - En Slack, haga clic en **Crear elemento de trabajo** debajo de una notificación de monitor. |
| Security signals | Junto a una señal, en la columna **Casos**, haga clic en el icono **Crear incidencia**. Luego, ingrese los detalles del elemento de trabajo en la ventana **Crear incidencia** que se abre. |
| Error Tracking | Haga clic en un problema de Error Tracking para abrir el panel lateral. Luego, haga clic en **Acciones** y seleccione **Agregar un elemento de trabajo**. |
| Watchdog | Haga clic en una alerta para abrir su panel lateral. Haga clic en el menú desplegable **Acciones** y seleccione **Crear un elemento de trabajo**. |
| Gestión de eventos (eventos sin procesar) | Haga clic en un evento para abrir su panel lateral. Haga clic en el menú desplegable **Acciones** y seleccione **Crear un elemento de trabajo**. |
| Cloud Cost Management | Haga clic en una recomendación de costo para abrir su panel lateral. Luego, haga clic en **Crear un elemento de trabajo**. |
| Sensitive Data Scanner | Haga clic en **Crear incidencia** junto a un problema de Sensitive Data Scanner.  |
| Slack | Haga clic en el botón **Crear elemento de trabajo** debajo de una notificación de monitor en Slack.  |

## Creación automática de elementos de trabajo {#automatic-work-item-creation}

Configure los siguientes productos para crear elementos de trabajo automáticamente:
| Producto | Instrucciones    |
| ------  | ----------- |
| Monitors | Vaya a la [Project Settings page][4], haga clic en **Integrations** > **Datadog Monitors** y haga clic en el interruptor para obtener su @case-<project_handle>. <br><br>Al crear un monitor, incluya `@case-{project_handle}` en la sección **Configure notifications and automations**. Los elementos de trabajo se crean automáticamente cuando el monitor cambia a un estado diferente. Para crear elementos de trabajo solo para ciertas transiciones de monitor, utilice [conditional variables][3]. Como ejemplo, para crear elementos de trabajo solo cuando se activa un monitor, envuelva la mención `@case` con "{{#is_alert}}` and `{{/is_alert}}`.<br><br> Active **Cerrar automáticamente los elementos de trabajo cuando el grupo de monitor se resuelva** para reducir la limpieza manual.|
| Event Management (Correlations) | En Event Management, las correlaciones configuradas para agregar eventos de Datadog y fuentes de terceros crean automáticamente elementos de trabajo.   |
| Workflow Automation | 1. En un flujo de trabajo nuevo o existente, agregue un paso (definir como pasos) en el Workflow builder y busque "Case Management."<br> 2. Seleccione la acción **Crear incidencia**.<br> 3. Si el flujo de trabajo está configurado para ejecutarse según un activador de monitor o señal de seguridad, agregue los activadores de flujo de trabajo relevantes y asegúrese de haber agregado el identificador del flujo de trabajo a los recursos deseados. Para obtener más información, consulte [Activar un flujo de trabajo][6].|
| Error Tracking | En Error Tracking, los elementos de trabajo se crean automáticamente cuando se comenta o se asigna un problema. |

## Tipos de trabajo {#work-types}

Agregue tipos de trabajo cuando cree un elemento de trabajo. No todos los tipos de trabajo están disponibles para su configuración entre la creación manual y automática. Por ejemplo, solo los tipos `Standard`, `Security` y `Change Request`, `Event Management` están disponibles al crear elementos de trabajo manualmente.

Para agregar y habilitar tipos de trabajo personalizados, consulte [Personalización de la gestión del trabajo][7].

| Tipo de trabajo  | Descripción                                                                 |
|------------------|-----------------------------------------------------------------------------|
| Estándar         | Un elemento de trabajo de propósito general para tareas operativas, investigaciones y más.     |
| Solicitud de cambio   | Se utiliza en flujos de trabajo de gestión de cambios para realizar un seguimiento de los cambios planificados o aprobados.   |
| Event Management | Integrado con el producto Event Management para albergar eventos correlacionados.    |
| Security         | Utilizado por equipos y productos de Security para gestionar investigaciones o alertas.     |
| Error Tracking   | Vinculado al producto Error Tracking para rastrear y solucionar problemas de la aplicación. |
| Tipo personalizado      | Agregue un tipo de trabajo personalizado. Para obtener más información, consulte [Personalización de la gestión de trabajo][7]. |

## API {#api}

Cree un elemento de trabajo a través del [punto de conexión][5] de la API.

**Nota**: Este punto de conexión requiere el contexto de autorización `cases_write`.

<div class="alert alert-info">Los puntos de conexión de la API de Work Management utilizan <code>case-management</code> terminología que refleja el nombre anterior del producto.</div>

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/work
[2]: /es/monitors/status/
[3]: /es/monitors/notify/variables/?tab=is_alert#conditional-variables
[4]: https://app.datadoghq.com/work/settings
[5]: /es/api/latest/case-management/#create-a-case
[6]: /es/actions/workflows/trigger/
[7]: /es/incident_response/work_management/customization