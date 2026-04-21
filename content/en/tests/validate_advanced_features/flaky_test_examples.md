---
title: Flaky Test Examples
private: true
_build:
  render: never
  list: never
  publishResources: false
---

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
