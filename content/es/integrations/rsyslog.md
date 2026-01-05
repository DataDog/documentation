---
aliases:
- /es/logs/log_collection/rsyslog
categories:
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/rsyslog.md
description: Configura Rsyslog para recopilar logs de tu host, contenedores y servicios.
doc_link: /integrations/rsyslog/
further_reading:
- link: https://www.datadoghq.com/architecture/using-rsyslog-to-send-logs-to-datadog/
  tag: Centro de arquitectura
  text: Uso de Rsyslog para enviar logs a Datadog
has_logo: true
integration_id: rsyslog
integration_title: rsyslog
is_public: true
name: Rsyslog
public_title: Integración de Rsyslog con Datadog
short_description: Configura Rsyslog para recopilar logs de tu host, contenedores
  y servicios.
supported_os:
- Linux
title: Rsyslog
---

## Información general

Configura Rsyslog para recopilar logs de tu host, contenedores y servicios.

## Configuración

### Recopilación de logs

#### Rsyslog versión 8 o posterior
<div class="alert alert-info"> A partir de la <a href="https://www.rsyslog.com/doc/configuration/modules/imfile.html#mode">versión 8.1.5</a> Rsyslog recomienda el modo <code>inotify</code>. Tradicionalmente, <code>imfile</code> utilizaba el modo polling, que consume muchos más recursos (y es más lento) que el modo <code>inotify</code>. </div>

{{< tabs >}}

{{% tab "Ubuntu y Debian" %}}

1. Habilita el módulo `imfile` para monitorizar archivos específicos de logs. Para añadir el módulo `imfile`, añada lo siguiente a tu `rsyslog.conf`:

    ```conf
    module(load="imfile" PollingInterval="10") #needs to be done just once
    ```

2. Crea un archivo `/etc/rsyslog.d/datadog.conf`.

{{< site-region region="us,eu" >}}

3. En `/etc/rsyslog.d/datadog.conf`, añade la siguiente configuración y sustituye `<site_url>` por **{{< region-param key="dd_site" >}}** y `<API_KEY>` por tu clave de API Datadog. Debes incluir una línea `input` distinta para cada archivo de log que quieras monitorizar:

   ```conf
   ## For each file to send
   input(type="imfile" ruleset="infiles" Tag="<APP_NAME_OF_FILE1>" File="<PATH_TO_FILE1>")

   ## Set the Datadog Format to send the logs
   $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"

   ruleset(name="infiles") {
   action(type="omfwd" protocol="tcp" target="intake.logs.<site_url>" port="10514" template="DatadogFormat")
   }
   ```

{{< /site-region >}}

{{< site-region region="us3,us5,ap1,gov" >}}

3. En `/etc/rsyslog.d/datadog.conf`, añade la siguiente configuración y sustituye `<site_url>` por **{{< region-param key="dd_site" >}}** y `<API_KEY>` por tu clave de API Datadog. Debes incluir una línea `input` distinta para cada archivo de log que quieras monitorizar:

   ```conf
   ## For each file to send
   input(type="imfile" ruleset="infiles" Tag="<TAGS>" File="<PATH_TO_FILE1>")

   ## Set the Datadog Format to send the logs
   template(name="test_template" type="list") { constant(value="{") property(name="msg" outname="message" format="jsonfr") constant(value="}")}

   # include the omhttp module
   module(load="omhttp")

   ruleset(name="infiles") {
      action(type="omhttp" server="http-intake.logs.<site_url>" serverport="443" restpath="api/v2/logs" template="test_template" httpheaders=["DD-API-KEY: <API_KEY>", "Content-Type: application/json"])
   }
   ```
{{< /site-region >}}

4. Reinicia Rsyslog. Tus nuevos Logs se reenviarán directamente a tu cuenta de Datadog.
   ```shell
   sudo systemctl restart rsyslog
   ```

5. Asocia tus logs con las métricas y las etiquetas (tags) del host.

   Para asegurarte de que tus logs están asociados a las métricas y las etiquetas del mismo host en tu cuenta de Datadog, configura el `HOSTNAME` en tu `rsyslog.conf` para que coincida con el nombre de host de tus métricas de Datadog.
   - Si especificaste un nombre de host en `datadog.conf` o `datadog.yaml`, sustituye el valor `%HOSTNAME%` en `rsyslog.conf` para que coincida con tu nombre de host.
   - Si no especificaste un nombre de host en `datadog.conf` o `datadog.yaml`, no necesitas cambiar nada.

6. Para sacar el máximo partido de tus logs en Datadog, define un origen para los logs.
   - Si [reenvías tus logs al Datadog Agent][1], puedes definir el origen en el archivo de configuración del Agent.
   - Si no vas a reenviar tus logs al Datadog Agent, crea un archivo de configuración distinto para cada origen en `/etc/rsyslog.d/`.

     Para definir el origen, utiliza el siguiente formato (si tienes varios orígenes, cambia el nombre del formato en cada archivo):

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
     ```

     Puedes añadir etiquetas personalizadas con el atributo `ddtags`:

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
     ```

7. (Opcional) Datadog corta las conexiones inactivas tras un periodo de inactividad. Algunas versiones de Rsyslog no son capaces de reconectarse cuando es necesario. Para mitigar este problema, utiliza marcadores de tiempo para que la conexión nunca se interrumpa:

   1. Añade las siguientes líneas a tu archivo de configuración de Rsyslog:

      ```conf
      $ModLoad immark
      $MarkMessagePeriod 20
      ```

   2. Reinicia el servicio Rsyslog:

      ```shell
      sudo systemctl restart rsyslog
      ```

{{% site-region region="us" %}}
8. (Opcional) Añade el cifrado TLS a los logs enviados desde Rsyslog a tu cuenta de Datadog.
   1. Instala los paquetes `rsyslog-gnutls` y `ca-certificates`:
      ```shell
      sudo apt-get install rsyslog-gnutls ca-certificates
      ```
   2. Añade la siguiente línea al final de tu archivo `/etc/rsyslog.d/datadog.conf`:
      ```conf
      ## Define the destination for the logs
      $DefaultNetstreamDriverCAFile /etc/ssl/certs/ca-certificates.crt
      ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="intake.logs.datadoghq.com" port="10516" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.com" )
      }
      ```
   3. Reinicia el servicio Rsyslog:

      ```shell
      sudo systemctl restart rsyslog
      ```
{{% /site-region %}}
{{% site-region region="eu" %}}

8. (Opcional) Añade el cifrado TLS a los logs enviados desde Rsyslog a tu cuenta de Datadog.
   1. Instala los paquetes `rsyslog-gnutls` y `ca-certificates`:
      ```shell
      sudo apt-get install rsyslog-gnutls ca-certificates
      ```

   2. Añade la siguiente línea al final de tu archivo `/etc/rsyslog.d/datadog.conf`:
      ```conf
      ## Define the destination for the logs
      $DefaultNetstreamDriverCAFile /etc/ssl/certs/ca-certificates.crt
      ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="tcp-intake.logs.datadoghq.eu" port="443" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.eu" )
      }
       ```
   3. Reinicia el servicio Rsyslog:

      ```shell
      sudo systemctl restart rsyslog
      ```
{{% /site-region %}}

[1]: /es/agent/logs/
{{% /tab %}}

{{% tab "Amazon Linux, CentOS y Red Hat" %}}
1. Habilita el módulo `imfile` para monitorizar archivos específicos de logs. Para añadir el módulo `imfile`, añada lo siguiente a tu `rsyslog.conf`:

    ```conf
    module(load="imfile" PollingInterval="10") #needs to be done just once
    ```

2. Crea un archivo `/etc/rsyslog.d/datadog.conf`.

{{< site-region region="us,eu" >}}

3. En `/etc/rsyslog.d/datadog.conf`, añade la siguiente configuración y sustituye `<site_url>` por **{{< region-param key="dd_site" >}}** y `<API_KEY>` por tu clave de API Datadog. Debes incluir una línea `input` distinta para cada archivo de log que quieras monitorizar:

   ```conf
   ## For each file to send
   input(type="imfile" ruleset="infiles" Tag="<APP_NAME_OF_FILE1>" File="<PATH_TO_FILE1>")

   ## Set the Datadog Format to send the logs
   $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"

   ruleset(name="infiles") {
   action(type="omfwd" protocol="tcp" target="intake.logs.<site_url>" port="10514" template="DatadogFormat")
   }
   ```

{{< /site-region >}}

{{< site-region region="us3,us5,ap1,gov" >}}

3. En `/etc/rsyslog.d/datadog.conf`, añade la siguiente configuración y sustituye `<site_url>` por **{{< region-param key="dd_site" >}}** y `<API_KEY>` por tu clave de API Datadog. Debes incluir una línea `input` distinta para cada archivo de log que quieras monitorizar:

   ```conf
   ## For each file to send
   input(type="imfile" ruleset="infiles" Tag="<TAGS>" File="<PATH_TO_FILE1>")

   ## Set the Datadog Format to send the logs
   template(name="test_template" type="list") { constant(value="{") property(name="msg" outname="message" format="jsonfr") constant(value="}")}

   # include the omhttp module
   module(load="omhttp")

   ruleset(name="infiles") {
      action(type="omhttp" server="http-intake.logs.<site_url>" serverport="443" restpath="api/v2/logs" template="test_template" httpheaders=["DD-API-KEY: <API_KEY>", "Content-Type: application/json"])
   }
   ```
{{< /site-region >}}

4. Reinicia Rsyslog. Tus nuevos Logs se reenviarán directamente a tu cuenta de Datadog.
   ```shell
   sudo systemctl restart rsyslog
   ```

5. Asocia tus logs con las métricas y las etiquetas del host.

   Para asegurarte de que tus logs están asociados a las métricas y las etiquetas del mismo host en tu cuenta de Datadog, configura el `HOSTNAME` en tu `rsyslog.conf` para que coincida con el nombre de host de tus métricas de Datadog.
   - Si especificaste un nombre de host en `datadog.conf` o `datadog.yaml`, sustituye el valor `%HOSTNAME%` en `rsyslog.conf` para que coincida con tu nombre de host.
   - Si no especificaste un nombre de host en `datadog.conf` o `datadog.yaml`, no necesitas cambiar nada.

6. Para sacar el máximo partido de tus logs en Datadog, define un origen para los logs.
   - Si [reenvías tus logs al Datadog Agent][1], puedes definir el origen en el archivo de configuración del Agent.
   - Si no vas a reenviar tus logs al Datadog Agent, crea un archivo de configuración distinto para cada origen en `/etc/rsyslog.d/`.

     Para definir el origen, utiliza el siguiente formato (si tienes varios orígenes, cambia el nombre del formato en cada archivo):

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
     ```

     Puedes añadir etiquetas personalizadas con el atributo `ddtags`:

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
     ```

7. (Opcional) Datadog corta las conexiones inactivas tras un periodo de inactividad. Algunas versiones de Rsyslog no son capaces de reconectarse cuando es necesario. Para mitigar este problema, utiliza marcadores de tiempo para que la conexión nunca se interrumpa:

   1. Añade las dos siguientes líneas a tu archivo de configuración de Rsyslog:

      ```conf
      $ModLoad immark
      $MarkMessagePeriod 20
      ```

   2. Reinicia el servicio Rsyslog:

      ```shell
      sudo systemctl restart rsyslog
      ```

{{% site-region region="us" %}}
8. (Opcional) Añade el cifrado TLS a los logs enviados desde Rsyslog a tu cuenta de Datadog.
   1. Instala los paquetes `rsyslog-gnutls` y `ca-certificates`:
      ```shell
      sudo yum install rsyslog-gnutls ca-certificates
      ```
   2. Añade la siguiente línea al final de tu archivo `/etc/rsyslog.d/datadog.conf`:
      ```conf
      ## Define the destination for the logs
      $DefaultNetstreamDriverCAFile /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
      ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="intake.logs.datadoghq.com" port="10516" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.com" )
      }
      ```
   3. Reinicia el servicio Rsyslog:

      ```shell
      sudo systemctl restart rsyslog
      ```
{{% /site-region %}}

{{% site-region region="eu" %}}

8. (Opcional) Añade el cifrado TLS a los logs enviados desde Rsyslog a tu cuenta de Datadog.
   1. Instala los paquetes `rsyslog-gnutls` y `ca-certificates`:
      ```shell
      sudo yum install rsyslog-gnutls ca-certificates
      ```

   2. Añade la siguiente línea al final de tu archivo `/etc/rsyslog.d/datadog.conf`:
      ```conf
      ## Define the destination for the logs
      $DefaultNetstreamDriverCAFile /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
      ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="tcp-intake.logs.datadoghq.eu" port="443" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.eu" )
      }
       ```
   3. Reinicia el servicio Rsyslog:

      ```shell
      sudo systemctl restart rsyslog
      ```
{{% /site-region %}}

[1]: /es/agent/logs/
{{% /tab %}}

{{% tab "Fedora" %}}
1. Habilita el módulo `imfile` para monitorizar archivos específicos de logs. Para añadir el módulo `imfile`, añada lo siguiente a tu `rsyslog.conf`:

    ```conf
    module(load="imfile" PollingInterval="10") #needs to be done just once
    ```

2. Crea un archivo `/etc/rsyslog.d/datadog.conf`.


{{< site-region region="us,eu" >}}

3. En `/etc/rsyslog.d/datadog.conf`, añade la siguiente configuración y sustituye `<site_url>` por **{{< region-param key="dd_site" >}}** y `<API_KEY>` por tu clave de API Datadog. Debes incluir una línea `input` distinta para cada archivo de log que quieras monitorizar:

   ```conf
   ## For each file to send
   input(type="imfile" ruleset="infiles" Tag="<APP_NAME_OF_FILE1>" File="<PATH_TO_FILE1>")

   ## Set the Datadog Format to send the logs
   $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - - %msg%\n"

   ruleset(name="infiles") {
   action(type="omfwd" protocol="tcp" target="intake.logs.<site_url>" port="10514" template="DatadogFormat")
   }
   ```

{{< /site-region >}}

{{< site-region region="us3,us5,ap1,gov" >}}

3. En `/etc/rsyslog.d/datadog.conf`, añade la siguiente configuración y sustituye `<site_url>` por **{{< region-param key="dd_site" >}}** y `<API_KEY>` por tu clave de API Datadog. Debes incluir una línea `input` distinta para cada archivo de log que quieras monitorizar:

   ```conf
   ## For each file to send
   input(type="imfile" ruleset="infiles" Tag="<TAGS>" File="<PATH_TO_FILE1>")

   ## Set the Datadog Format to send the logs
   template(name="test_template" type="list") { constant(value="{") property(name="msg" outname="message" format="jsonfr") constant(value="}")}

   # include the omhttp module
   module(load="omhttp")

   ruleset(name="infiles") {
      action(type="omhttp" server="http-intake.logs.<site_url>" serverport="443" restpath="api/v2/logs" template="test_template" httpheaders=["DD-API-KEY: <API_KEY>", "Content-Type: application/json"])
   }
   ```
{{< /site-region >}}

4. Reinicia Rsyslog. Tus nuevos Logs se reenviarán directamente a tu cuenta de Datadog.
   ```shell
   sudo systemctl restart rsyslog
   ```

5. Asocia tus logs con las métricas y las etiquetas del host.

   Para asegurarte de que tus logs están asociados a las métricas y las etiquetas del mismo host en tu cuenta de Datadog, configura el `HOSTNAME` en tu `rsyslog.conf` para que coincida con el nombre de host de tus métricas de Datadog.
   - Si especificaste un nombre de host en `datadog.conf` o `datadog.yaml`, sustituye el valor `%HOSTNAME%` en `rsyslog.conf` para que coincida con tu nombre de host.
   - Si no especificaste un nombre de host en `datadog.conf` o `datadog.yaml`, no necesitas cambiar nada.

6. Para sacar el máximo partido de tus logs en Datadog, define un origen para los logs.
   - Si [reenvías tus logs al Datadog Agent][1], puedes definir el origen en el archivo de configuración del Agent.
   - Si no vas a reenviar tus logs al Datadog Agent, crea un archivo de configuración distinto para cada origen en `/etc/rsyslog.d/`.

     Para definir el origen, utiliza el siguiente formato (si tienes varios orígenes, cambia el nombre del formato en cada archivo):

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\"] %msg%\n"
     ```

     Puedes añadir etiquetas personalizadas con el atributo `ddtags`:

     ```conf
     $template DatadogFormat,"<DATADOG_API_KEY> <%pri%>%protocol-version% %timestamp:::date-rfc3339% %HOSTNAME% %app-name% - - [metas ddsource=\"<MY_SOURCE_NAME>\" ddtags=\"env:dev,<KEY:VALUE>\"] %msg%\n"
     ```

7. (Opcional) Datadog corta las conexiones inactivas tras un periodo de inactividad. Algunas versiones de Rsyslog no son capaces de reconectarse cuando es necesario. Para mitigar este problema, utiliza marcadores de tiempo para que la conexión nunca se interrumpa:

   1. Añade las dos siguientes líneas a tu archivo de configuración de Rsyslog:

      ```conf
      $ModLoad immark
      $MarkMessagePeriod 20
      ```

   2. Reinicia el servicio Rsyslog:

      ```shell
      sudo systemctl restart rsyslog
      ```

{{% site-region region="us" %}}
8. (Opcional) Añade el cifrado TLS a los logs enviados desde Rsyslog a tu cuenta de Datadog.
   1. Instala los paquetes `rsyslog-gnutls` y `ca-certificates`:
      ```shell
      sudo dnf install rsyslog-gnutls ca-certificates
      ```
   2. Añade la siguiente línea al final de tu archivo `/etc/rsyslog.d/datadog.conf`:
      ```conf
      ## Define the destination for the logs
      $DefaultNetstreamDriverCAFile /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
      ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="intake.logs.datadoghq.com" port="10516" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.com" )
      }
      ```
   3. Reinicia el servicio Rsyslog:

      ```shell
      sudo systemctl restart rsyslog
      ```
{{% /site-region %}}

{{% site-region region="eu" %}}

8. (Opcional) Añade el cifrado TLS a los logs enviados desde Rsyslog a tu cuenta de Datadog.
   1. Instala los paquetes `rsyslog-gnutls` y `ca-certificates`:
      ```shell
      sudo dnf install rsyslog-gnutls ca-certificates
      ```

   2. Añade la siguiente línea al final de tu archivo `/etc/rsyslog.d/datadog.conf`:
      ```conf
      ## Define the destination for the logs
      $DefaultNetstreamDriverCAFile /etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem
      ruleset(name="infiles") {
          action(type="omfwd" protocol="tcp" target="tcp-intake.logs.datadoghq.eu" port="443" template="DatadogFormat" StreamDriver="gtls" StreamDriverMode="1" StreamDriverAuthMode="x509/name" StreamDriverPermittedPeers="*.logs.datadoghq.eu" )
      }
       ```
   3. Reinicia el servicio Rsyslog:

      ```shell
      sudo systemctl restart rsyslog
      ```
{{% /site-region %}}

[1]: /es/agent/logs/
{{% /tab %}}

{{< /tabs >}}

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][1].

[1]: /es/help/