---
aliases:
- /continuous_integration/static_analysis/rules/ruby-security/shell-injection
- /static_analysis/rules/ruby-security/shell-injection
dependencies: []
disable_edit: true
group_id: ruby-security
meta:
  category: Security
  id: ruby-security/shell-injection
  language: Ruby
  severity: Warning
  severity_rank: 2
title: Check for potential shell injection
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-security/shell-injection`

**Language:** Ruby

**Severity:** Warning

**Category:** Security

**CWE**: [94](https://cwe.mitre.org/data/definitions/94.html)

## Description
This rule checks for potential shell injection vulnerabilities in your Ruby code. Shell injection is a serious security risk, as it allows an attacker to execute arbitrary commands on your system, potentially leading to data theft, corruption, or other malicious actions. When user input is used to form shell commands, it is essential to ensure that it cannot be manipulated to alter the intended command execution.

The importance of this rule cannot be overstated. Preventing shell injection attacks is a critical aspect of maintaining the security and integrity of your application and its data. Shell injections can lead to severe consequences, including unauthorized access, data breaches, and system compromise.

To avoid shell injection vulnerabilities, always use the array form of system commands in Ruby, such as `system("echo", "Hello, World!")` instead of `system("echo Hello, World!")`. The array form ensures that the arguments are passed directly to the command and not interpreted by the shell. Also, avoid using user input directly in shell commands. If it's unavoidable, make sure to sanitize the input thoroughly before using it. Use libraries such as `Shellwords.escape` to escape any potentially dangerous characters in the user input.

## Non-Compliant Code Examples
```ruby
Process.exec([binary, argument], "somethingelse")
system(my_command)
Process.spawn([command, argument])
exec(my_command)
spawn([command, argument])
Open3.capture2(command, :stdin_data=>"42")
Open3.capture2e(command)
Open3.capture3(command)
Open3.pipeline(cmd1, cmd2)

Process.exec(command, File.basename(__FILE__), *ARGV)
return system "xdg-open", address if Utils::Platforms.linux?
```

## Compliant Code Examples
```ruby
Process.exec('osctl', File.basename(__FILE__), *ARGV)
system("ls /home")
Process.spawn(["ls", "/home"])
exec("ls /home")
spawn(["ls", "/home"])
Open3.capture2("ls /home", :stdin_data=>"42")
Open3.capture2e("ls /home")
Open3.capture3("ls /home")
Open3.pipeline("ls", "cat")

Process.exec("ls /home", File.basename(__FILE__), *ARGV)
```
