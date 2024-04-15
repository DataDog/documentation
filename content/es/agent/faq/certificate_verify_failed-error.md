---

title: Error CERTIFICATE_VERIFY_FAILED
---

### ¿Qué ha ocurrido?

El sábado 30 de mayo de 2020, a las 10:48 UTC, un certificado raíz SSL utilizado para la firma cruzada de algunos de los certificados de Datadog caducó y provocó que algunos de sus Agents perdieran la conectividad con los endpoints de Datadog. Como este certificado raíz está integrado en algunas versiones del Agent, deberás tomar las medidas necesarias para restablecer la conectividad.

### ¿Qué versiones del Agent se han visto afectadas?

Se han visto afectadas versiones del Agent que van de la 3.6.x a la 5.32.6, puesto que integran el certificado caducado.

Las versiones 6.x y 7.x del Agent están bien y no necesitan actualizarse.

### Pásate al Agent 5.32.7 para solucionar el problema.

Si estás ejecutando el Agent v5.x en un host de 64 bits, Datadog te recomienda que lo actualices a la versión 5.32.7 (o a otra posterior). De este modo, se garantiza que el Agent siga funcionando en una amplia variedad de escenarios diferentes con una cantidad mínima de cambios.

Centos/Red Hat: `sudo yum check-update && sudo yum install datadog-agent`
Debian/Ubuntu: `sudo apt-get update && sudo apt-get install datadog-agent`
Windows (a partir de la versión 5.12.0): Descarga el [instalador del Datadog Agent][1]. `start /wait msiexec /qn /i ddagent-cli-latest.msi`
Obtén más información sobre otras plataformas y opciones de administración de la configuración [en la página de instalación del Agent][2].

La última versión compatible del Agent publicada para sistemas de 32 bits fue la 5.10.1. Sigue las instrucciones que se detallan en `Corregir sin actualizar el Agent` para hosts de 32 bits.

### Corregir sin actualizar el Agent

#### Linux

```shell
sudo rm -f /opt/datadog-agent/agent/datadog-cert.pem && sudo /etc/init.d/datadog-agent restart
```

#### Windows

Si tu Agent está configurado para utilizar un proxy, en su lugar sigue lo indicado en la [sección específica que aparece a continuación](#windows-agent-5x-configured-to-use-a-proxy-or-the-curl-http-client).

*Usar la interfaz de línea de comandos (CLI)*

Si usas PowerShell, realiza lo siguiente para el Agent `>= 5.12.0`:

```shell
rm "C:\Program Files\Datadog\Datadog Agent\agent\datadog-cert.pem"
restart-service -Force datadogagent
```

**Nota**: En el caso de las versiones del Agent `<= 5.11`, la localización es diferente.
Para usuarios que utilicen el Agent de 32 bits `<= 5.11` en Windows de 64 bits, los pasos son:

```shell
rm "C:\Program Files (x86)\Datadog\Datadog Agent\files\datadog-cert.pem"
restart-service -Force datadogagent
```

Para todos los demás usuarios del Agent `<= 5.11`, los pasos son:

```shell
rm "C:\Program Files\Datadog\Datadog Agent\files\datadog-cert.pem"
restart-service -Force datadogagent
```

*Usar la GUI de Windows*

Elimina `datadog-cert.pem`. Puedes encontrar este archivo en:

* Agent `>=5.12.0`:
  * Windows de 64 bits: `C:\Program Files\Datadog\Datadog Agent\agent\`
  * Windows de 32 bits: El Datadog Agent no estaba disponible para sistemas Windows de 32 bits a partir del Agent 5.12
* Agent `<= 5.11.x`:
  * Windows de 64 bits: `C:\Program Files (x86)\Datadog\Datadog Agent\files\`
  * Windows de 32 bits:`C:\Program Files\Datadog\Datadog Agent\files\`

Una vez eliminado el archivo, reinicia el servicio de Datadog desde el administrador de servicios de Windows.

### Actualizar al Agent 6 o 7 para solucionar el problema

Puedes actualizar al [Agent 7][3] o al [Agent 6][4] para resolver este problema, pero *consulta el archivo CHANGELOG del Agent para informarte de los cambios del Agent 6 y 7 respecto a la compatibilidad con versiones anteriores.*

### Actualiza el Agent después de eliminar el certificado

Datadog recomienda mantener el Agent al día y actualizarlo siempre a la última versión. Los despliegues configurados para actualizarse automáticamente vienen activados de forma predeterminada en la versión 5.32.7.

### Cifrar el tráfico con SSL

Cifra el tráfico con SSL, incluso si eliminas el certificado. El certificado es solo una configuración preestablecida para uso del cliente, y no es necesario conectar con SSL. Los endpoints del Datadog Agent solo aceptan tráfico SSL.

### Agent 5.x de Windows configurado para usar un proxy o el cliente curl HTTP

Esta sección se aplica al Agent 5.x (`<= 5.32.6`) de Windows siempre que el Agent esté configurado para:

* utilizar un proxy con la opción de configuración `proxy_host` en `datadog.conf` o la variable de entorno `HTTPS_PROXY`, o
* utilizar el cliente curl HTTP con la opción de configuración`use_curl_http_client: yes` en `datadog.conf`.

Nota: `datadog.conf` se encuentra en `C:\ProgramData\Datadog\datadog.conf`.

En este caso, la eliminación de `datadog-cert.pem` no permite que el Agent recupere la conectividad con Datadog. En su lugar, haz lo siguiente:

* Agent v5 en Windows, `>= 5.12.0`: reemplaza el archivo `datadog-cert.pem` con la versión que se incluye en 5.32.7. Si usas la interfaz de línea de comandos de PowerShell:

```shell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/DataDog/dd-agent/5.32.7/datadog-cert.pem" -OutFile "C:\Program Files\Datadog\Datadog Agent\agent\datadog-cert.pem"
restart-service -Force datadogagent
```

* Agent v5 de Windows, `<= 5.11.x`: establece la siguiente opción en `datadog.conf` utilizando el programa `Datadog Agent Manager` que viene con el Agent o editando directamente el archivo `datadog.conf`:
  * Windows de 64 bits: `ca_certs: C:\Program Files (x86)\Datadog\Datadog Agent\files\ca-certificates.crt`
  * Windows de 32 bits: `ca_certs: C:\Program Files\Datadog\Datadog Agent\files\ca-certificates.crt`

  Una vez que se haya actualizado `datadog.conf`, reinicia el servicio de Datadog desde el administrador de servicios de Windows.


[1]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.msi
[2]: https://app.datadoghq.com/account/settings?agent_version=5#agent
[3]: /es/agent/versions/upgrade_to_agent_v7/?tab=linux#from-agent-v5-to-agent-v7
[4]: /es/agent/versions/upgrade_to_agent_v6/?tab=linux
