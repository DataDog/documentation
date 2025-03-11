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

**Nota**: La configuración anterior solo recopila logs del contenedor `Redis`. Los logs se pueden recopilar desde el Datadog Agent añadiendo una etiqueta `com.datadoghq.ad.logs` similar. La recopilación de logs también se puede habilitar expresamente para todos los contenedores configurando la variable de entorno `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` como `true`. Encontrarás más información en la [documentación completa sobre la recopilación de logs de Docker][4].


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.docker.com/compose/overview
[2]: /es/agent/docker/
[3]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[4]: /es/agent/logs/