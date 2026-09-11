---
aliases:
- /es/security/cloud_security_management/setup/fargate
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/threat-detection-fargate/
  tag: Blog
  text: Obtén detección de amenazas en tiempo real para entornos de AWS Fargate ECS
    y EKS con Datadog CSM
title: Guía de configuración de AWS Fargate para la seguridad de Datadog
---

Esta guía te indicará los pasos de la configuración de [Cloud Security Management (CSM)][3], [Application Security Management (ASM)][4] y [Cloud SIEM][5] en AWS Fargate.

{{< img src="security/datadog_security_coverage_aws_fargate.png" alt="Tabla de flujo que muestra cómo CSM, ASM y Cloud SIEM se configuran en AWS Fargate" width="90%">}}

## Cobertura completa del stack para AWS Fargate

Seguridad de Datadog proporciona múltiples capas de visibilidad para AWS Fargate. Utiliza los productos en combinación con otros para obtener una cobertura completa del stack, como se muestra en las tablas siguientes:

### Activos de Fargate

<table>
    <thead>
    <th>Activos</th>
    <th>Observabilidad</th>
    <th>Corrección de vulnerabilidades y errores de configuración</th>
    <th>Detección de amenazas y respuesta</th>
    </thead>
    <tr>
    </tr>
    <tr>
        <td>Aplicación de Fargate</td>
        <td>Application Performance Monitoring</td>
        <td>Application Security Management</td>
        <td>Application Security Management</td>
    </tr>
    <tr>
        <td>Infraestructura de Fargate</td>
        <td>Monitorización de infraestructura</td>
        <td>Aún no compatible</td>
        <td>CSM Threats</td>
    </tr>
</table>

### Recursos relacionados con Fargate

<table>
    <thead>
    <th>Activos</th>
    <th>Observabilidad</th>
    <th>Corrección de vulnerabilidades y errores de configuración</th>
    <th>Detección de amenazas y respuesta</th>
    </thead>
    <tr>
        <td>Roles y políticas de AWS IAM</td>
        <td>Gestión de logs</td>
        <td>Cloud Security Management</td>
        <td>Cloud SIEM</td>
    </tr>
    <tr>
        <td>Bases de datos de AWS</td>
        <td>Gestión de logs</td>
        <td>Cloud Security Management</td>
        <td>Cloud SIEM</td>
    </tr>
    <tr>
        <td>Buckets de AWS S3</td>
        <td>Gestión de logs</td>
        <td>Cloud Security Management</td>
        <td>Cloud SIEM</td>
    </tr>
</table>

## Cloud Security Management

### Requisitos previos

- La integración de Datadog AWS está instalada y configurada para tus cuentas de AWS 
- Acceso a AWS Management Console
- Cargas de trabajo de AWS Fargate ECS o EKS

<div class="alert alert-info">Para obtener información adicional sobre el rendimiento y fiabilidad, Datadog recomienda habilitar la monitorización de infraestructura con Cloud Security Management.</div>

### Imágenes

* `cws-instrumentation-init`: `public.ecr.aws/datadog/cws-instrumentation:latest`
* `datadog-agent`: `public.ecr.aws/datadog/agent:latest`

### Instalación

{{< tabs >}}
{{% tab "Amazon ECS" %}}

#### Consola de AWS

1. Inicia sesión en [AWS Management Console][6].
2. Navega hasta la sección de ECS.
3. En el menú de la izquierda, selecciona **Task Definitions** (Definiciones de tarea) y, a continuación, selecciona **Create new Task Definition with JSON** (Crear nueva definición de tarea con JSON). Como alternativa, selecciona una definición de tarea de Fargate existente.
4. Para crear una nueva definición de tarea, utiliza la definición JSON o el [método de AWS CLI](#aws-cli).
5. Haz clic en **Create** (Crear) para crear la definición de la tarea.

#### AWS CLI

1. Descarga [datadog-agent-cws-ecs-fargate.json][7].
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

2. Actualiza los siguientes elementos en el archivo JSON:
    - `TASK_NAME`
    - `DD_API_KEY`
    - `DD_SITE`
    - `YOUR_APP_NAME`
    - `YOUR_APP_IMAGE`
    - `ENTRYPOINT`

    Puedes utilizar el siguiente comando para encontrar el punto de entrada de tu carga de trabajo:

    ```shell
    docker inspect <YOUR_APP_IMAGE> -f '{{json .Config.Entrypoint}}'
    ```

    o

    ```shell
    docker inspect <YOUR_APP_IMAGE> -f '{{json .Config.Cmd}}'
    ```

    **Nota**: La variable de entorno `ECS_FARGATE` ya está configurada en "true".

3. Añade tus otros contenedores de aplicaciones a la definición de la tarea. Para obtener más información sobre la recopilación de métricas de integración, consulta [Configuración de integración para ECS Fargate][8].
4. Ejecuta el siguiente comando para registrar la definición de la tarea de ECS:

{{< code-block lang="shell" collapsible="true" >}}
aws ecs register-task-definition --cli-input-json file://<PATH_TO_FILE>/datadog-agent-ecs-fargate.json
{{< /code-block >}}

[6]: /es/integrations/eks_fargate/?tab=manual#aws-eks-fargate-rbac
[7]: /resources/json/datadog-agent-cws-ecs-fargate.json
[8]: /es/integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui

{{% /tab %}}

{{% tab "Amazon EKS" %}}

Para recopilar datos de tus pods de AWS Fargate, debes ejecutar el Agent como auxiliar de tu pod de aplicación y configurar reglas de control de acceso basado en roles (RBAC).

<div class="alert alert-info">Si el Agent se ejecuta como auxiliar, solo puede comunicarse con contenedores del mismo pod. Ejecuta un Agent para cada pod que desees monitorizar.</div>

#### Configurar reglas de RBAC

Utiliza las siguientes [instrucciones de despliegue de RBAC en el Agent][6] antes de desplegar el Agent como auxiliar.

#### Despliegue del Agent como auxiliar

El siguiente manifiesto representa la mínima configuración requerida para desplegar tu aplicación con el Datadog Agent como auxiliar con CSM Threats habilitado:

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

[6]: /es/integrations/eks_fargate/?tab=manual#aws-eks-fargate-rbac

{{% /tab %}}
{{< /tabs >}}

### Comprobar que el Agent envía eventos a CSM

Cuando activas CSM en AWS Fargate ECS o EKS, el Agent envía un log a Datadog para confirmar que el conjunto de reglas predeterminado se ha desplegado correctamente. Para ver el log, navega a la página [Logs][9] en Datadog y busca `@agent.rule_id:ruleset_loaded`.

<div class="alert alert-info">También puedes verificar que el Agent está enviando eventos a CSM activando manualmente una señal de seguridad para AWS Fargate.</div>

En la definición de la tarea, sustituye el contenedor de "carga de trabajo" por lo siguiente:

{{< code-block lang="yaml" collapsible="true" >}}
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

## Application Security Management

### Requisitos previos

- El Datadog Agent se instala y configura para el sistema operativo de tu aplicación o contenedor, entorno en la nube o virtual
- Datadog APM está configurado para tu aplicación o servicio

<div class="alert alert-info"> Para obtener información adicional sobre el rendimiento y la fiabilidad, Datadog recomienda habilitar Application Performance Monitoring con Application Security Management.</div>

### Instalación

#### Protección y detección de amenazas

Para obtener instrucciones paso a paso, consulta los siguientes artículos:

- [Java][10]
- [.NET][11]
- [Go][12]
- [Ruby][13]
- [Node.js][14]
- [Python][15]

#### Código de seguridad

Para obtener instrucciones paso a paso, consulta los siguientes artículos:

- [Java][18]
- [.NET][19]
- [Node.js][20]

## Cloud SIEM

### Requisitos previos

- [La ingesta de logs][21] está configurada para recopilar logs de tus fuentes.

### Instalación

Para obtener instrucciones paso a paso, consulta la [Guía de configuración de AWS para Cloud SIEM][17].

#### Habilitar el registro de AWS CloudTrail

{{% cloud-siem-aws-cloudtrail-enable %}}

#### Enviar logs de AWS CloudTrail a Datadog

{{% cloud-siem-aws-cloudtrail-send-logs %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/ecs_fargate/
[2]: /es/integrations/eks_fargate/
[3]: /es/security/cloud_security_management/
[4]: /es/security/application_security/
[5]: /es/security/cloud_siem/
[6]: /es/integrations/eks_fargate/?tab=manual#aws-eks-fargate-rbac
[7]: /resources/json/datadog-agent-cws-ecs-fargate.json
[8]: /es/integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
[9]: https://app.datadoghq.com/logs
[10]: /es/security/application_security/threats/setup/threat_detection/java/?tab=awsfargate
[11]: /es/security/application_security/threats/setup/threat_detection/java/?tab=amazonecs
[12]: /es/security/application_security/threats/setup/threat_detection/dotnet?tab=awsfargate
[13]: /es/security/application_security/threats/setup/threat_detection/ruby?tab=awsfargate
[14]: /es/security/application_security/threats/setup/threat_detection/nodejs?tab=awsfargate
[15]: /es/security/application_security/threats/setup/threat_detection/python?tab=awsfargate
[16]: /es/security/application_security/
[17]: /es/security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
[18]: /es/security/application_security/code_security/setup/java/
[19]: /es/security/application_security/code_security/setup/dotnet/
[20]: /es/security/application_security/code_security/setup/nodejs/
[21]: https://app.datadoghq.com/security/configuration/siem/setup