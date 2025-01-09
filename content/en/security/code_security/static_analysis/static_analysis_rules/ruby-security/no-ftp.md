---
aliases:
- /continuous_integration/static_analysis/rules/ruby-security/no-ftp
- /static_analysis/rules/ruby-security/no-ftp
dependencies: []
disable_edit: true
group_id: ruby-security
meta:
  category: Security
  id: ruby-security/no-ftp
  language: Ruby
  severity: Info
  severity_rank: 4
title: Avoid FTP connections
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-security/no-ftp`

**Language:** Ruby

**Severity:** Info

**Category:** Security

**CWE**: [319](https://cwe.mitre.org/data/definitions/319.html)

## Description
The rule "Avoid FTP connections" is a security best practice that discourages the use of the File Transfer Protocol (FTP) for transferring files in your Ruby applications. FTP is a protocol that lacks modern security features such as encryption and is susceptible to numerous types of attacks, including packet capture, spoofing, and brute force attacks.

This rule is important because the use of insecure protocols like FTP can lead to the exposure of sensitive data, such as user credentials or confidential file contents. The lack of encryption means that data transferred via FTP can be easily intercepted and read by unauthorized parties. This can lead to serious security breaches and data loss.

To adhere to this rule and avoid the associated security risks, use secure alternatives to FTP. For instance, you could use SFTP (SSH File Transfer Protocol) or FTPS (FTP Secure) which provide the necessary encryption for data transfers. In Ruby, you can use libraries such as `Net::SFTP` or `Net::FTPS` for secure file transfers. Using these alternatives will ensure that your file transfers are securely encrypted and less vulnerable to attacks.

## Non-Compliant Code Examples
```ruby
Net::FTP.open('example.com') do |ftp|
    ftp.login
    files = ftp.chdir('pub/lang/ruby/contrib')
    files = ftp.list('n*')
    ftp.getbinaryfile('nif.rb-0.91.gz', 'nif.gz', 1024)
end

ftp = Net::FTP.new('example.com')
ftp.login
files = ftp.chdir('pub/lang/ruby/contrib')
files = ftp.list('n*')
ftp.getbinaryfile('nif.rb-0.91.gz', 'nif.gz', 1024)
ftp.close
```
