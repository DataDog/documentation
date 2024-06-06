---
further_reading:
- link: /logs/
  tag: Documentación
  text: Recopilar tus logs
- link: /infrastructure/process/
  tag: Documentación
  text: Recopilar tus procesos
- link: /tracing/
  tag: Documentación
  text: Recopilar tus trazas
kind: documentación
title: Proxy TCP del Agent para el envío de logs
---

## Información general

Para recopilar logs, es necesario contar con la versión 6.0 del Datadog Agent (o una posterior). Las versiones anteriores del Agent no incluyen la interfaz `log collection`.

A partir de las versiones 6.14 y 7.14 del Agent, Datadog recomienda utilizar y aplicar el transporte **HTTPS** (consulta [Transporte de logs del Agent][1]).
Si estás usando el transporte HTTPS para los logs, consulta la [documentación relativa al proxy del Agent][2] y utiliza los mismos parámetros de proxy que otros tipos de datos.

{{< tabs >}}
{{% tab "TCP" %}}

Si utilizas un proxy para la transmisión TCP, configura el Datadog Agent para enviar logs a tu proxy a través de TCP utilizando los siguientes parámetros en el archivo de configuración `datadog.yaml`:

```yaml
logs_config:
  logs_dd_url: "<PROXY_ENDPOINT>:<PROXY_PORT>"
  logs_no_ssl: true
```

Los parámetros anteriores también pueden configurarse con las siguientes variables de entorno:

* `DD_LOGS_CONFIG_LOGS_DD_URL`
* `DD_LOGS_CONFIG_LOGS_NO_SSL`

**Nota**: El parámetro `logs_no_ssl` es necesario para que el Agent ignore la discrepancia entre el nombre de host del certificado SSL ({{< region-param key="tcp_endpoint" code="true" >}}) y el nombre de host de tu proxy. Es recomendable usar una conexión SSL cifrada entre tu proxy y el endpoint de ingesta de Datadog.

* Luego, configura tu proxy para que escuche en `<PROXY_PORT>` y reenvíe los logs que reciba. Para {{< region-param key="dd_site" code="true" >}}, utiliza {{< region-param key="tcp_endpoint" code="true" >}} en el puerto {{< region-param key="tcp_endpoint_port" code="true" >}} y activa el cifrado SSL.

* Descarga los `CA certificates` de cifrado TLS para aplicar el cifrado SSL con el siguiente comando:
  - `sudo apt-get install ca-certificates` (Debian, Ubuntu)
  - `yum install ca-certificates` (CentOS, RedHat)

  Y utiliza el archivo de certificado ubicado en `/etc/ssl/certs/ca-certificates.crt` (Debian, Ubuntu) o `/etc/ssl/certs/ca-bundle.crt` (CentOS, RedHat)

{{% /tab %}}
{{% tab "SOCKS5" %}}

Para enviar tus logs a tu cuenta de Datadog con un servidor proxy SOCKS5, usa los siguientes parámetros en tu archivo de configuración `datadog.yaml`:

```yaml
logs_config:
  socks5_proxy_address: "<MY_SOCKS5_PROXY_URL>:<MY_SOCKS5_PROXY_PORT>"
```

El parámetro anterior también puede configurarse como una variable de entorno:

* `DD_LOGS_CONFIG_SOCKS5_PROXY_ADDRESS`

{{% /tab %}}
{{< /tabs >}}

## Ejemplos de proxy TCP

{{< tabs >}}
{{% tab "HAProxy" %}}
### Utilizar HAProxy como proxy TCP para los logs

Este ejemplo te muestra cómo configurar el Datadog Agent para que envíe logs a un servidor a través de TCP. Debes instalar HAProxy y realizar una escucha en el puerto `10514` para después transmitir los logs a Datadog.

`agent ---> haproxy ---> Datadog`

El cifrado está desactivado entre el Agent y HAProxy, que se configura para cifrar los datos antes de enviarlos a Datadog.

#### Configuración del Agent

Edita el archivo de configuración del Agent `datadog.yaml` y define `logs_no_ssl` como `true`. Este paso es necesario porque HAProxy no reenvía el tráfico ni forma parte del backend de Datadog. Por tanto, no puedes utilizar el mismo certificado.

**Nota**: `logs_no_ssl` podría definirse como true porque HAProxy está configurado para cifrar los datos. De lo contrario, no definas este parámetro como `true`.

```
logs_config:
  force_use_tcp: true
  logs_dd_url: "<PROXY_SERVER_DOMAIN>:10514"
  logs_no_ssl: true
```

#### Configuración de HAProxy

HAProxy debería instalarse en un host que tenga conectividad con Datadog. Utiliza el siguiente archivo de configuración si todavía no lo has configurado.

{{% site-region region="us" %}}

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
# sending Logs (e.g the value of "logs.config.logs_dd_url")
frontend logs_frontend
    bind *:10514
    mode tcp
    option tcplog
    default_backend datadog-logs
# This is the Datadog server. In effect any TCP request coming
# to the forwarder frontends defined above are proxied to
# Datadog's public endpoints.
backend datadog-logs
    balance roundrobin
    mode tcp
    option tcplog
    server datadog agent-intake.logs.datadoghq.com:10516 ssl verify required ca-file /etc/ssl/certs/ca-certificates.crt check port 10516
```

**Nota**: Descarga el certificado con el siguiente comando:

* `sudo apt-get install ca-certificates` (Debian, Ubuntu)
* `yum install ca-certificates` (CentOS, RedHat)

Si funciona correctamente, la localización del archivo será `/etc/ssl/certs/ca-bundle.crt` en el caso de CentOS y RedHat.

Una vez que se haya efectuado la configuración de HAProxy, puedes volver a cargar o reiniciar HAProxy. **Es recomendable crear una tarea `cron` que recargue HAProxy cada 10 minutos** (por ejemplo, `service haproxy reload`) para forzar la actualización de la caché DNS de HAProxy, por si `app.datadoghq.com` conmuta por error a otra IP.

{{% /site-region %}}
{{% site-region region="eu" %}}

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
# sending Logs (e.g the value of "logs.config.logs_dd_url")
frontend logs_frontend
    bind *:10514
    mode tcp
    default_backend datadog-logs
# This is the Datadog server. In effect any TCP request coming
# to the forwarder frontends defined above are proxied to
# Datadog's public endpoints.
backend datadog-logs
    balance roundrobin
    mode tcp
    option tcplog
    server datadog agent-intake.logs.datadoghq.eu:443 ssl verify required ca-file /etc/ssl/certs/ca-bundle.crt check port 443
```

Descarga el certificado con el siguiente comando:

* `sudo apt-get install ca-certificates` (Debian, Ubuntu)
* `yum install ca-certificates` (CentOS, RedHat)

Si funciona correctamente, la localización del archivo será `/etc/ssl/certs/ca-bundle.crt` en el caso de CentOS y RedHat.

Una vez que se haya efectuado la configuración de HAProxy, puedes volver a cargar o reiniciar HAProxy. **Es recomendable crear una tarea `cron` que recargue HAProxy cada 10 minutos** (por ejemplo, `service haproxy reload`) para forzar la actualización de la caché DNS de HAProxy, por si `app.datadoghq.eu` conmuta por error a otra IP.

{{% /site-region %}}

{{% /tab %}}

{{% tab "NGINX" %}}
### Utilizar NGINX como proxy TCP para los logs

#### Configuración del Agent

Edita el archivo de configuración `datadog.yaml` del Agent y define `logs_config.logs_dd_url` para que utilice el nuevo proxy en vez de establecer una conexión directa con Datadog:

```yaml
logs_config:
  force_use_tcp: true
  logs_dd_url: myProxyServer.myDomain:10514
```

**Nota**: No cambies el parámetro `logs_no_ssl`, ya que NGINX reenvía el tráfico a Datadog sin cifrarlo ni descifrarlo.

#### Configuración de NGINX

En este ejemplo, el archivo `nginx.conf` se puede utilizar para dirigir el tráfico del Agent a Datadog mediante proxy. Con esta configuración, el último bloque del servidor incorpora el protocolo TLS para garantizar el cifrado de los logs internos de texto sin formato entre tu proxy y el endpoint de la API de Datadog que recibe los logs:

{{% site-region region="us" %}}

```conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;
events {
    worker_connections 1024;
}
# TCP Proxy for Datadog Agent
stream {
    server {
        listen 10514; #listen for logs
        proxy_ssl on;
        proxy_pass agent-intake.logs.datadoghq.com:10516;
    }
}
```

{{% /site-region %}}
{{% site-region region="eu" %}}

```conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;
events {
    worker_connections 1024;
}
# TCP Proxy for Datadog Agent
stream {
    server {
        listen 10514; #listen for logs
        proxy_ssl on;
        proxy_pass agent-intake.logs.datadoghq.eu:443;
    }
}
```

{{% /site-region %}}
{{% /tab %}}
{{< /tabs >}}


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/logs/log_transport?tab=https
[2]: /es/agent/proxy/
