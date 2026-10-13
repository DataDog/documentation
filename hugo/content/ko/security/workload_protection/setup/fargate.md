---
aliases:
- /ko/security/workload_protection/guide/ebpf-free-agent
description: AWS Fargate ECS 및 EKS 워크로드에서 Workload Protection을 활성하세요.
disable_toc: false
title: AWS Fargate에서 Workload Protection 설정하기
---
다음 지침을 따라 Workload Protection을 활성화하세요.

{{< partial name="security-platform/WP-billing-note.html" >}}

## 전제 조건 {#prerequisites}

- Datadog AWS 통합이 AWS 계정에 설치 및 구성되어 있음
- AWS Management Console에 대한 액세스 권한
- AWS Fargate ECS 또는 EKS 워크로드

## 이미지 {#images}

AWS Fargate에서는 Fargate가 호스트 커널에 대한 액세스를 제공하지 않으므로 Workload Protection이 eBPF를 사용할 수 없습니다. 이 환경에서는 Datadog Agent만으로는 애플리케이션 컨테이너를 추적할 수 없습니다. Agent 외에도 `cws-instrumentation` 이미지를 사용하여 ptrace로 워크로드를 계측하고 런타임 보안 이벤트를 수집합니다.

- `cws-instrumentation-init`: `public.ecr.aws/datadog/cws-instrumentation:latest`
- `datadog-agent`: `public.ecr.aws/datadog/agent:latest`

## 설치 {#installation}

{{< tabs >}}
{{% tab "Amazon ECS" %}}

### AWS 콘솔 {#aws-console}

1. [AWS Management Console][11]에 로그인합니다.
2. ECS 섹션으로 이동합니다.
3. 왼쪽 메뉴에서 **Task Definitions**를 선택한 다음, **Create new Task Definition with JSON**을 선택합니다. 또는 기존 Fargate 작업 정의를 선택합니다.
4. 작업 정의를 생성하려면 [Datadog ECS task patcher][12]를 사용하여 기존 작업 정의를 자동으로 패치합니다. 또는 JSON 정의를 수동으로 작성하거나 [AWS CLI 방법](#aws-cli)을 사용합니다.
5. **Create**를 클릭하여 작업 정의를 생성합니다.

### AWS CLI {#aws-cli}

1. Download [datadog-agent-cws-ecs-fargate.json][7].
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

2. JSON 파일에서 다음 항목을 업데이트합니다.
    - `TASK_NAME`
    - `DD_API_KEY`
    - `DD_SITE`
    - `YOUR_APP_NAME`
    - `YOUR_APP_IMAGE`
    - `ENTRYPOINT`

   다음 명령을 사용하여 워크로드의 진입점을 확인할 수 있습니다.

    ```shell
    docker inspect <YOUR_APP_IMAGE> -f '{{json .Config.Entrypoint}}'
    ```

   또는

    

```shell
    docker inspect <YOUR_APP_IMAGE> -f '{{json .Config.Cmd}}'
    ```

   **참고**: 환경 변수 `ECS_FARGATE`는 이미 'true'로 설정되어 있습니다.

3. 다른 애플리케이션 컨테이너를 작업 정의에 추가합니다. 통합 메트릭 수집에 대한 자세한 내용은 [ECS Fargate 통합 설정][8]을 참조하세요.
4. 다음 명령을 실행하여 ECS 작업 정의를 등록합니다.

{{< code-block lang="shell" collapsible="true" >}}
aws ecs register-task-definition --cli-input-json file://<PATH_TO_FILE>/datadog-agent-ecs-fargate.json
{{< /code-block >}}

### Vulnerability Management 활성화 {#enable-vulnerability-management}

1. Datadog에서 [Cloud Security > Setup > Cloud Integrations > AWS][9]로 이동합니다.
2. Amazon ECR을 호스트하는 AWS 계정에 [Datadog Agentless scanner][10]를 배포하여 Vulnerability Management를 활성화합니다.

[6]: /ko/integrations/eks_fargate/?tab=manual#amazon-eks-fargate-rbac
[7]: /ko/resources/json/datadog-agent-cws-ecs-fargate.json
[8]: /ko/integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
[9]: https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=aws&vuln_container_enabled=true&vuln_host_enabled=true&vuln_lambda_enabled=true
[10]: /ko/security/cloud_security_management/setup/agentless_scanning/enable/?tab=existingawsaccount#set-up-aws-cloudformation
[11]: https://aws.amazon.com/console
[12]: https://github.com/DataDog/datadog-agent-ecs-task-patcher


{{% /tab %}}

{{% tab "Amazon EKS" %}}

AWS Fargate 포드에서 데이터를 수집하려면 Agent를 애플리케이션 포드의 사이드카로 실행하고 역할 기반 액세스 제어(RBAC) 규칙을 설정해야 합니다.

<div class="alert alert-info">Agent가 사이드카로 실행 중인 경우, 동일한 포드에 있는 컨테이너와만 통신할 수 있습니다. 모니터링하려는 모든 포드에서 Agent를 실행하세요.</div>

### RBAC 규칙 설정 {#set-up-rbac-rules}

Agent를 사이드카로 배포하기 전에 다음 [Agent RBAC 배포 지침][6]을 따릅니다.

### Agent를 사이드카로 배포 {#deploy-the-agent-as-a-sidecar}

다음 매니페스트는 Workload Protection을 활성화하고 Datadog Agent를 사이드카로 사용하여 애플리케이션을 배포하는 데 필요한 최소 구성을 보여줍니다.

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

[6]: /ko/integrations/eks_fargate/?tab=manual#amazon-eks-fargate-rbac

{{% /tab %}}
{{< /tabs >}}

## Agent의 Workload Protection 이벤트 전송 확인 {#verify-that-the-agent-is-sending-events-to-workload-protection}

### ruleset_loaded 이벤트 검사 {#check-the-ruleset-loaded-event}

AWS Fargate ECS 또는 EKS에서 Workload Protection을 활성화하면 Agent가 기본 규칙 세트의 성공적인 배포를 확인하는 Agent 이벤트를 Datadog으로 전송합니다. 에이전트 이벤트를 조회하려면 Datadog의 [Agent 이벤트][11] 페이지로 이동하여 `@agent.rule_id:ruleset_loaded`를 검색하세요. 쿼리 오른쪽에서 {{< ui >}}Security events{{< /ui >}} 대신 {{< ui >}}All events{{< /ui >}}를 선택하세요. 그렇지 않으면 `ruleset_loaded` 이벤트가 필터링됩니다.

### 보안 신호 트리거 {#trigger-a-security-signal}
AWS Fargate 보안 신호를 수동으로 트리거하여 Agent가 Workload Protection으로 이벤트를 전송하는지 확인할 수도 있습니다.

작업 정의에서 'workload' 컨테이너를 다음으로 바꾸세요.

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