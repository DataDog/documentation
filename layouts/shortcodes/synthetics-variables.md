## Variables

### Create local variables

To create a local variable, click **Create a Local Variable** at the top right hand corner. You can select one of the following available builtins to add to your variable string:

`numeric(n)`
: Generates a numeric string with `n` digits.

`alphabetic(n)`
: Generates an alphabetic string with `n` letters.

`alphanumeric(n)`
: Generates an alphanumeric string with `n` characters.

`uuid`
: Generates a version 4 universally unique identifier (UUID).

`date(n unit, format)`
: Generates a date in one of Datadog's accepted formats with a value corresponding to the UTC date the test is initiated at + or - `n` units.

`timestamp(n, unit)` 
: Generates a timestamp in one of Datadog's accepted units with a value corresponding to the UTC timestamp the test is initiated at +/- `n` units.

To obfuscate local variable values in test results, select **Hide and obfuscate variable value**. Once you have defined the variable string, click **Add Variable**.