---
aliases:
- /ko/security/cloud_security_management/setup/fargate
- /ko/security/cloud_security_management/setup/serverless
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/threat-detection-fargate/
  tag: 블로그
  text: Datadog Cloud Security으로 AWS Fargate ECS 및 EKS 환경 실시간 위협 탐지하기
title: Datadog 보안용 AWS Fargate 구성 가이드
---

본 가이드는 AWS Fargate에서 [Cloud Security][3], [Software Composition Analysis(SCA)][22], [위협 탐지 및 보호(AAP)][4], [Cloud SIEM][5]를 구성하는 방법을 안내합니다.

{{< img src="security/datadog_security_coverage_aws_fargate2.png" alt="AWS Fargate에서 Cloud Security, AAP, Cloud SIEM가 구성되는 방식을 보여주는 플로우 차트" width="90%">}}

## AWS Fargate의 풀 스택 커버리지

Datadog Security는 AWS Fargate의 다중 계층의 가시성을 제공합니다. 다음 테이블처럼 제품을 서로 조합해 사용하면 풀 스택 커버리지를 확보할 수 있습니다.

### Fargate 에셋

<table>
    <thead>
    <th>에셋</th>
    <th>Observability</th>
    <th>취약성 및 잘못된 설정 수정</th>
    <th>위협 탐지 및 대응</th>
    </thead>
    <tr>
    </tr>
    <tr>
        <td>Fargate 애플리케이션</td>
        <td>Application Performance Monitoring</td>
        <td>Software Composition Analysis(SCA) 및 Code Security</td>
        <td>AAP - 위협 탐지 및 보호</td>
    </tr>
    <tr>
        <td>Fargate 인프라스트럭처</td>
        <td>Infrastructure Monitoring</td>
        <td>Cloud Security</td>
        <td>Workload Protection</td>
    </tr>
</table>

### Fargate 관련 소스

<table>
    <thead>
    <th>에셋</th>
    <th>Observability</th>
    <th>취약성 및 잘못된 설정 수정</th>
    <th>위협 탐지 및 대응</th>
    </thead>
    <tr>
        <td>AWS IAM 역할 및 정책</td>
        <td>Log Management</td>
        <td>Cloud Security</td>
        <td>Cloud SIEM</td>
    </tr>
    <tr>
        <td>AWS 데이터베이스</td>
        <td>Log Management</td>
        <td>Cloud Security</td>
        <td>Cloud SIEM</td>
    </tr>
    <tr>
        <td>AWS S3 버킷</td>
        <td>Log Management</td>
        <td>Cloud Security</td>
        <td>Cloud SIEM</td>
    </tr>
</table>

## 클라우드 보안

### 사전 필수 조건

- Datadog AWS 통합은 AWS 계정에 설치 및 구성됩니다.
- AWS 관리 콘솔에 액세스
- AWS Fargate ECS 또는 EKS 워크로드

<div class="alert alert-info">성능 및 안정성에 대한 추가 인사이트를 얻으려면 Datadog은 Cloud Security로 Infrastructure Monitoring을 활성화할 것을 권장합니다.</div>

### 이미지

* `cws-instrumentation-init`: `public.ecr.aws/datadog/cws-instrumentation:latest`
* `datadog-agent`: `public.ecr.aws/datadog/agent:latest`

### 설치

{{< tabs >}}
{{% tab "Amazon ECS" %}}

#### AWS Console

1. [AWS Management Console][6]에 로그인합니다.
2. ECS 섹션으로 이동합니다.
3. 왼쪽 메뉴에서 **Task Definitions**를 선택한 다음 **Create new Task Definition with JSON**를 선택합니다. 또는 기존 Fargate Task Definition을 선택합니다.
4. 새 작업 정의를 생성하려면 JSON 정의 또는 [AWS CLI 메서드](#aws-cli)를 사용하세요.
5. **생성**을 클릭하여 작업 정의를 생성합니다.

#### AWS CLI

1. [datadog-agent-cws-ecs-fargate.json][7]을 다운로드합니다.
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

    다음 명령을 사용하여 워크로드의 엔트리 포인트를 찾을 수 있습니다.

    ```shell
    docker inspect <YOUR_APP_IMAGE> -f '{{json .Config.Entrypoint}}'
    ```

    또는

    ```shell
    docker inspect <YOUR_APP_IMAGE> -f '{{json .Config.Cmd}}'
    ```

    **참고**: 환경 변수 `ECS_FARGATE`는 이미 "true"로 설정되어 있습니다.

3. 다른 애플리케이션 컨테이너를 작업 정의에 추가합니다. 통합 메트릭 수집과 관련한 자세한 내용은 [통합 ECS Fargate 설정][8]을 참조하세요.
4. 다음 명령을 실행하여 ECS 작업 정의를 등록합니다.

{{< code-block lang="shell" collapsible="true" >}}
aws ecs register-task-definition --cli-input-json file://<PATH_TO_FILE>/datadog-agent-ecs-fargate.json
{{< /code-block >}}

#### Datadog Cloud Security
1. Datadog에서 [Cloud Security > Setup > Cloud Integrations > AWS][9]로 이동합니다.
2. Amazon ECR을 호스팅하는 AWS 계정에 [Datadog Agentless 스캐너][10]를 배포하여 Vulnerability Management를 사용 설정합니다.

[6]: /ko/integrations/eks_fargate/?tab=manual#amazon-eks-fargate-rbac
[7]: /resources/json/datadog-agent-cws-ecs-fargate.json
[8]: /ko/integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
[9]: https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=aws&vuln_container_enabled=true&vuln_host_enabled=true&vuln_lambda_enabled=true
[10]: /ko/security/cloud_security_management/setup/agentless_scanning/enable/?tab=existingawsaccount#set-up-aws-cloudformation


{{% /tab %}}

{{% tab "Amazon EKS" %}}

AWS Fargate 포드에서 데이터를 수집하려면, 반드시 애플리케이션 포드의 사이드카로 Agent를 실행하고 Role-Based Access Control(RBAC) 규칙을 설정해야 합니다.

<div class="alert alert-info">Agent가 사이드카로 실행되는 경우, 동일한 포드의 컨테이너와만 통신할 수 있습니다. 모니터링하려는 모든 포드에 Agent를 실행합니다.</div>

#### RBAC 규칙 설정

Agent를 사이드카로 배포하기 전에 다음 [Agent RBAC 배포 지침][6]을 참조하세요.

#### Agent를 사이드카로 배포하기

다음 매니페스트는 Workload Protection이 활성화된 사이드카로 Datadog Agent를 사용하여 애플리케이션을 배포하는 데 필요한 최소 설정을 나타냅니다.

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

### Agent가 이벤트를 Cloud Security로 전송하는지 확인합니다.

AWS Fargate ECS 또는 EKS에서 Cloud Security를 활성화하면 Agent는 Agent 이벤트를 Datadog으로 전송하여 기본 규칙 세트가 배포되었는지 확인합니다. Agent 이벤트를 확인하려면 Datadog에서 [Agent Events][9] 페이지로 이동하여 `@agent.rule_id:ruleset_loaded`를 검색합니다.

<div class="alert alert-info">AWS Fargate 보안 신호를 수동 트리거하여 Agent가 이벤트를 Cloud Security로 전송하는지 확인할 수도 있습니다.</div>

작업 정의에서 "워크로드" 컨테이너를 다음으로 변경합니다.

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

## App and API Protection

### 사전 필수 조건

- Datadog Agent는 애플리케이션의 운영 체제나 컨테이너, 클라우드 또는 가상 환경에 맞게 설치 및 설정됩니다.
- Datadog APM은 애플리케이션 또는 서비스에 맞게 구성됩니다

<div class="alert alert-info">성능 및 안정성 인사이트를 추가로 얻으려면 Datadog은 앱 및 API Protection으로 Application Performance Monitoring을 활성화할 것을 권장합니다.</div>

### 설치

#### 소프트웨어 구성 분석(SCA)
[Software Composition Analysis(SCA)][22]은 Fargate에서 작동합니다. [기존 호스트에서 실행되는 애플리케이션의 설치 단계][23]를 따르세요.

#### 위협 탐지 및 보호

단계별 지침을 보려면 다음 문서를 참조하세요.

- [Java][10]
- [.NET][11]
- [고(Go)][12]
- [Ruby][13]
- [Node.js][14]
- [Python][15]

#### Code Security

단계별 지침을 보려면 다음 문서를 참조하세요.

- [Java][18]
- [.NET][19]
- [Node.js][20]

## Cloud SIEM

### 사전 필수 조건

- [로그 수집][21]은 소스에서 로그를 수집하도록 설정됩니다.

### 설치

단계별 지침은 [AWS Cloud SIEM 구성 가이드][17]를 참조하세요.

#### AWS CloudTrail 로깅 활성화

{{% cloud-siem-aws-cloudtrail-enable %}}

#### Datadog에 AWS CloudTrail 로그 전송

{{% cloud-siem-aws-cloudtrail-send-logs %}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/ecs_fargate/
[2]: /ko/integrations/eks_fargate/
[3]: /ko/security/cloud_security_management/
[4]: /ko/security/application_security/
[5]: /ko/security/cloud_siem/
[6]: /ko/integrations/eks_fargate/#amazon-eks-fargate-rbac
[7]: /resources/json/datadog-agent-cws-ecs-fargate.json
[8]: /ko/integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
[9]: https://app.datadoghq.com/security/agent-events
[10]: /ko/security/application_security/setup/java/aws-fargate
[11]: /ko/security/application_security/setup/dotnet/aws-fargate
[12]: /ko/security/application_security/setup/aws/fargate
[13]: /ko/security/application_security/setup/ruby/aws-fargate
[14]: /ko/security/application_security/setup/nodejs/aws-fargate
[15]: /ko/security/application_security/setup/python/aws-fargate
[16]: /ko/security/application_security/
[17]: /ko/security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
[18]: /ko/security/code_security/iast/setup/java/
[19]: /ko/security/code_security/iast/setup/dotnet/
[20]: /ko/security/code_security/iast/setup/nodejs/
[21]: https://app.datadoghq.com/security/configuration/siem/setup
[22]: /ko/security/code_security/software_composition_analysis/
[23]: /ko/security/code_security/software_composition_analysis/