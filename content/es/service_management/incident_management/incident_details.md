---
aliases:
- /es/monitors/incident_management/incident_details
description: Gestionar el contexto y el trabajo para una incidencia
further_reading:
- link: dashboards/querying/#incident-management-analytics
  tag: Documentación
  text: Análisis de la gestión de incidencias
title: Página de detalles de la incidencia
---

## Información general

{{< img src="/service_management/incidents/incident_details/incident_overview_page.png" alt="Página de detalles de incidencias de una incidencia en estado activo SEV-4" style="width:100%;">}}

Cada incidencia en Datadog tiene su propia página de Detalles de la incidencia donde puedes gestionar los campos de propiedades, señales, tareas, documentos, personas involucradas y notificaciones. La página Detalles de la incidencia está disponible después de [crear una nueva incidencia][1]. La página Detalles de la incidencia contiene un encabezado global para acceder rápidamente a las acciones clave, mientras que el resto de la página se divide en diferentes secciones utilizando pestañas para agrupar los datos relacionados de la incidencia. La primera de estas secciones es la Descripción general.

## Encabezado global

El encabezado global proporciona acceso a los selectores [Estado y Gravedad][2], y se vincula a tus [Integraciones de incidencias][3]. Para obtener más información sobre cómo configurar enlaces automáticos con cada nueva incidencia para los enlaces de Slack y Microsoft Teams, consulta [Configuración de la incidencia][4].

Después de mover una incidencia al estado resuelto, aparece una opción en el encabezado para generar un notebook de análisis retrospectivo utilizando una [plantilla de análisis retrospectivo][5]. Configura tus plantillas de análisis retrospectivo en la página [Configuración de la incidencia][6] para predefinir la estructura y el contenido de tus análisis retrospectivos.

## Sección general de detalles de la incidencia

Utiliza la sección Resumen para especificar las propiedades de una incidencia y definir el impacto en el cliente. 

Por defecto, todas las incidencias tienen las siguientes propiedades:

* Causa raíz
* Servicios
* Teams
* Método de detección
* Resumen

Las propiedades se dividen en las tres secciones siguientes:

* ¿Qué ha pasado?
* ¿Por qué ocurrió?
* Atributos

En [Configuración de la incidencia][7], añade campos de propiedades adicionales con los pares de `<KEY>:<VALUE>` de tus etiquetas (tags) de métricas de Datadog, o crea otros personalizados. Asigna valores a las propiedades de una incidencia para poder buscar un subconjunto de incidencias en la [Página principal de incidencias][8] y para formar consultas en el [Análisis de gestión de incidencias][9]. También puedes reordenar los campos de propiedades y moverlos a diferentes encabezados para que las propiedades más importantes estén en localizaciones destacadas.

Si tu incidencia está relacionada con el cliente, especifica los detalles en la sección Impacto:

1. Haz clic en **Add** (Añadir).
2. Especifica una fecha y hora de inicio del impacto.
3. Especifica una fecha y hora de finalización del impacto o déjalo en blanco si el impacto aún está en curso.
4. Describe la naturaleza del impacto sobre los clientes en `Scope of impact`.
5. Haz clic en **Save** (Guardar).

Además de albergar los campos de tus propiedades, la sección Descripción general también proporciona los siguientes módulos de resumen:

1. *Línea de tiempo condensada*: muestra los momentos en los que la incidencia cambia de estado, así como cuándo comenzó y finalizó el impacto para obtener una vista clara del ciclo de vida de la incidencia.
2. *Notificaciones más recientes*: muestra la notificación más reciente enviada para la incidencia, con acceso rápido a la lista completa de notificaciones en la [sección de Notificación](#notifications-section).
3. *Tareas pendientes*: muestra la tarea incompleta más reciente, con acceso rápido a la lista completa de las tareas en la [sección de Remediación] (#remediation-section).
4. *Personas involucradas*: muestra el encargado actual de la incidencia y los avatares del resto de las personas involucradas asignadas a la incidencia.
5. *Entradas recientes en la línea de tiempo*: muestra las cinco entradas más recientes de la línea de tiempo de la incidencia, con acceso rápido para ver toda la [sección Línea de tiempo](#timeline-section).

## Sección Línea de tiempo

{{< img src="/service_management/incidents/incident_details/incident_details_timeline.png" alt="Detalles de la incidencia Vista de la línea de tiempo que muestra la progresión de un caso que escaló a una incidencia" style="width:100%;">}}

La línea de tiempo de la incidencia es la principal fuente de información del trabajo realizado durante una incidencia. A medida que se realizan acciones, se añaden nuevas celdas a la línea de tiempo en orden cronológico para capturar los cambios realizados, la persona que realizó el cambio y la hora en que se realizaron los cambios. 

### Tipos de contenido

Cada celda tiene su propio tipo de contenido, que indica el tipo de información que contiene:

|  Tipo de contenido      | Descripción                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| Nota de la persona involucrada     | Nota escrita manualmente por una persona involucrada en una incidencia. Las notas de respuesta tienen los siguientes subtipos:<br>- *Gráfico*: la nota de respuesta contiene uno o más gráficos de Datadog<br> - *Enlace*: la nota de respuesta contiene un hipervínculo<br>- *Código*: la nota de respuesta contiene texto enmascarado en sintaxis Markdown para bloques de código
| Actualización de la incidencia    | Cualquier cambio realizado en las propiedades de una incidencia (incluidos el estado y la gravedad) o su impacto.
| Actualización de la integración | Cualquier cambio realizado a través de las [integraciones] del producto de gestión de incidencias[3].
| Tarea               | Cualquier cambio realizado en las tareas de la incidencia en la sección Remediación de la página Detalles de la incidencia.
| Notificación enviada  | Una actualización cuando una persona involucrada en la incidencia envía una notificación de forma manual.

Añade notas de respuesta directamente a la línea de tiempo mediante el cuadro de texto situado justo debajo de las pestañas para cambiar entre las distintas secciones de la página Detalles de la incidencia. Personaliza la marca de tiempo de la nota de respuesta a la hora de la creación para capturar información importante que era relevante en un momento anterior en el orden cronológico de la línea de tiempo. Para las notas de respuesta de tu autoría, puedes editar el contenido o la marca de tiempo, o eliminar la nota por completo. También puedes copiar un enlace a una celda específica para compartirlo con tus compañeros de equipo. Las notas de respuesta se pueden [añadir a la cronología desde Slack][10].

En el caso concreto de las celdas de gráficos, las definiciones de gráficos se almacenan mediante URL compartidas para gráficos si están habilitadas en los [Parámetros de organización][11]. Cuando una celda de gráfico se añade a la línea de tiempo, tiene estados interactivos completos por los que puedes pasar el cursor como los que se encuentran en dashboards, notebooks y otras páginas. Después de 24 horas de ser añadidos a la línea de tiempo, los gráficos son reemplazados por imágenes estáticas que capturan lo que el gráfico estaba mostrando. Esto es para asegurar que los gráficos que muestran datos de corta retención tengan imágenes de respaldo capturadas incluso después de que los datos en vivo hayan expirado.

Por defecto, las celdas de la línea de tiempo se ordenan en `oldest first`, pero puede cambiarse a `newest first` utilizando el botón situado en la parte superior de la línea de tiempo.

## Sección de Remediación

Utiliza la sección Remediación para almacenar cualquier documento o recurso que sea pertinente para el proceso de remediación de una incidencia, así como para realizar un seguimiento de las tareas clave para el proceso de remediación. 

Los documentos pueden añadirse pegando la URL del documento y dando al enlace un nombre legible para un acceso rápido.

Las tareas de incidencias se crean directamente en la sección Remediación y a través de la [integración con Slack] de Datadog[12]. 

En la sección Remediación, escribe la descripción de tu tarea en el cuadro de texto de creación. Para asignar una tarea a un usuario de Datadog, escribe `@` en el cuadro de texto de descripción, o utiliza la columna `Assignees` una vez creada la tarea. Una tarea de incidencia puede tener más de un asignado. Después de crear una tarea, también se le puede asignar una fecha de vencimiento. 

A medida que se van terminando las tareas, se pueden marcar como completadas al hacer clic en la casilla de verificación situada a la izquierda de la descripción de la tarea. Si tienes un gran número de tareas, puedes filtrarlas buscando por palabras clave u ocultando de la vista las tareas completadas.

## Sección Equipo de respuesta

<div class="alert alert-warning">
Esta función está en fase beta abierta.
</div>

{{< img src="/service_management/incidents/incident_details/incident_response_team.png" alt="Sección Detalles de la incidencia y equipo de respuesta que muestra el Encargado de la incidencia, la Persona involucrada y el Líder de comunicación" style="width:100%;" >}}

En la sección Equipo de respuesta, puedes formar tu equipo de respuesta añadiendo otros usuarios y asignándoles funciones que desempeñar en la proceso de resolución de una incidencia. Los dos tipos de personas involucradas predeterminadas que brinda Datadog son:

1. `Incident Commander`: la persona responsable de dirigir el equipo de respuesta 
3. `Responder`: una persona que contribuye activamente a investigar una incidencia y resolver su problema subyacente

Si deseas crear roles personalizados de persona involucrada, puedes hacerlo en la [Configuración de incidentes para tipos de persona involucrada][13]. Esto te permite crear nuevos tipos de roles con nombres y descripciones personalizados. También te permite elegir si un tipo de persona involucrada debe ser un rol unipersonal o multipersonal.

**Nota:** Estos roles no están relacionados con los que se encuentran en el sistema [Configuración del control de acceso basado en roles (RBAC)][14]. Los roles de RBAC controlan los permisos de un usuario para acceder a determinadas funciones en Datadog. El sistema de Tipos de personas involucradas en la gestión de incidencias no cambia los permisos de un usuario en ninguna capacidad. Se trata más bien de acercar a las personas involucradas a sus incidentes y darles roles documentados en tu proceso de respuesta para obtener visibilidad. 

Si añades a alguien como persona involucrada, se le notifica a través del correo electrónico asociado a su cuenta de Datadog. Cualquiera puede cambiar el rol de una persona involucrada, pero solo puedes eliminar a alguien del Equipo de respuesta de una incidencia si tiene asignado el rol general de `Responder` y no tiene actividad en la incidencia. Si ya hay un `Incident Commander` asignado a una incidencia, la asignación de otro individuo como `Incident Commander` le transfiere ese rol. Al anterior `Incident Commander` se le reasigna el rol general de `Responder`. Una reasignación similar ocurre cada vez que se reasigna uno de los roles personalizados de una persona.

La lista del Equipo de respuesta también guarda la fecha y hora en que un individuo fue agregado originalmente al equipo de respuesta de una incidencia, así como la fecha y hora en que participó por última vez con algo a la línea de tiempo de la incidencia.

## Sección Notificaciones

{{< img src="service_management/incidents/incident_notifications.jpeg" alt="Notificaciones de la incidencia" style="width:80%;">}}

Todas las notificaciones de las partes interesadas para una incidencia se consolidan en la sección Notificaciones.
Puedes crear manualmente, guardar como borrador y enviar notificaciones directamente desde esta página. Las notificaciones automatizadas enviadas por [Reglas de notificación][15] para la incidencia en cuestión también se enumeran en esta sección.

Para crear una notificación manual:

1. Haz clic en el botón **+New Notification** (+ Notificación nueva) en la parte superior derecha de la sección.
2. Introduce los destinatarios deseados. Estos pueden ser cualquier destino de notificación compatible con Datadog incluidos correos electrónicos, canales de Slack, usuarios de PagerDuty, webhooks y más.
3. Selecciona una [Plantilla de mensaje][16].
4. Edita el título y el mensaje de tu notificación según sea necesario utilizando Markdown y cualquier variable compatible de la plantilla de incidencia al escribir `{{`. 
   - Las variables de plantilla se basan en las propiedades de una incidencia. Antes de enviar un mensaje, todas las variables de plantilla se sustituyen por el valor correspondiente de la propiedad referenciada disponible para el mensaje en el momento de su envío.
5. Utiliza la variable `{{incident.created}}` para personalizar la zona horaria de tu mensaje. Esta variable de plantilla mostrará la opción para establecer tu zona horaria variable.
6. Envía tu notificación o guárdala como borrador.

La sección Notificaciones está separada en listas: Borradores y Enviados.

Se muestran las dos listas:

1. Los destinatarios (previstos) de notificación 
2. El contenido del mensaje de notificación y los mensajes de renotificación enviados
3. Fecha de la última actualización de notificación 
4. El autor original de la notificación

La lista Enviado también muestra si una notificación fue enviada de forma manual o automática por una regla de notificación. Si la notificación fue automatizada, se muestra la regla que activó la notificación.

## Empezando

Trabaja con un flujo de trabajo de ejemplo en la guía [Empezando con la gestión de incidencias][17].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/incident_management/#creating-an-incident
[2]: /es/service_management/incident_management/#describing-the-incident
[3]: /es/service_management/incident_management/#integrations
[4]: /es/service_management/incident_management/incident_settings#integrations
[5]: /es/service_management/incident_management/incident_settings#postmortem-templates
[6]: https://app.datadoghq.com/incidents/settings#Postmortems
[7]: https://app.datadoghq.com/incidents/settings#Property-Fields
[8]: https://app.datadoghq.com/incidents
[9]: /es/service_management/incident_management/analytics
[10]: /es/integrations/slack/?tab=slackapplicationus#using-datadog-incidents
[11]: https://app.datadoghq.com/organization-settings/public-sharing/settings
[12]: /es/integrations/slack/?tab=slackapplicationus#manage-incident-tasks
[13]: /es/service_management/incident_management/incident_settings/#responder-types
[14]: /es/account_management/rbac/?tab=datadogapplication
[15]: /es/service_management/incident_management/incident_settings#rules
[16]: /es/service_management/incident_management/incident_settings#message-templates
[17]: /es/getting_started/incident_management