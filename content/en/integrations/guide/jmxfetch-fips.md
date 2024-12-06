# JMXFetch FIPS-140 mode

JMXFetch supports running in JVMs configured to be FIPS-140 compliant.

JMXFetch uses cryptography for communication with Datadog Agent over TLS and when configured to connect to JMX
endpoints via SSL. For all encrypted connections JMXFetch uses the default SSL provider (JSSE provider) of the
Java runtime environment.

## Requirements

{{< tabs >}}

{{% tab "Host" %}}

1. JVM configured to run in FIPS mode.
2. Datadog Agent installed on the host.
3. Appropriate TLS/SSL certificates if encrypted JMX connection is required.

Datadog Agent host installs do not include a Java runtime, which must be installed and configured to run in
FIPS-approved mode separately.

{{% /tab %}}

{{% tab "Containers" %}}

1. Datadog Agent FIPS JMX docker image v7.61 or later.
2. Appropriate TLS/SSL certificates if encrypted JMX connection is required. (Private keys must be generated
   with the `keytool` utility provided in the container, see below).

Datadog Agent FIPS JMX docker images include OpenJDK pre-configured to run in FIPS-approved mode.

{{% /tab %}}

{{< /tabs >}}

## Encrypted JMX connection with self-signed certificates

This section provides an example mutual TLS (mTLS) configuration.

### Generating certificates

Mutual TLS (mTLS) requires valid certificates to be presented by both the server (the Java application's JMX
connector) and the client (JMXFetch).

This section describes how to generate certificates and cross-add them to corresponding trust stores. Private
keys can not be imported or exported, and must be generated directly into the key store used by the JVM.

Commands provided in this section are for reference only and can be adjusted according to circumstances.

JVM must be already configured to run in FIPS mode before applying these commands. Some Java FIPS modules can
refuse to load private keys created in non-FIPS mode.

For the sake of explanation, this example configures each JVM instance with a dedicated key and trust stores.

{{< tabs >}}

{{% tab "Host" %}}

Pick a location to place the key and trust stores, make it the current directory.

The following commands create two new certificates in two new key stores:

```
keytool -genkey -keystore java-app-keystore -alias java-app -dname CN=java-app -validity 365 -keyalg ec -storepass changeit
keytool -genkey -keystore jmxfetch-keystore -alias jmxfetch -dname CN=jmxfetch -validity 365 -keyalg ec -storepass changeit
```

Then export public parts of the generated certificates to separate files:

```
keytool -export -alias java-app -keystore java-app-keystore -rfc -file java-app-cert.pem -storepass changeit
keytool -export -alias jmxfetch -keystore jmxfetch-keystore -rfc -file jmxfetch-cert.pem -storepass changeit
```

Finally, make the certificates trusted by importing them into corresponding trust stores:

```
keytool -import -alias jmxfetch -keystore java-app-truststore -file jmxfetch-cert.pem -storepass changeit -noprompt
keytool -import -alias java-app -keystore jmxfetch-truststore -file java-app-cert.pem -storepass changeit -noprompt
```

In a case when different JVM versions or FIPS modules are used to run JMXFetch and the Java application,
please make sure that the `keytool` and environment match the target JVM version when manipulating key and
trust stores for that JVM.

{{% /tab %}}

{{% tab "Containers" %}}

Datadog Agent FIPS JMX docker images come with BouncyCastle FIPS provider pre-installed. BouncyCastle uses a
proprietary key and trust store format, which is not compatible with regular Java key store format, or formats
used by other Java FIPS implementations. For this reason, `keytool` command provided by the docker image
should be used to configure key and trust stores for JMXFetch. Stores for the Java application should be
configured using `keytool` from the same Java runtime that is running the application.

Pick a location to place the key and trust stores, make it the current directory.

The following commands create two new certificates in two new key stores:

```
keytool -genkey -keystore java-app-keystore -alias java-app -dname CN=java-app -validity 365 -keyalg ec -storepass changeit

docker run --rm -v $(pwd):/ssl datadog/agent:latest-fips-jmx \
  keytool -genkey -keystore /ssl/jmxfetch-keystore -alias jmxfetch -dname CN=jmxfetch -validity 365 -keyalg ec -storepass changeit -keypass changeit
```

Then export public parts of the generated certificates to separate files:

```
keytool -export -alias java-app -keystore java-app-keystore -rfc -file java-app-cert.pem -storepass changeit

docker run --rm -v $(pwd):/ssl datadog/agent:latest-fips-jmx \
  keytool -export -alias jmxfetch -keystore /ssl/jmxfetch-keystore -rfc -file /ssl/jmxfetch-cert.pem -storepass changeit
```

Finally, make the certificates trusted by importing them into corresponding trust stores:

```
keytool -import -alias jmxfetch -keystore java-app-truststore -file jmxfetch-cert.pem -storepass changeit -noprompt

docker run --rm -v $(pwd):/ssl datadog/agent:latest-fips-jmx \
  keytool -import -alias java-app -keystore /ssl/jmxfetch-truststore -file /ssl/java-app-cert.pem -storepass changeit -noprompt
```

{{% /tab %}}

{{< /tabs >}}

### Configuring the Java application

See application documentation for specific instructions about how to configure JMX properties. At least the
following properties must to be set. Adjust paths as needed to point to actual location of the key and trust
store files.

```
com.sun.management.jmxremote.ssl=true
com.sun.management.jmxremote.registry.ssl=true
com.sun.management.jmxremote.ssl.need.client.auth=true
javax.net.ssl.keyStore=/ssl/java-app-keystore
javax.net.ssl.keyStorePassword=changeit
javax.net.ssl.trustStore=/ssl/java-app-truststore
javax.net.ssl.trustStorePassword=changeit
```

### Configuring JMXFetch

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
