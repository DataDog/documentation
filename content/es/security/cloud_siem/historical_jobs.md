---
further_reading:
- link: https://www.datadoghq.com/blog/cloud-siem-historical-jobs/
  tag: Blog
  text: Test retrospectivo de reglas de detección con trabajos históricos de Datadog
    Cloud SIEM
title: Trabajos históricos
---

Los trabajos históricos permiten realizar tests retrospectivos de las detecciones comparándolas con los logs históricos almacenados en Datadog Cloud SIEM.

A diferencia de una regla en tiempo real, un trabajo histórico no se ejecuta continuamente. Los trabajos históricos son consultas que se ejecutan una sola vez y analizan un periodo específico de datos históricos.

Los resultados de los trabajos históricos son versiones ligeras de las señales, que proporcionan información esencial sobre posibles amenazas o anomalías identificadas en los logs históricos.

Si se necesita una acción inmediata tras revisar los resultados generados por el trabajo histórico, puedes convertir con confianza un subconjunto de esos resultados a señales. Al convertir un resultado en señal, puedes establecer manualmente la gravedad de la señal y el destino de notificación, así como el manual de señales.

## Ejecutar un trabajo histórico

### Crear el trabajo

1. Navega a la página [Cloud SIEM Detection Rules][1] (Reglas de detección de Cloud SIEM).
1. Haz clic en el menú de tres puntos situado junto a la regla que deseas probar y selecciona **Run as Historical Job** (Ejecutar como trabajo histórico).
1. Completa el formulario eligiendo el índice de log, el intervalo de tiempo, el caso de la regla y el destinatario o destinatarios de la notificación.
    {{< img src="security/security_monitoring/detection_rules/historical-job-form.png" alt="Formulario de creación del Trabajo histórico" style="width:90%;" >}}
1. Haz clic en **Run Historical Job** (Ejecutar trabajo histórico).

### Revisar los resultados del trabajo

1. Navega a la [lista de Trabajos históricos][2].
1. Haz clic en el trabajo histórico que has creado para abrir un panel que incluye los resultados detectados, los logs coincidentes, etc.
    {{< img src="security/security_monitoring/detection_rules/historical-job-result.png" alt="El panel de resultados de un trabajo histórico" style="width:90%;" >}}

### Convertir un resultado en una señal

1. En la sección **Results** (Resultados) del panel de un trabajo histórico, haz clic en uno de los resultados de la lista para abrir un panel de detalles para ese resultado.
1. Haz clic en **Convert to Signal** (Convertir en señal).
1. Establece la gravedad de la señal, los destinatarios de notificación y el mensaje de descripción.
    {{< img src="security/security_monitoring/detection_rules/convert-historical-job-result-to-signal.png" alt="El panel de resultados para un trabajo histórico" style="width:90%;" >}}
1. Haz clic en **Convert to Signals** (Convertir en señales).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/rules
[2]: https://app.datadoghq.com/security/detections/historical-jobs