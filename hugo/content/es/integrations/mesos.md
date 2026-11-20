---
aliases:
- /es/integrations/mesos_master/
- /es/integrations/mesos_slave/
custom_kind: integración
integration_title: Mesos
is_public: true
short_description: Rastrea el uso de los recursos de clúster, los counts maestro y
  esclavo, los estados de las tareas y mucho más.
---


<!--  CON ORIGEN EN https://github.com/DataDog/integrations-core -->


En este check se recopilan métricas para maestros de Mesos. Para las métricas de esclavos de Mesos, consulta la [integración Mesos Slave][1].

![Dashboard de maestros de Mesos][2]

## Información general

Este check recopila métricas de maestros de Mesos para:

- Recursos del clúster
- Esclavos registrados, activos, inactivos, conectados, desconectados, etc.
- Número de tareas fallidas, finalizadas, preconfiguradas, en ejecución, etc.
- Número de estructuras activas, inactivas, conectadas y desconectadas

Y muchos más.

## Configuración

### Instalación

La instalación es la misma en Mesos con y sin DC/OS. Ejecuta el contenedor del Datadog-Agent en cada uno de sus nodos maestros de Mesos:

```shell
docker run -d --name datadog-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -e DD_API_KEY=<YOUR_DATADOG_API_KEY> \
  -e MESOS_MASTER=true \
  -e MARATHON_URL=http://leader.mesos:8080 \
  datadog/agent:latest
```

Sustituye tu clave de la API de Datadog y la URL de la API de Mesos Master en el comando anterior.

### Configuración

Si pasaste la URL maestra correcta cuando iniciaste el Datadog Agent, el Agent ya está utilizando un `mesos_master.d/conf.yaml` en forma predeterminada para recopilar métricas de tus maestros. Consulta el [ejemplo de mesos_master.d/conf.yaml][3] para ver todas las opciones disponibles de configuración.

A no ser que la API de tus maestros utilice un certificado autofirmado. En ese caso, configura `disable_ssl_validation: true` en `mesos_master.d/conf.yaml`.

#### Recopilación de logs

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

    ```yaml
    logs_enabled: true
    ```

2. Añade este bloque configuración a tu archivo `mesos_master.d/conf.yaml` para empezar a recopilar tus logs de Mesos:

    ```yaml
    logs:
      - type: file
        path: /var/log/mesos/*
        source: mesos
    ```

    Cambia el valor del parámetro `path` en función de tu entorno o utiliza el stdout predefinido de docker:

    ```yaml
    logs:
      - type: docker
        source: mesos
    ```

    Consulta el [ejemplo de mesos_master.d/conf.yaml][3] para todas las opciones disponibles de configuración.

3. [Reinicia el Agent][4].

Para activar logs para entornos de Kubernetes, consulta [Recopilación de logs de Kubernetes][5].

### Validación

En Datadog, busca `mesos.cluster` en el explorador de métricas.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "mesos-master" >}}


### Eventos

El check de Mesos-master no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "mesos-master" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [soporte técnico de Datadog][6].

## Referencias adicionales

- [Instalación de Datadog en Mesos con DC/OS][7]




<!--  CON ORIGEN EN https://github.com/DataDog/integrations-core -->
## Integración de Mesos Slave

![Dashboard de Mesos Slave][8]

## Información general

Este check del Agent recopila métricas de los esclavos de Mesos:

- Carga del sistema
- Número de tareas fallidas, finalizadas, preconfiguradas, en ejecución, etc.
- Número de ejecutores en ejecución, finalizados, etc.

Y muchos más.

Este check también crea un check de servicio para cada tarea de ejecutor.

## Configuración

### Instalación

Consulta [Instalación de Datadog en Mesos con DC/OS][7] para instalar el Datadog Agent en cada nodo del agente de Mesos con la interfaz de usuario web de DC/OS.

### Configuración

#### DC/OS

1. En la interfaz de usuario web de DC/OS, haz clic en la pestaña **Universo**. Busca el paquete de **Datadog** y haz clic en el botón Instalar.
1. Haz clic en el botón **Instalación avanzada**.
1. Introduce tu clave de la API de Datadog en el primer campo.
1. En el campo Instancias, introduce el número de nodos esclavos en tu clúster (Puedes determinar el número de nodos en tu clúster haciendo clic en la pestaña Nodos del lado izquierdo de la interfaz de usuario web de DC/OS).
1. Haz clic en **Revisar e instalar** y luego en **Instalar**.

#### Marathon

Si no utilizas DC/OS, usa la interfaz de usuario web de Marathon o publica en la URL de la API, el siguiente JSON para definir el Datadog Agent. Debes cambiar `<YOUR_DATADOG_API_KEY>` con tu clave de la API y el número de instancias con el número de nodos esclavos en tu clúster. También puedes necesitar actualizar la imagen del docker utilizada a una etiqueta (tag) más reciente. Puedes encontrar la última [en Docker Hub][9]

```json
{
  "id": "/datadog-agent",
  "cmd": null,
  "cpus": 0.05,
  "mem": 256,
  "disk": 0,
  "instances": 1,
  "constraints": [
    ["hostname", "UNIQUE"],
    ["hostname", "GROUP_BY"]
  ],
  "acceptedResourceRoles": ["slave_public", "*"],
  "container": {
    "type": "DOCKER",
    "volumes": [
      {
        "containerPath": "/var/run/docker.sock",
        "hostPath": "/var/run/docker.sock",
        "mode": "RO"
      },
      { "containerPath": "/host/proc", "hostPath": "/proc", "mode": "RO" },
      {
        "containerPath": "/host/sys/fs/cgroup",
        "hostPath": "/sys/fs/cgroup",
        "mode": "RO"
      }
    ],
    "docker": {
      "image": "datadog/agent:latest",
      "network": "BRIDGE",
      "portMappings": [
        {
          "containerPort": 8125,
          "hostPort": 8125,
          "servicePort": 10000,
          "protocol": "udp",
          "labels": {}
        }
      ],
      "privileged": false,
      "parameters": [
        { "key": "name", "value": "datadog-agent" },
        { "key": "env", "value": "DD_API_KEY=<YOUR_DATADOG_API_KEY>" },
        { "key": "env", "value": "MESOS_SLAVE=true" }
      ],
      "forcePullImage": false
    }
  },
  "healthChecks": [
    {
      "protocol": "COMMAND",
      "command": { "value": "/probe.sh" },
      "gracePeriodSeconds": 300,
      "intervalSeconds": 60,
      "timeoutSeconds": 20,
      "maxConsecutiveFailures": 3
    }
  ],
  "portDefinitions": [
    { "port": 10000, "protocol": "tcp", "name": "default", "labels": {} },
    { "port": 10001, "protocol": "tcp", "labels": {} }
  ]
}
```

A menos que desees configurar un `mesos_slave.d/conf.yaml` personalizado, quizás necesites configurar `disable_ssl_validation: true`. no necesitas hacer nada después de instalar el Agent.

#### Recopilación de logs

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

    ```yaml
    logs_enabled: true
    ```

2. Añade este bloque de configuración a tu archivo `mesos_slave.d/conf.yaml` para empezar a recopilar tus logs de Mesos:

    ```yaml
    logs:
      - type: file
        path: /var/log/mesos/*
        source: mesos
    ```

    Cambia el valor del parámetro `path` en función de tu entorno o utiliza el stdout predeterminado de Docker:

    ```yaml
    logs:
      - type: docker
        source: mesos
    ```

    Consulta el [ejemplo de mesos_slave.d/conf.yaml][10] para todas las opciones disponibles de configuración.

3. [Reinicia el Agent][4].

Para activar logs para entornos de Kubernetes, consulta [Recopilación de logs de Kubernetes][5].

### Validación

#### DC/OS

En la pestaña de Servicios en la interfaz de usuario web de DC/OS, debería aparecer el Datadog Agent. En Datadog, busca `mesos.slave` en el explorador de métricas.

#### Marathon

Si no estás utilizando DC/OS, entonces el Datadog-Agent está en el lista de aplicaciones en ejecución con un buen estado. En Datadog, busca `mesos.slave` en el explorador de métricas.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "mesos" >}}


### Eventos

El check de Mesos-slave no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "mesos" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [soporte técnico de Datadog][6].

## Referencias adicionales

- [Instalación de Datadog en Mesos con DC/OS][7]


[1]: https://docs.datadoghq.com/es/integrations/mesos/#mesos-slave-integration
[2]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mesos_master/images/mesos_dashboard.png
[3]: https://github.com/DataDog/integrations-core/blob/master/mesos_master/datadog_checks/mesos_master/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/es/agent/kubernetes/log/
[6]: https://docs.datadoghq.com/es/help/
[7]: https://www.datadoghq.com/blog/deploy-datadog-dcos
[8]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mesos_slave/images/mesos_dashboard.png
[9]: https://hub.docker.com/r/datadog/agent/tags
[10]: https://github.com/DataDog/integrations-core/blob/master/mesos_slave/datadog_checks/mesos_slave/data/conf.yaml.example
