---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/detection-as-code-cloud-siem/
  tag: Blog
  text: Cree, pruebe y escale detecciones como código con Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/cloud-siem-mitre-attack-map/
  tag: Blog
  text: Identifique brechas para fortalecer la cobertura de detección con Datadog
    Cloud SIEM MITRE ATT&CK Map
- link: https://www.datadoghq.com/blog/building-security-coverage-for-cloud-environments/
  tag: Blog
  text: Construya una cobertura de seguridad suficiente para su entorno en la nube
- link: https://www.datadoghq.com/blog/writing-datadog-security-detection-rules/
  tag: Blog
  text: Prácticas recomendadas para crear reglas de detección personalizadas con Datadog
    Cloud SIEM
- link: https://learn.datadoghq.com/courses/cloud-siem-detect-investigate-threats
  tag: Centro de aprendizaje
  text: Detecte e investigue amenazas con Cloud SIEM
- link: https://learn.datadoghq.com/courses/cloud-siem-custom-rules
  tag: Centro de aprendizaje
  text: Escriba reglas de detección personalizadas de Cloud SIEM
title: Detecte y haga un seguimiento
---
## Descripción general {#overview}

Haga un seguimiento de su telemetría de Datadog y utilice [reglas de detección predeterminadas](#out-of-the-box-detection-rules) o [cree reglas personalizadas](#custom-detection-rules) para detectar amenazas. Cuando se detecta una amenaza, se genera una señal de seguridad. Además, puede agregar [supresiones](#suppressions) para refinar las reglas de detección de modo que no se genere una señal bajo condiciones específicas. Esto puede mejorar la precisión y relevancia de las señales de seguridad generadas.

{{< img src="security/security_monitoring/detection_rules/detection_rule_side_panel.png" alt="El panel lateral de una regla de detección que muestra las condiciones que activan una señal" style="width:100%;" >}}

## Reglas de detección {#detection-rules}

### Reglas de detección predeterminadas {#out-of-the-box-detection-rules}

Cloud SIEM le proporciona una lista extensa de [reglas de detección predeterminadas][1]. Después de haber habilitado y configurado los paquetes de contenido de Cloud SIEM, las reglas de detección predeterminadas comienzan a analizar automáticamente sus registros, eventos de Audit Trail y eventos de Event Management.

Puede editar las reglas de detección predeterminadas y hacer lo siguiente:

- Cambiar el nombre de la regla.
- Extender la consulta. La consulta original no se puede editar, pero puede agregarle una consulta personalizada.
- Cambiar la configuración de gravedad en la sección {{< ui >}}Set conditions{{< /ui >}}.
- Modifique el playbook.

### Reglas de detección personalizadas {#custom-detection-rules}

Las reglas de detección predeterminadas cubren la mayoría de los escenarios de amenazas, pero también puede crear reglas de detección personalizadas para sus casos de uso específicos. Para las reglas de detección personalizadas, utilice la sintaxis de búsqueda de registros para crear y unir consultas de registros de modo que pueda dirigirse a servicios, cuentas o eventos individuales que desee hacer un seguimiento. También puede mejorar esas consultas con información como la geolocalización de una dirección IP o el código de estado de una solicitud HTTP.

Para los registros que coincidan con la consulta, puede establecer condiciones para determinar si se trata de una amenaza y si se debe generar una señal de seguridad, así como indicar la gravedad de la amenaza. Las señales de security proporcionan detalles sobre la amenaza e incluyen un playbook personalizable, que ofrece información como políticas de seguridad y pasos de remediación.

Consulte [Reglas de detección personalizadas][2] para obtener más información.

### Deprecación de reglas {#rule-deprecation}

Se realizan auditorías periódicas de todas las reglas de detección predeterminadas para mantener una alta fidelidad en la calidad de las señales. Las reglas depreciadas se reemplazan por una regla mejorada.

El proceso de depreciación de reglas es el siguiente:

1. Hay una advertencia con la fecha de deprecación en la regla. En la interfaz de usuario, la advertencia se muestra en:
    - La sección {{< ui >}}Rule Details{{< /ui >}} > {{< ui >}}Playbook{{< /ui >}} del panel lateral de señales
    - [Rule editor][3] para esa regla específica
2. Una vez que la regla se marca como obsoleta, hay un periodo de 15 meses antes de que la regla se elimine. Esto se debe al periodo de retención de señales de 15 meses. Durante este tiempo, puede volver a habilitar la regla [cloning the rule][3] en la interfaz de usuario.
3. Una vez que la regla se elimina, ya no puede clonarla ni volver a habilitarla.

## Supresiones {#suppressions}

Las señales de security le advierten sobre posibles amenazas a su infraestructura, pero también se pueden generar falsos positivos. Por ejemplo, se podría activar un gran número de señales de seguridad si se genera una afluencia repentina de solicitudes a partir de pruebas de carga de una aplicación. Para reducir los falsos positivos en tales escenarios, puede definir una consulta de supresión en una regla de detección que evite que se genere una señal. También puede crear reglas de supresión para establecer condiciones generales de supresión en varias reglas de detección.

Consulte [Suppressions][4] para obtener más información.

## Dynamic severity {#dynamic-severity}

Puede ajustar la gravedad de las señales de seguridad según los activos a los que afectan. Puede personalizar los niveles de gravedad, aplicar etiquetas personalizadas y aislar los cambios en reglas específicas.

Consulte [Dynamic Severity][6] para obtener más información.

## MITRE ATT&CK Map {#mitre-attck-map}

Después de configurar sus reglas de detección, utilice el Cloud SIEM [MITRE ATT&CK Map][5] para explorar y visualizar sus reglas frente al marco de MITRE ATT&CK, de modo que tenga visibilidad de las técnicas de los atacantes.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/default_rules/#cat-cloud-siem-log-detection
[2]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules
[3]: /es/security/detection_rules/#clone-a-rule
[4]: /es/security/cloud_siem/detect_and_monitor/suppressions
[5]: /es/security/cloud_siem/detection_rules/mitre_attack_map/
[6]: /es/security/cloud_siem/detect_and_monitor/dynamic_severity