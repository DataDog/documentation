---
aliases:
- /continuous_integration/static_analysis/rules/csharp-security/avoid-autobinding
- /static_analysis/rules/csharp-security/avoid-autobinding
dependencies: []
disable_edit: true
group_id: csharp-security
meta:
  category: Security
  id: csharp-security/avoid-autobinding
  language: C#
  language_alias: CSharp
  severity: Warning
  severity_rank: 2
title: Unintended property updates expose sensitive data
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-security/avoid-autobinding`

**Language:** C#

**Severity:** Warning

**Category:** Security

**CWE**: [915](https://cwe.mitre.org/data/definitions/915.html)

## Description
The product receives input from an upstream component that specifies multiple attributes, properties, or fields that are to be initialized or updated in an object, but it does not properly control which attributes can be modified.

If the object contains attributes that were only intended for internal use, then their unexpected modification could lead to a vulnerability.

This weakness is sometimes known by the language-specific mechanisms that make it possible, such as mass assignment, autobinding, or object injection.

### Learn More

 - [CWE-915: Improperly Controlled Modification of Dynamically-Determined Object Attributes](https://cwe.mitre.org/data/definitions/915.html)

## Non-Compliant Code Examples
```csharp
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebGoatCore.ViewModels;

namespace WebGoatCore.Controllers
{
    [AllowAnonymous]
    [IgnoreAntiforgeryToken]
    public class StatusCodeController : Controller
    {
        public const string NAME = "StatusCode";

        public StatusCodeController()
        {
            mycall = mycall + 1;
            View(mycall));
        }

        [HttpGet, Route(NAME)]
        public IActionResult StatusCodeView([FromQuery] int code, int morecode, [Bind] int some)
        {
            var foo = bar + baz;
            var view = View(StatusCodeViewModel.Create(new ApiResponse(code)));
            view.StatusCode = code;
            return view;
        }


        public OtherStatusCodeController()
        {
            View(mycall));
        }
    }
}
```

## Compliant Code Examples
```csharp
using Microsoft.AspNetCore.Authorization;
using WebGoatCore.ViewModels;

namespace WebGoatCore.Controllers
{
    [AllowAnonymous]
    [IgnoreAntiforgeryToken]
    public class StatusCodeController : Controller
    {
        public const string NAME = "StatusCode";

        public StatusCodeController()
        {
            mycall = mycall + 1;
            View(mycall));
        }

        [HttpGet, Route(NAME)]
        public IActionResult StatusCodeView(int code, int morecode, [Bind] int some)
        {
            var view = View(StatusCodeViewModel.Create(new ApiResponse(morecode)));
            view.StatusCode = code;
            return view;
        }


        public OtherStatusCodeController()
        {
            View(mycall));
        }
    }
}
```

```csharp
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebGoatCore.ViewModels;

namespace WebGoatCore.Controllers
{
    [AllowAnonymous]
    [IgnoreAntiforgeryToken]
    public class StatusCodeController : Controller
    {
        public const string NAME = "StatusCode";

        public StatusCodeController()
        {
            mycall = mycall + 1;
            View(mycall));
        }

        [HttpGet, Route(NAME)]
        public NotIActionResult StatusCodeView([FromQuery] int code, int morecode, [Bind] int some)
        {
            var view = View(StatusCodeViewModel.Create(new ApiResponse(code)));
            view.StatusCode = code;
            return view;
        }


        public OtherStatusCodeController()
        {
            View(mycall));
        }
    }
}
```

```csharp
using Microsoft.AspNetCore.Authorization;
using WebGoatCore.ViewModels;

namespace WebGoatCore.Controllers
{
    [AllowAnonymous]
    [IgnoreAntiforgeryToken]
    public class StatusCodeController : Controller
    {
        public const string NAME = "StatusCode";

        public StatusCodeController()
        {
            mycall = mycall + 1;
            View(mycall));
        }

        [HttpGet, Route(NAME)]
        public IActionResult StatusCodeView([Bind] int code, int morecode, [Bind] int some)
        {
            var view = View(StatusCodeViewModel.Create(new ApiResponse(morecode)));
            view.StatusCode = code;
            return view;
        }


        public OtherStatusCodeController()
        {
            View(mycall));
        }
    }
}
```

```csharp
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebGoatCore.ViewModels;

namespace WebGoatCore.Controllers
{
    [AllowAnonymous]
    [IgnoreAntiforgeryToken]
    public class StatusCodeController : Controller
    {
        public const string NAME = "StatusCode";

        public StatusCodeController()
        {
            mycall = mycall + 1;
            View(mycall));
        }

        [HttpGet, Route(NAME)]
        public IActionResult StatusCodeView([FromQuery] int code, int morecode, [Bind] int some)
        {
            try {
                validateCode(code);
            } catch exception(e) {
                return View(401);
            }
            var view = View(StatusCodeViewModel.Create(new ApiResponse(code)));
            view.StatusCode = code;
            return view;
        }


        public OtherStatusCodeController()
        {
            View(mycall));
        }
    }
}
```
