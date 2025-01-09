---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/no-datetime
- /static_analysis/rules/ruby-best-practices/no-datetime
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/no-datetime
  language: Ruby
  severity: Notice
  severity_rank: 3
title: Avoid `DateTime` unless for historical purposes
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/no-datetime`

**Language:** Ruby

**Severity:** Notice

**Category:** Best Practices

## Description
The `DateTime` class in Ruby is known for its complexity and potential for confusion. It is based on the Julian Day Number system, which is primarily used for astronomical and historical calculations. While it does offer precision to the nanosecond, this level of detail is rarely necessary in most application development.

Using `DateTime` for common date and time manipulation can lead to unexpected behavior, especially when dealing with time zones. This is due to `DateTime`'s handling of time offsets as fractions of a day, which can result in rounding errors. It also lacks support for daylight saving time adjustments.

Instead, it's recommended to use the `Time` and `Date` classes for most common date and time operations. `Time` handles time zones better and `Date` is simpler for date-only operations. `DateTime` should be reserved for historical date and time calculations, where the Julian Day Number system is necessary. For example, `DateTime.iso8601('1867-07-01', Date::ITALY)` would be appropriate for representing the date of Canada's confederation in the Italian calendar.

## Non-Compliant Code Examples
```ruby
DateTime.now
DateTime.iso8601('2018-02-04')
```

## Compliant Code Examples
```ruby
Time.now
Date.iso8601('2018-02-04')
DateTime.iso8601('1867-07-01', Date::CANADA)
```
