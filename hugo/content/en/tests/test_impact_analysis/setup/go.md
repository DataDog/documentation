---
title: Test Impact Analysis for Go
code_lang: go
type: multi-code-lang
code_lang_weight: 0
aliases:
  - /continuous_integration/intelligent_test_runner/go/
  - /continuous_integration/intelligent_test_runner/setup/go/
  - /intelligent_test_runner/setup/go
further_reading:
    - link: "/continuous_integration/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI Visibility"
---

## Compatibility

Test Impact Analysis is only supported on `orchestrion >= 0.9.4 + dd-trace-go >= 1.70.0`.

## Setup

### Test Optimization

Prior to setting up Test Impact Analysis, set up [Test Optimization for Go][1]. If you are reporting data through the Agent, use v6.40 and later or v7.40 and later.

{{% ci-itr-activation-instructions %}}

## Run tests with Test Impact Analysis enabled

After completing setup, run your tests by using `go test` with the following code coverage options:

```bash
orchestrion go test ./... -cover -covermode=count -coverpkg ./...
```

1. `-cover`: The Test Impact Analysis feature uses the built-in Go's code coverage processor, so you need to enable code coverage collection in the `go test` command.

2. `-covermode`: must be either `count` or `atomic`. Because `set` is not supported, setting this value disables test impact analysis.

3. `-coverpkg`: the code coverage analysis for each test must be configured to apply in all package dependencies and not only for the package being tested. This way, if a dependency changes, you can track the test affected by this change. If you run the test command from the root of the project (where the go.mod file is), you can use the `./...` wildcard. If not, you must manually list all package dependencies comma separated (`pattern1, pattern2, pattern3, ...`). For that, you could use the `go list ./...` command to get all the package names.

<div class="alert alert-danger">Having an incorrect -coverpkg value affects the ability of Test Impact Analysis to correctly track test coverage.</div>

## Disable skipping for specific tests

You can override the Test Impact Analysis behavior and prevent specific tests from being skipped. These tests are referred to as unskippable tests.

### Why make tests unskippable?

Test Impact Analysis uses code coverage data to determine whether or not tests should be skipped. In some cases, this data may not be sufficient to make this determination.

Examples include:

- Tests that read data from text files.
- Tests that interact with APIs outside of the code being tested (such as remote REST APIs).
- Designating tests as unskippable ensures that Test Impact Analysis runs them regardless of coverage data.

### Marking tests as unskippable

#### Individual test case

Add the `//dd:test.unskippable` comment to your test case to mark it as unskippable.

```go
import (
	"testing"
)

//dd:test.unskippable
func TestMyCustomTest(t *testing.T) {
  ...
}

```

#### Test suite

Add the `//dd:suite.unskippable` comment at the begining of the file to mark it as unskippable.

If a suite is marked as unskippable, none of the test cases from that suite can be skipped by Test Impact Analysis.

```csharp
import (
	"testing"
)

//dd:suite.unskippable

func TestMyCustomTest(t *testing.T) {
  ...
}

func TestMyCustomTest2(t *testing.T) {
  ...
}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /continuous_integration/tests/go
