---
description: 컨테이너 관련 문제 해결
further_reading:
- link: /containers/troubleshooting/duplicate_hosts
  tag: 문서
  text: AWS(EC2 또는 EKS)의 Kubernetes에서 중복된 호스트 발생
title: 컨테이너 문제 해결
---
이 페이지에서는 컨테이너 모니터링을 위한 문제 해결 정보를 제공합니다.


Agent는 다음 3가지 방법으로 배포합니다.
1. [**런타임의 컨테이너**][1]로 배포 

2. [Amazon ECS][2], [Amazon ECS 환경의 Fargate][3] 또는 [Amazon EKS][4]와 같은 **클라우드 환경**에서 배포

3. [Kubernetes 환경][16]에서 배포

이러한 각 방법은 고유한 배포 문제를 야기합니다. 이 페이지를 문제 해결의 시작점으로 활용할 수 있습니다. 문제가 계속되면 [Datadog 지원팀][6]에 문의하여 추가 지원을 받으세요. 

Agent 릴리스 업데이트나 변경 사항에 대한 자세한 내용은 Datadog [릴리스 정보][7]를 참조하세요.

## 일반적인 문제 {#general-issues}

### 환경 변수가 설정되지 않고 태그가 주입되지 않음 {#environment-variables-are-not-being-set-and-tags-are-not-injected}

[환경 변수][8]를 주입하거나 DogStatsD 라이브러리를 구성하는 유용한 방법은 Cluster Agent에서 [Admission Controller][9] 기능을 구현하는 것입니다. **참고**: Cluster Agent는 애플리케이션이 배포되기 _전에_ 배포되어 실행 중이어야 합니다.

### Datadog 웹 플랫폼에 메트릭이 표시되지 않음 {#metrics-are-not-appearing-on-the-datadog-web-platform}

다음 사항을 충족하는지 확인하세요.

- 메트릭 엔드포인트가 노출되어 있고 Agent가 접근할 수 있도록 열려 있어야 합니다.

- Agent가 엔드포인트에 접근하는 것을 방해할 수 있는 프록시나 방화벽이 없어야 합니다. 

- Agent에서 [Autodiscovery][10]가 활성화되어 있어야 합니다.


### 로그가 수집되지 않음 {#logs-are-not-collected}

로그 수집 여부와 어떤 컨테이너에서 수집할지에 영향을 줄 수 있는 2가지 [환경 변수][8]가 있습니다.

- `DD_LOGS_ENABLED`를 `true`로 설정하여 로그를 수집합니다. 
- 또한 `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL`을 `true`로 설정하여 모든 컨테이너의 로그를 수집합니다.

수집에서 로그(및 기타 기능)를 제외하려면 [컨테이너 검색 관리 가이드][11]를 참조하세요.

### Kubelet에 연결할 수 없음 {#cannot-connect-to-the-kubelet}

Kubelet API 연결을 방해하는 가장 일반적인 오류는 Kubelet TLS 인증서 확인입니다.

TLS 확인은 기본적으로 활성화되어 있으며, 이로 인해 Agent가 HTTPS를 통해 Kubelet API에 연결하지 못할 수 있습니다. 전용 파라미터를 사용하거나 Agent 매니페스트의 모든 컨테이너에 대해 `DD_KUBELET_TLS_VERIFY` 변수를 설정하여 TLS 확인을 비활성화할 수 있습니다.

 - `TLS_VERIFY`를 `false`로 설정합니다.

### HPA 메트릭이 표시되지 않거나 예상 값과 일치하지 않음 {#hpa-metrics-are-not-appearing-or-are-not-aligning-with-the-expected-value}

먼저 Cluster Agent가 배포되어 있고 노드 Agent로 데이터를 보낼 수 있는지 확인합니다.

그런 다음 Metrics Catalog에서 외부 메트릭을 사용한 확장에 쓰이는 쿼리를 검토합니다. 유효한 쿼리만 자동 확장에 사용됩니다. 쿼리가 여러 개인 경우 쿼리 중 **하나라도** 유효하지 않으면 **모든** 쿼리가 무시됩니다.

HPA 메트릭에 대한 추가 지원이 필요한 경우 [Datadog 지원팀][6]에 다음 정보를 제공하세요.
  - HPA 매니페스트의 `describe` 출력:
      ```
      $ kubectl describe hpa > hpa.log
      ```
  - DatadogMetric 사용자 지정 리소스 정의의 `describe` 출력:
      ```
      $ kubectl describe DatadogMetric > DatadogMetric.log
      ```


## 런타임 {#runtime}

 로그의 경우 Agent 배포 명령에서 `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` 및 `DD_LOGS_ENABLED`가 활성화되어 있는지 확인하세요.

## Cloud {#cloud}

IAM 정책이 업데이트되었는지 확인하세요.

### Fargate에서 로그가 수집되지 않음 {#logs-are-not-collected-in-fargate}

  - [ECS][12]: 로그를 수집하려는 컨테이너에 로그 라우터가 연결되어 있는지 확인합니다.

  - [EKS][13]: EKS Fargate 환경에서 Agent가 로그를 수집하는 일반적인 방법에는 CloudWatch 로그를 사용한 로그 포워딩과 [Amazon Data Firehose][14]를 통한 로그 포워딩, 이렇게 2가지가 있습니다. Amazon Data Firehose를 사용하여 로그를 수집하려면 Amazon Data Firehose 전송 스트림을 성공적으로 구현해야 하며, 일부 명령줄 도구도 필요합니다. 
 

## Kubernetes {#kubernetes}

### 컨테이너가 배포되지 않거나 메트릭이 수집되지 않음 {#container-not-deploying-or-collecting-metrics}

먼저 API 키가 유효한지 확인합니다.

그런 다음, 노드 Agent 포드에서 `agent status` 명령을 실행하고 결과를 검토합니다.

### `kubeapi_server`, `kube_controller_manager` 또는 `etcd` 메트릭을 가져오지 못함 {#not-getting-kubeapi-server-kube-controller-manager-or-etcd-metrics}

AKS(Azure Kubernetes Service) 및 GKE(Google Kubernetes Engine)와 같은 관리형 서비스에서는 사용자가 컨트롤 플레인 구성 요소에 액세스할 수 없습니다. 결과적으로 이러한 환경에서는 `kube_apiserver`, `kube_controller_manager`, `kube_scheduler` 또는 `etcd` 검사를 실행할 수 없습니다.

## ECS Fargate {#ecs-fargate}

### Windows Agent 서비스 시작 중 시간 초과 발생 {#windows-agent-times-out-while-starting-service}

```text
[ENTRYPOINT][ERROR] Could not start the service: The service did not respond to the start or control request in a timely fashion.
. Error: [1053 (0x41d)]
```

이 오류를 방지하려면 Datadog Agent에 대해 최소 `512`의 **CPU 단위** 예약을 설정했는지 확인하세요.

# Datadog 지원팀에서 요청한 문제 해결 데이터 {#troubleshooting-data-requested-by-datadog-support}

지원 티켓을 연 후 다음 유형의 정보를 요청받을 수 있습니다.

### Agent Flare {#agent-flare}

[`flare`][15] 명령을 사용하여 문제 해결 정보를 Datadog 지원팀에 보낼 수 있습니다.

**Node Agent flare**

```
$ kubectl exec <AGENT_POD_NAME> -it agent flare <CASE_ID> 
```

**Cluster Agent flare**

```
$ kubectl exec <CLUSTER_AGENT_POD_NAME> -it agent flare <CASE_ID>
```
 

### 포드 설명 출력 {#describe-pod-output}

Node Agent 또는 Cluster Agent가 배포된 방식, 포드에 대한 가장 최근 이벤트, 일부 속성(예: 사용자 지정 태그)이 주입되어 호스트 메트릭에 적용되었는지에 대한 정보를 팀에 제공합니다. 명령의 `> <FILENAME>.yaml` 섹션은 Datadog 지원팀에 첨부 파일로 보낼 수 있는 파일 출력을 생성합니다. 

```
$ kubectl describe pod <POD_NAME> > <FILENAME>.yaml
```

### 매니페스트/배포 {#manifestdeployment}

이는 환경에 Agent를 배포하는 데 사용되는 파일입니다. 이 파일은 구성된 태그, 로그 활성화 여부, 특정 컨테이너가 무시되도록 정의되었는지 여부를 Datadog에 알립니다. 

런타임 환경에 Agent를 배포하는 경우 Agent 배포에 사용된 명령줄을 지원팀에 보내세요.

가장 일반적인 3가지 배포 방법은 Helm 차트, DaemonSet, Operator입니다.

### cURL 출력 {#curl-output}

메트릭이 누락되거나 부정확한 경우 Datadog 지원팀에서 메트릭 엔드포인트에 도달하려는 노드 Agent의 cURL 출력 결과를 요청할 수 있습니다. 이는 Agent 컨테이너 내부에서 명령을 실행하여 수행하며, Agent가 메트릭에 액세스할 수 있는지 지원팀에 알릴 수 있습니다. **참고**: Fargate 또는 관리형 서비스에서는 불가능합니다. 

```
$ kubectl exec -it <AGENT_POD_NAME> curl -k -v ""<METRIC_ENDPOINT>""
```

```
$ docker exec -it <AGENT_CONTAINER_ID> curl -k -v "<METRIC_ENDPOINT>"
```

## 추가 자료 {#further-reading}

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