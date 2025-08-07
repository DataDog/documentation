---
aliases:
- /ko/observability_pipelines/architecture/preventing_data_loss/
title: (레거시) 데이터 손실 방지
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines는 US1-FED Datadog 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

<div class="alert alert-info">
본 지침은 대규모 프로덕션 수준 배포용입니다.
</div>

## 높은 내구성

내구성이 높다는 것은 시스템 장애가 발생했을 때 데이터를 유지할 수 있는 능력이 좋다는 뜻입니다. Aggregator 아키텍처는 높은 내구성을 보장하도록 설계되었습니다. 이를 통해 에이전트의 부하를 줄이고 Aggregator에 집중하여 내구성 전략을 단순화할 수 있습니다. 또한, 이러한 집중화된 접근 방식을 통해 모든 에이전트 노드에서 구현하기 어려운 내구성 전략을 실행할 수 있습니다.

{{< img src="observability_pipelines/production_deployment_overview/high_durability.png" alt="복제된 블록 스토리지로 데이터를 전송하는 Observability Pipelines Worker를 보여주는 다이어그램" style="width:100%;" >}} >}}

내구성을 높이는 방법:

1. 에이전트를 단순한 데이터 전달자 역할로 설정하고 스트림 데이터를 Observability Pipelines Worker Aggregator로 직접 전달할 수 있습니다. 이렇게 하면 데이터가 아직 중복되지 않기 때문에 마지막에 데이터가 손실에 노출되는 시간을 줄일 수 있습니다.

2. 기록 시스템 역할을 하는 내구성이 뛰어난 대상(예: Amazon S3)을 선택합니다. 이러한 시스템은 저장된 데이터의 내구성을 책임지며 일반적으로 아카이브 또는 데이터 레이크로 명명됩니다.

마지막으로, Observability Pipelines Worker sink를 설정하여 시스템 레코드를 작성하고 [엔드 투 엔드 확인](#using-end-to-end-acknowledgment)과 디스크 버퍼를 활성화합니다. 예를 들어 다음과 같이 설정할 수 있습니다.

```
sinks:
    aws_s3:
        acknowledgments: true
        buffer:
            type: "disk"
```

## 데이터 손실 방지 가이드라인

### 엔드 투 엔드 확인 사용

Observability Pipelines Worker 운영 체제 프로세스에 문제가 생기면 문제가 있는 동안 메모리 데이터에 손실이 발생할 수 있습니다. Observability Pipelines Worker의 엔드 투 엔드 확인 기능을 활성화하면 데이터 손실 위험을 줄일 수 있습니다.

```
sinks:
    aws_s3:
        acknowledgments: true
```

이 기능을 활성화하면 데이터가 영구적으로 유지될 때까지 Observability Pipelines Worker가 에이전트에 응답하지 않습니다. 이렇게 하면 에이전트가 확인을 받지 않은 상태에서 데이터가 너무 빨리 전송되고 나중에 다시 전송되는 것을 막을 수 있습니다.

{{< img src="observability_pipelines/production_deployment_overview/end_to_end_acknowledgments.png" alt="Observability Pipelines Worker의 소스에서 클라이언트로 다시 전송된 확인을 보여주는 다이어그램" style="width:100%;">}} 

### 노드 장애 처리

노드 장애는 개별 노드의 전체 장애를 의미합니다. 이러한 장애는 엔드 투 엔드 확인을 사용하여 해결할 수도 있습니다. 자세한 내용은 [엔드 투 엔드 확인 사용](#using-end-to-end-acknowledgment)을 참조하세요.

### 디스크 장애 처리

디스크 장애는 개별 디스크의 장애를 뜻합니다. 블록 스토리지(예: Amazon EBS)와 같이 여러 디스크에 데이터가 복제되는 내구성이 뛰어난 파일 시스템을 사용하면 디스크 장애로 인한 데이터 손실을 완화할 수 있습니다.

### 데이터 프로세싱 실패 처리

잘못된 형식의 데이터를 처리하는 경우 Observability Pipelines Worker에 로그 파싱 실패 등 문제가 발생할 수 있습니다. 이러한 문제를 방지하는 두 가지 방법이 있습니다.

1. **직접 아카이빙**: 소스에서 아카이브로 직접 데이터를 라우팅하세요. 이렇게 하면 데이터가 삭제될 위험 없이 아카이브에 저장됩니다. 또한 이 데이터는 프로세싱 오류를 수정한 후 리플레이할 수 있습니다.

2. **실패한 이벤트 라우팅**: Observability Pipelines Worker는 구조화된 데이터나 보강된 데이터와 같이 프로세싱된 데이터를 아카이브하려는 사용자를 위해 실패한 이벤트를 라우팅하는 기능을 제공합니다. 특정 Observability Pipelines Worker 변환에는 삭제된 출력이 함께 제공되어 내구성과 리플레이를 위해 싱크에 연결할 수 있습니다.

#### 어떤 전략이 가장 좋을까요?

내구성이 가장 중요한 기준이라면 데이터 손실 시나리오에 대응하는 직접 아카이빙 방법을 사용하세요. 아카이브에서 데이터를 분석하려면 실패한 이벤트 라우팅 방법(일반적으로 데이터 레이크라고 함)을 사용하세요. 이 방법은 아카이브/데이터 레이크를 장기 분석에 사용할 수 있다는 장점이 있습니다. Datadog [로그 아카이브][1] 및 Amazon Athena가 아카이브 스토리지 솔루션의 예입니다.

### 대상 장애 처리

대상 장애는 다운스트림 대상(예: Elasticsearch)의 전체 장애를 의미합니다. 다운스트림 대상의 문제는 중단 시간을 견딜 수 있을 만큼 큰 디스크 버퍼를 사용하여 데이터 손실을 완화할 수 있습니다. 이렇게 하면 서비스 사이트가 다운되는 동안 데이터를 버퍼링했다가 서비스 사이트가 다시 가동되면 데이터를 삭제할 수 있습니다. 이러한 이유로 최소 1시간 분량의 데이터를 저장할 수 있을 만큼 큰 디스크 버퍼가 권장됩니다. 자세한 내용은 [인스턴스 최적화][2]를 참조하세요.

[1]: /ko/logs/log_configuration/archives
[2]: /ko/observability_pipelines/legacy/architecture/optimize