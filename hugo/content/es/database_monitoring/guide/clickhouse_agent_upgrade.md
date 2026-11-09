---
aliases:
- /es/database_monitoring/clickhouse_agent_upgrade
further_reading:
- link: /database_monitoring/
  tag: Documentación
  text: Database Monitoring
- link: /database_monitoring/setup_clickhouse/
  tag: Documentación
  text: Configuración de ClickHouse
- link: /database_monitoring/troubleshooting/
  tag: Documentación
  text: Solución de problemas de Database Monitoring
title: Actualización de la integración de ClickHouse desde versiones del Agent anteriores
  a la 7.84
---
## Descripción general {#overview}

Database Monitoring para ClickHouse requiere Datadog Agent 7.84 o posterior. Si configuró la integración con una versión anterior del Agent, siga esta guía para actualizar.

A partir de la versión 7.84 del Agent, Database Monitoring para ClickHouse muestra qué nodo de su clúster ejecutó cada consulta. Las métricas de consulta, las muestras de consulta, las consultas completadas y los errores de consulta se etiquetan con el nodo que los atendió, por lo que puede:

- Compare el rendimiento de la misma consulta entre nodos.
- Encuentre el nodo responsable de una consulta lenta o fallida.
- Detecte una carga desigual entre los nodos de un clúster.

Para identificar los nodos, el Agent también informa el clúster al que pertenece cada instancia y si se ejecuta en ClickHouse Cloud o si es autohospedada. Esta información se agrega como las siguientes etiquetas:

| Etiqueta | Descripción |
|---|---|
| `clickhouse_node` | El nodo que ejecutó la consulta. |
| `clickhouse_cluster` | El clúster de ClickHouse al que pertenece la instancia. |
| `hosting_type` | `clickhouse-cloud` o `self-hosted`. |

El Agent lee esta información de las tablas del sistema de ClickHouse a las que las instrucciones de configuración anteriores no otorgaban acceso. Si configuró la integración con una versión del Agent anterior a la 7.84, otorgue los permisos adicionales a continuación antes de actualizar el Agent. El Agent solo detecta los nuevos permisos cuando se inicia, por lo que si los otorga después de actualizar, [reinicie el Agent](#restart-the-agent).

## Otorgue los permisos adicionales {#grant-the-additional-permissions}

Conéctese a ClickHouse como administrador y ejecute las siguientes sentencias. Si su usuario de monitoreo no se llama `datadog`, reemplácelo con el nombre de su usuario.

```sql
GRANT SELECT ON system.macros TO datadog;
GRANT SELECT ON system.clusters TO datadog;
GRANT SELECT ON system.settings TO datadog;
GRANT SELECT ON system.table_engines TO datadog;
GRANT SELECT ON system.one TO datadog;
GRANT REMOTE ON *.* TO datadog;
```

## Reinicie el Agent {#restart-the-agent}

El Agent busca el clúster una vez cuando se inicia y sigue usando ese resultado hasta que se reinicia. Si aplicó los permisos antes de actualizar, la actualización reinicia el Agent y no se necesita ninguna acción adicional. Si los aplicó después de actualizar, [reinicie el Agent][1].

## Verifique la actualización {#verify-the-upgrade}

Después de que el Agent se reinicie, abra la instancia de ClickHouse en [Database Monitoring][2] y confirme que:

- Los datos de consulta están etiquetados con `clickhouse_node`.
- La etiqueta `hosting_type` es `clickhouse-cloud` para un servicio de ClickHouse Cloud, o `self-hosted` para cualquier otra implementación.

Si falta la etiqueta `clickhouse_node`:

- Ejecute el [comando de estado del Agent][3] y revise la verificación de ClickHouse en busca de errores de permisos.
- Confirme que los permisos anteriores se apliquen al usuario con el que se conecta el Agent, en cada nodo.
- Confirme que su clúster defina una macro `{cluster}` o una entrada `<remote_servers>` que incluya el nodo al que se conecta el Agent. Si no se ha configurado ninguna, el Agent no puede identificar el clúster y la etiqueta `clickhouse_cluster` no se reporta.

Si la etiqueta `hosting_type` es `unknown`, el Agent no pudo leer `system.settings` o `system.table_engines`. Confirme que las sentencias `GRANT SELECT` para ambas tablas se apliquen, luego [reinicie el Agent][1].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/configuration/agent-commands/#restart-the-agent
[2]: https://app.datadoghq.com/databases
[3]: /es/agent/configuration/agent-commands/#agent-status-and-information