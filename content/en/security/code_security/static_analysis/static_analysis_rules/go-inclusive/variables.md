---
aliases:
- /continuous_integration/static_analysis/rules/go-inclusive/variables
- /static_analysis/rules/go-inclusive/variables
dependencies: []
disable_edit: true
group_id: go-inclusive
meta:
  category: Best Practices
  id: go-inclusive/variables
  language: Go
  severity: Notice
  severity_rank: 3
title: Use inclusive language in variable names
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-inclusive/variables`

**Language:** Go

**Severity:** Notice

**Category:** Best Practices

## Description
Use inclusive language in variables.

## Non-Compliant Code Examples
```go
func myFunc(){
    var snow_white string

    whitelist := "foo"
    namesWhitelist := []{"bla"}];

    names_blaCKlist := "bla";

    addr_master_ip := "5.4.3.8";
    addr_slave_ip := "1.2.3.4";

    slave := struct {
		ipAddress string
	}{
		"127.0.0.1"
	}
	fmt.Println(slave)
    return nil
}
```
