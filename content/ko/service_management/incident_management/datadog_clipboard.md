---
aliases:
- /ko/monitors/incident_management/datadog_clipboard
description: 인시던트 생성 및 관리
further_reading:
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: 블로그
  text: Datadog 클립보드로 원활하게 데이터를 내보내세요.
kind: 설명서
title: Datadog 클립보드
---

## 개요

Datadog 클립보드는 시그널을 수집하고 컨텍스트 간 시그널을 공유하는 교차 플랫폼 도구입니다. 각 사용자에게 개별적이며 저장된 링크와 함께 복사한 모든 그래프를 저장합니다. 시그널은 그룹화할 수 있으며 대시보드, 노트북 또는 인시던트에 내보낼 수 있습니다.

{{< img src="service_management/incidents/clipboard-full.png" alt="메인 클립보드">}}

## 교차 페이지 탐색

클립보드는 Datadog의 모든 페이지에서 작동하며 개별 사용자가 복사한 모든 그래프 기록을 보관합니다. 클립보드는 자동으로 쿼리 텍스트, 이벤트 JSON 또는 기타 텍스트 기반 콘텐츠를 자동으로 복사하지 않습니다.

## 클립보드 열기

클립보드를 열려면 그래프를 복사하고 팝업에서 **Open Clipboard**를 클릭합니다.

{{< img src="service_management/incidents/open-clipboard.png" alt="클립보드에서 그래프 열기" style="width:80%;">}}

또는 최소화된 클립보드에서 "`Cmd/Ctrl + Shift + K`를 눌러 열기"를 클릭합니다.

클립보드는 `Cmd/Ctrl + Shift + K`를 사용해 열고 닫을 수도 있습니다. 클립보드를 최소화하려면, 최소화 아이콘을 클릭합니다. 최소화된 클립보드는 Datadog의 모든 페이지에서 유지됩니다.

## 클립 추가

그래프를 추가하려면 `Cmd/Ctrl + C`을(를) 사용해 복사하거나 내보내기 메뉴에서 **복사**를 클릭합니다. 클립보드가 열리면 복사된 그래프가 자동으로 추가됩니다.

URL을 추가하려면 클립보드를 열고 **현재 페이지 추가**를 클릭합니다.

{{< img src="service_management/incidents/add-page.png" alt="클립보드에 대시보드 추가하기" style="width:80%;">}}

## 클립 관리

클립보드에서 각 항목을 열고, 복제하고, 삭제할 수 있습니다. 이러한 옵션은 시그널 위를 마우스로 가리키면 이용 가능합니다. 항목을 열면 원래 시그널 링크로 이동됩니다. 항목 이름을 클릭하여 그래프 소스(클립된 대시보드 등)를 엽니다.

{{< img src="service_management/incidents/managing-clips.png" alt="클립 관리하기" style="width:80%;">}}

클립보드는 최대 20개 시그널을 포함합니다. 개별적으로 삭제하거나 **모두 제거**를 클릭하여 시그널을 제거합니다. 20개 이상의 시그널이 추가된 경우, 시그널은 가장 먼 곳부터 왼쪽으로 오래된 순으로 자동 제거됩니다.

## 내보내기

클립보드의 항목은 키보드 단축키 또는 내보내기 메뉴를 사용해 대시보드, 노트북, 인시던트로 내보낼 수 있습니다. 개별 시그널을 복사하려면 시그널 위를 마우스로 가리킨 다음 `Cmd/Ctrl + C`를 사용해 복사하고 `Cmd/Ctrl + V`로 대시보드나 노트북으로 붙여넣습니다. 여러 시그널을 복사하려면 `Shift + Click`을 사용하여 그래프와 링크를 선택하고 `Cmd/Ctrl + C`를 사용해 복사합니다.

대신 선택 항목을 내보내기 메뉴를 사용해 신규 또는 기존 대시보드, 노트북, 인시던트로 내보냅니다. [지원되는 그래프][1]만 노트북으로 내보낼 수 있습니다.

{{< img src="service_management/incidents/exporting.png" alt="클립보드에서 내보내기" style="width:80%;">}}


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/notebooks/#visualization