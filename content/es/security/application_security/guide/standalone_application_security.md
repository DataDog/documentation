---
disable_toc: false
title: Configurar productos de App and API Protection sin utilizar APM
---

Datadog AAP se basa en [APM][3]. Aunque Datadog recomienda utilizar AAP con APM y adoptar prácticas de DevSecOps, también puedes utilizar estos productos de seguridad sin utilizar APM. Esta configuración se denomina Standalone App and API Protection. Esta guía explica cómo configurar Standalone App and API Protection.

## Requisitos previos

Esta guía asume que dispones de lo siguiente:

- **Agent:** [instala el Datadog Agent][6] y configúralo para el sistema operativo, contenedor, nube o entorno virtual de tu aplicación.
- **Biblioteca de rastreo compatible:** la biblioteca de rastreo de Datadog utilizada por tu aplicación o servicio es compatible con App and API Protection. Para obtener más información, consulta la guía de [App and API Protection][4].

## Compatibilidad

Standalone App and API Protection es compatible con las siguientes versiones de bibliotecas de rastreo:

| Lenguaje | Versión |
| -------- | ------- |
| .NET     | 3.12.0  |
| Go       | N/A     |
| Java     | 1.47.0  |
| Node.js  | 5.40.0  |
| PHP      | N/A     |
| Python   | 3.2.0   |
| Ruby     | 2.13.0  |

## Configuración


Configura el Datadog Agent utilizando el método estándar para la configuración de APM o App and API Protection, pero configura la biblioteca de rastreo añadiendo la variable de entorno `DD_APM_TRACING_ENABLED=false` al servicio que ejecuta la biblioteca de rastreo.

Esta variable de entorno reducirá la cantidad de datos de APM enviados a Datadog al mínimo requerido por los productos de App y API Protection. La variable de entorno puede combinarse con otras variables de entorno para activar App and API Protection.

Para App and API Protection, añade la variable de entorno `DD_APM_TRACING_ENABLED=false DD_APPSEC_ENABLED=true`.


[1]: /es/security/workload_protection/
[2]: /es/security/application_security/code_security/
[3]: /es/tracing/
[4]: /es/security/application_security/setup/
[5]: /es/security/application_security/code_security/setup/
[6]: /es/agent/