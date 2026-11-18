---
aliases:
- /es/synthetics/private_locations/configuration
description: Configure sus ubicaciones privadas.
further_reading:
- link: getting_started/synthetics/private_location
  tag: Documentación
  text: Introducción a Private Locations
- link: synthetics/private_locations/dimensioning
  tag: Documentación
  text: Dimensione sus ubicaciones privadas
- link: synthetics/platform/private_locations/network_security
  tag: Documentación
  text: Fortalecimiento de la seguridad de red de Private Location
title: Configuración de Private Locations
---
## Descripción general {#overview}

<div class="alert alert-warning">Las nuevas ubicaciones privadas bloquean rangos de IP reservados de forma predeterminada. Las ubicaciones privadas con archivos de configuración más antiguos no restringen el acceso saliente a la red a menos que configure esa restricción. Para revisar y restringir el acceso, consulte <a href="/synthetics/platform/private_locations/network_security">Fortalecimiento de la seguridad de red de Private Location</a>.</div>

Las ubicaciones privadas sintéticas vienen con un conjunto de opciones que puede configurar para que coincidan con los requisitos de su entorno. Todas las opciones para el [worker de ubicación privada][1] se pueden encontrar ejecutando el comando `help`:

{{< tabs >}}
{{% tab "Docker" %}}

```shell
docker run --rm datadog/synthetics-private-location-worker --help
```
{{% /tab %}}
{{% tab "Windows" %}}

```
synthetics-pl-worker.exe --help
```
{{% /tab %}}
{{% tab "Kubernetes" %}}

Consulte el ejemplo en el [repositorio de Helm de Datadog][1].

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location

{{% /tab %}}
{{< /tabs >}}

## Personalice su ubicación privada {#customize-your-private-location}
Los parámetros disponibles se enumeran a continuación.
Estas opciones de configuración para ubicaciones privadas pueden pasarse como **parámetros a su archivo de configuración JSON** o como **argumentos en el comando de lanzamiento**, por ejemplo:

{{< tabs >}}
{{% tab "Docker" %}}

```shell
docker run -d --restart always -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest --logFormat=json
```
{{% /tab %}}
{{% tab "Windows" %}}

```cmd
synthetics-pl-worker.exe --config=<PathToYourConfiguration> --logFormat=json
```
{{% /tab %}}
{{< /tabs >}}

Los argumentos establecidos en el comando de lanzamiento tienen prioridad sobre el archivo de configuración. Sin embargo, estas opciones no se almacenan y, por consiguiente, solo son relevantes para un lanzamiento determinado.

## Opciones de configuración principales {#top-configuration-options}

### Configuración del sitio de Datadog {#datadog-site-configuration}

`site`
: **Tipo**: Cadena <br>
**Predeterminado**: `datadoghq.com`<br>
Sitio de Datadog desde el cual la ubicación privada extrae la configuración de la prueba y envía los resultados de la prueba. Su `site` es {{< region-param key="dd_site" code="true" >}}.

### Configuración de DNS {#dns-configuration}

Los siguientes parámetros se pueden utilizar para personalizar la resolución DNS en sus pruebas de API:

`dnsUseHost`
: **Tipo**: Booleano <br>
**Predeterminado**: `true`<br>
Utilice primero la configuración DNS local del servidor (por ejemplo, la configuración de su archivo `etc/resolv.conf`), luego los servidores DNS especificados en el parámetro `dnsServer`.

`dnsServer`
: **Tipo**: Matriz de cadenas <br>
**Predeterminado**: `["8.8.8.8","1.1.1.1"]`<br>
Direcciones IP de los servidores DNS que se utilizarán en el orden indicado (por ejemplo, `--dnsServer="8.8.4.4" --dnsServer="8.8.8.8"`).

En las pruebas de navegador, la resolución DNS la realiza directamente el navegador, que normalmente lee los servidores DNS del servidor. También puede configurar la resolución DNS a nivel de contenedor (por ejemplo, con la opción `--dns` en [Docker][1] o `dnsConfig.nameservers` en [Kubernetes][2]).

### Configuración de proxy {#proxy-configuration}

Los siguientes parámetros se pueden utilizar para configurar un proxy para conectarse a Datadog:

`proxyDatadog`
: **Tipo**: Cadena <br>
**Predeterminado**: `none`<br>
URL de proxy utilizada por la ubicación privada para enviar solicitudes a Datadog (por ejemplo, `--proxyDatadog=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).

`proxyIgnoreSSLErrors`
: **Tipo**: Booleano <br>
**Predeterminado**: `false`<br>
Descartar errores de SSL cuando la ubicación privada utiliza un proxy para enviar solicitudes a Datadog.

`proxyEnableConnectTunnel`
: **Tipo**: Booleano <br>
**Predeterminado**: `none`<br>
Habilitar la tunelización `HTTP CONNECT` para los proxies HTTP. Cuando esta opción no está configurada, la tunelización `HTTP CONNECT` solo se utiliza para proxies HTTPS.

**Nota:** Los proxies de reenvío HTTP como Squid pueden requerir la solicitud `HTTP CONNECT` para establecer la conexión TCP inicial entre la ubicación privada y Datadog. Por lo tanto, el parámetro `proxyEnableConnectTunnel` debe establecerse en `true`. Sin embargo, los proxies inversos como HAProxy que dirigen una solicitud `HTTP CONNECT` a Datadog podrían no funcionar con esta opción habilitada.

**Nota:** El parámetro `proxy` está obsoleto y debe reemplazarse por `proxyDatadog`.

Los siguientes parámetros se pueden usar para configurar un proxy predeterminado para las pruebas de Synthetic Monitoring:

`proxyTestRequests`
: **Tipo**: Cadena <br>
**Predeterminado**: `none`<br>
URL del proxy utilizada por la ubicación privada para enviar solicitudes de prueba al punto de conexión. Esto admite HTTP(S), SOCKS y archivos PAC con la siguiente sintaxis: `pac+http://...`, `pac+https://...`, `pac+file://...` o `pac+data:...`.

`proxyTestRequestsBypassList`
: **Tipo**: Matriz de cadenas <br>
**Predeterminado**: `none`<br>
Servidores para los cuales no se utiliza el proxy definido con `proxyTestRequests`, por ejemplo: `--proxyTestRequestsBypassList="example.org" --proxyTestRequestsBypassList="*.com"`.

### Configuración avanzada {#advanced-configuration}

`concurrency`
: **Tipo**: Número <br>
**Predeterminado**: `10`<br>
Número máximo de pruebas ejecutadas en paralelo.

`maxNumberMessagesToFetch`
: **Tipo**: Número <br>
**Predeterminado**: `10`<br>
Número máximo de pruebas obtenidas de Datadog.

`maxAPIDownloadBodySize`
: **Tipo**: Número <br>
**Predeterminado**: `52428800`<br>
Tamaño máximo del cuerpo HTTP para una descarga, en bytes. El valor predeterminado es 50 MB (50 * 1024 * 1024).

`maxAPIBodySizeIfProcessed`
: **Tipo**: Número <br>
**Predeterminado**: `5242880`<br>
Tamaño máximo del cuerpo HTTP para una aserción, en bytes. El valor predeterminado es 5 MB (5 * 1024 * 1024).

`apiRequestMaxTimeout`
: **Tipo**: Número <br>
**Predeterminado**: `60000`<br>
Duración máxima para la ejecución de pruebas de API, en milisegundos. El valor predeterminado es un minuto (60 * 1000).

**Nota**: Los contenedores de Private Location envían registros a `stdout` y `stderr` sin guardarlos dentro del contenedor.

### Configuración de seguridad de red {#network-security-configuration}

Una ubicación privada puede acceder a cualquier dirección de red a la que pueda acceder su servidor, a menos que su configuración restrinja la salida. Los archivos de configuración generados para nuevas ubicaciones privadas establecen `enableDefaultBlockedIpRanges` en `true`. El valor predeterminado del worker es `false`. Restrinja la salida con las siguientes opciones:

`allowedIPRanges`, `blockedIPRanges`, `enableDefaultBlockedIpRanges`, `allowedDomainNames`, `blockedDomainNames`

Datadog recomienda que mantenga `enableDefaultBlockedIpRanges` configurado en `true` y permita solo las direcciones que sus pruebas necesiten. Para obtener configuraciones y ejemplos recomendados, consulte [Fortalecimiento de la seguridad de red de Private Location][6].

## Todas las opciones de configuración {#all-configuration-options}

`--accessKey`
: **Tipo**: Cadena <br>
**Predeterminado**: `none`<br>
Clave de acceso para la autenticación de Datadog API.

`--secretAccessKey`
: **Tipo**: Cadena <br>
**Predeterminado**: `none`<br>
Clave de acceso secreta para la autenticación de Datadog API.

`--datadogApiKey`
: **Tipo**: Cadena <br>
**Predeterminado**: `none`<br>
Clave de API para la Datadog API que se utiliza para enviar artefactos de pruebas de navegador (como capturas de pantalla).

`--privateKey`
: **Tipo**: Arreglo <br>
**Predeterminado**: `none`<br>
Clave privada utilizada para descifrar las configuraciones de prueba.

`--publicKey`
: **Tipo**: Arreglo <br>
**Predeterminado**: `none`<br>
Clave pública utilizada por Datadog para cifrar los resultados de las pruebas. Compuesta por `--publicKey.pem`.

`--site`
: **Tipo**: Cadena <br>
**Predeterminado**: `datadoghq.com`<br>
Sitio de Datadog desde el cual la ubicación privada extrae la configuración de la prueba y envía los resultados de la prueba. Su sitio es {{< region-param key="dd_site" code="true" >}}.

`--concurrency`
: **Tipo**: Número <br>
**Predeterminado**: `10`<br>
Número máximo de pruebas ejecutadas en paralelo.

`--maxNumberMessagesToFetch`
: **Tipo**: Número <br>
**Predeterminado**: `10`<br>
Número máximo de pruebas obtenidas de Datadog.

`--proxyDatadog`
: **Tipo**: Cadena <br>
**Predeterminado**: `none`<br>
URL de proxy utilizada por la ubicación privada para enviar solicitudes a Datadog (por ejemplo, `--proxyDatadog=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).

`--dumpConfig`
: **Tipo**: Booleano <br>
**Predeterminado**: `none`<br>
Muestre los parámetros de configuración del worker sin secretos.

`--enableStatusProbes`
: **Tipo**: Booleano <br>
Habilita las comprobaciones del estado de preparación y de actividad de las sondas de la ubicación privada. Esto habilita dos puntos de conexión: `http://127.0.0.1:8080/liveness` y `http://127.0.0.1:8080/readiness`.

`--statusProbesPort`
: **Tipo**: Número <br>
**Predeterminado**: `8080`<br>
Anula el puerto para las sondas de estado de la ubicación privada.

`--config`
: **Tipo**: Cadena <br>
**Predeterminado**: `/etc/datadog/synthetics-check-runner.json`</br>
**Windows**: `C:\ProgramData\Datadog-Synthetics\worker-config.json`</br>
Ruta al archivo de configuración JSON.

`--proxyTestRequests`
: **Tipo**: Cadena <br>
**Predeterminado**: `none`<br>
URL del proxy utilizada por la ubicación privada para enviar solicitudes de prueba al punto de conexión. Los archivos PAC son compatibles con la siguiente sintaxis: `pac+https://...` o `pac+http://...`.

`proxyTestRequestsBypassList`
: **Tipo**: Arreglo de cadenas <br>
**Predeterminado**: `none`<br>
Servidores para los cuales no se utiliza el proxy definido con `proxyTestRequests`, por ejemplo: `--proxyTestRequestsBypassList="example.org" --proxyTestRequestsBypassList="*.com"`.

`--proxyIgnoreSSLErrors`
: **Tipo**: Booleano <br>
**Predeterminado**: `false`<br>
Ignore los errores de SSL cuando la ubicación privada utilice un proxy para enviar solicitudes a Datadog.

`--dnsUseHost`
: **Tipo**: Booleano <br>
**Predeterminado**: `true`<br>
Utilice primero la configuración de DNS local del servidor (por ejemplo, la configuración de su archivo `etc/resolv.conf`), luego los servidores DNS especificados en el parámetro `dnsServer`.

`--dnsServer`
: **Tipo**: Arreglo de cadenas <br>
**Predeterminado**: `["8.8.8.8","1.1.1.1"]`<br>
Direcciones IP de los servidores DNS que se utilizarán en el orden indicado (por ejemplo, `--dnsServer="8.8.4.4" --dnsServer="8.8.8.8"`).

`--variableOverride`
: **Tipo**: Cadena <br>
Anula las variables utilizadas en las pruebas que se ejecutan en Private Location. Formato: `VARIABLE=value`.
Todas las variables importadas de esta manera están ofuscadas.

`--environmentVariableOverride`
: **Tipo**: Cadena <br>
Anula las variables utilizadas en las pruebas que se ejecutan en Private Location con variables de entorno. Requiere que las variables de entorno se importen en el entorno contenedorizado.
Con Docker, por ejemplo, `docker run --env VARIABLE gcr.io/datadoghq/synthetics-private-location-worker --environmentVariableOverride VARIABLE`.
Todas las variables importadas de esta manera están ofuscadas.

`--retryAPIErrors`
: **Tipo**: Booleano <br>
**Predeterminado**: `false`<br>
Vuelva a intentar las pruebas de API ante cualquier error

`--allowedIPRanges`
: **Tipo**: Arreglo de cadenas <br>
**Predeterminado**: `none`<br>
Otorgue acceso a IPs y/o CIDR específicos entre los rangos de IP bloqueados a través de `--enableDefaultBlockedIpRanges` o `blockedIPRanges` (por ejemplo, `"allowedIPRanges.4": "10.0.0.0/8"`). **Nota:** `allowedIPRanges` tiene prioridad sobre `blockedIPRanges`. Consulte [Refuerzo de Security de la red de ubicaciones privadas][6].

`--blockedIPRanges`
: **Tipo**: Arreglo de cadenas <br>
**Predeterminado**: `none`<br>
Bloquee el acceso a direcciones IP o bloques CIDR específicos, independientemente de si también se bloquean rangos de IP al establecer el parámetro `--enableDefaultBlockedIpRanges` en `true` (por ejemplo, `--blockedIPRanges.4="127.0.0.0/8" --blockedIPRanges.6="::1/128"`). Un nombre de dominio permitido, establecido con el parámetro `--allowedDomainNames`, omite los rangos de IP bloqueados por `--blockedIPRanges`. Consulte [Refuerzo de Security de la red de ubicaciones privadas][6].

`--enableDefaultBlockedIpRanges`
: **Tipo**: Booleano <br>
**Predeterminado**: `false`<br>
Evite que los usuarios creen pruebas Synthetic en puntos de conexión que utilizan rangos de IP reservados (Registro de direcciones de propósito especial [IPv4][4] e [IPv6][5] de IANA), excepto para aquellos establecidos explícitamente con los parámetros `--allowedIPRanges` o `--allowedDomainNames`. Los archivos de configuración generados para nuevas ubicaciones privadas establecen este parámetro en `true`. El valor predeterminado del worker es `false`. Consulte [Refuerzo de Security de la red de ubicaciones privadas][6].

`--allowedDomainNames`
: **Tipo**: Arreglo <br>
**Predeterminado**: `none`<br>
Otorgue acceso a nombres de dominio en la prueba. Tiene prioridad sobre `--blockedDomainNames`, por ejemplo: `--allowedDomainNames="*.example.com"`. Los nombres de dominio coinciden con el nombre de host completo y admiten el comodín `*`. Un nombre de dominio permitido omite la lista de bloqueo de IP, incluidos los rangos de IP reservados bloqueados por `--enableDefaultBlockedIpRanges`. Consulte [Refuerzo de Security de la red de ubicaciones privadas][6].

`--blockedDomainNames`
: **Tipo**: Arreglo <br>
**Predeterminado**: `none`<br>
Deniegue el acceso a nombres de dominio en las pruebas, por ejemplo: `--blockedDomainNames="example.org" --blockedDomainNames="*.com"`. Consulte [Refuerzo de Security de la red de ubicaciones privadas][6].

`--enableIPv6`
: **Tipo**: Booleano <br>
**Predeterminado**: `false`<br>
Use IPv6 para realizar pruebas. **Nota**: IPv6 en Docker solo es compatible con un servidor Linux.

`--version`
: **Tipo**: Booleano <br>
**Predeterminado**: `none`<br>
Muestre el número de versión del worker.

`--logFormat`
: **Tipo**: Cadena <br>
**Predeterminado**: `pretty`<br>
Dé formato a la salida de los registros en `"compact"`, `"pretty"`, `"pretty-compact"` o `"json"`. Configurar el formato de los registros como `json` permite que estos se analicen automáticamente cuando Datadog los recopile.

`--verbosity`
: **Tipo**: Número <br>
**Predeterminado**: `3`<br>
Nivel de verbosidad desde `1` (solo errores) hasta `4` (registros de depuración y superiores). La configuración de la verbosidad desde la línea de comandos se realiza con los argumentos `-v`, `-vv`, `-vvv` y `-vvvv`.<br><br>
Nivel de verbosidad | Argumento de CLI | Opción de configuración JSON
-- | -- | --
DEBUG | `-vvvv` | `"verbosity": 4`
INFO (predeterminado) | `-vvv` | `"verbosity": 3`
WARNING | `-vv` | `"verbosity": 2`
ERROR | `-v` | `"verbosity": 1`

`--help`
: **Tipo**: Booleano <br>
**Predeterminado**: `none`<br>
Muestre la salida del comando de ayuda.

## Variables de entorno {#environment-variables}
Las opciones de comando también se pueden establecer mediante variables de entorno como `DATADOG_API_KEY="...", DATADOG_WORKER_CONCURRENCY="15", DATADOG_TESTS_DNS_USE_HOST="true"`. Para las opciones que aceptan múltiples argumentos, utilice la notación de matriz de cadenas JSON (`DATADOG_TESTS_DNS_SERVER='["8.8.8.8", "1.1.1.1"]'`)
### Variables de entorno admitidas: {#supported-environment-variables}
`DATADOG_ACCESS_KEY`, `DATADOG_API_KEY`, `DATADOG_PRIVATE_KEY`, `DATADOG_PUBLIC_KEY_PEM`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_SITE`, `DATADOG_WORKER_CONCURRENCY`, `DATADOG_WORKER_LOG_FORMAT`, `DATADOG_WORKER_LOG_VERBOSITY`, `DATADOG_WORKER_MAX_NUMBER_MESSAGES_TO_FETCH`, `DATADOG_WORKER_PROXY`, `DATADOG_TESTS_DNS_SERVER`, `DATADOG_TESTS_DNS_USE_HOST`, `DATADOG_TESTS_PROXY`, `DATADOG_TESTS_PROXY_ENABLE_CONNECT_TUNNEL`, `DATADOG_TESTS_PROXY_IGNORE_SSL_ERRORS`, `DATADOG_ALLOWED_IP_RANGES_4`, `DATADOG_ALLOWED_IP_RANGES_6`, `DATADOG_BLOCKED_IP_RANGES_4`, `DATADOG_BLOCKED_IP_RANGES_6`, `DATADOG_ENABLE_DEFAULT_WINDOWS_FIREWALL_RULES`, `DATADOG_ALLOWED_DOMAIN_NAMES`, `DATADOG_BLOCKED_DOMAIN_NAMES`, `DATADOG_WORKER_ENABLE_STATUS_PROBES`, `DATADOG_WORKER_STATUS_PROBES_PORT`

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[2]: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config
[3]: https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4282
[4]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[5]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml
[6]: /es/synthetics/platform/private_locations/network_security