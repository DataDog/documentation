---
aliases:
- /continuous_integration/static_analysis/rules/go-security/command-injection
- /static_analysis/rules/go-security/command-injection
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/command-injection
  language: Go
  severity: Warning
  severity_rank: 2
title: Avoid command injection
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/command-injection`

**Language:** Go

**Severity:** Warning

**Category:** Security

**CWE**: [78](https://cwe.mitre.org/data/definitions/78.html)

## Description
In Go, the `exec.Command` function is used to run external commands. Using this function carelessly can lead to command injection vulnerabilities.

Command injection occurs when untrusted input is passed directly to a system shell, allowing an attacker to execute arbitrary commands. This can result in unauthorized access to the system, data leaks, or other security breaches.

To prevent command injection vulnerabilities when using `exec.Command` in Go, follow these coding best practices:

1.  **Sanitize User Input**: Always validate and sanitize user inputs before passing them to `exec.Command`. Avoid executing commands constructed using user-provided data.
2.  **Avoid using Shell Expansion**: If possible, pass the command and arguments as separate strings to `exec.Command`. This prevents the shell from interpreting special characters in a potentially malicious way.
3.  **Use Absolute Paths**: When specifying the command to be executed, use absolute paths for executables whenever possible. This reduces the risk of inadvertently running a similarly named malicious command from the system's PATH.
4.  **Avoid String Concatenation**: Refrain from dynamically constructing commands by concatenating strings. Instead, use the `arg ...string` parameter of `exec.Command` to pass arguments safely.
5.  **Limit Privileges**: Run commands with the least privilege required to carry out the task. Avoid running commands with elevated privileges unnecessarily.

By following these practices, you can reduce the risk of command injection vulnerabilities when using `exec.Command` in Go and enhance the security of your application.


## Non-Compliant Code Examples
```go
import (
	"context"
	"os"
	"os/exec"
)

func main() {
	directory := os.Args[1]
	ctx := context.Background()
	cmd := exec.CommandContext(ctx, "/bin/ls", directory)
	output, err := cmd.CombinedOutput()
}
```

```go
import (
	"os"
	"os/exec"
)

func main() {
	directory1 := os.Args[1]
	directory2 := os.Args[2]
	cmd := exec.Command("/bin/ls", directory1, directory2)
	output, err := cmd.CombinedOutput()
}
```

## Compliant Code Examples
```go
import (
    "os/exec"
)

func main () {
    res, err := exec.Command("/bin/ls", "something")
}
```

```go
import (
    "context"
    "os/exec"
)

func main () {
    ctx := context.Background()
    res, err := exec.CommandContext(ctx, "/bin/ls")
}
```
