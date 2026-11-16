---
aliases:
- /fr/service_management/workflows/private_actions/private_action_credentials
- /fr/service_management/app_builder/private_actions/private_action_credentials
- /fr/actions/private_actions/private_action_credentials/
description: Configurez les informations d'identification pour les actions privées,
  y compris les méthodes d'authentification HTTP, Jenkins, PostgreSQL, MongoDB et
  Temporal.
disable_toc: false
title: Gestion des informations d'identification des actions privées
---
## Présentation {#overview}

Les actions privées permettent à vos workflows et applications Datadog d'interagir avec des services hébergés sur votre réseau privé sans exposer vos services à l'Internet public. Pour utiliser des actions privées, vous devez installer un runner d'actions privées sur un host de votre réseau et associer le runner à une connexion Datadog. Pour plus d'informations sur la configuration d'un runner et son association à une connexion, consultez [Private Actions][1].

Certaines actions privées, telles que Jenkins et PostgreSQL, nécessitent des identifiants pour fonctionner. Pour configurer les informations d'identification d'une action privée, vous devez :
1. Accédez au répertoire où vous avez stocké la configuration de votre runner (par défaut : `config/credentials/`).
2. Dans ce répertoire, créez un fichier JSON en utilisant la structure JSON fournie dans les fichiers d'informations d'identification. Vous pouvez également modifier le fichier JSON par défaut généré automatiquement lors de l'initialisation du runner.
   - **Remarque** : Ces fichiers sont accessibles au runner dans son répertoire `/etc/dd-action-runner/config/credentials/`.
3. Indiquez le chemin d'accès à l'identifiant dans la connexion du runner. Utilisez le chemin d'accès au fichier sur le conteneur. Par exemple : `/etc/dd-action-runner/config/credentials/jenkins_token.json`.

## Fichiers d'informations d'identification {#credential-files}

{{< tabs >}}
{{% tab "HTTP" %}}

HTTP prend en charge trois méthodes d'authentification :

- **Authentification de base** : À utiliser lorsque votre serveur HTTP nécessite une authentification par nom d'utilisateur et mot de passe.
- **Authentification par jeton** : À utiliser lorsque votre serveur HTTP nécessite un ou plusieurs jetons personnalisés dans les en-têtes ou les paramètres de requête.
- **Aucune authentification** : À utiliser lorsque votre serveur HTTP ne nécessite pas d'authentification.

### Authentification de base {#basic-authentication}

L'authentification de base nécessite un fichier d'informations d'identification avec un nom d'utilisateur et un mot de passe :

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

Remplacez `USERNAME` et `PASSWORD` par votre nom d'utilisateur et votre mot de passe.

Dans la connexion du runner, spécifiez l'emplacement du fichier d'informations d'identification sur le conteneur du runner d'actions privées. Dans cet exemple, le fichier d'informations d'identification est stocké à `/etc/dd-action-runner/config/credentials/http_basic.json`.

{{< img src="actions/private_actions/par-http-basic-credentials.png" alt="Le chemin d'accès au fichier d'informations d'identification est '/etc/dd-action-runner/config/credentials/http_basic.json'" style="width:80%;" >}}

### Authentification par jeton {#token-authentication}

L'authentification par jeton nécessite un fichier d'informations d'identification avec un tableau de noms et de valeurs de jetons :

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

Remplacez `TOKEN1`, `TOKEN2`, `VALUE1` et `VALUE2` par vos noms et valeurs de jetons.

Dans la connexion du runner, spécifiez l'emplacement du fichier d'informations d'identification sur le conteneur du runner d'actions privées. Dans cet exemple, le fichier d'informations d'identification est stocké à `/etc/dd-action-runner/config/credentials/http_token.json`.

{{< img src="actions/private_actions/par-http-token-credentials.png" alt="Le chemin d'accès au fichier d'informations d'identification est '/etc/dd-action-runner/config/credentials/http_token.json'" style="width:80%;" >}}

### Aucune authentification {#no-authentication}

Ce type de connexion convient aux endpoints HTTP qui ne nécessitent pas d'authentification.

Pour configurer cette connexion, spécifiez l'URL de l'endpoint :

{{< img src="actions/private_actions/par-http-no-auth-credentials.png" alt="Une connexion HTTP sans authentification" style="width:80%;" >}}

{{% /tab %}}

{{% tab "GitLab" %}}

La connexion GitLab accepte les identifiants suivants :

|  Identifiant    | Requis    | Description |
| -------------  | ----------- | ----------- |
| `baseURL` | Oui | L'URL de votre instance GitLab autogérée. Pour plus d'informations, consultez la [documentation de l'API GitLab][201]. |
| `gitlabApiToken` | Oui | Le jeton d'API pour vous authentifier auprès de votre instance GitLab. Générez ce jeton dans vos paramètres utilisateur GitLab. |

Incluez tous les identifiants dans un seul fichier :

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



Remplacez `GITLAB_API_TOKEN` et `GITLAB_URL` par vos identifiants.

Dans la connexion du runner, spécifiez l'emplacement du fichier d'informations d'identification sur le conteneur du runner d'actions privées. Dans cet exemple, le fichier d'informations d'identification est stocké à `/etc/dd-action-runner/config/credentials/gitlab_token.json`.

{{< img src="actions/private_actions/par-gitlab-credentials.png" alt="Le chemin d'accès au fichier d'informations d'identification est '/etc/dd-action-runner/config/credentials/gitlab_token.json'" style="width:80%;" >}}

[201]: https://docs.gitlab.com/ee/api/
{{% /tab %}}

{{% tab "Jenkins" %}}

La connexion Jenkins accepte les identifiants suivants :

|  Identifiant    | Requis    | Description |
| -------------  | ----------- | ----------- |
| `domain` | Oui | Le domaine du serveur Jenkins auquel vous souhaitez vous connecter. |
| `username` | Oui | Le nom d'utilisateur Jenkins que vous souhaitez utiliser pour vous authentifier auprès du serveur Jenkins. Cet utilisateur doit disposer des autorisations nécessaires pour effectuer les actions que vous souhaitez que votre exécuteur réalise. |
| `token` | Oui | Le jeton d'API de l'utilisateur Jenkins que vous souhaitez utiliser pour vous authentifier auprès du serveur Jenkins. Cet utilisateur doit disposer des autorisations nécessaires pour effectuer les actions que vous souhaitez réaliser. Vous pouvez générer un jeton d'API dans les paramètres utilisateur de Jenkins. |

Incluez tous les identifiants dans un seul fichier :


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

Remplacez `USERNAME`, `API_TOKEN` et `DOMAIN` par vos identifiants.


Dans la connexion du runner, spécifiez l'emplacement du fichier d'informations d'identification sur le conteneur du runner d'actions privées. Dans cet exemple, le fichier d'informations d'identification est stocké à `/etc/dd-action-runner/config/credentials/jenkins_token.json`.

{{< img src="actions/private_actions/par-jenkins-credentials.png" alt="Le chemin d'accès au fichier d'informations d'identification est '/etc/dd-action-runner/config/credentials/jenkins_token.json'" style="width:80%;" >}}

{{% /tab %}}

{{% tab "MongoDB" %}}

MongoDB prend en charge deux méthodes d'authentification :

- **Authentification SRV** : À utiliser lors de la connexion à MongoDB Atlas ou lorsque vous avez besoin d'une découverte automatique du jeu de réplicas et d'un basculement. Cette méthode utilise un enregistrement DNS SRV pour découvrir automatiquement tous les membres d'un jeu de réplicas.
- **Authentification standard** : À utiliser lors de la connexion directe à un serveur MongoDB ou lorsque vous devez spécifier le host et le port exacts.

### Authentification SRV {#srv-authentication}

L'authentification MongoDB SRV nécessite les identifiants suivants :

|  Identifiant    | Requis    | Description |
| -------------  | ----------- | ----------- |
| `username` | Oui | Le nom d'utilisateur MongoDB pour l'authentification. |
| `password` | Oui | Le mot de passe MongoDB pour l'authentification. |
| `srvHost` | Oui | Le host SRV pour la découverte de MongoDB Atlas ou du jeu de réplicas. |
| `database` | Non | Le nom de la base de données à laquelle se connecter. |

Incluez tous les identifiants dans un seul fichier :

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

Remplacez `USERNAME`, `PASSWORD`, `SRV_HOST` et `DATABASE` par vos informations d'identification.

Dans la connexion du runner, spécifiez l'emplacement du fichier d'informations d'identification sur le conteneur du runner d'actions privées. Dans cet exemple, le fichier d'informations d'identification est stocké à `/etc/dd-action-runner/config/credentials/mongodb_srv_token.json`.

{{< img src="actions/private_actions/par-mongodb-srv-credentials.png" alt="Le chemin d'accès au fichier d'informations d'identification est '/etc/dd-action-runner/config/credentials/mongodb_srv_token.json'" style="width:80%;" >}}

### Authentification standard {#standard-authentication}

L'authentification standard MongoDB accepte les identifiants suivants :

|  Identifiant    | Requis    | Description |
| -------------  | ----------- | ----------- |
| `username` | Oui | Le nom d'utilisateur MongoDB pour l'authentification. |
| `password` | Oui | Le mot de passe MongoDB pour l'authentification. |
| `host` | Oui | Le nom de host du serveur MongoDB. |
| `port` | Oui | Le numéro de port du serveur MongoDB. |
| `database` | Non | Le nom de la base de données à laquelle se connecter. |
| `authSource` | Non | La base de données contenant les identifiants de l'utilisateur. Indiquez si l'utilisateur est créé dans une base de données différente de `admin`. |
| `authMechanism` | Non | Le mécanisme d'authentification à utiliser. Indiquez si un mécanisme d'authentification spécifique est requis. |

Incluez tous les identifiants dans un seul fichier :

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

Remplacez `USERNAME`, `PASSWORD`, `HOST`, `PORT`, `DATABASE`, `AUTH_SOURCE` et `AUTH_MECHANISM` par vos informations d'identification.

Dans la connexion du runner, spécifiez l'emplacement du fichier d'informations d'identification sur le conteneur du runner d'actions privées. Dans cet exemple, le fichier d'informations d'identification est stocké à `/etc/dd-action-runner/config/credentials/mongodb_standard_token.json`.

{{< img src="actions/private_actions/par-mongodb-standard-credentials.png" alt="Le chemin vers le fichier d'informations d'identification est '/etc/dd-action-runner/config/credentials/mongodb_standard_token.json'" style="width:80%;" >}}

{{% /tab %}}


{{% tab "PostgreSQL" %}}

La connexion PostgreSQL accepte les identifiants suivants :

|  Identifiant    | Requis    | Description |
| -------------  | ----------- | ----------- |
| `host` | Oui | Le nom du host auquel se connecter. Pour plus d'informations, consultez [la documentation officielle de PostgreSQL][101]. |
| `port` | Oui | Le numéro de port auquel se connecter sur le host du serveur, ou l'extension de nom de fichier de socket pour les connexions de domaine UNIX. Pour plus d'informations, consultez [la documentation officielle de PostgreSQL][102]. |
| `user` | Oui | Le nom d'utilisateur PostgreSQL à utiliser pour la connexion.<br><br>Pour plus d'informations, consultez [la documentation officielle de PostgreSQL][103]. |
| `password` | Oui | Le mot de passe à utiliser si le serveur exige une authentification par mot de passe. <br><br>Pour plus d'informations, consultez [la documentation officielle de PostgreSQL][104]. |
| `database` | Oui | Le nom de la base de données. Pour plus d'informations, consultez [la documentation officielle de PostgreSQL][105]. |
| `sslmode` | Oui | Cette option détermine si, ou avec quelle priorité, une connexion TCP/IP SSL sécurisée est négociée avec le serveur.<br><br>Les options disponibles sont `require` et `disable`.<br><br>Pour plus d'informations, consultez [la documentation officielle de PostgreSQL][106]. |
| `applicationName` | Non | Le nom de l'application se connectant au serveur PostgreSQL. Pour plus d'informations, consultez [la documentation officielle de PostgreSQL][107]. |
| `searchPath` | Non | Définissez un chemin de recherche de schéma. Pour plus d'informations, consultez [la documentation officielle de PostgreSQL][108]. |

Incluez tous les identifiants dans un seul fichier :


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

Remplacez les valeurs d'exemple par vos identifiants.


Dans la connexion du runner, spécifiez l'emplacement du fichier d'informations d'identification sur le conteneur du runner d'actions privées. Dans cet exemple, le fichier d'informations d'identification est stocké à `/etc/dd-action-runner/config/credentials/postgresql_token.json`.

{{< img src="actions/private_actions/par-postgresql-credentials.png" alt="Le chemin vers le fichier d'identifiants est '/etc/dd-action-runner/config/credentials/postgresql_token.json'" style="width:80%;" >}}

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

Temporal prend en charge trois méthodes d'authentification :

- **Authentification mTLS** : À utiliser pour une communication hautement sécurisée avec une authentification par certificat bidirectionnelle serveur-client.
- **Authentification TLS** : À utiliser pour une communication sécurisée avec une authentification par certificat serveur.
- **Aucune authentification** : À utiliser pour une communication non chiffrée (non recommandé pour les environnements de production).

### Authentification mTLS {#mtls-authentication}

L'authentification mTLS de Temporal nécessite les identifiants suivants :

|  Identifiant    | Requis    | Description |
| -------------  | ----------- | ----------- |
| `serverAddress` | Oui | L'adresse du serveur (nom de host et port optionnel). S'il n'est pas défini, le port est par défaut 7233. |
| `serverNameOverride` | Oui | Le nom du serveur qui remplace le nom cible (SNI) utilisé pour la vérification du nom de host TLS. Cela peut être utile lorsque vous avez un proxy inverse devant un serveur temporal et que vous souhaitez remplacer le SNI pour acheminer le trafic vers le backend approprié en fonction de règles personnalisées. |
| `serverRootCACertificate` | Oui | Le certificat de l'autorité de certification racine utilisé par le serveur. Si ce n'est pas défini, et si le certificat du serveur est émis par une autorité de confiance, la vérification réussira quand même (par exemple, si vous utilisez un fournisseur cloud comme AWS, Google Cloud ou Azure, qui émettent des certificats de serveur via des autorités de certification reconnues et de confiance). |
| `clientCertPairCrt` | Oui | Le certificat client pour la connexion avec mTLS. |
| `clientCertPairKey` | Oui | La clé client pour la connexion avec mTLS. |

Incluez tous les identifiants dans un seul fichier :

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

Remplacez `SERVER_ADDRESS`, `SERVER_NAME_OVERRIDE`, `SERVER_ROOT_CA_CERTIFICATE`, `CLIENT_CERTIFICATE` et `CLIENT_KEY` par vos identifiants.

Dans la connexion du runner, spécifiez l'emplacement du fichier d'informations d'identification sur le conteneur du runner d'actions privées. Dans cet exemple, le fichier d'informations d'identification est stocké à `/etc/dd-action-runner/config/credentials/temporal_mTLS_token.json`.

{{< img src="actions/private_actions/par-temporal-mtls-credentials.png" alt="Le chemin d'accès au fichier d'identifiants est '/etc/dd-action-runner/config/credentials/temporal_mTLS_token.json'" style="width:80%;" >}}

### Authentification TLS {#tls-authentication}

L'authentification TLS de Temporal nécessite les identifiants suivants :

|  Identifiant    | Requis    | Description |
| -------------  | ----------- | ----------- |
| `serverAddress` | Oui | L'adresse du serveur (nom de host et port optionnel). S'il n'est pas défini, le port est par défaut 7233. |
| `serverNameOverride` | Oui | Le nom du serveur qui remplace le nom cible (SNI) utilisé pour la vérification du nom de host TLS. Cela peut être utile lorsque vous avez un proxy inverse devant un serveur temporal et que vous souhaitez remplacer le SNI pour acheminer le trafic vers le backend approprié en fonction de règles personnalisées. |
| `serverRootCACertificate` | Oui | Le certificat de l'autorité de certification racine utilisé par le serveur. Si ce n'est pas défini, et si le certificat du serveur est émis par une autorité de confiance, la vérification réussira quand même (par exemple, si vous utilisez un fournisseur cloud comme AWS, Google Cloud ou Azure, qui émettent des certificats de serveur via des autorités de certification reconnues et de confiance). |

Incluez tous les identifiants dans un seul fichier :

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

Remplacez `SERVER_ADDRESS`, `SERVER_NAME_OVERRIDE` et `SERVER_ROOT_CA_CERTIFICATE` par vos identifiants.

Dans la connexion du runner, spécifiez l'emplacement du fichier d'informations d'identification sur le conteneur du runner d'actions privées. Dans cet exemple, le fichier d'informations d'identification est stocké à `/etc/dd-action-runner/config/credentials/temporal_TLS_token.json`.

{{< img src="actions/private_actions/par-temporal-tls-credentials.png" alt="Le chemin d'accès au fichier d'identifiants est '/etc/dd-action-runner/config/credentials/temporal_TLS_token.json'" style="width:80%;" >}}

### Aucune authentification {#no-authentication-1}

Ce type de connexion utilise une communication non chiffrée et n'est pas recommandé pour les environnements de production. Il ne doit être utilisé que dans les environnements de développement ou pour tester des connexions. Pour une utilisation en production, envisagez d'utiliser les types d'authentification TLS ou mTLS.

Le type de connexion nécessite les identifiants suivants :

|  Identifiant    | Requis    | Description |
| -------------  | ----------- | ----------- |
| `address` | Oui | Le nom de host du serveur et le port optionnel. Le port est défini par défaut sur 7233 si l'adresse ne contient que le host. |


Pour ce type de connexion, vous n'avez pas besoin de créer de fichier d'identifiants car l'adresse n'est pas un secret et est stockée directement dans Datadog. Pour configurer, indiquez l'adresse du serveur :

{{< img src="actions/private_actions/par-temporal-no-tls-credentials.png" alt="Une connexion Temporal non sécurisée" style="width:80%;" >}}

{{% /tab %}}

{{< /tabs >}}

[1]: /fr/actions/private_actions