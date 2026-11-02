---
aliases:
- /es/monitors/create/types/error_tracking/
description: Aprenda sobre el tipo de seguimiento de Error Tracking.
further_reading:
- link: /error_tracking/issue_states/
  tag: Documentación
  text: Aprenda sobre los estados de Error Tracking y cómo afectan al seguimiento.
- link: /error_tracking/
  tag: Documentación
  text: Aprenda sobre Error Tracking para Web, Móvil y Backend.
- link: /monitors/notify/
  tag: Documentación
  text: Configure las notificaciones de seguimiento
- link: /monitors/downtimes/
  tag: Documentación
  text: Programe un tiempo de inactividad para silenciar un seguimiento
- link: /monitors/status/
  tag: Documentación
  text: Verifique el estado de su seguimiento.
title: Seguimiento de Error Tracking
---
## Descripción general {#overview}

Datadog [Error Tracking][1] agrupa automáticamente todos sus errores en problemas en sus aplicaciones web, móviles y de backend. Ver los errores agrupados en problemas le ayuda a priorizar y encontrar los problemas que tienen mayor impacto, lo que facilita minimizar los tiempos de inactividad del servicio y reducir la frustración del usuario.

Con Error Tracking habilitado para su organización, puede crear un seguimiento de Error Tracking para alertar cuando un problema en su aplicación web o móvil, servicio de backend o logs sea nuevo, cuando tenga un alto impacto y cuando comience a presentar una regresión.

## Cree un seguimiento de Error Tracking {#create-an-error-tracking-monitor}

Para crear un seguimiento de Error Tracking en Datadog, navegue a [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Error Tracking{{< /ui >}}][3].

<div class="alert alert-info">Existe un límite predeterminado de 1000 seguimientos de Error Tracking por cuenta. <a href="/help/">Comuníquese con Soporte</a> para aumentar este límite para su cuenta.</div>

### Seleccione la condición de alerta {#select-the-alerting-condition}

Existen dos tipos de condiciones de alerta con las que puede configurar su seguimiento de Error Tracking:

| Condición de alerta     | Descripción    |
| ---  | ----------- |
|Nuevo problema| Alerte cuando un problema ocurre por primera vez o cuando se produce una regresión. Por ejemplo, alete a su servicio siempre que más de 2 usuarios se vean afectados por un error nuevo. |
|Alto impacto| Alerte sobre problemas con un alto número de usuarios finales afectados. Por ejemplo, alete a su servicio siempre que más de 500 usuarios se vean afectados por este error. |

### Defina las condiciones de alerta {#define-alert-conditions}

{{< tabs >}}

{{% tab "Nuevo problema" %}}
#### Problemas sobre los que alertar {#issues-to-alert-on}

Los seguimientos de problemas nuevos alertan sobre problemas que se encuentran en el estado {{< ui >}}For Review{{< /ui >}} y cumplen con sus condiciones de alerta. Las regresiones pasan automáticamente al estado Para revisar, por lo que se monitorean de forma predeterminada con los seguimientos de problemas nuevos. Para obtener más información sobre los estados, consulte [Estados de los problemas][1].

Seleccione problemas {{< ui >}}All{{< /ui >}}, {{< ui >}}Browser{{< /ui >}}, {{< ui >}}Mobile{{< /ui >}} o {{< ui >}}Backend{{< /ui >}} y construya una consulta de búsqueda utilizando la misma lógica que la [búsqueda del explorador de Error Tracking][2] para las ocurrencias de error de los problemas.

<div class="alert alert-info">Los seguimientos de problemas nuevos solo consideran los problemas que se crearon o regresaron después de que se creó o editó por última vez el seguimiento. Estos seguimientos tienen un período de revisión de 24 horas.</div>

#### Defina el umbral de alerta {#define-alert-threshold}

Elija una de las siguientes opciones:

{{% collapse-content title="Alerte sobre todos los problemas nuevos" level="p" %}}


El seguimiento se activa cuando se detecta cualquier problema nuevo (el número de errores es mayor que 0 durante el último día).

{{% /collapse-content %}}

{{% collapse-content title="Defina su métrica de seguimiento" level="p" %}}

1. Elija la métrica sobre la cual desea hacer un seguimiento. Existen tres opciones de filtro sugeridas para acceder a las facetas utilizadas con mayor frecuencia:

    - {{< ui >}}Error Occurrences{{< /ui >}}: Se activa cuando el recuento de errores es `above`.
    - {{< ui >}}Impacted Users{{< /ui >}}: Se activa cuando el número de correos electrónicos de usuarios afectados es `above`.
    - {{< ui >}}Impacted Sessions{{< /ui >}}: Se activa cuando el número de ID de sesión afectados es `above`.

    Si selecciona problemas {{< ui >}}All{{< /ui >}} o {{< ui >}}Backend{{< /ui >}}, solo está disponible la opción {{< ui >}}Error Occurrences{{< /ui >}}.

    También puede especificar una medida personalizada que desee utilizar para hacer un seguimiento. Si selecciona una medida personalizada, el seguimiento alerta cuando el recuento de valores únicos de la faceta es `above`.

2. Reciba una notificación por cada problema que coincida con su consulta y agrupe los resultados por cualquier otro atributo que requiera (por ejemplo, reciba una notificación por cada problema que coincida con la consulta y en cada entorno).

3. Consulte datos durante el último día (de forma predeterminada) o cualquier otra ventana de tiempo en cada evaluación.

4. Elija un umbral para que el seguimiento se active (de forma predeterminada, 0 se activa en la primera ocurrencia).

{{% /collapse-content %}}


#### Administración programática {#programmatic-management}

Si utiliza Terraform o scripts personalizados mediante nuestras API públicas para administrar sus seguimientos, debe especificar algunas cláusulas en la consulta del seguimiento:
* Agregue la fuente a la que desea dirigirse entre el problema {{< ui >}}All{{< /ui >}}, {{< ui >}}Browser{{< /ui >}}, {{< ui >}}Mobile{{< /ui >}} y {{< ui >}}Backend{{< /ui >}}. Utilice la cláusula `.source()` con `"all"`, `"browser"`, `"mobile"` o `"backend"` justo después de su filtro. **Nota**: solo puede usar una a la vez.
* Asegúrese de usar la cláusula `.new()` para seguimientos de problemas nuevos.

Ejemplo:

```yaml
error-tracking("{filter}").source("backend").new().rollup("count").by("issue.id").last("1d") > 0
```

[1]: /es/error_tracking/issue_states
[2]: /es/error_tracking/explorer
[3]: /es/monitors/configuration/#alert-grouping/
{{% /tab %}}

{{% tab "Alto impacto" %}}
#### Problemas sobre los que alertar {#issues-to-alert-on-1}

Los seguimientos de alto impacto alertan sobre problemas que son {{< ui >}}For Review{{< /ui >}} o {{< ui >}}Reviewed{{< /ui >}} y que cumplen con sus condiciones de alerta. Lea más sobre [Estados de problemas][1].

Seleccione problemas {{< ui >}}All{{< /ui >}}, {{< ui >}}Browser{{< /ui >}}, {{< ui >}}Mobile{{< /ui >}} o {{< ui >}}Backend{{< /ui >}} y construya una consulta de búsqueda utilizando la misma lógica que la [búsqueda del explorador de Error Tracking][2] para las ocurrencias de error de los problemas.

#### Defina el umbral de alerta {#define-alert-threshold-1}
1. Elija la métrica sobre la cual desea hacer un seguimiento. Existen tres opciones de filtro sugeridas para acceder a las facetas utilizadas con mayor frecuencia:

    - {{< ui >}}Error Occurrences{{< /ui >}}: Se activa cuando el recuento de errores es `above`.
    - {{< ui >}}Impacted Users{{< /ui >}}: Se activa cuando el número de correos electrónicos de usuarios afectados es `above`.
    - {{< ui >}}Impacted Sessions{{< /ui >}}: Se activa cuando el número de ID de sesión afectados es `above`.

    Si selecciona problemas {{< ui >}}All{{< /ui >}} o {{< ui >}}Backend{{< /ui >}}, solo está disponible la opción {{< ui >}}Error Occurrences{{< /ui >}}.

    También puede especificar una medida personalizada que desee utilizar para hacer un seguimiento. Si selecciona una medida personalizada, el seguimiento alerta cuando el recuento de valores únicos de la faceta es `above`.

2. Tenga una notificación para cada problema que coincida con su consulta y agrupe los resultados por cualquier otro atributo que requiera (por ejemplo, tenga una notificación para cada problema que coincida con la consulta, en cada entorno).

3. Consulte datos durante el último día (de forma predeterminada) o cualquier otra ventana de tiempo en cada evaluación.

4. Elija un umbral para que el seguimiento se active (de forma predeterminada, 0 se activa en la primera ocurrencia).

#### Administración programática {#programmatic-management-1}

Si utiliza Terraform o scripts personalizados mediante nuestras API públicas para administrar sus seguimientos, debe especificar algunas cláusulas en la consulta del seguimiento:
* Agregue la fuente a la que desea dirigirse entre el problema {{< ui >}}All{{< /ui >}}, {{< ui >}}Browser{{< /ui >}}, {{< ui >}}Mobile{{< /ui >}} y {{< ui >}}Backend{{< /ui >}}. Utilice la cláusula `.source()` con `"all"`, `"browser"`, `"mobile"` o `"backend"` justo después de su filtro. **Nota**: solo puede usar una a la vez.
* Asegúrese de usar la cláusula `.impact()` para seguimientos de alto impacto.

Ejemplo:

```yaml
error-tracking("{filter}").source("browser").impact().rollup("count").by("issue.id").last("1d") > 0
```

[1]: /es/error_tracking/issue_states
[2]: /es/error_tracking/explorer
{{% /tab %}}
{{< /tabs >}}

### Notifications {#notifications}

Para mostrar las etiquetas de activación en el título de la notificación, haga clic en {{< ui >}}Include triggering tags in notification title{{< /ui >}}.

Además de las [variables de atributo coincidentes][7], están disponibles las siguientes variables específicas de Error Tracking
para notificaciones de mensajes de alerta:

* `{{issue.attributes.error.type}}`
* `{{issue.attributes.error.message}}`
* `{{issue.attributes.error.stack}}`
* `{{issue.attributes.error.file}}`
* `{{issue.attributes.error.is_crash}}`
* `{{issue.attributes.error.category}}`
* `{{issue.attributes.error.handling}}`

Para obtener más información sobre la sección {{< ui >}}Configure notifications and automations{{< /ui >}}, consulte [Notifications][5].

Seleccione alerta múltiple para recibir una notificación por problema. Esta es la experiencia prevista para los seguimientos de Error Tracking.

### Silenciar seguimientos {#muting-monitors}
Los seguimientos de Error Tracking utilizan [Estados de problemas][2] para garantizar que sus alertas se mantengan enfocadas en asuntos de alta prioridad, reduciendo las distracciones de problemas no críticos.

{{< ui >}}Ignored{{< /ui >}} los problemas son errores que no requieren investigación ni acción adicional. Al marcar los problemas como {{< ui >}}Ignored{{< /ui >}}, estos se silencian automáticamente de las Notifications del seguimiento.

## Solución de problemas {#troubleshooting}

### Los seguimientos de Nuevo problema no tienen en cuenta la antigüedad del problema {#new-issue-monitors-do-not-take-into-account-issue-age}
`issue.age` y `issue.regression.age` no se agregan de forma predeterminada porque pueden causar alertas perdidas. Por ejemplo, si un problema aparece por primera vez en `env:staging` y luego, una semana después, aparece en `env:prod` por primera vez, el problema se consideraría de una semana de antigüedad y no activaría una alerta en `env:prod` por primera vez.

Como resultado, Datadog no recomienda usar `issue.age` y `issue.regression.age`. Sin embargo, si el comportamiento del monitor basado en el estado no es adecuado para usted, estos filtros aún pueden usarse si se especifican manualmente.

**Nota**: Si planea usar `issue.age` y `issue.regression.age` en su monitor, esta clave de filtro no es consistente entre productos. Por ejemplo, podría ser `@issue.age` o `issue.age`.

### Los monitores de problemas nuevos están generando demasiado ruido {#new-issue-monitors-are-generating-too-much-noise}
Los monitores de problemas nuevos activan alertas sobre problemas marcados como {{< ui >}}For Review{{< /ui >}} que cumplen con sus criterios de alerta. Si los problemas no se clasifican adecuadamente (marcados como {{< ui >}}Reviewed{{< /ui >}}, {{< ui >}}Ignored{{< /ui >}} o {{< ui >}}Resolved{{< /ui >}}), un monitor de problemas nuevos puede activarse más de una vez para el mismo problema si este fluctúa entre los estados OK y ALERT.

Si sus monitores están generando demasiado ruido, considere los siguientes ajustes:
- **Clasifique sus alertas**: Establezca los problemas como {{< ui >}}Reviewed{{< /ui >}}, {{< ui >}}Ignored{{< /ui >}} o {{< ui >}}Resolved{{< /ui >}} cuando sea apropiado
- **Amplíe la ventana de tiempo de evaluación**: La ventana de evaluación predeterminada es de 1 día. Si los errores ocurren con poca frecuencia (por ejemplo, cada dos días), el monitor puede cambiar entre los estados OK y ALERT. Ampliar la ventana ayuda a evitar que se vuelvan a activar y mantiene al monitor en el estado ALERT.
- **Aumente el umbral de alerta**: El umbral predeterminado está establecido en `0`, lo que significa que las alertas se activan en la primera ocurrencia de un problema nuevo. Para reducir el ruido de errores únicos o esporádicos, aumente el umbral para alertar solo después de múltiples ocurrencias de un error.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/error_tracking/issue_states
[2]: /es/error_tracking/explorer
[3]: https://app.datadoghq.com/monitors/create/error-tracking
[4]: /es/monitors/configuration/#advanced-alert-conditions
[5]: /es/monitors/notify/
[6]: /es/logs/
[7]: /es/monitors/notify/variables/#matching-attributetag-variables