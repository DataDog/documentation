---
aliases:
- /es/service_management/case_management/create_case/
further_reading:
- link: /incident_response/case_management/view_and_manage
  tag: Documentación
  text: Ver y gestionar casos
- link: /incident_response/case_management/customization
  tag: Documentación
  text: Personalización de incidencias
title: Crear un caso
---

## Información general

Las incidencias pueden crearse [manualmente](#manual-case-creation), [automáticamente](#automatic-case-creation) desde Datadog, o [programáticamente](#api) con la API. Existen dos tipos de incidencias: estándar y de seguridad. Las incidencias creadas a partir de señales de seguridad y Sensitive Data Scanner se convierten automáticamente en incidencias de seguridad. El tipo de incidencia de seguridad tiene todas las características del tipo de incidencia estándar, junto con un campo obligatorio para especificar el motivo del cierre de una incidencia (test, falso positivo o excepción única).

## Creación manual de casos

1. Navega hasta la [página de Case Management][1].
1. Selecciona un proyecto donde crear la incidencia. **Nota**: Una incidencia solo puede pertenecer a un único proyecto.
1. Haz clic en **New Case** (Nueva incidencia).
1. Escribe un título para el caso.
1. Selecciona un [tipo de incidencia](#case-types).
1. Añade un título.
1. (Opcional) Añade una descripción.
1. Haz clic en **Create Case** (Crear caso) para finalizar.

También puedes crear casos manualmente, a partir de los siguientes productos:

| Producto | Instrucciones    |
| ------  | ----------- |
| Monitores | - En una [página de estado del monitor][2], opcionalmente, limita el monitor a un marco temporal y grupos de monitores específicos. A continuación, haz clic en el menú desplegable **Actions** (Acciones) y selecciona **Create a case** (Crear una incidencia).<br> - En Slack, haz clic en **Create a case** bajo una notificación de monitor. |
| Señales de seguridad | Haz clic en una Señal de seguridad para abrir el panel lateral. Haz clic en **Escalate Investigation** (Escalar investigación) y selecciona **Create a case** (Crear una incidencia). |
| Error Tracking | Haz clic en un problema de Error Tracking para abrir el panel lateral. A continuación, haz clic en **Actions** (Acciones) y selecciona **Create a case** (Crear un caso). |
| Watchdog | Haz clic en una alerta para abrir su panel lateral. Haz clic en el menú desplegable **Actions** (Acciones) y selecciona **Create a case** (Crear una incidencia). |
| Gestión de eventos (eventos sin procesar) | Haz clic en un evento para abrir su panel lateral. Haz clic en el menú desplegable **Actions** (Acciones) y selecciona **Create a case** (Crear una incidencia). |
| Cloud Cost Management | Haz clic en una recomendación de costes para abrir su panel lateral. A continuación, haz clic en **Create case** (Crear caso). |
| Sensitive Data Scanner | Haga clic en **Create case** (Crear caso), junto a un incidente de Sensitive Data Scanner.  |
| Slack  | Haz clic en el botón **Create Case** (Crear caso), bajo una notificación de monitor en Slack.  |

## Creación automática de casos

Configura los siguientes productos para crear incidencias automáticamente:
| Productos | Instrucciones    |
| ------  | ----------- |
| Monitores | Navega a la [página Configuración de proyecto][4], haz clic en **Integrations** > **Datadog Monitors** (Integraciones > Monitores de Datadog), y haz clic en el conmutador para obtener tu @case-<project_handle>. <br><br> Cuando se crea un monitor, incluye `@case-{project_handle}` en la sección **Configure notifications and automations** (Configurar notificaciones y automatizaciones). Las incidencias se crean cuando el monitor transiciona a un estado diferente. Para solo crear incidencias para algunas transiciones de monitor, usa [variables condicionales][3]. Como ejemplo, para crear incidencias solo cuando se activa un monitor, encierra la mención `@case` con `{{#is_alert}}` y `{{/is_alert}}`.<br><br> Activa **Auto-close cases when the monitor group resolves** (Autocerrar incidencias cuando el grupo de monitor se resuelve) para reducir la limpieza manual.|
| Event Management (Correlaciones) | En Event Management, las correlaciones se configuran para agregar eventos desde Datadog y las fuentes externas crean incidencias automáticamente.   |
| Workflow Automation | 1. En un proceso nuevo o existente, añade un paso en el compilador de procesos y busca "Case Management."<br> 2. Selecciona la acción **Create Case** (Crear incidencia).<br> 3. Si el proceso se configura para ejecutarse en función de un monitor o un activador de señal de seguridad, añade los activadores de proceso pertinentes y asegúrate que hayas añadido el identificador del proceso a los recursos deseados. Para obtener más información, consulta [Activar un proceso][6].|
| Error Tracking | En Error Tracking, las incidencias se crean automáticamente cuando un problema se comenta o se asigna. |

## Tipos de incidencias

Añade los tipos de incidencias cuando estés creando una incidencia. No todos los tipos de incidencia están disponibles para su configuración entre la creación manual y la automática. Por ejemplo, solo los tipos `Standard`, `Security`, `Change Request` y `Event Management` están disponibles cuando se crean incidencias manualmente.

Para añadir y activar tipos personalizados de incidencia, consulta [Personalización de incidencia][7].

| Tipo de incidencias       | Descripción                                                                 |
|------------------|-----------------------------------------------------------------------------|
| Standard (Estándar)         | Una incidencia de uso general para tareas operativas, investigaciones y mucho más.     |
| Solicitud de cambio   | Se utiliza en los procesos de gestión de cambios para realizar un seguimiento de los cambios planificados o aprobados.   |
| Gestión de eventos | Integrado con el producto Event Management para albergar eventos correlacionados.    |
| Seguridad         | Utilizado por equipos y productos de seguridad para gestionar investigaciones o alertas.     |
| Error Tracking   | Vinculado al producto Error Tracking para rastrear y solucionar los problemas de las aplicaciones. |
| Tipo personalizado      | Añade un tipo de incidencia personalizado. Para obtener más información, consulta [Personalización de incidencia][7]. |

## API

Crea una incidencia a través del [endpoint de API][5].

**Nota**: Este endpoint requiere una autorización con un alcance`cases_write`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cases
[2]: /es/monitors/status/
[3]: /es/monitors/notify/variables/?tab=is_alert#conditional-variables
[4]: https://app.datadoghq.com/cases/settings
[5]: /es/api/latest/case-management/#create-a-case
[6]: /es/service_management/workflows/trigger/
[7]: /es/incident_response/case_management/customization