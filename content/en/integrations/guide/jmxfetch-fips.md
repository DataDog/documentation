# JMXFetch FIPS mode

JMXFetch supports running in JVMs configured to be FIPS-140 compliant.

## Prerequisites.

{{< tabs >}}

{{% tab "Host" %}}

1. Datadog Agent v7.61 or later installed on the host.
2. JVM configured to run in FIPS mode.
3. Appropriate TLS/SSL certificates if encrypted JMX connection is required.

{{% /tab %}}

{{% tab "Containers" %}}

1. Datadog Agent FIPS docker image v7.61 or later contains a JVM pre-configured to run in FIPS mode. 
2. Appropriate TLS/SSL certificates if encrypted JMX connection is required. (Private keys must be generated
   with the `keytool` utility provided in the container, see below).

{{% /tab %}}

{{< /tabs >}}

## Encrypted JMX connection with self-signed certificates

TLS JMX connections require both parties to present a trusted certificate to each other.

### Generating certificates

This section describes how to generate certificates and cross-add them to corresponding trust stores. Private
keys can not be imported or exported, and must be generated directly into the key store used by the JVM.

Commands provided in this section are for reference only and can be adjusted according to circumstances.

JVM must be already configured to run in FIPS mode before applying these commands. Some Java FIPS modules can
refuse to load private keys created in non-FIPS mode.

For the sake of explanation, this example configures each JVM instance with a dedicated key and trust stores.

{{< tabs >}}

{{% tab "Host" %}}

Pick a location to place the key and trust stores. The following commands create two new certificates in two
new key stores:

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
used by other Java FIPS implementations. For this reason, `keytool` command provided by the docker image must
be used to configure key and trust stores that will be used by JMXFetch.

Pick a location to place the key and trust stores. The following commands create two new certificates in two
new key stores:

```
keytool -genkey -keystore java-app-keystore -alias server -dname CN=java-app -validity 365 -keyalg ec -storepass changeit

docker run --rm -v $(pwd):/ssl datadog/agent:latest-fips-jmx \
  keytool -genkey -keystore /ssl/jmxfetch-keystore -alias client -dname CN=jmxfetch -validity 365 -keyalg ec -storepass changeit
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


### Configuring JMXFetch

Java runtime only supports loading only one key and trust store at a time. If JMXFetch is targeting multiple
applications with different certificates, all certificates must be imported to the same trust store.

```yaml
init_config:
  is_jmx: true
  key_store_path: /ssl/jmxfetch-keystore
  key_store_password: changeit
  trust_store_path: /ssl/jmxfetch-truststore
  trust_store_password: changeit
instances:
  - host: 172.17.0.1
    port: 1099
    name: my-java-app
    user: changeit
    password: changeit
    rmi_registry_ssl: true
```

### Configuring the Java application

Please refer to application documentation for specific instructions about how to configure JMX properties. At
least the following properties will need to be set. Adjust paths as needed to point to actual location of the
key and trust store files.

```
com.sun.management.jmxremote.ssl=true
com.sun.management.jmxremote.registry.ssl=true
com.sun.management.jmxremote.ssl.need.client.auth=true
javax.net.ssl.keyStore=/ssl/java-app-keystore
javax.net.ssl.keyStorePassword=changeit
javax.net.ssl.trustStore=/ssl/java-app-truststore
javax.net.ssl.trustStorePassword=changeit
```

