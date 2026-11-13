---
description: 조기 불안정성 탐지, 자동 테스트 재시도, 불안정한 테스트 관리를 포함한 Test Optimization 기능이 리포지토리에서
  올바르게 작동하는지 검사하세요.
further_reading:
- link: /tests/guides/setup_new_flaky_pr_gate
  tag: 설명서
  text: 신규 불안정한 테스트 PR 게이트 설정
- link: /tests/flaky_tests/early_flake_detection
  tag: 설명서
  text: Early Flake Detection에 대해 알아보기
- link: /tests/flaky_tests/auto_test_retries
  tag: 설명서
  text: 자동 테스트 재시도에 대해 알아보기
- link: /tests/flaky_management
  tag: 설명서
  text: 불안정한 테스트(Flaky Test) 관리에 대해 알아보기
title: 최적화 검증
---
이 페이지에서는 [Test Optimization][12]에서 제공하는 최적화 기능이 **단일 리포지토리**에서 의도대로 작동하는지 검사하는 방법을 설명합니다. 로컬 검증을 사용하여 라이브러리 호환성 및 지원되는 기능을 확인하거나, Test Optimization을 설정한 후 Datadog에서 전체 워크플로를 검증하세요.

<div class="alert alert-warning">기능 브랜치에서 이러한 검증을 실행하세요. 옵션 2의 임시 테스트나 전용 서비스 구성을 기본 또는 메인 브랜치에 병합하지 마세요.</div>

## 전제 조건 {#prerequisites}

이러한 최적화에는 [지원되는 네이티브 라이브러리][12]가 필요합니다. JUnit XML 업로드는 지원되지 않습니다.

## 옵션 1: ddtest로 로컬 검증 {#option-1-validate-locally-with-ddtest}

{{< callout url="#" btn_hidden="true" header="미리 보기에 참여하세요!" >}}
  ddtest를 사용한 로컬 검증은 현재 미리 보기로 제공되고 있습니다.
{{< /callout >}}

[ddtest][15]를 사용하여 로컬에서 Test Optimization을 검사하세요. ddtest는 계측을 적용한 경우와 적용하지 않은 경우의 테스트 결과를 비교합니다. 그런 다음 임시 테스트를 사용하여 Early Flake Detection, Auto Test Retries 및 Test Management를 포함한 지원되는 기능을 확인합니다. 검증에는 로컬 수집이 사용되므로 Datadog 계정, API 키 또는 Datadog Agent가 필요하지 않습니다. 검증 결과를 Datadog으로 전송하거나 Datadog 설정을 변경하지도 않습니다.

Datadog에서는 온보딩과 로컬 검증에 로컬 코딩 에이전트를 사용할 것을 권장합니다. 에이전트는 ddtest의 지침에 따라 계측을 설정하고, 검증을 실행하고, 진행을 방해하는 문제를 해결하고, 결과를 설명합니다. 명령어를 직접 실행하려면 [수동 지침](#run-ddtest-yourself)을 사용하세요.

로컬 검증은 다음 언어 및 프레임워크를 지원합니다.

| 언어 | 테스트 프레임워크 |
| --- | --- |
| JavaScript 및 TypeScript | Jest, Vitest, Mocha, Playwright, Cypress, Cucumber, WebdriverIO |
| Python | pytest |
| Ruby | RSpec, Minitest |
| Java(Maven 또는 Gradle) | JUnit 4, JUnit 5, TestNG, Spock, Cucumber JVM, Karate, ScalaTest, MUnit |

런타임 요구 사항, 프레임워크별 설정 및 기능 제한 사항은 [ddtest 문서][15]를 참조하세요.

### ddtest 설치 {#install-ddtest}

로컬 검증을 위해서는 [ddtest v1.16.0][18] 이상이 필요합니다. ddtest가 이미 설치되어 있는 경우 `ddtest --version`으로 버전을 확인하고 설치 프로그램을 다시 실행하여 업그레이드하세요.

macOS 또는 Linux에 최신 릴리스를 설치하세요.

```bash
curl -fsSL https://github.com/DataDog/ddtest/releases/latest/download/install.sh | bash
export PATH="$HOME/.local/bin:$PATH"
```

Windows에서는 PowerShell에서 설치 프로그램을 실행하세요.

```powershell
irm https://github.com/DataDog/ddtest/releases/latest/download/install.ps1 | iex
```

설치 프로그램은 릴리스의 체크섬을 기준으로 다운로드를 확인합니다. 버전 선택 및 사용자 지정 설치 디렉터리에 대해서는 [ddtest 설치][17]를 참조하세요.

### 로컬 코딩 에이전트 사용(권장) {#use-a-local-coding-agent-recommended}

파일을 검사하고 명령을 실행할 수 있는 코딩 에이전트에서 리포지토리의 로컬 Git 체크아웃을 여세요. ddtest를 설치한 후 다음 프롬프트를 제공하세요.

```text
Use ddtest to onboard this repository to Test Optimization.
```

제안된 변경 사항을 검토하고 에이전트가 요청하는 환경 세부 정보를 제공하세요. 에이전트가 로컬 검증을 실행하고, HTML 보고서 링크와 실패했거나 검증되지 않은 검사 항목을 포함한 결과를 보고합니다.

### 직접 ddtest 실행 {#run-ddtest-yourself}

#### 1단계: 테스트 설정 검사 {#step-1-inspect-the-test-setup}

리포지토리의 로컬 Git 체크아웃에서 시작하세요. 프로젝트의 테스트 종속성을 설치하고 테스트에 필요한 브라우저, 데이터베이스 또는 기타 서비스를 준비하세요. 그리고 다음을 실행합니다.

```bash
ddtest onboard
```

이 명령은 언어, 테스트 프레임워크 및 CI 공급자를 감지한 다음 후속 설정 또는 검증 작업을 반환합니다.

지원되는 JavaScript 설정에서는 `--apply`를 사용하여 설정에 적용될 정확한 편집 내용을 미리 보세요. 예:

```bash
ddtest onboard --framework jest --apply
```

편집 내용을 검토한 후 `--yes`를 추가하여 적용하고 로컬 검증을 실행하세요.

```bash
ddtest onboard --framework jest --apply --yes
```

검증이 성공하면 [결과 검토](#step-3-review-the-results)로 이동하세요.

자동 편집 기능이 없는 설정의 경우 `ddtest onboard`에서 반환된 설정 지침을 따르세요. 자세한 수동 설정 지침을 출력하려면 `ddtest onboard --instructions`을 실행하세요.

리포지토리에 여러 프레임워크나 CI 공급자가 포함되어 있는 경우 하나를 명시적으로 선택하세요. 예:

```bash
ddtest onboard --framework jest --ci-provider github
```

후속 검증 명령에 동일한 선택 항목을 사용하세요. 확인하려는 각 프레임워크 및 CI 공급자에 대해 검증을 별도로 실행하세요.

#### 2단계: 로컬 검증 실행 {#step-2-run-local-validation}

Datadog SDK를 설치하거나 테스트를 실행하지 않고 발견된 모든 CI 테스트 구성을 검사하려면 다음을 실행하세요.

```bash
ddtest testdrive --all --check-only
```

구성 확인만으로는 기능 동작을 검증할 수 없습니다. 전체 로컬 검증 실행:

```bash
ddtest testdrive --all
```

명령 및 변경 사항의 미리 보기를 검토한 후 실행을 확인하세요. 비대화형 터미널에서는 미리 보기를 검토한 후 `--yes`를 추가하세요.

특정 테스트 명령을 검증하려면 `--all` 대신 `--command`를 사용하세요. 예:

```bash
ddtest testdrive --framework jest --command "npm test"
```

하나의 명령에 대한 검사가 성공했다고 해서 다른 CI 구성까지 검증된 것은 아닙니다. ddtest에서 보고한 누락된 종속 항목, 지원되지 않는 구성 또는 기타 진행 방해 요인을 해결한 후 검증을 다시 실행하세요.

#### 3단계: 결과 검토 {#step-3-review-the-results}

명령 출력에 연결된 HTML 보고서(일반적으로 `.testoptimization/report.html`)를 여세요. 해당 `.testoptimization/testdrive.json`에는 기계 판독 가능한 결과가 포함되어 있습니다. 기준 비교, 기능 확인 및 아직 검증되지 않은 구성을 검토하세요. 기능 지원은 프레임워크 및 Datadog SDK에 따라 다르며, 지원되지 않는 기능은 보고서에 나열되어 있습니다.

보고서를 검토용으로 보관하고, 소스 파일, 종속성 또는 런타임을 변경한 후 전체 검증을 다시 실행하세요. 로컬 보고서가 커밋에 포함되지 않도록 `.gitignore`에 `.testoptimization/`를 추가하세요.

로컬 검증은 라이브러리 동작 및 CI 구성을 확인합니다. Datadog 처리, PR Gates 및 전체 [Prevention](#step-2-prevention), [Mitigation](#step-3-mitigation), [Remediation](#step-4-remediation) 워크플로를 검증하거나 지원되지 않는 언어 또는 프레임워크를 검증하려면 [옵션 2](#option-2-validate-the-full-workflow)를 사용하세요.

## 옵션 2: 전체 워크플로 검증 {#option-2-validate-the-full-workflow}

이 검증 워크플로는 Datadog의 전체 Test Optimization 워크플로를 검증합니다. 이 검증들은 동일한 브랜치와 테스트를 사용하므로 [예방](#step-2-prevention), [완화](#step-3-mitigation), [수정](#step-4-remediation) 순서대로 수행하세요.

### 1단계: 검증 설정 {#step-1-set-up-validation}

이 가이드는 로컬 변경 사항을 만들고 CI가 실행되도록 커밋하는 과정을 안내합니다. 이 가이드는 전용 테스트 서비스와 브랜치를 사용하여 검증 워크플로가 리포지토리의 다른 개발자에게 미치는 영향을 최소화합니다.

1. 테스트 명령을 실행하기 전에 `DD_SERVICE`를 설정하도록 CI 테스트 작업을 구성하세요.

   ```bash
   export DD_SERVICE=validate-test-optimization
   ```

2. 검증 브랜치를 생성합니다.

   ```bash
   git checkout -b validate-test-optimization
   ```

3. CI 구성 변경 사항 중 `DD_SERVICE`를 설정하는 항목을 커밋한 다음, 검증 브랜치를 푸시하여 테스트 실행을 트리거합니다.

   ```bash
   git add -A
   git commit -m "Configure Test Optimization validation service"
   git push -u origin validate-test-optimization
   ```

   Datadog은 테스트가 해당 이름으로 보고될 때 `validate-test-optimization` 서비스를 감지합니다.

4. CI가 완료되면 [CI/CD 리포지토리 설정][3]으로 이동하여 검증 중인 리포지토리를 선택합니다.

   {{< img src="pr_gates/setup/ci_cd_repositories_settings.png" alt="검증 중인 리포지토리로 필터링된 CI/CD 리포지토리 설정" style="width:100%" >}}

5. 슬라이드 아웃 패널 오른쪽 상단에서 {{< ui >}}Test Service{{< /ui >}}를 클릭합니다.

   {{< img src="pr_gates/setup/repository_settings_test_services.png" alt="오른쪽 상단 모서리에 테스트 서비스 버튼이 있는 리포지토리 설정" style="width:100%" >}}

6. {{< ui >}}Test service overrides{{< /ui >}}에서 `validate-test-optimization` 서비스를 선택합니다.

   {{< img src="pr_gates/setup/test_service_overrides.png" alt="리포지토리에 대해 감지된 테스트 서비스를 보여주는 테스트 서비스 재정의" style="width:100%" >}}

7. 다음 서비스 재정의를 구성합니다.
   - [조기 불안정성 탐지][1]를 활성화합니다.
   - [자동 테스트 재시도][4]를 활성화합니다.
   - [Test Impact Analysis][13]를 비활성화합니다(유효성 검사 테스트를 건너뛰지 않도록 하기 위함).
8. 리포지토리 설정으로 돌아갑니다. [불안정한 테스트 정책][6]는 개별 테스트 서비스가 아닌 리포지토리의 모든 테스트 서비스에 적용됩니다. 검증 정책의 영향을 제한하려면 `validate-test-optimization` 브랜치에 대해서만 구성하세요. {{< ui >}}Flaky Test Policies{{< /ui >}} 아래의 {{< ui >}}Quarantine{{< /ui >}} 타일에서 {{< ui >}}Configure{{< /ui >}}를 클릭합니다.

   {{< img src="pr_gates/setup/flaky_test_policies_quarantine.png" alt="불안정한 테스트 격리 규칙에 대한 구성 버튼을 보여주는 리포지토리 설정" style="width:100%" >}}

9. 두 번째 자동 규칙 활성화: **`validate-test-optimization` 브랜치에서 활성 상태인 불안정한 테스트가 발생하면 'Quarantined'로 이동합니다**.

   {{< img src="pr_gates/setup/quarantine_branch_policy.png" alt="validate-test-optimization 브랜치의 활성 상태인 불안정한 테스트에 대해 구성된 격리 정책" style="width:100%" >}}

10. {{< ui >}}Save{{< /ui >}}를 클릭합니다. 
11. [신규 불안정한 테스트 PR 게이트][11]를 생성하고 검증 중인 리포지토리로 범위를 지정합니다.

   {{< img src="pr_gates/setup/pr_gate_scope.png" alt="신규 불안정한 테스트 PR 게이트 범위" style="width:100%" >}}

### 2단계: 예방 {#step-2-prevention}

[조기 불안정성 탐지][1]는 새로운 불안정한 테스트를 감지합니다. [New Flaky Test PR Gates][2]는 해당 테스트가 기본 브랜치에 도달하지 못하도록 차단합니다.

1. 첫 번째 시도에서 실패하고 재시도 시 통과하는 테스트를 추가합니다(아래 제공된 코드를 필요시 사용). Datadog에서 식별할 수 있도록 테스트 이름에 `flaky`와 `validation`이 모두 포함되어야 합니다.

   {{< tabs >}}
   {{% tab "JavaScript" %}}

   ```javascript
   const fs = require('node:fs');
   const os = require('node:os');
   const path = require('node:path');

   test('flaky validation test', () => {
       const marker = path.join(os.tmpdir(), 'dd-validation-flaky');
       if (!fs.existsSync(marker)) {
           fs.writeFileSync(marker, '1');
           throw new Error('first attempt fails so Datadog can retry it');
       }
   });
   ```

   {{% /tab %}}
   {{% tab "Python" %}}

   ```python
   from pathlib import Path
   from tempfile import gettempdir


   def test_flaky_validation_test():
       marker = Path(gettempdir()) / "dd-validation-flaky"
       if not marker.exists():
           marker.write_text("1")
           raise AssertionError("first attempt fails so Datadog can retry it")
   ```

   {{% /tab %}}
   {{% tab "Java" %}}

   ```java
   import static org.junit.jupiter.api.Assertions.fail;

   import java.io.IOException;
   import java.nio.file.Files;
   import java.nio.file.Path;
   import java.nio.file.Paths;
   import org.junit.jupiter.api.Test;

   class ValidationFlakyTest {
       @Test
       void flakyValidationTest() throws IOException {
           Path marker = Paths.get(
               System.getProperty("java.io.tmpdir"),
               "dd-validation-flaky"
           );
           if (Files.notExists(marker)) {
               Files.write(marker, new byte[] { '1' });
               fail("first attempt fails so Datadog can retry it");
           }
       }
   }
   ```

   {{% /tab %}}
   {{% tab "Ruby" %}}

   ```ruby
   require 'tmpdir'

   RSpec.describe 'validation flaky tests' do
     it 'flaky validation test' do
       marker = File.join(Dir.tmpdir, 'dd-validation-flaky')
       unless File.exist?(marker)
         File.write(marker, '1')
         raise 'first attempt fails so Datadog can retry it'
       end
     end
   end
   ```

   {{% /tab %}}
   {{% tab ".NET" %}}

   ```csharp
   using System.IO;
   using Xunit;

   public class ValidationFlakyTests
   {
       [Fact]
       public void FlakyValidationTest()
       {
           var marker = Path.Combine(Path.GetTempPath(), "dd-validation-flaky");
           if (!File.Exists(marker))
           {
               File.WriteAllText(marker, "1");
               throw new System.Exception("first attempt fails so Datadog can retry it");
           }
       }
   }
   ```

   {{% /tab %}}
   {{% tab "Go" %}}

   ```go
   package validation

   import (
       "errors"
       "os"
       "path/filepath"
       "testing"
   )

   func TestFlakyValidationTest(t *testing.T) {
       marker := filepath.Join(os.TempDir(), "dd-validation-flaky")
       if _, err := os.Stat(marker); errors.Is(err, os.ErrNotExist) {
           if writeErr := os.WriteFile(marker, []byte("1"), 0600); writeErr != nil {
               t.Fatal(writeErr)
           }
           t.Fatal("first attempt fails so Datadog can retry it")
       }
   }
   ```

   {{% /tab %}}
   {{% tab "Swift" %}}

   ```swift
   import XCTest

   final class ValidationFlakyTests: XCTestCase {
       func testFlakyValidationTest() throws {
           let marker = FileManager.default.temporaryDirectory
               .appendingPathComponent("dd-validation-flaky")
           if !FileManager.default.fileExists(atPath: marker.path) {
               try "1".write(to: marker, atomically: true, encoding: .utf8)
               XCTFail("first attempt fails so Datadog can retry it")
           }
       }
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}

2. 테스트를 커밋하고 푸시한 다음, 검증 브랜치에서 풀 리퀘스트를 엽니다.

   ```bash
   git add -A
   git commit -m "Validate Test Optimization prevention"
   git push origin validate-test-optimization
   ```

3. CI가 실행될 때까지 기다립니다. 조기 불안정성 감지가 새 테스트를 재시도하고, 신규 불안정한 테스트 PR 게이트가 결과를 평가합니다. 풀 리퀘스트에 대한 GitHub 검사에서 신규 불안정한 테스트 PR 게이트가 실패하는지 확인합니다.

   {{< img src="pr_gates/setup/failed_pr_gate.png" alt="새로운 불안정한 테스트가 감지되어 실패한 GitHub 풀 리퀘스트 검사" style="width:100%" >}}

4. 실패한 GitHub 검사를 클릭하고 해당 테스트가 새로운 불안정한 테스트 목록에 포함되어 있는지 확인합니다.

   {{< img src="pr_gates/setup/pr_gate_detail.png" alt="Datadog PR 게이트 세부 정보 보기" style="width:100%" >}}

5. [테스트 실행][7]에서 조기 불안정성 탐지가 테스트를 재시도했는지, 그리고 다음 필터를 사용하는 [이 쿼리][7]를 사용하여 새로운 불안정한 테스트로 감지했는지 확인합니다.

   - `@test.name:*flaky*validation*`
   - `@git.branch:validate-test-optimization`
   - `@test.retry_reason:early_flake_detection`
   - `@test.test_management.is_new_flaky:true`

### 3단계: 완화 {#step-3-mitigation}

완화는 [자동 테스트 재시도][4], [불안정한 테스트 관리][5] 및 [불안정한 테스트 정책][6]을 통해 이루어집니다. 이러한 기능은 불안정한 테스트를 재시도하고 알려진 불안정한 실패를 격리하여 CI를 차단하지 않도록 합니다.

1. [예방](#step-2-prevention)을 위해 추가한 동일한 테스트에서 마커 파일 이름을 `dd-validation-flaky`에서 `dd-validation-flaky-mitigation`으로 변경합니다. 테스트 함수나 테스트 케이스의 이름을 변경하지 마세요. 새 마커는 또 다른 의도적인 첫 번째 시도 실패를 유발합니다. 테스트 이름을 변경하지 않고 유지하면 Datadog이 해당 실행을 [예방](#step-2-prevention) 중에 감지된 불안정한 테스트와 연결할 수 있습니다. 추가적인 Datadog 구성은 필요하지 않으며, 자동 테스트 재시도 및 불안정한 테스트 관리가 이 실행 중에 테스트를 처리합니다. 사용 중인 언어에 맞게 테스트를 업데이트합니다.

   {{< tabs >}}
   {{% tab "JavaScript" %}}

   ```javascript
   const fs = require('node:fs');
   const os = require('node:os');
   const path = require('node:path');

   test('flaky validation test', () => {
       // Changed from dd-validation-flaky.
       const marker = path.join(os.tmpdir(), 'dd-validation-flaky-mitigation');
       if (!fs.existsSync(marker)) {
           fs.writeFileSync(marker, '1');
           throw new Error('first attempt fails so Datadog can retry it');
       }
   });
   ```

   {{% /tab %}}
   {{% tab "Python" %}}

   ```python
   from pathlib import Path
   from tempfile import gettempdir


   def test_flaky_validation_test():
       # Changed from dd-validation-flaky.
       marker = Path(gettempdir()) / "dd-validation-flaky-mitigation"
       if not marker.exists():
           marker.write_text("1")
           raise AssertionError("first attempt fails so Datadog can retry it")
   ```

   {{% /tab %}}
   {{% tab "Java" %}}

   ```java
   import static org.junit.jupiter.api.Assertions.fail;

   import java.io.IOException;
   import java.nio.file.Files;
   import java.nio.file.Path;
   import java.nio.file.Paths;
   import org.junit.jupiter.api.Test;

   class ValidationFlakyTest {
       @Test
       void flakyValidationTest() throws IOException {
           // Changed from dd-validation-flaky.
           Path marker = Paths.get(
               System.getProperty("java.io.tmpdir"),
               "dd-validation-flaky-mitigation"
           );
           if (Files.notExists(marker)) {
               Files.write(marker, new byte[] { '1' });
               fail("first attempt fails so Datadog can retry it");
           }
       }
   }
   ```

   {{% /tab %}}
   {{% tab "Ruby" %}}

   ```ruby
   require 'tmpdir'

   RSpec.describe 'validation flaky tests' do
     it 'flaky validation test' do
       # Changed from dd-validation-flaky.
       marker = File.join(Dir.tmpdir, 'dd-validation-flaky-mitigation')
       unless File.exist?(marker)
         File.write(marker, '1')
         raise 'first attempt fails so Datadog can retry it'
       end
     end
   end
   ```

   {{% /tab %}}
   {{% tab ".NET" %}}

   ```csharp
   using System.IO;
   using Xunit;

   public class ValidationFlakyTests
   {
       [Fact]
       public void FlakyValidationTest()
       {
           // Changed from dd-validation-flaky.
           var marker = Path.Combine(Path.GetTempPath(), "dd-validation-flaky-mitigation");
           if (!File.Exists(marker))
           {
               File.WriteAllText(marker, "1");
               throw new System.Exception("first attempt fails so Datadog can retry it");
           }
       }
   }
   ```

   {{% /tab %}}
   {{% tab "Go" %}}

   ```go
   package validation

   import (
       "errors"
       "os"
       "path/filepath"
       "testing"
   )

   func TestFlakyValidationTest(t *testing.T) {
       // Changed from dd-validation-flaky.
       marker := filepath.Join(os.TempDir(), "dd-validation-flaky-mitigation")
       if _, err := os.Stat(marker); errors.Is(err, os.ErrNotExist) {
           if writeErr := os.WriteFile(marker, []byte("1"), 0600); writeErr != nil {
               t.Fatal(writeErr)
           }
           t.Fatal("first attempt fails so Datadog can retry it")
       }
   }
   ```

   {{% /tab %}}
   {{% tab "Swift" %}}

   ```swift
   import XCTest

   final class ValidationFlakyTests: XCTestCase {
       func testFlakyValidationTest() throws {
           // Changed from dd-validation-flaky.
           let marker = FileManager.default.temporaryDirectory
               .appendingPathComponent("dd-validation-flaky-mitigation")
           if !FileManager.default.fileExists(atPath: marker.path) {
               try "1".write(to: marker, atomically: true, encoding: .utf8)
               XCTFail("first attempt fails so Datadog can retry it")
           }
       }
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}

2. 동일한 브랜치에서 변경 사항을 커밋하고 푸시합니다.

   ```bash
   git add -A
   git commit -m "Validate Test Optimization mitigation"
   git push origin validate-test-optimization
   ```

3. CI가 실행될 때까지 기다린 후 다음 결과를 확인합니다.

   - [테스트 실행][8]에서 자동 테스트 재시도가 첫 번째 실패 후 테스트를 다시 실행하며, 재시도에서 테스트가 통과합니다. [이 쿼리][8]를 다음 필터와 함께 사용하세요.
     - `@test.name:*flaky*validation*`
     - `@git.branch:validate-test-optimization`
     - `@test.retry_reason:auto_test_retry`
   - [불안정한 테스트 관리][9]에서 테스트가 {{< ui >}}QUARANTINED{{< /ui >}}로 표시됩니다. 해당 실패는 더 이상 테스트 작업을 차단하지 않습니다. [이 쿼리][9]를 다음 필터와 함께 사용하세요.
     - `@test.name:*flaky*validation*`
     - `first_flaked_branch:validate-test-optimization`
     - `flaky_test_state:quarantined`

### 4단계: 수정 {#step-4-remediation}

Test Optimization은 수정 시도 및 [Bits AI 기반 불안정한 테스트 수정][16]을 통해 불안정한 테스트를 수정하도록 돕습니다. 이 섹션에서는 [예방](#step-2-prevention) 및 [완화](#step-3-mitigation)에 사용된 동일한 테스트를 수정하여 수정 시도 워크플로를 검증합니다.

1. [불안정한 테스트 관리][9]에서 격리된 검증 테스트를 엽니다.
2. {{< ui >}}Actions{{< /ui >}}를 클릭하고 {{< ui >}}Link commit to fix{{< /ui >}}를 선택한 다음 `DD_`로 시작하는 생성된 키를 복사합니다.

   {{< img src="pr_gates/setup/attempt_to_fix_modal.png" alt="수정 시도 모달" style="width:50%" >}}

3. 불안정한 테스트를 해당 언어의 통과 버전으로 교체합니다.

   {{< tabs >}}
   {{% tab "JavaScript" %}}

   ```javascript
   test('flaky validation test', () => {
       expect(true).toBe(true);
   });
   ```

   {{% /tab %}}
   {{% tab "Python" %}}

   ```python
   def test_flaky_validation_test():
       assert True
   ```

   {{% /tab %}}
   {{% tab "Java" %}}

   ```java
   @Test
   void flakyValidationTest() {
       // intentionally empty - the test passes
   }
   ```

   {{% /tab %}}
   {{% tab "Ruby" %}}

   ```ruby
   it 'flaky validation test' do
     expect(true).to be(true)
   end
   ```

   {{% /tab %}}
   {{% tab ".NET" %}}

   ```csharp
   [Fact]
   public void FlakyValidationTest()
   {
       Assert.True(true);
   }
   ```

   {{% /tab %}}
   {{% tab "Go" %}}

   ```go
   func TestFlakyValidationTest(t *testing.T) {
   }
   ```

   {{% /tab %}}
   {{% tab "Swift" %}}

   ```swift
   func testFlakyValidationTest() {
       XCTAssertTrue(true)
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}

4. 커밋 본문에 생성된 키를 포함하여 수정 사항을 커밋합니다. `<YOUR_DD_KEY>`를 복사한 키로 교체하세요.

   ```bash
   git add -A
   git commit -m "Fix flaky validation test" -m "<YOUR_DD_KEY>"
   git push origin validate-test-optimization
   ```

5. CI가 완료될 때까지 기다린 후 다음 결과를 확인합니다.

   - [테스트 실행][10]에서, 수정 시도가 수정 후보를 재시도하였으며 모든 시도가 통과되었습니다. 다음 필터가 포함된 [이 쿼리][10]를 사용하세요.
     - `@test.name:*flaky*validation*`
     - `@git.branch:validate-test-optimization`
     - `@test.test_management.is_attempt_to_fix:true`
   - [불안정한 테스트 관리][14]에서 테스트가 {{< ui >}}Fix in progress{{< /ui >}}로 표시됩니다. [이 쿼리][14]를 다음 필터와 함께 사용하세요.
     - `@test.name:*flaky*validation*`
     - `first_flaked_branch:validate-test-optimization`
     - `fix_in_progress:true`

### 5단계: 검증 후 정리 {#step-5-post-validation-cleanup}

1. 병합하지 않고 풀 리퀘스트를 닫습니다.
2. `validate-test-optimization` 브랜치를 삭제합니다. 브랜치가 삭제되면 브랜치별 격리 자동 규칙이 더 이상 적용되지 않으며, 전용 검증 서비스는 더 이상 테스트 실행을 수신하지 않습니다.
3. [새로운 불안정한 테스트 PR 게이트][2]가 전체 저장소에 대해 활성 상태로 유지됨을 리포지토리를 소유한 팀에 알리세요. 게이트는 기본적으로 차단하지 않습니다.
4. 필요시, 리포지토리 수준에서 `validate-test-optimization` 서비스에 대해 구성된 Test Optimization 기능을 활성화하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tests/flaky_tests/early_flake_detection
[2]: /ko/tests/guides/setup_new_flaky_pr_gate
[3]: https://app.datadoghq.com/ci/settings/ci-cd/repositories?tab=repository
[4]: /ko/tests/flaky_tests/auto_test_retries
[5]: /ko/tests/flaky_management
[6]: /ko/tests/flaky_management/#configure-policies-to-automate-the-flaky-test-lifecycle
[7]: https://app.datadoghq.com/ci/test/runs?query=test_level%3Atest%20%40test.name%3A%2Aflaky%2Avalidation%2A%20%40git.branch%3Avalidate-test-optimization%20%40test.retry_reason%3Aearly_flake_detection%20%40test.test_management.is_new_flaky%3Atrue
[8]: https://app.datadoghq.com/ci/test/runs?query=test_level%3Atest%20%40test.name%3A%2Aflaky%2Avalidation%2A%20%40git.branch%3Avalidate-test-optimization%20%40test.retry_reason%3Aauto_test_retry
[9]: https://app.datadoghq.com/ci/test/flaky/explorer?query=%40test.name%3A%2Aflaky%2Avalidation%2A%20first_flaked_branch%3Avalidate-test-optimization%20flaky_test_state%3Aquarantined
[10]: https://app.datadoghq.com/ci/test/runs?query=test_level%3Atest%20%40test.name%3A%2Aflaky%2Avalidation%2A%20%40git.branch%3Avalidate-test-optimization%20%40test.test_management.is_attempt_to_fix%3Atrue
[11]: https://app.datadoghq.com/ci/pr-gates/rule/create?dataSource=test_optimization
[12]: /ko/tests/
[13]: /ko/tests/test_impact_analysis/
[14]: https://app.datadoghq.com/ci/test/flaky/explorer?query=%40test.name%3A%2Aflaky%2Avalidation%2A%20first_flaked_branch%3Avalidate-test-optimization%20fix_in_progress%3Atrue
[15]: https://github.com/DataDog/ddtest#try-test-optimization-locally
[16]: /ko/tests/flaky_management/#bits-ai-powered-flaky-test-fixes
[17]: https://github.com/DataDog/ddtest#installation
[18]: https://github.com/DataDog/ddtest/releases/tag/v1.16.0