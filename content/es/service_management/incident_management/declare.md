---
title: Declarar un incidente
---

## Información general

En el paradigma de Datadog, cualquiera de las siguientes situaciones es apropiada para declarar una incidencia:
- Un problema afecta o puede afectar a los clientes.
- Crees que un problema (incluso interno) debe tratarse con carácter de urgencia.
- No sabes si debes considerarlo un incidente - notificar a otras personas y aumentar la gravedad adecuadamente.

Puedes declarar un incidente desde múltiples lugares dentro de la plataforma Datadog, como un widget gráfico en un dashboard, la interfaz de usuario de incidentes o cualquier alerta que se notifique en Datadog.

## En la página de incidentes

En la [interfaz de usuario de Datadog][1], haz clic en **Declare Incident** (Declarar incidencia) para crear una incidencia.

El modal *Declarar incidente* muestra un panel lateral plegable que contiene texto de ayuda y descripciones de las gravedades y los estados utilizados por tu organización. El texto de ayuda y las descripciones se pueden personalizar en [Configuración del incidentes][2]. 

## Desde un monitor

Puedes declarar un incidente directamente desde un monitor desde el desplegable Acciones. Selecciona **Declarar incidente** para abrir un modal de creación de incidentes y el monitor se añadirá al incidente como una señal. También puedes añadir un monitor a un incidente existente.

{{< img src="service_management/incidents/declare/declare_monitor.png" alt="Menú desplegable de Acciones en monitores donde puedes seleccionar la opción Declarar incidente" style="width:50%;" >}}

## Desde una señal de seguridad

Declara un incidente directamente desde un panel lateral de señales de amenazas de Cloud SIEM o Cloud Security Management, haciendo clic en **Declarar incidente** o **Escalar investigación**. Para obtener más información, consulta [Investigar señales de seguridad][3] para Cloud Security Management.

Declara un incidente desde una señal de Application Security Management a través de las acciones enumeradas en el panel lateral de la señal. Haz clic en **Mostrar todas las acciones** y haz clic en **Declarar incidente**.
Para obtener más información, consulta [Investigar señales de seguridad][4] para Application Security Management. 

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

## Desde Slack

Si tienes habilitada la opción [Integración de Datadog en Slack][7], puedes declarar un nuevo incidente con el comando de barra `/datadog incident` desde cualquier canal de Slack.

Si el usuario que declara el incidente conecta su Slack a su cuenta Datadog, en forma predeterminada, ese usuario aparece como Comandante de incidentes. El Comandante de incidentes (CI) puede cambiarse posteriormente en la aplicación si fuera necesario. Si el usuario que declara un incidente no es miembro de una cuenta Datadog, el CI se asigna a una cuenta genérica `Slack app user` y puede asignarse a otro CI en la aplicación.

{{< img src="service_management/incidents/from-slack.png" alt="Crear una incidencia desde Slack" style="width:60%;">}}

Después de declarar un incidente desde Slack, se genera un canal de incidentes.

## Próximos pasos

{{< whatsnext desc="Añade información útil a tu incidente y brinda contexto a todos los participantes de la investigación.">}}
    {{< nextlink href="/service_management/incident_management/describe" >}}Describe el incidente: Añade contexto y detalles{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/incidents
[2]: /es/service_management/incident_management/incident_settings#information
[3]: /es/security/threats/security_signals/#declare-an-incident
[4]:/es/security/application_security/threats/security_signals/#declare-an-incident
[5]: /es/service_management/case_management/view_and_manage
[6]: /es/service_management/incident_management/datadog_clipboard
[7]: /es/integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[8]: https://app.datadoghq.com/synthetics/tests