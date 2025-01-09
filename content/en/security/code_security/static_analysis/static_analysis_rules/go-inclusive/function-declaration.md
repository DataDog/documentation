---
aliases:
- /continuous_integration/static_analysis/rules/go-inclusive/function-declaration
- /static_analysis/rules/go-inclusive/function-declaration
dependencies: []
disable_edit: true
group_id: go-inclusive
meta:
  category: Best Practices
  id: go-inclusive/function-declaration
  language: Go
  severity: Notice
  severity_rank: 3
title: Use inclusive language in function declarations
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-inclusive/function-declaration`

**Language:** Go

**Severity:** Notice

**Category:** Best Practices

## Description
Use inclusive language in function declaration.

## Non-Compliant Code Examples
```go
func whitelistFunc(master, slaveParamSlave string){
    return nil
}

func blacklistFunc()(whitelist, blAckliSt []string){
    return []string{}
}

func slaveFunc(blAckliSt int){
    return nil
}

func masterFunc(){
    return nil
}

func myFunc(){
    return nil
}
```
