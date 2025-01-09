---
aliases:
- /continuous_integration/static_analysis/rules/go-security/tempfile-creation
- /static_analysis/rules/go-security/tempfile-creation
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/tempfile-creation
  language: Go
  severity: Warning
  severity_rank: 2
title: Avoid hardcoded temporary file
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/tempfile-creation`

**Language:** Go

**Severity:** Warning

**Category:** Security

**CWE**: [379](https://cwe.mitre.org/data/definitions/379.html)

## Description
Hardcoding a temporary file in your application can lead to several issues:

- **Security Vulnerability**: If the location and name of the temp file are known and predictable, it can be a target for malicious attacks. An attacker could replace or alter the original file with a similar named file containing malicious code.
- **Portability Issues**: Hardcoding paths or file names may not work in different environments if the file paths vary. This makes the application less portable and increases maintenance cost as the code might need to be repeatedly modified for different systems.
- **Concurrency Problems**: If your program is meant to run concurrently, you might run into an issue where multiple instances are trying to write or read from the same hardcoded file, potentially leading to data corruption.

- **Scalability**: It limits the application's scalability. If the program is handling larger amounts of data, these hardcoded temporary files might not be efficient or reliable.
- **Cleanup Issue**: Temporary files should ideally be cleaned when they are no longer needed. With hardcoded temp files, you might run into a situation where you forget to delete these files leading to unnecessary disk space consumption.
- **Testing Troubles**: Hardcoded values in a program make testing more difficult, as you cannot easily change them to isolate components or techniques.

The practice of creating temporary files in a more flexible and secure manner is highly recommended. This can be achieved by using temporary file APIs provided by various programming languages that ensures uniqueness, automatic cleanup, and security.


### Learn More

 - [CWE-379: Creation of Temporary File in Directory with Insecure Permissions](https://cwe.mitre.org/data/definitions/379.html)

## Non-Compliant Code Examples
```go
package static_analyzer

import (
	"fmt"
	"io/ioutil"
	"os"
	"path"
	"path/filepath"
)

func main() {
	err := ioutil.WriteFile("/tmp/myfile", []byte("something"), 0644)
	if err != nil {
		fmt.Println("Error while writing!")
	}
}
```

```go
package static_analyzer

import (
	"os"
)

func main() {
	file, err := os.Create("/tmp/tempfile")
}
```

## Compliant Code Examples
```go
package static_analyzer

import (

	"os"

)

func main() {
	tmpFile, err := ioutil.TempFile("/tmp", "foobar")
	if err != nil {
		log.Fatal(err)
	}
	defer os.Remove(file.Name())

}
```
