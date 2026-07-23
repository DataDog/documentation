---
disable_toc: false
title: Anomalía de contenido
---
{{< jqmath-vanilla >}}

## Información general

La detección de anomalías de contenido analiza los logs entrantes para identificar y alertar sobre contenido de logs anómalos. Puedes configurar [parámetros de detección de anomalías](#anomaly-detection-parameters) para activar señales si los valores de campo de un log se desvían significativamente de los logs históricos dentro de un grupo. Una desviación significativa se produce cuando la similitud entre los valores entrantes y los históricos es baja o no existe similitud alguna. Para obtener más información, consulta [Cómo se determina que un log es anómalo](#how-logs-are-determined-to-be-anomalous).

Consulta [Crear regla][1] para obtener instrucciones sobre cómo configurar una regla de anomalías de contenido.

## Cómo funciona la detección de anomalías de contenido

### Parámetros de detección de anomalías

Al crear una regla con el método de detección de anomalías de contenido, puedes configurar los siguientes parámetros.

#### Duración del aprendizaje
{{< img src="security/security_monitoring/detection_rules/content_anomaly/query_learning_duration.png" alt="Una consulta de la regla de anomalías de contenido con la duración del aprendizaje resaltada" style="width:100%;" >}}

- **Descripción**: Ventana temporal en la que se aprenden los valores. Durante esta fase no se genera ninguna señal. El periodo de aprendizaje se reinicia si se modifica la regla.
- **Predeterminado**: `7` días
- **Rango**: `1`-`10` días
- **Cómo configurar**: Cuando editas una regla de anomalías de contenido, puedes establecer la duración del aprendizaje en el menú desplegable **Aprendizaje para** de la consulta.

#### Olvidar después
{{< img src="security/security_monitoring/detection_rules/content_anomaly/forget_duration.png" alt="Opciones de detección de anomalías de contenido con el menú desplegable de los últimos días resaltado" style="width:100%;" >}}

- **Descripción: Cuánto tiempo se retienen los valores aprendidos antes de ser descartados.
- **Predeterminado**: `7` días
- **Rango**: `1`-`10` días
- **Cómo configurar**: En la sección **Content anomaly detection options** (Opciones de detección de anomalías de contenido) de la page (página) de configuración de una regla, puedes establecer cuánto tiempo se conservan los valores aprendidos en el menú desplegable **within in the last** (en el último).

#### Umbral de porcentaje de similitud

{{< img src="security/security_monitoring/detection_rules/content_anomaly/similarity_percentage_threshold.png" alt="Opciones de detección de anomalías de contenido con el menú desplegable del porcentaje de similitud resaltado" style="width:100%;" >}}

- **Descripción**: Similitud mínima requerida para considerar un log como normal.
- **Predeterminado**: `70%`
- **Rango**: `35`-`100%`
- **Cómo configurar**: En la sección **Content anomaly detection options** (Opciones de detección de anomalías de contenido) de la page (página) de configuración de una regla, puedes establecer el umbral de porcentaje de similitud en el menú desplegable **within in the last** (en el último).

#### Umbral de artículos similares

{{< img src="security/security_monitoring/detection_rules/content_anomaly/similar_items_threshold.png" alt="Opciones de detección de anomalías de contenido con el menú desplegable de artículos similares" style="width:100%;" >}}

- **Descripción**: Número de logs históricos coincidentes necesarios para que un valor entrante se considere normal.
- **Predeterminado**: `1`
- **Rango**: `1`-`20`
- **Cómo configurar**: En la sección **Content anomaly detection options** (Opciones de detección de anomalías de contenido) de la page (página) de configuración de una regla, puedes introducir el umbral de artículos similares en el campo **with more than** (con más de).

#### Intervalo de evaluación
{{< img src="security/security_monitoring/detection_rules/content_anomaly/evaluation_window.png" alt="Opciones de detección de anomalías de contenido con el menú desplegable de artículos similares resaltado" style="width:100%;" >}}

- **Descripción**: Define el intervalo de tiempo para contar los logs de anomalías. Las señales se activan si las anomalías superan la condición case (incidencia) (por ejemplo, `a >= 2`).
- **Rango**: `0`-`24` horas
- **Cómo configurar**: En la sección **Set conditions** (Establecer condiciones) de la page (página) de configuración de una regla, puedes establecer la ventana de evaluación de una condición en el menú desplegable **within a window of** (dentro de una ventana de).

## Cómo se determina que los logs son anómalos

1. Los logs se tokenizan utilizando [Unicode Text Segmentation (UTS #29)][2].
1. Los tokens se comparan mediante [similitud de Jaccard][3].
1. Las comparaciones eficientes se consiguen con [MinHash][4] y [Locality Sensitive Hashing (LSH)][5].
1. Un log es anómalo si no supera ni el porcentaje de similitud ni el umbral de artículos similares.

### Ejemplos de cálculo de la similitud de Jaccard

Cloud SIEM utiliza la [similitud de Jaccard][3] para comparar logs.

$$\text"J(A,B)" = {∣\text"A" ∩ \text"B"∣} / {∣\text"A" ∪ \text"B"∣}$$

A continuación se muestran ejemplos de cómo se calcula la similitud de Jaccard para logs con campos de una sola palabra y logs con campos de varias palabras.

#### Campos de una sola palabra

Estos son dos ejemplos de logs con campos de una sola palabra:

```
log1={actionType:auth, resourceType:k8s, networkType:public, userType:swe}
```

```
log2={actionType:auth, resourceType:k8s, networkType:public, userType:pm}
```

Para calcular la similitud de Jaccard entre los dos logs:

- La intersección de `log1` y `log2` da como resultado este conjunto de palabras: `{auth, k8s, public}`.
- La unión de `log1` y `log2` da como resultado este conjunto de palabras: `{auth, k8s, public, swe, pm}`.
- La similitud de Jaccard se calcula utilizando el número de palabras de los resultados:

$$\text"J(log1,log2)" = 3 / 5 = 0.6$$

#### Campos de varias palabras

Estos son dos ejemplos de logs con campos de varias palabras:

```
log1={actionDescription: "Usuario conectado a la red abc"}
```

```
log2={actionDescription: "User got unauthorized network access"}
```

Para calcular la similitud de Jaccard entre los dos logs:

- La intersección de `log1` y `log2` da como resultado este conjunto de palabras: `{User, network}`.
- La unión de `log1` y `log2` da como resultado este conjunto de palabras: `{User, connected, to, abc, network, got, unauthorized, access}`.
- La similitud de Jaccard se calcula utilizando el número de elementos de los resultados:

$$\text"J(log1,log2)" = 2 / 8 = 0.25$$

## Comparación del método de anomalías de contenido con otros métodos de detección

| Función | Detección de anomalías | Detección de nuevos valores | Detección de anomalías en los contenidos |
|---------|-------------------|---------------------|---------------------------|
| Detecta nuevos valores de campo | No | Sí | Sí (configurable) |
| Detecta valores de campo poco frecuentes | No | No | Sí |
| Detecta valores distintos | No | No | Sí |
| Detecta los picos de logs | Sí | No | No |
| Compatible con múltiples consultas | No | No | Sí |
| Compatible con múltiples casos | No | No | Sí |
| Definición del umbral de las señales de activación | Aprendida de la distribución de count de logs por bucket de tiempo (~99º percentil).| Siempre activa una señal en la primera aparición de un nuevo valor. | Especificado por el usuario (`1`-`100`) |
| Intervalo de evaluación | Sí | No | Sí |
| Conservación | 14 días | 30 días | 10 días |

[1]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/real_time_rule
[2]: https://www.unicode.org/reports/tr29/tr29-22.html
[3]: https://en.wikipedia.org/wiki/Jaccard_index
[4]: https://en.wikipedia.org/wiki/MinHash
[5]: https://en.wikipedia.org/wiki/Locality-sensitive_hashing