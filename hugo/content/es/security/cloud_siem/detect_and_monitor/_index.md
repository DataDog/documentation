---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/detection-as-code-cloud-siem/
  tag: Blog
  text: Construye, test, y escala detecciones como código con Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/cloud-siem-mitre-attack-map/
  tag: Blog
  text: Identifica lagunas para reforzar la cobertura de detección con el mapa de
    Datadog Cloud SIEM MITRE ATT&CK
- link: https://www.datadoghq.com/blog/building-security-coverage-for-cloud-environments/
  tag: Blog
  text: Crear una cobertura de seguridad suficiente para tu entorno en la nube
- link: https://www.datadoghq.com/blog/writing-datadog-security-detection-rules/
  tag: Blog
  text: Prácticas recomendadas para crear reglas de detección personalizadas con Datadog
    Cloud SIEM
title: Detectar y monitorizar
---

## Información general

Monitoriza tu telemetría de Datadog y utiliza [reglas de detección predefinidas](#out-of-the-box-detection-rules) o [crea reglas personalizadas](#custom-detection-rules) para detectar amenazas. Cuando se detecta una amenaza, se genera una señal de seguridad. Además, puedes añadir [supresiones](#suppressions) para refinar las reglas de detección de modo que no se genere una señal en determinadas condiciones. Esto puede mejorar la precisión y relevancia de las señales de seguridad generadas.

## Normas de detección

### Reglas de detección predefinidas

Cloud SIEM te proporciona una extensa lista de [reglas de detección predefinidas][1]. Una vez activados y configurados los paquetes de contenido de Cloud SIEM, las reglas de detección de predefinidas comienzan a analizar automáticamente los logs, los eventos de Audit Trail y los eventos de Event Management.

Puedes editar las reglas de detección predefinidas y hacer lo siguiente:

- Cambia el nombre de la regla.
- Amplía la consulta. La consulta original no se puede editar, pero puedes añadirle una consulta personalizada.
- Cambia la configuración de gravedad en la sección Establecer condiciones.
- Modifica el playbook.

### Reglas de detección personalizadas

Las reglas de detección predefinidas cubren la mayoría de los escenarios de amenazas, pero también puedes crear reglas de detección personalizadas para tus casos de uso específicos. En el caso de las reglas de detección personalizadas, utiliza la sintaxis de búsqueda de logs para construir y unir consultas de logs, de modo que puedas centrarte en los servicios, cuentas o eventos individuales que desees monitorizar. También puedes mejorar esas consultas con información como la geolocalización de una dirección IP o el código de estado de una solicitud HTTP.

Para los logs que coincidan con la consulta, puedes establecer condiciones para determinar si se trata de una amenaza y si debe generarse una señal de seguridad, así como indicar la gravedad de la amenaza. Las señales de seguridad proporcionan detalles sobre la amenaza e incluyen un cuaderno de estrategias personalizable, que proporciona información como políticas de seguridad y pasos de corrección.

Consulta [Reglas de detección personalizadas][2] para obtener más información.

### Obsolescencia de reglas

Se realizan auditorías periódicas de todas las reglas de detección predefinidas para mantener una calidad de señal de alta fidelidad. Las reglas obsoletas se sustituyen por una regla mejorada.

El proceso de obsolescencia de las reglas es el siguiente:

1. La regla incluye una advertencia con la fecha de obsolescencia. En la interfaz de usuario, la advertencia se muestra en la:
    - Sección **Rule Details > Playbook** (Detalles de la regla > Guía) del panel lateral de señales
    - [Editor de reglas][3] para esa regla específica
2. Una vez que la regla está en desuso, hay un periodo de 15 meses antes de que se elimine la regla. Esto se debe al periodo de retención de señales de 15 meses. Durante este tiempo, puedes volver a activar la regla [clonando la regla][3] en la interfaz de usuario.
3. Una vez eliminada la regla, ya no podrás clonarla ni volver a activarla.

## Supresiones

Las señales de seguridad te advierten de posibles amenazas a tu infraestructura, pero también pueden generarse falsos positivos. Por ejemplo, podría activarse un gran número de señales de seguridad si se genera una afluencia repentina de solicitudes al probar la carga de una aplicación. Para reducir los falsos positivos en tales escenarios, puedes definir una consulta de supresión en una regla de detección que impida que se genere una señal. También puedes crear reglas de supresión para establecer condiciones generales de supresión en varias reglas de detección.

Consulta [Supresiones][4] para obtener más información.

## Mapa de MITRE ATT&CK

Después de instalar tus reglas de detección, utiliza el [Mapa de MITRE ATT&CK][5] de Cloud SIEM para explorar y visualizar tus reglas contra el marco de MITRE ATT&CK para que tengas visibilidad de las técnicas de los atacantes.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/default_rules/#cat-cloud-siem-log-detection
[2]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules
[3]: /es/security/detection_rules/#clone-a-rule
[4]: /es/security/cloud_siem/detect_and_monitor/suppressions
[5]: /es/security/cloud_siem/detection_rules/mitre_attack_map/