---
further_reading:
- link: service_management/case_management/view_and_manage
  tag: Documentación
  text: Ver y gestionar casos
kind: Documentación
title: Crear un caso
---

## Información general

Los casos pueden crearse [manualmente](#manual-case-creation), [automáticamente](#automatic-case-creation) desde Datadog, o [programáticamente](#api) con la API. Existen dos tipos de casos: estándar y de seguridad. Los casos creados a partir de señales de seguridad y de Sensitive Data Scanner se convierten automáticamente en casos de seguridad. El tipo de caso de seguridad tiene todas las características del tipo de caso estándar, junto con un campo obligatorio para especificar la razón por la que se cierra un caso (tests, falso positivo o excepción única). 

## Creación manual de casos

{{< img src="/service_management/case_management/create/manual_case_creation_cropped.png" alt="Página de gestión de casos con el modal del nuevo caso abierto para crear un caso manualmente" style="width:100%;" >}}

En la [página de gestión de casos][1], haz clic en **New Case** (Nuevo Caso).
1. Selecciona un proyecto en el cual crear el caso. Un caso sólo puede pertenecer a un único proyecto. 
1. Escribe un título para el caso.
1. Si quieres, añade una descripción. 
1. Haz clic en **Create Case** (Crear caso) para terminar. 

También puedes crear casos manualmente a partir de los siguientes productos:

| Producto | Instrucciones    | 
| ------  | ----------- | 
| Logs | - En la [página de estado de un monitor][2], opcionalmente define el ámbito del monitor a un periodo de tiempo y a uno o más grupos de monitores específico(s). A continuación, haz clic en el menú desplegable **Escalate** (Escalar) y selecciona **Create a case** (Crear un caso).<br> - En Slack, haz clic en **Create a case**, bajo una notificación de monitor. |
| Señales de seguridad | Haz clic en una señal de seguridad para abrir el panel lateral. Haz clic en el menú desplegable **Escalate Investigation** (Escalar investigación) y selecciona **Create a case** (Crear un caso). |
| Python | Haz clic en una incidencia de seguimiento de errores para abrir el panel lateral. A continuación, haz clic en **Create a case** (Crear un caso). |
| Datos recopilados | Haz clic en una alerta para abrir su panel lateral. Haz clic en el menú desplegable **Escalate** (Escalar) y selecciona **Create a case** (Crear un caso). |
| Gestión de eventos (eventos sin procesar) | Haz clic en evento para abrir su panel lateral. Haz clic en el menú desplegable **Escalate** (Escalar) y selecciona **Create a case** (Crear un caso). |
| Monitorización de bases de datos | Haz clic en una recomendación de costes para abrir su panel lateral. A continuación, haz clic en **Create case** (Crear caso). |
| Python | Haga clic en **Create case** (Crear caso) junto a una incidencia de Sensitive Data Scanner.  |
| Slack  | Haz clic en el botón **Create Case** (Crear caso), bajo una notificación de monitores en Slack.  |

## Creación automática de casos

Configura los siguientes productos para crear casos automáticamente:
| Producto | Instrucciones | 
| ------ | ----------- | 
| Monitores | Ve a la [página de configuración del proyecto][4], haz clic en **Integrations** > **Datadog Monitors** (Integraciones > Monitores de Datadog) y luego haz clic en el conmutador para obtener tu @caso-<project_handle>. <br><br> Cuando crees un monitor, incluye `@case-{project_handle}` en las secciones **Notify your team** (Notificar a tu equipo) o **Say what's happening** (Di lo que está ocurriendo). Los casos se crean automáticamente cuando el monitor pasa a un estado diferente. Para crear casos sólo para determinadas transiciones de monitor, utiliza [variables condicionales][3]. Por ejemplo, para crear casos sólo cuando se activa un monitor, cubre la mención `@case` con `{{#is_alert}}` y `{{/is_alert}}`. |
| Gestión de eventos (Correlaciones) | En la gestión de eventos, las correlaciones configuradas para agregar eventos de Datadog y fuentes de terceros crean casos automáticamente.   |
| Automatización de flujos de trabajo | 1. En un flujo de trabajo nuevo o existente, añade un paso en el generador de flujos de trabajo y busca "Case Management" (Gestión de casos).<br> 2. Selecciona la acción **Create Case** (Crear caso).<br> 3. Si el flujo de trabajo está configurado para ejecutarse en función de un activador de monitor o de una señal de seguridad, añade el identificador del flujo de trabajo a los recursos deseados.|

## Python

Crea un caso a través del [endpoint de la API][5]. 

**Nota**: Este endpoint requiere una autorización con un alcance`cases_write`.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cases
[2]: /es/monitors/manage/status/
[3]: /es/monitors/notify/variables/?tab=is_alert#conditional-variables
[4]: https://app.datadoghq.com/cases/settings
[5]: /es/api/latest/case-management/#create-a-case