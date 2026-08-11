---
disable_toc: false
title: 의심스러운 커밋
---
## 개요

Error Tracking은 의심스러운 커밋을 파악하여 오류 원인을 정확히 파악하고 해결하는데 도움을 줍니다. 이 기능은 [설정 조건](#setup)을 충족하면 문제 발생 시 자동으로 활성화됩니다.

{{< img src="logs/error_tracking/suspect_commit.png" alt="Datadog UI에 표시되는 의심스러운 커밋" style="width:100%" >}}

의심스러운 커밋은 아래와 같이 파악되어 이슈 패널에 표시됩니다.

{{< img src="logs/error_tracking/suspect_commit_in_context.png" alt="이슈 패널의 컨텍스트에 표시된 의심스러운 커밋" style="width:90%" >}}

GitHub에서 의심스러운 커밋을 보려면 **View Commit** 버튼을 클릭하세요.

### 의심스러운 커밋 파악 기준
다음의 경우 의심스러운 커밋으로 파악됩니다.
- 스택 트레이스의 한 줄을 수정합니다.
- 첫 번째 오류가 발생하기 전에 작성되었습니다.
- 첫 번째 오류가 발생하기 90일 전에 작성되었습니다.
- 위의 기준을 충족하는 가장 최근 커밋입니다.

이슈에 의심스러운 커밋이 표시되려면 적어도 하나의 후보 커밋이 발견되어야 합니다.

## 설정

설정 조건이 충족되면 의심스러운 커밋이 이슈에 자동으로 표시됩니다. 설정 조건이 충족되기 전에 작성된 커밋은 표시되지 않습니다.

### Source Code 통합 활성화

Suspect Commits 기능을 사용하려면 [Source Code 통합][1]이 필요합니다. Source Code 통합을 활성화하는 방법:

1. Datadog의 [**Integrations** 페이지][3]에서 상단 내비게이션 바의 **Link Source Code**를 선택합니다.
2. 단계에 따라 커밋을 원격 측정과 연결하고 GitHub 리포지토리를 구성합니다.

### GitHub 통합 설치
[GitHub 통합][2]을 설치하고 풀 요청 및 콘텐츠에 대한 읽기 권한을 활성화합니다.

[1]: /ko/integrations/guide/source-code-integration
[2]: /ko/integrations/github/
[3]: https://app.datadoghq.com/integrations