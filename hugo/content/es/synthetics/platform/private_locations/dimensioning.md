---
aliases:
- /es/synthetics/private_locations/dimensioning
description: Requisitos de dimensionamiento para tus localizaciones privadas contenedorizadas.
further_reading:
- link: /synthetics/private_locations/monitoring
  tag: Documentación
  text: Monitorizar tus localizaciones privadas
title: Dimensionar localizaciones privadas
---

<div class="alert alert-info">Las recomendaciones de dimensionamiento se aplican a la localización privada contenedorizada.</div>

## Información general

Las localizaciones privadas pueden ejecutar la [API][1], la [API de varios pasos][2] y [tests de navegador][3]. Los tests de navegador requieren más cantidad de recursos que los tests de API y API de varios pasos. Una localización privada también puede ejecutar varios tipos de tests.

Al definir un tipo de test, el número máximo de ejecuciones de tests y los requisitos totales de hardware, puedes calcular las dimensiones de tus localizaciones privadas y distribuir los recursos entre varios workers para mejorar la eficiencia de tus tests.

Para mejorar el dimensionamiento, divide tus asignaciones de tests en función de los tipos de tests. Por ejemplo, puedes hacer que algunas localizaciones privadas ejecuten sólo tests de API y de API de varios pasos, y que otras sólo ejecuten tests de navegador.

### Requisitos previos

Para empezar a dimensionar tus localizaciones privadas, necesitas lo siguiente:

1. Nociones básicas de orquestación de contenedores y de la opción concreta que utilizas para ejecutar tu localización privada.
2. El archivo de configuración de la localización privada integrado con el orquestador que elijas y al que puedan acceder los contenedores de localización privada subyacentes.
3. Si estás utilizando [tests de navegador con bloqueo de IP][4], puede ser necesario el acceso `sudo`.

### Definir el número máximo de ejecuciones de tests

Los requisitos de recursos dependen del número máximo de ejecuciones de tests que tu localización privada puede ejecutar en paralelo y de las aplicaciones que quieras someter a test. Ten en cuenta los picos que pueden producirse con los tests bajo demanda (por ejemplo, al ejecutar tests como parte de tus [pipelines de integración/distribución continua CI/CD][5]), así como el tamaño y el número de recursos que deben cargarse.

Define el parámetro `concurrency` de tu localización privada con el número máximo de ejecuciones de tests. Por defecto, el número máximo de tests ejecutados en paralelo es 10.

Para obtener más información, consulta [Configuración avanzada][4].

### Definir los requisitos totales de hardware

Una vez sepas qué tipo de test quieres ejecutar y el número máximo de tests que quieres ejecutar en paralelo, define los requisitos totales de hardware para tu localización privada.

El requisito básico para la CPU es de núcleos de 150m y para la memoria es de 150MiB.

Los requisitos adicionales varían en función del tipo de test para la localización privada.

| Tipo de test                                     | Recomendación de CPU/Memoria/Disco    |
| --------------------------------------------- | --------------------------------- |
| [Tests de API][1] y [test de API de varios pasos][2] | Núcleos de 100m/200MiB/100MiB por ejecución de test   |
| [Tests de navegador][3]                           | Núcleos de 800m/1GiB/500MiB por ejecución de test |

Por ejemplo, Datadog recomienda ~ 8 núcleos de CPU `(150mCores + (800mCores*10 test runs))`, ~ 10 GiB de memoria `(150MiB + (1GiB*10 test runs))` y ~ 5 GiB de disco `(500MiB*10 test runs)` para una localización privada que ejecute sólo tests de navegador con un número máximo de tests concurrentes de `10`.

**Nota:** Si quieres ejecutar tests de API o API de varios pasos y tests de navegador en una localización privada, Datadog recomienda calcular los requisitos totales de hardware con los requisitos de los tests de navegador.

### Asignar recursos a tu localización privada

Una vez que hayas determinado los [requisitos totales para tu localización privada](#define-your-total-hardware-requirements), decide cómo quieres que se distribuyan estos recursos: asignando todos los recursos a un único worker o distribuyendo todos los recursos entre varios workers.
Para asignar todos los recursos a un único worker, ejecuta un contenedor para una localización privada con un archivo de configuración.
1. Define el [parámetro `concurrency`][4] como `maximum number of test runs that can be executed in parallel on your private location`.
2. Asigna tus [requisitos totales de recursos de localización privada](#define-your-total-hardware-requirements) a tu contenedor único.

Para distribuir recursos entre varios workers, ejecuta varios contenedores para una localización privada con un archivo de configuración.

 1. Define el [parámetro `concurrency`][4] como `maximum number of test runs that can be executed on your private location / number of workers associated with your private location`.
 2. Asigna recursos `total private location resource requirements / number of workers` a cada contenedor de localización privada.


Por ejemplo, Datadog recomienda ~ 8 núcleos de CPU, ~ 10 GiB de memoria y ~ 5 GiB de disco para una localización privada que ejecute sólo tests de navegador con un número máximo de ejecuciones concurrentes de tests de `10`. Para distribuir estos recursos entre dos workers, define el [parámetro `concurrency`][4] como 5 y asigna ~ 4 núcleos de CPU, ~ 5 GiB de memoria y ~ 2,5 GiB de disco a cada worker.

#### Mecanismo de colas

Cuando se asocian varios workers a una localización privada, cada worker solicita un par de ejecuciones de test, que dependen del [parámetro `concurrency`][4] y del número de ejecuciones de test adicionales que se pueden asignar.

Por ejemplo, diez tests están programadas para ejecutarse simultáneamente en una localización privada que tiene dos workers en ejecución. Si el worker 1 está ejecutando dos tests, el worker 1 puede solicitar que se ejecuten tres tests adicionales. Si el worker 2 no está ejecutando ningún test, puede solicitar los cinco tests siguientes.

Los dos tests restantes pueden ser solicitados por cualquier worker que haya terminado de ejecutar tu test antes que el otro (cualquier worker que tenga ranuras disponibles).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/api_tests/
[2]: /es/synthetics/multistep?tab=requestoptions
[3]: /es/synthetics/browser_tests/?tab=requestoptions
[4]: /es/synthetics/private_locations/configuration#advanced-configuration
[5]: /es/synthetics/cicd_integrations