---
title: Configurar integraciones y ajustes
---

## Configurar dónde envía Bits los resultados de la investigación

Por defecto, todas las investigaciones aparecen en la página [Bits AI Investigations][1] (Investigaciones de Bits AI).

En el caso de las investigaciones de alertas de monitor, se puede consultar un resumen de los resultados en la página de estado del monitor. Si tu monitor ya tiene [notificaciones][2] `@slack`, `@case` u `@oncall` configuradas, Bits publica automáticamente sus hallazgos en esos destinos. Si no es así, puedes configurar esas integraciones siguiendo las instrucciones que aparecen a continuación. 


### Slack

1. Asegúrate de que la [aplicación de Datadog Slack][3] está instalada en tu espacio de trabajo de Slack.
1. En tu monitor, ve a **Configure notifications and automations** (Configurar notificaciones y automatizaciones) y añade el identificador `@slack-{channel-name}`. Esto envía notificaciones de monitor a tu canal de Slack elegido.
1. Por último, vaya a [**Bits AI SRE** > **Settings** > **Integrations**][4] (SRE de Bits AI > Configuración > Integraciones) y conecta tu espacio de trabajo de Slack. Esto permite a Bits escribir sus hallazgos directamente bajo la notificación de monitor en Slack.
   <div class="alert alert-info">Cada espacio de trabajo de Slack solo puede conectarse a una organización de Datadog.</div>

### Datadog Case Management

Datadog Case Management proporciona un espacio de trabajo centralizado para la clasificación, el seguimiento y la corrección de los problemas detectados por Datadog y las integraciones de terceros. El SRE de Bits AI envía automáticamente los resultados de sus investigaciones a Jira y ServiceNow a través de Case Management.

Para configurar Case Management, y las integraciones de Jira y ServiceNow:
1. Crea un [proyecto de Case Management][5] para tu equipo.
1. En Datadog, ve a [**Case Management** > **Settings**][6]** (Case Management > Configuración). En la lista de proyectos, expande tu proyecto, ve a **Integrations** > **Datadog Monitors** (Integraciones > Monitores de Datadog), y activa la opción **Enable Datadog Monitors integration for this project** (Activar la integración de monitores de Datadog para este proyecto). Esto genera el identificador único de tu proyecto: `@case-{project_name}`.
1. En la misma página, en **Integrations** (Integraciones), configura las integraciones Jira o ServiceNow de Case Management. Cuando se crea una nueva incidencia, Case Management puede abrir automáticamente el correspondiente tique de Jira o incidente de ServiceNow.
1. En tu monitor, ve a **Configure notifications and automations** (Configurar notificaciones y automatizaciones) y añade el identificador `@case-{project_name}`. Cuando se active el monitor:
   - Datadog crea automáticamente una nueva incidencia.
   - La incidencia crea un tique de Jira o un incidente de ServiceNow vinculado.
   - Bits escribe los resultados de su investigación directamente en la incidencia, que se adjunta a Jira como un comentario en la línea temporal o a ServiceNow como una nota de trabajo.

### Datadog On-Call

Datadog On-Call es una solución de localización que unifica la monitorización, la localización y la respuesta a incidentes en una única plataforma. 

Para configurar On-Call, en tu monitor, ve a **Configure notifications and automations** (Configurar notificaciones y automatizaciones) y añada el identificador `@oncall-{team}`. Los hallazgos de Bits pueden aparecer entonces en la página de On-Call en la aplicación móvil de Datadog, lo que ayuda a tus equipos a clasificar los problemas sobre la marcha.

## Configurar integraciones de bases de conocimientos

El SRE de Bits AI se integra con Confluence para:
- Encontrar la documentación y los runbooks pertinentes para respaldar sus investigaciones sobre alertas de monitor
- Permite interactuar con el contenido de Confluence directamente a través del chat

Para configurar el SRE de Bits AI para que utilice Confluence:

1. Conecta tu cuenta de Confluence Cloud siguiendo las instrucciones del [cuadro de integración de Confluence][7].
1. Opcionalmente, habilita el rastreo de cuentas para convertir Confluence en una fuente de datos dentro de la interfaz de chat de Bits. Si no habilitas el rastreo de cuentas, Bits puede seguir utilizando Confluence para informar su plan de investigación.
1. Añade un enlace a la página de Confluence en tu mensaje de monitor. Bits lee la página para extraer enlaces de telemetría y otros contextos de Datadog al formar su plan de investigación.
1. Puedes ver todas las cuentas de Confluence conectadas en la [página de Configuración de Bits][4].

### Buenas prácticas: optimiza la comprensión de tus conocimientos por parte de Bits

Ayuda a Bits a interpretar tu documentación y a actuar en consecuencia siguiendo estas buenas prácticas:
- Incluye enlaces telemétricos relevantes de Datadog en tus páginas de Confluence. Bits consulta estos enlaces para extraer información para su investigación.
- Proporciona instrucciones claras, paso por paso para resolver los problemas de monitor. Bits sigue estas instrucciones con precisión, por lo que ser específico conduce a resultados más precisos.
- Documentar detalladamente los servicios o sistemas implicados. Bits utiliza esta información para comprender el entorno y orientar eficazmente las investigaciones.

<div class="alert alert-tip">Cuanto más se ajuste tu página de Confluence al problema en cuestión, más útiles serán los Bits.</div>

## Configurar permisos

Hay dos permisos RBAC que se aplican al SRE de Bits AI:

| Nombre                                                    | Descripción                            | Rol por defecto           |
|:--------------------------------------------------------|:---------------------------------------|:-----------------------|
| Lectura de investigaciones de Bits (`bits_investigations_read`)   | Lee investigaciones de Bits.              | Rol de sólo lectura de Datadog |
| Escritura de investigaciones de Bits (`bits_investigations_write`) | Ejecutar y configurar las investigaciones de Bits. | Rol estándar de Datadog  |

Estos permisos se añaden por defecto a los roles gestionados. Si tu organización utiliza roles personalizados o ha modificado previamente los roles predeterminados, un administrador con el permiso User Access Manage (Gestión de acceso del usuario) necesita agregar manualmente estos permisos a los roles apropiados. Para obtener más información, consulta [Control de acceso][8].

## Configurar límites de tasa

Los límites de tasa definen el número máximo de investigaciones automáticas que el SRE de Bits AI puede ejecutar en un período continuo de 24 horas. Después de alcanzar un límite de tasa, puedes continuar activando [investigaciones manuales][9].


### Tipos de límites de tasa

Límite por monitor
: Controla la frecuencia con la que se activan automáticamente las investigaciones a partir de un único monitor dentro de una ventana móvil de 24 horas.
: **Por defecto:** Cada monitor puede activar una investigación automática cada 24 horas.

Limite de organización
: Define el número total de investigaciones automáticas que el SRE de Bits AI puede ejecutar en toda la organización en 24 horas.
: **Por defecto:** Sin límite.

### Establecer un límite de tasa

Para establecer un límite de tasa:
1. Ve a [**Bits AI SRE** > **Settings** > **Rate Limits**][10] (SRE de Bits AI > Configuración > Límites de tasa).
2. Activa el conmutador para el límite de tasa que deseas activar.
3. Establece el número máximo de investigaciones que deseas ejecutar dentro de una ventana móvil de 24 horas.
4. Haz clic en **Save** (Guardar).

{{< img src="bits_ai/rate_limits.png" alt="Opciones para establecer un límite de tasa" style="width:60%;" >}}

## Audit Trail

Puedes monitorizar acciones iniciadas por el usuario con [Audit Trail][11]. Los eventos se envían cuando:
- Un usuario inicia manualmente una investigación y cuando ésta finaliza
- Se ejecuta una llamada a la herramienta en una investigación manual
- Un usuario activa o desactiva las investigaciones automáticas para un monitor
- Un usuario modifica el límite de tasa del monitor



[1]: https://app.datadoghq.com/bits-ai/investigations
[2]: /es/monitors/notify
[3]: https://docs.datadoghq.com/es/integrations/slack/?tab=datadogforslack
[4]: https://app.datadoghq.com/bits-ai/settings/integrations
[5]: /es/incident_response/case_management/projects
[6]: https://app.datadoghq.com/cases/settings
[7]: https://app.datadoghq.com/integrations/confluence
[8]: /es/account_management/rbac
[9]: /es/bits_ai/bits_ai_sre/investigate_issues#manually-start-an-investigation
[10]: https://app.datadoghq.com/bits-ai/settings/rate-limits
[11]: /es/account_management/audit_trail/events/#bits-ai-sre