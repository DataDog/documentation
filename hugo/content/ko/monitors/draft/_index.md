---
description: Draft Monitors를 사용하여 알림을 트리거하지 않고 모니터링 경보를 안전하게 생성, 테스트 및 개선하세요.
further_reading:
- link: monitors/
  tag: 설명서
  text: 모니터링 및 경보 개요
- link: monitors/configuration/?tab=thresholdalert
  tag: 설명서
  text: 모니터링 구성
- link: monitors/manage/
  tag: 설명서
  text: 모니터링 관리
title: Draft Monitors
---
## 개요 {#overview}

Draft Monitors를 사용하면 알림을 트리거하지 않고 경보를 안전하게 생성, 개선 및 테스트할 수 있습니다. 

임계값을 실험하거나, 복잡한 쿼리를 반복하거나, 팀원과 협업할 때, 초안은 미완성 또는 테스트 모니터링으로 인한 혼선 없이 작업할 수 있는 깔끔하게 분리된 공간을 제공합니다. 또한 Draft Monitors는 개발 중 경보 피로도를 줄이고 완전히 검증된 모니터링만 활성화되도록 합니다. 

Draft Monitors는 경보 워크플로를 관리하는 엔지니어와 SRE에게 적합하며, 여러 팀이 명확하게 협업하고 아이디어를 신뢰할 수 있는 경보로 발전시킬 수 있도록 지원합니다.

## 초안 모니터링 생성 {#create-a-draft-monitor}

모니터링을 초안 상태로 생성하고 저장하려면 다음 단계를 따르세요.

1. [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}}][1]로 이동합니다.  
2. [모니터링 구성][2] 작업을 수행합니다(쿼리 추가, 조건 지정, 필요시 알림 설정). 초안에 설정된 알림 핸들은 모니터링이 게시된 후에만 사용됩니다. 
3. {{< ui >}}Save as Draft{{< /ui >}}를 클릭합니다. 이 초안 모니터링에서는 경보가 전송되지 않습니다.

{{< img src="/monitors/draft/save_as_draft.png" alt="모니터링 생성 인터페이스의 'Save as Draft' 버튼" style="width:100%;" >}}

## 초안 모니터링 게시 {#publish-a-draft-monitor}

모니터링이 준비되면 다음 단계를 따르세요.

1. 초안 상태 패싯을 사용하거나 `status:draft`로 필터링하여 [{{< ui >}}Monitors List{{< /ui >}}][3]에서 초안 모니터를 엽니다.  
2. 구성을 검토합니다.  
3. {{< ui >}}Publish Monitor{{< /ui >}}를 클릭합니다.  
4. 이렇게 하면 모니터링이 게시되고 조건에 따라 경보가 시작됩니다.

## 초안 모니터링 관리 {#manage-draft-monitors}

<!-- TODO Add image of Monitors List filtered to view drafts, and final QA of instructions with UI-->

초안 상태 패싯을 사용하거나 `draft_status:draft`로 필터링하여 [{{< ui >}}Monitors List{{< /ui >}}][3]에서 초안 모니터링을 찾으세요. 초안은 모니터링 상태 페이지와 모니터링 목록에 {{< ui >}}Draft{{< /ui >}} 라벨과 함께 표시됩니다. 초안은 업데이트 없이 6개월이 지나면 만료되지만, 언제든지 초안 모니터링을 삭제할 수 있습니다.

## 권한 {#permissions}

[편집 권한][4]이 있는 사람은 누구나 초안 모니터링을 업데이트할 수 있습니다. 이벤트를 사용하여 실제 알림을 보내지 않고도 모니터링이 얼마나 자주 트리거되었을지 미리 확인할 수 있습니다.

**Draft Monitors Write** 권한을 사용하면 더 광범위한 **Monitors Write** 권한 없이도 사용자가 초안 모니터링을 관리할 수 있습니다. 게시된 모니터를 수정하지 않고 초안 모니터링 작업을 해야 하는 사용자에게 이 권한을 부여하세요.

**Draft Monitors Write** 권한만 있는 사용자는 다음을 수행할 수 있습니다.

- 모니터링을 생성합니다(단, `draft_status`가 `draft`로 설정되어 저장되어야 함).
- 기존 초안 모니터링을 편집합니다(단, 편집으로 인해 `draft_status`가 `draft` 이외의 값으로 변경되지 않아야 함).
- 본인이 생성한 초안 모니터링 또는 소속 팀이 소유한 초안 모니터링을 삭제합니다.

**Draft Monitors Write** 권한만 있는 사용자는 다음을 수행할 수 없습니다.

- 초안 모니터링 게시
- 게시된 모니터링 편집 또는 삭제

이 권한은 Datadog UI와 API 모두에 적용됩니다.

## 모범 사례 {#best-practices}

* **동료 검토에 초안 모니터 사용:** 변경 사항을 활성화하기 전에 협업하세요.  
* **프로덕션 환경의 노이즈 방지:** 먼저 초안 모니터에서 경보 조건을 안전하게 테스트하세요.  
* **작업 추적:** 개발 중인 초안 모니터에는 명확한 이름과 태그를 사용하세요.  
* **오래된 초안 모니터 정리:** 오래된 초안 모니터를 검토하고 정리하여 혼잡을 줄이세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create
[2]: https://docs.datadoghq.com/ko/monitors/configuration/?tab=thresholdalert
[3]: https://app.datadoghq.com/monitors/manage
[4]: /ko/monitors/configuration/?tab=thresholdalert#permissions