---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/superfluous-else
- /static_analysis/rules/go-best-practices/superfluous-else
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/superfluous-else
  language: Go
  severity: Info
  severity_rank: 4
title: Avoid superfluous else
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/superfluous-else`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
Sometimes, the `else` block of an `if` is unnecessary and can be avoided, especially when there is a `return` statement inside the `if` block will be executed and the function will terminate. Hence, there is no need to explicitly specify the `else` clause.

By removing the `else` clause, the code becomes more concise and easier to read. It eliminates redundancy and makes the intention of the code clearer.

To avoid such situations, it is a good coding practice to write code with the fewest possible branches. This makes the code easier to understand and minimizes the chance of introducing bugs.


## Non-Compliant Code Examples
```go
func main() {
    if foo {
        return
    } else {
        return 2
    }
}
func main() {
    if foo {
        println("foo")
        return
    } else {
        return 2
    }
}

func main() {
    if input == "abc" {
        return ""
    } else {
        if len(value) == 3 {
            return []string{fmt.Sprintf("%s", value[2])}
        } else {
            return []string{fmt.Sprintf("%d abc", len(value)}}
        }
    }
}
```

## Compliant Code Examples
```go
func main() {
    if foo {
        println("foo")
    } else {
        return 2
    }
}
func main() {
    if ret, err := Action(str); err != nil {
        return "", err
    } else {
        return Encode(ret), nil
    }
}
func main() {
    if ret, err := Action(str); err != nil {
        return "", err
    } else {
        return Encode(Encode2(ret, ret)), nil
    }
}
func main() {
    if ret, err := Action(str); err == nil {
        return Encode(ret), nil
    } else {
        return err
    }

    if bar, err := getBarOrErr(); err != nil {
        return nil, err
    } else {
        foo.baz = Baz(bar)
    }

    if bar, err := getBarOrErr(); err == nil {
        return bar;
    } else {
        baz.Baz(err);
    }
}
```
