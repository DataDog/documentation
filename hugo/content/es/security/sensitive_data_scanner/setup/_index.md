---
aliases:
- /es/sensitive_data_scanner/setup
description: Configure Sensitive Data Scanner para detectar y redactar datos sensibles
  en datos de telemetría, trazas de Agent Observability, almacenamiento en la nube
  Amazon S3 y repositorios de código.
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/
  tag: Documentación
  text: Sensitive Data Scanner
- link: /security/sensitive_data_scanner/scanning_rules/
  tag: Documentación
  text: Obtenga más información sobre las reglas de escaneo
- link: /security/sensitive_data_scanner/guide/investigate_sensitive_data_findings/
  tag: Documentación
  text: Investigue los hallazgos de datos sensibles
- link: /security/sensitive_data_scanner/guide/create-monitors-for-sensitive-data/
  tag: Documentación
  text: Cree monitors para datos sensibles
title: Configuración de Sensitive Data Scanner
---
## Descripción general {#overview}

Configure Sensitive Data Scanner para cada fuente de datos que desee escanear. Cada fuente utiliza su propio proceso de configuración, por lo que solo necesita configurar las fuentes relevantes para sus necesidades.

- **Datos de telemetría:** Escanee sus registros, tramos de APM, eventos de RUM y eventos de Event Management. Consulte [Datos de telemetría][1] para obtener instrucciones de configuración. Para escanear registros antes de que salgan de su red, utilice el [procesador de Sensitive Data Scanner para Observability Pipelines][5].
- **Datos de Agent Observability:** Escanee las trazas de LLM, los prompts y las completaciones. Configure el escaneo desde la [Agent Observability Settings page][3].
- **Datos de almacenamiento en la nube:** Escanee sus buckets de Amazon S3 e instancias de RDS. Consulte [Almacenamiento en la nube][2] para obtener instrucciones de configuración.
- **Repositorios de código:** Detecte secretos expuestos en su código fuente. Consulte [Secret Scanning][4] para obtener instrucciones de configuración.
- **Evaluaciones de AI Guard:** Escanee las conversaciones que AI Guard evalúa en busca de datos sensibles como credenciales e información de identificación personal (PII). Configure las reglas de escaneo desde la [AI Guard tab][6] de la página de configuración de Sensitive Data Scanner.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/sensitive_data_scanner/setup/telemetry_data/
[2]: /es/security/sensitive_data_scanner/setup/cloud_storage/
[3]: https://app.datadoghq.com/sensitive-data-scanner/configuration/llm-spans
[4]: /es/security/code_security/secret_scanning/
[5]: /es/observability_pipelines/processors/sensitive_data_scanner
[6]: https://app.datadoghq.com/sensitive-data-scanner/configuration/ai-guard