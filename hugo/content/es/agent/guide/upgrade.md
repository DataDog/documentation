---
aliases:
- /es/agent/versions/upgrade_to_agent_v7/
- /es/agent/upgrade/
description: Instrucciones para actualizar de Datadog Agent 5 o 6 a Agent 7 en plataformas
  Linux, Windows, macOS y AIX con notas sobre la compatibilidad con Python 3.
further_reading:
- link: /agent/guide/python-3/
  tag: Documentación
  text: Migre sus Custom Checks de Python 2 a Python 3
title: Actualice a Datadog Agent 7
---
<div class="alert alert-info">
El Agent 7 solo admite verificaciones personalizadas de Python 3. <a href="/agent/guide/python-3">Verifique si sus verificaciones personalizadas son compatibles con Python 3</a> antes de actualizar al Agent 7.
</div>

## Desde Agent 6 {#from-agent-6}

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

## Desde Agent 5 {#from-agent-5}

{{< tabs >}}
{{% tab "Linux" %}}

Ejecute el comando de instalación del Agent con la variable de entorno `DD_UPGRADE="true"` para actualizar su Agent de la versión 5 a la versión 7. El instalador del Agent v7 puede convertir automáticamente las configuraciones de la v5 durante la actualización:

El siguiente comando funciona en Amazon Linux, CentOS, Debian, Fedora, Red Hat, Ubuntu y SUSE:
: `DD_UPGRADE="true" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

1. Actualice su Agent a la versión 6 siguiendo el [proceso de actualización manual][1].
2. Siga las instrucciones de actualización [Del Agent v6 al Agent v7](#from-agent-v6-to-agent-v7).

[1]: /es/agent/versions/upgrade_to_agent_v6/?tab=windows#manual-upgrade
{{% /tab %}}
{{% tab "macOS" %}}

Ejecute el comando de instalación del Agent con las variables de entorno `DD_AGENT_MAJOR_VERSION=7` y `DD_UPGRADE="true"` para actualizar su Agent de la versión 5 a la versión 7. El instalador del Agent v7 puede convertir automáticamente las configuraciones de la v5 durante la actualización:

```shell
DD_UPGRADE="true" DD_AGENT_MAJOR_VERSION=7 bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
```

{{% /tab %}}
{{% tab "AIX" %}}

En AIX, el Agent heredado es el Datadog UNIX Agent (basado en Agent 5); el Agent 6 nunca se distribuyó en AIX. Para actualizar a Agent 7, siga las [instrucciones de migración desde el UNIX Agent][4]: haga una copia de seguridad de la configuración existente, desinstale el UNIX Agent con `installp -u datadog-unix-agent` y, a continuación, [instale Agent 7][5].

[4]: /es/agent/supported_platforms/aix/#migrate-from-the-unix-agent
[5]: /es/agent/supported_platforms/aix/#install-the-agent
{{% /tab %}}
{{< /tabs >}}

**Nota:** El proceso de actualización no moverá automáticamente las verificaciones **personalizadas** del Agent. Esto es intencional, ya que Datadog no puede garantizar una compatibilidad total con versiones anteriores de forma inmediata. Consulte la guía de [Migración de la verificación personalizada a Python 3][1] para descubrir cómo migrar su verificación personalizada de Python 2 a Python 3.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/guide/python-3/