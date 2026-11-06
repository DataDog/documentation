---
aliases:
- /es/security_platform/detection_rules/cloud_siem
- /es/security_platform/detection_rules/security_monitoring
- /es/security_platform/detection_rules/create_a_new_rule
- /es/security_platform/cloud_siem/log_detection_rules/
- /es/cloud_siem/detection_rules/security_monitoring/
- /es/security/detection_rules/cloud_siem/
- /es/security/detection_rules/security_monitoring
- /es/security/detection_rules/create_a_new_rule
- /es/security/cloud_siem/log_detection_rules/
- /es/security/cloud_siem/detection_rules/
further_reading:
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/
  tag: Documentación
  text: Crear una regla de detección personalizada
- link: /cloud_siem/default_rules/
  tag: Documentación
  text: Configurar reglas de detección predeterminadas de Cloud SIEM
- link: /cloud_siem/explorer/
  tag: Documentación
  text: Obtenga información sobre el Explorador de señales de seguridad
- link: https://www.datadoghq.com/blog/detect-unauthorized-third-parties-aws/
  tag: Blog
  text: Detectar terceros no autorizados en su cuenta de AWS
- link: https://www.datadoghq.com/blog/anomaly-detection-rules-datadog/
  tag: Blog
  text: Detectar amenazas de seguridad con reglas de detección de anomalías
- link: /security/notifications/variables/
  tag: Documentación
  text: Obtenga más información sobre las variables de notificación de Security
- link: https://www.datadoghq.com/blog/monitor-cloudflare-zero-trust/
  tag: Blog
  text: Hacer un seguimiento de Cloudflare Zero Trust con Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: Blog
  text: Haga un seguimiento de 1Password con Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/content-anomaly-detection-cloud-siem/
  tag: Blog
  text: Detectar anomalías más allá de picos y nuevos valores con la Detección de
    anomalías de contenido en Cloud SIEM
- link: https://learn.datadoghq.com/courses/cloud-siem-custom-rules
  tag: Centro de aprendizaje
  text: Escriba reglas de detección personalizadas de Cloud SIEM
title: Reglas de detección personalizadas
type: documentation
---
## Descripción general {#overview}

Las reglas de detección predeterminadas le ayudan a cubrir la mayoría de los escenarios de amenazas, pero también puede crear reglas de detección personalizadas para sus casos de uso específicos. Consulte [Crear regla][1] para obtener instrucciones sobre cómo crear una regla personalizada.

{{< img src="security/security_monitoring/detection_rules/custom_detection_rules_ui.png" alt="La página de creación de reglas que muestra los tipos y métodos de detección que puede crear" style="width:100%;" >}}

## Tipos de regla {#rule-types}

Puede crear los siguientes tipos de reglas de detección personalizadas:

- Regla en tiempo real: Supervisa y analiza continuamente los registros entrantes.
- Regla programada: Se ejecuta en intervalos preprogramados para analizar datos de registro.
- Trabajo histórico: Realiza pruebas retrospectivas de detecciones ejecutándolas contra registros históricos.

## Métodos de detección {#detection-methods}

Los siguientes métodos de detección están disponibles cuando crea una regla de detección personalizada o un trabajo histórico:

- Umbral: Detecta cuando el recuento de consultas cumple con un caso especificado, incluidos los casos por encima del umbral (`a > N`) o por debajo del umbral (`a < N` o `a <= 0`).
- Nuevo valor: Detecta cuando un atributo cambia a un valor completamente nuevo.
- Anomalía: Detecta cuando un comportamiento se desvía de su línea base histórica.
- [Anomalía de contenido][6]: Detecta cuando el contenido de un evento es una anomalía en comparación con la línea base histórica
- [Viaje imposible][7]: Detecta si se detecta una velocidad imposible en los registros de actividad del usuario.
- Terceros: Asigna registros de seguridad de terceros a señales, estableciendo la gravedad según los atributos del registro.
- Correlación de señales: Combina varias señales para generar una nueva señal, de modo que pueda recibir alertas sobre casos de uso más complejos y reducir la fatiga por alertas.

## Filtrar registros basados en Reference Table {#filter-logs-based-on-reference-tables}

<div class="alert alert-warning">La Reference Table que contiene más de 1,000,000 de filas no se puede utilizar para filtrar eventos. Consulte <a href="https://docs.datadoghq.com/integrations/guide/reference-tables/">Agregar metadatos personalizados con Reference Table</a> para obtener más información sobre cómo crear y administrar Reference Table. </div>

La Reference Table le permite combinar metadatos con registros, proporcionando más información para resolver problemas de la aplicación. Cuando define una consulta para una regla, puede agregar un filtro de consulta basado en una Reference Table para realizar consultas de búsqueda. Para obtener más información sobre cómo crear y administrar esta función, consulte la guía [Reference Table][10].

En el siguiente ejemplo, se utiliza una Reference Table que contiene información de productos para filtrar y enriquecer los registros:

{{< img src="/security/security_monitoring/detection_rules/filter-by-reference-table.png" alt="El editor de consultas de reglas de detección de registros con las opciones de búsqueda de Reference Table resaltadas" style="width:100%;" >}}

## Pruebas unitarias {#unit-testing}

Utilice las pruebas unitarias para probar sus reglas con registros de muestra y asegurarse de que la regla de detección funcione como se espera. Esto puede ser útil cuando está creando una regla de detección para un evento que aún no ha ocurrido, por lo que no tiene registros reales para el evento. Por ejemplo: tiene registros con un campo `login_attempt` y desea detectar registros con `login_attempt:failed`, pero solo tiene registros con `login_attempt:success`. Para probar la regla, puede construir un registro de muestra copiando un registro con `login_attempt:success` y cambiando el campo `login_attempt` a `failed`.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/
[2]: https://app.datadoghq.com/security/siem/rules
[3]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/threshold/
[4]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/new_value/
[5]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/anomaly/
[6]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/content_anomaly/
[7]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/impossible_travel/
[8]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/third_party/
[10]: /es/integrations/guide/reference-tables/