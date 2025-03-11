---
disable_toc: false
further_reading:
- link: /tracing/trace_pipeline/ingestion_mechanisms
  tag: Documentación
  text: Mecanismos de ingesta
- link: /tracing/trace_pipeline/ingestion_controls
  tag: Documentación
  text: Página de control de la ingesta
private: true
title: Muestreo adaptativo
---

{{< callout url="https://www.datadoghq.com/private-beta/resource-based-sampling-adaptive-sampling/" header="Solicita acceso a la Vista previa." >}}
El Muestreo adaptativo está en Vista previa. Para solicitar acceso, rellena el formulario.
{{< /callout >}}

## Información general

El **Muestreo adaptativo** de Datadog te ayuda a obtener las trazas (traces) más relevantes manteniéndote dentro de un presupuesto específico (gigabytes ingestados). Para empezar:
1. Define un objetivo de volumen mensual para la ingestión de trazas.
2. Inscribe uno o varios servicios de muestreo adaptativo.
De este modo se garantiza que el consumo de estos servicios coincida con el objetivo de volumen a final de mes, al tiempo que se mantiene la visibilidad de sus endpoints.

El Muestreo adaptativo se basa en la [configuración remota][3] y en los mecanismos de [reglas de muestreo][7] existentes para ajustar dinámicamente las frecuencias de muestreo de cada combinación de entorno, servicio y recurso, para:
- Ajustarse a tu presupuesto mensual especificado.
- Garantizar **la visibilidad de servicios y endpoints con poco tráfico** obteniendo al menos una traza de cada combinación de servicio, recurso y entorno cada 5 minutos.

Para inscribir nuevos servicios de muestreo adaptativo y gestionar los volúmenes ingeridos desde la [página de control de la ingesta de Datadog][1], sigue las instrucciones que se indican a continuación.

## Requisitos

- Datadog Agent [v7.53.0][2] o posterior.
- [Configuración remota][3] activada para tu Agent.
- [Permisos] `APM Remote Configuration Write`[4]. Si no tienes estos permisos, pide a tu administrador de Datadog que actualice tus permisos desde Parámetros de organización.

### Versiones de bibliotecas de rastreo

La siguiente tabla enumera las versiones mínimas de biblioteca de rastreo necesarias para el Muestreo Adaptativo:

| Lenguaje    | Versión mínima requerida |
|-------------|--------------------------|
| Java        | [v1.34.0][5]             |
| Go          | [v1.68.0][6]             |
| Python      | [v2.9.6][10]             |
| Ruby        | [v2.0.0][11]             |
| Node.js     | [v5.16.0][12]            |
| .NET        | [v2.54.0][13]            |
| C++/proxies | [v0.2.2][14]             |
| PHP         | [v1.4.0][17]             |

## Visualizar las frecuencias de muestreo por recurso

Para visualizar las frecuencias de muestreo configuradas:

1. Ve a los controles de ingestión [Resumen de ingestión de servicios][1].
2. Consulta la tabla que enumera las frecuencias de muestreo aplicadas por recurso del servicio.

{{< img src="/tracing/trace_indexing_and_ingestion/resource_sampling_rates.png" alt="Tabla de frecuencias de muestreo por recurso" style="width:100%;">}}

La tabla incluye:
- `Ingested bytes`: Bytes ingeridos de tramos (spans) del servicio y recurso.
- `Downstream bytes`: Bytes ingeridos de tramos donde la decisión de muestreo comienza a partir de ese servicio y recurso, incluidos los servicios posteriores.
- `Configuration`: Fuente de la frecuencia de muestreo de recursos:
  - `AUTOMATIC`: [Mecanismo de muestreo predeterminado basado en el inicio de la traza][8] del Agent.
  - `LOCAL CONFIGURED`: [Regla de muestreo][7] definida localmente en la biblioteca de rastreo.
  - `REMOTE CONFIGURED`: Regla de muestreo remoto definida desde la interfaz de usuario Datadog.
  - `ADAPTIVE REMOTE`: Reglas de muestreo adaptativas definidas por Datadog.

## Configurar el muestreo adaptativo para un servicio

Para configurar el muestreo adaptativo para un servicio:
1. Ve a la [página de control de la ingesta de Datadog][16].
  {{< img src="/tracing/guide/adaptive_sampling/adaptive_sampling_budget_cta.png" alt="Llamada de atención para la definición del presupuesto para el muestreo adaptativo" style="width:100%;">}}

2. Abre el modal para configurar/editar el **Objetivo de ingesta mensual** del muestreo adaptativo. Asegúrate de que el objetivo de volumen de ingesta es `>0` cuando inscribas un primer servicio de muestreo adaptativo. Para los servicios subsiguientes puedes aumentar el presupuesto asignado, después de que se incorpore el nuevo servicio, para tener en cuenta el nuevo volumen. 

**Nota**: El presupuesto configurado sólo se asigna a los servicios de muestreo adaptativo inscritos. No tiene en cuenta el volumen adicional de servicios que utilizan reglas de muestreo local u otros [mecanismos de muestreo][8] configurados localmente en el Agent o en la biblioteca de rastreo.

{{< img src="/tracing/guide/adaptive_sampling/adaptive_sampling_budget_modal.png" alt="Modal de presupuesto del muestreo adaptativo" style="width:70%;">}}

3. Ve a la [página de resumen de la ingesta][1] de tu servicio.
4. Haz clic en **Manage Ingestion Rate* (Gestionar la frecuencia de ingestión). Si la opción de configuración remota está desactivada, asegúrate de que se cumplen todos los [requisitos](#compatibility-requirements) enumerados.
5. Define la estrategia de muestreo de tu servicio en **Frecuencias de muestreo adaptativo de Datadog** y haz clic en **Apply** (Aplicar) para guardar la configuración.
6. _[Opcional]_ Configura [frecuencias de muestreo][15] explícitas para recursos específicos, de los que le gustaría obtener más datos (por ejemplo, el 100% de los endpoints `GET /checkout` ) o menos datos (por ejemplo, el 0,1% de las solicitudes de `/health` ).

{{< img src="/tracing/guide/adaptive_sampling/adaptive_sampling_setting_modal.png" alt="Modal de configuración del muestreo adaptativo" style="width:70%;">}}

La configuración debería surtir efecto en 5 o 6 minutos, el tiempo que tarda Datadog en observar el patrón de tráfico del servicio, calcular y, a continuación, aplicar las frecuencias de muestreo. Los recursos controlados por el muestreo adaptativo aparecerán marcados como `Adaptive Remote` en la columna **Configuración**.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_pipeline/ingestion_controls#service-ingestion-summary
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.53.0
[3]: /es/agent/remote_config
[4]: /es/account_management/rbac/permissions/
[5]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.34.0
[6]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.68.0
[7]: /es/tracing/trace_pipeline/ingestion_mechanisms#in-tracing-libraries-user-defined-rules
[8]: /es/tracing/trace_pipeline/ingestion_mechanisms#in-the-agent
[9]: /es/tracing/trace_explorer/#live-search-for-15-minutes
[10]: https://github.com/DataDog/dd-trace-py/releases/tag/v2.9.6
[11]: https://github.com/DataDog/dd-trace-rb/releases/tag/v2.0.0
[12]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0
[13]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.54.0
[14]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.2.2
[15]: /es/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rates-by-resource
[16]: /es/tracing/trace_pipeline/ingestion_controls
[17]: https://github.com/DataDog/dd-trace-php/releases/tag/1.4.0