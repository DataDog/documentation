---
further_reading:
- link: /service_management/case_management/troubleshooting
  tag: Documentación
  text: Solucionar problemas de integraciones de terceros
title: Parámetros
---

{{% site-region region="gov,ap1" %}}
<div class="alert alert-danger">
La función de gestión de casos no está disponible en el sitio {{< region-param key=dd_datacenter code="true" >}}.
</div>
{{% /site-region %}}

## Información general

En Project Settings (Configuración del proyecto), puedes gestionar el control de acceso, configurar transiciones automáticas de estado, configurar integraciones de terceros como Jira y ServiceNow, y mucho más.

## Control de acceso granular

Por defecto, el acceso a proyectos y casos no está restringido. El [Control de acceso detallado][1] puede utilizarse para gestionar los permisos de usuarios, equipos, roles o toda la organización a nivel de proyecto. Hay cuatro conjuntos de permisos que se pueden utilizar:
- **Gestor**: los usuarios pueden crear y editar casos, vistas, configuraciones y permisos del proyecto, y pueden eliminar el proyecto.
- **Colaborador**: los usuarios pueden crear, comentar y editar casos. No pueden cambiar la configuración, los permisos ni el proyecto.
- **Visor**: los usuarios pueden ver y observar todos los casos, vistas y configuraciones del proyecto. No pueden crear, editar n comentar casos.
- **Sin acceso**: los usuarios no pueden ver ningún caso, vista o configuración del proyecto.

**Nota:** Otros productos de Datadog que se integran con Case Management, como los monitores, son capaces de crear automáticamente casos dentro de un proyecto independientemente de la configuración de acceso del proyecto.

## Transiciones de estado

Para reducir el ruido, configura los casos con el fin de que se cierren de manera automática tras 7, 14, 30, 90 o 180 días de inactividad desde la página de transiciones de estado de la configuración del proyecto. La inactividad se define como la ausencia de acciones iniciadas por humanos, como actualizar un atributo o escribir un comentario. Una vez al día, Datadog busca los casos inactivos durante al menos el período seleccionado y los cierra.

## Configurar integraciones

Case Management ofrece una gama de soluciones nativas e integraciones de terceros, para que puedas incorporar soluciones de Datadog a tus flujos de trabajo y procesos existentes. Con las integraciones de Jira y ServiceNow, puedes resolver el caso con telemetría de todo el stack tecnológico en Datadog, al tiempo que mantienes un registro de la investigación en esos sistemas de terceros.

### Monitores

Ve a la página [Project Settings (Configuración del proyecto)][2], haz clic en **Integrations** > **Datadog Monitors** (Integraciones > Monitores de Datadog Monitores) y haz clic en el conmutador para obtener tu @case-<project_handle>.

Los identificadores de proyecto pueden utilizarse en los monitores para crear casos automáticamente. En el cuerpo del mensaje del monitor, incluye `@case-<project_handle>`. Datadog sugiere un identificador basado en el nombre del proyecto. Puedes aceptarlo o modificarlo como desees.

### Integraciones de terceros
Para configurar integraciones de terceros, navega hasta [Crear notificaciones y tiques][3]


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/granular_access
[2]: https://app.datadoghq.com/cases/settings
[3]: /es/service_management/case_management/create_notifications_and_third_party_tickets