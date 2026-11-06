---
description: Configure End User Device Monitoring para recopilar datos de rendimiento
  y conectividad de las computadoras de escritorio y portátiles de los empleados.
further_reading:
- link: /infrastructure/end_user_device_monitoring/
  tag: Documentación
  text: End User Device Monitoring
title: Configure End User Device Monitoring
---
{{< callout url="https://www.datadoghq.com/product-preview/end-user-device-monitoring/" btn_hidden="false" >}}
End User Device Monitoring está en versión preliminar. Para inscribirse, haga clic en <b>Solicitar acceso</b>.
{{< /callout >}}

Configure el Datadog Agent en las computadoras de escritorio y portátiles de los empleados para recopilar [End User Device Monitoring data][11].

<div class="alert alert-danger">Debe recibir la confirmación de acceso a la versión preliminar antes de que los datos aparezcan en Datadog. Después de enviar su solicitud, espere una confirmación de acceso antes de completar los pasos de configuración a continuación.</div>

## Plataformas compatibles {#supported-platforms}

- Windows 10 y versiones posteriores
- macOS 11 y versiones posteriores

## Configure el Datadog Agent {#set-up-the-datadog-agent}

1. Confirme que ha recibido acceso a la versión preliminar antes de continuar. Si no ha recibido confirmación, [solicite acceso][12] y espere la aprobación.

2. Siga las instrucciones de configuración para su plataforma:
    - [macOS][14]
    - [Windows][15]

## Próximos pasos {#next-steps}

Para recopilar datos adicionales de los dispositivos monitoreados, habilite una o más de las siguientes funciones o integraciones:

- [Live Processes][5]
- [Logs][6]
- [Network Path][7]
- [Integración de WiFi/WLAN][8]
- [Windows Crash Detection integration][9]
- [Windows Event Log][13]

## Primeros pasos {#getting-started}
Una vez que los dispositivos comiencen a aparecer, empiece a explorar los dispositivos de usuario final mediante:
1. **Asignar dispositivos a usuarios finales con una Reference Table.** En la página Configuración, haga clic en Editar para cargar una asignación entre los identificadores de dispositivo, como el nombre de host, y los atributos de usuario, como el nombre, el correo electrónico y el equipo.
2. **Pregunte a Bits sobre la salud y las tendencias de los dispositivos.** Abra [Bits Chat][16] y haga preguntas sobre el parque de dispositivos en lenguaje natural. Por ejemplo, pregunte qué dispositivos están usando la mayor cantidad de CPU, qué laptops tienen poca capacidad de batería o qué usuarios perdieron la conectividad.
3. **Consultar datos de dispositivos con el Datadog MCP Server.** Conecte un cliente de IA, como Cursor o Claude, al [Datadog MCP Server][17] para recuperar métricas de dispositivos, logs y telemetría relacionada a través de ese cliente. Consulte [Set up the Datadog MCP Server][18] para comenzar.
4. **Revisar el estado de la batería.** Cree un tablero con [métricas de batería][20] como la capacidad máxima, el recuento de ciclos y el estado de carga para identificar las laptops que deben reemplazarse.
5. **Rastrear la latencia hacia los destinos.** Configure [Network Path][7] en los dispositivos monitoreados para medir la latencia desde un dispositivo hasta un destino, como una aplicación SaaS, y encontrar el salto donde se introduce el retraso. Lea [Trazar Network Path desde dispositivos de usuario hasta aplicaciones SaaS][19] para ver ejemplos.


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[5]: /es/infrastructure/process/
[6]: /es/logs/
[7]: /es/network_monitoring/network_path/setup/
[8]: /es/integrations/wlan/
[9]: /es/integrations/wincrashdetect/
[11]: /es/infrastructure/end_user_device_monitoring/
[12]: https://www.datadoghq.com/product-preview/end-user-device-monitoring/
[13]: /es/integrations/event-viewer/?tab=logs
[14]: /es/infrastructure/end_user_device_monitoring/setup/macos/
[15]: /es/infrastructure/end_user_device_monitoring/setup/windows/
[16]: /es/bits_ai/bits_chat/
[17]: /es/mcp_server/
[18]: /es/mcp_server/setup/
[19]: /es/infrastructure/end_user_device_monitoring/#trace-network-paths-from-user-devices-to-saas-applications
[20]: /es/integrations/battery/#data-collected