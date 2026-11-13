---
algolia:
  tags:
  - agent flare
aliases:
- /es/agent/faq/send-logs-and-configs-to-datadog-via-flare-command
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: Documentación
  text: Modo de depuración del Agent
- link: /agent/troubleshooting/agent_check_status/
  tag: Documentación
  text: Obtener el estado de una verificación del Agent
title: Agent Flare
---
Un flare le permite enviar la información de solución de problemas necesaria al equipo de soporte de Datadog.

Esta página cubre:
- [Envío de un flare usando el `flare`comando](#send-a-flare-using-the-flare-command).
- [Envío de un flare desde el sitio de Datadog](#send-a-flare-from-the-datadog-site) usando Remote Configuration.
- [Envío manual](#manual-submission).

Un flare recopila todos los archivos de configuración y registros del Agent en un archivo comprimido. Elimina información confidencial, incluyendo contraseñas, claves de API, credenciales de proxy y cadenas de comunidad SNMP. Si APM está habilitado, el flare incluye [registros de depuración del trazador][4] cuando están disponibles.

El Datadog Agent es completamente de código abierto, lo que le permite [verificar el comportamiento del código][1]. Si es necesario, el flare puede revisarse antes de enviarlo, ya que el flare solicita una confirmación antes de cargarlo.

Al contactar al soporte de Datadog con Remote Configuration habilitado para un Agent, el equipo de soporte puede iniciar un flare desde su entorno para ayudarle mejor de manera oportuna. Los flares proporcionan información de solución de problemas a Datadog Support para ayudarle a resolver su problema. 

## Enviar un flare desde el sitio de Datadog {#send-a-flare-from-the-datadog-site}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">El envío de un Agent Flare desde Fleet Automation no es compatible con el sitio de Datadog seleccionado ({{< region-param key="dd_datacenter" >}}). Utilice <a href="#manual-submission">envío manual de flare</a> en su lugar.</div>
{{< /site-region >}}

Para enviar un flare desde el sitio de Datadog, asegúrese de haber habilitado [Fleet Automation][2] y [Remote Configuration][3] en el Agent.

{{% remote-flare %}}

{{< img src="agent/fleet_automation/fleet_automation_remote_flare.png" alt="El botón Enviar ticket abre un formulario para enviar un flare para un ticket de soporte nuevo o existente" style="width:70%;" >}}

## Envíe un flare usando el `flare`comando{#send-a-flare-using-the-flare-command}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">El envío de un Agent Flare usando el <code>flare</code> subcomando no es compatible con el sitio de Datadog seleccionado ({{< region-param key="dd_datacenter" >}}). Utilice <a href="#manual-submission">envío manual de flare</a> en su lugar.</div>
{{< /site-region >}}

Utilice el `flare` subcomando para enviar un flare. En los comandos a continuación, reemplace `<CASE_ID>` con su ID de incidencia de soporte de Datadog si tiene uno, luego ingrese la dirección de correo electrónico asociada con él.

Si no tiene un ID de incidencia, ingrese la dirección de correo electrónico que usa para iniciar sesión en Datadog para crear una nueva incidencia de soporte.

**Confirme la carga del archivo para enviarlo inmediatamente al soporte de Datadog**.

{{< tabs >}}
{{% tab "Agent" %}}

| Plataforma   | Comando                                                 |
|------------|---------------------------------------------------------|
| AIX        | `datadog-agent flare <CASE_ID>`                         |
| Docker     | `docker exec -it dd-agent agent flare <CASE_ID>`        |
| macOS      | `datadog-agent flare <CASE_ID>` o a través de la [web GUI][1] |
| CentOS     | `sudo datadog-agent flare <CASE_ID>`                    |
| Debian     | `sudo datadog-agent flare <CASE_ID>`                    |
| Kubernetes | `kubectl exec -it <AGENT_POD_NAME> -- agent flare <CASE_ID>`  |
| Fedora     | `sudo datadog-agent flare <CASE_ID>`                    |
| Redhat     | `sudo datadog-agent flare <CASE_ID>`                    |
| Suse       | `sudo datadog-agent flare <CASE_ID>`                    |
| Fuente     | `sudo datadog-agent flare <CASE_ID>`                    |
| Windows    | `& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" flare <CASE_ID>`       |
| Heroku     | Consulte la documentación dedicada de [Heroku][3]         |
| PCF     | `sudo /var/vcap/jobs/dd-agent/packages/dd-agent/bin/agent/agent flare <CASE_ID>`             |

## Contenedores dedicados {#dedicated-containers}

Al usar Agent v7.19+ y usar el Helm Chart de Datadog con la [versión más reciente][4] o un DaemonSet en el que el Datadog Agent y el Trace Agent están en contenedores separados, usted despliega un Pod de Agent que contiene:

* Un contenedor con el proceso del Agent (Agent + Log Agent)
* Un contenedor con el proceso process-agent
* Un contenedor con el proceso trace-agent
* Un contenedor con el proceso system-probe

Para obtener un flare de cada contenedor, ejecute los siguientes comandos:

### Agent {#agent}

```bash
kubectl exec -it <AGENT_POD_NAME> -c agent -- agent flare <CASE_ID>
```

### Process Agent {#process-agent}

```bash
kubectl exec -it <AGENT_POD_NAME> -c process-agent -- agent flare <CASE_ID> --local
```

### Trace Agent {#trace-agent}

```bash
kubectl exec -it <AGENT_POD_NAME> -c trace-agent -- agent flare <CASE_ID> --local
```

### Security Agent {#security-agent}

```bash
kubectl exec -it <AGENT_POD_NAME> -c security-agent -- security-agent flare <CASE_ID>
```

### System probe {#system-probe}

El contenedor system-probe no puede enviar un flare, así que obtenga los registros del contenedor en su lugar:

```bash
kubectl logs <AGENT_POD_NAME> -c system-probe > system-probe.log
```

## ECS Fargate {#ecs-fargate}

Para ECS Fargate, Datadog recomienda [enviar un flare desde el sitio de Datadog](#send-a-flare-from-the-datadog-site). En Fleet Automation, identifique su tarea mediante su ARN de tarea. Este proceso no requiere ningún cambio en su tarea o servicio de ECS.

Alternativamente, si Remote Configuration no está disponible o necesita ejecutar otros comandos del Agent, utilice [Amazon ECS Exec][5]. Plataforma ECS Fargate v1.4.0. Para usarla:

1. Agregue los permisos de ECS Exec a la definición de tarea.
2. Habilite ECS Exec en el servicio.
3. Vuelva a implementar la tarea.
4. Ejecute el siguiente comando para enviar un flare:

```bash
aws ecs execute-command --cluster <CLUSTER_NAME> \
    --task <TASK_ID> \
    --container datadog-agent \
    --interactive \
    --command "agent flare <CASE_ID>"
```

[1]: /es/agent/basic_agent_usage/#gui
[2]: /es/agent/basic_agent_usage/windows/#agent-v6
[3]: /es/agent/guide/heroku-troubleshooting/#send-a-flare
[4]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/CHANGELOG.md
[5]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html
{{% /tab %}}

{{% tab "Cluster Agent" %}}

| Plataforma      | Comando                                                                     |
|---------------|-----------------------------------------------------------------------------|
| Kubernetes    | `kubectl exec -n <NAMESPACE> -it <CLUSTER_POD_NAME> -- datadog-cluster-agent flare <CASE_ID>` |
| Cloud Foundry | `/var/vcap/packages/datadog-cluster-agent/datadog-cluster-agent-cloudfoundry flare -c /var/vcap/jobs/datadog-cluster-agent/config <CASE_ID>` |

{{% /tab %}}
{{< /tabs >}}

## Envío manual {#manual-submission}

El protocolo de flare del Agent recopila configuraciones y registros en un archivo comprimido que se encuentra primero en el directorio local `/tmp`.
Obtenga este archivo manualmente y proporciónelo al soporte técnico si hay algún problema con la conectividad del Agent.

### Kubernetes {#kubernetes}
Para obtener el archivo comprimido en Kubernetes, use el comando kubectl:

```
kubectl cp datadog-<pod-name>:tmp/datadog-agent-<date-of-the-flare>.zip flare.zip -c agent
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent/tree/main/pkg/flare
[2]: /es/agent/fleet_automation/
[3]: /es/agent/guide/setup_remote_config
[4]: /es/tracing/troubleshooting/tracer_debug_logs/?code-lang=dotnet#data-collected