---
kind: faq
title: JIRA  통합을 설정했습니다. 이제 이벤트와 티켓을 어떻게 생성하나요?
---

## 설정

JIRA로 Datadog 통합을 설정한 후에는 통합에서 JIRA 기반의 이슈를 가져오고 내보낼 때 JIRA 타일에 정의된 '티켓 종류'에 따라 가져오고 내보낼 이슈의 종류를 결정합니다.
{{< img src="integrations/faq/create_ticket.png" alt="create_ticket" >}}

 위 이미지에서 'jira-test2-task' 티켓 유형이 생성되었음을 볼 수 있습니다. 이 섹션을 확장하면 다음과 같이 나타납니다.
{{< img src="integrations/faq/jira_ticket_type.png" alt="jira_ticket_type" >}}

이 필드는 통합이 JIRA와 소통하는 방법을 정의합니다. 'Project Key' 필드는 타일이 참조하는 JIRA 프로젝트를 결정하고 'Issue Type' 필드는 해당 프로젝트 보드에서 게시되고 가져올 JIRA 이슈 유형을 지정합니다. 'Tags' 필드는 선택 사항이며 JIRA에서 이벤트를 가져올 때 붙이고 싶은 태그를 할당할 수 있습니다.

'Required Fields' 필드는 약간 다른데, 'Project Key'와 'Issue Type' 필드를 입력한 후 티켓을 한 번 저장해야만 나타납니다. 'Required Fields' 섹션에서 JIRA 타일 상단에 있는 목록에 값을 추가할 수 있습니다(값 앞에 붙어 있는 달러 기호).

더 상세하게 설명하자면, 위에 정의된 티켓 유형에 따라 프로젝트 키가 'TEST2'인 JIRA 프로젝트에서 JIRA 'Task' 이슈 유형을 게시하거나 가져오며, 이때 항상 이벤트 메시지를 포함합니다.

## Datadog에서 JIRA로 이동

Datadog에서는 @-style 알림을 사용해 티켓 유형을 JIRA로 참조하거나 푸시할 수 있습니다. 예를 들어 모니터 메시지에 @jira-test2-task로 모니터를 정의하고 참조하면, 모니터가 알림을 생성할 때마다 프로젝트 키가 'TEST2'인 JIRA 프로젝트에 'Task' 이슈를 생성합니다.

## JIRA에서 Datadog로 이동

JIRA에서 생성되고 프로젝트 키 'TEST2'가 지정된 모든 'Task' 이슈는 Datadog 이벤트 스트림으로 가져와 통합 타일에 정의된 태그로 태깅됩니다.

## 중요 사항

* 통합에서는 5분마다 JIRA를 스크랩하지만 이슈 유형에 따라 Datadog에 나타나는 데 걸리는 시간이 다를 수 있습니다. 일반적으로 'Stories'와 같이 크기가 큰 이슈 유형이 크기가 작은 이슈 유형인 'Tasks'보다 나타나는 데 걸리는 시간이 더 깁니다.
* 한 프로젝트에서 여러 이슈 유형을 가져오거나 여러 프로젝트에서 이슈 유형 하나를 가져올 수 있습니다.
* 통합 타일의 Ticket Types에서 정의한 태그만 사용할 수 있습니다.
* 통합 구성 작업이나 오류는 Datadog 이벤트 스트림에 표시됩니다.