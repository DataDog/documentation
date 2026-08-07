---
aliases:
- /es/logs/log_collection/syslog_ng
categories:
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/syslog_ng.md
description: Configura Syslog-ng para recopilar logs de tus hosts, contenedores y
  servicios.
doc_link: /integrations/syslog_ng/
has_logo: true
integration_id: syslog_ng
integration_title: syslog_ng
is_public: true
name: syslog_ng
public_title: Integración de Datadog y Syslog-ng
short_description: Configura Syslog-ng para recopilar logs de tus hosts, contenedores
  y servicios.
supported_os:
- linux
- windows
title: Syslog-ng
---

## Información general

Configura Syslog-ng para recopilar logs de tus hosts, contenedores y servicios.

## Configuración

### Recopilación de logs

1. Recopila logs del sistema y archivos de logs en `/etc/syslog-ng/syslog-ng.conf` y asegúrate de que la fuente esté correctamente definida:

    ```conf
    source s_src {
    system();
    internal();

    };
    ```

   Si quieres monitorizar archivos, añade la siguiente fuente:

    ```conf
    #########################
    # Sources
    #########################

    ...

    source s_files {
    file("path/to/your/file1.log",flags(no-parse),follow_freq(1),program_override("<program_name_file1>"));
    file("path/to/your/file2.log",flags(no-parse),follow_freq(1),program_override("<program_name_file2>"));

    };
    ```

2. Define el formato de log correcto:

    ```conf
    #########################
    # Destination
    #########################

    ...

    # For Datadog platform:
    destination d_datadog {
      http(
          url("https://http-intake.logs.{{< region-param key="dd_site" code="true" >}}/api/v2/logs?ddsource=<SOURCE>&ddtags=<TAG_1:VALUE_1,TAG_2:VALUE_2>")
          method("POST")
          headers("Content-Type: application/json", "Accept: application/json", "DD-API-KEY: <DATADOG_API_KEY>")
          body("<${PRI}>1 ${ISODATE} ${HOST:--} ${PROGRAM:--} ${PID:--} ${MSGID:--} ${SDATA:--} $MSG\n")
      );
    };
    ```

3. Define la salida en la sección de la ruta:

    ```conf
    #########################
    # Log Path
    #########################

    ...

    log { source(s_src); source(s_files); destination(d_datadog); };
    ```

4. Reinicia syslog-ng.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][2].

[1]: https://syslog-ng.com/documents/html/syslog-ng-ose-latest-guides/en/syslog-ng-ose-guide-admin/html/tlsoptions.html
[2]: /es/help/