---
description: Configura el Datadog Agent para enviar logs a través de proxies TCP y
  SOCKS5, con ejemplos detallados de configuración de HAProxy y NGINX.
further_reading:
- link: /logs/
  tag: Documentación
  text: Recopilar tus logs
- link: /infrastructure/process/
  tag: Documentación
  text: Recopilar tus procesos
- link: /tracing/
  tag: Documentación
  text: Recopilación de tus trazas (traces)
title: Proxy TCP del Agent para el envío de logs
---

{{% logs-tcp-disclaimer %}}

{{% site-region region="us3,us5,gov,ap1,ap2" %}}
<div class="alert alert-danger">
    TCP no está disponible para el sitio {{< region-param key="dd_site_name" >}}. Ponte en contacto con el <a href="/help/">servicio de asistencia</a> para obtener más información.
</div>
{{% /site-region %}}

{{% site-region region="us" %}}
## Información general

La recopilación de logs requiere la versión 6.0 o posterior del Datadog Agent. Las versiones anteriores del Agent no incluyen la interfaz `log collection`.

A partir del Agent v6.14/v7.14, Datadog recomienda utilizar y aplicar el transporte **HTTPS** (consulta [Transporte de logs del Agent][1]).
Si utiliza el transporte de logs HTTPS, consulta la [documentación del proxy del Agent][2] y utiliza el mismo conjunto de parámetros de proxy que otros tipos de datos.

{{< tabs >}}
{{% tab "TCP" %}}

Si utilizas un proxy para la transmisión TCP, configura el Datadog Agent para enviar logs a tu proxy a través de TCP utilizando los siguientes parámetros del archivo de configuración `datadog.yaml`:

```yaml
logs_config:
  logs_dd_url: "<PROXY_ENDPOINT>:<PROXY_PORT>"
  logs_no_ssl: true
```

Los parámetros anteriores también se pueden configurar con las siguientes variables de entorno:

* `DD_LOGS_CONFIG_LOGS_DD_URL`
* `DD_LOGS_CONFIG_LOGS_NO_SSL`

**Nota**: El parámetro `logs_no_ssl` es necesario para que el Agent ignore la discrepancia entre el nombre de host del certificado SSL ({{< region-param key="tcp_endpoint" code="true" >}}) y el nombre de host de tu proxy. Se recomienda utilizar una conexión cifrada SSL entre tu proxy y el endpoint de admisión de Datadog.

* A continuación, configura tu proxy para escuchar en el `<PROXY_PORT>` y reenviar los logs recibidos. Para {{< region-param key="dd_site" code="true" >}}, utiliza {{< region-param key="tcp_endpoint" code="true" >}} en el puerto {{< region-param key="tcp_endpoint_port" code="true" >}} y activa el cifrado SSL.

* Descargua los `CA certificates` para el cifrado TLS del cifrado SSL con el siguiente comando:
  - `sudo apt-get install ca-certificates` (Debian, Ubuntu)
  - `yum install ca-certificates` (CentOS, Redhat)

  Y utiliza el archivo del certificado ubicado en `/etc/ssl/certs/ca-certificates.crt`(Debian, Ubuntu) o en `/etc/ssl/certs/ca-bundle.crt` (CentOS, Redhat)

{{% /tab %}}
{{% tab "SOCKS5" %}}

Para enviar tus logs a tu cuenta de Datadog con un servidor proxy SOCKS5, utiliza los siguientes parámetros en su archivo de configuración `datadog.yaml`:

```yaml
logs_config:
  socks5_proxy_address: "<MY_SOCKS5_PROXY_URL>:<MY_SOCKS5_PROXY_PORT>"
```

El parámetro anterior también se puede configurar con la siguiente variable de entorno:

* `DD_LOGS_CONFIG_SOCKS5_PROXY_ADDRESS`

{{% /tab %}}
{{< /tabs >}}

## Ejemplos de proxy TCP

{{< tabs >}}
{{% tab "HAProxy" %}}
### Utilizar HAProxy como proxy TCP para los logs

Este ejemplo explica cómo configurar el Datadog Agent para enviar logs en TCP a un servidor con HAProxy, instalado y escuchando en el puerto `10514`, para luego reenviarlos a Datadog.

`agent ---> haproxy ---> Datadog`

El cifrado está desactivado entre el Agent y HAProxy, que se configura para cifrar los datos antes de enviarlos a Datadog.

#### Configuración del Agent

Edita el archivo de configuración del Agent `datadog.yaml` y configura `logs_no_ssl` como `true`. Esto es necesario, ya que HAProxy no reenvía el tráfico y no es el backend de Datadog, por lo que no puede utilizar el mismo certificado.

**Nota**: `logs_no_ssl` puede estar configurado como verdadero, ya que HAProxy está configurado para encriptar los datos. De lo contrario, no configures este parámetro como `true`.

```
logs_config:
  force_use_tcp: true
  logs_dd_url: "<PROXY_SERVER_DOMAIN>:10514"
  logs_no_ssl: true
```

#### Configuración de HAProxy

HAProxy debe instalarse en un host que tenga conectividad con Datadog. Utiliza el siguiente archivo de configuración, si aún no lo tienes configurado.

{{% site-region region="us" %}}

```conf
# Configuración básica
global
    log 127.0.0.1 local0
    maxconn 4096
    stats socket /tmp/haproxy
# Algunos elementos predeterminados sensatos
defaults
    log     global
    option  dontlognull
    retries 3
    option  redispatch
    timeout client 5s
    timeout server 5s
    timeout connect 5s
# Esto declara una vista de las estadísticas de HAProxy en el puerto 3833
# No necesitas credenciales para visualizar esta página
# y puedes apagarla una vez que finalices la configuración.
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /
# Esta sección es para la recarga de registros DNS
# Sustituye <DNS_SERVER_IP> y <DNS_SECONDARY_SERVER_IP> por las direcciones IP de tu servidor DNS.
# Para HAProxy v1.8 y resolvedores
más recientes my-dns
    nameserver dns1 <DNS_SERVER_IP>:53
    nameserver dns2 <DNS_SECONDARY_SERVER_IP>:53
    resolve_retries 3
    timeout resolve 2s
    timeout retry 1s
    accepted_payload_size 8192
    hold valid 10s
    hold obsolete 60s
# Esto declara el endpoint al que se conectan tus Agents para
# enviar logs (p. ej. el valor de "logs.config.logs_dd_url")
frontend logs_frontend
    bind *:10514
    mode tcp
    option tcplog
    default_backend datadog-logs
# Este es el servidor Datadog. En efecto, toda solicitud TCP que llegue
# a los frontends del forwarder definidos anteriormente se envían mediante proxy
# a endpoints públicos de Datadog.
backend datadog-logs
    balance roundrobin
    mode tcp
    option tcplog
    server datadog agent-intake.logs.datadoghq.com:10516 ssl verify required ca-file /etc/ssl/certs/ca-certificates.crt check port 10516
```

**Nota**: Descarga el certificado con el siguiente comando:

* `sudo apt-get install ca-certificates` (Debian, Ubuntu)
* `yum install ca-certificates` (CentOS, Redhat)

Si todo sale bien, el archivo se ubicará en `/etc/ssl/certs/ca-bundle.crt` para CentOS, Redhat.

Una vez que se haya realizado la configuración de HAProxy, puedes volver a cargarlo o reiniciar HAProxy. **Se recomienda tener una tarea `cron` que vuelva a cargar HAProxy cada 10 minutos** (por ejemplo, `service haproxy reload`) para forzar una actualización de la caché DNS de HAProxy, en caso de que `app.datadoghq.com` conmute a otra IP.

{{% /site-region %}}
{{% site-region region="eu" %}}

```conf
# Configuración básica
global
    log 127.0.0.1 local0
    maxconn 4096
    stats socket /tmp/haproxy
# Algunos elementos predeterminados sensatos
defaults
    log     global
    option  dontlognull
    retries 3
    option  redispatch
    timeout client 5s
    timeout server 5s
    timeout connect 5s
# Esto declara una vista de las estadísticas de HAProxy en el puerto 3833
# No necesitas credenciales para visualizar esta página
# y puedes apagarla una vez que finalices la configuración.
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /
# Esta sección es para la recarga de registros DNS
# Sustituye <DNS_SERVER_IP> y <DNS_SECONDARY_SERVER_IP> por las direcciones IP de tu servidor DNS.
# Para HAProxy v1.8 y resolvedores
más recientes my-dns
    nameserver dns1 <DNS_SERVER_IP>:53
    nameserver dns2 <DNS_SECONDARY_SERVER_IP>:53
    resolve_retries 3
    timeout resolve 2s
    timeout retry 1s
    accepted_payload_size 8192
    hold valid 10s
    hold obsolete 60s
# Esto declara el endpoint al que se conectan tus Agents para
# enviar logs (p. ej. el valor de "logs.config.logs_dd_url")
frontend logs_frontend
    bind *:10514
    mode tcp
    option tcplog
    default_backend datadog-logs
# Este es el servidor Datadog. En efecto, toda solicitud TCP que llegue
# a los frontends del forwarder definidos anteriormente se envían mediante proxy
# a endpoints públicos de Datadog.
backend datadog-logs
    balance roundrobin
    mode tcp
    option tcplog
    server datadog agent-intake.logs.datadoghq.com:10516 ssl verify required ca-file /etc/ssl/certs/ca-certificates.crt check port 10516
```

Descarga el certificado con el siguiente comando:

* `sudo apt-get install ca-certificates` (Debian, Ubuntu)
* `yum install ca-certificates` (CentOS, Redhat)

Si todo sale bien, el archivo se ubicará en `/etc/ssl/certs/ca-bundle.crt` para CentOS, Redhat.

Una vez que se haya realizado la configuración de HAProxy, puedes volver a cargarlo o reiniciar HAProxy. **Se recomienda tener una tarea `cron` que vuelve a cargar HAProxy cada 10 minutos** (por ejemplo, `service haproxy reload`) para forzar una actualización de la caché DNS de HAProxy, en caso de que `app.datadoghq.eu` conmute a otra IP.

{{% /site-region %}}

{{% /tab %}}

{{% tab "NGINX" %}}
### Uso de NGINX como proxy TCP para logs

#### Configuración del Agent

Edita el archivo de configuración `datadog.yaml` del Agent y define `logs_config.logs_dd_url` para que utilice el nuevo proxy en vez de establecer una conexión directa con Datadog:

```yaml
logs_config:
  force_use_tcp: true
  logs_dd_url: myProxyServer.myDomain:10514
```

**Nota**: No cambies el parámetro `logs_no_ssl`, ya que NGINX está reenviando el tráfico a Datadog y no descifra ni cifra el tráfico.

#### Configuración de NGINX

En este ejemplo, `nginx.conf` se puede utilizar para representar el tráfico del Agent a Datadog. El último bloque de servidor en esta configuración envuelve TLS para asegurar que los logs internos de texto plano sean encriptados entre tu proxy y el endpoint de la API de admisión de logs de Datadog:

{{% site-region region="us" %}}

```conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;
events {
    worker_connections 1024;
}
# Proxy TCP para el Datadog Agent
stream {
    server {
        listen 10514; #escuchar logs
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
# Proxy TCP para el Datadog Agent
stream {
    server {
        listen 10514; #escuchar logs
        proxy_ssl on;
        proxy_pass agent-intake.logs.datadoghq.com:10516;
    }
}
```

{{% /site-region %}}
{{% /tab %}}
{{< /tabs >}}
{{% /site-region %}}


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/logs/log_transport?tab=https
[2]: /es/agent/configuration/proxy/