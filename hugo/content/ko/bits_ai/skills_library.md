---
description: Bits AI 및 외부 AI 에이전트에게 조직별 도메인 지식과 지침을 제공하는 재사용 가능한 스킬을 만듭니다.
further_reading:
- link: /bits_ai/bits_chat/
  tag: 문서
  text: Bits Chat
- link: /actions/agents/
  tag: 문서
  text: Bits Agent Builder
- link: /mcp_server/
  tag: 문서
  text: Datadog MCP Server
title: 스킬 라이브러리
---
## 개요 {#overview}

스킬 라이브러리를 사용하여 AI 에이전트를 위한 재사용 가능한 도메인 지식과 지침을 정의합니다. 스킬을 사용하면 각 프롬프트에서 동일한 정보를 반복할 필요 없이 에이전트에게 작업별 컨텍스트를 제공할 수 있습니다.

예를 들어, 조직의 인시던트 대응 프로세스, 서비스 소유권 규칙 또는 조사 요약 요구 사항을 설명하는 스킬을 만드세요.

스킬은 [Bits Chat][1], [Bits Agent Builder][2], Slack용 Datadog 앱, 그리고 [Datadog MCP Server][3]를 통해 연결되는 Claude Code, Codex, Cursor와 같은 외부 에이전트와 함께 작동합니다.

## 스킬 만들기 {#create-a-skill}

스킬 라이브러리에서 직접 스킬을 생성하거나 Bits Chat에 스킬 생성을 요청하세요.

### 스킬 라이브러리에서 스킬 만들기 {#create-a-skill-in-the-skills-library}

1. Datadog에서 [{{< ui >}}Skills Library{{< /ui >}}][4]를 엽니다.
2. 스킬을 만들거나 기존 `SKILL.md` 파일을 가져옵니다.
3. 에이전트가 따라야 할 도메인 지식과 지침을 추가합니다.
4. 스킬의 공개 범위를 선택합니다.
    - **비공개**: 스킬을 비공개로 유지합니다.
    - **공개**: 스킬을 Datadog 조직과 공유합니다.
5. 스킬을 저장합니다.

초점이 명확한 지침을 사용하고 스킬에 설명적인 이름을 지정하세요. 이름이 명확하면 스킬을 더 쉽게 찾고 슬래시 명령어로 호출할 수 있습니다.

### Bits Chat으로 스킬 만들기 {#create-a-skill-with-bits-chat}

Bits Chat에 스킬 생성을 요청하세요.

```text
Create a new Skills Library skill
```

기존 Bits Chat 대화의 컨텍스트에서 스킬을 생성하려면 다음을 입력합니다.

```text
Turn this conversation into a skill
```

기존 Slack 스레드에서 스킬을 생성할 수도 있습니다. 스레드에 다음을 입력하세요.

```text
@Datadog turn this conversation into a skill
```

## Bits Chat에서 스킬 사용 {#use-a-skill-in-bits-chat}

Bits Chat에서 스킬을 사용할 수 있게 하려면 다음 단계를 따르세요.

1. Bits Chat에서 **Settings**를 엽니다.
2. **Skills**를 선택합니다.
3. 스킬을 활성화합니다.

스킬을 활성화하면 스킬이 요청과 관련이 있을 때 Bits Chat이 자동으로 해당 스킬을 사용합니다.

대화에서 슬래시 명령어를 입력하여 스킬을 명시적으로 호출하세요.

```text
/my-skill
```

동일한 메시지에 추가 컨텍스트를 포함하거나 스킬을 호출한 후 대화를 계속할 수 있습니다.

## Bits Agent Builder에서 스킬 사용 {#use-a-skill-in-bits-agent-builder}

에이전트 구성에서 에이전트에 필요한 각 스킬을 선택하세요. 에이전트가 선택된 스킬을 자동으로 로드합니다.

대화 중에 스킬을 명시적으로 호출하려면 해당 슬래시 명령어를 입력합니다.

```text
/my-skill
```

에이전트 생성 및 테스트에 대한 자세한 내용은 [Bits Agent Builder][2]를 참조하세요.

## Slack에서 스킬 사용 {#use-a-skill-in-slack}

Slack용 Datadog 앱을 연결한 후 `@Datadog`을 멘션하고 스킬의 슬래시 명령어를 추가하세요.

```text
@Datadog /my-skill
```

명령어 뒤에 작업별 세부 정보를 추가하세요.

## 외부 에이전트와 함께 스킬 사용 {#use-skills-with-an-external-agent}

Datadog MCP Server에 연결된 외부 AI 에이전트는 스킬 라이브러리에서 스킬을 검색하고 로드할 수 있습니다.

Datadog MCP Server는 다음 도구를 제공합니다.

- `list_datadog_skills()`: 에이전트가 사용할 수 있는 스킬을 나열합니다.
- `load_datadog_skill()`: 선택한 스킬을 에이전트의 컨텍스트에 로드합니다.

일반적인 외부 에이전트 워크플로는 다음과 같습니다.

1. 에이전트를 Datadog MCP Server에 연결합니다.
2. `list_datadog_skills()` 또는 MCP 리소스를 사용하여 사용 가능한 스킬을 검색합니다.
3. `load_datadog_skill()`을 사용하여 작업에 필요한 스킬을 로드합니다.
4. 로드된 지침과 지식을 사용하여 에이전트에게 작업 완료를 요청합니다.

연결 지침은 [Datadog MCP Server][3] 문서를 참조하세요.

## 이용 가능 여부 {#availability}

스킬 라이브러리는 Bits Chat, Bits Agent Builder, Slack 및 Datadog MCP Server를 통해 연결되는 외부 에이전트에서 사용할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/bits_ai/bits_chat/
[2]: /ko/actions/agents/
[3]: /ko/mcp_server/
[4]: https://app.datadoghq.com/actions/skills