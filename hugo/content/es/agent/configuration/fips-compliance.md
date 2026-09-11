---
algolia:
  rank: 80
  tags:
  - fips
  - proxy de fips
  - conformidad
  - fedramp
  - govcloud
  - fips agent
aliases:
- /es/agent/guide/agent-fips-proxy
- /es/agent/guide/fips-agent
- /es/configuration/agent-fips-proxy
description: Configura módulos criptográficos conforme a FIPS para el Datadog Agent
  en entornos altamente regulados como FedRAMP.
disable_toc: false
further_reading:
- link: agent/configuration/proxy
  tag: Documentación
  text: Configuración del proxy del Agent
- link: https://www.datadoghq.com/blog/datadog-fips-enabled-agent/
  tag: Blog
  text: Monitorizar cargas de trabajo altamente reguladas con el Agent de Datadog
    habilitado por FIPS
title: Conformidad de Datadog con los estándares FIPS
---

## Información general

FIPS Agent es una versión del Datadog Agent que admite de forma nativa la conformidad de las Normas Federales de Procesamiento de la Información (FIPS). La conformidad de FIPS Agent se basa en el uso del [Módulo criptográfico - Certificado nº 4282][1] validado por FIPS 140-2. Consulta la [política de seguridad][2] relacionada para obtener información sobre los entornos operativos validados y las restricciones. 

FIPS Agent también incluye [compatibilidad limitada para integraciones][3] que necesitan recopilar datos de observabilidad externos al host.

**Es responsabilidad del usuario garantizar que el entorno de funcionamiento cumple la política de seguridad y las directrices generales de FIPS.

## Plataformas compatibles y limitaciones

Plataformas compatibles:

|      |             |
| ---  | ----------- |
| Bare metal y máquinas virtuales (VM) | RHEL >= 7<br>Debian >= 8<br>Ubuntu >= 14.04<br>SUSE >= 12<br>Windows Server >= 2016<br>Windows >= 10|
| Nube y contenedor| Amazon ECS<br>AWS EKS (Helm)<br>Docker|

Productos compatibles (Agent 7.65.0 y superiores):
- Métricas
- Logs
- Trazas de APM
- Perfiles APM
- Procesos
- Orchestrator Explorer
- Seguridad en tiempo de ejecución
- Serverless Monitoring

El Datadog FIPS Agent **no** admite lo siguiente:
- Comunicación entre el Agent de clúster y los Agents de nodo
- Comunicación saliente a un destino distinto de GovCloud
- Datadog [Datadog distribution of OpenTelemetry (DDOT) Collector][4]


## Directrices de conformidad
<div class="alert alert-danger">
No se trata de una lista exhaustiva. Estos requisitos son solo una referencia. Tú eres responsable de evaluar tu entorno e implantar los controles adicionales necesarios para lograr la plena conformidad con FIPS.
</div>
Los siguientes controles básicos se aplican a cada plataforma. Tu sistema puede requerir controles adicionales:

{{< tabs >}}
{{% tab "Linux" %}}
- Un host Linux no contenedorizado.
- Tu sistema operativo Linux debe estar en modo compatible con FIPS. Consulta la documentación del proveedor de tu sistema operativo para conocer los pasos necesarios para cumplir este requisito.
- Almacenamiento compatible con FIPS que respalda el sistema de archivos del host.
{{% /tab %}}

{{% tab "Windows" %}}
- Un host Windows no contenerizado.
- Windows debe estar en [modo compatible con FIPS][1].
- Almacenamiento compatible con FIPS que respalda el sistema de archivos del host.

[1]: https://learn.microsoft.com/en-us/windows/security/security-foundations/certification/fips-140-validation
{{% /tab %}}

{{% tab "AWS Lambda" %}}
- Utiliza una región conforme a FIPS (por ejemplo, AWS GovCloud)
{{% /tab %}}

{{% tab "AWS ECS" %}}
- Utiliza una región conforme a FIPS (por ejemplo, AWS GovCloud)
- Configura los servicios informáticos de AWS (EC2 o Fargate) en modo FIPS.
- Utiliza el almacenamiento conforme a FIPS para tus tareas de ECS
{{% /tab %}}

{{% tab "AWS EKS" %}}
- Utiliza una región conforme a FIPS (por ejemplo, AWS GovCloud)
- Configura los nodos trabajadores EKS en modo FIPS
- Utiliza el almacenamiento conforme a FIPS para tus nodos de trabajo EKS
{{% /tab %}}

{{< /tabs >}}

Además de los requisitos del sistema operativo (SO) mencionados anteriormente:
- Debes tener acceso a un entorno de Datadog conforme a FIPS (US1-FED).
- La versión del Agent debe ser 7.65.0 y superior para acceder al FIPS Agent

## Instalación

{{< tabs >}}
{{% tab "Linux" %}}

1. Instala el Agent con compatibilidad con FIPS.

   **Nota:** La compatibilidad con FIPS solo está disponible en el Agent a partir de la versión 7.65.0:
   1. Si utilizas el script de instalación del Agent, especifica la variable de entorno `DD_AGENT_FLAVOR="datadog-fips-agent"` en tu comando de instalación. Por ejemplo:

      ```sh
      DD_SITE="ddog-gov.com" DD_API_KEY="MY_API_KEY" DD_AGENT_FLAVOR="datadog-fips-agent" ... bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
      ```
   1. Si vas a instalar con un paquete, [sigue las instrucciones][1] para instalar el último paquete `datadog-fips-agent` disponible para tu plataforma.
   1. Añade `GOFIPS=1` a tus variables de entorno Datadog, vuelve a cargar todas las unidades de servicio y reinicia el servicio del Datadog Agent (`datadog-agent.service`). Por ejemplo, si tu host utiliza systemd:

      ```sh
      echo "GOFIPS=1" | sudo tee -a /etc/datadog-agent/environment
      systemctl daemon-reload
      systemctl restart 'datadog-agent*'
      ```
1. Ejecuta el comando `datadog-agent status` y asegúrate de ver `FIPS Mode: enabled` en el resultado del estado.

{{< img src="/agent/fips-linux.png" alt="Resultado del comando del Agent con el modo FIPS activado - Linux" style="width:100%;" >}}

[1]: /es/agent/guide/installing-the-agent-on-a-server-with-limited-internet-connectivity/
{{% /tab %}}

{{% tab "Windows" %}}

1. Sigue las [instrucciones de Wiindows][1] para desinstalar cualquier Datadog Agent existente en la máquina.
1. Ejecuta el siguiente comando para instalar el FIPS Agent, sustituyendo `DATADOG_API_KEY` por tu clave de API:

   **Nota:** La compatibilidad con FIPS solo está disponible en el Agent a partir de la versión 7.65.0:

   {{< code-block lang="powershell" >}}
$p = Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /i https://windows-agent.datadoghq.com/datadog-fips-agent-7-latest.amd64.msi /log C:\Windows\SystemTemp\install-datadog.log APIKEY="<DATADOG_API_KEY>" SITE="ddog-gov.com"'
if ($p.ExitCode -ne 0) {
   Write-Host "msiexec failed with exit code $($p.ExitCode) please check the logs at C:\Windows\SystemTemp\install-datadog.log" -ForegroundColor Red
}
{{< /code-block >}}

3. Ejecuta el comando `status` y asegúrate de ver `FIPS Mode: enabled` en el resultado del estado.

   ```powershell
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
   ```

   {{< img src="/agent/fips-powershell.png" alt="Resultado del comando del Agent con el modo FIPS activado - Windows" style="width:100%;" >}}


**Nota**: El nombre del programa del Agent FIPS en **Add or Remove Programs** (Añadir o quitar programas) es "Datadog FIPS Agent." (FIPS Agent de Datadog)

[1]: /es/agent/basic_agent_usage/windows/#uninstall-the-agent

{{% /tab %}}

{{% tab "AWS Lambda" %}}

Para la conformidad de FIPS de AWS Lambda, sigue las instrucciones de la documentación [Conformidad de FIPS de AWS Lambda][1].

[1]: /es/serverless/aws_lambda/fips-compliance/

{{% /tab %}}

{{% tab "AWS ECS" %}}

Cuando sigas las [instrucciones de instalación de ECS][1], asegúrate de utilizar estos valores de configuración específicos de FIPS para tu Definición de tarea:
- Configura `image` en el objeto `containerDefinitions` en `public.ecr.aws/datadog/agent:7-fips` 
- Configura la variable de entorno `DD_SITE` en `ddog-gov.com`

[1]: /es/containers/amazon_ecs/
{{% /tab %}}

{{% tab "AWS EKS" %}}

Cuando sigas las instrucciones de [Instalación del Datadog Agent en Kubernetes][1], asegúrate de incluir estos valores de configuración específicos de FIPS en el archivo `datadog-agent.yaml` en función del método de instalación elegido:

Para el Datadog Operator:
```yaml
spec:
   global:
      site: "ddog-gov.com"
      useFIPSAgent: true
```

Para Helm Chart de Datadog:
```yaml
datadog:
   site: "ddog-gov.com"
useFIPSAgent: true
```

[1]: /es/containers/kubernetes/installation/
{{% /tab %}}

{{< /tabs >}}

## Seguridad y endurecimiento

Como cliente de Datadog, eres responsable de la seguridad y el endurecimiento del **host**.

**Consideraciones de seguridad:**
- Aunque las imágenes de Datadog que se proporcionan fueron creadas teniendo en cuenta la seguridad, no se han evaluado en función de las recomendaciones de referencia del CIS ni de las normas STIG de DISA.
- Si reconstruyes, reconfiguras o modificas el Datadog FIPS Agent para adaptarlo a tus necesidades de despliegue o prueba, es posible que termines con una configuración técnicamente funcional, pero Datadog no puede garantizar la conformidad con FIPS si el Datadog FIPS Agent no se utiliza exactamente como se explica en la documentación.
- Si no has seguido exactamente los pasos de instalación indicados en la documentación, Datadog no puede garantizar la conformidad con FIPS.
- Algunas distribuciones de Linux con `urllib3 ≤ 1.26.20` pueden fallar en el cifrado FIPS debido a bibliotecas no compatibles. Consulta tu proveedor de Linux para asegurarte de que admita el cifrado conforme a FIPS.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4282
[2]: https://csrc.nist.gov/CSRC/media/projects/cryptographic-module-validation-program/documents/security-policies/140sp4282.pdf
[3]: /es/integrations/guide/fips-integrations
[4]: /es/opentelemetry/setup/ddot_collector