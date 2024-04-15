---
aliases:
- /es/agent/faq/kubernetes-docker-socket-log-collection
further_reading:
- link: /agent/autodiscovery/
  tag: documentación
  text: Autodiscovery del Docker Agent
- link: /agent/kubernetes/host_setup/
  tag: documentación
  text: Configuración del host de Kubernetes
- link: /agent/kubernetes/integrations/
  tag: documentación
  text: Integraciones personalizadas

title: Recopilación de logs con el socket de Docker
---

El Agent tiene dos formas de recopilar logs: desde el socket de Docker y desde los archivos de logs de Kubernetes (gestionados automáticamente por Kubernetes). Utiliza la recopilación de archivos de logs cuando:

* Docker no sea el tiempo de ejecución, **o**
* se usen más de 10 contenedores en cada nodo.

La API de Docker está optimizada para obtener los logs de un contenedor de cada vez. Cuando hay muchos contenedores en el mismo nodo, la recopilación de logs a través del socket de Docker puede consumir muchos más recursos que recorrer los archivos:

{{< tabs >}}
{{% tab "DaemonSet" %}}

Monta el socket de Docker en el Datadog Agent:

```yaml
  # (...)
    env:
      - {name: "DD_CRI_SOCKET_PATH", value: "/host/var/run/docker.sock"}
      - {name: "DOCKER_HOST", value: "unix:///host/var/run/docker.sock"}
  # (...)
    volumeMounts:
    #  (...)
      - name: dockersocketdir
        mountPath: /host/var/run
  # (...)
  volumes:
    # (...)
    - hostPath:
        path: /var/run
      name: dockersocketdir
  # (...)
```

**Nota**: Montar solo el socket `docker.sock` en lugar del directorio completo que lo contiene impedirá que el Agent se recupere tras reiniciar el daemon de Docker.

{{% /tab %}}
{{< /tabs >}}

### Contenedores de corta duración {#short-lived-container-socket}

En un entorno de Docker, el Agent recibe actualizaciones de los contenedores en tiempo real a través de eventos de Docker. El Agent extrae y actualiza la configuración de las etiquetas de contenedores (Autodiscovery) una vez por segundo.
A partir de la versión 6.14, el Agent recopila logs de todos los contenedores (tanto en ejecución como detenidos). Esto significa que los logs de contenedores de corta duración que se iniciaran y detuvieran en el último segundo se seguirán recopilando, salvo que se eliminen.
