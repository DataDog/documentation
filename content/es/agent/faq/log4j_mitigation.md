---
further_reading:
- link: /integrations/guide/jmx_integrations/
  tag: Documentación
  text: ¿Qué integraciones usan JMXFetch?

title: Mitigar el riesgo de ejecución remota del código debido a Log4Shell
---

Si utilizas el Datadog Agent entre las versiones 7.17.0/6.17.0 y 7.32.2/6.32.2, podría afectarte la vulnerabilidad presentada por Log4Shell (CVE-2021-44228 y CVE-2021-45046). Si utilizas un Agent anterior a la versión 7.17.0/6.17.0, esta vulnerabilidad no debería afectarte a menos que hayas configurado Log4j para generar logs con el JMS Appender (una opción que no es compatible con el Agent; en caso de que lo hayas hecho, deshabilita el appender).

**La mejor manera de mitigar la vulnerabilidad es actualizar tu Datadog Agent a la versión 7.32.3 (6.32.3) o posterior.**

Si no tienes claro qué versión del Agent estás usando, consulta la sección [Comprobar si la versión de tu Agent es vulnerable](#seeing-if-your-agent-version-is-vulnerable).

## Actualizar tu Agent

Para actualizar el Datadog Agent entre dos versiones secundarias en tu host o contenedor, ejecuta el [comando de instalación correspondiente a tu plataforma][1].

## Si no puedes actualizar la versión de tu Agent

Si no consigues actualizar tu Agent en esta ocasión, sigue estas instrucciones para [eliminar JndiLookup.class](#delete-jndilookupclass) o para [implementar una variable de entorno](#set-log4j_format_msg_no_lookups-environment-variable) (`LOG4J_FORMAT_MSG_NO_LOOKUPS="true"` en el proceso del JMXFetch o el proceso del Agent). De esta forma, podrás mitigar en parte la vulnerabilidad.

# Eliminar JndiLookup.class

**La mejor manera de mitigar la vulnerabilidad es actualizar tu Datadog Agent a la versión 7.32.3 (6.32.3) o posterior.**

Eliminar JndiLookup.class [mitiga por completo CVE-2021-44228 y CVE-2021-45046][2].

**Nota**: Esta mitigación no es necesaria para 7.32.3/6.32.3. En estas versiones, JMXFetch usa Log4j v2.12.2, que no se ve afectado por CVE-2021-45046 ni CVE-2021-44228.

### Linux y macOS

Guarda el siguiente código como script de bash `jndi_cleanup.sh`. Después, ejecuta el script para parchear el jmxfetch.jar facilitado.

```bash
#!/bin/bash

YUM_CMD=$(which yum)
APT_GET_CMD=$(which apt-get)

TARGET="/opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar"
JNDI_CLASS="org/apache/logging/log4j/core/lookup/JndiLookup.class"

set -e

VALIDATE=0
if [ $# -eq 1 ]; then
    case "$1" in
        -c)
            VALIDATE=1 ;;
        *)
            echo "$1 is not a supported option"
            exit 1 ;;
    esac
fi

if ! command -v zip &> /dev/null
then

    if [[ ! -z $YUM_CMD ]]; then
        yum install zip
    elif [[ ! -z $APT_GET_CMD ]]; then
        apt-get update
        apt-get -y install zip
    fi
fi

if [ $VALIDATE -eq 0 ]; then
    zip -q -d $TARGET $JNDI_CLASS
else
    if [ -z $(zip -sf /opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar  | grep -i jndilookup.class) ]; then
        echo "The $TARGET JAR is now safe to run.";
    else
        echo "The $TARGET JAR is not safe to run as it still contains $JNDI_CLASS!";
        exit 1;
    fi
fi

exit 0;

```

Haz que el script sea ejecutable:
```bash
chmod +x ./jndi_cleanup.sh
```

Ejecuta lo siguiente para eliminar JndiLogger.class de jmxfetch.jar:

```bash
sudo ./jndi_cleanup.sh
```

Ejecuta lo siguiente para validar la eliminación de JndiLogger.class:

```bash
.\jndi_cleanup.sh -c
```

Si la operación se ha llevado a cabo correctamente, este debería ser el resultado:

```
The C:\Program Files\Datadog\Datadog Agent\embedded\agent\dist\jmx\jmxfetch.jar is now safe to run.
```

Por último, reinicia el servicio del Datadog Agent con `sudo systemctl restart datadog-agent` (sistemas basados en systemd de Linux), `sudo restart datadog-agent` (sistemas basados en upstart de Linux) o desde la aplicación del Datadog Agent en la barra de menús (macOS).

### Windows

Guarda el siguiente código PowerShell como `jndi_cleanup.ps1`.

```powershell
Param(
    [Parameter(Mandatory=$false)]
    [Switch]$Validate

)

[Reflection.Assembly]::LoadWithPartialName('System.IO.Compression')

$zipfile = "C:\Program Files\Datadog\Datadog Agent\embedded\agent\dist\jmx\jmxfetch.jar"
$files   = "JndiLookup.class"

$stream = New-Object IO.FileStream($zipfile, [IO.FileMode]::Open)
$update_mode   = [IO.Compression.ZipArchiveMode]::Update
$read_mode   = [IO.Compression.ZipArchiveMode]::Read

if ($Validate -eq $true) {
    $mode = $read_mode
} else {
    $mode = $update_mode
}

$zip    = New-Object IO.Compression.ZipArchive($stream, $mode)

if ($Validate -eq $true) {
    $found = New-Object System.Collections.Generic.List[System.Object]
    ($zip.Entries | ? { $files -contains $_.Name }) | % { $found.Add($_.Name) }

    if ($found.Count -eq 0) {
        Write-Output "The $zipfile is now safe to run."
    } else {
        Write-Output "Dangerous file still present, something failed during the JNDI cleanup."
    }
} else {
    ($zip.Entries | ? { $files -contains $_.Name }) | % { $_.Delete() }
}

$zip.Dispose()
$stream.Close()
$stream.Dispose()
```

Desde un PowerShell **elevado** (ejecutado como administrador), detén el servicio del Datadog Agent antes de aplicar el parche:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" stopservice
```

Aplica el parche para eliminar JndiLogger.class de jmxfetch.jar:

```powershell
.\jndi_cleanup.ps1
```

Ejecuta lo siguiente para validar la eliminación de JndiLogger.class:

```powershell
.\jndi_cleanup.ps1 -Validate
```

Si la operación se ha llevado a cabo correctamente, este debería ser el resultado:

```
The C:\Program Files\Datadog\Datadog Agent\embedded\agent\dist\jmx\jmxfetch.jar is now safe to run.
```

Por último, inicia el servicio del Datadog Agent para aplicar los cambios.

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" start-service
```

### AIX

`Jmxfetch.jar` está incluido en el paquete de instalación del Agent de AIX, pero no hay ningún código en ese Agent que ejecute el código `jmxfetch`. Si no inicias el proceso `jmxfetch` manualmente, `jmxfetch.jar` no se usará y podrá eliminarse de `/opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar`.

### Ecosistemas contenedorizados

Si ejecutas el Datadog Agent a modo de contenedor (por ejemplo, en Kubernetes, Nomad o Vanilla Docker) y usas la versión JMX (el nombre de la imagen termina en `-jmx`), deberás generar una imagen personalizada del Datadog Agent para eliminar JndiLookup.class.

Usa el siguiente archivo de Docker para generar la imagen personalizada:

```
ARG AGENT_VERSION=7.32.2

FROM gcr.io/datadoghq/agent:$AGENT_VERSION-jmx

RUN apt update && apt install zip -y

RUN zip -q -d /opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar org/apache/logging/log4j/core/lookup/JndiLookup.class

RUN apt purge zip -y
```

Desde el lugar donde se encuentra el archivo de Docker, genera, etiqueta y envía la imagen personalizada a tu registro de contenedores.
Por ejemplo, si estás usando `7.21.1`:

```
docker build -t <Your_Container_Registry>/agent:7.21.1-jmx-patched --build-arg AGENT_VERSION=7.21.1 .
docker push <Your_Container_Registry>/agent:7.21.1-jmx-patched
```

A continuación, usa esta imagen parcheada en tus clústeres.

Nota: Esto solo funciona con Linux y se basa en la arquitectura de la máquina que genera la imagen. Si necesitas admitir varias arquitecturas, usa máquinas o herramientas específicas, como `Docker buildx`.


# Establecer la variable de entorno LOG4J_FORMAT_MSG_NO_LOOKUPS

**La mejor manera de mitigar la vulnerabilidad es actualizar tu Datadog Agent a la versión 7.32.3 (6.32.3) o posterior.**

**Nota**: si estás ejecutando la versión 7.32.2 o 6.32.2, no es estrictamente necesario que sigas estos pasos. El Agent v7.32.2 (y v6.32.2) [inicia jmxfetch con una propiedad][3] que logra el mismo resultado. En cualquier caso, la mejor opción es actualizar tu Datadog Agent a la versión 7.32.3 (6.32.3) o posterior.

**Nota**: Establecer la variable de entorno `LOG4J_FORMAT_MSG_NO_LOOKUPS` como `true` reducirá el riesgo de ejecución remota del código, pero no supone una mitigación completa.

## Instalaciones de host

En Linux, las instrucciones dependen del sistema de inicio y la distribución:

### Sistemas basados en systemd:

#### RedHat/CentOS 7 y 8; Amazon Linux 2; SUSE 12+; Ubuntu 16.04+/Debian 8 y versiones posteriores

1. Crea un archivo de anulación que contenga lo siguiente en `/etc/systemd/system/datadog-agent.service.d/log4j_override.conf`:
    ```
    [Service]
    Environment="LOG4J_FORMAT_MSG_NO_LOOKUPS=true"
    ```
2. Recarga las definiciones del servicio systemd: `sudo systemctl daemon-reload`
3. Reinicia el servicio datadog-agent: `sudo systemctl restart datadog-agent`


### Sistemas basados en upstart

Las instrucciones varían según la distribución de Linux:

#### Ubuntu 14.04

1. Crea un archivo de anulación que contenga lo siguiente en `/etc/init/datadog-agent.override`:
    ```
    env LOG4J_FORMAT_MSG_NO_LOOKUPS=true
    ```
2. Detén e inicia el servicio datadog-agent: `sudo stop datadog-agent && sudo start datadog-agent`

**Nota**: Usa `start` y `stop`, ya que `restart` no recoge el cambio de configuración del servicio.

#### RedHat/Centos 6; Amazon Linux 1:

1. Añade la siguiente línea al final del archivo `/etc/init/datadog-agent.conf` existente:
    ```
    env LOG4J_FORMAT_MSG_NO_LOOKUPS=true
    ```
2. Detén e inicia el servicio datadog-agent: `sudo stop datadog-agent && sudo start datadog-agent`

**Nota**: Usa `start` y `stop`, ya que `restart` no recoge el cambio de configuración del servicio.

**Nota**: El archivo `/etc/init/datadog-agent.conf` se sobrescribe cuando el Agent se reinstala, actualiza o cambia a una versión anterior. Deberás seguir estos pasos de nuevo si actualizas, cambias a una versión anterior o reinstalas el Agent mientras no actualices a la versión 7.32.3/6.32.3 o posterior.

### Windows

1. Ejecuta un código PowerShell de administrador en la máquina.
2. Ejecuta el siguiente fragmento de código:
    ```
    [Environment]::SetEnvironmentVariable("LOG4J_FORMAT_MSG_NO_LOOKUPS", "true", "Machine")
    ```
3. Reinicia el servicio del Datadog Agent para aplicar los cambios.

**Nota**: Esto se aplica a todas las máquinas JVM que se ejecuten el host.

### AIX

`Jmxfetch.jar` está incluido en el paquete de instalación del Agent de AIX, pero no hay ningún código en ese Agent que ejecute el código `jmxfetch`. Si no inicias el proceso `jmxfetch` manualmente, `jmxfetch.jar` no se usará y podrás eliminarlo de `/opt/datadog-agent/bin/agent/dist/jmx/jmxfetch.jar`,

Si ejecutas `jmxfetch.jar` manualmente, pasa el siguiente indicador al proceso de Java: `‐Dlog4j2.formatMsgNoLookups=True`


## Agent contenedorizado

**Nota**: Establecer la variable de entorno LOG4J_FORMAT_MSG_NO_LOOKUPS como true reducirá el riesgo de ejecución remota del código, pero no supone una mitigación completa.

### Docker (Linux y Windows)

Añade la siguiente variable de entorno al comando `docker run` para especificarla cuando ejecutes el contenedor datadog-agent: `-e LOG4J_FORMAT_MSG_NO_LOOKUPS="true"`

### Kubernetes

Configura la variable de entorno `LOG4J_FORMAT_MSG_NO_LOOKUPS="true"` en el contenedor del `agent` o en todos los contenedores de Datadog. Con el Helm chart de Datadog oficial, añade la variable de entorno a la lista con el valor `datadog.env`. Ejemplo:

```
datadog:
  env:
    - name: "LOG4J_FORMAT_MSG_NO_LOOKUPS"
      value: "true"
```

## Comprobar si la versión de tu Agent es vulnerable

### Con un dashboard

Para comprobar que tu Datadog Agent (>= 6.17.0 - <= 6.32.2; >= 7.17.0 - <= 7.32.2) sea la versión recomendada (6.32.3/7.32.3 o posterior) y no se esté ejecutando en una versión de Log4j vulnerable, [importa][4] la siguiente plantilla de dashboard a tu cuenta de Datadog:

[**Plantilla del dashboard Datadog Agent Version Check**][5]
</br>
</br>
{{< img src="agent/faq/dashboard.png" alt="Vista del dashboard Datadog Agent Version Check donde se pueden ver los Agents vulnerables" >}}

Si quieres crear varias versiones de este dashboard para distintas cuentas o hosts de Datadog, puedes automatizar el proceso de creación con la API de dashboards. Ejecuta el siguiente comando en el directorio donde se guarda el archivo JSON:

```curl
curl -X POST "https://api.datadoghq.com/api/v1/dashboard" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d @DatadogAgentVersionCheck.json
```

**Nota**: El dashboard Datadog Agent Version Check no muestra versiones anteriores del Datadog Agent (v5), puesto que no son vulnerables.

### Con la interfaz de línea de comandos (CLI)

También puedes comprobar información específica de la versión del Agent con el subcomando `version` de la CLI del Agent. Para obtener más información, consulta la [documentación acerca de la CLI del Agent][6].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://logging.apache.org/log4j/2.x/security.html
[3]: https://github.com/DataDog/datadog-agent/blob/main/CHANGELOG.rst#7322--6322
[4]: /es/dashboards/#copy-import-or-export-dashboard-json
[5]: /resources/json/agent-version-dashboard.json
[6]: /es/agent/guide/agent-commands/?tab=agentv6v7#other-commands
