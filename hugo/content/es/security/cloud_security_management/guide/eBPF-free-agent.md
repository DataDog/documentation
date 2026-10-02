---
disable_toc: false
title: Detección de amenazas para Linux sin compatibilidad con eBPF
---
Esta guía describe cómo configurar la solución sin eBPF de Workload Protection para entornos con eBPF deshabilitado, como AWS Fargate. La solución sin eBPF utiliza un Datadog Agent basado en ptrace.

Esta guía también describe algunas ventajas de la solución ptrace.

## Resumen de las opciones de Agent {#summary-of-agent-options}

Workload Protection incluye dos opciones de Agent para la detección y respuesta ante amenazas:

- Solución eBPF
- Solución sin eBPF con ptrace: esta versión solo está disponible donde eBPF no lo está (versiones del kernel de Linux 3.4 a 4.14).

{{% collapse-content title="Solución eBPF" level="h3" %}}

Datadog ha construido todos sus productos de seguridad en torno a [eBPF (extended Berkeley Packet Filter)][1]. Algunos de los beneficios de eBPF son:

- eBPF mejora la seguridad al validar cada programa a través del verificador del kernel de Linux. Esto garantiza que un programa no pueda bloquearse, caer en bucles infinitos o dañar el sistema.
- eBPF se compila JIT (Just In Time) y el bytecode resultante se ejecuta en un sandbox de VM de eBPF. Esto evita cualquier bloqueo del kernel y proporciona un rendimiento competitivo.
- Fácil de depurar y mantener, puede cargar programas dinámicamente y tiene acceso a toda la información necesaria para rastrear el espacio de usuario.

El código del Datadog eBPF Agent es [completamente de código abierto][2].

{{% /collapse-content %}}

{{% collapse-content title="Solución sin eBPF con ptrace" level="h3" %}}
Algunos entornos utilizan instancias con kernels antiguos que no tienen eBPF en absoluto. La solución ptrace se proporciona para estos entornos.

Las siguientes funciones no están disponibles en el Agent sin eBPF:

- Perfiles de Security, que proporcionan:
  - Detección de anomalías
  - Supresión automática de comportamiento normal para la clasificación de señales
  - Detección de malware
- Detecciones de red

<div class="alert alert-info">La implementación actual admite la arquitectura y las ABI amd64 y arm64, pero puede extenderse a ABI de 32 bits.</div>

### Ventajas de la solución ptrace {#advantages-of-ptrace-solution}

Una solución basada en ptrace logra un equilibrio entre una detección de amenazas sólida y una disponibilidad de servicio inquebrantable. Algunas de las ventajas de la solución basada en ptrace son:

- Control preciso de procesos: ptrace proporciona una inspección detallada de la memoria y los registros, protegiendo las cargas de trabajo críticas de las aplicaciones. Esta visibilidad granular es esencial para identificar amenazas sofisticadas. El escáner procfs (sistema de archivos de procesos) de Datadog monitorea todas las ejecuciones en todo el sistema, lo que permite la terminación quirúrgica de procesos maliciosos. Juntas, estas herramientas protegen contra actividades maliciosas.
- Estabilidad operativa: al operar en el espacio de usuario, ptrace evita las complejidades y los riesgos del espacio del kernel, proporcionando un enfoque más seguro y manejable. En caso de falla, el Agent basado en ptrace vuelve a un estado fail-open en la capa del sistema operativo, manteniendo el sistema sin verse afectado, incluso si la aplicación se bloquea.
- Eficiencia de rendimiento: las pruebas comparativas recientes realizadas por el equipo de ingeniería de Datadog demuestran que la implementación basada en ptrace de Datadog muestra un rendimiento comparable al de las soluciones basadas en el kernel. Específicamente, introduce solo una sobrecarga mínima de alrededor del 3% para las cargas de trabajo de PostgreSQL y un impacto insignificante para las operaciones de Redis, lo que lo hace muy eficiente para la mayoría de los casos de uso.
- Verificación de código abierto: Datadog ha hecho de código abierto tanto el Datadog Agent basado en ptrace como el Datadog eBPF Agent, lo que permite a los clientes y a la comunidad de Datadog Security verificar su seguridad y eficacia por sí mismos, fomentando la transparencia y la confianza en la solución.
{{% /collapse-content %}}


## Configuración del Agent sin eBPF {#ebpf-less-agent-setup}

Puede configurar el Agent sin eBPF en varias plataformas, incluyendo Docker y servidores Linux.

Esta sección cubre Docker y servidores Linux. Para conocer los pasos para configurar un entorno de Amazon Fargate donde eBPF está deshabilitado, consulte la [Guía de configuración de AWS Fargate para Datadog Security][3].

### Requisitos del Agent sin eBPF {#ebpf-less-agent-requirements}

- El Agent sin eBPF está diseñado para entornos donde eBPF está deshabilitado, utilizando ptrace para la seguridad en tiempo de ejecución, y es compatible con arquitecturas arm64/amd64.
- Se requieren comandos de instalación y configuraciones personalizados para implementar el Agent sin eBPF. En esta sección se proporcionan instrucciones específicas para instalaciones en Docker y servidores Linux.

La solución sin eBPF incluye dos modos de rastreo para aplicaciones:

- Modo de ajuste: Rastrea las aplicaciones desde el inicio.
- Modo de adjuntar: Se adjunta a aplicaciones que ya se están ejecutando, pero conlleva una mayor sobrecarga de rendimiento y limitaciones.

### Pasos de configuración sin eBPF {#ebpf-less-setup-steps}

{{< tabs >}}
{{% tab "Docker" %}}
Se requiere una variable de entorno adicional en Docker. Agregue la siguiente línea a su comando de instalación de Docker:

```shell
-e DD_RUNTIME_SECURITY_CONFIG_EBPFLESS_ENABLED=true
```

El comando correspondiente debería ser:

```shell
docker run -d --name dd-agent \
  --cgroupns host \
  --pid host \
  --security-opt apparmor:unconfined \
  --cap-add SYS_ADMIN \
  --cap-add SYS_RESOURCE \
  --cap-add SYS_PTRACE \
  --cap-add NET_ADMIN \
  --cap-add NET_BROADCAST \
  --cap-add NET_RAW \
  --cap-add IPC_LOCK \
  --cap-add CHOWN \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /etc/passwd:/etc/passwd:ro \
  -v /etc/group:/etc/group:ro \
  -v /:/host/root:ro \
  -v /sys/kernel/debug:/sys/kernel/debug \
  -v /etc/os-release:/etc/os-release \
  -e DD_COMPLIANCE_CONFIG_ENABLED=true \
  -e DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED=true \
  -e DD_RUNTIME_SECURITY_CONFIG_ENABLED=true \
  -e DD_RUNTIME_SECURITY_CONFIG_REMOTE_CONFIGURATION_ENABLED=true \
  -e DD_RUNTIME_SECURITY_CONFIG_EBPFLESS_ENABLED=true \
  -e HOST_ROOT=/host/root \
  -e DD_API_KEY=<API KEY> \
  registry.datadoghq.com/agent:7
```
{{% /tab %}}

{{% tab "Servidor Linux" %}}
Para instalar el Agent en un servidor Linux, utilice el siguiente script de instalación para instalar la compilación personalizada:

```shell
DD_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX DD_SITE="datadoghq.com" \
DD_RUNTIME_SECURITY_CONFIG_ENABLED=true \
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

A continuación, modifique el archivo `/etc/datadog-agent/system-probe.yaml` para habilitar CWS y el modo sin eBPF de la siguiente manera:

{{< code-block lang="java" filename="system-probe.yaml" disable_copy="false" collapsible="true" >}}
runtime_security_config:
  enabled: true
  ebpfless:
    enabled: true
{{< /code-block >}}

Alternativamente, para instalar manualmente los paquetes de compilación personalizada proporcionados en `.deb/.rmp`, modifique el archivo `/etc/datadog-agent/system-probe.yaml` para habilitar CWS y el modo sin eBPF de la siguiente manera:

{{< code-block lang="java" filename="system-probe.yaml" disable_copy="false" collapsible="true" >}}
runtime_security_config:
  enabled: true
  ebpfless:
    enabled: true
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}





## Implementar el Agent sin eBPF {#deploy-ebpf-less-agent}

Asegúrese de cumplir con los siguientes requisitos de configuración antes de implementar el Agent:

1. Personalice las [Instrucciones de instalación del Agent][5] antes de continuar con la instalación.
2. Instale/actualice el Agent con Cloud Security habilitado. Para conocer los pasos, consulte [Configuración de Cloud Security en el Agent][4].
3. Especifique configuraciones adicionales de las secciones anteriores de **configuración del Agent sin eBPF** para instalar la versión personalizada y habilitar el modo sin eBPF.


## Verificar la configuración {#verify-setup}

Para validar la instalación y configuración de su Agent, conéctese a su servidor Linux o contenedor de Docker y ejecute:

```shell
sudo /opt/datadog-agent/embedded/bin/system-probe config|grep -A 1 ebpfless
```

Debería ver el resultado:

```
  ebpfless:
    enabled: true
```

## Configurar el rastreo de aplicaciones con el Agent sin eBPF {#set-up-application-tracing-with-ebpf-less-agent}

Después de instalar y configurar el Agent sin eBPF para usar el modo sin eBPF, puede configurar cómo se rastrea su aplicación. Esta sección le ofrece dos métodos diferentes:

- **Modo de ajuste (Wrap mode):** (Recomendado) En este modo, su aplicación se lanza mediante el Datadog wrapper, que la rastrea desde el inicio utilizando ptrace.
  - Todos los procesos secundarios generados también se rastrean.
  - Se aplica un perfil seccomp para reducir drásticamente la sobrecarga de ptracing.
- **Modo de adjuntar (Attach mode):** En este modo, puede especificar una lista de PID para adjuntar a los procesos de su aplicación. Esto debe hacerse rápidamente porque su aplicación no se rastrea mediante ptrace hasta que se complete.
  - En este modo, no se puede aplicar un perfil seccomp. En consecuencia, hay una pequeña cantidad de sobrecarga de ptracing.

Ambos modos utilizan el binario **cws-instrumentation** empaquetado con el Datadog Agent y ubicado en `/opt/datadog-agent/embedded/bin/cws-instrumentation`.

<div class="alert alert-info">
Este rastreador se comunica con system-probe (parte del Datadog Agent) en localhost usando el puerto 5678. La dirección de system-probe se puede configurar con la <code>--probe-addr=host:port</code> opción cws-instrumentation. La dirección del lado del servidor se puede actualizar a través de la opción runtime_security_config.ebpfless.socket del <code>/etc/datadog-agent/system-probe.yaml</code> Archivo de configuración del Agent.
</div>

{{< tabs >}}
{{% tab "Modo de ajuste" %}}
En modo de ajuste, el Datadog wrapper inicia la aplicación. Aquí hay un ejemplo:

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace -- /usr/bin/your_application
```

Si su aplicación se ejecuta como sin ruta, especifique el uid/gid como valores numéricos:

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace --uid 100 --gid 100 -- /usr/bin/your_application
```

<div class="alert alert-info">Una aplicación no se iniciará hasta que cws-instrumentation haya inicializado su conexión con el Datadog Agent.</div>

Los siguientes ejemplos muestran cómo se puede integrar el rastreador dentro de las aplicaciones para diferentes tipos de implementación.

<div class="alert alert-info">En kernels 3.4 más antiguos, el perfil seccomp no está disponible y debe deshabilitarse con la <code>–disable-seccomp</code> opción.</div>

#### Servicio systemd de Linux {#linux-systemd-service}

Si ya tiene un script de inicio, aquí tiene un ejemplo sencillo de los cambios necesarios:

```shell
   [Unit]
   Description=My application
   After=datadog-agent-sysprobe.service

   [Service]
   ExecStart=/opt/datadog-agent/embedded/bin/cws-instrumentation trace -- /usr/bin/myapp
   Restart=on-failure

   [Install]
   WantedBy=multi-user.target
```

#### Servicio sysvinit de Linux {#linux-sysvinit-service}

Si ya tiene un script de inicio, aquí tiene un ejemplo sencillo de los cambios necesarios:

```shell
#!/bin/sh
set -e
### BEGIN INIT INFO
# Provides:           my_app
# Required-Start:     $network
# Required-Stop:      $network
# Default-Start:      2 3 4 5
# Default-Stop:       0 1 6
# Short-Description:  My application
# Description: My application
### END INIT INFO

# Start the service
start() {
        echo "Starting my app"
        /opt/datadog-agent/embedded/bin/cws-instrumentation trace -- /usr/bin/myapp &
}


# Stop the service
stop() {
       echo "Stopping my app"
	pkill -f /usr/bin/myapp
}

### main logic ###
case "$1" in
  start)
        start
        ;;
  stop)
        stop
        ;;
  restart)
        stop
        start
        ;;
  *)
        echo $"Usage: $0 {start|stop|restart}"
        exit 1
esac

exit 0
```

#### Docker {#docker}

Para implementaciones de aplicaciones Docker, debe modificar su Dockerfile para envolver su aplicación de esta manera:

```shell
FROM registry.datadoghq.com/agent:7 AS datadogagent

FROM ubuntu:latest

COPY --from=datadogagent /opt/datadog-agent/embedded/bin/cws-instrumentation .

ENTRYPOINT ["/cws-instrumentation", "trace", "--"]

CMD ["/bin/bash", "-c", "while true; do sleep 1; echo my app is running; done"]
```

Al ejecutar su aplicación Docker, es importante darle una capacidad adicional agregando `--cap-add=SYS_PTRACE` a su comando `docker run`.

También debe conectar el contenedor a Datadog en el puerto 5678 haciendo una de las siguientes acciones:

- Inicie ambos contenedores con la opción de servidor `--network`.
- Utilice la función [red de Docker][6] para ejecutar ambos contenedores en la misma red bridge.

{{% /tab %}}

{{% tab "Modo de adjuntar" %}}
Se recomienda el modo de ajuste porque el modo de adjuntar tiene las siguientes limitaciones:

- Omite toda la inicialización realizada por la aplicación hasta que Datadog se adjunta a ella.
- - Al adjuntar, Datadog no puede configurar un perfil seccomp.
- Mayor sobrecarga de rendimiento.
- Si la aplicación rastreada se reinicia, Datadog debe asegurarse de que el trazador también se reinicie.

El modo de adjuntar difiere del modo de ajuste al adjuntar directamente el trazador en una aplicación que ya se está ejecutando, de esta manera:

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace --pid 2301
```

Se pueden adjuntar varios PID a la vez:

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace --pid 2301 --pid 2302 --pid 2303
```

Los siguientes ejemplos muestran cómo se puede integrar el rastreador dentro de las aplicaciones para diferentes tipos de implementación.

#### Servicio systemd de Linux {#linux-systemd-service-1}

Si ya tiene un script de inicio, aquí tiene un ejemplo de cómo integrar el envoltorio usando un nuevo servicio systemd:

```shell
[Unit]
Description=Datadog CWS instrumentation attach to my application
After=datadog-agent-sysprobe.service my-app.service

[Service]
ExecStart=/bin/bash -c "/opt/datadog-agent/embedded/bin/cws-instrumentation trace $(for pid in $(pidof myapp); do echo --pid $pid; done)"
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

#### Servicio sysvinit de Linux {#linux-sysvinit-service-1}

Si ya tiene un script de inicio, aquí tiene un ejemplo de cómo integrar el trazador usando un nuevo servicio sysvinit:

```shell
#!/bin/sh
set -e
### BEGIN INIT INFO
# Provides:           dd_tracing_my_app
# Required-Start:     $network
# Required-Stop:      $network
# Default-Start:      2 3 4 5
# Default-Stop:       0 1 6
# Short-Description:  Datadog tracing of my application
# Description: Datadog tracing of my application
### END INIT INFO

# Start the service
start() {
        echo "Starting tracing my app"
        /opt/datadog-agent/embedded/bin/cws-instrumentation trace $(for pid in $(pidof myapp); do echo --pid $pid; done) &
}


# Stop the service
stop() {
       echo "Stopping my app"
	pkill -f /opt/datadog-agent/embedded/bin/cws-instrumentation
}

### main logic ###
case "$1" in
  start)
        start
        ;;
  stop)
        stop
        ;;
  restart)
        stop
        start
        ;;
  *)
        echo $"Usage: $0 {start|stop|restart}"
        exit 1
esac

exit 0
```

#### Docker {#docker-1}

Para adjuntar el envoltorio a una imagen de Docker que ejecuta una aplicación, use el siguiente Dockerfile:

```shell
FROM registry.datadoghq.com/agent:7

ENTRYPOINT ["/opt/datadog-agent/embedded/bin/cws-instrumentation", "trace", "--pid", "$PID"]
```

A continuación, proporcione el PID del servidor para conectarse a Docker como una variable de entorno.

Para adjuntar a una aplicación, necesitará lo siguiente:

- Al ejecutar la aplicación de Docker, agregue la capacidad requerida incluyendo `--cap-add=SYS_PTRACE` a su comando `docker run`.
- Asegúrese de que el contenedor de la aplicación pueda comunicarse con el contenedor de Datadog en el puerto 5678 usando uno de los siguientes métodos:
  - Inicie ambos contenedores con la opción de servidor `--network`.
  - Utilice la función [red de Docker][6] para ejecutar ambos contenedores en la misma red bridge.
- Para asegurarse de que el contenedor de la aplicación se esté ejecutando en el PID del servidor (tal como lo hace el Datadog Agent), agregue estas opciones: `--cgroupns host --pid host`.
{{% /tab %}}
{{< /tabs >}}



[1]: https://ebpf.io/what-is-ebpf/
[2]: https://github.com/DataDog/datadog-agent
[3]: /es/security/guide/aws_fargate_config_guide/?tab=amazonecs
[4]: /es/security/cloud_security_management/setup/agent
[5]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[6]: https://docs.docker.com/network/