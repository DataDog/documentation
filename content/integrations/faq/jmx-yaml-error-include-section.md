---
title: jmx.yaml error, Include Section
kind: faq
customnav: integrationsnav
---

You may encounter the following error message when configuring your `jmx.yaml` file:
```
initialize check class [ERROR]: "Each configuration must have an 'include' section. See http://docs.datadoghq.com/integrations/java/ for more information"
```

In this case, the error is thrown because of incorrect indentation in the yaml file. For example, in the screenshot below you can see that there is no indentation of 'domain' after the 'include'. This will throw the error.

{{< img src="integrations/faq/incorrect_jmx_include.png" alt="incorrect_jmx_include" responsive="true" >}}

If you were to place the above code into the [Online YAML Parser](http://yaml-online-parser.appspot.com/) , you would get a JSON object in the right hand window in which you can see that the value of "include" comes out as null.

In order to correct this, simply indent the lines below 'include' two spaces to the right as depicted below. This will ensure that 'include' is not registered as null.
{{< img src="integrations/faq/correct_jmx_include.png" alt="correct_jmx_include" responsive="true" >}}