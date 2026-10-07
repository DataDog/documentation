---
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: Documentación
  text: Canalizaciones de procesamiento de registros
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Workload Protection
  url: /security/workload_protection/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
title: Access Control
---
{{< product-availability >}}

## Descripción general {#overview}

El sistema de gestión de acceso de Datadog utiliza control de acceso basado en roles, lo que le permite definir el nivel de acceso que tienen los usuarios a los recursos de Datadog. Los usuarios se asignan a roles que definen los permisos de su cuenta, incluyendo qué datos pueden leer y qué activos de la cuenta pueden modificar. Cuando se otorgan permisos a un rol, cualquier usuario asociado con ese rol recibe dichos permisos. Consulte la documentación de [gestión de cuentas Access Control][1] para obtener más información.

Para los productos de Datadog Security, el [control de acceso granular][3] está disponible para [reglas de detección](#restrict-access-to-detection-rules), [supresiones](#restrict-access-to-suppression-rules) y [reglas de gravedad dinámica](#restrict-access-to-dynamic-severity-rules), lo que le permite restringir el acceso por equipos, roles o cuentas de servicio.

## Permisos {#permissions}

Consulte la [lista de permisos][2] para los productos de Security.

## Restringir el acceso a las reglas de detección {#restrict-access-to-detection-rules}

{{% security-products/detection-rules-granular-access %}}

## Restringir el acceso a las reglas de supresión {#restrict-access-to-suppression-rules}

{{% security-products/suppressions-granular-access %}}

## Restringir el acceso a las reglas de gravedad dinámica {#restrict-access-to-dynamic-severity-rules}

{{% security-products/dynamic-severity-granular-access %}}

[1]: /es/account_management/rbac/#role-based-access-control
[2]: /es/account_management/rbac/permissions/#cloud-security-platform
[3]: /es/account_management/rbac/granular_access/