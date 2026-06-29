---
title: Actualización a PostgreSQL 15 y posterior
---

Ejecuta este comando en cada host de base de datos para habilitar el permiso adicional necesario para el usuario `datadog`:

```SQL
ALTER ROLE datadog INHERIT;
```

{{< tabs >}}
{{% tab "RDS" %}}
Las versiones del Agent anteriores a `7.49` pueden no ser capaces de conectarse a instancias RDS de PostgreSQL sin un cambio en configuración. Las nuevas instancias RDS tienen un valor por defecto de `1` para el parámetro `rds.force_ssl`. En las versiones del Agent anteriores a `7.49`, esto causa el siguiente error cuando el Agent intenta emitir consultas:

```
FATAL:  no pg_hba.conf entry for host "HOSTNAME", user "datadog", database "postgres", no encryption
```

Para permitir que el Agent se conecte con SSL, añade el siguiente ajuste a cada configuración de instancia en la que se especifique `host` y `port`:

```yaml
ssl: allow
```

Reinicia el Agent después de aplicar este cambio.
{{% /tab %}}
{{% tab "Google Cloud SQL" %}}
Las versiones del Agent anteriores a `7.50` pueden intentar conectarse a la base de datos `cloudsqladmin`. Esto puede provocar logs de error en la base de datos, así como logs de advertencia en el Agent. Para silenciar esos logs, añade `cloudsqladmin` a la lista [ignore_databases][1]:

```yaml
ignore_databases:
  - template%
  - rdsadmin
  - azure_maintenance
  - cloudsqladmin
```

Si utilizas [Autodiscovery de base de datos][2], añade también `cloudsqladmin` a [bases de datos excluidas][3]:

```yaml
  exclude:
   - cloudsqladmin
```
[1]: https://github.com/DataDog/integrations-core/blob/7.49.x/postgres/datadog_checks/postgres/data/conf.yaml.example#L56-L64
[2]: https://github.com/DataDog/integrations-core/blob/7.49.x/postgres/datadog_checks/postgres/data/conf.yaml.example#L250
[3]: https://github.com/DataDog/integrations-core/blob/7.49.x/postgres/datadog_checks/postgres/data/conf.yaml.example#L277-L279
{{% /tab %}}
{{< /tabs >}}