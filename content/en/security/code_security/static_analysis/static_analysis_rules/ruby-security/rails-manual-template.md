---
aliases:
- /continuous_integration/static_analysis/rules/ruby-security/rails-manual-template
- /static_analysis/rules/ruby-security/rails-manual-template
dependencies: []
disable_edit: true
group_id: ruby-security
meta:
  category: Security
  id: ruby-security/rails-manual-template
  language: Ruby
  severity: Warning
  severity_rank: 2
title: Avoid manual template creation
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-security/rails-manual-template`

**Language:** Ruby

**Severity:** Warning

**Category:** Security

**CWE**: [79](https://cwe.mitre.org/data/definitions/79.html)

## Description
The rule 'Avoid manual template creation' is aimed at preventing the direct use of 'ERB.new' for creating new templates in Ruby. This is because manually creating templates can increase the risk of code injection attacks. An attacker could potentially inject malicious code into your templates, leading to significant security issues.

It's important to adhere to this rule because it promotes better security practices. By avoiding manual template creation, you reduce the potential attack surface for malicious actors. Additionally, manually creating templates can lead to messy and hard-to-maintain code, which can negatively impact the overall quality of your application.

Instead of manually creating templates, consider using Rails' built-in mechanisms for managing views and templates. For instance, you can use the 'render' method in your controller to render a view. Here's an example: `render 'template_name'`. This method automatically handles the loading and processing of ERB templates, making your code safer and cleaner.

## Non-Compliant Code Examples
```ruby
def scaffold_post_content
    ERB.new(File.read(File.expand_path(scaffold_path, site_template))).result
end
```
