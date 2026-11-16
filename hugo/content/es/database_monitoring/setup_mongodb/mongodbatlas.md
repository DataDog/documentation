---
description: Instale y configure Database Monitoring para MongoDB Atlas
further_reading:
- link: /integrations/mongo/
  tag: Documentación
  text: Integración básica de MongoDB
title: Configuración de Database Monitoring para MongoDB Atlas
---
Database Monitoring ofrece información integral sobre sus bases de datos MongoDB al proporcionar acceso a métricas críticas, operaciones lentas, muestras de operaciones, planes de ejecución y cambios en el estado de replicación. Para aprovechar Database Monitoring para MongoDB, asegúrese de que el Datadog Agent esté instalado y configurado para conectarse a sus instancias de MongoDB Atlas. Esta guía describe los pasos para configurar Database Monitoring para MongoDB Atlas.

## Antes de comenzar {#before-you-begin}

Versiones principales de MongoDB compatibles
: 4.4, 5.0, 6.0, 7.0, 8.0, 9.0

Niveles de clúster de MongoDB Atlas compatibles
: M10 y superior<br/><br/>
**Nota**: Las instancias de MongoDB Atlas Serverless o los clústeres compartidos (M0 Sandbox, M2, M5) no son compatibles.

{{% dbm-mongodb-before-you-begin %}}

## Configuración {#setup}

Para habilitar Database Monitoring para su base de datos:

1. [Otorgue al Agent acceso a su clúster de MongoDB Atlas](#grant-the-agent-access-to-your-mongodb-atlas-cluster)
2. [Instale y configure el Agent](#install-and-configure-the-agent)
3. [(Opcional) Instale la integración de MongoDB Atlas](#install-the-mongodb-atlas-integration)

### Otorgue al Agent acceso a su clúster de MongoDB Atlas {#grant-the-agent-access-to-your-mongodb-atlas-cluster}

El Datadog Agent requiere acceso de solo lectura al clúster de MongoDB Atlas para recopilar estadísticas y consultas.

#### Cree un rol de monitoreo personalizado {#create-a-custom-monitoring-role}

1. En la interfaz de usuario de MongoDB Atlas, navegue a la pestaña **Database Access**.
2. En la pestaña **Custom Roles**, haga clic en **Add New Custom Role**.
3. Ingrese un **Custom Role Name**, como `datadog`.
4. Agregue los siguientes permisos al rol personalizado:
    - `read` en la base de datos `admin`
    - `read` en la base de datos `local`
    - `read` en la base de datos `config` (solo en clústeres fragmentados)
    - `clusterMonitor` en la base de datos `admin`
    - `read` en las bases de datos creadas por el usuario que desea monitorear, o `readAnyDatabase` para monitorear todas las bases de datos
5. Haga clic en **Add Custom Role**.

#### Cree un usuario de monitoreo con el rol de monitoreo personalizado {#create-a-monitoring-user-with-the-custom-monitoring-role}

1. En la interfaz de usuario de MongoDB Atlas, navegue a la pestaña **Database Access**.
2. En la pestaña **Database Users**, haga clic en **Add New Database User**.
3. En **Authentication Method**, seleccione **Password**.
4. Ingrese el nombre de usuario y la contraseña.
5. En **Database User Privileges**, expanda **Custom Roles** y seleccione el rol de monitoreo personalizado que creó en el paso anterior.
6. Haga clic en **Add User**.
7. Anote el nombre de usuario y la contraseña del usuario de monitoreo para que pueda configurar el Agent.

### Almacene su contraseña de forma segura {#securely-store-your-password}

{{% dbm-secret %}}

### Instale y configure el Agent {#install-and-configure-the-agent}

Para monitorear su clúster de MongoDB Atlas, debe instalar y configurar el Datadog Agent en un servidor que pueda [acceder de forma remota][1] a su clúster de MongoDB Atlas. Este servidor puede ser un servidor Linux, un contenedor Docker o un pod de Kubernetes.

#### Obtenga el nombre del servidor y el puerto de la instancia individual de MongoDB de la cadena de conexión SRV {#get-the-individual-mongodb-instance-hostname-and-port-from-the-srv-connection-string}

Las aplicaciones generalmente se conectan a MongoDB Atlas usando una cadena de conexión SRV, pero el Datadog Agent debe conectarse directamente a la instancia individual de MongoDB que se está monitoreando. Si el Agent se conecta a una instancia de MongoDB diferente mientras se ejecuta (como en el caso de conmutación por error, equilibrio de carga, etc.), el Agent calcula la diferencia en las estadísticas entre dos servidores, lo que produce métricas inexactas.

Para obtener el nombre del servidor y el puerto de la instancia individual de MongoDB, puede usar herramientas de línea de comandos de utilidad de red como `dig` en Linux o `nslookup` en Windows para resolver la cadena de conexión SRV.

{{< tabs >}}
{{% tab "Conjunto de réplicas" %}}

##### Miembros del conjunto de réplicas {#replica-set-members}

Para un clúster no fragmentado (conjunto de réplicas) con la cadena de conexión SRV `mongodb+srv://XXXXX.XXX.mongodb.net/`:

Use `dig` en Linux para resolver la cadena de conexión SRV:

{{< code-block lang="shell" >}}
dig +short SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

El resultado debería ser similar a:

{{< code-block lang="shell" >}}
0 0 27017 XXXXX-00-00.4zh9o.mongodb.net.
0 0 27017 XXXXX-00-01.4zh9o.mongodb.net.
0 0 27017 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

Use `nslookup` en Windows para resolver la cadena de conexión SRV:

{{< code-block lang="shell" >}}
nslookup -type=SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

El resultado debería ser similar a:

{{< code-block lang="shell" >}}
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27017 XXXXX-00-00.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27017 XXXXX-00-01.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27017 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

En este ejemplo, las instancias individuales de MongoDB `<HOST>:<PORT>` del conjunto de réplicas son:

-   `XXXXX-00-00.4zh9o.mongodb.net:27017`
-   `XXXXX-00-01.4zh9o.mongodb.net:27017`
-   `XXXXX-00-02.4zh9o.mongodb.net:27017`

Puede usar el `<HOST>:<PORT>` obtenido de la cadena de conexión SRV para configurar el Agent.
{{% /tab %}}
{{% tab "Clúster fragmentado" %}}

##### enrutadores mongos {#mongos-routers}

Para un clúster fragmentado con la cadena de conexión SRV `mongodb+srv://XXXXX.XXX.mongodb.net/`:

Use `dig` en Linux para resolver la cadena de conexión SRV:

{{< code-block lang="shell" >}}
dig +short SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

El resultado debería ser similar a:

{{< code-block lang="shell" >}}
0 0 27016 XXXXX-00-00.4zh9o.mongodb.net.
0 0 27016 XXXXX-00-01.4zh9o.mongodb.net.
0 0 27016 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

Use `nslookup` en Windows para resolver la cadena de conexión SRV:

{{< code-block lang="shell" >}}
nslookup -type=SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

El resultado debería ser similar a:

{{< code-block lang="shell" >}}
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27016 XXXXX-00-00.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27016 XXXXX-00-01.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27016 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

En este ejemplo, los `mongos` enrutadores individuales son:

-   `XXXXX-00-00.4zh9o.mongodb.net:27016`
-   `XXXXX-00-01.4zh9o.mongodb.net:27016`
-   `XXXXX-00-02.4zh9o.mongodb.net:27016`.

Puede usar el `<HOST>:<PORT>` obtenido de la cadena de conexión SRV para configurar el Agent.

##### Miembros de los fragmentos {#shard-members}

Para obtener las instancias individuales de MongoDB para cada fragmento, puede conectarse al enrutador `mongos` y ejecutar el siguiente comando:

{{< code-block lang="shell" >}}
use admin
db.runCommand("getShardMap")
{{< /code-block >}}

El resultado debería ser similar a:

{{< code-block lang="shell" >}}
{
"map" : {
"shard-0": "shard-0/XXXXX-00-00.4zh9o.mongodb.net:27017,XXXXX-00-01.4zh9o.mongodb.net:27017,XXXXX-00-02.4zh9o.mongodb.net:27017",
"shard-1": "shard-1/XXXXX-01-00.4zh9o.mongodb.net:27017,XXXXX-01-01.4zh9o.mongodb.net:27017,XXXXX-01-02.4zh9o.mongodb.net:27017"
},
"hosts": {
"XXXXX-00-00.4zh9o.mongodb.net:27017": "shard-0",
"XXXXX-00-01.4zh9o.mongodb.net:27017": "shard-0",
"XXXXX-00-02.4zh9o.mongodb.net:27017": "shard-0",
"XXXXX-01-00.4zh9o.mongodb.net:27017": "shard-1",
"XXXXX-01-01.4zh9o.mongodb.net:27017": "shard-1",
"XXXXX-01-02.4zh9o.mongodb.net:27017": "shard-1",
"XXXXX-00-00-config.4zh9o.mongodb.net:27017": "config",
"XXXXX-00-01-config.4zh9o.mongodb.net:27017": "config",
"XXXXX-00-02-config.4zh9o.mongodb.net:27017": "config"
},
"ok" : 1
}
{{< /code-block >}}

En este ejemplo, las instancias individuales de MongoDB para shard-0 son:

-   `XXXXX-00-00.4zh9o.mongodb.net:27017`
-   `XXXXX-00-01.4zh9o.mongodb.net:27017`
-   `XXXXX-00-02.4zh9o.mongodb.net:27017`

Para shard-1, son:

-   `XXXXX-01-00.4zh9o.mongodb.net:27017`
-   `XXXXX-01-01.4zh9o.mongodb.net:27017`
-   `XXXXX-01-02.4zh9o.mongodb.net:27017`

Para el servidor de configuración, son:

-   `XXXXX-00-00-config.4zh9o.mongodb.net:27017`
-   `XXXXX-00-01-config.4zh9o.mongodb.net:27017`
-   `XXXXX-00-02-config.4zh9o.mongodb.net:27017`

Puede utilizar uno de estos nombres de servidor para configurar el Agent.
{{% /tab %}}
{{< /tabs >}}

#### Cree el archivo de configuración {#create-the-configuration-file}

{{< tabs >}}
{{% tab "Conjunto de réplicas" %}}
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

### Instale la integración de MongoDB Atlas {#install-the-mongodb-atlas-integration}

Para recopilar métricas de base de datos más completas de MongoDB Atlas, instale la [integración de MongoDB Atlas][3] (opcional).

## Datos recopilados {#data-collected}

### Métricas estándar {#standard-metrics}

Consulte la [documentación de la integración de MongoDB][4] para obtener una lista completa de las métricas recopiladas por la integración de MongoDB.

### Métricas de consulta {#query-metrics}

<div class="alert alert-info">
  Las métricas de consulta requieren Datadog Agent 7.78 o posterior y MongoDB 7.0 o posterior. MongoDB 9.0 requiere Agent 7.85.0 o posterior.
</div>

Las métricas de consulta proporcionan información sobre el rendimiento de sus operaciones de MongoDB. Para obtener más información, consulte [Query Metrics][5].

Para recopilar métricas de consulta, asegúrese de haber otorgado los permisos necesarios como se describe en la sección [Otorgar acceso al Agent](#grant-the-agent-access-to-your-mongodb-atlas-cluster).

Habilite las métricas de consulta en el archivo de configuración `conf.d/mongo.d/conf.yaml`. A continuación, se muestra un ejemplo:

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

[1]: /es/database_monitoring/architecture/#cloud-managed-databases
[2]: /es/account_management/api-app-keys/
[3]: /es/integrations/mongodb_atlas/
[4]: /es/integrations/mongodb_atlas/#metrics
[5]: /es/database_monitoring/query_metrics/