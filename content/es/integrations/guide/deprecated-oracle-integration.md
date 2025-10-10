---
title: Configuración de la integración de Oracle en versiones anteriores a 7.50.1
  del Agent
---

## Información general

En esta guía, se describe la configuración de la integración de Oracle en versiones anteriores a 7.50.1 del Datadog Agent. Para obtener más información sobre la integración de Oracle, incluida la configuración en versiones más recientes del Agent, consulta la [documentación sobre la integración de Oracle][1].

## Configuración

### Instalación

#### Requisito previo

Para utilizar la integración de Oracle puedes utilizar el cliente nativo (no se requieren pasos adicionales de instalación) o el Oracle Instant Client.

##### Oracle Instant Client

{{< tabs >}}
{{% tab "Linux" %}}
1. Sigue las instrucciones de [Instalación de Oracle Instant Client para Linux][1].

2. Comprueba lo siguiente:
    - Que los paquetes *Instant Client Basic* y *SDK* estén instalados. Encuéntralos en la [página de descargas][2] de Oracle.

        Una vez instaladas las bibliotecas de Instant Client, asegúrate de que el enlazador en tiempo de ejecución pueda encontrar las bibliotecas. Por ejemplo, utiliza `ldconfig`:

       ```shell
       # Put the library location in an ld configuration file.

       sudo sh -c "echo /usr/lib/oracle/12.2/client64/lib > \
           /etc/ld.so.conf.d/oracle-instantclient.conf"

       # Update the bindings.

       sudo ldconfig
       ```

    - Ambos paquetes se descomprimen en un único directorio que está disponible para todos los usuarios de la máquina en cuestión (por ejemplo, `/opt/oracle`):
       ```shell
       mkdir -p /opt/oracle/ && cd /opt/oracle/
       unzip /opt/oracle/instantclient-basic-linux.x64-12.1.0.2.0.zip
       unzip /opt/oracle/instantclient-sdk-linux.x64-12.1.0.2.0.zip
       ```

[1]: https://docs.oracle.com/en/database/oracle/oracle-database/21/lacli/install-instant-client-using-zip.html
[2]: https://www.oracle.com/technetwork/database/features/instant-client/index.htm
{{% /tab %}}

{{% tab "Windows" %}}
1. Sigue la [Guía de instalación de Oracle Windows ][1] para configurar Oracle Instant Client.

2. Comprueba lo siguiente:
    - Que se haya instalado [Microsoft Visual Studio 2017 Redistributable][2] o la versión adecuada para Oracle Instant Client.

    - Que se instalen los paquetes *Instant Client Basic* y *SDK* de la [página de descargas][18] de Oracle.

    - Que ambos paquetes se extraigan en un único directorio que está disponible para todos los usuarios de la máquina en cuestión (por ejemplo, `C:\oracle`).

[1]: https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html#ic_winx64_inst
[2]: https://support.microsoft.com/en-us/topic/the-latest-supported-visual-c-downloads-2647da03-1eea-4433-9aff-95f26a218cc0
{{% /tab %}}
{{< /tabs >}}

##### Controlador JDBC

*NOTA*: Este método sólo funciona en Linux.

Java 8 o una versión posterior es necesario en tu sistema para JPype, una de las bibliotecas utilizadas por el Agent cuando se utiliza el controlador JDBC.

Una vez instalado, sigue los siguientes pasos:

1. [Descarga el controlador JDBC][4] archivo JAR.
2. Añade la ruta al archivo descargado en tu `$CLASSPATH` o en el archivo de check de configuración en `jdbc_driver_path` (consulta el [ejemplo de oracle.yaml][5]).

#### Creación de usuarios de Datadog

{{< tabs >}}
{{% tab "Standalone" %}}
Crea un usuario de `datadog` de sólo lectura con acceso adecuado a tu servidor de la base de datos de Oracle. Conéctate a tu base de datos de Oracle con un usuario administrativo, como `SYSDBA` o `SYSOPER`, y ejecuta:

```text
-- Enable Oracle Script.
ALTER SESSION SET "_ORACLE_SCRIPT"=true;

-- Create the datadog user. Replace the password placeholder with a secure password.
CREATE USER datadog IDENTIFIED BY <PASSWORD>;

-- Grant access to the datadog user.
GRANT CONNECT TO datadog;
GRANT SELECT ON GV_$PROCESS TO datadog;
GRANT SELECT ON gv_$sysmetric TO datadog;
GRANT SELECT ON sys.dba_data_files TO datadog;
GRANT SELECT ON sys.dba_tablespaces TO datadog;
GRANT SELECT ON sys.dba_tablespace_usage_metrics TO datadog;
```

**Nota**: Si estás utilizando Oracle 11g, no es necesario ejecutar la siguiente línea:

```text
ALTER SESSION SET "_ORACLE_SCRIPT"=true;
```
{{% /tab %}}

{{% tab "Multi-tenant" %}}
##### Oracle 12c o 19c

Loguea en la base de datos raíz como administrador para crear un usuario `datadog` y conceder permisos:

```text
alter session set container = cdb$root;
CREATE USER c##datadog IDENTIFIED BY password CONTAINER=ALL;
GRANT CREATE SESSION TO c##datadog CONTAINER=ALL;
Grant select any dictionary to c##datadog container=all;
GRANT SELECT ON GV_$PROCESS TO c##datadog CONTAINER=ALL;
GRANT SELECT ON gv_$sysmetric TO c##datadog CONTAINER=ALL;
```
{{% /tab %}}
{{< /tabs >}}

### Configuración

{{< tabs >}}
{{% tab "host" %}}
Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `oracle.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de la configuración del Agent][2]. Actualiza `server` y `port` para configurar los administradores en el monitor. Consulta el [oracle.d/conf.yaml de ejemplo][1] para conocer todas las opciones disponibles de configuración.

   ```yaml
   init_config:

   instances:
      ## @param server - string - required
      ## The IP address or hostname of the Oracle Database Server.
      #
      - server: localhost:1521

        ## @param service_name - string - required
        ## The Oracle Database service name. To view the services available on your server,
        ## run the following query: `SELECT value FROM v$parameter WHERE name='service_names'`
        #
        service_name: <SERVICE_NAME>

        ## @param username - string - required
        ## The username for the Datadog user account.
        #
        username: <USERNAME>

        ## @param password - string - required
        ## The password for the Datadog user account.
        #
        password: <PASSWORD>
   ```

2. [Reinicia el Agent][3].


#### Sólo consultas personalizadas

Para omitir checks de métricas predeterminados para una instancia y sólo ejecutar consultas personalizadas con un usuario recopilador de métricas existente, inserta la etiqueta (tag) `only_custom_queries` con un valor de `true`. Esto permite que una instancia configurada de la integración de Oracle evite que se ejecuten las métricas del sistema, del proceso y del espacio de tablas y permite que se ejecuten consultas personalizadas sin tener los permisos descritos en la sección [Creación de usuario de Datadog](#datadog-user-creation). Si se omite esta entrada de configuración, el usuario que se especifique debe tener esos permisos de tabla para ejecutar una consulta personalizada.

```yaml
init_config:

instances:
  ## @param server - string - required
  ## The IP address or hostname of the Oracle Database Server.
  #
  - server: localhost:1521

    ## @param service_name - string - required
    ## The Oracle Database service name. To view the services available on your server,
    ## run the following query:
    ## `SELECT value FROM v$parameter WHERE name='service_names'`
    #
    service_name: "<SERVICE_NAME>"

    ## @param username - string - required
    ## The username for the user account.
    #
    username: <USER>

    ## @param password - string - required
    ## The password for the user account.
    #
    password: "<PASSWORD>"

    ## @param only_custom_queries - string - optional
    ## Set this parameter to any value if you want to only run custom
    ## queries for this instance.
    #
    only_custom_queries: true
```

#### Conexión a Oracle a través de TCPS

1. Para conectarte a Oracle a través de TCPS (TCP con SSL), quita la marca de comentario de la opción de configuración `protocol` y selecciona `TCPS`. Actualiza la opción `server` para configurar el servidor TCPS en el monitor.

    ```yaml
    init_config:

    instances:
      ## @param server - string - required
      ## The IP address or hostname of the Oracle Database Server.
      #
      - server: localhost:1522

        ## @param service_name - string - required
        ## The Oracle Database service name. To view the services available on your server,
        ## run the following query:
        ## `SELECT value FROM v$parameter WHERE name='service_names'`
        #
        service_name: "<SERVICE_NAME>"

        ## @param username - string - required
        ## The username for the user account.
        #
        username: <USER>

        ## @param password - string - required
        ## The password for the user account.
        #
        password: "<PASSWORD>"

        ## @param protocol - string - optional - default: TCP
        ## The protocol to connect to the Oracle Database Server. Valid protocols include TCP and TCPS.
        ##
        ## When connecting to Oracle Database via JDBC, `jdbc_truststore` and `jdbc_truststore_type` are required.
        ## More information can be found from Oracle Database's whitepaper:
        ##
        ## https://www.oracle.com/technetwork/topics/wp-oracle-jdbc-thin-ssl-130128.pdf
        #
        protocol: TCPS
    ```

2. Actualiza `sqlnet.ora`, `listener.ora` y `tnsnames.ora` para permitir conexiones a TCPS en tu base de datos de Oracle.

##### TCPS a través de Oracle sin JDBC

Si no utilizas JDBC, comprueba que el Datadog Agent pueda conectarse a tu base de datos. Utiliza la herramienta de línea de comandos `sqlplus` con la información introducida en tus opciones de configuración:

```shell
sqlplus <USER>/<PASSWORD>@(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCPS)(HOST=<HOST>)(PORT=<PORT>))(SERVICE_NAME=<SERVICE_NAME>)))
```

Cuando utilices la conexión a [Oracle Instant Client][5], mueve tres archivos al directorio `network/admin` de las bibliotecas del cliente utilizadas por tu aplicación:
  * `tnsnames.ora`: Asigna los nombres de servicios de red utilizados para las cadenas de conexión de la aplicación a tus servicios de la base de datos.
  * `sqlnet.ora`: Configura los parámetros de la red de Oracle.
  * `cwallet.sso`: Activa las conexiones SSL o TLS. Mantén este archivo seguro.

##### TCPS a través de JDBC

Si te conectas a la base de datos de Oracle mediante JDBC, también deberás especificar `jdbc_truststore_path`, `jdbc_truststore_type` y `jdbc_truststore_password` (opcional) si existe una contraseña en el almacén de confianza.

**Nota**: Los almacenes de confianza de `SSO` no requieren contraseñas.

```yaml
    # In the `instances:` section
    ...

    ## @param jdbc_truststore_path - string - optional
    ## The JDBC truststore file path.
    #
    jdbc_truststore_path: /path/to/truststore

    ## @param jdbc_truststore_type - string - optional
    ## The JDBC truststore file type. Supported truststore types include JKS, SSO, and PKCS12.
    #
    jdbc_truststore_type: SSO

    ## @param jdbc_truststore_password - string - optional
    ## The password for the truststore when connecting via JDBC.
    #
    # jdbc_truststore_password: <JDBC_TRUSTSTORE_PASSWORD>
```

Para obtener más información sobre la conexión a la base de datos de Oracle a través de TCPS en JDBC, consulta el [documento de Oracle][4] oficial.

[1]: https://github.com/DataDog/integrations-core/blob/master/oracle/datadog_checks/oracle/data/conf.yaml.example
[2]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://www.oracle.com/technetwork/topics/wp-oracle-jdbc-thin-ssl-130128.pdf
[5]: https://python-oracledb.readthedocs.io/en/latest/user_guide/connection_handling.html#install-the-wallet-and-network-configuration-files

{{% /tab %}}

{{% tab "Containerized" %}}
Para entornos con contenedores, consulta las [Plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `oracle`                                                                                                  |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                                                             |
| `<INSTANCE_CONFIG>`  | `{"server": "%%host%%:1521", "service_name":"<SERVICE_NAME>", "username":"datadog", "password":"<PASSWORD>"}` |

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/

{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][9] y busca `oracle` en la sección Checks.

## Consulta personalizada

También es posible realizar consultas personalizadas. Cada consulta debe tener dos parámetros:

| Parámetro       | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `query`         | Este es el SQL a ejecutar. Puede ser una instrucción simple o un script de varias líneas. Se evalúan todas las filas del resultado.                                                                                                                                                                                                                                                                                                                        |
| `columns`       | Se trata de una lista que representa a cada columna, ordenada secuencialmente de izquierda a derecha. Se requieren dos datos: <br> a. `type` - Es el método de envío (`gauge`, `count`, etc.). <br> b. nombre - Es el sufijo utilizado para formar el nombre completo de la métrica. Si `type` es `tag`, esta columna se considera una etiqueta (tag) que se aplica a todas las métricas recopiladas por esta consulta en particular. |

Opcionalmente, utiliza el parámetro `tags` para aplicar una lista de etiquetas (tags) a cada métrica recopilada.

Lo siguiente:

```python
self.gauge('oracle.custom_query.metric1', value, tags=['tester:oracle', 'tag1:value'])
self.count('oracle.custom_query.metric2', value, tags=['tester:oracle', 'tag1:value'])
```

es en lo que se convertiría el siguiente ejemplo de configuración:

```yaml
- query: | # Use the pipe if you require a multi-line script.
    SELECT columns
    FROM tester.test_table
    WHERE conditions
  columns:
    # Put this for any column you wish to skip:
    - {}
    - name: metric1
      type: gauge
    - name: tag1
      type: tag
    - name: metric2
      type: count
  tags:
    - tester:oracle
```

Consulta el [ejemplo oracle.d/conf.yaml][5] para ver todas las opciones de configuración disponibles.

### Ejemplo

Crea una configuración de consulta que contribuya a identificar los bloqueos de la base de datos:

1. Para incluir una consulta personalizada, modifica `conf.d\oracle.d\conf.yaml`. Quita la marca de comentario del bloque `custom_queries`, añade las consultas y columnas requeridas y reinicia el Agent.

```yaml
  init_config:
  instances:
      - server: localhost:1521
        service_name: orcl11g.us.oracle.com
        username: datadog
        password: xxxxxxx
        jdbc_driver_path: /u01/app/oracle/product/11.2/dbhome_1/jdbc/lib/ojdbc6.jar
        tags:
          - db:oracle
        custom_queries:
          - query: |
              select blocking_session, username, osuser, sid, serial# as serial, wait_class, seconds_in_wait
              from v_$session
              where blocking_session is not NULL order by blocking_session
            columns:
              - name: blocking_session
                type: gauge
              - name: username
                type: tag
              - name: osuser
                type: tag
              - name: sid
                type: tag
              - name: serial
                type: tag
              - name: wait_class
                type: tag
              - name: seconds_in_wait
                type: tag
```

2. Para acceder a `v_$session`, concede permiso a `DATADOG` y prueba los permisos.

```text
SQL> grant select on sys.v_$session to datadog;

##connecting with the DD user to validate the access:


SQL> show user
USER is "DATADOG"


##creating a synonym to make the view visible
SQL> create synonym datadog.v_$session for sys.v_$session;


Synonym created.


SQL> select blocking_session,username,osuser, sid, serial#, wait_class, seconds_in_wait from v_$session
where blocking_session is not NULL order by blocking_session;
```

3. Una vez configurado, puedes crear un [monitor][10] basado en métricas de `oracle.custom_query.locks`.

## Solucionar problemas

### Problemas comunes

#### Oracle Native Client
- Si encuentras un `DPY-6000: cannot connect to database`:
  ```text
  Failed to connect to Oracle DB, error: DPY-6000: cannot connect to database. Listener refused connection. (Similar to ORA-12660)
  ```
 - Asegúrate de que el cifrado nativo de red o la suma de comprobación no estén activados. Si están activados, debes utilizar el método de Instant Client configurando `use_instant_client: true`.

Para obtener más información sobre la configuración de Oracle Instant Client, consulta la [documentación sobre la integración de Oracle][3].

#### Oracle Instant Client
- Comprueba que los archivos de Oracle Instant Client y de SDK estén en el mismo directorio.
La estructura del directorio debería ser similar:
  ```text
  |___ BASIC_LITE_LICENSE
  |___ BASIC_LITE_README
  |___ adrci
  |___ genezi
  |___ libclntsh.so -> libclntsh.so.19.1
  |___ libclntsh.so.10.1 -> libclntsh.so.19.1
  |___ libclntsh.so.11.1 -> libclntsh.so.19.1
  |___ libclntsh.so.12.1 -> libclntsh.so.19.1
  |___ libclntsh.so.18.1 -> libclntsh.so.19.1
  |___ libclntsh.so.19.1
  |___ libclntshcore.so.19.1
  |___ libipc1.so
  |___ libmql1.so
  |___ libnnz19.so
  |___ libocci.so -> libocci.so.19.1
  |___ libocci.so.10.1 -> libocci.so.19.1
  |___ libocci.so.11.1 -> libocci.so.19.1
  |___ libocci.so.12.1 -> libocci.so.19.1
  |___ libocci.so.18.1 -> libocci.so.19.1
  |___ libocci.so.19.1
  |___ libociicus.so
  |___ libocijdbc19.so
  |___ liboramysql19.so
  |___ listener.ora
  |___ network
  |   `___ admin
  |       |___ README
  |       |___ cwallet.sso
  |       |___ sqlnet.ora
  |       `___ tnsnames.ora
  |___ ojdbc8.jar
  |___ ucp.jar
  |___ uidrvci
  `___ xstreams.jar
  ```

#### Controlador JDBC (sólo Linux)
- Si encuentras un `JVMNotFoundException`:

    ```text
    JVMNotFoundException("No JVM shared library file ({jpype._jvmfinder.JVMNotFoundException: No JVM shared library file (libjvm.so) found. Try setting up the JAVA_HOME environment variable properly.})"
    ```

    - Asegúrate de que la variable de entorno `JAVA_HOME` esté configurada y que apunte al directorio correcto.
    - Añade la variable de entorno a `/etc/environment`:
        ```text
        JAVA_HOME=/path/to/java
        ```
    - A continuación, reinicia el Agent.

- Si encuentras este error `Unsupported major.minor version 52.0` significa que estás ejecutando una versión muy antigua de Java. Necesitas actualizar tu sistema Java o instalar una versión más reciente y apuntar tu variable `JAVA_HOME` a la nueva instalación como se explicó anteriormente.

- Comprueba que las variables de entorno estén configuradas correctamente ejecutando el siguiente comando desde el Agent.
Asegúrate de que la salida mostrada coincida con el valor correcto.

    ```shell script
      sudo -u dd-agent -- /opt/datadog-agent/embedded/bin/python -c "import os; print(\"JAVA_HOME:{}\".format(os.environ.get(\"JAVA_HOME\")))"
    ```

¿Necesitas ayuda? Ponte en contacto con [Soporte técnico de Datadog][14].

[1]: https://docs.datadoghq.com/es/integrations/oracle/?tab=linux
[2]: https://oracle.github.io/python-oracledb/
[3]: https://github.com/DataDog/integrations-core/tree/7.41.x/oracle#oracle-instant-client
[4]: https://www.oracle.com/technetwork/database/application-development/jdbc/downloads/index.html
[5]: https://github.com/DataDog/integrations-core/blob/master/oracle/datadog_checks/oracle/data/conf.yaml.example
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/es/monitors/monitor_types/metric/?tab=threshold
[11]: https://github.com/DataDog/integrations-core/blob/master/oracle/metadata.csv
[12]: https://github.com/DataDog/integrations-core/blob/master/oracle/assets/service_checks.json
[14]: https://docs.datadoghq.com/es/help/
[18]: https://www.oracle.com/technetwork/database/features/instant-client/index.htm