---
aliases:
- /es/service_management/status_pages/
further_reading:
- link: https://www.datadoghq.com/blog/status-pages
  tag: Blog
  text: Mantenga informados a los interesados con las Páginas de Estado de Datadog
- link: /incident_response/incident_management/
  tag: Documentación
  text: Aprenda más sobre Incident Management
- link: /incident_response/on-call/
  tag: Documentación
  text: Aprenda más sobre On-Call Scheduling
- link: /incident_response/incident_management/integrations/status_pages
  tag: Documentación
  text: Integre las Páginas de Estado de Datadog con Incident Management
title: Páginas de Estado
---
## Descripción general {#overview}

{{< img src="service_management/status_pages/shopist_status_page2.png" alt="Ejemplo de página de estado que muestra los componentes del servicio con su estado actual y actualizaciones recientes de incidentes" style="width:100%;" >}}

Las Páginas de Estado son parte de la suite de Incident Response de Datadog, junto con On-Call e Incident Management. Permite a su equipo comunicar proactivamente **la disponibilidad del servicio**, **los incidentes** y **el mantenimiento programado** a los clientes o interesados internos a través de una página web compartible.

Utilice las Páginas de Estado para:

* Compartir la disponibilidad de sistemas y características críticas
* Comunicar interrupciones del servicio de manera clara durante los incidentes
* Anunciar el mantenimiento programado y el tiempo de inactividad planificado con anticipación
* Reducir el volumen de soporte entrante con notificaciones por correo electrónico proactivas

## Configurar permisos {#configure-permissions}

Hay tres permisos RBAC que son relevantes para las Páginas de Estado. Los usuarios con el rol Datadog Admin tienen todos los permisos necesarios.

Para crear, actualizar o publicar Páginas de Estado, debe tener `status_pages_settings_read`, `status_pages_settings_write` y `status_pages_incident_write` permisos RBAC. Para más información, consulte [Access Control][1].

<table>
  <thead>
    <tr>
      <th style="white-space: nowrap;">Nombre</th>
      <th>Descripción</th>
      <th>Rol Predeterminado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;">Configuración de Páginas de Estado de Lectura<br><code style="white-space: nowrap;">status_pages_settings_read</code></td>
      <td>Vea la lista de Páginas de Estado, la configuración de cada Página de Estado, sus Avisos y las Páginas de Estado Internas lanzadas.</td>
      <td>Rol Datadog Read Only</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Configuración de Páginas de Estado de Escritura<br><code style="white-space: nowrap;">status_pages_settings_write</code></td>
      <td>Cree y lance nuevas Páginas de Estado, y configure los ajustes de las Páginas de Estado.</td>
      <td>Rol Datadog Admin</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Escritura de Avisos de Páginas de Estado<br><code style="white-space: nowrap;">status_pages_incident_write</code></td>
      <td>Publique y actualice Incidentes.</td>
      <td>Rol de Administrador de Datadog</td>
    </tr>
  </tbody>
</table>

## Cree una página de estado {#create-a-status-page}

1. En Datadog, navegue a [**Páginas de Estado**][2].
1. Haga clic en **Crear Página de Estado** y siga el flujo de incorporación:

   | Campo             | Descripción |
   | ----------------- | ----------- |
   | **Tipo de Página de Estado**    | Elija quién puede acceder a la página: <br>- **Público** - Cualquiera con el enlace puede ver <br>- **Interno** - Solo los usuarios autenticados dentro de su organización de Datadog pueden ver |
   | **Nombre de la página**     | Se muestra como el encabezado de la página (si no se carga un logo). <br>*Ejemplo: Plataforma en la Nube Acme* |
   | **Prefijo de Dominio** | Se utiliza como el prefijo de subdominio de su página de estado. Para más información sobre dominios personalizados, consulte la sección [Establecer un dominio personalizado](#set-a-custom-domain).<br>*Ejemplo: shopist → shopist.statuspage.datadoghq.com* <br>- Debe ser **globalmente único** <br>- Minúsculas, alfanumérico y con guiones <br>- Puede afectar los enlaces si se cambia más tarde |
   | **Suscripciones** *(opcional)* | Permita a los usuarios recibir notificaciones por correo electrónico sobre actualizaciones de la página de estado. Cuando las suscripciones están habilitadas, los usuarios pueden registrarse para recibir notificaciones sobre nuevos avisos y actualizaciones. Puede activar o desactivar las suscripciones para cada página de estado. **Nota**: [Las suscripciones por correo electrónico](#email-subscriptions) son de doble confirmación, el correo debe ser confirmado. |
   | **Logo de la empresa, Favicon o Imagen de Encabezado de Correo** *(opcional)* | Suba un logo, favicon o imagen para personalizar la apariencia de su página de estado y las notificaciones por correo electrónico. |
1. (Opcional) [Agregue componentes](#add-components) para mostrar el estado de servicios individuales.
1. Haga clic en **Guardar Configuraciones**.
   <div class="alert alert-info">Una página de estado <strong>no está en vivo</strong> después de guardar sus configuraciones. Para hacer la página disponible, <a href="#publish-your-status-page">publique su página de estado</a>.</div>

## Agregue componentes {#add-components}

{{< img src="/service_management/status_pages/status_page_components.png" alt="Configuración de componentes de la página de estado con panel de vista previa en vivo" style="width:100%;" >}}

Los componentes son los bloques de construcción de su página de estado. Cada uno representa un servicio o característica que a sus usuarios les importa. Algunos ejemplos de componentes incluyen:
- API Gateway
- Panel Web
- Clúster de Base de Datos
- Servicios de Región de EE. UU.

Puede agregar componentes a su página de estado ya sea en la configuración inicial o a través de la configuración de la página de estado:

1. Desde su página de estado, haga clic en **Configuración** y seleccione la pestaña **Componentes**.
1. Cree componentes individuales o un grupo de componentes relacionados. Puede asociar [avisos](#add-a-notice) con estos componentes para reflejar el impacto en su página de estado.
1. Seleccione un tipo de visualización:
   1. Barras y Porcentaje de tiempo de actividad
   1. Solo barras
   1. Solo nombre del componente

### Jerarquía de componentes {#component-hierarchy}

Si múltiples avisos afectan el mismo componente, el aviso con el mayor impacto tiene prioridad:
Falla mayor > Falla parcial > Rendimiento degradado > Mantenimiento > Operativo

## Publique su página de estado {#publish-your-status-page}

Después de guardar la configuración de su página de estado, haga clic en **Lanzar página de estado** para hacer que la página esté disponible en su URL.

Si seleccionó:
- **Público**, la página es inmediatamente accesible para todos los visitantes.
- **Interno**, el acceso está limitado a usuarios autenticados de Datadog en su organización.

## Agregue un aviso {#add-a-notice}

Los avisos son mensajes publicados en una página de estado para comunicar el estado del sistema. Las Páginas de Estado soportan dos tipos de avisos: **degradaciones** para impactos de servicio no planificados y **ventanas de mantenimiento** para tiempos de inactividad planificados.

{{< img src="service_management/status_pages/select_notice_type_status_page.png" alt="Selector de tipo de aviso de página de estado con opciones de degradación y mantenimiento programado" style="width:60%;" >}}

### Publique una degradación {#publish-a-degradation}

{{< img src="service_management/status_pages/shopist_status_page_degradations.png" alt="Ejemplo de página de estado que muestra componentes de servicio que experimentan degradación" style="width:100%;" >}}

Los avisos de degradación comunican **impacto de servicio no planificado**, como incidentes o interrupciones del servicio. Utilice avisos de degradación para mantener informados a los usuarios mientras se investiga, mitiga y resuelve un problema.

Desde una página de estado, haga clic en **Publicar aviso** y seleccione **Degradación**, luego proporcione:

| Campo | Descripción |
| ---- | ---- |
| **Título del aviso** | Descripción corta y clara del problema <br>*Ejemplo: Aumento de tasas de error en la región de EE. UU.* |
| **Estado** | Estado actual del problema: <br>- Investigando <br>- Identificado <br>- Monitoreando <br>- Resuelto |
| **Mensaje** | Detalles adicionales para sus usuarios <br>*Ejemplo: Somos conscientes del problema y estamos trabajando activamente en una solución.* |
| **Componentes afectados** | Uno o más componentes afectados por la degradación |
| **Impacto** | Nivel de impacto por componente: <br>- Operativo <br>- Rendimiento degradado <br>- Interrupción parcial <br>- Interrupción mayor |
| **Notificar a los suscriptores** | Alternar para enviar actualizaciones a los usuarios suscritos |

{{< img src="service_management/status_pages/publish_status_page_degradation.png" alt="Ejemplo de ventana modal de aviso de publicación para degradaciones" style="width:60%;" >}}

Después de que se revisa y publica un aviso de degradación, este:
- Aparece en la **Lista de Páginas de Estado** bajo Avisos Activos.
- Actualiza las barras de tiempo de actividad para los componentes afectados.
- Es visible en la línea de tiempo del historial de avisos.

Puede publicar actualizaciones con el tiempo y marcar el aviso como **Resuelto** cuando el problema esté completamente mitigado.

### Registre retroactivamente una degradación {#backfill-a-degradation}

Las degradaciones registradas retroactivamente permiten documentar interrupciones del servicio que no fueron anunciadas previamente. Cada actualización puede asignarse su marca de tiempo original, de modo que la línea de tiempo del incidente aparezca con precisión en su historial de tiempo de actividad.

Desde una página de estado, seleccione el menú desplegable junto a **Publicar Aviso**, seleccione **Publicar Aviso Retroactivo** > **Degradación**, luego proporcione:

| Campo | Descripción |
| ---- | ---- |
| **Título del aviso** | Descripción corta y clara del incidente <br>*Ejemplo: Aumento de tasas de error en la región de EE. UU.* |
| **Actualizaciones** | Exactamente dos actualizaciones con marca de tiempo que representan el inicio y el final de la degradación. Cada actualización requiere una marca de tiempo de inicio, estado (Investigando o Resuelto), descripción y componentes afectados. |

{{< img src="service_management/status_pages/publish_status_page_backfill_degradation.png" alt="Ejemplo de ventana modal para publicar un aviso retroactivo de degradación" style="width:60%;" >}}

### Programar una ventana de mantenimiento {#schedule-a-maintenance-window}

{{< img src="service_management/status_pages/shopist_maintenance_example.png" alt="Página de estado de ejemplo que muestra los componentes del servicio en mantenimiento" style="width:100%;" >}}

Las ventanas de mantenimiento le permiten comunicar proactivamente el tiempo de inactividad planificado o el impacto del servicio antes de que ocurra. A diferencia de las degradaciones que se utilizan para incidentes no planificados, las ventanas de mantenimiento se programan con anticipación para actualizaciones de infraestructura, mantenimiento del sistema, migraciones de bases de datos y otros trabajos planificados. Esto le permite mantener informados a los clientes y reducir el volumen de soporte.

Desde la página de estado, haga clic en **Programar Mantenimiento**, o haga clic en **Publicar Aviso** y seleccione **Mantenimiento Programado**. Luego, proporcione los siguientes detalles:

| Campo | Descripción |
| ---- | ---- |
| **Título del aviso** | Descripción clara de la actividad de mantenimiento <br>*Ejemplo: Actualización de infraestructura de base de datos* |
| **Ventana de mantenimiento** | Hora de inicio y fin programada para el mantenimiento |
| **Mensajes** | Mensajes que se publican automáticamente a medida que avanza el mantenimiento |
| **Componentes afectados** | Componentes afectados durante la ventana de mantenimiento |
| **Notificar a los suscriptores** | Alternar para enviar notificación anticipada a los suscriptores |

{{< img src="service_management/status_pages/publish_status_page_maintenance.png" alt="Modal de aviso de publicación de ejemplo para ventanas de mantenimiento" style="width:60%;" >}}

Después de revisar y programar, la ventana de mantenimiento:
- Aparece bajo **Próximo Mantenimiento** en la página de estado
- Actualiza automáticamente el estado del componente a **Mantenimiento** cuando comienza la ventana
- Devuelve los componentes a **Operativo** cuando termina la ventana (a menos que se anule manualmente)

Puede publicar actualizaciones si los planes cambian o reprogramar la ventana de mantenimiento según sea necesario.

### Rellenar una ventana de mantenimiento {#backfill-a-maintenance-window}

Las ventanas de mantenimiento retroactivas permiten documentar retroactivamente el tiempo de inactividad planificado que no se anunció previamente. Cada actualización puede asignarse su marca de tiempo original, por lo que la línea de tiempo de mantenimiento aparece con precisión en su historial de tiempo de actividad.

Desde una página de estado, seleccione el menú desplegable junto a **Publicar Aviso**, seleccione **Publicar Aviso Retroactivo** > **Mantenimiento Programado**, luego proporcione:

| Campo | Descripción |
| ---- | ---- |
| **Título del aviso** | Descripción clara de la actividad de mantenimiento <br>*Ejemplo: Actualización de infraestructura de base de datos* |
| **Actualizaciones** | Exactamente dos actualizaciones con marca de tiempo que representan el inicio y el fin de la ventana de mantenimiento. Cada actualización requiere una marca de tiempo de inicio, estado (En Progreso o Completado), descripción y componentes afectados. |

{{< img src="service_management/status_pages/publish_status_page_backfill_maintenance.png" alt="Ejemplo de modal de aviso retroactivo publicado para ventanas de mantenimiento" style="width:60%;" >}}

## Suscripciones por correo electrónico {#email-subscriptions}

Las suscripciones por correo electrónico en las páginas de estado son **double opt-in**. Después de ingresar un correo electrónico para suscribirse, los usuarios reciben un correo electrónico de confirmación y deben hacer clic en el enlace de confirmación para activar su suscripción. Durante este proceso, los usuarios pueden elegir recibir notificaciones para toda la página de estado o seleccionar componentes específicos que desean monitorear. Se puede configurar una zona horaria preferida para el formato de marca de tiempo dentro de las notificaciones. Los usuarios pueden gestionar sus preferencias y actualizar sus suscripciones en cualquier momento a través del enlace de gestión de suscripciones incluido en los correos electrónicos de notificación.

Para **páginas de estado** internas, el proceso de suscripción es el mismo, pero los usuarios deben iniciar sesión en la misma organización de Datadog para confirmar su suscripción y recibir notificaciones.

{{< img src="/service_management/status_pages/status_pages_subscription_1.png" alt="Captura de pantalla del modal de suscripción de la Página de Estado con campos completados" style="width:70%;" >}}

## Configurar un dominio personalizado {#set-a-custom-domain}

Para coincidir con su marca, tiene la opción de mapear su página de estado a un dominio personalizado como `status.acme.com`.

1. Desde su página de estado, haga clic en **Configuración**.
1. Seleccione **Dominio Personalizado**.
1. Siga las instrucciones para ingresar su dominio y agregar registros DNS.
1. Datadog detecta automáticamente la configuración de DNS y provisiona un certificado SSL.

<div class="alert alert-warning">Los dominios personalizados requieren acceso a su proveedor de DNS para agregar un registro CNAME o A.</div>

**Nota**:

- La propagación de DNS puede tardar varios minutos.
- Puede revertir al dominio predeterminado de Datadog en cualquier momento.
- Asegúrese de que los cambios de DNS sean realizados por alguien con acceso a su registrador de dominios.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/
[2]: https://app.datadoghq.com/status-pages