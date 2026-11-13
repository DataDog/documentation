---
further_reading:
- link: /integrations/mongo/
  tag: Documentación
  text: Integración básica de MongoDB
title: Configuración de Database Monitoring para MongoDB autohospedado
---
Database Monitoring ofrece información integral sobre sus bases de datos MongoDB al proporcionar acceso a métricas críticas, operaciones lentas, muestras de operaciones, planes de explicación y cambios en el estado de replicación. Para aprovechar Database Monitoring para MongoDB, asegúrese de que el Datadog Agent esté instalado y configurado para conectarse a sus instancias de MongoDB. Esta guía describe los pasos para configurar Database Monitoring para MongoDB autohospedado.

## Antes de comenzar {#before-you-begin}

Versiones principales de MongoDB compatibles
: 4.4, 5.0, 6.0, 7.0, 8.0

Ediciones de MongoDB compatibles
: Community, Enterprise

{{% dbm-mongodb-before-you-begin %}}

## Configuración {#setup}

Para habilitar Database Monitoring para su base de datos:

1. [Otorgue al Agent acceso a sus instancias de MongoDB](#grant-the-agent-access-to-your-mongodb-instances)
2. [Instale y configure el Agent](#install-and-configure-the-agent)

### Otorgue al Agent acceso a sus instancias de MongoDB {#grant-the-agent-access-to-your-mongodb-instances}

El Datadog Agent requiere acceso de solo lectura a la instancia de MongoDB para recopilar estadísticas y consultas.

{{< tabs >}}
{{% tab "Standalone" %}}

En una shell de Mongo, autentíquese en la instancia de MongoDB, cree un usuario de solo lectura para el Datadog Agent en la base de datos `admin` y otorgue los permisos necesarios:

{{< code-block lang="shell" >}}
# Authenticate as the admin user.
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Create the user for the Datadog Agent.
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

Otorgue permisos adicionales al usuario `datadog` en las bases de datos que desea hacer un seguimiento:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "read", db: "mydatabase" },
  { role: "read", db: "myotherdatabase" }
])
{{< /code-block >}}

Alternativamente, puede otorgar el rol `readAnyDatabase` al usuario `datadog` en la base de datos `admin` para hacer un seguimiento de todas las bases de datos:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

{{% /tab %}}
{{% tab "Replica Set" %}}

En una shell de Mongo, autentíquese en el nodo principal del replica set, cree un usuario de solo lectura para el Datadog Agent en la base de datos `admin` y otorgue los permisos necesarios:

{{< code-block lang="shell" >}}
# Authenticate as the admin user.
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Create the user for the Datadog Agent.
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

Otorgue permisos adicionales al usuario `datadog` en las bases de datos que desea hacer un seguimiento:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "read", db: "mydatabase" },
  { role: "read", db: "myotherdatabase" }
])
{{< /code-block >}}

Alternativamente, puede otorgar el rol `readAnyDatabase` al usuario `datadog` en la base de datos `admin` para hacer un seguimiento de todas las bases de datos:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

{{% /tab %}}
{{% tab "Clúster fragmentado" %}}

1. Para cada fragmento en su clúster, conéctese al nodo principal del fragmento, cree un usuario de solo lectura para el Datadog Agent en la base de datos `admin` y otorgue los permisos requeridos:

{{< code-block lang="shell" >}}
# Authenticate as the admin user.
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Create the user for the Datadog Agent.
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

Otorgue permisos adicionales al usuario `datadog` en las bases de datos que desea hacer un seguimiento:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "read", db: "mydatabase" },
  { role: "read", db: "myotherdatabase" }
])
{{< /code-block >}}

Alternativamente, puede otorgar el rol `readAnyDatabase` al usuario `datadog` en la base de datos `admin` para hacer un seguimiento de todas las bases de datos:

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

2. Siga los mismos pasos y cree el mismo usuario desde un proxy `mongos`. Esta acción crea el usuario local en los servidores de configuración y permite la conexión directa.

{{% /tab %}}
{{< /tabs >}}

### Almacene su contraseña de forma segura {#securely-store-your-password}
{{% dbm-secret %}}

### Instale y configure el Agent {#install-and-configure-the-agent}

Datadog recomienda instalar el Agent directamente en el servidor MongoDB, ya que eso permite que el Agent recopile una variedad de telemetría del sistema (CPU, memoria, disco, red) además de la telemetría específica de MongoDB.

#### Cree el archivo de configuración {#create-the-configuration-file}

{{< tabs >}}
{{% tab "Standalone" %}}
{{% dbm-mongodb-agent-config-standalone %}}
{{% /tab %}}
{{% tab "Replica Set" %}}
{{% dbm-mongodb-agent-config-replica-set %}}
{{% /tab %}}
{{% tab "Clúster fragmentado" %}}
{{% dbm-mongodb-agent-config-sharded-cluster %}}
{{% /tab %}}
{{< /tabs >}}

#### Configure el Agent {#set-up-the-agent}

{{< tabs >}}
{{% tab "Servidor Linux" %}}
{{% dbm-mongodb-agent-setup-linux %}}
{{% /tab %}}
{{% tab "Docker" %}}
{{% dbm-mongodb-agent-setup-docker %}}
{{% /tab %}}
{{% tab "Kubernetes" %}}
{{% dbm-mongodb-agent-setup-kubernetes %}}
{{% /tab %}}
{{< /tabs >}}

## Métricas de consulta {#query-metrics}

Las métricas de consulta para MongoDB autohospedado requieren MongoDB 8.0 o posterior y dependen de la canalización de agregación `$queryStats`. La recopilación de estadísticas de consulta está deshabilitada de forma predeterminada en el servidor MongoDB. Habilítela en cada proceso `mongod` o `mongos`. El parámetro de servidor requerido depende de su versión de MongoDB.

### MongoDB 8.0.20 o posterior {#mongodb-8020-or-later}

Establezca `internalQueryStatsSampleRate` en `1.0` (muestreo del 100%).

Agregue el parámetro al archivo de configuración de MongoDB:

{{< code-block lang="yaml" >}}
setParameter:
  internalQueryStatsSampleRate: 1.0
{{< /code-block >}}

O páselo en la línea de comandos:

{{< code-block lang="shell" >}}
mongod --setParameter internalQueryStatsSampleRate=1.0
{{< /code-block >}}

Para habilitarlo en tiempo de ejecución hasta el próximo reinicio, ejecute:

{{< code-block lang="javascript" >}}
db.adminCommand({setParameter: 1, internalQueryStatsSampleRate: 1.0})
{{< /code-block >}}

### MongoDB 8.0.0 a 8.0.19 {#mongodb-800-through-8019}

Establezca `internalQueryStatsRateLimit` en `-1` (sin límite de tasa).

Agregue el parámetro al archivo de configuración de MongoDB:

{{< code-block lang="yaml" >}}
setParameter:
  internalQueryStatsRateLimit: -1
{{< /code-block >}}

O páselo en la línea de comandos:

{{< code-block lang="shell" >}}
mongod --setParameter internalQueryStatsRateLimit=-1
{{< /code-block >}}

Para habilitarlo en tiempo de ejecución hasta el próximo reinicio, ejecute:

{{< code-block lang="javascript" >}}
db.adminCommand({setParameter: 1, internalQueryStatsRateLimit: -1})
{{< /code-block >}}

Para obtener más información sobre los parámetros del servidor que controlan la recopilación de estadísticas de consultas, consulte la [documentación de Estadísticas de consultas de MongoDB][4].

## Datos recopilados {#data-collected}

### Métricas estándar {#standard-metrics}

Consulte la [documentación de integración de MongoDB][2] para obtener una lista completa de las métricas recopiladas por la integración de MongoDB.

### Métricas de consulta {#query-metrics-1}

<div class="alert alert-info">
  Esto requiere Datadog Agent v7.78 o posterior y MongoDB 8.0+ para servidores autohospedados.
</div>

Las métricas de consulta proporcionan información sobre el rendimiento de sus operaciones de MongoDB. Para obtener más información, consulte [Métricas de consulta][3].

Para recopilar métricas de consulta, asegúrese de haber otorgado los permisos necesarios como se describe en la sección [Otorgue al Agent acceso a sus instancias de MongoDB](#grant-the-agent-access-to-your-mongodb-instances).

Habilite las métricas de consulta en el archivo de configuración `conf.d/mongo.d/conf.yaml`, a continuación se muestra un ejemplo:

{{< highlight yaml "hl_lines=11-12" >}}
init_config:
instances:
  - hosts:
      - <HOST>:<PORT>
    username: datadog
    password: "ENC[datadog_user_database_password]"
    options:
      authSource: admin
    tls: true
    dbm: true
    query_metrics:
      enabled: true
    cluster_name: <MONGO_CLUSTER_NAME>
    reported_database_hostname: <DATABASE_HOSTNAME_OVERRIDE>
    additional_metrics: ["metrics.commands", "tcmalloc", "top", "collection"]
    collections_indexes_stats: true
    database_autodiscovery:
      enabled: true
{{< /highlight >}}

{{% dbm-mongodb-agent-data-collected %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/api-app-keys/
[2]: /es/integrations/mongo/?tab=standalone#metrics
[3]: /es/database_monitoring/query_metrics/
[4]: https://github.com/mongodb/mongo/blob/master/src/mongo/db/query/query_stats/README.md#server-parameters