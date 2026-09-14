---
description: Estime el uso y los costos de sus Feature Flags antes de desplegarlas,
  y aplique medidas concretas para gestionarlos y reducirlos después del despliegue.
further_reading:
- link: /feature_flags/concepts/monthly_flag_configuration_requests/
  tag: Documentación
  text: Solicitudes Mensuales de Configuración de Feature Flags
- link: /feature_flags/concepts/stale_flags/
  tag: Documentación
  text: Feature Flags obsoletas
- link: /feature_flags/concepts/environments/
  tag: Documentación
  text: Entornos
- link: /feature_flags/concepts/configuration_sources/
  tag: Documentación
  text: Fuentes de configuración del SDK del servidor
- link: /account_management/plan_and_usage/usage_details/
  tag: Documentación
  text: Detalles de uso
- link: /account_management/plan_and_usage/bill_overview/
  tag: Documentación
  text: Resumen de facturación
title: Estimar y gestionar los costos de las Feature Flags
---
## Descripción general {#overview}

El uso de Feature Flags escala según cómo despliegue Feature Flags:

- Para el uso **del lado del cliente**, depende de la cantidad de aplicaciones cliente y usuarios finales que se conectan a Datadog.
- Para el uso **del lado del servidor**, depende de la cantidad de servicios backend que solicitan la configuración.

Dos organizaciones con la misma cantidad de flags pueden generar diferentes cantidades de uso, dependiendo de esta huella de despliegue. Esta guía le ayuda a estimar el uso y el costo antes de realizar un despliegue general. También cubre las medidas disponibles para gestionar y reducir el costo después del despliegue.

## Estime el uso y los costos de sus Feature Flags {#estimate-your-feature-flags-usage-and-costs}

Datadog factura el uso de Feature Flags en las Solicitudes Mensuales de Configuración de Feature Flags (MFCR). Una MFCR es una solicitud del archivo que contiene sus Feature Flags y sus reglas de segmentación, no una evaluación individual de un Feature Flag. Los SDK almacenan ese archivo localmente y evalúan los Feature Flags a partir de él sin realizar más llamadas de red, por lo que una única solicitud de configuración puede respaldar muchas evaluaciones en muchos Feature Flags. Para obtener la definición completa y las reglas de conteo, consulte [Monthly Flag Configuration Requests][1].

Debido a que las MFCR cuentan las solicitudes de configuración, la cantidad de Feature Flags que mantiene y la frecuencia con la que se evalúan no afectan directamente el uso. Los factores que lo hacen:

- **Uso del lado del cliente**: Un SDK del lado del cliente solicita la configuración cuando se inicializa, lo que normalmente ocurre cada vez que un usuario abre una pestaña del navegador o una aplicación móvil. El MFCR del lado del cliente rastrea de cerca el volumen total (sin muestreo) de sesiones o aperturas de aplicaciones en las aplicaciones donde utiliza Feature Flags.
- **Uso del lado del servidor**: Un SDK del lado del servidor sondea a Datadog (o al Datadog Agent, dependiendo de la [fuente de configuración][2] que elija) en un intervalo configurable, 30 segundos por defecto. El MFCR del lado del servidor rastrea el número total de hosts, servicios o contenedores en ejecución con el SDK implementado, multiplicado por la frecuencia con la que cada uno realiza el sondeo.
- **Combinación del lado del cliente y del servidor**: Si utiliza Feature Flags tanto en el cliente como en el servidor, sume las dos estimaciones.

<div class="alert alert-info">Datadog factura las solicitudes de configuración del lado del servidor a 10 veces su conteo bruto, porque una sola solicitud del lado del servidor puede servir asignaciones de variantes a muchos más usuarios finales que una sola solicitud del lado del cliente.</div>

### Estime su uso antes de realizar el despliegue {#estimate-your-usage-before-you-roll-out}

1. Decida qué SDK planea implementar: del lado del cliente, del lado del servidor o ambos.
1. Para el uso del lado del cliente, realice una estimación con una de las siguientes opciones:
   - Su volumen mensual de sesiones de RUM. Alternativamente, utilice sus usuarios activos diarios en las aplicaciones donde planea usar Feature Flags, multiplicado por 30 para obtener una estimación mensual.
   - Si Feature Flags cubre un conjunto más amplio de aplicaciones que su implementación actual de RUM, utilice en su lugar los usuarios activos diarios o las sesiones diarias en esas aplicaciones.
1. Para el uso del lado del servidor, cuente el número total de hosts, servicios o contenedores en ejecución con el SDK implementado. Multiplique ese conteo por el número de solicitudes de configuración por día según su intervalo de sondeo, luego por 30 para obtener una estimación mensual, y aplique el multiplicador de 10 veces para el lado del servidor.
1. Sume las estimaciones del lado del cliente y del lado del servidor para obtener una estimación mensual combinada de MFCR.

Por ejemplo, una organización con 1.2 millones de usuarios activos diarios en aplicaciones cliente con Feature Flags genera aproximadamente 36 millones de MFCR por mes (1.2 millones x 30 días).

Para un ejemplo del lado del servidor, una organización que ejecuta el SDK en 33 hosts genera 2,880 solicitudes de configuración por host por día en el intervalo de sondeo predeterminado de 30 segundos (86,400 segundos por día / 30 segundos). Eso es 33 x 2,880 x 30 días = 2,851,200 (aproximadamente 2.85 millones) de MFCR antes del multiplicador del lado del servidor, o aproximadamente 28.5 millones de MFCR después de aplicarlo.

El uso inferior a 1 millón de MFCR por mes se incluye sin costo adicional. Para conocer los niveles de precios actuales por encima de esa asignación, consulte la [página de precios de Feature Flags][4].

### Haga un seguimiento de su uso y costo reales {#monitor-your-actual-usage-and-cost}

Después de la implementación, compare su estimación con el uso real. Datadog informa sobre el uso y el costo de Feature Flags junto con sus otros productos en las páginas de [Detalles de uso][5] y [Resumen de facturación][6], donde puede visualizar las tendencias de uso a lo largo del tiempo y descargar datos de uso detallados.

## Administre y reduzca los costos de Feature Flags {#manage-and-reduce-feature-flags-costs}

Debido a que el MFCR rastrea las solicitudes de configuración en lugar del número de Feature Flags, reducir la cantidad de Feature Flags que mantiene no reduce el costo por sí solo. Las siguientes palancas se dirigen a lo que realmente impulsa el MFCR: cuántas sesiones de cliente inicializan el SDK, cuántas instancias de servidor solicitan la configuración y con qué frecuencia.

### Revise la proliferación de entornos y la huella del SDK de servidor {#review-environment-sprawl-and-server-sdk-footprint}

El MFCR del lado del servidor se multiplica con cada entorno que ejecuta una instancia del SDK. Revise qué [entornos][3] necesitan realmente la entrega de Feature Flags del lado del servidor en tiempo real. La infraestructura efímera o de corta duración, como los entornos por rama o de CI, aumenta el volumen de solicitudes sin añadir valor de despliegue si no requiere segmentación. Consolide las consultas de entorno donde varios valores de `env` se asignan al mismo entorno lógico, para no duplicar la entrega de configuración innecesariamente.

### Desactive los Feature Flags donde no se utilicen {#turn-off-feature-flags-where-they-arent-in-use}

La instalación de un SDK de servidor no activa la facturación por sí sola; una solicitud de configuración solo ocurre después de que el proveedor se inicializa. Si un servicio tiene el tracer instalado pero no utiliza Feature Flags, configure `DD_FEATURE_FLAGS_ENABLED=false` para desactivar el proveedor y detener el sondeo de configuración. Para obtener más detalles, consulte [Fuentes de configuración del SDK de servidor][2].

### Ajuste el intervalo de sondeo de configuración {#adjust-the-configuration-polling-interval}

Para la entrega del lado del servidor sin agente, `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_POLL_INTERVAL_SECONDS` controla la frecuencia con la que el SDK solicita la configuración, con un valor predeterminado de 30 segundos y un máximo de 3600 segundos (una hora). Un intervalo más largo reduce el volumen de solicitudes a costa de una propagación más lenta de los flags. Ampliar el intervalo en entornos de menor prioridad, como desarrollo o pruebas, es una forma de reducir el volumen donde la propagación rápida es menos importante que en producción.

### Elija una fuente de configuración que coincida con su implementación {#choose-a-configuration-source-that-matches-your-deployment}

Con Agent Remote Configuration, las aplicaciones se comunican con el Datadog Agent local en lugar de consultar a Datadog directamente. Si ejecuta varios procesos de aplicación en el mismo servidor, enrutarlos a través de un Agent compartido puede consolidar las solicitudes de configuración en comparación con cada proceso consultando a Datadog de forma independiente mediante la entrega sin Agent. Compare esto con el costo operativo de ejecutar y mantener Agents con Remote Configuration habilitado. Consulte [Fuentes de configuración del SDK del servidor][2] para saber cómo elegir entre ambas.

### Delimite la inicialización del SDK del lado del cliente al contexto donde utiliza Feature Flags {#scope-client-side-sdk-initialization-to-where-you-use-flags}

El MFCR del lado del cliente rastrea sesiones o aperturas de aplicaciones en aplicaciones que inicializan el proveedor de Feature Flags. Inicialice el proveedor solo en las aplicaciones y propiedades donde controla funciones con Feature Flags, en lugar de hacerlo de manera universal en cada propiedad del cliente.

### Elimine los Feature Flags obsoletos y sin usar {#clean-up-stale-and-unused-flags}

Las [Feature Flags obsoletas][7] no aumentan directamente el MFCR, ya que una solicitud de configuración cubre todas sus Feature Flags independientemente de la cantidad. Archivarlas reduce la deuda técnica de las Feature Flags y el riesgo de mantener lógica vinculada a servicios o entornos que ya no necesita. Revisar las Feature Flags obsoletas también es una señal útil para retirar entornos completos o implementaciones de SDK que ya no están en uso, lo cual sí reduce el volumen de solicitudes del lado del servidor.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/feature_flags/concepts/monthly_flag_configuration_requests/
[2]: /es/feature_flags/concepts/configuration_sources/
[3]: /es/feature_flags/concepts/environments/
[4]: https://www.datadoghq.com/pricing/?product=feature-flags#products
[5]: /es/account_management/plan_and_usage/usage_details/
[6]: /es/account_management/plan_and_usage/bill_overview/
[7]: /es/feature_flags/concepts/stale_flags/