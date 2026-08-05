---
description: Más información sobre el funcionamiento del método de detección de anomalías.
disable_toc: false
title: Anomalía
---

## Información general

La detección de anomalías analiza logs para identificar picos anormales en tu volumen de logs, que podrían indicar problemas como un ataque, un error de configuración o un proceso fuera de control.

Consulta [Crear regla][1] para obtener instrucciones sobre cómo configurar una regla de anomalías.

## Funcionamiento de la detección de anomalías

La regla de detección de anomalías:

- Agrega los logs entrantes en buckets de tiempo y calcula una línea de base.
    - El límite superior refleja el percentil 99,5 de tu historial reciente, utilizando hasta 2 semanas de logs históricos.
- Comprueba en cada evaluación el periodo de evaluación más reciente y mide cuánto excede la serie ese límite.
    - Se activa una señal si el exceso es suficientemente grande en todo el periodo.

El método de anomalías se adapta a tus patrones normales y reduce el ruido de las fluctuaciones rutinarias.

**Nota**: El método de anomalías solo detecta picos, pero no alerta de caídas en el volumen de logs.

### Estacionalidad y periodo de aprendizaje

El algoritmo tiene en cuenta automáticamente la estacionalidad diaria y semanal, de modo que los picos regulares, como los aumentos de fin de semana, no alertan.

Se aplica un breve periodo de aprendizaje de nuevas reglas o nuevos valores observados para un `group by`. Durante el periodo de aprendizaje, se recopilan datos para crear una línea de base.

## Prácticas recomendadas

- Limita la consulta. Filtra por servicio, entorno, equipo o endpoint para reducir el ruido.
- Comienza con reglas predeterminadas gestionadas para una amplia cobertura y luego añade reglas de anomalías personalizadas para fuentes con grandes volúmenes de logs.

[1]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/real_time_rule?tab=anomaly
[2]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/real_time_rule/?tab=anomaly#rule-multi-triggering-rt-anomaly