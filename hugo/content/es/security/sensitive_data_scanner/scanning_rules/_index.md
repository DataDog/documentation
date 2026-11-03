---
aliases:
- /es/sensitive_data_scanner/scanning_rules
description: Comprenda cómo Sensitive Data Scanner utiliza reglas de escaneo para
  encontrar coincidencias de datos confidenciales, incluidas las reglas de biblioteca
  predefinidas y las reglas de expresiones regulares personalizadas para datos de
  telemetría y almacenamiento en la nube.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/human-name-detection
  tag: Blog
  text: Detecte nombres de personas en registros con ML en Sensitive Data Scanner
- link: https://www.datadoghq.com/blog/cloudcraft-security/
  tag: Blog
  text: Identifique y priorice visualmente los riesgos de seguridad usando Cloudcraft
title: Reglas de escaneo de datos confidenciales
---
## Datos de telemetría {#telemetry-data}
Sensitive Data Scanner para datos de telemetría utiliza reglas de escaneo para determinar qué información confidencial debe coincidir dentro de los datos. Estos datos pueden provenir de los registros de su aplicación, spans de APM, eventos de RUM y eventos de Event Management. Puede utilizar la [Biblioteca de reglas de escaneo][1] de Datadog para crear reglas o puede crear [reglas personalizadas][2].

La Biblioteca de reglas de escaneo de Datadog contiene reglas de escaneo predefinidas que detectan patrones comunes, como direcciones de correo electrónico, números de tarjetas de crédito, claves de API, tokens de autorización, información de red y de dispositivos, y más. Consulte [Reglas de biblioteca][1] para obtener más información.

También puede crear reglas de escaneo personalizadas utilizando patrones de expresiones regulares (regex) para definir qué información confidencial desea que coincida. Consulte [Reglas personalizadas][2] para obtener más información.

## Almacenamiento en la nube {#cloud-storage}

Sensitive Data Scanner para almacenamiento en la nube también utiliza reglas de escaneo para determinar qué información confidencial debe coincidir dentro de los datos. Todas las reglas de la Biblioteca de reglas de escaneo de Datadog se aplican y no se pueden editar. Consulte [Reglas de biblioteca][1] para obtener más información.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/sensitive_data_scanner/scanning_rules/library_rules/
[2]: /es/security/sensitive_data_scanner/scanning_rules/custom_rules/