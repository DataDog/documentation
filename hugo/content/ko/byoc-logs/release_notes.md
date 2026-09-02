---
description: datadog/cloudprem Helm 차트에 번들로 제공되는 BYOC Logs 바이너리에 대한 버전별 변경 사항입니다.
disable_toc: false
further_reading:
- link: /byoc-logs/operate/updates/
  tag: 설명서
  text: BYOC Logs 업데이트 계획
- link: /byoc-logs/install/
  tag: 설명서
  text: BYOC Logs 설치
- link: /byoc-logs/operate/troubleshooting/
  tag: 설명서
  text: BYOC Logs 문제 해결
title: BYOC Logs 릴리스 노트
---
## 개요 {#overview}

이 페이지는 Docker 이미지로 배포되고 `datadog/cloudprem` Helm 차트에 번들로 제공되는 **BYOC(Bring Your Own Cloud) Logs 바이너리**의 릴리스를 추적합니다. 새로운 기능과 수정 사항은 바이너리로 제공되며, 차트는 배포를 위해 이를 패키징합니다.

### 설치된 바이너리 버전 확인 {#check-your-installed-binary-version}

BYOC Logs 포드에서 `image` 필드를 확인하세요.

```shell
kubectl get pods -n <BYOC_LOGS_NAMESPACE> \
  -o jsonpath='{range .items[*]}{.spec.containers[*].image}{"\n"}{end}' \
  | sort -u
```

이미지 태그(예: `:v0.1.26`)가 바이너리 버전입니다. Helm 차트에 번들로 포함된 바이너리 버전을 확인하려면 다음을 실행하세요.

```shell
helm show chart datadog/cloudprem --version <CHART_VERSION> | grep appVersion
```

### 업그레이드 {#upgrade}

바이너리 업그레이드는 Helm 차트를 통해 제공됩니다. 사용 중인 플랫폼의 차트 업그레이드 명령은 [BYOC Logs 설치](/byoc-logs/install/)를 참조하세요.

## 릴리스 {#releases}

### v0.1.33 — 2026-08-18 {#v0133-2026-08-18}

*차트에 번들로 포함됨: `0.5.2`.*
*Observability Pipelines Worker로 검증됨: `2.20.x`.*

#### 변경 {#changed}
- 유사한 로그를 그룹화하고 스토리지 사용량을 10~20% 줄이기 위해 문서 클러스터링을 추가합니다. 문서 클러스터링을 비활성화하려면 `QW_DISABLE_DOCS_CLUSTERING=true`를 설정하세요.
- 플랫 속성 그룹화 쿼리에 대한 지원을 추가합니다.
- 시스템 리소스 사용량, 서비스 종료, S3 PUT 실패, WAL 사용량, 메타스토어 용량 및 분할 검색 결과에 대한 운영 메트릭을 추가합니다.

#### Helm 차트 변경 {#helm-chart-changes}
- **주요 변경 사항**: `medium` 포드 크기를 제거합니다. `indexer.podSize` 및 `searcher.podSize`는 `large`, `xlarge`, `2xlarge`, `4xlarge`, `6xlarge`, `8xlarge`를 허용합니다.
- 노드 예약 및 애드온을 고려하여 포드 크기 CPU 및 메모리 요청과 제한을 조정합니다. 이에 따라 캐시, 수집 대기열 및 동시 분할 검색의 크기를 조정합니다.
- `config.docs_clustering`을 사용하여 기본적으로 문서 클러스터링을 활성화합니다.
- 인덱서 및 독립형 컴팩터 서비스 종료 제한 시간을 각 워크로드 `terminationGracePeriodSeconds`의 90%로 설정합니다.
- 기본 메타스토어 `PodDisruptionBudget` 및 글로벌 DNS `ndots: 1` 설정을 추가합니다.
- 인덱서 HPA CPU 목표를 70%로 낮추고 스케일업 안정화 기간을 제거하여 부하 발생 시 인덱서가 확장되도록 합니다.

### v0.1.32 — 2026-07-21 {#v0132-2026-07-21}

*차트에 번들로 포함됨: `0.4.6`.*
*Observability Pipelines Worker로 검증됨: `2.20.0`(`datadog/observability-pipelines-worker` Helm 차트 `2.20.0`).*

#### 변경 {#changed-1}
- 검색 및 분석 읽기 경로에 대한 옵트인 PostgreSQL 메타스토어 읽기 복제본 지원을 추가합니다.
- 인덱서 노드 외부에서 병합 작업을 실행하기 위한 옵트인 독립형 컴팩터 서비스를 추가합니다.
- S3 클라이언트에 대한 DNS 확인을 캐싱하여 S3 DNS 조회 변동을 줄입니다.
- 액터 재시작 및 메타스토어 과부하 응답 후 컨트롤 플레인 안정성을 개선합니다.

#### Helm 차트 변경 {#helm-chart-changes-1}
- 작성자와 독립적으로 메타스토어 읽기를 확장하기 위해 읽기 전용 메타스토어 복제본 풀을 배포하는 `metastore_ro` 값을 추가합니다.
- 인덱서 노드 대신 전용 워커에서 압축을 실행하도록 `enableStandaloneCompactors`를 추가합니다.
- 기본적으로 `QW_DISABLE_INGEST_V1=true`를 사용하여 ingest v1을 비활성화합니다. `environment`를 사용하여 재정의하세요.
- `datadog.byocTelemetry.enabled`가 활성화된 경우 BYOC 서비스 트레이스를 Datadog 텔레메트리 수집으로 라우팅합니다.
- 활성 및 시작 프로브에 전용 `health` 포트를 사용합니다.

### v0.1.31 — 2026-07-08 {#v0131-2026-07-08}

*차트에 번들로 포함됨: `0.4.5`.*

#### 변경 {#changed-2}
- 원시 필드에서 단일 토큰 구문 접두사 쿼리를 수정하여 `match_phrase_prefix` 검색이 `max_expansions`로 제한되는 대신 모든 일치하는 접두사 용어를 반환하도록 합니다.
- 시간 범위가 있는 선택적 용어 쿼리에 대해 최대 3배 더 빠르게 교집합을 계산합니다.

#### Helm 차트 변경 {#helm-chart-changes-2}
- 인덱서 및 검색기 영구 볼륨을 위한 Kubernetes `VolumeAttributesClass` 리소스를 프로비저닝하도록 `indexer.volumeAttributesClass` 및 `searcher.volumeAttributesClass` 값을 추가합니다. 이 값을 사용하여 IOPS 및 처리량과 같은 볼륨 속성을 조정하세요. 이 기능은 기본적으로 비활성화되어 있으며, Kubernetes 1.31 이상이 필요하고 활성화 시 `driverName`이 필요합니다.
- 포드 이름 대신 포드 IP에서 `KUBERNETES_POD_IP`를 설정하여 Kubernetes 광고 주소를 수정합니다.
- Kubernetes API 액세스가 필요하지 않은 포드에서 토큰 노출을 줄이기 위해 기본적으로 `serviceAccount.automountServiceAccountToken`을 비활성화합니다.
- 심층 방어 강화를 위해 워크로드 전반에서 기본적으로 `securityContext.readOnlyRootFilesystem`을 활성화합니다.

### v0.1.30 — 2026-06-30 {#v0130-2026-06-30}

*차트에 번들로 포함됨: `0.4.3`.*

#### 변경 {#changed-3}
- 중첩된 날짜 히스토그램 쿼리에 대한 검색 CPU 시간을 최대 20%까지 줄이며, 7일 기간에서 가장 큰 성능 향상을 보입니다.
- CloudPrem 구성 요소의 활성 및 준비 상태 검사를 위해 포트 `7284`에 전용 상태 검사 리스너를 추가합니다.

#### Helm 차트 변경 {#helm-chart-changes-3}
- 모든 CloudPrem 구성 요소에 적용되고 기존 구성 요소별 `extraVolumes` 및 `extraVolumeMounts`와 병합되는 전역 `volumes` 및 `volumeMounts` 값을 추가합니다.
- CloudPrem 워크로드 포드를 토폴로지 도메인 전체에 분산하기 위해 구성 요소별 제약 조건과 병합된 전역 `topologySpreadConstraints` 지원을 추가합니다.
- 전용 상태 엔드포인트를 사용하도록 CloudPrem 서비스 및 AWS ALB 내부 수신 상태 검사를 업데이트합니다.

### v0.1.29 — 2026-06-05 {#v0129-2026-06-05}

*차트에 번들로 포함됨: `0.4.2`.*

#### 변경 {#changed-4}
- 범위 쿼리 2배, 카디널리티 집계 1.6배, 범위 쿼리와의 교집합 계산 최대 6배 등 일반적인 로그 분석 쿼리의 실행 속도가 향상되었습니다.
- `field:*` 필터를 존재 쿼리로 처리하고 백분위수 집계별 정렬을 수정합니다.
- 인덱싱 안정성을 개선하기 위해 Google Cloud Storage 업로드의 메모리 사용량을 줄였습니다.

#### Helm 차트 변경 {#helm-chart-changes-4}
- `datadog.byocTelemetry.enabled`를 사용하여 BYOC 서비스 텔레메트리를 기본적으로 활성화합니다. 이는 고객이 수집한 로그, 메트릭 또는 트레이스가 아닌 BYOC 서비스 로그 및 메트릭만 내보냅니다.
- `cloudprem.index.retention`을 더 이상 사용하지 않고 무시하며, 더 이상 `CP_RETENTION_PERIOD`를 설정하지 않습니다.

### v0.1.26 — 2026-05-05 {#v0126-2026-05-05}

*차트에 번들로 포함됨: `0.4.0`.*

#### 변경 {#changed-5}
- 하위 집계별 정렬을 사용하는 용어 집계가 최대 4배, 카디널리티 집계가 최대 1.5배 더 빨라졌습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}