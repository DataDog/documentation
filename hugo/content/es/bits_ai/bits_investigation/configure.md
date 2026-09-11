---
aliases:
- /es/bits_ai/bits_ai_sre/configure/
title: Configure Integrations y ajustes
---
Configure Integrations para ampliar las capacidades de Bits Investigation:
- [Intégrese con plataformas de observabilidad y SCM de terceros](#integrate-with-third-party-observability-and-scm-platforms) para enriquecer las investigaciones con telemetría externa y contexto de código.
- [Envíe los hallazgos de la investigación a plataformas de ITSM y colaboración](#send-investigation-findings-to-itsm-and-collaboration-platforms) para agilizar la respuesta ante incidentes.
- [Obtenga contexto de bases de conocimientos](#pull-context-from-knowledge-bases) para incorporar manuales de procedimientos y documentación en las investigaciones.

## Intégrese con plataformas de observabilidad y SCM de terceros {#integrate-with-third-party-observability-and-scm-platforms}

Bits Investigation se integra con GitHub, Grafana, Dynatrace, Splunk, Sentry y ServiceNow para incorporar datos de observabilidad y código fuente en las investigaciones. También se requiere acceso al código fuente para que Bits Code genere una corrección de código cuando Bits Investigation identifica un problema que puede resolverse en el código.

### GitHub {#github}
Para configurar GitHub:
1. Instale la [GitHub integration][13].
1. [Etiquete su telemetría de APM con información de Git][14] para vincular las versiones de la aplicación en ejecución con repositorios y confirmaciones específicos.

## Envíe los hallazgos de la investigación a plataformas de ITSM y colaboración {#send-investigation-findings-to-itsm-and-collaboration-platforms}

De forma predeterminada, todas las investigaciones aparecen en la página [Bits Investigations][1].

Para las investigaciones de alertas de monitor, hay un resumen de los hallazgos disponible en la página de estado del monitor. Si su monitor ya tiene configuradas `@slack`, `@case` o `@oncall` [notificaciones][2], Bits publica automáticamente sus hallazgos en esos destinos. Si no es así, puede configurar esas integraciones siguiendo las instrucciones a continuación.


### Slack {#slack}

1. Asegúrese de que la [aplicación Datadog Slack][3] esté instalada en su espacio de trabajo de Slack.
1. En su monitor, vaya a {{< ui >}}Configure notifications and automations{{< /ui >}} y agregue el identificador `@slack-{channel-name}`. Esto envía notificaciones del monitor al canal de Slack que haya elegido.
1. Por último, vaya a [{{< ui >}}Bits Investigation{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][4] y conecte su espacio de trabajo de Slack. Esto permite que Bits escriba sus hallazgos directamente debajo de la notificación del monitor en Slack.

<div class="alert alert-info">Cada espacio de trabajo de Slack solo puede conectarse a una organización de Datadog.</div>

### Microsoft Teams (versión preliminar) {#microsoft-teams-preview}

1. [Conecte su inquilino de Microsoft a Datadog][12].
1. En su monitor, vaya a {{< ui >}}Configure notifications and automations{{< /ui >}} y agregue el identificador `@teams-{handle-name}`. Esto envía notificaciones del monitor al canal de MS Teams que haya elegido. Bits adjuntará sus hallazgos a estas notificaciones.

<div class="alert alert-info">
La integración de Microsoft Teams con Bits Investigation se encuentra en versión preliminar para todos los clientes.</div>

### Datadog Work Management {#datadog-work-management}

Datadog Work Management proporciona un espacio de trabajo centralizado para clasificar, realizar un seguimiento y solucionar los problemas detectados por Datadog y las integraciones de terceros. Bits Investigation entrega automáticamente sus hallazgos de investigación a Jira y ServiceNow a través de Work Management.

Para configurar Work Management y las integraciones de Jira y ServiceNow:
1. Cree un [proyecto de Work Management][5] para su equipo.
1. En Datadog, vaya a [{{< ui >}}Work Management{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][6]. En la lista de proyectos, expanda su proyecto, vaya a {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Datadog Monitors{{< /ui >}} y active el interruptor {{< ui >}}Enable Datadog Monitors integration for this project{{< /ui >}}. Esto genera el identificador único de su proyecto: `@case-{project_name}`.
1. En la misma página, en {{< ui >}}Integrations{{< /ui >}}, configure las integraciones de Jira y/o ServiceNow de Work Management. Cuando se crea un nuevo elemento de trabajo, Work Management puede abrir automáticamente el ticket de Jira o el incidente de ServiceNow correspondiente.
1. En su monitor, vaya a {{< ui >}}Configure notifications and automations{{< /ui >}} y agregue el identificador `@case-{project_name}`. Cuando el monitor se activa:
   - Datadog crea automáticamente un nuevo elemento de trabajo
   - El elemento de trabajo crea un ticket de Jira o un incidente de ServiceNow vinculado
   - Bits escribe sus hallazgos de investigación directamente en el elemento de trabajo, el cual se adjunta a Jira como un comentario de línea de tiempo o a ServiceNow como una nota de trabajo

### Datadog On-Call {#datadog-on-call}

Datadog On-Call es una solución de notificación que unifica el monitoreo, la alerta y la respuesta a incidentes en una sola plataforma.

Para configurar On-Call, en su monitor, vaya a {{< ui >}}Configure notifications and automations{{< /ui >}} y agregue el identificador `@oncall-{team}`. Los hallazgos de Bits pueden aparecer entonces en la página de On-Call en la aplicación móvil de Datadog, ayudando a sus equipos a clasificar problemas sobre la marcha.

## Extraiga contexto de bases de conocimientos {#pull-context-from-knowledge-bases}

### Confluence {#confluence}
Bits Investigation se integra con Confluence para:
- Encontrar documentación y manuales de procedimientos relevantes para respaldar sus investigaciones de alertas de monitor
- Permitirle interactuar con su contenido de Confluence directamente a través del chat

Para configurar Bits Investigation para usar Confluence:

1. Conecte su cuenta de Confluence Cloud siguiendo las instrucciones en la [tarjeta de integración de Confluence][7].
1. Opcionalmente, habilite el rastreo de cuentas para convertir a Confluence en una fuente de datos dentro de la interfaz de chat de Bits. Si no habilita el rastreo de cuentas, Bits aún puede usar Confluence para informar su plan de investigación.
1. Agregue un enlace a una página de Confluence en el mensaje de su monitor. Bits lee la página para extraer enlaces de telemetría de Datadog y otro contexto al formar su plan de investigación.
1. Puede visualizar todas las cuentas de Confluence conectadas en la [Bits Settings page][4].

## Configurar permisos {#configure-permissions}

Existen dos permisos de RBAC que se aplican a la Bits Investigation:

| Nombre                                                    | Descripción                            | Rol predeterminado           |
|:--------------------------------------------------------|:---------------------------------------|:-----------------------|
| Lectura de investigaciones de Bits (`bits_investigations_read`)   | Leer investigaciones de Bits.              | Datadog Read Only Role |
| Escritura de investigaciones de Bits (`bits_investigations_write`) | Ejecutar y configurar investigaciones de Bits. | Datadog Standard Role  |

Estos permisos se agregan de forma predeterminada a los roles administrados. Si su organización utiliza roles personalizados o ha modificado previamente los roles predeterminados, un administrador con el permiso de gestión de acceso de usuario debe agregar manualmente estos permisos a los roles correspondientes. Para obtener más detalles, consulte [Access Control][8].

### Deshabilitar Bits Investigation {#disable-bits-investigation}

Para evitar que su organización utilice Bits Investigation, un administrador con el permiso de gestión de acceso de usuario debe eliminar los permisos `bits_investigations_read` y `bits_investigations_write` de todos los roles. Para obtener más detalles, consulte [Access Control][8].

O bien, un administrador puede deshabilitar todos los productos de IA facturables a través de AI Credits utilizando el interruptor a nivel de organización en [Plan & Usage > AI Credits][16]. Para obtener más detalles, consulte [Controles de administrador para créditos de IA][17].

## Configurar límites de tasa {#configure-rate-limits}

Los límites de tasa definen la cantidad máxima de investigaciones automáticas que Bits puede ejecutar en un período continuo de 24 horas. Después de alcanzar un límite de tasa, puede continuar activando [investigaciones manuales][9].

### Tipos de límites de tasa {#types-of-rate-limits}

Límite por monitor
: Controla la frecuencia con la que se activan automáticamente las investigaciones desde un solo monitor dentro de un período continuo de 24 horas.
: **Predeterminado:** Cada monitor puede activar una investigación automática cada 24 horas.

Límite de la organización
: Define el número total de investigaciones automáticas que Bits puede ejecutar en toda su organización dentro de 24 horas.
: **Predeterminado:** Sin límite.

### Establecer un límite de tasa {#set-a-rate-limit}

Para establecer un límite de tasa:
1. Navegue a [{{< ui >}}Bits Investigation{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Rate Limits{{< /ui >}}][10].
2. Active el límite de tasa que desea habilitar.
3. Establezca el número máximo de investigaciones que desea ejecutar dentro de un periodo continuo de 24 horas.
4. Haga clic en {{< ui >}}Save{{< /ui >}}.

{{< img src="bits_ai/rate_limits.png" alt="Opciones para establecer un límite de tasa" style="width:60%;" >}}

## Audit Trail {#audit-trail}

Puede hacer un seguimiento de las acciones iniciadas por el usuario con [Audit Trail][11]. Se envían eventos cuando:
- Un usuario inicia manualmente una investigación y cuando la investigación se completa
- Se ejecuta una llamada a una herramienta en una investigación manual
- Un usuario habilita o deshabilita las investigaciones automáticas para un monitor
- Un usuario modifica el límite de frecuencia del monitor

## Acciones {#actions}

Bits Investigation proporciona tres [Acciones][15]:
- Activar investigación
- Obtener investigación
- Listar investigaciones

Puede utilizar estas acciones para crear flujos de trabajo, agentes y aplicaciones adaptados a su caso de uso.

## API {#api}

Puede activar y recuperar investigaciones mediante programación [a través de la API][18].

[1]: https://app.datadoghq.com/bits-ai/investigations
[2]: /es/monitors/notify
[3]: https://docs.datadoghq.com/es/integrations/slack/?tab=datadogforslack
[4]: https://app.datadoghq.com/bits-ai/settings/integrations
[5]: /es/incident_response/work_management/projects
[6]: https://app.datadoghq.com/work/settings
[7]: https://app.datadoghq.com/integrations/confluence
[8]: /es/account_management/rbac
[9]: /es/bits_ai/bits_investigation/investigate_issues#manually-start-an-investigation
[10]: https://app.datadoghq.com/bits-ai/settings/rate-limits
[11]: /es/account_management/audit_trail/events/#bits-ai-sre
[12]: /es/integrations/microsoft-teams/?tab=datadogapprecommended
[13]: /es/integrations/github/
[14]: /es/source_code/service-mapping
[15]: /es/actions/workflows/actions/
[16]: https://app.datadoghq.com/billing/bill-overview?detail_bd=ai_credits
[17]: /es/account_management/billing/ai_credits/#admin-controls
[18]: /es/api/latest/bits-ai/