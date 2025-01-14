---
title: Code Block
customizations:
  - label: "Color"
    trait_id: color
    option_group_id: primary_color_options
---

## Usage

- Markdown tags are **not** supported in code blocks. Use only plaintext code within code blocks.
- The default language for code blocks is `text`.

## Simple example

```javascript
// Function to compute the product of p1 and p2
function myFunction(p1, p2) {
  return p1 * p2;
}
```

## Example with region-param

```bash
curl -L -X GET 'https://api.{% region-param key="dd_site" code="true" /%}/api/v2/security_monitoring/configuration/security_filters' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>'
```

## Indented code blocks

1. Item 1 includes some code:
    ```python
    # Function to compute the product of p1 and p2
    def myFunction(p1, p2):
        return p1 * p2
    ```
2. This is Item 2. It has no code.
3. This step has its own steps, and one of them has code:
    - Step 1: Step one would go here.
    - Step 2: Step two would go here.
    - Step 3: Step three would go here. It has some code:
        ```javascript
        // Function to compute the product of p1 and p2
        function myFunction(p1, p2) {
          return p1 * p2;
        }
        ```
    - Step 4: Step four would go here.