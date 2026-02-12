---
title: JMXFetch FIPS-140 mode
---

JMXFetch supports FIPS-140 compliant JVM configurations. It uses the default JSSE provider of the Java runtime environment for all encrypted communications, including:

- TLS communication with Datadog Agent
- SSL connections to JMX endpoints (when configured)

## Requirements

{{< tabs >}}

{{% tab "Host" %}}

- JVM configured to run in FIPS mode.
- [Datadog FIPS Agent](/agent/configuration/fips-compliance) installed on the host.
- Appropriate TLS/SSL certificates if encrypted JMX connection is required.

**Note**: The Datadog Agent host installation does not include Java runtime. You must install and configure Java in FIPS-approved mode separately.

{{% /tab %}}

{{% tab "Containers" %}}

- [Datadog FIPS Agent](/agent/configuration/fips-compliance) Docker image with JMX support.
- Appropriate TLS/SSL certificates if encrypted JMX connection is required. (Private keys must be generated
   with the `keytool` utility provided in the container. See [Generating certificates](#generating-certificates) for more details.)

**Note**: Datadog Agent FIPS JMX Docker images include OpenJDK pre-configured to run in FIPS-approved mode.

{{% /tab %}}

{{< /tabs >}}

## Setting up encrypted JMX connections

This section demonstrates how to configure mutual TLS (mTLS) using self-signed certificates.

### Generating certificates

Mutual TLS (mTLS) requires valid certificates to be presented by both the server (the Java application's JMX
connector) and the client (JMXFetch).

Commands provided in this section are for reference only and should be adjusted based on your specific scenario.


<div class="alert alert-danger">Configure the JVM in FIPS mode before generating certificates, as some Java FIPS modules reject private keys created in non-FIPS mode.</div>


{{< tabs >}}

{{% tab "Host" %}}

1. Create a directory for key and trust stores and make it the current directory.

2. Create two new certificates in two new key stores:

   ```shell
   keytool -keystore java-app-keystore -genkey -alias java-app -dname CN=java-app -validity 365 -keyalg ec -storepass changeit
   keytool -keystore jmxfetch-keystore -genkey -alias jmxfetch -dname CN=jmxfetch -validity 365 -keyalg ec -storepass changeit
   ```

3. Export public parts of the generated certificates to separate files:

   ```shell
   keytool -keystore java-app-keystore -export -alias java-app -rfc -file java-app-cert.pem -storepass changeit
   keytool -keystore jmxfetch-keystore -export -alias jmxfetch -rfc -file jmxfetch-cert.pem -storepass changeit
   ```

4. Import certificates into corresponding trust stores to make them trusted:

   ```shell
   keytool -keystore java-app-truststore -import -alias jmxfetch -file jmxfetch-cert.pem -storepass changeit -noprompt
   keytool -keystore jmxfetch-truststore -import -alias java-app -file java-app-cert.pem -storepass changeit -noprompt
   ```

{{% /tab %}}

{{% tab "Containers" %}}

Container installations must use BCFKS key store format. Use the `keytool` utility from the Datadog Agent FIPS JMX Docker image for JMXFetch certificates, and the Java application's `keytool` utility for application certificates.

1. Create a directory for key and trust stores and make it the current directory.

2. Create two new certificates in two new key stores:

   ```shell
   keytool -keystore java-app-keystore -genkey -alias java-app -dname CN=java-app -validity 365 -keyalg ec -storepass changeit

   docker run --rm -v $(pwd):/ssl datadog/agent:latest-fips-jmx \
     keytool -keystore /ssl/jmxfetch-keystore -genkey -alias jmxfetch -dname CN=jmxfetch -validity 365 -keyalg ec -storepass changeit -keypass changeit
   ```

3. Export public parts of the generated certificates to separate files:

   ```shell
   keytool -keystore java-app-keystore -export -alias java-app -rfc -file java-app-cert.pem -storepass changeit

   docker run --rm -v $(pwd):/ssl datadog/agent:latest-fips-jmx \
     keytool -keystore /ssl/jmxfetch-keystore -export -alias jmxfetch -rfc -file /ssl/jmxfetch-cert.pem -storepass changeit
   ```

4. Import certificates into corresponding trust stores to make them trusted:

   ```shell
   keytool -keystore java-app-truststore -import -alias jmxfetch -file jmxfetch-cert.pem -storepass changeit -noprompt

   docker run --rm -v $(pwd):/ssl datadog/agent:latest-fips-jmx \
     keytool -keystore /ssl/jmxfetch-truststore -import -alias java-app -file /ssl/java-app-cert.pem -storepass changeit -noprompt
   ```

{{% /tab %}}

{{< /tabs >}}

### Configuring the Java application

See application documentation for specific instructions about how to configure JMX properties. Add these JMX properties to your application configuration. Adjust the paths to your key and trust store files.

```text
com.sun.management.jmxremote.ssl=true
com.sun.management.jmxremote.registry.ssl=true
com.sun.management.jmxremote.ssl.need.client.auth=true
javax.net.ssl.keyStore=/ssl/java-app-keystore
javax.net.ssl.keyStorePassword=changeit
javax.net.ssl.trustStore=/ssl/java-app-truststore
javax.net.ssl.trustStorePassword=changeit
```

### Configuring JMXFetch

Add this configuration to your JMXFetch configuration file:


```yaml
init_config:
  is_jmx: true
instances:
  - host: <HOST>
    port: <PORT>
    name: my-java-app
    rmi_registry_ssl: true
    key_store_path: /ssl/jmxfetch-keystore
    key_store_password: changeit
    trust_store_path: /ssl/jmxfetch-truststore
    trust_store_password: changeit
```
