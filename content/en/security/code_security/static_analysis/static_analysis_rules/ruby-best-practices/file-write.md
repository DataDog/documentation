---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/file-write
- /static_analysis/rules/ruby-best-practices/file-write
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/file-write
  language: Ruby
  severity: Info
  severity_rank: 4
title: Use helper functions to write files
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/file-write`

**Language:** Ruby

**Severity:** Info

**Category:** Best Practices

## Description
The rule emphasizes the importance of using helper functions such as `File.write` or `File.binwrite` to write files in Ruby. These helper functions are not only simpler and more readable, but they also handle resource management automatically, reducing the risk of file leaks caused by not closing files properly.

This rule is crucial as it promotes efficient memory usage and cleaner code. By using these helper functions, you're ensuring that your files are closed after being written to, which prevents potential file and memory leaks in your application. This can be particularly important in larger applications, where such leaks could lead to significant performance issues.

To abide by this rule, always prefer `File.write` or `File.binwrite` over `File.open` when writing to a file. These methods open the file, write the content, and then close the file automatically. They also return the number of bytes written, which can be a useful piece of information. The code becomes more concise, more readable, and less prone to file leaks.

## Non-Compliant Code Examples
```ruby
File.open(filename, 'wb').write(content)
File.open(filename, 'wb') { |f| f.write(content) }
File.open(filename, 'wb') do |f|
  f.write(content)
end

```

```ruby
File.open(filename, 'w').write(content)
File.open(filename, 'w') { |f| f.write(content) }
File.open(filename, 'w') do |f|
  f.write(content)
end
```

## Compliant Code Examples
```ruby
File.binwrite(filename, content)

```

```ruby
File.write(filename, content)
```
