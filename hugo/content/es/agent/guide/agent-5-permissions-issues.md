---
title: Problemas relacionados con permisos en el Agent 5
---

El Agent necesita un conjunto específico de permisos para poder recopilar datos de tu host. A continuación verás los problemas relacionados con permisos más comunes y aprenderás a solucionarlos.

## Problemas relacionados con permisos de generación de logs del Agent

Al ejecutar el Datadog Agent en un determinado host, puedes encontrarte con algunos problemas relacionados con permisos que impedirían al Agent generar logs correctamente, como por ejemplo:

```text
IOError: [Errno 13] Permission denied: '/var/log/datadog/supervisord.log'
```

Asegúrate de que los archivos de logs del Agent y el directorio que los contiene pertenecen al usuario del Datadog Agent : `dd-agent`. Si no es así, el Agent no podrá escribir entradas de logs en esos archivos. A continuación encontrarás el comando que funciona en los sistemas Unix para mostrar la información sobre la propiedad de los archivos:

```text
ls -l /var/log/datadog/

total 52300
-rw-r--r-- 1 dd-agent dd-agent 5742334 Jul 31 11:49 collector.log
-rw-r--r-- 1 dd-agent dd-agent 10485467 Jul 28 02:45 collector.log.1
-rw-r--r-- 1 dd-agent dd-agent 1202067 Jul 31 11:48 dogstatsd.log
-rw-r--r-- 1 dd-agent dd-agent 10485678 Jul 28 07:04 dogstatsd.log.1
-rw-r--r-- 1 dd-agent dd-agent 4680625 Jul 31 11:48 forwarder.log
-rw-r--r-- 1 dd-agent dd-agent 10485638 Jul 28 07:09 forwarder.log.1
-rw-r--r-- 1 dd-agent dd-agent 1476 Jul 31 11:37 jmxfetch.log
-rw-r--r-- 1 dd-agent dd-agent 31916 Jul 31 11:37 supervisord.log
-rw-r--r-- 1 dd-agent dd-agent 110424 Jul 31 11:48 trace-agent.log
-rw-r--r-- 1 dd-agent dd-agent 10000072 Jul 28 08:29 trace-agent.log.1
```

Si esos archivos **NO** son propiedad del usuario `dd-agent`, cambia la propiedad con el siguiente comando y luego [reinicia el Agent][1]:

```text
sudo chown -R dd-agent:dd-agent /var/log/datadog/
```

[Más información sobre las localizaciones de logs del Agent][2].

## Problemas relacionados con permisos de socket en el Agent

Al iniciar el Agent, puede aparecer el siguiente problema relacionado con permisos de socket:

```text
Starting Datadog Agent (using supervisord):Error: Cannot open an HTTP server: socket.error reported errno.EACCES (13)
```

A primera vista, podría parecer que el Agent no puede conectarse a los sockets apropiados porque ya están ocupados. Pero si ya has comprobado que [no quedan procesos del Agent][3] y si puedes asegurarte de que los [puertos apropiados][4] están disponibles para el Agent, a veces este error persiste.

Para hosts Linux, el directorio `/opt/datadog-agent/run` debe ser propiedad del usuario `dd-agent` para iniciarse correctamente. En raras ocasiones, la propiedad de este directorio puede cambiar a algo distinto de `dd-agent`. Esto causa el error anterior al iniciar el Agent. Vuelve a comprobar la propiedad de este directorio ejecutando el siguiente comando:

```text
ls -al /opt/datadog-agent/run
```

Si el propietario del archivo **NO** es `dd-agent`, ejecuta el siguiente comando para solucionarlo:

```text
chown dd-agent -R /opt/datadog-agent/run
```

Después de realizar este cambio, el [comando de inicio del Agent][5] debería poder iniciar el Agent correctamente. Si el problema persiste a pesar de haber seguido estos pasos, ponte en contacto con [el equipo de asistencia de Datadog][6] para obtener más información.

## Problemas relacionados con permisos de métricas de procesos

Si activaste el [check de procesos][7] en el Agent que se ejecuta en un sistema operativo Linux, podrás notar que la métrica `system.processes.open_file_descriptors` no se recopila ni se informa por defecto.
Esto ocurre cuando los procesos que monitoriza el check de servicios se ejecutan bajo un usuario diferente al usuario del Agent: `dd-agent`. De hecho, el usuario `dd-agent` no tiene acceso completo a todos los archivos de `/proc`, que es donde el Agent busca para recopilar datos de esta métrica.

Intenta actualizar a la [última versión del Agent][8] y utiliza la opción `try_sudo`. Si no puedes actualizar, una solución para este problema es ejecutar el Agent como `root`.

<div class="alert alert-info">Ejecutar un daemon de proceso como <code>raíz</code> no es la práctica recomendada en Linux. El Agent es de código abierto y puede ser auditado a través del <a href="https://github.com/DataDog/dd-agent">repositorio GitHub.</a></div>

1. [Detener el Agent][1]

2. Abre `/etc/dd-agent/supervisor.conf` y sustituye `dd-agent` por `root` en [línea 20][11] y [línea 30][12]. Vuelve a hacerlo si actualizas o reinstalas el Agent.

3. [Iniciar el Agent][1]

Consulta los siguientes temas de GitHub para obtener más información y ver otros métodos posibles de capturar esta métrica en máquinas Linux.

* https://github.com/DataDog/dd-agent/issues/853
* https://github.com/DataDog/dd-agent/issues/2033

[1]: /es/agent/guide/agent-5-commands/
[2]: /es/agent/guide/agent-5-log-files/
[3]: /es/agent/faq/error-restarting-agent-already-listening-on-a-configured-port/
[4]: /es/agent/faq/network/
[5]: /es/agent/configuration/agent-5-commands/#start-the-agent
[6]: /es/help/
[7]: /es/integrations/process/
[8]: /es/agent/guide/upgrade/
[11]: https://github.com/DataDog/dd-agent/blob/master/packaging/supervisor.conf#L20
[12]: https://github.com/DataDog/dd-agent/blob/master/packaging/supervisor.conf#L30