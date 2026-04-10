---
title: Static Code Analysis (SAST) Custom Rules
description: Write Static Analysis Custom Rules to check the security and quality of your code.
is_beta: false
algolia:
  tags: ['static analysis', 'datadog static analysis', 'code quality', 'SAST', 'custom rule']
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    Code Security is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}




[Datadog Static Code Analysis][1] lets you define static analysis rules as custom rules. You can share these custom rules within your organization.

## Rule organization

SAST rules are organized within rulesets. A ruleset is a collection of rules. There are no constraints
on how rules are organized within a ruleset. For example, some users might want to have rulesets for a specific language and others for a category.

A ruleset must have a unique name with only letters, numbers, and hyphens (`-`). Examples of valid
ruleset names are `python-security`, `cobra-team-checks`, or `my-company-security-checks`.

## Manage rules with the template repository

As an alternative to managing custom rules in Datadog, the [datadog-custom-rules-template][5] GitHub repository provides a Git-based workflow for managing custom rules as code. On every push to `main`, a GitHub Action automatically creates, updates, or deletes rulesets and rules to match what's on disk.

### Get started

1. Click **Use this template** on the [datadog-custom-rules-template][5] repository to create your own copy.
2. Add your Datadog credentials as GitHub secrets. See [Authentication](#authentication).
3. Rename `rulesets/my-custom-rules/` or add new ruleset directories under `rulesets/`.
4. Push to `main`. The GitHub Action uploads your rules automatically.

### Authentication

1. In your GitHub repository, go to **Settings → Secrets and variables → Actions**.
2. Add three secrets:
   - `DD_API_KEY` — your Datadog API key
   - `DD_APP_KEY` — your Datadog Application key
   - `DD_SITE` — your Datadog site hostname (for example, `datadoghq.com`, `datadoghq.eu`, or `us3.datadoghq.com`)

### How sync works

On every push to `main`, the GitHub Action runs `upload.py`, which:
- **Creates** rulesets and rules that are new on disk
- **Updates** rulesets and rules whose content has changed
- **Deletes** rulesets and rules that have been removed from disk

Only changed rules trigger API calls—unchanged rules are skipped.

To trigger a sync without pushing a commit, go to the **Actions** tab and click **Upload Custom Rules → Run workflow**.

### Rule file format

Each ruleset directory contains a `ruleset.yaml` and a separate `.yaml` file for each rule.

**`ruleset.yaml`**

```yaml
name: my-org-custom-rules
short_description: One-line summary
description: Longer description of what this ruleset covers.
```

**Rule file**

```yaml
name: your-rule-name
short_description: One-line summary
description: Detailed description.
category: BEST_PRACTICES     # SECURITY | BEST_PRACTICES | CODE_STYLE | ERROR_PRONE | PERFORMANCE
severity: ERROR              # ERROR | WARNING | NOTICE | INFO
language: JAVASCRIPT
tree_sitter_query: <TREE_SITTER_QUERY>    # See Anatomy of a custom rule
code: |-                                  # See Anatomy of a custom rule
  function visit(node, filename, code) { <RULE_LOGIC> }
tests: []
is_published: false          # Set to true when the rule is ready for scans
```

## Anatomy of a custom rule

A custom rule is composed of three main components:
 - A **tree-sitter query** that captures what AST elements to check.
 - **JavaScript code** that process the AST elements reports violations.
 - **Test code** to test the rule.

### Tree-sitter query

Custom rules use [tree-sitter queries][3] to query the code abstract syntax tree (AST) and retrieve elements to analyze. Elements of the AST are captured by the query using the `@` operator.

All captured nodes from the tree-sitter query are injected in the JavaScript code and further processed to
produce violations.

### JavaScript code

The JavaScript code is defined in a `visit` function. This function is triggered at each match of the tree-sitter query.
If a tree-sitter query captures a function call and the analyzed code contains 10 function calls, the `visit` function is called 10 times and each invocation has the capture of each occurrence.

The `visit` function has the signature `visit(node, path, code)`:
 - `node` is the tree-sitter context being matched.
 - `path` is the path under analysis (convenient for filtering violation on path or filename).
 - `code` is the code under analysis.

To get a captured node, use the `captures` attribute of the first argument of the `visit` function. For example, the code below retrieves the `functionName` from a tree-sitter query. Each element contains the following attributes:

 - `cstType`: the tree-sitter type of the node.
 - `start`: start position of the node. The position contains `line` and `col` attributes.
 - `end`: end position of the node. The position contains `line` and `col` attributes.
 - `text`: the content of the node.

<div class="alert alert-danger"><code>line</code> and <code>col</code> attributes start at 1. Any result with <code>line</code> or <code>col</code> set to 0 is ignored.</div>

```javascript
function visit(node, filename, code) {
  const functionNameNode = node.captures["functionName"];
  console.log("cst type");
  console.log(functionNameNode.cstType);
  console.log("start line");
  console.log(functionNameNode.start.line);
}
```

The analyzer includes a few helper functions to help you write rules:
 - `buildError(startLine, startCol, endLine, endCol, message, severity, category)` builds an error.
   - `severity` is one of the following: `ERROR`, `WARNING`, `NOTICE` and `INFO`.
   - `category` is one of the following: `BEST_PRACTICES`, `CODE_STYLE`, `ERROR_PRONE`, `PERFORMANCE` and `SECURITY`.
 - `addError(error)` reports an error.
 - `ddsa.getParent(node)` returns the given node's parent, or `undefined` if the node is the root node.
 - `ddsa.getChildren(node)` returns an array of the given node's children, or an empty array if the node is a leaf node.

### Rule examples

All Datadog default rules are available in [Code Security][4]. You can easily analyze and copy them to create your own custom rules.


[1]: https://app.datadoghq.com/ci/code-analysis
[2]: https://tree-sitter.github.io/
[3]: https://tree-sitter.github.io/tree-sitter/using-parsers/queries/index.html
[4]: https://app.datadoghq.com/ci/code-analysis/static-analysis/default-rulesets
[5]: https://github.com/DataDog/datadog-custom-rules-template
