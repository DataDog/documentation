---
aliases:
- /es/service_management/case_management/settings/
- /es/incident_response/case_management/settings/
further_reading:
- link: /incident_response/work_management/troubleshooting
  tag: Documentación
  text: Solución de problemas de Integrations de terceros
- link: /incident_response/work_management/customization
  tag: Documentación
  text: Personalización de la gestión de trabajo
title: Configuración
---
## Descripción general {#overview}

En la configuración del proyecto, puede administrar Access Control, configurar transiciones de estado automáticas, configurar Integrations de terceros como Jira y ServiceNow, y más.

## Granular Access Control {#granular-access-control}

De forma predeterminada, el acceso a los proyectos y elementos de trabajo no está restringido. [Granular Access Control][1] se puede utilizar para administrar los permisos de usuarios, equipos, roles o toda su organización a nivel de proyecto. Existen cuatro conjuntos de permisos que se pueden utilizar:
- **Administrador**: los usuarios pueden crear y editar elementos de trabajo, vistas, configuraciones y permisos del proyecto, y pueden eliminar el proyecto.
- **Colaborador**: los usuarios pueden crear, comentar y editar elementos de trabajo. No pueden cambiar la configuración, los permisos ni el proyecto.
- **Visor**: los usuarios pueden visualizar y hacer un seguimiento de todos los elementos de trabajo, las visualizaciones y la configuración del proyecto. No pueden crear, editar ni comentar elementos de trabajo.
- **Sin acceso**: los usuarios no pueden visualizar ningún elemento de trabajo, ninguna visualización ni ninguna configuración del proyecto.

**Nota:** Otros productos de Datadog que se integran con Work Management, como Monitors, pueden crear automáticamente elementos de trabajo dentro de un proyecto independientemente de la configuración de acceso del proyecto.

## Transiciones de estado {#status-transitions}

Para reducir el ruido, configure los elementos de trabajo para que se cierren automáticamente después de 7, 14, 30, 90 o 180 días de inactividad desde la página de transiciones de estado de la configuración del proyecto. La inactividad se define como la ausencia de acciones iniciadas por humanos, como actualizar un atributo o escribir un comentario. Una vez al día, Datadog busca elementos de trabajo que hayan estado inactivos durante al menos el período seleccionado y los cierra.

## Configurar integraciones {#set-up-integrations}

Work Management ofrece una variedad de Integrations nativas y de terceros, para que pueda incorporar las soluciones de Datadog en sus flujos de trabajo y procesos existentes. Con las integraciones de Jira, ServiceNow y Linear, puede resolver elementos de trabajo utilizando telemetría de pila completa en Datadog, mientras mantiene un registro de la investigación en esos sistemas de terceros.

### Monitores {#monitors}

<div class="alert alert-info">Uso de identificadores de Monitor <code>@case-&lt;project_handle&gt;</code> terminología que refleja el nombre anterior de Work Management, Case Management.</div>

Vaya a la [Project Settings page][2], haga clic en **Integrations** > **Datadog Monitors** y haga clic en el interruptor para obtener su @incidencia-<project_handle>.

Los identificadores de proyecto se pueden usar en Datadog Monitors para crear elementos de trabajo automáticamente. En el cuerpo del mensaje de Datadog Monitors, incluya `@case-<project_handle>`. Datadog sugiere un identificador basado en el nombre del proyecto. Puede aceptarlo o modificarlo como desee.

### Integrations de terceros {#third-party-integrations}
Para configurar Integrations de terceros, vaya a [Create notifications and tickets ][3].

## Tipos de trabajo y atributos personalizados {#custom-work-types-and-attributes}

Agregue tipos de trabajo y atributos personalizados a los proyectos para que pueda adaptar sus elementos de trabajo a las necesidades de su organización. Para obtener más información, consulte [Work Management Customization][4].


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/granular_access
[2]: https://app.datadoghq.com/work/settings
[3]: /es/incident_response/work_management/notifications_integrations
[4]: /es/incident_response/work_management/customization