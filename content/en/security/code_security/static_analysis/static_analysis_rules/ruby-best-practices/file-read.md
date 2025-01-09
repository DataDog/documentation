---
aliases:
- /continuous_integration/static_analysis/rules/ruby-best-practices/file-read
- /static_analysis/rules/ruby-best-practices/file-read
dependencies: []
disable_edit: true
group_id: ruby-best-practices
meta:
  category: Best Practices
  id: ruby-best-practices/file-read
  language: Ruby
  severity: Info
  severity_rank: 4
title: Use helper functions to read files
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-best-practices/file-read`

**Language:** Ruby

**Severity:** Info

**Category:** Best Practices

## Description
This rule emphasizes the usage of helper functions like `File.read` or `File.binread` for reading files in Ruby. Using these functions is a more efficient and safer approach when compared to the traditional method of opening a file, reading its content, and then closing it. 

The importance of this rule lies in the fact that it helps prevent common mistakes that can lead to resource leaks. If you use `File.open` without a block, you must remember to close the file manually. Forgetting to do so can leave the file open indefinitely, which is a waste of system resources. In contrast, helper functions like `File.read` and `File.binread` automatically close the file once the content is read, ensuring that resources are properly managed.

To adhere to this rule, always use `File.read` or `File.binread` when you need to read the entire contents of a file. Avoid using `File.open` methods without a block for file reading operations. By following this rule, you will write more efficient, safer, and cleaner code.

## Non-Compliant Code Examples
```ruby
File.open(filename, 'rb').read
File.open(filename, 'rb', &:read)
File.open(filename, 'rb') { |f| f.read }
File.open(filename, 'rb') do |f|
  f.read
end
```

```ruby
File.open(filename).read
File.open(filename, &:read)
File.open(filename) { |f| f.read }
File.open(filename) do |f|
  f.read
end
File.open(filename, 'r').read
File.open(filename, 'r', &:read)
File.open(filename, 'r') { |f| f.read }
File.open(filename, 'r') do |f|
  f.read
end
```

## Compliant Code Examples
```ruby
File.binread(filename)
```

```ruby
File.read(filename)
```
