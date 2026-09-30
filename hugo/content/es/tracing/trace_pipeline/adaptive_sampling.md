---
aliases:
- /es/tracing/guide/adaptive_sampling
description: Ajuste automáticamente las tasas de muestreo para cumplir con presupuestos
  específicos mientras mantiene la visibilidad sobre los puntos de servicio.
disable_toc: false
further_reading:
- link: /tracing/trace_pipeline/ingestion_mechanisms
  tag: Documentación
  text: Mecanismos de ingesta
- link: /tracing/trace_pipeline/ingestion_controls
  tag: Documentación
  text: Ingestion Control
- link: https://www.datadoghq.com/architecture/optimizing-distributed-tracing-best-practices-for-remaining-within-budget-and-capturing-critical-traces/
  tag: Centro de arquitectura
  text: 'Optimización del rastreo distribuido: mejores prácticas para mantenerse dentro
    del presupuesto y capturar trazas críticas'
site_support_id: adaptive_sampling
title: Muestreo adaptativo
---
## Descripción general {#overview}

El **muestreo adaptativo** de Datadog le ayuda a capturar trazas más relevantes mientras se mantiene cerca de un presupuesto específico (gigabytes ingeridos).

Cuando elige el muestreo adaptativo como su estrategia de muestreo, selecciona un volumen mensual objetivo para la ingesta de trazas para uno o más servicios. Esto garantiza que el consumo de estos servicios coincida con el volumen objetivo al final del mes, mientras se mantiene la visibilidad sobre sus puntos de servicio.

El muestreo adaptativo utiliza [Remote Configuration][3] además de los mecanismos de [reglas de muestreo][7] existentes para ajustar dinámicamente las tasas de muestreo para cada combinación de entorno, servicio y recurso. Esto le ayuda a:
- Cumplir con su presupuesto mensual especificado.
- Garantizar la visibilidad de los servicios y puntos de servicio con poco tráfico capturando al menos una traza para cada combinación de servicio, recurso y entorno cada 5 minutos.

Para configurar los servicios para usar el muestreo adaptativo, siga las instrucciones que se enumeran a continuación.

## Requisitos {#requirements}

- Datadog Agent [7.53.0][2] o superior.
- [Remote Configuration][3] habilitada para su Datadog Agent.
- `APM Remote Configuration Write` [permiso][4].  
   **Nota**: Si no tiene este permiso, solicite a su administrador de Datadog que actualice sus permisos desde la configuración de su organización.

### Versiones de la biblioteca de rastreo {#tracing-library-versions}

La siguiente tabla enumera las versiones mínimas del SDK requeridas para el muestreo adaptativo:

| Lenguaje    | Versión mínima requerida |
|-------------|--------------------------|
| Java        | [v1.34.0][5]             |
| Go          | [v1.68.0][6]             |
| Python      | [v3.14.2][10]             |
| Ruby        | [v2.0.0][11]             |
| Node.js     | [v5.16.0][12]            |
| .NET        | [v2.54.0][13]            |
| C++/Proxies | [v0.2.2][14]             |
| PHP         | [v1.4.0][17]             |
| Rust        | [v0.4.0][20]             |

## Limitaciones {#limitations}

Los límites se aplican a las combinaciones de servicio y entorno según la configuración de muestreo:

#### Muestreo adaptativo {#adaptive-sampling}

- El número máximo de combinaciones `service/env` incorporadas al muestreo adaptativo es 800.
- Cada par `service/env` único configurado para el muestreo adaptativo cuenta para este límite.

#### Configuración de muestreo remoto {#remote-sampling-configuration}

- El número máximo de combinaciones `service/env` que utilizan la configuración de muestreo remoto es **1000**.
- Este límite se aplica independientemente de cuántas reglas de muestreo estén definidas para cada servicio.
- Cada par `service/env` único con muestreo remoto habilitado cuenta una vez para este límite.

#### Servicios que utilizan muestreo adaptativo y remoto {#services-using-both-adaptive-and-remote-sampling}

- Si una combinación `service/env` utiliza tanto el muestreo adaptativo como la configuración de muestreo remoto, cuenta una vez para cada límite respectivo (una vez para el límite de 800 del muestreo adaptativo y una vez para el límite de 1000 del muestreo remoto).
- No**cuenta dos veces dentro de ninguno de los límites individuales**.

## Configure el objetivo de muestreo adaptativo {#configure-the-adaptive-sampling-target}

Para comenzar con el muestreo adaptativo, primero debe elegir una configuración de estrategia objetivo:

- {{< ui >}}Set Budget by Number of APM Hosts{{< /ui >}}: Configure un presupuesto que sea proporcional a su asignación y al número de servicios incorporados (por ejemplo, según el número de hosts de APM)
- {{< ui >}}Set Budget by Data Volume{{< /ui >}}: Configure un objetivo fijo en gigabytes por mes


|          | Presupuesto por número de hosts de APM                                                                                                              | Presupuesto por volumen de datos                                                                 |
|----------|--------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| **Ventajas** | Escala con el número de hosts de APM y el número de servicios incorporados; solo tiene que configurarlo una vez                                                 | Asegura que nunca exceda el presupuesto                                                      |
| **Desventajas** | No es una buena opción si desea mantenerse por debajo de un volumen específico, ya que puede variar según el número de hosts que informan datos de APM a Datadog | Tiene que editar el presupuesto cada vez que incorpora un nuevo servicio al muestreo adaptativo |

Para establecer el objetivo mensual de muestreo adaptativo:
1. Navegue a la página [Ingestion Control][18].
2. Haga clic en {{< ui >}}Manage Adaptive Sampling Target{{< /ui >}}.
  {{< img src="/tracing/guide/adaptive_sampling/adaptive_sampling_target_cta.png" alt="Llamada a la acción para establecer el objetivo de muestreo adaptativo" style="width:100%;">}}
3. Elija una estrategia de objetivo para el muestreo:
   - [Establecer presupuesto por número de hosts de APM](#set-budget-by-number-of-apm-hosts-recommended)
   - [Establecer presupuesto por volumen de datos](#set-budget-by-data-volume)
4. Haga clic en {{< ui >}}Apply{{< /ui >}}.

### Establecer presupuesto por número de hosts de APM (Recomendado) {#set-budget-by-number-of-apm-hosts-recommended}

{{< img src="/tracing/guide/adaptive_sampling/percentage_based_target_setting.png" alt="Configuración de objetivo basada en porcentaje" style="width:100%;">}}

Establezca su objetivo mensual como un porcentaje de su asignación. En la parte inferior de la página, se le proporciona una explicación más completa de cómo ese porcentaje se convierte en un volumen objetivo mensual. Es el producto de: 

- El {{< ui >}}global allotment{{< /ui >}}: `150GB * number_of_APM_hosts + 50GB * number_of_traced_serverless_invocations (if applicable) + 10GB * number_of_fargate_tasks (if applicable)`
- El {{< ui >}}percentage of allotment{{< /ui >}} configurado arriba
- El {{< ui >}}contribution of onboarded services{{< /ui >}} a la asignación. Por ejemplo, si los servicios incorporados al muestreo adaptativo contribuyen al 10% del volumen total ingerido, Datadog apunta al 10% de la asignación global. Este número aumenta con la cantidad de servicios incorporados.

{{< img src="/tracing/guide/adaptive_sampling/percentage_based_target_computation.png" alt="Cálculo del objetivo basado en porcentaje" style="width:100%;">}}

Ese volumen objetivo mensual se vuelve a calcular cada 30 minutos.

### Establezca el presupuesto por volumen de datos {#set-budget-by-data-volume}

{{< img src="/tracing/guide/adaptive_sampling/volume_based_target_setting.png" alt="Configuración del objetivo basada en volumen" style="width:100%;">}}

Si está configurando el primer servicio para el muestreo adaptativo, asegúrese de que el objetivo de volumen de ingestión sea `>0`. Para servicios posteriores, debe aumentar el presupuesto asignado después de que el nuevo servicio se incorpore para tener en cuenta el nuevo volumen.  
  <div class="alert alert-info">El presupuesto configurado solo se asigna a los servicios inscritos en el muestreo adaptativo. No incluye el volumen ingerido de servicios no inscritos en el muestreo adaptativo, reglas de muestreo local u otros <a href="/tracing/trace_pipeline/ingestion_mechanisms#in-the-agent">mecanismos de muestreo</a> configurados localmente en el Agent o los SDK.</div>

## Configure el muestreo adaptativo para un servicio {#configure-adaptive-sampling-for-a-service}

### Visualice las tasas de muestreo por recurso para un servicio {#view-sampling-rates-by-resource-for-a-service}

Antes de configurar el muestreo adaptativo para un servicio, puede visualizar la configuración de ingestión actual para el servicio.

Para visualizar las tasas de muestreo configuradas:

1. Navegue a la página [Ingestion Control][18].
2. Haga clic en un servicio para visualizar el {{< ui >}}Service Ingestion Summary{{< /ui >}}.
3. Visualice la tabla que enumera las tasas de muestreo aplicadas por recurso del servicio.

{{< img src="/tracing/trace_indexing_and_ingestion/resource_sampling_rates.png" alt="Tabla de tasas de muestreo por recurso" style="width:100%;">}}

La tabla incluye:
- {{< ui >}}Ingested bytes{{< /ui >}}: Bytes ingeridos de los spans del servicio y recurso.
- {{< ui >}}Downstream bytes{{< /ui >}}: Bytes ingeridos de los spans donde la decisión de muestreo comienza desde ese servicio y recurso, incluidos los servicios descendentes.
- {{< ui >}}Configuration{{< /ui >}}: Fuente de la tasa de muestreo del recurso:
  - `AUTOMATIC`: [Mecanismo de muestreo basado en cabeceras predeterminado][8] del Agent.
  - `CONFIGURED LOCAL`: [Regla de muestreo de trazas][7] establecida localmente en el SDK.
  - `CONFIGURED REMOTE`: Regla de muestreo de trazas remota establecida desde la interfaz de usuario de Datadog.
  - `ADAPTIVE REMOTE`: Reglas de muestreo adaptativo establecidas por Datadog.

Una vez que un servicio se incorpora al muestreo adaptativo, las tasas de muestreo se ajustan y recalculan cada 10 minutos.

### Incorporar un servicio al muestreo adaptativo {#onboard-a-service-to-adaptive-sampling}

Para incorporar un servicio al muestreo adaptativo:

1. Navegue a la página [Ingestion Control][18].
2. Haga clic en un servicio para visualizar el {{< ui >}}Service Ingestion Summary{{< /ui >}}.
3. Haga clic en {{< ui >}}Manage Ingestion Rate{{< /ui >}}.
4. Elija {{< ui >}}Datadog adaptive sampling rates{{< /ui >}} como la estrategia de muestreo de su servicio.
5. (Opcional) Configure [tasas de muestreo][15] explícitas para recursos específicos, para los cuales desea capturar más (por ejemplo, el 100% de los endpoints `GET /checkout`) o menos (por ejemplo, el 0.1% de las solicitudes `/health`) datos.
6. Haga clic en {{< ui >}}Apply{{< /ui >}}.

<div class="alert alert-info">Si la aplicación de esta configuración <strong>Remotamente</strong> está deshabilitada, asegúrese de que se cumplan los <a href="#requirements">Remote Configuration requirements</a>.</div>

{{< img src="/tracing/guide/adaptive_sampling/adaptive_sampling_setting_modal.png" alt="Modal de configuración de muestreo adaptativo" style="width:70%;">}}

La configuración debería surtir efecto en 5-6 minutos, el tiempo que tarda Datadog en observar el patrón de tráfico del servicio, calcular y luego aplicar las tasas de muestreo. Los recursos que se han configurado remotamente se muestran como `Configured Remote` en la columna {{< ui >}}Configuration{{< /ui >}}.

## Permisos {#permissions}

De forma predeterminada, solo los usuarios con el rol `Datadog Admin` pueden modificar las configuraciones de muestreo adaptativo o incorporar servicios al muestreo adaptativo.

Si su organización utiliza roles personalizados, asigne a su usuario un rol personalizado que incluya los [permisos][4] `APM Remote Configuration Write` y `APM Service Ingest Write`.

### Restringir acceso {#restrict-access}
Utilice [controles de acceso granulares][19] para administrar quién puede modificar la configuración de muestreo adaptativo de un servicio. Puede restringir el acceso según roles, equipos o usuarios individuales.

{{< img src="/tracing/guide/adaptive_sampling/add_restriction.png" alt="Modal de restricción de permisos" style="width:60%;">}}

Para restringir el acceso:

{{< img src="/tracing/guide/adaptive_sampling/restrict_service_ingestion_permissions.png" alt="Abrir el modal de control de acceso granular" style="width:100%;">}}

**Nota**: Solo los usuarios con el permiso `remote_config_write` pueden restringir el acceso a la configuración de muestreo adaptativo de servicios individuales.

1. Abra la sección {{< ui >}}Permissions{{< /ui >}} en el panel lateral de Ingestion Control del servicio.

2. Haga clic en {{< ui >}}Restrict access{{< /ui >}}.

3. Seleccione los equipos, roles o usuarios a los que desea otorgar acceso.

4. Haga clic en {{< ui >}}Add{{< /ui >}}.

## Lecturas adicionales {#further-reading}

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
[10]: https://github.com/DataDog/dd-trace-py/releases/tag/v3.14.2
[11]: https://github.com/DataDog/dd-trace-rb/releases/tag/v2.0.0
[12]: https://github.com/DataDog/dd-trace-js/releases/tag/v5.16.0
[13]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.54.0
[14]: https://github.com/DataDog/dd-trace-cpp/releases/tag/v0.2.2
[15]: /es/tracing/trace_pipeline/ingestion_controls#configure-the-service-ingestion-rates-by-resource
[16]: /es/tracing/trace_pipeline/ingestion_controls
[17]: https://github.com/DataDog/dd-trace-php/releases/tag/1.4.0
[18]: https://app.datadoghq.com/apm/traces/ingestion-control
[19]: /es/account_management/rbac/granular_access/
[20]: https://github.com/DataDog/dd-trace-rs/releases/tag/datadog-opentelemetry-v0.4.0