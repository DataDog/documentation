---
aliases:
- /security_platform/cloud_security_management/guide/writing_rego_rules/
further_reading:
- link: /security/default_rules
  tag: Documentación
  text: Explorar las reglas de detección predeterminadas de configuración en la nube
    de Posture Management
- link: /security/cloud_security_management/misconfigurations/frameworks_and_benchmarks
  tag: Guía
  text: Conocer los marcos y las referencias del sector
is_beta: true
title: Escribir reglas personalizadas con Rego
---

## Información general

Open Policy Agent (OPA) ofrece [Rego][1], un lenguaje de código abierto política con versátiles funciones de inspección de recursos para determinar la postura de seguridad de la nube. En Datadog, puedes escribir reglas personalizadas con Rego para controlar la seguridad de tu infraestructura. 

## Módulo de plantilla

La definición de una regla comienza con una [política][2] de Rego, definida dentro de un [módulo][3]. CSM Misconfigurations utiliza un módulo de plantilla como el siguiente para simplificar la escritura de reglas:

```python
package datadog

import data.datadog.output as dd_output

import future.keywords.contains
import future.keywords.if
import future.keywords.in

eval(resource_type) = "skip" if {
    # Lógica que se evalúa como verdadera si se debe omitir el recurso
} else = "pass" {
    # Lógica que se evalúa como verdadera si el recurso es conforme
} else = "fail" {
    # Lógica que se evalúa como verdadera si el recurso no es conforme
}

# Esta parte permanece sin cambios para todos los resultados
de reglas, contiene resultado si {
    some resource in input.resources[input.main_resource_type]
    result := dd_output.format(resource, eval(resource))
}

```

Examina detenidamente cada parte de este módulo para entender cómo funciona.

### Declaraciones de importación

La primera línea contiene la declaración `package datadog`. Un [paquete][4] agrupa los módulos de Rego en un único espacio de nombres, lo que permite importar módulos de forma segura. Actualmente, la importación de módulos de usuario no es una característica de las reglas personalizadas. Todas las reglas de gestión de posturas se agrupan en espacio de nombres `datadog`. Para que tus resultados se devuelvan correctamente, agrupa tus reglas bajo el espacio de nombres `package datadog`. 

```python
import future.keywords.contains
import future.keywords.if
import future.keywords.in
```

Las siguientes tres declaraciones importan las palabras clave proporcionadas por OPA [`contains`][5], [`if`][6] y [`in`][7]. Estas palabras clave permiten definir reglas con una sintaxis más expresiva para mejorar la legibilidad. **Nota:** [No se recomienda][8] mportar todas las palabras clave con `import future.keywords`.

```python
import data.datadog.output as dd_output
```

La siguiente línea importa el método de ayuda de Datadog, que formatea tus resultados según las especificaciones del sistema de gestión de posturas de Datadog. `datadog.output` es un módulo Rego con un método de formato que espera tu recurso. como primer argumento. y una cadena `pass`, `fail` o `skip`, como segundo argumento, que describe el resultado de la inspección de tu recurso.

### Reglas

Después de las declaraciones de importación viene la primera regla del módulo de plantilla:

```python
eval(resource) = "skip" if {
    resource.skip_me
} else = "pass" {
    resource.should_pass
} else = "fail" {
    true
}
```

La regla evalúa el recurso y proporciona el resultado en forma de cadena en función del estado del recurso. Puedes cambiar el orden de `pass`, `fail` y `skip` según tus necesidades. La regla anterior tiene `fail` como valor predeterminado, si `skip_me` y `should_pass` son falsos o no existen en tu recurso. También puedes hacer que `pass` sea el valor predeterminado: 

```python
eval(resource) = "skip" if {
    resource.skip_me
} else = "fail" {
    resource.should_fail
} else = "pass" {
    true
}
```

### Resultados

La sección final del módulo de plantilla crea tu conjunto de resultados:

```python
# Esta parte permanece sin cambios para todos los resultados
de las reglas, contiene resultado si {
    some resource in input.resources[input.main_resource_type]
    result := dd_output.format(resource, eval(resource))
}
```

Esta sección pasa por todos los recursos del tipo de recurso principal y los evalúa. Crea una matriz de resultados que procesará el sistema de gestión de posturas. La palabra clave [algunos][9] declara la variable local `resource`, que procede de la matriz de recursos principales. La regla `eval` se ejecuta en cada recurso, devolviendo `pass`, `fail` o `skip`. La regla `dd_output.format` formatea el recurso y la evaluación correctamente para ser procesados por la seguridad en la nube.

No es necesario modificar esta sección de la política. En su lugar, cuando selecciones tu tipo de recurso principal en el menú desplegable **Choose your main resource type** (Elige tu tipo de recurso principal) al clonar reglas, se insertará en esta sección de la política. También puedes acceder a la matriz de tus recursos a través de `input.resources.some_resource_type`, sustituyendo `some_resource_type` por el tipo de recurso principal que hayas elegido, por ejemplo, `gcp_iam_policy`.

## Otras formas de escribir reglas

La plantilla te ayuda a empezar a escribir reglas personalizadas. No es obligatorio que las sigas. En su lugar, puedes clonar una regla predeterminada existente o escribir tu propia regla desde cero. Sin embargo, para que el sistema de gestión de posturas interprete tus resultados, deben llamarse `results` en tu módulo Rego y tener el siguiente formato:

```json
[
    {
        "result": "pass" OR "fail" OR "skip",
        "resource_id": "some_resource_id",
        "resource_type": "some_resource_type"
    }
]
```

## Reglas más complejas 

El ejemplo de regla anterior evalúa marcas verdaderas o falsas básicas como `should_pass` en tu recurso. Considere una regla que exprese una lógica `OR`, por ejemplo:

```python
bad_port_range(resource) {
    resource.port >= 100
    resource.port <= 200
} else {
    resource.port >= 300
    resource.port <= 400
}
```

Esta regla se evalúa como verdadera si el `port` se encuentra entre `100` y `200` o entre `300` y `400`, inclusive. Para ello, puede definir tu regla `eval` de la siguiente manera:

```python
eval(resource) = "skip" if {
    not resource.port
} else = "fail" {
    bad_port_range(resource)
} else = "pass" {
    true
}
```

Esto omite el recurso si no tiene el atributo `port` y lo considera fallido si cae dentro de uno de los dos rangos "malos". 

Algunas veces, es posible que quieras examinar más de un tipo de recurso en tu regla. Para ello, puedes seleccionar algunos tipos de recursos relacionados en el menú desplegable **Advanced Rule Options** (Opciones avanzadas para reglas). A continuación, puedes acceder a las matrices de recursos relacionados a través de `input.resources.related_resource_type`, sustituyendo `related_resource_type` por el recurso relacionado al que quieres acceder.

Al escribir una política para más de un tipo de recurso, puede llevar mucho tiempo recorrer todas las instancias de un tipo de recurso relacionado para cada recurso principal. Considera el siguiente ejemplo:

```python
eval(iam_service_account) = "fail" if {
    some key in input.resources.gcp_iam_service_account_key
    key.parent == iam_service_account.resource_name
    key.key_type == "USER_MANAGED"
} else = "pass" {
    true
}

# Esta parte permanece sin cambio para todos los resultados
de reglas, contiene resultado si {
    some resource in input.resources[input.main_resource_type]
    result := dd_output.format(resource, eval(resource))
}
```

Esta regla determina si hay alguna instancia de `gcp_iam_service_account_key` gestionada por el usuario que coincida con una `gcp_iam_service_account` (el recurso seleccionado como tipo de recurso principal). Si la cuenta de servicio tiene una clave gestionada por el usuario, genera un resultado `fail`. La regla `eval` se ejecuta en cada cuenta de servicio y recorre cada clave de cuenta de servicio para encontrar una que coincida con la cuenta, lo que resulta en una complejidad de `O(MxN)`, donde M es el número de cuentas de servicio y N es el número de claves de cuentas de servicio. 

Para mejorar significativamente la complejidad temporal, crea un [conjunto][10] de elementos principales de clave que sean gestionados por un usuario con una [comprensión del conjunto][11]:

```python
user_managed_keys_parents := {key_parent |
    some key in input.resources.gcp_iam_service_account_key
    key.key_type == "USER_MANAGED"
    key_parent = key.parent
}
```

Para saber si tu cuenta de servicio tiene una clave gestionada por un usuario, consulta el conjunto en `O(1)` tiempo:

```python
eval(iam_service_account) = "fail" if {
    user_managed_keys_parents[iam_service_account.resource_name]
} else = "pass" {
    true
}
```

La nueva complejidad temporal es `O(M+N)`. Rego proporciona [comprensiones][12] de conjuntos, objetos y matrices a ayudarte a crear [valores compuestos][13] que consultar.

## Obtener más información

Para obtener más contexto sobre reglas, módulos, paquetes, comprensiones y para una guía específica sobre cómo escribir reglas personalizadas, consulta la [documentación de Rego][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.openpolicyagent.org/docs/latest/#rego
[2]: https://www.openpolicyagent.org/docs/latest/policy-language/
[3]: https://www.openpolicyagent.org/docs/latest/policy-language/#modules
[4]: https://www.openpolicyagent.org/docs/latest/policy-language/#packages
[5]: https://www.openpolicyagent.org/docs/latest/policy-language/#futurekeywordscontains
[6]: https://www.openpolicyagent.org/docs/latest/policy-language/#futurekeywordsif
[7]: https://www.openpolicyagent.org/docs/latest/policy-language/#futurekeywordsin
[8]: https://www.openpolicyagent.org/docs/latest/policy-language/#future-keywords
[9]: https://www.openpolicyagent.org/docs/latest/policy-language/#some-keyword
[10]: https://www.openpolicyagent.org/docs/latest/policy-language/#sets
[11]: https://www.openpolicyagent.org/docs/latest/policy-language/#set-comprehensions
[12]: https://www.openpolicyagent.org/docs/latest/policy-language/#comprehensions
[13]: https://www.openpolicyagent.org/docs/latest/policy-language/#composite-values