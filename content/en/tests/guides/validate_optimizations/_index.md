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

This page explains how to check that the optimizations offered by Test Optimization are working as intended. The guide assumes that [Test Optimization][13] already works for the repository under validation, and it shows the steps to validate optimizations for a **single repository**.

<div class="alert alert-warning">Run these validations in a feature branch only, and do not merge them into your default or main branch.</div>

## Prerequisites

These optimizations require a [supported native library][13]. JUnit XML uploads are not supported.

## Prevention

Prevention is achieved through [Early Flake Detection][1] and [New Flaky Test PR Gates][2], which help detect new flaky tests and block them from reaching your default branch.

To validate prevention is working, follow these steps:

1. Enable Early Flake Detection in the [settings page][3].
2. Create a [New Flaky Test PR gate][12] and define its scope to the repository you are validating.

{{< img src="pr_gates/setup/pr_gate_scope.png" alt="New flaky PR gate scope" style="width:100%" >}}

3. Add a new flaky test.

This test is flaky by design. **It is not intended to be committed to the default branch**. Run the validation in a feature branch, and do not merge it.

Here are some simple examples of flaky tests. The test name must include the string `flaky`:

{{< tabs >}}
{{% tab "JavaScript" %}}

```javascript
test('flaky test', () => {
    expect(Math.random()).toBeGreaterThan(0.5);
});
```

{{% /tab %}}
{{% tab "Python" %}}

```python
import random

def test_flaky():
    assert random.random() > 0.5
```

{{% /tab %}}
{{% tab "Java" %}}

```java
@Test
public void flakyTest() {
    assertTrue(Math.random() > 0.5);
}
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
it 'is flaky' do
  expect(rand).to be > 0.5
end
```

{{% /tab %}}
{{% tab ".NET" %}}

```csharp
[Fact]
public void FlakyTest()
{
    Assert.True(new Random().NextDouble() > 0.5);
}
```

{{% /tab %}}
{{% tab "Go" %}}

```go
func TestFlaky(t *testing.T) {
    if rand.Float64() <= 0.5 {
        t.Fail()
    }
}
```

{{% /tab %}}
{{% tab "Swift" %}}

```swift
func testFlaky() {
    XCTAssertTrue(Double.random(in: 0..<1) > 0.5)
}
```

{{% /tab %}}
{{< /tabs >}}

4. Create a new branch `validate-test-optimization-prevention`, commit the changes to add a new flaky test, and push the changes to open a pull request.

```bash
git checkout -b validate-test-optimization-prevention
git add -A
git commit -m "Validate Test Optimization's Prevention"
git push origin validate-test-optimization-prevention
```

5. Wait for CI to run.
6. In the GitHub checks of your pull request, the New Flaky Test PR Gate should be failing:

{{< img src="pr_gates/setup/failed_pr_gate.png" alt="GitHub Pull Request check failing because a new flaky test is detected" style="width:100%" >}}

7. Click on the failing GitHub check:

{{< img src="pr_gates/setup/pr_gate_detail.png" alt="Datadog PR gate detail view" style="width:100%" >}}

The test you added is included in the list of new flaky tests. Click it to be redirected to [Flaky Test Management][14].

8. Additionally check that the test is detected as new flaky in [Test Runs][7]. Check that the filter parameters include `@test.name:*flaky*`, `@git.branch:validate-test-optimization-prevention` and `@test.test_management.is_new_flaky:true`.

## Mitigation

Mitigation is achieved through [Auto Test Retries][4], [Flaky Test Management][5], and [Flaky Test Policies][6]. These optimizations allow you to automatically retry flaky tests and apply policies on them, such as quarantining or disabling.

To validate mitigation is working, follow these steps:

1. Enable Auto Test Retries in the [settings page][3].
2. Enable Flaky Test Policies in the [Flaky Tests Policies settings page][8].
3. Create a flaky test policy that disables the flaky test if it flakes on `validate-test-optimization-mitigation`.

{{< img src="pr_gates/setup/flaky_test_policy_disable.png" alt="Flaky test policy for disabling a test" style="width:100%" >}}

4. Add a new flaky test.

This test is flaky by design. **It is not intended to be committed to the default branch**. Run the validation in a feature branch, and do not merge it.

Here are some simple examples of flaky tests. The test name must include the string `flaky`:

{{< tabs >}}
{{% tab "JavaScript" %}}

```javascript
test('flaky test', () => {
    expect(Math.random()).toBeGreaterThan(0.5);
});
```

{{% /tab %}}
{{% tab "Python" %}}

```python
import random

def test_flaky():
    assert random.random() > 0.5
```

{{% /tab %}}
{{% tab "Java" %}}

```java
@Test
public void flakyTest() {
    assertTrue(Math.random() > 0.5);
}
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
it 'is flaky' do
  expect(rand).to be > 0.5
end
```

{{% /tab %}}
{{% tab ".NET" %}}

```csharp
[Fact]
public void FlakyTest()
{
    Assert.True(new Random().NextDouble() > 0.5);
}
```

{{% /tab %}}
{{% tab "Go" %}}

```go
func TestFlaky(t *testing.T) {
    if rand.Float64() <= 0.5 {
        t.Fail()
    }
}
```

{{% /tab %}}
{{% tab "Swift" %}}

```swift
func testFlaky() {
    XCTAssertTrue(Double.random(in: 0..<1) > 0.5)
}
```

{{% /tab %}}
{{< /tabs >}}

5. Create a new branch `validate-test-optimization-mitigation`, commit the changes to add a new flaky test, and push the changes to open a pull request.

```bash
git checkout -b validate-test-optimization-mitigation
git add -A
git commit -m "Validate Test Optimization's mitigation"
git push origin validate-test-optimization-mitigation
```

6. Wait for CI to run.
7. Confirm that the newly added flaky test does not cause CI to fail.
8. Go to [Flaky Test Management][10] and check that the newly added flaky test shows up.

**Important**: Check that the filter parameters include `@test.name:*flaky*`, `first_flaked_branch:validate-test-optimization-mitigation`.

Click on the only test in the list and verify that it shows as `DISABLED`. This confirms that the flaky test policy was triggered.

9. Go to [Test Runs][9] and check that the newly added flaky test shows up.

**Important**: Check that the filter parameters include `@test.name:*flaky*`, `@git.branch:validate-test-optimization-mitigation` and `@test.is_flaky:true`.

## Remediation

Test Optimization helps with the remediation of test flakiness with attempt to fix and Bits AI auto fixes. This section focuses on the validation of the attempt to fix workflow.

To validate attempt to fix, follow these steps:

1. Enable Auto Test Retries in the [settings page][3].
2. Add a new flaky test.

This test is flaky by design. **It is not intended to be committed to the default branch**. Run the validation in a feature branch, and do not merge it.

Here are some simple examples of flaky tests. The test name must include the string `flaky`:

{{< tabs >}}
{{% tab "JavaScript" %}}

```javascript
test('flaky test', () => {
    expect(Math.random()).toBeGreaterThan(0.5);
});
```

{{% /tab %}}
{{% tab "Python" %}}

```python
import random

def test_flaky():
    assert random.random() > 0.5
```

{{% /tab %}}
{{% tab "Java" %}}

```java
@Test
public void flakyTest() {
    assertTrue(Math.random() > 0.5);
}
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
it 'is flaky' do
  expect(rand).to be > 0.5
end
```

{{% /tab %}}
{{% tab ".NET" %}}

```csharp
[Fact]
public void FlakyTest()
{
    Assert.True(new Random().NextDouble() > 0.5);
}
```

{{% /tab %}}
{{% tab "Go" %}}

```go
func TestFlaky(t *testing.T) {
    if rand.Float64() <= 0.5 {
        t.Fail()
    }
}
```

{{% /tab %}}
{{% tab "Swift" %}}

```swift
func testFlaky() {
    XCTAssertTrue(Double.random(in: 0..<1) > 0.5)
}
```

{{% /tab %}}
{{< /tabs >}}

3. Create a new branch `validate-test-optimization-attempt-to-fix`, commit the changes to add a new flaky test, and push the changes to open a pull request.

```bash
git checkout -b validate-test-optimization-attempt-to-fix
git add -A
git commit -m "Validate Test Optimization's attempt to fix"
git push origin validate-test-optimization-attempt-to-fix
```

4. Wait for CI to run.
5. Confirm that the newly added flaky test does not cause CI to fail.
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

8. In [Flaky Test Management][11], click the flaky test, then click on the `Actions` button and select `Link commit to Flaky Test fix`. This opens a modal that provides a test key and sample Git command:

{{< img src="pr_gates/setup/attempt_to_fix_modal.png" alt="Attempt to fix modal" style="width:50%" >}}

Copy the git commit command.

9. Commit and push the flaky test fixes:

```bash
git add -A
git commit -m "Fix flaky test DD_ABC123"
git push origin validate-test-optimization-attempt-to-fix
```

10. Wait for CI to finish.
11. After CI has finished, go back to [Flaky Test Management][11]. The test now shows up as `Fix In Progress`. This means that the attempt to fix has worked. The test automatically moves to `Fixed` when the PR is merged.

**Important**: Do not merge the PR, as it was just purely for validation purposes. Close the pull request without merging.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/flaky_tests/early_flake_detection
[2]: /tests/guides/setup_new_flaky_pr_gate
[3]: https://app.datadoghq.com/ci/settings/test-optimization/advanced-features
[4]: /tests/flaky_tests/auto_test_retries
[5]: /tests/flaky_management
[6]: /tests/flaky_management/#configure-policies-to-automate-the-flaky-test-lifecycle
[7]: https://app.datadoghq.com/ci/test/runs?query=test_level%3Atest%20%40test.name%3A%2Aflaky%2A%20%40git.branch%3Avalidate-test-optimization-prevention%20%40test.test_management.is_new_flaky%3Atrue
[8]: https://app.datadoghq.com/ci/settings/test-optimization/flaky-test-management
[9]: https://app.datadoghq.com/ci/test/runs?query=test_level%3Atest%20%40test.name%3A%2Aflaky%2A%20%40git.branch%3Avalidate-test-optimization-mitigation%20%40test.is_flaky%3Atrue
[10]: https://app.datadoghq.com/ci/test/flaky?query=%40test.name%3A%2Aflaky%2A%20first_flaked_branch%3Avalidate-test-optimization-mitigation
[11]: https://app.datadoghq.com/ci/test/flaky?query=%40test.name%3A%2Aflaky%2A%20first_flaked_branch%3Avalidate-test-optimization-attempt-to-fix
[12]: https://app.datadoghq.com/ci/pr-gates/rule/create?dataSource=test_optimization
[13]: /tests/
[14]: https://app.datadoghq.com/ci/test/flaky?query=%40test.name%3A%2Aflaky%2A%20first_flaked_branch%3Avalidate-test-optimization-prevention
