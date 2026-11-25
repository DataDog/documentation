---
aliases:
- /es/security/cloud_security_management/setup/fargate
- /es/security/cloud_security_management/setup/serverless
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/threat-detection-fargate/
  tag: Blog
  text: Obtenga detección de amenazas en tiempo real para entornos de AWS Fargate
    ECS y EKS con Datadog Cloud Security
title: Guía de configuración de AWS Fargate para Datadog Security
---
Esta guía lo orienta sobre cómo configurar [Cloud Security][3], [Software Composition Analysis (SCA)][22], [Threat Detection and Protection (AAP)][4] y [Cloud SIEM][5] en AWS Fargate.

{{< img src="security/datadog_security_coverage_aws_fargate2.png" alt="Diagrama de flujo que muestra cómo se configuran Cloud Security, AAP y Cloud SIEM en AWS Fargate" width="90%">}}

## Cobertura de pila completa para AWS Fargate {#full-stack-coverage-for-aws-fargate}

Datadog Security proporciona múltiples capas de visibilidad para AWS Fargate. Utilice los productos en combinación entre sí para obtener una cobertura de pila completa, como se muestra en las siguientes tablas:

### Activos de Fargate {#fargate-assets}

<table>
    <thead>
    <th>Activo</th>
    <th>Observabilidad</th>
    <th>Corrección de vulnerabilidades y configuraciones incorrectas</th>
    <th>Detección y respuesta ante amenazas</th>
    </thead>
    <tr>
    </tr>
    <tr>
        <td>Aplicación Fargate</td>
        <td>Application Performance Monitoring</td>
        <td>Software Composition Analysis (SCA) y Code Security</td>
        <td>AAP - Threat Detection and Protection</td>
    </tr>
    <tr>
        <td>Infraestructura de Fargate</td>
        <td>Infrastructure Monitoring</td>
        <td>Cloud Security</td>
        <td>Workload Protection</td>
    </tr>
</table>

### Recursos relacionados con Fargate {#fargate-related-resources}

<table>
    <thead>
    <th>Activo</th>
    <th>Observabilidad</th>
    <th>Corrección de vulnerabilidades y configuraciones incorrectas</th>
    <th>Detección y respuesta ante amenazas</th>
    </thead>
    <tr>
        <td>Roles y políticas de AWS IAM</td>
        <td>Log Management</td>
        <td>Cloud Security</td>
        <td>Cloud SIEM</td>
    </tr>
    <tr>
        <td>Bases de datos de AWS</td>
        <td>Log Management</td>
        <td>Cloud Security</td>
        <td>Cloud SIEM</td>
    </tr>
    <tr>
        <td>buckets de AWS S3</td>
        <td>Log Management</td>
        <td>Cloud Security</td>
        <td>Cloud SIEM</td>
    </tr>
</table>

## Cloud Security {#cloud-security}

### Requisitos previos {#prerequisites}

- La integración de Datadog con AWS está instalada y configurada para sus cuentas de AWS
- Acceso a AWS Management Console
- Cargas de trabajo de AWS Fargate ECS o EKS

<div class="alert alert-info">Para obtener información adicional sobre el rendimiento y la confiabilidad, Datadog recomienda habilitar Infrastructure Monitoring con Cloud Security.</div>

### Imágenes {#images}

* `cws-instrumentation-init`: `public.ecr.aws/datadog/cws-instrumentation:latest`
* `datadog-agent`: `public.ecr.aws/datadog/agent:latest`

### Instalación {#installation}

{{< tabs >}}
{{% tab "Amazon ECS" %}}

#### AWS Console {#aws-console}

1. Inicie sesión en [AWS Management Console][6].
2. Navegue a la sección ECS.
3. En el menú de la izquierda, seleccione **Task Definitions** y, a continuación, seleccione **Create new Task Definition with JSON**. Alternativamente, elija una definición de tarea de Fargate existente.
4. Para crear una nueva definición de tarea, utilice la definición JSON o el [método de AWS CLI](#aws-cli).
5. Haga clic en **Create** para crear la definición de tarea.

#### AWS CLI {#aws-cli}

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

    or

    ```shell
    docker inspect <YOUR_APP_IMAGE> -f '{{json .Config.Cmd}}'
    ```

    **Note**: The environment variable `ECS_FARGATE` is already set to "true".

3. Agregue sus otros contenedores de aplicación a la definición de tarea. Para obtener detalles sobre la recopilación de métricas de integración, consulte [Configuración de integración para ECS Fargate][8].
4. Ejecute el siguiente comando para registrar la definición de tarea de ECS:

{{< code-block lang="shell" collapsible="true" >}}
aws ecs register-task-definition --cli-input-json file://<PATH_TO_FILE>/datadog-agent-ecs-fargate.json
{{< /code-block >}}

#### Datadog Cloud Security {#datadog-cloud-security}
1. En Datadog, navegue a [Cloud Security > Setup > Cloud Integrations > AWS][9].
2. Habilite Vulnerability Management activando [Agentless Scanning][10] en las cuentas de AWS que alojan sus repositorios de Amazon ECR.

[6]: /es/integrations/eks_fargate/?tab=manual#amazon-eks-fargate-rbac
[7]: /es/resources/json/datadog-agent-cws-ecs-fargate.json
[8]: /es/integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
[9]: https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=aws&vuln_container_enabled=true&vuln_host_enabled=true&vuln_lambda_enabled=true
[10]: /es/security/cloud_security_management/setup/agentless_scanning/enable/


{{% /tab %}}

{{% tab "Amazon EKS" %}}

Para recopilar datos de sus pods de AWS Fargate, debe ejecutar el Datadog Agent como un sidecar de su pod de aplicación y configurar reglas de Role-Based Access Control (RBAC).

<div class="alert alert-info">Si el Datadog Agent se ejecuta como sidecar, solo puede comunicarse con los contenedores en el mismo pod. Ejecute un Agent para cada pod que desee monitorear.</div>

#### Configure reglas RBAC {#set-up-rbac-rules}

Utilice la siguiente [instrucción de implementación de RBAC del Datadog Agent][6] antes de implementar el Datadog Agent como sidecar.

#### Implemente el Agent como sidecar {#deploy-the-agent-as-a-sidecar}

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

### Verifique que el Agent esté enviando eventos a Cloud Security {#verify-that-the-agent-is-sending-events-to-cloud-security}

Cuando habilita Cloud Security en AWS Fargate ECS o EKS, el Agent envía un evento del agente a Datadog para confirmar que el conjunto de reglas predeterminado se ha implementado correctamente. Para ver el evento del agente, navegue a la página [Agent Events][9] en Datadog y busque `@agent.rule_id:ruleset_loaded`.

<div class="alert alert-info">También puede verificar que el Agent esté enviando eventos a Cloud Security activando manualmente una señal de seguridad de AWS Fargate.</div>

En la definición de la tarea, reemplace el contenedor \"workload\" con lo siguiente:

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

## App and API Protection {#app-and-api-protection}

### Prerequisites {#prerequisites-1}

- El Datadog Agent está instalado y configurado para el sistema operativo o contenedor, la nube o el entorno virtual de su aplicación
- Datadog APM está configurado para su aplicación o servicio

<div class="alert alert-info"> Para obtener información adicional sobre el rendimiento y la confiabilidad, Datadog recomienda habilitar Application Performance Monitoring con App and API Protection.</div>

### Instalación {#installation-1}

#### Software Composition Analysis (SCA) {#software-composition-analysis-sca}
[Software Composition Analysis (SCA)][22] funciona en Fargate. Siga los [pasos de instalación para aplicaciones que se ejecutan en servidores tradicionales][23].

#### Threat Detection and Protection {#threat-detection-and-protection}

Para obtener instrucciones paso a paso, consulte los siguientes artículos:

- [Java][10]
- [.NET][11]
- [Go][12]
- [Ruby][13]
- [Node.js][14]
- [Python][15]

#### Code Security {#code-security}

Para obtener instrucciones paso a paso, consulte los siguientes artículos:

- [Java][18]
- [.NET][19]
- [Node.js][20]

## Cloud SIEM {#cloud-siem}

### Requisitos previos {#prerequisites-2}

- [Ingesta de registros][21] está configurada para recopilar registros de sus fuentes.

### Instalación {#installation-2}

Para obtener instrucciones paso a paso, consulte la [Guía de configuración de AWS para Cloud SIEM][17].

#### Habilite el registro de AWS CloudTrail {#enable-aws-cloudtrail-logging}

{{% cloud-siem-aws-cloudtrail-enable %}}

#### Envíe registros de AWS CloudTrail a Datadog {#send-aws-cloudtrail-logs-to-datadog}

{{% cloud-siem-aws-cloudtrail-send-logs %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/ecs_fargate/
[2]: /es/integrations/eks_fargate/
[3]: /es/security/cloud_security_management/
[4]: /es/security/application_security/
[5]: /es/security/cloud_siem/
[6]: /es/integrations/eks_fargate/#amazon-eks-fargate-rbac
[7]: /es/resources/json/datadog-agent-cws-ecs-fargate.json
[8]: /es/integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
[9]: https://app.datadoghq.com/security/agent-events
[10]: /es/security/application_security/setup/java/aws-fargate
[11]: /es/security/application_security/setup/dotnet/aws-fargate
[12]: /es/security/application_security/setup/aws/fargate
[13]: /es/security/application_security/setup/ruby/aws-fargate
[14]: /es/security/application_security/setup/nodejs/aws-fargate
[15]: /es/security/application_security/setup/python/aws-fargate
[16]: /es/security/application_security/
[17]: /es/security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
[18]: /es/security/code_security/iast/setup/java/
[19]: /es/security/code_security/iast/setup/dotnet/
[20]: /es/security/code_security/iast/setup/nodejs/
[21]: https://app.datadoghq.com/security/configuration/siem/setup
[22]: /es/security/code_security/software_composition_analysis/
[23]: /es/security/code_security/software_composition_analysis/