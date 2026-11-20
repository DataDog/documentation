---
aliases:
- /es/service_management/incident_management/declare/
- /es/incident_response/incident_management/declare
title: Declarar un incidente
---
## Descripción general {#overview}

En el paradigma de Datadog, cualquiera de las siguientes son situaciones apropiadas para declarar un incidente:
- Un problema está afectando o podría estar afectando a los clientes.
- Usted considera que un problema (incluido uno interno) debe abordarse como una emergencia.
- No sabe si debe declarar un incidente: notifique a otras personas y aumente la gravedad según corresponda.

Puede declarar un incidente desde varios lugares dentro de la plataforma Datadog, como un widget de gráfico en un tablero, la interfaz de usuario de Incidentes o cualquier alerta que se informe en Datadog.

## Modal de declaración {#declaration-modal}

Cuando declara un incidente, aparece un modal de declaración. Este modal tiene varios elementos principales:

| Elementos del incidente  | Descripción |
| ------------------ | ----------- |
| Título              | (Obligatorio) Un título descriptivo para el incidente. |
| Nivel de gravedad     | (Obligatorio) De forma predeterminada, la gravedad varía de SEV-1 (la más grave) a SEV-5 (la menos grave). Puede personalizar el número de niveles de gravedad y sus descripciones en la configuración de Incident Management.
| Comandante de incidentes | La persona asignada para dirigir la respuesta al incidente. |

Puede configurar [Incident Management Settings][2] para incluir más campos en el modal de declaración de incidentes o requerir ciertos campos.


## Desde la página de Incidentes {#from-the-incident-page}

En la [Datadog UI][1], haga clic en **Declare Incident** para crear un incidente.

El modal *Declare Incident* muestra un panel lateral plegable que contiene texto auxiliar y descripciones de los niveles de gravedad y estados utilizados por su organización. El texto de ayuda y las descripciones se pueden personalizar en [Incident Settings][2].

## Desde un monitor {#from-a-monitor}

Puede declarar un incidente directamente desde un monitor. Seleccione **Declare incident** para abrir un modal de creación de incidentes, y el monitor se agregará al incidente como una señal. También puede agregar un monitor a un incidente existente.

{{< img src="incident_response/incident_management/investigate/declare/declare_monitor.png" alt="Menú desplegable de acciones en los monitores donde puede seleccionar la opción Declarar incidente." style="width:50%;" >}}

Alternativamente, puede hacer que un monitor cree automáticamente un incidente cuando pase a un estado de `warn`, `alert` o `no data`. Para habilitar esto, haga clic en **Add Incident** en la sección **Configure notifications and automations** de un monitor y seleccione una opción de `@incident-`. Los administradores pueden crear opciones de `@incident-` en [Incident Settings][9].

Los incidentes creados desde un monitor heredarán [field values][10] de las etiquetas del monitor. Para enviar notificaciones automatizadas desde incidentes, agregue etiquetas a un monitor para que los incidentes creados coincidan con los criterios de [notification rules][11].

## Desde una señal de Security {#from-a-security-signal}

Declare un incidente directamente desde el panel lateral de una señal de Cloud SIEM o Workload Protection, haciendo clic en **Declarar incidente** o **Escalar investigación**. Para obtener más información, consulte [Investigate Security Signals][3].

Declare un incidente desde una señal de App and API Protection a través de las acciones enumeradas en el panel lateral de la señal. Haga clic en **Mostrar todas las acciones** y haga clic en **Declarar incidente**.
Para obtener más información, consulte [Investigate Security Signals][4] para App and API Protection.

{{< img src="/incident_response/incident_management/investigate/declare/declare_asm.png" alt="Descripción de su imagen" style="width:90%;" >}}

## Desde un secreto filtrado {#from-a-leaked-secret}

Declare un incidente desde [Secret Scanning][15] haciendo clic en **Declarar incidente** en el panel lateral de detección. El incidente se pre-llena con todos los metadatos de detección.

{{< img src="/incident_response/incident_management/investigate/declare/declare-secrets.png" alt="Descripción de su imagen" style="width:90%;" >}}

## Desde un elemento de trabajo {#from-a-work-item}

Declare un incidente desde [Work Management][5]. Desde la página de detalles del elemento de trabajo individual, haga clic en **Declarar incidente** para escalar un elemento de trabajo a un incidente.

## Desde un gráfico {#from-a-graph}
Puede declarar un incidente directamente desde un gráfico haciendo clic en el botón de exportación en el gráfico y luego haciendo clic en **Declarar incidente**. Aparece el modal de creación de incidentes y el gráfico se añade al incidente como una señal.

{{< img src="incident_response/incident_management/from-a-graph.png" alt="Cree un incidente desde un gráfico" style="width:80%;">}}

## Desde una prueba Synthetic {#from-a-synthetic-test}

Cree incidentes directamente desde una [prueba Synthetic][8] a través del menú desplegable Acciones. Seleccione **Declarar incidente** para abrir un modal de creación de incidentes, donde se añade un resumen de la prueba a la línea de tiempo de su incidente, lo que le permite continuar la investigación desde allí.

{{< img src="incident_response/incident_management/investigate/declare/synthetics_declare_incident.png" alt="Declare un incidente desde una prueba Synthetic." style="width:90%;" >}}

## Desde el portapapeles de Datadog {#from-the-datadog-clipboard}
Utilice el [portapapeles de Datadog][6] para recopilar varios monitores y gráficos y generar un incidente. Para declarar un incidente desde el portapapeles, copie un gráfico que desee investigar y abra el portapapeles con el comando `Cmd/Ctrl + Shift + K`. Haga clic en **Declarar incidente** o en el icono de exportación para añadirlo al incidente como una señal.

{{< img src="incident_response/incident_management/investigate/declare/declare_clipboard.png" alt="Declare un incidente desde el portapapeles de Datadog" style="width:90%;" >}}

## Desde una página de Datadog On-Call {#from-a-datadog-on-call-page}

Puede declarar un incidente directamente desde una [página de Datadog On-Call][12]. Desde la [lista de páginas de On-Call][13], seleccione una página y haga clic en **Declare Incident** para crear un incidente y asociarlo automáticamente con el equipo de On-Call correspondiente.

## Desde Slack {#from-slack}

Si tiene la [integración de Datadog habilitada en Slack][7], puede declarar un nuevo incidente con el comando de barra diagonal `/datadog incident` desde cualquier canal de Slack.

Si el usuario que declara el incidente conectó su Slack a su cuenta de Datadog, de forma predeterminada, ese usuario aparece como el Comandante del Incidente. El Comandante del Incidente (IC) puede cambiarse más tarde en la aplicación si es necesario. Si el usuario que declara un incidente no es miembro de una cuenta de Datadog, entonces el IC se asigna a un `Slack app user` genérico y puede asignarse a otro IC en la aplicación.

{{< img src="incident_response/incident_management/from-slack.png" alt="Cree un incidente desde Slack." style="width:60%;">}}

Después de declarar un incidente desde Slack, se genera un canal de incidentes.

## Desde Google Chat {#from-google-chat}

Si ha configurado la [integración de Datadog para Google Chat][14], puede declarar un incidente con el comando de barra diagonal `/dd_incident` desde cualquier espacio de Google Chat.

## Desde Notifications de transferencia {#from-handoff-notifications}

La Notifications de transferencia muestra tarjetas de aviso cuando se le página o se le agrega a incidentes activos. Estas tarjetas le permiten:

- Ver y reconocer páginas de On-Call
- Navegar a los recursos relevantes del incidente
- Previsualizar mensajes de Slack de los canales de incidentes
- Tomar medidas directas sobre los incidentes

{{< img src="/incident_response/incident_management/investigate/declare/handoff_notification_card.png" alt="Tarjeta de Notifications de transferencia que muestra los detalles del incidente con opciones para ver, reconocer y tomar medidas" style="width:100%;" >}}

Las tarjetas de Notifications de transferencia permanecen visibles hasta que se descartan o hasta que cambia el estado del incidente. Puede expandir, contraer o descartar todo el contenedor de transferencia en lugar de tarjetas individuales.

Puede declarar un incidente desde tarjetas individuales de Notifications de transferencia.

## ¿Qué sigue? {#whats-next}

{{< whatsnext desc="Agregue información útil a su incidente y proporcione contexto a todos los involucrados en la investigación.">}}
    {{< nextlink href="/incident_response/incident_management/investigate/describe" >}}Describa el incidente: agregue contexto y detalles{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/incidents
[2]: /es/incident_response/incident_management/setup_and_configuration/information
[3]: /es/security/workload_protection/investigate_and_triage/security_signals/actions/#declare-an-incident
[4]: /es/security/application_security/threat_protection/security_signals/#declare-an-incident
[5]: /es/incident_response/work_management/view_and_manage
[6]: /es/dashboards/guide/datadog_clipboard
[7]: /es/integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[8]: https://app.datadoghq.com/synthetics/tests
[9]: https://app.datadoghq.com/incidents/settings?section=global-settings
[10]: /es/incident_response/incident_management/setup_and_configuration/property_fields
[11]: /es/incident_response/incident_management/setup_and_configuration/notification_rules
[12]: /es/incident_response/on-call/
[13]: https://app.datadoghq.com/on-call/pages
[14]: /es/integrations/google-hangouts-chat/
[15]: /es/security/code_security/secret_scanning/