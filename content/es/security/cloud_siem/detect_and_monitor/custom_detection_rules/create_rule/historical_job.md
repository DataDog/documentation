---
code_lang: historical_job
title: Crear un trabajo histórico
type: multi-code-lang
weight: 3
---

## Información general

Los trabajos históricos son consultas ejecutables de una sola vez en logs históricos que se utilizan para realizar tests retrospectivos de las reglas de detección y evaluar su eficacia en datos pasados. Los resultados generados en el trabajo son versiones ligeras de señales que proporcionan información sobre posibles amenazas y anomalías en los logs históricos. Después de revisar los resultados, puedes convertir los resultados que necesitan acción inmediata en señales.

## Crear una regla

1. Para crear una regla de detección de umbral o trabajo, navega hasta la página [Create a New Detection][1] (Crear una nueva detección).
1. Selecciona **Historical Job** (Trabajo historico).

## Definir tu trabajo histórico

1. Selecciona el índice de logs y el intervalo de tiempo para el trabajo.
1. Selecciona el método de detección que deseas utilizar para crear señales.

## Definir consultas de búsqueda

{{< tabs >}}
{{% tab "Umbral" %}}

{{< img src="security/security_monitoring/detection_rules/threshold_20250310.png" alt="Definir la consulta de búsqueda" style="width:100%;" >}}

1. Para buscar eventos de Audit Trail o eventos de Events Management, haz clic en la flecha hacia abajo junto a **Logs** y selecciona **Audit Trail** o **Events** (Eventos).
1. Crea una consulta de búsqueda para tus logs o eventos utilizando la [sintaxis de búsqueda del Log Explorer][1].
{{% cloud_siem/threshold_query %}}
{{% cloud_siem/add_calculated_fields %}}
{{% cloud_siem/add_reference_tables %}}
{{% cloud_siem/unit_testing %}}

[1]: /es/logs/search_syntax/
[2]: https://app.datadoghq.com/logs

{{% /tab %}}
{{% tab "New Value" %}}

{{< img src="security/security_monitoring/detection_rules/new_value_20250310.png" alt="Definir la consulta de búsqueda" style="width:100%;" >}}

1. Para buscar eventos de Audit Trail o eventos de Events Management, haz clic en la flecha hacia abajo junto a **Logs** y selecciona **Audit Trail** o **Events** (Eventos).
1. Crea una consulta de búsqueda para tus logs o eventos utilizando la [sintaxis de búsqueda del Log Explorer][1].
{{% cloud_siem/new_value_query %}}
{{% cloud_siem/add_calculated_fields %}}
{{% cloud_siem/add_reference_tables %}}
{{% cloud_siem/unit_testing %}}

[1]: /es/logs/search_syntax/
[2]: https://app.datadoghq.com/logs

{{% /tab %}}
{{% tab "Anomaly" %}}

{{< img src="security/security_monitoring/detection_rules/anomaly_query.png" alt="Definir la consulta de búsqueda" style="width:100%;" >}}

1. Para buscar eventos de Audit Trail o eventos de Events Management, haz clic en la flecha hacia abajo junto a **Logs** y selecciona **Audit Trail** o **Events** (Eventos).
1. Crea una consulta de búsqueda para tus logs o eventos utilizando la [sintaxis de búsqueda del Log Explorer][1].
{{% cloud_siem/anomaly_query %}}
{{% cloud_siem/add_calculated_fields %}}
{{% cloud_siem/add_reference_tables %}}
{{% cloud_siem/unit_testing %}}

[1]: /es/logs/search_syntax/
[2]: https://app.datadoghq.com/logs

{{% /tab %}}
{{% tab "Content Anomaly" %}}

{{< img src="security/security_monitoring/detection_rules/content_anomaly_query.png" alt="Definir la consulta de búsqueda" style="width:100%;" >}}

1. Para buscar eventos de Audit Trail o eventos de Events Management, haz clic en la flecha hacia abajo junto a **Logs** y selecciona **Audit Trail** o **Events** (Eventos).
1. Crea una consulta de búsqueda para tus logs o eventos utilizando la [sintaxis de búsqueda del Log Explorer][1].
{{% cloud_siem/content_anomaly_query %}}
{{% cloud_siem/add_calculated_fields %}}
{{% cloud_siem/add_reference_tables %}}
{{% cloud_siem/unit_testing %}}

[1]: /es/logs/search_syntax/
[2]: https://app.datadoghq.com/logs

{{% /tab %}}
{{% tab "Impossible Travel" %}}

{{< img src="security/security_monitoring/detection_rules/impossible_travel_query.png" alt="Definir la consulta de búsqueda" style="width:100%;" >}}

1. Para buscar eventos de Audit Trail o eventos de Events Management, haz clic en la flecha hacia abajo junto a **Logs** y selecciona **Audit Trail** o **Events** (Eventos).
1. Crea una consulta de búsqueda para tus logs o eventos utilizando la [sintaxis de búsqueda del Log Explorer][1].
{{% cloud_siem/impossible_travel_query %}}
{{% cloud_siem/add_calculated_fields %}}
{{% cloud_siem/add_reference_tables %}}
{{% cloud_siem/unit_testing %}}

**Nota**: Todos los logs y eventos que coincidan con esta consulta se analizan para un posible recorrido imposible.

[1]: /es/logs/search_syntax/
[2]: https://app.datadoghq.com/logs

{{% /tab %}}
{{% tab "Third Party" %}}

{{< img src="security/security_monitoring/detection_rules/third_party_query.png" alt="Definir la consulta de búsqueda" style="width:100%;" >}}

1. Para buscar eventos de Audit Trail o eventos de Events Management, haz clic en la flecha hacia abajo junto a **Logs** y selecciona **Audit Trail** o **Events** (Eventos).
1. Crea una consulta raíz para tus logs o eventos utilizando la [sintaxis de búsqueda del Log Explorer][1].
1. En el menú desplegable **Trigger for each new** (Activar para cada nuevo), selecciona los atributos en los que cada atributo genera una señal para cada nuevo valor de atributo durante el periodo fijo de 24 horas.
{{% cloud_siem/add_calculated_fields %}}
    - Consulta [Lenguaje de expresiones de campos calculados][3] para obtener información sobre la sintaxis y las construcciones del lenguaje.
{{% cloud_siem/add_calculated_fields %}}
{{% cloud_siem/add_reference_tables %}}
{{% cloud_siem/unit_testing %}}

Haz clic en **Add Root Query** (Añadir consulta raíz) para añadir consultas adicionales.

[1]: /es/logs/search_syntax/
[2]: https://app.datadoghq.com/logs

{{% /tab %}}
{{< /tabs >}}

## Establecer condiciones

{{< tabs >}}
{{% tab "Umbral" %}}

{{< img src="security/security_monitoring/detection_rules/threshold_historical_condition.png" alt="Configura tus condiciones, gravedad y destinatarios de notificaciones" style="width:100%;" >}}

{{% cloud_siem/set_conditions_threshold %}}

### Otros parámetros

#### 1. Multiactivación de trabajo {#job-multi-triggering-threshold}

{{% cloud_siem/job_multi_triggering %}}

#### 2. Habilitar agrupación opcional {#enable-group-by-historical-threshold}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "New Value" %}}

### Otros parámetros

#### 1. Olvidar valor {#forget-value-historical-new-value}

{{% cloud_siem/forget_value %}}

#### 2. Comportamiento de multiactivación de trabajos {#job-multi-triggering-historical-new-value}

{{% cloud_siem/job_multi_triggering %}}

#### 3. Habilitar agrupación opcional {#enable-group-by-historical-new-value}

{{% cloud_siem/enable_group_by %}}

#### 4. Activar referencia instantánea

{{% cloud_siem/enable_instantaneous_baseline %}}

{{% /tab %}}
{{% tab "Anomaly" %}}

### Otros parámetros

#### 1. Multiactivación de trabajo {#job-multi-triggering-historical-anomaly}

{{% cloud_siem/job_multi_triggering %}}

#### 2. Habilitar agrupación opcional {#enable-group-by-historical-anomaly}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Content Anomaly" %}}

{{< img src="security/security_monitoring/detection_rules/content_anomaly_historical_condition.png" alt="Configura tus condiciones, gravedad y destinatarios de notificaciones" style="width:100%;" >}}

1. (Opcional) Haz clic en el icono del lápiz situado junto a **Condition 1** (Condición 1) si deseas cambiar el nombre de la condición. Este nombre se añade al nombre de la regla cuando se genera una señal.
1. En el campo **Anomaly count** (Recuento de anomalías), introduce la condición de cuántos logs anómalos dentro de la ventana especificada son necesarios para activar una señal.
    - Por ejemplo, si la condición es `a >= 3` donde `a` es la consulta, se activa una señal si hay al menos tres logs anómalos dentro de la ventana de evaluación.
    - Todas las condiciones de las reglas se evalúan como sentencias de condición. Por lo tanto, el orden de las condiciones afecta a las notificaciones que se envían, ya que la primera condición que coincide genera la señal. Haz clic y arrastra las condiciones de tus reglas para cambiar su orden.
    - Una condición de regla contiene operaciones lógicas (`>`, `>=`, `&&`, `||`) para determinar si debe generarse una señal en función de los recuentos de eventos en las consultas definidas previamente.
    - En esta sección, se hace referencia a las etiquetas de consulta ASCII en minúsculas. Un ejemplo de condición de regla para la consulta `a` es `a > 3`.
    - **Nota**: La etiqueta (label) de la consulta debe situarse por delante del operador. Por ejemplo, `a > 3` es válido y `3 < a` no es válido.
1. En el menú desplegable **within a window of** (dentro de una ventana de), selecciona el periodo de tiempo durante el cual se activa una señal si se cumple la condición.
    - Se especifica una `evaluation window` para que coincida cuando al menos uno de los casos coincida con true (verdadero). Se trata de una ventana variable y evalúa los casos en tiempo real.

### Otros parámetros

#### 1. Detección de anomalías de contenido {#content-anomaly-historical-content-anomaly}
{{% cloud_siem/content_anomaly_options %}}

#### 2. Comportamiento de multiactivación de trabajos {#job-multi-triggering-historical-content-anomaly}

{{% cloud_siem/rule_multi_triggering_content_anomaly %}}

#### 3. Habilitar agrupación opcional {#enable-group-by-historical-content-anomaly}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Impossible Travel" %}}

### Otros parámetros

#### 1. Multiactivación de trabajo {#job-multi-triggering-historical-anomaly}

{{% cloud_siem/job_multi_triggering %}}

#### 2. Habilitar agrupación opcional {#enable-group-by-historical-anomaly}

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{% tab "Third Party" %}}

{{< img src="security/security_monitoring/detection_rules/set_condition_root_query.png" alt="Configura tus condiciones, gravedad y destinatarios de notificaciones" style="width:100%;" >}}

1. (Opcional) Haz clic en el icono del lápiz situado junto a **Condition 1** (Condición 1) si deseas cambiar el nombre de la condición. Este nombre se añade al nombre de la regla cuando se genera una señal.
1. En el campo **Query** (Consulta), introduce las etiquetas de un log que quieras que active una señal.
    - Por ejemplo, si deseas que logs con la etiqueta `dev:demo` activen señales con una gravedad de `INFO`, introduce `dev:demo` en el campo de consulta. Del mismo modo, si deseas que logs con la etiqueta `dev:prod` activen señales con una gravedad de `MEDIUM`, introduce `dev:prod` en el campo de consulta.

### Otros parámetros

{{% cloud_siem/enable_group_by %}}

{{% /tab %}}
{{< /tabs >}}

## Notificar cuando el trabajo esté completo

(Opcional) Haz clic en **Add Recipient** (Añadir destinatario) para enviar notificaciones al finalizar el análisis de trabajo. Consulta [Canales de notificación][2] para obtener más información.

## Describe tu manual

{{% security-rule-say-whats-happening %}}

[1]: https://app.datadoghq.com/security/siem/rules/new
[2]: /es/security_platform/notifications/#notification-channels