---
aliases:
- /es/integrations/faq/connection-issues-with-the-sql-server-integration
title: Problemas de conexión con la integración de SQL Server
---

## Problemas comunes de conexión a SQL Server

Puedes configurar el Datadog Agent para recopilar métricas de SQL Server siguiendo las instrucciones del [cuadro de integración de SQL Server][1] en tu cuenta. Esta integración ofrece varias [métricas de SQL Server][2] básicas, que puedes ampliar a [tu gusto][3].

Pero hay un error de conexión común que los usuarios se encuentran mientras configuran esta integración, uno que puede ser especialmente frustrante para solucionar problemas, ya que hay muchas variables que pueden causarlo. En su totalidad, el error tiene el siguiente aspecto:

```text
'Unable to connect to SQL Server for instance 127.0.0.1,1433 - None. \n Traceback (most recent call last):\n File "C:\\Program Files (x86)\\Datadog\\Datadog Agent\\files\\..\\checks.d\\sqlserver.py", line 219, in get_cursor\n File "adodbapi\\adodbapi.pyc", line 116, in connect\nOperationalError: (com_error(-2147352567, \'Exception occurred.\', (0, u\'Microsoft OLE DB Provider for SQL Server\', u\'[DBNETLIB][ConnectionOpen (Connect()).]SQL Server does not exist or access denied.\', None, 0, -2147467259), None), \'Error opening connection to "Provider=SQLOLEDB;Data Source=127.0.0.1,1433;Initial Catalog=master;User ID=datadog;Password=******;"\')\n'
```

Este error indica que el Agent no ha podido conectarse a tu SQL Server para completar la recopilación de datos. Esto podría ser causado por cualquiera de los siguientes errores:

* Un error tipográfico en tu host `conf.yaml`, puerto, nombre de usuario o contraseña de SQL Server (comprobar todo tres veces).
* Tu contraseña contiene un punto y coma (`;`): utiliza llaves alrededor de la contraseña para resolver (`password: "{<PASSWORD>}"`)
* No se ha habilitado la conexión TCP/IP de tu SQL Server.
* La dirección IPv4 de tu SQL Server es incorrecta o no coincide con la que has proporcionado en tu `conf.yaml` de SQL Server.
* El puerto TCP/IP de tu SQL Server es incorrecto o no coincide con el que has proporcionado en tu `conf.yaml` de SQL Server.
* El modo de autenticación de tu SQL Server no está configurado en la opción adecuada entre "SQL Server and Windows Authentication mode" (Modo de autenticación de SQL Server y Windows) frente a "Windows Authentication mode" (Modo de autenticación de Windows)

Si no estás seguro de cómo configurar un servidor para que escuche en la dirección/puerto TCP/IP correctos, la página [Configure a Server to Listen on a Specific TCP Port][4] de Microsoft debería darte alguna orientación (IPv4 e IPALL son las partes específicamente relevantes; allí, puedes configurar tu puerto como "Dinámico" o como "Estático", pero el que no estés utilizando debe dejarse en blanco). Si el Agent está instalado en el mismo host que tu SQL Server, puede ser apropiado establecer tu opción host a "127.0.0.1", incluso si el host no es un host local desde tu perspectiva como usuario. El puerto estándar para conexiones a SQL Server es 1433.

Si no estás seguro de cómo configurar el modo de autenticación de tu SQL Server, consulta el artículo de Microsoft [Choose an Authentication Mode][5].

**Nota**: Si realizas alguno de los cambios anteriores en SQL Server, deberás reiniciar SQL Server antes de que los cambios surtan efecto.

He aquí un ejemplo de algunas configuraciones IP/TCP de SQL Server que han funcionado en uno de los entornos de test de Datadog (Windows 2012 R2, SQL Server 2014 Express):
{{< img src="integrations/faq/sql_server_test_1.png" alt="la ventana de propiedades de TCP/IP con la pestaña de direcciones IP seleccionada. La sección IP4 está configurada con sí activo y no activado. La dirección IP está configurado en 127.0.0.1 y los puertos dinámicos TCP están configurado en 1433. El puerto TCP queda en blanco." >}}

{{< img src="integrations/faq/sql_server_test_2.png" alt="la ventana de propiedades de TCP/IP con la pestaña de direcciones IP seleccionada. En la sección IPAll, los puertos dinámicos TCP están activados en 1433 y el puerto TCP queda en blanco." >}}

## Cadena de conexión vacía

El check de SQL Server de Datadog se basa en la librería adodbapi de Python, que tiene algunas limitaciones en cuanto a los caracteres que puedes utilizar para establecer una cadena de conexión con un SQL Server. Si tu Agent experimenta problemas para conectarse a tu SQL Server y si encuentras errores similares a los siguientes en tu collector.logs del Agent, tu `sqlserver.yaml` probablemente incluye algún carácter que causa problemas con adodbapi.

```text
OperationalError: (KeyError('Python string format error in connection string->',), 'Error opening connection to ""')
```

Por el momento, el único carácter conocido que causa este problema específico de conectividad es el carácter `%`. Si deseas utilizar el carácter "%" en tu `sqlserver.yaml`, es decir, si tu contraseña de usuario de Datadog SQL Server incluye un `%`, deberás escapar de ese carácter incluyendo un doble `%%` en lugar de un `%` único.

## Conexión a SQL Server en un host de Linux

Para conectar SQL Server (ya sea alojado en Linux o Windows) a un host de Linux:

1. Instala el [controlador de Microsoft ODBC][6] para tu distribución de Linux.
    Si no estás seguro del nombre del controlador que debes utilizar, puedes encontrarlo entre paréntesis en la parte superior de `/etc/odbcinst.ini`.

    ```text
    $ cat /etc/odbcinst.ini
    [ODBC Driver 13 for SQL Server]
    Description=Microsoft ODBC Driver 13 for SQL Server
    Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.1.so.7.0
    UsageCount=1
    ```
2. Copia los archivos `odbc.ini` y `odbcinst.ini` en la carpeta `/opt/datadog-agent/embedded/etc`.
3. Si es necesario, instala el módulo pyodbc. Esto se puede hacer ejecutando pip install pyodbc dentro de tu entorno de Python del Agent. Por ejemplo:

    ```shell
    $ sudo /opt/datadog-agent/embedded/bin/pip install pyodbc
    ```
3. Configura tu `conf.yaml` de SQL Server para utilizar el conector odbc y especifica el controlador adecuado como se indica en el archivo `odbcinst.ini`.

    ```yaml
    init_config:

    instances:
      - host: <HOST>,<PORT>
        # enable the odbc connector
        connector: odbc
        # enable the ODBC driver
        driver: ODBC Driver 13 for SQL Server
        username: <USERNAME>
        password: <PASSWORD>
    ```


[1]: https://app.datadoghq.com/account/settings#integrations/sql_server
[2]: /es/integrations/sqlserver/#metrics
[3]: /es/integrations/guide/collect-more-metrics-from-the-sql-server-integration/
[4]: https://msdn.microsoft.com/en-us/library/ms177440.aspx
[5]: https://msdn.microsoft.com/en-us/library/ms144284.aspx
[6]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux/installing-the-microsoft-odbc-driver-for-sql-server-on-linux
