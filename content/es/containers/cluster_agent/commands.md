---
aliases:
- /es/agent/cluster_agent/commands
description: Guía de referencia de la interfaz de línea de comandos y variables de
  entorno del Datadog Cluster Agent
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Introducción al Datadog Cluster Agent
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: Blog
  text: Escala automáticamente tus cargas de trabajo de Kubernetes con cualquier métrica
    de Datadog
- link: /agent/cluster_agent/clusterchecks/
  tag: Documentación
  text: Ejecutar checks de clústeres con Autodiscovery
- link: /agent/kubernetes/daemonset_setup/
  tag: Documentación
  text: Configuración de Kubernetes DaemonSet
- link: /agent/cluster_agent/troubleshooting/
  tag: Documentación
  text: Solucionar problemas del Datadog Cluster Agent
title: Comandos y opciones del Cluster Agent
---

## Comandos del Cluster Agent

Estos son los comandos disponibles para los Datadog Cluster Agents:

`datadog-cluster-agent status`              
: Ofrece información general sobre los componentes del Agent y su estado.

`datadog-cluster-agent metamap <NODE_NAME>` 
: Consulta la caché local de la asignación efectuada entre los pods de `NODE_NAME` y los metadatos del clúster asociados, tales como los endpoints. Si no se especifica, el parámetro `NODE_NAME` ejecutará el asignador en todos los nodos del clúster.

`datadog-cluster-agent flare <CASE_ID>`     
: De forma similar al Agent basado en nodos, el Cluster Agent puede agregar los logs y las configuraciones utilizadas, y reenviar un archivo al equipo de asistencia. Asimismo, puede ser deflactarse y utilizarse solo de forma local. **Nota**: Este comando se ejecuta desde el pod del Cluster Agent.

## Variables de entorno del Cluster Agent

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Configura variables de entorno del Cluster Agent en `override.clusterAgent.env`:

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    clusterAgent:
      env:
        - name: <ENV_VAR_NAME>
          value: <ENV_VAR_VALUE>
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}
Configura variables de entorno del Cluster Agent en `clusterAgent.env`:
{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
clusterAgent:
  env:
    - name: <ENV_VAR_NAME>
      value: <ENV_VAR_VALUE>
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

Se admiten las siguientes variables de entorno:

`DD_API_KEY`                                 
: Tu [clave de API Datadog][1].

`DD_CLUSTER_CHECKS_ENABLED`                   
: Activa la detección automática con Autodiscovery de checks de clúster. Se establece por defecto como `false`.

`DD_CLUSTER_AGENT_AUTH_TOKEN`                
: Token de 32 caracteres que debe ser compartido entre el Agent de nodo y el Datadog Cluster Agent.

`DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME`    
: Nombre del servicio de Kubernetes a través del cual se exponen los Cluster Agents. Se establece por defecto como `datadog-cluster-agent`.

`DD_CLUSTER_NAME`                             
: Nombre del clúster. Se añade como etiqueta (tag) de instancia a todas las configuraciones de checks de clúster.

`DD_CLUSTER_CHECKS_ENABLED`
: Cuando es true, habilita la lógica de envío en el Cluster Agent principal. Por defecto: `false`.

`DD_CLUSTER_CHECKS_NODE_EXPIRATION_TIMEOUT`   
: Tiempo (en segundos) tras el cual los Agents basados en nodos se consideran inactivos y se eliminan del grupo. El valor predeterminado es de `30` segundos.

`DD_CLUSTER_CHECKS_WARMUP_DURATION`           
: Retraso (en segundos) entre la obtención del liderazgo y el inicio de la lógica de los checks de clúster, lo cual permite que todos los Agents basados en nodos se registren primero. El valor predeterminado es de `30` segundos. 

`DD_CLUSTER_CHECKS_CLUSTER_TAG_NAME`          
: Nombre de la etiqueta (tag) de instancia definida con la opción `DD_CLUSTER_NAME`. Se establece por defecto como `cluster_name`.

`DD_CLUSTER_CHECKS_EXTRA_TAGS`               
: Añade etiquetas (tags) adicionales a métricas de checks de clúster.

`DD_CLUSTER_CHECKS_ADVANCED_DISPATCHING_ENABLED`
: Cuando es true, el Cluster Agent principal recopila estadísticas de los ejecutores de checks a nivel de clúster para optimizar la lógica de envío de checks. Por defecto: `false`.

`DD_CLUSTER_CHECKS_CLC_RUNNERS_PORT`
: El puerto utilizado por el cliente Cluster Agent para llegar a los ejecutores de checks a nivel de clúster y recopilar sus estadísticas. Por defecto: `5005`.

`DD_HOSTNAME`                                 
: Nombre de host que hay que utilizar en el Datadog Cluster Agent.

`DD_ENV`                                      
: Establece la etiqueta `env` en los datos emitidos por el Cluster Agent. Recomendado solo si el Cluster Agent monitoriza servicios dentro de un único entorno.

`DD_USE_METADATA_MAPPER`                      
: Habilita la asignación de los metadatos del clúster. Se establece por defecto como `true`.

`DD_COLLECT_KUBERNETES_EVENTS`                
: Configura el Agent para recopilar eventos de Kubernetes. Se establece por defecto como `false`.

`DD_LEADER_ELECTION`                          
: Activa la opción principal. Define `DD_COLLECT_KUBERNETES_EVENTS` como `true` para  activar esta función. Se establece por defecto como `false`.

`DD_LEADER_LEASE_DURATION`                    
: Solo se utiliza si está activada la opción principal. De forma predeterminada, el valor en segundos es 60.

`DD_KUBE_RESOURCES_NAMESPACE`                 
: Configura el espacio de nombres donde el Cluster Agent crea los ConfigMaps necesarios para la opción principal, la recopilación de eventos (opcional) y el escalado automático horizontal de pods.

`DD_KUBERNETES_INFORMERS_RESYNC_PERIOD`       
: Frecuencia (en segundos) con la que se consulta al servidor de la API para resincronizar la caché local. El valor predeterminado es de 5 minutos o `300` segundos.

`DD_KUBERNETES_INFORMERS_RESTCLIENT_TIMEOUT`  
: Tiempo de espera (en segundos) del cliente que se comunica con el servidor de la API. El valor predeterminado es de `60` segundos.

`DD_METRICS_PORT`                             
: Puerto para exponer métricas del Datadog Cluster Agent. Por defecto, es el puerto `5000`.

`DD_EXTERNAL_METRICS_PROVIDER_BATCH_WINDOW`   
: Tiempo de espera (en segundos) para procesar un lote de métricas desde varios escaladores automáticos. El valor predeterminado es de `10` segundos.

`DD_EXTERNAL_METRICS_PROVIDER_MAX_AGE`        
: Antigüedad máxima (en segundos) de un punto de datos antes de considerarlo no válido para su uso. El valor predeterminado es de `120` segundos.

`DD_EXTERNAL_METRICS_AGGREGATOR`     
: Aggregator para métricas de Datadog. Se aplica a todos los escaladores automáticos procesados. Puedes elegir entre `sum`/`avg`/`max`/`min`.

`DD_EXTERNAL_METRICS_PROVIDER_BUCKET_SIZE`    
: Tamaño (en segundos) de la ventana utilizada para consultar métricas desde Datadog. El valor predeterminado es de `300` segundos.

`DD_EXTERNAL_METRICS_LOCAL_COPY_REFRESH_RATE` 
: Frecuencia con las que se resincroniza la caché local de las métricas procesadas con el almacén global. Útil cuando hay varias réplicas del Cluster Agent.

`DD_EXTRA_CONFIG_PROVIDERS`                   
: Proveedores de configuración de Autodiscovery adicionales que hay que utilizar.

`DD_EXTRA_LISTENERS`                          
: Procesos de escucha adicionales de Autodiscovery que hay que ejecutar.

`DD_PROXY_HTTPS`                
: Configura un servidor proxy para solicitudes HTTPS.

`DD_PROXY_HTTP`                
: Configura un servidor proxy para solicitudes HTTP.

`DD_PROXY_NO_PROXY`                
: Configura una lista de hosts que, en circunstancias normales, omiten el proxy. Los elementos de la lista se separan entre sí con espacios.

`DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_INIT_RESOURCES_CPU`
: Configura las solicitudes y el límite de CPU para contenedores init.

`DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_INIT_RESOURCES_MEMORY`
: Configura las solicitudes y el límite de memoria para contenedores init.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://golang.org/pkg/expvar