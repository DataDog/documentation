---
aliases:
- /continuous_integration/static_analysis/rules/go-best-practices/merge-declaration-assignment
- /static_analysis/rules/go-best-practices/merge-declaration-assignment
dependencies: []
disable_edit: true
group_id: go-best-practices
meta:
  category: Best Practices
  id: go-best-practices/merge-declaration-assignment
  language: Go
  severity: Info
  severity_rank: 4
title: Declare and assign variables in one statement
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-best-practices/merge-declaration-assignment`

**Language:** Go

**Severity:** Info

**Category:** Best Practices

## Description
In Go, it is recommended to avoid using separate variable declaration and assignment statements and instead prefer initializing variables directly in the declaration.
	
Here are a few reasons why:

1.  **Simplicity and readability**: Initializing a variable in the declaration with `var x uint = 1` provides a clear and concise way to express the intent of assigning an initial value to the variable. It reduces unnecessary lines of code, making the code more readable and easier to understand.
2.  **Avoiding empty initial values**: If you declare a variable with `var x uint` and then assign it a value of 1 separately, it might initially have an undesired default value (in this case, 0) before you assign the actual desired value. By initializing the variable directly in the declaration, you ensure it starts with the desired initial value.
3.  **Encouraging good practice**: Initializing variables in the declaration is a recommended coding practice in Go. It follows the principle of declaring variables closer to their usage, promotes legible code, and is widely accepted in the Go community.

Therefore, it is preferable to use `var x uint = 1` rather than declaring the variable on one line and assigning it on another. This approach improves code clarity, reduces unnecessary lines, and ensures variables start with the desired initial value.


## Non-Compliant Code Examples
```go
func main() {
    var commands []domain.Command
    commands = append(commands, domain.ChangeAttributes{
        Command: domain.NewCommand(domain.NewKeyIdentifier(testOrgID, c.CaseID), model.NewUserAuthor(testUserUUID)),
        Attributes: domain.CreateAttributesFromProto(
            domain.MapArrayToMapListValue(map[string][]string{
                "service": {"case-api-test"},
            },
        )),
    })
}
```

```go
func main () {
    var x uint
    x = 1
}
```

## Compliant Code Examples
```go
func main () {
    var generatedUuid uuid.UUID
    // not triggering is we have two elements on the left side
    generatedUuid, err = uuid.NewUUID()
}
```

```go
func main () {
    var x uint
    x = 1
    x = 2
}
```

```go
func main () {
    var (
        x uint
        y int
    )
    x = 1
    x = 2
}
```

```go
func main () {
    var x uint = 1
}
```
