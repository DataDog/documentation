---
aliases:
- /es/synthetics/testing_tunnel
- /es/continuous_testing/testing_tunnel
description: Aprende a utilizar Continuous Testing en entornos locales y remotos.
further_reading:
- link: https://www.datadoghq.com/blog/shift-left-testing-best-practices/
  tag: Blog
  text: Prácticas recomendadas para tests shift-left
- link: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
  tag: Blog
  text: Incorporar tests de Datadog Synthetic a tu pipeline CI/CD
- link: https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline
  tag: Centro de aprendizaje
  text: Aprender a ejecutar tests en un pipeline CI/CD
- link: /continuous_testing/environments/multiple_env
  tag: Documentación
  text: Aprender sobre la realización de tests en múltiples entornos
- link: /continuous_testing/environments/proxy_firewall_vpn
  tag: Documentación
  text: Aprender sobre la realización de tests mientras se utilizan proxies, cortafuegos
    o VPN
- link: /synthetics/private_locations
  tag: Documentación
  text: Más información sobre las localizaciones privadas
title: Tests de entornos locales y de staging
---

## Información general

En el contexto de [los tests en pipelines CI/CD, también conocidos como tests shift-left][1], el entorno de producción suele ser el último eslabón de la cadena. Es probable que tu aplicación pase por varias etapas antes de llegar a esta fase.

{{< img src="continuous_testing/environments.png" alt="Es posible utilizar Continuous Testing durante todo el ciclo de desarrollo, desde el entorno de desarrollo local hasta el staging de producción." width="100%" >}}

Mientras que [los tests Synthetic programados se centran principalmente en entornos de producción disponibles al público][2], Continuous Testing te permite probar tu aplicación en cualquiera o todos los entornos en que se despliega a lo largo del ciclo de desarrollo.

## Tests en múltiples entornos

Continuous Testing puede reutilizar el mismo escenario de los tests programados, utilizados en entornos de producción, para probar entornos de preproducción disponibles al público.

Ya sea para un [despliegue azul-verde][3] o para un entorno de staging exclusivo, Continuous Testing te permite redirigir un escenario existente a un entorno diferente. Para obtener más información, consulta [Tests en entornos múltiples][4].

## Tests con proxies, cortafuegos o VPN

Continuous Testing puede probar tu aplicación en etapas tempranas del ciclo de desarrollo, incluso detrás de una red privada protegida por un proxy, cortafuegos o VPN.

Puede ejecutar el mismo escenario de los tests Synthetic programados en cambios desplegados en un servidor local que se ejecuta en tu entorno de desarrollo (como un portátil de desarrollo) o en un pipeline CI/CD, donde tu aplicación se despliega en un entorno efímero que dura la misma cantidad de tiempo que el trabajo CI/CD, o en un entorno de staging privado.

Continuous Testing proporciona un [túnel de tests][5] que permite a la localización Synthetic gestionada llegar a entornos privados. Para obtener más información, consulta [Realización de tests mientras se utilizan proxies, cortafuegos o VPN][6].

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/shift-left-testing-best-practices/
[2]: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
[3]: https://en.wikipedia.org/wiki/Blue%E2%80%93green_deployment
[4]: /es/continuous_testing/environments/multiple_env
[5]: /es/continuous_testing/environments/proxy_firewall_vpn/#what-is-the-testing-tunnel
[6]: /es/continuous_testing/environments/proxy_firewall_vpn