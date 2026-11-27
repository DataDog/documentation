---
description: Solucione problemas de la configuración de Database Monitoring para SQL
  Server
title: Solución de problemas de la configuración de DBM para SQL Server
---
Esta página detalla problemas comunes con la configuración y el uso de Database Monitoring con SQL Server y cómo resolverlos. Datadog recomienda mantenerse en la versión estable más reciente del Agent y seguir la [documentación de configuración][1] más reciente, ya que puede cambiar con las versiones del Agent.

## Valide su configuración con el comando diagnose del Agent {#agent-diagnose}

A partir del Agent v7.81.0, la integración de SQL Server valida su configuración a través del [comando diagnose][15] del Agent. Para cada instancia configurada, el comando verifica si:

- El Agent puede conectarse a SQL Server
- El controlador ODBC configurado está instalado
- La versión de SQL Server es compatible
- El Agent tiene los permisos que requiere Database Monitoring, incluidos `VIEW SERVER STATE`, `CONNECT ANY DATABASE`, `VIEW ANY DEFINITION`, acceso a cada base de datos monitoreada y `SELECT` en `msdb`

Ejecute la suite de diagnóstico `check-datadog`:

{{< tabs >}}
{{% tab "Windows" %}}

Desde un símbolo del sistema de PowerShell con privilegios elevados:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" diagnose --include check-datadog
```

{{% /tab %}}
{{% tab "Linux" %}}

```shell
sudo datadog-agent diagnose --include check-datadog
```

{{% /tab %}}
{{< /tabs >}}

De forma predeterminada, el comando ejecuta los diagnósticos dentro del servicio del Agent en ejecución, como la cuenta de servicio del Agent. El comando `agent.exe check sqlserver` se conecta como el usuario que inició sesión, por lo que el comando diagnose es la forma recomendada de probar la autenticación de Windows. Para la configuración de la autenticación de Windows, consulte la sección [Login Failed for user](#login-failed-for-user).

**Nota**: Si el comando no puede comunicarse con el servicio del Agent, imprime `Error running diagnose in Agent process` y ejecuta los diagnósticos como el usuario actual. La bandera `--local` también los ejecuta como el usuario actual. En ambos casos, los resultados no reflejan el acceso de la cuenta de servicio del Agent.

## Diagnóstico de problemas de conexión comunes {#common-connection-issues}

### SQL Server no puede conectarse: 'Login Failed for user' {#login-failed-for-user}

Hay dos formas en las que el Agent puede conectarse a una instancia de SQL Server:

1. [Autenticación de Windows][2] (solo disponible en servidores Windows)

2. [Autenticación de SQL Server][3]

La autenticación de Windows es el modo de autenticación predeterminado y es más segura que la autenticación de SQL Server. Al usar la autenticación de Windows, se pueden crear grupos de Windows a nivel de dominio y se puede crear un inicio de sesión en SQL Server para todo el grupo. Para usar la autenticación de Windows, usted debe:

1. Use la cuenta de servicio creada al momento de la [instalación del Agent][4] y asegúrese de que esta cuenta tenga el acceso adecuado a SQL Server.

2. Establezca `connection_string: "Trusted_Connection=yes"` y omita los campos `username` y `password`. El atributo de conexión `Trusted_Connection=yes` indica al controlador OLE DB para SQL Server que utilice la autenticación de Windows para la validación del inicio de sesión.

La autenticación de SQL Server no se basa en cuentas de usuario de Windows; las cuentas se crean en la instancia y se almacenan en SQL Server. La autenticación de SQL requiere configurar `username` y `password` en la configuración de la instancia de SQL Server para conectarse.

Si recibe un error de inicio de sesión al conectarse, es importante verificar primero que puede iniciar sesión en la instancia como el usuario del Agent de Datadog. Una forma sencilla de hacerlo es mediante una utilidad de línea de comandos como `sqlcmd`.

Por ejemplo:

```bash
# this example uses SQL Authentication
sqlcmd -S <INSTANCE_ENDPOINT> -U datadog -P <DATADOG_PASSWORD> -d master

# this example uses Windows Authentication
# Run this command in powershell via selecting the `run as user...` option to run as the ddagentuser
sqlcmd -S <INSTANCE_ENDPOINT> -d master -E
```

Si el usuario `datadog` no puede iniciar sesión en la instancia de SQL Server, verifique que el usuario exista. Luego, verifique que tenga los permisos enumerados en la [documentación de configuración][1]. Para probar la conexión y los permisos como la cuenta de servicio del Agent, ejecute el comando diagnose del Agent descrito en la sección [Valide su configuración con el comando diagnose del Agent](#agent-diagnose). La autenticación de Windows es compatible cuando el Agent se conecta a una instancia de SQL Server que se ejecuta en el mismo servidor que el Agent.

Microsoft también proporciona un documento útil sobre la solución de problemas de este tipo de errores, que puede [consultarse aquí][5].

### Error de conexión TCP de SQL Server {#tcp-connection-error}

Los problemas de conexión TCP son comunes cuando hay una configuración incorrecta del Agent. Los mensajes de error proporcionados por el controlador no siempre son claros.

Por ejemplo, el siguiente error se debe a que la conexión TCP falló:

```bash
TCP-connection(ERROR: getaddrinfo failed). Exception: unable to connect: could not open database requested by login
```

Algunos errores comunes son:

**"login failed for user"**: esto significa que el Agent logró establecer una conexión con el servidor, pero el inicio de sesión fue rechazado por alguna razón.

Para solucionar el problema:

1. Verifique las credenciales de inicio de sesión del Agent

2. Intente iniciar sesión con esas credenciales manualmente usando sqlcmd. Por ejemplo: `sqlcmd -S localhost -U datadog -P ${SQL_PASSWORD} -d master`

**"could not open database requested for login"**: este error aparece debido a problemas de red o a una base de datos desconocida.

Para solucionar el problema:

1. Verifique la conexión TCP desde el Agent al servidor ejecutando `telnet {host} {port}` para asegurarse de que haya conectividad de red desde el Agent a la base de datos.

2. Intente iniciar sesión manualmente usando sqlcmd y vea si hay un problema con la base de datos configurada. Por ejemplo: `sqlcmd -S localhost -U datadog -P ${SQL_PASSWORD} -d master`

####  Debido a "Invalid connection string attribute" {#due-to-invalid-connection-string-attribute}

Los siguientes proveedores ADO son compatibles en Windows: `SQLOLEDB`, `MSOLEDBSQL`, `MSOLEDBSQL19`, `SQLNCLI11`.

Los proveedores `SQLOLEDB` y `SQLNCLI11` podrían mostrar el mensaje de error `Invalid connection string attribute` debido a varios problemas. Por ejemplo:

```
datadog_checks.sqlserver.connection.SQLConnectionError:
Unable to connect to SQL Server for instance foo.com,1433 - master:
OperationalError(com_error(-2147352567, 'Exception occurred.',
(0, 'Microsoft OLE DB Provider for SQL Server',
'Invalid connection string attribute', None, 0, -2147467259), None),
'Error opening connection to "ConnectRetryCount=2;Provider=SQLOLEDB;Data Source=foo.com,1433;Initial Catalog=master;User ID=datadog;Password=******;"')
```

Este mismo error se muestra independientemente del motivo del fallo (por ejemplo, debido a un nombre de servidor desconocido, a que la conexión TCP no se estableció, a credenciales de inicio de sesión no válidas o a una base de datos desconocida).

Busque en el mensaje de error los códigos de error HResult. Estos son ejemplos de códigos conocidos:

`-2147217843` **"login failed for user"**: esto significa que el Agent logró establecer una conexión con el servidor, pero el inicio de sesión fue rechazado por alguna razón.

`-2147467259` **"could not open database requested for login"**: este error aparece debido a problemas de red o a una base de datos desconocida.

Si ninguno de los pasos ayuda con el problema, o si el código de error que ve no aparece en la lista, Datadog recomienda usar el controlador `MSOLEDBSQL` o el `Microsoft ODBC Driver for SQL Server`. Los controladores proporcionan mensajes de error más detallados, lo que puede ayudar a solucionar los problemas por los que falla la conexión.

### SQL Server 'Unable to connect: Adaptive Server is unavailable or does not exist' {#adaptive-server-unavailable}

Este error a veces puede ser el resultado de no configurar correctamente el campo `host`. Para la integración, configure el campo `host` con la siguiente sintaxis: `host:server,port`.

Por ejemplo, si ha configurado `host` de esta manera:

```
host: sqlserver-foo.cfxxae8cilce.us-east-1.rds.amazonaws.com
```
Debe agregar el puerto y, en su lugar, configurarlo de la siguiente manera:

```
host: sqlserver-foo.cfxxae8cilce.us-east-1.rds.amazonaws.com,1433
```

### SSL Provider: The certificate chain was issued by an authority that is not trusted {#certificate-verify-fail}

#### Microsoft OLE DB Driver 2019 {#microsoft-ole-db-driver-2019}

Este error es común después de actualizar al controlador [`MSOLEDBSQL` 2019][6] debido a los [cambios importantes][7] que se introdujeron. En la versión más reciente del controlador, todas las conexiones a la instancia de SQL están cifradas de forma predeterminada.

Si está utilizando la versión más reciente de Microsoft OLE DB Driver for SQL Server e intenta conectarse a una instancia de SQL Server que requiere conexiones cifradas, puede utilizar una de las siguientes soluciones alternativas:

1. Si está utilizando un certificado autofirmado y la configuración Force Encryption en el servidor (`rds.force_ssl=1` en AWS) para garantizar que los clientes se conecten con cifrado:

   - Cambie a un certificado que sea de confianza como parte de la cadena de confianza del cliente.
   - Agregue el certificado autofirmado como un certificado de confianza en el cliente.
   - Agregue `Trust Server Certificate=True;` a la cadena de conexión.

Esto se describe con más detalle [en la documentación de Microsoft][7]

2. Si su instancia de SQL Server no requiere cifrado para conectarse (`rds.force_ssl=0` en AWS), actualice la cadena de conexión para incluir `Use Encryption for Data=False;`. Por ejemplo:

  ```yaml
  instances:
    - host: <INSTANCE_ENDPOINT>,<PORT>
      connection_string: "Trust Server Certificate=True;Use Encryption for Data=False;"
      connector: adodbapi
      adoprovider: MSOLEDBSQL19
  ```

3. Instale la [versión 2018 del controlador MSOLEDBSQL][8], que no utiliza cifrado de forma predeterminada. Después de instalar el controlador, actualice `adoprovider` a `MSOLEDBSQL`. Por ejemplo:

  ```yaml
  instances:
    - host: <INSTANCE_ENDPOINT>,<PORT>
      connection_string: "Trusted_Connection=yes;"
      connector: adodbapi
      adoprovider: MSOLEDBSQL
  ```

#### Otras versiones de controladores Microsoft OLE DB y ODBC {#other-microsoft-ole-db-and-odbc-driver-versions}

Si está utilizando un controlador OLE DB distinto de `MSOLEDBSQL` 2019 o controladores ODBC, este error puede resolverse configurando `TrustServerCertificate=yes` en la cadena de conexión. Por ejemplo, para el controlador `ODBC`:

  ```yaml
  # this example uses SQL Server authentication
  instances:
    - host: <INSTANCE_ENDPOINT>,<PORT>
      username: datadog
      password: <DD_AGENT_PASSWORD>
      connection_string: "TrustServerCertificate=yes;"
      connector: odbc
      driver: '{ODBC Driver 18 for SQL Server}'
  ```

### SQL Server no puede conectarse: 'SSL Security error (18)' {#ssl-security-error}

Este es un problema conocido en versiones anteriores del controlador ODBC de SQL Server. Puede verificar qué versión del controlador está utilizando el Agent observando la cadena de conexión en el mensaje de error.

Por ejemplo, si ve `Provider=SQL Server` en la cadena de conexión del mensaje de error, actualizar a una versión más reciente del controlador ODBC solucionará el error.

Este problema se describe con más detalle en esta [publicación del blog de Microsoft][9]

### Cadena de conexión vacía {#empty-connection-string}

La comprobación de SQL Server de Datadog depende de la biblioteca de Python `adodbapi`, la cual tiene algunas limitaciones en los caracteres que puede utilizar al crear una cadena de conexión a un servidor SQL Server. Si su Agent tiene problemas para conectarse a su SQL Server y encuentra errores similares a los siguientes en el archivo collector.logs de su Agent, es posible que `sqlserver.yaml` incluya caracteres que causen problemas con `adodbapi`.

```text
OperationalError: (KeyError('Python string format error in connection string->',), 'Error opening connection to ""')
```

Por el momento, el único carácter que se sabe que causa este problema de conectividad específico es el carácter `%`. Si necesita utilizar el carácter `%` en su archivo `sqlserver.yaml` (por ejemplo, si la contraseña de usuario de Datadog SQL Server incluye un `%`), debe escapar ese carácter incluyendo un `%%` doble en lugar de cada `%` individual.

## Diagnóstico de problemas comunes del controlador de SQL Server {#common-driver-issues}

### Nombre de origen de datos no encontrado y no se especificó un controlador predeterminado {#data-source-name-not-found}

Este es un error común que se observa en Linux al utilizar la configuración predeterminada para el controlador ODBC. Esto puede suceder porque el [DSN][10] configurado para su controlador en el archivo `/etc/odbcinst.ini` no coincide con el nombre del controlador configurado en su configuración del Agent.

Por ejemplo, si desea utilizar el controlador ODBC predeterminado para el Agent (`{ODBC Driver 18 for SQL Server}`), la configuración de su instancia debe contener lo siguiente:

```yaml
  connector: odbc
```

Cuando el Agent se inicia e intenta establecer una conexión con su instancia de SQL Server, busca el archivo `/etc/odbcinst.ini` para encontrar la ruta a los binarios del controlador.

Por ejemplo, este archivo `/etc/odbcinst.ini` configura el controlador:

    

```text
    $ cat /etc/odbcinst.ini
    [ODBC Driver 18 for SQL Server]
    Description=Microsoft ODBC Driver 18 for SQL Server
    Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.1.so.7.0
    UsageCount=1
    ```

El DSN en el ejemplo anterior es `[ODBC Driver 18 for SQL Server]`, que coincide con el nombre del controlador predeterminado que está utilizando el Agent. Si el DSN de su controlador no coincide con el nombre del controlador que está utilizando el Agent, obtendrá el error `Data source not found`.

Es posible configurar el `dsn` en la configuración de su instancia para que coincida con lo que está configurado en su archivo `/etc/odbcinst.ini`. Por ejemplo:

    

```text
    $ cat /etc/odbcinst.ini
    [Custom]
    Description=Microsoft ODBC Driver 18 for SQL Server
    Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.1.so.7.0
    UsageCount=1
    ```

En la configuración de su instancia, usted configuraría entonces el campo `dsn`:

```yaml
  connector: odbc
  dsn: "Custom"
```

### Proveedor o controlador no encontrado {#provider-not-found}

Este mensaje de error puede variar en su redacción según los diferentes controladores, pero normalmente se ve de la siguiente manera para `ODBC`:

1. `Can't open lib .* file not found`
2. `Data source name not found.* and no default driver specified`

Y para los proveedores `MSOLEDBSQL` el mensaje de error se ve así:

  ```text
  Provider cannot be found. It may not be properly installed.
  ```

Esto significa que el controlador o proveedor no está instalado correctamente en el servidor donde se está ejecutando el Agent. Debe asegurarse de haber seguido todas las instrucciones de instalación para el controlador que ha elegido utilizar.

Es posible que el Agent no esté encontrando el controlador. Esto es más común con los controladores ODBC en Linux. Consulte la sección [conectarse a SQL Server en un servidor Linux](#connecting-to-sql-server-on-a-linux-host) para obtener más instrucciones sobre cómo instalar el controlador ODBC en Linux.

Para obtener ayuda para elegir un controlador, consulte la sección [elegir un controlador de SQL Server](#picking-a-sql-server-driver) sobre cómo configurar correctamente el controlador con el Agent.

### Conectarse a SQL Server en un servidor Linux {#connecting-to-sql-server-on-a-linux-host}

Para conectar SQL Server (ya sea alojado en Linux o Windows) a un servidor Linux:

1. Instale el [Microsoft ODBC Driver][11] para su distribución de Linux.
   Si no está seguro del nombre del controlador que debe usar, puede encontrarlo entre corchetes en la parte superior de `/etc/odbcinst.ini`.

    ```text
    $ cat /etc/odbcinst.ini
    [ODBC Driver 13 for SQL Server]
    Description=Microsoft ODBC Driver 13 for SQL Server
    Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.1.so.7.0
    UsageCount=1
    ```
2. Copie los archivos `odbc.ini` y `odbcinst.ini` en la carpeta `/opt/datadog-agent/embedded/etc`.
3. Si es necesario, instale el módulo pyodbc. Esto se puede hacer ejecutando pip install pyodbc dentro del entorno de Python de su Agent. Por ejemplo:

    ```shell
    $ sudo /opt/datadog-agent/embedded/bin/pip install pyodbc
    ```
3. Configure su `conf.yaml` de SQL Server para usar el conector odbc y especifique el controlador adecuado como se indica en el archivo `odbcinst.ini`.

    ```yaml
    init_config:

    instances:
      - host: <HOST>,<PORT>
        # enable the odbc connector
        connector: odbc
        # enable the ODBC driver
        driver: '{ODBC Driver 13 for SQL Server}'
        username: <USERNAME>
        password: <PASSWORD>
    ```

### Elección de un controlador de SQL Server {#picking-a-driver}

Para que el Agent se conecte a la instancia de SQL Server, debe instalar el [controlador Microsoft ODBC][12] o el [controlador OLE DB][13].

El controlador que elija determina lo que debe establecer para el campo [conector][14] en la configuración de su instancia.

Por ejemplo, para el [controlador Microsoft ODBC][12]:

  ```yaml
  connector: odbc
  driver: '{ODBC Driver 18 for SQL Server}'
  ```

Para el [controlador OLE DB][13]:

  ```yaml
  connector: adodbapi
  adoprovider: MSOLEDBSQL
  ```

Estos valores se utilizarán para establecer la parte `Provider` de la cadena de conexión.

Por ejemplo, si configura `adoprovider: MSOLEDBSQL`, entonces la cadena de conexión incluiría `Provider=MSOLEDBSQL`. Esto debe coincidir con el nombre de la versión del controlador que tiene instalada.

En la versión más reciente del [controlador Microsoft OLE DB][13], el nombre del controlador cambió de `MSOLEDBSQL` a `MSOLEDBSQL19`, lo que significa que esto debería aparecer en la configuración de su instancia de la siguiente manera:

  ```yaml
  connector: adodbapi
  adoprovider: MSOLEDBSQL19
  ```

Se recomienda mantenerse al día con la última versión disponible del controlador que seleccione.

## Otros problemas comunes {#other-common-issues}

### Falta la etiqueta de usuario de SQL Server en Query Metrics y Plan Samples {#sql-server-user-tag-is-missing-on-the-query-metrics-and-plan-samples}

La etiqueta `user` ya no es compatible con Query Metrics ni con Plan Samples debido a limitaciones técnicas de SQL Server que impiden recopilar correctamente el usuario que ejecuta las consultas.

La etiqueta `user` está disponible para los eventos de Query Activity y las métricas de Database Load.

### ¿Por qué hay tantas consultas "CREATE PROCEDURE"? {#why-are-there-so-many-create-procedure-queries}

En las versiones del Agent anteriores a la 7.40.0, existe un error que hace que las estadísticas de `PROCEDURE` se contabilicen en exceso. Esto hace que se muestren muchas ejecuciones de `CREATE PROCEDURE...` en la interfaz de Query Metrics de Database Monitoring. Para solucionar este problema, actualice a la versión más reciente del Agent de Datadog.

### No se recopilan los SQL Server Agent Jobs y aparece el error "The SELECT permission was denied on the object 'sysjobs'" {#sql-server-agent-jobs-are-not-being-collected-with-error-the-select-permission-was-denied-on-the-object-sysjobs}

La comprobación de SQL Server Agent Jobs requiere el permiso `SELECT` en la base de datos `msdb`. Si ve el error `The SELECT permission was denied on the object 'sysjobs'`, debe otorgar el permiso `SELECT` al usuario que el Agent utiliza para conectarse a la instancia de SQL Server.

```SQL
USE msdb;
CREATE USER datadog FOR LOGIN datadog;
GRANT SELECT to datadog;
```

## Limitaciones conocidas {#known-limitations}

### SQL Server 2012 {#sql-server-2012}

Las siguientes métricas no están disponibles para SQL Server 2012:

- `sqlserver.files.read_io_stall_queued`
- `sqlserver.files.write_io_stall_queued`
- `sqlserver.ao.quorum_type`
- `sqlserver.ao.quorum_state`
- `sqlserver.ao.member.type`
- `sqlserver.ao.member.state`
- `sqlserver.ao.member.number_of_quorum_votes`
- `sqlserver.ao.log_send_queue_size`
- `sqlserver.ao.log_send_rate`
- `sqlserver.ao.redo_queue_size`
- `sqlserver.ao.redo_rate`
- `sqlserver.ao.low_water_mark_for_ghosts`
- `sqlserver.ao.filestream_send_rate`
- `sqlserver.ao.replica_status`
- `sqlserver.ao.secondary_lag_seconds`
- `sqlserver.fci.status`
- `sqlserver.fci.is_current_owner`
- `sqlserver.latches.latch_wait_time`

La recopilación de interbloqueos (`collect_deadlocks: enabled: true`) no es compatible con SQL Server 2012. La consulta de recopilación utiliza `AT TIME ZONE`, un operador de T-SQL introducido en SQL Server 2016. Habilitar esta característica en SQL Server 2012 provoca un error de sintaxis de consulta (`Incorrect syntax near 'AT'`) en cada ejecución de comprobación. Para evitar este error, establezca `collect_deadlocks: enabled: false` en la configuración de su instancia.

### SQL Server 2014 {#sql-server-2014}

Las siguientes métricas no están disponibles para SQL Server 2014:

- `sqlserver.ao.secondary_lag_seconds`
- `sqlserver.latches.latch_wait_time`

La recopilación de interbloqueos (`collect_deadlocks: enabled: true`) no es compatible con SQL Server 2014. La consulta de recopilación utiliza `AT TIME ZONE`, un operador de T-SQL introducido en SQL Server 2016. Habilitar esta característica en SQL Server 2014 provoca un error de sintaxis de consulta (`Incorrect syntax near 'AT'`) en cada ejecución de comprobación. Para evitar este error, establezca `collect_deadlocks: enabled: false` en la configuración de su instancia.

[1]: /es/database_monitoring/setup_sql_server/
[2]: https://learn.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode?view=sql-server-ver16#connecting-through-windows-authentication
[3]: https://learn.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode?view=sql-server-ver16#connecting-through-sql-server-authentication
[4]: https://docs.datadoghq.com/es/agent/guide/windows-agent-ddagent-user/#installation
[5]: https://learn.microsoft.com/en-us/troubleshoot/sql/connect/login-failed-for-user
[6]: https://learn.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server?view=sql-server-ver16#3-microsoft-ole-db-driver-for-sql-server-msoledbsql
[7]: https://techcommunity.microsoft.com/t5/sql-server-blog/ole-db-driver-19-0-for-sql-server-released/ba-p/3170362
[8]: https://learn.microsoft.com/en-us/sql/connect/oledb/release-notes-for-oledb-driver-for-sql-server?view=sql-server-ver16#1863
[9]: https://community.hostek.com/t/ssl-security-error-for-microsoft-sql-driver/348
[10]: https://learn.microsoft.com/en-us/sql/integration-services/import-export-data/connect-to-an-odbc-data-source-sql-server-import-and-export-wizard?view=sql-server-ver16
[11]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux/installing-the-microsoft-odbc-driver-for-sql-server-on-linux
[12]: https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server?view=sql-server-ver16
[13]: https://learn.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server?view=sql-server-ver16
[14]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L201-L208
[15]: /es/agent/configuration/agent-commands/#other-commands