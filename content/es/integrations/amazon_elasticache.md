---
aliases:
- /es/integrations/awselasticache/
- /es/integrations/elasticache/
categories:
- aws
- caching
- cloud
- configuration & deployment
- log collection
custom_kind: integración
dependencies: []
description: Seguimiento de métricas clave de Amazon ElasicCache.
doc_link: https://docs.datadoghq.com/integrations/amazon_elasticache/
draft: false
git_integration_title: amazon_elasticache
has_logo: true
integration_id: ''
integration_title: Amazon ElastiCache
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_elasticache
public_title: Integración de Amazon ElastiCache en Datadog
short_description: Seguimiento de métricas clave de Amazon ElasicCache.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/awselasticache/elasticache-memcached.png" alt="Dashboard Memcached predeterminado de ElastiCache" popup="true">}}

## Información general

Consulta [Monitorización de métricas de rendimiento de ElastiCache con Redis o Memcached][1] para obtener información sobre métricas de rendimiento clave, cómo recopilarlas y cómo [Coursera][2] monitoriza ElastiCache utilizando Datadog.

## Configuración

Si aún no lo has hecho, configura la [integración Amazon Web Services][3].

### Instalación sin el Datadog Agent

1. En la [página de la integración AWS][4], asegúrate de que `ElastiCache` está habilitado en la pestaña `Metric Collection`.
2. Añade los siguientes permisos a tu [política IAM de Datadog][5] para poder recopilar métricas de Amazon ElastiCache. Para obtener más información, consulta las [políticas de ElastiCache][6] en el sitio web de AWS.

    | Permiso AWS                          | Descripción |                                            |
    | ----------------------------------- | --------------------------------------------------------------------- |
    | `elasticache:DescribeCacheClusters` | Enumera y describe clústeres de caché, para añadir etiquetas (tags) y métricas adicionales. |
    | `elasticache:ListTagsForResource` | Enumera etiquetas personalizadas de un clúster, para añadir etiquetas personalizadas.                    |
    | `elasticache:DescribeEvents` | Añade eventos de snapshots y mantenimientos.                          |

3. Instala la [integración Amazon ElastiCache en Datadog][7].

### Instalación con el Datadog Agent (recomendado)

#### Recopilación de métricas nativas con el Agent

El siguiente diagrama muestra cómo Datadog recopila métricas directamente de CloudWatch con la integración ElastiCache nativa y cómo además puede recopilar métricas nativas directamente de tecnologías backend: Redis o Memcached. Al recopilar directamente del backend, tienes acceso a un mayor número de métricas importantes, a una mayor resolución.

{{< img src="integrations/awselasticache/elasticache1.png" alt="Integraciones ElastiCache, Redis y Memcached" >}}

#### Funcionamiento

Debido a que las métricas del Agent están vinculadas a la instancia EC2, donde se ejecuta el Agent, y no a la instancia ElastiCache real, es necesario utilizar la etiqueta `cacheclusterid`para conectar todas las métricas. Una vez que el Agent esté configurado con las mismas etiquetas que la instancia ElastiCache, la combinación de las métricas Redis/Memcached con las métricas ElastiCache es realmente sencilla.

#### Paso a paso

Debido a que el Agent no se ejecuta en una instancia ElastiCache real, sino en una máquina remota, la clave para configurar correctamente esta integración es indicarle al Agent dónde recolectar las métricas.

##### Recopilación de la información de conexión para tu instancia ElastiCache

Primero ve a la consola de AWS, abre la sección ElastiCache y luego la pestaña Clústeres de caché para encontrar el clúster que quieres monitorizar. Deberías ver algo como lo siguiente:

{{< img src="integrations/awselasticache/elasticache2.png" alt="Clústeres ElastiCache en la consola de AWS" >}}

Luego, haz clic en el enlace "nodo" para acceder a la URL de tu endpoint:

{{< img src="integrations/awselasticache/elasticache3.png" alt="Link nodo en la consola de AWS" >}}

Anota la URL del endpoint (por ejemplo: **replica-001.xxxx.use1.cache.amazonaws.com**) y el `cacheclusterid` (por ejemplo: **replica-001**). Necesitas estos valores para configurar el Agent y para crear gráficos y dashboards.

##### Configuración del Agent

Las integraciones Redis/Memcached admiten el etiquetado de instancias de caché individuales. Originalmente diseñadas para permitir la monitorización de múltiples instancias en la misma máquina, estas etiquetas también se pueden utilizar para filtrar y agrupar métricas. El siguiente es un ejemplo de configuración de ElastiCache con Redis utilizando `redisdb.yaml`. Para obtener más información acerca de dónde se almacena este archivo en función de tu plataforma, consulta el [directorio de configuración del Agent][8].

```yaml
init_config:

instances:
    # URL del endpoint de la consola de AWS
    - host: replica-001.xxxx.use1.cache.amazonaws.com
      port: 6379
      # ID del clúster de caché de la consola de AWS
      tags:
          - cacheclusterid:replicaa-001
```

A continuación, reinicia el Agent: `sudo /etc/init.d/datadog-agent restart` (en Linux).

##### Visualizar métricas juntas

Después de unos minutos, se puede acceder a las métricas ElastiCache y a las métricas Redis o Memcached en Datadog para la creación de gráficos, la monitorización, etc.

A continuación se muestra un ejemplo de configuración de un gráfico para combinar las métricas de hits de caché de ElastiCache con las métricas de latencia nativas de Redis utilizando la misma etiqueta `cacheclusterid` **replicaa-001**.

{{< img src="integrations/awselasticache/elasticache4.png" alt="Métricas ElastiCache y de caché" >}}

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_elasticache" >}}


A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas que aparecen en la consola de AWS, incluidos, entre otros, el nombre del host y los grupos de seguridad.

**Nota**: Las métricas para despliegues de ElastiCache Serverless se informan en el mismo espacio de nombres `aws.elasticache`. Estas métricas pueden distinguirse por etiquetas (tags):

   - Las métricas de ElastiCache existentes para cachés de diseño propio utilizan la etiqueta cacheclusterid para identificar una caché individual.
   - Las métricas de caché serverless utilizan la etiqueta clusterid para identificar las cachés individuales

### Eventos

La integración Amazon ElastiCache incluye eventos para clúster, grupos de seguridad de caché y grupos de parámetros de caché. Consulta los siguientes ejemplos de eventos:

{{< img src="integrations/amazon_elasticache/aws_elasticache_events.png" alt="Eventos Amazon ElastiCache" >}}

### Checks de servicio

La integración Amazon ElastiCache no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

## Referencias adicionales

- [Monitorización de métricas de rendimiento de ElastiCache con Redis o Memcached][1]
- [Recopilación de métricas ElastiCache + sus métricas Redis/Memcached][11]

[1]: https://www.datadoghq.com/blog/monitoring-elasticache-performance-metrics-with-redis-or-memcached
[2]: https://www.coursera.org
[3]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[4]: https://app.datadoghq.com/integrations/amazon-web-services
[5]: https://docs.datadoghq.com/es/integrations/amazon_web_services/#installation
[6]: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/IAM.html
[7]: https://app.datadoghq.com/integrations/amazon-elasticache
[8]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_elasticache/amazon_elasticache_metadata.csv
[10]: https://docs.datadoghq.com/es/help/
[11]: https://www.datadoghq.com/blog/collecting-elasticache-metrics-its-redis-memcached-metrics