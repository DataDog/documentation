---
aliases:
- /continuous_integration/static_analysis/rules/php-security/symfony-csrf-disabled
- /static_analysis/rules/php-security/symfony-csrf-disabled
dependencies: []
disable_edit: true
group_id: php-security
meta:
  category: Security
  id: php-security/symfony-csrf-disabled
  language: PHP
  severity: Error
  severity_rank: 1
title: Do not disable CSRF protection
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `php-security/symfony-csrf-disabled`

**Language:** PHP

**Severity:** Error

**Category:** Security

**CWE**: [352](https://cwe.mitre.org/data/definitions/352.html)

## Description
CSRF (Cross-Site Request Forgery) is an attack that tricks the victim into submitting a malicious request. It uses the identity and privileges of the victim to perform an undesired function on their behalf.

Disabling CSRF protection exposes your application to such attacks, compromising user data and potentially leading to unauthorized actions. For instance, an attacker could forge a request to change the email address on record for the victim's account, effectively hijacking the account.

To avoid violating this rule, ensure that 'csrf_protection' is set to true in your PHP code.

## Non-Compliant Code Examples
```php
<?php
class Foo
{
  public function configureOptions(OptionsResolver $resolver)
  {
    $resolver->setDefaults([
      'data_class'      => Type::class,
      'csrf_protection' => false
    ]);
    $resolver->setDefaults(array(
      'csrf_protection' => false
    ));
  }
}

class Bar extends Extension implements PrependExtensionInterface
{
  public function prepend(ContainerBuilder $container)
  {
    $container->prependExtensionConfig('framework', ['csrf_protection' => false]);
    $container->loadFromExtension('framework', ['csrf_protection' => false]);
  }
}

class Baz extends AbstractController
{
  public function action()
  {
    $this->createForm(TaskType::class, $task, array(
      'csrf_protection' => false,
    ));
  }
}
```

## Compliant Code Examples
```php
<?php
class Foo
{
  public function configureOptions(OptionsResolver $resolver)
  {
    $resolver->setDefaults([
      'data_class'      => Type::class,
      'csrf_protection' => true,
    ]);
    $resolver->setDefaults(array(
      'csrf_protection' => true,
    ));
  }
}

class Bar extends Extension implements PrependExtensionInterface
{
  public function prepend(ContainerBuilder $container)
  {
    $container->prependExtensionConfig('framework', ['csrf_protection' => true]);
    $container->loadFromExtension('framework', ['csrf_protection' => true]);
  }
}

class Baz extends AbstractController
{
  public function action()
  {
    $this->createForm(TaskType::class, $task, array(
      'csrf_protection' => true,
    ));
  }
}
```
