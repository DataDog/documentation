---
categories:
- automation
- configuration & deployment
- developer tools
- orchestration
- provisioning
custom_kind: integración
dependencies: []
description: Captura y busca despliegues, y superponlos en gráficas de métricas clave.
doc_link: https://docs.datadoghq.com/integrations/capistrano/
draft: false
git_integration_title: capistrano
has_logo: true
integration_id: capistrano
integration_title: Capistrano
integration_version: ''
is_public: true
manifest_version: '1.0'
name: capistrano
public_title: Integración de Datadog y Capistrano
short_description: Captura y busca despliegues, y superponlos en gráficas de métricas
  clave.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

[Capistrano][1] es una herramienta de automatización y despliegue de servidores remotos escrita en Ruby.

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

1. Navega hasta tu [flujo de eventos][2].
2. Ingresa `sources:capistrano` en la barra de búsqueda o haz clic en 'Capistrano' en la lista FROM de integraciones de la izquierda.
3. Ingresa `priority:all` en la barra de búsqueda o haz clic en 'All' en la lista PRIORITY de la izquierda. Las tareas de Capistrano se envían con prioridad baja de manera predeterminada, por lo que no aparecen en la vista de flujo de eventos predeterminada (prioridad normal).

{{< img src="integrations/capistrano/capistranoevents.mp4" video="true" >}}

## Datos recopilados

### Métricas

La integración Capistrano no incluye métricas.

### Eventos

La integración Capistrano no incluye eventos.

### Checks de servicio

La integración Capistrano no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: http://capistranorb.com
[2]: https://app.datadoghq.com/event/stream
[3]: https://docs.datadoghq.com/es/help/