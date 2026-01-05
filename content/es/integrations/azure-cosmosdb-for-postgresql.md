---
aliases:
- /es/integrations/azure_cosmosdb_for_postgresql
app_id: azure-cosmosdb-for-postgresql
categories:
- azure
- nube
- almacenes de datos
custom_kind: integración
description: Rastreo de métricas clave de Azure CosmosDB para PostgreSQL.
media: []
title: Azure CosmosDB para PostgreSQL
---
## Información general

Azure Cosmos DB for PostgreSQL es PostgreSQL ampliado gracias a la potencia de las "tablas distribuidas". Esto te permite crear aplicaciones relacionales altamente escalables. Comienza a crear aplicaciones en un único clúster de nodo, del mismo modo que lo harías con PostgreSQL. A medida que crecen los requisitos de escalabilidad y de rendimiento de tu aplicación, puedes escalar sin problemas a varios nodos mediante la distribución transparente de tus tablas.

Utiliza la integración Datadog Azure para recopilar métricas y logs de Azure Cosmos DB for PostgreSQL. También puedes utilizar el dashboard predefinido para obtener información inmediata.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración de Microsoft Azure] primero (https://docs.datadoghq.com/integrations/azure/). No es necesario ningún otro paso de instalación adicional.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.dbforpostgresql_servergroupsv2.active_connections** <br>(gauge) | Conexiones activas.|
| **azure.dbforpostgresql_servergroupsv2.apps_reserved_memory_percent** <br>(gauge) | Porcentaje del límite de memoria reservado por las aplicaciones.<br>_Se muestra como porcentaje_ |
| **azure.dbforpostgresql_servergroupsv2.cpu_percent** <br>(gauge) | Porcentaje de CPU.<br>_Se muestra como porcentaje_ |
| **azure.dbforpostgresql_servergroupsv2.iops** <br>(gauge) | Operaciones de E/S por segundo.|
| **azure.dbforpostgresql_servergroupsv2.memory_percent** <br>(gauge) | Porcentaje de memoria.<br>_Se muestra en porcentaje_ |
| **azure.dbforpostgresql_servergroupsv2.network_bytes_egress** <br>(count) | Salida de red a través de conexiones activas.<br>_Se muestra como byte_ |
| **azure.dbforpostgresql_servergroupsv2.network_bytes_ingress** <br>(count) | Entrada de red a través de conexiones activas.<br>_Se muestra como byte_ |
| **azure.dbforpostgresql_servergroupsv2.storage_percent** <br>(gauge) | Porcentaje de almacenamiento.<br>_Se muestra como porcentaje_ |
| **azure.dbforpostgresql_servergroupsv2.storage_used** <br>(gauge) | Almacenamiento utilizado.<br>_Se muestra como byte_ |
| **azure.dbforpostgresql_servergroupsv2.vm_cached_bandwidth_percent** <br>(gauge) | Porcentaje de ancho de banda de disco en caché consumido por la máquina virtual.<br>_Se muestra como porcentaje_ |
| **azure.dbforpostgresql_servergroupsv2.vm_cached_iops_percent** <br>(gauge) | Porcentaje de IOPS de disco en caché consumidas por la máquina virtual.<br>_Se muestra como porcentaje_ |
| **azure.dbforpostgresql_servergroupsv2.vm_uncached_bandwidth_percent** <br>(gauge) | Porcentaje de ancho de banda de disco no almacenadas en caché consumido por la máquina virtual.<br>_Se muestra como porcentaje_ |
| **azure.dbforpostgresql_servergroupsv2.vm_uncached_iops_percent** <br>(gauge) | Porcentaje de IOPS de disco no almacenadas en caché consumidas por la máquina virtual.<br>_Se muestra como porcentaje_ |
| **azure.dbforpostgresql_servergroupsv2.count** <br>(gauge) | Recuento de DBForPostgreSQL serverGroupsv2.|

### Eventos

La integración Azure Cosmos DB for PostgreSQL no incluye eventos.

### Checks de servicio

La integración Azure Cosmos DB for PostgreSQL no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).