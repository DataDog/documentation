---
categories:
- nube
- AWS
- recopilación de logs
custom_kind: integración
dependencies: []
description: Seguimiento de métricas AWS Step Functions clave.
doc_link: https://docs.datadoghq.com/integrations/amazon_step_functions/
draft: false
git_integration_title: amazon_step_functions
has_logo: true
integration_id: ''
integration_title: AWS Step Functions
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_step_functions
public_title: '"Integración AWS Step Functions en Datadog"'
short_description: Seguimiento de métricas AWS Step Functions clave.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

AWS Step Functions te permite coordinar los componentes de aplicaciones distribuidas y microservicios mediante flujos (flows) de trabajo visuales.

Esta integración te permite visualizar métricas AWS Step Functions básicas en Datadog. Para obtener información sobre el rastreo y las métricas mejoradas, consulta [Monitorización Datadog serverless para AWS Step Functions][1].

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Amazon Web Services][2]. A continuación, añade los siguientes permisos al documento de la política de tu rol AWS/Datadog:

```text
states:ListStateMachines,
states:DescribeStateMachine
```

### Recopilación de métricas

1. En la [página de la integración AWS][3], asegúrate de que `States` está habilitado en la pestaña `Metric Collection`. Si tus máquinas de estado utilizan AWS Lambda, asegúrate también de que `Lambda` está habilitado.
2. Instala la [integración AWS Step Functions en Datadog][4].

#### Para enriquecer las métricas AWS Lambda

Si tus estados de Step Functions son funciones Lambda, al instalar esta integración se añaden las [etiquetas (tags)][5] `statemachinename`, `statemachinearn` y `stepname` adicionales a tus métricas Lambda. Esto te permite ver a qué máquinas de estado pertenecen tus funciones Lambda: Puedes visualizarlo en la [página de serverless][6].

### Recopilación de métricas mejorada

Datadog también puede generar [métricas mejoradas][7] para tus Step Functions para ayudarte a realizar un seguimiento del promedio o p99 de las duraciones de pasos individuales. Para utilizar estas métricas mejoradas, consulta [Monitorización Datadog serverless para AWS Step Functions][1].

### Recopilación de logs

1. Configura AWS Step Functions para [enviar logs a CloudWatch][8]. **Nota**: Utiliza el prefijo del grupo de logs de CloudWatch predeterminado `/aws/vendedlogs/states` de Datadog para identificar el origen de los logs y analizarlos automáticamente.
2. [Envía los logs a Datadog][9].

### Recopilación de trazas (traces)

Puedes habilitar la recopilación de trazas de dos formas: a través de [Datadog APM para Step Functions][1] o a través de AWS X-Ray. 

#### Habilitar el rastreo a través de Datadog APM para AWS Step Functions

Para habilitar el rastreo distribuido para tus AWS Step Functions, consulta [Monitorización Datadog serverless para AWS Step Functions][1].

#### Habilitar el rastreo a través de AWS X-Ray


<div class="alert alert-warning">Esta opción no recopila <a href="https://docs.datadoghq.com/serverless/step_functions/enhanced-metrics">métricas mejoradas para AWS Step Functions</a>. Para recopilar estas métricas, debes habilitar el rastreo a través de <a href="https://docs.datadoghq.com/serverless/step_functions">Datadog APM para AWS Step Functions</a>.</div>

Para recopilar trazas de tus AWS Step Functions a través de AWS X-Ray:

1. Habilita la [integración AWS X-Ray en Datadog][10].
1. Inicia sesión en la consola de AWS.
2. Ve a **Step Functions.**
3. Selecciona una de tus Step Functions y haz clic en **Edit** (Editar).
4. Desplázate a la sección **Rastreo** en la parte inferior de la página y selecciona la casilla para **Habilitar el rastreo X-Ray**.
5. Recomendado: [Instala la biblioteca de rastreo de AWS X-Ray][11] en tus funciones para obtener trazas más detalladas.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_step_functions" >}}


### Eventos

La integración AWS Step Functions no incluye eventos.

### Checks de servicio

La integración AWS Step Functions no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [soporte técnico de Datadog][13].

[1]: https://docs.datadoghq.com/es/serverless/step_functions
[2]: https://app.datadoghq.com/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-step-functions
[5]: https://app.datadoghq.com/tagging/
[6]: https://app.datadoghq.com/serverless/
[7]: https://docs.datadoghq.com/es/serverless/step_functions/enhanced-metrics
[8]: https://docs.aws.amazon.com/step-functions/latest/dg/cw-logs.html
[9]: https://app.datadoghq.com/integrations/amazon_web_services/?tab=roledelegation#log-collection
[10]: https://app.datadoghq.com/tracing/serverless_functions/enable_aws_xray
[11]: https://app.datadoghq.com/integrations/amazon_xray/#installing-the-x-ray-client-libraries
[12]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_step_functions/amazon_step_functions_metadata.csv
[13]: https://app.datadoghq.com/help/