---
aliases:
- /es/agent/faq/how-to-solve-permission-denied-errors
- /es/agent/faq/why-don-t-i-see-the-system-processes-open-file-descriptors-metric
- /es/agent/faq/cannot-open-an-http-server-socket-error-reported-errno-eacces-13
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: Solucionar problemas del Agent
  text: Modo de depuración del Agent
- link: /agent/troubleshooting/send_a_flare/
  tag: Solucionar problemas del Agent
  text: Enviar un flare del Agent
title: Problemas con los permisos
---

El Agent necesita un conjunto específico de permisos para poder recopilar tus datos en tu host. A continuación, encontrarás algunos de los problemas de permisos más comunes y el modo de solucionarlos:

* [Problemas con los permisos para generar logs del Agent](#agent-logging-permission-issues)
* [Problemas con los permisos del socket del Agent](#agent-socket-permission-issues)
* [Problemas con los permisos de las métricas de proceso](#agent-logging-permission-issues)
* [Leer más](#further-reading)

## Problemas con los permisos para generar logs del Agent

Al ejecutar el Datadog Agent en un host determinado, es posible que se produzcan problemas relacionados con los permisos que impidan que el Agent genere logs correctamente. Ejemplo:

```text
IOError: [Errno 13] Permission denied: '/var/log/datadog/supervisord.log'
```

Asegúrate de que tanto los archivos de logs del Agent como el directorio que contiene dichos archivos sean propiedad del usuario del Datadog Agent: `dd-agent`. Si no es así, el Agent no podrá redactar entradas de logs en esos archivos. A continuación, encontrarás el comando que se utiliza en los sistemas Unix para mostrar la información sobre la propiedad de los archivos:

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

Si esos archivos **NO** son propiedad del usuario `dd-agent`, cambia el propietario con el siguiente comando y, después, [reinicia el Agent][1]:

```text
sudo chown -R dd-agent:dd-agent /var/log/datadog/
```

[Más información sobre las localizaciones de los logs del Agent][2].

## Problemas con los permisos del socket del Agent

Al iniciar el Agent, puede aparecer el siguiente problema con los permisos del socket:

```text
Starting Datadog Agent (using supervisord):Error: Cannot open an HTTP server: socket.error reported errno.EACCES (13)
```

A primera vista, podría parecer que el Agent no puede conectar con los sockets adecuados porque ya están ocupados. Sin embargo, si ya has verificado que [no quedan procesos del Agent pendientes][3] y has comprobado que los [puertos pertinentes][4] están disponibles para el Agent, a veces es posible que el error anterior siga apareciendo.

En hosts de Linux, el directorio `/opt/datadog-agent/run` debe ser propiedad del usuario `dd-agent` para que se inicie correctamente. En raras ocasiones, se puede cambiar el propietario de este directorio para que no sea `dd-agent`, lo que produce el error anterior cuando se inicia el Agent. Si quieres comprobar quién es el propietario de este directorio, ejecuta el siguiente comando:

```text
ls -al /opt/datadog-agent/run
```

Si el propietario del archivo **NO** es `dd-agent`, ejecuta el siguiente comando para corregirlo:

```text
chown dd-agent -R /opt/datadog-agent/run
```

Después de realizar este cambio, el [comando de inicio del Agent][5] debería poder iniciar el Agent correctamente. Si el problema persiste a pesar de haber seguido estos pasos, ponte en contacto con [el equipo de asistencia de Datadog][6] para obtener más información.

## Problemas con los permisos de las métricas de proceso

Si has habilitado el [check de proceso][7] en un Agent que se ejecuta en un sistema operativo de Linux, puede que notes que la métrica `system.processes.open_file_descriptors` no se recopila o que no se notifica de forma predeterminada.
Esto ocurre cuando los procesos que se monitorizan con el check de proceso se ejecutan con un usuario diferente al usuario del Agent: `dd-agent`. De hecho, el usuario `dd-agent` no tiene acceso completo a todos los archivos de `/proc`, que es donde el Agent realiza la búsqueda para recopilar los datos de esta métrica.

{{< tabs >}}
{{% tab "Agent v6.3 y posteriores" %}}

Habilita la opción `try_sudo` en la configuración del check de proceso y añade las reglas `sudoers` pertinentes:

```text
dd-agent ALL=NOPASSWD: /bin/ls /proc/*/fd/
```

Esto permite que el check de proceso utilice `sudo` para ejecutar el comando `ls`, pero solo para la lista de contenidos de la ruta `/proc/*/fd/`.

Si ves la línea `sudo: sorry, you must have a tty to run sudo` en el archivo `error.log` de Datadog, deberías utilizar `visudo` para comentar la línea `Default requiretty` en tu archivo sudoers.

{{% /tab %}}
{{% tab "Agent v6 y v7" %}}

Si estás ejecutando el Agent v6 con una versión anterior a la 6.3, intenta actualizar el Agent y utilizar la opción `try_sudo`. Si no puedes realizar la actualización, una alternativa para este problema es ejecutar el Agent como `root`.

**NOTA**: No se recomienda ejecutar el Agent como `root`. No se trata de algo específico del Datadog Agent ni implica ningún problema de fiabilidad; sencillamente, evitar la ejecución del daemon como `root` es una práctica recomendable para la mayoría de los procesos en Linux. Si hay algo que te preocupe, recuerda que el Agent es de código abierto, de modo que tanto tu equipo como tú podéis auditarlo a través del [repositorio de GitHub][1].

1. [Detén el Agent][2].

2. Abre `/etc/systemd/system/multi-user.target.wants/datadog-agent.service` y cambia el atributo `user​` en `[Service]`.

3. [Inicia el Agent][3].

[1]: https://github.com/DataDog/datadog-agent
[2]: /es/agent/guide/agent-commands/#stop-the-agent
[3]: /es/agent/guide/agent-commands/#start-the-agent
{{% /tab %}}
{{% tab "Agent v5" %}}

Si estás ejecutando el Agent v5, intenta actualizarlo a la [última versión del Agent v6][1] y utilizar la opción `try_sudo`. Si no puedes realizar la actualización, una alternativa para este problema es ejecutar el Agent como `root`.

**NOTA**: No se recomienda ejecutar el Agent como `root`. No se trata de algo específico del Datadog Agent ni implica ningún problema de fiabilidad; sencillamente, evitar la ejecución del daemon como `root` es una práctica recomendable para la mayoría de los procesos en Linux. Si hay algo que te preocupe, recuerda que el Agent es de código abierto, de modo que tanto tu equipo como tú podéis auditarlo a través del [repositorio de GitHub][2].

1. [Detén el Agent][3].

2. Abre `/etc/dd-agent/supervisor.conf` y reemplaza `dd-agent` por `root` en la [línea 20][4] y la [línea 30][5]. Repite este paso si vas a actualizar o reinstalar el Agent.

3. [Inicia el Agent][6].

[1]: /es/agent/guide/upgrade-to-agent-v6/
[2]: https://github.com/DataDog/dd-agent
[3]: /es/agent/guide/agent-commands/?tab=agentv5#stop-the-agent
[4]: https://github.com/DataDog/dd-agent/blob/master/packaging/supervisor.conf#L20
[5]: https://github.com/DataDog/dd-agent/blob/master/packaging/supervisor.conf#L30
[6]: /es/agent/guide/agent-commands/?tab=agentv5#start-the-agent
{{% /tab %}}
{{< /tabs >}}

Consulta los siguientes problemas de GitHub para obtener más información y descubrir otros posibles métodos para capturar esta métrica en equipos que usen Linux.

* https://github.com/DataDog/dd-agent/issues/853
* https://github.com/DataDog/dd-agent/issues/2033

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/guide/agent-commands/
[2]: /es/agent/guide/agent-log-files/
[3]: /es/agent/faq/error-restarting-agent-already-listening-on-a-configured-port/
[4]: /es/agent/faq/network/
[5]: /es/agent/guide/agent-commands/#start-the-agent
[6]: /es/help/
[7]: /es/integrations/process/