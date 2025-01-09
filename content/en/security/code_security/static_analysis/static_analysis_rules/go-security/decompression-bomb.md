---
aliases:
- /continuous_integration/static_analysis/rules/go-security/decompression-bomb
- /static_analysis/rules/go-security/decompression-bomb
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/decompression-bomb
  language: Go
  severity: Warning
  severity_rank: 2
title: Prevent decompression bomb
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/decompression-bomb`

**Language:** Go

**Severity:** Warning

**Category:** Security

**CWE**: [409](https://cwe.mitre.org/data/definitions/409.html)

## Description
Reading continuously from a compressed file without any limit of bytes may read too much data and lead to a denial of service (DoS). Prefer reading data by chunks of bytes.

#### Learn More

 - [CWE-409: Improper Handling of Highly Compressed Data](https://cwe.mitre.org/data/definitions/409.html)
 - [Stackoverflow: Potential DoS by Decompression Bomb](https://stackoverflow.com/questions/67327323/g110-potential-dos-vulnerability-via-decompression-bomb-gosec)

## Non-Compliant Code Examples
```go
package main

import (
	"bytes"
	"compress/bzip2"
	"io"
	"os"
)

func main() {
	buff := []byte{42, 51}
	b := bytes.NewReader(buff)

	r, err := zlib.NewReader(b)
	if err != nil {
		panic(err)
	}
	_, err = io.CopyBuffer(os.Stdout, r)
	if err != nil {
		panic(err)
	}

	r.Close()
}
```

```go
package main

import (
	"bytes"
	"compress/zlib"
	"io"
	"os"
)

func main() {
	buff := []byte{42, 51}
	b := bytes.NewReader(buff)

	r, err := zlib.NewReader(b)
	if err != nil {
		panic(err)
	}
	_, err = io.Copy(os.Stdout, r)
	if err != nil {
		panic(err)
	}

	r.Close()
}
```

## Compliant Code Examples
```go
package main

import (
	"bytes"
	"compress/bzip2"
	"io"
	"os"
)

func main() {
	buff := []byte{42, 51}
	b := bytes.NewReader(buff)

	r, err := zlib.NewReader(b)
	if err != nil {
		panic(err)
	}
	_, err = io.CopyN(os.Stdout, r, 64)
	if err != nil {
		panic(err)
	}

	r.Close()
}
```
