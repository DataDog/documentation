---
aliases:
- /es/synthetics/private_locations/configuration
description: Configura tus localizaciones privadas.
further_reading:
- link: getting_started/synthetics/private_location
  tag: Documentación
  text: Empezando con las localizaciones privadas
- link: synthetics/private_locations/dimensioning
  tag: Documentación
  text: Dimensionar tus localizaciones privadas
title: Configuración de las localizaciones privadas
---

## Información general

Las localizaciones privadas Synthetic incluyen un conjunto de opciones que puedes configurar para que cumplan los requisitos de tu entorno. Si ejecutas el comando `help`, encontrarás todas las opciones del [worker de localización privada][1]:

{{< tabs >}}
{{% tab "Docker" %}}

```shell
docker run --rm datadog/synthetics-private-location-worker --help
```
{{% /tab %}}
{{% tab "Windows" %}}
```
synthetics-private-location.exe --help
```
{{% /tab %}}
{{< /tabs >}}

## Personalización de tu localización privada
A continuación se enumeran los parámetros disponibles.
Estas opciones de configuración para localizaciones privadas se pueden pasar como **parámetros a la configuración de tu archivo JSON** o como **argumentos en el comando de lanzamiento**, por ejemplo:

{{< tabs >}}
{{% tab "Docker" %}}
```shell
docker run --rm -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest --logFormat=json
```
{{% /tab %}}
{{% tab "Windows" %}}
```cmd
synthetics-private-location.exe --config=<PathToYourConfiguration> --logFormat=json
```
{{% /tab %}}
{{< /tabs >}}

Los argumentos definidos en el comando de lanzamiento tienen prioridad sobre el archivo de configuración. Sin embargo, estas opciones no se almacenan y, en consecuencia, solo son aplicables a un lanzamiento determinado.

## Principales opciones de configuración

### Configuración del sitio Datadog

`site`
: **Tipo**: Cadena <br>
**Por defecto**: `datadoghq.com`<br>
El sitio Datadog desde el que la localización privada extrae la configuración del test y envía los resultados del mismo. Tu `site` es {{< region-param key="dd_site" code="true" >}}.

### Configuración de DNS

Puedes utilizar los siguientes parámetros para personalizar la resolución DNS en tus tests de API:

`dnsUseHost`
: **Tipo**: Booleano <br>
**Por defecto**: `true`<br>
Utiliza primero la configuración de DNS local del host (por ejemplo, la configuración de tu archivo `etc/resolv.conf``), y después los servidores DNS especificados en el parámetro `dnsServer`.

`dnsServer`
: **Tipo**: Matriz de cadenas <br>
**Por defecto**: `["8.8.8.8","1.1.1.1"]`<br>
IP de servidores DNS que se deben utilizar en el orden indicado (por ejemplo, `--dnsServer="8.8.4.4" --dnsServer="8.8.8.8"`).

En los tests de navegador, la resolución DNS la realiza directamente el navegador, que normalmente lee los servidores DNS del host. Como alternativa, puedes configurarlo a nivel de contenedor (por ejemplo, utilizando el indicador `--dns` en [Docker][1] o `dnsConfig.nameservers` en [Kubernetes][2]).

### Configuración de proxy

Los siguientes parámetros pueden utilizarse para configurar un proxy para conectarse a Datadog:

`proxyDatadog`
: **Tipo**: Cadena <br>
**Por defecto**: `none`<br>
URL de proxy utilizada por la localización privada para enviar solicitudes a Datadog (por ejemplo, `--proxyDatadog=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).

`proxyIgnoreSSLErrors`
: **Tipo**: Booleano <br>
**Por defecto**: `false`<br>
Descarta errores SSL cuando una localización privada está utilizando un proxy para enviar solicitudes a Datadog.

`proxyEnableConnectTunnel`
: **Tipo**: Booleano <br>
**Por defecto**: `none`<br>
Habilita la tunelización `HTTP CONNECT` para proxies HTTP. Si esta opción no está configurada, la tunelización `HTTP CONNECT` sólo se utiliza para proxies HTTPS.

**Nota:** Las proxies de envío HTTP como Squid pueden requerir la solicitud `HTTP CONNECT` para establecer la conexión TCP inicial entre la localización privada y Datadog. Por lo tanto, el parámetro `proxyEnableConnectTunnel` debe configurarse como `true`. Sin embargo, las proxies inversas como HAProxy que dirigen una solicitud `HTTP CONNECT` a Datadog pueden no funcionar con esta opción habilitada.

**Nota:** El parámetro `proxy` está obsoleto y debe sustituirse por `proxyDatadog`.

Los siguientes parámetros se pueden utilizar para configurar un proxy predeterminado para utilizarlo en los tests de monitorización Synthetic:

`proxyTestRequests`
: **Tipo**: Cadena <br>
**Por defecto**: `none`<br>
URL de proxy utilizada por la localización privada para enviar solicitudes de test al endpoint. Los archivos PAC son compatibles con la siguiente sintaxis: `pac+https://...` o `pac+http://...`.

### Configuración avanzada

`concurrency`
: **Tipo**: Número <br>
**Por defecto**: `10`<br>
Número máximo de tests ejecutados en paralelo.

`maxNumberMessagesToFetch`
: **Tipo**: Número <br>
**Por defecto**: `10`<br>
Número máximo de tests recuperados de Datadog.

**Nota**: Los contenedores de localizaciones privadas envían logs a `stdout` y `stderr` sin guardarlos en el contenedor.

## Todas las opciones de configuración 

`--accessKey`
: **Tipo**: Cadena <br>
**Por defecto**: `none`<br>
Clave de acceso para la autenticación de la API Datadog.

`--secretAccessKey`
: **Tipo**: Cadena <br>
**Por defecto**: `none`<br>
Clave de acceso secreta para la autenticación de la API Datadog.

`--datadogApiKey`
: **Tipo**: Cadena <br>
**Por defecto**: `none`<br>
Clave de la API Datadog para enviar artefactos de tests de navegador (como capturas de pantalla).

`--privateKey`      
: **Tipo**: Matriz <br>
**Por defecto**: `none`<br>
Clave privada utilizada para descifrar configuraciones de test.

`--publicKey`
: **Tipo**: Matriz <br>
**Por defecto**: `none`<br>
Clave pública utilizada por Datadog para cifrar los resultados de tests. Compuesta por `--publicKey.pem`.

`--site`
: **Tipo**: Cadena <br>
**Por defecto**: `datadoghq.com`<br>
Sitio Datadog desde el que la localización privada extrae la configuración del test y envía los resultados del test. Tu sitio es {{< region-param key="dd_site" code="true" >}}.

`--concurrency`
: **Tipo**: Número <br>
**Por defecto**: `10`<br>
Número máximo de tests ejecutados en paralelo.

`--maxNumberMessagesToFetch`
: **Tipo**: Número <br>
**Por defecto**: `10`<br>
Número máximo de tests recuperados de Datadog.

`--proxyDatadog`
: **Tipo**: Cadena <br>
**Por defecto**: `none`<br>
URL de proxy utilizada por la localización privada para enviar solicitudes a Datadog (por ejemplo, `--proxyDatadog=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).

`--disableFipsCompliance`
: **Tipo:** Booleano <br>
**Por defecto**: `false`<br>
Deshabilita la conformidad FIPS para una localización privada que utiliza `ddog-gov.com`.
Por defecto, las localizaciones privadas que informan a `ddog-gov.com` se comunican con Datadog utilizando el cifrado conforme a FIPS. La comunicación cumple con el uso de FIPS 140-2 validado [Módulo criptográfico - Certificado #4282][3]. Esta opción es necesaria si estás utilizando una localización Windows privada que informa a `ddog-gov.com`.

`--dumpConfig`
: **Tipo**: Booleano <br>
**Por defecto**: `none`<br>
Muestra los parámetros de configuración del worker sin secretos.

`--enableStatusProbes`
: **Tipo**: Booleano <br>
Habilita la disponibilidad y la preparación de las sondas de localizaciones privadas. Esto habilita dos endpoints: `http://127.0.0.1:8080/liveness` y `http://127.0.0.1:8080/readiness`.

`--statusProbesPort`
: **Tipo**: Número <br>
**Por defecto**: `8080`<br>
Anula el puerto para las sondas de estado de localizaciones privadas.

`--config`
: **Tipo**: Cadena <br>
**Por defecto**: `/etc/datadog/synthetics-check-runner.json`</br>
**Windows**: `C:\ProgramData\Datadog-Synthetics\worker-config.json`</br>
Ruta de acceso al archivo de configuración JSON.

`--proxyTestRequests`
: **Tipo**: Cadena <br>
**Por defecto**: `none`<br>
URL de proxy utilizada por la localización privada para enviar solicitudes de test al endpoint. Los archivos PAC son compatibles con la siguiente sintaxis: `pac+https://...` o `pac+http://...`.

`--proxyIgnoreSSLErrors`
: **Tipo**: Booleano <br>
**Por defecto**: `false`<br>
Descarta errores SSL cuando una localización privada está utilizando un proxy para enviar solicitudes a Datadog.

`--dnsUseHost`
: **Tipo**: Booleano <br>
**Por defecto**: `true`<br>
Primero utiliza la configuración DNS local del host (por ejemplo, la configuración de tu archivo `etc/resolv.conf`) y luego los servidores DNS especificados en el parámetro `dnsServer`.

`--dnsServer`
: **Tipo**: Matriz de cadenas <br>
**Por defecto**: `["8.8.8.8","1.1.1.1"]`<br>
IP de servidores DNS a utilizar en el orden dado (por ejemplo, `--dnsServer="8.8.4.4" --dnsServer="8.8.8.8"`).

`--variableOverride`
: **Tipo**: Cadena <br>
Anula las variables utilizadas en los tests que se ejecutan en la localización privada. Formato: `VARIABLE=value`.
Todas las variables importadas de esta forma están ofuscadas.

`--environmentVariableOverride`
: **Tipo**: Cadena <br>
Anula las variables utilizadas en los tests que se ejecutan en la localización privada con variables de entorno.
Requiere que las variables de entorno sean importadas en el entorno contenedorizado.
Con Docker, por ejemplo, `docker run --env VARIABLE gcr.io/datadoghq/synthetics-private-location-worker --environmentVariableOverride VARIABLE`.
Todas las variables importadas de esta manera están ofuscadas. 

`--allowedIPRanges`
: **Tipo**: Matriz de cadenas <br>
**Por defecto**: `none`<br>
Concede acceso a IP o CIDR específicos entre los rangos de IP bloqueados a través de `--enableDefaultBlockedIpRanges` o `blockedIPRanges` (por ejemplo, `"allowedIPRanges.4": "10.0.0.0/8"`). **Nota:** `allowedIPRanges` tiene prioridad sobre `blockedIPRanges`.

`--blockedIPRanges`
: **Tipo**: Matriz de cadenas <br>
**Por defecto**: `none`<br>
Bloquea el acceso a IP o CIDR específicos, además o no de los rangos de IP bloqueados al configurar el parámetro `--enableDefaultBlockedIpRanges` como `true` (por ejemplo, `--blockedIPRanges.4="127.0.0.0/8" --blockedIPRanges.6="::1/128"`).

`--enableDefaultBlockedIpRanges`
: **Tipo**: Booleano <br>
**Por defecto**: `false`<br>
Evita que los usuarios creen tests Synthetic en endpoints que están utilizando rangos de IP reservados (Registro de Direcciones de Propósito Especial de IANA [IPv4][4] e [IPv6][5]), excepto aquellos explícitamente definidos con el parámetro `--allowedIPRanges`.

`--nombresDominioPermitidos`
: **Tipo**: Matriz <br>
**Por defecto**: `none`<br>
Concede acceso a los nombres de dominio en tests. Tiene prioridad sobre --blockedDomainNames, por ejemplo: `--allowedDomainNames="*.example.com"`.

`--blockedDomainNames`
: **Tipo**: Matriz <br>
**Por defecto**: `none`<br>
Deniega el acceso a nombres de dominio en tests, por ejemplo: `--blockedDomainNames="ejemplo.org" --blockedDomainNames="*.com"`.

`--habilitarIPv6`
: **Tipo**: Booleano <br>
**Por defecto**: `false`<br>
Utiliza IPv6 para realizar tests. **Nota**: IPv6 en Docker sólo es compatible con un host Linux.

`--version`
: **Tipo**: Booleano <br>
**Por defecto**: `none`<br>
Muestra el número de versión del worker.

`--logFormat`
: **Tipo**: Cadena <br>
**Por defecto**: `pretty`<br>
Da un formato al resultado del log entre `"compact"`, `"pretty"`, `"pretty-compact"` y `"json"`. Definir el formato del log como `json` permite que estos logs sean analizados automáticamente cuando son recopilados por Datadog.

`--verbosidad`
: **Tipo**: Número <br>
**Por defecto**: `3`<br>
Nivel de verbosidad desde `1` (sólo errores) hasta `4` (logs de depuración y superiores). La configuración de la verbosidad desde la línea de comandos se realiza con los argumentos `-v`, , `-vvvv` y `-vvvv`.<br><br>
Nivel de verbosidad | Argumento CLI | Opción de configuración JSON
-- | -- | --
DEPURACIÓN | `-vvvv` | `"verbosity": 4`
INFORMACIÓN (por defecto) | `-vvv` | `"verbosity": 3`
ADVERTENCIA | `-vv` | `"verbosity": 2`
ERROR | `-v` | `"verbosity": 1`

`--help`
: **Tipo**: Booleano <br>
**Por defecto**: `none`<br>
Muestra el resultado del comando de ayuda.

## Variables de entorno
Las opciones de comandos también pueden definirse utilizando variables de entorno como `DATADOG_API_KEY="...", DATADOG_WORKER_CONCURRENCY="15", DATADOG_DNS_USE_HOST="true"`. Para las opciones que aceptan múltiples argumentos, utiliza la notación de la matriz de cadenas JSON (`DATADOG_TESTS_DNS_SERVER='["8.8.8.8", "1.1.1.1"]'`).
### Variables de entorno compatibles:
`DATADOG_ACCESS_KEY`, `DATADOG_API_KEY`, `DATADOG_PRIVATE_KEY`, `DATADOG_PUBLIC_KEY_PEM`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_SITE`, `DATADOG_WORKER_CONCURRENCY`, `DATADOG_WORKER_LOG_FORMAT`, `DATADOG_WORKER_LOG_VERBOSITY`, `DATADOG_WORKER_MAX_NUMBER_MESSAGES_TO_FETCH`, `DATADOG_WORKER_PROXY`, `DATADOG_TESTS_DNS_SERVER`, `DATADOG_TESTS_DNS_USE_HOST`, `DATADOG_TESTS_PROXY`, `DATADOG_TESTS_PROXY_ENABLE_CONNECT_TUNNEL`, `DATADOG_TESTS_PROXY_IGNORE_SSL_ERRORS`, `DATADOG_ALLOWED_IP_RANGES_4`, `DATADOG_ALLOWED_IP_RANGES_6`, `DATADOG_BLOCKED_IP_RANGES_4`, `DATADOG_BLOCKED_IP_RANGES_6`, `DATADOG_ENABLE_DEFAULT_WINDOWS_FIREWALL_RULES`, `DATADOG_ALLOWED_DOMAIN_NAMES`, `DATADOG_BLOCKED_DOMAIN_NAMES`, `DATADOG_WORKER_ENABLE_STATUS_PROBES`, `DATADOG_WORKER_STATUS_PROBES_PORT`

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[2]: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config
[3]: https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4282
[4]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[5]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml