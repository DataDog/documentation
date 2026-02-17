---
description: 컨테이너 관련 문제 해결하기
further_reading:
- link: /containers/troubleshooting/duplicate_hosts
  tag: 설명서
  text: AWS에서 쿠버네티스를 사용해 호스트 복제
title: 컨테이너 트러블슈팅
---

본 페이지에서는 컨테이너 모니터에 관한 트러블슈팅 정보를 제공합니다.


다음은 Agent를 배포하는 세 가지 방법입니다.
1. [**런타임에서 컨테이너**][1]로 배포

2. [Amazon ECS][2], [Amazon ECS 환경 Fargate][3], 또는 [Amazon EKS][4] 같은 **클라우드 환경**에서 배포

3. [Kubernetes 환경][16]에서 배포

이러한 다양한 메서드에는 고유한 배포 문제가 있습니다. 본 페이지를 시작점으로 삼아 문제를 해결하세요. 계속해서 문제가 발생한다면 [Datadog 지원][6]에 문의하여 추가 지원을 받으세요.

Agent 릴리스 업데이트 또는 변경 사항에 대한 자세한 내용은 Datadog [릴리스 노트][7]를 참조하세요.

## 일반 문제

### 환경 변수가 설정되지 않고, 태그도 삽입되지 않음

[환경 변수][8]를 삽입하거나 DogStatsD 라이브러리를 구성하는 유용한 방법은 Cluster Agent에서 [Admission Controller][9] 기능을 구현하는 것입니다. **참고**: 애플리케이션을 배포하기 전에 Cluster Agent를 배포 및 실행해야 합니다.

### 메트릭이 Datadog Web Platform에 표시되지 않음

다음 사항이 사실인지 확인합니다.

- 메트릭 엔드포인트가 노출되어 있으며 Agent에 도달할 수 있도록 열려 있습니다.

- Agent가 엔드포인트에 액세스하는 것을 방해할 수도 있는 프록시나 방화벽이 없습니다.

- Agent의 [Autodiscovery][10]가 활성화되어 있습니다.


### 로그가 수집되지 않음

로그 수집 여부와 어떤 컨테이너에서 수집하는지에 영향을 미칠 수 있는 두 가지 [환경 변수][8]가 있습니다.

- `DD_LOGS_ENABLED`를 `true`로 설정하여 로그를 수집합니다. 
- 아울러, `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL`을 `true`로 설정하여 모든 컨테이너의 모든 로그를 수집합니다.

수집에서 로그(및 기타 기능)를 제외하려면 [Container Discovery Management 가이드][11]를 참조하세요.

### Kubelet에 연결할 수 없음

Kubelet API 연결을 방해하는 가장 일반적인 오류는 Kubelet TLS 인증서 확인입니다.

TLS 인증은 기본적으로 활성화되어 있으며, Agent가 HTTPS를 통해 Kubelet API에 연결하지 못하도록 방해할 수도 있습니다. 전용 파라미터를 사용하거나 Agent 매니페스트의 모든 컨테이너에  `DD_KUBELET_TLS_VERIFY` 변수를 설정하여 TLS 인증을 비활성화할 수 있습니다.

 - `TLS_VERIFY`를 `false`로 설정합니다.

### HPA 메트릭이 표시되지 않거나 예상 값과 일치하지 않음

먼저, Agent 클러스터가 배포되었고 노드 Agent로 데이터를 전송할 수 있는지 확인합니다.

그런 다음, Metrics Summary에서 외부 메트릭을 확장하는 데 사용된 쿼리를 검토합니다. 유효한 쿼리만 자동 확장됩니다. 쿼리가 여러 개 있는 경우, 쿼리 중 **아무것도** 유효하지 않으면 **모든** 쿼리는 무시됩니다.

HPA 메트릭에 대한 추가 지원이 필요하다면 [Datadog 지원][6]에 다음 사항을 알려주세요.
  - HPA 매니페스트의 `describe` 출력
      ```
      $ kubectl describe hpa > hpa.log
      ```
  - DatadogMetric Custom Resource Definition의 `describe` 출력
      ```
      $ kubectl describe DatadogMetric > DatadogMetric.log
      ```


## 런타임

 로그의 경우 Agent 배포 명령에 `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` 및 `DD_LOGS_ENABLED`가  활성화되어 있는지 확인합니다.

## 클라우드

IAM 정책이 업데이트되었는지 확인합니다.

### Fargate에서 로그가 수집되지 않음

  - [ECS][12]: 로그를 수집할 컨테이너에 로그 라우터가 연결되어 있는지 확인합니다.

  - [EKS][13]: EKS Fargate 환경에서 Agent가 로그를 수집하는 일반적인 방법 두 가지가 있습니다. CloudWatch 로그를 포워딩하는 방법과, [Amazon Data Firehose][14]를 통해 로그를 포워딩하는 방법입니다. Amazon Data Firehose를 사용하여 로그를 수집하려면 Amazon Data Firehose 전송 스트림 구현과 일부 명령줄 도구가 필요합니다.


## 쿠버네티스(Kubernetes)

### 메트릭을 배포 또는 수집하지 않는 컨테이너

먼저, API 키가 유효한지 확인합니다.

그런 다음, 노드 Agent 포드에서 `agent status` 명령을 실행하고 결과를 검토합니다.

### `kubeapi_server`, `kube_controller_manager` 또는 `etcd` 메트릭을 받지 못함

Azure Kubernetes Service(AKS) 및 Google Kubernetes Engine(GKE)과 같은 관리형 서비스에서는 사용자가 컨트롤 플레인 컴포넌트에 액세스할 수 없습니다. 따라서, 이러한 환경에서는 `kube_apiserver`, `kube_controller_manager`, `kube_scheduler` 또는 `etcd` 검사를 실행할 수 없습니다.

## ECS Fargate

### Windows Agent 서비스 시작 중 타임아웃

```text
[ENTRYPOINT][ERROR] Could not start the service: The service did not respond to the start or control request in a timely fashion.
. Error: [1053 (0x41d)]
```

이러한 오류를 방지하려면, Datadog Agent의 **CPU 유닛** 예약을 최소 `512`로 설정했는지 확인합니다.

# Datadog 지원 팀에서 요청하는 트러블슈팅 데이터

지원 티켓을 생성하면 다음과 같은 유형의 정보를 요청받을 수 있습니다.

### Agent Flare 

[`flare`][15] 명령으로 Datadog 지원 팀에 트러블슈팅 정보를 보낼 수 있습니다.

**Node Agent Flare**

```
$ kubectl exec <AGENT_POD_NAME> -it agent flare <CASE_ID> 
```

**Cluster Agent Flare**

```
$ kubectl exec <CLUSTER_AGENT_POD_NAME> -it agent flare <CASE_ID>
```


### Describe 포드 출력

이를 통해 팀은 노드 또는Cluster Agent가 배포된 방법, 포드의 가장 최근 이벤트, 일부 특성(예: 사용자 정의 태그)이 삽입되고 호스트 메트릭에 적용되었는지에 대한 인사이트를 얻을 수 있습니다. 명령의 `> <FILENAME>.yaml` 섹션은 Datadog 지원 팀에 첨부 파일로 보낼 수 있는 파일 출력을 생성합니다.

```
$ kubectl describe pod <POD_NAME> > <FILENAME>.yaml
```

### Manifest/deployment 

본 파일은 사용자 환경에 Agent를 배포하는 데 사용됩니다. 해당 파일은 구성한 태그, 로그 활성화 여부, 특정 컨테이너가 무시되도록 정의되였는지 여부 등을 Datadog에 알려줍니다.

런타임 환경에서 Agent를 배포하는 경우, Agent를 배포하는 데 사용된 명령줄을 지원 팀에 보냅니다.

가장 일반적인 배포 메서드는 Helm Chart, DaemonSet, Operator 세 가지입니다.

### cURL 출력

누락되거나 부정확한 메트릭이 있다면 Datadog 지원 팀이 메트릭 엔드포인트에 도달하는 노드 Agent의 cURL 출력을 요청할 수 있습니다. 해당 작업은 Agent 컨테이너 내에서 명령을 실행하여 진행하며, Agent가 메트릭에 액세스할 수 있는 경우 지원팀에 알립니다. **참고**: Fargate 또는 관리형 서비스에서는 이 작업이 불가능합니다. 

```
$ kubectl exec -it <AGENT_POD_NAME> curl -k -v ""<METRIC_ENDPOINT>""
```

```
$ docker exec -it <AGENT_CONTAINER_ID> curl -k -v "<METRIC_ENDPOINT>"
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/containers/docker/?tab=standard
[2]: https://docs.datadoghq.com/ko/containers/amazon_ecs/?tab=awscli
[3]: https://docs.datadoghq.com/ko/integrations/ecs_fargate/?tab=webui#
[4]: https://docs.datadoghq.com/ko/integrations/eks_fargate
[5]: https://docs.datadoghq.com/ko/containers/kubernetes/
[6]: https://docs.datadoghq.com/ko/help/
[7]: https://app.datadoghq.com/release-notes
[8]: https://docs.datadoghq.com/ko/agent/guide/environment-variables/#overview
[9]: https://docs.datadoghq.com/ko/containers/cluster_agent/admission_controller/?tab=operator
[10]: https://docs.datadoghq.com/ko/getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[11]: https://docs.datadoghq.com/ko/agent/guide/autodiscovery-management/?tab=containerizedagent
[12]: https://docs.datadoghq.com/ko/integrations/ecs_fargate/?tab=webui#log-collection
[13]: https://docs.datadoghq.com/ko/integrations/eks_fargate/#log-collection
[14]: https://docs.datadoghq.com/ko/logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/#overview
[15]: https://docs.datadoghq.com/ko/agent/troubleshooting/send_a_flare
[16]: https://docs.datadoghq.com/ko/containers/kubernetes/installation/?tab=operator