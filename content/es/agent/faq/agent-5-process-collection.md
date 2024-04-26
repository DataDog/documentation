---
kind: preguntas frecuentes
private: true
title: Recolección de proceso con Agent v5
---

## Configuración de Standard Agent

**Live Processes está disponible en Datadog Agent versión 5.16.0 y superiores.**
Consulta las instrucciones para la [Agent installation (instalación de Agent)][1] para obtener detalles específicos de la plataforma.

**Nota**: Live Processes no está disponible para el método de instalación de origen del Agent.

Una vez instalado Datadog Agent, activa Live Processes editando el [configuration file (archivo configuración)][2] en:

```text
/etc/dd-agent/datadog.conf
```

y añadiendo la siguiente línea a la sección `[Main (principal)]`:

```yaml
    process_agent_enabled: true
```

Una vez completada la configuración, [restart the Agent (reinicia el Agent)][3].
**Nota**: Para recopilar información de Contenedor en la instalación estándar, el usuario de `dd-agent` necesita tener permisos para acceder a `docker.sock`.

## Contenedor Docker

Actualiza a la versión 5.16.0 o superior de la imagen Datadog Agent:

    $ docker pull gcr.io/datadoghq/docker-dd-agent

Sigue las instrucciones para [Docker-dd-Agent][4], introduciendo los siguientes atributos, además de cualquier otro ajuste personalizado que resulte apropiado:

```text
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_AGENT_ENABLED=true
```

## Kubernetes DaemonSet

En el manifiesto [dd-Agent.yaml][5] utilizado para crear el DaemonSet, añade las siguientes variables de entorno, montaje de volumen y volumen:

```yaml
 env:
    - name: DD_PROCESS_AGENT_ENABLED
      value: "true"
  volumeMounts:
    - name: passwd
      mountPath: /etc/passwd
      readOnly: true
  volumes:
    - hostPath:
        path: /etc/passwd
      name: passwd
```

Consulta las páginas de información estándar [DaemonSet installation (instalación de DaemonSet)][6] y [Docker-dd-Agent][4] para obtener más documentación.

[1]: https://app.datadoghq.com/account/settings/agent/5?platform=overview
[2]: /es/agent/faq/where-is-the-configuration-file-for-the-agent/
[3]: /es/agent/configuration/agent-commands/#start-stop-restart-the-agent
[4]: https://github.com/DataDog/docker-dd-agent
[5]: https://github.com/DataDog/docker-dd-agent#configuration-files
[6]: /es/agent/kubernetes/