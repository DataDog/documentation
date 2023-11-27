---
title: Static Analysis Rules
kind: documentation
description: View rules for multiple languages for Static Analysis.
is_beta: true
type: static-analysis

rulesets:
  docker-best-practices:
      title: Follow best practices with using Docker
      description: Best practices for using Docker.
  javascript-best-practices:
      title: Follow best practices for writing JavaScript code
      description: Rules to enforce JavaScript best practices.
  javascript-browser-security:
      title: Security rules for JavaScript web applications
      description: Rules focused on finding security issues in your JavaScript web applications.
  javascript-code-style:
      title: Enforce JavaScript code style
      description: Rules to enforce JavaScript code style.
  javascript-common-security:
      title: Common security rules for JavaScript
      description: Rules focused on finding security issues in your JavaScript code.
  javascript-express:
      title: Check for Express.js best practices and security
      description: Rules specifically for Express.js best practices and security.
  javascript-inclusive:
      title: Check JavaScript code for wording issues
      description: Rules for JavaScript to avoid inappropriate wording in the code and comments.
  javascript-node-security:
      title: Identify potential security hotspots in Node
      description: Rules to identify potential security hotspots in Node. This may include false positives that require further triage.
  jsx-react:
      title: React specific linting rules for stella
      description: This plugin exports a `recommended` configuration that enforces React good practices.
  python-best-practices:
      title: Follow best practices for writing Python code
      description: Best practices for Python to write efficient and bug-free code.
  python-code-style:
      title: Enforce Python code style
      description: Rules to enforce Python code style.
  python-design:
      title: Check Python program structure
      description: Rules to check your Python program structure, including things like nested loops.
  python-django:
      title: Check for Django best practices and security
      description: Rules specifically for Django best practices and security.
  python-flask:
      title: Check for Flask best practices and security
      description: Rules specifically for Flask best practices and security.
  python-inclusive:
      title: Check Python code for wording issues
      description: Rules for Python to avoid inappropriate wording in the code and comments.
  python-pandas:
      title: Good practices for data science with pandas
      description: A set of rules to check that pandas code is used appropriately.
  python-security:
      title: Ensure your Python code is safe and secure
      description: Rules focused on finding security and vulnerability issues in your Python code, including those found in the OWASP10 and SANS25.
  tsx-react:
      title: TypeScript React code quality
      description: This plugin exports a `recommended` configuration that enforces React good practices.
  typescript-best-practices:
      title: Follow best practices for writing TypeScript code
      description: Rules to enforce TypeScript best practices.
  typescript-browser-security:
      title: Security rules for TypeScript web applications
      description: Rules focused on finding security issues in your TypeScript web applications.
  typescript-code-style:
      title: TypeScript opinionated code patterns
      description: Rules considered to be best practice for modern TypeScript codebases, but that do not impact program logic. These rules are generally opinionated about enforcing simpler code patterns.
  typescript-common-security:
      title: Common security rules for TypeScript
      description: Rules focused on finding security issues in your TypeScript code.
  typescript-express:
      title: Check for Express.js TypeScript best practices and security
      description: Rules specifically for Express.js TypeScript best practices and security.
  typescript-inclusive:
      title: Check Python code for wording issues
      description: Rules for Python to avoid inappropriate wording in the code and comments.
  typescript-node-security:
      title: Identify potential security hotspots in Node
      description: Rules to identify potential security hotspots in Node. This may include false positives that require further triage.

further_reading:
  - link: "/continuous_integration/static_analysis/"
    tag: "Documentation"
    text: "Learn about Datadog Static Analysis"
---

## Overview

{{% site-region region="us,us3,us5,eu,ap1" %}}
<div class="alert alert-warning">
  Static Analysis is in private beta. Python, JavaScript, TypeScript, and Docker are the only supported languages. To request access, <a href="/help">contact Support</a>.
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Static Analysis is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

Datadog Static Analysis provides out-of-the-box rules to help detect violations in your CI/CD pipelines in code reviews and identify bugs, security, and maintainability issues. For more information, see the [Static Analysis documentation][1].


<<<<<<< HEAD
=======
### Follow best practices with using Docker

**Ruleset ID:** `docker-best-practices`

Best practices for using Docker.

{{< sa-rule-list "docker_best_practices_data" >}}

<br>

## JavaScript rules

### Follow best practices for writing JavaScript code

**Ruleset ID:** `javascript-best-practices`

Rules to enforce JavaScript best practices.

{{< sa-rule-list "javascript_best_practices_data" >}}

<br>

### Security rules for JavaScript web applications

**Ruleset ID:** `javascript-browser-security`

Rules focused on finding security issues in your JavaScript web applications.

{{< sa-rule-list "javascript_browser_security_data" >}}

<br>

### Enforce JavaScript code style

**Ruleset ID:** `javascript-code-style`

Rules to enforce JavaScript code style.

{{< sa-rule-list "javascript_code_style_data" >}}

<br>

### Common security rules for JavaScript

**Ruleset ID:** `javascript-common-security`

Rules focused on finding security issues in your JavaScript code.

{{< sa-rule-list "javascript_common_security_data" >}}

<br>

### Check for Express.js best practices and security

**Ruleset ID:** `javascript-express`

Rules specifically for Express.js best practices and security.

{{< sa-rule-list "javascript_express_data" >}}

<br>

### Check JavaScript code for wording issues

**Ruleset ID:** `javascript-inclusive`

Rules for JavaScript to avoid inappropriate wording in the code and comments.

{{< sa-rule-list "javascript_inclusive_data" >}}

<br>

### Identify potential security hotspots in Node

**Ruleset ID:** `javascript-node-security`

Rules to identify potential security hotspots in Node. This may include false positives that require further triage.

{{< sa-rule-list "javascript_node_security_data" >}}

<br>

### React specific linting rules

**Ruleset ID:** `jsx-react`

This plugin exports a `recommended` configuration that enforces React good practices.

{{< sa-rule-list "jsx_react_data" >}}

<br>

## Python rules

### Follow best practices for writing Python code

**Ruleset ID:** `python-best-practices`

Best practices for Python to write efficient and bug-free code.

{{< sa-rule-list "python_best_practices_data" >}}

<br>

### Enforce Python code style

**Ruleset ID:** `python-code-style`

Rules to enforce Python code style.

{{< sa-rule-list "python_code_style_data" >}}

<br>

### Check Python program structure

**Ruleset ID:** `python-design`

Rules to check your Python program structure, including things like nested loops.

{{< sa-rule-list "python_design_data" >}}

<br>

### Check for Django best practices and security

**Ruleset ID:** `python-django`

Rules specifically for Django best practices and security.

{{< sa-rule-list "python_django_data" >}}

<br>

### Check for Flask best practices and security

**Ruleset ID:** `python-flask`

Rules specifically for Flask best practices and security.

{{< sa-rule-list "python_flask_data" >}}

<br>

### Check Python code for wording issues

**Ruleset ID:** `python-inclusive`

Rules for Python to avoid inappropriate wording in the code and comments.

{{< sa-rule-list "python_inclusive_data" >}}

<br>

### Good practices for data science with pandas

**Ruleset ID:** `python-pandas`

A set of rules to check that pandas code is used appropriately.

 - Ensures `import` declarations follow coding guidelines.
 - Avoid deprecated code and methods.
 - Avoid inefficient code whenever possible.

{{< sa-rule-list "python_pandas_data" >}}

<br>

### Ensure your Python code is safe and secure

**Ruleset ID:** `python-security`

Rules focused on finding security and vulnerability issues in your Python code, including those found in the OWASP10 and SANS25.
 
 - Use of bad encryption and hashing protocols
 - Lack of access control
 - Security misconfiguration
 - SQL injections
 - Hardcoded credentials
 - Shell injection
 - Unsafe deserialization

{{< sa-rule-list "python_security_data" >}}

<br>

## TypeScript rules

### TypeScript React code quality

**Ruleset ID:** `tsx-react`

This plugin exports a `recommended` configuration that enforces React good practices.

{{< sa-rule-list "tsx_react_data" >}}

<br>

### Follow best practices for writing TypeScript code

**Ruleset ID:** `typescript-best-practices`

Rules to enforce TypeScript best practices.

{{< sa-rule-list "typescript_best_practices_data" >}}

<br>

### Security rules for TypeScript web applications

**Ruleset ID:** `typescript-browser-security`

Rules focused on finding security issues in your TypeScript web applications.

{{< sa-rule-list "typescript_browser_security_data" >}}

<br>

### TypeScript opinionated code patterns

**Ruleset ID:** `typescript-code-style`

Rules considered to be best practice for modern TypeScript codebases, but that do not impact program logic. These rules are generally opinionated about enforcing simpler code patterns.

{{< sa-rule-list "typescript_code_style_data" >}}

<br>

### Common security rules for TypeScript

**Ruleset ID:** `typescript-common-security`

Rules focused on finding security issues in your TypeScript code.

{{< sa-rule-list "typescript_common_security_data" >}}

<br>

### Check for Express.js TypeScript best practices and security

**Ruleset ID:** `typescript-express`

Rules specifically for Express.js TypeScript best practices and security.

{{< sa-rule-list "typescript_express_data" >}}

<br>

### Check Python code for wording issues

**Ruleset ID:** `typescript-inclusive`

Rules for Python to avoid inappropriate wording in the code and comments.

{{< sa-rule-list "typescript_inclusive_data" >}}

<br>

### Identify potential security hotspots in Node

**Ruleset ID:** `typescript-node-security`

Rules to identify potential security hotspots in Node. This may include false positives that require further triage.

{{< sa-rule-list "typescript_node_security_data" >}}

<br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
>>>>>>> master

[1]: /continuous_integration/static_analysis
