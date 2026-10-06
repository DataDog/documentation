---
description: Controle el acceso a recursos individuales de Datadog, como dashboards,
  monitores y notebooks, por equipos, roles o usuarios para una gestión de permisos
  detallada.
title: Granular Access Control
---
## Gestionar el acceso a recursos individuales {#manage-access-to-individual-resources}

Algunos recursos le permiten restringir el acceso a recursos individuales por roles, [Teams][1] o usuarios.

Utilice los diferentes principales para controlar los patrones de acceso en su organización y fomentar el intercambio de conocimientos y la colaboración:
- Utilice Teams para asignar el acceso a grupos funcionales en sus organizaciones. Por ejemplo, restrinja la edición de un dashboard al equipo de aplicaciones que lo posee.
- Utilice roles para asignar el acceso a personas. Por ejemplo, restrinja la edición de métodos de pago a los administradores de facturación.
- Asigne acceso a usuarios individuales solo cuando sea necesario.


| Recursos compatibles con Access Control granular | Acceso basado en equipos | Acceso basado en roles | Acceso basado en usuarios / cuentas de servicio |
|--------------------------------------------------|-------------------|-------------------|-------------------------------------|
| [Apps][13]                                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Cuentas de AWS][11]                               | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Registros de aplicaciones de Azure][11]                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Proyectos de Work Management][10]                   | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Conexiones][14]                                | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Grupos de conexión][15]                          | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Conexiones entre organizaciones][20]                      | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Dashboards][2]                                  | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Datastores][16]                                 | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Severidad dinámica][26]                           | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Experimentos][27]                                | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Feature Flags][25]                              | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Cuentas de servicio de Google][11]                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Cuentas de integración][11]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Servicios de integración][11]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Webhooks de integración][11]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Pipelines de logs][24]                             | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Monitors][3]                                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Notebooks][4]                                   | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Observability Pipelines][23]                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [On-Call][22]                                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Private Action Runner][18]                      | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Powerpacks][5]                                  | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Tablas de referencia][12]                           | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [RUM apps][19]                                   | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Security rules][6]                              | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Security suppressions][7]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Service Level Objectives][8]                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Sheets][21]                                     | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Pruebas Synthetic][9]                             | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Flujos de trabajo][17]                                  | {{< X >}}         | {{< X >}}         | {{< X >}}                           |


### Elevar el acceso a recursos individuales {#elevate-access-to-individual-resources}

Un usuario con el permiso `user_access_manage` puede elevar su acceso a cualquier recurso individual que admita restricciones basadas en equipo, rol y el usuario o la cuenta de servicio. No se admiten recursos con restricciones de acceso basadas únicamente en roles. Para obtener acceso, haga clic en el botón {{< ui >}}Elevate Access{{< /ui >}} en el modal de Access Control granular.

[1]: /es/account_management/teams/
[2]: /es/dashboards/configure/#permissions
[3]: /es/monitors/configuration/#permissions
[4]: /es/notebooks/#limit-edit-access
[5]: /es/dashboards/widgets/powerpack/#powerpack-permissions
[6]: /es/security/detection_rules/#restrict-edit-permissions
[7]: /es/security/suppressions/#restrict-edit-permissions
[8]: /es/service_level_objectives/#permissions
[9]: /es/synthetics/browser_tests/#permissions
[10]: /es/incident_response/work_management/settings#granular-access-control
[11]: /es/getting_started/integrations/#granular-access-control
[12]: /es/reference_tables/#permissions
[13]: /es/actions/app_builder/access_and_auth/#restrict-access-to-a-specific-app
[14]: /es/actions/connections/?tab=workflowautomation#connection-credentials
[15]: /es/actions/connections/?tab=workflowautomation#connection-groups
[16]: /es/actions/datastore/
[17]: /es/actions/workflows/access_and_auth/#restrict-access-on-a-specific-workflow
[18]: /es/actions/private_actions
[19]: /es/real_user_monitoring
[20]: /es/account_management/org_settings/cross_org_visibility/#permissions
[21]: /es/sheets/#permissions
[22]: /es/incident_response/on-call/#granular-access-control
[23]: /es/observability_pipelines/configuration/access_control/
[24]: /es/logs/log_configuration/pipelines/#pipeline-permissions
[25]: /es/getting_started/feature_flags/
[26]: /es/security/cloud_siem/detect_and_monitor/dynamic_severity/#restrict-edit-permissions
[27]: /es/experiments/