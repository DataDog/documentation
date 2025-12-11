---
disable_toc: false
further_reading:
- link: security/detection_rules/
  tag: Documentación
  text: Obtener más información sobre las normas de detección
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Amenazas CSM
  url: /security/threats/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
title: Supresiones
---

{{< product-availability >}}

## Información general

Las supresiones son condiciones específicas para cuando no debe generarse una señal, lo que puede mejorar la precisión y pertinencia de las señales que se generan.

## Vías de supresión

Puedes configurar una consulta de supresión dentro de una [regla de detección](#detection-rules) individual o definir una [regla de supresión](#suppression-rules) separada para suprimir señales en una o más reglas de detección.

### Reglas de detección

Cuando [creas][1] o [modificas][2] una regla de detección, puedes definir una consulta de supresión para evitar que se genere una señal. Por ejemplo, añade una consulta de regla para determinar cuándo una regla de detección activa una señal de seguridad. También puedes personalizar la consulta de supresión para suprimir señales para un valor de atributo específico.

{{< img src="security/security_monitoring/suppressions/detection_suppression_rule.png" alt="Editor de reglas de detección que muestra la sección para añadir consultas de supresión" style="width:65%;" >}}

### Reglas de supresión

Utiliza las reglas de supresión para establecer condiciones generales de supresión en múltiples reglas de detección, en lugar de configurar condiciones de supresión para cada regla de detección individual. Por ejemplo, puedes configurar una regla de supresión para suprimir cualquier señal que contenga una IP específica.

## Configuración de las supresiones

### Lista de supresiones

La [lista de supresiones][3] proporciona una forma centralizada y organizada de gestionar las supresiones en múltiples reglas de detección.

{{< img src="security/security_monitoring/suppressions/suppression_list.png" alt="Página Supresiones que muestra una lista de reglas de supresión" style="width:90%;" >}}

## Creación de una regla de supresión

1. Ve a la página [Supresiones][3].
1. Haz clic en **+ New Suppression** (+ Nueva supresión).
1. Introduce un nombre para la consulta de supresión.
1. Añade una descripción para contextualizar por qué se aplica esta supresión.
1. También puedes añadir una fecha de caducidad en la que se desactivará esta supresión.
1. Selecciona las reglas de detección a las que quieres aplicar esta supresión. Puedes seleccionar varias reglas de detección.
1. En la sección **Añadir consulta de supresión**, tienes la opción de introducir consultas de supresión para que no se genere una señal cuando se cumplen los valores. Por ejemplo, si el usuario `john.doe` está activando una señal, pero sus acciones son benignas y ya no quieres señales activadas por este usuario, introduce la consulta de logs: `@user.username:john.doe`.
{{< img src="security/security_monitoring/suppressions/suppression_query.png" alt="Añadir consulta de supresión con la consulta @user.username:john.doe" style="width:65%;" >}}
  Las consultas de reglas de supresión se basan en **atributos de señales**.
1. Además, puedes añadir una consulta de exclusión de logs para excluir logs del análisis. Estas consultas se basan en **atributos de logs**. **Nota**: La supresión heredada se basaba en consultas de exclusión de logs, pero ahora se incluye en el paso **Añadir consulta de supresión** de la regla de supresión.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/siem/rules/new
[2]: /es/security/detection_rules/
[3]: https://app.datadoghq.com/security/configuration/suppressions
[4]: https://app.datadoghq.com/security/siem/rules
[5]: /es/logs/explorer/facets/#log-side-panel
