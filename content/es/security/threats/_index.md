---
aliases:
- /es/security_platform/cloud_workload_security/
- /es/security/cloud_workload_security/
- /es/security/cloud_workload_security/agent_expressions
- /es/security/cloud_workload_security/backend/
- /es/security/threats/security_profiles
- /es/security/threats/runtime_anomaly_detection
title: Cloud Security Management Threats
---

Cloud Security Management Threats (CSM Threats) monitoriza la actividad de archivo, red y proceso a través de tu entorno para detectar amenazas en tiempo real a tu infraestructura. Como parte de la plataforma de Datadog, puedes combinar la detección de amenazas en tiempo real de CSM Threats con métricas, logs, trazas (traces) y otra telemetría para ver el contexto completo vinculado a un posible ataque a tus cargas de trabajo.

## Detectar las amenazas a tus cargas de trabajo de producción en tiempo real

Monitoriza la actividad de archivo y proceso a nivel del kernel para detectar amenazas a tu infraestructura, como instancias de Amazon EC2, contenedores de Docker y clústeres de Kubernetes. Combina CSM Threats con [Network Performance Monitoring][9] y detecta actividad sospechosa a nivel de red antes de que una carga de trabajo se vea comprometida.

CSM Threats utiliza Datadog Agent para monitorizar tu entorno. Si aún no tienes configurado el Datadog Agent, [empieza por configurar el Agent][2] en un [sistema operativo compatible][1]. Hay cuatro tipos de monitorización que el Datadog Agent utiliza para CSM Threats:

1. **Monitorización de ejecución de procesos** para controlar ejecuciones de proceso en busca de actividad maliciosa en hosts o contenedores en tiempo real.
2. **Monitorización de integración de archivos** para controlar los cambios en archivos y directorios clave en hosts o contenedores en tiempo real.
3. **Monitorización de actividad de DNS** para controlar el tráfico de red en busca de actividad maliciosa en hosts y contenedores en tiempo real.
4. **Monitorización de actividad del kernel** para controlar en tiempo real ataques a la capa del kernel como hijacking de procesos, entrada forzada a contenedores y otros.

{{< img src="security/csm/csm_overview_2.png" alt="Buzón de entrada en la información general de Cloud Security Management, que muestra una lista de los problemas de seguridad priorizados que se deben corregir" width="100%">}}

## Bloquear de forma proactiva las amenazas con Active Protection

Por defecto, todas las reglas de detección de amenazas de minería de criptomonedas predefinidas del Agent están habilitadas y activas para la monitorización contra amenazas.

[Active Protection][10] te permite bloquear y terminar proactivamente las amenazas de minería de criptomonedas identificadas por las reglas de detección de amenazas de Datadog Agent.

## Gestión de reglas de detección predefinidas y personalizadas

CSM Threats viene con más de 50 reglas de detección predefinidas que son mantenidas por un equipo de expertos en seguridad. Las reglas identifican los riesgos más importantes para que puedas tomar medidas correctivas de inmediato. Las reglas de expresión del Agent definen las actividades de carga de trabajo que deben recopilarse para el análisis, mientras que las reglas de detección de backend analizan las actividades e identifican técnicas de ataque y otros patrones de comportamiento peligrosos.

Utiliza la [Configuración remota][7] para desplegar automáticamente reglas nuevas y actualizadas en el Agent. [Personaliza las reglas][5] definiendo cómo cada regla monitoriza la actividad de proceso, red y archivos, [crea reglas personalizadas][6], y [configura notificaciones en tiempo real](#set-up-real-time-notificaciones) para nuevas señales.

{{< img src="security/cws/threats_detection_rules.png" alt="Reglas de detección de CSM Threats en la aplicación de Datadog" width="100%">}}

## Configuración de notificaciones en tiempo real

[Envía notificaciones en tiempo real][3] cuando se detecte una nueva amenaza en tu entorno, para que tus equipos puedan tomar medidas para mitigar el riesgo. Es posible enviar notificaciones a través de [Slack, correo electrónico, PagerDuty, webhooks y más][4].

Utiliza variables de plantilla y Markdown para [personalizar los mensajes de notificación][5]. Edita, desactiva y elimina las reglas de notificación existentes, o crea nuevas reglas y define una lógica personalizada para cuando se active una notificación en función de la gravedad y el tipo de regla.

## Investigar y corregir señales de seguridad

Investiga y clasifica las señales de seguridad en el [Signals Explorer][8]. Consulta información detallada sobre los archivos o procesos afectados, logs y señales relacionadas y los pasos para solucionar el problema.

{{< img src="security/cws/signals_explorer.png" alt="Página de CSM Signals Explorer" width="100%">}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSfzQARsTPr3tiJDnS_4bGx7w35LDfAbGUggaUzHYoL0dIUMWQ/viewform" btn_hidden="false" header="Active Protection">}}

Datadog está introduciendo una nueva función llamada Active Protection para hacer frente a las amenazas criptográficas detectadas en tu entorno automáticamente. Active Protection está en fase beta privada. Rellena el formulario para solicitar acceso.
{{< /callout >}}

## Para empezar

{{< whatsnext >}}
  {{< nextlink href="/security/threats/setup">}}Ajustes y configuración completa{{< /nextlink >}}
  {{< nextlink href="/account_management/rbac/permissions/#cloud-security-platform">}}Permisos de rol de Datadog para CSM Threats{{< /nextlink >}}
  {{< nextlink href="/security/threats/workload_security_rules">}}Más información sobre las reglas de detección de CSM Threats{{< /nextlink >}}
  {{< nextlink href="/security/default_rules/#cat-workload-security">}}Comenzar a utilizar reglas de detección predefinidas de CSM Threats{{< /nextlink >}}
  {{< nextlink href="/getting_started/cloud_security_management">}}Empezando con Cloud Security Management{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /es/security/threats/setup/?tab=kuberneteshelm#prerequisites
[2]: /es/agent/
[3]: /es/security/notifications/
[4]: /es/security/notifications/#notification-channels
[5]: /es/security/notifications/#detection-rule-notifications
[6]: /es/security/threats/agent_expressions
[7]: /es/security/threats/setup
[8]: /es/security/threats/security_signals
[9]: /es/network_monitoring/performance/
[10]: /es/security/cloud_security_management/guide/active-protection