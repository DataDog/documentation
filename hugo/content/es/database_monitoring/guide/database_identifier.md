---
aliases:
- /es/database_monitoring/database_identifier
description: Comprender cómo identificar tus bases de datos y hosts para DBM
further_reading:
- link: /database_monitoring/
  tag: Documentación
  text: Database Monitoring
- link: /database_monitoring/data_collected/
  tag: Documentación
  text: Datos recopilados
- link: /database_monitoring/troubleshooting/
  tag: Documentación
  text: Solucionar problemas
title: Identificación de bases de datos para Database Monitoring
---

## Identificador de la base de datos
Cada instancia de base de datos que monitoriza Datadog tiene un identificador único. Para Postgres, MySQL, SQL Server y Oracle, utiliza la ruta `database_identifier.template` en la configuración de integración para definir los identificadores de instancia.

El valor por defecto para `database_identifier.template` es `$resolved_hostname`, que utiliza el nombre de host resuelto del host de la base de datos como identificador. 
**Nota**: El nombre de host resuelto suele ser el mismo que el `host` de la conexión especificada. En otros casos, por ejemplo, si `host` se establece en`localhost`, `$resolved_hostname` se resuelve con el nombre de host real.

La mayoría de los usuarios no necesitan cambiar el valor por defecto. Cambiar el valor de `template` es útil principalmente cuando se alojan varias instancias de base de datos en una misma máquina.

Cada identificador de instancia distinto se factura como un host para Database Monitoring.

## Nombre de host notificado
La configuración de `reported_hostname` permite a los usuarios anular la resolución automática de `host` para una única instancia de base de datos. Esto es útil cuando se conecta a una base de datos a través de un proxy para mantener la asociación entre la instancia de base de datos de Database Monitoring y cualquier métrica disponible para el host de la base de datos.


## Ejemplos

Múltiples instancias de Postgres en un host, cada una en un puerto diferente:
```
database_identifier:
  template: $resolved_hostname:$port
```

Host de SQL Server con varias instancias:
```
database_identifier:
  template: $resolved_hostname/$instance_name
```

Grupo de Azure con cada base de datos monitorizada por separado ([requiere 7.68+](https://github.com/DataDog/integrations-core/blob/7.68.x/sqlserver/assets/configuration/spec.yaml#L101)):
```
database_identifier:
  template: $azure_name/$database
```

Un host de MySQL llamado `mydatabase.com.local` ejecutándose en múltiples entornos, donde cada uno está etiquetado con `env`, utilizaría la siguiente configuración para crear instancias de base de datos llamadas `prod-mydatabase.com.local` y `staging-mydatabase.com.local`:
```
database_identifier:
  template: $env-$resolved_hostname
```

Conexión a una base de datos de Oracle con múltiples CDBs a través de un proxy:
```
reported_hostname: my-oracle.mydomain.com
database_identifier:
  template: $resolved_hostname\$cdb_name
```