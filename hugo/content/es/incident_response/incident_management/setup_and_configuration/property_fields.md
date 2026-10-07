---
aliases:
- /es/service_management/incident_management/incident_settings/property_fields/
- /es/incident_response/incident_management/incident_settings/property_fields
title: Campos de propiedad
---
## Descripción general {#overview}

Los campos de propiedades personalizados le permiten capturar atributos importantes exclusivos de su organización, como modelos de productos específicos en la industria automotriz o códigos únicos en una implementación de software. Estos atributos le ayudan a categorizar los incidentes de manera eficiente.

Puede usar campos personalizados para filtrar subconjuntos específicos de incidentes en la página de [Incident Management][2] y en [Incident Management Analytics][3]. También puede crear condiciones en torno a campos personalizados en las [reglas de notificación de Incident Management][9].

## Secciones de campos {#field-sections}

Los campos de propiedades están organizados en tres tablas que corresponden a dónde aparecen los campos en la [pestaña Descripción general][1] de la página de Detalles del incidente:

1. `What Happened`
2. `Why It Happened`
3. `Attributes`

Puede mover o reordenar los campos de propiedades arrastrándolos con el icono de control de arrastre.

## Campos predeterminados {#default-fields}

Hay cinco campos predeterminados:

| Campos                   | Descripción |
| ----------------------   | ----------- |
|**Método de detección** | Agregue contexto sobre cómo se declaró este incidente.||
|**Resumen**               | Proporcione detalles sobre lo que sucedió para causar este incidente.||
|**Causa raíz**       | Enumere las posibles causas raíz o áreas para investigar.||
|**Servicios**              | Si tiene configurado [Datadog APM][4], el campo de propiedad `Services` utiliza automáticamente sus nombres de servicio de APM. |
|**Teams**                 | El campo de propiedad `Teams` se completa automáticamente a partir de los [Teams][5] definidos en su organización. |

**Nota**: No puede eliminar los campos predeterminados.

### Tipos de campo {#field-types}

Puede definir nuevos campos de cualquiera de los siguientes tipos de campo:

**Selección única**
: Un menú desplegable que acepta un valor. Usted establece los valores disponibles al definir el campo.

**Selección múltiple**
: Un menú desplegable que acepta múltiples valores. Usted establece los valores disponibles al definir el campo.

**Matriz de texto**
: Un campo de formato libre que acepta múltiples valores. Los encargados de respuesta a incidentes establecen valores arbitrarios al configurar el campo en un incidente.

**Área de texto**
: Un cuadro de texto de formato libre que acepta un solo valor. Los encargados de respuesta a incidentes establecen valores arbitrarios al configurar el campo en un incidente.

**Etiqueta de métrica**
: Un menú desplegable que acepta múltiples valores. Se solicita a los encargados de respuesta a incidentes que seleccionen cualquier valor ingerido de la etiqueta de métrica que usted seleccione al definir el campo.

**Número**
: Acepta cualquier número entero o decimal.

**Fecha y hora**
: Acepta cualquier fecha y hora. Los valores se almacenan en UTC y se analizan y formatean utilizando la zona horaria local del usuario.

### Nombres de campo {#field-names}

El nombre de un campo es un identificador en snake-case utilizado en [consultas de búsqueda y análisis][12], [automatizaciones de flujo de trabajo][13], y API. Su nombre para mostrar es una etiqueta fácil de usar que determina cómo aparece el campo en la [página de resumen de un incidente][1], la [línea de tiempo de un incidente][10] y el [modal de declaración de incidentes][11].

### Requerido en la declaración {#required-at-declaration}

Si marca un campo como "Requerido en la declaración", los usuarios deberán ingresar un valor al declarar incidentes. Esta opción no afecta las automatizaciones de flujo de trabajo de Datadog ni las solicitudes de API.

### Solicitar al usuario {#prompt-user}

Incident Management se puede configurar para solicitar a los encargados de respuesta a incidentes que establezcan campos particulares al cambiar el estado del incidente.

**Durante la declaración**: Para solicitar a los encargados de respuesta a incidentes que ingresen un valor para el campo durante la declaración, edite la opción "Solicitar al usuario" del campo.

**Cuando el incidente se mueve a Estable/Resuelto/Completado**: Para solicitar a los usuarios un campo cuando un incidente cambia a un estado determinado, utilice [formularios de transición][14].

### Campos personalizados en búsqueda y análisis {#custom-fields-in-search-and-analytics}

Los campos de selección única, selección múltiple, matriz de texto, número y fecha/hora son facetas buscables en la [Página principal de incidentes][2] y en [Análisis de Incident Management][3].

En Incident Management, los campos numéricos aparecen como medidas que pueden graficarse y visualizarse en [Dashboards][7] y [Notebooks][8].

[1]: /es/incident_response/incident_management/investigate#overview-tab
[2]: https://app.datadoghq.com/incidents
[3]: /es/incident_response/incident_management/analytics
[4]: /es/tracing/
[5]: /es/account_management/teams/
[6]: /es/getting_started/tagging/using_tags/?tab=assignment#metrics
[7]: /es/dashboards/
[8]: /es/notebooks/
[9]: /es/incident_response/incident_management/setup_and_configuration/notification_rules
[10]: /es/incident_response/incident_management/investigate/timeline
[11]: /es/incident_response/incident_management/investigate/declare
[12]: /es/incident_response/incident_management/setup_and_configuration/property_fields/#custom-fields-in-search-and-analytics
[13]: /es/actions/workflows/
[14]: /es/incident_response/incident_management/setup_and_configuration/transition_forms