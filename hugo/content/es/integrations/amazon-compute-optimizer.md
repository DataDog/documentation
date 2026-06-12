---
aliases:
- /es/integrations/amazon_compute_optimizer
app_id: amazon-compute-optimizer
categories:
- nube
- aws
custom_kind: integración
description: Recomendaciones de configuración de recursos para optimizar eficazmente
  tus cargas de trabajo.
media: []
title: AWS Compute Optimizer
---
{{% site-region region="gov" %}}

<div class="alert alert-warning">La integración de AWS Compute Optimizer no es compatible con el <a href="/getting_started/site">sitio Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>

{{% /site-region %}}

## Información general

AWS Compute Optimizer es un servicio web que proporciona recomendaciones de configuración de recursos para ayudar a los usuarios a dimensionar de manera correcta sus cargas de trabajo.

Esta integración te permite obtener mejores recomendaciones sobre tipos de instancias EC2 en AWS Compute Optimizer utilizando los datos de uso de memoria del Datadog Agent. Para obtener más información sobre Compute Optimizer, consulta [¿Qué es AWS Compute Optimizer?](https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html) en la documentación de AWS.

## Configuración

### Instalación

#### AWS

1. En la consola de AWS Compute Optimizer, dirígete a la página de **Cuentas** y configura tus preferencias a nivel de cuenta para la ingesta de métricas externas en `Datadog`.
1. Repite el paso n.° 1 para cada cuenta de AWS para la que quieras obtener recomendaciones mejoradas.

#### Datadog

3. Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/) para cada cuenta seleccionada.
1. Instala el [Datadog Agent](https://docs.datadoghq.com/agent/) en cualquier instancia EC2 para incluirla en las recomendaciones mejoradas de Compute Optimizer.
1. Instala la integración [Datadog - AWS Compute Optimizer](https://app.datadoghq.com/integrations/amazon-compute-optimizer/).

Una vez que se hayan completado todos los pasos, las recomendaciones de AWS Compute Optimizer pueden tardar **hasta 30 horas** en usar los datos de utilización de memoria de Datadog.

#### Validación

Confirma que se hace referencia a Datadog como `External metrics source` (Fuente de métricas externas) en la tabla de recomendaciones para instancias de EC2:

![Dashboard de AWS con recomendaciones de Compute Optimizer con tres instancias enumeradas y un enlace Datadog bajo la columna de fuente de métricas externas para cada instancia](images/compute_optimizer.png)

## Funcionamiento

Para todas las instancias EC2 monitorizadas por la [integración AWS de Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/) y por el [Datadog Agent](https://docs.datadoghq.com/agent/), Datadog envía datos de uso de memoria del Agent a AWS Compute Optimizer para proporcionar recomendaciones de instancias mejoradas que pueden generar un ahorro de costes.

**Nota:** Las métricas de utilización de memoria de Datadog se integran directamente con el servicio de AWS Compute Optimizer y no con tu cuenta de AWS. No se necesitan permisos de IAM adicionales para esta integración, ya que Datadog no interactúa directamente con tu cuenta de AWS.

## Datos recopilados

### Métricas

La integración de AWS Compute Optimizer no incluye métricas.

### Eventos

La integración de AWS Compute Optimizer no incluye eventos.

### Checks de servicio

La integración de AWS Compute Optimizer no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).