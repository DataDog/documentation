---
title: Validate Optimizations
description: Validate that Test Optimization features—including Early Flake Detection, Auto Test Retries, and Flaky Test Management—are working correctly in your repository.
further_reading:
    - link: '/tests/guides/setup_new_flaky_pr_gate'
      tag: 'Documentation'
      text: 'Set up a New Flaky Test PR Gate'
    - link: '/tests/flaky_tests/early_flake_detection'
      tag: 'Documentation'
      text: 'Learn about Early Flake Detection'
    - link: '/tests/flaky_tests/auto_test_retries'
      tag: 'Documentation'
      text: 'Learn about Auto Test Retries'
    - link: '/tests/flaky_management'
      tag: 'Documentation'
      text: 'Learn about Flaky Test Management'
---

This page explains how to check that the optimizations offered by [Test Optimization][12] are working as intended for a **single repository**. Use local validation to check library compatibility and supported features, or validate the full workflow in Datadog after setting up Test Optimization.

<div class="alert alert-warning">Run these validations in a feature branch. Do not merge the temporary tests or dedicated service configuration from Option 2 into your default or main branch.</div>

## Prerequisites

These optimizations require a [supported native library][12]. JUnit XML uploads are not supported.

## Option 1: Validate locally with ddtest

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
  Local validation with ddtest is in Preview.
{{< /callout >}}

Use [ddtest][15] to check Test Optimization locally. It compares test results with and without instrumentation. It then uses temporary tests to check supported features, including Early Flake Detection, Auto Test Retries, and Test Management. Validation uses a local intake and requires no Datadog account, API key, or Datadog Agent. It does not send validation results to Datadog or change Datadog settings.

Datadog recommends using a local coding agent for onboarding and local validation. The agent follows ddtest's instructions to set up instrumentation, run validation, resolve blockers, and explain the results. To run the commands yourself, use the [manual instructions](#run-ddtest-yourself).

Local validation supports these languages and frameworks:

| Language | Test frameworks |
| --- | --- |
| JavaScript and TypeScript | Jest, Vitest, Mocha, Playwright, Cypress, Cucumber, WebdriverIO |
| Python | pytest |
| Ruby | RSpec, Minitest |
| Java (Maven or Gradle) | JUnit 4, JUnit 5, TestNG, Spock, Cucumber JVM, Karate, ScalaTest, MUnit |

See the [ddtest documentation][15] for runtime requirements, framework-specific setup, and feature limitations.

### Use a local coding agent (recommended)

Open a local Git checkout of the repository in a coding agent that can inspect files and run commands. Provide this prompt:

```text
Install the latest ddtest release from https://github.com/DataDog/ddtest/releases/latest, then use it to onboard this repository to Test Optimization.
```

Review proposed changes and provide any environment details requested by the agent. The agent runs local validation and reports the results, including HTML report links and any failed or unvalidated checks.

### Run ddtest yourself

#### Install ddtest

Local validation requires [ddtest v1.16.0][18] or later. If ddtest is already installed, check its version with `ddtest --version` and rerun the installer to upgrade.

Install the latest release on macOS or Linux:

```bash
curl -fsSL https://github.com/DataDog/ddtest/releases/latest/download/install.sh | bash
export PATH="$HOME/.local/bin:$PATH"
```

On Windows, run the installer in PowerShell:

```powershell
irm https://github.com/DataDog/ddtest/releases/latest/download/install.ps1 | iex
```

The installers verify the download against the release's checksums. See [ddtest installation][17] for version selection and custom installation directories.

#### Step 1: Inspect the test setup

Start from a local Git checkout of the repository. Install the project's test dependencies and prepare any browsers, databases, or other services that the tests require. Then run:

```bash
ddtest onboard
```

The command detects the language, test framework, and CI provider, then returns the next setup or validation action.

For supported JavaScript setups, preview the exact setup edits with `--apply`. For example:

```bash
ddtest onboard --framework jest --apply
```

After reviewing the edits, add `--yes` to apply them and run local validation:

```bash
ddtest onboard --framework jest --apply --yes
```

If validation succeeds, continue to [Review the results](#step-3-review-the-results).

For setups without automatic editing, follow the setup instructions returned by `ddtest onboard`. To print detailed manual setup instructions, run `ddtest onboard --instructions`.

If the repository contains multiple frameworks or CI providers, select one explicitly. For example:

```bash
ddtest onboard --framework jest --ci-provider github
```

Use the same selection for subsequent validation commands. Run validation separately for each framework and CI provider you want to check.

#### Step 2: Run local validation

To inspect all discovered CI test configurations without installing a Datadog SDK or running tests, run:

```bash
ddtest testdrive --all --check-only
```

Configuration checks alone do not validate feature behavior. Run full local validation:

```bash
ddtest testdrive --all
```

Review the preview of commands and changes, then confirm execution. In a non-interactive terminal, add `--yes` after reviewing the preview.

To validate a specific test command, use `--command` instead of `--all`. For example:

```bash
ddtest testdrive --framework jest --command "npm test"
```

A successful check of one command does not validate other CI configurations. Resolve any missing dependencies, unsupported configuration, or other blockers reported by ddtest, then rerun validation.

#### Step 3: Review the results

Open the HTML report linked in the command output, typically `.testoptimization/report.html`. The corresponding `.testoptimization/testdrive.json` contains machine-readable results. Review the baseline comparison, feature checks, and any configurations that remain unvalidated. Feature support varies by framework and Datadog SDK; unsupported features are listed in the report.

Keep the reports for review, and rerun full validation after changing source files, dependencies, or runtimes. Add `.testoptimization/` to `.gitignore` to keep local reports out of commits.

Local validation checks library behavior and CI configuration. To validate Datadog processing, PR Gates, and the full [Prevention](#step-2-prevention), [Mitigation](#step-3-mitigation), and [Remediation](#step-4-remediation) workflows, or to validate an unsupported language or framework, use [Option 2](#option-2-validate-the-full-workflow).

## Option 2: Validate the full workflow

This validation workflow checks the complete Test Optimization workflow in Datadog. Perform these validations ([Prevention](#step-2-prevention), [Mitigation](#step-3-mitigation), and [Remediation](#step-4-remediation)) in order, as they use the same branch and test.

### Step 1: Set up validation

This guide walks you through making local changes and committing them for CI to run. It uses a dedicated test service and branch to minimize the validation workflow's impact on other developers in the repository.

1. Configure your CI test job to set `DD_SERVICE` before it runs the test command:

   ```bash
   export DD_SERVICE=validate-test-optimization
   ```

2. Create the validation branch:

   ```bash
   git checkout -b validate-test-optimization
   ```

3. Commit the CI configuration change that sets `DD_SERVICE`, then push the validation branch to trigger a test execution:

   ```bash
   git add -A
   git commit -m "Configure Test Optimization validation service"
   git push -u origin validate-test-optimization
   ```

   Datadog detects the `validate-test-optimization` service when the tests report under that name.

4. After CI finishes, go to the [CI/CD Repositories settings][3] and select the repository you are validating.

   {{< img src="pr_gates/setup/ci_cd_repositories_settings.png" alt="CI/CD Repositories settings filtered to the repository being validated" style="width:100%" >}}

5. In the upper-right corner of the slide-out panel, click {{< ui >}}Test Service{{< /ui >}}.

   {{< img src="pr_gates/setup/repository_settings_test_services.png" alt="Repository Settings with the Test Service button in the upper-right corner" style="width:100%" >}}

6. In {{< ui >}}Test service overrides{{< /ui >}}, select the `validate-test-optimization` service.

   {{< img src="pr_gates/setup/test_service_overrides.png" alt="Test service overrides showing detected test services for a repository" style="width:100%" >}}

7. Configure the following service overrides:
   - Enable [Early Flake Detection][1].
   - Enable [Auto Test Retries][4].
   - Disable [Test Impact Analysis][13] (so it does not skip the validation test).
8. Return to the repository settings. [Flaky Test Policies][6] apply to every test service in the repository, not to an individual test service. To limit the validation policy's impact, configure it only for the `validate-test-optimization` branch. Under {{< ui >}}Flaky Test Policies{{< /ui >}}, on the {{< ui >}}Quarantine{{< /ui >}} tile, click {{< ui >}}Configure{{< /ui >}}.

   {{< img src="pr_gates/setup/flaky_test_policies_quarantine.png" alt="Repository settings showing the Configure button for the Quarantine flaky test policy" style="width:100%" >}}

9. Enable the second auto-rule: **If an Active flaky test flakes in the `validate-test-optimization` branch, then move to Quarantined**.

   {{< img src="pr_gates/setup/quarantine_branch_policy.png" alt="Quarantine policy configured for active flaky tests on the validate-test-optimization branch" style="width:100%" >}}

10. Click {{< ui >}}Save{{< /ui >}}. 
11. Create a [New Flaky Test PR Gate][11] and scope it to the repository you are validating.

   {{< img src="pr_gates/setup/pr_gate_scope.png" alt="New flaky PR gate scope" style="width:100%" >}}

### Step 2: Prevention

[Early Flake Detection][1] detects new flaky tests. [New Flaky Test PR Gates][2] block them from reaching your default branch.

1. Add a test that fails on the first attempt and passes on retries (optionally using the code provided below). The test name must contain both `flaky` and `validation` so you can identify it in Datadog.

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

2. Commit and push the test, then open a pull request from the validation branch:

   ```bash
   git add -A
   git commit -m "Validate Test Optimization prevention"
   git push origin validate-test-optimization
   ```

3. Wait for CI to run. Early Flake Detection retries the new test, and the New Flaky Test PR Gate evaluates the result. In the GitHub checks for your pull request, confirm that the New Flaky Test PR Gate fails:

   {{< img src="pr_gates/setup/failed_pr_gate.png" alt="GitHub pull request check failing because a new flaky test is detected" style="width:100%" >}}

4. Click the failing GitHub check and confirm that the test is included in the list of new flaky tests:

   {{< img src="pr_gates/setup/pr_gate_detail.png" alt="Datadog PR gate detail view" style="width:100%" >}}

5. In [Test Runs][7], confirm that Early Flake Detection retried the test and detected it as a new flaky test using [this query][7], which uses the following filters:

   - `@test.name:*flaky*validation*`
   - `@git.branch:validate-test-optimization`
   - `@test.retry_reason:early_flake_detection`
   - `@test.test_management.is_new_flaky:true`

### Step 3: Mitigation

Mitigation is achieved through [Auto Test Retries][4], [Flaky Test Management][5], and [Flaky Test Policies][6]. These features retry flaky tests and quarantine known flaky failures so they do not block CI.

1. In the same test that you added for [Prevention](#step-2-prevention), change the marker filename from `dd-validation-flaky` to `dd-validation-flaky-mitigation`. Do not rename the test function or test case. The new marker causes another intentional first-attempt failure. Keeping the test name unchanged lets Datadog associate the run with the flaky test detected during [Prevention](#step-2-prevention). No additional Datadog configuration is required; Auto Test Retries and Flaky Test Management handle the test during this run. Update the test for your language:

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

2. Commit and push the change on the same branch:

   ```bash
   git add -A
   git commit -m "Validate Test Optimization mitigation"
   git push origin validate-test-optimization
   ```

3. Wait for CI to run, then confirm the following results:

   - In [Test Runs][8], Auto Test Retries reruns the test after its first failed attempt, and the test passes on retry. Use [this query][8], with the following filters:
     - `@test.name:*flaky*validation*`
     - `@git.branch:validate-test-optimization`
     - `@test.retry_reason:auto_test_retry`
   - In [Flaky Test Management][9], the test appears as {{< ui >}}QUARANTINED{{< /ui >}}. Its failures no longer block the test job. Use [this query][9], with the following filters:
     - `@test.name:*flaky*validation*`
     - `first_flaked_branch:validate-test-optimization`
     - `flaky_test_state:quarantined`

### Step 4: Remediation

Test Optimization helps remediate flaky tests through Attempt to Fix and [Bits AI-powered flaky test fixes][16]. This section validates the Attempt to Fix workflow by fixing the same test used for [Prevention](#step-2-prevention) and [Mitigation](#step-3-mitigation).

1. In [Flaky Test Management][9], open the quarantined validation test.
2. Click {{< ui >}}Actions{{< /ui >}}, select {{< ui >}}Link commit to fix{{< /ui >}}, and copy the generated key (it starts with `DD_`).

   {{< img src="pr_gates/setup/attempt_to_fix_modal.png" alt="Attempt to Fix modal" style="width:50%" >}}

3. Replace the flaky test with the passing version for your language:

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

4. Commit the fix with the generated key in the commit body. Replace `<YOUR_DD_KEY>` with the key you copied:

   ```bash
   git add -A
   git commit -m "Fix flaky validation test" -m "<YOUR_DD_KEY>"
   git push origin validate-test-optimization
   ```

5. Wait for CI to finish, then confirm the following results:

   - In [Test Runs][10], Attempt to Fix retried the fix candidate, and every attempt passed. Use [this query][10], which has the following filters:
     - `@test.name:*flaky*validation*`
     - `@git.branch:validate-test-optimization`
     - `@test.test_management.is_attempt_to_fix:true`
   - In [Flaky Test Management][14], the test is marked {{< ui >}}Fix in progress{{< /ui >}}. Use [this query][14], which has the following filters:
     - `@test.name:*flaky*validation*`
     - `first_flaked_branch:validate-test-optimization`
     - `fix_in_progress:true`

### Step 5: Post-validation cleanup

1. Close the pull request without merging.
2. Delete the `validate-test-optimization` branch. The branch-specific Quarantine auto-rule no longer applies after the branch is deleted, and the dedicated validation service no longer receives test executions.
3. Notify the team that owns the repository that the [New Flaky Test PR Gate][2] remains active for the entire repository. The gate is non-blocking by default.
4. Optionally, enable the Test Optimization features configured for the `validate-test-optimization` service at the repository level.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/flaky_tests/early_flake_detection
[2]: /tests/guides/setup_new_flaky_pr_gate
[3]: https://app.datadoghq.com/ci/settings/ci-cd/repositories?tab=repository
[4]: /tests/flaky_tests/auto_test_retries
[5]: /tests/flaky_management
[6]: /tests/flaky_management/#configure-policies-to-automate-the-flaky-test-lifecycle
[7]: https://app.datadoghq.com/ci/test/runs?query=test_level%3Atest%20%40test.name%3A%2Aflaky%2Avalidation%2A%20%40git.branch%3Avalidate-test-optimization%20%40test.retry_reason%3Aearly_flake_detection%20%40test.test_management.is_new_flaky%3Atrue
[8]: https://app.datadoghq.com/ci/test/runs?query=test_level%3Atest%20%40test.name%3A%2Aflaky%2Avalidation%2A%20%40git.branch%3Avalidate-test-optimization%20%40test.retry_reason%3Aauto_test_retry
[9]: https://app.datadoghq.com/ci/test/flaky/explorer?query=%40test.name%3A%2Aflaky%2Avalidation%2A%20first_flaked_branch%3Avalidate-test-optimization%20flaky_test_state%3Aquarantined
[10]: https://app.datadoghq.com/ci/test/runs?query=test_level%3Atest%20%40test.name%3A%2Aflaky%2Avalidation%2A%20%40git.branch%3Avalidate-test-optimization%20%40test.test_management.is_attempt_to_fix%3Atrue
[11]: https://app.datadoghq.com/ci/pr-gates/rule/create?dataSource=test_optimization
[12]: /tests/
[13]: /tests/test_impact_analysis/
[14]: https://app.datadoghq.com/ci/test/flaky/explorer?query=%40test.name%3A%2Aflaky%2Avalidation%2A%20first_flaked_branch%3Avalidate-test-optimization%20fix_in_progress%3Atrue
[15]: https://github.com/DataDog/ddtest#try-test-optimization-locally
[16]: /tests/flaky_management/#bits-ai-powered-flaky-test-fixes
[17]: https://github.com/DataDog/ddtest#installation
[18]: https://github.com/DataDog/ddtest/releases/tag/v1.16.0
