---
description: Conecte PostgreSQL a Datadog Data Observability para hacer un seguimiento
  de los esquemas, las dimensiones de las tablas y los volúmenes de filas.
further_reading:
- link: /data_observability/
  tag: Documentación
  text: Descripción general de Data Observability
- link: /monitors/types/data_observability/
  tag: Documentación
  text: Monitores de Data Observability
- link: /database_monitoring/setup_postgres/
  tag: Documentación
  text: Database Monitoring para PostgreSQL
- link: /remote_configuration/
  tag: Documentación
  text: Remote Configuration
title: PostgreSQL
---
{{< callout url="#" btn_hidden="true" header="Preview" >}}
Data Observability para PostgreSQL está en versión preliminar. Comuníquese con su representante de Datadog para habilitarlo en su organización.
{{< /callout >}}

## Descripción general {#overview}

La integración de PostgreSQL para Datadog Data Observability rastrea los metadatos de las tablas, proporcionando visibilidad de los esquemas, las dimensiones de las tablas y los volúmenes de filas en todo su entorno.

PostgreSQL se recopila a través del [Datadog Agent][1] en lugar de una conexión directa a la nube como las [integraciones de data warehouse][7]. Esta página cubre solo la configuración necesaria para Data Observability. Para configurar el conjunto completo de funciones de Database Monitoring, consulte la [guía de configuración de DBM para PostgreSQL][2].

## Requisitos previos {#prerequisites}

Antes de comenzar, asegúrese de tener:

- Datadog Agent `7.81.0` o posterior instalado en un servidor que pueda acceder a sus instancias de PostgreSQL. Consulte [Instalación del Agent][1] para su plataforma.
- [Remote Configuration][8] habilitada para su organización, en la clave de API que utiliza el Agent y en el propio Agent. Los seguimientos de la calidad de los datos se envían al Agent a través de Remote Configuration, por lo que, sin ella, sus tablas se sincronizan, pero los seguimientos nunca se ejecutan. Consulte [Habilitar Remote Configuration](#enable-remote-configuration).
- Acceso de superusuario a su instancia de PostgreSQL, para crear el usuario de Datadog y otorgar privilegios.
- Acceso a la versión preliminar habilitado para su organización por un representante de Datadog.

## Habilite Remote Configuration {#enable-remote-configuration}

Data Observability utiliza [Remote Configuration][8] para enviar consultas de seguimiento al Agent. Cuando crea un seguimiento de la calidad de los datos en Datadog, su consulta se envía al Agent que tiene a cargo la instancia, y la verificación de Postgres del Agent la ejecuta en su base de datos según el horario del seguimiento.

La recopilación de metadatos de tablas no depende de Remote Configuration. Si Remote Configuration no está disponible, sus tablas seguirán apareciendo en el catálogo, pero cualquier seguimiento que configure para ellas permanecerá vacío porque el Agent nunca recibe la consulta para ejecutarla.

Remote Configuration está activada de forma predeterminada en la mayoría de los entornos, pero debe habilitarse en los tres lugares siguientes. Confirme cada uno:

 - **Su organización.** En la página de configuración de [Remote Configuration][9], confirme que Remote Configuration esté habilitada. Habilitarla requiere el permiso [`org_management`][11].
 - **La clave de API del Agent.** La clave de API que utiliza el Agent debe tener la capacidad de Remote Configuration. Verifíquelo en la página [Claves de API][10]. Esto requiere el permiso [`api_keys_write`][12]. Un Agent que utiliza una clave sin esta capacidad informa un estado de `UNAUTHORIZED`.
 - **El Agent.** `remote_configuration.enabled` tiene como valor predeterminado `true` en el Agent `7.47.0` y versiones posteriores, por lo que normalmente no hay nada que cambiar. Establézcalo explícitamente en [`datadog.yaml`][13] (o a través de `DD_REMOTE_CONFIGURATION_ENABLED`) en dos casos:

   - Se configuró previamente como `false`.
   - El Agent informa a GovCloud (`ddog-gov.com`) o se ejecuta en modo FIPS. Remote Configuration está **deshabilitada de forma predeterminada** en esos entornos y no se activa a menos que usted la configure.

   ```yaml
   remote_configuration:
     enabled: true
   ```

   [Reinicie el Agent][5] después de cambiar esta configuración.

El estado de Remote Configuration de cada Agent también aparece en la página de configuración de [Remote Configuration][9]. Para obtener descripciones de estado y requisitos de red, consulte [Agent Remote Configuration status][14].

## ¿Ya utiliza Database Monitoring? {#already-using-database-monitoring}

Si [Database Monitoring][2] ya se está ejecutando en esta base de datos, la mayor parte de la configuración está lista: el usuario `datadog` existe y tiene `pg_monitor`. Todavía se necesitan tres cosas.

1. **Verifique la versión de su Agent.** Ejecute `datadog-agent status` y lea la versión del encabezado y de la línea de verificación de Postgres en la sección Collector:

   ```text
   Agent (v7.81.0)
   ...
     postgres (23.9.1)
   ```

   Si el Agent es anterior a `7.81.0`, [actualice el Agent][6]. Actualizar solo la verificación de Postgres con `datadog-agent integration install` no es suficiente: el controlador de Remote Configuration que entrega las consultas de seguimiento se incluye con el propio Agent, no con la verificación.

   Database Monitoring no requiere Remote Configuration, por lo que puede estar deshabilitada en un Agent que, por lo demás, funciona correctamente. Confirme que esté habilitada antes de continuar: consulte [Habilitar Remote Configuration](#enable-remote-configuration).

2. **Otorgue `SELECT` sobre sus datos.** Database Monitoring otorga `pg_monitor` y `USAGE` en el esquema `public`, pero no otorga `SELECT` sobre sus tablas. Data Observability lo necesita para calcular recuentos de filas, métricas a nivel de columna y resultados de SQL personalizados. Ejecute las instrucciones para otorgar permisos en [Configurar el usuario de base de datos de Datadog](#set-up-the-datadog-database-user) para cada esquema de cada base de datos de la que desee hacer un seguimiento, pero omita el paso `CREATE USER`.

3. **Habilite el trabajo de Data Observability.** Agregue lo siguiente a cada instancia existente en `conf.d/postgres.d/conf.yaml`, manteniendo `dbm: true` en su lugar:

   ```yaml
   data_observability:
     enabled: true
   ```

   Si su instancia ya utiliza `database_autodiscovery`, Data Observability detecta cada base de datos descubierta, así que asegúrese de que los permisos `SELECT` las cubran todas.

[Reinicie el Agent][5] para aplicar los cambios, luego continúe desde [Explorar los metadatos de su tabla](#explore-your-table-metadata).

## Configurar el usuario de base de datos de Datadog {#set-up-the-datadog-database-user}

1. Conéctese a su base de datos como superusuario y cree un usuario dedicado:

   ```sql
   CREATE USER datadog WITH PASSWORD '<SECURE_PASSWORD>';
   GRANT pg_monitor TO datadog;
   GRANT SELECT ON pg_stat_database TO datadog;
   ```

2. Conéctese a cada base de datos de la que desee hacer un seguimiento (usando `\c my_database` en `psql`) y otorgue acceso de lectura a sus esquemas:

   ```sql
   GRANT USAGE ON SCHEMA "<YOUR_SCHEMA>" TO datadog;
   GRANT SELECT ON ALL TABLES IN SCHEMA "<YOUR_SCHEMA>" TO datadog;

   -- Automatically apply read access to tables created later by <TABLE_OWNER_ROLE>
   ALTER DEFAULT PRIVILEGES FOR ROLE <TABLE_OWNER_ROLE> IN SCHEMA "<YOUR_SCHEMA>"
     GRANT SELECT ON TABLES TO datadog;
   ```

   `ALTER DEFAULT PRIVILEGES` solo afecta a las tablas creadas por el rol nombrado en `FOR ROLE`. Ejecútelo una vez para **cada rol que cree tablas** en el esquema; de lo contrario, Data Observability pierde el acceso a las nuevas tablas a medida que su aplicación las crea. Para listar los roles que poseen tablas en un esquema:

   ```sql
   SELECT DISTINCT tableowner FROM pg_tables WHERE schemaname = '<YOUR_SCHEMA>';
   ```

   Los permisos de esquema y tabla son específicos de la base de datos. Vuelva a ejecutar estos comandos para **cada base de datos** y cada esquema de los que desee hacer un seguimiento.

### Restringir a tablas específicas (opcional) {#restrict-to-specific-tables-optional}

Para limitar la recopilación a un subconjunto de tablas, otorgue permisos específicos en lugar de `ALL TABLES IN SCHEMA`:

```sql
GRANT USAGE ON SCHEMA "<YOUR_SCHEMA>" TO datadog;
GRANT SELECT ON "<YOUR_SCHEMA>"."orders" TO datadog;
GRANT SELECT ON "<YOUR_SCHEMA>"."users" TO datadog;
```

Data Observability solo muestra las tablas donde el usuario `datadog` tiene privilegios `SELECT` explícitos.

## Configure la integración de PostgreSQL {#configure-the-postgresql-integration}

Edite el archivo `conf.d/postgres.d/conf.yaml` del Agent y agregue una instancia para cada servidor PostgreSQL al que desee hacer un seguimiento. Para obtener una lista completa de las opciones de configuración, consulte el [ejemplo de postgres.d/conf.yaml][4].

{{< tabs >}}
{{% tab "Todas las bases de datos en el servidor" %}}

Habilite `database_autodiscovery` para recopilar metadatos de cada base de datos de usuario en el servidor:

```yaml
init_config:
instances:
  - host: <POSTGRES_HOST>
    port: 5432
    username: datadog
    password: '<SECURE_PASSWORD>'

    database_autodiscovery:
      enabled: true

    ## Required for Data Observability
    data_observability:
      enabled: true
```

{{% /tab %}}
{{% tab "Una sola base de datos" %}}

Establezca `dbname` para recopilar metadatos de una sola base de datos:

```yaml
init_config:
instances:
  - host: <POSTGRES_HOST>
    port: 5432
    username: datadog
    password: '<SECURE_PASSWORD>'
    dbname: <DATABASE_NAME>

    ## Required for Data Observability
    data_observability:
      enabled: true
```

{{% /tab %}}
{{< /tabs >}}

**Nota**: Si su contraseña incluye caracteres especiales, enciérrela entre comillas simples.

La recopilación de esquemas (`collect_schemas`) está habilitada de forma predeterminada y es lo que completa sus tablas en Data Observability. `dbm: true` **no** es necesario para Data Observability; configúrelo solo si también utiliza [Database Monitoring][2].

[Reinicie el Agent][5] para aplicar los cambios:

```shell
sudo systemctl restart datadog-agent
```

### Valide la configuración {#validate-the-configuration}

Confirme que la verificación se está ejecutando:

```shell
sudo datadog-agent status | grep -A 20 'postgres'
```

El resultado debe mostrar la verificación `postgres` con un recuento `Total Runs` mayor que cero y una marca de tiempo `Last Successful Execution` reciente.

Confirme que el Agent está recibiendo Remote Configuration. La sección `Remote Configuration` del estado del Agent informa directamente sobre las verificaciones de la organización y la clave de API:

```shell
sudo datadog-agent status | grep -A 10 'Remote Configuration'
```

Un Agent en buen estado informa:

```text
====================
Remote Configuration
====================
  Organization enabled: True
  API Key: Authorized
  Last error: None
```

Cualquier otro estado corresponde a una de las tres verificaciones de [Habilitar Remote Configuration](#enable-remote-configuration):

- `Organization enabled: False`: habilite Remote Configuration para su organización.
- `API Key: Not authorized`: agregue la capacidad de Remote Configuration a la clave de API que utiliza este Agent.
- `Remote Configuration is disabled because ...`: está desactivada en el propio Agent.

Hasta que esta sección indique un estado correcto, sus tablas seguirán sincronizándose, pero sus seguimientos no podrán ejecutarse.

## Explore los metadatos de su tabla {#explore-your-table-metadata}

Espere aproximadamente una hora para que se complete la recopilación inicial de metadatos. Luego puede [visualizar sus tablas de PostgreSQL][3] en el catálogo de Data Observability.

Si sus tablas no aparecen, verifique que:

1. `sudo datadog-agent status` muestra que la verificación `postgres` informa los resultados correctamente.
2. El usuario `datadog` tiene privilegios `SELECT` en las tablas de destino. Pruebe con:

   ```shell
   psql -U datadog -d <DATABASE_NAME> -c 'SELECT 1 FROM <YOUR_SCHEMA>.orders LIMIT 1'
   ```

3. Un representante de Datadog ha habilitado el acceso a Preview para su organización.

## Cree seguimientos de calidad de datos {#create-data-quality-monitors}

Después de que sus tablas aparezcan en el catálogo, puede configurar alertas sobre su estado.

Navegue a una tabla en el [Data Observability catalog][3], seleccione la pestaña {{< ui >}}Monitors{{< /ui >}} y haga clic en {{< ui >}}Add Monitor{{< /ui >}}. En Preview, puede crear:

- **Recuento de filas**: Configure alertas sobre fluctuaciones de volumen, como caídas repentinas o tendencias de estancamiento.
- **Métricas a nivel de columna**: Haga un seguimiento de atributos de columna como proporciones de nulos, cardinalidades o cambios en la distribución.
- **SQL personalizado**: Configure alertas sobre cualquier consulta `SELECT`. La consulta debe devolver exactamente un valor numérico con el alias `dd_value`.

Los seguimientos se ejecutan según el horario de recopilación. Mantenga los privilegios `SELECT` para el usuario `datadog` en todas las tablas referenciadas; los seguimientos fallan si se revoca el acceso.

Si un seguimiento no informa datos, verifique que [Remote Configuration](#enable-remote-configuration) esté habilitado para su organización, para la clave de API del Agent y en el propio Agent. El Agent no puede recibir consultas de seguimiento si no lo está.

## Limitaciones conocidas {#known-limitations}

Data Observability enumera todas las tablas de PostgreSQL de las instancias donde `dbm` y `collect_schemas` están habilitados, incluidas las instancias que no tienen `data_observability.enabled: true`. Programar un seguimiento en una de esas bases de datos produce un seguimiento sin datos. Si sus tablas aparecen en la lista pero sus seguimientos permanecen vacíos:

- Siga [¿Ya usa Database Monitoring?](#already-using-database-monitoring) para habilitar el trabajo y otorgar los privilegios `SELECT` requeridos.
- Confirme que [Remote Configuration](#enable-remote-configuration) esté habilitado. Las listas de tablas no dependen de que esté habilitado, pero las consultas de seguimiento sí.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/
[2]: /es/database_monitoring/setup_postgres/
[3]: https://app.datadoghq.com/datasets/catalog?integration=postgres
[4]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[5]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[6]: /es/agent/guide/upgrade_agent_fleet_automation/
[7]: /es/data_observability/quality_monitoring/data_warehouses/
[8]: /es/remote_configuration/
[9]: https://app.datadoghq.com/organization-settings/remote-config
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: /es/account_management/rbac/permissions/#permissions-list
[12]: /es/account_management/rbac/permissions/#permissions-list
[13]: /es/agent/configuration/agent-configuration-files/#main-configuration-file
[14]: /es/agent/guide/setup_remote_config/#agent-remote-configuration-status