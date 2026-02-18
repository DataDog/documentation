---
categories:
- orchestration
custom_kind: integration
dependencies: []
description: Visualiza y busca tareas de Fabric en tu flujo (stream) de eventos Datadog.
doc_link: https://docs.datadoghq.com/integrations/fabric/
draft: false
git_integration_title: fabric
has_logo: true
integration_id: fabric
integration_title: Fabric
integration_version: ''
is_public: true
manifest_version: '1.0'
name: fabric
public_title: Integración de Datadog y Fabric
short_description: Visualiza y busca tareas de Fabric en tu flujo (stream) de eventos
  Datadog.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

**Advertencia**: Esta integración ha quedado obsoleta y ya no se desarrolla activamente.

Conecta Fabric a Datadog para:

- Buscar y capturar eventos de despliegues en el flujo de eventos.
- Correlacionar eventos de despliegues con los cambios de métricas en dashboards.

## Configuración

### Configuración

1. Instala el paquete dogapi:

    ```shell
    sudo easy_install --upgrade dogapi
    ```

   o:

    ```shell
    sudo pip install dogapi
    ```

2. Importa dogapi y configura tu clave de API:

    ```python
    from dogapi.fab import setup, notify
    setup("<YOUR_DATADOG_API_KEY")
    ```

3. Añade el decorador de notificaciones a cada tarea que quieras conectar a Datadog. Asegúrate de que @notify tenga lugar justo sobre @task

    ```python
    @notify
    @task
    def a_fabric_task(...):
        # do things
    ```

## Datos recopilados

### Métricas

La integración Fabric no incluye métricas.

### Eventos

La integración Fabric no incluye eventos.

### Checks de servicio

La integración Fabric no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][1].

[1]: https://docs.datadoghq.com/es/help/