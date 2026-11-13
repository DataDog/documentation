---
aliases:
- /es/service_management/workflows/private_actions/private_action_credentials
- /es/service_management/app_builder/private_actions/private_action_credentials
- /es/actions/private_actions/private_action_credentials/
description: Configure las credenciales para Private Actions, incluidos los métodos
  de autenticación HTTP, Jenkins, PostgreSQL, MongoDB y Temporal.
disable_toc: false
title: Manejo de credenciales de Private Actions
---
## Descripción general {#overview}

Las Private Actions permiten que sus flujos de trabajo y aplicaciones de Datadog interactúen con servicios alojados en su red privada sin exponer sus servicios a la internet pública. Para utilizar Private Actions, debe instalar un runner de Private Actions en un servidor de su red y vincular el runner con una conexión de Datadog. Para obtener más información sobre cómo configurar un runner y vincularlo con una conexión, consulte [Private Actions][1].

Algunas Private Actions, como Jenkins y PostgreSQL, requieren credenciales para funcionar. Para configurar las credenciales de Private Actions, debe:
1. Navegue al directorio donde almacenó la configuración de su runner (predeterminado: `config/credentials/`).
2. En este directorio, cree un archivo JSON utilizando la estructura JSON proporcionada en Archivos de credenciales. Alternativamente, edite el archivo JSON predeterminado generado automáticamente durante el arranque del runner.
   - **Nota**: Estos archivos están disponibles para el runner en su directorio `/etc/dd-action-runner/config/credentials/`.
3. Especifique la ruta a la credencial en la conexión del runner. Utilice la ruta al archivo en el contenedor. Por ejemplo: `/etc/dd-action-runner/config/credentials/jenkins_token.json`.

## Archivos de credenciales {#credential-files}

{{< tabs >}}
{{% tab "HTTP" %}}

HTTP admite tres métodos de autenticación:

- **Autenticación básica**: utilícela cuando su servidor HTTP requiera autenticación de nombre de usuario y contraseña.
- **Autenticación por token**: utilícela cuando su servidor HTTP requiera uno o más tokens personalizados en encabezados o parámetros de consulta.
- **Sin autenticación**: utilícela cuando su servidor HTTP no requiera autenticación.

### Autenticación básica {#basic-authentication}

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

Reemplace `USERNAME` y `PASSWORD` con su nombre de usuario y contraseña.

En la conexión del runner, especifique la ubicación del archivo de credenciales en el contenedor del runner de Private Actions. En este ejemplo, el archivo de credenciales se almacena en `/etc/dd-action-runner/config/credentials/http_basic.json`.

{{< img src="actions/private_actions/par-http-basic-credentials.png" alt="La ruta al archivo de credenciales es '/etc/dd-action-runner/config/credentials/http_basic.json'" style="width:80%;" >}}

### Autenticación por token {#token-authentication}

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

Reemplace `TOKEN1`, `TOKEN2`, `VALUE1` y `VALUE2` con sus nombres y valores de token.

En la conexión del runner, especifique la ubicación del archivo de credenciales en el contenedor del runner de Private Actions. En este ejemplo, el archivo de credenciales se almacena en `/etc/dd-action-runner/config/credentials/http_token.json`.

{{< img src="actions/private_actions/par-http-token-credentials.png" alt="La ruta al archivo de credenciales es '/etc/dd-action-runner/config/credentials/http_token.json'" style="width:80%;" >}}

### Sin autenticación {#no-authentication}

Este tipo de conexión es adecuado para puntos de conexión HTTP que no requieren autenticación.

Para configurar esta conexión, especifique la URL del punto de conexión:

{{< img src="actions/private_actions/par-http-no-auth-credentials.png" alt="Una conexión HTTP sin autenticación" style="width:80%;" >}}

{{% /tab %}}

{{% tab "GitLab" %}}

La conexión de GitLab acepta las siguientes credenciales:

|  Credencial    | Requerido    | Descripción |
| -------------  | ----------- | ----------- |
| `baseURL` | Sí | La URL de su instancia de GitLab autogestionada. Para obtener más información, consulte la [documentación de la API de GitLab][201]. |
| `gitlabApiToken` | Sí | El token de API para autenticarse con su instancia de GitLab. Genere este token en la configuración de usuario de GitLab. |

Incluya todas las credenciales en un solo archivo:

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



Reemplace `GITLAB_API_TOKEN` y `GITLAB_URL` con sus credenciales.

En la conexión del runner, especifique la ubicación del archivo de credenciales en el contenedor del runner de Private Actions. En este ejemplo, el archivo de credenciales se almacena en `/etc/dd-action-runner/config/credentials/gitlab_token.json`.

{{< img src="actions/private_actions/par-gitlab-credentials.png" alt="La ruta al archivo de credenciales es '/etc/dd-action-runner/config/credentials/gitlab_token.json'" style="width:80%;" >}}

[201]: https://docs.gitlab.com/ee/api/
{{% /tab %}}

{{% tab "Jenkins" %}}

La conexión de Jenkins acepta las siguientes credenciales:

|  Credencial    | Requerido    | Descripción |
| -------------  | ----------- | ----------- |
| `domain` | Sí | El dominio del servidor de Jenkins al que desea conectarse. |
| `username` | Sí | El nombre de usuario del usuario de Jenkins que desea usar para autenticarse con el servidor de Jenkins. Este usuario debe tener los permisos necesarios para realizar las acciones que desea que su runner realice. |
| `token` | Sí | El token de API del usuario de Jenkins que desea usar para autenticarse con el servidor de Jenkins. Este usuario debe tener los permisos necesarios para realizar las acciones que desea realizar. Puede generar un token de API en la configuración de usuario de Jenkins. |

Incluya todas las credenciales en un solo archivo:


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

Reemplace `USERNAME`, `API_TOKEN` y `DOMAIN` con sus credenciales.


En la conexión del runner, especifique la ubicación del archivo de credenciales en el contenedor del runner de Private Actions. En este ejemplo, el archivo de credenciales se almacena en `/etc/dd-action-runner/config/credentials/jenkins_token.json`.

{{< img src="actions/private_actions/par-jenkins-credentials.png" alt="La ruta al archivo de credenciales es '/etc/dd-action-runner/config/credentials/jenkins_token.json'" style="width:80%;" >}}

{{% /tab %}}

{{% tab "MongoDB" %}}

MongoDB admite dos métodos de autenticación:

- **Autenticación SRV**: Úselo al conectarse a MongoDB Atlas o cuando necesite detección automática de conjuntos de réplicas y conmutación por error. Este método utiliza un registro DNS SRV para descubrir automáticamente todos los miembros de un conjunto de réplicas.
- **Autenticación estándar**: utilícela al conectarse directamente a un servidor MongoDB o cuando necesite especificar el servidor y el puerto exactos.

### Autenticación SRV {#srv-authentication}

La autenticación SRV de MongoDB requiere las siguientes credenciales:

|  Credencial    | Requerido    | Descripción |
| -------------  | ----------- | ----------- |
| `username` | Sí | El nombre de usuario de MongoDB para la autenticación. |
| `password` | Sí | La contraseña de MongoDB para la autenticación. |
| `srvHost` | Sí | El servidor SRV para MongoDB Atlas o el descubrimiento de conjuntos de réplicas. |
| `database` | No | El nombre de la base de datos a la que conectarse. |

Incluya todas las credenciales en un solo archivo:

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

Reemplace `USERNAME`, `PASSWORD`, `SRV_HOST` y `DATABASE` con sus credenciales.

En la conexión del runner, especifique la ubicación del archivo de credenciales en el contenedor del runner de Private Actions. En este ejemplo, el archivo de credenciales se almacena en `/etc/dd-action-runner/config/credentials/mongodb_srv_token.json`.

{{< img src="actions/private_actions/par-mongodb-srv-credentials.png" alt="La ruta al archivo de credenciales es '/etc/dd-action-runner/config/credentials/mongodb_srv_token.json'" style="width:80%;" >}}

### Autenticación estándar {#standard-authentication}

La autenticación estándar de MongoDB acepta las siguientes credenciales:

|  Credencial    | Requerido    | Descripción |
| -------------  | ----------- | ----------- |
| `username` | Sí | El nombre de usuario de MongoDB para la autenticación. |
| `password` | Sí | La contraseña de MongoDB para la autenticación. |
| `host` | Sí | El nombre del servidor MongoDB. |
| `port` | Sí | El número de puerto del servidor MongoDB. |
| `database` | No | El nombre de la base de datos a la que conectarse. |
| `authSource` | No | La base de datos que contiene las credenciales del usuario. Especifique si el usuario se crea en una base de datos diferente a `admin`. |
| `authMechanism` | No | El mecanismo de autenticación que se debe usar. Especifique si se requiere un mecanismo de autenticación específico. |

Incluya todas las credenciales en un solo archivo:

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

Reemplace `USERNAME`, `PASSWORD`, `HOST`, `PORT`, `DATABASE`, `AUTH_SOURCE` y `AUTH_MECHANISM` con sus credenciales.

En la conexión del runner, especifique la ubicación del archivo de credenciales en el contenedor del runner de Private Actions. En este ejemplo, el archivo de credenciales se almacena en `/etc/dd-action-runner/config/credentials/mongodb_standard_token.json`.

{{< img src="actions/private_actions/par-mongodb-standard-credentials.png" alt="La ruta al archivo de credenciales es '/etc/dd-action-runner/config/credentials/mongodb_standard_token.json'" style="width:80%;" >}}

{{% /tab %}}


{{% tab "PostgreSQL" %}}

La conexión de PostgreSQL acepta las siguientes credenciales:

|  Credencial    | Requerido    | Descripción |
| -------------  | ----------- | ----------- |
| `host` | Sí | El nombre del servidor al cual conectarse. Para más información, consulte [la documentación oficial de PostgreSQL][101]. |
| `port` | Sí | El número de puerto para conectarse al servidor, o la extensión del nombre de archivo del socket para conexiones de dominio UNIX. Para más información, consulte [la documentación oficial de PostgreSQL][102]. |
| `user` | Sí | El nombre de usuario de PostgreSQL con el que conectarse.<br><br>Para más información, consulte [la documentación oficial de PostgreSQL][103]. |
| `password` | Sí | La contraseña que se debe usar si el servidor requiere autenticación por contraseña. <br><br>Para más información, consulte [la documentación oficial de PostgreSQL][104]. |
| `database` | Sí | El nombre de la base de datos. Para más información, consulte [la documentación oficial de PostgreSQL][105]. |
| `sslmode` | Sí | Esta opción determina si se negocia una conexión TCP/IP SSL segura con el servidor y con qué prioridad.<br><br>Las opciones disponibles son `require` y `disable`.<br><br>Para más información, consulte [la documentación oficial de PostgreSQL][106]. |
| `applicationName` | No | El nombre de la aplicación que se conecta al servidor PostgreSQL. Para más información, consulte [la documentación oficial de PostgreSQL][107]. |
| `searchPath` | No | Establezca una ruta de búsqueda de esquema. Para más información, consulte [la documentación oficial de PostgreSQL][108]. |

Incluya todas las credenciales en un solo archivo:


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

Reemplace los valores de ejemplo con sus credenciales.


En la conexión del ejecutor, especifique la ubicación del archivo de credenciales en el contenedor del ejecutor de acciones privado. En este ejemplo, el archivo de credenciales se almacena en `/etc/dd-action-runner/config/credentials/postgresql_token.json`.

{{< img src="actions/private_actions/par-postgresql-credentials.png" alt="La ruta al archivo de credenciales es '/etc/dd-action-runner/config/credentials/postgresql_token.json'" style="width:80%;" >}}

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

Temporal admite tres métodos de autenticación:

- **Autenticación mTLS**: utilícela para la comunicación más segura con autenticación de certificado bidireccional de servidor a cliente.
- **Autenticación TLS**: utilícela para una comunicación segura con autenticación de certificado de servidor.
- **Sin autenticación**: utilícela para comunicación sin cifrar (no se recomienda para entornos de producción).

### Autenticación mTLS {#mtls-authentication}

La autenticación mTLS de Temporal requiere las siguientes credenciales:

|  Credencial    | Requerido    | Descripción |
| -------------  | ----------- | ----------- |
| `serverAddress` | Sí | La dirección del servidor (nombre de servidor y puerto opcional). Si no se define, el puerto predeterminado es 7233. |
| `serverNameOverride` | Sí | El nombre del servidor que anula el nombre de destino (SNI) utilizado para la comprobación del nombre del servidor TLS. Esto puede ser útil cuando tiene un proxy inverso frente a un servidor de Temporal y desea anular el SNI para enrutar el tráfico al backend apropiado según reglas personalizadas. |
| `serverRootCACertificate` | Sí | El certificado de CA raíz utilizado por el servidor. Si no se establece, y si el certificado del servidor es emitido por una autoridad de confianza, la verificación seguirá teniendo éxito (por ejemplo, si utiliza un proveedor de nube como AWS, Google Cloud o Azure, que emiten certificados de servidor a través de CA reconocidas y de confianza). |
| `clientCertPairCrt` | Sí | El certificado de cliente para conectarse con mTLS. |
| `clientCertPairKey` | Sí | La clave de cliente para conectarse con mTLS. |

Incluya todas las credenciales en un solo archivo:

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

Reemplace `SERVER_ADDRESS`, `SERVER_NAME_OVERRIDE`, `SERVER_ROOT_CA_CERTIFICATE`, `CLIENT_CERTIFICATE` y `CLIENT_KEY` con sus credenciales.

En la conexión del ejecutor, especifique la ubicación del archivo de credenciales en el contenedor del ejecutor de acciones privado. En este ejemplo, el archivo de credenciales se almacena en `/etc/dd-action-runner/config/credentials/temporal_mTLS_token.json`.

{{< img src="actions/private_actions/par-temporal-mtls-credentials.png" alt="La ruta al archivo de credenciales es '/etc/dd-action-runner/config/credentials/temporal_mTLS_token.json'" style="width:80%;" >}}

### Autenticación TLS {#tls-authentication}

La autenticación TLS de Temporal requiere las siguientes credenciales:

|  Credencial    | Requerido    | Descripción |
| -------------  | ----------- | ----------- |
| `serverAddress` | Sí | La dirección del servidor (nombre de servidor y puerto opcional) Si no se define, el puerto predeterminado es 7233. |
| `serverNameOverride` | Sí | El nombre del servidor que anula el nombre de destino (SNI) utilizado para la comprobación del nombre del servidor TLS. Esto puede ser útil cuando tiene un proxy inverso frente a un servidor de Temporal y desea anular el SNI para enrutar el tráfico al backend apropiado según reglas personalizadas. |
| `serverRootCACertificate` | Sí | El certificado de CA raíz utilizado por el servidor. Si no se establece, y si el certificado del servidor es emitido por una autoridad de confianza, la verificación seguirá teniendo éxito (por ejemplo, si utiliza un proveedor de nube como AWS, Google Cloud o Azure, que emiten certificados de servidor a través de CA reconocidas y de confianza). |

Incluya todas las credenciales en un solo archivo:

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

Reemplace `SERVER_ADDRESS`, `SERVER_NAME_OVERRIDE` y `SERVER_ROOT_CA_CERTIFICATE` con sus credenciales.

En la conexión del ejecutor, especifique la ubicación del archivo de credenciales en el contenedor del ejecutor de acciones privado. En este ejemplo, el archivo de credenciales se almacena en `/etc/dd-action-runner/config/credentials/temporal_TLS_token.json`.

{{< img src="actions/private_actions/par-temporal-tls-credentials.png" alt="La ruta al archivo de credenciales es '/etc/dd-action-runner/config/credentials/temporal_TLS_token.json'" style="width:80%;" >}}

### Sin autenticación {#no-authentication-1}

Este tipo de conexión utiliza comunicación sin cifrar y no se recomienda para entornos de producción. Solo debe utilizarse en entornos de desarrollo o para probar conexiones. Para uso en producción, considere utilizar los tipos de autenticación TLS o mTLS.

El tipo de conexión requiere las siguientes credenciales:

|  Credencial    | Requerido    | Descripción |
| -------------  | ----------- | ----------- |
| `address` | Sí | El nombre del servidor y el puerto opcional. El puerto se establece de forma predeterminada en 7233 si la dirección solo contiene el servidor. |


Para este tipo de conexión, no necesita crear un archivo de credenciales ya que la dirección no es un secreto y se almacena directamente en Datadog. Para configurar, proporcione la dirección del servidor:

{{< img src="actions/private_actions/par-temporal-no-tls-credentials.png" alt="Una conexión no segura de Temporal" style="width:80%;" >}}

{{% /tab %}}

{{< /tabs >}}

[1]: /es/actions/private_actions