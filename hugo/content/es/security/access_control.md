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
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
title: Access Control
---
{{< product-availability >}}

## Descripción general {#overview}

El sistema de gestión de acceso de Datadog utiliza control de acceso basado en roles, lo que le permite definir el nivel de acceso que tienen los usuarios a los recursos de Datadog. Los usuarios se asignan a roles que definen sus permisos de cuenta, incluidos qué datos pueden leer y qué activos de la cuenta pueden modificar. Cuando se otorgan permisos a un rol, cualquier usuario asociado con ese rol recibe dichos permisos. Consulte la documentación de [Account Management Access Control][1] para obtener más información.

Para los productos Datadog Security, está disponible el [control de acceso granular][3] para [reglas de detección](#restrict-access-to-detection-rules), [supresiones](#restrict-access-to-suppression-rules) y [reglas de severidad dinámica](#restrict-access-to-dynamic-severity-rules), lo que le permite restringir el acceso por equipos, roles o cuentas de servicio.

Para restringir el acceso a los datos de seguridad en sí, utilice [Data Access Control](#restrict-access-to-security-data).

## Permisos {#permissions}

Consulte la [lista de permisos][2] para los productos Security.

## Restringir el acceso a reglas de detección {#restrict-access-to-detection-rules}

{{< product-availability names="Cloud SIEM,Workload Protection,App and API Protection,Cloud Security" >}}

{{% security-products/detection-rules-granular-access %}}

## Restringir el acceso a reglas de supresión {#restrict-access-to-suppression-rules}

{{< product-availability names="Cloud SIEM,Workload Protection,App and API Protection" >}}

{{% security-products/suppressions-granular-access %}}

## Restringir el acceso a reglas de severidad dinámica {#restrict-access-to-dynamic-severity-rules}

{{< product-availability names="Cloud SIEM,Workload Protection,App and API Protection" >}}

{{% security-products/dynamic-severity-granular-access %}}

## Restringir el acceso a datos de seguridad {#restrict-access-to-security-data}

{{< product-availability names="Cloud SIEM,Workload Protection,App and API Protection,Cloud Security,Code Security" >}}

Utilice [Data Access Control][4] para restringir qué datos de seguridad puede ver un usuario, según las etiquetas y los atributos de los datos. Defina un [Restricted Dataset][8] con una consulta y, a continuación, otorgue acceso a equipos o roles específicos. Hay tres opciones de seguridad disponibles al crear un Restricted Dataset:

- **Security Signals**: señales de Cloud SIEM y Workload Protection
- **Workload Protection Agent Events**
- **Security Findings** (en Preview, disponible bajo solicitud): hallazgos de Cloud Security, Code Security, Workload Protection y App and API Protection

Los datos de seguridad que no están incluidos en ningún Restricted Dataset siguen siendo visibles para todos los usuarios con los permisos adecuados, a menos que los marque como [Restricted][5].

### Restringir hallazgos por propiedad del equipo {#restrict-findings-by-team-ownership}

{{< product-availability names="Workload Protection,App and API Protection,Cloud Security,Code Security" >}}

{{< callout btn_hidden="true" >}}
El control de acceso basado en la propiedad está en Preview y disponible bajo solicitud.
{{< /callout >}}

El control de acceso basado en la propiedad restringe el acceso a los hallazgos de seguridad según la pertenencia al equipo y requiere menos configuración que los Restricted Datasets. Cada usuario ve los hallazgos que pertenecen a los [equipos][6] a los que pertenece, sin necesidad de un conjunto de datos independiente para cada grupo de hallazgos.

El control de acceso basado en la propiedad está disponible para Security Findings, que abarca los hallazgos de Cloud Security, Code Security, Workload Protection y App and API Protection. Datadog determina la propiedad a partir de la etiqueta `team`. Los hallazgos sin esta etiqueta solo son visibles para los equipos y roles con [acceso sin restricciones][7].

[1]: /es/account_management/rbac/#role-based-access-control
[2]: /es/account_management/rbac/permissions/#cloud-security-platform
[3]: /es/account_management/rbac/granular_access/
[4]: /es/account_management/rbac/data_access/
[5]: /es/account_management/rbac/data_access/#strict-mode
[6]: /es/account_management/teams/
[7]: /es/account_management/rbac/data_access/#unrestricted-user-groups
[8]: /es/account_management/rbac/data_access/#configure-data-access