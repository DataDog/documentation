---
title: Guía para la resolución de problemas de recopilación de logs de Docker
---

Hay una serie de problemas comunes que pueden surgir al enviar nuevos logs de contenedor a Datadog con el contenedor del Agent o con un host del Agent instalado localmente. Si tienes problemas al enviar nuevos logs a Datadog, esta guía te ayudará a solucionarlos. Si sigues teniendo problemas, [ponte en contacto con nuestro equipo de asistencia][1] para obtener más ayuda.

## Comprobar el estado del Agent 

1. Para ver si el Agent de gestión de logs está experimentando algún problema, ejecuta el siguiente comando:

    ```
    docker exec -it <CONTAINER_NAME> agent status
    ```

2. Si todo funciona correctamente, deberías ver algo parecido al siguiente estado:

    ```
    ==========
    Logs Agent
    ==========
        LogsProcessed: 42
        LogsSent: 42

      container_collect_all
      ---------------------
        Type: docker
        Status: OK
        Inputs: 497f0cc8b673397ed31222c0f94128c27a480cb3b2022e71d42a8299039006fb
    ```

3. Si el estado de los logs del Agent no se parece a lo anterior, consulta los consejos para solucionar problemas en las secciones siguientes.

4. Si ves un estado como el del ejemplo anterior y sigues sin recibir logs, consulte la sección [Estado: sin errores](#status-no-errors).

## Agent de logs

### Estado: no funciona

Si aparece el siguiente mensaje al ejecutar el comando de estado del Agent:

```text
==========
Logs Agent
==========

  Logs Agent no se está ejecutando
```

Esto significa que no has activado la gestión de logs en el Agent.

Para activar la gestión de logs en el Agent de contenedor, configura la siguiente variable de entorno: `DD_logs_ENABLED=true`.

### No se han procesado ni enviado logs 

Si el estado del Agent de logs no muestra integraciones y ves `LogsProcessed: 0 and LogsSent: 0`:

```text
==========
Logs Agent
==========
    Logs procesados: 0
    Logs enviados: 0
```

Este estado significa que los logs están habilitados, pero no se ha especificado de qué contenedores debe recopilarlos el Agent.

1. Para comprobar qué variables de entorno has configurado, ejecuta el comando `docker inspect <Agent_CONTAINER>`.

2. Para Configurar el Agent para recopilar de otros contenedores, configura la variable de entorno `DD_logs_CONFIG_CONTAINER_COLLECT_ALL` como `true`.


## Problemas con la recopilación de logs de Docker en archivos

El Agent recopila logs de Docker de los archivos de logs del disco por defecto, en las versiones 6.33.0/7.33.0 o superiores, siempre que los archivos de logs del disco sean accesibles por parte del Agent. Para deshabilitar este comportamiento, puedes configurar `DD_logs_CONFIG_Docker_CONTAINER_USE_FILE` como `false` 

Si no puede acceder a la ruta de los archivos de logs, el Agent realiza el seguimiento de contenedores del socket de Docker. Si el Agent ya ha recopilado logs de un determinado contenedor utilizando el socket de Docker, continuará haciéndolo (incluso después de reiniciar el Agent) para evitar enviar duplicados de logs. Para forzar al Agent a recopilar logs del archivo, configura `DD_logs_CONFIG_Docker_CONTAINER_FORCE_USE_FILE` como `true`. Esta configuración puede hacer que aparezcan duplicados de logs en Datadog.

Cuando se recopilan logs del contenedor de Docker del archivo, el Agent recurre a la recopilación del socket de Docker, si no puede leer del directorio en el que se almacenan los logs del contenedor de Docker (`/var/lib/docker/containers` en Linux). En algunas circunstancias, el Datadog Agent puede fallar a la hora de recopilar logs del archivo. Para diagnosticar este problema, comprueba el estado del Agent de logs y busca una entrada de tipo de archivo que muestre un error similar al siguiente:

```text
    - Type: file
      Identifier: ce0bae54880ad75b7bf320c3d6cac1ef3efda21fc6787775605f4ba8b6efc834
      Path: /var/lib/docker/containers/ce0bae54880ad75b7bf320c3d6cac1ef3efda21fc6787775605f4ba8b6efc834/ce0bae54880ad75b7bf320c3d6cac1ef3efda21fc6787775605f4ba8b6efc834-json.log
      Status: Error: file /var/lib/docker/containers/ce0bae54880ad75b7bf320c3d6cac1ef3efda21fc6787775605f4ba8b6efc834/ce0bae54880ad75b7bf320c3d6cac1ef3efda21fc6787775605f4ba8b6efc834-json.log does not exist
```

Este estado significa que el Agent no puede encontrar un archivo de log para un determinado contenedor. Para resolver este problema, comprueba que la carpeta que contiene logs del contenedor de Docker está correctamente expuesta al contenedor del Datadog Agent. En Linux, esto corresponde a `-v /var/lib/Docker/containers:/var/lib/Docker/containers:ro` 1 en la línea de comandos que inicia el contenedor del Agent, mientras que en Windows corresponde a `-v c:/programdata/Docker/containers:c:/programdata/Docker/containers:ro`. 2 Fíjate que el directorio asociado al host subyacente podría ser diferente debido a la configuración específica del daemon Docker. Esto no representa un inconveniente durante la correcta asignación de volúmenes Docker. Por ejemplo, utiliza `-v /data/Docker/containers:/var/lib/Docker/containers:ro` 3 Si el directorio de datos de Docker se ha reubicado en `/data/Docker` en el subyacente host.

Si se recopilan logs pero las líneas individuales parecen estar divididas, comprueba que el daemon Docker está utilizando el [controlador de gestión de logs JSON](#your-containers-are-not-using-the-json-logging-driver).

**Nota:** Cuando se instala el Agent en el host, el Agent no tiene permiso para acceder a `/var/lib/docker/containers`. Por lo tanto, el Agent recopila logs del socket de Docker cuando se instala en el host. 


### Estado: pendiente


Si el estado del Agent de logs muestra `Status: Pending`:

```text
==========
Logs Agent
==========
    Logs procesados 0
    Logs enviados: 0

  container_collect_all
  ---------------------
    Tipo: docker
    Estado: pendiente
```

Este estado significa que el Agent de logs se está ejecutando pero no ha empezado a recopilar logs de contenedor. Esto puede deberse a varias razones:

#### Daemon de Docker iniciado después del Agent host

Para las versiones del Agent anteriores a la v7.17, si el daemon Docker se inicia mientras el Agent host ya se está ejecutando, reinicia el Agent para reactivar la recopilación de contenedor.

#### Socket de Docker no está montado

Para que el Agent de contenedor pueda recopilar logs de los contenedores Docker, necesita tener acceso al socket de Docker. Si no tiene acceso, aparecen los siguientes logs en `agent.log`:

```text
2019-10-09 14:10:58 UTC | CORE | INFO | (pkg/logs/input/container/launcher.go:51 in NewLauncher) | No se ha podido configurar el lanzador Docker: no se puede conectar al daemon Docker en unix:///var/run/docker.sock. ¿Se está ejecutando el daemon Docker?
2019-10-09 14:10:58 UTC | CORE | INFO | (pkg/logs/input/container/launcher.go:58 in NewLauncher) | No se ha podido configurar el lanzador Kubernetes: /var/log/pods no encontrado
2019-10-09 14:10:58 UTC | CORE | INFO | (pkg/logs/input/container/launcher.go:61 in NewLauncher) | No se recopilarán logs de contenedor
```

Vuelve a iniciar el contenedor del Agent con la siguiente opción: `-v /var/run/docker.sock:/var/run/docker.sock:ro` para permitir el acceso al socket de Docker.

### Estado: sin errores

Si el estado del Agent de logs se parece al ejemplo en [Comprobar el estado del Agent](#check-the-agent-status), pero tus logs siguen sin llegar a la plataforma Datadog, podría haber un problema con alguno de los siguientes elementos:

* El puerto requerido (10516) para enviar logs a Datadog está bloqueado.
* Tu contenedor está utilizando un controlador de gestión de logs diferente del que espera el Agent.

#### El tráfico saliente en el puerto 10516 está bloqueado

El Datadog Agent envía sus logs a Datadog a través de TCP utilizando el puerto 10516. Si esa conexión no está disponible, los logs no se envían y se registra un error en el archivo `agent.log`.

Puedes probar manualmente tu conexión utilizando OpenSSL, GnuTLS u otro cliente SSL/TLS. Para utilizar OpenSSL, ejecuta el siguiente comando:

```shell
openssl s_client -connect intake.logs.datadoghq.com:10516
```

Para utilizar GnuTLS, ejecuta el siguiente comando:

```shell
gnutls-cli intake.logs.datadoghq.com:10516
```

Y luego, enviando un log como el siguiente:

``text
<API_KEY> este es un mensaje de prueba
```

Si abrir el puerto 10516 no es una opción, es posible configurar el Datadog Agent para enviar logs a través de HTTPS, configurando la variable de entorno `DD_logs_CONFIG_USE_HTTP` como `true`:

#### Tus contenedores no están utilizando el controlador de gestión de logs JSON

El controlador de gestión de logs predeterminado de Docker es el json-file, por lo que es lo primero que el Agent de contenedor intenta leer. Si tus contenedores están configurados para utilizar un controlador de gestión de logs diferente, el Agent de logs indica que puede encontrar con éxito tus contenedores, pero no puede recopilar tus logs. El Agent de contenedor también puede configurarse para leer desde el controlador de gestión de logs journald.

1. Si no sabes exactamente qué controlador de gestión de logs están utilizando tus contenedores, utiliza `docker inspect <CONTAINER_NAME>` para ver qué controlador de gestión de logs tienes configurado. El siguiente bloque aparece en Docker Inspect cuando el contenedor utiliza el controlador de gestión de logs JSON:

    ```text
    "LogConfig": {
        "Type": "json-file",
        "Config": {}
    },
    ```

2. Si el contenedor está configurado para el controlador de gestión de logs journald, aparecerá el siguiente bloque en Docker Inspect:

    ```text
    "LogConfig": {
        "Type": "journald",
        "Config": {}
    },
    ```

3. Para recopilar logs del controlador de gestión de logs journald, configura la integración journald [siguiendo la documentación de Datadog-Journald][2].

4. Monta el archivo YAML en tu contenedor siguiendo las instrucciones de la [documentación del Agent Docker][3]. Para obtener más información sobre la configuración de controladores de logs para contenedores Docker, [consulta esta documentación][4].

## El Agent no envía logs desde contenedores que han mantenido un gran volumen de logs (más de 1 GB)

El daemon Docker puede tener problemas de rendimiento mientras intenta recuperar logs para contenedores de los que ya ha almacenado grandes archivos de logs en el disco. Esto podría generar tiempos de espera de lectura cuando el Datadog Agent está recopilando logs de contenedores del daemon Docker. 

Cuando esto ocurre, el Datadog Agent emite un log que contiene `Restarting reader after a read timeout` para un contenedor dado, cada 30 segundos, y deja de enviar logs desde ese contenedor mientras registra mensajes.

El tiempo de espera de lectura por defecto está configurado en 30 segundos. El aumento de este valor da más tiempo al daemon Docker para responder al Datadog Agent. Este valor puede ser configurado en `datadog.yaml`, utilizando el parámetro `logs_config.docker_client_read_timeout` o la variable de entorno `DD_logs_CONFIG_Docker_CLIENT_READ_TIMEOUT`. Este valor tiene una duración en segundos. A continuación, consulta un ejemplo de aumento de este valor a 60 segundos:

```yaml
logs_config:
  docker_client_read_timeout: 60
```

## Agent de host
### Usuario del Agent en el grupo Docker 

Si estás utilizando el Agent host, el usuario `dd-agent` necesita ser añadido al grupo Docker para tener permiso para leer el socket de Docker. Si ves los siguientes logs con errores en el archivo `agent.log`:

```text
2019-10-11 09:17:56 UTC | CORE | INFO | (pkg/autodiscovery/autoconfig.go:360 in initListenerCandidates) | docker listener cannot start, will retry: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied

2019-10-11 09:17:56 UTC | CORE | ERROR | (pkg/autodiscovery/config_poller.go:123 in collect) | Unable to collect configurations from provider docker: temporary failure in dockerutil, will retry later: could not determine docker server API version: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Get http://%2Fvar%2Frun%2Fdocker.sock/version: dial unix /var/run/docker.sock: connect: permission denied
```

Para añadir el Agent host al grupo de usuarios Docker, ejecuta el siguiente comando: `usermod -a -G docker dd-agent`.

[1]: /es/help/
[2]: /es/integrations/journald/#setup
[3]: /es/agent/docker/?tab=standard#mounting-conf-d
[4]: https://docs.docker.com/config/containers/logging/journald/