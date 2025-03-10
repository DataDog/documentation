---
aliases:
- /es/monitors/incident_management/incident_details
- /es/service_management/incident_management/incident_details
description: Gestionar el contexto y la tarea para un incidente
further_reading:
- link: /service_management/incident_management/declare
  tag: Documentación
  text: Declarar un incidente
- link: /service_management/incident_management/describe
  tag: Documentación
  text: Describir un incidente
title: Investigar incidentes
---

## Información general

{{< img src="/service_management/incidents/investigate/incidents_overview_tab.png" alt="Ejemplo de vista de detalles de incidentes de la pestaña Información general" style="width:100%;" >}}

Una investigación eficaz de incidentes comienza con la identificación y categorización del incidente, seguidas de una exhaustiva recopilación de datos para establecer una cronología detallada de los eventos. La página Detalles de incidentes de Datadog te ayuda a investigar incidentes a través de una plataforma centralizada para la monitorización, la investigación, la corrección, la colaboración y el análisis en tiempo real. Incluye dashboards dinámicos y periodos de tiempo interactivos que ayudan a los respondedores a visualizar los datos y patrones del incidente. Utiliza los detalles de incidentes para:

- Agregar y visualizar datos en tiempo real para que los equipos de ayuda identifiquen las causas raíz y evalúen las repercusiones de forma eficaz.
- Comunicar, realizar un seguimiento del progreso y coordine los esfuerzos de corrección utilizando las funciones de colaboración en equipo.   
- Alternar entre varias vistas para explorar los servicios y las dependencias afectados, garantizando una investigación y resolución exhaustivas.

## Detalles de incidentes

Cada incidente en Datadog tiene su propia página de Detalles de incidentes, donde puedes gestionar campos de propiedades, señales, tareas, documentos, respondedores y notificaciones. La página Detalles de incidentes contiene un encabezado global para acceder rápidamente a las acciones clave. El resto de la página está dividido en secciones con pestañas que agrupan datos de incidentes relacionados.

### Encabezado global

El encabezado global proporciona acceso a los selectores de [estado y gravedad][1] y a los enlaces a tus [integraciones de incidentes][2]. Para obtener más información sobre cómo configurar enlaces automáticos de Slack y Microsoft Teams para cada nuevo incidente, consulta la documentación [Configuración de incidentes][3].

Una vez resuelto un incidente, aparece una opción en el encabezado para generar un notebook postmortem utilizando una [plantilla postmortem][4]. Para configurar tus plantillas postmortem en la aplicación, ve a la página [Configuración de incidentes][5] y define la estructura y el contenido de tus postmortems.

### Pestaña Información general

La pestaña Información general sirve como página principal para ver las propiedades de un incidente y definir su impacto en el cliente. Por defecto, incluye propiedades como Causa raíz, Servicios, Equipos, Método de detección y Resumen. Estas propiedades se clasifican en las secciones Qué ha ocurrido, Por qué ha ocurrido y Atributos. 

Añade más campos de propiedades utilizando los pares `<KEY>:<VALUE>` de las etiquetas (tags) de métricas de Datadog o crea campos personalizados a través de [Configuración de incidentes][6]. Asigna valores a estas propiedades para mejorar las búsquedas y consultas en la Página principal de incidentes y en Análisis de gestión de incidentes. Para priorizar la información crítica, puedes reordenar los campos de propiedades y colocarlos bajo diferentes encabezados. 

Para los incidentes del lado del cliente, especifica los detalles del impacto añadiéndolos en la sección **Impacts** (Impactos):

{{< img src="/service_management/incidents/investigate/incident_details_impacts.png" alt="Descripción de tu imagen" style="width:90%;" >}}

1. Haz clic en **Add** (Añadir).
2. Especifica la fecha y la hora de inicio del impacto.  
3. Especifica la fecha y la hora de finalización del impacto o déjalas en blanco si el impacto aún está activo.  
4. Describe la naturaleza del impacto sobre los clientes en `Scope of impact`. 
5. Haz clic en **Save** (Guardar).

Además de alojar los campos de tus propiedades, la pestaña Información general también proporciona los siguientes módulos de resumen en una sola vista:

| Módulo del resumen | Descripción |
|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| Cronología resumida | Muestra las marcas de tiempo en las que se produjeron cambios en el estado del incidente, así como cuándo comenzó y finalizó el impacto. Esto proporciona una visión muy clara del ciclo de vida del incidente. |
| Últimas notificaciones| Muestra la notificación más reciente enviada del incidente, con acceso rápido a la lista completa de notificaciones en la [pestaña Notificación][7].|
| Tareas pendientes | Muestra la tarea incompleta más reciente, con acceso rápido a toda la lista de tareas en la pestaña Corrección. |
| Respondedores | Muestra el comandante actual del incidente, así como los avatares del resto de los respondedores asignados al incidente. |
| Entradas de líneas de tiempo recientes | Muestra las cinco entradas de líneas de tiempo más recientes del incidente, con acceso rápido para ver toda la pestaña Línea de tiempo. Para obtener más información, consulta la documentación [Línea de tiempo][8]. |

## Herramientas de investigación adicionales

Tras declarar un incidente, los respondedores pueden utilizar la página Detalles de incidentes para aplicar la información disponible, de modo que puedan describir y analizar el incidente en profundidad. 

{{< whatsnext desc="Para obtener más información sobre herramientas de investigación, consulta las siguientes páginas:">}}
    {{< nextlink href="/service_management/incident_management/investigate/timeline" >}}<strong>Línea de tiempo</strong>: Realiza el seguimiento de la secuencia de eventos que llevan al incidente y durante el incidente. Utiliza visualizaciones y datos temporales para comprender la cronología y el impacto de los eventos.
{{< /nextlink >}}
{{< /whatsnext >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/incident_management/describe/#incident-details
[2]: /es/service_management/incident_management/#integrations
[3]: /es/service_management/incident_management/incident_settings#integrations
[4]: /es/service_management/incident_management/incident_settings/templates#postmortems
[5]: https://app.datadoghq.com/incidents/settings#Postmortems
[6]: /es/service_management/incident_management/incident_settings/property_fields
[7]: /es/service_management/incident_management/notification/
[8]: /es/service_management/incident_management/investigate/timeline