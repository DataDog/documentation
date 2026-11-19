---
description: Bits Investigation으로 Error Tracking 이슈를 조사하여 오류의 근본 원인과 영향을 파악하세요.
further_reading:
- link: /bits_ai/bits_investigation/
  tag: 설명서
  text: Bits Investigation이란
- link: /bits_ai/bits_investigation/chat_bits_investigation/
  tag: 설명서
  text: Bits Investigation과 채팅
- link: /bits_ai/bits_code/
  tag: 설명서
  text: Bits Code로 코드 수정안 생성
- link: /source_code/
  tag: 설명서
  text: 소스 코드 통합 설정
title: Bits AI로 오류 조사
---
{{< callout url="#" btn_hidden="true" header="미리 보기" >}}
Error Tracking의 Bits Investigation은 미리 보기로 표시됩니다.
{{< /callout >}}

## 개요 {#overview}

[Bits Investigation][1]은 프로덕션 이슈를 조사하는 자율 AI agent입니다. 사용자가 Error Tracking 이슈에서 조사를 시작하면, Bits는 스택 트레이스 및 관련 텔레메트리를 포함하여 오류를 분석합니다. [소스 코드 통합][3]을 설정하면 Bits가 소스 코드도 분석합니다. 그런 다음 이슈의 예상 근본 원인과 영향을 보고합니다.

Error Tracking에서 트리거된 모든 조사를 나열하려면 [Investigations][9]를 열고 {{< ui >}}Source{{< /ui >}}: {{< ui >}}Error Tracking Issue{{< /ui >}}로 필터링하세요.

## 전제 조건 {#prerequisites}

- 조사를 조회하려면 [{{< ui >}}Bits Investigations Read{{< /ui >}} 권한][2]이 필요합니다. 조사를 시작하려면 [{{< ui >}}Bits Investigations Write{{< /ui >}} 권한][2]이 필요합니다.
- 오류 발생 시 실행 중이던 코드를 Bits가 읽을 수 있도록 하려면 [소스 코드 통합][3]을 설정하세요. Bits는 소스 코드 액세스 없이도 조사할 수 있지만, 근본 원인 분석의 정확도가 떨어집니다.
- 코드 수정을 생성하려면 리포지토리에 대한 쓰기 액세스 권한과 [{{< ui >}}Bits Code Write{{< /ui >}} 권한][2]이 필요한 [Bits Code][8]를 설정하세요.

## Error Tracking 이슈 조사 {#investigate-an-error-tracking-issue}

Bits Investigation으로 Error Tracking 이슈를 조사하는 방법

1. [Error Tracking Explorer][4]에서 이슈를 클릭하여 이슈 패널을 엽니다.
1. {{< ui >}}Review{{< /ui >}} 탭에서 {{< ui >}}Bits Investigation{{< /ui >}} 배너의 {{< ui >}}Investigate this issue{{< /ui >}}를 클릭합니다.

   {{< img src="error_tracking/bits_investigation/start_investigation.png" alt="Error Tracking 이슈의 Review 탭에 있는 Bits Investigation 배너와 Investigate this issue 버튼입니다." style="width:100%;" >}}

   조사가 진행되는 동안, 배너에는 진행 상황과 조사를 시작한 사용자가 표시됩니다. 조사에는 일반적으로 몇 분 정도 소요됩니다.
1. 조사가 완료되면 배너에서 발견 결과를 검토합니다.

   - **근본 원인**: Bits가 수집한 증거를 바탕으로 봤을 때 가장 가능성이 높은 오류 원인입니다.
   - **영향**: 오류가 사용자 및 서비스에 미치는 영향입니다.

   조사가 완료되면 배너에 근본 원인과 영향이 나란히 표시됩니다.

   {{< img src="error_tracking/bits_investigation/investigation_summary.png" alt="Bits Investigation이 찾은 근본 원인과 영향을 보여주는 Error Tracking 이슈의 Review 탭입니다." style="width:100%;" >}}

   사용 가능한 데이터가 결론을 뒷받침하기에 불충분한 경우, Bits는 조사 결과를 inconclusive(결론 도출 불가)로 표시합니다.
1. (선택 사항) 전체 조사를 보려면 배너에서 {{< ui >}}View Investigation{{< /ui >}}을 클릭합니다.

   조사 페이지에는 결론, 제안된 다음 단계, 증거 타임라인이 표시됩니다.

   {{< img src="error_tracking/bits_investigation/investigation_report.png" alt="Error Tracking 이슈에 대한 Bits Investigation 페이지로, 결론, 근본 원인, 영향, 제안된 다음 단계 및 타임라인이 표시됩니다." style="width:100%;" >}}

조사에 대해 후속 질문을 하려면 Bits Chat을 사용하세요. 자세한 내용은 [Bits Investigation과 채팅][6]을 참조하세요.

Bits가 결론을 도출하는 방법과 조사 단계를 탐색하는 방법에 대한 자세한 내용은 Investigate Issues의 [Bits의 조사 방법][5]을 참조하세요.

## 코드에서 이슈 해결 {#fix-the-issue-in-code}

근본 원인이 코드에 있는 경우, Bits Investigation은 [Bits Code][7]를 사용하여 수정안을 생성합니다. 수정안은 조사 페이지에 변경 요약 및 diff와 함께 제안된 다음 단계로 표시됩니다.

코드 수정안 다음 단계에는 풀 리퀘스트를 열거나 수정안을 반복 개선하는 등의 조치가 포함됩니다.

{{< img src="error_tracking/bits_investigation/code_fix_next_step.png" alt="제안된 다음 단계로, Bits Code에서 생성된 코드 수정안이 포함되며 요약, diff, Create PR 및 View in Bits Code 버튼이 표시됩니다." style="width:100%;" >}}

다음 단계에서는 아래와 같은 작업을 수행할 수 있습니다.

- {{< ui >}}Create PR{{< /ui >}}을 클릭하여 수정안이 포함된 풀 리퀘스트를 엽니다.
- {{< ui >}}View Full Diff{{< /ui >}}를 클릭하여 변경된 모든 파일을 검토합니다.
- {{< ui >}}View in Bits Code{{< /ui >}}를 클릭하여 Bits Code 세션에서 수정안을 반복 개선합니다.

Bits Code는 변경 사항을 자동으로 병합하지 않습니다. 생성된 코드를 병합하기 전에 검토하고 테스트하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/bits_ai/bits_investigation/
[2]: /ko/account_management/rbac/permissions/#bits-ai
[3]: /ko/source_code/
[4]: https://app.datadoghq.com/error-tracking
[5]: /ko/bits_ai/bits_investigation/investigate_issues/#how-bits-investigates
[6]: /ko/bits_ai/bits_investigation/chat_bits_investigation/
[7]: /ko/bits_ai/bits_code/
[8]: /ko/bits_ai/bits_code/setup/
[9]: https://app.datadoghq.com/bits-ai/investigations