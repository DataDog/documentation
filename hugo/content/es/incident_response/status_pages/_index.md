---
aliases:
- /es/service_management/status_pages/
description: Comunique la disponibilidad del servicio, los incidentes y el mantenimiento
  planificado a los clientes o a las partes interesadas internas a través de una página
  de estado compartible.
further_reading:
- link: https://www.datadoghq.com/blog/status-pages
  tag: Blog
  text: Mantenga informadas a las partes interesadas con las páginas de estado de
    Datadog
- link: /incident_response/incident_management/
  tag: Documentación
  text: Obtenga más información sobre Incident Management
- link: /incident_response/on-call/
  tag: Documentación
  text: Obtenga más información sobre On-Call Scheduling
- link: /incident_response/incident_management/integrations/status_pages
  tag: Documentación
  text: Integre las páginas de estado de Datadog con Incident Management
title: Status Pages
---
## Descripción general {#overview}

{{< img src="incident_response/status_pages/shopist_status_page3.png" alt="Ejemplo de página de estado que muestra los componentes del servicio con su estado actual y las actualizaciones recientes de incidentes" style="width:100%;" >}}

Status Pages forma parte del conjunto Incident Response de Datadog, junto con On-Call e Incident Management. Le permite a su equipo comunicar de forma proactiva **la disponibilidad del servicio**, **los incidentes** y **el mantenimiento planificado** a los clientes o a las partes interesadas internas a través de una página web compartible.

Utilice las páginas de estado para:

* Comparta la disponibilidad de sistemas y funciones críticos
* Comunique claramente las interrupciones del servicio durante los incidentes
* Anuncie el mantenimiento programado y el tiempo de inactividad planificado con antelación
* Reduzca el volumen de soporte entrante con notificaciones proactivas por correo electrónico y Slack

## Configurar permisos {#configure-permissions}

Para crear, actualizar o publicar páginas de estado, debe tener los permisos de RBAC adecuados. Para obtener más información, consulte [Access Control][1].

<table>
  <thead>
    <tr>
      <th style="white-space: nowrap;">Nombre</th>
      <th>Descripción</th>
      <th>Rol predeterminado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;">Lectura de configuración de páginas de estado<br><code style="white-space: nowrap;">status_pages_settings_read</code></td>
      <td>Visualice la lista de páginas de estado, la configuración de cada página de estado, sus avisos y las páginas de estado internas publicadas.</td>
      <td>Datadog Read Only Role</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Escritura de configuración de páginas de estado<br><code style="white-space: nowrap;">status_pages_settings_write</code></td>
      <td>Crear nuevas páginas de estado y configurar los ajustes de las páginas de estado.</td>
      <td>Datadog Admin Role</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Escritura de avisos de páginas de estado<br><code style="white-space: nowrap;">status_pages_incident_write</code></td>
      <td>Publicar y actualizar incidentes.</td>
      <td>Datadog Admin Role</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Publicación de página pública de páginas de estado<br><code style="white-space: nowrap;">status_pages_public_page_publish</code></td>
      <td>Publicar y retirar la publicación de páginas de estado públicas.</td>
      <td>Ninguno</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Publicación de página interna de páginas de estado<br><code style="white-space: nowrap;">status_pages_internal_page_publish</code></td>
      <td>Publicar y retirar la publicación de páginas de estado internas.</td>
      <td>Ninguno</td>
    </tr>
  </tbody>
</table>

## Crear una página de estado {#create-a-status-page}

1. En Datadog, navegue a [**Páginas de estado**][2].
1. Haga clic en **Crear página de estado** y siga el flujo de incorporación:

   | Campo             | Descripción |
   | ----------------- | ----------- |
   | **Tipo de página de estado**    | Elija quién puede acceder a la página: <br>- **Pública** - Cualquier persona con el enlace puede visualizarla <br>- **Interna** - Solo los usuarios autenticados dentro de su organización de Datadog pueden visualizarla |
   | **Nombre de la página**     | Se muestra como el encabezado de la página (si no se carga ningún logotipo). <br>*Ejemplo: Acme Cloud Platform* |
   | **Prefijo de dominio** | Se utiliza como el prefijo de subdominio de su página de estado. Para obtener más información sobre dominios personalizados, consulte la sección [Configurar un dominio personalizado](#set-a-custom-domain).<br>*Ejemplo: shopist → shopist.statuspage.datadoghq.com* <br>- Debe ser **único a nivel global** <br>- En minúsculas, alfanumérico y con guiones <br>- Puede afectar los enlaces si se cambia más adelante |
   | **Suscripciones** *(opcional)* | Permita que los usuarios reciban notificaciones sobre actualizaciones de la página de estado por [correo electrónico](#email-subscriptions) o [Slack](#slack-subscriptions). Cuando las suscripciones están habilitadas, los visitantes pueden suscribirse desde la página publicada para recibir notificaciones sobre nuevos avisos y actualizaciones. Las suscripciones por correo electrónico y Slack se pueden activar o desactivar de forma independiente para cada página de estado. **Nota**: [Las suscripciones por correo electrónico](#email-subscriptions) requieren doble confirmación; la dirección de correo electrónico debe ser confirmada. |
   | **Logotipo de la empresa, favicon, imagen de encabezado de correo electrónico o icono de la aplicación de Slack** *(opcional)* | Cargue imágenes para personalizar su página de estado y sus notificaciones. El icono de la aplicación de Slack aparece como el avatar del remitente en las notificaciones de Slack, junto al nombre de su página. |
1. (Opcional) [Agregue componentes](#add-components) para mostrar el estado de servicios individuales.
1. Haga clic en **Guardar configuración**.
   <div class="alert alert-info">Una página de estado <strong>no está activa</strong> después de guardar su configuración. Para que la página esté disponible, <a href="#publish-your-status-page">publique su página de estado</a>.</div>

## Agregue componentes {#add-components}

{{< img src="/incident_response/status_pages/status_page_components.png" alt="Configuración de componentes de la página de estado con panel de vista previa en vivo" style="width:100%;" >}}

Los componentes son los bloques de construcción de su página de estado. Cada uno representa un servicio o función que le interesa a sus usuarios. Algunos ejemplos de componentes incluyen:
- API Gateway
- Web Dashboard
- Base de datos Clúster
- Servicios de la región de EE. UU.

Puede agregar componentes a su página de estado durante la configuración inicial o a través de la configuración de la página de estado:

1. Desde su página de estado, haga clic en **Configuración** y seleccione la pestaña **Componentes**.
1. Cree componentes individuales o un grupo de componentes relacionados. Puede asociar [avisos](#add-a-notice) con estos componentes para reflejar el impacto en su página de estado.
1. Seleccione un tipo de visualización:
   1. Barras y porcentaje de tiempo de actividad
   1. Solo barras
   1. Solo nombre del componente

### Jerarquía de componentes {#component-hierarchy}

Si varios avisos afectan al mismo componente, el aviso con mayor impacto tiene prioridad:
Interrupción mayor > Interrupción parcial > Rendimiento degradado > Mantenimiento > Operativo

### Estado del componente y tiempo de actividad {#component-status-and-uptime}

Cada estado de componente afecta a las barras de tiempo de actividad y al porcentaje de tiempo de actividad de manera diferente:

| Estado | Barras de tiempo de actividad | Porcentaje de tiempo de actividad |
|--------|-------------|-------------------|
| Interrupción mayor | Mostrado | Cuenta como tiempo de inactividad |
| Interrupción parcial | Mostrado | Cuenta como tiempo de inactividad |
| Rendimiento degradado | Mostrado | Sin impacto |
| Mantenimiento | Mostrado | Sin impacto |
| Operativo | Mostrado como saludable | Sin impacto |

**Nota**: La interrupción parcial y la interrupción mayor tienen el mismo peso. La duración completa en cualquiera de los estados cuenta como tiempo de inactividad en el cálculo del porcentaje de tiempo de actividad.

## Publique su página de estado {#publish-your-status-page}

Después de guardar la configuración de su página de estado, haga clic en **Lanzar página de estado** para que la página esté disponible en su URL.

Si seleccionó:
- **Público**, la página es accesible inmediatamente para todos los visitantes.
- **Interno**, el acceso está limitado a usuarios de Datadog autenticados en su organización.

## Agregue un aviso {#add-a-notice}

Los avisos son mensajes publicados en una página de estado para comunicar el estado del sistema. Las páginas de estado admiten dos tipos de avisos: **degradaciones** para impactos imprevistos en el servicio y **ventanas de mantenimiento** para tiempo de inactividad planificado.

{{< img src="incident_response/status_pages/select_notice_type_status_page.png" alt="Selector de tipo de aviso de página de estado con opciones de degradación y mantenimiento programado" style="width:60%;" >}}

### Publicar una degradación {#publish-a-degradation}

{{< img src="incident_response/status_pages/shopist_status_page_degradations2.png" alt="Ejemplo de página de estado que muestra componentes de servicio que experimentan degradación" style="width:100%;" >}}

Los avisos de degradación comunican **impacto imprevisto en el servicio**, como incidentes o interrupciones del servicio. Utilice avisos de degradación para mantener a los usuarios informados mientras se investiga, mitiga y resuelve un problema.

Desde una página de estado, haga clic en **Publicar aviso** y seleccione **Degradación**, luego proporcione:

| Campo | Descripción |
| ---- | ---- |
| **Título del aviso** | Descripción breve y clara del problema <br>*Ejemplo: Aumento de las tasas de error en la región de EE. UU.* |
| **Estado** | Estado actual del problema: <br>- En investigación <br>- Identificado <br>- En monitoreo <br>- Resuelto |
| **Mensaje** | Detalles adicionales para sus usuarios <br>*Ejemplo: Estamos al tanto del problema y trabajando activamente en una solución.* |
| **Componentes afectados** | Uno o más componentes afectados por la degradación |
| **Impacto** | Nivel de impacto por componente: <br>- Operativo <br>- Rendimiento degradado <br>- Interrupción parcial <br>- Interrupción mayor |
| **Notificar a los suscriptores** | Active esta opción para enviar actualizaciones a los usuarios suscritos |

{{< img src="incident_response/status_pages/publish_status_page_degradation_1.png" alt="Ejemplo de ventana modal de publicación de aviso para degradaciones" style="width:60%;" >}}

Después de que un aviso de degradación se revisa y publica, este:
- Aparece en la **Lista de estado** en Avisos activos.
- Actualiza las barras de tiempo de actividad de los componentes afectados. Los componentes configurados como **Interrupción parcial** o **Interrupción mayor** también ven reducido su porcentaje de tiempo de actividad durante la duración del impacto.
- Es visible en la línea de tiempo del historial de avisos.

Puede publicar actualizaciones con el tiempo y marcar el aviso como **Resuelto** cuando el problema se haya mitigado por completo.

**Nota**: Cada página de estado admite un máximo de 100 degradaciones activas (no resueltas) a la vez.

### Rellenar retroactivamente una degradación {#backfill-a-degradation}

Las degradaciones rellenadas retroactivamente le permiten documentar de forma retroactiva las interrupciones del servicio que no se anunciaron previamente. A cada actualización se le puede asignar su marca de tiempo original, de modo que la línea de tiempo del incidente aparezca con precisión en su historial de tiempo de actividad.

Desde una página de estado, seleccione el menú desplegable junto a **Publicar aviso**, seleccione **Publicar aviso retroactivo** > **Degradación** y, a continuación, proporcione:

| Campo | Descripción |
| ---- | ---- |
| **Título del aviso** | Descripción breve y clara del incidente <br>*Ejemplo: Aumento de las tasas de error en la región de EE. UU.* |
| **Actualizaciones** | Exactamente dos actualizaciones con marca de tiempo que representan el inicio y el fin de la degradación. Cada actualización requiere una marca de tiempo de inicio, un estado (Investigando o Resuelto), una descripción y los componentes afectados. |

{{< img src="incident_response/status_pages/publish_status_page_backfill_degradation.png" alt="Ejemplo de ventana modal para publicar un aviso rellenado retroactivamente de degradaciones" style="width:60%;" >}}

### Editar una actualización de degradación{#edit-a-degradation-update}

Después de publicar una actualización de degradación, puede editar su estado y mensaje para corregir errores tipográficos, arreglar una selección de estado inexacta o aclarar la descripción. Para editar una actualización, abra el aviso de degradación en la página de estado, coloque el cursor sobre la actualización que desea modificar y haga clic en el icono de edición que aparece. Realice sus cambios en el modal **Editar actualización**.

{{< img src="incident_response/status_pages/edit_degradation_update.png" alt="Modal de Editar actualización que muestra las opciones de Estado del aviso y un campo de Mensaje" style="width:60%;" >}}

Solo se pueden editar los campos **Estado del aviso** y **Mensaje**. Para resolver el aviso o actualizar los componentes afectados, agregue una nueva actualización en su lugar. Haga clic en **Guardar cambios** para aplicar las ediciones.

### Eliminar una actualización de degradación{#delete-a-degradation-update}

Para eliminar una actualización publicada por error, abra el aviso de degradación en la página de estado, coloque el cursor sobre la actualización que desea eliminar y haga clic en el icono de eliminar que aparece. Confirme en el modal **Eliminar actualización**.

{{< img src="incident_response/status_pages/delete_degradation_update.png" alt="Modal de confirmación de Eliminar actualización" style="width:60%;" >}}

Eliminar una actualización la reemplaza en la línea de tiempo con una nota que indica que fue eliminada por el administrador de la página. Esta acción no se puede deshacer.

### Programar una ventana de mantenimiento{#schedule-a-maintenance-window}

{{< img src="incident_response/status_pages/shopist_maintenance_example.png" alt="Ejemplo de página de estado que muestra componentes de servicio en mantenimiento" style="width:100%;" >}}

Las ventanas de mantenimiento le permiten comunicar de manera proactiva el tiempo de inactividad planificado o el impacto en el servicio antes de que ocurra. A diferencia de las degradaciones que se utilizan para incidentes no planificados, las ventanas de mantenimiento se programan con antelación para actualizaciones de infraestructura, mantenimiento del sistema, migraciones de bases de datos y otros trabajos planificados. Esto le permite mantener informados a los clientes y reducir el volumen de soporte.

Desde la página de estado, haga clic en **Programar mantenimiento**, o haga clic en **Publicar aviso** y seleccione **Mantenimiento programado**. Luego, proporcione los siguientes detalles:

| Campo | Descripción |
| ---- | ---- |
| **Título del aviso** | Descripción clara de la actividad de mantenimiento <br>*Ejemplo: Actualización de la infraestructura de la base de datos* |
| **Ventana de mantenimiento** | Hora de inicio y finalización programada para el mantenimiento |
| **Mensajes** | Mensajes que se publican automáticamente a medida que avanza el mantenimiento |
| **Componentes afectados** | Componentes afectados durante la ventana de mantenimiento |
| **Notificar a los suscriptores** | Active para enviar una notificación anticipada a los suscriptores |

{{< img src="incident_response/status_pages/publish_status_page_maintenance.png" alt="Ejemplo de ventana modal para publicar avisos de ventanas de mantenimiento" style="width:60%;" >}}

Después de revisar y programar, la ventana de mantenimiento:
- Aparece en **Mantenimiento próximo** en la página de estado
- Actualiza automáticamente el estado del componente a **Mantenimiento** cuando comienza la ventana
- Devuelve los componentes a **Operativo** cuando termina la ventana (a menos que se anule manualmente)

Puede publicar actualizaciones si los planes cambian o reprogramar la ventana de mantenimiento según sea necesario.

**Nota**: Cada página de estado admite un máximo de 100 ventanas de mantenimiento programadas o en curso a la vez.

### Cancelar una ventana de mantenimiento {#cancel-a-maintenance-window}

Para cancelar una ventana de mantenimiento programada antes de que comience, abra el aviso de mantenimiento, haga clic en el icono de tres puntos y seleccione **Cancelar mantenimiento**. Confirme la cancelación en el cuadro de diálogo que aparece.

{{< img src="incident_response/status_pages/cancel-maintenance-window.png" alt="Cuadro de diálogo de confirmación de Cancelar mantenimiento para una ventana de mantenimiento programada" style="width:60%;" >}}

Cancelar una ventana de mantenimiento la elimina de **Mantenimiento próximo** en la página de estado. Esta acción no se puede deshacer.

**Nota**: Una ventana de mantenimiento en curso no se puede cancelar.

### Rellenar retroactivamente una ventana de mantenimiento {#backfill-a-maintenance-window}

Las ventanas de mantenimiento rellenadas retroactivamente le permiten documentar de forma retroactiva el tiempo de inactividad planificado que no se anunció previamente. A cada actualización se le puede asignar su marca de tiempo original, de modo que la línea de tiempo de mantenimiento aparezca con precisión en su historial de tiempo de actividad.

Desde una página de estado, seleccione el menú desplegable junto a **Publicar aviso**, seleccione **Publicar aviso rellenado retroactivamente** > **Mantenimiento programado**, luego proporcione:

| Campo | Descripción |
| ---- | ---- |
| **Título del aviso** | Descripción clara de la actividad de mantenimiento <br>*Ejemplo: Actualización de la infraestructura de la base de datos* |
| **Actualizaciones** | Exactamente dos actualizaciones con marca de tiempo que representen el inicio y el final de la ventana de mantenimiento. Cada actualización requiere una marca de tiempo de inicio, estado (En curso o Completado), descripción y componentes afectados. |

{{< img src="incident_response/status_pages/publish_status_page_backfill_maintenance.png" alt="Ejemplo de ventana modal para publicar un aviso rellenado retroactivamente de ventanas de mantenimiento" style="width:60%;" >}}

### Editar una actualización de mantenimiento {#edit-a-maintenance-update}

Después de publicar una actualización de mantenimiento, puede editar su mensaje para corregir errores tipográficos o aclarar la descripción. Para editar una actualización pasada, abra el aviso de mantenimiento en la página de estado, coloque el cursor sobre la actualización que desea modificar en la línea de tiempo y haga clic en el icono de edición que aparece. Realice sus cambios en el modal **Editar actualización**.

{{< img src="incident_response/status_pages/edit_maintenance_update.png" alt="Ventana modal Editar actualización que muestra un campo de Mensaje para una actualización de mantenimiento pasada" style="width:60%;" >}}

Solo se puede editar el campo **Mensaje**. Haga clic en **Guardar cambios** para aplicar las ediciones.

## Usar plantillas de aviso {#use-notice-templates}

Las plantillas le permiten guardar lenguaje preconfigurado para avisos de degradación y ventanas de mantenimiento que publica repetidamente, como una actividad de mantenimiento recurrente o un tipo conocido de interrupción del servicio. Cuando publique un aviso, seleccione una plantilla para rellenar previamente el título del aviso, los mensajes por estado y los componentes afectados en lugar de escribirlos cada vez.

### Crear una plantilla {#create-a-template}

1. Desde su página de estado, haga clic en **Configuración** y seleccione la pestaña **Plantillas**.
1. En la sección **Plantillas de degradación** o **Plantillas de mantenimiento**, haga clic en **Agregar plantilla**.
1. Proporcione los siguientes detalles:

   | Campo | Descripción |
   | ---- | ---- |
   | **Nombre de la plantilla** | Nombre interno utilizado para identificar la plantilla al seleccionarla. No se muestra en la página de estado publicada. |
   | **Título del aviso** | Título predeterminado que se completa automáticamente cuando se utiliza la plantilla. |
   | **Mensajes** | Un mensaje para cada estado del aviso. Las plantillas de degradación admiten **Investigando**, **Identificado**, **Monitoreando** y **Resuelto**. Las plantillas de mantenimiento admiten **Programado**, **En curso** y **Completado**. |
   | **Componentes** | Componentes que se preseleccionarán cuando se utilice la plantilla. Para las plantillas de degradación, también puede establecer un estado inicial para cada componente. |

1. Haga clic en **Guardar**.

{{< img src="incident_response/status_pages/create_degradation_template.png" alt="Crear una plantilla de degradación con un título, mensajes por estado utilizando variables de plantilla y componentes afectados" style="width:100%;" >}}

### Insertar variables de plantilla {#insert-template-variables}

Inserte una variable en un mensaje de plantilla para que Datadog la resuelva cuando la plantilla se aplique a un aviso. Dependiendo de la variable, Datadog completa el valor automáticamente o le pide al editor que proporcione uno. El panel **Variables de mensaje** junto a los campos de mensaje enumera las variables disponibles:

| Variable | Descripción |
| ---- | ---- |
| `{{date}}` | Prompts the publisher to select a date and time when the template is applied. |
| `{{components_impacted}}` | Completa automáticamente la lista de componentes seleccionados en el aviso. |

Para insertar una variable, escriba `{{` en un campo de mensaje y seleccione una variable de la lista, o haga clic en una variable en el panel **Variables de mensaje** para insertarla en el cursor.

### Aplicar una plantilla a un aviso {#apply-a-template-to-a-notice}

Desde el modal **Publicar aviso**, seleccione una plantilla del menú desplegable **Plantilla** para completar previamente el aviso con su título, mensajes y componentes.

La aplicación de una plantilla completa previamente los campos del aviso, los cuales permanecen editables. Para descartar sus ediciones y restaurar el contenido original de la plantilla, haga clic en **Restablecer valores**. 

{{< img src="incident_response/status_pages/apply_template_to_notice.png" alt="Modal de Publicar aviso con una plantilla aplicada, completando previamente el título del aviso, el mensaje y los componentes afectados" style="width:60%;" >}}

## Suscripciones por correo electrónico {#email-subscriptions}

Las suscripciones por correo electrónico en las páginas de estado son de **doble aceptación**. Después de ingresar un correo electrónico para suscribirse, los usuarios reciben un correo de confirmación y deben hacer clic en el enlace de confirmación para activar su suscripción. Durante este proceso, los usuarios pueden elegir recibir notificaciones para toda la página de estado o seleccionar componentes específicos que deseen hacer un seguimiento. Se puede configurar una zona horaria preferida para el formato de marca de tiempo dentro de las notificaciones. Los usuarios pueden administrar sus preferencias y actualizar sus suscripciones en cualquier momento a través del enlace de administración de suscripciones incluido en los correos electrónicos de notificación.

Para las páginas de estado **internas**, el proceso de suscripción es el mismo, pero los usuarios deben iniciar sesión en la misma organización de Datadog para confirmar su suscripción y recibir notificaciones.

{{< img src="/incident_response/status_pages/status_pages_subscription_1.png" alt="Captura de pantalla del modal de suscripción de la página de estado con los campos completados" style="width:70%;" >}}


## Configurar un dominio de remitente de correo electrónico personalizado {#configure-a-custom-email-sender-domain}

De forma predeterminada, los correos electrónicos de suscripción a la página de estado se envían desde una dirección de correo electrónico de Datadog. Para enviar notificaciones desde su propio dominio, configure un servidor SMTP personalizado en la Configuración de la organización.

<div class="alert alert-danger">El <code>org_management</code> permiso es necesario para agregar servidores SMTP en la Configuración de la organización. El <code>status_pages_settings_write</code> Se requiere permiso para seleccionar el dominio del remitente de correo electrónico en una página de estado.</div>

1. En su página de estado, vaya a **Configuración** > **Suscripciones**.
2. En **Dominio del remitente de correo electrónico**, haga clic en **Configuración de la organización**.
3. En Configuración de la organización, [agregue y valide un servidor SMTP][3].
4. Regrese a **Configuración** > **Suscripciones** y seleccione su servidor SMTP como el dominio del remitente de correo electrónico.

## Suscripciones de Slack {#slack-subscriptions}

Los visitantes pueden suscribirse a las actualizaciones de la página de estado en Slack a través de la aplicación de Slack **Datadog Status Pages**. Cuando se publica un aviso o un mantenimiento programado con **Notificar a los suscriptores** habilitado, la aplicación publica actualizaciones en cada canal suscrito para los componentes que sigue, utilizando el nombre de su página y el icono de la aplicación de Slack como remitente. Las suscripciones de Slack se configuran independientemente de las [suscripciones por correo electrónico](#email-subscriptions).

### Habilitar suscripciones de Slack {#enable-slack-subscriptions}

1. Desde su página de estado, haga clic en **Configuración**.
2. Habilite **suscripciones de Slack**.
3. (Opcional) En **Icono de la aplicación de Slack**, cargue una imagen para usarla como avatar del remitente en las notificaciones de Slack.

{{< img src="incident_response/status_pages/status_pages_enable_slack.png" alt="Configuración de la página de estado que muestra el interruptor Habilitar suscripciones de Slack y la carga del icono de la aplicación de Slack" style="width:80%;" >}}

Haga clic en **Suscribirse** en la página publicada para abrir un modal con una pestaña para cada tipo de suscripción habilitado.

### Suscribirse en Slack {#subscribe-in-slack}

Desde una página publicada con suscripciones de Slack habilitadas:

1. Haga clic en **Suscribirse** y abra la pestaña **Slack**.
1. (Opcional) Seleccione **Suscribirse a servicios específicos** para elegir componentes individuales, o déjelo sin marcar para seguir toda la página.
1. Haga clic en **Suscribirse mediante Slack**.
   {{< img src="incident_response/status_pages/status_pages_slack_subscription_modal.png" alt="Modal de Suscripción a Actualizaciones con la pestaña de Slack seleccionada y un botón de Suscribirse vía Slack" style="width:70%;" >}}
1. Autorice la aplicación **Datadog Status Pages** para su espacio de trabajo y seleccione el canal para recibir actualizaciones.
   {{< img src="incident_response/status_pages/status_pages_slack_oauth.png" alt="Pantalla de autorización de Slack que otorga a la aplicación Datadog Status Pages acceso a un espacio de trabajo y canal" style="width:70%;" >}}

Después de suscribirse, el canal seleccionado recibe un mensaje de bienvenida confirmando la suscripción.

**Canales privados**: Después de suscribirse, el usuario recibe un mensaje en la pestaña **Mensajes** de la aplicación de Slack solicitándole que invite al bot **Datadog Status Pages** al canal. El bot debe ser invitado antes de que pueda publicar actualizaciones. Los canales de mensajes directos (DM) no son compatibles. En las páginas de estado **internas**, los usuarios deben haber iniciado sesión en la misma organización de Datadog para suscribirse.

### Administrar suscripciones {#manage-subscriptions}

Los suscriptores pueden cambiar los componentes que siguen o cancelar la suscripción en cualquier momento desde el enlace **Administrar preferencias** en cualquier notificación de Slack.

Los propietarios de la página de estado pueden revisar a los suscriptores en la configuración de la página de estado, la cual enumera los espacios de trabajo y canales de Slack suscritos. Eliminar un espacio de trabajo cancela la suscripción de todos sus canales de la página.

<div class="alert alert-info">
Si el servidor SMTP seleccionado falla, las notificaciones se envían a los suscriptores a través de <strong>Datadog Default</strong> (<code>no-reply@dtdg.co</code>).
</div>

## Configurar un dominio personalizado {#set-a-custom-domain}

Para que coincida con su marca, tiene la opción de asociar la URL de su página de estado a un dominio personalizado como `status.acme.com`. Esto es independiente de [configurar un dominio de remitente de correo electrónico personalizado](#configure-a-custom-email-sender-domain), que controla la dirección de origen en los correos electrónicos de suscripción.

1. Desde su página de estado, haga clic en **Configuración**.
1. Seleccione **Dominio personalizado**.
1. Siga las instrucciones para ingresar su dominio y agregar registros DNS.
1. Datadog detecta automáticamente la configuración de DNS y aprovisiona un certificado SSL.

<div class="alert alert-warning">Los dominios personalizados requieren acceso a su proveedor de DNS para agregar un registro CNAME o A.</div>

**Nota**:

- La propagación de DNS puede tardar varios minutos.
- Puede volver al dominio predeterminado de Datadog en cualquier momento.
- Los cambios de DNS deben ser realizados por alguien con acceso a su registrador de dominios.

## Administre páginas de estado con Terraform {#manage-status-pages-with-terraform}
Puede usar Terraform para crear o administrar sus páginas de estado. Para obtener detalles sobre los recursos disponibles, consulte el [registro de Terraform][4] de Datadog.  


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/
[2]: https://app.datadoghq.com/status-pages
[3]: /es/account_management/org_settings/smtp_configuration
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/status_page