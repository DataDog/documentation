---
aliases:
- /es/agent/autodiscovery/troubleshooting
further_reading:
- link: /agent/troubleshooting/
  tag: Documentación
  text: Solucionar problemas del Agent
- link: /agent/troubleshooting/debug_mode/
  tag: Documentación
  text: Modo de depuración del Agent
- link: /agent/troubleshooting/send_a_flare/
  tag: Documentación
  text: Enviar un flare del Agent
title: Solucionar problemas de Autodiscovery
---

Para comenzar a solucionar problemas en el Autodiscovery del Docker Agent, ejecuta el comando del script de inicialización `configcheck`:

```shell
docker exec -it <AGENT_CONTAINER_NAME> agent configcheck -v
```

**Nota**: La opción `-v` te permite ver todas las plantillas, incluso las que están sin resolver.

El siguiente ejemplo muestra una configuración de Autodiscovery válida para una plantilla de Redis que se carga desde la anotación de una etiqueta de Docker en vez del archivo predeterminado `redisdb.d/auto_conf.yaml`:

```text
# docker exec -it <AGENT_CONTAINER_NAME> agent configcheck -v
.
..
...
=== Provider: Docker container labels ===

--- redisdb check ---
Instance 1:
host: 172.17.0.3
port: "6379"
tags:
- short_image:redis
- image_tag:latest
- docker_image:redis:latest
- image_name:redis
~
Auto-discovery IDs:
* docker://81e66fd4c948a502b4428417d8cf2ebc58caaff55a6e5879a41887057342aec2
```

Los siguientes ejemplos muestran los problemas que pueden surgir si no se consigue cargar una configuración de Autodiscovery válida para una plantilla de Redis:

```text
# docker exec -it <AGENT_CONTAINER_NAME> agent configcheck -v
.
..
...
=== Resolve warnings ===

redisdb
* No service found with this AD identifier: redis
* Can't resolve the template for redisdb at this moment.

=== Unresolved Configs ===

Auto-discovery IDs: redis
Template:
init_config:
instances:
- host: '%%host%%'
  port: '%%port%%'
```

Si todavía no te ha quedado claro cuál es el problema, ponte en contacto con el [equipo de asistencia de Datadog][1] enviando [un flare][2] desde el Agent.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: /es/agent/troubleshooting/send_a_flare/