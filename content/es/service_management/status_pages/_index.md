---
further_reading:
- link: https://www.datadoghq.com/blog/status-pages
  tag: Blog
  text: Mantener informados a las partes interesadas con las páginas de estado de
    Datadog
- link: service_management/incident_management/
  tag: Documentación
  text: Obtén más información sobre la gestión de incidencias
- link: service_management/on-call/
  tag: Documentación
  text: Más información sobre la programación de guardias
- link: service_management/incident_management/integrations/status_pages
  tag: Documentación
  text: Integrar las páginas de estado de Datadog con Incident Management
title: Páginas de estado
---

## Información general

{{< img src="service_management/status_pages/shopist_status_page.png" alt="Ejemplo de página de estado en la que se muestran componentes de servicios con su estado actual y actualizaciones de incidentes recientes" style="width:100%;" >}}

Las páginas de estado forman parte de la serie de respuestas a incidentes de Datadog, junto con On-Call e Incident Management. Permiten a tu equipo comunicar de forma proactiva la **disponibilidad del servicio** y los **incidentes** a clientes o partes interesadas internas a través de una página web compartible.

Utiliza las páginas de estado para:

* Compartir la disponibilidad de sistemas y funciones críticos
* Comunicar claramente las interrupciones del servicio durante los incidents (incidentes)
* Reduzca el volumen de asistencia entrante con notificaciones proactivas por correo electrónico

## Configurar permisos

Hay tres permisos RBAC que son relevantes para las páginas de estado. Los usuarios con el rol de administrador de Datadog tienen todos los permisos necesarios.

Para crear, actualizar o publicar páginas de estado, debes tener permisos RBAC `status_pages_settings_read`, `status_pages_settings_write` y `status_pages_incident_write`. Para obtener más información, consulta [Control de acceso][1].

<table>
  <thead>
    <tr>
      <th style="white-space: nowrap;">Nombre</th>
      <th>Descripcion</th>
      <th>Rol predeterminado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;">Configuración de lectura de las páginas de estado<br><code style="white-space: nowrap;">status_pages_settings_read</code></td>
      <td>Visualiza la lista de páginas de estado, los parámetros de cada página de estado, sus incidentes y las páginas de estado internas iniciadas</td>
      <td>Rol de solo lectura de Datadog</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Configuración de escritura de las páginas de estado<br><code style="white-space: nowrap;">status_pages_settings_write</code></td>
      <td>Crea e inicia nuevas páginas de estado y configura los parámetros de las páginas de estado.</td>
      <td>Rol de administrador de Datadog</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;">Escritura de avisos de páginas de estado<br><code style="white-space: nowrap;">status_pages_incident_write</code></td>
      <td>Publica y actualiza incidentes.</td>
      <td>Rol de administrador de Datadog</td>
    </tr>
  </tbody>
</table>

## Crear una página de estado

1. En Datadog, ve a [**Service Management > Status Pages** (Gestión de servicios > Páginas de estado)][2].
1. Haz clic en **Crear página de estado** y sigue el flujo de incorporación:

   | Campo             | Descripción |
   | ----------------- | ----------- |
   | **Tipo de página de estado** | Elige quién puede acceder a la página: <br>- **Público** - Cualquiera con el enlace puede visualizar <br>- **Interno** - Solo usuarios autentificados de tu organización Datadog pueden visualizar |
   | **Nombre de la página** | Se muestra como encabezado de la página (si no se carga ningún logotipo). <br>*Ejemplo: Acme Cloud Platform* |
   | **Prefijo de dominio** | Se utiliza como prefijo de subdominio de tu página de estado. Para obtener más información sobre dominios personalizados, consulta la sección [Configurar un dominio personalizado](#set-a-custom-domain).<br>*Ejemplo: shopist → shopist.statuspage.datadoghq.com* <br>- Debe ser **globalmente único** <br>- En minúsculas, alfanumérico y con guión <br>- Puede afectar a los enlaces si se cambia posteriormente |.
   | **Suscripciones** *(opcional)* | Permite a los usuarios recibir notificaciones por correo electrónico sobre actualizaciones de páginas de estado. Cuando las suscripciones están activadas, los usuarios pueden registrarse para recibir notificaciones sobre nuevos avisos y actualizaciones. Puedes activar o desactivar las suscripciones para cada página de estado. **Nota**: Las [suscripciones por correo electrónico](#email-subscriptions) son de doble opción, el correo electrónico debe ser confirmado. |
   | **Logotipo de la empresa, favicon o imagen de cabecera de correo electrónico** *(opcional)* | Carga un logotipo, favicon o imagen para personalizar el aspecto de tu página de estado y las notificaciones por correo electrónico. |
1. (Opcional) [Añadir componentes](#add-components) para mostrar el estado de los servicios individuales.
1. Haz clic en **Guardar parámetros**
   <div class="alert alert-info">Una página de estado <strong>no está en tiempo real</strong> después de guardar tus parámetros. Para que la página esté disponible, <a href="#publish-your-status-page">publica tu página de estado</a>.</div>

## Añadir componentes

{{< img src="/service_management/status_pages/status_page_components.png" alt="Configuración de componentes de la página de estado con el panel de vista previa en tiempo real" style="width:100%;" >}}

Los componentes son los bloques de construcción de tu página de estado. Cada uno de ellos representa un servicio o función que les interesa a los usuarios. Algunos ejemplos de componentes son:
- API Gateway
- Dashboard web
- Clúster de bases de datos
- Servicios para la región de EE.UU.

Puedes añadir componentes a tu página de estado, ya sea en la configuración inicial o a través de los parámetros de la página de estado:

1. Desde tu página de estado, haz clic en **Settings** (Parámetros) y selecciona la pestaña **Components** (Componentes).
1. Crea componentes individuales o un grupo de componentes relacionados. Puedes asociar [avisos](#add-a-notice) a estos componentes para reflejar el impacto en tu página de estado.
1. Selecciona un tipo de visualización:
   1. Barras y porcentaje de tiempo de actividad
   1. Solo barras
   1. Solo nombre del componente

## Publicar tu página de estado

Después de guardar la configuración de tu página de estado, haz clic en **Launch Status Page** (Iniciar página de estado) para que la página esté disponible en tu URL.

Si has seleccionado:
- **Público**, la página es inmediatamente accesible a todos los visitantes.
- **Interno**, el acceso está limitado a los usuarios autentificados de Datadog de tu organización.

## Añadir un aviso

Los avisos en las páginas de estado son mensajes cuidadosamente elaborados que se publican en un sitio web público para comunicar el estado del sistema. Cuando surge un problema, puedes comunicarlo claramente a través de tu página de estado.

1. Desde una página de estado, haz clic en **Publish Notice** (Publicar aviso) para abrir un modal "Publish Status Page Notice" (Publicar aviso de página de estado) y proporciona:
   | Campo | Descripción |
   | ---- | ---- |
   | **Título** | Descripción breve y clara del incident (incidente) <br> *Ejemplo: Aumento del porcentaje de errores en la región de EE.UU.* |
   | **Estado** | Estado actual del incident (incidente): <br>- Investigando <br>- Identificado <br>- Monitorizando <br>- Resuelto |
   | **Mensaje** *(opcional)* | Detalles adicionales para tus usuarios <br>*Ejemplos: causa conocida, tiempo de resolución esperado* |
   | **Componentes afectados** | Uno o más componentes afectados por el incidente |
   | **Efecto** | Nivel de efecto por componente: <br>- Operativo <br>- Rendimiento degradado <br>- Interrupción parcial <br>- Interrupción grave |
   | **Notificar a los suscriptores** | Alternar para enviar el aviso a los suscriptores |
1. Haz clic en **Publish Notice** (Publicar aviso).

{{< img src="/service_management/status_pages/publish_status_page_incident_1.png" alt="Captura de pantalla del modal de creación de un aviso de página de estado con los campos rellenados" style="width:70%;" >}}

Tras la publicación de un aviso, este:
- Aparece en la lista de páginas de estado bajo **Active Notices** (Avisos activos).
- Actualiza las barras de tiempo de actividad de los componentes afectados.
- Es visible en la línea de tiempo del historial de avisos.

Puedes publicar **actualizaciones** a lo largo del tiempo para mantener informados a los usuarios y, a continuación, marcar el aviso como **Resuelto**.

## Suscripciones por correo electrónico

Las suscripciones por correo electrónico en las páginas de estado son de **doble opción**: los usuarios deben confirmar su dirección de correo electrónico antes de ser añadidos como suscriptores. Después de introducir un correo electrónico para suscribirse, se envía un correo de confirmación, y la suscripción solo se activa cuando el usuario hace clic en el enlace de confirmación.

Para las páginas de estado **internas**, el proceso de suscripción es el mismo, pero los usuarios deben iniciar sesión en la misma organización Datadog para confirmar su suscripción y recibir notificaciones.

## Configurar un dominio personalizado

Para que coincida con tu marca, tienes la opción de asignar tu página de estado a un dominio personalizado como `status.acme.com`.

1. Desde tu página de estado, haz clic en **Settings** (Parámetros).
1. Selecciona **Dominio personalizado**.
1. Sigue las instrucciones para introducir tu dominio y añadir registros DNS.
1. Datadog detecta automáticamente la configuración DNS y proporciona un certificado SSL.

<div class="alert alert-warning">Los dominios personalizados requieren acceso a tu proveedor de DNS para añadir un registro CNAME o A.</div>

**Nota**:

- La propagación de DNS puede tardar varios minutos.
- Puedes volver al dominio predeterminado Datadog en cualquier momento.
- Asegúrate de que los cambios de DNS los realice una persona con acceso al registrador de tu dominio.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/
[2]: https://app.datadoghq.com/status-pages