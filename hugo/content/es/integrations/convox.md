---
app_id: convox
categories:
- cloud
- configuration & deployment
- containers
custom_kind: integración
description: Convox es un PaaS de código abierto diseñado para ofrecer total privacidad
  y cero mantenimiento.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-aws-ecs-convox-integration/
  tag: blog
  text: Monitorización de tu plataforma de AWS ECS con Convox y Datadog
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Convox
---
## Información general

Obtén métricas de Convox en tiempo real para visualizar el rendimiento de tus contenedores.

![Widget del dashboard de integración de Convox](https://raw.githubusercontent.com/DataDog/integrations-extras/master/convox/images/snapshot.png)

## Configuración

Consulta la [documentación de Convox](https://docs.convox.com/integrations/monitoring/datadog) para configurar la integración de Datadog.

### Desplegar el Datadog Agent

Puedes desplegar el Datadog Agent como una aplicación Convox utilizando un manifiesto `docker-compose.yml`. Utiliza un `count` que coincida con el parámetro `InstanceCount` de tu Rack.

```shell
# check out the repo
$ git clone https://github.com/convox-examples/datadog.git
$ cd dd-agent

# deploy the agent app and secret
$ convox apps create
$ convox env set DD_API_KEY=<your api key>
$ convox deploy
$ convox scale agent --count=3 --cpu=10 --memory=128
```

Ejecuta `convox deploy` para desplegar el Datadog Agent en ECS.

### Autoescalado

Si el autoescalado está habilitado en tu Rack, necesitas escalar dinámicamente el recuento del Datadog Agent para que coincida con el recuento de instancias del Rack.

Para más información, consulta el tutorial [Listening for ECS CloudWatch Events](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_cwet.html).

## Datos recopilados

### Métricas

La integración Convox no incluye métricas.

### Eventos

La integración Convox no incluye eventos.

### Checks de servicio

La integración Convox no incluye checks de servicio.

## Solucionar problemas

Al configurar las variables de entorno en el archivo `convox.yml`, el parámetro `environment` debe definirse en el mismo nivel que el parámetro `services`.

![Parámetros de Entorno y Servicios definidos en el mismo nivel](https://raw.githubusercontent.com/DataDog/integrations-extras/master/convox/images/setting_environment_variables.png)

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorización de tu plataforma de Amazon ECS con Convox y Datadog](https://www.datadoghq.com/blog/monitor-aws-ecs-convox-integration/)