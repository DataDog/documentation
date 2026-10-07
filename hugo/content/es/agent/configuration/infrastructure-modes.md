---
algolia:
  tags:
  - infrastructure modes
description: Cambie el comportamiento del Agent para controlar cuánta monitorización
  de infraestructura realiza el Datadog Agent en un servidor.
further_reading:
- link: /agent/configuration/agent-configuration-files/
  tag: Guía
  text: Archivos de configuración del Agent
- link: /agent/guide/upgrade/
  tag: Guía
  text: Actualice su Datadog Agent
private: true
title: Modos de infraestructura
---
## Descripción general {#overview}

Los modos de infraestructura determinan qué capacidades de supervisión de infraestructura habilita el Datadog Agent en un servidor. Utilice estos modos para adaptar el comportamiento del Agent al rol del servidor: supervisión de infraestructura completa, métricas básicas de recursos del sistema, sin supervisión de infraestructura, o End User Device Monitoring.

## Modos disponibles {#available-modes}

El Agent admite cuatro modos de infraestructura. Una marca de verificación ({{< X >}}) indica que la capacidad está disponible en ese modo.

| Capacidad | [Full](#full) (predeterminado) | [Basic](#basic) | [End User Device](#end-user-device) | [None](#none) |
|------------|-------------------------|-----------------|-------------------------------------|---------------|
| Métricas de recursos del sistema | {{< X >}} | {{< X >}} | {{< X >}} | |
| Integraciones de infraestructura | {{< X >}} (todo) | {{< X >}} ([conjunto limitado](#basic)) | {{< X >}} | |
| Container Monitoring | {{< X >}} | | | |
| Live Processes | {{< X >}} | | {{< X >}} | |
| Verificaciones personalizadas e integraciones solo de logs | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Métricas personalizadas | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Visible en los tableros de infraestructura | {{< X >}} | {{< X >}} | | |

### Full {#full}

`full`
: **Predeterminado**: Sí<br>
**Versión mínima del Agent**: 7.73.0<br>
**Recomendado para**: La mayoría de los casos de uso<br>
: El Agent recopila métricas de recursos del sistema y datos de procesos, ejecuta todas las integraciones de infraestructura y es compatible con Container Monitoring y Live Processes. Si no ha establecido un valor de `infrastructure_mode`, el Agent se ejecuta en modo `full`.

### Basic {#basic}

`basic`
: **Versión mínima del Agent**: 7.73.0 (Linux, macOS), 7.76.2 (Windows)<br>
**Recomendado para**: máquinas virtuales y servidores físicos que solo necesitan métricas de recursos del sistema<br>
: El Agent recopila métricas de recursos del sistema (CPU, memoria, disco, red) y datos limitados de procesos y servicios. Solo se ejecutan las siguientes integraciones:
  - [Cisco ACI][25] (7.78+)
  - [Cisco SD-WAN][26] (7.78+)
  - [Directorio][3] (7.80+)
  - [Disco][2]
  - [Red][4]
  - [NTP][5]
  - [Procesos][6]
  - [SNMP][28] (7.78+)
  - [Verificación del sistema][1]
  - [Systemd][7]
  - [Versa][27] (7.78+)
  - [Almacén de certificados de Windows][8] (7.80+)
  - [Detección de bloqueos de Windows][9]
  - [Registro de eventos de Windows][17]
  - [Memoria del kernel de Windows][10]
  - [Contadores de rendimiento de Windows][11] (7.80+)
  - [Registro de Windows][12] (7.80+)
  - [Servicios de Windows][13]
  - [Verificación WMI][14] (7.80+)
  - [Verificaciones personalizadas][15] con el prefijo `custom_`

### Dispositivo de usuario final {#end-user-device}

<div class="alert alert-info">El modo End User Device está en vista previa. Para conocer los pasos de configuración y solicitar acceso, consulte <a href="/infrastructure/end_user_device_monitoring/">End User Device Monitoring</a>.</div>

`end_user_device`
: **Versión mínima del Agent**: 7.76.2<br>
**Recomendado para**: Escritorios, laptops y estaciones de trabajo de empleados<br>
: El Agent incluye todas las capacidades del [modo Full](#full), excepto Container Monitoring, además de lo siguiente.
  - Device Performance Monitoring
  - Recopilación de registros
  - Wi‑Fi Monitoring
  - Detección de bloqueos de Windows
  - Network Path Monitoring

: Para obtener descripciones completas, consulte [Key capabilities][18].

### None {#none}

`none`
: **Versión mínima del Agent**: 7.77.0<br>
**Recomendado para**: Servidores configurados solo para [Log Management][19], [APM][20] o [Error Tracking][21]<br>
: El Agent no recopila métricas de infraestructura ni ejecuta integraciones de infraestructura. Todavía puede usar métricas personalizadas, [verificaciones personalizadas][15] con el prefijo `custom_` e integraciones solo de registros como [journald][16] o [Registro de eventos de Windows][17].
: Los servidores en modo `none` aparecen en [Fleet Automation][22] bajo la pestaña {{< ui >}}View Agents{{< /ui >}} porque el Agent continúa enviando metadatos a Datadog. Sin embargo, estos servidores no aparecen en los tableros de infraestructura ni en las consultas que dependen de métricas de infraestructura.

## Configure el modo de infraestructura del Agent {#configure-agent-infrastructure-mode}

### Nuevos servidores {#new-hosts}

Para configurar el modo de infraestructura al instalar el Agent por primera vez, establezca la variable de entorno `DD_INFRASTRUCTURE_MODE=<MODE>` antes de invocar el script de instalación:

{{< tabs >}}
{{% tab "Linux" %}}
En el siguiente comando, reemplace `<API_KEY>` con la [clave de Datadog API](https://app.datadoghq.com/organization-settings/api-keys) de su organización, `<DD_SITE>` con **{{< region-param key="dd_site" >}}**, y `<MODE>` con `full`, `basic`, `end_user_device` o `none`:

```shell
DD_API_KEY="<API_KEY>" \
DD_SITE="<DD_SITE>" \
DD_INFRASTRUCTURE_MODE="<MODE>" \
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```
{{% /tab %}}
{{% tab "Windows" %}}
En el siguiente comando, reemplace `<API_KEY>` con la [clave de Datadog API](https://app.datadoghq.com/organization-settings/api-keys) de su organización, `<DD_SITE>` con **{{< region-param key="dd_site" >}}**, y `<MODE>` con `full`, `basic`, `end_user_device` o `none`:

```powershell
$p = Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /i "https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi" /log C:\Windows\SystemTemp\install-datadog.log APIKEY="<API_KEY>" SITE="<DD_SITE>" DD_INFRASTRUCTRURE_MODE="<MODE>"'
if ($p.ExitCode -ne 0) {
  Write-Host "msiexec failed with exit code $($p.ExitCode) please check the logs at C:\Windows\SystemTemp\install-datadog.log" -ForegroundColor Red
}
```
{{% /tab %}}
{{< /tabs >}}

### Servidores existentes {#existing-hosts}

Para establecer el modo de infraestructura para un servidor existente:

1. Abra el [archivo de configuración del Agent][23] y agregue `infrastructure_mode` en el nivel raíz. Reemplace `<MODE>` con `full`, `basic`, `end_user_device` o `none`.

    {{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true"
      collapsible="true" >}}
infrastructure_mode: <MODE>
    {{< /code-block >}}

2. [Reinicie el Datadog Agent][24].

## Verifique el modo de infraestructura {#verify-infrastructure-mode}

Para verificar el modo de infraestructura establecido en sus servidores:

1. Vaya a [Fleet Automation][22] y haga clic en la pestaña {{< ui >}}View Agents{{< /ui >}}.
1. Seleccione {{< ui >}}Infrastructure Mode{{< /ui >}} del menú desplegable {{< ui >}}Group by{{< /ui >}}.
1. Haga clic en un grupo de modo para expandirlo y ver los servidores que contiene.
1. Opcionalmente, use la barra de búsqueda para filtrar por un nombre de servidor específico (por ejemplo, `hostname:worker1`).

{{< img src="agent/configuration/fa_group_by_infra_mode-1.png" alt="Página de Fleet Automation View Agents con Infrastructure Mode seleccionado en el menú desplegable Group by, que muestra el grupo Full expandido con 311 servidores y columnas para hostname, Agent, OTEL, integrations, services y remote configuration status." style="width:90%" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/system/
[2]: /es/integrations/disk/
[3]: /es/integrations/directory/
[4]: /es/integrations/network/
[5]: /es/integrations/ntp/
[6]: /es/integrations/process/
[7]: /es/integrations/systemd/
[8]: /es/integrations/windows-certificate/
[9]: /es/integrations/wincrashdetect/
[10]: /es/integrations/winkmem/
[11]: /es/integrations/windows-performance-counters/
[12]: /es/integrations/windows-registry/
[13]: /es/integrations/windows-service/
[14]: /es/integrations/wmi/
[15]: /es/extend/custom_checks/
[16]: /es/integrations/journald/
[17]: /es/integrations/event-viewer/
[18]: /es/infrastructure/end_user_device_monitoring/#key-capabilities
[19]: /es/logs/
[20]: /es/tracing/
[21]: /es/error_tracking/
[22]: https://app.datadoghq.com/fleet
[23]: /es/agent/configuration/agent-configuration-files/
[24]: /es/agent/configuration/agent-commands/#restart-the-agent
[25]: /es/integrations/cisco-aci/
[26]: /es/integrations/cisco-sdwan/
[27]: /es/integrations/versa/
[28]: /es/integrations/snmp/