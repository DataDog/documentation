---
app_id: capistrano
categories:
- automatización
- configuración y despliegue
- herramientas de desarrollo
- orquestación
- suministro
custom_kind: integración
description: Capistrano es un DSL de Ruby para ejecutar scripts en varios servidores,
  principalmente para desplegar aplicaciones web.
media: []
title: Capistrano
---
## Información general

[Capistrano](http://capistranorb.com) es una herramienta de automatización y despliegue de servidores remotos escrita en Ruby.

Instala la integración Capistrano de Datadog para:

- Buscar y capturar eventos de despliegues en tu flujo de eventos.
- Superponer eventos de despliegue con otras métricas dentro de los dashboards para identificar qué despliegues afectan el rendimiento de tu aplicación.

Una vez que habilites esta integración para un `Capfile`determinado, cada tarea de Capistrano que se complete se enviará como un evento a Datadog. También se enviarán la información de los roles y la salida de los logs.

## Configuración

### Instalación

Instala el gem de Ruby `dogapi`:

```shell
sudo gem install dogapi --version ">=1.10.0"
```

### Configuración

Añade lo siguiente al comienzo de cualquier `Capfile` cuyas tareas desees enviar a Datadog:

```text
require "capistrano/datadog"
set :datadog_api_key, "${your_api_key}"
```

### Validación

Después de haber configurado tu `Capfile` y de haber ejecutado al menos una tarea de Capistrano:

1. Ve a tu [flujo de eventos](https://app.datadoghq.com/event/stream).
1. Ingresa `sources:capistrano` en la barra de búsqueda o haz clic en 'Capistrano' en la lista FROM de integraciones de la izquierda.
1. Ingresa `priority:all` en la barra de búsqueda o haz clic en 'All' en la lista PRIORITY de la izquierda. Las tareas de Capistrano se envían con prioridad baja de manera predeterminada, por lo que no aparecen en la vista de flujo de eventos predeterminada (prioridad normal).

{{< img src="integrations/capistrano/capistranoevents.mp4" video="true" >}}

## Datos recopilados

### Métricas

La integración Capistrano no incluye métricas.

### Eventos

La integración Capistrano no incluye eventos.

### Checks de servicio

La integración Capistrano no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).