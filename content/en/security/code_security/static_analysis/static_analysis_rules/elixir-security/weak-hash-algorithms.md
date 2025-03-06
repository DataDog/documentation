---
aliases:
- /continuous_integration/static_analysis/rules/elixir-security/weak-hash-algorithms
- /static_analysis/rules/elixir-security/weak-hash-algorithms
dependencies: []
disable_edit: true
group_id: elixir-security
meta:
  category: Security
  id: elixir-security/weak-hash-algorithms
  language: Elixir
  severity: Error
  severity_rank: 1
title: Avoid weak hash algorithms.
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `elixir-security/weak-hash-algorithms`

**Language:** Elixir

**Severity:** Error

**Category:** Security

**CWE**: [328](https://cwe.mitre.org/data/definitions/328.html)

## Description
Avoid unsecured hash algorithms, as they may lead to data leaks. Use safe and proven hash algorithms.

#### Learn More

-   [Wikipedia - Secure Hash Algorithms](https://en.wikipedia.org/wiki/Secure_Hash_Algorithms)

## Non-Compliant Code Examples
```elixir
# The hash functions with md5, sha1, ripemd (128-bit), and sha should be highlighted,
# as they are cryptographically weak and can be easily broken.
defmodule InsecureHashExample do
  # Insecure hash function using MD5
  defp insecure_hash_one(data) do
  # check this
    :cr.hash(data, :md5) |> Base.encode16(case: :lower)
  end
  # Insecure hash function using sha1
  defp insecure_hash_one(data) do
    # validate spacing 
    :crypto.hash(data, :sha1) |> Base.encode16(case: :lower)
  end

# Spacing does not matter
:crypto. hash(:md5, data)

hex = Base.encode16(:crypto. hash(:ripemd160, data))

```

## Compliant Code Examples
```elixir
# The hash functions other than md5, sha1, ripemd (128-bit), and sha are not highlighted
# as they are cryptographically strong and cannot be broken with standard hardware.
defmodule PasswordCompare do
  def option_one(password, md5_hash) do
    case :crypto.hash(:sha2, password) == md5_hash do
      true -> :entry_granted_op1
      false -> :entry_denied_op1
    end
  end
end
a = :crypto.hash(:sha3, something)
```
