---
aliases:
- /es/security/workload_protection/guide/ebpf-free-agent
description: Habilite Workload Protection en cargas de trabajo de AWS Fargate ECS
  y EKS.
disable_toc: false
title: Configuración de Workload Protection en AWS Fargate
---
Utilice las siguientes instrucciones para habilitar Workload Protection.

{{< partial name="security-platform/WP-billing-note.html" >}}

## Requisitos previos {#prerequisites}

- La integración de Datadog con AWS está instalada y configurada para sus cuentas de AWS
- Acceso a AWS Management Console
- Cargas de trabajo de AWS Fargate ECS o EKS

## Imágenes {#images}

En AWS Fargate, Workload Protection no puede utilizar eBPF porque Fargate no proporciona acceso al kernel del servidor. El Datadog Agent por sí solo no puede rastrear los contenedores de su aplicación en este entorno. Además del Datadog Agent, utilizamos la imagen `cws-instrumentation` para instrumentar su carga de trabajo con ptrace y recopilar eventos de seguridad en tiempo de ejecución.

- `cws-instrumentation-init`: `public.ecr.aws/datadog/cws-instrumentation:latest`
- `datadog-agent`: `public.ecr.aws/datadog/agent:latest`

## Instalación {#installation}

{{< tabs >}}
{{% tab "Amazon ECS" %}}

### AWS Console {#aws-console}

1. Inicie sesión en [AWS Management Console][11].
2. Navegue a la sección ECS.
3. En el menú de la izquierda, seleccione **Task Definitions** y, a continuación, seleccione **Create new Task Definition with JSON**. Alternativamente, elija una definición de tarea de Fargate existente.
4. Para crear una definición de tarea, utilice el [Datadog ECS task patcher][12] para aplicar parches a una definición de tarea existente automáticamente. Alternativamente, cree manualmente la definición JSON o utilice el método [AWS CLI](#aws-cli).
5. Haga clic en **Create** para crear la definición de tarea.

### AWS CLI {#aws-cli}

1. Descargue [datadog-agent-cws-ecs-fargate.json][7].
{{< code-block lang="json" filename="datadog-agent-cws-ecs-fargate.json" collapsible="true" >}}
{
    "family": "<YOUR_TASK_NAME>",
    "cpu": "256",
    "memory": "512",
    "networkMode": "awsvpc",
    "pidMode": "task",
    "requiresCompatibilities": [
        "FARGATE"
    ],
    "containerDefinitions": [
        {
            "name": "cws-instrumentation-init",
            "image": "public.ecr.aws/datadog/cws-instrumentation:latest",
            "essential": false,
            "user": "0",
            "command": [
                "/cws-instrumentation",
                "setup",
                "--cws-volume-mount",
                "/cws-instrumentation-volume"
            ],
            "mountPoints": [
                {
                    "sourceVolume": "cws-instrumentation-volume",
                    "containerPath": "/cws-instrumentation-volume",
                    "readOnly": false
                }
            ]
        },
        {
            "name": "datadog-agent",
            "image": "public.ecr.aws/datadog/agent:latest",
            "essential": true,
            "environment": [
                {
                    "name": "DD_API_KEY",
                    "value": "<DD_API_KEY>"
                },
                {
                    "name": "DD_SITE",
                    "value": "datadoghq.com"
                },
                {
                    "name": "ECS_FARGATE",
                    "value": "true"
                },
                {
                    "name": "DD_RUNTIME_SECURITY_CONFIG_ENABLED",
                    "value": "true"
                },
                {
                    "name": "DD_RUNTIME_SECURITY_CONFIG_EBPFLESS_ENABLED",
                    "value": "true"
                }
            ],
            "healthCheck": {
                "command": [
                    "CMD-SHELL",
                    "/probe.sh"
                ],
                "interval": 30,
                "timeout": 5,
                "retries": 2,
                "startPeriod": 60
            }
        },
        {
            "name": "<YOUR_APP_NAME>",
            "image": "<YOUR_APP_IMAGE>",
            "entryPoint": [
                "/cws-instrumentation-volume/cws-instrumentation",
                "trace",
                "--",
                "<ENTRYPOINT>"
            ],
            "mountPoints": [
                {
                    "sourceVolume": "cws-instrumentation-volume",
                    "containerPath": "/cws-instrumentation-volume",
                    "readOnly": true
                }
            ],
            "linuxParameters": {
                "capabilities": {
                    "add": [
                        "SYS_PTRACE"
                    ]
                }
            },
            "dependsOn": [
                {
                    "containerName": "datadog-agent",
                    "condition": "HEALTHY"
                },
                {
                    "containerName": "cws-instrumentation-init",
                    "condition": "SUCCESS"
                }
            ]
        }
    ],
    "volumes": [
        {
            "name": "cws-instrumentation-volume"
        }
    ]
}
{{< /code-block >}}

2. Actualice los siguientes elementos en el archivo JSON:
    - `TASK_NAME`
    - `DD_API_KEY`
    - `DD_SITE`
    - `YOUR_APP_NAME`
    - `YOUR_APP_IMAGE`
    - `ENTRYPOINT`

   Puede utilizar el siguiente comando para encontrar el punto de entrada de su carga de trabajo:

    ```shell
    docker inspect <YOUR_APP_IMAGE> -f '{{json .Config.Entrypoint}}'
    ```

   o

    

```shell
    docker inspect <YOUR_APP_IMAGE> -f '{{json .Config.Cmd}}'
    ```

   **Nota**: La variable de entorno `ECS_FARGATE` ya está establecida en \"true\".

3. Agregue sus otros contenedores de aplicación a la definición de tarea. Para obtener detalles sobre la recopilación de métricas de integración, consulte [Configuración de integración para ECS Fargate][8].
4. Ejecute el siguiente comando para registrar la definición de tarea de ECS:

{{< code-block lang="shell" collapsible="true" >}}
aws ecs register-task-definition --cli-input-json file://<PATH_TO_FILE>/datadog-agent-ecs-fargate.json
{{< /code-block >}}

### Habilitar Vulnerability Management {#enable-vulnerability-management}

1. En Datadog, navegue a [Cloud Security > Setup > Cloud Integrations > AWS][9].
2. Habilite Vulnerability Management implementando el [Datadog Agentless scanner][10] en sus cuentas de AWS que alojan su Amazon ECR.

[6]: /es/integrations/eks_fargate/?tab=manual#amazon-eks-fargate-rbac
[7]: /es/resources/json/datadog-agent-cws-ecs-fargate.json
[8]: /es/integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
[9]: https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=aws&vuln_container_enabled=true&vuln_host_enabled=true&vuln_lambda_enabled=true
[10]: /es/security/cloud_security_management/setup/agentless_scanning/enable/?tab=existingawsaccount#set-up-aws-cloudformation
[11]: https://aws.amazon.com/console
[12]: https://github.com/DataDog/datadog-agent-ecs-task-patcher


{{% /tab %}}

{{% tab "Amazon EKS" %}}

Para recopilar datos de sus pods de AWS Fargate, debe ejecutar el Datadog Agent como un sidecar de su pod de aplicación y configurar reglas de control de acceso basado en roles (RBAC).

<div class="alert alert-info">Si el Datadog Agent se ejecuta como sidecar, solo puede comunicarse con los contenedores en el mismo pod. Ejecute un Datadog Agent para cada pod que desee hacer un seguimiento.</div>

### Configure reglas RBAC {#set-up-rbac-rules}

Utilice la siguiente [instrucción de implementación de RBAC del Datadog Agent][6] antes de implementar el Datadog Agent como sidecar.

### Implemente el Datadog Agent como sidecar {#deploy-the-agent-as-a-sidecar}

El siguiente manifiesto representa la configuración mínima necesaria para implementar su aplicación con el Datadog Agent como sidecar con Workload Protection habilitado:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<APPLICATION_NAME>"
 namespace: default
spec:
 replicas: 1
 selector:
   matchLabels:
     app: "<APPLICATION_NAME>"
 template:
   metadata:
     labels:
       app: "<APPLICATION_NAME>"
     name: "<POD_NAME>"
   spec:
     initContainers:
     - name: cws-instrumentation-init
       image: public.ecr.aws/datadog/cws-instrumentation:latest
       command:
         - "/cws-instrumentation"
         - "setup"
         - "--cws-volume-mount"
         - "/cws-instrumentation-volume"
       volumeMounts:
         - name: cws-instrumentation-volume
           mountPath: "/cws-instrumentation-volume"
       securityContext:
         runAsUser: 0
     containers:
     - name: "<YOUR_APP_NAME>"
       image: "<YOUR_APP_IMAGE>"
       command:
         - "/cws-instrumentation-volume/cws-instrumentation"
         - "trace"
         - "--"
         - "<ENTRYPOINT>"
       volumeMounts:
         - name: cws-instrumentation-volume
           mountPath: "/cws-instrumentation-volume"
           readOnly: true
     - name: datadog-agent
       image: public.ecr.aws/datadog/agent:latest
       env:
         - name: DD_API_KEY
           value: "<DD_API_KEY>"
         - name: DD_RUNTIME_SECURITY_CONFIG_ENABLED
           value: "true"
         - name: DD_RUNTIME_SECURITY_CONFIG_EBPFLESS_ENABLED
           value: "true"
         - name: DD_EKS_FARGATE
           value: "true"
         - name: DD_CLUSTER_NAME
           value: "<CLUSTER_NAME>"
         - name: DD_KUBERNETES_KUBELET_NODENAME
           valueFrom:
             fieldRef:
               apiVersion: v1
               fieldPath: spec.nodeName
     volumes:
       - name: cws-instrumentation-volume
     serviceAccountName: datadog-agent
     shareProcessNamespace: true
```

[6]: /es/integrations/eks_fargate/?tab=manual#amazon-eks-fargate-rbac

{{% /tab %}}
{{< /tabs >}}

## Verifique que el Datadog Agent esté enviando eventos a Workload Protection {#verify-that-the-agent-is-sending-events-to-workload-protection}

### Verifique el evento ruleset_loaded {#check-the-ruleset-loaded-event}

Cuando habilita Workload Protection en AWS Fargate ECS o EKS, el Datadog Agent envía un evento de agente a Datadog para confirmar que el conjunto de reglas predeterminado se ha implementado correctamente. Para ver el evento del Datadog Agent, navegue a la página [Agent Events][11] en Datadog y busque `@agent.rule_id:ruleset_loaded`. A la derecha de la consulta, seleccione {{< ui >}}All events{{< /ui >}} en lugar de {{< ui >}}Security events{{< /ui >}}; de lo contrario, los eventos `ruleset_loaded` se filtrarán.

### Active una señal de seguridad {#trigger-a-security-signal}
También puede verificar que el Datadog Agent esté enviando eventos a Workload Protection activando manualmente una señal de seguridad de AWS Fargate.

En la definición de la tarea, reemplace el contenedor \"workload\" con lo siguiente:

{{< code-block lang="json" collapsible="true" >}}
            "name": "cws-signal-test",
            "image": "ubuntu:latest",
            "entryPoint": [
                "/cws-instrumentation-volume/cws-instrumentation",
                "trace",
                "--verbose",
                "--",
                "/usr/bin/bash",
                "-c",
                "apt update;apt install -y curl; while true; do curl https://google.com; sleep 5; done"
            ],
{{< /code-block >}}

[11]: https://app.datadoghq.com/security/agent-events