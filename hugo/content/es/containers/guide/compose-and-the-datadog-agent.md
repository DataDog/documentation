---
aliases:
- /es/integrations/faq/compose-and-the-datadog-agent
- /es/agent/guide/compose-and-the-datadog-agent
further_reading:
- link: https://github.com/DataDog/docker-compose-example
  tag: Código fuente
  text: Ejemplo de uso de Docker Compose con Datadog
- link: /agent/docker/
  tag: Documentación
  text: Documentación sobre el Datadog Docker Agent
- link: /agent/docker/log/
  tag: Documentación
  text: Documentación sobre la recopilación de logs de Datadog Docker
title: Compose y el Datadog Agent
---

[Compose][1] es una herramienta de Docker que simplifica el desarrollo de aplicaciones en Docker, ya que permite definir, crear y ejecutar varios contenedores como una sola aplicación.

Aunque las [instrucciones de instalación de un solo contenedor][2] permiten ejecutar el contenedor del Datadog Agent, es posible que quieras habilitar integraciones para otros servicios contenedorizados que formen parte de tu aplicación de Compose. Para ello, deberás combinar los archivos YAML de integración con la imagen base del Datadog Agent para crear tu contenedor del Datadog Agent. Una vez hecho esto, añade el contenedor al YAML de Compose.

### Ejemplo de Redis

El siguiente es un ejemplo de cómo puedes monitorizar un contenedor de Redis usando Compose. La estructura del archivo es:

```text
|- docker-compose.yml
|- datadog
  |- Dockerfile
  |- conf.d
    |-redisdb.yaml
```

El archivo `docker-compose.yml` describe cómo funcionan los contenedores en conjunto y establece algunos detalles de la configuración para los contenedores.

```yaml
version: '3'
services:
  redis:
    image: redis
  datadog:
    build: datadog
    pid: host
    environment:
     - DD_API_KEY=${DD_API_KEY}
     - DD_SITE={{< region-param key="dd_site" >}}
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock
     - /proc/:/host/proc/:ro
     - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
```

El `redisdb.yaml` sigue el modelo del [archivo redisdb.yaml.example][3] e indica al Datadog Agent que busque Redis en el host llamado `redis` (definido en `docker-compose.yaml`, arriba) y que use el puerto Redis estándar:

```yaml
init_config:

instances:
    - host: redis
      port: 6379
```

El `Dockerfile` se usa para indicar a Docker Compose que genere una imagen del Datadog Agent que incluya el archivo `redisdb.yaml` en la localización adecuada:

```
FROM gcr.io/datadoghq/agent:latest
ADD conf.d/redisdb.yaml /etc/datadog-agent/conf.d/redisdb.yaml
```

### Recopilación de trazas de APM

Basándote en el ejemplo de Redis anterior, también puedes utilizar Compose para configurar el Datadog Agent para recopilar trazas (traces) de aplicación. Este `docker-compose.yml` está extraído de [este Docker de ejemplo de compose en GitHub][4].

```yaml
version: "4"
services:
  web:
    build: web
    command: ddtrace-run python app.py
    ports:
     - "5000:5000"
    volumes:
     - ./web:/code # modified here to take into account the new app path
    links:
     - redis
    environment:
     - DATADOG_HOST=datadog # used by the web app to initialize the Datadog library
     - DD_AGENT_HOST=dd-agent # points to dd-agent to send traces
  redis:
    image: redis
  # agent section
  datadog:
    container_name: dd-agent
    build: datadog
    links:
     - redis # ensures that redis is a host that the container can find
     - web # ensures that the web app can send metrics
    environment:
     - DD_API_KEY=<YOUR_API_KEY>
     - DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true # enables agent to receive custom metrics from other containers
     - DD_APM_ENABLED=true # enables tracing
     - DD_APM_NON_LOCAL_TRAFFIC=true # enables agent to receive traces from other containers
     - DD_AGENT_HOST=dd-agent # allows web container to forward traces to agent
     - DD_SITE=datadoghq.com # determines datadog instance to send data to (e.g change to datadoghq.eu for EU1)
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock
     - /proc/:/host/proc/:ro
     - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
```

Sustituye `<YOUR_API_KEY>` por tu clave de API.

Los principales cambios en el ejemplo anterior son la configuración de la variable de entorno `DD_AGENT_HOST`, que debe ser la misma para tu contenedor `web` y tu contenedor del Agent para recopilar trazas. `DD_APM_ENABLED` habilita APM y `DD_APM_NON_LOCAL_TRAFFIC` permite al Agent recibir trazas de otros contenedores.

Este ejemplo también añade la librería `ddtrace` al `requirements.txt` para la aplicación web de Python de modo que puedas inicializarla con `ddtrace-run` para habilitar APM. (La librería `datadog` mencionada en la siguiente lista se utiliza para recopilar métricas de DogStatsD personalizadas).
```
flask
redis
datadog
ddtrace <--
```

Por último, establece las etiquetas `service`, `env` y `version` para tu aplicación modificando el `Dockerfile` de la aplicación web como se indica a continuación:

```dockerfile
FROM python:2.7
ADD . /code
WORKDIR /code
RUN pip install -r requirements.txt

# This is where you set DD tags
ENV DD_SERVICE web        <-- This sets the "service" name in Datadog
ENV DD_ENV sandbox        <-- This sets the "env" name in Datadog
ENV DD_VERSION 1.0        <-- This sets the "version" number in Datadog
```

### Recopilación de logs

El archivo `docker-compose.yml` se puede ampliar para permitir al Datadog Agent recopilar logs del contenedor.

```yaml
version: '3'
services:
  redis:
    image: redis
    labels:
      com.datadoghq.ad.logs: '[{"source": "redis", "service": "redis"}]'
  datadog:
    build: datadog
    pid: host
    environment:
     - DD_API_KEY=${DD_API_KEY}
     - DD_SITE={{< region-param key="dd_site" >}}
     - DD_LOGS_ENABLED=true
    volumes:
     - /var/run/docker.sock:/var/run/docker.sock
     - /proc/:/host/proc/:ro
     - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
     - /var/lib/docker/containers:/var/lib/docker/containers:ro
```

**Nota**: Esta configuración recopila sólo logs del contenedor de `Redis`. Puedes recopilar logs de Datadog Agent añadiendo una etiqueta `com.datadoghq.ad.logs` similar. También puedes activar explícitamente la recopilación de logs para todos los contenedores estableciendo la variable de entorno `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` en `true`. Consulta [recopilación de logs de Docker][5] para obtener más detalles.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.docker.com/compose/overview
[2]: /es/agent/docker/
[3]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[4]: https://github.com/DataDog/docker-compose-example
[5]: /es/agent/logs/
