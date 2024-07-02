---
title: String Builder Processor
kind: Documentation

---

Use the string builder processor to add a new attribute (without spaces or special characters) to an event with the result of the provided template. This enables aggregation of different attributes or raw strings into a single attribute.

The template is defined by both raw text and blocks with the syntax `%{attribute_path}`.

**Notes**:

* This processor only accepts attributes with values or an array of values in the block (see examples in the UI section below.
* If an attribute cannot be used (object or array of object), it is replaced by an empty string or the entire operation is skipped depending on your selection.
* If a target attribute already exists, it is overwritten by the result of the template.
* Results of a template cannot exceed 256 characters.

**Example String Builder**

{{< img src="logs/log_configuration/processor/stringbuilder_processor.png" alt="String builder processor" style="width:80%;">}}