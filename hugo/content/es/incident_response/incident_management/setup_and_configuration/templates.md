---
aliases:
- /es/service_management/incident_management/incident_settings/templates/
- /es/incident_response/incident_management/incident_settings/templates
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/variables
  tag: Documentación
  text: Referencia de variables de incidente
- link: /incident_response/incident_management/notification
  tag: Documentación
  text: Obtenga más información sobre Notifications de Incident Management
- link: /incident_response/incident_management/post_incident/postmortems
  tag: Documentación
  text: Postmortems de incidentes
title: Plantillas
---
## Descripción general {#overview}

Las plantillas dinámicas ofrecen un marco integral para mejorar la respuesta ante incidentes y la eficiencia operativa. El uso de plantillas de mensajes personalizadas para notificaciones ad hoc y automatizadas puede ahorrar tiempo durante incidentes de alto estrés. Esto garantiza que los mensajes sean siempre precisos y contengan contexto relevante, lo que permite a los destinatarios comprenderlos y actuar con mayor rapidez.

La configuración personalizable para el análisis post-mortem puede proporcionar información valiosa y optimización a largo plazo. Al adaptar los informes y paneles al contexto único de su organización, puede identificar problemas recurrentes e implementar medidas preventivas de manera más efectiva.

## Mensajes {#messages}

Las plantillas de mensajes son mensajes dinámicos y reutilizables que se pueden usar en [notificaciones de incidentes manuales][1] o reglas de notificación automatizadas. Las plantillas de mensajes usan [variables de plantilla][4], como `{{incident.severity}}`, para insertar dinámicamente el valor correspondiente del incidente para el cual se envía la notificación. Las plantillas de mensajes tienen compatibilidad con Markdown para que las notificaciones de incidentes puedan incluir formato de texto, tablas, listas con sangría e hipervínculos. Para organizar mejor una gran cantidad de plantillas de mensajes, cada plantilla requiere una categoría durante el proceso de creación.

Para crear una plantilla de mensaje:

1. Haga clic en el botón **+ New Message Template**.
2. Asigne un nombre a la plantilla.
3. Asígnele una categoría nueva o existente.
4. Escriba una línea de asunto para la plantilla (para correos electrónicos).
5. Escriba el mensaje de la plantilla.
6. Haga clic en **Save**.

**Nota:** Las variables de plantilla se pueden usar tanto en el título como en el cuerpo del mensaje.

### Variables de IA para notificaciones {#ai-variables-for-notifications}

Incident AI puede completar dinámicamente detalles clave en las notificaciones con contenido generado por IA. Inserte cualquiera de las siguientes variables en el cuerpo de su mensaje:

| Campo | Variable |
|---|---|
| AI Contributing Factors | `{{incident.ai_contributing_factors}}` |
| AI Impact | `{{incident.ai_impact}}` |
| AI Issue | `{{incident.ai_issue}}` |
| AI Remediation | `{{incident.ai_remediation}}` |

{{< img src="incident_response/incident_management/investigate/incident_ai/message_template_variables.png" alt="Nueva plantilla de mensaje con variables de IA" style="width:80%;" >}}

## Análisis post mortem {#postmortems}

Las plantillas de postmortem definen la estructura y el contenido de sus postmortems. Cuando genera un postmortem, Datadog completa automáticamente la plantilla con datos del incidente. Utilice [variables de plantilla][4], como `{{incident.severity}}`, para controlar qué datos del incidente se incluyen.

Para crear una plantilla de postmortem:

1. Vaya a [**Incident Management Settings > Postmortem Templates**][8] y haga clic en **+ New Postmortem Template**.
2. Asigne un nombre a la plantilla.
3. Seleccione la ubicación de guardado (consulte [Ubicación de guardado](#save-location)).
4. Escriba el contenido de la plantilla (las variables de plantilla disponibles se enumeran a la derecha del cuadro de texto).
5. (Opcional) Establezca la plantilla como predeterminada.
6. Haga clic en **Save**.

### Ubicación de guardado {#save-location}

Seleccione dónde se guarda el documento de postmortem generado:

| Opción | Requisitos |
|---|---|
| **Datadog Notebooks** | No se requiere configuración adicional. |
| **Confluence** | Requiere la [integración de Confluence][3]. Configure su cuenta de Confluence en la configuración de la integración antes de seleccionarla como destino. |
| **Google Drive** | Requiere la [integración de Google Drive][6]. Configure su cuenta de Google en la configuración de la integración antes de seleccionarla como destino. |

### Variables de plantilla para postmortems {#template-variables-for-postmortems}

Las plantillas admiten variables que se completan con datos de incidentes cuando se genera el postmortem. Para obtener una lista completa de las variables disponibles, consulte la referencia de [Variables de incidente][4].

{{% collapse-content title="Variables estándar" level="h4" %}}
Las variables estándar se extraen directamente de los campos de incidentes e incluyen también cualquier [campo de propiedad personalizada][7] definido.

| Variable | Descripción |
|---|---|
| `{{incident.title}}` | The incident title |
| `{{incident.state}}` | The current incident state (for example: `active`, `stable`, `resolved`) |
| `{{incident.severity}}` | The incident severity level |
| `{{incident.commander}}` | El nombre del comandante del incidente, o su correo electrónico o identificador si no se ha establecido un nombre |

{{% /collapse-content %}}

{{% collapse-content title="Variables de duración" level="h4" %}}
Incluya los tiempos de respuesta de un incidente y compárelos con los promedios históricos:

```text
Time to Detect: {{incident.time_to_detect}}
Time to Internal Response: {{incident.time_to_internal_response}}
Time to Repair: {{incident.time_to_repair}}
Time to Resolve: {{incident.time_to_resolve}}
Time from Detect to Resolve: {{incident.time_from_detect_to_resolve}}
Mean Time to Resolve (past 30 days): {{incident.mean_time_to_resolve_30_days}}
```

Las duraciones individuales se muestran como `N/A` cuando no se pueden calcular o son cero o negativas. Las duraciones medias se muestran como `N/A` cuando ningún incidente elegible tiene un valor positivo. Consulte la [Referencia de variables de incidente][9] para ver todas las variables y ventanas de promedio.
{{% /collapse-content %}}

{{% collapse-content title="Variable de tarjeta de incidente" level="h4" %}}
La variable de tarjeta de incidente (`{{incident.card}}`) inserta una tarjeta de resumen que refleja los campos del incidente en tiempo real. Cuando los campos del incidente cambian, la tarjeta en el postmortem se actualiza automáticamente. La tarjeta incluye los campos de estado y propietario del postmortem.

**Nota**: La tarjeta de incidente solo es compatible con Datadog Notebooks.
{{% /collapse-content %}}

{{% collapse-content title="Variable de seguimientos" level="h4" %}}
La variable de seguimientos (`{{incident.follow-ups}}`) inserta una lista de seguimientos del incidente en el notebook de postmortem. Desde la vista de lista en su notebook, puede establecer fechas de entrega, asignar elementos o crear nuevos elementos de seguimiento. Los cambios se reflejan en la lista de seguimientos del incidente.

**Nota**: La variable de seguimientos solo es compatible con Datadog Notebooks.
{{% /collapse-content %}}

{{% collapse-content title="Variables de IA" level="h4" %}}
Las variables de IA usan Bits AI para generar contenido sugerido basado en los datos del incidente. Cuando genera un postmortem que incluye una variable de IA, Datadog proporciona un valor sugerido que puede aceptar, editar o rechazar antes de que se guarde.

{{% incident-ai-postmortem-variables %}}

Para usar estas variables:
1. Agregue las variables al cuerpo de la plantilla.
1. Al generar un postmortem, seleccione la plantilla lista para usar **General incident with AI content** o una plantilla personalizada que incluya variables de IA.
1. Espere hasta un minuto para que se complete el contenido generado por IA. Datadog recomienda revisar y refinar el contenido generado por IA antes de compartir el postmortem.

**Nota**:
- Las variables de IA deben ir precedidas por un encabezado de sección.
- La cronología del incidente debe contener al menos 10 mensajes para que las variables de IA generen contenido.

{{% /collapse-content %}}

Para obtener más información sobre la generación de postmortems mediante estas plantillas, consulte [Incident Postmortems][5].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/incident_response/incident_management/notifications
[2]: /es/notebooks/
[3]: /es/integrations/confluence/
[4]: /es/incident_response/incident_management/setup_and_configuration/variables
[5]: /es/incident_response/incident_management/post_incident/postmortems
[6]: /es/integrations/google_drive/
[7]: /es/incident_response/incident_management/setup_and_configuration/property_fields
[8]: https://app.datadoghq.com/incidents/settings?section=postmortem-templates
[9]: /es/incident_response/incident_management/setup_and_configuration/variables/#incident-variables