---
aliases:
- /es/security/workload_protection/respond_and_report/active_protection
- /es/security/workload_protection/respond_and_report/automated_response
- /es/security/workload_protection/respond_and_report/response
- /es/security/workload_protection/respond_and_report/remediation
- /es/security/workload_protection/guide/active-protection
- /es/security/cloud_security_management/guide/active-protection
description: Termine procesos y contenedores o bloquee el tráfico de red con acciones
  de respuesta de Workload Protection automatizadas y manuales.
disable_toc: false
further_reading:
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
  tag: Documentación
  text: Reglas de detección de Workload Protection
- link: /security/workload_protection/setup
  tag: Documentación
  text: Configuración de Workload Protection
- link: /security/workload_protection/setup/advanced_configuration
  tag: Documentación
  text: Configuración del Workload Protection Agent
- link: https://learn.datadoghq.com/courses/workload-protection-detect-compromises
  tag: Centro de aprendizaje
  text: Detecte compromisos de servidores y contenedores con Workload Protection
- link: https://www.datadoghq.com/blog/stop-runtime-threats-with-workload-protection-response-actions/
  tag: Blog
  text: Detenga las amenazas en tiempo de ejecución con las acciones de respuesta
    de Workload Protection
site_support_id: workload_security_active_protection
title: Responder a amenazas
---
Workload Protection actúa sobre las amenazas terminando procesos y contenedores o bloqueando el tráfico de red. El Datadog Agent ejecuta estas acciones automáticamente cuando coincide una regla de Agent o cuando usted las activa manualmente desde una señal. Ambos métodos dependen de la aplicación de Agent.

## Requisitos de respuesta{#response-requirements}

Las acciones de respuesta se ejecutan en Agent, por lo que tanto la respuesta automatizada como la manual dependen de la configuración de Agent y de los permisos RBAC correctos.

### Configurar la aplicación de Agent{#configure-agent-enforcement}

Las acciones de respuesta utilizan la configuración de `runtime_security_config.enforcement` en `/etc/datadog-agent/system-probe.yaml`. La aplicación está habilitada de forma predeterminada y la configuración predeterminada es suficiente para la mayoría de las configuraciones. Para obtener la referencia completa de los parámetros, consulte [Workload Protection Agent configuration][4].

Esta configuración le permite excluir binarios de las acciones de respuesta o controlar qué fuentes de reglas pueden activarlas. De forma predeterminada, no se excluye ningún binario y se permiten las fuentes de reglas `file` y `remote-config`.

### Permisos de respuesta{#response-permissions}

Tanto la respuesta automatizada como la manual requieren [permisos RBAC][5] específicos:

- El permiso `security_monitoring_cws_agent_rules_actions` permite a los usuarios configurar la respuesta automatizada y responder manualmente a las amenazas.
  - Un usuario con el rol de Datadog Admin debe crear un rol que incluya este permiso y, luego, asignar ese rol solo a los usuarios que administran la respuesta automatizada o que necesitan ejecutar acciones de respuesta manual.
- El rol **Datadog Standard** permite a los usuarios crear y actualizar reglas personalizadas de forma predeterminada, siempre que los cambios no modifiquen la configuración de **protección** en la regla. Los usuarios con el rol Standard no pueden habilitar una regla deshabilitada que incluya una acción de respuesta automatizada y no pueden utilizar acciones de respuesta manual.

## Respuesta automatizada {#automated-response}

La respuesta automatizada le permite bloquear proactivamente las amenazas identificadas por las reglas de detección de Datadog Agent al terminar o aislar de la red los procesos o contenedores coincidentes.

La respuesta automatizada divide la decisión entre dos equipos:

- Security decide qué amenazas justifican una acción automatizada.
- DevOps decide qué aplicaciones y recursos son lo suficientemente resistentes para soportar la protección dirigida.

El resultado es la detección de amenazas seguida de una mitigación inmediata y dirigida de las amenazas de alta confianza.

### Disponibilidad de respuesta automatizada {#automated-response-availability}

Si la respuesta automatizada está activa para una regla de Agent, puede verificarla en la regla:

1. En [Agent Configuration][2], abra la regla de Agent.
2. Confirme que {{< ui >}}Automated response{{< /ui >}} aparece en la lista de acciones activas.

Para verificar si la respuesta automatizada se aplica a una regla que generó una señal:

1. En [Signals][1], abra la señal.
2. Visualice {{< ui >}}Next Steps{{< /ui >}}. Si la respuesta automatizada está disponible para la regla coincidente, {{< ui >}}Proactively block threats{{< /ui >}} muestra {{< ui >}}Automated response enabled{{< /ui >}}.

### Configurar la respuesta automatizada en las reglas de Agent {#configure-automated-response-on-agent-rules}

De forma predeterminada, todas las reglas de Agent listas para usar (OOTB) están activas sin respuesta automatizada. Debe configurar la acción de respuesta automatizada manualmente para terminar o aislar procesos.

#### Estados de protección {#protection-states}

Una regla de Agent puede estar en uno de los siguientes estados:

- **Inactivo:** El Agent no monitorea los eventos de la regla y no envía detecciones al backend de Datadog.
- **Activo:** Esta es la configuración predeterminada para las reglas habilitadas. El Agent monitorea la regla habilitada y muestra las detecciones en [Signals][1].
- **Activo con respuesta automatizada:** El Agent monitorea la regla habilitada, termina o aísla de la red los procesos coincidentes y muestra las detecciones en [Signals][1].

<div class="alert alert-info">La respuesta automatizada se aplica a todas las amenazas detectadas después de que se habilita la respuesta automatizada. La respuesta automatizada no es retroactiva.</div>

Para habilitar la respuesta automatizada en una regla de Agent:

1. En [Agent Configuration][2], abra una regla de Agent. Si no hay una acción {{< ui >}}Automated response{{< /ui >}} en la sección {{< ui >}}Agent's actions{{< /ui >}}, entonces la respuesta automatizada no está disponible para esa regla.
2. Haga clic en {{< ui >}}Edit{{< /ui >}}.
3. En {{< ui >}}Add actions for the agent to follow{{< /ui >}}, seleccione una de las {{< ui >}}Automated response{{< /ui >}}.

   {{< img src="security/workload_protection/respond_and_report/automated_response_activation.png" alt="Sección de Protección de una regla de Agent que muestra la acción de respuesta automatizada" style="width:100%;" >}}
4. En {{< ui >}}Link the rule to policies{{< /ui >}}, verifique que la regla esté {{< ui >}}Active{{< /ui >}} en al menos una política.
5. Haga clic en {{< ui >}}Update Agent Rule{{< /ui >}}.

### Revise los intentos de ataque bloqueados {#review-blocked-attack-attempts}

Después de habilitar la respuesta automatizada para una regla de Agent, las amenazas bloqueadas aparecen en [Signals][1].

Cualquier respuesta automatizada se enumera en la tabla de Respuesta, junto con las respuestas enviadas manualmente.

## Respuesta manual {#response}

La respuesta manual le permite proteger su infraestructura desde el panel lateral de señales después de que Workload Protection genere una [señal][6]. Utilice la respuesta manual si no desea que una regla de Agent termine procesos automáticamente.

{{< img src="security/workload_protection/respond_and_report/response_actions.png" alt="Sección de Respuesta que muestra las acciones de aislar contenedor y eliminar contenedor con los estados AISLADO y ELIMINADO." style="width:100%;" >}}

### Requisitos adicionales para la respuesta manual {#additional-requirements-for-manual-response}

Confirme que cada entorno con servidores o contenedores que ejecutan el Agent con Workload Protection habilitado cumpla con estos requisitos:

- Datadog **Agent 7.78** o posterior en los servidores que deben ejecutar acciones de respuesta.
- [**Remote Configuration**][3] está habilitada para que las políticas de respuesta puedan enviarse al Agent.
- La aplicación está habilitada de forma predeterminada en `system-probe` como se describe en [Configurar la aplicación de Agent](#configure-agent-enforcement).

### Acciones disponibles {#available-actions}

El Agent admite los siguientes tipos de acción de **aplicación**:

#### Eliminar {#kill}

Termine un proceso malicioso o todos los procesos en un **contenedor** (cgroup) comprometido, según el alcance.

#### Filtro de red (aislamiento de red) {#network-filter-network-isolation}

Bloquee el tráfico de red mediante un filtro basado en eBPF (por ejemplo, descarte el tráfico de salida a puertos específicos). Cualquier aislamiento puede revertirse.

El aislamiento de red utiliza clasificadores de **Traffic Control** de eBPF y programas de paquetes sin procesar. El Agent habilita las sondas de red necesarias de forma predeterminada en `event_monitoring_config.network` en `system-probe.yaml`.

### Estados de la acción {#action-statuses}

Cuando se ejecuta una acción de respuesta, el Agent la registra en la tabla de respuesta, junto con las respuestas automatizadas. Cada acción tiene un estado. La siguiente tabla resume los resultados principales para cada tipo de acción.

| Estado | Descripción | Eliminar | Aislamiento de red |
| --- | --- | --- | --- |
| `performed` | La acción se completó correctamente. | {{< X >}} | {{< X >}} |
| `partially_performed` | Parte de la eliminación tuvo éxito (por ejemplo, algunos procesos terminaron), pero no se pudieron eliminar todos los objetivos. | {{< X >}} | |
| `removed` | Una regla de aislamiento fue **eliminada** del conjunto de reglas actual mientras estaba presente anteriormente; se utiliza al **revertir** el aislamiento de red. | | {{< X >}} |
| `error` | Ocurrió un error durante la respuesta. La acción falló y el proceso o contenedor sigue ejecutándose o no está aislado. | {{< X >}} | {{< X >}} |
| `not_triggered` | El Agent no encontró el recurso objetivo. Es posible que el contenedor o proceso haya terminado antes de que se ejecutara la acción de respuesta. | {{< X >}} | {{< X >}} |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security
[2]: https://app.datadoghq.com/security/workload-protection/agent-rules
[3]: /es/agent/remote_config/?tab=configurationyamlfile
[4]: /es/security/workload_protection/setup/advanced_configuration
[5]: /es/account_management/rbac/permissions
[6]: /es/security/workload_protection/investigate_and_triage/security_signals