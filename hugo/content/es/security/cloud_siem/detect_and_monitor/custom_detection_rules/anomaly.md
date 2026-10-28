---
description: Aprenda cómo funciona el método de detección de anomalías.
disable_toc: false
title: Anomalía
---
## Descripción general {#overview}

La detección de anomalías analiza los registros para identificar picos anormales en su volumen de registros, lo que podría indicar problemas como un ataque, una configuración incorrecta o un proceso fuera de control.

Consulte [Crear regla][1] para obtener instrucciones sobre cómo configurar una regla de anomalía.

## Cómo funciona la detección de anomalías {#how-anomaly-detection-works}

La regla de detección de anomalías:

- Agrupa los registros entrantes en intervalos de tiempo y calcula una línea base.
    - El límite superior refleja el percentil 99.5 de su historial reciente, utilizando hasta 2 semanas de registros históricos.
- Comprueba en cada evaluación la ventana de evaluación más reciente y mide cuánto excede la serie ese límite.
    - Se activa una señal si el exceso es lo suficientemente grande durante toda la ventana.

El método de anomalías se adapta a sus patrones normales y reduce el ruido de las fluctuaciones rutinarias.

**Nota**: El método de anomalías solo detecta picos. No alerta sobre caídas en el volumen de registros.

### Estacionalidad y periodo de aprendizaje {#seasonality-and-learning-period}

El algoritmo tiene en cuenta automáticamente la estacionalidad diaria y semanal, por lo que no alerta ante picos regulares, como los aumentos de fin de semana.

Se aplica un periodo de aprendizaje corto para reglas nuevas o valores recién observados para un `group by`. Durante el periodo de aprendizaje, se recopilan datos para crear una línea base.

## Mejores prácticas {#best-practices}

- Delimite el contexto de la consulta de forma precisa. Filtre por servicio, entorno, equipo o punto de conexión para reducir el ruido.
- Comience con reglas predeterminadas administradas para una cobertura amplia, luego agregue reglas de anomalía personalizadas para fuentes de registros de alto volumen.

[1]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule?cloud_siem_detection_rule_detection_method=anomaly