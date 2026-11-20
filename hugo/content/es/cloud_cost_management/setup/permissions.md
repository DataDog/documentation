---
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Obtenga información sobre Cloud Cost Management
- link: /account_management/rbac/
  tag: Documentación
  text: Obtenga información sobre Access Control basado en roles
- link: /account_management/rbac/data_access/
  tag: Documentación
  text: Obtenga información sobre Access Control de datos
title: Permisos
---
## Descripción general {#overview}

Los permisos controlan qué acciones puede realizar un usuario en Datadog. Los usuarios se asignan a roles, y cada rol tiene un conjunto de permisos que determina lo que ese usuario puede ver y hacer.

Cloud Cost Management (CCM) utiliza dos permisos principales, `cloud_cost_management_read` y `cloud_cost_management_write`, para controlar el acceso a los datos de costos y a la mayoría de las configuraciones de CCM. Hay permisos adicionales a nivel de producto disponibles para funciones específicas, como editar presupuestos (`ccm_budget_write`), personalizar pronósticos en los presupuestos (`ccm_forecast_write`) y administrar programas de informes (`generate_ccm_report_schedules`, `manage_ccm_report_schedules`). Asigne estos permisos a los roles a través de [Role Based Access Control (RBAC)][1].

CCM también admite [Data Access Control](#data-access-control) para restringir aún más los datos de costos por etiquetas.

## Permisos disponibles {#available-permissions}

| Permiso | Descripción |
|------------|-------------|
| `cloud_cost_management_read` | Otorga acceso de solo lectura para visualizar datos de costos, presupuestos, recomendaciones y configuraciones en las páginas de CCM e Integrations externas. |
| `cloud_cost_management_write` | Otorga acceso para modificar las configuraciones de CCM, incluida la carga de costos personalizados y la administración de cuentas en la nube. No otorga acceso para crear, editar o eliminar presupuestos; consulte `ccm_budget_write`. |
| `ccm_budget_write` | Otorga acceso para crear, actualizar y eliminar presupuestos de Cloud Cost Management, incluidos los metadatos del presupuesto y los montos presupuestados por entrada. Requiere el permiso de lectura para acceder a las páginas. |
| `ccm_forecast_write` | Otorga acceso para editar valores de pronóstico personalizados en los presupuestos de Cloud Cost Management. Requiere el permiso de lectura para acceder a las páginas. |
| `generate_ccm_report_schedules` | Otorga acceso para visualizar todos los programas de informes y administrar solo los que el usuario ha creado. |
| `manage_ccm_report_schedules` | Otorga acceso para visualizar, crear y administrar completamente todos los programas de informes en toda la organización. |
| `ccm_report_write` | Otorga acceso para crear, actualizar y eliminar informes de Cloud Cost Management. Requiere cloud_cost_management_read para acceder a las páginas. |


## Requisitos de permisos por página {#permission-requirements-by-page}

La siguiente tabla muestra los permisos requeridos para cada página de CCM y sus funciones relacionadas.

| Página/Funcionalidad | Permiso de lectura | Permiso de escritura |
|-----------------------------------------------|--------------------------------------------------|---------------------------------------------------|
| Página de resumen de CCM | Requerido para visualizar datos de resumen de costos | N/A |
| Página de Containers de CCM | Requerido para visualizar datos de asignación de costos de Containers | N/A |
| Página de recomendaciones de CCM | Requerido para visualizar recomendaciones de costos | N/A |
| Página de CCM Explorer | Requerido para consultar y visualizar datos de costos | N/A |
| Página de planes de CCM | Requerido para visualizar presupuestos | `ccm_budget_write`Requerido para crear, editar o eliminar presupuestos |
| Página de configuración de CCM - Costos personalizados | Requerido para visualizar la configuración de costos personalizados | Requerido para cargar costos personalizados |
| Página de configuración de CCM - Tag Pipelines | Requerido para visualizar Tag Pipelines | Requerido para crear Tag Pipelines |
| Página de configuración de CCM - SaaS Integrations | Requerido para visualizar SaaS integration settings | Requerido para habilitar SaaS Integrations para CCM |
| Página de configuración de CCM - Cuentas | Requerido para visualizar cuentas en la nube | Requerido para modificar o crear cuentas |
| Página de configuración de CCM - Configurar recomendaciones | Requerido para ver la configuración de recomendaciones | Requerido para personalizar recomendaciones |
| Dashboards/Notebooks (external) | Requerido para crear widgets y ver datos de costos | N/A |
| Monitors (external) | Requerido para crear monitores de CCM | N/A |
| Service Catalog (external) | Requerido para visualizar datos de costos | N/A |
| Resource Catalog (external) | Requerido para visualizar datos de costos | N/A |
| Consultas de API para datos de costos | Requerido para consultar datos de costos a través de la API | N/A |

## Data Access Control {#data-access-control}

Utilice [Data Access Control][2] para restringir el acceso a los datos de costos mediante etiquetas específicas. Con esta función, puede limitar a los equipos para que solo vean los costos relevantes para sus recursos. Por ejemplo, restringir a un equipo para que solo vea los costos etiquetados con `team:payments` o `env:production`.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/
[2]: /es/account_management/rbac/data_access/