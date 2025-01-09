---
aliases:
- /continuous_integration/static_analysis/rules/go-security/avoid-rat-setstring
- /static_analysis/rules/go-security/avoid-rat-setstring
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/avoid-rat-setstring
  language: Go
  severity: Warning
  severity_rank: 2
title: Avoid SetString() from big.Rat
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/avoid-rat-setstring`

**Language:** Go

**Severity:** Warning

**Category:** Security

**CWE**: [109](https://cwe.mitre.org/data/definitions/109.html)

## Description
Do not use the function `SetString` from `big.Rat` as it as a potential overflow in some Go versions. Even if your current Go runtime is not vulnerable to this issue, your code may be used by runtime that are. We recommend avoiding the function `SetString` from the `math/big` package for this reason.

#### Learn More

 - [CVE-2022-23772: Rat.SetString in math/big in Go before 1.16.14 and 1.17.x before 1.17.7 has an overflow that can lead to Uncontrolled Memory Consumption](https://nvd.nist.gov/vuln/detail/CVE-2022-23772)

## Non-Compliant Code Examples
```go
package main

import (
	"math/big"
	"fmt"
)

func main() {
	var r = big.Rat{}
	r.SetString("13e-9223372036854775808")

	fmt.Println(r)
}
```

```go
package main

import (
	"math/big"
	"fmt"
)

func anotherFunction() {
	r = big.Rat{}
	fmt.Println(r)
	r.SetString("13e-9223372036854775808")

	fmt.Println(r)
}

func anotherFunction2() {
	var r big.Rat
	fmt.Println(r)
	r.SetString("13e-9223372036854775808")

	fmt.Println(r)
}

func main() {
	var r = big.Rat{}
	r.SetString("13e-9223372036854775808")

	fmt.Println(r)
}
```

```go
package main

import (
	"math/big"
	"fmt"
)

func main() {
	r := big.Rat{}
	r.SetString("13e-9223372036854775808")

	fmt.Println(r)
}
```

## Compliant Code Examples
```go
package main

import (
	"math/big"
	"fmt"
)

func main() {
	r := big.NewRat(10, 3)

	fmt.Println(r)
}
```
