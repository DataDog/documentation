---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/async-task-not-void
- /static_analysis/rules/csharp-best-practices/async-task-not-void
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Best Practices
  id: csharp-best-practices/async-task-not-void
  language: C#
  language_alias: CSharp
  severity: Error
  severity_rank: 1
title: Detects improper usage of void return in an async method
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/async-task-not-void`

**Language:** C#

**Severity:** Error

**Category:** Best Practices

## Description
According to the [task asynchronous programming](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/task-asynchronous-programming-model) (TAP) model, async methods should only return `void` if they are [event handlers](https://learn.microsoft.com/en-us/dotnet/api/system.eventhandler). Otherwise, they should return `Task` or `Task<TResult>`

## Non-Compliant Code Examples
```csharp
class NonCompliant {
    async void AsyncFetch() { /* ... */ }
    async void Click() { /* ... */ }
    async void HandleClick(object sender, EventArgs e, string notEventHandlerDelegateSignature) { /* ... */ }
}

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;

namespace Gemini.Build.CodeGeneration
{
    public class Logger : ILogger
    {
        public static ILogger Log { get; set; } = NullLogger.Instance;

        void ILogger.Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception? exception, Func<TState, Exception?, string> formatter)
        {
            Log.Log(logLevel, eventId, state, exception, formatter);
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            return Log.IsEnabled(logLevel);
        }

        public IDisposable BeginScope<TState>(TState state)
        {
            return Log.BeginScope(state);
        }
    }
}
```

## Compliant Code Examples
```csharp
class Compliant {
    async Task AsyncFetch() { /* ... */ }
    async void OnClick() { /* ... */ }
    async void HandleClick(object sender, EventArgs e) { /* ... */ }
}

```
