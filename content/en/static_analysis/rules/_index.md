---
title: Static Analysis Rules
kind: documentation
description: View rules for multiple languages for Static Analysis.
aliases:
- /continuous_integration/static_analysis/rules
is_beta: true
type: static-analysis

rulesets:
  csharp-best-practices:
    title: "Best Practices for C#"
    description: |
      Rules to enforce C# best practices.
  csharp-code-style:
    title: "Follow C# code style patterns"
    description: |
      Rules to enforce C# code style.
  csharp-inclusive:
    title: "Use inclusive language in C#"
    description: |
      Rules to make your C# code more inclusive.
  csharp-security:
    title: "Write safe and secure C# code"
    description: |
      Rules focused on finding security issues in your C# code.
  docker-best-practices:
    title: "Follow best practices with using Docker"
    description: |
      Best practices for using Docker.
  java-best-practices:
    title: "Follow best practices in Java"
    description: |
      Rules to enforce Java best practices.
  java-code-style:
    title: "Follow Java code style patterns"
    description: |
      Rules to enforce Java code style.
  java-inclusive:
    title: "Use inclusive language in Java"
    description: |
      Rules for Java to avoid inappropriate wording in the code and comments.
  java-security:
    title: "Ensure your Java code is secure"
    description: |
      Rules focused on finding security issues in Java code.
  javascript-best-practices:
    title: "Follow best practices for writing JavaScript code"
    description: |
      Rules to enforce JavaScript best practices.
  javascript-browser-security:
    title: "Security rules for JavaScript web applications"
    description: |
      Rules focused on finding security issues in your JavaScript web applications.
  javascript-code-style:
    title: "Enforce JavaScript code style"
    description: |
      Rules to enforce JavaScript code style.
  javascript-common-security:
    title: "Common security rules for JavaScript"
    description: |
      Rules focused on finding security issues in your JavaScript code.
  javascript-express:
    title: "Check for Express.js best practices and security"
    description: |
      Rules specifically for Express.js best practices and security.
  javascript-inclusive:
    title: "Check JavaScript code for wording issues"
    description: |
      Rules for JavaScript to avoid inappropriate wording in the code and comments.
  javascript-node-security:
    title: "Identify potential security hotspots in Node"
    description: |
      Rules to identify potential security hotspots in Node. This may include false positives that require further triage.
  jsx-react:
    title: "React specific linting rules"
    description: |
      This plugin exports a `recommended` configuration that enforces React good practices.
  python-best-practices:
    title: "Follow best practices for writing Python code"
    description: |
      Best practices for Python to write efficient and bug-free code.
  python-code-style:
    title: "Enforce Python code style"
    description: |
      Rules to enforce Python code style.
  python-design:
    title: "Check Python program structure"
    description: |
      Rules to check your Python program structure, including things like nested loops.
  python-django:
    title: "Check for Django best practices and security"
    description: |
      Rules specifically for Django best practices and security.
  python-flask:
    title: "Check for Flask best practices and security"
    description: |
      Rules specifically for Flask best practices and security.
  python-inclusive:
    title: "Check Python code for wording issues"
    description: |
      Rules for Python to avoid inappropriate wording in the code and comments.
  python-pandas:
    title: "Good practices for data science with pandas"
    description: |
      A set of rules to check that pandas code is used appropriately.
      
       - Ensures `import` declarations follow coding guidelines.
       - Avoid deprecated code and methods.
       - Avoid inefficient code whenever possible.
  python-security:
    title: "Ensure your Python code is safe and secure"
    description: |
      Rules focused on finding security and vulnerability issues in your Python code, including those found in the OWASP10 and SANS25.
       
       - Use of bad encryption and hashing protocols
       - Lack of access control
       - Security misconfiguration
       - SQL injections
       - Hardcoded credentials
       - Shell injection
       - Unsafe deserialization
  tsx-react:
    title: "TypeScript React code quality"
    description: |
      This plugin exports a `recommended` configuration that enforces React good practices.
  typescript-best-practices:
    title: "Follow best practices for writing TypeScript code"
    description: |
      Rules to enforce TypeScript best practices.
  typescript-browser-security:
    title: "Security rules for TypeScript web applications"
    description: |
      Rules focused on finding security issues in your TypeScript web applications.
  typescript-code-style:
    title: "TypeScript opinionated code patterns"
    description: |
      Rules considered to be best practice for modern TypeScript codebases, but that do not impact program logic. These rules are generally opinionated about enforcing simpler code patterns.
  typescript-common-security:
    title: "Common security rules for TypeScript"
    description: |
      Rules focused on finding security issues in your TypeScript code.
  typescript-express:
    title: "Check for Express.js TypeScript best practices and security"
    description: |
      Rules specifically for Express.js TypeScript best practices and security.
  typescript-inclusive:
    title: "Check TypeScript code for wording issues"
    description: |
      Rules for TypeScript to avoid inappropriate wording in the code and comments.
  typescript-node-security:
    title: "Identify potential security hotspots in Node"
    description: |
      Rules to identify potential security hotspots in Node. This may include false positives that require further triage.

further_reading:
  - link: "/static_analysis/"
    tag: "Documentation"
    text: "Learn about Datadog Static Analysis"
---

## Overview

{{% site-region region="us,us3,us5,eu,ap1" %}}
<div class="alert alert-warning">
  Static Analysis is in private beta. Python, Java, C#, JavaScript, TypeScript, and Docker are the only supported languages. To request access, <a href="/help">contact Support</a>.
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Static Analysis is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

Datadog Static Analysis provides out-of-the-box rules to help detect violations in your CI/CD pipelines in code reviews and identify bugs, security, and maintainability issues. For more information, see the [Static Analysis documentation][1].



[1]: /static_analysis
