---
description: Haga un seguimiento de las computadoras de escritorio y portátiles de
  los empleados para detectar problemas de rendimiento, conectividad y aplicaciones
  en toda su organización.
further_reading:
- link: https://www.datadoghq.com/blog/auto-detected-endpoint-issues/
  tag: Blog
  text: Detecte y resuelva problemas de puntos de conexión en toda su flota con Datadog
title: End User Device Monitoring
---
{{< callout url="https://www.datadoghq.com/product-preview/end-user-device-monitoring/" btn_hidden="false" >}}
End User Device Monitoring está en versión preliminar. Para inscribirse, haga clic en <b>Solicitar acceso</b>.
{{< /callout >}}

{{< img src="/infrastructure/end_user_device_monitoring/end_user_device_monitoring.png" alt="Página de Dispositivos de usuario que muestra cuatro dispositivos en buen estado, gráficos para tipos de dispositivos y sistemas operativos, y una tabla con una computadora portátil marcada por fallas del sistema." style="width:100%;" >}}

End User Device Monitoring brinda a los equipos de TI visibilidad sobre el estado y el rendimiento de las computadoras de escritorio y portátiles de los empleados, tanto físicas como virtuales. Ayuda a identificar problemas de rendimiento y conectividad que afectan a los empleados y proporciona una visualización unificada del estado del dispositivo, la red y la aplicación en toda su fuerza laboral para ayudar a responder preguntas como:
- ¿Por qué la computadora portátil de este empleado se ralentiza cada vez que abre una aplicación específica?
- ¿Qué empleados se ven afectados por un punto de acceso Wi‑Fi sobrecargado en la oficina?
- ¿Una llamada lenta de Zoom, Microsoft Teams o Google Meet es causada por el dispositivo, la red o la propia aplicación?
- ¿En qué parte de la ruta hacia una aplicación SaaS se está introduciendo latencia?
- ¿Qué dispositivos presentan errores de pantalla azul y con qué frecuencia?
- ¿Qué software (y qué versiones) está instalado en toda la flota, para la planificación del inventario de hardware y licencias?
- ¿Qué dispositivos tienen un bajo rendimiento de CPU, memoria o disco y necesitan atención o reemplazo?
- ¿Qué estaba sucediendo en un dispositivo (qué procesos, registros o eventos) justo antes de que ocurriera un problema reportado?

## Cómo funciona {#how-it-works}

End User Device Monitoring utiliza el Datadog Agent para recopilar datos directamente de las computadoras de escritorio, portátiles y estaciones de trabajo de los empleados. El Datadog Agent recopila métricas del sistema, información de red y registros de cada dispositivo y envía los datos a Datadog, donde se pueden monitorear y visualizar.

La página [Dispositivos de usuario][5] proporciona paneles y métricas integrados que resumen el estado y el rendimiento de los dispositivos de su organización. Puede visualizar métricas resumidas para todos los dispositivos y métricas detalladas para cada uno, incluyendo el uso de CPU, memoria y red.

Utilice [Fleet Automation][6] para administrar los Agentes instalados en esos dispositivos, lo que incluye verificar el estado de la versión, comprobar la consistencia de la configuración y asegurarse de que las integraciones necesarias estén habilitadas.

## Capacidades clave {#key-capabilities}

| Capacidad                        | Descripción                                                                                                                                                                                               |
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Monitoreo del rendimiento del dispositivo** | Haga un seguimiento de las métricas generales de salud del sistema, como la utilización de CPU, memoria, disco y red, para identificar dispositivos con bajo rendimiento.                                                                             |
| **Salud de la batería** | Planifique los ciclos de vida del hardware con métricas de batería como la capacidad máxima, el conteo de ciclos y el estado de carga.                                                                              |
| **Visibilidad de procesos**            | Utilice [Live Processes][1] para hacer un seguimiento del uso de recursos por procesos individuales e identificar las aplicaciones que afectan el rendimiento del dispositivo.                                                                         |
| **Recopilación de registros**               | Utilice [Logs][7] para recopilar y explorar registros de dispositivos de usuario y aplicaciones para solucionar fallas, errores y problemas de rendimiento.                                                             |
| **Monitoreo de Wi-Fi**              | Haga un seguimiento de las métricas de Wi-Fi como la calidad de la señal, la tasa de transmisión y las transiciones de puntos de acceso con la [WiFi/WLAN integration][2], lo que ayuda a identificar problemas de conectividad y puntos de acceso sobrecargados. |
| **Detección de fallas de Windows**       | Detecte eventos de Pantalla Azul de la Muerte (BSOD) en dispositivos Windows con la [Windows Crash Detection integration][3], que genera eventos de Datadog que muestran cuándo ocurren las fallas del sistema.                         |
| **Tráfico de red**         | Vea el volumen de tráfico por destino junto con la latencia y la tasa de error.                                                        |
| **Trazado de rutas de red**         | Utilice [Network Path][4] para trazar el tráfico de red desde un dispositivo de usuario hasta su destino e identificar dónde ocurren los problemas de latencia o conectividad.                                                        |
| **Inventario de aplicaciones**         | Capture las aplicaciones que se ejecutan en el dispositivo para verificar las actualizaciones de versión.                                          |
| **Mapeo de identidad**         | Mapee los dispositivos con el usuario para realizar análisis de patrones y cohortes.                                          | 

## Flujos de trabajo destacados {#featured-workflows}

### Trazar rutas de red desde dispositivos de usuario hasta aplicaciones SaaS {#trace-network-paths-from-user-devices-to-saas-applications}

Cuando los usuarios informan un rendimiento lento de la aplicación o una calidad degradada en las videollamadas (por ejemplo, en Zoom), el problema podría estar en el dispositivo, en algún punto a lo largo de la ruta de red o dentro de la propia aplicación. End User Device Monitoring se integra con [Network Path][4] para trazar la ruta completa desde el dispositivo de un usuario hasta la aplicación SaaS de destino, brindándole visibilidad en las tres capas.

La visualización de traceroute muestra cada salto a lo largo de la ruta, desde el router local y el ISP a través de la internet pública hasta la CDN y los servidores de la aplicación. Cada salto incluye datos de latencia, por lo que puede identificar dónde se produce una ralentización en lugar de ver solo el tiempo total de ida y vuelta.

Con el trazado de rutas de red, usted puede:

- **Comparar rutas entre dispositivos**: Visualizar traceroutes desde múltiples dispositivos en la misma red para determinar si un problema afecta a un solo usuario o a la red en general.
- **Comparar rutas a lo largo del tiempo**: Analice cómo cambia la ruta de red antes y después de un problema reportado para identificar cuándo y dónde aumentó la latencia.


[1]: /es/infrastructure/process
[2]: /es/integrations/wlan/
[3]: /es/integrations/wincrashdetect/
[4]: /es/network_monitoring/network_path/
[5]: https://app.datadoghq.com/end-user-devices
[6]: /es/agent/fleet_automation/
[7]: /es/logs/

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}