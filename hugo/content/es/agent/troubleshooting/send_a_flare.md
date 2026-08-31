---
algolia:
  tags:
  - agent flare
aliases:
- /es/agent/faq/send-logs-and-configs-to-datadog-via-flare-command
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: Documentación
  text: Modo de depuración del agente
- link: /agent/troubleshooting/agent_check_status/
  tag: Documentación
  text: Obtener el estado de una verificación de agente
title: Flare de agente
---
Una señal te permite enviar información necesaria para la solución de problemas al equipo de soporte de Datadog.

Esta página cubre:
- [Enviando un flare usando el comando `flare`](#send-a-flare-using-the-flare-command).
- [Enviando un flare desde el sitio de Datadog](#send-a-flare-from-the-datadog-site) usando Remote Configuration.
- [Envío manual](#manual-submission).

Un flare reúne todos los archivos de configuración y registros del agente en un archivo. Elimina información sensible, incluyendo contraseñas, claves de API, credenciales de proxy y cadenas de comunidad SNMP. Si APM está habilitado, la señal incluye [registros de depuración de trazadores][4] cuando están disponibles.

El agente de Datadog es completamente de código abierto, lo que te permite [verificar el comportamiento del código][1]. Si es necesario, la señal puede ser revisada antes de enviarla, ya que la señal solicita una confirmación antes de cargarla.

Al contactar al Soporte de Datadog con Remote Configuration habilitado para un agente, el equipo de soporte puede iniciar un flare desde su entorno para ayudarle de manera oportuna. Los flares proporcionan información de solución de problemas al Soporte de Datadog para ayudarle a resolver su problema. 

## Enviar un flare desde el sitio de Datadog {#send-a-flare-from-the-datadog-site}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">Enviar un flare de agente desde Fleet Automation no es compatible con su sitio de Datadog seleccionado ({{< region-param key="dd_datacenter" >}}). Usa <a href="#manual-submission">envío manual de flares</a> en su lugar.</div>
{{< /site-region >}}

Para enviar un flare desde el sitio de Datadog, asegúrese de haber habilitado [Fleet Automation][2] y [Remote Configuration][3] en el Agente.

{{% remote-flare %}}

{{< img src="agent/fleet_automation/fleet_automation_remote_flare.png" alt="El botón Send Ticket lanza un formulario para enviar un flare para un ticket de soporte existente o nuevo." style="width:70%;" >}}

## Envía un flare usando el comando `flare` {#send-a-flare-using-the-flare-command}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">Enviando un flare de agente usando el <code>flare</code> el subcomando no es compatible con su sitio de Datadog seleccionado ({{< region-param key="dd_datacenter" >}}). Usa <a href="#manual-submission">envío manual de flares</a> en su lugar.</div>
{{< /site-region >}}

Usa el subcomando `flare` para enviar un flare. En los comandos a continuación, reemplace `<CASE_ID>` con su ID de caso de soporte de Datadog, si tiene uno, y luego ingrese la dirección de correo electrónico asociada con él.

Si no tiene un ID de caso, ingrese la dirección de correo electrónico utilizada para iniciar sesión en Datadog para crear un nuevo caso de soporte.

**Confirme la carga del archivo para enviarlo de inmediato al Soporte de Datadog**.

{{< tabs >}}
{{% tab "Agente" %}}

| Plataforma   | Comando                                                 |
|------------|---------------------------------------------------------|
| AIX        | `datadog-agent flare <CASE_ID>`                         |
| Docker     | `docker exec -it dd-agent agent flare <CASE_ID>`        |
| macOS      | `datadog-agent flare <CASE_ID>` o a través de la [interfaz web][1] |
| CentOS     | `sudo datadog-agent flare <CASE_ID>`                    |
| Debian     | `sudo datadog-agent flare <CASE_ID>`                    |
| Kubernetes | `kubectl exec -it <AGENT_POD_NAME> -- agent flare <CASE_ID>`  |
| Fedora     | `sudo datadog-agent flare <CASE_ID>`                    |
| Redhat     | `sudo datadog-agent flare <CASE_ID>`                    |
| Suse       | `sudo datadog-agent flare <CASE_ID>`                    |
| Fuente     | `sudo datadog-agent flare <CASE_ID>`                    |
| Windows    | `& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" flare <CASE_ID>`       |
| Heroku     | Consulte la [documentación dedicada de Heroku][3]         |
| PCF     | `sudo /var/vcap/jobs/dd-agent/packages/dd-agent/bin/agent/agent flare <CASE_ID>`             |

## Contenedores dedicados {#dedicated-containers}

Al usar el Agente v7.19+ y el Chart de Helm de Datadog con la [última versión][4] o un DaemonSet donde el Agente de Datadog y el Agente de Trazas están en contenedores separados, despliega un Pod de Agente que contiene:

* Un contenedor con el proceso del Agente (Agent + Log Agent)
* Un contenedor con el proceso Process Agent
* Un contenedor con el proceso Trace Agent
* Un contenedor con el proceso system-probe

Para obtener un flare de cada contenedor, ejecute los siguientes comandos:

### Agente {#agent}

```bash
kubectl exec -it <AGENT_POD_NAME> -c agent -- agent flare <CASE_ID>
```

### Process Agent {#process-agent}

```bash
kubectl exec -it <AGENT_POD_NAME> -c process-agent -- agent flare <CASE_ID> --local
```

### Agente de Trazas {#trace-agent}

```bash
kubectl exec -it <AGENT_POD_NAME> -c trace-agent -- agent flare <CASE_ID> --local
```

### Agente de Seguridad {#security-agent}

```bash
kubectl exec -it <AGENT_POD_NAME> -c security-agent -- security-agent flare <CASE_ID>
```

### Sondeo del sistema {#system-probe}

El contenedor system-probe no puede enviar un flare, así que obtenga los registros del contenedor en su lugar:

```bash
kubectl logs <AGENT_POD_NAME> -c system-probe > system-probe.log
```

## ECS Fargate {#ecs-fargate}

Al usar la plataforma ECS Fargate v1.4.0, las tareas y servicios de ECS pueden configurarse para permitir el acceso a contenedores de Linux en ejecución habilitando [Amazon ECS Exec][5]. Después de habilitar Amazon ECS exec, ejecute el siguiente comando para enviar una señal:

```bash
aws ecs execute-command --cluster <CLUSTER_NAME> \
    --task <TASK_ID> \
    --container datadog-agent \
    --interactive \
    --command "agent flare <CASE_ID>"
```

**Nota:** ECS Exec solo se puede habilitar para nuevas tareas. Debe recrear las tareas existentes para usar ECS Exec.

[1]: /es/agent/basic_agent_usage/#gui
[2]: /es/agent/basic_agent_usage/windows/#agent-v6
[3]: /es/agent/guide/heroku-troubleshooting/#send-a-flare
[4]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/CHANGELOG.md
[5]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html
{{% /tab %}}

{{% tab "Agente del clúster" %}}

| Plataforma      | Comando                                                                     |
|---------------|-----------------------------------------------------------------------------|
| Kubernetes    | `kubectl exec -n <NAMESPACE> -it <CLUSTER_POD_NAME> -- datadog-cluster-agent flare <CASE_ID>` |
| Cloud Foundry | `/var/vcap/packages/datadog-cluster-agent/datadog-cluster-agent-cloudfoundry flare -c /var/vcap/jobs/datadog-cluster-agent/config <CASE_ID>` |

{{% /tab %}}
{{< /tabs >}}

## Envío manual {#manual-submission}

El protocolo de flare del Agente recopila archivos de configuración y registros en un archivo ubicado inicialmente en el directorio local `/tmp`.
Obtenga manualmente este archivo y proporciónelo al soporte si hay algún problema con la conectividad del Agente.

### Kubernetes {#kubernetes}
Para obtener el archivo en Kubernetes, use el comando kubectl:

```
kubectl cp datadog-<pod-name>:tmp/datadog-agent-<date-of-the-flare>.zip flare.zip -c agent
```

## Para saber más {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent/tree/main/pkg/flare
[2]: /es/agent/fleet_automation/
[3]: /es/agent/guide/setup_remote_config
[4]: /es/tracing/troubleshooting/tracer_debug_logs/?code-lang=dotnet#data-collected