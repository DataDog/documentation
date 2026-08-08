---
description: Instalar y configurar Database Monitoring for MongoDB Atlas
further_reading:
- link: /integrations/mongo/
  tag: Documentación
  text: Integración MongoDB básica
title: Configuración de Database Monitoring for MongoDB Atlas
---

Database Monitoring ofrece una visión completa de tus bases de datos MongoDB proporcionando acceso a métricas críticas, operaciones lentas, muestras de operaciones, planes de explicación y cambios de estado de replicaciones. Para aprovechar Database Monitoring for MongoDB, asegúrate de que el Datadog Agent está instalado y configurado para conectarse a tus instancias de MongoDB Atlas. Esta guía describe los pasos para configurar Database Monitoring for MongoDB Atlas.

## Antes de empezar

Versiones principales de MongoDB compatibles
: v4.4, v5.0, v6.0, v7.0, v8.0

Niveles de clúster compatibles con MongoDB Atlas
: M10 y superiores<br/><br/>
**Nota**: Las instancias de MongoDB Atlas serverless o los clústeres compartidos (M0 Sandbox, M2, M5) no son compatibles.

{{% dbm-mongodb-before-you-begin %}}

## Configuración

Para activar Database Monitoring para tu base de datos:

1. [Concede al Agent acceso a tu clúster MongoDB Atlas](#grant-the-agent-access-to-your-mongodb-atlas-cluster)
2. [Instala y configura el Agent](#install-and-configure-the-agent).
3. [(Opcional) Instala la integración MongoDB Atlas](#install-the-mongodb-atlas-integration)

### Concede al Agent acceso a tu clúster MongoDB Atlas

El Datadog Agent requiere acceso de sólo lectura al clúster MongoDB Atlas para recopilar estadísticas y consultas.

#### Crear un rol de monitorización personalizado

1. En la interfaz de usuario de MongoDB Atlas, ve a la pestaña **Acceso a la base de datos**.
2. En la pestaña **Roles personalizados**, haz clic en **Add New Custom Role** (Agregar nuevo rol personalizado).
3. Introduce un **Nombre de rol personalizado**, como `datadog`.
4. Añade los siguientes permisos al rol personalizado:
    - `read` en la base de datos `admin` 
    - `read` en la base de datos `local` 
    - `read` en la base de datos `config` (sólo clúster particionado)
    - `clusterMonitor` en la base de datos `admin` 
    - `read` en las bases de datos creadas por el usuario que quieres monitorizar o `readAnyDatabase` para monitorizar todas las bases de datos
5. Haz clic en **Add Custom Role** (Añadir rol personalizado).

#### Crear un usuario de monitorización con el rol de monitorización personalizado

1. En la interfaz de usuario de MongoDB Atlas, ve a la pestaña **Acceso a la base de datos**.
2. En la pestaña **Usuarios de la base de datos**, haz clic en **Add New Database User** (Añadir nuevo usuario a la base de datos).
3. En **Método de autenticación**, selecciona **Contraseña**.
4. Introduce el nombre de usuario y la contraseña.
5. En **Privilegios de usuario de la base de datos**, expande **Roles personalizados** y selecciona el rol de monitorización personalizado que creaste en el paso anterior.
6. Haz clic en **Add User** (Añadir usuario).
7. Anota el nombre de usuario y la contraseña del usuario de monitorización para que puedas configurar el Agent.

### Guardar tu contraseña de forma segura

{{% dbm-secret %}}

### Instalación y configuración del Agent

Para monitorizar tu clúster MongoDB Atlas, debes instalar y configurar el Datadog Agent en un host que pueda [acceder de forma remota[1] a tu clúster MongoDB Atlas. Este host puede ser un host Linux, un contenedor Docker o un pod Kubernetes.

#### Obtener el nombre de host y puerto de la instancia individual de MongoDB a partir de la cadena de conexión SRV

Las aplicaciones suelen conectarse a MongoDB Atlas utilizando una cadena de conexión SRV, pero el Datadog Agent debe conectarse directamente a la instancia individual de MongoDB que se está monitorizando. Si el Agent se conecta a una instancia de MongoDB diferente mientras se está ejecutando (como en el caso de conmutación por error, el balanceo de carga, etc.), el Agent calcula la diferencia de estadísticas entre dos hosts, produciendo datos inexactos.

Para obtener el nombre de host y el puerto de la instancia individual de MongoDB, puedes utilizar las herramientas de línea de comandos de la utilidad de red, como `dig` en Linux o `nslookup` en Windows, para resolver la cadena de conexión SRV.

{{< tabs >}}
{{% tab "Conjunto de réplicas" %}}

##### Miembros del conjunto de réplicas

Para un clúster no particionado (conjunto de réplicas) con la cadena de conexión SRV `mongodb+srv://XXXXX.XXX.mongodb.net/`:

Utiliza `dig` en Linux para resolver la cadena de conexión SRV:

{{< code-block lang="shell" >}}
dig +short SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

El resultado debe ser similar a:

{{< code-block lang="shell" >}}
0 0 27017 XXXXX-00-00.4zh9o.mongodb.net.
0 0 27017 XXXXX-00-01.4zh9o.mongodb.net.
0 0 27017 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

Utiliza `nslookup` en Windows para resolver la cadena de conexión SRV:

{{< code-block lang="shell" >}}
nslookup -type=SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

El resultado debe ser similar a:

{{< code-block lang="shell" >}}
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27017 XXXXX-00-00.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27017 XXXXX-00-01.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27017 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

En este ejemplo, las instancias individuales de MongoDB `<HOST>:<PORT>` del conjunto de réplicas son:

-   `XXXXX-00-00.4zh9o.mongodb.net:27017`
-   `XXXXX-00-01.4zh9o.mongodb.net:27017`
-   `XXXXX-00-02.4zh9o.mongodb.net:27017`

Puedes utilizar el `<HOST>:<PORT>` recuperado de la cadena de conexión SRV para configurar el Agent.
{{% /tab %}}
{{% tab "Clúster particionado" %}}

##### enrutadores mongos

Para un clúster particionado con la cadena de conexión SRV `mongodb+srv://XXXXX.XXX.mongodb.net/`:

Utiliza `dig` en Linux para resolver la cadena de conexión SRV:

{{< code-block lang="shell" >}}
dig +short SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

El resultado debe ser similar a:

{{< code-block lang="shell" >}}
0 0 27016 XXXXX-00-00.4zh9o.mongodb.net.
0 0 27016 XXXXX-00-01.4zh9o.mongodb.net.
0 0 27016 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

Utiliza `nslookup` en Windows para resolver la cadena de conexión SRV:

{{< code-block lang="shell" >}}
nslookup -type=SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

El resultado debe ser similar a:

{{< code-block lang="shell" >}}
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27016 XXXXX-00-00.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27016 XXXXX-00-01.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27016 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

En este ejemplo, los enrutadores individuales `mongos` son:

-   `XXXXX-00-00.4zh9o.mongodb.net:27016`
-   `XXXXX-00-01.4zh9o.mongodb.net:27016`
-   `XXXXX-00-02.4zh9o.mongodb.net:27016`.

Puedes utilizar el `<HOST>:<PORT>` recuperado de la cadena de conexión SRV para configurar el Agent.

##### Miembros de la partición

Para obtener las instancias individuales de MongoDB para cada partición, puedes conectarte al enrutador `mongos` y ejecutar el siguiente comando:

{{< code-block lang="shell" >}}
use admin
db.runCommand("getShardMap")
{{< /code-block >}}

El resultado debe ser similar a:

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

En este ejemplo, las instancias individuales de MongoDB para la partición-0 son:

-   `XXXXX-00-00.4zh9o.mongodb.net:27017`
-   `XXXXX-00-01.4zh9o.mongodb.net:27017`
-   `XXXXX-00-02.4zh9o.mongodb.net:27017`

Para la partición 1, son:

-   `XXXXX-01-00.4zh9o.mongodb.net:27017`
-   `XXXXX-01-01.4zh9o.mongodb.net:27017`
-   `XXXXX-01-02.4zh9o.mongodb.net:27017`

Para el servidor de configuración, son:

-   `XXXXX-00-00-config.4zh9o.mongodb.net:27017`
-   `XXXXX-00-01-config.4zh9o.mongodb.net:27017`
-   `XXXXX-00-02-config.4zh9o.mongodb.net:27017`

Puede utilizar uno de estos nombres hostpara Configurar el Agent.
{{% /tab %}}
{{< /tabs >}}

#### Crear el archivo de configuración 

{{< tabs >}}
{{% tab "Replica Set" %}}
{{% dbm-mongodb-agent-config-replica-set %}}
{{% /tab %}}
{{% tab "Sharded clúster" %}}
{{% dbm-mongodb-agent-config-sharded-cluster %}}
{{% /tab %}}
{{< /tabs >}}

#### Configurar el Agent

{{< tabs >}}
{{% tab "Linux host" %}}
{{% dbm-mongodb-agent-setup-linux %}}
{{% /tab %}}
{{% tab "Docker" %}}
{{% dbm-mongodb-agent-setup-docker %}}
{{% /tab %}}
{{% tab "Kubernetes" %}}
{{% dbm-mongodb-agent-setup-kubernetes %}}
{{% /tab %}}
{{< /tabs >}}

### Instalar la integración MongoDB Atlas

Para recopilar métricas de bases de datos más completas de MongoDB Atlas, instala la [integración MongoDB Atlas][3] (opcional).

## Datos recopilados

### Métricas

Para ver una lista completa de las métricas recopiladas por la integración MongoDB, consulta la [documentación de la integración MongoDB][4].

{{% dbm-mongodb-agent-data-collected %}}

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/database_monitoring/architecture/#cloud-managed-databases
[2]: /es/account_management/api-app-keys/
[3]: /es/integrations/mongodb_atlas/
[4]: /es/integrations/mongodb_atlas/#metrics