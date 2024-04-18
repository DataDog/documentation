---
title: Remapper
kind: Documentation

---

## Overview 

The remapper processor remaps any source attribute(s) or tags to another target attribute or tag. For example, remap `user` by `firstname` to target your logs in the Events Explorer:

{{< img src="logs/processing/processors/attribute_post_remapping.png" alt="Attribute after remapping" style="width:60%;">}}

Additional constraints, such as `:` or `,`, are not allowed in the target tag/attribute name.

If the target of the remapper is an attribute, the remapper can also try to cast the value to a new type (`String`, `Integer` or `Double`). If the cast is not possible, the original type is kept.

**Note**: The decimal separator for `Double` need to be `.`.


Define the remapper processor on the [**Pipelines** page][1]. For example, remap `user` to `user.firstname`.

{{< img src="logs/log_configuration/processor/remapper.png" alt="Attribute remapper processor" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
