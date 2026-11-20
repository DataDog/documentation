---
disable_toc: false
title: Anomalía de contenido
---
{{< jqmath-vanilla >}}

## Descripción general {#overview}

La detección de anomalías de contenido analiza los registros entrantes para identificar y alertar sobre registros anómalos. Puede establecer [parámetros de detección de anomalías](#anomaly-detection-parameters) para activar señales si los valores de campo de un registro se desvían significativamente de los registros históricos dentro de un grupo. Una desviación significativa ocurre cuando la similitud entre los valores entrantes y los históricos es baja o no existe similitud alguna. Consulte [Cómo se determina que los registros son anómalos](#how-logs-are-determined-to-be-anomalous) para obtener más información.

Consulte [Crear regla][1] para obtener instrucciones sobre cómo configurar una regla de anomalía de contenido.

## Cómo funciona la detección de anomalías de contenido {#how-content-anomaly-detection-works}

### Parámetros de detección de anomalías {#anomaly-detection-parameters}

Cuando crea una regla con el método de detección de anomalías de contenido, puede establecer los siguientes parámetros.

#### Duración de aprendizaje {#learning-duration}
{{< img src="security/security_monitoring/detection_rules/content_anomaly/query_learning_duration.png" alt="Consulta de una regla de anomalía de contenido con el ajuste de duración de aprendizaje resaltado" style="width:100%;" >}}

- **Descripción**: Ventana de tiempo en la que se aprenden los valores. No se generan señales durante esta fase. El periodo de aprendizaje se reinicia si se modifica la regla.
- **Predeterminado**: `7` días
- **Rango**: `1`-`10` días
- **Cómo configurar**: Cuando edita una regla de anomalía de contenido, puede establecer la duración del aprendizaje en el menú desplegable {{< ui >}}Learning for{{< /ui >}} de la consulta.

#### Olvidar después de {#forget-after}
{{< img src="security/security_monitoring/detection_rules/content_anomaly/forget_duration.png" alt="Opciones de detección de anomalías de contenido con el menú desplegable de dentro de los últimos días resaltado" style="width:100%;" >}}

- **Descripción**: Cuánto tiempo se conservan los valores aprendidos antes de descartarlos.
- **Predeterminado**: `7` días
- **Rango**: `1`-`10` días
- **Cómo configurar**: En la sección {{< ui >}}Content anomaly detection options{{< /ui >}} de la página de configuración de una regla, puede establecer cuánto tiempo se conservan los valores aprendidos en el menú desplegable {{< ui >}}within in the last{{< /ui >}}.

#### Umbral de porcentaje de similitud {#similarity-percentage-threshold}

{{< img src="security/security_monitoring/detection_rules/content_anomaly/similarity_percentage_threshold.png" alt="Opciones de detección de anomalías de contenido con el menú desplegable de porcentaje de similitud resaltado" style="width:100%;" >}}

- **Descripción**: Similitud mínima requerida para considerar un registro como normal.
- **Predeterminado**: `70%`
- **Rango**: `35`-`100%`
- **Cómo configurar**: En la sección {{< ui >}}Content anomaly detection options{{< /ui >}} de la página de configuración de una regla, puede establecer el umbral de porcentaje de similitud en el menú desplegable {{< ui >}}within in the last{{< /ui >}}.

#### Umbral de elementos similares {#similar-items-threshold}

{{< img src="security/security_monitoring/detection_rules/content_anomaly/similar_items_threshold.png" alt="Opciones de detección de anomalías de contenido con el menú desplegable de elementos similares resaltado" style="width:100%;" >}}

- **Descripción**: Número de registros históricos coincidentes requeridos para que un valor entrante sea considerado normal.
- **Predeterminado**: `1`
- **Rango**: `1`-`20`
- **Cómo configurar**: En la sección {{< ui >}}Content anomaly detection options{{< /ui >}} de la página de configuración de una regla, puede ingresar el umbral de elementos similares en el campo {{< ui >}}with more than{{< /ui >}}.

#### Ventana de evaluación {#evaluation-window}
{{< img src="security/security_monitoring/detection_rules/content_anomaly/evaluation_window.png" alt="Opciones de detección de anomalías de contenido con el menú desplegable de elementos similares resaltado" style="width:100%;" >}}

- **Descripción**: Define el marco de tiempo para contar los registros anómalos. Las señales se activan si las anomalías superan la incidencia (por ejemplo, `a >= 2`).
- **Rango**: `0`-`24` horas
- **Cómo configurar**: En la sección {{< ui >}}Set conditions{{< /ui >}} de la página de configuración de una regla, puede establecer la ventana de evaluación de una condición en el menú desplegable {{< ui >}}within a window of{{< /ui >}}.

## Cómo se determina que los registros son anómalos {#how-logs-are-determined-to-be-anomalous}

1. Los registros se tokenizan utilizando [Unicode Text Segmentation (UTS #29)][2].
1. Los tokens se comparan utilizando [similitud de Jaccard][3].
1. Se logran comparaciones eficientes con [MinHash][4] y [Locality Sensitive Hashing (LSH)][5].
1. Un registro es anómalo si no cumple con el umbral de porcentaje de similitud ni con el umbral de elementos similares.

### Ejemplos de cálculo de similitud de Jaccard {#jaccard-similarity-computation-examples}

Cloud SIEM utiliza la [similitud de Jaccard][3] para comparar registros.

$$\\text\"J(A,B)\" = {∣\\text\"A\" ∩ \\text\"B\"∣} / {∣\\text\"A\" ∪ \\text\"B\"∣}$$

A continuación se presentan ejemplos de cómo se calcula la similitud de Jaccard para registros con campos de una sola palabra y registros con campos de varias palabras.

#### Campos de una sola palabra {#single-word-fields}

Estos son dos ejemplos de registros con campos de una sola palabra:

```
log1={actionType:auth, resourceType:k8s, networkType:public, userType:swe}
```

```
log2={actionType:auth, resourceType:k8s, networkType:public, userType:pm}
```

Para calcular la similitud de Jaccard entre los dos registros:

- La intersección de `log1` y `log2` da como resultado este conjunto de palabras: `{auth, k8s, public}`.
- La unión de `log1` y `log2` da como resultado este conjunto de palabras: `{auth, k8s, public, swe, pm}`.
- La similitud de Jaccard se calcula utilizando el número de palabras en los resultados:

$$\\text\"J(log1,log2)\" = 3 / 5 = 0.6$$

#### Campos de varias palabras {#multi-word-fields}

Estos son dos ejemplos de registros con campos de varias palabras:

```
log1={actionDescription: "User connected to abc network"}
```

```
log2={actionDescription: "User got unauthorized network access"}
```

Para calcular la similitud de Jaccard entre los dos registros:

- La intersección de `log1` y `log2` da como resultado este conjunto de palabras: `{User, network}`.
- La unión de `log1` y `log2` da como resultado este conjunto de palabras: `{User, connected, to, abc, network, got, unauthorized, access}`.
- La similitud de Jaccard se calcula utilizando el número de elementos en los resultados:

$$\\text\"J(log1,log2)\" = 2 / 8 = 0.25$$

## Comparación del método de anomalía de contenido con otros métodos de detección {#comparing-content-anomaly-method-with-other-detection-methods}

| Característica | Detección de anomalías | Detección de valores nuevos | Detección de anomalías de contenido |
|---------|-------------------|---------------------|---------------------------|
| Detecta valores de campo nuevos | No | Sí | Sí (configurable) |
| Detecta valores de campo poco frecuentes | No | No | Sí |
| Detecta valores diferentes | No | No | Sí |
| Detecta picos de registro | Sí | No | No |
| Consultas múltiples admitidas | No | No | Sí |
| Incidencias múltiples admitidas | No | No | Sí |
| Definición de umbral para activar señales | Aprendido de la distribución del conteo de registros por intervalo de tiempo (~percentil 99).| Siempre activa una señal en la primera aparición de un valor nuevo. | Especificado por el usuario (`1`-`100`) |
| Ventana de evaluación | Sí | No | Sí |
| Retención | 14 días | 30 días | 10 días |

[1]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule?cloud_siem_detection_rule_detection_method=content_anomaly
[2]: https://www.unicode.org/reports/tr29/tr29-22.html
[3]: https://en.wikipedia.org/wiki/Jaccard_index
[4]: https://en.wikipedia.org/wiki/MinHash
[5]: https://en.wikipedia.org/wiki/Locality-sensitive_hashing