---
title: Agent only
draft: true
---

## Overview

This page contains examples of the agent-only component.


## Examples

### Basic agent-only block

This paragraph is visible to all users.

{% agent-only %}
This content is only visible to AI agents. It should be hidden from human users.
{% /agent-only %}

### Agent-only block between visible content

Content before the agent-only block.

{% agent-only %}
These instructions are for AI agents only and should not be visible in the rendered page.
{% /agent-only %}

Content after the agent-only block.
