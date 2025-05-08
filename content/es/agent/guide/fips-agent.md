---
algolia:
  rank: 80
  tags:
  - fips
  - proxy de fips
  - conformidad
  - fedramp
  - govcloud
further_reading:
- link: /agent/configuration/fips-compliance
  tag: Documentación
  text: Conformidad de Datadog con los estándares FIPS
title: Agent FIPS de Datadog
---

{{< callout btn_hidden="true" header="Únete a la Vista previa">}}
El Agent FIPS está en fase de vista previa.
{{< /callout >}}

{{< site-region region="us,us3,us5,eu,ap1" >}}
<div class="alert alert-warning">El Agent FIPS sólo está disponible en la región US1-FED.</a></div>
{{< /site-region >}}

El Agent FIPS es una versión del Datadog Agent que admite de forma nativa el cumplimiento de los Estándares Federales de Procesamiento de Información (FIPS). El Agent FIPS sustituye al [proxy FIPS][2] e incluye un soporte limitado para integraciones que necesitan recopilar datos de observabilidad externos al host.

**El Agent FIPS de Datadog está en fase de vista previa y no ha sido totalmente auditado. Instala y prueba el Agent sólo en hosts que no sean críticos para las cargas de trabajo de producción. Para cargas de trabajo de producción, consulta [Cumplimiento FIPS de Datadog][2].**

## Requisitos

**Linux:**
   - Un host Linux no contenedorizado.
   - Tu sistema operativo Linux debe estar en modo compatible con FIPS. Consulta la documentación del proveedor de tu sistema operativo para conocer los pasos necesarios para cumplir este requisito.
   - Almacenamiento compatible con FIPS que respalda el sistema de archivos del host.

**Windows:**
   - Un host Windows no contenerizado.
   - Windows debe estar en [modo compatible con FIPS][1].
   - Almacenamiento compatible con FIPS que respalda el sistema de archivos del host.

Además de los requisitos del sistema operativo (SO) mencionados anteriormente:
- Debes tener acceso a un entorno Datadog compatible con FIPS (US1-FED o GovCloud).
- El Agent FIPS sólo está disponible en la versión 7.63 y posteriores del Agent.

## Instalación

{{< tabs >}}
{{% tab "Linux" %}}

El Agent FIPS de Datadog está en fase de vista previa y no ha sido totalmente auditado. Instala y prueba el Agent sólo en hosts que no sean críticos para las cargas de trabajo de producción.

1. Elimina cualquier instalación de `fips-proxy` en el host desinstalando el paquete `datadog-fips-proxy` con el gestor de paquetes de tu sistema operativo. Por ejemplo:

   **Red Hat**
   ```sh
   sudo yum remove datadog-fips-proxy
   ```
   **Ubuntu/Debian**
   ```sh
   sudo apt-get remove datadog-fips-proxy
   ```
1. Asegúrate de que el archivo de configuración del Agent no contiene ningún parámetro de [proxy FIPS][2]. Los parámetros de proxy FIPS utilizan el prefijo `fips.*`.
1. Sigue las [instrucciones de tu sistema operativo][3] para desinstalar el Datadog Agent.
1. Instala el Agent con compatibilidad con FIPS.

   **Nota:** La compatibilidad con FIPS sólo está disponible en la versión 7.63.0 y posteriores del Agent:
   1. Si utiliza el script de instalación del Agent, especifica la variable de entorno `DD_AGENT_FLAVOR="datadog-fips-agent"` en tu comando de instalación. Por ejemplo:

      ```sh
      DD_SITE="ddog-gov.com" DD_API_KEY="MY_API_KEY" DD_AGENT_FLAVOR="datadog-fips-agent" ... bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
      ```
   1. Si realizas la instalación con un paquete, [sigue las instrucciones][4] para instalar la última versión del paquete  `datadog-fips-agent` disponible para tu plataforma.
   1. Añade `GOFIPS=1` a tus variables de entorno Datadog, vuelve a cargar todas las unidades de servicio y reinicia el servicio del Datadog Agent (`datadog-agent.service`). Por ejemplo, si tu host utiliza systemd:

      ```sh
      echo "GOFIPS=1" | sudo tee -a /etc/datadog-agent/environment
      systemctl daemon-reload
      systemctl restart 'datadog-agent*'
      ```
   1. Ejecuta el comando `datadog-agent status` y asegúrate de ver `FIPS Mode: enabled` en el resultado del estado.

      {{< img src="/agent/fips-linux.png" alt="Your image description" style="width:100%;" >}}

[2]: /es/agent/configuration/fips-compliance/
[3]: /es/agent/guide/how-do-i-uninstall-the-agent/
[4]: /es/agent/guide/installing-the-agent-on-a-server-with-limited-internet-connectivity/
{{% /tab %}}

{{% tab "Windows" %}}

El Agent FIPS de Datadog está en fase de vista previa y no ha sido totalmente auditado. Instala y prueba el Agent sólo en hosts que no sean críticos para las cargas de trabajo de producción.

1. Sigue las [instrucciones de Windows][1] para desinstalar el Datadog Agent.
1. Ejecuta el siguiente comando para instalar el Agent FIPS, sustituyendo `MY_API_KEY` por tu clave de API:

   **Nota:** La compatibilidad con FIPS sólo está disponible en la versión 7.63.0 y posteriores del Agent:

   ```powershell
   Start-Process -Wait msiexec -ArgumentList '/qn /i "https://s3.amazonaws.com/ddagent-windows-stable/beta/datadog-fips-agent-7.63.0-rc.7-fips-preview-2.msi" APIKEY="MY_API_KEY" SITE="ddog-gov.com"'
   ```

   Para instalar una vista previa diferente del Agent FIPS, busca `datadog-fips-agent` en la [lista de versiones estables del Agent][2] y sustituye el MSI en el comando anterior por la versión que prefieras.

1. Ejecuta el comando `status` y asegúrate de ver `FIPS Mode: enabled` en el resultado del estado.

   ```powershell
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
   ```

   {{< img src="/agent/fips-powershell.png" alt="Descripción de tu imagen" style="width:100%;" >}}


**Nota**: El nombre del programa del Agent FIPS en **Agregar o quitar programas** es "Agent FIPS de Datadog."

[1]: /es/agent/basic_agent_usage/windows/#uninstall-the-agent
[2]: https://s3.amazonaws.com/ddagent-windows-stable/beta/installers_v2.json

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/windows/security/security-foundations/certification/fips-140-validation
[2]: /es/agent/configuration/fips-compliance/