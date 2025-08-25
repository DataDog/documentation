---
title: Configure IaC Security Exclusions
aliases:
  - /security/cloud_security_management/setup/iac_scanning/iac_scanning_exclusions/
further_reading:
  - link: "https://www.datadoghq.com/blog/datadog-iac-security/"
    tag: "Blog"
    text: "Prevent cloud misconfigurations from reaching production with Datadog IaC Security"
  - link: "/security/code_security/iac_security"
    tag: "Documentation"
    text: "IaC Security"
  - link: "/security/code_security/iac_security/setup"
    tag: "Documentation"
    text: "Set up IaC Security for Code Security"
  - link: "/security/code_security/iac_security/iac_rules/"
    tag: "Documentation"
    text: "IaC Security Rules"
---

Infrastructure as Code (IaC) Security detects security misconfigurations in Terraform files. Exclusions allow you to control which findings appear in scan results by ignoring specific rules, files, or issue categories.

## Exclusion methods

You can configure exclusions using:

- A configuration file to define exclusions for severity levels, file paths, query IDs, and categories.
- Inline comments to ignore specific findings within Terraform files.

<div class="alert alert-info">If an exclusion is defined in both the configuration file and an inline comment, the configuration file takes priority.</div>

## Configure exclusions with a configuration file

1. Create a file named `dd-iac-scan.config` in the root directory of your project repository.
1. Add the necessary exclusions in YAML, JSON, TOML, or HCL format.
1. Commit the `dd-iac-scan.config` file to your repository.

### Supported exclusions

#### Exclude severities

Use `exclude-severities` to exclude findings based on severity level. To supply multiple values to this option, you can set the option multiple times or pass in a list.

**Possible values:** 
- `critical`
- `high`
- `medium`
- `low`
- `info`  

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
exclude-severities:
  - "info"
  - "low"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"exclude-severities": [
     "info",
     "low"
]
```

{{% /tab %}}
{{% tab "TOML" %}}

```
exclude-severities = [ "info", "low" ]
```

{{% /tab %}}
{{% tab "HCL" %}}

```
"exclude-severities" = ["info", "low"]
```

{{% /tab %}}
{{< /tabs >}}

#### Exclude paths

Use `exclude-paths` to exclude specific files or directories from scanning. This option supports glob patterns. To supply multiple values to this option, you can set the option multiple times or pass in a list.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
exclude-paths:
  - "./shouldNotScan/*"
  - "dir/somefile.txt"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"exclude-paths": [
     "./shouldNotScan/*",
     "dir/somefile.txt"
]
```

{{% /tab %}}
{{% tab "TOML" %}}

```
exclude-paths = [ "./shouldNotScan/*", "dir/somefile.txt" ]
```

{{% /tab %}}
{{% tab "HCL" %}}

```
"exclude-paths" = ["./shouldNotScan/*", "dir/somefile.txt"]
```

{{% /tab %}}
{{< /tabs >}}

#### Exclude queries

Use `exclude-queries` to exclude specific queries by their query ID. To supply multiple values to this option, you can set the option multiple times or pass in a list.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
exclude-queries:
  - "e69890e6-fce5-461d-98ad-cb98318dfc96"
  - "4728cd65-a20c-49da-8b31-9c08b423e4db"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"exclude-queries": [
     "e69890e6-fce5-461d-98ad-cb98318dfc96",
     "4728cd65-a20c-49da-8b31-9c08b423e4db"
]
```

{{% /tab %}}
{{% tab "TOML" %}}

```
exclude-queries = [ "e69890e6-fce5-461d-98ad-cb98318dfc96", "4728cd65-a20c-49da-8b31-9c08b423e4db" ]
```

{{% /tab %}}
{{% tab "HCL" %}}

```
"exclude-queries" = ["e69890e6-fce5-461d-98ad-cb98318dfc96", "4728cd65-a20c-49da-8b31-9c08b423e4db"]
```

{{% /tab %}}
{{< /tabs >}}

#### Exclude categories

Use `exclude-categories` to exclude specific categories. This option can be used multiple times or as a string representation of a list.

**Possible values**:  
- `Access Control`  
- `Availability`  
- `Backup`  
- `Best Practices`  
- `Build Process`  
- `Encryption`  
- `Insecure Configurations`  
- `Insecure Defaults`  
- `Networking and Firewall`  
- `Observability`  
- `Resource Management`  
- `Secret Management`  
- `Supply-Chain`  
- `Structure and Semantics`  
- `Bill Of Materials`  

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
exclude-categories:
  - "Access Control"
  - "Best Practices"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"exclude-categories": [
     "Access Control",
     "Best Practices"
]
```

{{% /tab %}}
{{% tab "TOML" %}}

```
exclude-categories = [ "Access Control", "Best Practices" ]
```

{{% /tab %}}
{{% tab "HCL" %}}

```
"exclude-categories" = ["Access Control", "Best Practices"]
```

{{% /tab %}}
{{< /tabs >}}

## Configure exclusions with an inline comment

To control which parts of a file are scanned, add a comment that starts with `# dd-iac-scan`, followed by a command and any required values. Inline exclusions apply only within the file where they are used.

<div class="alert alert-info">If an exclusion is defined in both the configuration file and an inline comment, the configuration file takes priority.</div>

### Supported commands

| **Comment**                      | **Description**                 |
|----------------------------------|---------------------------------|
| `dd-iac-scan ignore`             | Ignores the entire file.        |
| `dd-iac-scan disable=<query_id>` | Ignores specific queries.       |
| `dd-iac-scan enable=<query_id>`  | Includes only specific queries. |
| `dd-iac-scan ignore-line`        | Ignores a single line.          |
| `dd-iac-scan ignore-block`       | Ignores an entire block.        |

#### dd-iac-scan ignore

Excludes the entire file from scanning. This comment must be placed at the beginning of the file to take effect.

```
# dd-iac-scan ignore

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
```

#### dd-iac-scan disable=query_id

Excludes scan results for the specified queries in this file. This comment must be placed at the beginning of the file to take effect.

```
# dd-iac-scan disable=e592a0c5-5bdb-414c-9066-5dba7cdea370,e69890e6-fce5-461d-98ad-cb98318dfc96

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
```

Findings from the specified queries are ignored for this file.

#### dd-iac-scan enable=query_id

Limits scan results in this file to only the specified queries. This comment must be placed at the beginning of the file to take effect.  


```
# dd-iac-scan enable=e592a0c5-5bdb-414c-9066-5dba7cdea370

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
```

Only findings from the specified queries are included in scan results for this file.

#### dd-iac-scan ignore-line

Prevents scan results from flagging the line immediately after this comment. This comment can be placed anywhere in the file.

```
1: resource "google_storage_bucket" "example" {
2:  # dd-iac-scan ignore-line
3:  name          = "image-store.com"
4:  location      = "EU"
5:  force_destroy = true
6: }
```

Findings for line 3 are ignored.

#### dd-iac-scan ignore-block

Prevents scan results from flagging an entire resource block and all its key-value pairs. This comment can be placed anywhere in the file.

```
1: # dd-iac-scan ignore-block
2: resource "google_storage_bucket" "example" {
3:  name          = "image-store.com"
4:  location      = "EU"
5:  force_destroy = true
6: }
```

Findings related to the entire block (lines 2-6 in this example) are ignored.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}