---
aliases:
- /es/integrations/faq/how-to-add-event-log-files-to-the-win32-ntlogevent-wmi-class
title: Añadir archivos de logs de eventos a la clase Win32_NTLogEvent WMI
---

No todos los logs de eventos están en la clase Win32_NTLogEvent WMI. Debido a que la integración Visor de eventos sólo puede recopilar eventos de esta clase, necesitas modificar el Windows Registry para añadir logs de eventos fuera del contexto de esta clase.

El primer paso es confirmar si se puede o no acceder al archivo de logs a través de Win32_NTLogEvent utilizando la siguiente consulta WMI en Powershell. (Se trata de la misma consulta que el Agent ejecuta para recopilar estos eventos)

```text
$ Get-WmiObject -Query "Select EventCode,SourceName,TimeGenerated,Type,InsertionStrings,Message,Logfile from Win32_NTLogEvent WHERE ( LogFile = '<LogFileName>' )" | select -First 1
```

Si no hay resultados, no se puede acceder al archivo de logs y es necesario añadirlo a través del Registro de Windows.

Localiza los logs de eventos que quieres monitorizar en el Visor de eventos. Localiza el archivo de logs y haz clic en "Properties" (Propiedades) en la sección "Acciones" para encontrar la ruta de los logs y el nombre completo. Por ejemplo, así se configura la monitorización del archivo de logs de eventos "Operativo", ubicado en la carpeta Microsoft/Windows/TaskScheduler:
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_1.png" alt="Visor de eventos de Windows que muestra un archivo seleccionado, llamado Archivo, y la opción de editar la cadena. El campo Datos de valores está resaltado y muestra la ruta del log" >}}

Abre el Registro de Windows. (busca regedit.exe, el nombre por defecto del editor del registro). Dentro del editor del registro, localiza la carpeta EventLog en la siguiente ruta:

```text
\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\EventLog\
```

Crea una nueva clave con el nombre del log de eventos que quieres monitorizar. Utilizando la sintaxis de path-to-folder/LogFileName (como en el nombre completo que aparece en el Visor de eventos).
{{< img src="integraciones/guide/windows_event_logs_with_wmi/event_viewer_2.png" alt="Carpeta EventLog expandida, con un clic hecho para mostrar su submenú. En este, la opción Nuevo está seleccionada y abre un nuevo submenú. La clave está resaltada con un cuadro rojo" >}}

{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_3.png" alt="Carpeta EventLog expandida para mostrar Microsoft-Windows-TaskScheduler/Operativo resaltado con un cuadro rojo" >}}

Después de crear la clave, añade tres valores a esta clave. En primer lugar, añade la ruta al archivo de logs como un valor de cadena (REG_SZ) llamado "Archivo":
{{< img src="integraciones/guide/windows_event_logs_with_wmi/event_viewer_4.png" alt="Visor de eventos de Windows que muestra un archivo seleccionado, llamado Archivo, y la opción de editar la cadena. El campo Datos de valores está resaltado y muestra la ruta del log" >}}

A continuación, añada el nombre completo del archivo de logs como valor de cadena (REG_SZ) llamado "Módulo primario":
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_5.png" alt="Visor de eventos de Windows que muestra un archivo seleccionado, llamado Módulo primario, y la opción de editar la cadena. El campo Datos de valores está resaltado y muestra el nombre completo" >}}

Por último, añada la ruta a la DLL (wevtapi.dll) de la API del log de eventos de Windows, que debe estar en `%SystemRoot%\system32\wevtapi.dll` como un valor de cadena expandible con el nombre "DisplayNameFile":
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_6.png" alt="Visor de eventos de Windows que muestra un archivo seleccionado, llamado DisplayNameFile, y la opción de editar la cadena. El campo Datos de valores está resaltado" >}}

Los cambios deberían ser inmediatos. Para confirmar que el log de eventos es accesible a través de la clase Win32_NTLogEvent WMI, reintenta la consulta anterior. A continuación, puedes continuar añadiendo eventos al archivo de configuración de la integración del Visor de eventos.

Nota: Si sigue sin haber eventos al ejecutar la consulta, comprueba el Visor de eventos para confirmar si hay algún evento en el archivo de logs. Además, asegúrate de que el log de eventos no está desactivado y de que hay eventos recientes disponibles.
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_7.png" alt="Visor de eventos de Windows que muestra una lista de acciones a la derecha. La acción de activación de logs está resaltada con una nota para indicar que se pueden activar logs allí." >}}