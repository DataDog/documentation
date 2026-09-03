---
aliases:
- /es/tracing/guide/adaptive_sampling
disable_toc: false
further_reading:
- link: /tracing/trace_pipeline/ingestion_mechanisms
  tag: Documentación
  text: Mecanismos de consumo
- link: /tracing/trace_pipeline/ingestion_controls
  tag: Documentación
  text: Controles del consumo
title: Muestreo adaptativo
---

## Información general

El **muestreo adaptativo** de Datadog te ayuda a obtener las trazas más relevantes manteniéndote dentro de un presupuesto específico (gigabytes ingestados).

Cuando se elige el muestreo adaptativo como estrategia de muestreo, se selecciona un volumen mensual objetivo para la ingesta de trazas para uno o más servicios. Esto garantiza que el consumo de estos servicios coincida con el volumen objetivo a final de mes, al tiempo que se mantiene la visibilidad sobre tus endpoints.

El muestreo adaptativo utiliza la [configuración remota][3] además de los mecanismos existentes de [reglas de muestreo][7] para ajustar dinámicamente las frecuencias de muestreo para cada combinación de entorno, servicio y recurso. Esto te ayuda a:
- Igualar tu presupuesto mensual especificado.
- Garantizar la visibilidad de los servicios y endpoints con poco tráfico capturando al menos una traza para cada combinación de servicio, recurso y entorno cada 5 minutos.

Para configurar los servicios para que utilicen el muestreo adaptativo, sigue las instrucciones que se indican a continuación.

## Requisitos

- Datadog Agent [v7.53.0][2] o posterior.
- [Configuración remota][3] activada para tu Agent.
- [Permiso][4] `APM Remote Configuration Write`.
   **Nota**: Si no tienes este permiso, pide a tu administrador de Datadog que actualice tus permisos desde la configuración de tu organización.

### Versiones de librerías de rastreo

La siguiente tabla enumera las versiones mínimas de la librería de rastreo necesarias para el muestreo adaptativo:

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

## Configurar el objetivo de muestreo adaptativo

Para empezar con el muestreo adaptativo, primero tienes que elegir un ajuste de estrategia objetivo:

- **Configurar el presupuesto según el número de hosts de APM **: configura un presupuesto proporcional a tu asignación y al número de servicios incorporados (por ejemplo, en función del número de hosts de APM).
- **Configurar presupuesto por volumen de datos**: configura un objetivo fijo en gigabytes por mes


|          | Presupuesto por número de hosts de APM                                                                                                              | Presupuesto por volumen de datos                                                                 |
|----------|--------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| **Ventajas** | Se amplía con el número de hosts de APM y el número de servicios incorporados; sólo tienes que configurarlo una vez.                                                 | Garantiza que nunca te pases del presupuesto                                                      |
| **Desventajas** | No es una buena opción si deseas mantenerte por debajo de un volumen específico, ya que puede variar en función del número de hosts que envíen datos de APM a Datadog. | Hay que editar el presupuesto cada vez que se incorpora un nuevo servicio al muestreo adaptativo |

Para fijar el objetivo mensual del muestreo adaptativo:
1. Navega hasta la página [Ingestion Control][18].
2. Haz clic en **Manage Adaptive Sampling Target** (Gestionar objetivo de muestreo adaptativo).
  {{< img src="/tracing/guide/adaptive_sampling/adaptive_sampling_target_cta.png" alt="Acción para establecer el objetivo de muestreo adaptativo" style="width:100%;">}}
3. Elige una estrategia de muestreo objetivo:
   - [Establecer presupuesto por número de hosts de APM](#set-budget-by-number-of-apm-hosts-recommended)
   - [Configurar presupuesto por volumen de datos](#set-budget-by-data-volume)
4. Haz clic en **Apply** (Aplicar).

### Establecer presupuesto por número de hosts de APM (Recomendado)

{{< img src="/tracing/guide/adaptive_sampling/percentage_based_target_setting.png" alt="Configuración de objetivo según el porcentaje" style="width:100%;">}}

Establece tu objetivo mensual en un porcentaje de tu asignación. En la parte inferior de la página, encontrarás una explicación más completa de cómo se convierte ese porcentaje en un volumen objetivo mensual. Es el producto de:

- La **asignación global**: `150GB * number_of_APM_hosts + 50GB * number_of_traced_serverless_invocations (if applicable) + 10GB * number_of_fargate_tasks (if applicable)`
- El **porcentaje de asignación** configurado anteriormente
- La **contribución de los servicios integrados** a la asignación. Por ejemplo, si los servicios incorporados al muestreo adaptativo contribuyen al 10% del volumen total ingerido, Datadog se dirige al 10% de la asignación global. Este número aumenta con el número de servicios incorporados.

{{< img src="/tracing/guide/adaptive_sampling/percentage_based_target_computation.png" alt="Cómputo del objetivo según el porcentaje" style="width:100%;">}}

Ese volumen objetivo mensual se vuelve a calcular cada 30 minutos.

### Establecer presupuesto por volumen de datos

{{< img src="/tracing/guide/adaptive_sampling/volume_based_target_setting.png" alt="Configuración de objetivo según el volumen" style="width:100%;">}}

Si estás configurando el primer servicio para el muestreo adaptativo, asegúrate de que el destino del volumen de ingesta es `>0`. Para los servicios posteriores, debes aumentar el presupuesto asignado después de que el nuevo servicio se incorpore para tener en cuenta el nuevo volumen.
  <div class="alert alert-info">El presupuesto configurado solo se asigna a los servicios inscritos en el muestreo adaptativo. No incluye el volumen ingerido de los servicios que no están inscritos en el muestreo adaptativo, las reglas de muestreo local u otros <a href="/tracing/trace_pipeline/ingestion_mechanisms#in-the-agent">mecanismos de muestreo</a> configurados de forma local en el Agent o bibliotecas de rastreo.</div>

## Configurar el muestreo adaptativo para un servicio

### Ver las tasas de muestreo por recurso para un servicio

Antes de configurar el muestreo adaptativo para un servicio, puedes ver la configuración de ingesta actual para el servicio.

Para visualizar las frecuencias de muestreo configuradas:

1. Navega hasta la página [Ingestion Control][18].
2. Haz clic en un servicio para ver el **Service Ingestion Summary** (Resumen de ingesta de servicios).
3. Consulta la tabla que enumera las frecuencias de muestreo aplicadas por recurso del servicio.

{{< img src="/tracing/trace_indexing_and_ingestion/resource_sampling_rates.png" alt="Tabla de frecuencias de muestreo por recurso" style="width:100%;">}}

La tabla incluye:
- **Bytes ingeridos**: bytes ingeridos de tramos del servicio y del recurso.
- **Bytes descendentes**: bytes ingeridos de tramos en los que la decisión de muestreo parte de ese servicio y recurso, incluidos los servicios descendentes.
- **Configuración**: fuente de la tasa de muestreo de recursos:
  - `AUTOMATIC`: [Mecanismo de muestreo predeterminado basado en el inicio de la traza][8] del Agent.
  - `CONFIGURED LOCAL`: [regla de muestreo][7] establecida localmente en la librería de rastreo.
  - `CONFIGURED REMOTE`: regla de muestreo remoto establecida desde la interfaz de usuario de Datadog.
  - `ADAPTIVE REMOTE`: Reglas de muestreo adaptativas definidas por Datadog.

Una vez que un servicio se incorpora al muestreo adaptativo, las frecuencias de muestreo se ajustan y se vuelven a calcular cada 10 minutos.

### Incorporación de un servicio al muestreo adaptable

Para incorporar un servicio de muestreo adaptativo:

1. Navega hasta la página [Ingestion Control][18].
2. Haz clic en un servicio para ver el **Service Ingestion Summary** (Resumen de ingesta de servicios).
3. Haz clic en **Manage Ingestion Rate** (Gestionar tasa de ingesta).
4. Elige **Datadog adaptive sampling rates** (Tasas de muestreo adaptativo de Datadog) como estrategia de muestreo de tu servicio.
5. [Opcional] Configura [tasas de muestreo][15] explícitas para recursos específicos, de los que te gustaría obtener más datos (por ejemplo, el 100% de los endpoints `GET /checkout` ) o menos datos (por ejemplo, el 0,1% de las solicitudes de `/health`).
6. Haz clic en **Apply** (Aplicar).

<div class="alert alert-info">Si la aplicación <strong>remota</strong> de esta configuración está desactivada, asegúrate de que se cumplen los <a href="#requirements">requisitos de la configuración remota</a>.</div>

{{< img src="/tracing/guide/adaptive_sampling/adaptive_sampling_setting_modal.png" alt="Modal de configuración del muestreo adaptativo" style="width:70%;">}}

La configuración debería surtir efecto en 5-6 minutos, el tiempo que tarda Datadog en observar el patrón de tráfico del servicio, calcular y, a continuación, aplicar las tasas de muestreo. Los recursos que se han configurado de forma remota aparecen como `Configured Remote` en la columna **Configuration** (Configuración).

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
[18]: https://app.datadoghq.com/apm/traces/ingestion-control
