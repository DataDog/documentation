---
title: Opciones de la API Monitor
---

## Opciones comunes

- **`silenced`** Diccionario de contextos a marcas temporales o `null`. Cada contexto se silencia hasta la marca temporal POSIX dada o para siempre si el valor es `null`. Por defecto: **null**. Ejemplos:

  - Para silenciar completamente la alerta: `{'*': null}`
  - Para silenciar `role:db` durante un breve tiempo: `{'role:db': 1412798116}`

- **`new_group_delay`** Tiempo (en segundos) antes de iniciar la alerta en nuevos grupos, para permitir que las aplicaciones o contenedores recién creados se inicien completamente. Debe ser un entero no negativo. Por defecto: **60**. Ejemplo: Si estás utilizando una arquitectura de contenedores, establecer un retraso de evaluación evita que tus contenedores agrupados por monitores se disparen cuando se crea un nuevo contenedor, lo que puede causar cierta latencia o un pico en el uso de la CPU en los primeros minutos.

- **`new_host_delay`** Tiempo (en segundos) para permitir que un host arranque y que las aplicaciones se inicien completamente antes de comenzar la evaluación de los resultados del monitor. Debe ser un entero no negativo. **Obsoleto: utiliza `new_group_delay` en su lugar.**

- **`notify_no_data`** Un booleano que indica si este monitor notifica cuando los datos dejan de informar. Predeterminado: **False**.
- **`no_data_timeframe`** El número de minutos antes de que un monitor notifique después de que los datos dejen de informar. Datadog recomienda al menos el doble del intervalo del monitor para alertas de métrica o 2 minutos para checks de servicio. **Si se omite, se utiliza el doble del intervalo de evaluación para las alertas de métrica y 24 horas para los checks de servicio.**
- **`timeout_h`** El número de horas que el monitor no informar datos antes de que se resuelve automáticamente de un estado activado. El valor mínimo permitido es 0 horas. El valor máximo permitido es 24 horas. Valor por defecto: **null**.

-  **`require_full_window`** Un booleano que indica si este monitor necesita un intervalo completo de datos antes de ser evaluado. Datadog recomienda establecerlo en `False` para métricas dispersas, de lo contrario se omitirán algunas evaluaciones. Predeterminado: **False**.
- **`renotify_interval`** El número de minutos después de la última notificación antes de que un monitor vuelva a notificar sobre el estado actual. Solo vuelve a notificar si no está resuelto. Por defecto: **null**.
- **`renotify_statuses`** Los estados desde los que un monitor vuelve a notificar. Por defecto: *null* si `renotify_interval` es **null**. Si `renotify_interval` está establecido, por defecto se vuelve a notificar en `Alert` y `No Data`.
- **`renotify_occurrences`** El número de veces que un monitor vuelve a notificar. Solo puede establecerse si `renotify_interval` está establecido. Por defecto: **null**, vuelve a notificar sin límite.
- **`escalation_message`** Un mensaje para incluir con una re-notificación. Admite la notificación '@username' que se permite en otros sitios. No aplica si `renotify_interval` es `null`. Por defecto: **null**.
- **`notify_audit`** Un booleano que indica si se notifica a los usuarios etiquetados sobre los cambios en este monitor. Predeterminado: **Falso**
- **`include_tags`** Un booleano que indica si las notificaciones de este monitor insertan automáticamente sus etiquetas (tags) desencadenantes en el título. Por defecto: **True**. Ejemplos:

  - `True`: `[Triggered on {host:h1}] Monitor Title`
  - `False`: `[Triggered] Monitor Title`

### Opciones de permisos

- **`locked`** Un booleano que indica si los cambios en este monitor deberían restringirse al creador o a usuarios con el permiso de gestión de organización (`org_management`). Por defecto: **False**. **Obsoleto: utiliza `restricted_roles` en su lugar.**
- **`restricted_roles`** Una matriz que enumera los UUID de los roles que pueden editar el monitor. La edición del monitor incluye actualizaciones de la configuración del monitor, la eliminación del monitor y el silenciamiento del monitor durante cualquier periodo. Los UUID de los roles pueden obtenerse de la [API de roles][1]. `restricted_roles` es el sucesor de `locked`.

**Nota:** No establezcas los parámetros `locked` y `restricted_roles` en el mismo monitor. Si se establecen ambos, se aplica el parámetro más restrictivo. Cualquier rol establecido en `restricted_roles` se considera más restrictivo que `locked:true`.

Los siguientes ejemplos demuestran cómo interactúan los parámetros `locked` y `restricted_roles`:
- Si un monitor está configurado en `locked:false` y `"restricted_roles": [ "er6ec1b6-903c-15ec-8686-da7fd0960002" ]`, se aplica el parámetro `restricted_roles`.
- Si un monitor está configurado en `locked:true` y `"restricted_roles": [ "er6ec1b6-903c-15ec-8686-da7fd0960002" ]`, se aplica el parámetro `restricted_roles`.
- Si un monitor se establece en `locked:true` y no se establece ningún parámetro `"restricted_roles"`, se aplica el parámetro `locked:true`.

Para obtener más información sobre la configuración de RBAC para monitores y la migración de monitores de la configuración bloqueada al uso de restricciones de rol, consulta la [guía dedicada][2].

## Opciones de anomalía

_Estas opciones solo se aplican a monitores de anomalía y se ignoran para otros tipos de monitores._

- **`threshold_windows`** Un diccionario que contiene `recovery_window` y `trigger_window`.

  - `recovery_window` describe cuánto tiempo debe ser normal una métrica anómala antes de que se recupere la alerta
  - `trigger_window` describe cuánto tiempo debe ser anómala una métrica para que se active una alerta

Ejemplo: `{'threshold_windows': {'recovery_window': 'last_15m', 'trigger_window': 'last_15m'}}`

## Opciones de alerta de métrica

_Estas opciones solo se aplican a las alertas de métrica._

- **`thresholds`** Un diccionario de umbrales por tipo de umbral. Existen dos tipos de umbral para las alertas de métrica: *crítico* y *advertencia*. *Crítico* se define en la consulta, pero también puede especificarse en esta opción. El umbral *advertencia* solo puede especificarse mediante la opción de umbrales. Si deseas utilizar [umbrales de recuperación][3] para tu monitor, utiliza los atributos `critical_recovery` y `warning_recovery`.

Por ejemplo: `{'critical': 90, 'warning': 80,  'critical_recovery': 70, 'warning_recovery': 50}`

- **`evaluation_delay`** Tiempo (en segundos) para retrasar la evaluación, como un entero no negativo. Por ejemplo, si el valor se establece en 300 (5 min), el marco temporal se establece en last_5m y la hora es 7:00, el monitor evalúa los datos de 6:50 a 6:55. Esto es útil para AWS CloudWatch y otras métricas completadas para asegurar que el monitor siempre tiene datos durante la evaluación.

## Opciones de check de servicio

_Estas opciones solo se aplican a checks de servicio y se ignoran para otros tipos de monitores._

- **`thresholds`** Un diccionario de umbrales por estado. Dado que los checks de servicio pueden tener varios umbrales, no se definen directamente en la consulta.

Por ejemplo: `{'ok': 1, 'critical': 1, 'warning': 1}`

## Opciones de alerta de logs

_Estas opciones solo se aplican a las alertas de logs._

- **`thresholds`** Un diccionario de umbrales por estado.

Por ejemplo: `{'ok': 1, 'critical': 1, 'warning': 1}`

- **`aggregation`** Un diccionario de `type`, `metric` y `groupBy`.
  - `type`: se admiten tres tipos: `count`, `cardinality` y `avg`.
  - `metric`: para `cardinality`, utiliza el nombre de la faceta. Para `avg`, utiliza el nombre de la métrica. Para `count`, pon `count` como métrica.
  - `groupBy`: nombre de la faceta por la que deseas agrupar.

Ejemplo: `{"metric": "count","type": "count","groupBy": "core_service"}`

- **`enable_logs_sample`** Un booleano para añadir muestras o valores al mensaje de notificación. Por defecto: `False`

[1]: /es/api/latest/roles/
[2]: /es/monitors/guide/how-to-set-up-rbac-for-monitors/
[3]: /es/monitors/guide/recovery-thresholds/