---
further_reading:
- link: /integrations/mongo/
  tag: Documentación
  text: Integración básica de MongoDB
title: Configuración de la monitorización de la base de datos para MongoDB autoalojada
---

La monitorización de la base de datos ofrece información completa de tus bases de datos MongoDB proporcionando acceso a métricas críticas, operaciones lentas, muestras de operaciones, planes de explicación y los cambios de estado de replicación. Para aprovechar la monitorización de bases de datos para MongoDB, asegúrate de que el Datadog Agent esté instalado y configurado para conectarse a tus instancias MongoDB. En esta guía se describen los pasos para configurar la monitorización de bases de datos para MongoDB autoalojada.

## Antes de empezar

Versiones principales de MongoDB compatibles
: 4.4, 5.0, 6.0, 7.0, 8.0

Ediciones de MongoDB compatibles
: Comunidad, Empresa

{{% dbm-mongodb-before-you-begin %}}

## Configuración

Para activar la monitorización para tu base de datos:

1. [Concede al Agent acceso a tus instancias de MongoDB](#grant-the-agent-access-to-your-mongodb-instances)
2. [Instala y configura el Agent](#install-and-configure-the-agent).

### Concede al Agent acceso a tus instancias de MongoDB

El Datadog Agent requiere acceso de sólo lectura a la instancia de MongoDB para recopilar estadísticas y consultas.

{{< tabs >}}
{{% tab "Standalone" %}}

En un shell de Mongo, autentícate en la instancia de MongoDB, crea un usuario de sólo lectura para el Datadog Agent en la base de datos `admin` y concede los permisos necesarios:

{{< code-block lang="shell" >}}
# Autentícate como usuario administrador.
utiliza admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Crea el usuario para el Datadog Agent.
db.createUser({
  "user": "datadog",
  "pwd": "<UNIQUE_PASSWORD>",
  "roles": [
    { rol: "read", db: "admin" },
    { rol: "read", db: "local" },
    { rol: "clusterMonitor", db: "admin" }
  ]
})
{{< /code-block >}}

Concede permisos adicionales al usuario `datadog` en las bases de datos que desees monitorizar:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { rol: "read", db: "mydatabase" },
  { rol: "read", db: "myotherdatabase" }
])
{{< /code-block >}}

También puedes conceder el rol `readAnyDatabase` al usuario `datadog` en la base de datos `admin` para que monitorice todas las bases de datos:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { rol: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

{{% /tab %}}
{{% tab "Replica Set" %}}

En un shell de Mongo, autentícate en el nodo primario del conjunto de réplicas, crea un usuario de sólo lectura para el Datadog Agent en la base de datos `admin` y concede los permisos necesarios:

{{< code-block lang="shell" >}}
# Autentícate como usuario administrador.
utiliza admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Crea el usuario para el Datadog Agent.
db.createUser({
  "user": "datadog",
  "pwd": "<UNIQUE_PASSWORD>",
  "roles": [
    { rol: "read", db: "admin" },
    { rol: "read", db: "local" },
    { rol: "clusterMonitor", db: "admin" }
  ]
})
{{< /code-block >}}

Concede permisos adicionales al usuario `datadog` en las bases de datos que desees monitorizar:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { rol: "read", db: "mydatabase" },
  { rol: "read", db: "myotherdatabase" }
])
{{< /code-block >}}

También puedes conceder el rol `readAnyDatabase` al usuario `datadog` en la base de datos `admin` para que monitorice todas las bases de datos:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { rol: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

{{% /tab %}}
{{% tab "Sharded Cluster" %}}

1. Para cada fragmento de tu clúster, conéctate al nodo primario de la partición, crea un usuario de sólo lectura para el Datadog Agent en la base de datos `admin` y concédele los permisos necesarios:

{{< code-block lang="shell" >}}
# Autentícate como usuario administrador.
utiliza admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Crea el usuario para el Datadog Agent .
db.createUser({
  "user": "datadog",
  "pwd": "<UNIQUE_PASSWORD>",
  "roles": [
    { rol: "read", db: "admin" },
    { rol: "read", db: "local" },
    { rol: "clusterMonitor", db: "admin" }
  ]
})
{{< /code-block >}}

Concede permisos adicionales al usuario `datadog` en las bases de datos que desees monitorizar:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { rol: "read", db: "mydatabase" },
  { rol: "read", db: "myotherdatabase" }
])
{{< /code-block >}}

También puedes otorgar el rol `readAnyDatabase` al usuario `datadog` en la base de datos `admin` para monitorizar todas las bases de datos:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { rol: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

2. Sigue los mismos pasos y crea el mismo usuario desde un proxy de `mongos`. Esta acción crea el usuario local en los servidores de configuración y permite la conexión directa.

{{% /tab %}}
{{< /tabs >}}

### Guarda tu contraseña de forma segura
{{% dbm-secret %}}

### Instala y configura el Agent

Datadog recomienda instalar el Agent directamente en el host de MongoDB, ya que eso permite que el Agent recopile una variedad de telemetría del sistema (CPU, memoria, disco, red), además de la telemetría específica de MongoDB.

#### Crea el archivo Configuración 

{{< tabs >}}
{{% tab "Standalone" %}}
{{% dbm-mongodb-agent-config-standalone %}}
{{% /tab %}}
{{% tab "Replica Set" %}}
{{% dbm-mongodb-agent-config-replica-set %}}
{{% /tab %}}
{{% tab "Sharded Cluster" %}}
{{% dbm-mongodb-agent-config-sharded-cluster %}}
{{% /tab %}}
{{< /tabs >}}

#### Configura el Agent

{{< tabs >}}
{{% tab "Linux Host" %}}
{{% dbm-mongodb-agent-setup-linux %}}
{{% /tab %}}
{{% tab "Docker" %}}
{{% dbm-mongodb-agent-setup-docker %}}
{{% /tab %}}
{{% tab "Kubernetes" %}}
{{% dbm-mongodb-agent-setup-kubernetes %}}
{{% /tab %}}
{{< /tabs >}}


## Datos recopilados

### Métricas

Consula la [documentación de la integración de MongoDB][2] para obtener una lista completa de las métricas recopiladas por la integración de MongoDB.

{{% dbm-mongodb-agent-data-collected %}}

[1]: /es/account_management/api-app-keys/
[2]: /es/integrations/mongo/?tab=standalone#metrics