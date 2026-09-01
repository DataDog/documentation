---
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-with-notebooks
  tag: 학습 센터
  text: Datadog Notebooks를 생성하여 인시던트 조사하기
- link: https://docs.datadoghq.com/notebooks/advanced_analysis/getting_started/
  tag: 가이드
  text: Notebooks 분석 기능 시작하기
title: Datadog Notebooks 시작하기
---
## 개요 {#overview}

Datadog Notebooks는 실시간 그래프, 메트릭, 로그, 모니터 및 [분석 기능][1]을 결합하여 데이터를 사용하는 실시간 협업 환경을 만듭니다. Teams는 노트북을 사용하여 문제를 격리 및 조사하고, 인시던트 세부 정보를 문서화하며, 인터렉티브 가이드를 만들고, 사전 예방적 워크플로를 향상하기 위한 특별 보고서를 작성할 수 있습니다.

이 가이드는 Datadog Notebooks를 소개하고 노트북 유형이 팀의 협업 및 조사 워크플로를 어떻게 향상하는지 설명합니다.

### 주요 이점 {#key-benefits}

- **직접 데이터 액세스**: 문서를 떠나지 않고도 Datadog 메트릭, 로그 및 트레이스를 쿼리하고 시각화합니다.
- **실시간 협업**: 여러 팀원이 동시에 편집하고, 코멘트를 남기고, 변경 사항을 추적할 수 있습니다.
- **워크플로 통합**: 경보, 대시보드, 로그 또는 Datadog Work Management에서 노트북을 생성하여 문제가 발생하는 지점에서 조사를 시작합니다.

## 올바른 노트북 유형 선택하기 {#choosing-the-right-notebook-type}

적절한 노트북 유형을 선택하면 팀이 문서의 목적과 예상 결과를 이해하는 데 도움이 됩니다. 각 유형은 특정 워크플로 요구 사항을 충족합니다.

{{< ui >}}Investigation{{< /ui >}} 노트북은 실시간 문제 해결 과정을 기록합니다. 알 수 없는 문제, 예상치 못한 동작 또는 시스템 이상을 탐색할 때 이 유형을 사용합니다. 발견 과정, 팀 협업 및 성공적인 해결 방법을 문서화합니다.

{{< ui >}}Runbook{{< /ui >}} 노트북은 일반적인 작업에 대한 단계별 절차를 제공합니다. 배포 프로세스, 인시던트 대응 워크플로 또는 팀이 정기적으로 수행하는 반복 가능한 작업에 이 유형을 사용합니다.

{{< ui >}}Documentation{{< /ui >}} 노트북은 살아있는 참고 자료 역할을 합니다. 시스템 아키텍처 개요, 팀 온보딩 가이드 또는 시간 경과에 따라 변화하는 구성 표준에 이 유형을 사용합니다.

{{< ui >}}Report{{< /ui >}} 노트북은 이해관계자를 위한 조사 결과를 종합합니다. 이를 사용하여 분기별 인시던트를 요약하거나, 중요한 계획 데이터를 제시하거나, 기술적 결정을 경영진에게 전달합니다.

{{< ui >}}Postmortem{{< /ui >}} 노트북은 완료된 인시던트를 분석합니다. 서비스 중단 후 이를 생성하여 타임라인을 문서화하고, 근본 원인을 파악하며, 개선 조치를 추적합니다.

모든 노트북 유형은 다른 사람과 협업이 가능하며 Datadog 데이터에 연결됩니다.

## 케이스 분석 예시: 노트북으로 로그 오류 조사하기 {#example-case-study-investigating-log-errors-with-notebooks}

시스템에 오류 로그가 표시되면 클릭 한 번으로 노트북을 만들 수 있습니다. 다음은 팀이 협업 노트북을 사용하여 최근 검사 실패의 근본 원인을 조사하고 밝혀내는 방법에 대한 예입니다. 이 프로세스를 통해 팀은 향후 유사한 문제를 방지하는 데 필요한 사항을 조정할 수 있습니다.

1. **애플리케이션 로그에서 오류 급증을 발견합니다.**
   {{< img src="/getting_started/notebooks/log-explorer-errors.png" alt="이미지 설명" style="width:100%;" >}}

1. **Log Explorer에서 노트북을 생성합니다.**<br>
   {{< ui >}}Open in Notebooks{{< /ui >}}를 클릭하고 다음 화면에서 {{< ui >}}New notebook{{< /ui >}}을 선택합니다.

   {{< img src="/getting_started/notebooks/notebooks-button.png" alt="이미지 설명" style="width:80%;" >}}

1. **{{< ui >}}Investigation{{< /ui >}}Notebook 왼쪽 상단에서 노트북 유형을 선택**합니다.

   {{< img src="/getting_started/notebooks/notebook-type.png" alt="이미지 설명" style="width:80%;" >}}

   노트북은 로그 탐색기에서 관련 로그 데이터, 쿼리 및 시간 범위를 자동으로 보존합니다.

   {{< img src="/getting_started/notebooks/log-errors-preserved-in-notebooks.png" alt="이미지 설명" style="width:100%;" >}}

1. **팀원을 태그하고 함께 조사합니다.**

   @멘션을 사용하여 팀원을 태그하고 조사에 참여시킵니다. 팀원은 동일한 오류 패턴을 확인하고 노트북에 직접 분석 내용을 추가할 수 있습니다. Notebooks의 협업 기능을 사용하면 팀원끼리 실시간으로 소통하고 함께 작업할 수 있습니다.

   이 예시에서 _변환_ 분석 노트북 기능을 사용하면 팀원이 로그 오류 메시지를 필터링하고 실패한 특정 검사를 확인할 수 있습니다.

   {{< img src="/getting_started/notebooks/transform-analysis-feature.png" alt="이미지 설명" style="width:100%;" >}}

1. **노트북에 모니터 추가**

   `/monitor`를 사용하여 노트북에 모니터 요약을 추가하면 호스트 모니터의 상태를 시각화할 수 있습니다.

   {{< img src="/getting_started/notebooks/monitor.png" alt="이미지 설명" style="width:100%;" >}}

   팀원이 노트북에 Minikube 모니터 검사가 OK 상태를 나타내므로 조사를 계속해야 한다는 메시지를 남깁니다.

조사 과정 전반에 걸쳐 노트북은 고객님이 문제를 해결하는 과정의 살아있는 기록이 되어 향후 참조할 수 있도록 쿼리, 발견 사항 및 분석적 통찰력을 보존합니다. 이 예시는 디버깅 프로세스를 문서화하여 팀 전체의 지식으로 변환할 수 있다는 노트북의 핵심 가치를 보여줍니다. 이제 팀은 공유 및 검색 가능한 형식으로 전 과정을 기록하여 지식 손실을 방지하고 향후 조사를 가속화할 수 있습니다.

## 노트북을 활용한 다음 단계 {#next-steps-with-notebooks}

조사는 시작에 불과합니다. 시간이 지나면서 Notebooks은 반응형 문서에서 사전 예방적 리소스로 진화함으로써 계속 가치가 높아집니다. 인시던트 중에 생성된 조사 노트북은 여러 자산의 기반이 될 수 있습니다.

- 성공적인 문제 해결 단계를 추출하여 조사를 {{< ui >}}Runbook{{< /ui >}}으로 변환합니다. 향후 대응자는 처음부터 시작할 필요 없이 고객님이 검증한 경로를 따를 수 있습니다.
- 복잡한 조사를 시스템 동작 및 알려진 문제를 설명하는 {{< ui >}}Documentation{{< /ui >}}으로 변환하세요.
- 여러 조사를 집계하여 패턴과 시스템 개선 사항을 식별하는 분기별 {{< ui >}}Reports{{< /ui >}}를 작성하세요.

이렇게 하면 조직 전체에 유용한 중앙 집중식 지식 저장소가 구축됩니다. 새 팀원은 온보딩 중에 이러한 노트북을 참조할 수 있고, 온콜 엔지니어는 인시던트 발생 시 이를 런북으로 참조할 수 있으며, 경영진은 용량 계획 시 보고서를 검토할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/notebooks/advanced_analysis/getting_started/