---
aliases:
- /es/service_management/incident_management/declare/
title: Declarar un incident (incidente)
---

## Información general

En el paradigma de Datadog, cualquiera de las siguientes situaciones es apropiada para declarar una incidencia:
- Un problema afecta o puede afectar a los clientes.
- Crees que un problema (incluso interno) debe tratarse con carácter de urgencia.
- No sabes si debes considerarlo un incidente - notificar a otras personas y aumentar la gravedad adecuadamente.

Puedes declarar un incidente desde múltiples lugares dentro de la plataforma Datadog, como un widget gráfico en un dashboard, la interfaz de usuario de incidentes o cualquier alerta que se notifique en Datadog.

## Modal de declaración

Al declarar un incident (incidente), aparece un modal de declaración. Este modal tiene varios elementos básicos:

| Elementos de un incidente  | Descripción |
| ------------------ | ----------- |
| Título              | (Obligatorio) Un título descriptivo del incident (incidente). |
| Nivel de gravedad     | (Obligatorio) En forma predeterminada, la gravedad va de SEV-1 (la más grave) a SEV-5 (la menos grave). Puedes personalizar el número de gravedades y sus descripciones en parámetros de Incident Management.
| Líder del incidente | La persona asignada para dirigir la respuesta al incident (incidente). |

Puedes configurar [Parámetros de Incident Management][2] para incluir más campos en el modal de declaración de incident (incidente) o exigir determinados campos.


## En la página de incidentes

En la [interfaz de usuario de Datadog][1], haz clic en **Declare Incident** (Declarar incidencia) para crear una incidencia.

En el modal *Declarar incident (incidente)* se muestra un panel lateral plegable que contiene texto de ayuda y descripciones para las gravedades y estados utilizados por tu organización. El texto de ayuda y las descripciones se pueden personalizar en [Parámetros de incident (incidente)][2].

## Desde un monitor

Puedes declarar un incidente directamente desde un monitor desde el desplegable Acciones. Selecciona **Declarar incidente** para abrir un modal de creación de incidentes y el monitor se añadirá al incidente como una señal. También puedes añadir un monitor a un incidente existente.

{{< img src="service_management/incidents/declare/declare_monitor.png" alt="Menú desplegable de Acciones en monitores donde puedes seleccionar la opción Declarar incidente" style="width:50%;" >}}

Alternativamente, puedes hacer que un monitor (noun) cree automáticamente un incident (incidente) cuando pase a un estado `warn`, `alert` o `no data`. Para activarlo, haz clic en **Add Incident** (Añadir incident (incidente)) en la sección **Configure notifications and automations** (Configurar notificaciones y automatizaciones) de un monitor (noun) y selecciona una opción de `@incident-`. Los administradores pueden crear opciones de `@incident-` en [Parámetros de incident (incidente)][9].

Los incidents (incidentes) creados a partir de un monitor (noun) heredarán [valores de campo][10] de las tags (etiquetas) del monitor (noun). Para enviar notificaciones automáticas desde incidents (incidentes), añade tags (etiquetas) a un monitor (noun) para que los incidents (incidentes) creados coincidan con los criterios de las [reglas de notificación][11].

## Desde una señal de seguridad

Declara un incident (incidente) directamente desde el panel lateral de una señal de Cloud SIEM o de Protección de la carga de trabajo, haciendo clic en **Declare incident** (Declarar incident (incidente)) o **Escalate Investigation** (Escalar investigación). Para obtener más información, consulta [Investigar señales de seguridad][3].

Declara un incident (incidente) desde una señal de protección de la aplicación and la API a través de las acciones que aparecen en el panel lateral de señales. Haz clic en **Show all actions** (Mostrar todas las acciones) y haz clic en **Declare Incident** (Declarar incident (incidente)).
Para obtener más información, consulta [Investigar señales de seguridad][4] para protección de la aplicación y la API.

{{< img src="/service_management/incidents/declare/declare_asm.png" alt="Tu descripción de imagen" style="width:90%;" >}}

## A partir de un caso

Declarar un incidente desde [Gestión de Casos][5]. En la página de detalles del caso individual, haz clic en **Declarar incidente** para elevar un caso a la categoría de incidente.

{{< img src="service_management/incidents/declare/declare_case_management.png" alt="Ejemplo de una página de un caso donde está resaltado el botón Declarar incidente en la parte superior de la página" style="width:90%;" >}}

## A partir de un gráfico
Puedes declarar una incidencia directamente desde un gráfico al hacer clic en el botón de exportación del gráfico y, a continuación, en **Declare incident** (Declarar incidencia). Aparecerá el modo de creación de incidencias y el gráfico se añadirá a la incidencia como una señal.

{{< img src="service_management/incidents/from-a-graph.png" alt="Crear una incidencia desde un gráfico" style="width:80%;">}}

## A partir de un test de Sintético 

Crea incidentes directamente desde un [Test de Sintético][8] a través del desplegable Acciones. Selecciona **Declarar incidente** para abrir un modal de creación de incidentes, donde se añade un resumen del test a tu línea de tiempo de incidentes, que te permite continuar la investigación desde ahí.

{{< img src="service_management/incidents/declare/synthetics_declare_incident.png" alt="Declara un incidente desde un test de Sintético." style="width:90%;" >}}

## Desde el portapapeles de Datadog 
Utiliza el [Portapapeles de Datadog][6] para reunir varios monitores y gráficos y generar un incidente. Para declarar un incidente desde el portapapeles, copia un gráfico que desees investigar y abre el portapapeles con el comando `Cmd/Ctrl + Shift + K`. Haz clic en **Declarar incidente** o en el icono de exportación para añadirlo al incidente como señal.

{{< img src="service_management/incidents/declare/declare_clipboard.png" alt="Declara un incidente desde el portapapeles de Datadog" style="width:90%;" >}}

## En la page (página) Datadog On-Call

Puedes declarar un incident (incidente) directamente desde una [page (página) Datadog On-Call][12]. En la [Lista de páginas de guardia][13], selecciona una page (página) y haz clic en **Declare Incident** (Declarar incident (incidente)) para crear un incident (incidente) y asociarlo automáticamente al equipo de guardia correspondiente.

## Desde Slack

Si tienes habilitada la opción [Integración de Datadog en Slack][7], puedes declarar un nuevo incidente con el comando de barra `/datadog incident` desde cualquier canal de Slack.

Si el usuario que declara el incidente conecta su Slack a su cuenta Datadog, en forma predeterminada, ese usuario aparece como Comandante de incidentes. El Comandante de incidentes (CI) puede cambiarse posteriormente en la aplicación si fuera necesario. Si el usuario que declara un incidente no es miembro de una cuenta Datadog, el CI se asigna a una cuenta genérica `Slack app user` y puede asignarse a otro CI en la aplicación.

{{< img src="service_management/incidents/from-slack.png" alt="Crear una incidencia desde Slack" style="width:60%;">}}

Después de declarar un incidente desde Slack, se genera un canal de incidentes.

## Desde las notificaciones de traspaso

La notificación de traspaso muestra tarjetas de aviso cuando se te llama o se te añade a incidents (incidentes) activos. Estas tarjetas te permiten:

- Visualizar y acusar recibo de las pages (páginas) de guardia
- Ve a los recursos pertinentes de incident (incidente) 
- Vista previa de los mensajes de Slack desde los canales de incident (incidente) 
- Tomar medidas directas sobre los incidents (incidentes)

{{< img src="/service_management/incidents/declare/handoff_notification_card.png" alt="Tarjeta de notificación de traspaso en que se muestran detalles de incident (incidente) con opciones de visualizar, acusar recibo y tomar medidas" style="width:100%;" >}}

Las tarjetas de notificación de traspaso permanecen visibles hasta que se retiren o hasta que cambie el estado del incident (incidente). Puedes expandir, contraer o descartar todo el contenedor de traspasos en lugar de tarjetas individuales.

Puedes declarar un incident (incidente) desde tarjetas individuales de Notificación de Traspaso.

## Próximos pasos

{{< whatsnext desc="Add helpful information to your incident and give context to everyone that is involved in the investigation.">}}
    {{< nextlink href="/incident_response/incident_management/describe" >}}Describe el incident (incidente): Añade contexto y detalles{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/incidents
[2]: /es/incident_response/incident_management/incident_settings#information
[3]: /es/security/workload_protection/security_signals/#declare-an-incident
[4]:/es/security/workload_protection/security_signals/#declare-an-incident
[5]: /es/incident_response/case_management/view_and_manage
[6]: /es/incident_response/incident_management/datadog_clipboard
[7]: /es/integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[8]: https://app.datadoghq.com/synthetics/tests
[9]: https://app.datadoghq.com/incidents/settings?section=global-settings
[10]: /es/incident_response/incident_management/incident_settings/property_fields
[11]: /es/incident_response/incident_management/incident_settings/notification_rules
[12]: /es/incident_response/on-call/
[13]: https://app.datadoghq.com/on-call/pages