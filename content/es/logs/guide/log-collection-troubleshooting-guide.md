---
aliases:
- /es/logs/faq/log-collection-troubleshooting-guide
further_reading:
- link: /logs/log_collection/
  tag: Documentación
  text: Aprender a recopilar tus logs
- link: /logs/explorer/
  tag: Documentación
  text: Aprender a explorar tus logs
- link: /logs/guide//logs-not-showing-expected-timestamp/
  tag: Guía
  text: ¿Por qué mis logs no tienen la marca de tiempo esperada?
- link: /logs/guide/logs-show-info-status-for-warnings-or-errors/
  tag: Guía
  text: ¿Por qué mis logs aparecen con el estado de información, incluso cuando se
    trata de advertencias o errores?
kind: guía
title: Guía para la resolución de problemas con la recopilación de logs
---

Existen una serie de problemas comunes que pueden surgir al [enviar nuevos logs a Datadog][1] a través del recopilador de logs en `dd-agent`. Si tienes problemas al enviar nuevos logs a Datadog, esta lista te ayudará a solucionarlos. Si sigues teniendo problemas, [ponte en contacto con el servicio de asistencia de Datadog][2] para obtener más ayuda.

## Reinicio del Agent

Los cambios en la configuración del `datadog-agent` no se tendrán en cuenta hasta que [reinicies el Agent][3].

## El tráfico saliente en el puerto 10516 está bloqueado

El Datadog Agent envía sus logs a Datadog a través de TCP utilizando el puerto 10516. Si esa conexión no está disponible, los logs no se pueden enviar y se registra un error en el archivo `agent.log`.

Puedes probar manualmente tu conexión utilizando OpenSSL, GnuTLS u otro cliente SSL/TLS. Para OpenSSL, ejecuta el siguiente comando:

```shell
openssl s_client -connect intake.logs.datadoghq.com:10516
```

Para GnuTLS, ejecuta el siguiente comando:

```shell
gnutls-cli intake.logs.datadoghq.com:10516
```

Y luego, enviando un log como el siguiente:

```texto
<API_KEY> este es un mensaje de prueba
```

- Si abrir el puerto 10516 no es una opción, es posible configurar el Datadog Agent para enviar logs a través de HTTPS, añadiendo lo siguiente en `datadog.yaml`:

```yaml
logs_config:
  force_use_http: true
```

Para obtener más información, consulta la sección sobre el [reenvío HTTPS de logs][4].

## Comprobar el estado del Agent

A menudo, comprobar los resultados del [comando de estado del Agent][5] te ayudará a solucionar lo que está ocurriendo.

## No se han escrito nuevos logs 

El Datadog Agent sólo recopila los logs que se han escrito después de que empezara a intentar recopilarlos (ya sea rastreándolos o escuchándolos). Para confirmar si se ha configurado correctamente la recopilación de logs, asegúrate de que se han escrito nuevos logs.

## Problemas de permisos al rastrear archivos de logs

El Datadog Agent no se ejecuta como raíz (y como práctica recomendada general se recomienda no ejecutarlo como raíz). Cuando configuras tu Agent para rastrear archivos de logs en logs personalizados o en integraciones, necesitas tener especial cuidado para garantizar que el usuario del Agent tiene el acceso correcto a los archivos de logs.

.El usuario por defecto del Agent por sistema operativo:
| Sistema operativo | Usuario por defecto del Agent |
| --------------- | ------------------ |
| Linux: `datadog-agent` 
| MacOS `datadog-agent` 
| Windows `ddagentuser` 

Si el Agent no tiene los permisos correctos, es posible que aparezca uno de los siguientes mensajes de error cuando compruebes el [estado del Agent][5]:
- El archivo no existe.
- Acceso denegado.
- No se ha podido encontrar ningún archivo que coincida con el patrón `<path/to/filename>`. Comprueba que todos sus subdirectorios son ejecutables.

Para solucionar el error, concede al usuario del Datadog Agent permisos de lectura y ejecución en el archivo del log y en sus subdirectorios.

{{< tabs >}}
{{% tab "Linux" %}}
1. Para obtener más información sobre permisos de archivos, ejecuta el comando `namei`:
   ```
   > namei -m /path/to/log/file
   ```

   En el siguiente ejemplo, el usuario del Agent no tiene permisos de `execute` en el directorio `application`, ni permisos de lectura en el archivo `error.log`.

   ```
   > namei -m /var/log/application/error.log
   > f: /var/log/application/
   drwxr-xr-x /
   drwxr-xr-x var
   drwxrwxr-x log
   drw-r--r-- application
   -rw-r----- error.log
   ```

1. Haz que la carpeta de logs y sus elementos secundarios sean legibles:

   ```bash
   sudo chmod o+rx /path/to/logs
   ```

**Nota**: Asegúrate de que estos permisos están correctamente configurados en tu configuración de rotación de logs. De lo contrario, en la siguiente rotación de logs, el Datadog Agent podría perder sus permisos de lectura. Configura los permisos como `644` configuración de rotación de logs, para asegurarte de que el Agent tiene acceso de lectura a los archivos.

{{% /tab %}}

{{% tab "Windows (cmd)" %}}
1. Para obtener más información sobre permisos de archivos, utiliza el comando `icacls` en la carpeta de logs:
   ```
   icacls path/to/logs/file /t
   ```
   La marca `/t` ejecuta el comando recursivamente en archivos y subcarpetas.

   En el siguiente ejemplo, el directorio `test` y sus elementos secundarios no son accesibles para el `ddagentuser`:

   ```powershell
   PS C:\Users\Administrator> icacls C:\test\ /t
   C:\test\ NT AUTHORITY\SYSTEM:(OI)(CI)(F)
          BUILTIN\Administrators:(OI)(CI)(F)
          CREATOR OWNER:(OI)(CI)(IO)(F)

   C:\test\file.log NT AUTHORITY\SYSTEM:(F)
          BUILTIN\Administrators:(F)

   C:\test\file2.log NT AUTHORITY\SYSTEM:(F)
          BUILTIN\Administrators:(F)
   ```

1. Utiliza el comando `icacls` para conceder a `ddagentuser` los permisos necesarios (incluye las comillas):
   ```
   icacls "path\to\folder" /grant "ddagentuser:(OI)(CI)(RX)" /t
   ```

   En caso de que la aplicación utilice la rotación de logs, los derechos de herencia `(OI)` y `(CI)` garantizan que cualquier futuro archivo de logs creado en el directorio podrá heredar los permisos de la carpeta principal.

1. Vuelve a ejecutar `icacls` para comprobar que el `ddagentuser` tiene los permisos correctos:
   ```powershell
   icacls path/to/logs/file /t
   ```

   En el siguiente ejemplo, `ddagentuser` aparece en la lista de permisos de archivos:
   ```powershell
   PS C:\Users\Administrator> icacls C:\test\ /t
   C:\test\ EC2-ABCD\ddagentuser:(OI)(CI)(RX)
          NT AUTHORITY\SYSTEM:(OI)(CI)(F)
          BUILTIN\Administrators:(OI)(CI)(F)
          CREATOR OWNER:(OI)(CI)(IO)(F)

   C:\test\file.log NT AUTHORITY\SYSTEM:(F)
                  BUILTIN\Administrators:(F)
                  EC2-ABCD\ddagentuser:(RX)

   C:\test\file2.log NT AUTHORITY\SYSTEM:(F)
                  BUILTIN\Administrators:(F)
                  EC2-ABCD\ddagentuser:(RX)
   Successfully processed 3 files; Failed processing 0 files
   ```

1. Reinicia el servicio del Agent y comprueba su estado para ver si el problema se ha resuelto:

   ```powershell
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" restart-service
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
   ```

{{% /tab %}}

{{% tab "Windows (PowerShell)" %}}

1. Recupera los permisos ACL del archivo:
   ```powershell
   PS C:\Users\Administrator> get-acl C:\app\logs | fl

   Path   : Microsoft.PowerShell.Core\FileSystem::C:\app\logs
   Owner  : BUILTIN\Administrators
   Group  : EC2-ABCD\None
   Access : NT AUTHORITY\SYSTEM Allow  FullControl
            BUILTIN\Administrators Allow  FullControl
   ...
   ```
   En este ejemplo, el directorio `application` no puede ser ejecutado por el Agent.

1. Ejecuta este script PowerShell para proporcionar privilegios de lectura y ejecución al `ddagentuser`:
   ```powershell
   $acl = Get-Acl <path\to\logs\folder>
   $AccessRule = New-Object System.Security.AccessControl.FileSystemAccessRule("ddagentuser","ReadAndExecute","Allow")
   $acl.SetAccessRule($AccessRule)
   $acl | Set-Acl <path\to\logs\folder>
   ```

1. Vuelve a recuperar los permisos ACL del archivo para comprobar si el `ddagentuser` tiene los permisos correctos:
   ```powershell
   PS C:\Users\Administrator> get-acl C:\app\logs | fl
   Path   : Microsoft.PowerShell.Core\FileSystem::C:\app\logs
   Owner  : BUILTIN\Administrators
   Group  : EC2-ABCD\None
   Access : EC2-ABCD\ddagentuser Allow  ReadAndExecute, Synchronize
            NT AUTHORITY\SYSTEM Allow  FullControl
            BUILTIN\Administrators Allow  FullControl
   ...
   ```

1. Reinicia el servicio del Agent y comprueba su estado para ver si el problema se ha resuelto:
   ```powershell
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" restart-service
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
   ```


{{% /tab %}}

{{< /tabs >}}

## Problemas de permisos y Journald

Cuando recopiles logs de Journald, asegúrate de que el usuario del Datadog Agent ha sido añadido al grupo systemd, como se muestra en la [integración Journald][7].

**Nota**: Journald envía una carga útil vacía si los permisos del archivo son incorrectos. Por lo tanto, no es posible lanzar o enviar un mensaje de error explícito en este caso.

## Problemas de configuración

Estos son algunos de los problemas de configuración frecuentes que deberías controlar más de dos veces al configurar el `datadog-agent`:

1. Comprueba si la `api_key` está definida en `datadog.yaml`.

2. Comprueba si tienes `logs_enabled: true` en tu `datadog.yaml`.

3. Por defecto, el Agent no recopila logs. Asegúrate de que hay al menos un archivo .yaml en el directorio `conf.d/` del Agent, que incluye una sección para logs y los valores apropiados.

4. Es posible que tengas algunos errores de análisis .yaml en tus archivos de configuración. El YAML puede ser quisquilloso, así que en caso de duda confía en un [validador de YAML][8].

### Comprobar si hay errores en logs del Agent

Puede que haya un error en los logs que explique el problema. Ejecuta el siguiente comando para comprobar si hay errores:

```shell
sudo grep -i error /var/log/datadog/agent.log
```

## Entorno Docker

Consulta la [Guía para la resolución de problemas de recopilación de logs de Docker][9].

## Entorno serverless

Consulta la [Guía para la resolución de problemas de recopilación de logs de Lambda][10]

## Pérdida inesperada de logs

Comprueba si aparecen logs en [Datadog Live Tail][11].

Si aparecen en Live Tail, consulta la página de configuración de índices y busca cualquier [filtro de exclusión][12] que pueda coincidir con tus logs.
Si no aparecen en Live Tail,, es posible que se hayan perdido, si su marca de tiempo superaba las 18 horas anteriores. Puedes consultar qué `service` y `source` pueden verse afectados con la métrica `datadog.estimated_usage.logs.drop_count`.

## Logs truncados

Los logs de más de 1 MB se truncan. Puedes consultar qué `service` y `source` se ven afectados con las métricas `datadog.estimated_usage.logs.truncated_count` y `datadog.estimated_usage.logs.truncated_bytes`.


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/
[2]: /es/help/
[3]: /es/agent/configuration/agent-commands/#restart-the-agent
[4]: /es/agent/logs/log_transport?tab=https#enforce-a-specific-transport
[5]: /es/agent/configuration/agent-commands/#agent-status-and-information
[7]: /es/integrations/journald/
[8]: https://codebeautify.org/yaml-validator
[9]: /es/logs/guide/docker-logs-collection-troubleshooting-guide/
[10]: /es/logs/guide/lambda-logs-collection-troubleshooting-guide/
[11]: https://app.datadoghq.com/logs/livetail
[12]: /es/logs/indexes/#exclusion-filters