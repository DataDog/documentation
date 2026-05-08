---
aliases:
- /es/integrations/cassandra_nodetool
app_id: cassandra-nodetool
categories:
- almacenes de datos
custom_kind: integración
description: Monitorizar Cassandra utilizando la funcionalidad nodetool
further_reading:
- link: https://www.datadoghq.com/blog/how-to-monitor-cassandra-performance-metrics
  tag: blog
  text: Monitorizar métricas de rendimiento de Cassandra
- link: https://www.datadoghq.com/blog/how-to-collect-cassandra-metrics
  tag: blog
  text: Recopilar métricas de Cassandra
- link: https://www.datadoghq.com/blog/monitoring-cassandra-with-datadog
  tag: blog
  text: Monitorizar Cassandra con Datadog
integration_version: 3.0.0
media: []
supported_os:
- linux
- macos
- windows
title: Cassandra Nodetool
---
![Dashboard por defecto de Cassandra](https://raw.githubusercontent.com/DataDog/integrations-core/master/cassandra_nodetool/images/cassandra_dashboard_2.png)

## Información general

Este check recopila métricas de tu clúster Cassandra que no están disponibles a través de la [integración jmx](https://github.com/DataDog/integrations-core/tree/master/cassandra). Utiliza la funcionalidad `nodetool` para recopilarlas.

## Configuración

### Instalación

El check de Cassandra Nodetool está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus nodos Cassandra.

### Configuración

Sigue las instrucciones de abajo para configurar este check para un Agent que se ejecuta en un host. En el caso de entornos en contenedores, consulta la sección [En contenedores](#containerized).

{{< tabs >}}

{{% tab "Host" %}}

#### host

1. Edita el archivo `cassandra_nodetool.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory). Consulta el [ejemplo cassandra_nodetool.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/cassandra_nodetool/datadog_checks/cassandra_nodetool/data/conf.yaml.example) para ver todas las opciones de configuración disponibles.

   ```yaml
   init_config:

   instances:
     ## @param keyspaces - list of string - required
     ## The list of keyspaces to monitor.
     ## An empty list results in no metrics being sent.
     #
     - keyspaces:
         - "<KEYSPACE_1>"
         - "<KEYSPACE_2>"
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

#### Recopilación de logs

Los logs de Cassandra Nodetool son recopilados por la integración de Cassandra. Consulta las [instrucciones de recopilación de logs de Cassandra](https://github.com/DataDog/integrations-core/tree/master/cassandra#log-collection.

{{% /tab %}}

{{% tab "En contenedores" %}}

#### En contenedores

Para entornos en contenedores, utiliza el [exportador [Prometheus](https://github.com/prometheus/jmx_exporter) oficial del pod y luego utiliza Autodiscovery en el Agent para buscar el pod y consultar el endpoint.

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de `status` del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `cassandra_nodetool` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **cassandra.nodetool.status.load** <br>(gauge) | Cantidad de datos del sistema de archivos en el directorio de datos Cassandra sin contenido de snapshots<br>_Se muestra en bytes_ |
| **cassandra.nodetool.status.owns** <br>(gauge) | Porcentaje de los datos propiedad del nodo por centro de datos multiplicado por el factor de replicación<br>_Se muestra como porcentaje_ |
| **cassandra.nodetool.status.replication_availability** <br>(gauge) | Porcentaje de datos disponibles por espacio de claves multiplicado por el factor de replicación<br>_Se muestra como porcentaje_ |
| **cassandra.nodetool.status.replication_factor** <br>(gauge) | Factor de replicación por espacio de claves|
| **cassandra.nodetool.status.status** <br>(gauge) | Estado del nodo: activo (1) o inactivo (0)|

### Eventos

El check de Cassandra Nodetool no incluye eventos.

### Checks de servicio

**cassandra.nodetool.node_up**

El Agent envía este check de servicio por cada nodo del clúster monitorizado. Devuelve CRITICAL si el nodo está fuera de servicio y devuelve OK en caso contrario.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Monitorizar métricas de rendimiento de Cassandra](https://www.datadoghq.com/blog/how-to-monitor-cassandra-performance-metrics)
- [Recopilar métricas de Cassandra](https://www.datadoghq.com/blog/how-to-collect-cassandra-metrics)
- [Monitorizar Cassandra con Datadog](https://www.datadoghq.com/blog/monitoring-cassandra-with-datadog)