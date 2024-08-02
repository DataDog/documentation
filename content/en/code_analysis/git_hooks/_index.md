---
title: Code Analysis Git Hooks
description: Prevent code merge of errors
further_reading:
- link: "/code_analysis/"
  tag: "Documentation"
  text: "Learn about Code Analysis"
- link: "/code_analysis/static_analysis/"
  tag: "Documentation"
  text: "Learn about Static Analysis"
- link: "/code_analysis/software_composition_analysis/"
  tag: "Documentation"
  text: "Learn about Software Composition Analysis"
---

## What is a Git hook

A [Git Hook](https://git-scm.com/docs/githooks) is a program executed before a user commits code on a repository
or push code to a remote location. A Git hook is generally used to run verifications
and ensure the code enforces some requirements before it's being pushed.

## How Datadog Git Hooks work?

Datadog Code Analysis provides a Git Hook to check for static analysis
violations or secrets before code is pushed or committed. The Datadog Code Analysis Git Hook
checks the code of the latest commit and the default branch and surfaces
any errors it detects.

With the Datadog Git Hook, developers are being warned before pushing any code
containing coding errors, vulnerabilities or secrets. When committing code with
error, a prompt like the following appears in the user terminal.

{{< img src="code_analysis/git_hooks/git_hook.png" alt="Datadog Git Hook detecting vulnerabilities" style="width:100%;">}}

## How to use the Datadog Git Hook

Download the `datadog-git-hook` from the release page or the [Datadog Static Analyzer
releases](https://github.com/DataDog/datadog-static-analyzer/releases) and install
the program on your computer.

Add a `.git/hooks/pre-push` file in the repository with the script below (it
assumes the `datadog-static-analyzer-git-hook` binary is in `/usr/local/bin/datadog-static-analyzer-git-hook`).

```shell
#!/bin/sh

# Get the repo root path
repo_path=$(git rev-parse --show-toplevel)

# Make sure the user can provide some input
exec < /dev/tty

/usr/local/bin/datadog-static-analyzer-git-hook -r $repo_path --secrets --confirmation --default-branch <default-branch>

if [ $? -eq 0 ]; then
    echo "datadog-static-analyzer check passed"
    exit 0
else
    echo "datadog-static-analyzer check failed"
    exit 1
fi
```

Note that the program accepts the following parameters:

 - `--confirmation`: ask the user for confirmation to override the Git Hook check
 - `--default-branch`: specify the name of the default branch
 - `--secrets`: enable secrets detection (in private beta)
 - `--output <file>`: export the findings found in the commit into a SARIF file

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

