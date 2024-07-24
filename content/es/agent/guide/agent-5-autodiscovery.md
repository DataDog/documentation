---
aliases:
- /es/agent/faq/agent-5-autodiscovery
private: true
title: Autodiscovery con el Agent v5
---

<div class="alert alert-info">
Autodiscovery antes se llamaba Service Discovery, y se sigue llamando así en el código del Agent y en algunas opciones de configuración.
</div>

Docker se está [popularizando rápidamente][1]. Las plataformas de orquestación como Docker Swarm, Kubernetes y Amazon ECS facilitan la ejecución de servicios con Docker y los refuerzan gracias a que gestionan tareas de orquestación y replicación entre hosts. Sin embargo, esto dificulta la monitorización. ¿Cómo se puede monitorizar de forma fiable un servicio que cambia de manera impredecible de un host a otro?

El Datadog Agent puede realizar un rastreo automático para saber qué servicios se están ejecutando y dónde gracias a su función Autodiscovery. Autodiscovery te permite definir plantillas de configuración para los checks del Agent y determinar a qué contenedores debe aplicarse cada check.

El Agent habilita, deshabilita y regenera las configuraciones estáticas del check procedentes de las plantillas a medida que los contenedores entran y salen. Cuando tu contenedor NGINX pasa de 10.0.0.6 a 10.0.0.17, Autodiscovery ayuda al Agent a actualizar su configuración del check de NGINX con la nueva dirección IP para que pueda seguir recopilando métricas de NGINX sin que tú tengas que hacer nada.

## Información general

En un entorno tradicional sin contenedores, la configuración del Datadog Agent es estática, al igual que el entorno en el que se ejecuta. El Agent lee las configuraciones del check desde el disco cuando se inicia y, mientras está funcionando, ejecuta continuamente todos los checks configurados.

Los archivos de configuración son estáticos, y cualquier opción relacionada con la red configurada en ellos sirve para identificar instancias concretas de un servicio monitorizado. Por ejemplo: una instancia de Redis en 10.0.0.61:6379. Cuando un check del Agent no pueda conectarse a un servicio de este tipo, faltarán las métricas hasta que se solucione el problema. El check del Agent volverá a intentar conectarse hasta que un administrador restablezca el servicio monitorizado o corrija la configuración del check.

Si se ha activado Autodiscovery, el Agent ejecutará los checks de forma diferente.

### Configuración diferente

Los archivos de configuración estáticos no son compatibles con checks que recopilan datos de endpoints de red en constante cambio, por lo que Autodiscovery utiliza **plantillas** para la configuración del check. En cada plantilla, el Agent buscará dos variables de plantilla (`%%host%%` y `%%port%%`) en lugar de las opciones de red que suelen codificarse. Por ejemplo: las plantillas del [check Go-Expvar][2] del Agent contendrán la opción `expvar_url: http://%%host%%:%%port%%`. En el caso de contenedores que tienen más de una dirección IP o un puerto expuesto, puedes indicar al Autodiscovery que elija las opciones correctas utilizando los [índices de las variables de plantilla](#supported-template-variables).

Dado que las plantillas no identifican instancias específicas de un servicio monitorizado (¿qué `%%host%%`? o ¿qué `%%port%%`?), Autodiscovery necesita uno o más **identificadores de contenedor** en cada plantilla para poder determinar qué IP y puertos sustituir en las plantillas. En Docker, los identificadores de contenedor son nombres de imagen o etiquetas de contenedor.

Por último, Autodiscovery puede cargar plantillas de checks desde distintos lugares del disco. Otras posibles **fuentes de plantillas** son los almacenes de valores clave como Consul y, cuando se ejecutan en Kubernetes, las anotaciones de pod.

### Ejecución diferente

Cuando se inicia el Agent con el Autodiscovery activado, carga plantillas de checks de todas las fuentes de plantillas disponibles, [no solo de una u otra](#template-source-precedence), junto con los identificadores de contenedor de las plantillas. A diferencia de lo que ocurre en una configuración del Agent tradicional, en este caso, el Agent no ejecuta siempre todos los checks, sino que decide qué checks activar al inspeccionar todos los contenedores que se ejecutan en el mismo host que el Agent.

El Agent, al inspeccionar todos los contenedores en ejecución, comprueba si estos coinciden con alguno de los identificadores de contenedor presentes en las plantillas cargadas. Por cada coincidencia, el Agent genera una configuración estática de checks sustituyendo la dirección IP y el puerto del contenedor que coincida. Una vez hecho esto, activa el check mediante la configuración estática.

El Agent detecta los eventos de Docker (como la creación, destrucción, inicio y detención de contenedores) y activa, desactiva y regenera la configuración estática de checks en dichos eventos.

## Cómo configurarlo

### Ejecutar el contenedor del Agent

Independientemente de la plataforma de orquestación de contenedores que utilices, ejecuta primero un único [contenedor docker-dd-agent][3] en cada host en tu clúster. Si usas Kubernetes, accede a la [página de integración de Kubernetes][4] para consultar las instrucciones sobre cómo ejecutar docker-dd-agent. Si utilizas Amazon ECS, consulta [su página de integración][5].

Si utilizas Docker Swarm, ejecuta el siguiente comando en uno de tus nodos de gestión:

    docker service create \
      --name dd-agent \
      --mode global \
      --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
      --mount type=bind,source=/proc/,target=/host/proc/,ro=true \
      --mount type=bind,source=/sys/fs/cgroup/,target=/host/sys/fs/cgroup,ro=true \
      -e API_KEY=<YOUR_DATADOG_API_KEY> \
      -e SD_BACKEND=docker \
      gcr.io/datadoghq/docker-dd-agent:latest

En cualquier otro caso, consulta la documentación sobre docker-dd-agent para obtener instrucciones detalladas y una lista completa de las [variables de entorno][6] compatibles.

**Si quieres que el Agent encuentre automáticamente checks basados en JMX**:

1. Utiliza la imagen `gcr.io/datadoghq/docker-dd-agent:latest-jmx`. Esta imagen está basada en `latest`, pero incluye una JVM, que el Agent necesita para ejecutar [jmxfetch][7].
2. Pasa la variable de entorno `SD_JMX_ENABLE=yes` al iniciar `gcr.io/datadoghq/docker-dd-agent:latest-jmx`.

## Plantillas de checks

Cada una de las siguientes secciones de **Fuente de plantillas** muestra una manera diferente de configurar las plantillas de checks y sus identificadores de contenedor.

### Archivos (configuración automática)

Para almacenar plantillas como archivos locales, no es necesario un servicio externo ni una plataforma de orquestación específica. El inconveniente es que debes reiniciar los contenedores de tu Agent cada vez que cambies, añadas o elimines alguna plantilla.

El Agent busca plantillas de Autodiscovery en su directorio `conf.d/auto_conf`, que contiene plantillas predeterminadas para los siguientes checks:

- [Apache][8]
- [Consul][9]
- [CouchDB][10]
- [Couchbase][11]
- [Elasticsearch][12]
- [etcd][13]
- [Kubernetes_state][14]
- [Kube_dns][15]
- [Kyototycoon][16]
- [Memcached][17]
- [Redis][18]
- [Riak][19]

Estas plantillas pueden resultar muy útiles en algunos casos básicos, pero tendrás que redactar tus propios archivos de configuración automática si necesitas utilizar configuraciones personalizadas del check del Agent. Por ejemplo, si quieres activar opciones de checks adicionales, utilizar identificadores de contenedor diferentes o utilizar la [indexación de variables de plantilla](#supported-template-variables), puedes hacerlo de varias maneras:

1. Añádelos a cada host que ejecute docker-dd-agent e [integra el directorio que los contiene][20] en el contenedor docker-dd-agent al iniciarlo
2. Añade tus plantillas personalizadas en `/etc/dd-agent/conf.d/auto_conf` para crear tu propia imagen de Docker basada en docker-dd-agent
3. En Kubernetes, utiliza ConfigMaps para añadirlos

### Check de Apache

Aquí está la plantilla `apache.yaml` que viene incluida con docker-dd-agent:

```yaml
docker_images:
  - httpd

init_config:

instances:
  - apache_status_url: http://%%host%%/server-status?auto
```

Puede parecer una [configuración del check de Apache][21] ínfima, pero fíjate en la opción `docker_images`. Esta opción obligatoria te permite especificar identificadores de contenedor. Autodiscovery aplica esta plantilla a cualquier contenedor del mismo host que ejecute una imagen `httpd`.

_Cualquier_ imagen `httpd`. Supongamos que tienes un contenedor que ejecuta `library/httpd:latest` y otro que ejecuta `<YOUR_USERNAME>/httpd:v2`. Autodiscovery aplica la plantilla anterior a ambos contenedores. Cuando Autodiscovery carga archivos de configuración automática, no puede distinguir imágenes con nombres idénticos de diferentes fuentes o con diferentes etiquetas, así que **tendrás que introducir nombres cortos para las imágenes de contenedor**. Ejemplo: `httpd` en vez de `library/httpd:latest`.

Si esto resulta demasiado restrictivo (si necesitas aplicar diferentes configuraciones de checks a distintos contenedores que ejecutan la misma imagen), utiliza etiquetas para identificar los contenedores. Etiqueta cada contenedor de forma diferente, y, después, añade las etiquetas a la lista `docker_images` de cualquier archivo de plantilla (sí, en `docker_images` es donde hay que poner _cualquier_ tipo de identificador de contenedor, no solo las imágenes).

### Almacén de valores clave

Autodiscovery puede utilizar Consul, etcd y Zookeeper como fuentes de plantillas. Para utilizar un almacén de valores clave, debes configurarlo en `datadog.conf` o en variables de entorno pasadas al contenedor docker-dd-agent.

#### Configuración en datadog.conf

En el archivo `datadog.conf`, configura las opciones `sd_config_backend`, `sd_backend_host` y `sd_backend_port` con el tipo de almacén de valores clave (`etcd`, `consul` o `zookeeper`, respectivamente), además de la dirección IP y el puerto de tu almacén de valores clave:

```conf
# For now only Docker is supported so you just need to un-comment this line.
service_discovery_backend: docker

# Define which key/value store must be used to look for configuration templates.
# Default is etcd. Consul is also supported.
sd_config_backend: etcd

# Settings for connecting to the backend. These are the default, edit them if you run a different config.
sd_backend_host: 127.0.0.1
sd_backend_port: 4001

# By default, the Agent looks for the configuration templates under the
# `/datadog/check_configs` key in the back-end.
# If you wish otherwise, uncomment this option and modify its value.
# sd_template_dir: /datadog/check_configs

# If you Consul store requires token authentication for service discovery, you can define that token here.
# consul_token: f45cbd0b-5022-samp-le00-4eaa7c1f40f1
```

Si utilizas Consul y el clúster Consul solicita una autenticación, configura `consul_token`.

[Reinicia el Agent][22] para que el cambio de configuración se aplique.

#### Configuración en variables de entorno

Si prefieres utilizar variables de entorno, pasa las mismas opciones al contenedor al iniciarlo:

```shell
docker service create \
  --name dd-agent \
  --mode global \
  --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
  --mount type=bind,source=/proc/,target=/host/proc/,ro=true \
  --mount type=bind,source=/sys/fs/cgroup/,target=/host/sys/fs/cgroup,ro=true \
  -e API_KEY=<YOUR API KEY> \
  -e SD_BACKEND=docker \
  -e SD_CONFIG_BACKEND=etcd \
  -e SD_BACKEND_HOST=127.0.0.1 \
  -e SD_BACKEND_PORT=4001 \
  gcr.io/datadoghq/docker-dd-agent:latest
```

**Nota**: La opción para habilitar Autodiscovery se denomina `service_discovery_backend` en `datadog.conf`, pero como variable de entorno solo es `SD_BACKEND`.

---

Si el almacén de valores clave se ha activado como fuente de plantillas, el Agent busca plantillas con la clave `/datadog/check_configs`. Autodiscovery espera una jerarquía clave-valor como la siguiente:

```text
/datadog/
  check_configs/
    docker_image_1/                 # container identifier, for example, httpd
      - check_names: [<CHECK_NAME>] # for example, apache
      - init_configs: [<INIT_CONFIG>]
      - instances: [<INSTANCE_CONFIG>]
    ...
```

Cada plantilla es una tupla de tres valores: nombre del check, `init_config` e `instances`. La opción `docker_images` de la sección anterior, que proporcionaba identificadores de contenedor al Autodiscovery, no es necesaria en este caso. En los almacenes de valores clave, los identificadores de contenedor figuran como claves de primer nivel en `check_config`. (Además, hay que tener en cuenta que la plantilla basada en archivos de la sección anterior no necesitaba un nombre de check, como sucede en este ejemplo; allí, el Agent deducía el nombre del check a partir del nombre del archivo).

#### Check de Apache

Los siguientes comandos etcd crean una plantilla de checks de Apache equivalente a la del ejemplo de la sección anterior:

```text
etcdctl mkdir /datadog/check_configs/httpd
etcdctl set /datadog/check_configs/httpd/check_names '["apache"]'
etcdctl set /datadog/check_configs/httpd/init_configs '[{}]'
etcdctl set /datadog/check_configs/httpd/instances '[{"apache_status_url": "http://%%host%%/server-status?auto"}]'
```

Ten en cuenta que cada uno de los tres valores constituye una lista. Autodiscovery agrupa los elementos de la lista en configuraciones de checks basadas en índices de lista compartidos. En este caso, conforma la primera (y única) configuración de checks a partir de `check_names[0]`, `init_configs[0]` y `instances[0]`.

A diferencia de los archivos de configuración automática, **los almacenes de valores clave pueden utilizar el nombre corto o largo de la imagen como identificadores de contenedor**. Ejemplo: `httpd` o `library/httpd:latest`. En el siguiente ejemplo, se utiliza un nombre largo.

#### Check de Apache con monitorización de la disponibilidad del sitio web

Los siguientes comandos etcd crean la misma plantilla Apache y añaden una plantilla de [check HTTP][23] para monitorizar si el sitio web creado por el contenedor Apache está disponible:

```text
etcdctl set /datadog/check_configs/library/httpd:latest/check_names '["apache", "http_check"]'
etcdctl set /datadog/check_configs/library/httpd:latest/init_configs '[{}, {}]'
etcdctl set /datadog/check_configs/library/httpd:latest/instances '[{"apache_status_url": "http://%%host%%/server-status?auto"},{"name": "My service", "url": "http://%%host%%", timeout: 1}]'
```

De nuevo, el orden de cada lista es importante. El Agent solo puede generar la configuración de checks HTTP correctamente si todas las partes de su configuración tienen el mismo índice en las tres listas (y lo tienen: el índice es 1).

### Anotaciones de pod de Kubernetes

A partir de la versión 5.12 del Datadog Agent, es posible almacenar plantillas de checks en anotaciones de pod de Kubernetes. Si Autodiscovery está habilitado, el Agent detecta si se está ejecutando en Kubernetes y, en caso afirmativo, busca automáticamente plantillas de checks en todas las anotaciones de pod; no es necesario configurar Kubernetes como fuente de plantillas con `SD_CONFIG_BACKEND`, como ocurre con los almacenes de valores clave.

Autodiscovery espera que las anotaciones tengan el siguiente aspecto:

```text
annotations:
  service-discovery.datadoghq.com/<container identifier>.check_names: '[<CHECK_NAME>]'
  service-discovery.datadoghq.com/<container identifier>.init_configs: '[<INIT_CONFIG>]'
  service-discovery.datadoghq.com/<container identifier>.instances: '[<INSTANCE_CONFIG>]'
```

El formato es parecido al de los almacenes de valores clave. Estas son las diferencias:

* Las anotaciones deben comenzar por `service-discovery.datadoghq.com/` (en los almacenes de valores clave, el indicador de inicio es `/datadog/check_configs/`).
* En el caso de las anotaciones, Autodiscovery identifica los contenedores por el _nombre_, no por la imagen (como hace con los archivos de configuración automática y los almacenes de valores clave). Es decir, busca coincidencias entre `<container identifier>` y `.spec.containers[0].name`, no con `.spec.containers[0].image`.

Si vas a definir tus pods de Kubernetes directamente (`kind: Pod`), añade las anotaciones de cada pod en su sección `metadata` (consulta el primer ejemplo a continuación). Si, por el contrario, eliges definir los pods _indirectamente_ con controladores de replicación, conjuntos de réplicas o despliegues, añade las anotaciones de pod en la sección `.spec.templates.metadata` (consulta el segundo ejemplo a continuación).

#### Check de Apache con monitorización de la disponibilidad del sitio web

La siguiente anotación de pod define dos plantillas (equivalentes a las del final de la sección anterior) para contenedores `apache`:

```yaml
apiVersion: v1
metadata:
  name: apache
  annotations:
    service-discovery.datadoghq.com/apache.check_names: '["apache","http_check"]'
    service-discovery.datadoghq.com/apache.init_configs: '[{},{}]'
    service-discovery.datadoghq.com/apache.instances: '[{"apache_status_url": "http://%%host%%/server-status?auto"},{"name": "My service", "url": "http://%%host%%", timeout: 1}]'
  labels:
    name: apache
spec:
  containers:
    - name: apache # use this as the container identifier in your annotations
      image: httpd # NOT this
      ports:
        - containerPort: 80
```

#### Checks de Apache y HTTP

Si vas a definir los pods con despliegues, no añadas anotaciones de plantilla a los metadatos del despliegue, ya que el Agent no los consulta. Añádelas así:

```yaml
apiVersion: apps/v1beta1
metadata: # Don't add templates here
  name: apache-deployment
spec:
  replicas: 2
  template:
    metadata:
      labels:
        name: apache
      annotations:
        service-discovery.datadoghq.com/apache.check_names: '["apache","http_check"]'
        service-discovery.datadoghq.com/apache.init_configs: '[{},{}]'
        service-discovery.datadoghq.com/apache.instances: '[{"apache_status_url": "http://%%host%%/server-status?auto"},{"name": "My service", "url": "http://%%host%%", timeout: 1}]'
    spec:
      containers:
      - name: apache # use this as the container identifier in your annotations
        image: httpd # NOT this
        ports:
        - containerPort: 80
```

### Anotaciones en las etiquetas de Docker

A partir de la versión 5.17 del Datadog Agent, es posible almacenar plantillas de checks en las etiquetas de Docker. Si Autodiscovery está habilitado, el Agent detecta si se está ejecutando en Docker y busca automáticamente plantillas de checks en todas las etiquetas; no es necesario configurar una fuente de plantillas con `SD_CONFIG_BACKEND`, como ocurre con los almacenes de valores clave.

Autodiscovery espera que las etiquetas se parezcan a estos ejemplos, según el tipo de archivo:

**Archivo de Docker**

```text
LABEL "com.datadoghq.ad.check_names"='[<CHECK_NAME>]'
LABEL "com.datadoghq.ad.init_configs"='[<INIT_CONFIG>]'
LABEL "com.datadoghq.ad.instances"='[<INSTANCE_CONFIG>]'
```

**docker-compose.yaml**

```text
labels:
  com.datadoghq.ad.check_names: '[<CHECK_NAME>]'
  com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
  com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
```

**comando run de Docker**

```text
-l com.datadoghq.ad.check_names='[<CHECK_NAME>]' -l com.datadoghq.ad.init_configs='[<INIT_CONFIG>]' -l com.datadoghq.ad.instances='[<INSTANCE_CONFIG>]'
```

#### Archivo de Docker NGINX

El siguiente archivo de Docker lanza un contenedor NGINX si se ha activado Autodiscovery:

```text
FROM nginx

EXPOSE 8080
COPY nginx.conf /etc/nginx/nginx.conf
LABEL "com.datadoghq.ad.check_names"='["nginx"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"nginx_status_url": "http://%%host%%:%%port%%/nginx_status"}]'
```

## Referencia

### Variables de plantilla compatibles

El Agent gestiona las siguientes variables de plantilla:

- IP del contenedor: `host`
  - `%%host%%`: detecta automáticamente la red. Devuelve la IP de la red `bridge` si está presente; vuelve a la IP de la última red **clasificada**.
  - `%%host_<NETWORK NAME>%%`: especifica el nombre de red que se utilizará cuando se conecte a varias redes. Por ejemplo, `%%host_bridge%%`, `%%host_swarm%%`, etc. Actúa como `%%host%%` si no se encuentra el nombre de red especificado.

- Puerto del contenedor: `port`
  - `%%port%%`Utiliza el puerto expuesto más alto **ordenado numéricamente y en orden ascendente** (por ejemplo, 8443 para un contenedor que expone los puertos 80, 443 y 8443)
  - `%%port_0%%`: utiliza el primer puerto **clasificado por orden numérico ascendente** (para el mismo contenedor, `%%port_0%%` se refiere al puerto 80 y `%%port_1%%`, al 443).
  - Si tu puerto de destino es constante, Datadog recomienda que lo especifiques directamente, sin usar la variable `port`.

- PID del contenedor: `pid` (Añadido en 5.15.x)
  - `%%pid%%`: obtiene el identificador de proceso del contenedor devuelto por `docker inspect --format '{{.State.Pid}}' <CONTAINER>`

- Nombre del contenedor: `container_name` (Añadido en 5.15.x)
  - `%%container_name%%`: obtiene el nombre del contenedor.

### Etiquetas

Puedes identificar los contenedores por su etiqueta en lugar de por su nombre o imagen. Solo tienes que etiquetar un contenedor `com.datadoghq.sd.check.id: <SOME_LABEL>` y, luego, poner `<SOME_LABEL>` en el lugar en el que normalmente pondrías un nombre de contenedor o imagen. Por ejemplo, si etiquetas un contenedor `com.datadoghq.sd.check.id: special-container`, Autodiscovery aplica a ese contenedor cualquier plantilla de configuración automática que contenga `special-container` en su lista de `docker_images`.

Autodiscovery solo puede identificar un contenedor por etiqueta o imagen/nombre (no ambos), y las etiquetas tienen prioridad. Si un contenedor tiene una etiqueta `com.datadoghq.sd.check.id: special-nginx` y ejecuta la imagen `nginx`, el Agent NO utilizará plantillas que incluyan solo `nginx` como identificador de contenedor.

### Prioridad de la fuente de plantillas

Si se proporciona una plantilla para el mismo tipo de check mediante varias fuentes de plantillas, el Agent buscará las plantillas en el siguiente orden (y utilizará la primera que encuentre):

* Anotaciones de Kubernetes
* Almacenes de valores clave
* Archivos

Por tanto, si configuras una plantilla `redisdb` tanto en Consul como en un archivo (`conf.d/auto_conf/redisdb.yaml`), el Agent utilizará la plantilla de Consul.

## Solucionar problemas

Si tienes dudas sobre si Autodiscovery está cargando algunos checks que has configurado, utiliza el comando de script `configcheck` de inicio del Agent. Por ejemplo, para confirmar que la plantilla Redis se carga desde una anotación de Kubernetes y no desde el archivo `auto_conf/redisdb.yaml` predeterminado, utiliza:

```text
# docker exec -it <AGENT_CONTAINER_NAME> /etc/init.d/datadog-agent configcheck
.
..
...
Check "redisdb":
  source --> Kubernetes Pod Annotation
  config --> {'instances': [{u'host': u'10.244.1.32', u'port': u'6379', 'tags': [u'image_name:kubernetes/redis-slave', u'kube_namespace:guestbook', u'app:redis', u'role:slave', u'docker_image:kubernetes/redis-slave:v2', u'image_tag:v2', u'kube_replication_controller:redis-slave']}], 'init_config': {}}
```

Si quieres comprobar si Autodiscovery está cargando checks basados en JMX, utiliza:

```text
# docker exec -it <AGENT_CONTAINER_NAME> cat /opt/datadog-agent/run/jmx_status.yaml
timestamp: 1499296559130
checks:
  failed_checks: {}
  initialized_checks:
    SD-jmx_0:
    - {message: null, service_check_count: 0, status: OK, metric_count: 13, instance_name: SD-jmx_0-10.244.2.45-9010}
```

[1]: https://www.datadoghq.com/docker-adoption
[2]: https://github.com/DataDog/integrations-core/blob/master/go_expvar/datadog_checks/go_expvar/data/conf.yaml.example
[3]: https://gcr.io/datadoghq/docker-dd-agent
[4]: /es/agent/kubernetes/
[5]: /es/integrations/amazon_ecs/#installation
[6]: https://github.com/DataDog/docker-dd-agent#environment-variables
[7]: https://github.com/DataDog/jmxfetch
[8]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/auto_conf.yaml
[9]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/auto_conf.yaml
[10]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/auto_conf.yaml
[11]: https://github.com/DataDog/integrations-core/blob/master/couchbase/datadog_checks/couchbase/data/auto_conf.yaml
[12]: https://github.com/DataDog/integrations-core/blob/master/elastic/datadog_checks/elastic/data/auto_conf.yaml
[13]: https://github.com/DataDog/integrations-core/blob/master/etcd/datadog_checks/etcd/data/auto_conf.yaml
[14]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/auto_conf.yaml
[15]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/data/auto_conf.yaml
[16]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/auto_conf.yaml
[17]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/auto_conf.yaml
[18]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[19]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/auto_conf.yaml
[20]: https://github.com/DataDog/docker-dd-agent#configuration-files
[21]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[22]: /es/agent/configuration/agent-commands/#start-stop-restart-the-agent
[23]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example