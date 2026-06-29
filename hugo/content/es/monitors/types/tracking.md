---
aliases:
- /es/monitors/create/types/error_tracking/
description: Más información sobre el tipo de monitor de rastreo de errores.
further_reading:
- link: /error_tracking/issue_states/
  tag: Documentación
  text: Más información sobre los estados de Error Tracking y su repercusión en los
    monitores
- link: /error_tracking/
  tag: Documentación
  text: Más información sobre Error Tracking para web, móvil y backend
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Programar una caída del sistema para silenciar un monitor
- link: /monitors/status/
  tag: Documentación
  text: Comprobar el estado del monitor
title: Monitor de rastreo de errores
---

## Información general

[Error Tracking][1] de Datadog agrupa automáticamente todos tus errores en incidentes en tus aplicaciones web, móviles y backend. Ver los errores agrupados en incidentes te ayuda a priorizar y encontrar los incidentes que tienen más impacto, lo que facilita minimizar las caídas del servicio y reducir la frustración de los usuarios.

Con Error Tracking habilitado para tu organización, puedes crear un monitor de Error Tracking para alertarte cuando un incidente en tu aplicación web o móvil, servicio de backend, o log es nuevo, cuando tiene un alto impacto y cuando comienza a retroceder.

## Crear un monitor de seguimiento de errores

Para crear un monitor de rastreo de errores en Datadog, navega hasta [**Monitors** > **New Monitor** > **Error Tracking**][3] (Monitores > Nuevo monitor > Rastreo de errores).

<div class="alert alert-info"><strong>Nota</strong>: Hay un límite por defecto de 1000 monitores de rastreo de errores por cuenta. <a href="/help/">Contacta con Soporte</a> para aumentar este límite para tu cuenta.</div>

### Selecciona la condición de alertar

Hay dos tipos de condiciones de alertar con las que puedes configurar tu monitor de seguimiento de errores:

| Condición de alertar     | Descripción    |
| ---  | ----------- |
|Nuevo incidente| Alerta cuando se produzca un incidente por primera vez o cuando se produzca un retroceso. Por ejemplo, envía una alerta al servicio cada vez que un nuevo error afecte a más de dos usuarios. |
|Alto impacto| Alerta sobre incidentes con un elevado número de usuarios finales afectados. Por ejemplo, alerta a tu servicio siempre que más de 500 usuarios se vean afectados por este error. |

### Definir las condiciones de alerta

{{< tabs >}}

{{% tab "New Issue" %}}
#### Incidentes sobre los que alertar

Los monitores de nuevos incidentes alertan de los incidentes que se encuentran en estado **Para revisión** y cumplen tus condiciones de alerta. Los retrocesos pasan automáticamente al estado Para revisión, por lo que se monitorizan por defecto con los monitores de nuevos incidentes. Para obtener más información sobre los estados, consulta los [estados de los incidentes][1].

Selecciona los siguientes incidentes: **Todos**, de **Navegador**, de **Móvil** o de **Backend**. Luego, crea una consulta de búsqueda utilizando la misma lógica que la [búsqueda del Explorador de seguimiento de errores][2] para los casos de error de incidentes.

<div class="alert alert-info">Los monitores de nuevos incidentes sólo tienen en cuenta los incidentes que se crearon o retrocedieron después de la última creación o edición de un monitor. Estos monitores tienen un periodo de revisión de 24 horas.</div>

#### Definir el umbral de alerta

Elige una de las siguientes opciones:

{{% collapse-content title="Alertas de todos los incidentes nuevos" level="p" %}}


El monitor se activa cuando se detecta un nuevo incidente (el número de errores es superior a 0 en el último día).

{{% /collapse-content %}}

{{% collapse-content title="Definir tu métrica de alerta" level="p" %}}

1. Elige la métrica que quieres monitorizar. Hay tres opciones de filtro sugeridas para acceder a las facetas más utilizadas:

    - **Casos de error**: Se activa cuando el recuento de errores es `above`.
    - **Impacted Users** (Usuarios afectados): se activa cuando el número de correos electrónicos de usuarios impactados es `above`.
    - **Impacted Sessions** (Sesiones afectadas): se activa cuando el número de IDs de sesión afectados es `above`.

    Si seleccionas los incidentes **Todos** o de **Backend**, sólo estará disponible la opción **Casos de error**.

    También puedes especificar una medida personalizada que quieras utilizar para monitorizar. Si seleccionas una medida personalizada, el monitor alerta cuando el recuento de valores únicos de la faceta es `above`.

2. Cuenta con una notificación para cada incidente que coincida con tu consulta y agrupa los resultados por cualquier otro atributo que solicites (por ejemplo, cuenta con una notificación para cada incidente que coincida con la consulta, en cada entorno).

3. Consulta los datos del último día (por defecto) o de cualquier otro periodo de tiempo en cada evaluación.

4. Elige un umbral para que el monitor se active (por defecto, 0 se activa con el primer caso).

{{% /collapse-content %}}


#### Gestión mediante programación

Si utilizas scripts de Terraform o personalizados que utilicen nuestras API públicas para gestionar tus monitores, debes especificar algunas cláusulas en la consulta del monitor:
* Añade la fuente a la que quieres apuntar para los siguientes incidentes: **Todos**, de **Navegador**, de **Móvil** y de **Backend** issue. Utiliza la cláusula `.source()` con `"all"`, `"browser"`, `"mobile"` o `"backend"` justo después de tu filtro. **Nota**: Sólo puedes utilizar uno a la vez.
* Asegúrate de utilizar la cláusula `.new()` para los nuevos monitores de incidentes.

Ejemplo:
```yaml
error-tracking("{filter}").source("backend").new().rollup("count").by("@issue.id").last("1d") > 0
```

[1]: /es/error_tracking/issue_states
[2]: /es/error_tracking/explorer
[3]: /es/monitors/configuration/#alert-grouping/
{{% /tab %}}

{{% tab "High Impact" %}}
#### Incidentes sobre los que alertar

Los monitores de alto impacto alertan de los incidentes que están **Para revisión** o **Revisados** y que cumplen tus condiciones de alerta. Más información sobre los [estados de los incidentes][1].

Selecciona los siguientes incidentes: **Todos**, de **Navegador**, de **Móvil** o de **Backend**. Luego, crea una consulta de búsqueda utilizando la misma lógica que la [búsqueda del Explorador de seguimiento de errores][2] para los casos de error de incidentes.

#### Definir el umbral de alerta
1. Elige la métrica que desees monitorizar. Hay tres opciones de filtro sugeridas para acceder a las facetas más utilizadas:

    - **Casos de error**: se activa cuando el recuento de errores es `above`.
    - **Impacted Users** (Usuarios afectados): se activa cuando el número de correos electrónicos de usuarios impactados es `above`.
    - **Impacted Sessions** (Sesiones afectadas): se activa cuando el número de IDs de sesión afectados es `above`.

    Si seleccionas los incidentes **Todos** o de **Backend**, sólo estará disponible la opción **Casos de error**.

    También puedes especificar una medida personalizada que desees utilizar para monitorizar. Si seleccionas una medida personalizada, el monitor alerta cuando el recuento de valores únicos de la faceta es `above`.

2. Ten una notificación para cada número que coincida con tu consulta, y agrupa los resultados por cualquier otro atributo que necesites (por ejemplo, ten una notificación para cada número que coincida con la consulta, en cada entorno).

3. Consulta los datos del último día (por defecto) o de cualquier otro periodo de tiempo en cada evaluación.

4. Elige un umbral para que el monitor se active (por defecto, 0 se activa con el primer caso).

#### Gestión mediante programación

Si utilizas Terraform o scripts personalizados que utilicen nuestras API públicas para gestionar tus monitores, deberás especificar algunas cláusulas en la consulta de monitor:
* Añade la fuente a la que quieres apuntar para los siguientes incidentes: **Todos**, de **Navegador**, de **Móvil** y de **Backend** issue. Utiliza la cláusula `.source()` con `"all"`, `"browser"`, `"mobile"` o `"backend"` justo después de tu filtro. **Nota**: Sólo puedes utilizar uno a la vez.
* Asegúrate de utilizar la cláusula `.impact()` para los monitores de alto impacto.

Ejemplo:
```yaml
error-tracking("{filter}").source("browser").impact().rollup("count").by("@issue.id").last("1d") > 0
```

[1]: /es/error_tracking/issue_states
[2]: /es/error_tracking/explorer
{{% /tab %}}
{{< /tabs >}}

### Notificaciones

Para mostrar las etiquetas activadas en el título de la notificación, haz clic en **Include triggering tags in notification title** (Incluir etiquetas activadas en el título de notificación).

Además de las [variables de atributos coincidentes][7], están disponibles las siguientes variables específicas de Error Tracking
para las notificaciones del mensaje de alerta:

* `{{issue.attributes.error.type}}`
* `{{issue.attributes.error.message}}`
* `{{issue.attributes.error.stack}}`
* `{{issue.attributes.error.file}}`
* `{{issue.attributes.error.is_crash}}`
* `{{issue.attributes.error.category}}`
* `{{issue.attributes.error.handling}}`

Para más información sobre la sección **Configurar notificaciones y automatizaciones**, consulta [Notificaciones][5].

Selecciona las alertas múltiples para recibir una notificación por cada incidente. Esta es la experiencia prevista para los monitores de seguimiento de errores.

### Silenciar monitores
Los monitores de seguimiento de errores utilizan los [estados de los incidentes][2] para garantizar que tus alertas se centren en asuntos de alta prioridad, reduciendo las distracciones de problemas que no son críticos.

Los incidentes **Ignorados** son errores que no requieren ninguna investigación o acción adicional. Al marcar los incidentes como **Ignorados**, se silencian automáticamente en las notificaciones de monitor.

## Solucionar problemas

### Los monitores de nuevos incidentes no tienen en cuenta la antigüedad de los incidentes
`issue.age` y `issue.regression.age` no se añaden por defecto, ya que pueden causar alertas perdidas. Por ejemplo, si un incidente aparece por primera vez en `env:staging` y una semana después aparece por primera vez en `env:prod`, se consideraría que tiene una semana de antigüedad y no activaría una alerta en `env:prod` por primera vez.

Como resultado, Datadog no recomienda el uso de `issue.age` y `issue.regression.age`. Sin embargo, si el comportamiento del monitor basado en el estado no es adecuado, estos filtros se pueden seguir utilizando si se especifican manualmente.

**Nota**: Si tienes pensado utilizar `issue.age` y `issue.regression.age` en tu monitor, esta clave de filtro no es constante en todos los productos. Por ejemplo, podría ser `@issue.age` o `issue.age`.

### Los monitores de nuevos incidentes generan demasiado ruido
Los monitores de nuevos incidentes activan alertas sobre los incidentes marcados como **Para revisión** que cumplen tus criterios de alerta. Si los incidentes no se clasifican correctamente (marcados como **Revisados**, **Ignorados** o **Resueltos**), es posible que un monitor de nuevos incidentes se active más de una vez por el mismo incidente, si este fluctúa entre los estados OK y ALERTA.

Si tus monitores generan demasiado ruido, considera los siguientes ajustes:
- **Evalúa tus alertas**: Define los incidentes como **Revisados**, **Ignorados** o **Resueltos** cuando corresponda.
- **Amplía la ventana de tiempo de evaluación**: La ventana de evaluación por defecto es de 1 día. Si los errores se producen con poca frecuencia (por ejemplo, cada dos días), el monitor puede cambiar entre los estados OK y ALERTA. Ampliar la ventana ayuda a evitar que se vuelvan a producir errores y mantiene el monitor en estado ALERTA.
- **Aumenta el umbral de alerta**: El umbral por defecto está fijado en `0`, lo que significa que las alertas se disparan en el primer caso de un nuevo incidente. Para reducir el ruido de los errores puntuales o esporádicos, aumenta el umbral para alertar sólo después de que se produzcan varios errores.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/error_tracking/issue_states
[2]: /es/error_tracking/explorer
[3]: https://app.datadoghq.com/monitors/create/error-tracking
[4]: /es/monitors/configuration/#advanced-alert-conditions
[5]: /es/monitors/notify/
[6]: /es/logs/
[7]: /es/monitors/notify/variables/#matching-attributetag-variables