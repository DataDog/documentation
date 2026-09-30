---
description: Network Path Autonomous Systems 뷰 조사하기
further_reading:
- link: /network_monitoring/network_path/list_view
  tag: 설명서
  text: Network Path의 List 뷰에 대해 자세히 알아보기
- link: /network_monitoring/network_path/path_view
  tag: 설명서
  text: Network Path의 Path 뷰에 대해 자세히 알아보기
- link: /network_monitoring/network_path/glossary
  tag: 설명서
  text: Network Path 용어 및 개념
- link: /network_monitoring/network_path/setup
  tag: 설명서
  text: Network Path 설정
title: Autonomous Systems 뷰
---
## 개요 {#overview}

Autonomous Systems(AS) 뷰에서는 Border Gateway Protocol(BGP) 라우팅 계층을 통해 사용자의 트래픽을 전달하는 네트워크 공급자 및 인터넷 서비스 공급자(ISP)를 확인할 수 있습니다. 이 View는 네트워크 경로의 모든 AS에 대한 지연 시간 및 성능 메트릭을 모니터링하여 네트워크 성능이 저하될 때 어떤 상류 공급자에서 문제가 발생하는지 정확히 파악하는 데 도움을 줍니다.

BGP 라우팅 문제 및 공급자별 문제는 사용자가 직접 제어할 수 없는 영역에서 발생하므로 진단하기 어렵습니다. AS 뷰는 이러한 보이지 않는 계층을 가시화하여 경로를 수동으로 트레이싱하거나 BGP 표를 구문 분석하지 않고도 "문제가 피어링 문제인가?", "트래픽이 다른 트랜짓 공급자로 전환되었는가?"와 같은 질문에 답하는 데 필요한 데이터를 제공합니다.

시작하려면 Network Path Explorer로 이동하여 [**Autonomous Systems(AS)**][1]을 클릭하세요.

## 대시보드 {#dashboard}

대시보드는 다음과 같은 여러 관점에서 성능 데이터를 제공합니다.

### 전 세계 Blast 반경 {#global-blast-radius}

전 세계 Blast 반경 맵은 선택한 기간 동안의 국가별 평균 지연 시간을 보여줍니다. 지도에서 국가를 클릭하여 [Autonomous Systems 목록](#autonomous-systems-table)을 필터링하세요.

### 트래픽 카테고리 {#traffic-categories}
트래픽 카테고리 패널은 사용자의 트래픽이 주로 호스팅 공급자를 통해 전달되는지 아니면 기존의 ISP를 통해 전달되는지를 보여줍니다.

### 트래픽 분포 {#traffic-distribution}
트래픽 분포 패널은 각 지역을 통과하는 사용자의 경로를 백분율로 보여줍니다. 

### 주의 필요 {#need-attention}

주의 필요 섹션은 지연 스파이크 또는 성능 이상이 있는 AS를 자동으로 표시하고, 심각도에 따라 순위를 매겨 집중적인 조사가 필요한 부분을 알려줍니다. 목록에서 AS를 선택하여 [세부 정보](#autonomous-system-details)를 확인하세요.

## Autonomous Systems 표 {#autonomous-systems-table}

상세 AS 표는 문제 해결을 위한 운영 데이터를 제공합니다. 여기에는 각 AS가 공지하는 접두사, 해당 AS를 통과하는 모니터링 대상 경로의 개수, 감지된 특정 문제(지연 스파이크, 라우팅 변경 또는 연결 문제)가 포함됩니다. 고객이 성능 저하를 보고한 경우, 문제가 자체 인프라에서 발생했는지, 특정 트랜짓 공급자나 라스트 마일 ISP에서 발생한 것인지 신속하게 판단할 수 있습니다. 이는 적절한 팀이나 공급자에 에스컬레이션하는 데 중요한 정보입니다.

AS 표에는 모니터링 대상 네트워크 경로가 통과하는 Autonomous System이 표시됩니다. 각 행에는 다음 정보가 포함됩니다.

ASN
: Autonomous System 번호입니다.

이름
: AS를 운영하는 서비스 공급자의 이름입니다.

국가
: AS에 대한 트래픽이 관찰되는 국가입니다.

모니터링 대상 접두사
: 모니터링 중인 경로에서 AS에 대해 관찰된 IP 접두사입니다.

발견된 테스트
: AS를 통과하는 테스트의 수입니다.

탐지된 문제
: 지연 스파이크 또는 패킷 손실과 같이 AS에 대해 관찰된 문제입니다.

위 목록의 필터 옵션(**AS 번호**, **국가**, **카테고리** 또는 **탐지된 문제**)을 사용하여 결과를 필터링할 수 있습니다.

## Autonomous System 세부 정보 {#autonomous-system-details}

목록에서 Autonomous System을 클릭하여 세부 정보를 엽니다. 세부 정보 뷰에는 **Traffic** 탭, **Neighbors** 탭 및 경로 목록이 포함됩니다.

### Traffic {#traffic}

**Traffic** 탭은 선택한 AS를 통해 **업스트림** 소스에서 **다운스트림** 목적지로 전달되는 트래픽의 관계도를 보여줍니다. 트래픽 노드 위에 마우스를 올리면 집계 경로와 발생 횟수를 볼 수 있으며, 목록의 [경로 목록](#path-list)에서 경로를 필터링하려면 AS를 클릭합니다.

### Neighbors {#neighbors}

**Neighbors** 탭은 선택한 Autonomous System과 이웃하는 업스트림 및 다운스트림 Autonomous System을 시각화하여 보여줍니다. 그래프에서 AS를 클릭하면 [경로 목록](#path-list)이 해당 AS를 통과하는 경로만 표시하도록 필터링됩니다.

### 경로 목록 {#path-list}

경로 목록에는 AS를 통과하는 개별 경로가 아래 열과 함께 포함되어 있습니다. 목록에서 경로 행을 클릭하여 [Path 뷰][2]에서 엽니다.

소스
: 경로의 소스입니다.

목적지
: 경로의 목적지입니다.

태그
: 경로와 관련된 태그입니다.

평균 도달 가능성
: 선택한 기간 동안 목적지에 성공적으로 도달한 트레이스라우트의 비율입니다.

평균 RTT
: 경로의 평균 왕복 시간입니다.

## 참고 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network-path/autonomous-systems
[2]: /ko/network_monitoring/network_path/path_view/