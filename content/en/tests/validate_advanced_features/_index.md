---
title: Validate Advanced Features
private: true
---

This section explains how to check that the advanced features offered by Test Optimization are working as intended.

<div class="alert alert-info">These features require a native library. <a href="/tests/setup/junit_xml/">JUnit XML uploads</a> are not supported.</div>

## Prevention

[Early Flake Detection][1] and [New Flaky Test PR Gates][2] help you detect new flaky tests and block them from reaching your default branch.

To verify that the feature is working:

1. Enable the feature in the [Advanced Features settings page][3].
2. Create a [New Flaky Test PR gate][2] for the repository.
3. Add a new flaky test.

Here are some simple examples:

{{< include-markdown "tests/validate_advanced_features/flaky_test_examples" >}}

4. Create a new branch, commit the changes, push and open a pull request.

```bash
git checkout -b validate-test-optimization-prevention
git add -A
git commit -m "Validate Test Optimization's Prevention"
git push origin validate-test-optimization-prevention
```

5. Wait for CI to run.
6. In the GitHub checks of your Pull Request, the New Flaky Test PR Gate should be failing:

{{< img src="pr_gates/setup/failed_pr_gate.png" alt="GitHub pull request check failing because a new flaky test is detected" style="width:100%" >}}

7. Click on the failing GitHub check:

{{< img src="pr_gates/setup/pr_gate_detail.png" alt="Datadog PR gate detail view" style="width:100%" >}}

The test you added on the previous step should show up in the list of new flaky tests. Click on it to be redirected to [Flaky Test Management][5].

8. Additionally check that the test is detected as new flaky in [Test Runs][7]
   a. Check that the filter parameters include `@test.name:*flaky*` and `@git.branch:validate-test-optimization-prevention`

## Mitigation

Test Optimization helps you mitigate the effect of flaky tests that are already in your codebase:

-   Flaky tests can be retried automatically with [Auto Test Retries][4].
-   Flaky tests can be quarantined and disabled through [Flaky Test Management][5] and [Flaky Test Policies][6].

To validate that Auto Test Retries and Flaky Test Management are working as intended, create a flaky test in a repository and confirm that the test is retried, quarantined, and disabled:

1. Enable [Auto Test Retries][4] in the [Advanced Features settings page][3].
2. Enable [Flaky Test Policies][6] in the [Flaky Tests Policies settings page][3].
3. Create a flaky test policy that disables the flaky test if it flakes on `validate-test-optimization-mitigation`.
4. Add a flaky test to the repository:

    {{< include-markdown "tests/validate_advanced_features/flaky_test_examples" >}}

5. Create a new branch, commit the changes, push and open a pull request.

```bash
git checkout -b validate-test-optimization-mitigration
git add -A
git commit -m "Validate Test Optimization's mitigration"
git push origin validate-test-optimization-mitigration
```

6. Wait for CI to run.
7. The newly added flaky test shouldn't have caused the CI to be red. If it has, something is not working as expected.
8. Go to [Flaky Test Management][10] and check that the newly added flaky test shows up.

**Important**: Check that the filter parameters include `@test.name:*flaky*`, `first_flaked_branch:validate-test-optimization-mitigation`.

9. Go to [Test Runs][9] and check that the newly added flaky test shows up.

**Important**: Check that the filter parameters include `@test.name:*flaky*`, `@git.branch:validate-test-optimization-mitigation` and `@test.is_flaky:true`.

## Remediation

Test Optimizations helps with the remediation of test flakiness with:

1. Attempt to fix.
2. Bits AI auto fixes.

This sections focuses on the validation of the Attempt to fix workflow.

1. Enable [Auto Test Retries][4] in the [Advanced Features settings page][3].
2. Add a flaky test to the repository:

    {{< include-markdown "tests/validate_advanced_features/flaky_test_examples" >}}

3. Create a new branch, commit the changes, push and open a pull request.

```bash
git checkout -b validate-test-optimization-attempt-to-fix
git add -A
git commit -m "Validate Test Optimization's attempt to fix"
git push origin validate-test-optimization-attempt-to-fix
```

4. Wait for CI to run.
5. The newly added flaky test shouldn't have caused the CI to be red. If it has, something is not working as expected.
6. Go to [Flaky Test Management][11] and check that the newly added flaky test shows up as **Active**.

**Important**: Check that the filter parameters include `@test.name:*flaky*`, `first_flaked_branch:validate-test-optimization-attempt-to-fix`.

7. Fix the flaky test by removing its randomness:

{{< tabs >}}
{{% tab "JavaScript" %}}

```javascript
test('flaky test', () => {
    expect(true).toBe(true);
});
```

{{% /tab %}}
{{% tab "Python" %}}

```python
def test_flaky():
    assert True
```

{{% /tab %}}
{{% tab "Java" %}}

```java
@Test
public void flakyTest() {
    assertTrue(true);
}
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
it 'is flaky' do
  expect(true).to be true
end
```

{{% /tab %}}
{{% tab ".NET" %}}

```csharp
[Fact]
public void FlakyTest()
{
    Assert.True(true);
}
```

{{% /tab %}}
{{% tab "Go" %}}

```go
func TestFlaky(t *testing.T) {
}
```

{{% /tab %}}
{{% tab "Swift" %}}

```swift
func testFlaky() {
    XCTAssertTrue(true)
}
```

{{% /tab %}}
{{< /tabs >}}

8. In [Flaky Test Management][11], click on the flaky test and press on the `Actions` button followed by `Link commit to Flaky Test fix`. This will open a modal that looks like this:

{{< img src="pr_gates/setup/attempt_to_fix_modal.png" alt="Attempt to fix modal" style="width:50%" >}}

Copy the git commit command.

9. Commit the changes

```bash
git commit -m "Fix flaky test DD_ABC123"
git push origin validate-test-optimization-attempt-to-fix
```

10. Wait for CI to finish.
11. After CI has finished, go back to [Flaky Test Management][11]. The test should now show up as `Fix In Progress`. This means that attempt to fix has worked. The test will automatically move to `Fixed` once the PR is merged. **Important**: do not merge the PR in this case, as this was just purely for validation purposes.

[1]: /tests/flaky_tests/early_flake_detection
[2]: /tests/guides/setup_new_flaky_pr_gate
[3]: https://app.datadoghq.com/ci/settings/test-optimization/advanced-features
[4]: /tests/flaky_tests/auto_test_retries
[5]: /tests/flaky_management
[6]: /tests/flaky_management/#configure-policies-to-automate-the-flaky-test-lifecycle
[7]: https://app.datadoghq.com/ci/test/runs?query=test_level%3Atest%20%40test.name%3A%2Aflaky%2A%20%40git.branch%3Avalidate-test-optimization-remediation
[8]: https://app.datadoghq.com/ci/settings/test-optimization/flaky-test-management
[9]: https://app.datadoghq.com/ci/test/runs?query=test_level%3Atest%20%40test.name%3A%2Aflaky%2A%20%40git.branch%3Avalidate-test-optimization-mitigation%20%40test.is_flaky%3Atrue
[10]: https://app.datadoghq.com/ci/test/flaky?query=%40test.name%3A%2Aflaky%2A%20first_flaked_branch%3Avalidate-test-optimization-mitigation
[11]: https://app.datadoghq.com/ci/test/flaky?query=%40test.name%3A%2Aflaky%2A%20first_flaked_branch%3Avalidate-test-optimization-attempt-to-fix
