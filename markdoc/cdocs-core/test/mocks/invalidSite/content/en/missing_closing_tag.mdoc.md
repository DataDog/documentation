---
title: Missing Closing Tag
---

This is a test file with a missing closing tag on the if block.

{% if $notActuallyDefined %}
Do something here!
<!-- malformed closing tag -->
{% if %}