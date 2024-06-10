---
aliases:
- /es/agent/docker/data_collected
kind: documentación
title: Datos recopilados de Docker
---

## Integración de Docker

### Métricas

Métricas recopiladas por el Agent cuando se despliega en un contenedor de Docker:

{{< get-metrics-from-git "docker_daemon" >}}

### Eventos

El Docker Agent produce los siguientes eventos:

- Eliminar imagen
- Expirar
- Error
- Fallo
- Terminar
- Sin memoria (oom)
- Pausa
- Reiniciar el contenedor
- Reiniciar el Daemon
- Actualización

### Checks de los servicios

{{< get-service-checks-from-git "docker" >}}

**Nota**: Para usar `docker.exit`, añade `collect_exit_codes: true` a tu archivo Docker `conf.yaml` y reinicia el Agent.

## Integración del contenedor

### Métricas
{{< get-metrics-from-git "container" >}}

## Integración de containerd

### Métricas

{{< get-metrics-from-git "containerd" >}}

### Events (Eventos)

El check de containerd puede recopilar eventos. Usa `filters` para seleccionar los eventos correspondientes. Consulta el ejemplo [`containerd.d/conf.yaml`][1] para obtener más información.

### Checks de servicios

{{< get-service-checks-from-git "containerd" >}}

[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/containerd.d/conf.yaml.default