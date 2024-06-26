---
aliases:
- /es/monitors/incident_management/notification_rules
- /es/monitors/incident_management/incident_settings
description: Configurar y personalizar tu experiencia de gestión de incidencias
kind: documentation
title: Portapapeles de Datadog
---

## Información general

Utiliza [Configuración de incidencias][1] para personalizar aspectos de la experiencia de gestión de incidencias para toda tu organización. Los ajustes individuales están categorizados y divididos en diferentes subsecciones. Las categorías principales son: general, notificaciones y remediación.

## General

La subsección General de la Configuración de la incidencia se utiliza para definir los niveles de gravedad y los niveles de estado de tu organización, y para declarar el texto de ayuda de la incidencia.

### Información

{{< img src="service_management/incidents/severity_settings.jpeg" alt="Configuración del nivel de gravedad de la incidencia" style="width:80%;">}}

Utiliza la configuración del nivel de gravedad para:

1. Definir la gravedad más crítica para ti, como `SEV-0` o `SEV-1` (por defecto `SEV-1`).
2. Personalizar las subetiquetas de las gravedades (**Por defecto:** Crítica, Alta, Moderada, Baja, Menor)
3. Personalizar las descripciones de las gravedades.
4. Añadir o eliminar gravedades desde la parte inferior de tu lista, con un mínimo de tres y un máximo de diez. 

**Nota**: Si intenta eliminar una gravedad a la que se hace referencia en una regla de notificación, se le pedirá que confirme su decisión. Si decide continuar, se desactivarán las reglas de notificación afectadas, ya que dejarán de ser válidas. La eliminación de una gravedad o el cambio de la gravedad inicial no actualiza automáticamente ninguna consulta de [Análisis de gestión de incidentes][2].

{{< img src="service_management/incidents/status_settings.jpeg" alt="Configuración del nivel de estado de la incidencia" style="width:80%;">}}

Utiliza la configuración de nivel de estado para:

1. Personalizar las descripciones de los estados.
2. Elige si deseas activar el estado opcional `Completed` .

**Nota**: La eliminación del estado `Completed` no actualiza automáticamente ningún incidente que ya se encuentre en el estado `Completed`, ni tampoco actualiza automáticamente ninguna consulta del [Análisis de gestión de incidencias][2] que haga referencia explícita a él. Cualquier regla de notificación que haga referencia al estado `Completed` se desactiva, ya que esa regla ya no es válida.

{{< img src="service_management/incidents/helper_text_settings.jpeg" alt="Configuración del texto auxiliar para declarar la incidencia" style="width:80%;">}}

Para la configuración del texto auxiliar para declarar la incidencia, puedes personalizar el texto auxiliar que aparece junto a las descripciones de nivel de gravedad y estado en el [Modal de creación de incidencias][3]. El texto auxiliar es compatible con Markdown, que permite listas con sangría, formato de texto e hipervínculos a otros recursos de instrucciones para los responsables de incidencias.

{{< img src="service_management/incidents/incident_settings/private_incidents_delete_incidents.png" alt="Configuración de incidencias para habilitar o deshabilitar incidencias privadas y eliminar incidencias" style="width:80%;" >}}

Permite a los usuarios de tu organización hacer que las incidencias sean privadas y eliminar incidencias. Las incidencias privadas ofrecen a los usuarios la posibilidad de limitar el acceso a incidencias con información confidencial, de modo que solo las personas involucradas en la incidencia puedan ver los detalles. Cualquier regla de notificación creada previamente no se enviará cuando una incidencia sea privada. La eliminación de incidencias permite a los usuarios eliminar las incidencias de la interfaz de usuario, incluidos los análisis. Por defecto, la eliminación de incidencias está desactivada.

### Campos de propiedad

{{< img src="service_management/incidents/property_field_settings.jpeg" alt="Configuración de los campos de propiedad" style="width:80%;">}}

Los campos de propiedades son piezas clave de metadatos con las que puedes etiquetar tus incidencias. Esto facilita la búsqueda de subconjuntos específicos de incidencias en la [Página de inicio][4] y la realización de consultas más sólidas en el [Análisis de gestión de incidencias][2]. Hay cinco campos de propiedades por defecto:

1. `Root Cause`
2. `Services`
3. `Teams`
4. `Detection Method`
5. `Summary`

Si tienes configurado [Datadog APM ][5], el campo de propiedad `Services` aprovecha automáticamente tus nombres del servicio APM. Para editar los valores de `Services`, carga un CSV con los valores que deseas asociar a cada campo. Tu archivo CSV debe comenzar con el nombre de tu campo en la fila superior, con los valores deseados listados inmediatamente debajo.

El campo de propiedad `Teams` se rellena automáticamente a partir de los [equipos][6] definidos en tu organización.

Puedes añadir más campos de propiedad a tu configuración al seleccionar una de las [etiquetas (tags) de métricas] de pares de `key:value` existentes [7]. Al hacer esto, la clave de tu campo de propiedad es el caso de inicio de la clave de etiqueta de métrica (cada palabra está en mayúsculas y separadas por espacios) y los valores para el campo de propiedad son iguales a los valores reportados por la etiqueta de métrica.

Los campos de propiedades están organizados en tres tablas que se corresponden con el lugar donde aparecen los campos en la [sección de Descripción general][8] de la página Detalles de la incidencia:

1. `What Happened`
2. `Why It Happened`
3. `Attributes`

Puedes mover cualquier campo de propiedad a una tabla diferente o reordenarlos en la misma tabla arrastrando y soltando el campo con el icono de arrastrar. Previsualiza el aspecto de tus campos de propiedad haciendo clic en el botón **Previsualizar** de la parte superior derecha.

#### Campos de propiedad personalizados y campos obligatorios

Además de los cinco campos por defecto y los campos basados en las etiquetas de métrica, también puedes crear campos de propiedades personalizados y marcarlos como obligatorios en la creación de una incidencia. Hay cuatro tipos de campos personalizados que puedes crear:

1. *Selección única*: un campo desplegable que sólo puede tener un valor asignado a la vez por incidencia. Los valores pueden predefinirse en línea desde la interfaz de usuario o mediante la carga de valores a través de un archivo CSV.
2. *Selección múltiple*: un campo desplegable que puede tener múltiples valores asignados por incidencia. Los valores pueden predefinirse en línea desde la interfaz de usuario o mediante la carga de valores a través de un archivo CSV.
3. *Área de texto: un cuadro de texto sin formato. La persona involucrada introduce los valores en función de la incidencia.
4. *Número*: un área de texto que solo acepta dígitos y un punto como entrada. Los valores los introduce una persona involucrada por cada incidencia.

Los campos personalizados *Selección única*, *Selección múltiple* y *Número* son facetas que se pueden buscar en la [Página principal de incidencias][4] y [Análisis de gestión de incidencias][2] para filtrar fácilmente las incidencias. Los campos *Número* son medidas en el Análisis de gestión de incidencias que se pueden representar gráficamente y visualizar en [dashboards][9] y [notebooks][10].

### Tipos de personas involucradas

<div class="alert alert-warning">
Esta función está en fase beta abierta.
</div>

{{< img src="service_management/incidents/responder_types_settings.png" alt="La sección de configuración dedicada para crear tipos de personas involucradas personalizadas" style="width:80%;">}}

La configuración de los tipos de personas involucradas te ofrece la posibilidad de crear roles personalizados para [asignar a las personas involucradas en incidencias][11] y especificar si esos roles deben ser desempeñados por una o varias personas por incidente. Estos roles no están relacionados con el sistema de [Configuración del control de acceso basado en roles (RBAC)][12]. Los tipos de personas involucradas permiten que cada persona entienda cuáles son sus responsabilidades en una incidencia basándose en las definiciones de tu propio proceso de respuesta a incidencias, Por defecto hay dos roles:

1. `Incident Commander`: la persona responsable de dirigir el equipo de respuesta 
2. `Responder`: una persona que contribuye activamente a investigar una incidencia y resolver su problema subyacente

**Nota:** El tipo de persona involucrada `Incident Commander` aparece en Configuración de la incidencia para que puedas personalizar la descripción. `Incident Commander` no se puede eliminar como tipo de persona involucrada, ni se puede cambiar su nombre o estado como `One person role`. El rol `Responder` es un rol genérico de reserva si a una persona involucrada no se le asigna otro rol y no aparece en la Configuración de la incidencia.

Para crear un tipo de persona involucrada personalizado:

1. Haz clic en el botón **+ Add Responder Type** (+ Añadir tipo de persona involucrada) situado debajo de la tabla.
2. Dale un nombre a tu nuevo tipo de persona involucrada.
3. Elija si el tipo de persona involucrada es un `One person role` o un `Multi person role`. Un `One person role` puede ser ocupado por una sola persona por incidencia, mientras que un `Multi person role` puede ser ocupado por un número ilimitado de personas por incidencia.
4. Asigna una descripción al tipo de persona involucrada. Esta descripción aparece en la interfaz de usuario para seleccionar un rol que asignar a tus compañeros de equipo.
5. Haz clic en **Save** (Guardar).

### Integraciones

Los ajustes de integraciones proporcionan configuraciones adicionales para las funciones de gestión de incidencias de [Slack ][13] y [Microsoft Teams][14]. Ve a [**Incidents > Settings**  (Incidencias > Configuración) y selecciona **Integrations** (Integraciones)][15].

Activa la opción **Automatically create a channel for each new incident** (Crear automáticamente un canal para cada nueva incidencia) para habilitar lo siguiente:
- Creación automática de canales de Slack o Microsoft Teams para cada nueva incidencia y plantilla de nombres para dichos canales.
- Canal de actualización de incidencias.

Establece estos ajustes para utilizar cualquier espacio de trabajo de Slack o Microsoft Teams que hayas configurado en el [cuadro de integración[16] de tu organización. El canal de actualizaciones de la incidencia envía un mensaje cada vez que se declara una incidencia o cambia de estado, gravedad o encargado de la incidencia.

#### Opciones de plantilla de nombre de canal
<div class="alert alert-info">Datadog recomienda que el prefijo sea corto, ya que Slack impone un límite de 80 caracteres en los nombres de los canales. </div>

El cambio de la plantilla de nombre del canal no cambia el nombre de ningún canal de incidencias existente. La nueva plantilla de nombre solo se aplica para canales futuros. Por defecto, los canales dedicados a incidencias utilizan `incident-{public_id}` como plantilla de nombre. Añade opciones de título adicionales para mejorar la claridad de los canales de Slack:
- El prefijo `incident` puede cambiarse por cualquier cadena compuesta por letras *minúsculas*, números y guiones. 
- Haz clic en la casilla **Incident ID** (Identificación de la incidencia) para evitar que se dupliquen los nombres de los canales. 
- Haz clic en la casilla **Title of Incident** (Título de la incidencia) para permitir que la aplicación Slack Datadog cambie automáticamente el nombre del canal si cambia el título de una incidencia.

#### Funciones de Slack

Las siguientes características están disponibles para su uso con la integración de Slack con la Gestión de incidencias. Habilita o configura estas opciones en *[Service Management > Incidents > Settings > Integrations][15]** (Gestión del servicio > Incidencias > Configuración > Integraciones).
- Repite los mensajes del canal de Slack, para importar y conservar todas las conversaciones de Slack en la línea de tiempo de la incidencia. **Nota**: Esto cuenta cada persona que comenta un mensaje de Slack como un usuario activo mensual. Alternativamente, destaca el mensaje anclado en tu línea de tiempo para crear un sistema de registro de todas las conversaciones relacionadas con incidencias.
- También puedes añadir automáticamente [miembros del equipo][6] a un canal de Slack de incidencias cuando se añade un equipo a la incidencia. Solo se añaden al canal los miembros que han conectado sus cuentas de Slack y Datadog ejecutando el comando "/Datadog connect" en Slack.
- Archiva automáticamente un canal de Slack después de un tiempo determinado.

## Tests de API multipaso

### Plantillas de mensajes

{{< img src="service_management/incidents/message_templates_settings.jpeg" alt="Configuración de plantilla de mensajes" style="width:80%;">}}

Las plantillas de mensajes son mensajes dinámicos y reutilizables que pueden usarse en [notificaciones manuales de incidencias][17] o en reglas automatizadas de notificación. Las plantillas de mensajes aprovechan variables de plantilla, como `{{incident.severity}}`, para incorporar dinámicamente el valor correspondiente de la incidencia para la que se envía la notificación. Las plantillas de mensajes son compatibles con Markdown para que las notificaciones de la incidencia puedan incluir formato de texto, tablas, listas con sangría e hipervínculos. Para organizar mejor un gran número de plantillas de mensajes, cada plantilla requiere una categoría durante el proceso de creación.

Para crear una plantilla de mensaje:

1. Haz clic en el botón **+ New Message Template** (+ Nueva plantilla de mensaje).
2. Dale un nombre a la plantilla
3. Asígnale una categoría nueva o existente
4. Asigna un asunto a la plantilla (para correos electrónicos)
5. Escribe el mensaje de la plantilla
6. Haz clic en **Save** (Guardar).

**Nota:** Se admiten variables de plantilla tanto en el título como en el cuerpo del mensaje.

### Java

{{< img src="service_management/incidents/notification_rules_example.jpeg" alt="Ejemplo de reglas de notificación" style="width:80%;">}}

Las reglas de notificación te permiten configurar escenarios en los que partes interesadas específicas deben ser notificadas automáticamente de una incidencia. Puedes utilizar las reglas de notificación para asegurarte de que las partes interesadas clave estén siempre informadas de las incidencias de alta prioridad, para notificar a sistemas externos cada vez que se declara o actualiza una nueva incidencia, o para notificar a personas involucradas específicas cuando un servicio o equipo en particular experimenta una incidencia.

**Ejemplo:** establece una regla de notificación para notificar automáticamente a las partes interesadas del equipo cada vez que se declare una incidencia SEV-1 o SEV-2 para `service:web-store` Y `application:purchasing`, y cuando dicha incidencia pase por diferentes estados de progresión.

Para configurar una nueva regla de notificación:

1. Haz clic en **New Rule** (Nueva regla).
2. En **For incidents matching...** (Para incidencias que coincidan con...), selecciona los pares de `key:value` del campo de propiedad de la incidencia para los que deseas que se envíen notificaciones. Por defecto, estos filtros están vacíos y una regla de notificación se activa para cualquier incidencia.
3. **Notificar**: selecciona los destinatarios de notificación. Las notificaciones puede enviarse a cualquiera de las [integraciones de notificación][18] existentes de Datadog. Si deseas notificar al dispositivo móvil de un destinatario, selecciona la opción de su nombre que incluye **(Notificación push móvil)**. El destinatario debe haber activado notificaciones en la [aplicación móvil de Datadog][19] para que aparezca esta opción.
4. **Con plantilla**: selecciona la plantilla de mensaje que deseas que utilice la regla de notificación.
5. **Renotificar sobre actualizaciones**: elige qué propiedades de la incidencia activan las renotificaciones. Cada vez que una o varias de las propiedades seleccionadas cambien, se enviará una nueva notificación. Ten en cuenta que no puedes renotificar sobre propiedades que ya estén en tus filtros (vea el paso 2, más arriba).
6. Haz clic en **Save** (Guardar).

Puedes realizar las siguientes operaciones para gestionar tus reglas de notificación.

- *Buscar*: filtra tu lista de reglas de notificación por sus destinatarios.
- *Conmutador*: activa o desactiva cualquier regla de notificación cambiando el conmutador de la fila de esa regla en la lista.
- *Copiar*: pasa el ratón por encima de cualquier regla individual de notificación y haz clic en el botón con el icono **Copiar** situado junto al conmutador de la regla.
- *Borrar*: pasa el ratón por encima de cualquier regla individual de notificación y haz clic en el botón con el icono **Borrar** situado junto al conmutador de la regla.

{{< img src="service_management/incidents/notification_rules_list.jpeg" alt="Lista de reglas de notificación" style="width:80%;">}}

## Solución

### Plantillas de análisis retrospectivo

{{< img src="service_management/incidents/postmortem_template_settings.jpeg" alt="Configuración de plantilla de análisis retrospectivo" style="width:80%;">}}

Las plantillas de análisis retrospectivo son plantillas dinámicas y reutilizables que se utilizan para crear un [notebook de Datadog][10] que se rellena automáticamente con información de la incidencia después de que ésta se haya resuelto. Las plantillas de análisis retrospectivo aprovechan variables de plantilla, como `{{incident.severity}}`, para incorporar dinámicamente el valor correspondiente de la incidencia para la que se está creando la plantilla de análisis retrospectivo. Estas plantillas son compatibles con Markdown, de modo que el notebook resultante incluye formato de texto, tablas, listas con sangría e hipervínculos.

Para crear una plantilla de análisis retrospectivo:

1. Haz clic en el botón **+ New Postmortem Template** (+ Nueva plantilla de análisis retrospectivo).
2. Dale un nombre a la plantilla
3. Escribe el contenido de la plantilla (a la derecha del cuadro de texto aparecen las variables de plantilla disponibles)
4. (Opcional) Establece la plantilla como predeterminada 
5. Haz clic en **Save** (Guardar).

[1]: https://app.datadoghq.com/incidents/settings
[2]: /es/service_management/incident_management/analytics
[3]: /es/service_management/incident_management/#from-the-incidents-page
[4]: https://app.datadoghq.com/incidents
[5]: /es/tracing/
[6]: /es/account_management/teams/
[7]: /es/getting_started/tagging/using_tags/?tab=assignment#metrics
[8]: /es/service_management/incident_management/incident_details/#overview-section
[9]: /es/dashboards/
[10]: /es/notebooks/
[11]: /es/service_management/incident_management/incident_details/#response-team-section
[12]: /es/account_management/rbac/?tab=datadogapplication#pagetitle
[13]: /es/integrations/slack/?tab=slackapplicationus#using-datadog-incidents
[14]: /es/integrations/microsoft_teams/#datadog-incident-management-in-microsoft-teams
[15]: https://app.datadoghq.com/incidents/settings#Integrations
[16]: https://app.datadoghq.com/account/settings#integrations
[17]: /es/service_management/incident_management/incident_details/#notifications-section
[18]: /es/monitors/notifications/?tab=is_alert#notify-your-team
[19]: /es/service_management/mobile/