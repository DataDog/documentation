---
categories:
- azure
- nube
- almacenes de datos
custom_kind: integración
dependencies: []
description: Rastrea las métricas principales de Azure Cosmos DB.
doc_link: https://docs.datadoghq.com/integrations/azure_cosmosdb/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/azure-cosmos-db-integrated-cache-datadog/
  tag: Blog
  text: Monitorizar la caché integrada de Azure Cosmos DB con Datadog
git_integration_title: azure_cosmosdb
has_logo: true
integration_id: azure-cosmosdb
integration_title: Microsoft Azure Cosmos DB
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_cosmosdb
public_title: Integración de Datadog y Microsoft Azure Cosmos DB
short_description: Rastrea las métricas principales de Azure Cosmos DB.
version: '1.0'
---

<!--  FUENTE https://github.com/DataDog/dogweb -->
## Información general

Azure Cosmos DB es un servicio de base de datos multimodelo distribuido globalmente que admite bases de datos de documentos, clave-valor, columnas anchas y gráficos.

Utiliza la integración de Azure con Datadog para recopilar métricas de Cosmos DB.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero [Microsoft Azure integración][1]. No hay otros pasos de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_cosmosdb" >}}


### Eventos

La integración Azure Cosmos DB no incluye ningún evento.

### Checks de servicio

La integración de Azure Cosmos DB no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_cosmosdb/azure_cosmosdb_metadata.csv
[3]: https://docs.datadoghq.com/es/help/