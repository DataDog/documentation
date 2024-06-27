---
aliases:
- /es/logs/faq/how-to-tail-logs-from-host-using-a-container-agent
further_reading:
- link: /agent/docker/log
  tag: Documentación
  text: Registro con Docker
- link: /agent/docker/log/?tab=containerinstallation
  tag: Documentación
  text: Registro con Kubernetes
- link: https://www.datadoghq.com/blog/docker-logging/
  tag: Blog
  text: Buenas prácticas de registro en Docker
- link: /glossary/#tail
  tag: Glosario
  text: Entrada de glosario para "tail" (cola)
kind: guía
title: Utiliza el agente contenedor para raestrear logs del host
---

<div class="alert alert-info">Datadog recomienda utilizar <b>STDOUT/STDERR</b> para recolectar logs del contenedor.</div>

## Información general

Los pods/contenedores no tienen acceso a los archivos del host por defecto, lo que también se aplica a los agentes. Si intentas configurar tu agente contenedor para que recolecte logs de los archivos del host, aparecerá un mensaje de error similar al que se muestra a continuación:

```
  syslog
  ------
    Type: file
    Path: /var/log/messages
    Status: Error: file /var/log/messages does not exist

```

Para que el agente contenedor tenga acceso a los archivos del host, monta el archivo o el directorio en agente contenedor. Revisa la lista de [configuración de archivos y directorios del agente][1] para saber qué archivo y directorio del host montar según tu sistema operativo.

Aquí hay algunos ejemplos para Kubernetes y Docker:

{{< tabs >}}
{{% tab "Kubernetes" %}}

Para montar los archivos de logs de tu host en el agente contenedor, establece el directorio de logs del host en la sección de volúmenes del manifiesto del agente y el directorio de logs del contenedor en la sección `volumeMounts`:

```
        volumeMounts:
          - name: customlogs
            ## El directorio de logs deseado dentro del agente contenedor:
            mountPath: /container/var/test-dir/logs/

      volumes:
        - name: customlogs
          hostPath:
            ## El directorio en el host que contiene los archivos de logs.
path: /var/test-dir/logs/
```

A continuación, configura el agente para que rastree los archivos para recolectar los logs. Para ello, puedes montar una configuración de logs personalizada en `/conf.d/`. El nombre del archivo puede ser cualquier cosa, siempre que tenga una extensión `.yaml`.

Es preferible utilizar un ConfigMap para almacenar configuraciones en lugar de montar directamente un archivo del host. Aquí tienes un manifiesto ConfigMap de ejemplo que tiene un archivo `logs.yaml`:

```
kind: ConfigMap
apiVersion: v1
metadata:
     name: ddagent-logs-configmap
     namespace: default
data:
     logs.yaml: |-
           logs:
             - type: file
               service: syslog
               source: os
               ## Utiliza el directorio de registro del contenedor que configuraste en el manifiesto del agente.
               path: /container/var/test-dir/logs/*.log
```

Crea el objeto ConfigMap utilizando el comando:

```bash
kubectl create -f <configmap manifest>
```

A continuación, móntalo en `/conf.d/`:

```
        volumeMounts:
          - name: cm-logs
            mountPath: /conf.d/

      volumes:
        - name: cm-logs
          configMap:
            name: ddagent-logs-configmap
```

{{% /tab %}}
{{% tab "Docker" %}}

Para montar el archivo de log del host, añade un parámetro de volumen en el comando  `docker run` del agente:

```
-v /<host log directory>/:<container log directory>/
```

A continuación, crea localmente una configuración personalizada de logs:

```
logs:
  - type: file
    service: syslog
    source: os
    path: <container log path>/*.log
```

y móntala en `/conf.d/`. El nombre del archivo puede ser cualquiera:

```
-v <absolute path>/logs.yaml:/conf.d/logs.yaml
```

Su el comando de instalación de Docker del agente debe tener este aspecto:

```
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           -v /<host log directory>/:<container log directory>/ \
           -v /<config location>/logs.yaml:/conf.d/logs.yaml \
           gcr.io/datadoghq/agent:latest
```
{{% /tab %}}
{{< /tabs >}}

## Verificación

Una vez configurado todo esto, puedes iniciar el agente. Deberías ver algo parecido a lo siguiente cuando lo ejecutes `docker exec -it datadog-agent agent status`:

```
==========
Logs Agent
==========

    Sending compressed logs in HTTPS to agent-http-intake.logs.datadoghq.com on port 443
    BytesSent: 10605
    EncodedBytesSent: 2144
    LogsProcessed: 32
    LogsSent: 31

  logs
  ----
    Type: file
    Path: /container/var/test-dir/logs/*.log
    Status: OK
      1 files tailed out of 1 files matching
    Inputs: /container/var/test-dir/logs/722bfb2cb35cc627-json.log

```

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/configuration/agent-configuration-files/?tab=agentv6v7