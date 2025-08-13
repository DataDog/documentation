---
aliases:
- /es/service_management/workflows/private_actions/private_action_credentials
- /es/service_management/app_builder/private_actions/private_action_credentials
disable_toc: false
title: Gestionar credenciales de acciones privadas
---

{{< callout url="https://www.datadoghq.com/product-preview/private-actions/" btn_hidden="false" header="Únete a la vista previa">}}
Las Acciones privadas están en vista previa. Utiliza este formulario para solicitar acceso hoy mismo.
{{< /callout >}}

## Información general

Las acciones privadas permiten a sus flujos de trabajo y aplicaciones Datadog interactuar con servicios alojados en tu red privada sin exponer tus servicios a la Internet pública. Para utilizar acciones privadas, debes utilizar Docker para instalar un ejecutor de acciones privadas en un host de tu red y emparejarlo con una conexión Datadog. Para obtener más información sobre cómo configurar un ejecutor y emparejarlo con una conexión, consulta [Acciones privadas][1].

Algunas acciones privadas, como Jenkins y PostgreSQL, requieren credenciales para poder funcionar. Para configurar credenciales para una acción privada, debes:
1. Crear un archivo JSON para la credencial y utilizar la estructura JSON proporcionada en [Archivos de credenciales](#credential-files).
2. Guardar tus archivos de credenciales en el directorio de configuración que creaste durante la configuración.
3. Especificar la ruta a la credencial en la conexión del ejecutor. Utiliza la ruta a la credencial en el contenedor. Por ejemplo: `/etc/dd-action-runner/config/credentials/jenkins_creds.json`.

## Archivos de credenciales

{{< tabs >}}
{{% tab "PostgreSQL" %}}

La conexión PostgreSQL acepta las siguientes credenciales:

|  Credencial    | Obligatorio    | Descripción |
| -------------  | ----------- | ----------- |
| `host` | Sí | El nombre del host al que conectarse. Para obtener más información, consulta [la documentación oficial de PostGreSQL][101]. |
| `port` | Sí | El número del puerto al que conectarse en el host del servidor o la extensión del nombre de archivo del socket para conexiones de dominio UNIX. Para obtener más información, consulta [la documentación oficial de PostGreSQL][102]. |
| `user` | Sí | El nombre de usuario PostgreSQL al que conectarse.<br><br>Para obtener más información, consulta [la documentación oficial de PostGreSQL][103]. |
| `password` | Sí | La contraseña a utilizar si el servidor exige autenticación por contraseña. <br><br>Para obtener más información, consulta [la documentación oficial de PostGreSQL][104]. |
| `database` | Sí | El nombre de la base de datos. Para obtener más información, consulta [la documentación oficial de PostGreSQL][105]. |
| `sslmode` | Sí | Esta opción determina si se negocia una conexión segura SSL TCP/IP con el servidor y con qué prioridad.<br><br>Las opciones disponibles son `require` y `disable`.<br><br>Para obtener más información, consulta [la documentación oficial de PostGreSQL][106]. |
| `applicationName` | No | El nombre de la aplicación que se conecta al servidor PostGreSQL. Para obtener más información, consulta [la documentación oficial de PostGreSQL][107]. |
| `searchPath` | No | Establece una ruta de búsqueda de esquemas. Para obtener más información, consulta [la documentación oficial de PostGreSQL][108]. |

Incluye todas las credenciales en un único archivo.

En la conexión del ejecutor, especifica la localización del archivo de credenciales en el contenedor del ejecutor de acciones privadas. En este ejemplo, las tres credenciales están almacenadas en un único archivo. Sustituye los valores del ejemplo en mayúsculas por tus credenciales.

{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/postgresql_token.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "host",
                        "tokenValue": "YOUR_HOST_NAME"
                },
                {
                        "tokenName": "port",
                        "tokenValue": "YOUR_PORT"
                },
                {
                        "tokenName": "user",
                        "tokenValue": "YOUR_USER"
                },
                {
                        "tokenName": "password",
                        "tokenValue": "YOUR_PASSWORD"
                },
                {
                        "tokenName": "database",
                        "tokenValue": "YOUR_DATABASE_NAME"
                },
                {
                        "tokenName": "sslmode",
                        "tokenValue": "disable"
                },
                {
                        "tokenName": "applicationName",
                        "tokenValue": "YOUR_APPLICATION_NAME"
                },
                {
                        "tokenName": "searchPath",
                        "tokenValue": "YOUR_SEARCH_PATH"
                }
        ]
}
{{< /code-block >}}

En la conexión del ejecutor, especifica la localización del archivo de credenciales en el contenedor del ejecutor de acciones privadas. Tu conexión PostgreSQL apunta a la misma ruta para todas las credenciales. En este ejemplo, el archivo de credenciales está almacenado en `/etc/dd-action-runner/config/credentials/postgresql_token.json` en el ejecutor.

{{< img src="service_management/private-runner-creds1.png" alt="La ruta al archivo de credenciales es '/etc/dd-action-runner/config/credentials/postgresql_token.json'" style="width:80%;" >}}

[101]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-HOST
[102]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-PORT
[103]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-USER
[104]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-PASSWORD
[105]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-DBNAME
[106]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-SSLMODE
[107]: https://www.postgresql.org/docs/current/runtime-config-logging.html#GUC-APPLICATION-NAME
[108]: https://www.postgresql.org/docs/15/ddl-schemas.html#DDL-SCHEMAS-PATH
{{% /tab %}}

{{% tab "Jenkins" %}}

Las conexiones Jenkins requieren tres credenciales:
- **Nombre de usuario**: El nombre de usuario del usuario de Jenkins que quieres utilizar para autenticarte con el servidor Jenkins. Este usuario debe tener los permisos necesarios para las acciones que quieres realizar.
- **Token**: El token de la API del usuario de Jenkins que quieres utilizar para autenticarte con el servidor Jenkins. Este usuario debe tener los permisos necesarios para las acciones que quieres realizar. Puedes generar un token de API en la configuración del usuario de Jenkins.
- **Dominio**: El dominio del servidor Jenkins al que quieres conectarte.

Puedes incluir todas las credenciales en un único archivo o almacenar cada credencial en un archivo independiente.

{{% collapse-content title="Ejemplo de archivo único" level="p" %}}

En la conexión del ejecutor, especifica la localización del archivo de credenciales en el contenedor del ejecutor de acciones privadas. En este ejemplo, las tres credenciales están almacenadas en un único archivo. Sustituye `USERNAME`, `TOKEN` y `DOMAIN` por tu nombre de usuario, tu token y tu dominio.

{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/jenkins_creds.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "username",
                        "tokenValue": "USERNAME"
                },
                {
                        "tokenName": "token",
                        "tokenValue": "TOKEN"
                },
                {
                        "tokenName": "domain",
                        "tokenValue": "DOMAIN"
                }
        ]
}
{{< /code-block >}}

En la conexión del ejecutor, especifica la localización del archivo de credenciales en el contenedor del ejecutor de acciones privadas. Tu conexión Jenkins apunta a la misma ruta para todas las credenciales. En este ejemplo, el archivo de credenciales está almacenado en `/etc/dd-action-runner/config/credentials/jenkins_creds.json` en el ejecutor.

{{< img src="service_management/single-file-creds.png" alt="Todas las rutas de credenciales de la conexión Jenkins apuntan a '/etc/dd-action-runner/config/credentials/jenkins_creds.json'" style="width:80%;" >}}

{{% /collapse-content %}}
{{% collapse-content title="Ejemplo de varios archivos" level="p" %}}
En este ejemplo, cada credencial de Jenkins está almacenada en un archivo independiente.

Para la credencial de nombre de usuario, sustituye `USERNAME` por tu nombre de usuario.

{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/jenkins_username.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "username",
                        "tokenValue": "USERNAME"
                }
        ]
}
{{< /code-block >}}

Para la credencial de token, sustituye `TOKEN` por tu token.

{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/jenkins_token.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "token",
                        "tokenValue": "TOKEN"
                }
        ]
}
{{< /code-block >}}

Para la credencial de dominio, sustituye `DOMAIN` por tu dominio.

{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/jenkins_domain.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "domain",
                        "tokenValue": "DOMAIN"
                }
        ]
}
{{< /code-block >}}

En la conexión del ejecutor, especifica la localización del archivo de credenciales en el contenedor del ejecutor de acciones privadas. Tu conexión Jenkins apunta a la ruta para de cada credencial. En este ejemplo, el archivo de credenciales está almacenado en las siguientes localizaciones del ejecutor.
- `/etc/dd-action-runner/config/credentials/jenkins_username.json`
- `/etc/dd-action-runner/config/credentials/jenkins_token.json`
- `/etc/dd-action-runner/config/credentials/jenkins_domain.json`

{{< img src="service_management/multi-file-creds.png" alt="Cada ruta apunta a la localización del archivo de credenciales en el contenedor del ejecutor" style="width:80%;" >}}

{{% /collapse-content %}}

{{% /tab %}}

{{% tab "Acción HTTP" %}}

### Autenticación básica

La autenticación básica para la conexión HTTP requiere un archivo de credenciales con un nombre de usuario y una contraseña.

Sustituye `USERNAME` y `PASSWORD` por tu nombre de usuario y tu contraseña.

{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/http_creds.json" disable_copy="false" collapsible="true" >}}
{
    "auth_type": "Basic Auth",
    "credentials": [
        {
            "username": "USERNAME",
            "password": "PASSWORD"
        }
    ]
}
{{< /code-block >}}

En la conexión del ejecutor, especifica la localización del archivo de credenciales en el contenedor del ejecutor de acciones privadas. En este ejemplo, el archivo de credenciales está almacenado en `/etc/dd-action-runner/config/credentials/http_creds.json` en el ejecutor.

{{< img src="service_management/http-creds.png" alt="La ruta al archivo de credenciales es '/etc/dd-action-runner/config/credentials/http_creds.json'" style="width:80%;" >}}

### Autenticación mediante token

La autenticación mediante token para la conexión HTTP requiere un archivo de credenciales con una matriz de nombres y valores de tokens.

El siguiente ejemplo incluye dos tokens denominados `TOKEN1` y `TOKEN2`. Sustituye los nombres y los valores de los tokens del ejemplo por los tuyos.

{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/http_creds.json" disable_copy="false" collapsible="true" >}}
{
    "auth_type": "Token Auth",
    "credentials": [
        {
            "tokenName": "TOKEN1",
            "tokenValue": "VALUE1"
        },
        {
            "tokenName": "TOKEN2",
            "tokenValue": "VALUE2"
        }
    ]
}
{{< /code-block >}}

En la conexión del ejecutor, especifica la localización del archivo de credenciales en el contenedor del ejecutor de acciones privadas. En este ejemplo, el archivo de credenciales está almacenado en `/etc/dd-action-runner/config/credentials/http_creds.json` en el ejecutor.

[101]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING-URIS
{{% /tab %}}

{{< /tabs >}}

[1]: /es/actions/private_actions
