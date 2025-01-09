---
aliases:
- /continuous_integration/static_analysis/rules/rails-best-practices/http-status-code-symbols
- /static_analysis/rules/rails-best-practices/http-status-code-symbols
dependencies: []
disable_edit: true
group_id: rails-best-practices
meta:
  category: Best Practices
  id: rails-best-practices/http-status-code-symbols
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Prefer using HTTP status code symbols
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `rails-best-practices/http-status-code-symbols`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
This rule encourages the use of symbolic representations of HTTP status codes over their numeric counterparts, making the code more self-explanatory and easier to understand. Numeric HTTP status codes can be cryptic and hard to remember, especially for developers who are not familiar with them.

To adhere to this rule, simply replace the numeric HTTP status code with its symbolic equivalent in your code. For example, instead of using `403` for a forbidden request, use `:forbidden`.

## Non-Compliant Code Examples
```ruby
class ApplicationController < ActionController::Base
  def access_denied
    render status: 403 # Avoid using numeric HTTP status code
  end
end
```

## Compliant Code Examples
```ruby
class ApplicationController < ActionController::Base
  def access_denied
    render status: :forbidden
  end
end
```
