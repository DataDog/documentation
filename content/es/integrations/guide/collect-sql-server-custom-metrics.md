---
aliases:
- /es/integrations/faq/how-to-collect-metrics-with-sql-stored-procedure/
further_reading:
- link: /integrations/mysql/
  tag: Documentación
  text: Integración de MySQL con Datadog
title: Recopilar las métricas personalizadas de SQL Server
---

En esta guía te explicamos cómo recopilar métricas personalizadas de SQL Server.

## Consultas personalizadas

Para recopilar métricas personalizadas más complejas con la integración SQL Server, utiliza la opción `custom_queries` del archivo `conf.d/sqlserver.d/conf.yaml` en la raíz del [directorio de configuración del Agent][5]. Consulta el ejemplo [sqlserver.d/conf.yaml][6] para obtener más información.

### Configuración

Estas son las opciones de configuración de las `custom_queries`:

| Opción        | Obligatorio | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|---------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| query         | Sí      | El SQL que se va a ejecutar. Puede ser una instrucción simple o un script de varias líneas. Se evalúan todas las filas de los resultados. Usa el carácter de barra vertical (`\|`) si necesitas un script de varias líneas.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| columns       | Sí      | Una lista que representa cada columna ordenada de forma secuencial de izquierda a derecha.<br><br>Hay dos datos necesarios:<br>  - **`name`**: el sufijo que hay que anexar a `metric_prefix` para formar el nombre completo de la métrica. Si `type` se especifica como `tag`, la columna se aplica como etiqueta a las métricas que recoge esta consulta.<br>  - **`type`**: el método de envío (`gauge`, `count`, `rate`, etc.). También puede configurarse como `tag` para etiquetar las métricas de la fila con el nombre y el valor (`<name>:<row_value>`) del elemento en esta columna. |
| tags          | No       | Una lista de etiquetas (tags) estáticas que pueden aplicarse a las métricas.


- Al menos uno de los elementos definidos en `columns` debería ser un tipo de métrica (`gauge`, `count`, `rate`, etc.).
- La cantidad de elementos definidos en `columns` debe ser igual a la cantidad de columnas que devuelve la consulta.
- El orden en el que se definen los elementos en `columns` debe ser igual al que devuelve la consulta.

  ```yaml
  custom_queries:
    - query: Select F3, F2, F1 from Table;
      columns:
        - {name: f3_metric_alias, type: gauge}
        - {name: f2_tagkey      , type: tag  }
        - {name: f1_metric_alias, type: count}
      [...]
  ```

### Ejemplo

A continuación se muestra una tabla `company` de una base de datos `testdb`. La tabla contiene tres registros de empleados:

```text
testdb=# SELECT * FROM company;

id| name  | age| address    |salary | entry_date | last_raise_time
-------------------------------------------------------------------
1 | Paul  | 32 | California | 20000 | 1457570000 | 1457570300
2 | Allen | 25 | Texas      | 30000 | 1457570060 | 1457570300
3 | Teddy | 23 | Norway     | 45000 | 1457570120 | 1457570300
```

La siguiente consulta SQL muestra la edad y el salario de Paul como valores de métrica, con su nombre y su dirección como etiquetas.

```text
SELECT age,salary,name,address FROM company WHERE name = 'Paul'
```

Configuración YAML de las `custom_queries` correspondientes:

```yaml
custom_queries:
  - query: SELECT age,salary,name,address FROM company WHERE name = 'Paul'
    columns:
      - name: employee_age
        type: gauge
      - name: employee_salary
        type: gauge
      - name: name
        type: tag
      - name: localisation
        type: tag
    tags:
      - 'query:custom'
```

Cuando tengas el archivo YAML del SQL Server actualizado, [reinicia el Datadog Agent][7].

#### Validación

Para verificar tus resultados, busca las métricas utilizando [Metrics Explorer][8].

#### Depuración

[Ejecuta el subcomando de estado del Agent][9] y busca `sqlserver` en la sección Checks:

```text
sqlserver
--------
  - instance #0 [ERROR]: 'Missing query parameter in custom_queries'
  - Collected 0 metrics, 0 events & 0 service checks
```

Además, los [logs del Agent][10] pueden aportar información útil.

## Recopilar métricas de Contadores de rendimiento

Por omisión, el [check del servidor Datadog-SQL][1] solo capta *algunas* de las métricas disponibles en la tabla `sys.dm_os_performance_counters`.

A continuación, encontrarás un ejemplo de una colección de métricas básica de los contadores de rendimiento. **Nota**: Puedes especificar `tags` opcionales para que se envíen con tus métricas:

```yaml
custom_metrics:
  - name: sqlserver.clr.execution
    counter_name: CLR Execution
    tags:
      - tag_name:value
```

Descripciones de parámetros:

| Parámetro      | Descripción                                           |
|----------------|-------------------------------------------------------|
| `name`         | El nombre de tu métrica dentro de Datadog.                   |
| `counter_name` | El nombre del contador de [objetos de base de datos del servidor SQL][2]. |
| `tags`         | Una lista de las etiquetas con el formato key:value.                        |

Si un contador tiene varias instancias asociadas con él, puedes elegir capturar una única instancia con el nombre de parámetro `instance_name`:

```yaml
custom_metrics:
  - name: sqlserver.exec.in_progress
    counter_name: OLEDB calls
    instance_name: Cumulative execution time (ms) per second
```

Para obtener resultados más exhaustivos, utiliza `object_name` en tu consulta:

```yaml
custom_metrics:
- name: sqlserver.cache.hit_ratio
  counter_name: Cache Hit Ratio
  instance_name: SQL Plans
  object_name: SQLServer:Plan Cache
```

Para recopilar todas las instancias de un contador con varias instancias, utiliza el valor especial, que distingue entre mayúsculas y minúsculas, `ALL` para el parámetro `instance_name` que **requiere** un valor para el parámetro `tag_by`. Este ejemplo etiqueta las métricas como `db:mydb1`, `db:mydb2`:

```yaml
custom_metrics:
  - name: sqlserver.db.commit_table_entries
    counter_name: Commit table entries
    instance_name: ALL
    tag_by: db
```

La tabla predeterminada de la que se sacan los contadores es`sys.dm_os_performance_counters`. El check del servidor Datadog-SQL también es compatible con `sys.dm_os_wait_stats`, `sys.dm_os_memory_clerks` y `sys.dm_io_virtual_file_stats`.

Para notificar una métrica sacada de una de las tablas adicionales, especifica la tabla en la definición del contador con el parámetro `table`, además de las columnas del contador que tengas que notificar con el parámetro `columns`:

```yaml
custom_metrics:
  - name: sqlserver.LCK_M_S
    table: sys.dm_os_wait_stats
    counter_name: LCK_M_S
    columns:
      - max_wait_time_ms
      - signal_wait_time_ms

```

El ejemplo anterior notifica dos métricas, `sqlserver.LCK_M_S.max_wait_time.ms` y  `sqlserver.LCK_M_S.signal_wait_time_ms`.

**Nota**: Si las métricas como `sys.dm_io_virtual_file_stats` y  `sys.dm_os_memory_clerks` no están asociadas con un `counter_name`, solo hay que especificar las columnas:

```yaml
custom_metrics:
  - name: sqlserver.io_file_stats
    table: sys.dm_io_virtual_file_stats
    columns:
      - num_of_reads
      - num_of_writes
```

El ejemplo anterior notifica dos métricas, `sqlserver.io_file_stats.num_of_reads` y `sqlserver.io_file_stats.num_of_writes` cada una etiquetadas con el ID de base de datos y el ID de archivo.

## Recopilar las métricas de un procedimiento personalizado (legacy)

Este es el método antiguo (legacy) para recopilar métricas personalizadas de la base de datos. Se recomienda usar el parámetro `custom_queries`, más fácil de configurar, más flexible en los tipos de T-SQL que se pueden ejecutar y más sencillo para depurar los errores. Recopilar métricas de un procedimiento personalizado genera un gran volumen de métricas personalizadas que puede afectar a tu facturación.

### Configurar un procedimiento guardado

Debes configurar una tabla temporal para recopilar las métricas personalizadas que hay que notificar a Datadog. La tabla necesita las siguientes columnas:

| Columna   | Descripción                                               |
|----------|-----------------------------------------------------------|
| `metric` | El nombre de la métrica como aparece en Datadog.          |
| `type`   | El [tipo de métrica][3] (gauge, rate, o [histogram][4]).    |
| `value`  | El valor de la métrica (debe poder convertirse a float). |
| `tags`   | Las etiquetas que aparecen en Datadog separadas por comas.     |

El siguiente procedimiento almacenado se crea dentro de la base de datos principal:

```text
-- Create a stored procedure with the name <PROCEDURE_NAME>
CREATE PROCEDURE [dbo].[<PROCEDURE_NAME>]
AS
BEGIN

  -- Create a temporary table
  CREATE TABLE #DataDog
  (
    [metric] varchar(255) not null,
    [type] varchar(50) not null,
    [value] float not null,
    [tags] varchar(255)
  )

  -- Remove row counts from result sets
  SET NOCOUNT ON;

  -- Create variable count and set it equal to the number of User Connections
  DECLARE @count float;
  SET @count = (select cntr_value from sys.dm_os_performance_counters where counter_name = 'User Connections');

  -- Insert any custom metrics into the table #Datadog
  INSERT INTO #Datadog (metric, type, value, tags)
  VALUES ('sql.test.test', 'gauge', @count, 'db:master,env:staging')
        ,('sql.test.gauge', 'gauge', FLOOR(RAND()*20), 'tag:test')
        ,('sql.test.rate', 'rate', FLOOR(RAND()*20), 'metric:gauge')
        ,('sql.test.histogram', 'histogram', FLOOR(RAND()*20), 'metric:histogram')
  SELECT * from #DataDog
END
GO

-- Grant permission to run the stored procedure
GRANT EXECUTE ON [dbo].[<PROCEDURE_NAME>] To Public
GO
```

El procedimiento almacenado genera las siguientes métricas personalizadas:

* `sql.test.test`
* `sql.test.gauge`
* `sql.test.rate`
* `sql.test.histogram.95percentile`
* `sql.test.histogram.avg`
* `sql.test.histogram.count`
* `sql.test.histogram.max`
* `sql.test.histogram.median`

### Actualizar la configuración de la integración SQL Server

Para recopilar métricas de un procedimiento personalizado, crea una nueva definición de instancia dentro de tu archivo `sqlserver.d/conf.yaml` con el procedimiento que hay que ejecutar. Se necesita una instancia independiente para una configuración existente. Las instancias con un procedimiento almacenado no procesan nada excepto el dicho procedimiento, por ejemplo:

```yaml
  - host: 127.0.0.1,1433
    username: datadog
    password: "<PASSWORD>"
    database: master
  - host: 127.0.0.1,1433
    username: datadog
    password: "<PASSWORD>"
    stored_procedure: "<PROCEDURE_NAME>"
    database: master
```

También puedes especificar:

| Parámetro                 | Descripción                                                                               | Predeterminado            |
|---------------------------|-------------------------------------------------------------------------------------------|--------------------|
| `ignore_missing_database` | Si la base de datos especificada no existe en el servidor, no ejecutes el check.                  | `False`            |
| `proc_only_if`            | Ejecuta este SQL antes de llamar al `stored_procedure`. Si devuelve 1, realiza la llamada al procedimiento. |                    |
| `proc_only_if_database`   | La base de datos en la que se ejecuta `proc_only_if` SQL.                                            | atributo de base de datos |

**Nota**: La condición de protección `proc_only_if` es útil para casos de alta disponibilidad en los que una base de datos se puede mover entre servidores.

### Solucionar problemas

Si tus métricas personalizadas no aparecen en Datadog, comprueba el archivo de logs del Agent. Si encuentras el siguiente error: `Could not call procedure <PROCEDURE_NAME>: You must supply -1 parameters for this stored procedure`, podría deberse a uno de los siguientes problemas:

* El `<PROCEDURE_NAME>` se ha escrito de forma incorrecta.
* El nombre de usuario de la base de datos que se especifica en la configuración puede no tener permiso para ejecutar el procedimiento almacenado.



## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/sqlserver/
[2]: https://docs.microsoft.com/en-us/sql/relational-databases/performance-monitor/sql-server-databases-object
[3]: /es/metrics/#metric-types
[4]: /es/metrics/types/?tab=histogram#metric-types
[5]: /es/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[7]: /es/agent/guide/agent-commands/#restart-the-agent
[8]: /es/metrics/explorer/
[9]: /es/agent/guide/agent-commands/#agent-status-and-information
[10]: /es/agent/guide/agent-log-files