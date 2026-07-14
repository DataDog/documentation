---
description: Datadog AWS 통합 트러블슈팅 단계
further_reading:
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: 통합
  text: AWS통합
title: AWS 통합 트러블슈팅
---

## 개요

본 지침을 활용하여 Datadog [AWS 통합][1] 관련 문제를 해결하세요.

## IAM 권한 오류

### Datadog이 sts:AssumeRole 작업을 수행할 권한이 없음

`sts:Assumerole` 권한 오류는 `DatadogAWSIntegrationRole`와 관련된 신뢰 정책에 문제가 있음을 시사합니다. 본 문제를 해결하는 방법을 확인하려면 [오류: Datadog이 sts:AssumeRole 작업을 수행할 권한이 없음][2] 문서를 참조하세요.

**참고**: 해당 오류는 변경 사항이 전파되는 동안 Datadog UI에서 몇 시간 정도 지속될 수도 있습니다.

## 데이터 불일치

### 클라우드와치(CloudWatch)와 Datadog 간의 데이터 불일치성

숙지해야 할 두 가지 중요한 차이점이 있습니다.

1. Datadog은 AWS에서 선택한 시간 프레임에 관계 없이 AWS 원시 데이터를 초당 값으로 표시합니다. 그러므로 Datadog 값이 더 낮게 표시될 수도 있습니다.

2. `min`, `max`, `avg`은 AWS에서 Datadog과는 다른 의미를 갖습니다. AWS에서, 평균 레이턴시, 최소 레이턴시, 최대 레이턴시는 AWS가 수집하는 별개의 세 가지 메트릭입니다. Datadog가 AWS 클라우드와치(CloudWatch)에서 메트릭을 불러올 때, 평균 레이턴시는 엘라스틱 로드 밸런서(Elastic Load Balancer)당 단일 시계열로 수신됩니다. Datadog 내에서 `min`, `max`, 또는 `avg`을 선택할 경우, 여러 시계열이 통합되는 방식을 제어하게 됩니다. 예를 들어, 필터 없이 `system.cpu.idle`을 요청하면 메트릭을 보고하는 각 호스팅당 시계열 하나가 반환되며, 이러한 시계열을 결합하여 그래프로 표시할 수 있습니다. 단일 호스팅에서 `system.cpu.idle`을 요청한 경우, 집계 작업이 불필요하며 평균과 최대값 사이를 전환해도 동일한 결과를 얻습니다.

## 메트릭

### 메트릭 지연

AWS 통합을 사용하면 Datadog은 클라우드와치(CloudWatch) API를 통해 메트릭을 불러옵니다. API의 제약 조건으로 인해 AWS에서 메트릭 불러오기가 약간 지연될 수도 있습니다.

클라우드와치(CloudWatch) API는 메트릭-바이-메트릭 데이터 크롤링 방식만 제공합니다. 클라우드와치(CloudWatch) API의 경우 인증 자격 증명, 지역 및 서비스의 조합에 따라 속도 제한이 있으며, 해당 메트릭은 AWS에서 계정 레벨에 따라 사용할 수 있습니다. 예를 들어, AWS에서 "상세 메트릭"를 결제하는 경우 더 빠르게 이용할 수 있습니다. 상기 상세 메트릭 서비스 수준은 세분성에도 적용되며 일부 메트릭은 1분, 기타 메트릭은 5분당 사용할 수 있습니다.

메트릭 지연을 방지하려면 호스트에 Datadog 에이전트를 설치하세요. 설치를 시작하려면 [Datadog 에이전트 문서][3]를 참조하세요. Datadog은 상황에 따라 계정 내 특정 메트릭에 우선순위를 지정하여 더 빠르게 불러올 수 있는 기능을 제공해 드립니다. 자세한 내용은 [Datadog 지원 팀][4]에 문의하세요.

### 누락 메트릭

클라우드와치(CloudWatch)의 API는 데이터 포인트와 함께 메트릭만 반환하므로, 예를 들어 ELB에 연결된 인스턴스가 존재하지 않는 경우 Datadog에서 해당 ELB와 연관된 메트릭을 확인할 수 없습니다.

### aws.elb.healthy_host_count의 잘못된 카운트

ELB에서 크로스존 로드 밸런싱 옵션이 활성화되면, 해당 ELB에 연결된 모든 인스턴스는 모든 가용성 영역(클라우드와치(CloudWatch) 측)의 일부로 간주됩니다. 예를 들어, `1a`에 인스턴스가 2개가 있고 `ab`에 인스턴스 3개가 있다면, 메트릭 에는 가용 영역당 인스턴스 5개가 표시됩니다.
이는 직관적으로 반대일 수 있으므로, 메트릭 **aws.elb.healthy_host_count_deduped** 및 **aws.elb.un_healthy_host_count_deduped**은 본 크로스존 로드 밸런싱 옵션의 활성화 여부와 관계없이 가용 영역당 정상 및 비정상 인스턴스 카운트를 표시합니다.

## Datadog 앱

### 에이전트 설치 시 복제한 호스트

AWS 호스트에 에이전트 설치 시, 에이전트 설정에서 호스트 이름을 수동으로 설정하면 몇 시간 동안 Datadog 인프라스트럭처 페이지에 복제된 호스트로 표시될 수 있습니다. 복제된 호스트는 몇 시간 후 사라지며 청구 금액에 반영되지 않습니다.

## Datadog 에이전트

### IMDS v2를 사용하는 EC2 메타데이터

경우에 따라 EC2 [IMDSv2][5]의 설정이 에이전트가 해당 메타데이터에 접근할 수 없게 하여 `agent status` 출력값에서 확인할 수 있듯, 호스트 이름 공급자가 `aws`가 아닌 `os`로 롤백되게 됩니다.

컨테이너화된 환경에서 쿠버네티스(Kubernetes) 클러스터 에서 실행 중인 팟에 IAM 역할/자격 증명을 할당하는 방식으로 EC2 메타데이터 엔드포인트를 제한한 것이 문제일 수도 있습니다. `Kube2IAM` 와 `kiam`는 본 작업을 수행하는 데 사용되는 일반적인 툴입니다. 본 문제를 해결하려면 `Kube2IAM` 또는 `kiam` 설정을 업데이트하여 해당 엔드포인트에 대한 접근을 허용하세요.

AWS API는 에이전트에서 기본값으로 사용하는 IMDSv1 비활성을 지원합니다. 이러한 경우 IMDSv2가 활성화되어 있고 접근할 수 있다면 [에이전트 설정][6]에서 파라미터 `ec2_prefer_imdsv2`를 `true`(기본값: `false`)로 설정하세요. 자세한 내용을 확인하려면 [인스턴스 메타데이터 서비스 버전 2를 사용하여 전환하기][7] 문서를 참조하세요.

기본 설정에서 IMDSv2는 IP 홉(hop) 카운트가 1보다 큰 연결, 즉 IP 게이트웨이를 통과한 연결을 거부합니다. 런타임이 가상 IP 게이트웨이를 통해 컨테이너 트래픽을 전달하기 때문에, 호스의 네트워크가 아닌 네트워크의 컨테이너에서 에이전트가 실행되는 경우 해당 문제가 발생할 수 있습니다. ECS 배포에서 흔히 발생하는 문제입니다. 다음 옵션으로 이 문제를 해결할 수 있습니다.

 * [최대 홉(hop) 카운트를 최소 `2`][8] 이상으로 늘립니다. 이렇게 하면 에이전트 외부 컨테이너도 해당 데이터에 접근할 수 있으므로 IMDS에 저장된 데이터의 보안에 영향을 미칠 수 있습니다.
 * [`providers.eks.ec2.useHostnameFromFile`을 true로 설정][9]하여 클라우드 초기화로 검색된 호스트 이름을 사용합니다.
 * [`agents.useHostNetwork`를 true로 설정][10]하여 호스트 UTS 네임스페이스에서 에이전트를 실행합니다.

## 태그

### Amazon EC2 통합을 삭제한 후에도 호스트에 여전히 AWS 태그가 있음

AWS 통합 기능을 활용하여 클라우드와치(CloudWatch)에서 데이터를 수집하거나 Datadog 에이전트를 각 EC2 인스턴스에 직접 설치하여 데이터를 불러오고 태깅할 수 있습니다. 두 가지 방법을 모두 사용하여 데이터를 수집하는 경우, Datadog 백엔드는 통합과 Datadog 에이전트 데이터를 모두 단일 호스트 오브젝트로 병합합니다.

AWS 통합을 삭제하였지만 EC2 인스턴스에서 Datadog 에이전트를 계속 실행하는 경우, Datadog 계정 호스트에는 AWS가 기존에 수집한 관련 호스트-태그가 계속 태깅되어 있습니다. 이는 의도된 동작이며, AWS 통합 또는 Amazon EC2 통합 기능이 여전히 활성화되어 있는 것은 아닙니다.

인프라스트럭처 목록에서 해당 호스트의 '실행 중 앱'을 확인하거나 메트릭 요약을 확인하고 해당 호스팅으로 범위를 한정한 노트북을 생성하여 통합 기능이 활성화되었는지 확인할 수 있습니다.

호스트에서 AWS 호스트 태그를 영구 제거하려면 [API 엔드포인트 호스트 태그 제거][11] 기능을 사용합니다.

[1]: /ko/integrations/amazon_web_services/
[2]: /ko/integrations/guide/error-datadog-not-authorized-sts-assume-role/#pagetitle
[3]: /ko/agent/
[4]: /ko/help/
[5]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[7]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html#instance-metadata-transition-to-version-2
[8]: https://docs.aws.amazon.com/cli/latest/reference/ec2/modify-instance-metadata-options.html
[9]: https://github.com/DataDog/helm-charts/blob/58bf52e4e342c79dbec95659458f7de8c5de7e6c/charts/datadog/values.yaml#L1683-L1688
[10]: https://github.com/DataDog/helm-charts/blob/58bf52e4e342c79dbec95659458f7de8c5de7e6c/charts/datadog/values.yaml#L930-L937
[11]: /ko/api/latest/tags/#remove-host-tags