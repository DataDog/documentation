---
aliases:
- /es/agent/faq/how-to-solve-permission-denied-errors
- /es/agent/faq/why-don-t-i-see-the-system-processes-open-file-descriptors-metric
- /es/agent/faq/cannot-open-an-http-server-socket-error-reported-errno-eacces-13
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: Documentación
  text: Modo de depuración del Agent
- link: /agent/troubleshooting/send_a_flare/
  tag: Documentación
  text: Enviar un flare del Agent
title: Problemas con los permisos
---

El Agent necesita un conjunto específico de permisos para poder recopilar datos de tu host. A continuación verás los problemas de permisos más comunes y cómo solucionarlos.

## Problemas con los permisos de generación de logs del Agent

Al ejecutar el Datadog Agent en un determinado host, podrías encontrarte con algunos problemas relacionados con los permisos, que impedirían que el Agent genere logs correctamente, como por ejemplo:

```text
IOError: [Errno 13] Permission denied: '/var/log/datadog/supervisord.log'
```

Asegúrate de que los archivos de logs del Agent y el directorio que los contiene pertenecen al usuario del Datadog Agent : `dd-agent`. Si no es así, el Agent no podrá escribir entradas de logs en esos archivos. A continuación encontrarás el comando que funciona en los sistemas Unix para mostrar información sobre la propiedad de los archivos:

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

## Problemas con los permisos de socket del Agent

Al iniciar el Agent, podría aparecer el siguiente problema de permisos de socket:

```text
Starting Datadog Agent (using supervisord):Error: Cannot open an HTTP server: socket.error reported errno.EACCES (13)
```

A primera vista, podría parecer que el Agent no puede conectarse con los sockets apropiados porque ya están ocupadas. Pero si ya has comprobado dos veces que [no quedan procesos del Agent restantes][3] y si puedes asegurarte de que los [puertos apropiados][4] están disponibles para el Agent, a veces el error anterior persiste.

Para hosts Linux, el directorio `/opt/datadog-agent/run` debe ser propiedad del usuario `dd-agent` para iniciarse correctamente. En raras ocasiones, la propiedad de este directorio puede cambiar a algo distinto de `dd-agent`. Esto causa el error anterior al iniciar el Agent. Vuelve a comprobar la propiedad de este directorio ejecutando el siguiente comando:

```text
ls -al /opt/datadog-agent/run
```

Si el propietario del archivo **NO** es `dd-agent`, ejecuta el siguiente comando para solucionarlo:

```text
sudo chown -R dd-agent:dd-agent /opt/datadog-agent/run
```

Después de realizar este cambio, el [comando de inicio del Agent][5] debería poder iniciar el Agent correctamente. Si el problema persiste a pesar de haber seguido estos pasos, ponte en contacto con [el equipo de asistencia de Datadog][6] para obtener más información.

## Problemas con los permisos de métricas de procesos

Si habilitaste el [check del proceso][7] en el Agent que se ejecuta en un sistema operativo Linux, podrás notar que la métrica `system.processes.open_file_descriptors` no se recopila ni se informa por defecto.
Esto ocurre cuando los procesos monitorizados por el check del proceso se ejecutan bajo un usuario diferente al usuario del Agent: `dd-agent`. De hecho, el usuario `dd-agent` no tiene acceso completo a todos los archivos en `/proc`, que es donde el Agent busca para recopilar datos de esta métrica.

Activa la opción `try_sudo` (disponible a partir del Agent v6.3) en la configuración del check del proceso y añade las reglas `sudoers` adecuadas:

```text
dd-agent ALL=NOPASSWD: /bin/ls /proc/*/fd/
```

Esto permite la check del proceso utilizar `sudo` para ejecutar el comando `ls`, pero sólo en la lista de contenidos de la ruta `/proc/*/fd/`.

Si ves la línea `sudo: sorry, you must have a tty to run sudo` en el archivo `error.log` de Datadog, deberías utilizar `visudo` para comentar la línea `Default requiretty` de tu archivo sudoers.

### Ejecución del Agent como raíz

Si no puedes utilizar `try_sudo`, puedes ejecutar el Agent como `root`, como solución alternativa.

<div class="alert alert-info">Ejecutar un daemon de proceso como <code>raíz</code> no es la práctica recomendada en Linux. El Agent es de código abierto y puede auditarse a través del <a href="https://github.com/DataDog/datadog-agent">repositorio de GitHub</a>.</div>

Para ejecutar el Agent como `root`:
1. [Detener el Agent][9]
2. Abre `/etc/systemd/system/multi-user.target.wants/datadog-agent.service` y cambia el atributo `user` en `[Service]`
3. [Iniciar el Agent][10]

Consulta los siguientes temas de GitHub para obtener más información y otros métodos posibles para capturar esta métrica en máquinas Linux.

* https://github.com/DataDog/dd-agent/issues/853
* https://github.com/DataDog/dd-agent/issues/2033

## Problemas de permisos al ejecutar el Agent como daemon del sistema en MacOS

Si instalaste el Agent como un daemon de inicio para todo el sistema utilizando las opciones `DD_SYSTEMDAEMON_INSTALL` y `DD_SYSTEMDAEMON_USER_GROUP`, comprueba que el usuario y el grupo que utilizaste para `DD_SYSTEMDAEMON_USER_GROUP` son válidos y tienen los permisos adecuados.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/configuration/agent-commands/
[2]: /es/agent/configuration/agent-log-files/
[3]: /es/agent/faq/error-restarting-agent-already-listening-on-a-configured-port/
[4]: /es/agent/faq/network/
[5]: /es/agent/configuration/agent-commands/#start-the-agent
[6]: /es/help/
[7]: /es/integrations/process/
[9]: /es/agent/configuration/agent-commands/#stop-the-agent
[10]: /es/agent/configuration/agent-commands/#start-the-agent