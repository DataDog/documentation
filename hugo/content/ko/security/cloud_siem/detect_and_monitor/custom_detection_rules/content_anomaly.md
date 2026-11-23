---
disable_toc: false
title: 콘텐츠 이상
---
{{< jqmath-vanilla >}}

## 개요 {#overview}

콘텐츠 이상 탐지 기능은 들어오는 로그를 분석하여 이상 로그 콘텐츠를 식별하고 경보를 발생시킵니다. [이상 탐지 파라미터](#anomaly-detection-parameters)를 설정하여 로그의 필드 값이 그룹 내 과거 로그의 값과 크게 다른 경우 신호가 트리거되도록 할 수 있습니다. 상당한 편차란 들어오는 값과 과거 값 간의 유사성이 낮거나 전혀 없는 경우를 의미합니다. 자세한 내용은 [로그가 이상으로 결정되는 방법](#how-logs-are-determined-to-be-anomalous)을 참조하세요.

콘텐츠 이상 규칙을 구성하는 방법에 대한 지침은 [규칙 생성][1]을 참조하세요.

## 콘텐츠 이상 탐지 작동 방식{#how-content-anomaly-detection-works}

### 이상 탐지 파라미터 {#anomaly-detection-parameters}

콘텐츠 이상 탐지 방식으로 규칙을 생성할 때 다음 파라미터를 설정할 수 있습니다.

#### 학습 기간 {#learning-duration}
{{< img src="security/security_monitoring/detection_rules/content_anomaly/query_learning_duration.png" alt="학습 기간 설정이 강조 표시된 콘텐츠 이상 규칙의 쿼리" style="width:100%;" >}}

- **설명**: 값을 학습하는 시간 범위입니다. 이 단계에서는 신호가 생성되지 않습니다. 규칙이 수정되면 학습 기간이 다시 시작됩니다.
- **기본값**: `7`일
- **범위**: `1`~`10`일
- **구성 방법**: 콘텐츠 이상 규칙을 편집할 때 쿼리의 {{< ui >}}Learning for{{< /ui >}} 드롭다운 메뉴에서 학습 기간을 설정할 수 있습니다.

#### 다음 기간 후 삭제{#forget-after}
{{< img src="security/security_monitoring/detection_rules/content_anomaly/forget_duration.png" alt="최근 일수 드롭다운 메뉴가 강조 표시된 콘텐츠 이상 탐지 옵션" style="width:100%;" >}}

- **설명**: 학습된 값이 삭제되기 전까지 유지되는 기간입니다.
- **기본값**: `7`일
- **범위**: `1`~`10`일
- **구성 방법**: 규칙 설정 페이지의 {{< ui >}}Content anomaly detection options{{< /ui >}} 섹션에서 {{< ui >}}within in the last{{< /ui >}} 드롭다운 메뉴를 통해 학습된 값이 유지되는 기간을 설정할 수 있습니다.

#### 유사도 백분율 임계값{#similarity-percentage-threshold}

{{< img src="security/security_monitoring/detection_rules/content_anomaly/similarity_percentage_threshold.png" alt="유사도 백분율 드롭다운 메뉴가 강조 표시된 콘텐츠 이상 탐지 옵션" style="width:100%;" >}}

- **설명**: 로그를 정상으로 간주하기 위해 필요한 최소 유사도입니다.
- **기본값**: `70%`
- **범위**: `35`~`100%`
- **구성 방법**: 규칙 설정 페이지의 {{< ui >}}Content anomaly detection options{{< /ui >}} 섹션에서 {{< ui >}}within in the last{{< /ui >}} 드롭다운 메뉴를 통해 유사도 백분율 임계값을 설정할 수 있습니다.

#### 유사 항목 임계값 {#similar-items-threshold}

{{< img src="security/security_monitoring/detection_rules/content_anomaly/similar_items_threshold.png" alt="유사 항목 드롭다운 메뉴가 강조 표시된 콘텐츠 이상 탐지 옵션" style="width:100%;" >}}

- **설명**:들어오는 값을 정상으로 간주하기 위해 필요한 일치하는 과거 로그의 수입니다.
- **기본값**: `1`
- **범위**: `1`~`20`
- **구성 방법**: 규칙 설정 페이지의 {{< ui >}}Content anomaly detection options{{< /ui >}} 섹션에서 {{< ui >}}with more than{{< /ui >}} 필드에 유사 항목 임계값을 입력할 수 있습니다.

#### 평가 기간 {#evaluation-window}
{{< img src="security/security_monitoring/detection_rules/content_anomaly/evaluation_window.png" alt="유사 항목 드롭다운 메뉴가 강조 표시된 콘텐츠 이상 탐지 옵션" style="width:100%;" >}}

- **설명**: 이상 로그를 집계할 시간 범위를 정의합니다. 이상 항목이 케이스 조건을 초과하면 신호가 트리거됩니다(예: `a >= 2`).
- **범위**: `0`~`24`시간
- **구성 방법**: 규칙 설정 페이지의 {{< ui >}}Set conditions{{< /ui >}} 섹션에서 {{< ui >}}within a window of{{< /ui >}} 드롭다운 메뉴를 통해 조건의 평가 기간을 설정할 수 있습니다.

## 로그가 이상으로 결정되는 방식 {#how-logs-are-determined-to-be-anomalous}

1. 로그는 [Unicode Text Segmentation (UTS #29)][2]을 사용하여 토큰화됩니다.
1. 토큰은 [Jaccard 유사도][3]를 사용하여 비교됩니다.
1. [MinHash][4] 및 [Locality Sensitive Hashing(LSH)][5]를 사용하여 효율적으로 비교합니다.
1. 로그가 유사도 백분율 임계값과 유사 항목 수 임계값을 모두 충족하지 못하면 이상으로 간주됩니다

### Jaccard 유사도 계산 예시 {#jaccard-similarity-computation-examples}

Cloud SIEM은 [Jaccard 유사도][3]를 사용하여 로그를 비교합니다.

$$\text"J(A,B)" = {∣\text"A" ∩ \text"B"∣} / {∣\text"A" ∪ \text"B"∣}$$

다음은 단일 단어 필드가 있는 로그와 다중 단어 필드가 있는 로그에 대해 Jaccard 유사도가 계산되는 방식의 예입니다.

#### 단일 단어 필드 {#single-word-fields}

다음은 단일 단어 필드가 있는 두 개의 로그 예입니다.

```
log1={actionType:auth, resourceType:k8s, networkType:public, userType:swe}
```

```
log2={actionType:auth, resourceType:k8s, networkType:public, userType:pm}
```

두 로그 간의 Jaccard 유사도를 계산하려면 다음 단계를 따르세요.

- `log1`과 `log2`의 교집합은 단어 집합 `{auth, k8s, public}`을 생성합니다.
- `log1`과 `log2`의 합집합은 단어 집합 `{auth, k8s, public, swe, pm}`을 생성합니다.
- 결과 내 단어 수를 사용하여 Jaccard 유사도를 계산합니다.

$$\text"J(log1,log2)" = 3 / 5 = 0.6$$

#### 다중 단어 필드 {#multi-word-fields}

다음은 다중 단어 필드가 있는 로그의 예입니다.

```
log1={actionDescription: "User connected to abc network"}
```

```
log2={actionDescription: "User got unauthorized network access"}
```

두 로그 간의 Jaccard 유사도를 계산하려면 다음 단계를 따르세요.

- `log1`과 `log2`의 교집합은 단어 집합 `{User, network}`를 생성합니다.
- `log1`과 `log2`의 합집합은 단어 집합 `{User, connected, to, abc, network, got, unauthorized, access}`를 생성합니다.
- 결과의 요소 수를 사용하여 Jaccard 유사도를 계산합니다.

$$\text"J(log1,log2)" = 2 / 8 = 0.25$$

## 콘텐츠 이상 탐지 방법과 다른 탐지 방식 비교 {#comparing-content-anomaly-method-with-other-detection-methods}

| 기능 | 이상 탐지 | 새 값 탐지 | 콘텐츠 이상 탐지 |
|---------|-------------------|---------------------|---------------------------|
| 새 필드 값 탐지 | 아니요 | 예 | 예(구성 가능) |
| 희귀 필드 값 탐지 | 아니요 | 아니요 | 예 |
| 상이한 값 탐지 | 아니요 | 아니요 | 예 |
| 로그 급증 탐지 | 예 | 아니요 | 아니요 |
| 다중 쿼리 지원 | 아니요 | 아니요 | 예 |
| 다중 케이스 지원 | 아니요 | 아니요 | 예 |
| 신호를 트리거하기 위한 임계값 정의 | 시간 버킷별 로그 수 분포를 학습하여 결정됩니다(약 99백분위수).| 새로운 값이 처음 발생하면 항상 신호를 트리거합니다. | 사용자 지정(`1`~`100`) |
| 평가 기간 | 예 | 아니요 | 예 |
| 보존 | 14일 | 30일 | 10일 |

[1]: /ko/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule?cloud_siem_detection_rule_detection_method=content_anomaly
[2]: https://www.unicode.org/reports/tr29/tr29-22.html
[3]: https://en.wikipedia.org/wiki/Jaccard_index
[4]: https://en.wikipedia.org/wiki/MinHash
[5]: https://en.wikipedia.org/wiki/Locality-sensitive_hashing