---
aliases:
- /es/security/cloud_siem/detect_and_monitor/critical_assets/
further_reading:
- link: /security/cloud_siem/detect_and_monitor/suppressions/
  tag: Documentación
  text: Supresiones
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
title: Gravedad dinámica
---
{{< product-availability >}}

## Descripción general {#overview}

La gravedad dinámica le permite ajustar la gravedad de las señales de seguridad según los activos a los que afectan. Esto ayuda a los analistas a priorizar las señales de acuerdo con la importancia comercial del activo afectado al aumentar, disminuir o mantener la gravedad predeterminada. Para cada activo, puede ajustar los niveles de gravedad, aplicar etiquetas personalizadas y aislar los cambios en reglas específicas.

### Cómo funciona {#how-it-works}

- Si se configuran varias reglas de gravedad dinámica para ajustar los niveles de gravedad de una señal de seguridad, la señal adopta automáticamente el nivel de gravedad más alto. Por ejemplo, si una regla de gravedad dinámica establece la gravedad en `MEDIUM` y otra la establece en `HIGH`, la gravedad es `HIGH`.
- Si se configuran varias reglas de gravedad dinámica para realizar la misma acción en los niveles de gravedad de una señal de seguridad, la acción solo se aplica una vez. Por ejemplo, si dos reglas de gravedad dinámica separadas están configuradas para aumentar el nivel de gravedad de una señal que está establecida en `MEDIUM`, solo aumenta una vez a `HIGH`, no nuevamente a `CRITICAL`.

## Cree una regla de gravedad dinámica {#create-a-dynamic-severity-rule}

1. En Datadog, vaya a {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Dynamic Severity{{< /ui >}}][1], luego haga clic en {{< ui >}}Create Dynamic Severity Rule{{< /ui >}}. Se abre la ventana Crear regla de gravedad dinámica.
1. En {{< ui >}}Define Asset{{< /ui >}}, ingrese una consulta para definir el activo.
1. En {{< ui >}}Choose Severity Adjustment{{< /ui >}}, elija cómo desea ajustar la gravedad de las señales de seguridad asociadas con el activo.
   - Elija {{< ui >}}Increase{{< /ui >}} o {{< ui >}}Decrease{{< /ui >}} para comenzar con el nivel de gravedad predeterminado, luego aumente o disminuya la gravedad en un nivel.
   - Elija {{< ui >}}Maintain{{< /ui >}} para mantener el nivel de gravedad predeterminado.
   - Elija un nivel de gravedad específico para aplicar siempre ese nivel de gravedad, independientemente de la gravedad inicial asociada con la señal.
1. (Opcional) En {{< ui >}}Details{{< /ui >}}, agregue una descripción, etiquetas y equipos para aplicar a la regla de gravedad dinámica.
1. En {{< ui >}}Select Detection Rules{{< /ui >}}, ingrese reglas de detección específicas para limitar los cambios de gravedad. Para aplicar los cambios a todas las reglas de detección, establezca la consulta en `*`.
1. Haga clic en {{< ui >}}Save{{< /ui >}}. La ventana Crear regla de gravedad dinámica se cierra y su regla de gravedad dinámica aparece en la tabla, donde puede habilitarla o deshabilitarla, o exportar la configuración como archivos Terraform o JSON.

## Visualizar las señales que afectó una regla de gravedad dinámica {#view-the-signals-a-dynamic-severity-rule-affected}

1. En Datadog, vaya a {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Dynamic Severity{{< /ui >}}][1].
1. Junto a una regla de gravedad dinámica, haga clic en el icono {{< ui >}}More Options{{< /ui >}} {{< img src="icons/kebab.png" inline="true" style="height:1em" >}}, luego haga clic en {{< ui >}}Signals affected{{< /ui >}}. El Explorador de señales, prellenado con una consulta para mostrar las señales afectadas, se abre en una nueva pestaña.

## Visualizar datos de gravedad dinámica en señales de seguridad {#view-dynamic-severity-data-in-security-signals}

En cada señal de seguridad que una regla de gravedad dinámica ha modificado, una píldora {{< ui >}}Adjusted Severity{{< /ui >}} indica tanto el nivel de gravedad original como el ajustado. Puede pasar el cursor sobre esa píldora para ver qué ajuste aplicó la regla de gravedad dinámica:
{{< img src="security/security_monitoring/critical_assets_pill.png" alt="Píldora y ventana emergente de Gravedad ajustada, que indica que la gravedad de una señal de CloudTrail aumentó de Baja a Media" style="width:50%;" >}}

En la pestaña {{< ui >}}JSON{{< /ui >}} de una señal de seguridad, también puede encontrar el objeto `critical_assets_data`, que incluye información sobre las reglas de gravedad dinámica asociadas con ella y cómo afectaron la gravedad de la señal.
<div class="alert alert-info">Si el nivel de gravedad de una regla de gravedad dinámica fue anulado por un nivel de gravedad superior, es posible que no aparezca en el <code>critical_assets_data</code> objeto.</div>

## Restringir permisos de edición {#restrict-edit-permissions}

{{% security-products/dynamic-severity-granular-access %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/dynamic-severity