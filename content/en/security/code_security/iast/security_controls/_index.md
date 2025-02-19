---
title: Security Controls
disable_toc: false
aliases:
- /security/application_security/code_security/iast
---

## Overview

Security Controls is a feature that allows users to configure escaping and sanitization functions to prevent the reporting of false positives in vulnerability detection. By defining these security functions, users can fine-tune how data is processed, ensuring that legitimate transformations do not trigger unnecessary security alerts.

## Understanding Input Validators vs. Sanitizers

Security Controls differentiate between **Input Validators** and **Sanitizers**, depending on how a function is used in security validation:

**Input Validators** → Used when the function validates the parameters passed to it. These ensure that user inputs comply with expected formats before they are processed.

**Sanitizers** → Used when the function validates or modifies the return value before it is used further in the application. These help clean data to ensure it does not contain potentially harmful content.

## Configuring Security Controls

The definition of **Security Controls** shall be placed in the configuration variable **`DD_IAST_SECURITY_CONTROLS_CONFIGURATION`**.
To configure a list of security controls, follow the format and field specifications below.
This format uses specific separators to structure each security control entry.

## Field Specifications
- **Security Control Type** → Defines the type of control.
  - **Accepted values:** `INPUT_VALIDATOR` or `SANITIZER`.
- **Secure Marks** → List of vulnerability types to apply.
  - Possible values are defined in **vulnerability_schema**.
  - Optionally, use `*` to indicate applicability to all types.
- **Class/File** → Fully qualified class or file implementing the security control.
- **Method** → Name of the method implementing the security control.
- **Parameters (Optional)** → Fully qualified class parameters.
  - Used to **distinguish between overloaded methods**.
  - If omitted and overloading exists, the security control will apply to **all overloaded methods**.
- **Parameters to Validate (Optional)** → Zero-based list of parameter positions to validate.
  - The first parameter is position **0**.
  - This field applies **only** to `INPUT_VALIDATOR` types.
  - Used when **not all parameters require validation**.

## Separators
- **`;` (Semicolon)** → Separates each security control.
- **`:` (Colon)** → Separates each field within a security control.
- **`,` (Comma)** → Separates items within a field that accepts a list.

## Examples

{{% collapse-content title="Java" level="h4" %}}

### Input validator

#### Method that validates all input parameters to avoid command injection vulnerabilities

Method: `bar.foo.CustomInputValidator#validate(String input1, String input2)`

Config: INPUT_VALIDATOR:COMMAND_INJECTION:bar.foo.CustomInputValidator:validate

#### Method that validates one input parameter to avoid command injection vulnerabilities

Method: `bar.foo.CustomInputValidator#validate(String input1, String inputToValidate)`

Config: INPUT_VALIDATOR:COMMAND_INJECTION:bar.foo.CustomInputValidator:validate:1

#### Method that validates two input parameters to avoid command injection vulnerabilities

Method: `bar.foo.CustomInputValidator#validate(String input1, String firstInputToValidate, String secondInputToValidate, Object anotherInput)`

Config: INPUT_VALIDATOR:COMMAND_INJECTION:bar.foo.CustomInputValidator:validate:1,2

#### Method that validates the input parameter to avoid command injection and code injection vulnerabilities

Method: `bar.foo.CustomInputValidator#validate(String input)`

Config: INPUT_VALIDATOR:COMMAND_INJECTION,CODE_INJECTION:bar.foo.CustomInputValidator:validate

#### Method that validates the input parameter to avoid any vulnerabilities

Method: `bar.foo.CustomInputValidator#validate(String input)`

Config: INPUT_VALIDATOR:*:bar.foo.CustomInputValidator:validate

#### Overloaded method that validates the input parameter to avoid command injection vulnerabilities

Method: `bar.foo.CustomInputValidator#validate(String input)`

Method: `bar.foo.CustomInputValidator#validate(String input, String input2)`

Config: INPUT_VALIDATOR:COMMAND_INJECTION:bar.foo.CustomInputValidator:validate:java.lang.String

NOTE: Applies for the first method.


#### Overloaded methods that validate the input parameter to avoid command injection vulnerabilities

Method: `bar.foo.CustomInputValidator#validate(String input)`

Method: `bar.foo.CustomInputValidator#validate(String input, String input2)`

Config: INPUT_VALIDATOR:COMMAND_INJECTION:bar.foo.CustomInputValidator:validate

NOTE: Applies for both methods.

### Sanitizer

#### Sanitizer to avoid command injection vulnerabilities

Method: `bar.foo.CustomSanitizer#sanitize(String input)`

Config: SANITIZER:COMMAND_INJECTION:bar.foo.CustomSanitizer:sanitize

#### Sanitizer to avoid command injection  and code injection vulnerabilities

Method: `bar.foo.CustomSanitizer#sanitize(String input)`

Config: SANITIZER:COMMAND_INJECTION,CODE_INJECTION:bar.foo.CustomSanitizer:sanitize

#### Sanitizer to avoid any vulnerabilities

Method: `bar.foo.CustomSanitizer#sanitize(String input)`

Config: SANITIZER:*:bar.foo.CustomSanitizer:sanitize

#### Overloaded sanitizer to avoid command injection vulnerabilities

Method: `bar.foo.CustomSanitizer#sanitize(String input)`

Method: `bar.foo.CustomSanitizer#sanitize(String input, String input2)`

Config: SANITIZER:COMMAND_INJECTION:bar.foo.CustomSanitizer:sanitize:java.lang.String

NOTE: applies for the first method

#### Overloaded sanitizers to avoid command injection vulnerabilities

Method: `bar.foo.CustomSanitizer#sanitize(String input)`

Method: `bar.foo.CustomSanitizer#sanitize(String input, String input2)`

Config: SANITIZER:COMMAND_INJECTION:bar.foo.CustomSanitizer:sanitize

NOTE: applies for both methods

{{% /collapse-content %}}

