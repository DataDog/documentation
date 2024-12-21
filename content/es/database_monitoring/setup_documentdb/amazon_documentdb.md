---
title: Configuración de la monitorización de bases de datos para Amazon DocumentDB
---

La monitorización de bases de datos ofrece información completa sobre las bases de datos de Amazon DocumentDB (compatible con MongoDB) al brindar acceso a métricas fundamentales, muestras de operaciones, planes de explicación y cambios en el estado de la replicación. Con el fin de aprovechar la monitorización de bases de datos para Amazon DocumentDB, asegúrate de que el Datadog Agent se encuentre instalado y configurado para conectarse a tus instancias de Amazon DocumentDB. En esta guía se describen los pasos a fin de configurar la monitorización de bases de datos para Amazon DocumentDB.

## Antes de empezar

Versiones principales de Amazon DocumentDB compatibles
: 4.0.0, 5.0.0

Tipos de clústeres de Amazon DocumentDB compatibles
: clústeres basados ​​en instancias.<br /><br />
**Nota**: El clúster elástico de Amazon DocumentDB no es compatible.

{{% dbm-documentdb-before-you-begin %}}

## Configuración

A fin de habilitar la monitorización de bases de datos para tu base de datos:

1. [Concede acceso al Agent a tus instancias de Amazon DocumentDB](#grant-the-agent-access-to-your-amazon-documentdb-instances)
2. [Instala y configura el Agent](#install-and-configure-the-agent).
3. [(Opcional) Instala la integración de Amazon DocumentDB](#install-the-amazon-documentdb-integration)

### Conceder acceso al Agent a tus instancias de Amazon DocumentDB

El Datadog Agent requiere acceso de solo lectura a la instancia de Amazon DocumentDB para recopilar estadísticas y consultas.

En un shell de Mongo, autentícate en el nodo principal del conjunto de réplicas, crea un usuario de solo lectura para el Datadog Agent en la base de datos `admin` y concede los permisos necesarios:

{{< code-block lang="shell" >}}

# Autentícate como usuario administrador.

use admin
db.auth("admin", "<YOUR_AMAZON_DOCUMENTDB_ADMIN_PASSWORD>")

# Crea el usuario para el Datadog Agent.

db.createUser({
"user": "datadog",
"pwd": "<UNIQUE_PASSWORD>",
"roles": [
{ role: "read", db: "admin" },
{ role: "read", db: "local" },
{ role: "clusterMonitor", db: "admin" }
]
})
{{< /code-block >}}

Concede permisos adicionales al usuario `datadog` en las bases de datos que quieres monitorizar:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
{ role: "read", db: "mydatabase" },
{ role: "read", db: "myotherdatabase" }
])
{{< /code-block >}}

Como alternativa, puedes conceder el rol `readAnyDatabase` al usuario `datadog` en la base de datos `admin` para monitorizar todas las bases de datos:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
{ role: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

### Guarda tu contraseña de forma segura

{{% dbm-secret %}}

### Instalación y configuración del Agent

Para monitorizar tu clúster de Amazon DocumentDB, debes instalar y configurar el Datadog Agent en un host que pueda [acceder de manera remota][1] a tu clúster de Amazon DocumentDB. Este host puede ser un host de Linux, un contenedor de Docker o un pod de Kubernetes.

#### Crear el archivo de configuración

{{% dbm-amazon-documentdb-agent-config-replica-set %}}

Si instalaste la [integración de Amazon DocumentDB][3] para enriquecer las instancias
con la telemetría de la integración de Amazon DocumentDB, añade esta sección a tu configuración:

```yaml
## @param aws - mapping - optional
## Este bloque define la configuración para las instancias de Amazon DocumentDB.
## Estos valores solo se aplican cuando se configura la opción `dbm: true`.
#
aws:
    ## @param instance_endpoint - string - optional
    ## Igual a Endpoint.Address de la instancia a la que se conecta el Agent.
    ## Este valor es opcional si el valor de `host` ya se ha configurado en el endpoint de la instancia.
    ##
    ## Para obtener más información sobre los endpoints de la instancia,
    ## consulta la documentación de AWS https://docs.aws.amazon.com/documentdb/latest/developerguide/API_Endpoint.html
    #
    instance_endpoint: <AMAZON_DOCUMENTDB_ENDPOINT>
    ## @param cluster_identifier - string - optional
    ## Igual al identificador del clúster de la instancia a la que se conecta el Agent.
    ## Este valor es opcional si el valor de `cluster_name` ya se ha configurado para el identificador del clúster.
    ##
    ## Para obtener más información sobre los identificadores del clúster,
    ## consulta la documentación de AWS https://docs.aws.amazon.com/documentdb/latest/developerguide/API_DBCluster.html
    #
    cluster_identifier: <AMAZON_DOCUMENTDB_CLUSTER_IDENTIFIER>
```

#### Configurar el Agent

{{< tabs >}}
{{% tab "Linux host" %}}
{{% dbm-mongodb-Agent-setup-linux %}}
{{% /tab %}}
{{% tab "Docker" %}}
{{% dbm-mongodb-Agent-setup-Docker %}}
{{% /tab %}}
{{% tab "Kubernetes" %}}
{{% dbm-mongodb-Agent-setup-Kubernetes %}}
{{% /tab %}}
{{< /tabs >}}

### Instalar la integración de Amazon DocumentDB

Para recopilar métricas de base de datos más completas de Amazon DocumentDB, instala la [integración de Amazon DocumentDB][3] (opcional).

## Datos recopilados

### Métricas

Consulta la [documentación de la integración][2] para obtener una lista completa de las métricas que recopila la integración.

{{% dbm-amazon-documentdb-agent-data-collected %}}

[1]: /es/account_management/api-app-keys/
[2]: /es/integrations/mongo/?tab=replicaset#metrics
[3]: /es/integrations/amazon_documentdb/
[4]: /es/integrations/amazon_documentdb/#metrics