---
disable_toc: false
further_reading:
- link: /notebooks/
  tag: 도움말
  text: 노트북 개요
- link: /account_management/audit_trail/
  tag: 도움말
  text: 감사 추적 개요
- link: https://www.datadoghq.com/blog/dashboards-notebooks-version-history/
  tag: 블로그
  text: 버전 기록을 통해 Datadog 대시보드 및 노트북의 변경 사항 추적
kind: 도움말
title: 노트북 버전 기록
---

## 개요
버전 기록은 노트북의 변경 사항을 자동으로 추적하고 이전 버전을 저장하므로 변경 사항 및 누구에 의해 변경되었는지를 정확하게 확인할 수 있습니다. 이전 버전을 확인거나, 노트북을 저장된 버전으로 복원하거나, 버전을 복제하여 새 노트북을 만들 수 있습니다.

## 전제 조건
모든 노트북에는 기본적으로 30일 동안 버전 기록이 보관됩니다. 이전 버전을 보려면 지난 30일 이내에 수정이 이루어져야 합니다.

[감사 추적][1]을 활성화하면 버전 기록이 30일에서 90일로 연장됩니다. 감사 추적을 활성화하면 모든 기존 노트북에서 30~90일 전에 이루어진 모든 편집 내용을 볼 수 있습니다.

## 버전 확인하기 
노트북에서 **Configure** 아이콘을 클릭하고 **Version History**를 클릭하여 Version History 측면 패널을 엽니다. 보존 기간 내에 편집 내용이 없으면 Version History 옵션이 비활성화됩니다.

{{< img src="/notebooks/guide/version_history/disabled_version_history.png" alt="노트북의 버전 기록 옵션이 비활성화됨" style="width:100%;" >}}

Version History 측면 패널에서 각 버전에 대해 다음을 확인할 수 있습니다.
- 변경한 Datadog 사용자
- 변경 날짜 및 시간
- 변경 사항 요약 및 이전 버전에 대한 변경 사항 세부 설명

## 버전 미리 보기
Version History 측면 패널에서 버전을 클릭하면 해당 버전으로 복원 시 노트북이 어떻게 나타나는지 미리 볼 수 있습니다. 버전을 클릭하여 변경이 발생한 위치로 스크롤하고 변경된 위젯이나 셀을 강조 표시합니다.

**참고**: 해당 버전을 미리 보기 해도 복원하도록 확실히 선택할 때까지 변경 사항이 저장되거나 다른 사용자가 보는 내용에 영향을 미치지 않습니다.

## 버전 복원하기
노트북을 이전 버전으로 복원하는 방법에는 두 가지가 있습니다.

{{< img src="/notebooks/guide/version_history/version_history_options.png" alt="버전 기록 옵션을 보여주는 노트북 예시" style="width:100%;" >}}

- Version History 측면 패널에서 복원할 버전을 선택한 후 사용자 프로필 오른쪽에 있는 케밥 메뉴를 클릭하고 **Restore this version**을 선택합니다.
- Version History 측면 패널이 열리면 페이지 상단에 **Restore this version** 버튼이 나타납니다.

버전을 복원하면 노트북이 모든 사용자에 대해 해당 버전으로 업데이트되고 복원을 표시하는 버전 기록에 새 항목이 추가됩니다. 변경 내역을 덮어쓰지 않으므로 보존 기간 내에 있는 모든 버전을 미리 보고 복원할 수 있습니다.

## 버전 복제하기
현재 노트북을 변경하고 싶지 않지만 이전 버전의 복제본을 만들고 싶다면 버전 기록에 있는 모든 버전에서 복제본을 만들 수 있습니다. 복제본을 만들고 싶은 버전을 선택한 후 Version History 측면 패널에서 사용자 프로필 오른쪽에 있는 케밥 메뉴를 클릭하고 **Clone**을 선택합니다.

## 버전 기록 보존

|                          | 보존 기간    |
| -----------------------  | ------- |
| 감사 추적 **비활성화됨** | 30일 |
| 감사 추적 **활성화됨**  | 90일 |


[1]: /ko/account_management/audit_trail/

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}