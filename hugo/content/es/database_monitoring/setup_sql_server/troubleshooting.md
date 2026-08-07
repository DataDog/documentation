---
description: Soluciones para los problemas de configuración de Database Monitoring
  para SQL Server
title: Solucionar problemas de configuración de DBM (Database Monitoring) para SQL
  Server
---

En esta página se detallan los problemas más comunes relacionados con la configuración y el uso de Database Monitoring con SQL Server y se explica cómo resolverlos. Datadog recomienda utilizar la última versión estable del Agent y seguir la última [documentación de configuración][1], ya que puede cambiar según las versiones del Agent.

## Diagnóstico de problemas comunes de conexión {#common-connection-issues}

### SQL Server no se puede conectar 'Login Failed for user' {#login-failed-for-user}

El Agent puede conectarse a una instancia de SQL Server de dos maneras:

1. [Autenticación de Windows][2] (sólo disponible en hosts de Windows)

2. [Autenticación de SQL Server][3]

Windows es el modo de autenticación por defecto y es más seguro que la autenticación de SQL Server. Cuando se utiliza la autenticación de Windows, se pueden crear grupos de Windows a nivel de dominio y se puede crear un inicio de sesión en SQL Server para todo el grupo. Para utilizar la autenticación de Windows debes:

1. Utilizar la cuenta de servicio creada en el momento de [instalación del Agent][4] y asegurarte de que esta cuenta tiene el acceso adecuado a SQL Server.

2. Configurar `connection_string: "Trusted_Connection=yes"` y omitir los campos `username` y `password`. El atributo de conexión `Trusted_Connection=yes` indica al controlador de bases de datos OLE para SQL Server que debe utilizar la autenticación de Windows para validar el inicio de sesión.

Las autenticaciones de SQL Server no se basan en cuentas de usuario de Windows, sino que se crean en la instancia y se almacenan en el propio SQL Server. La autenticación de SQL requiere definir el `username` y el `password` en la configuración de la instancia de SQL Server para la conexión.

Si se produce un error de inicio de sesión al conectarse, es importante comprobar primero que puedes acceder a la instancia como usuario del Datadog Agent. Una forma sencilla de hacerlo es a través de una utilidad de línea de comandos como `sqlcmd`.

Por ejemplo:

```bash
# this example uses SQL Authentication
sqlcmd -S <INSTANCE_ENDPOINT> -U datadog -P <DATADOG_PASSWORD> -d master

# this example uses Windows Authentication
# Run this command in powershell via selecting the `run as user...` option to run as the ddagentuser
sqlcmd -S <INSTANCE_ENDPOINT> -d master -E
```

Si el usuario `datadog` no puede acceder a la instancia de SQL Server, asegúrate de que el usuario ha sido creado y se le han dado los permisos adecuados de acuerdo con la [documentación de configuración][1].

Microsoft también ofrece un documento útil para solucionar este tipo de errores, que puedes [consultar aquí][5].

### Error de conexión TCP de SQL Server {#tcp-connection-error}

Los problemas de conexión TCP son comunes cuando hay un error de configuración con el Agent. Los mensajes de error proporcionados por el controlador no siempre son claros.

Por ejemplo, el siguiente error se debe a que ha fallado la conexión TCP:

```bash
TCP-connection(ERROR: getaddrinfo failed). Exception: unable to connect: could not open database requested by login
```

Algunos errores comunes son:

**"Login failed for user"**: significa que el Agent ha conseguido establecer una conexión con el host, pero el inicio de sesión ha sido rechazado por alguna razón.

Para solucionar este problema:

1. Comprueba las credenciales de inicio de sesión del Agent.

2. Intenta iniciar sesión con esas credenciales manualmente utilizando sqlcmd. Por ejemplo: `sqlcmd -S localhost -U datadog -P ${SQL_PASSWORD} -d master`.

**"Could not open database requested for login"**: este error aparece debido a problemas de red o debido a una base de datos desconocida.

Para solucionar este problema:

1. Comprueba la conexión TCP del Agent al host ejecutando `telnet {host} {port}` para asegurarte de que existe una conectividad de red del Agent a la base de datos.

2. Intenta iniciar sesión manualmente utilizando sqlcmd y observa si existe algún error en la base de datos configurada. Por ejemplo: `sqlcmd -S localhost -U datadog -P ${SQL_PASSWORD} -d master`.

#### Debido a "Atributo de cadena de conexión no válido"

Los siguientes proveedores ADO son compatibles con Windows: `SQLOLEDB`, `MSOLEDBSQL`, `MSOLEDBSQL19`, `SQLNCLI11`.

Los proveedores `SQLOLEDB` y `SQLNCLI11` podrían mostrar el mensaje de error `Invalid connection string attribute` debido a varios problemas. Por ejemplo:

```
datadog_checks.sqlserver.connection.SQLConnectionError:
Unable to connect to SQL Server for instance foo.com,1433 - master:
OperationalError(com_error(-2147352567, 'Exception occurred.',
(0, 'Microsoft OLE DB Provider for SQL Server',
'Invalid connection string attribute', None, 0, -2147467259), None),
'Error opening connection to "ConnectRetryCount=2;Provider=SQLOLEDB;Data Source=foo.com,1433;Initial Catalog=master;User ID=datadog;Password=******;"')
```

Este mismo error se muestra independientemente del motivo del fallo (por ejemplo, debido a un nombre de host desconocido, a que la conexión TCP no se ha establecido, a que las credenciales de acceso no son válidas o a que la base de datos es desconocida).

Busca los códigos de error HResult en el mensaje de error. Estos son ejemplos de códigos conocidos:

`-2147217843` **"Login failed for user"**: significa que el Agent ha conseguido establecer una conexión con el host, pero el inicio de sesión ha sido rechazado por algún motivo.

`-2147467259` **"Could not open database requested for login"**: este error aparece debido a problemas de red o debido a una base de datos desconocida.

Si ninguno de los dos pasos te ayuda a resolver el problema o si el código de error que ves no aparece en la lista, Datadog te recomienda utilizar el controlador `MSOLEDBSQL` o el `Microsoft ODBC Driver for SQL Server`. Los controladores proporcionan mensajes de error más detallados, que pueden ayudarte a determinar por qué está fallando la conexión.

### SQL Server 'Unable to connect: Adaptive Server is unavailable or does not exist' {#adaptive-server-unavailable}

Algunas veces, este error puede deberse a que no se ha configurado correctamente el campo `host`. Para la integración, configura el campo `host` con la siguiente sintaxis: `host:server,port`.

Por ejemplo, si has configurado `host` de esta manera:

```
host: sqlserver-foo.cfxxae8cilce.us-east-1.rds.amazonaws.com
```
Debes añadir el puerto y configurarlo como se indica a continuación:
```
host: sqlserver-foo.cfxxae8cilce.us-east-1.rds.amazonaws.com,1433
```

### Proveedor SSL: La cadena de certificados ha sido emitida por una autoridad que no es de confianza {#certificate-verify-fail}

#### Controlador de bases de datos OLE Microsoft 2019

Este error es común después de actualizar al controlador [`MSOLEDBSQL` 2019][6] debido a los [cambios de última hora][7] que se han introducido. En la última versión del controlador, todas las conexiones a la instancia de SQL están cifradas por defecto.

Si estás utilizando la última versión del controlador de bases de datos OLE Microsoft para SQL Server e intentas conectarte a una instancia de SQL Server que requiere conexiones cifradas, puedes utilizar una de las siguientes soluciones alternativas:

1. Si utilizas un certificado autofirmado y el parámetro Forzar cifrado en el servidor (`rds.force_ssl=1` en AWS) para garantizar que los clientes se conectan mediante cifrado:

   - Cambia a un certificado de confianza como parte de la cadena de confianza del cliente.
   - Añade el certificado autofirmado como certificado de confianza en el cliente.
   - Añade `Trust Server Certificate=True;` a la cadena de conexión.

Este procedimiento se describe con más detalle [en la documentación de Microsoft][7].

2. Si tu instancia de SQL Server no requiere cifrado para conectarse (`rds.force_ssl=0` en AWS), entonces actualiza la cadena de conexión para incluir `Use Encryption for Data=False;`. Por ejemplo:

  ```yaml
  instances:
    - host: <INSTANCE_ENDPOINT>,<PORT>
      connection_string: "Trust Server Certificate=True;Use Encryption for Data=False;"
      connector: adodbapi
      adoprovider: MSOLEDBSQL19
  ```

3. Instala la [versión 2018 del controlador MSOLEDBSQL][8], que no utiliza cifrado por defecto. Luego de instalar el controlador, actualiza `adoprovider` a `MSOLEDBSQL`. Por ejemplo:

  ```yaml
  instances:
    - host: <INSTANCE_ENDPOINT>,<PORT>
      connection_string: "Trusted_Connection=yes;"
      connector: adodbapi
      adoprovider: MSOLEDBSQL
  ```

#### Otras versiones de controladores de bases de datos OLE y ODBC de Microsoft

Si utiliza un controlador de bases de datos OLE distinto de `MSOLEDBSQL` 2019 o de los controladores ODBC, este error puede resolverse configurando `TrustServerCertificate=yes` en la cadena de conexión. Por ejemplo, para el controlador `ODBC`:

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

### SQL Server no puede conectarse 'SSL Security error (18)' {#ssl-security-error}

Se trata de un problema conocido para versiones antiguas del controlador ODBC de SQL Server. Puedes comprobar qué versión del controlador utiliza el Agent consultando la cadena de conexión en el mensaje de error.

Por ejemplo, si ves `Provider=SQL Server` en la cadena de conexión del mensaje de error, la actualización a una versión más reciente del controlador ODBC solucionará el error.

Este problema se describe con más detalles en esta [entrada del blog de Microsoft][9]

### Cadena de conexión vacía {#empty-connection-string}

El check de SQL Server de Datadog se basa en la librería Python `adodbapi`, que tiene algunas limitaciones en cuanto a los caracteres que puede utilizar para establecer una cadena de conexión con un SQL Server. Si tu Agent tiene problemas para conectarse a tu SQL Server y si encuentras errores similares a los siguientes en los logs del recopilador de tu Agent, es posible que tu `sqlserver.yaml` incluya algunos caracteres que causan problemas con `adodbapi`.

```text
OperationalError: (KeyError('Python string format error in connection string->',), 'Error opening connection to ""')
```

Por el momento, el único carácter conocido que causa este problema específico de conectividad es el carácter `%`. Si necesitas utilizar el carácter `%` en tu archivo `sqlserver.yaml` (por ejemplo, si tu contraseña de usuario de SQL Server de Datadog incluye un `%`), debes escapar este carácter incluyendo un doble `%%` en lugar de cada `%` simple.

## Diagnóstico de problemas comunes del controlador de SQL Server {#common-driver-issues}

### No se ha encontrado el nombre de la fuente de datos y no se ha especificado ningún controlador por defecto {#data-source-name-not-found}

Este es un error comúnmente visto en Linux cuando se utiliza la configuración por defecto para el controlador ODBC. Esto puede ocurrir debido a que el [DSN][10], que se configura para el controlador en el archivo `/etc/odbcinst.ini`, no coincide con el nombre del controlador configurado en tu Agent.

Por ejemplo, si quieres utilizar el controlador ODBC predeterminado para el Agent (`{ODBC Driver 18 for SQL Server}`), la configuración de tu instancia debe contener lo siguiente:

```yaml
  connector: odbc
```

Cuando el Agent se inicia e intenta establecer una conexión con tu instancia de SQL Server, busca el archivo `/etc/odbcinst.ini` para encontrar la ruta a los binarios del controlador.

Por ejemplo, este archivo `/etc/odbcinst.ini` configura el controlador:

    ```text
    $ cat /etc/odbcinst.ini
    [ODBC Driver 18 for SQL Server]
    Description=Microsoft ODBC Driver 18 for SQL Server
    Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.1.so.7.0
    UsageCount=1
    ```

El DSN en el ejemplo anterior es `[ODBC Driver 18 for SQL Server]`, que coincide con el nombre del controlador por defecto que está utilizando el Agent. Si el DSN de tu controlador no coincide con el nombre del controlador que está utilizando el Agent, obtendrás el error `Data source not found`.

Es posible definir `dsn` en la configuración de tu instancia para que coincida con lo definido en el archivo `/etc/odbcinst.ini`. Por ejemplo:

    ```text
    $ cat /etc/odbcinst.ini
    [Custom]
    Description=Microsoft ODBC Driver 18 for SQL Server
    Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.1.so.7.0
    UsageCount=1
    ```

En la configuración de tu instancia, deberías definir el campo `dsn`:

```yaml
  connector: odbc
  dsn: "Custom"
```

### Proveedor o controlador no encontrado {#provider-not-found}

Este mensaje de error puede variar de un controlador a otro, pero normalmente tiene el siguiente aspecto en `ODBC`:

1. `Can't open lib .* file not found`
2. `Data source name not found.* and no default driver specified`

Y para los proveedores de `MSOLEDBSQL`, el mensaje de error tiene el siguiente aspecto:

  ```text
  Provider cannot be found. It may not be properly installed.
  ```

Esto significa que el controlador o el proveedor no está instalado correctamente en el host en que se ejecuta el Agent. Debes asegurarte de que has seguido todas las instrucciones de instalación del controlador que has decidido utilizar.

Es posible que el Agent no encuentre el controlador. Esto sucede con mayor frecuencia en los controladores ODBC en Linux. Para obtener más instrucciones sobre cómo instalar el controlador ODBC en Linux, consulta la sección [conectarse a SQL Server en un host Linux](#connecting-to-sql-server-on-a-linux-host).

Para obtener ayuda al elegir un controlador, consulta la sección [elegir un controlador de SQL Server](#picking-a-sql-server-driver) para saber cómo configurar correctamente tu controlador con el Agent.

### Conexión a SQL Server en un host de Linux

Para conectar SQL Server (ya sea alojado en Linux o Windows) a un host de Linux:

1. Instala el [controlador ODBC de Microsoft][11] para tu distribución Linux.
   Si no sabes cuál es el nombre del controlador que debes utilizar, puede encontrarlo entre paréntesis en la parte superior de `/etc/odbcinst.ini`.

    ```text
    $ cat /etc/odbcinst.ini
    [ODBC Driver 13 for SQL Server]
    Description=Microsoft ODBC Driver 13 for SQL Server
    Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.1.so.7.0
    UsageCount=1
    ```
2. Copia los archivos `odbc.ini` y `odbcinst.ini` en la carpeta `/opt/datadog-agent/embedded/etc`.
3. Si es necesario, instala el módulo pyodbc. Puedes hacerlo ejecutando pip install pyodbc en el entorno Python de tu Agent. Por ejemplo:

    ```shell
    $ sudo /opt/datadog-agent/embedded/bin/pip install pyodbc
    ```
3. Configura tu SQL Server `conf.yaml` para utilizar el conector odbc y especifique el controlador adecuado como se indica en el archivo `odbcinst.ini`.

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

Para que el Agent pueda conectarse a la instancia de SQL Server, debes instalar el [controlador ODBC de Microsoft][12] o el [controlador de bases de datos OLE][13].

El controlador que elijas determinará lo que configures para el campo [conector][14] en la configuración de tu instancia.

Por ejemplo, para el [controlador ODBC de Microsoft][12]:

  ```yaml
  connector: odbc
  driver: '{ODBC Driver 18 for SQL Server}'
  ```

Para el [controlador de bases de datos OLE][13]:

  ```yaml
  connector: adodbapi
  adoprovider: MSOLEDBSQL
  ```

Estos valores se utilizarán para asignar la parte `Provider` de la cadena de conexión.

Así, por ejemplo, si configuras `adoprovider: MSOLEDBSQL`, la cadena de conexión incluirá `Provider=MSOLEDBSQL`. Esto debería coincidir con el nombre de la versión del controlador que tengas instalada.

En la última versión del [controlador de bases de datos OLE Microsoft][13], el nombre del controlador ha cambiado de `MSOLEDBSQL` a `MSOLEDBSQL19`, lo que significa que debería aparecer en la configuración de tu instancia de la siguiente forma:

  ```yaml
  connector: adodbapi
  adoprovider: MSOLEDBSQL19
  ```

Esto se recomienda para mantener una actualización con la última versión disponible del controlador que selecciones.

## Otros problemas comunes

### Falta la etiqueta (tag) de usuario de SQL Server en Métricas de consultas y muestras de planes

La etiqueta `user` ya no es compatible con Métricas de consultas y Muestras de planes debido a limitaciones técnicas en SQL Server que impiden la recopilación de las consultas correctas ejecutadas por el usuario.

La etiqueta `user` está disponible para Eventos de actividades de consulta y Métricas de cargas de bases de datos.

### ¿Por qué hay tantas consultas "CREATE PROCEDURE"?

En versiones del Agent anteriores a la v7.40.0, existe un error por el que las estadísticas de `PROCEDURE` se cuentan en exceso. Esto lleva a ver muchas ejecuciones de `CREATE PROCEDURE...` en la interfaz de usuario de las métricas de consultas de Database Monitoring. Para solucionar este problema, actualiza a la última versión del Datadog Agent.

### Los trabajos del Agent de SQL Server no se recopilan con el error "The SELECT permission was denied on the object 'sysjobs'" (Se ha denegado el permiso SELECT en el objeto 'sysjobs').

El check de los trabajos del Agent de SQL Server requiere el permiso `SELECT` en la base de datos `msdb`. Si aparece el error `The SELECT permission was denied on the object 'sysjobs'`, debes conceder el permiso `SELECT` al usuario que el Agent está utilizando para conectarse a la instancia de SQL Server.

```SQL
USE msdb;
CREATE USER datadog FOR LOGIN datadog;
GRANT SELECT to datadog;
```

## Limitaciones conocidas

### SQL Server 2012

Las siguientes métricas no están disponible para SQL Server 2012:

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

### SQL Server 2014

Las siguientes métricas no están disponible para SQL Server 2014:

- `sqlserver.ao.secondary_lag_seconds`
- `sqlserver.latches.latch_wait_time`

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
