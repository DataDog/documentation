---
title: Setting up IaC Scanning Exclusions
further_reading:
    - link: "/security/cloud_security_management/setup"
      tag: "Documentation"
      text: "Setting up Cloud Security Management"
    - link: "/security/cloud_security_management/misconfigurations"
      tag: "Documentation"
      text: "CSM Misconfigurations"
    - link: "/security/cloud_security_management/identity_risks"
      tag: "Guide"
      text: "CSM Identity Risks"
---

<div class="alert alert-info">IaC Log forwarding to Microsoft Sentinel is in Preview. To access this feature, <a href="https://www.datadoghq.com/product-preview/log-forwarding-to-microsoft-sentinel/">register here.</a></div>

Infrastructure as Code (IaC) Scanning detects security misconfigurations in Terraform, Kubernetes, and CloudFormation files. Exclusions allow you to control which findings appear in scan results by ignoring specific rules, files, or issue categories.

## Exclusion methods

You can configure exclusions using:

- A configuration file to define exclusions for severity levels, file paths, query IDs, and categories.
- Inline comments to ignore specific findings within Terraform, Kubernetes, or CloudFormation files.

## Configure exclusions with a configuration file

1. Create a file named `dd-iac-scan.config` in the root directory of your project repository.
1. Add the necessary exclusions in YAML, JSON, TOML, or HCL format.
1. Commit the `dd-iac-scan.config` file to your repository.

### Supported exclusions

#### Exclude severities

Use `exclude-severities` to exclude findings based on severity level. This option can be used multiple times or as a string representation of a list.

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

Use `exclude-paths` to exclude specific files or directories from scanning. This option supports glob patterns and can be used multiple times or as a string representation of a list.

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
     "dir/somefile.txt",
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

Use `exclude-queries` to exclude specific queries by their query ID. This option can be used multiple times or as a string representation of a list.

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
     "4728cd65-a20c-49da-8b31-9c08b423e4db",
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

Use `exclude-categories` to exclude queries that belong to specified categories. This option can be used multiple times or as a string representation of a list.

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
exclude-queries:
  - "Access control"
  - "Best Practices"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
"exclude-queries": [
     "Access control",
     "Best Practices",
]
```

{{% /tab %}}
{{% tab "TOML" %}}

```
exclude-queries = [ "Access control", "Best Practices" ]
```

{{% /tab %}}
{{% tab "HCL" %}}

```
"exclude-queries" = ["Access control", "Best Practices"]
```

{{% /tab %}}
{{< /tabs >}}

## Configure exclusions with inline comments

To exclude specific findings, add a comment that starts with `# dd-iac-scan`, followed by a command and any required values. Inline exclusions apply only within the file where they are used.

### Supported commands

| **Command**                        | **Description**                 |
|------------------------------------|---------------------------------|
| `dd-iac-scan ignore`             | Ignores the entire file.        |
| `dd-iac-scan disable=<query_id>` | Ignores specific queries.       |
| `dd-iac-scan enable=<query_id>`  | Includes only specific queries. |
| `dd-iac-scan ignore-line`        | Ignores a single line.          |
| `dd-iac-scan ignore-block`       | Ignores a block of code.        |

#### `dd-iac-scan ignore`

Excludes the entire file from IaC scanning. This comment must be placed at the beginning of the file to take effect.

```
# dd-iac-scan ignore

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
```

#### `dd-iac-scan disable=<query_id>`

Limits scan results in this file to only the specified queries. This comment must be placed at the beginning of the file to take effect.

```
# dd-iac-scan enable=e592a0c5-5bdb-414c-9066-5dba7cdea370

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
```

Only findings from the specified queries are included in the scan results for this file.

#### `dd-iac-scan enable=<query_id>`

Excludes findings from the specified queries in this file. This comment must be placed at the beginning of the file to take effect.

```
# dd-iac-scan disable=e592a0c5-5bdb-414c-9066-5dba7cdea370,e69890e6-fce5-461d-98ad-cb98318dfc96

resource "aws_s3_bucket" "example" {
  bucket = "my-tf-test-bucket"
  ...
}
...
```

Findings from the specified queries are ignored for this file.

#### `dd-iac-scan ignore-line`

Prevents scan results from flagging the line immediately after this comment. This comment can be placed anywhere in the file.

```
1: resource "google_storage_bucket" "example" {
2:  # kics-scan ignore-line
3:  name          = "image-store.com"
4:  location      = "EU"
5:  force_destroy = true
6: }
```

Findings related to the next line (line 3 in this example) are ignored.

#### `dd-iac-scan ignore-block`

Prevents scan results from flagging an entire resource block and all its key-value pairs. This comment can be placed anywhere in the file.

```
1: # kics-scan ignore-block
2: resource "google_storage_bucket" "example" {
3:  name          = "image-store.com"
4:  location      = "EU"
5:  force_destroy = true
6: }
```

Findings related to the entire block (lines 2-6 in this example) are ignored.