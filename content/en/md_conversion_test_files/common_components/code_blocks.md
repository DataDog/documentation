---
title: Code Blocks
---

## Scope

This covers the `code-block` and `highlight` shortcodes. Plain fences are already covered in the "plain markdown" examples.

## Expected .md output

Each code block is wrapped in a fence, with the language included when available:

```lang
Code contents here.
```

### Filenames

When a filename is present, it appears above the code block, like this:

In the `block.java` file:

```lang
Code contents here.
```

### Highlighted lines

When a highlight is present, it appears above the code block, like this:

See lines 2-3 below:

```lang
Code contents here.
```

## Example inputs

### Code block

{{< code-block lang="java" filename="block.java" disable_copy="true" collapsible="true" >}}
import com.datadoge.docs.SweetCodeBlock;
import com.datadoge.docs.TryItOut;
public class CodeBlocksForLife {
    ...
    }
{{< /code-block >}}

### Highlighted code block

{{< highlight yaml "hl_lines=6-8" >}}
    apiVersion: apps/v1
    kind: Deployment
    metadata:
    name: springfront
    labels:
        tags.datadoghq.com/env: "dev"
        tags.datadoghq.com/service: "springfront"
        tags.datadoghq.com/version: "12"
    {{< /highlight >}}