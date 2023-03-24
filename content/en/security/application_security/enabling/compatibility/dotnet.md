---
title: .NET Compatibility Requirements 
kind: documentation
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 10
---

## Language and Framework Compatibility

ASM follows the same language and framework support as APM. See the [APM .NET Core Compatibility][1] or [APM .NET Framework Compatibiltiy][2] page more details. 

## ASM Capabilities Support

The following ASM capabilities are supported in the .NET library, for the specified tracer version:

| ASM capability                   | Minimum .NET tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> Business logic API  | x.x <br/>x.x   |
| Threat Protection <br/> --> IP blocking <br/> --> Suspicious request blocking <br> --> User blocking   | x.x<br/>x.x<br/>x.x<br/>x.x     |
| SCA   | x.x      |
| IAST    | x.x    |


[1]: /tracing/trace_collection/compatibility/dotnet-core/
[2]: /tracing/trace_collection/compatibility/dotnet-framework/