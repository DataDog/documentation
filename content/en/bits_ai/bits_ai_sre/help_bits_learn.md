---
title: Help Bits learn
---

Reviewing Bits' findings helps Bits learn from any mistakes it makes, enabling it to produce faster and more accurate investigations in the future. 

At the end of an investigation, let Bits know whether the conclusion it made was correct.

{{< img src="bits_ai/help_bits_ai_learn_1.png" alt="An investigation conclusion with buttons to rate the conclusion helpful or unhelpful highlighted" style="width:100%;" >}}

If it was inaccurate, provide Bits with the correct root cause. Ensure your feedback: 
- Identifies the actual root cause (not just observed effects or symptoms) 
- Specifies relevant services, components, or metrics 
- Includes telemetry links that point to the root cause

Example of a high-quality root cause feedback: "High memory usage in auth-service pod due to memory leak in session cache, causing OOM kills every 2 hours starting at 2025-11-15 14:30 UTC. This is evidenced by `https://app.datadoghq.com/logs?<rest_of_link>`"

In addition, you can review steps that Bits took throughout the investigation and refine its behavior by selecting:
- **Improve This Step**: Share a link to a more effective query for Bits to use next time
- **Always Take This Step**: Tell Bits that this query was helpful and to run it again next time

{{< img src="bits_ai/bits_ai_sre_step_feedback.png" alt="A research step with options to provide feedback" style="width:100%;" >}}

### Manage memories

Every piece of feedback you give generates a **memory**. Bits uses these memories to enhance future investigations by recalling relevant patterns, queries, and corrections. You can navigate to the [Monitor Management][1] page to view and delete memories in the **Memories** column.

[1]: https://app.datadoghq.com/bits-ai/monitors/enabled