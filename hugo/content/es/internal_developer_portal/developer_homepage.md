---
aliases:
- /es/software_catalog/developer_homepage
further_reading:
- link: /integrations/github/
  tag: Documentación
  text: Más información sobre la integración GitHub
title: Página de inicio para desarrolladores
---

{{< callout url="https://www.datadoghq.com/product-preview/developer-overview-page/" d_target="#signupModal" btn_hidden="false" header="Únete a la vista previa de la página para desarrolladores" >}}
{{< /callout >}}

## Información general

La [página de inicio para desarrolladores][3] ofrece una vista centralizada de las entidades de tu equipo y de tus tareas diarias.

Con esta vista, puedes:
- Ver información clave sobre las entidades de tu equipo, incluidos cuadros de mando integrales, despliegues recientes, monitores, problemas, incidentes, dashboards y estado de las guardias.
- Realizar un seguimiento de las tareas asignadas en GitHub y Jira.
- Identificar monitores de alerta o despliegues fallidos.

## Servicios y entidades

{{< img src="tracing/software_catalog/services_entities_table.png" alt="Servicios y entidades para usuarios" style="width:100%;" >}}  

La sección **Services & Entities** (Servicios y entidades) muestra los servicios y entidades claves de tu equipo, agregados automáticamente a partir de productos e integraciones vinculados a Datadog. Puedes filtrar por entidades vistas recientemente, entidades propiedad de tu equipo o entidades que hayas marcado como favoritas.

Cada entidad incluye la siguiente información:

| Campo | Descripción |
|--------|-------------|
| **Tipo** | Tipo de entidad (por ejemplo, servicio, monitor o incidente). |
| **Nombre** | Nombre para mostrar o identificador de la entidad. |
| **Cuadros de mando integrales** | Resumen de la salud de la entidad basado en la fiabilidad, el rendimiento y los errores de presupuesto. |
| **Último despliegue** | Despliegue más reciente detectado por APM o las integraciones CI. |
| **Monitores** | Número y estado de los monitores asociados a la entidad. |
| **Problemas** | Problemas activos relacionados con la entidad, agregados a partir de herramientas de seguimiento asociadas. |
| **Incidentes** | Incidentes abiertos asociados a las entidades del equipo. |
| **Dashboards** | Dashboards clave asociados a la entidad. |
| **De guardia** | La persona de guardia actual del equipo o entidad. |


## Solicitudes pull de GitHub

{{< img src="tracing/software_catalog/github_prs_table.png" alt="Solicitudes pull asignadas al usuario" style="width:100%;" >}}  

La sección **GitHub PRs** (Solicitudes pull de GitHub) consolida tus elementos de acciones personales de GitHub, mostrando solicitudes pull en los siguientes estados:
- **Necesita tu revisión**
- **Devuelto a ti**
- **Aprobado**
- **A la espera de revisores**
- **Recientemente fusionado**

Cada solicitud pull incluye:
- **Número de repositorio y de solicitud pull**
- **Título**  
- **Estado** (abierto / borrador / fusionado)
- **Asignatario / Revisor**

Si tu organización no ha configurado la integración GitHub, esta sección muestra un estado vacío con una solicitud para activarla desde el [cuadro de integración de GitHub][1]. Para leer solicitudes pull de GitHub, esta integración requiere los siguientes permisos: 
- Miembros: Lectura
- Metadatos: Lectura
- Solicitudes pull: Lectura
- Contenido: Lectura
- Estados: Lectura
- Checks: Lectura

Si tienes varias organizaciones de GitHub conectadas dentro de Datadog, los usuarios deben tener los permisos de lectura de integraciones de Datadog para alternar entre organizaciones.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}  

[1]: /es/integrations/github/  
[2]: /es/integrations/jira/
[3]: https://app.datadoghq.com/idp/overview/developer