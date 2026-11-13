---
aliases:
- /ko/continuous_integration/intelligent_test_runner/
- /ko/intelligent_test_runner
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-test-optimization
  tag: 학습 센터
  text: Test Optimization 시작하기
- link: https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/
  tag: 블로그
  text: Datadog Intelligent Test Runner를 통해 CI 테스트 간소화
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: 블로그
  text: Datadog으로 모든 CI 파이프라인 모니터링
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: 릴리스 노트
  text: 최신 Software Delivery 릴리스를 확인하세요! (앱 로그인 필요)
title: Test Impact Analysis
---
<div class="alert alert-danger"> 이 기능은 이전에는 Intelligent Test Runner로 알려져 있었으며, 일부 태그에는 여전히 'itr'이 포함되어 있습니다.</div>

## 개요 {#overview}

Test Impact Analysis는 변경된 코드를 기준으로 해당 커밋에 관련된 테스트만 자동으로 선택하여 실행합니다. 테스트 적용 범위를 유지하면서 테스트에 소요되는 시간과 전체 CI 비용을 크게 절감할 수 있습니다.

{{< img src="continuous_integration/itr_savings.png" alt="시간 절약 효과를 보여주는 테스트 세션에서 활성화된 Test Impact Analysis">}}

Test Impact Analysis는 테스트 모음을 분석하여 각 테스트가 다루는 코드를 식별하는 방식으로 작동합니다. 그런 다음 새로운 코드 변경으로 영향을 받는 파일과 해당 적용 범위를 상호 참조합니다. Datadog은 이 정보를 사용하여 관련성 있고 영향을 받는 테스트를 선별하여 실행하며, 코드 변경의 영향을 받지 않는 테스트는 생략하여 전체 테스트 시간을 단축합니다. [작동 방식][1]에 대한 자세한 내용을 확인하세요.

커밋당 실행되는 테스트 수를 최소화함으로써 Test Impact Analysis는 [불안정한 테스트][2]가 파이프라인을 방해하는 빈도를 줄입니다. 테스트의 불안정성이 테스트 중인 코드 변경과 관련이 없을 때는 특히 답답할 수 있습니다. 사용 중인 테스트 서비스에 대해 Test Impact Analysis를 활성화한 후, 각 커밋을 관련 테스트로 제한하여 코드 변경과 관련 없는 불안정한 테스트가 임의로 빌드를 중단시키지 않도록 할 수 있습니다.

### 기본 제공 구성 제한 사항 {#out-of-the-box-configuration-limitations}

기본 구성을 사용할 경우, Test Impact Analysis가 실행되어야 할 테스트를 건너뛰게 만드는 알려진 상황이 있습니다. 구체적으로, Test Impact Analysis는 다음 항목의 변경 사항을 자동으로 탐지할 수 없습니다.

- 라이브러리 종속성
- 컴파일러 옵션
- 외부 서비스
- 데이터 기반 테스트에서 데이터 파일 변경 사항

이러한 시나리오에서는 기본 제공 구성을 사용할 경우 Test Impact Analysis가 영향을 받는 테스트를 건너뛸 수 있습니다.

이러한 시나리오에서 테스트를 건너뛰지 않도록 보장하기 위해 사용할 수 있는 몇 가지 구성 메커니즘이 있습니다.

- 리포지토리의 특정 파일을 [추적된 파일](#tracked-files)로 표시할 수 있으며, 이 경우 해당 파일이 변경될 때마다 모든 테스트가 실행됩니다. Dockerfiles, Makefiles, 종속성 파일 및 기타 빌드 구성 파일은 추적된 파일로 지정하기에 적합합니다.
- 소스의 특정 테스트를 건너뛸 수 없는 테스트로 표시하여 항상 실행되도록 할 수 있습니다. 이는 데이터 기반 테스트나 외부 시스템과 상호 작용하는 테스트에 적합합니다. 자세한 내용은 [설정 페이지][3]를 참조하세요.
- 위험한 커밋을 작성 중이고 모든 테스트를 실행하려면 Git 커밋 메시지 어디에든 `ITR:NoSkip`(대소문자 구분 안 함)을 추가합니다.
- GitHub를 소스 코드 관리 공급자로 사용하는 경우 `ITR:NoSkip` 레이블(대소문자 구분 안 함)을 사용하여 풀 리퀘스트에서 Test Impact Analysis가 테스트를 건너뛰지 않도록 합니다. 이 기능을 사용하려면 `Software Delivery: Collect Pull Request Information` 기능이 활성화된 상태에서 [GitHub 통합 타일][9]을 사용하여 GitHub App을 구성합니다. 이 메커니즘은 `pull_request` 이벤트로 트리거되는 GitHub 작업에서 실행되는 테스트에는 작동하지 않습니다.
- [제외된 브랜치](#excluded-branches) 목록을 추가할 수 있는데, 그러면 해당 브랜치에서 Test Impact Analysis가 비활성화됩니다.

## 규모 및 정확도 제한 {#scale-and-accuracy-limits}

Test Impact Analysis는 각 테스트가 다루는 파일과 커밋이 변경하는 파일을 대조하여 건너뛸 테스트를 결정합니다. 이어지는 동작은 매칭이 의도적으로 보수적인 알려진 사례이므로 무엇을 예상해야 하는지 알 수 있습니다.

<div class="alert alert-info">이 섹션의 모든 동작은 설계상 안전합니다. 즉, <strong>더 많은</strong> 테스트가 실행될 수만 있으며 실행되어야 할 테스트를 건너뛰는 일은 절대 없습니다. Datadog이 자동으로 탐지할 수 없는 코드 변경 사항은 <a href="#out-of-the-box-configuration-limitations">기본 제공 구성 제한 사항</a>을 참조하세요.</div>

### 규모 제한 {#scale-limits}

Test Impact Analysis에는 다음과 같은 크기 제한이 적용됩니다.

- Datadog은 변경 사항에 대해 가장 최근 커밋 100개까지 분석합니다. 대규모 변경 세트의 경우 일부 이전 커밋은 분석되지 않을 수 있으므로 건너뛰는 테스트 수가 약간 줄어듭니다.
- 단일 커밋이 5,000개가 넘는 파일을 변경하는 경우 해당 커밋은 영향 분석 대상에서 제외되며, 테스트는 건너뛰지 않고 실행됩니다.
- 단일 테스트나 테스트 모음이 16,000개가 넘는 파일을 다루는 경우 건너뛰지 않습니다.

### 적용 범위 매칭의 오탐 {#false-positives-in-coverage-matching}

테스트가 변경된 파일을 포함하는지 검사하기 위해 Datadog은 공간 효율적인 확률적 데이터 구조(Bloom 필터)를 사용합니다. 이러한 구조는 고유한 오탐률(약 0.04%)이 낮으므로, 건너뛸 수 있었던 테스트 중 일부가 어쨌든 실행될 수 있습니다.

Test Impact Analysis가 예상대로 작동하지 않으면 [문제 해결][12] 페이지를 참조하세요.

## Datadog 라이브러리 설정 {#set-up-a-datadog-library}

Test Impact Analysis를 설정하기 전에 특정 언어에 대한 [Test Optimization][4]을 구성해야 합니다. Agent를 통해 데이터를 보고하는 경우 v6.40 또는 v7.40 이상을 사용하세요.

{{< whatsnext desc="Datadog에서 Test Impact Analysis를 설정할 언어를 선택합니다." >}}
    {{< nextlink href="intelligent_test_runner/setup/dotnet" >}}.NET{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/javascript" >}}JavaScript{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/swift" >}}Swift{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/ruby" >}}Ruby{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/go" >}}Go{{< /nextlink >}}
{{< /whatsnext >}}

## 구성 {#configuration}

Test Impact Analysis를 위한 Datadog 라이브러리를 설정한 후 [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][5]에서 구성합니다. Test Impact Analysis를 활성화하려면 `Test Optimization Settings Write` 권한이 필요합니다.

Test Impact Analysis는 세 가지 수준에서 구성할 수 있으며, 하위 수준은 상위 수준의 값을 재정의할 수 있습니다.

- **조직 기본값**: 재정의되지 않는 한 모든 리포지토리에 적용됩니다. {{< ui >}}CI/CD Optimization{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Repositories{{< /ui >}}를 열고 {{< ui >}}Organization{{< /ui >}} 탭을 선택합니다.
- **리포지토리**: 특정 리포지토리에 대한 조직 기본값을 재정의합니다. {{< ui >}}CI/CD Optimization{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Repositories{{< /ui >}}를 열고 {{< ui >}}Repository-specific{{< /ui >}} 탭을 선택한 다음 리포지토리를 선택합니다.
- **테스트 서비스**: 특정 테스트 서비스에 대한 리포지토리 설정을 재정의합니다. 리포지토리를 열고 대상 테스트 서비스에 대한 재정의를 편집합니다.

리포지토리 및 테스트 서비스 수준에서 각 설정은 상위 수준의 값을 {{< ui >}}Inherit{{< /ui >}}하거나 현재 수준에서 {{< ui >}}Custom{{< /ui >}} 값으로 설정할 수 있습니다.

{{< img src="/getting_started/intelligent_test_runner/test-impact-analysis-gs-configuration-1.png" alt="CI/CD 설정 페이지에서 리포지토리에 대한 Test Impact Analysis를 활성화합니다." style="width:80%" >}}

### Git 실행 파일 {#git-executable}

Test Impact Analysis가 작동하려면 테스트를 실행하는 호스트에서 [Git][6]을 사용할 수 있어야 합니다.

### 제외된 브랜치 {#excluded-branches}

위에서 설명한 [제한 사항](#out-of-the-box-configuration-limitations)으로 인해 리포지토리의 기본 브랜치는 Test Impact Analysis가 활성화되지 않도록 자동으로 제외됩니다. 프로덕션에 배포하기 전에 모든 테스트가 실행되도록 하려면 이 구성을 사용하는 것이 좋습니다.

제외하려는 다른 브랜치가 있는 경우 CI/CD 설정 페이지에서 추가하세요. 쿼리 표시줄에서는 와일드카드 문자 `*`를 사용하여 일치하는 모든 브랜치를 제외할 수 있습니다(예: `release_*`).

제외된 브랜치는 테스트별 코드 적용 범위를 수집하며, 이는 전체 테스트 시간에 영향을 줍니다. 그러나 Datadog은 코드 적용 범위를 활성화한 상태로 실행했을 때 새로 얻는 적용 범위 정보가 수집 비용을 상쇄할 만큼 충분하다고 탐지한 경우에만 코드 적용 범위를 수집하므로 이러한 성능 영향을 완화할 수 있습니다. `@test.code_coverage.enabled` 필드를 검사하여 테스트 세션에서 코드 적용 범위가 활성화되었는지 확인할 수 있습니다.

### 추적된 파일 {#tracked-files}

추적된 파일은 테스트에 잠재적으로 영향을 줄 수 있는 비코드 파일입니다. 추적된 파일이 변경되면 테스트에 실패하거나 테스트의 코드 적용 범위가 변경될 수 있습니다. 추적된 파일로 추가하기 좋은 파일의 예는 다음과 같습니다.

- CI 환경에 사용되는 Dockerfile
- 종속성을 정의하는 파일(예: Maven의 `pom.xml`, Python의 `requirements.txt`, Javascript의 `package.json`)
- Makefile

추적된 파일 세트를 지정하면 이러한 파일 중 하나라도 변경될 경우 Test Impact Analysis가 모든 테스트를 실행합니다.

모든 파일 경로는 리포지토리 루트를 기준으로 간주됩니다. `*` 및 `**` 와일드카드 문자를 사용하여 여러 파일이나 디렉터리를 일치시킬 수 있습니다. 예를 들어, `**/*.mdx`는 리포지토리의 모든 `.mdx` 파일과 일치합니다.

{{< img src="/getting_started/intelligent_test_runner/test-impact-analysis-gs-config-1.png" alt="제외할 브랜치와 추적된 파일을 선택합니다." style="width:80%" >}}

## 코드 적용 범위 백필 {#code-coverage-backfilling}

[Code Coverage][10]와 Test Impact Analysis를 함께 사용하면, Test Impact Analysis가 코드 변경으로 인해 실행할 필요가 없는 테스트를 건너뛰기 때문에 보고된 전체 코드 적용 범위가 왜곡될 수 있습니다.

코드 적용 범위 백필은 건너뛴 테스트나 테스트 모음을 포함하도록 보고된 전체 적용 범위를 조정하여 Test Impact Analysis로 인한 절감 효과가 전체 적용 범위를 왜곡하지 않도록 합니다.

코드 적용 범위 백필은 Java, .NET, Go 및 JavaScript에서 지원됩니다. Ruby, Python 또는 Swift에는 지원되지 않습니다.

백필은 최선의 노력(best effort) 방식으로 수행됩니다. 대규모 테스트 모음의 경우 Test Impact Analysis에서 건너뛴 일부 테스트의 적용 범위가 백필되지 않을 수 있습니다. 결과적으로 보고된 총 적용 범위는 실제 적용 범위보다 약간 낮을 수 있습니다. 백필은 건너뛸 테스트 결정에는 영향을 주지 않습니다.

### Java, .NET 및 Go {#java-net-and-go}

`dd-trace-java`, `dd-trace-dotnet` 및 `ddtest instrument`를 사용하면 백필에 추가 구성이 필요하지 않습니다. 이러한 라이브러리는 테스트가 코드 적용 범위 엔진과 함께 실행될 때를 자동으로 탐지하고 Test Impact Analysis가 건너뛴 테스트의 코드 적용 범위 데이터를 백필합니다.

### JavaScript {#javascript}

`dd-trace-js`를 사용하는 경우 백필하려면 코드 적용 범위 보고서를 업로드해야 합니다. Datadog 라이브러리가 건너뛴 테스트나 테스트 모음의 적용 범위도 포함하도록 보고된 총 적용 범위를 조정할 수 있게 [조직 수준 CI/CD 최적화 설정][11]에서 코드 적용 범위 업로드를 활성화합니다.

## 테스트 세션 살펴보기 {#explore-test-sessions}

테스트 커밋 페이지와 테스트 세션 패널을 통해 Test Impact Analysis에서 단축되는 시간을 살펴볼 수 있습니다.

{{< img src="continuous_integration/itr_commit.png" alt="Test Impact Analysis가 활성화된 테스트 커밋 페이지" style="width:80%;">}}

{{< img src="continuous_integration/itr_savings.png" alt="시간 절약 효과를 보여주는 테스트 세션에서 활성화된 Test Impact Analysis" style="width:80%;">}}

Test Impact Analysis가 활성화되어 테스트를 건너뛸 때, 각 테스트 세션 또는 각 커밋에서 절감된 시간이 보라색 텍스트로 표시됩니다. [Test Runs][7] 페이지에서 어떤 테스트 세션이 Test Impact Analysis를 사용하고 있는지 식별할 수 있도록 지속 시간 표시줄의 색상도 보라색으로 변경됩니다.

## 도입 및 전체 시간 절감 효과 살펴보기 {#explore-adoption-and-global-savings}

기본 제공되는 [Test Impact Analysis 대시보드][8]를 통해 조직의 Test Impact Analysis 도입 현황과 그로 인한 시간 단축 효과를 추적할 수 있습니다. 대시보드에는 전체 시간 절감 효과를 추적하는 위젯과 함께 리포지토리별, 커미터별, 서비스별로 데이터를 조회하는 기능이 포함되어 있습니다. 대시보드를 조회하여 조직의 어떤 부분에서 Test Impact Analysis를 사용하여 가장 큰 효과를 얻고 있는지 파악할 수 있습니다.

{{< img src="continuous_integration/itr_dashboard1.png" alt="Test Impact Analysis 대시보드" style="width:80%;">}}

또한 대시보드는 Test Impact Analysis의 전사적 도입 현황도 추적합니다.

{{< img src="continuous_integration/itr_dashboard2.png" alt="Test Impact Analysis 대시보드" style="width:80%;">}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tests/test_impact_analysis/how_it_works/
[2]: /ko/glossary/#flaky-test
[3]: /ko/tests/test_impact_analysis/setup
[4]: /ko/continuous_integration/tests/
[5]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[6]: https://git-scm.com/
[7]: https://app.datadoghq.com/ci/test-runs
[8]: https://app.datadoghq.com/dash/integration/30941/ci-visibility-intelligent-test-runner
[9]: /ko/integrations/github/
[10]: /ko/code_coverage/
[11]: https://app.datadoghq.com/ci/settings/ci-cd/repositories?tab=organization
[12]: /ko/tests/test_impact_analysis/troubleshooting/