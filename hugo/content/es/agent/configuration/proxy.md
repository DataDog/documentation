---
algolia:
  tags:
  - agent proxy
aliases:
- /es/account_management/faq/can-i-use-a-proxy-to-connect-my-servers-to-datadog/
- /es/agent/proxy
description: Configure el Datadog Agent para enviar tráfico a través de proxies HTTP/HTTPS,
  con opciones de autenticación y de omisión.
further_reading:
- link: /logs/
  tag: Documentación
  text: Recopile sus registros
- link: /infrastructure/process/
  tag: Documentación
  text: Recopile sus procesos
- link: /tracing/
  tag: Documentación
  text: Recopile sus trazas y perfiles
- link: /agent/configuration/fips-compliance
  tag: Documentación
  text: Cumplimiento de FIPS de Datadog
title: Configuración del Proxy del Agente de Datadog
---
Puede configurar el Datadog Agent para enviar tráfico a través de un proxy HTTP/HTTPS. Un proxy se utiliza típicamente para enviar tráfico desde un servidor que no está conectado directamente a la Internet pública.

## Configure el Datadog Agent {#configure-the-datadog-agent}

Hay dos opciones para configurar el Datadog Agent para usar un proxy.
- Puede usar el archivo de configuración del Datadog Agent.
- Puede usar variables de entorno. Las variables de entorno anulan la configuración del archivo de configuración.

### Archivo de configuración {#configuration-file}

Para configurar un proxy mediante un archivo de configuración, edite o agregue la sección `proxy` al archivo de configuración principal del Datadog Agent (`datadog.yaml`) y luego [reinicie el Datadog Agent][1].

```yaml
proxy:
  # Required: Proxy endpoint for HTTP connections
  http: http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>
  # Required: Proxy endpoint for HTTPS connections (most Datadog traffic)
  https: http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>

  # Optional: List of hosts or CIDR ranges to bypass the proxy
  # Example:
  # no_proxy:
  #   - 192.168.0.0/24
  #   - localhost
  #   - .myinternaldomain.com
  no_proxy:
    - <HOST_TO_BYPASS_1>
    - <HOST_TO_BYPASS_2>

# Recommended: Set to true to ensure no_proxy behaves in a standard way
no_proxy_nonexact_match: true

# Recommended: Force the Agent to use HTTP to send logs (if logs is enabled)
logs_config:
  force_use_http: true
```

* Reemplace `<USER>`, `<PASSWORD>`, `<PROXY_HOST>` y `<PROXY_PORT>` con sus credenciales y dirección del proxy.
* Un nombre de usuario y una contraseña son opcionales.
* Especifique `http`, `https` o ambos, dependiendo de la configuración y necesidades de su proxy. La mayoría del tráfico de Datadog utiliza HTTPS.
* Utilice `no_proxy` para especificar los servidores a los que el Datadog Agent debe conectarse directamente, evitando el proxy.
* **[Reinicie el Datadog Agent][1]** para que los cambios surtan efecto.

Para obtener más información sobre cómo localizar el archivo de configuración en su sistema operativo, consulte [Archivos de Configuración del Datadog Agent][2].

### Variables de entorno {#environment-variables}

Alternativamente, puede configurar un proxy estableciendo las siguientes variables de entorno. Cuando haya terminado, [reinicie el Datadog Agent][1].

```bash
DD_PROXY_HTTP="http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>"
DD_PROXY_HTTPS="http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>"

DD_PROXY_NO_PROXY="<HOST_TO_BYPASS_1> <HOST_TO_BYPASS_2>"
DD_NO_PROXY_NONEXACT_MATCH=true

DD_LOGS_CONFIG_FORCE_USE_HTTP=true
```

## Ejemplos de Configuración del Servidor Proxy {#proxy-server-setup-examples}

Si no tiene un servidor proxy existente, Datadog recomienda usar un proxy HTTP como **Squid**.

1. **Squid (Recomendado)**: Un proxy HTTP/HTTPS robusto que simplifica la configuración al redirigir de forma transparente todo el tráfico saliente del Datadog Agent. [Usando un proxy Squid][3].
2. **HAProxy (No Recomendado)**: Puede reenviar tráfico a Datadog, pero esto requiere mantener una lista actualizada de dominios de Datadog y es más complejo de gestionar. [Ver Ejemplo de Configuración de HAProxy][4].
3. **NGINX (No Recomendado)**: Similar a HAProxy, se desaconseja usar NGINX para reenviar tráfico a Datadog debido a la carga de mantenimiento de mantener actualizadas las listas de dominios. [Ver Ejemplo de Configuración de NGINX][5].

Datadog desaconseja reenviar tráfico utilizando software como HAProxy o NGINX, ya que esto requiere configurar y mantener manualmente la lista de puntos de conexión específicos de Datadog a los que el Datadog Agent debe conectarse. Esta lista puede cambiar, lo que puede llevar a la pérdida de datos si no se mantiene actualizada. La única excepción es si necesita capacidades de Inspección Profunda de Paquetes (DPI), en cuyo caso podría considerar usar HAProxy o NGINX, ya que le permiten deshabilitar TLS o usar sus propios certificados TLS e inspeccionar el tráfico.

## Verificación {#verification}

Verifique el comando de estado del Agente y revise los registros del Agente (`agent.log`, `trace-agent.log`, etc.) en busca de errores de conexión después de reiniciar.

## Proxy FIPS (US1-FED) {#fips-proxy-us1-fed}

Para obtener información sobre cómo configurar el Proxy FIPS del Datadog Agent, consulte [Datadog FIPS Compliance][6]. El proxy FIPS solo está disponible en la región US1-FED. El Proxy FIPS del Datadog Agent no se puede utilizar junto con un proxy regular.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/configuration/agent-commands/#restart-the-agent
[2]: /es/agent/configuration/agent-configuration-files/#main-configuration-file
[3]: /es/agent/configuration/proxy_squid/
[4]: /es/agent/faq/proxy_example_haproxy/
[5]: /es/agent/faq/proxy_example_nginx/
[6]: /es/agent/configuration/fips-compliance/