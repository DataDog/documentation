---
aliases:
- /continuous_integration/static_analysis/rules/java-security/spring-csrf-disable
- /static_analysis/rules/java-security/spring-csrf-disable
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/spring-csrf-disable
  language: Java
  severity: Warning
  severity_rank: 2
title: Do not disable CSRF
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/spring-csrf-disable`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [352](https://cwe.mitre.org/data/definitions/352.html)

## Description
Disabling CSRF leads to security issues as the server may not be able to accurately identify a request.

#### Learn More

 - [CWE-352](https://cwe.mitre.org/data/definitions/352.html)

## Non-Compliant Code Examples
```java
class Test {
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.authorizeHttpRequests(
        auth ->
            auth.requestMatchers(
                    "/css/**",
                    "/images/**",
                    "/js/**",
                    "fonts/**",
                    "/plugins/**",
                    "/registration",
                    "/register.mvc",
                    "/actuator/**")
                .permitAll()
                .anyRequest()
                .authenticated());
    http.formLogin()
        .loginPage("/login")
        .defaultSuccessUrl("/welcome.mvc", true)
        .usernameParameter("username")
        .passwordParameter("password")
        .permitAll();
    http.logout().deleteCookies("JSESSIONID").invalidateHttpSession(true);
    http.csrf().disable();

    http.headers().cacheControl().disable();
    http.exceptionHandling().authenticationEntryPoint(new AjaxAuthenticationEntryPoint("/login"));
    return http.build();
  }
}
```
