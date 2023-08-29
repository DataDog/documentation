---
title: Analyzing Local Code with VSCode
kind: documentation
disable_toc: false
---

## Overview

Local [Static Analysis][4] helps engineers catch quality and security issues as they work, reducing the time spent in code reviews.

Static Analysis is included in the [Datadog VSCode extension][3], which can

- highlight violations in code, color-coded by severity
- suggest fixes
- automatically apply fixes when the relevant [Code Action][1] is clicked
- display a list of all violations in the workspace

## Prerequisites

- The repo must be [configured for Static Analysis][2].
- The [Datadog VSCode extension][3] must be installed.

[1]: https://code.visualstudio.com/docs/editor/refactoring#_code-actions-quick-fixes-and-refactorings
[2]: /continuous_integration/static_analysis/?tab=circleciorbs#setup
[3]: https://cuddly-adventure-l8j627m.pages.github.io/#/?id=datadog-for-vs-code
[4]: /continuous_integration/static_analysis/?tab=circleciorbs