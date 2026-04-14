---
title: Security Controls
disable_toc: false
aliases:
- /security/application_security/code_security/iast
---


Security Controls prevent false positives reporting in vulnerability detection using escaping and sanitization functions. Security functions refine how data is processed, ensuring that legitimate transformations do not trigger unnecessary security alerts.

## Input validators vs. sanitizers

Security Controls differentiate between **Input Validators** and **Sanitizers**, depending on how a function is used in security validation:

- **Input Validators**: Used when the function validates the parameters passed to it. Validators ensure that user inputs comply with expected formats before they are processed.
- **Sanitizers**: Used when the function validates or modifies the return value before it is used further in the application. Sanitizers help clean data to ensure it does not contain potentially harmful content.

## Configuring security controls

The Security Controls definition must be placed in the configuration variable `DD_IAST_SECURITY_CONTROLS_CONFIGURATION`.
To configure a list of security controls, follow the format and field specifications below.
This format uses specific separators to structure each security control entry.

### Format

`<TYPE>:<SECURE_MARKS>:<CLASS/FILE>:<METHOD>:<PARAMETERS (Optional)>:<PARAMETERS TO VALIDATE (Optional)>`

### Field specifications
| **Field**                             | **Description**                                                                                                                                                                                         |
|---------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Type**                              | Defines the type of control. **Accepted values:** `INPUT_VALIDATOR` or `SANITIZER`.                                                                                                                     |
| **Secure Marks**                      | List of vulnerability types to apply. Possible values are defined in [Secure marks](#secure-marks). Optionally, use `*` to indicate applicability to all types.                                         |
| **Class/File**                        | Fully qualified class or file implementing the security control.                                                                                                                                        |
| **Method**                            | Name of the method implementing the security control.                                                                                                                                                   |
| **Parameters (Optional)**             | Fully qualified class parameters. Used to distinguish between overloaded methods. If omitted and overloading exists, the security control applies to all overloaded methods.                 |
| **Parameters to Validate (Optional)** | Zero-based list of parameter positions to validate. The first parameter is position **0**. This field applies **only** to `INPUT_VALIDATOR` types. Used when **not all parameters require validation**. |


### Separators
- `;` (semicolon): Separates each security control.
- `:` (colon): Separates each field within a security control.
- `,` (comma): Separates items within a field that accepts a list.

### Secure marks

The available secure marks correspond to the codes associated with each injection-related vulnerability. These codes and their availability for each language can be found in [supported vulnerabilities][1].

The injection-related vulnerabilities are:

* Code Injection
* Command Injection
* Email HTML Injection
* Header Injection
* LDAP Injection
* NoSQL Injection
* Path Traversal
* Reflection Injection
* Server-Side Request Forgery (SSRF)
* SQL Injection
* Trust Boundary Violation
* Untrusted Deserialization
* Unvalidated Redirect
* XPath Injection
* Cross-Site Scripting (XSS)

## Compatibility requirements

This feature is available starting from the following versions of each language's tracing library:

* **Java**: 1.45.0+
* **.NET**: 3.10.0+
* **Node.js**: 5.37.0+
* **Python**: 3.10.0+


## Examples

{{% collapse-content title="Java" level="h4" %}}

### Input validator

#### Method that validates all input parameters to avoid command injection vulnerabilities

##### Method
`bar.foo.CustomInputValidator#validate(String input1, String input2)`

##### Config
`INPUT_VALIDATOR:COMMAND_INJECTION:bar.foo.CustomInputValidator:validate`

#### Method that validates one input parameter to avoid command injection vulnerabilities

##### Method
 `bar.foo.CustomInputValidator#validate(String input1, String inputToValidate)`

##### Config
`INPUT_VALIDATOR:COMMAND_INJECTION:bar.foo.CustomInputValidator:validate:1`

#### Method that validates two input parameters to avoid command injection vulnerabilities

##### Method
 `bar.foo.CustomInputValidator#validate(String input1, String firstInputToValidate, String secondInputToValidate, Object anotherInput)`

##### Config
`INPUT_VALIDATOR:COMMAND_INJECTION:bar.foo.CustomInputValidator:validate:1,2
`
#### Method that validates the input parameter to avoid command injection and code injection vulnerabilities

##### Method
 `bar.foo.CustomInputValidator#validate(String input)`

##### Config
`INPUT_VALIDATOR:COMMAND_INJECTION,CODE_INJECTION:bar.foo.CustomInputValidator:validate
`
#### Method that validates the input parameter to avoid any vulnerabilities

##### Method
 `bar.foo.CustomInputValidator#validate(String input)`

##### Config
`INPUT_VALIDATOR:*:bar.foo.CustomInputValidator:validate
`
#### Overloaded method that validates the input parameter to avoid command injection vulnerabilities

##### Methods
 `bar.foo.CustomInputValidator#validate(String input)`

 `bar.foo.CustomInputValidator#validate(String input, String input2)`

##### Config
`INPUT_VALIDATOR:COMMAND_INJECTION:bar.foo.CustomInputValidator:validate:java.lang.String
`
##### Note
Applies for the first method.


#### Overloaded methods that validate the input parameter to avoid command injection vulnerabilities

##### Methods
 `bar.foo.CustomInputValidator#validate(String input)`

 `bar.foo.CustomInputValidator#validate(String input, String input2)`

##### Config
`INPUT_VALIDATOR:COMMAND_INJECTION:bar.foo.CustomInputValidator:validate
`
##### Note
Applies for both methods.

### Sanitizer

#### Sanitizer to avoid command injection vulnerabilities

##### Method
 `bar.foo.CustomSanitizer#sanitize(String input)`

##### Config
`SANITIZER:COMMAND_INJECTION:bar.foo.CustomSanitizer:sanitize
`
#### Sanitizer to avoid command injection and code injection vulnerabilities

##### Method
 `bar.foo.CustomSanitizer#sanitize(String input)`

##### Config
`SANITIZER:COMMAND_INJECTION,CODE_INJECTION:bar.foo.CustomSanitizer:sanitize
`
#### Sanitizer to avoid any vulnerabilities

##### Method
 `bar.foo.CustomSanitizer#sanitize(String input)`

##### Config
`SANITIZER:*:bar.foo.CustomSanitizer:sanitize
`
#### Overloaded sanitizer to avoid command injection vulnerabilities

##### Methods
 `bar.foo.CustomSanitizer#sanitize(String input)`

 `bar.foo.CustomSanitizer#sanitize(String input, String input2)`

##### Config
`SANITIZER:COMMAND_INJECTION:bar.foo.CustomSanitizer:sanitize:java.lang.String
`
##### Note
applies for the first method

#### Overloaded sanitizers to avoid command injection vulnerabilities

##### Methods
` bar.foo.CustomSanitizer#sanitize(String input)`

`bar.foo.CustomSanitizer#sanitize(String input, String input2)`

##### Config
`SANITIZER:COMMAND_INJECTION:bar.foo.CustomSanitizer:sanitize
`
##### Note
applies for both methods

{{% /collapse-content %}}


{{% collapse-content title="Node.js" level="h4" %}}

### Input validator

#### Method that validates all input parameters to avoid command injection vulnerabilities

##### Method
`bar/foo/custom_input_validator.js#validate(input1, input2)`

##### Config
`INPUT_VALIDATOR:COMMAND_INJECTION:bar/foo/custom_input_validator.js:validate`

#### Method that validates one input parameter to avoid command injection vulnerabilities

##### Method
`bar/foo/custom_input_validator.js#validate(input1, inputToValidate)`

##### Config
`INPUT_VALIDATOR:COMMAND_INJECTION:bar/foo/custom_input_validator.js:validate:1`

#### Method that validates two input parameters to avoid command injection vulnerabilities

##### Method
`bar/foo/custom_input_validator.js#validate(input1, firstInputToValidate, secondInputToValidate, anotherInput)`

##### Config
`INPUT_VALIDATOR:COMMAND_INJECTION:bar/foo/custom_input_validator.js:validate:1,2`

#### Method that validates the input parameter to avoid command injection and code injection vulnerabilities

##### Method
`bar/foo/custom_input_validator.js#validate(input)`

##### Config
`INPUT_VALIDATOR:COMMAND_INJECTION,CODE_INJECTION:bar/foo/custom_input_validator.js:validate`

#### Method that validates the input parameter to avoid any vulnerabilities

##### Method
`bar/foo/custom_input_validator.js#validate(input)`

##### Config
`INPUT_VALIDATOR:*:bar/foo/custom_input_validator.js:validate`

### Sanitizer

#### Sanitizer to avoid command injection vulnerabilities

##### Method
`bar/foo/custom_input_sanitizer.js#sanitize(input)`

##### Config
`SANITIZER:COMMAND_INJECTION:bar/foo/custom_input_sanitizer.js:sanitize`

#### Sanitizer to avoid command injection and code injection vulnerabilities

##### Method
`bar/foo/custom_input_sanitizer.js#sanitize(input)`

##### Config
`SANITIZER:COMMAND_INJECTION,CODE_INJECTION:bar/foo/custom_input_sanitizer.js:sanitize`

#### Sanitizer to avoid any vulnerabilities

##### Method
`bar/foo/custom_input_sanitizer.js#sanitize(input)`

##### Config
`SANITIZER:*:bar/foo/custom_input_sanitizer.js:sanitize`

### Special cases

#### Security control method inside an exported object
Method `validate`, which is exported inside an object `validators`, that validates the input parameter to avoid command injection vulnerabilities.

```javascript
// bar/foo/custom_input_validator.js
module.exports = {
  validators: {
    validate: (input) => {
      /* validation process */
    }
  }
}
```

#### Config
`INPUT_VALIDATOR:COMMAND_INJECTION:bar/foo/custom_input_validator.js:validators.validate`

#### Security control method from a transitive dependency
Because of `npm`'s flat dependency structure, it is not possible to differentiate between a direct dependency and a transitive dependency. This means if a security control is defined inside a dependency, all instances of that dependency (direct or transitive), are affected.

The following security control definition affects every `sql-sanitizer` package found in the dependency tree.

#### Config
`SANITIZER:SQL_INJECTION:node_modules/sql-sanitizer/index.js:sanitize`


{{% /collapse-content %}}

{{% collapse-content title=".NET" level="h4" %}}

### General syntax
`TYPE:SECURE_MARKS:Assembly:Class:Method(ParameterTypes)[:ParameterIndexes]`

<div class="alert alert-info">
Parameter types must be fully qualified with their namespace. Example: <code>System.String</code><br /><br />
Parameter indexes are comma-separated. If no parameter index is provided, the value of the first parameter defaults to 0.
</div>

### Input validator

#### Method that validates all input parameters to avoid command injection vulnerabilities

##### Method
`[FooAssembly]CustomInputValidatorClass::ValidateMethod(string input1, string input2)`

##### Config
`INPUT_VALIDATOR:COMMAND_INJECTION:FooAssembly:CustomInputValidatorClass:ValidateMethod(System.String,System.String):0,1`

#### Method that validates one input parameter to avoid command injection vulnerabilities

##### Method
 `[FooAssembly]CustomInputValidatorClass::ValidateMethod(string input1, string inputToValidate)`

##### Config
 `INPUT_VALIDATOR:COMMAND_INJECTION:FooAssembly:CustomInputValidatorClass:ValidateMethod(System.String,System.String):1`

#### Method that validates two input parameters to avoid command injection vulnerabilities

##### Method
 `[FooAssembly]CustomInputValidatorClass::ValidateMethod(string input1, string firstInputToValidate, string secondInputToValidate, object anotherInput)`

##### Config
 `INPUT_VALIDATOR:COMMAND_INJECTION:FooAssembly:CustomInputValidatorClass:ValidateMethod(System.String,System.String,System.String,System.Object):1,2`

#### Method that validates the input parameter to avoid command injection and code injection vulnerabilities

##### Method
 `[FooAssembly]CustomInputValidatorClass::ValidateMethod(string input)`

##### Config
 `INPUT_VALIDATOR:COMMAND_INJECTION,CODE_INJECTION:FooAssembly:CustomInputValidatorClass:ValidateMethod(System.String)`

### Sanitizer

#### Sanitizer to avoid command injection vulnerabilities

##### Method
 `[FooAssembly]CustomInputValidatorClass::SanitizerMethod(string input)`

##### Config
 `SANITIZER:COMMAND_INJECTION:FooAssembly:CustomInputValidatorClass:SanitizerMethod(System.String)`

{{% /collapse-content %}}

{{% collapse-content title="Python" level="h4" %}}

### Input validator

#### Method that validates all input parameters to avoid command injection vulnerabilities

##### Method
`python_project.security.validators.validate(input1, input2)`

##### Config
`INPUT_VALIDATOR:COMMAND_INJECTION:python_project.security.validators:validate`

#### Method that validates one input parameter to avoid command injection vulnerabilities

##### Method
`python_project.security.validators.validate(input1, input_to_validate)`

##### Config
`INPUT_VALIDATOR:COMMAND_INJECTION:python_project.security.validators:validate:1`

#### Method that validates two input parameters to avoid command injection vulnerabilities

##### Method
`python_project.security.validators.validate(input1, first_input_to_validate, second_input_to_validate, another_input)`

##### Config
`INPUT_VALIDATOR:COMMAND_INJECTION:python_project.security.validators:validate:1,2`

#### Method that validates the input parameter to avoid command injection and code injection vulnerabilities

##### Method
`python_project.security.validators.validate(input)`

##### Config
`INPUT_VALIDATOR:COMMAND_INJECTION,CODE_INJECTION:python_project.security.validators:validate`

#### Method that validates the input parameter to avoid any vulnerabilities

##### Method
`python_project.security.validators.validate(input)`

##### Config
`INPUT_VALIDATOR:*:python_project.security.validators:validate`

### Sanitizer

#### Sanitizer to avoid command injection vulnerabilities

##### Method
`python_project.sql_sanitizer.SQLSanitizer.sanitize(input)`

##### Config
`SANITIZER:COMMAND_INJECTION:python_project.sql_sanitizer:SQLSanitizer.sanitize`

#### Sanitizer to avoid command injection and code injection vulnerabilities

##### Method
`python_project.security.sanitizers.DataSanitizer.sanitize(input)`

##### Config
`SANITIZER:COMMAND_INJECTION,CODE_INJECTION:python_project.security.sanitizers:DataSanitizer.sanitize`

#### Sanitizer to avoid any vulnerabilities

##### Method
`python_project.security.sanitizers.UniversalSanitizer.sanitize(input)`

##### Config
`SANITIZER:*:python_project.security.sanitizers:UniversalSanitizer.sanitize`

### Special cases

#### Function-level security control
Function `validate_user_input` that validates the input parameter to avoid command injection vulnerabilities.

```python
# python_project/utils/validators.py
def validate_user_input(input_data):
    """Validation process"""
    pass
```

##### Config
`INPUT_VALIDATOR:COMMAND_INJECTION:python_project.utils.validators:validate_user_input`

#### Security control method from a third-party package
The following security control definition affects the `sanitize_sql` method from the `secure_db` package.

##### Config
`SANITIZER:SQL_INJECTION:secure_db.sanitizers:SQLSanitizer.sanitize_sql`

{{% /collapse-content %}}

[1]: /security/code_security/iast/#overview
