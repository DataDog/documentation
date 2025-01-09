---
aliases:
- /continuous_integration/static_analysis/rules/ruby-code-style/no-cryptic-perlisms
- /static_analysis/rules/ruby-code-style/no-cryptic-perlisms
dependencies: []
disable_edit: true
group_id: ruby-code-style
meta:
  category: Code Style
  id: ruby-code-style/no-cryptic-perlisms
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Avoid using Perl-style special variables
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-code-style/no-cryptic-perlisms`

**Language:** Ruby

**Severity:** Notice

**Category:** Code Style

## Description
The rule 'Avoid using Perl-style special variables' is important for improving the readability and maintainability of your code. Perl-style special variables, such as `$0`, `$1`, and `$_`, while powerful, can make your code less readable and harder to understand, especially for developers unfamiliar with Perl or its influence on Ruby. They can also introduce subtle bugs due to their global nature and the special behavior associated with them.

To avoid violating this rule, you can use the more descriptive aliases provided by the `English` library. This library, which is part of Ruby's standard library, provides human-readable names for Perl-style special variables. For example, instead of using `$&` to get the string matched by the last successful pattern match, you can use `$MATCH`.

Here's a compliant code example: Instead of `$_`, you can use `$LAST_READ_LINE`. Instead of `$!`, use `$ERROR_INFO`. This makes your code more self-explanatory and reduces the potential for confusion. Example: 
```ruby
require 'English'
puts $LAST_READ_LINE
puts $ERROR_INFO
```
This practice significantly enhances the readability of your code and makes it more accessible to developers who are not familiar with Perl-style variables.

## Non-Compliant Code Examples
```ruby
$! = ' -- '
$@ = ' -- '
$; = ' -- '
$, = ' -- '
$/ = ' -- '
$\ = ' -- '
$. = ' -- '
$_ = ' -- '
$> = ' -- '
$< = ' -- '
$$ = ' -- '
$~ = ' -- '
$* = ' -- '
$& = ' -- '
```

## Compliant Code Examples
```ruby
require "English"

$OUTPUT_FIELD_SEPARATOR = ' -- '
"Lorem ipsum dolor sit amet" =~ /dolor/
print $POSTMATCH, $PID, "\n"
```
