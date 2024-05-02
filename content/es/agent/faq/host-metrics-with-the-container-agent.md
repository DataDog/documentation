---
aliases:
- /es/agent/faq/getting-further-with-docker/
further_reading:
- link: /agent/docker/
  tag: Documentación
  text: Obtén más información sobre el Agent Docker de Datadog
kind: faq
title: Métricas de host con el Agent de contenedor
---

## Check del disco

El [check del disco][1] envía métricas del host con el Agent de contenedor para cualquier almacenamiento montado en el host y expuesto al contenedor como un volumen. No se necesita ninguna configuración adicional.

### Métricas para particiones

Puesto que el almacenamiento de Linux se basa en capas (dispositivos de bloque, volúmenes lógicos y particiones), es necesario tener una partición montada para poder notificar el espacio libre.

El Agent de contenedor informa las métricas y tasas de disco para cada partición que sea total o parcialmente accesible. Cgroups y Docker aplican esta separación. Para permitir que se informe el uso del disco en una partición, este tiene que estar expuesto a través de un volumen de Docker con la ejecución `-v` argument to `docker run`. Están disponibles las siguientes opciones:

* Crea un archivo de prueba en el sistema de archivos para controlar y mostrarlo por Docker. El Agent no puede acceder a ningún otro archivo en esta partición.
    ```
    -v /mnt/loop/dummyfile:/host/loop0:ro
    ```

* Muestra el punto de montado en su totalidad como de solo lectura. El Agent puede acceder a la jerarquía de las carpetas y a los archivos de lectura mundial.
    ```
    -v /mnt/loop:/host/loop0:ro
    ```

* Si la ruta de montado no se conoce (volúmenes montados dinámicamente), pero el directorio principal es constante, muestra la carpeta principal. El Agent podrá acceder a todos los volúmenes montados en las carpetas secundarias.
    ```
    -v /mnt/:/host/mnt:ro
    ```

### Solucionar problemas

#### Métricas de disco faltantes

Si has personalizado una imagen de Docker o montas un directorio personalizado en la carpeta `conf.d` del Agent, elige una de las siguientes opciones para el check de disco:

* Asegúrate de que `conf.yaml` está presente por defecto.
* Activa una `conf.yaml` personalizada.
* Desactiva el check.

#### Errores de permiso denegado

Quizás veas errores de permiso denegado con el Agent en contenedores cuando estás recopilando métricas de disco desde algunos puntos de montado virtuales. Esto ocurre normalmente cuando el sistema total de archivos de raíz del host está expuesto al contenedor. El Agent encuentra los puntos de montado `shm` o `netns`, los cuales no pueden generar métricas.

Este es un ejemplo de un log asociado informado por el Agent:

```bash
10:12:52 PST | WARN | (datadog_agent.go:149 in LogMessage) | (disk.py:114) | Unable to get disk metrics for /run/docker/netns/9ec58235910c: [Errno 13] Permission denied: '/run/docker/netns/9ec58235910c'
```

Idealmente, solo deberías mostrar rutas útiles al contenedor del Agent. Si es necesario, impide que el Agent notifique esos logs mediante la actualización de la `conf.yaml` del check del disco para excluir los sistemas de archivos correspondientes usando uno de los parámetros a continuación:

* `file_system_exclude` para Agent v6.24.0+ y v7.24.0+
* `file_system_blacklist` para Agent v6.8.0 - v6.23.1/v7.23.1
* `excluded_filesystems` para versiones del Agent anteriores

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/disk/