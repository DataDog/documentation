---
title: Code Security
disable_toc: false
aliases:
- /code_analysis/
---

Code Security scans your pre-production code, open source libraries, and repositories to find security vulnerabilities and code quality issues. It encompasses the following capabilities:

- [Static Code Security (SAST)][1] for your first-party code
- [Software Composition Analysis][2] for open source dependencies in your codebase
- [Interactive Application Security Testing (IAST)][3] for code-level vulnerabilities in your services

## Static Code Security (SAST)

SAST analyzes static pre-production code to identify maintainability and security issues.

SAST has benefits for multiple people in your organization:

- **Developers:** early vulnerablity detection, code quality improvements, faster development as developers spend less time debugging and patching.
- **Site Reliability Engineers (SREs):** system resilience, security compliance, automated security checks as SAST integrates with CI/CD pipelines. Overall, SAST reduces manual overhead for SREs and ensures that each release is thoroughly tested for vulnerabilities.
- **Administrators:** enhanced security posture, improved patch management in response to early vulnerability alerts, and compliance monitoring.
- **Support Representatives:** incident prevention, faster issue resolutions, and customer assurance.

You supports scanning for multiple languages and you can integrate SAST into your development lifecycle using CI providers, source code management tools, and IDEs.

See [Static Analysis Setup][6] for more details.

## Software Composition Analysis

Software Composition Analysis (SCA) analyzes open source libraries in both your repositories and running services, providing end-to-end visibility of library vulnerabilities and license management from development to production.

SCA supports [static][4] and [runtime][5] scanning and provides libraries in the most common languages and technologies.

## IAST

Datadog Runtime Code Security (IAST) identifies code-level vulnerabilities in your services and provides actionable insights and recommended fixes.

IAST enables Datadog to identify vulnerabilities using legitimate application traffic instead of relying on external tests that could require extra configuration or periodic scheduling. It also monitors your code’s interactions with other components of your stack, such as libraries and infrastructure, providing an up-to-date view of your attack surface area.

For a list of supported services, see [IAST][3].

[1]: /security/code_security/static_analysis/
[2]: /security/code_security/software_composition_analysis/
[3]: /security/code_security/iast/
[4]: /security/code_security/software_composition_analysis/setup_static/
[5]: /security/code_security/software_composition_analysis/setup_runtime/
[6]: /security/code_security/static_analysis/setup/



