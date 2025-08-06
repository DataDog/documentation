---
aliases:
- /es/service_catalog/import_entries_integrations/
- /es/service_catalog/enrich_default_catalog/import_entries_integrations
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: Sitio externo
  text: Crear y gestionar definiciones de servicio con Terraform
- link: /api/latest/service-definition/
  tag: API
  text: Más información sobre la API de definición de servicios
- link: /integrations/github
  tag: Documentación
  text: Más información sobre la integración GitHub
- link: https://www.datadoghq.com/blog/servicenow-cmdb-it-management-datadog/#get-cmdb-metadata-in-the-datadog-service-catalog
  tag: Blog
  text: Gestionar tu infraestructura con la CMDB ServiceNow y Datadog
title: Importar entradas desde ServiceNow
---

Para rellenar tu Catálogo de servicios de Datadog con servicios de tu CMDB ServiceNow, utiliza la función de ingestión de servicios de la [integración Datadog-ServiceNow][2].

{{< img src="integrations/servicenow/service-metadata.jpg" alt="Captura de pantalla del panel de Configuración del servicio que muestra los metadatos cargados de ServiceNow" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[2]: /es/integrations/servicenow/#service-ingestion
[3]: https://app.datadoghq.com/services/settings/get-started
[4]: /es/getting_started/tagging/unified_service_tagging
[5]: /es/tracing/service_catalog/service_definition_api/
[6]: /es/integrations/github/