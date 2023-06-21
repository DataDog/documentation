---
kind: documentación
title: Utilizar la integración de Docker con la herramienta de gestión de contenedores
  Podman
---

Podman es un motor de contenedores sin daemon que permite desarrollar, gestionar y ejecutar contenedores OCI en tu sistema Linux. Obtén más información en [https://podman.io/][1].

Podman es una alternativa a Docker ya que proporciona una interfaz CLI y un socket compatibles con Docker. Esta particularidad te permite utilizar la integración del Datadog Docker Agent con contenedores Podman.

## Requisitos

* Podman 3.2.0 o versiones posteriores
* Podman debe estar configurado para exponer su [socket de comunicación][2].
* Datadog Agent 7.30.0 o versiones posteriores

## Implementación del Agent como contenedor Podman

Para implementar el Agent como contenedor Podman, el comando que se debe ejecutar es parecido al que se utiliza para [Docker][3].

```
$ podman run -d --name dd-agent \
    -v /run/podman/podman.sock:/run/podman/podman.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY=<API_KEY> \
    -e DOCKER_HOST=unix:///run/podman/podman.sock \
    --privileged \
    gcr.io/datadoghq/agent:latest
```

Las dos diferencias más importantes son:
* `-v /run/podman/podman.sock:/run/podman/podman.sock:ro` para instalar el socket de Podman en lugar del socket de Docker.
* `-e DOCKER_HOST=unix:///run/podman/podman.sock` para configurar la comunicación del Agent con el socket de Podman.

Si se ejecuta Podman en modo sin daemon, en lugar de las opciones anteriores, se deberá instalar el directorio donde esté la base de datos de Podman, que, de forma predeterminada, se encuentra en `/var/lib/containers`:
* `-v /var/lib/containers/:/var/lib/containers/`.

## Limitaciones conocidas

* La activación del socket de Podman puede ser opcional dependiendo de tu configuración. Es posible que necesites activarlo.


[1]: https://podman.io/
[2]: https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/building_running_and_managing_containers/index
[3]: /es/agent/docker