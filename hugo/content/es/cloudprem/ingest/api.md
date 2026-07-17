---
aliases:
- /es/cloudprem/ingest_logs/rest_api/
description: Aprende cómo integrar con CloudPrem mediante llamadas directas a la API
further_reading:
- link: /cloudprem/ingest_logs/datadog_agent/
  tag: Documentación
  text: Integración del Datadog Agent
- link: /cloudprem/ingest_logs/observability_pipelines/
  tag: Documentación
  text: Integración de Observability Pipelines
title: Enviar logs a CloudPrem con la API REST
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem está en vista previa" >}}
  Únete a la vista previa de CloudPrem para acceder a las nuevas funciones de gestión de logs autoalojadas.
{{< /callout >}}

## Información general

Puedes enviar logs a CloudPrem utilizando llamadas directas a la API REST. Este método es útil para integraciones personalizadas o scripts que no pueden utilizar un Datadog Agent u Observability Pipelines.

## API de logs de Datadog

**Endpoint**: `POST /api/v2/logs`<br>
**Tipo de contenido**: `application/json`<br>
**Autenticación**: clave de API de Datadog

```shell
curl -X POST "http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280/api/v2/logs" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: your-datadog-api-key" \
  -d '[
    {
      "message": "User login successful",
      "level": "info",
      "timestamp": "2024-01-15T10:30:00Z",
      "service": "auth-service",
      "host": "web-01",
      "tags": ["authentication", "success"]
    }
  ]'
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}