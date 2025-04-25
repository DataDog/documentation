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

Si se necesita una acción inmediata tras revisar los resultados generados por el trabajo histórico, puedes convertir con confianza un subconjunto de esos resultados en señales. Al convertir un resultado en señal, puedes establecer manualmente la gravedad de la señal y el destino de notificación, así como el manual de señales.

## Ejecutar un trabajo histórico

### Crear el trabajo

1. Ve a la página [Cloud SIEM Detection Rules][1] (Reglas de detección de Cloud SIEM).
1. Haz clic en el menú de tres puntos situado junto a la regla que deseas probar y selecciona **Run as Historical Job** (Ejecutar como trabajo histórico).
1. Completa el formulario eligiendo el índice de log, el intervalo de tiempo, el caso de la regla y el destinatario o destinatarios de la notificación.
    {{< img src="security/security_monitoring/detection_rules/historical-job-form.png" alt="Formulario de creación del trabajo histórico" style="width:90%;" >}}
1. Haz clic en **Run Historical Job** (Ejecutar trabajo histórico).
1.  También puedes definir el trabajo desde cero en el [Editor de reglas][2].

### Revisar los resultados del trabajo

1. Ve a [Lista de trabajos históricos][3].
1. Haz clic en el trabajo histórico que has creado para abrir un panel que incluye los resultados detectados, los logs coincidentes, etc.
    {{< img src="security/security_monitoring/detection_rules/historical-job-result.png" alt="El panel de resultados de un trabajo histórico" style="width:90%;" >}}

### Convertir un resultado en una señal

1. En la sección **Results** (Resultados) del panel de un trabajo histórico, haz clic en uno de los resultados de la lista para abrir un panel de detalles para ese resultado.
1. Haz clic en **Convert to Signal** (Convertir en señal).
1. Establece la gravedad de la señal, los destinatarios de notificación y el mensaje de descripción.
    {{< img src="security/security_monitoring/detection_rules/convert-historical-job-result-to-signal.png" alt="El panel de resultados para un trabajo histórico" style="width:90%;" >}}
1. Haz clic en **Convert to Signals** (Convertir en señales).

## Consultas de campos calculados

{{< img src="security/security_monitoring/detection_rules/calculated-fields-detection-rule.png" alt="La opción de los campos calculados en el editor de reglas de detección" style="width:90%;" >}}

Puedes crear [Campos calculados][4] directamente en una consulta de trabajos históricos para definir un campo calculado a partir de fuentes de datos existentes.

Utiliza campos calculados para transformar y enriquecer tu consulta con fórmulas para:

- Manipular texto
- Realizar operaciones aritméticas
- Evaluar la lógica condicional

Un campo calculado puede utilizarse como cualquier atributo de logs para el análisis de trabajos, la búsqueda de resultados de trabajos y la definición de otros campos calculados.

1. Ve a [Lista de trabajos históricos][3].
1. Haz clic en **Nuevo trabajo**.
1. Busca la sección [Definir consultas de búsqueda][6].
1. Haz clic en **Add** (Añadir).
1. Selecciona **Campos calculados** entre las opciones.

{{< img src="security/security_monitoring/detection_rules/create-calculated-field.png" alt="La creación de un diálogo modal de campos calculados con campos para definir el nombre y la fórmula" style="width:90%;" >}}

Consulta [Lenguaje de expresión de campos calculados][5] para conocer los operadores y funciones disponibles.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/rules
[2]: https://app.datadoghq.com/security/configuration/siem/rules/new-job?product=siem
[3]: https://app.datadoghq.com/security/detections/historical-jobs
[4]: /es/logs/explorer/calculated_fields/
[5]: /es/logs/explorer/calculated_fields/expression_language/
[6]: https://app.datadoghq.com/security/configuration/siem/rules/new-job?product=siem#rule-editor-define-queries