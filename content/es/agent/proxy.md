---
aliases:
- /es/account_management/faq/can-i-use-a-proxy-to-connect-my-servers-to-datadog/
further_reading:
- link: /logs/
  tag: Documentación
  text: Recopilar tus logs
- link: /infrastructure/process/
  tag: Documentación
  text: Recopilar tus procesos
- link: /tracing/
  tag: Documentación
  text: Recopilar tus trazas y perfiles
kind: documentación
title: Configuración del proxy del Agent
---

## Información general

Si tu configuración de red restringe el tráfico de salida, redirige mediante proxy todo el tráfico del Agent a través de uno o varios hosts que tengan políticas de salida más permisivas.

En el caso de los hosts que no están directamente conectados a Internet, se puede enviar tráfico a Datadog a través de SSL/TLS de las siguientes maneras:

1. Usando un proxy web, como Squid o Microsoft Web Proxy, que ya esté desplegado en tu red
2. Usando HAProxy (en caso de que quieras redirigir **más de 16-20 Agents** mediante el mismo proxy)
3. Usando el Agent como un proxy (para **un máximo de 16 Agents** por proxy y **solo con Agent v5**)

## Proxy web

Para obtener información concreta sobre Squid, consulta la sección [Squid](#squid) de esta página.

El Agent es compatible de forma nativa con los proxies web tradicionales. Si necesitas conectarte a Internet mediante un proxy, edita tu archivo de configuración del Agent.

**Agent v6 y v7**

Configura varios servidores proxy para solicitudes `https` y `http` en tu archivo de configuración `datadog.yaml` del Agent. El Agent utiliza `https` para enviar datos a Datadog, pero cabe la posibilidad de que las integraciones utilicen `http` para recopilar las métricas. Independientemente de las solicitudes que se redirijan mediante proxy, puedes activar el protocolo SSL en tu servidor proxy. A continuación, te mostramos algunos ejemplos de configuración que pueden servirte para tu archivo `datadog.yaml`.

<div class="alert alert-warning">
Si está habilitada la recopilación de logs, asegúrate de <a href="/agent/logs/log_transport?tab=https#enforce-a-specific-transport">exigir</a> un transporte específico.
Se recomienda usar HTTPS. En ese caso, el <code>&ltHOST&gt;:&ltPORT&gt;</code> que se usa para redirigir mediante proxy las métricas se usará también para redirigir los logs.
Si utilizas el transporte TCP, consulta la sección <a href="/agent/logs/proxy">Proxy TCP para logs</a>.
</div>

Cómo configurar un proxy HTTP para todas solicitudes `https`:

```yaml
proxy:
    https: "http://<SSL_PROXY_SERVER_FOR_HTTPS>:<PORT>"
```

Nota: Cuando se configura un proxy HTTP para hacer solicitudes `https`, se cifra de extremo a extremo la comunicación que tiene lugar entre el Agent y Datadog con TLS de tal forma que el proxy no pueda descifrarla. La única comunicación que no se cifra es la solicitud `HTTP CONNECT` que realizan el Agent y el proxy para establecer la conexión TCP inicial entre el Agent y Datadog. Por tanto, cuando se usa un proxy para hacer solicitudes `https`, no es necesario usar un proxy HTTPS para cifrar la comunicación entre el Agent y Datadog.

Cómo configurar un proxy HTTPS para las solicitudes `https` y `http`:

```yaml
proxy:
    https: "https://<SSL_PROXY_SERVER_FOR_HTTPS>:<PORT>"
    http: "https://<SSL_PROXY_SERVER_FOR_HTTP>:<PORT>"
```

Cómo configurar un `<USERNAME>` y `<PASSWORD>` para contactar con el servidor proxy y hacer tanto solicitudes `https` como `http`:

```yaml
proxy:
    https: "http://<USERNAME>:<PASSWORD>@<PROXY_SERVER_FOR_HTTPS>:<PORT>"
    http: "http://<USERNAME>:<PASSWORD>@<PROXY_SERVER_FOR_HTTP>:<PORT>"
```

Cómo usar la lista `no_proxy` para especificar qué hosts deben omitir el proxy:

```yaml
proxy:
    https: "http://<USERNAME>:<PASSWORD>@<PROXY_SERVER_FOR_HTTPS>:<PORT>"
    http: "http://<USERNAME>:<PASSWORD>@<PROXY_SERVER_FOR_HTTP>:<PORT>"
    no_proxy:
      - host1
      - host2
```

**Nota**: Todas las integraciones que hagan solicitudes HTTP(S) adoptarán por defecto la configuración del proxy que se define en el archivo de configuración `datadog.yaml` si no se especifica otra en la integración. Si no estás de acuerdo con esto, establece `skip_proxy` como "true" o `use_agent_proxy` como "false" en la configuración de cada instancia o en la reserva `init_config` de tu integración.

##### Valores aceptados NO_PROXY

Por defecto, `no_proxy`/`NO_PROXY` debe figurar tal cual en los endpoints de las solicitudes HTTP(S) del Agent (excepto en aquellas realizadas por integraciones del Agent). Se recomienda habilitar `no_proxy_nonexact_match` para que el Agent se ajuste a los valores `NO_PROXY` siguiendo las mismas reglas que se utilizan en las integraciones de Agent (consúltalas más abajo).

```yaml
no_proxy_nonexact_match: true
```

Las siguientes reglas se aplican a las integraciones del Agent (y a todo el Agent cuando `no_proxy_nonexact_match` está habilitado):
* El nombre de un dominio coincide con ese nombre y con todos los subdominios. Por ejemplo:
  - `datadoghq.com` coincide con `app.agent.datadoghq.com`, `www.datadoghq.com` y `datadoghq.com`, pero **no** con `www.notdatadoghq.com`
  - `datadoghq` coincide con `frontend.datadoghq` y `backend.datadoghq`, pero **no** con `www.datadoghq.com` ni `www.datadoghq.eu`
* El nombre de un dominio con un "." inicial solo coincide con los subdominios. Por ejemplo:
  - `.datadoghq.com` coincide con `app.agent.datadoghq.com`y `www.datadoghq.com`, pero **no** con `datadoghq.com`
* Un intervalo de enrutamiento de interdominios (CIDR) coincide con una dirección IP de la subred. Por ejemplo:
  - `192.168.1.0/24` coincide con el intervalo de IP `192.168.1.1` mediante `192.168.1.254`
* Una dirección IP exacta. Por ejemplo:
  - `169.254.169.254`
* Un nombre de host. Por ejemplo:
  - `webserver1`

#### Variables de entorno

Si utilizas la versión 6.4 del Agent (o una versión posterior), puedes ajustar la configuración de tu proxy mediante variables de entorno:

* `DD_PROXY_HTTPS`: Configura un servidor proxy para solicitudes `https`.
* `DD_PROXY_HTTP`: Configura un servidor proxy para solicitudes `http`.
* `DD_PROXY_NO_PROXY`: Configura una lista de hosts que, en circunstancias normales, omiten el proxy. Los elementos de la lista se separan entre sí con espacios.

Las variables de entorno tienen precedencia sobre los valores del archivo `datadog.yaml`. Si las variables de entorno presentan un valor vacío, como ``DD_PROXY_HTTP=""``, el Agent usará los valores vacíos en lugar de otras opciones secundarias.

En los hosts de Unix, existe la posibilidad de definir un proxy para todo el sistema mediante variables de entorno estándar, como `HTTPS_PROXY`, `HTTP_PROXY` y `NO_PROXY`. El Agent las usará siempre que estén presentes. Sin embargo, debes tener cuidado, ya que estas variables también influirán en las solicitudes de las integraciones, incluyendo las de orquestadores como Docker, ECS y Kubernetes.

El Agent utiliza los siguientes valores en orden de precedencia:

1. Variables de entorno `DD_PROXY_HTTPS`, `DD_PROXY_HTTP` y `DD_PROXY_NO_PROXY`
2. Variables de entorno `HTTPS_PROXY`, `HTTP_PROXY`, y `NO_PROXY`
3. Valores de `datadog.yaml`

**Agent v5**

<div class="alert alert-warning">
El <code>&ltHOST&gt;:&ltPORT&gt;</code> que se usa para redirigir mediante proxy las métricas NO se usará para redirigir los logs. Consulta la página <a href="/agent/logs/proxy">Proxy para logs</a>.
</div>

Edita el archivo `datadog.conf` con la información de tu proxy:

```text
# If you need a proxy to connect to the Internet, provide the settings here
proxy_host: my-proxy.example.com
proxy_port: 3128
proxy_user: my_user
proxy_password: my_password
```

No olvides [reiniciar el Agent][1] para que se aplique la nueva configuración.

### Squid

[Squid][2] es un proxy de reenvío para la web compatible con HTTP, HTTPS y FTP, entre otros protocolos. Funciona en la mayoría de los sistemas operativos disponibles, incluido Windows, y cuenta con la autorización de la Licencia Pública General de GNU. Squid es una opción sencilla si aún no tienes ningún proxy web configurado en tu red.

#### Reenvío mediante proxy con Squid

##### Configurar Squid solo para enviar tráfico a Datadog

Instala Squid en un host que tenga conectividad tanto con tus Agents internos como con Datadog. Utiliza el gestor de paquetes de tu sistema operativo o instala el software directamente desde la [página de proyectos de Squid][2].

Para configurar Squid, edita el archivo de configuración. Normalmente, este archivo se encuentra en `/etc/squid/squid.conf` en Linux o en `C:\squid\etc\squid.conf` en Windows.

Edita tu archivo de configuración `squid.conf` para que Squid pueda aceptar tráfico local y reenviarlo a las ingestas necesarias de Datadog:

```conf
http_port 0.0.0.0:3128

acl local src 127.0.0.1/32

acl Datadog dstdomain .{{< region-param key="dd_site" >}}

http_access allow Datadog
http_access allow local manager
```

##### Iniciar Squid

Inicia (o reinicia) Squid para que se apliquen tus nuevas configuraciones.

{{< tabs >}}
{{% tab "Linux" %}}

```bash
sudo systemctl start squid
```

Si Squid ya se está ejecutando, mejor reinícialo con el siguiente comando:

```bash
sudo systemctl restart squid
```

{{% /tab %}}
{{% tab "Windows" %}}

Si vas a configurar Squid en Windows, primero debes [configurarlo como un servicio del sistema][1]. Así pues, puedes ejecutar lo siguiente en un símbolo del sistema de administrador:

```bash
net start squid
```

Si Squid ya se está ejecutando, mejor reinícialo con los siguientes comandos:

```bash
net stop squid
net start squid
```

[1]: https://wiki.squid-cache.org/KnowledgeBase/Windows
{{% /tab %}}
{{< /tabs >}}

##### Configuración del Datadog Agent

**Agent v6 y v7**

Modifica el archivo de configuración del Agent (`datadog.yaml`) para incluir lo siguiente:

```yaml
proxy:
  http: http://127.0.0.1:3128
  https: http://127.0.0.1:3128
```

Tras guardar estos cambios, [reinicia el Agent][1].

Consulta la [información general de tu infraestructura][3] para verificar que Datadog puede recibir datos de tu(s) Agent(s).

**Agent v5**

Modifica el archivo de configuración del Agent (`datadog.conf`) para incluir lo siguiente:

```conf
proxy_host: 127.0.0.1
proxy_port: 3128
```

Tras guardar estos cambios, [reinicia el Agent][1].

Consulta la [información general de tu infraestructura][3] para verificar que Datadog puede recibir datos de tu(s) Agent(s).

## HAProxy

[HAProxy][4] es una solución gratuita, rápida y fiable que ofrece conexiones proxy para aplicaciones TCP y HTTP. A pesar de que HAProxy suele usarse como un equilibrador de carga para distribuir las solicitudes entrantes hacia servidores de grupo, también puedes usarlo para redirigir mediante proxy el tráfico del Agent a Datadog desde hosts que no tengan conectividad externa:

`agent ---> haproxy ---> Datadog`

Se trata de otra opción recomendable si no tienes un proxy web rápidamente disponible en tu red y quieres redirigir mediante proxy una gran cantidad de Agents. En algunos casos, basta una sola instancia de HAProxy para gestionar todo el tráfico de Agents local de tu red, dado que cada proxy puede distribuir más de 1000 Agents.

**Nota**: Esta cifra es una estimación conservadora basada, específicamente, en el rendimiento de instancias `m3.xl`. Existen multitud de variables relacionadas con redes y hosts que pueden alterar el funcionamiento de HAProxy, por lo que deberías supervisar el despliegue de tu proxy tanto antes como después de ponerlo en marcha. Para más información, consulta la [documentación sobre HAProxy][4].

La comunicación entre HAProxy y Datadog se cifra siempre con TLS. No obstante, la comunicación entre el host del Agent y el host de HAProxy no se cifra por defecto, dado que se parte del principio de que el proxy y el Agent se encuentran en el mismo host. Si el host de HAProxy y el host del Agent no comparten la misma red local aislada, te recomendamos proteger dicha comunicación con el cifrado TLS.
Para cifrar datos entre el Agent y HAProxy, será necesario que crees un certificado x509 con la extensión de nombre alternativo del firmante (SAN) del host de HAProxy. Lo normal es que este paquete de certificados (*.pem) contenga tanto el certificado público como la clave privada. Para más información, consulta esta [entrada del blog de HAProxy][5].


**Nota**: Descarga el certificado de Datadog con uno de los siguientes comandos:

```shell
sudo apt-get install ca-certificates # (Debian, Ubuntu)
yum install ca-certificates # (CentOS, Red Hat)
```

La ruta hacia el certificado es `/etc/ssl/certs/ca-certificates.crt` en el caso de Debian y Ubuntu, o `/etc/ssl/certs/ca-bundle.crt` en el caso de CentOS y Red Hat.

### Reenvío mediante proxy con HAProxy

#### Configuración de HAProxy

HAProxy debería instalarse en un host que tenga conectividad con Datadog. Si aún no lo has hecho, puedes utilizar uno de los siguientes archivos de configuración.

**Nota**: Se recomienda usar el archivo de configuración `HTTPS` si el Agent y HAProxy no forman parte de la misma red local aislada.

##### HTTP

```conf
# Basic configuration
global
    log 127.0.0.1 local0
    maxconn 4096
    stats socket /tmp/haproxy

# Some sane defaults
defaults
    log     global
    option  dontlognull
    retries 3
    option  redispatch
    timeout client 5s
    timeout server 5s
    timeout connect 5s

# This declares a view into HAProxy statistics, on port 3833
# You do not need credentials to view this page and you can
# turn it off once you are done with setup.
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /

# This section is to reload DNS Records
# Replace <DNS_SERVER_IP> and <DNS_SECONDARY_SERVER_IP> with your DNS Server IP addresses.
# For HAProxy 1.8 and newer
resolvers my-dns
    nameserver dns1 <DNS_SERVER_IP>:53
    nameserver dns2 <DNS_SECONDARY_SERVER_IP>:53
    resolve_retries 3
    timeout resolve 2s
    timeout retry 1s
    accepted_payload_size 8192
    hold valid 10s
    hold obsolete 60s

# This declares the endpoint where your Agents connects for
# sending metrics (for example, the value of "dd_url").
frontend metrics-forwarder
    bind *:3834
    mode http
    option tcplog
    default_backend datadog-metrics

    use_backend datadog-api if { path_beg -i  /api/v1/validate }
    use_backend datadog-flare if { path_beg -i  /support/flare/ }

# This declares the endpoint where your Agents connects for
# sending traces (for example, the value of "endpoint" in the APM
# configuration section).
frontend traces-forwarder
    bind *:3835
    mode tcp
    option tcplog
    default_backend datadog-traces

# This declares the endpoint where your Agents connects for
# sending profiles (for example, the value of "apm_config.profiling_dd_url").
frontend profiles-forwarder
    bind *:3836
    mode tcp
    option tcplog
    default_backend datadog-profiles

# This declares the endpoint where your agents connects for
# sending processes (for example, the value of "url" in the process
# configuration section).
frontend processes-forwarder
    bind *:3837
    mode tcp
    option tcplog
    default_backend datadog-processes

# This declares the endpoint where your Agents connects for
# sending Logs (e.g the value of "logs.config.logs_dd_url")
# If sending logs with use_http: true
frontend logs_http_frontend
    bind *:3838
    mode http
    option tcplog
    default_backend datadog-logs-http

# If sending logs with use_tcp: true
# frontend logs_frontend
#    bind *:10514
#    mode tcp
#    option tcplog
#    default_backend datadog-logs

# This declares the endpoint where your Agents connects for
# sending database monitoring metrics and activity (e.g the value of "database_monitoring.metrics.dd_url" and "database_monitoring.activity.dd_url")
frontend database_monitoring_metrics_frontend
    bind *:3839
    mode http
    option tcplog
    default_backend datadog-database-monitoring-metrics

# This declares the endpoint where your Agents connects for
# sending database monitoring samples (e.g the value of "database_monitoring.samples.dd_url")
frontend database_monitoring_samples_frontend
    bind *:3840
    mode http
    option tcplog
    default_backend datadog-database-monitoring-samples

# This declares the endpoint where your Agents connects for
# sending Network Devices Monitoring metadata (e.g the value of "network_devices.metadata.dd_url")
frontend network_devices_metadata_frontend
    bind *:3841
    mode http
    option tcplog
    default_backend datadog-network-devices-metadata

# This declares the endpoint where your Agents connects for
# sending Network Devices SNMP Traps data (e.g the value of "network_devices.snmp_traps.forwarder.dd_url")
frontend network_devices_snmp_traps_frontend
    bind *:3842
    mode http
    option tcplog
    default_backend datadog-network-devices-snmp-traps

# This declares the endpoint where your Agents connect for
# sending Instrumentation Telemetry data (e.g. the value of "apm_config.telemetry.dd_url")
frontend instrumentation_telemetry_data_frontend
    bind *:3843
    mode tcp
    option tcplog
    default_backend datadog-instrumentations-telemetry

# This declares the endpoint where your Agents connects for
# sending Network Devices Monitoring NetFlow flows (for example, the value of "network_devices.netflow.dd_url")
frontend network_devices_netflow_frontend
    bind *:3845
    mode http
    option tcplog
    default_backend datadog-network-devices-netflow

# This is the Datadog server. In effect, any TCP request coming
# to the forwarder frontends defined above are proxied to
# Datadog's public endpoints.
backend datadog-metrics
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 haproxy-app.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership haproxy-app.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-api
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-flare
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-traces
    balance roundrobin
    mode tcp
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-profiles
    balance roundrobin
    mode tcp
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 intake.profile.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership profile.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-processes
    balance roundrobin
    mode tcp
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-logs-http
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-database-monitoring-metrics
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 dbm-metrics-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-database-monitoring-samples
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 dbquery-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-network-devices-metadata
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 ndm-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership ndm-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-network-devices-snmp-traps
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-instrumentations-telemetry
    balance roundrobin
    mode tcp
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-network-devices-netflow
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 ndmflow-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership ndmflow-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>
```

##### HTTPS

Esta configuración añade el cifrado SSL/TLS a la comunicación entre el Agent y HAProxy. Reemplaza la variable `<PATH_TO_PROXY_CERTIFICATE_PEM>` por la ruta de acceso al paquete de certificados del proxy (*.pem). 

```conf
# Basic configuration
global
    log 127.0.0.1 local0
    maxconn 4096
    stats socket /tmp/haproxy

# Some sane defaults
defaults
    log     global
    option  dontlognull
    retries 3
    option  redispatch
    timeout client 5s
    timeout server 5s
    timeout connect 5s

# This declares a view into HAProxy statistics, on port 3833
# You do not need credentials to view this page and you can
# turn it off once you are done with setup.
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /

# This section is to reload DNS Records
# Replace <DNS_SERVER_IP> and <DNS_SECONDARY_SERVER_IP> with your DNS Server IP addresses.
# For HAProxy 1.8 and newer
resolvers my-dns
    nameserver dns1 <DNS_SERVER_IP>:53
    nameserver dns2 <DNS_SECONDARY_SERVER_IP>:53
    resolve_retries 3
    timeout resolve 2s
    timeout retry 1s
    accepted_payload_size 8192
    hold valid 10s
    hold obsolete 60s

# This declares the endpoint where your Agents connect for
# sending metrics (for example, the value of "dd_url").
frontend metrics-forwarder
    bind *:3834 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-metrics

    use_backend datadog-api if { path_beg -i  /api/v1/validate }
    use_backend datadog-flare if { path_beg -i  /support/flare/ }

# This declares the endpoint where your Agents connect for
# sending traces (for example, the value of "endpoint" in the APM
# configuration section).
frontend traces-forwarder
    bind *:3835 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode tcp
    option tcplog
    default_backend datadog-traces

# This declares the endpoint where your Agents connect for
# sending profiles (for example, the value of "apm_config.profiling_dd_url").
frontend profiles-forwarder
    bind *:3836 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode tcp
    option tcplog
    default_backend datadog-profiles

# This declares the endpoint where your Agents connect for
# sending processes (for example, the value of "url" in the process
# configuration section).
frontend processes-forwarder
    bind *:3837 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode tcp
    option tcplog
    default_backend datadog-processes

# This declares the endpoint where your Agents connect for
# sending Logs (e.g the value of "logs.config.logs_dd_url")
# If sending logs with use_http: true
frontend logs_http_frontend
    bind *:3838 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-logs-http

# If sending logs with use_tcp: true
# frontend logs_frontend
#    bind *:10514 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
#    mode tcp
#    option tcplog
#    default_backend datadog-logs

# This declares the endpoint where your Agents connect for
# sending database monitoring metrics and activity (e.g the value of "database_monitoring.metrics.dd_url" and "database_monitoring.activity.dd_url")
frontend database_monitoring_metrics_frontend
    bind *:3839 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-database-monitoring-metrics

# This declares the endpoint where your Agents connect for
# sending database monitoring samples (e.g the value of "database_monitoring.samples.dd_url")
frontend database_monitoring_samples_frontend
    bind *:3840 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-database-monitoring-samples

# This declares the endpoint where your Agents connect for
# sending Network Devices Monitoring metadata (e.g the value of "network_devices.metadata.dd_url")
frontend network_devices_metadata_frontend
    bind *:3841 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-network-devices-metadata

# This declares the endpoint where your Agents connect for
# sending Network Devices SNMP Traps data (e.g the value of "network_devices.snmp_traps.forwarder.dd_url")
frontend network_devices_snmp_traps_frontend
    bind *:3842 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-network-devices-snmp-traps


# This declares the endpoint where your Agents connect for
# sending Instrumentation Telemetry data (e.g. the value of "apm_config.telemetry.dd_url")
frontend instrumentation_telemetry_data_frontend
    bind *:3843 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode tcp
    option tcplog
    default_backend datadog-instrumentations-telemetry

# This declares the endpoint where your Agents connect for
# sending Network Devices Monitoring NetFlow flows (for example, the value of "network_devices.netflow.dd_url")
frontend network_devices_netflow_frontend
    bind *:3845 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-network-devices-netflow

# This is the Datadog server. In effect any TCP request coming
# to the forwarder frontends defined above are proxied to
# Datadog's public endpoints.
backend datadog-metrics
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 haproxy-app.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership haproxy-app.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-api
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-flare
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-traces
    balance roundrobin
    mode tcp
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-profiles
    balance roundrobin
    mode tcp
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 intake.profile.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership profile.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-processes
    balance roundrobin
    mode tcp
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-logs-http
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 agent-http-intake.logs.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-database-monitoring-metrics
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 dbm-metrics-intake.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-database-monitoring-samples
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 dbquery-intake.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-network-devices-metadata
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 ndm-intake.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership ndm-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-network-devices-snmp-traps
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-instrumentations-telemetry
    balance roundrobin
    mode tcp
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-network-devices-netflow
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 ndmflow-intake.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership ndmflow-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>
```

**Nota**: Puedes usar `verify none` en vez de `verify required ca-file <PATH_TO_CERTIFICATES>` si no logras obtener los certificados en el host del proxy, pero ten en cuenta que, en ese caso, HAProxy no podrá verificar el certificado de ingesta de Datadog.

HAProxy 1.8 y sus versiones posteriores permiten que la detección de servicios DNS identifique los cambios del servidor y los aplique automáticamente en tu configuración.
Si usas una versión de HAProxy anterior, tendrás que recargar o reiniciar HAProxy. **Se recomienda tener una versión de HAProxy que recargue una tarea `cron` cada 10 minutos** (como `service haproxy reload`) para forzar la actualización de la caché DNS de HAProxy en caso de que {{< region-param key="dd_full_site" code="true" >}} cambie a otra IP.

#### Configuración del Datadog Agent

**Agent v6 y v7**

Edita cada Agent que deba dirigir datos hacia HAProxy configurando su `dd_url` en la dirección de HAProxy. Ejemplo: `haproxy.example.com`.
Este parámetro `dd_url` se podrá encontrar en el archivo `datadog.yaml`.

`dd_url: <SCHEME>://haproxy.example.com:3834`

Reemplaza `<SCHEME>` por `https`si optaste por la configuración HTTPS de HAProxy con anterioridad, o bien por `http` si no optaste por HTTPS.

Para enviar trazas, perfiles, procesos y logs mediante el proxy, efectúa la siguiente configuración en el archivo `datadog.yaml`:

```yaml
apm_config:
    apm_dd_url: <SCHEME>://haproxy.example.com:3835
    profiling_dd_url: <SCHEME>://haproxy.example.com:3836/api/v2/profile
    telemetry:
        dd_url: <SCHEME>://haproxy.example.com:3843

process_config:
    process_dd_url: <SCHEME>://haproxy.example.com:3837

logs_config:
    use_http: true
    logs_dd_url: haproxy.example.com:3838
    # Comment the line below to use encryption between the Agent and HAProxy
    logs_no_ssl: true

database_monitoring:
    metrics:
        logs_dd_url: haproxy.example.com:3839
        # Comment the line below to use encryption between the Agent and HAProxy
        logs_no_ssl: true
    activity:
        logs_dd_url: haproxy.example.com:3839
        # Comment the line below to use encryption between the Agent and HAProxy
        logs_no_ssl: true
    samples:
        logs_dd_url: haproxy.example.com:3840
        # Comment the line below to use encryption between the Agent and HAProxy
        logs_no_ssl: true

network_devices:
    metadata:
        logs_dd_url: haproxy.example.com:3841
        # Comment the line below to use encryption between the Agent and HAProxy
        logs_no_ssl: true
    snmp_traps:
        forwarder:
            logs_dd_url: haproxy.example.com:3842
            # Comment the line below to use encryption between the Agent and HAProxy
            logs_no_ssl: true
    netflow:
        forwarder:
            logs_dd_url: haproxy.example.com:3845
            # Comment the line below to use encryption between the Agent and HAProxy
            logs_no_ssl: true
```

Cuando se usa el cifrado entre el Agent y HAProxy, si el Agent no tiene acceso al certificado del proxy, no puede validarlo o no necesita validarlo, puedes editar el archivo de configuración del Agent `datadog.yaml` y establecer `skip_ssl_validation` como `true`.
Al estar esta opción establecida como `true`, el Agent omite el paso correspondiente a la validación del certificado y no verifica la identidad del proxy, pero se sigue cifrando la comunicación con SSL/TLS.

```yaml
skip_ssl_validation: true
```

Por último, [reinicia el Agent][1].

Para verificar que todo funciona como es debido, revisa las estadísticas de HAProxy en `http://haproxy.example.com:3833` y la [información general de tu infraestructura][3].

**Agent v5**

Edita cada Agent que deba dirigir datos hacia HAProxy configurando su `dd_url` en la dirección de HAProxy. Ejemplo: `haproxy.example.com`.
Este parámetro `dd_url` se podrá encontrar en el archivo `datadog.conf`.

`dd_url: http://haproxy.example.com:3834`

Para enviar trazas o procesos mediante el proxy, efectúa la siguiente configuración en el archivo `datadog.conf`:

```conf
[trace.api]
endpoint = http://haproxy.example.com:3835

[process.api]
endpoint = http://haproxy.example.com:3837
```

Edita la configuración del supervisor para deshabilitar la verificación del certificado SSL. Este paso es necesario para que Python no señale la discrepancia entre el nombre de host que figura en el certificado SSL (`app.datadoghq.com`) y tu nombre de host de HAProxy. La configuración del supervisor se encuentra en:

* `/etc/dd-agent/supervisor_ddagent.conf` en sistemas basados en Debian
* `/etc/dd-agent/supervisor.conf` en sistemas basados en Red Hat
* `/opt/local/datadog/supervisord/supervisord.conf` en SmartOS
* `/usr/local/etc/datadog/supervisord/supervisord.conf` en FreeBSD
* `~/.datadog-agent/supervisord/supervisord.conf` en macOS

Supongamos que el archivo de supervisor se encuentra en `<SUP_FILE>`

```bash
sed -i 's/ddagent.py/ddagent.py --sslcheck=0/' <SUP_FILE>
```

En el Agent de Windows, edita tu archivo de configuración `datadog.conf` y añade esta opción:

```conf
skip_ssl_validation: yes
```

Por último, [reinicia el Agent][1].

Para verificar que todo funciona como es debido, revisa las estadísticas de HAProxy en `http://haproxy.example.com:3833` y la [información general de tu infraestructura][3].

## NGINX

[NGINX][6] es un servidor web que también se puede usar como proxy inverso, equilibrador de carga, proxy de correo electrónico y caché HTTP. Asimismo, puedes usar NGINX como proxy en tus Datadog Agents:

`agent ---> nginx ---> Datadog`

La comunicación entre NGINX y Datadog se cifra siempre con TLS. No obstante, la comunicación entre el host del Agent y el host de NGINX no se cifra por defecto, dado que se parte del principio de que el proxy y el Agent se encuentran en el mismo host. Si no comparten la misma red local aislada, te recomendamos proteger dicha comunicación con el cifrado TLS.
Para cifrar datos entre el Agent y NGINX, será necesario que crees un certificado x509 con la extensión de nombre alternativo del firmante (SAN) del host de NGINX.

**Nota**: Descarga el certificado de Datadog con uno de los siguientes comandos:

```shell
sudo apt-get install ca-certificates # (Debian, Ubuntu)
yum install ca-certificates # (CentOS, Red Hat)
```

La ruta hacia el certificado es `/etc/ssl/certs/ca-certificates.crt` en el caso de Debian y Ubuntu, o `/etc/ssl/certs/ca-bundle.crt` en el caso de CentOS y Red Hat.

### Reenvío mediante proxy con NGINX

#### Configuración de NGINX

NGINX debería instalarse en un host que tenga conectividad con Datadog. Si aún no lo has hecho, puedes utilizar uno de los siguientes archivos de configuración.

**Nota**: Se recomienda usar el archivo de configuración `HTTPS` si el Agent y NGINX no forman parte de la misma red local aislada.

##### HTTP

```conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}
# HTTP Proxy for Datadog Agent
http {

    proxy_ssl_trusted_certificate <PATH_TO_CERTIFICATES>;

    server {
        listen 3834; #listen for metrics
        access_log off;

        location /api/v1/validate {
            proxy_ssl_verify on;
            proxy_pass https://api.{{< region-param key="dd_site" >}}:443/api/v1/validate;
        }
        location /support/flare/ {
            proxy_ssl_verify on;
            proxy_pass https://flare.{{< region-param key="dd_site" >}}:443/support/flare/;
        }
        location / {
            proxy_ssl_verify on;
            proxy_pass https://haproxy-app.agent.{{< region-param key="dd_site" >}}:443/;
        }
    }
}
# TCP Proxy for Datadog Agent
stream {

    proxy_ssl_trusted_certificate <PATH_TO_CERTIFICATES>;

    server {
        listen 3835; #listen for traces
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass trace.agent.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3836; #listen for profiles
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass intake.profile.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3837; #listen for processes
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass process.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3838; #listen for logs with use_http: true
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass agent-http-intake.logs.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3839; #listen for database monitoring metrics
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbm-metrics-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3840; #listen for database monitoring samples
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbquery-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3841; #listen for network devices metadata
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndm-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3842; #listen for network devices traps
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass snmp-traps-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3843; #listen for instrumentations telemetry data
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3845; #listen for network devices netflow
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndmflow-intake.{{< region-param key="dd_site" >}}:443;
    }
}
```

##### HTTPS


Esta configuración añade el cifrado SSL/TLS a la comunicación entre el Agent y NGINX. Reemplaza `<PATH_TO_PROXY_CERTIFICATE>` por la ruta de acceso al certificado público del proxy y `<PATH_TO_PROXY_CERTIFICATE_KEY>` por la ruta de acceso a la clave privada.

```conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}
# HTTP Proxy for Datadog Agent
http {

    proxy_ssl_trusted_certificate <PATH_TO_CERTIFICATES>;

    ssl_certificate     <PATH_TO_PROXY_CERTIFICATE>;
    ssl_certificate_key <PATH_TO_PROXY_CERTIFICATE_KEY>;

    server {
        listen 3834 ssl; #listen for metrics
        access_log off;

        location /api/v1/validate {
            proxy_ssl_verify on;
            proxy_pass https://api.{{< region-param key="dd_site" >}}:443/api/v1/validate;
        }
        location /support/flare/ {
            proxy_ssl_verify on;
            proxy_pass https://flare.{{< region-param key="dd_site" >}}:443/support/flare/;
        }
        location / {
            proxy_ssl_verify on;
            proxy_pass https://haproxy-app.agent.{{< region-param key="dd_site" >}}:443/;
        }
    }
}
# TCP Proxy for Datadog Agent
stream {

    proxy_ssl_trusted_certificate <PATH_TO_CERTIFICATES>;

    ssl_certificate     <PATH_TO_PROXY_CERTIFICATE>;
    ssl_certificate_key <PATH_TO_PROXY_CERTIFICATE_KEY>;

    server {
        listen 3835 ssl; #listen for traces
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass trace.agent.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3836 ssl; #listen for profiles
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass intake.profile.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3837 ssl; #listen for processes
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass process.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3838 ssl; #listen for logs with use_http: true
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass agent-http-intake.logs.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3839 ssl; #listen for database monitoring metrics
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbm-metrics-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3840 ssl; #listen for database monitoring samples
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbquery-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3841 ssl; #listen for network devices metadata
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndm-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3842 ssl; #listen for network devices traps
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass snmp-traps-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3843 ssl; #listen for instrumentations telemetry data
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3845 ssl; #listen for network devices netflow
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndmflow-intake.{{< region-param key="dd_site" >}}:443;
    }
}
```

**Nota**: Puedes eliminar `proxy_ssl_verify on` si no consigues obtener los certificados en el host del proxy, pero ten en cuenta que, si lo haces, NGINX no podrá verificar el certificado de ingesta de Datadog.

#### Configuración del Datadog Agent

Edita el archivo de configuración de cada Agent que deba dirigir datos hacia NGINX configurando su `dd_url` en la dirección de NGINX. Ejemplo: `nginx.example.com`.
Este parámetro `dd_url` se podrá encontrar en el archivo `datadog.yaml`.

`dd_url: "<SCHEME>://nginx.example.com:3834"`

Reemplaza `<SCHEME>` por `https`si optaste por la configuración HTTPS de HAProxy con anterioridad, o bien por `http` si no optaste por HTTPS.

Para enviar trazas, perfiles, procesos y logs mediante el proxy, efectúa la siguiente configuración en el archivo `datadog.yaml`:

```yaml
apm_config:
    apm_dd_url: <SCHEME>://nginx.example.com:3835
    profiling_dd_url: <SCHEME>://nginx.example.com:3836/api/v2/profile
    telemetry:
        dd_url: <SCHEME>://nginx.example.com:3843

process_config:
    process_dd_url: <SCHEME>://nginx.example.com:3837

logs_config:
    use_http: true
    logs_dd_url: nginx.example.com:3838
    # Comment the line below to use encryption between the Agent and NGINX
    logs_no_ssl: true

database_monitoring:
    metrics:
        logs_dd_url: nginx.example.com:3839
        # Comment the line below to use encryption between the Agent and NGINX
        logs_no_ssl: true
    activity:
        logs_dd_url: nginx.example.com:3839
        # Comment the line below to use encryption between the Agent and NGINX
        logs_no_ssl: true
    samples:
        logs_dd_url: nginx.example.com:3840
        # Comment the line below to use encryption between the Agent and NGINX
        logs_no_ssl: true

network_devices:
    metadata:
        logs_dd_url: nginx.example.com:3841
        # Comment the line below to use encryption between the Agent and NGINX
        logs_no_ssl: true
    snmp_traps:
        forwarder:
            logs_dd_url: nginx.example.com:3842
            # Comment the line below to use encryption between the Agent and NGINX
            logs_no_ssl: true
    netflow:
        forwarder:
            logs_dd_url: nginx.example.com:3845
            # Comment the line below to use encryption between the Agent and NGINX
            logs_no_ssl: true

```

Cuando se usa el cifrado entre el Agent y NGINX, si el Agent no tiene acceso al certificado del proxy, no puede validarlo o no necesita validarlo, puedes editar el archivo de configuración del Agent `datadog.yaml` y establecer `skip_ssl_validation` como `true`.
Al estar esta opción establecida como `true`, el Agent omite el paso correspondiente a la validación del certificado y no verifica la identidad del proxy, pero se sigue cifrando la comunicación con SSL/TLS.

```yaml
skip_ssl_validation: true
```

Cuando envíes logs a través de TCP, consulta la sección acerca del [proxy TCP para logs][7].

## Datadog Agent

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

**Esta función solo está disponible en Agent v5**.

{{% /tab %}}
{{% tab "Agent v5" %}}

Se recomienda usar un proxy de verdad (un proxy web o HAProxy) para desviar el tráfico hacia Datadog. No obstante, si no dispones de esas opciones, puedes configurar una instancia de **Agent v5** para que actúe como un proxy.

1. Designa como proxy un nodo **que ejecute datadog-agent**.
    En este ejemplo, supongamos que el nombre del proxy es `proxy-node`. El nodo **debe** poder llegar a `https://app.datadoghq.com`.

2. Verifica la conectividad SSL de `proxy-node`:

    ```shell
    curl -v https://app.datadoghq.com/account/login 2>&1 | grep "200 OK"
    ```

3. Modifica la siguiente línea de `datadog.conf` para permitir que haya tráfico no local en `proxy-node`.
     `# non_local_traffic: no` debería ser `non_local_traffic: yes`.

4. Asegúrate de que se pueda llegar a `proxy-node` desde los otros nodos a través del puerto 17123. Inicia el Agent en `proxy-node` y ejecútalo en los demás nodos:

    `curl -v http://proxy-node:17123/status 2>&1 | grep "200 OK"`

5. Actualiza los nodos que no actúen como proxies para desviarlos a `proxy-node`. Cambia la siguiente línea de `datadog.conf` de:

    `dd_url: https://app.datadoghq.com`
   a
    `dd_url: http://proxy-node:17123`

6. En la [página Infrastructure][1], verifica que todos los nodos envíen datos a Datadog.


[1]: https://app.datadoghq.com/infrastructure#overview
{{% /tab %}}
{{< /tabs >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/agent/guide/agent-commands/
[2]: http://www.squid-cache.org/
[3]: https://app.datadoghq.com/infrastructure
[4]: http://haproxy.1wt.eu
[5]: https://www.haproxy.com/blog/haproxy-ssl-termination/
[6]: https://www.nginx.com
[7]: /es/agent/logs/proxy