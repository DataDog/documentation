---
disable_toc: false
title: Detección de amenazas para Linux sin soporte eBPF
---

Esta guía describe cómo configurar la solución sin eBPF de CSM Threats para entornos eBPF desactivados, como AWS Fargate. La solución sin eBPF utiliza un Datadog Agent basado en ptrace.

Esta guía también describe algunas ventajas de la solución ptrace.

<div class="alert alert-info">La detección de amenazas para Linux sin soporte eBPF está en Vista previa. Para inscribirte, ponte en contacto con tu representante de Datadog.</div>


## Resumen de las opciones de Agent 

CSM Threats incluye dos opciones de Agent para la detección y la respuesta ante amenazas:

- Solución eBPF
- Solución sin eBPF con ptrace: Esta versión sólo está disponible cuando eBPF no lo está (versiones 3.4 a 4.14 del kernel de Linux).

{{% collapse-content title="Solución eBPF" level="h4" %}}

Datadog ha creado todos sus productos de seguridad en torno a [(filtro de paquetes Berkeley ampliado) eBPF][1]. Algunas de las ventajas de eBPF son:

- eBPF mejora la seguridad validando cada programa a través del verificador del kernel de Linux. Esto garantiza que un programa no pueda bloquearse, ingresar en bucles infinitos o dañar el sistema.
- eBPF se compila como JIT (Just In Time) y el bytecode de salida se ejecuta en un sandbox de máquina virtual eBPF. Esto evita cualquier bloqueo del kernel y proporciona un rendimiento competitivo.
- Fácil de depurar y mantener, puede cargar programas dinámicamente y tiene acceso a toda la información necesaria para rastrear el espacio de usuario.

El código del Agent eBPF Datadog es [totalmente de código abierto][2].

{{% /collapse-content %}}

{{% collapse-content title="eBPF-less solution with ptrace" level="h4" %}}
Algunos entornos utilizan instancias con kernels antiguos que no tienen eBPF en absoluto. La solución ptrace se proporciona para estos entornos.

Las siguientes funciones no están disponibles en el Agent sin eBPF:

- Perfiles de seguridad, proporcionando:
  - Detección de anomalías
  - Supresión automática del comportamiento normal para la clasificación de señales
  - Detección de malware
- Detecciones de red

<div class="alert alert-info">La implementación actual admite arquitecturas y ABI amd64 y arm64, pero puede extenderse a ABI de 32 bits.</div>

### Ventajas de la solución ptrace

Una solución basada en ptrace logra un equilibrio entre una sólida detección de amenazas y la disponibilidad absoluta de servicios. Algunas de las ventajas de la solución basada en ptrace son:

- Control preciso de procesos: Ptrace proporciona una inspección detallada de la memoria y los registros, salvaguardando las cargas de trabajo críticas de las aplicaciones. Esta visibilidad granular es esencial para identificar amenazas sofisticadas. El analizador procfs (Process Filesystem) de Datadog monitoriza todas las ejecuciones en todo el sistema, lo que permite la finalización quirúrgica de programas maliciosos. procesos. Estas herramientas combinadas protegen de la actividad maliciosa.
- Estabilidad operativa: Al operar en el espacio de usuario, ptrace evita las complejidades y los riesgos del espacio del kernel, proporcionando un enfoque más seguro y manejable. En caso de fallos, un Agent basado en ptrace pasa por defecto a un estado abierto a fallos en la capa del sistema operativo, lo que mantiene el sistema intacto, incluso si la aplicación se bloquea.
- Rendimiento eficiente: Los tests de referencia realizados recientemente por el equipo de ingeniería de Datadog demuestran que la implementación basada en ptrace de Datadog muestra un rendimiento comparable al de las soluciones basadas en el kernel. En concreto, solo introduce una sobrecarga mínima de alrededor del 3% para las cargas de trabajo de PostgreSQL e impactos insignificantes para las operaciones de Redis, lo que la vuelve muy eficiente para la mayoría de los casos de uso.
- Verificación de código abierto: Datadog ha colocado en código abierto el Agent eBPF basado en ptrace, lo que permite a los clientes y a la comunidad de seguridad verificar por sí mismos su seguridad y eficacia, lo que incentiva la transparencia y la confianza en la solución.
{{% /collapse-content %}}


## Configuración del Agent sin eBPF

Puedes configurar un Agent sin eBPF en varias plataformas, incluidos los hosts Docker y Linux.

Esta sección cubre los hosts Docker y Linux. Para conocer los pasos para configurar un entorno Amazon Fargate en el que eBPF esté deshabilitado, consulta [Guía de configuración de AWS Fargate para la seguridad de Datadog][3].

### Requisitos del Agent sin eBPF

- El Agent sin eBPF está diseñado para entornos donde eBPF está deshabilitado, utilizando ptrace para la seguridad en tiempo de ejecución, y admite arquitecturas arm64/amd64.
- Para desplegar el Agent sin eBPF se requieren comandos y configuraciones de instalación personalizados. En esta sección se proporcionan instrucciones específicas para las instalaciones de hosts Docker y Linux.

La solución sin eBPF incluye dos modos de rastreo para las aplicaciones:

- Modo envolvente: Rastrea las aplicaciones desde el inicio.
- Modo adjunto: Se adjunta a aplicaciones que ya se están ejecutando, pero conlleva más sobrecarga de rendimiento y limitaciones.

### Pasos de la configuración sin eBPF

{{< tabs >}}
{{% tab "Docker" %}}
En Docker se requiere una variable de entorno adicional. Añade la siguiente línea a tu comando de instalación Docker:

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
  gcr.io/datadoghq/agent:7
```
{{% /tab %}}

{{% tab "Host Linux" %}}
Para instalar el Agent en un host Linux, utiliza el siguiente script de instalación para instalar la compilación personalizada:

```shell
DD_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX DD_SITE="datadoghq.com" \
DD_RUNTIME_SECURITY_CONFIG_ENABLED=true \
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

A continuación, modifica el archivo `/etc/datadog-agent/system-probe.yaml` para habilitar el modo CWS y sin eBPF como se indica a continuación:

{{< code-block lang="java" filename="system-probe.yaml" disable_copy="false" collapsible="true" >}}
runtime_security_config:
  enabled: true
  ebpfless:
    enabled: true
{{< /code-block >}}

Alternativamente, para instalar manualmente los paquetes de compilación personalizados proporcionados por `.deb/.rmp`, modifica el archivo `/etc/datadog-agent/system-probe.yaml` para habilitar el modo CWS y sin eBPF de la siguiente manera:

{{< code-block lang="java" filename="system-probe.yaml" disable_copy="false" collapsible="true" >}}
runtime_security_config:
  enabled: true
  ebpfless:
    enabled: true
{{< /code-block >}}
{{% /tab %}}

{{< /tabs >}}





## Desplegar el Agent sin eBPF

Antes de desplegar el Agent, asegúrate de seguir los siguientes requisitos de configuración:

1. Personaliza las [instrucciones de instalación del Agent][5] antes de proceder a la instalación.
2. Instala/Actualiza el Agent con CSM activado. Para conocer los pasos, consulta [Configuración de Cloud Security Management en el Agent][4].
3. Especifica las configuraciones adicionales de las secciones de **configuración del Agent sin eBPF** anteriores para instalar la versión personalizada y activar el modo sin eBPF.


## Verificar la configuración

Para confirmar tu instalación y configuración del Agent, conéctate a tu Linux host o contenedor Docker y ejecútalo:

```shell
sudo /opt/datadog-agent/embedded/bin/system-probe config|grep -A 1 ebpfless
```

Deberías ver el resultado:

```
  ebpfless:
    enabled: true
```

## Configurar el rastreo de aplicaciones con el Agent sin eBPF

Una vez instalado el Agent sin eBPF y configurado para utilizar el modo eBPF-Free, puedes configurar cómo se rastrea tu aplicación. Esta sección te proporciona dos métodos diferentes:

- **Modo envolvente:** (recomendado) En este modo, tu aplicación es lanzada por el envoltorio Datadog que la rastrea desde el inicio utilizando ptrace.
  - También se rastrean todos los elementos secundarios generados.
  - Se aplica un perfil seccomp para reducir drásticamente la sobrecarga de ptracing.
- **Modo adjunto:** En este modo, puedes especificar una lista de PID para adjuntar a los procesos de tu aplicación. Esto debe hacerse rápidamente, ya que tu aplicación no será rastreada hasta que lo hagas.
  - En este modo, no se puede aplicar un perfil seccomp. En consecuencia, hay una pequeña sobrecarga de ptracing.

Ambos modos utilizan el binario **cws-instrumentation* que viene en el paquete del Datadog Agent y se encuentra en `/opt/datadog-agent/embedded/bin/cws-instrumentation`.

<div class="alert alert-info">
Este rastreador se comunica con system-probe (parte del Datadog Agent) en localhost utilizando el puerto 5678. La dirección de system-probe se puede configurar con la opción cws-instrumentation <code>--probe-addr=host:port</code>. La dirección del lado del servidor se puede actualizar mediante la opción runtime_security_config.ebpfless.socket del archivo de configuración <code>/etc/datadog-agent/system-probe.yaml</code> del Agent.
</div>

{{< tabs >}}
{{% tab "Modo envolvente" %}}
En modo envolvente, el envoltorio de Datadog lanza la aplicación. He aquí un ejemplo:

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace -- /usr/bin/your_application
```

Si tu aplicación se ejecuta como no-raíz, especifica el uid/gid como valores numéricos:

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace --uid 100 --gid 100 -- /usr/bin/your_application
```

<div class="alert alert-info">Una aplicación no se iniciará hasta que cws-instrumentation haya inicializado su conexión con el Datadog Agent.</div>

Los siguientes ejemplos muestran cómo puede integrarse el rastreador en aplicaciones para distintos tipos de despliegue.

<div class="alert alert-info">En los kernels v3.4 más antiguos, el perfil seccomp no está disponible y debe desactivarse con la opción <code>-disable-seccomp</code>.</div>

#### Servicio systemd Linux

Si ya dispones de un script init, aquí tienes un ejemplo sencillo de los cambios necesarios:

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

#### Servicio sysvinit Linux

Si ya dispones de un script init, aquí tienes un ejemplo sencillo de los cambios necesarios:

```shell
#!/bin/sh
set -e
### INICIO INFORMACIÓN INIT
# Proporciona:           my_app
# Inicio requerido:     $network
# Finalización requerida:      $network
# Inicio predeterminado:      2 3 4 5
# Finalización predeterminada:       0 1 6
# Descripción breve: Mi aplicación
# Descripción: Mi aplicación
### FIN INFORMACIÓN INIT

# Iniciar el servicio
start() {
        echo "Starting my app"
        /opt/datadog-agent/embedded/bin/cws-instrumentation trace -- /usr/bin/myapp &
}


# Detener el servicio
stop() {
       echo "Stopping my app"
    pkill -f /usr/bin/myapp
}

### lógica principal ###
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

#### Docker

Para los despliegues de aplicaciones Docker, debes modificar tu archivo Docker para envolver tu aplicación de la siguiente manera:

```shell
FROM gcr.io/datadoghq/agent:7 AS datadogagent

FROM ubuntu:latest

COPY --from=datadogagent /opt/datadog-agent/embedded/bin/cws-instrumentation .

ENTRYPOINT ["/cws-instrumentation", "trace", "--"]

CMD ["/bin/bash", "-c", "while true; do sleep 1; echo my app is running; done"]
```

Cuando ejecutes tu aplicación Docker, es importante proporcionarle una capacidad adicional añadiendo `--cap-add=SYS_PTRACE` a tu comando `docker run`.

También tienes que conectar el contenedor a Datadog en el puerto 5678 realizando una de las siguientes acciones:

- Inicia ambos contenedores con la opción de host `--network`.
- Utiliza la función de [red Docker][6] para ejecutar ambos contenedores en el mismo puente de red.

{{% /tab %}}

{{% tab "Modo adjunto" %}}
Se recomienda el modo envolvente, ya que el modo adjunto tiene las siguientes limitaciones:

- Se pierde toda la inicialización realizada por la aplicación hasta que Datadog se adjunta a ella.
- - Al adjuntarse, Datadog no puede configurar un perfil seccomp.
- Más sobrecarga de rendimiento.
- Si la aplicación rastreada se reinicia, Datadog debe asegurarse de que el rastreador también lo haga.

El modo adjunto se diferencia del modo envolvente en que adjunta directamente el rastreador en una aplicación que ya se está ejecutando, de esta manera:

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace --pid 2301
```

Se pueden conectar varios PID a la vez:

```shell
sudo /opt/datadog-agent/embedded/bin/cws-instrumentation trace --pid 2301 --pid 2302 --pid 2303
```

Los siguientes ejemplos muestran cómo puede integrarse el rastreador en aplicaciones para distintos tipos de despliegue.

#### Servicio systemd Linux

Si ya dispones de un script init, aquí tienes un ejemplo de cómo integrar el envoltorio utilizando un nuevo servicio systemd:

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

#### Servicio sysvinit Linux

Si ya dispones de un script init, aquí tienes un ejemplo de cómo integrar el rastreador utilizando un nuevo servicio sysvinit:

```shell
#!/bin/sh
set -e
### INICIO INFORMACIÓN INIT
# Proporciona:           dd_tracing_my_app
# Inicio requerido:     $network
# Finalización requerida:      $network
# Inicio predeterminado:      2 3 4 5
# Finalización predeterminada:       0 1 6
# Descripción breve: Rastreo Datadog de mi aplicación
# Descripción: Rastreo Datadog de mi aplicación
### FIN INFORMACIÓN INIT

# Iniciar el servicio
start() {
        echo "Starting tracing my app"
        /opt/datadog-agent/embedded/bin/cws-instrumentation trace $(for pid in $(pidof myapp); do echo --pid $pid; done) &
}


# Detener el servicio
stop() {
       echo "Stopping my app"
    pkill -f /opt/datadog-agent/embedded/bin/cws-instrumentation
}

### lógica principal ###
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

#### Docker

Para adjuntar el envoltorio a una imagen Docker que ejecute una aplicación, utiliza el siguiente archivo Docker:

```shell
FROM gcr.io/datadoghq/agent:7

ENTRYPOINT ["/opt/datadog-agent/embedded/bin/cws-instrumentation", "trace", "--pid", "$PID"]
```

A continuación, proporciona el PID de host para conectarse a Docker como variable de entorno.

Para adjuntarlo a una solicitud, necesitarás lo siguiente:

- Cuando ejecutes la aplicación Docker, añade la capacidad requerida incluyendo `--cap-add=SYS_PTRACE` en tu comando `docker run`.
- Asegúrate de que el contenedor de la aplicación puede llegar al contenedor Datadog en el puerto 5678 utilizando uno de los siguientes métodos:
  - Inicia ambos contenedores con la opción de host `--network`.
  - Utiliza la función de [red Docker][6] para ejecutar ambos contenedores en el mismo puente de red.
- Para asegurarte de que el contenedor de la aplicación se ejecuta en el pid del host (al igual que el Datadog Agent), añada estas opciones: `--cgroupns host --pid host`.
{{% /tab %}}
{{< /tabs >}}



[1]: https://ebpf.io/what-is-ebpf/
[2]: https://github.com/DataDog/datadog-agent
[3]: /es/security/guide/aws_fargate_config_guide/?tab=amazonecs
[4]: /es/security/cloud_security_management/setup/agent
[5]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[6]: https://docs.docker.com/network/