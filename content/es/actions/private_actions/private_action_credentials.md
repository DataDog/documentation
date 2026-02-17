---
aliases:
- /es/service_management/workflows/private_actions/private_action_credentials
- /es/service_management/app_builder/private_actions/private_action_credentials
description: Configura las credenciales para acciones privadas, incluidos los métodos
  de autenticación HTTP, Jenkins, PostgreSQL, MongoDB y Temporal.
disable_toc: false
title: Gestionar credenciales de acciones privadas
---

## Información general

Las acciones privadas permiten a tus procesos y aplicaciones de Datadog interactuar con servicios alojados en tu red privada sin exponer tus servicios a la Internet pública. Para utilizar acciones privadas, debes instalar un ejecutor de acción privado en un host de tu red y emparejar el ejecutor con una conexión de Datadog. Para obtener más información sobre cómo configurar un ejecutor y emparejarlo con una conexión, consulta [Private Actions][1].

Algunas acciones privadas, como Jenkins y PostgreSQL, requieren credenciales para poder funcionar. Para configurar credenciales para una acción privada, debes:
1. Navega hasta el directorio donde almacenaste la configuración de tu ejecutor (por defecto: `config/credentials/`).
2. En este directorio, crea un archivo JSON utilizando la estructura JSON proporcionada en los archivos de credenciales. Como alternativa, edita el archivo JSON predeterminado generado automáticamente durante el arranque del ejecutor.
   - **Nota**: Estos archivos están disponibles para el ejecutor en su directorio `/etc/dd-action-runner/config/credentials/`.
3. Especifica la ruta a la credencial en la conexión del ejecutor. Utiliza la ruta al archivo en el contenedor. Por ejemplo: `/etc/dd-action-runner/config/credentials/jenkins_token.json`.

## Archivos de credenciales

{{< tabs >}}
{{% tab "HTTP" %}}

HTTP admite tres métodos de autenticación:

- **Autenticación básica**: utilízala cuando tu servidor HTTP requiera autenticación de nombre de usuario y contraseña.
- **Autenticación por token**: utilízalo cuando tu servidor HTTP requiera uno o más tokens personalizados en encabezados o parámetros de consulta.
- **Sin autenticación**: utilízalo cuando tu servidor HTTP no requiera autenticación.

### Autenticación básica

La autenticación básica requiere un archivo de credenciales con un nombre de usuario y una contraseña:

{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/http_basic.json" disable_copy="false" collapsible="true" >}}
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

Sustituye `USERNAME` y `PASSWORD` por tu nombre de usuario y tu contraseña.

En la conexión del ejecutor, especifica la ubicación del archivo de credenciales en el contenedor del ejecutor de acción privado. En este ejemplo, el archivo de credenciales se almacena en `/etc/dd-action-runner/config/credentials/http_basic.json`.

{{< img src="service_management/par-http-basic-credentials.png" alt="La ruta al archivo de credenciales es '/etc/dd-action-runner/config/credentials/http_basic.json'" style="width:80%;" >}}

### Autenticación mediante token

La autenticación por token requiere un archivo de credenciales con una matriz de nombres y valores de token:

{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/http_token.json" disable_copy="false" collapsible="true" >}}
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

Sustituye `TOKEN1`, `TOKEN2`, `VALUE1` y `VALUE2` por los nombres y valores de tus tokens.

En la conexión del ejecutor, especifica la ubicación del archivo de credenciales en el contenedor del ejecutor de acción privado. En este ejemplo, el archivo de credenciales se almacena en `/etc/dd-action-runner/config/credentials/http_token.json`.

{{< img src="service_management/par-http-token-credentials.png" alt="La ruta al archivo de credenciales es '/etc/dd-action-runner/config/credentials/http_token.json'" style="width:80%;" >}}

### Sin autenticación

Este tipo de conexión es adecuado para los endpoints HTTP que no requieren autenticación.

Para configurar este conexión, especifica la URL del endpoint:

{{< img src="service_management/par-http-no-auth-credentials.png" alt="Una conexión HTTP sin autenticación" style="width:80%;" >}}

[101]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING-URIS
{{% /tab %}}

{{% tab "GitLab" %}}

La conexión de GitLab acepta las siguientes credenciales:

|  Credencial    | Obligatorio    | Descripción |
| -------------  | ----------- | ----------- |
| `baseURL` | Sí | La URL de tu instancia autogestionada de GitLab. Para más información, consulta [Documentación de la API de GitLab][201]. |
| `gitlabApiToken` | Sí | El token de la API para autenticarte con tu instancia de GitLab. Genera este token en tu configuración de usuario de GitLab. |

Incluye todas las credenciales en un único archivo:

{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/gitlab_token.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "gitlabApiToken",
                        "tokenValue": "GITLAB_API_TOKEN"
                },
                {
                        "tokenName": "baseURL",
                        "tokenValue": "GITLAB_URL"
                }
        ]
}
{{< /code-block >}}



Sustituye `GITLAB_API_TOKEN` y `GITLAB_URL` por tus credenciales.

En la conexión del ejecutor, especifica la ubicación del archivo de credenciales en el contenedor del ejecutor de acción privado. En este ejemplo, el archivo de credenciales se almacena en `/etc/dd-action-runner/config/credentials/gitlab_token.json`.

{{< img src="service_management/par-gitlab-credentials.png" alt="La ruta al archivo de credenciales es '/etc/dd-action-runner/config/credentials/gitlab_token.json'" style="width:80%;" >}}

[201]: https://docs.gitlab.com/ee/api/
{{% /tab %}}

{{% tab "Jenkins" %}}

La conexión de Jenkins acepta las siguientes credenciales:

|  Credencial    | Obligatorio    | Descripción |
| -------------  | ----------- | ----------- |
| `domain` | Sí | El dominio del servidor de Jenkins al que deseas conectarte. |
| `username` | Sí | El nombre de usuario del usuario de Jenkins que deseas utilizar para autenticarte con el servidor de Jenkins. Este usuario debe tener los permisos necesarios para realizar las acciones que deseas que realice el ejecutor. |
| `token` | Sí | El token de API del usuario de Jenkins que deseas utilizar para autenticarte con el servidor de Jenkins. Este usuario debe tener los permisos necesarios para realizar las acciones que deseas realizar. Puedes generar un token de API en la configuración de usuario de Jenkins. |

Incluye todas las credenciales en un único archivo:


{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/jenkins_token.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "username",
                        "tokenValue": "USERNAME"
                },
                {
                        "tokenName": "token",
                        "tokenValue": "API_TOKEN"
                },
                {
                        "tokenName": "domain",
                        "tokenValue": "DOMAIN"
                }
        ]
}
{{< /code-block >}}

Sustituye `USERNAME`, `API_TOKEN` y `DOMAIN` por tus credenciales.


En la conexión del ejecutor, especifica la ubicación del archivo de credenciales en el contenedor del ejecutor de acción privado. En este ejemplo, el archivo de credenciales se almacena en `/etc/dd-action-runner/config/credentials/jenkins_token.json`.

{{< img src="service_management/par-jenkins-credentials.png" alt="La ruta al archivo de credenciales es '/etc/dd-action-runner/config/credentials/jenkins_token.json'" style="width:80%;" >}}

{{% /tab %}}

{{% tab "MongoDB" %}}

MongoDB admite dos métodos de autenticación:

- **Autenticación SRV**: utilízalo cuando te conectes a MongoDB Atlas o cuando necesites una detección automática de conjuntos de réplica y conmutación por error. Este método utiliza un registro de DNS SRV para detectar automáticamente todos los miembros de un conjunto de réplica.
- **Autenticación estándar**: utilízala cuando te conectes directamente a un servidor de MongoDB o cuando necesites especificar el host y el puerto exactos.

### Autenticación SRV

La autenticación SRV de MongoDB requiere las siguientes credenciales:

|  Credencial    | Obligatorio    | Descripción |
| -------------  | ----------- | ----------- |
| `username` | Sí | El nombre de usuario de MongoDB para la autenticación. |
| `password` | Sí | La contraseña de MongoDB para la autenticación. |
| `srvHost` | Sí | El host de SRV para MongoDB Atlas o la detección del conjunto de réplica. |
| `database` | No | El nombre de la base de datos a la que conectarte. |

Incluye todas las credenciales en un único archivo:

{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/mongodb_srv_token.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "username",
                        "tokenValue": "USERNAME"
                },
                {
                        "tokenName": "password",
                        "tokenValue": "PASSWORD"
                },
                {
                        "tokenName": "srvHost",
                        "tokenValue": "SRV_HOST"
                },
                {
                        "tokenName": "database",
                        "tokenValue": "DATABASE"
                }
        ]
}
{{< /code-block >}}

Sustituye `USERNAME`, `PASSWORD`, `SRV_HOST` y `DATABASE` por tus credenciales.

En la conexión del ejecutor, especifica la ubicación del archivo de credenciales en el contenedor del ejecutor de acción privado. En este ejemplo, el archivo de credenciales se almacena en `/etc/dd-action-runner/config/credentials/mongodb_srv_token.json`.

{{< img src="service_management/par-mongodb-srv-credentials.png" alt="La ruta al archivo de credenciales es '/etc/dd-action-runner/config/credentials/mongodb_srv_token.json'" style="width:80%;" >}}

### Autenticación estándar

La autenticación estándar de MongoDB acepta las siguientes credenciales:

|  Credencial    | Obligatorio    | Descripción |
| -------------  | ----------- | ----------- |
| `username` | Sí | El nombre de usuario de MongoDB para la autenticación. |
| `password` | Sí | La contraseña de MongoDB para la autenticación. |
| `host` | Sí | El nombre de host del servidor de MongoDB. |
| `port` | Sí | El número de puerto del servidor de MongoDB. |
| `database` | No | El nombre de la base de datos a la que conectarte. |
| `authSource` | No | La base de datos que contiene las credenciales del usuario. Especifica si el usuario se crea en una base de datos distinta de `admin`. |
| `authMechanism` | No | El mecanismo de autenticación a utilizar. Especifica si se requiere un mecanismo de autenticación específico. |

Incluye todas las credenciales en un único archivo:

{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/mongodb_standard_token.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "username",
                        "tokenValue": "USERNAME"
                },
                {
                        "tokenName": "password",
                        "tokenValue": "PASSWORD"
                },
                {
                        "tokenName": "host",
                        "tokenValue": "HOST"
                },
                {
                        "tokenName": "port",
                        "tokenValue": "PORT"
                },
                {
                        "tokenName": "database",
                        "tokenValue": "DATABASE"
                },
                {
                        "tokenName": "authSource",
                        "tokenValue": "AUTH_SOURCE"
                },
                {
                        "tokenName": "authMechanism",
                        "tokenValue": "AUTH_MECHANISM"
                }
        ]
}
{{< /code-block >}}

Sustituye `USERNAME`, `PASSWORD`, `HOST`, `PORT`, `DATABASE`, `AUTH_SOURCE` y `AUTH_MECHANISM` por tus credenciales.

En la conexión del ejecutor, especifica la ubicación del archivo de credenciales en el contenedor del ejecutor de acción privado. En este ejemplo, el archivo de credenciales se almacena en `/etc/dd-action-runner/config/credentials/mongodb_standard_token.json`.

{{< img src="service_management/par-mongodb-standard-credentials.png" alt="La ruta al archivo de credenciales es '/etc/dd-action-runner/config/credentials/mongodb_standard_token.json'" style="width:80%;" >}}

{{% /tab %}}


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

Incluye todas las credenciales en un único archivo:


{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/postgresql_token.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "host",
                        "tokenValue": "HOST_NAME"
                },
                {
                        "tokenName": "port",
                        "tokenValue": "PORT"
                },
                {
                        "tokenName": "user",
                        "tokenValue": "USER"
                },
                {
                        "tokenName": "password",
                        "tokenValue": "PASSWORD"
                },
                {
                        "tokenName": "database",
                        "tokenValue": "DATABASE_NAME"
                },
                {
                        "tokenName": "sslmode",
                        "tokenValue": "require"
                },
                {
                        "tokenName": "applicationName",
                        "tokenValue": "APPLICATION_NAME"
                },
                {
                        "tokenName": "searchPath",
                        "tokenValue": "SEARCH_PATH"
                }
        ]
}
{{< /code-block >}}

Sustituye los valores del ejemplo por tus credenciales.


En la conexión del ejecutor, especifica la ubicación del archivo de credenciales en el contenedor del ejecutor de acción privado. En este ejemplo, el archivo de credenciales se almacena en `/etc/dd-action-runner/config/credentials/postgresql_token.json`.

{{< img src="service_management/par-postgresql-credentials.png" alt="La ruta al archivo de credenciales es '/etc/dd-action-runner/config/credentials/postgresql_token.json`'" style="width:80%;" >}}

[101]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-HOST
[102]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-PORT
[103]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-USER
[104]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-PASSWORD
[105]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-DBNAME
[106]: https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNECT-SSLMODE
[107]: https://www.postgresql.org/docs/current/runtime-config-logging.html#GUC-APPLICATION-NAME
[108]: https://www.postgresql.org/docs/15/ddl-schemas.html#DDL-SCHEMAS-PATH
{{% /tab %}}

{{% tab "Temporal" %}}

El Temporal admite tres métodos de autenticación:

- **Autenticación mTLS**: utilízala para la comunicación más segura con autenticación de certificado bidireccional de servidor a cliente.
- **Autenticación TLS**: utilízala para una comunicación segura con autenticación de certificado de servidor.
- **Sin autenticación**: utilizar para una comunicación no cifrada (no recomendado para entornos de producción).

### Autenticación mTLS

La autenticación mTLS Temporal requiere las siguientes credenciales:

|  Credencial    | Obligatorio    | Descripción |
| -------------  | ----------- | ----------- |
| `serverAddress` | Sí | La dirección del servidor (nombre de host y puerto opcional). Si no se define, el puerto es por defecto 7233. |
| `serverNameOverride` | Sí | El nombre de servidor que anula el nombre de destino (SNI) utilizado para la comprobación del nombre de host de TLS. Esto puede ser útil cuando se tiene un proxy inverso delante de un servidor temporal y se desea anular el SNI para dirigir el tráfico al backend apropiado basándose en reglas personalizadas. |
| `serverRootCACertificate` | Sí | El certificado de CA raíz utilizado por el servidor. Si no se establece, y si el certificado del servidor lo emite una autoridad de confianza, la verificación seguirá siendo correcta (por ejemplo, si se utiliza un proveedor de nube como AWS, Google Cloud o Azure, que emiten certificados de servidor a través de CA reconocidas y de confianza). |
| `clientCertPairCrt` | Sí | El certificado del cliente para conectarte con mTLS. |
| `clientCertPairKey` | Sí | La clave del cliente para conectarte con mTLS. |

Incluye todas las credenciales en un único archivo:

{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/temporal_mTLS_token.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "serverAddress",
                        "tokenValue": "SERVER_ADDRESS"
                },
                {
                        "tokenName": "serverNameOverride",
                        "tokenValue": "SERVER_NAME_OVERRIDE"
                },
                {
                        "tokenName": "serverRootCACertificate",
                        "tokenValue": "SERVER_ROOT_CA_CERTIFICATE"
                },
                {
                        "tokenName": "clientCertPairCrt",
                        "tokenValue": "CLIENT_CERTIFICATE"
                },
                {
                        "tokenName": "clientCertPairKey",
                        "tokenValue": "CLIENT_KEY"
                }
        ]
}
{{< /code-block >}}

Sustituye `SERVER_ADDRESS`, `SERVER_NAME_OVERRIDE`, `SERVER_ROOT_CA_CERTIFICATE`, `CLIENT_CERTIFICATE` y `CLIENT_KEY` por tus credenciales.

En la conexión del ejecutor, especifica la ubicación del archivo de credenciales en el contenedor del ejecutor de acción privado. En este ejemplo, el archivo de credenciales se almacena en `/etc/dd-action-runner/config/credentials/temporal_mTLS_token.json`.

{{< img src="service_management/par-temporal-mtls-credentials.png" alt="La ruta del archivo de credenciales es '/etc/dd-action-runner/config/credentials/temporal_mTLS_token.json'" style="width:80%;" >}}

### Autenticación TLS

La autenticación TLS temporal requiere las siguientes credenciales:

|  Credencial    | Obligatorio    | Descripción |
| -------------  | ----------- | ----------- |
| `serverAddress` | Sí | La dirección del servidor (nombre de host y puerto opcional). Si no se define, el puerto es por defecto 7233. |
| `serverNameOverride` | Sí | El nombre de servidor que anula el nombre de destino (SNI) utilizado para la comprobación del nombre de host de TLS. Esto puede ser útil cuando se tiene un proxy inverso delante de un servidor temporal y se desea anular el SNI para dirigir el tráfico al backend apropiado basándose en reglas personalizadas. |
| `serverRootCACertificate` | Sí | El certificado de CA raíz utilizado por el servidor. Si no se establece, y si el certificado del servidor lo emite una autoridad de confianza, la verificación seguirá siendo correcta (por ejemplo, si se utiliza un proveedor de nube como AWS, Google Cloud o Azure, que emiten certificados de servidor a través de CA reconocidas y de confianza). |

Incluye todas las credenciales en un único archivo:

{{< code-block lang="json" filename="/etc/dd-action-runner/config/credentials/temporal_TLS_token.json" disable_copy="false" collapsible="true" >}}
{
        "auth_type": "Token Auth",
        "credentials": [
                {
                        "tokenName": "serverAddress",
                        "tokenValue": "SERVER_ADDRESS"
                },
                {
                        "tokenName": "serverNameOverride",
                        "tokenValue": "SERVER_NAME_OVERRIDE"
                },
                {
                        "tokenName": "serverRootCACertificate",
                        "tokenValue": "SERVER_ROOT_CA_CERTIFICATE"
                }
        ]
}
{{< /code-block >}}

Sustituye `SERVER_ADDRESS`, `SERVER_NAME_OVERRIDE` y `SERVER_ROOT_CA_CERTIFICATE` por tus credenciales.

En la conexión del ejecutor, especifica la ubicación del archivo de credenciales en el contenedor del ejecutor de acción privado. En este ejemplo, el archivo de credenciales se almacena en `/etc/dd-action-runner/config/credentials/temporal_TLS_token.json`.

{{< img src="service_management/par-temporal-tls-credentials.png" alt="La ruta al archivo de credenciales es '/etc/dd-action-runner/config/credentials/temporal_TLS_token.json'" style="width:80%;" >}}

### Sin autenticación

Este tipo de conexión utiliza la comunicación no cifrada y no se recomienda para entornos de producción. Solo debe utilizarse en entornos de desarrollo o para conexiones de test. Para uso en producción, considera el uso de los tipos de autenticación TLS o mTLS.

El tipo de conexión requiere las siguientes credenciales:

|  Credencial    | Obligatorio    | Descripción |
| -------------  | ----------- | ----------- |
| `address` | Sí | El nombre de host del servidor y el puerto opcional. El puerto es por defecto 7233 si la dirección solo contiene el host. |


Para este tipo de conexión, no es necesario crear un archivo de credenciales, ya que la dirección no es un secreto y se almacena directamente en Datadog. Para configurarlo, indica la dirección del servidor:

{{< img src="service_management/par-temporal-no-tls-credentials.png" alt="Una conexión temporal no segura" style="width:80%;" >}}

{{% /tab %}}

{{< /tabs >}}

[1]: /es/actions/private_actions