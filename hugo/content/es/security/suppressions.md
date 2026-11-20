---
disable_toc: false
further_reading:
- link: security/detection_rules/
  tag: Documentación
  text: Más información sobre las reglas de detección
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
title: Supresiones
---
{{< product-availability >}}

## Descripción general {#overview}

Las supresiones son condiciones específicas para cuando no se debe generar una señal, lo cual puede mejorar la precisión y la relevancia de las señales que se generan.

{{< callout btn_hidden="true" header="Evaluación de supresión" respect-site-support="false" >}}
Existen dos tipos de consultas de supresión: supresión en **atributos de señal** y supresión en **atributos de registro o evento**. Las supresiones basadas en señales solo se evalúan en el momento en que se crea una señal. No se vuelven a evaluar cuando se actualiza una señal. Las supresiones de atributos de registro y evento evitan que los eventos coincidentes generen nuevas señales y actualicen las señales existentes. Datadog recomienda utilizar supresiones de atributos de registro y evento para excluir de forma fiable actividades específicas.
{{< /callout >}}

## Rutas de supresión {#suppression-routes}

Puede configurar una consulta de supresión dentro de una [regla de detección](#detection-rules) individual, o definir una [regla de supresión](#suppression-rules) independiente para suprimir señales en una o más reglas de detección.

### Reglas de detección {#detection-rules}

Cuando [crea][1] o [modifica][2] una regla de detección, puede definir una consulta de supresión para evitar que se genere una señal. Por ejemplo, añada una consulta de regla para determinar cuándo una regla de detección activa una señal de seguridad. También puede personalizar la consulta de supresión para suprimir señales de un valor de atributo específico.

{{< img src="security/security_monitoring/suppressions/detection_suppression_rule.png" alt="El editor de reglas de detección que muestra la sección para añadir una consulta de supresión" style="width:65%;" >}}

### Reglas de supresión {#suppression-rules}

Utilice las reglas de supresión para establecer condiciones generales de supresión en varias reglas de detección en lugar de configurar condiciones de supresión para cada regla de detección individual. Por ejemplo, puede configurar una regla de supresión para suprimir cualquier señal que contenga una IP específica.

## Configuración de supresiones {#suppressions-configuration}

### Lista de supresión {#suppression-list}

La [lista de supresión][3] proporciona una forma centralizada y organizada para que usted gestione las supresiones en múltiples reglas de detección.

{{< img src="security/security_monitoring/suppressions/suppression_list.png" alt="La página de supresiones que muestra una lista de reglas de supresión" style="width:90%;" >}}

## Crear una regla de supresión {#create-a-suppression-rule}

1. Navegue a la página [Supresiones][3].
1. Haga clic en {{< ui >}}\+ New Suppression{{< /ui >}}.
1. Ingrese un nombre para la consulta de supresión.
1. Agregue una descripción para proporcionar contexto sobre por qué se está aplicando esta supresión.
1. Opcionalmente, agregue una fecha de vencimiento en la que se desactivará esta supresión.
1. Seleccione las reglas de detección a las que desea aplicar esta supresión. Puede seleccionar varias reglas de detección.
1. En la sección {{< ui >}}Add Suppression Query{{< /ui >}}, tiene la opción de ingresar consultas de supresión para que no se genere una señal cuando se cumplan los valores. Por ejemplo, si un usuario `john.doe` está activando una señal, pero sus acciones son benignas y ya no desea que se generen señales a partir de este usuario, ingrese la consulta de registro: `@user.username:john.doe`.
{{< img src="security/security_monitoring/suppressions/suppression_query.png" alt="La consulta para agregar supresión con la consulta @user.username:john.doe" style="width:65%;" >}}
  Las consultas de reglas de supresión se basan en **atributos de señal**.
1. Además, puede agregar una consulta de exclusión de registro para excluir registros de ser analizados. Estas consultas se basan en **atributos de registro**. **Nota**: La supresión heredada se basaba en consultas de exclusión de registros, pero ahora está incluida en el paso {{< ui >}}Add a suppression query{{< /ui >}} de la regla de supresión.

### Restringir permisos de edición {#restrict-edit-permissions}

{{% security-products/suppressions-granular-access %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/siem/rules/new
[2]: /es/security/detection_rules/
[3]: https://app.datadoghq.com/security/configuration/suppressions
[4]: https://app.datadoghq.com/security/siem/rules
[5]: /es/logs/explorer/facets/#log-side-panel