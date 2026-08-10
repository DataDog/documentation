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

This page explains how to check that the optimizations offered by Test Optimization are working as intended. The guide assumes that [Test Optimization][12] already works for the repository under validation, and it shows the steps to validate optimizations for a **single repository**.

<div class="alert alert-warning">Run these validations in a feature branch only, and do not merge them into your default or main branch.</div>

## Prerequisites

These optimizations require a [supported native library][12]. JUnit XML uploads are not supported.

## Validate locally with a coding agent

Local coding agent validation is in Preview and supports only JavaScript projects that use the npm `dd-trace` package.

Ask a local coding agent to inspect your installed `dd-trace` package and run its Test Optimization validation runbook. This method does not provision Datadog settings or report validation progress to Datadog.

Pass this prompt to your local coding agent:

```text
Locate the installed dd-trace package, then read and execute its ci/runbook.md.
```

To validate other languages, or to validate the full Prevention, Mitigation, and Remediation workflow, complete the following steps.

## Set up validation

Configure the following three settings for the repository. Scope each setting to validation so your default branches and existing services stay untouched:

1. In the [Test Optimization settings][3], configure the `validate-test-optimization` service:
   - Enable [Early Flake Detection][1].
   - Enable [Auto Test Retries][4].
   - Disable [Test Impact Analysis][13].
2. Enable [Flaky Test Policies][6], then create a quarantine policy with a branch rule for `validate-test-optimization`.
3. Create a [New Flaky Test PR Gate][11] and scope it to the repository you are validating.

{{< img src="pr_gates/setup/pr_gate_scope.png" alt="New flaky PR gate scope" style="width:100%" >}}

Set `DD_SERVICE` in your test run command so tests on the validation branch report under the dedicated service:

```bash
export DD_SERVICE=validate-test-optimization
```

Create the validation branch:

```bash
git checkout -b validate-test-optimization
```

Use this branch for all three validation phases.

## Prevention

[Early Flake Detection][1] detects new flaky tests. [New Flaky Test PR Gates][2] block them from reaching your default branch.

To validate prevention, add a test that fails on the first attempt and passes on retries. The test name must contain both `flaky` and `validation` so you can identify it in Datadog.

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
            Files.writeString(marker, "1");
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

Commit and push the test, then open a pull request from the validation branch:

```bash
git add -A
git commit -m "Validate Test Optimization prevention"
git push origin validate-test-optimization
```

Wait for CI to run. Early Flake Detection retries the new test, and the New Flaky Test PR Gate evaluates the result. In the GitHub checks for your pull request, confirm that the New Flaky Test PR Gate fails:

{{< img src="pr_gates/setup/failed_pr_gate.png" alt="GitHub pull request check failing because a new flaky test is detected" style="width:100%" >}}

Click the failing GitHub check and confirm that the test is included in the list of new flaky tests:

{{< img src="pr_gates/setup/pr_gate_detail.png" alt="Datadog PR gate detail view" style="width:100%" >}}

In [Test Runs][7], confirm that Early Flake Detection retried the test and detected it as new and flaky. The query filters on `@test.name:*flaky*validation*`, `@git.branch:validate-test-optimization`, `@test.retry_reason:early_flake_detection`, and `@test.test_management.is_new_flaky:true`.

## Mitigation

Mitigation is achieved through [Auto Test Retries][4], [Flaky Test Management][5], and [Flaky Test Policies][6]. These features retry flaky tests and quarantine known flaky failures so they do not block CI.

Make a trivial edit to the same flaky test that you added for Prevention—for example, add a comment. The edit only re-triggers CI; no Datadog annotation is required. Because Datadog identified the test as flaky during Prevention, Auto Test Retries and Flaky Test Management handle it during this run.

Commit and push the change on the same branch:

```bash
git add -A
git commit -m "Validate Test Optimization mitigation"
git push origin validate-test-optimization
```

Wait for CI to run, then confirm the following results:

- Auto Test Retries reruns the test after its first failed attempt and recovers it to a pass.
- Flaky Test Management quarantines the test so its failures do not block the test job.
- The test appears as {{< ui >}}QUARANTINED{{< /ui >}} in [Flaky Test Management][9]. The query filters on `@test.name:*flaky*validation*`, `first_flaked_branch:validate-test-optimization`, and `flaky_test_state:quarantined`.
- The retry attempts appear in [Test Runs][8]. The query filters on `@test.name:*flaky*validation*`, `@git.branch:validate-test-optimization`, and `@test.retry_reason:auto_test_retry`.

## Remediation

Test Optimization supports the remediation of test flakiness with Attempt to Fix and Bits AI auto fixes. This section validates the Attempt to Fix workflow by fixing the same test used for Prevention and Mitigation.

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
    // intentionally empty — the test now passes
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

4. Commit the fix with the generated key in the commit body. Replace `<DD_KEY>` with the key you copied:

```bash
git add -A
git commit -m "Fix flaky validation test

<DD_KEY>"
git push origin validate-test-optimization
```

5. Wait for CI to finish, then confirm the following results:

   - In [Test Runs][10], Attempt to Fix retried the fix candidate and every attempt passed. The query filters on `@test.name:*flaky*validation*`, `@git.branch:validate-test-optimization`, and `@test.test_management.is_attempt_to_fix:true`.
   - In [Flaky Test Management][14], the test is marked {{< ui >}}Fix in progress{{< /ui >}}. The query filters on `@test.name:*flaky*validation*`, `first_flaked_branch:validate-test-optimization`, and `fix_in_progress:true`.

Do not merge the validation pull request. Close the pull request and delete the `validate-test-optimization` branch after validation is complete.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/flaky_tests/early_flake_detection
[2]: /tests/guides/setup_new_flaky_pr_gate
[3]: https://app.datadoghq.com/ci/settings/test-optimization/advanced-features
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
