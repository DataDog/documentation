---
title: jmx.yaml error, Include Section

---

You may encounter the following error message when configuring your `jmx.yaml` file:

```text
initialize check class [ERROR]: "Each configuration must have an 'include' section. See https://docs.datadoghq.com/integrations/java/ for more information"
```

In this case, the error is thrown because of incorrect indentation in the yaml file. For example, in the screenshot below you can see that there is no indentation of 'domain' after the 'include'. This throws the error.

{{< img src="integrations/faq/incorrect_jmx_include.png" alt="incorrect_jmx_include" >}}

If you were to place the above code into the [Online YAML Parser][1] , you would get a JSON object in the right hand window in which you can see that the value of "include" comes out as null.

In order to correct this, indent the lines below 'include' two spaces to the right as depicted below. This ensures that 'include' is not registered as null.
{{< img src="integrations/faq/correct_jmx_include.png" alt="correct_jmx_include" >}}

[1]: http://yaml-online-parser.appspot.com
