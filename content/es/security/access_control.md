---
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: Documentación
  text: Pipelines de procesamiento de logs
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Workload Protection
  url: /security/workload_protection/
- icon: app-sec
  name: Protección de aplicaciones y API
  url: /security/application_security/
title: Control de acceso
---

{{< product-availability >}}

## Información general

El sistema de gestión de acceso de Datadog utiliza un control de acceso basado en roles que te permite definir el nivel de acceso de los usuarios a los recursos de Datadog. Se asignan roles a los usuarios, que definen los permisos de sus cuentas, incluidos los datos que pueden leer y los activos de cuenta que pueden modificar. Cuando se conceden permisos a un rol, cualquier usuario asociado a ese rol recibe esos permisos. Consulta la documentación [Control de acceso de gestión de cuentas][1] para obtener más información.

Para los productos de Datadog Security, el [control de acceso granular][3] está disponible para [reglas de detección](#restrict-access-to-detection-rules) y [supresiones](#restrict-access-to-suppression-rules), que te permite restringir el acceso por equipos, roles o cuentas de servicio.

## Permisos

Consulta la [lista de permisos][2] para los productos de Security.

## Restringir el acceso a las reglas de detección

{{% security-products/detection-rules-granular-access %}}

## Restringir el acceso a las reglas de supresión

{{% security-products/suppressions-granular-access %}}

[1]: /es/account_management/rbac/#role-based-access-control
[2]: /es/account_management/rbac/permissions/#cloud-security-platform
[3]: /es/account_management/rbac/granular_access/