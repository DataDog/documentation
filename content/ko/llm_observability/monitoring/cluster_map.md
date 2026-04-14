---
aliases:
- /ko/llm_observability/cluster_map
description: Cluster Map을 통해 LLM 애플리케이션의 드리프트를 식별합니다.
further_reading:
- link: /llm_observability/
  tag: 설명서
  text: LLM Observability에 대해 자세히 알아보기
- link: /llm_observability/terms/
  tag: 설명서
  text: LLM Observability 핵심 용어와 개념에 대해 자세히 알아보기
title: 트레이스 Cluster Map
---

## 개요

[Clusters 페이지][1]에서 트레이스 데이터를 클러스터로 시각화하여 LLM 애플리케이션의 드리프트를 식별할 수 있습니다. 클러스터 정보를 확인하려면 LLM Observability가 구성된 애플리케이션을 선택합니다.

**참고:** 데이터가 수집된 후 클러스터링이 완전히 처리되어 Cluster Map에 표시되기까지 최대 **24시간**이 소요될 수 있습니다. 이 기간 동안 아직 클러스터링되지 않은 스팬은 **"Pending"** 클러스터 아래에 표시됩니다.

Cluster Map은 입력 또는 출력을 [주제][2]별로 그룹화하여 표시합니다. 입력과 출력은 각각 별도로 클러스터링됩니다. 토픽은 선택한 입력 또는 출력을 고차원의 텍스트 임베딩으로 클러스터링한 다음, 이를 2차원 공간에 투영하여 결정됩니다.

{{< img src="llm_observability/cluster_map/scatter.png" alt="산점도는 색상으로 구분된 토픽별 트레이스 클러스터를 표시하며, 클러스터 목록, 트레이스 수, 실패율을 보여주는 패널을 포함합니다." style="width:100%;" >}}

**Box Packing** 또는 **Scatter Plot** 레이아웃을 사용하여 클러스터를 시각화할 수 있습니다.

- Box Packing은 각 클러스터를 그룹화된 형태로 보여주며, 각 트레이스에 메트릭 또는 평가 결과를 오버레이합니다.
- 반면 Scatter Plot은 고차원의 텍스트 임베딩을 2차원 공간에서 확인할 수 있도록 하지만, 투영 왜곡으로 인해 각 트레이스 간의 거리가 잘못 표시될 수 있습니다.

Cluster Map은 오류 유형, 지연 시간과 같은 운영 메트릭이나 [기본 제공 또는 사용자 정의 평가][3]를 기준으로 각 클러스터의 성능 개요를 제공하여 토픽 드리프트 및 추가적인 품질 문제와 같은 추세를 식별할 수 있도록 합니다.

<div class="alert alert-info"><strong>Llama로 구축</strong>: Cluster Map은 계측된 LLM 애플리케이션의 입력과 출력을 기반으로 토픽 레이블을 생성하기 위해 Llama를 사용합니다.</div>

## 클러스터 검색 및 관리

정렬 옵션을 선택하여 검색 쿼리를 사용자 지정하면 평가 메트릭이나 기간과 같은 특정 기준에 따라 클러스터를 좁혀 보다 정밀한 분석을 할 수 있습니다.

1. 드롭다운 메뉴에서 `inputs` 또는 `outputs`을 선택하면 토픽별로 그룹화된 입력 또는 출력 클러스터를 확인할 수 있습니다.
1. 평가 유형 또는 평가 점수를 선택하여 클러스터를 색상으로 구분할 수 있습니다. 예를 들어, "출력 결과의 감성(sentiment)은 무엇인가?"와 관련해서는 `Output Sentiment`, "LLM이 출력을 생성하는 데 걸리는 시간(나노초)은 얼마인가?"와 관련해서는 `duration`을 선택할 수 있습니다.
1. 클러스터를 정렬할 필드(시간, 기간, 또는 색상)를 선택합니다. 그런 다음 **desc** 또는 **asc**를 선택하여 정렬 순서를 설정합니다.

목록에서 토픽 클러스터를 선택하여 특정 토픽의 입력 또는 출력이 각 메트릭이나 평가 기준에서 다른 토픽과 비교해 어떻게 실행되는지 확인할 수 있습니다. 또한 각 클러스터의 개별 프롬프트와 응답도 확인할 수 있습니다. 예를 들어, `duration`으로 오버레이하면 가장 느린 토픽의 개요를 확인할 수 있습니다.

{{< img src="llm_observability/cluster_map/box.png" alt="Box Packing 레이아웃은 색상으로 구분된 원 형태로 표현된 트레이스 클러스터를 표시하며, 토픽, 트레이스 수, 실패율이 포함된 클러스터 목록 패널을 함께 제공합니다." style="width:100%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/clusters
[2]: /ko/llm_observability/evaluations/managed_evaluations/#enter-a-topic
[3]: /ko/llm_observability/terms/#evaluations