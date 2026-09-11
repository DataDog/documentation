---
custom_kind: integración
description: Genera flares con perfiles basados en umbrales de memoria y CPU definidos
  por el usuario.
git_integration_title: agentprofiling
integration_id: agentprofiling
integration_title: Check de Agent Profiling
is_public: true
name: agentprofiling
public_title: Datadog-Agent Profiling
short_description: Genera flares con perfiles basados en umbrales de memoria y CPU
  definidos por el usuario.
supported_os:
- linux
- mac_os
- windows
updated_for_agent: 7.66
---

## Información general

Este check debe utilizarse cuando se soluciona un problema de memoria o de CPU en el Agent. Una vez superado un umbral de memoria o de CPU configurado por el usuario, se genera automáticamente un flare con perfiles. Este flare puede generarse localmente o enviarse directamente a un caso del servicio de asistencia de Datadog. Para que el flare se envíe directamente a un caso del servicio de asistencia de Datadog, se deben proporcionar un `ticket_id` y un `user_email` en `conf.yaml`. De lo contrario, se genera localmente.  

## Configuración

### Instalación

El check de sistema está incluido en el paquete del [Datadog Agent][1]. No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `agentprofiling.d/conf.yaml` en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][2]. Para ver todas las opciones de configuración disponibles, consulta el [agentprofiling.d/conf.yaml de ejemplo][3]. *Nota**: Al menos una entrada es obligatoria en `instances` para activar el check, por ejemplo:

    ```yaml
    init_config:
    instances:
        - memory_threshold: 1GB
          cpu_threshold: 50
          ticket_id: # Given by Support
          user_email: # Email used in correspondence with Support
    ```

2. [Reinicia el Agent][4].

### Validación

[Ejecuta el subcomando de estado del Agent][1] y busca `agentprofiling` en la sección **Checks**.

## Datos recopilados

### Métricas

El check de Agent Profiling no incluye métricas.

### Eventos

El check de Agent Profiling no incluye eventos.

### Checks de servicio

El check de Agent Profiling no incluye checks de servicios.

[1]: /es/agent/guide/agent-commands/#agent-status-and-information
[2]: /es/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/agentprofiling.d/conf.yaml.example
[4]: /es/agent/guide/agent-commands/#start-stop-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/master/system_swap/datadog_checks/system_swap/data/conf.yaml.example