---
title: Java Applications
kind: documentation
code_lang: java
type: multi-code-lang
code_lang_weight: 0
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-java'
      tag: 'GitHub'
      text: 'Java Datadog Library source code'
---

1. Install or update the Java Datadog Agent to at least version 0.94.0: 

   ```
   wget -O dd-java-agent.jar 'https://github.com/DataDog/dd-trace-java/releases/latest/download/dd-java-agent.jar'
   ```

2. Run your Java application with Application Security enabled. From the command line:
   ```
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.appsec.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
