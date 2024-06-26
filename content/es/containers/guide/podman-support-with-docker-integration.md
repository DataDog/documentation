---
aliases:
- /es/agent/guide/podman-support-with-docker-integration
kind: documentation
title: Utilizar la integración de Docker con la herramienta de gestión de contenedores
  Podman
---

Podman es un motor de contenedores sin daemon que permite desarrollar, gestionar y ejecutar contenedores OCI en tu sistema Linux. Obtén más información en [https://podman.io/][1].

Con Podman, podemos desplegar contenedores con y sin raíz. Los contenedores sin raíz pueden ser ejecutados por usuarios que no tienen derechos de administrador, mientras que los contenedores con raíz son los que se ejecutan como raíz.
La principal ventaja que ofrecen los contenedores sin raíz es que los atacantes potenciales no pueden obtener permisos de raíz en el host cuando el contenedor se ve comprometido.
El Datadog Agent funciona en contenedores con y sin raíz.

## Requisitos

* Podman 3.2.0 o versiones posteriores
* Datadog Agent 7.30.0 o versiones posteriores

## Despliegue del Agent como contenedor Podman sin raíz

Para desplegar el Agent como contenedor Podman sin raíz, el comando a ejecutar es similar al utilizado para [Docker][2].

La principal diferencia es que, como el Agent no tiene acceso al socket de ejecución, depende de la base de datos de Podman para extraer la información del contenedor que necesita. Así, en lugar de montar el socket de Docker y configurar `DOCKER_HOST`, necesitamos montar la base de datos de Podman (`<PODMAN_DB_PATH>` en el comando de abajo).
En algunos sistemas, la ruta de la base de datos de Podman es `$HOME/.local/share/containers/storage/libpod/bolt_state.db`, pero puede ser diferente en tu sistema. Configura `<PODMAN_DB_PATH>` en el siguiente comando.

```
$ podman run -d --name dd-agent \
    --cgroupns host --pid host \
    -v <PODMAN_DB_PATH>:/var/lib/containers/storage/libpod/bolt_state.db:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY=<API_KEY> \
    -e DD_HOSTNAME=<DD_HOSTNAME> \
    gcr.io/datadoghq/agent:latest
```

Agent debería detectar todos los contenedores gestionados por el usuario no administrador que ejecutó el comando Podman y emitir métricas `container.*` para todos ellos.

## Despliegue el Agent como contenedor Podman sin raíz

Cuando ejecutamos contenedores con raíz, tenemos dos opciones: podemos confiar en la base de datos de Podman como en el ejemplo anterior en contenedores sin raíz, o podemos usar el socket de Podman.

### Uso de la base de datos de Podman

El comando para ejecutar con la base de datos es idéntico al proporcionado anteriormente, pero ten en cuenta que la ruta de la base de datos es diferente para cada usuario, incluido el usuario raíz. Para el usuario raíz es típicamente `/var/lib/containers/storage/libpod/bolt_state.db`, pero puede ser diferente en tu sistema, así que configura `<PODMAN_DB_PATH>` en consecuencia.

### Uso del socket de Podman

El socket de Podman es compatible con el de Docker. Por eso, en este caso, el Datadog Agent ejecutará todo como si se estuviera ejecutando en Docker. Esto significa que emitirá métricas `docker.*`, por ejemplo.

Para desplegar el Agent confiando en el socket de Podman ejecutado como raíz:
```
$ podman run -d --name dd-agent \
    --cgroupns host --pid host \
    -v /run/podman/podman.sock:/run/podman/podman.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY=<API_KEY> \
    -e DD_HOSTNAME=<DD_HOSTNAME> \
    -e DOCKER_HOST=unix:///run/podman/podman.sock \
    gcr.io/datadoghq/agent:latest
```

En ambos casos, el Agent debe detectar todos los contenedores gestionados por el usuario raíz y emitir métricas `container.*` para todos ellos.

[1]: https://podman.io/
[2]: /es/agent/docker