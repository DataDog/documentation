### Create local variables

To create a local variable, click **+ All steps > Variables**. You can select one of the following available builtins to add to your variable string:

&#x7b;&#x7b; numeric(n) &#x7d;&#x7d;
: Generates a numeric string with `n` digits.

&#x7b;&#x7b; alphabetic(n) &#x7d;&#x7d;
: Generates an alphabetic string with `n` letters.

&#x7b;&#x7b; alphanumeric(n) &#x7d;&#x7d;
: Generates an alphanumeric string with `n` characters.

&#x7b;&#x7b; date(n unit, format) &#x7d;&#x7d;
: Generates a date in one of Datadog's accepted formats with a value corresponding to the UTC date the test is initiated at + or - `n` units.

&#x7b;&#x7b; timestamp(n, unit) &#x7d;&#x7d;
: Generates a timestamp in one of Datadog's accepted units with a value corresponding to the UTC timestamp the test is initiated at +/- `n` units.

&#x7b;&#x7b; uuid &#x7d;&#x7d;
: Generates a version 4 universally unique identifier (UUID).

&#x7b;&#x7b; public-id &#x7d;&#x7d;
: Injects the Public ID of your test.

&#x7b;&#x7b; result-id &#x7d;&#x7d;
: Injects the Result ID of your test run.

To obfuscate local variable values in test results, select **Hide and obfuscate variable value**. Once you have defined the variable string, click **Add Variable**.