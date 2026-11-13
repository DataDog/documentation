---
aliases:
- /es/agent/faq/upgrade-between-agent-minor-versions
- /es/agent/guide/upgrade-between-agent-minor-versions
- /es/agent/versions/upgrade_between_agent_minor_versions/
- /es/agent/guide/upgrade_between_minor_versions/
description: Guía para actualizar versiones del Datadog Agent mediante la administración
  remota de Fleet Automation, scripts de instalación y herramientas de administración
  de configuración.
further_reading:
- link: /agent/troubleshooting/
  tag: Documentación
  text: Agent Troubleshooting
- link: agent/
  tag: Documentación
  text: El Datadog Agent
title: Actualice su Datadog Agent
---
## Descripción general {#overview}
Datadog recomienda que actualice su Datadog Agent con cada versión [menor y de parche][6]. Esta guía le muestra cómo implementar una nueva versión del Agent en sus servidores con unos pocos clics.


## Actualizar entre versiones menores del Agent {#upgrade-between-minor-versions-of-the-agent}

### Actualizar de forma remota con Fleet Automation {#upgrade-remotely-with-fleet-automation}

[Fleet Automation][2] le permite administrar de forma centralizada su flota de Datadog Agents. Fleet Automation incluye la administración remota de Agent, lo que le permite actualizar de forma remota los Agents en entornos Linux y Windows no contenedorizados. Consulte [Actualizar Agents][7].

### Actualizar con scripts o herramientas de administración de configuración {#upgrade-with-script-or-configuration-management-tooling}

Siga las [instrucciones en la aplicación][4] para actualizar los Datadog Agents en entornos de contenedores, basados en servidores y administrados por herramientas de infraestructura como código (IaC). El flujo guiado genera un comando de instalación del Agent adaptado a su plataforma para actualizar el Agent. De forma predeterminada, el comando instala la versión más reciente del Agent. Para actualizar a una versión menor específica, configure `DD_AGENT_MINOR_VERSION=<TARGET_MINOR>` antes de ejecutar el script.

## Actualizar entre versiones principales del Agent {#upgrade-between-major-versions-of-the-agent}

<div class="alert alert-info">
El Agent 7 solo admite verificaciones personalizadas de Python 3. <a href="/agent/guide/python-3">Verifique si sus verificaciones personalizadas son compatibles con Python 3</a> antes de actualizar al Agent 7.
</div>

### Actualizar del Agent 6 al Agent 7 {#upgrade-from-agent-6-to-agent-7}

{{< tabs >}}
{{% tab "Linux" %}}

Ejecute el siguiente comando de instalación del Agent para actualizar su Agent de la versión 6 a la versión 7:

El siguiente comando funciona en Amazon Linux, CentOS, Debian, Fedora, Red Hat, Ubuntu y SUSE:
: `DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

1. [Descargue el instalador del Datadog Agent][1].
2. Ejecute el instalador (como {{< ui >}}Administrator{{< /ui >}}) abriendo `datadog-agent-7-latest.amd64.msi`.
3. Siga las instrucciones, acepte el acuerdo de licencia e ingrese su [clave de Datadog API][2].
4. Cuando finalice la instalación, se le dará la opción de iniciar el Datadog Agent Manager.

**Nota**: Los enlaces a todas las versiones disponibles del instalador de Windows se [proporcionan en formato JSON][3].

[1]: https://ddagent-windows-stable.s3.amazonaws.com/datadog-agent-7-latest.amd64.msi
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://ddagent-windows-stable.s3.amazonaws.com/installers_v2.json
{{% /tab %}}
{{% tab "macOS" %}}

Ejecute el comando de instalación del Agent con la variable de entorno `DD_AGENT_MAJOR_VERSION=7` para actualizar su Agent de la versión 6 a la versión 7:

```shell
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
```

{{% /tab %}}
{{< /tabs >}}

### Actualizar del Agent 5 al Agent 7 {#upgrade-from-agent-5-to-agent-7}

{{< tabs >}}
{{% tab "Linux" %}}

Ejecute el comando de instalación del Agent con la variable de entorno `DD_UPGRADE="true"` para actualizar su Agent de la versión 5 a la versión 7. El instalador del Agent v7 puede convertir automáticamente las configuraciones de la v5 durante la actualización:

El siguiente comando funciona en Amazon Linux, CentOS, Debian, Fedora, Red Hat, Ubuntu y SUSE:
: `DD_UPGRADE="true" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

1. Actualice su Agent a la versión 6 siguiendo el [proceso de actualización manual][1].
2. Siga las instrucciones de actualización [Del Agent v6 al Agent v7](#upgrade-from-agent-6-to-agent-7).

[1]: /es/agent/guide/upgrade_to_agent_6/?tab=windows#manual-upgrade
{{% /tab %}}
{{% tab "macOS" %}}

Ejecute el comando de instalación del Agent con las variables de entorno `DD_AGENT_MAJOR_VERSION=7` y `DD_UPGRADE="true"` para actualizar su Agent de la versión 5 a la versión 7. El instalador del Agent v7 puede convertir automáticamente las configuraciones de la v5 durante la actualización:

```shell
DD_UPGRADE="true" DD_AGENT_MAJOR_VERSION=7 bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
```

{{% /tab %}}
{{< /tabs >}}

**Nota:** El proceso de actualización no mueve automáticamente las verificaciones **personalizadas** del Agent. Esto es intencional, ya que Datadog no puede garantizar una compatibilidad total con versiones anteriores de forma inmediata. Consulte la guía de [Migración de la verificación personalizada a Python 3][1] para descubrir cómo migrar su verificación personalizada de Python 2 a Python 3.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/guide/python-3/
[2]: /es/agent/fleet_automation/
[3]: /es/agent/fleet_automation/#set-up-fleet-automation
[4]: https://app.datadoghq.com/fleet/install-agent/latest?platform=overview
[5]: /es/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[6]: https://github.com/DataDog/datadog-agent/releases?page=1
[7]: /es/agent/fleet_automation/upgrade_agents/