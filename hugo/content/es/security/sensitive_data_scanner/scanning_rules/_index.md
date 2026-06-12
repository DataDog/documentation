---
aliases:
- /es/sensitive_data_scanner/scanning_rules
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/cloudcraft-security/
  tag: Blog
  text: Identificar y priorizar visualmente los riesgos de seguridad con Cloudcraft
title: Reglas de análisis
---

{{< callout url="https://www.datadoghq.com/product-preview/human-name-pii-detection-in-logs-using-machine-learning/" btn_hidden="false" >}}
La detección de información de identificación personal en logs utilizando machine learning está en Vista previa Para inscribirte, haz clic en <b>Solicitar accesso</b>.
{{< /callout >}}

## Datos de telemetría

Sensitive Data Scanner para datos de Telemetría utiliza reglas de análisis para determinar qué información confidencial debe coincidir dentro de los datos. Estos datos pueden proceder de logs de tu aplicación, tramos (spans) APM, eventos RUM y eventos de Event Management. Puedes utilizar la [biblioteca de reglas de análisis][1] de Datadog para crear reglas o puedes crear [reglas personalizadas][2].

La biblioteca de reglas de análisis de Datadog contiene reglas de análisis predefinidas que detectan patrones frecuentes, como direcciones de correo electrónico, números de tarjetas de crédito, claves API, tokens de autorización, información de red y dispositivos, etc. Para obtener más información, consulta [Reglas de biblioteca][1].

También puedes crear reglas de análisis personalizadas utilizando patrones de expresiones regulares (regex) para definir la información confidencial de la que quieres detectar coincidencias. Para obtener más información, consulta [Reglas personalizadas][2].

## Almacenamiento en la nube

Sensitive Data Scanner para el almacenamiento en la nube también utiliza reglas de análisis para determinar qué información confidencial debe coincidir con los datos. Todas las reglas de la biblioteca de análisis de Datadog se aplican y no se pueden editar. Para obtener más información, consulta [Reglas de biblioteca][1].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/sensitive_data_scanner/scanning_rules/library_rules/
[2]: /es/security/sensitive_data_scanner/scanning_rules/custom_rules/