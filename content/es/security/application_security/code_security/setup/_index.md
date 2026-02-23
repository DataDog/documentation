---
aliases:
- /es/security/application_security/enabling/single_step/code_security/
- /es/security/application_security/enabling/tracing_libraries/code_security/
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: Documentación
  text: Pipelines de procesamiento de logs
- link: /security/application_security/code_security
  tag: Documentación
  text: Seguridad del código
- link: https://www.datadoghq.com/blog/iast-datadog-code-security/
  tag: Blog
  text: Mejorar la seguridad de las aplicaciones en producción con la seguridad del
    código Datadog
- link: https://www.datadoghq.com/blog/code-security-owasp-benchmark/
  tag: Blog
  text: La seguridad del código de Datadog logra una precisión del 100% en la prueba
    de referencia OWASP utilizando un enfoque IAST
title: Configuración de Code Security
---

## Requisitos previos
Antes de configurar Code Security, asegúrate de que se cumplen los siguientes requisitos previos:

1. **Instalación del Datadog Agent:** El Datadog Agent se instala y configura para el sistema operativo de tu aplicación, o el contenedor, la nube o el entorno virtual.
2. **Configuración de Datadog APM:** Datadog APM está configurado para tu aplicación o servicio y Datadog recibe las trazas (traces) web (`type:web`).
3. **Biblioteca de rastreo compatible:** La librería de rastreo Datadog utilizada por tu aplicación o servicio admite capacidades de Code Security para el lenguaje de tu aplicación o servicio. Para obtener más detalles, consulta la página [Compatibilidad de librería][1].

## Uso de librerías de rastreo de Datadog

Selecciona el lenguaje de la aplicación para obtener información sobre cómo habilitar la seguridad del código para tu lenguaje y los tipos de infraestructura.

{{< partial name="security-platform/appsec-languages-code-security.html" >}}</br>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}



[1]: /es/security/application_security/code_security/setup/compatibility/
