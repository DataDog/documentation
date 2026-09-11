---
disable_toc: false
further_reading:
- link: /account_management/audit_trail/
  tag: Documentación
  text: Obtener más información sobre Audit Trail
- link: /account_management/audit_trail/events/
  tag: Documentación
  text: Obtener más información sobre eventos de Audit Trail
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Cloud Security Management
  url: /security/cloud_security_management/
- icon: app-sec
  name: Application Security Management
  url: /security/application_security/
title: Auditoría de eventos de seguridad de Datadog
---

{{< product-availability >}}

Como administrador o miembro de un equipo de seguridad, puedes utilizar [Audit Trail][1] para ver qué acciones está realizando tu equipo en Datadog Security. Como individuo, puedes ver un flujo (stream) de tus propias acciones. En el caso de los administradores de seguridad o los equipos de InfoSec, los eventos de Audit Trail ayudan con los checks de cumplimiento y el mantenimiento de pistas de auditoría de quién ha hecho qué, y cuándo en tus recursos Datadog.

Para ver logs de auditoría generados por acciones realizadas en Datadog Security, ve a la página de [**Audit Trail**][2] en Datadog. Los siguientes eventos específicos de productos están disponibles para Datadog Security:

## Cloud Security Platform

{{% audit-trail-security-platform %}}

## Application Security Management

{{% audit-trail-asm %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/audit_trail
[2]: https://app.datadoghq.com/audit-trail