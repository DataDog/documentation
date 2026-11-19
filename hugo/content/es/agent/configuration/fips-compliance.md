---
algolia:
  rank: 80
  tags:
  - fips
  - fips proxy
  - compliance
  - fedramp
  - govcloud
  - fips agent
aliases:
- /es/agent/guide/agent-fips-proxy
- /es/agent/guide/fips-agent
- /es/configuration/agent-fips-proxy
description: Configure módulos criptográficos compatibles con FIPS para el Datadog
  Agent en entornos altamente regulados como FedRAMP.
disable_toc: false
further_reading:
- link: agent/configuration/proxy
  tag: Documentación
  text: Configuración de proxy de Agent
- link: https://www.datadoghq.com/blog/datadog-fips-enabled-agent/
  tag: Blog
  text: Monitoree cargas de trabajo altamente reguladas con el Agent de Datadog habilitado
    para FIPS
- link: https://www.datadoghq.com/blog/engineering-the-datadog-agent-for-fedramp-high/
  tag: Blog
  text: Ingeniería del Datadog Agent para la certificación FedRAMP High®
title: Cumplimiento de FIPS de Datadog
---
## Descripción general {#overview}

El FIPS Agent es una versión del Datadog Agent que admite de forma nativa el cumplimiento de los Estándares Federales de Procesamiento de Información (FIPS). El cumplimiento del FIPS Agent se basa en su uso del [Módulo criptográfico - Certificado n.º 4282][1] validado por FIPS 140-2. Consulte la [política de seguridad][2] relacionada para obtener información sobre entornos operativos validados y restricciones. 

El FIPS Agent también incluye [soporte limitado para integraciones][3] que necesitan recopilar datos de observabilidad externos al servidor.

**Es su responsabilidad garantizar el cumplimiento del entorno operativo con la política de seguridad y la guía FIPS más amplia.**

## Plataformas compatibles y limitaciones {#supported-platforms-and-limitations}

Plataformas compatibles:

|      |             |
| ---  | ----------- |
| Servidores físicos y máquinas virtuales | RHEL >= 7<br>Debian >= 8<br>Ubuntu >= 14.04<br>SUSE >= 12<br>Windows Server >= 2016<br>Windows >= 10|
| Nube y contenedores| Amazon ECS<br>AWS EKS (Helm)<br>Docker|

Productos compatibles (Agent 7.65.0 y superior):
- Métricas
- Logs
- Trazas de APM
- Perfiles de APM
- Procesos
- Orchestrator Explorer
- Runtime Security
- Serverless Monitoring
- [Collector del Agent][4] (el Collector de OpenTelemetry que se ejecuta junto al Agent como un proceso independiente)

El FIPS Agent de Datadog **no** admite lo siguiente:
- Comunicación entre el Cluster Agent y los Node Agents
- Comunicación saliente hacia cualquier destino que no sea GovCloud


## Pautas de cumplimiento {#compliance-guidelines}
<div class="alert alert-danger">
Esta no es una lista exhaustiva. Estos requisitos son solo una base. Usted es responsable de evaluar su entorno e implementar los controles adicionales necesarios para lograr el cumplimiento total de FIPS.
</div>
Los siguientes controles básicos se aplican a cada plataforma. Es posible que su sistema requiera controles adicionales:

{{< tabs >}}
{{% tab "Linux" %}}
- Un servidor Linux no contenedorizado.
- Su sistema operativo Linux debe estar en modo compatible con FIPS. Consulte la documentación del proveedor de su sistema operativo sobre los pasos necesarios para cumplir con este requisito.
- Almacenamiento compatible con FIPS que respalde el sistema de archivos del servidor.
{{% /tab %}}

{{% tab "Windows" %}}
- Un servidor Windows no contenedorizado.
- Windows debe estar en [modo compatible con FIPS][1].
- Almacenamiento compatible con FIPS que respalde el sistema de archivos del servidor.

[1]: https://learn.microsoft.com/en-us/windows/security/security-foundations/certification/fips-140-validation
{{% /tab %}}

{{% tab "AWS Lambda" %}}
- Utilice una región compatible con FIPS (por ejemplo, AWS GovCloud)
{{% /tab %}}

{{% tab "AWS ECS" %}}
- Utilice una región compatible con FIPS (por ejemplo, AWS GovCloud)
- Configure los servicios de cómputo de AWS (EC2 o Fargate) en modo FIPS
- Utilice almacenamiento compatible con FIPS para sus tareas de ECS
{{% /tab %}}

{{% tab "AWS EKS" %}}
- Utilice una región compatible con FIPS (por ejemplo, AWS GovCloud)
- Configure los nodos de trabajo de EKS en modo FIPS
- Utilice almacenamiento compatible con FIPS para sus nodos de trabajo de EKS
{{% /tab %}}

{{< /tabs >}}

Además de los requisitos del sistema operativo (SO) anteriores:
- Debe tener acceso a un entorno de Datadog compatible con FIPS (US1-FED o US2-FED).
- La versión del Agent debe ser 7.65.0 o superior para acceder al FIPS Agent

## Instalación {#installation}

{{< tabs >}}
{{% tab "Linux" %}}

1. Instale el Agent con compatibilidad con FIPS.

   **Nota:** La compatibilidad con FIPS solo está disponible en las versiones 7.65.0 y superiores del Agent:
   1. Si utiliza el script de instalación del Agent, especifique la variable de entorno `DD_AGENT_FLAVOR="datadog-fips-agent"` en su comando de instalación. Por ejemplo:

      <pre><code>DD_SITE="{{< region-param key="dd_site" >}}" DD_API_KEY="MY_API_KEY" DD_AGENT_FLAVOR="datadog-fips-agent" … bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"</code></pre>
   1. Si realiza la instalación con un paquete, [siga las instrucciones][1] para instalar el paquete `datadog-fips-agent` más reciente disponible para su plataforma.
   1. Agregue `GOFIPS=1` a sus variables de entorno de Datadog, recargue todas las unidades de servicio y reinicie el servicio Datadog Agent (`datadog-agent.service`). Por ejemplo, si su servidor utiliza systemd:

      ```sh
      echo "GOFIPS=1" | sudo tee -a /etc/datadog-agent/environment
      systemctl daemon-reload
      systemctl restart 'datadog-agent*'
      ```
1. Ejecute el comando `datadog-agent status` y asegúrese de ver `FIPS Mode: enabled` en la salida de estado.

{{< img src="/agent/fips-linux.png" alt="Salida del comando de estado del Agent con el modo FIPS habilitado: Linux" style="width:100%;" >}}

[1]: /es/agent/guide/installing-the-agent-on-a-server-with-limited-internet-connectivity/
{{% /tab %}}

{{% tab "Windows" %}}

1. Siga las [instrucciones para Windows][1] para desinstalar cualquier Datadog Agent existente en la máquina.
1. Ejecute el siguiente comando para instalar el FIPS Agent, reemplazando `DATADOG_API_KEY` con su clave de API:

   **Nota:** La compatibilidad con FIPS solo está disponible en las versiones 7.65.0 y superiores del Agent:

   <pre><code>$p = Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /i https://windows-agent.datadoghq.com/datadog-fips-agent-7-latest.amd64.msi /log C:\Windows\SystemTemp\install-datadog.log APIKEY="&lt;DATADOG_API_KEY&gt;" SITE="{{< region-param key="dd_site" >}}"'
if ($p.ExitCode -ne 0) {
   Write-Host "msiexec failed with exit code $($p.ExitCode) please check the logs at C:\Windows\SystemTemp\install-datadog.log" -ForegroundColor Red
}</code></pre>

3. Ejecute el comando `status` del Agent y asegúrese de ver `FIPS Mode: enabled` en la salida de estado.

   ```powershell
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
   ```

   {{< img src="/agent/fips-powershell.png" alt="Salida del comando de estado del Agent con el modo FIPS habilitado: Windows" style="width:100%;" >}}


**Nota**: El nombre del programa del FIPS Agent en {{< ui >}}Add or Remove Programs{{< /ui >}} es "Datadog FIPS Agent".

[1]: /es/agent/basic_agent_usage/windows/#uninstall-the-agent

{{% /tab %}}

{{% tab "AWS Lambda" %}}

Para garantizar el cumplimiento de FIPS en AWS Lambda, siga las instrucciones de la documentación [AWS Lambda FIPS Compliance][1].

[1]: /es/serverless/aws_lambda/fips-compliance/

{{% /tab %}}

{{% tab "AWS ECS" %}}

Al seguir las [instrucciones de instalación de ECS][1], asegúrese de utilizar estos valores de configuración específicos de FIPS para su Task Definition:
- Establezca `image` en el objeto `containerDefinitions` en `public.ecr.aws/datadog/agent:7-fips`  
- Establezca la variable de entorno `DD_SITE` en {{< region-param key="dd_site" code="true" >}}

[1]: /es/containers/amazon_ecs/
{{% /tab %}}

{{% tab "AWS EKS" %}}

Al seguir las instrucciones de [instalación del Datadog Agent en Kubernetes][1], asegúrese de incluir estos valores de configuración específicos de FIPS en el archivo `datadog-agent.yaml` según el método de instalación elegido:

Para el Datadog Operator:
<pre><code>spec:
   global:
      site: "{{< region-param key="dd_site" >}}"
      useFIPSAgent: true</code></pre>

Para el Datadog Helm Chart:
<pre><code>datadog:
   site: "{{< region-param key="dd_site" >}}"
useFIPSAgent: true</code></pre>

[1]: /es/containers/kubernetes/installation/
{{% /tab %}}

{{< /tabs >}}

## Security y fortalecimiento {#security-and-hardening}

Usted, como cliente de Datadog, es responsable de la seguridad y el fortalecimiento del **servidor**.

**Consideraciones de Security:**
- Aunque las imágenes de Datadog proporcionadas se crean teniendo en cuenta la seguridad, no se han evaluado conforme a las recomendaciones de los benchmarks de CIS ni a los estándares DISA STIG.
- Si reconstruye, reconfigura o modifica el Datadog FIPS Agent para adaptarlo a sus necesidades de implementación o prueba, es posible que obtenga una configuración que funcione técnicamente, pero Datadog no puede garantizar el cumplimiento de FIPS si el Datadog FIPS Agent no se utiliza exactamente como se explica en la documentación.
- Si no siguió los pasos de instalación enumerados anteriormente exactamente como se documentaron, Datadog no puede garantizar el cumplimiento de FIPS.
- Es posible que algunas distribuciones de Linux con `urllib3 ≤ 1.26.20` no puedan realizar un cifrado conforme a FIPS debido a bibliotecas que no cumplen con los requisitos. Consulte con su proveedor de Linux para asegurarse de que haya soporte de cifrado compatible con FIPS.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4282
[2]: https://csrc.nist.gov/CSRC/media/projects/cryptographic-module-validation-program/documents/security-policies/140sp4282.pdf
[3]: /es/integrations/guide/fips-integrations
[4]: /es/opentelemetry/setup/agent/#agents-collector