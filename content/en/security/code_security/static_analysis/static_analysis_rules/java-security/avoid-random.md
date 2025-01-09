---
aliases:
- /continuous_integration/static_analysis/rules/java-security/avoid-random
- /static_analysis/rules/java-security/avoid-random
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/avoid-random
  language: Java
  severity: Notice
  severity_rank: 3
title: Prefer SecureRandom over Random
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/avoid-random`

**Language:** Java

**Severity:** Notice

**Category:** Security

**CWE**: [330](https://cwe.mitre.org/data/definitions/330.html)

## Description
Functions as `Math.random()` and objects like `java.util.Random()` do not provide strong enough randomness. Consider using `java.security.SecureRandom()` instead.

## Non-Compliant Code Examples
```java
@RestController
public class ImageServlet {

  public static final int PINCODE = new java.util.Random().nextInt(10000);

  @RequestMapping(
      method = {GET, POST},
      value = "/challenge/logo",
      produces = MediaType.IMAGE_PNG_VALUE)
  @ResponseBody
  public byte[] logo() throws IOException {
    byte[] in = getBytes();

    String pincode = String.format("%04d", PINCODE);

    in[81216] = (byte) pincode.charAt(0);
    in[81217] = (byte) pincode.charAt(1);
    in[81218] = (byte) pincode.charAt(2);
    in[81219] = (byte) pincode.charAt(3);

    return in;
  }
}
```

```java
@RestController
public class ImageServlet {

  public static final int PINCODE = new Random().nextInt(10000);

  @RequestMapping(
      method = {GET, POST},
      value = "/challenge/logo",
      produces = MediaType.IMAGE_PNG_VALUE)
  @ResponseBody
  public byte[] logo() throws IOException {
    byte[] in = getBytes();

    String pincode = String.format("%04d", PINCODE);

    in[81216] = (byte) pincode.charAt(0);
    in[81217] = (byte) pincode.charAt(1);
    in[81218] = (byte) pincode.charAt(2);
    in[81219] = (byte) pincode.charAt(3);

    return in;
  }
}
```

```java
@RestController
public class ImageServlet {

  public static final int PINCODE = new Random().nextInt(10000);

  @RequestMapping(
      method = {GET, POST},
      value = "/challenge/logo",
      produces = MediaType.IMAGE_PNG_VALUE)
  @ResponseBody
  public byte[] logo() throws IOException {
    var v = Math.random();
  }
}
```

## Compliant Code Examples
```java
import org.apache.commons.codec.binary.Hex;

class Class {
    String generateSecretToken() {
        SecureRandom secRandom = new SecureRandom();

        byte[] result = new byte[32];
        secRandom.nextBytes(result);
        return Hex.encodeHexString(result);
    }
}

```
