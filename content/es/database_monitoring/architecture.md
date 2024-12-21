---
description: Más información sobre la Monitorización de base de datos y cómo empezar
further_reading:
- link: https://www.datadoghq.com/blog/database-performance-monitoring-datadog
  tag: Blog
  text: Monitorizar y visualizar el rendimiento de las bases de datos
- link: /database_monitoring/data_collected/
  tag: Documentación
  text: Datos recopilados
- link: /database_monitoring/troubleshooting/
  tag: Documentación
  text: Solucionar problemas
title: Arquitecturas de configuración de DBM
---

## Información general

Los pasos necesarios para configurar Monitorización de base de datos en Datadog varían en función del tipo de base de datos que utilices (Postgres, MySQL, SQL Server, Oracle) y del proveedor host (autoalojado, AWS, Google Cloud SQL, Azure u Oracle). Para utilizar Monitorización de base de datos para cualquier base de datos en cualquier proveedor de host, necesitas lo siguiente:

* [Un Datadog Agent][1]
* Host para tu Datadog Agent
* Acceso de sólo lectura para tus bases de datos

## Agent

Datadog Agent es un software ligero que supervisa las métricas de sistema, como la actividad de la CPU, la memoria y red. También se conecta a la base de datos como usuario SQL para recopilar datos sobre el rendimiento de la base de datos.

En el caso de las bases de datos autoalojadas, instala el Agent directamente en el host que aloja tu base de datos. En el caso de bases de datos gestionadas en la nube, como Amazon RDS y Azure SQL, configura el Agent para conectarte a tus bases de datos de forma remota.


### Bases de datos autoalojadas

{{< img src="database_monitoring/dbm_architecture_self-hosted.png" alt="La configuración autoalojada pasa por el proceso de base de datos en el host de base de datos, que también aloja el Agent. Luego de conectar a Internet, pasa por el backend de Datadog.">}}

En una configuración autoalojada, el Datadog Agent recopila las métricas de sistema desde el sistema operativo host, las métricas de base de datos directamente desde la base de datos, y eventos de log desde logs de base de datos.

* [Métricas de sistema recopiladas en Postgres][2]
* [Métricas de sistema recopiladas en MySQL][3]
* [Métricas de sistema recopiladas en SQL Server][4]
* [Métricas de sistema recopiladas en Oracle][17]

En el caso de las configuraciones autoalojadas, el Agent se instala directamente en la base de datos host, de modo que se dispone de una visibilidad completa del estado del sistema que ejecuta el proceso de base de datos.

Concedes al Agent el acceso de sólo lectura a tu base de datos, y configuras la integración. El Agent debe iniciar sesión como usuario para poder ejecutar consultas de sólo lectura en tu base de datos.

Instrucciones para configurar la Monitorización de base de datos con un proveedor de autoalojado:

* [Postgres][5]
* [MySQL][6]
* [SQL Server][7]
* [Oracle][16]

### Bases de datos gestionadas en la nube

Si tu configuración está gestionada en la nube (con proveedores como [Amazon RDS][8] o Aurora, Google Cloud SQL o Azure), instala el Agent en un host separado y configura para conectarte a cada instancia gestionada.

La Monitorización de base de datos recopila métricas del sistema como CPU, memoria, uso de disco, logs y telemetría relacionada directamente desde el proveedor de la nube utilizando la integración de Datadog con ese proveedor.

{{< img src="database_monitoring/dbm_architecture_cloud-hosted.png" alt="La instancia de base de datos está separada del host del Agent, que está separado del backend de Datadog. La API en la nube se conecta a la integración de Datadog AWS mediante Internet.">}}

Puedes instalar el Agent en cualquier máquina virtual en la nube (por ejemplo, EC2) siempre que el Agent pueda conectarse a tus instancias de base de datos.

Si no estás ejecutando tu propio clúster de Kubernetes, Datadog recomienda utilizar las herramientas de orquestación de tu proveedor de nube. Por ejemplo, puedes utilizar [Amazon ECS][9] para alojar el Datadog Agent, ya que [el Agent ya existe como contenedor de Docker][10].

### Kubernetes

Si estás ejecutando tus aplicaciones en [Kubernetes][11], utiliza el [Datadog Cluster Agent con la monitorización de base de datos][12], que puede ejecutar [checks de clúster][13] en tus pods.

{{< img src="database_monitoring/dbm_architecture_clusters.png" alt="Instancias de bases de datos en un proveedor de nube conectan con los nodos de un clúster de Kubernetes, que luego se conectan al backend de Datadog mediante Internet. La API de nube conecta directamente a la integración de Datadog AWS.">}}

El [Cluster Agent][14] distribuye automáticamente las instancias de la base de datos entre un grupo de Agents. Esto garantiza que sólo se ejecute una instancia de cada check, en lugar de que cada pod del Agent basado en nodos ejecute su correspondiente check. El Cluster Agent almacena las configuraciones y las envía dinámicamente a los Agents basados en nodos. Los Agents en cada nodo se conectan al Cluster Agent cada 10 segundos y recuperan las configuraciones que deben ejecutarse.

Si un Agent deja de informar, el Cluster Agent lo retira del grupo activo y envía las configuraciones a otros Agent. Esto garantiza que siempre se ejecute una (y sólo una) instancia, aunque se añadan y retiren nodos del clúster. Esto es importante cuando se tiene un gran número de instancias de base de datos: el Cluster Agent distribuye los checks de clúster entre los diferentes nodos.

#### Aurora

Si estás utilizando [Aurora][15], el Agent debe estar conectado a la instancia individual de Aurora (no al endpoint del clúster) porque el Agent debe conectarse directamente al host que está siendo monitoreado.

En el caso de la monitorización de bases de datos de Aurora, el Agent no debe conectarse a la base de datos a través del proxy, un equilibrador de carga, un agrupador de conexiones como `pgbouncer` o el endpoint del clúster de Aurora. Cada Datadog Agent debe tener conocimiento del nombre de host subyacente y debe ejecutarse en un único host durante toda su vida, incluso en casos de conmutación por error. De lo contrario, los valores de métricas se vuelven incorrectos.

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/basic_agent_usage/
[2]: /es/integrations/postgres/?tab=host#data-collected
[3]: /es/integrations/mysql/?tab=host#data-collected
[4]: /es/integrations/sqlserver/?tabs=host#data-collected
[5]: /es/database_monitoring/setup_postgres/selfhosted/
[6]: /es/database_monitoring/setup_mysql/selfhosted/
[7]: /es/database_monitoring/setup_sql_server/selfhosted/
[8]: /es/integrations/amazon_rds/
[9]: /es/agent/amazon_ecs/
[10]: /es/agent/docker/
[11]: /es/agent/kubernetes/integrations/
[12]: /es/database_monitoring/setup_postgres/rds/?tab=kubernetes
[13]: /es/agent/cluster_agent/clusterchecks/
[14]: https://www.datadoghq.com/blog/datadog-cluster-agent/
[15]: /es/database_monitoring/setup_postgres/aurora/
[16]: /es/database_monitoring/setup_oracle/selfhosted/
[17]: /es/integrations/oracle/?tab=linux#data-collected