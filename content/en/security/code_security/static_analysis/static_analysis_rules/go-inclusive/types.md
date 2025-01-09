---
aliases:
- /continuous_integration/static_analysis/rules/go-inclusive/types
- /static_analysis/rules/go-inclusive/types
dependencies: []
disable_edit: true
group_id: go-inclusive
meta:
  category: Best Practices
  id: go-inclusive/types
  language: Go
  severity: Notice
  severity_rank: 3
title: Use inclusive language in type declarations
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-inclusive/types`

**Language:** Go

**Severity:** Notice

**Category:** Best Practices

## Description
Use inclusive language in types definitions.

## Non-Compliant Code Examples
```go
import "fmt"

type Master struct {
	ipAddress string
}

type MasterType Master

type (
	Slave        int
	BlaCKlist    []Master
	myWhiteLists [][]string
)

func main() {
	// Variable names caught in variables rule
	master := Master{ipAddress: "127.0.0.1"}
	master2 := new(Master)
	master3 := make(Blacklist, 0, 0)

	fmt.Println(master)
	fmt.Println(master2)
	fmt.Println(master3)
}
```

## Compliant Code Examples
```go
type dog struct {
	name string
	age  int
}

func main() {
	cat := struct {
		name string
		age  int
	}{
		"Ginger",
		11,
	}
	fmt.Println(cat)

	dog := dog{name: "Oreo", age: 12}

	fmt.Println(dog)

}
```
