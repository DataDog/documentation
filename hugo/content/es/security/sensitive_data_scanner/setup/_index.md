---
aliases:
- /es/sensitive_data_scanner/setup
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/scanning_rules/
  tag: Documentación
  text: Aprenda más sobre las reglas de escaneo
title: Configuración
---
## Descripción general {#overview}

Configure Sensitive Data Scanner para escanear su:

- Datos de telemetría, para que pueda identificar datos sensibles en sus registros, tramos de APM, eventos de RUM y eventos de Event Management. Consulte [Configuración para Datos de Telemetría][1] para obtener instrucciones.
- Datos de Agent Observability, para que pueda identificar datos sensibles en trazas de LLM, prompts y completions. Navegue a la [Agent Observability Settings page][3] para configurar el escaneo.
- Datos de almacenamiento en la nube, para que pueda identificar datos sensibles en sus buckets de Amazon S3. Consulte [Configuración para Almacenamiento en la Nube][2] para obtener instrucciones.
- Repositorios de código, para que pueda detectar secretos expuestos en el código fuente. Consulte [Secret Scanning][4] para obtener instrucciones.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/sensitive_data_scanner/setup/telemetry_data/
[2]: /es/security/sensitive_data_scanner/setup/cloud_storage/
[3]: https://app.datadoghq.com/sensitive-data-scanner/configuration/llm-spans
[4]: /es/security/code_security/secret_scanning/