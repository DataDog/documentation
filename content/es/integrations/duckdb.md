---
app_id: duckdb
categories:
- métricas
custom_kind: integración
description: Integración para DuckDB
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: DuckDB
---
## Información general

DuckDB es un sistema de bases de datos analíticas de alto rendimiento. Está disponible como aplicación de CLI independiente y dispone de clientes para Python, R, Java, Wasm, etc., con amplias integraciones con paquetes como pandas y dplyr.

Para más información sobre el uso de DuckDB, consulta la [documentación de DuckDB](https://duckdb.org/docs/).

Este check monitoriza [DuckDB](https://docs.datadoghq.com/integrations/duckdb/) a través del Datadog Agent.

## Configuración

DuckDB tiene dos opciones configurables para la concurrencia:

- Un proceso puede tanto leer como escribir en la base de datos.
- Varios procesos pueden leer de la base de datos, pero ningún proceso puede escribir (access_mode = 'READ_ONLY').

<div class="alert alert-warning">
El Datadog Agent utiliza el modo <code>read_only</code> para obtener métricas, con una frecuencia por defecto de 60 segundos (<code>min_collection_interval</code>). 
Puedes aumentar este valor para reducir los problemas de concurrencia.
</div>

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de DuckDB se incluye en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).
No es necesaria ninguna instalación adicional en tu servidor.

#### Dependencias

Se necesita la biblioteca de cliente [duckdb](https://pypi.org/project/duckdb/). Para instalarla, asegúrate de que tienes un compilador operativo y ejecútalo:

##### Unix

```text
sudo -Hu dd-agent /opt/datadog-agent/embedded/bin/pip install duckdb==1.1.1
```

##### Windows

```text
"C:\Program Files\Datadog\Datadog Agent\embedded3\python.exe" -m pip install duckdb==1.1.1
```

### Configuración

1. Edita el archivo `duckdb.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para comenzar a recopilar tus datos de rendimiento de duckdb. Ve el [duckdb.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/duckdb/datadog_checks/duckdb/data/conf.yaml.example) para todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `duckdb` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **duckdb.memory_limit** <br>(gauge) | La memoria máxima del sistema.<br>_Se muestra como byte_ |
| **duckdb.partitioned_write_flush_threshold** <br>(gauge) | El umbral en número de filas después del cual se vacía el estado de un subproceso cuando se escribe usando PARTITION_BY.|
| **duckdb.partitioned_write_max_open_files** <br>(gauge) | La cantidad máxima de archivos que el sistema puede mantener abiertos antes de volcarlos al disco cuando se escribe usando PARTITION_BY.|
| **duckdb.wal_autocheckpoint** <br>(gauge) | El umbral de tamaño de WAL a partir del cual se activa automáticamente un punto de check.<br>_Se muestra como byte_ |
| **duckdb.worker_threads** <br>(gauge) | El número total de subprocesos utilizados por el sistema.|

### Eventos

La integración de DuckDB no incluye ningún evento.

### Checks de servicio

La integración de DuckDB no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).