---
aliases:
- /es/agent/faq/upgrade-between-agent-minor-versions
- /es/agent/guide/upgrade-between-agent-minor-versions
title: Actualizar entre versiones secundarias del Datadog Agent
---

## Actualizar entre versiones secundarias del Agent 6 y 7

{{< tabs >}}
{{% tab "Linux" %}}

El método recomendado para actualizar entre versiones secundarias del Agent 6 y 7 es utilizar los scripts `install_script_agent6.sh` y `install_script_agent7.sh`. Los siguientes comandos funcionan en todas las distribuciones de Linux compatibles.

Actualizar a una versión secundaria concreta del Agent 6:

: `DD_AGENT_MINOR_VERSION=<target_minor> bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_script_agent6.sh)"`

Actualizar a la última versión secundaria del Agent 6:

: `bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_script_agent6.sh)"`

Actualizar a una versión secundaria concreta del Agent 7:

: `DD_AGENT_MINOR_VERSION=<target_minor> bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_script_agent7.sh)"`

Actualizar a la última versión secundaria del Agent 7:

: `bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

Descarga e instala el paquete de instalación de una versión concreta.

URL para descargar una versión secundaria concreta del Agent 6:

: `https://ddagent-windows-stable.s3.amazonaws.com/ddagent-cli-6.<minor_version>.<bugfix_version>.msi`

URL para descargar una versión secundaria concreta del Agent 7:

: `https://ddagent-windows-stable.s3.amazonaws.com/ddagent-cli-7.<minor_version>.<bugfix_version>.msi`

{{% /tab %}}
{{% tab "MacOS" %}}

**Nota**: No es posible actualizar a una versión secundaria concreta.

Comando para actualizar a la última versión secundaria del Agent 6:

: `DD_AGENT_MAJOR_VERSION=6 bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_mac_os.sh)"`

Comando para actualizar a la última versión secundaria del Agent 7:

: `DD_AGENT_MAJOR_VERSION=7 bash -c "$(curl -L https://dd-agent.s3.amazonaws.com/scripts/install_mac_os.sh)"`

{{% /tab %}}
{{< /tabs >}}