---
title: .NET Compatibility Requirements 
kind: documentation
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 10
---

## Language and framework compatibility

### Supported .NET versions

The following .NET versions are supported:
- .NET Core 6
- .NET Core 5
- .NET Framework 4.8
- .NET Framework 4.7.2
- .NET Framework 4.7
- .NET Framework 4.6.2
- .NET Framework 4.6.1

These are supported on the following architectures:
- Linux (GNU) x86, x86-64
- Alpine Linux (musl) x86, x86-64
- macOS (Darwin) x86, x86-64
- Windows (msvc) x86, x86-64

You can monitor application security for .NET apps running in Docker, Kubernetes, AWS ECS, and AWS Fargate.

### Supported frameworks

The .NET Tracer supports all .NET-based languages (for example, C#, F#, Visual Basic).

| Framework Web Server    | Minimum Framework Version   |
| ----------------------- | --------------------------- |
| ASP.NET                 | 4.6                         |
| ASP.NET Core            | 2.1                         |

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

## ASM capabilities support

The following ASM capabilities are supported in the .NET library, for the specified tracer version:

| ASM capability                   | Minimum .NET tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> Business logic API  | 2.23.0 <br/>   |
| Threat Protection <br/> --> IP blocking <br/> --> Suspicious request blocking <br> --> User blocking   | 2.26.0<br/><br/><br/>     |
| Risk Management <br/> --> Third-party vulnerability detection <br/> --> Custom code vulnerability detection | 2.16.0 <br/><br/> |

The minimum tracer version to get all supported ASM capabilities for .NET is 2.26.0.

**Note**: Threat Protection requires enabling [Remote Configuration][3], which is included in the listed minimum tracer version.  

[1]: /tracing/trace_collection/compatibility/dotnet-core/
[2]: /tracing/trace_collection/compatibility/dotnet-framework/
[3]: /agent/guide/how_remote_config_works/#enabling-remote-configuration