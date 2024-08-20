---
title: Git Hooks
description: Prevent the merging of code with errors
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

## Overview

A [Git hook](https://git-scm.com/docs/githooks) is a program executed before a user commits code to a repository
or pushes code to a remote location. A Git hook is generally used to run verifications
and enforce requirements on the code before it is pushed to the remote branch.

Datadog Code Analysis provides a Git hook to check for static analysis
violations or secrets before code is pushed or committed. The Datadog Code Analysis Git hook
checks the code from the latest commit and the default branch and surfaces
any errors it detects.

The Datadog Git hook warns developers before they push any code
containing coding errors, vulnerabilities, or secrets. When you commit code with an
error, a prompt like the following appears in the user terminal:

{{< img src="code_analysis/git_hooks/git_hook.png" alt="Datadog Git Hook detecting vulnerabilities" style="width:100%;">}}

## Setup

1. Download the `datadog-git-hook` program from the release page or the [Datadog Static Analyzer
releases](https://github.com/DataDog/datadog-static-analyzer/releases).
2. Install the program on your computer.
3. Add a `.git/hooks/pre-push` file in the repository with the script below. **Note:** The script assumes the `datadog-static-analyzer-git-hook` binary is in `/usr/local/bin/datadog-static-analyzer-git-hook`.

```bash
#!/bin/sh

# Get the repo root path
repo_path=$(git rev-parse --show-toplevel)

# Make sure the user can provide some input
exec < /dev/tty

/usr/local/bin/datadog-static-analyzer-git-hook -r $repo_path --static-analysis --secrets --confirmation --default-branch <default-branch>

if [ $? -eq 0 ]; then
    echo "datadog-static-analyzer check passed"
    exit 0
else
    echo "datadog-static-analyzer check failed"
    exit 1
fi
```

The program accepts the following parameters:

 - `--confirmation`: Ask the user for confirmation to override the Git hook check
 - `--default-branch`: Specify the name of the default branch.
 - `--static-analysis`: Enable static analysis.
 - `--secrets`: Enable secrets detection (private beta).
 - `--output <file>`: Export the findings found in the commit into a SARIF file.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

