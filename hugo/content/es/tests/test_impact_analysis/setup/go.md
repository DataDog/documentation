---
aliases:
- /es/continuous_integration/intelligent_test_runner/go/
- /es/continuous_integration/intelligent_test_runner/setup/go/
- /es/intelligent_test_runner/setup/go
code_lang: go
code_lang_weight: 0
further_reading:
- link: /continuous_integration/tests
  tag: Documentación
  text: Exploración de los resultados de tests y del rendimiento
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de CI Visibility
title: Test Impact Analysis para Go
type: lenguaje de código múltiple
---

## Compatibilidad

Test Impact Analysis sólo es compatible con `orchestrion >= 0.9.4 + dd-trace-go >= 1.70.0`.

## Configuración

### Optimización de tests

Antes de configurar Test Impact Analysis, configura la [Test Optimization para Go][1]. Si informas de los datos a través del Agent, utiliza v6.40 y posteriores o v7.40 y posteriores.

{{% ci-itr-activation-instructions %}}

## Ejecutar tests con Test Impact Analysis activado

Después de completar la configuración, ejecuta tus tests utilizando `go test` con las siguientes opciones de cobertura de código:

```bash
orchestrion go test ./... -cover -covermode=count -coverpkg ./...
```

1. `-cover`: la función de Test Impact Analysis utiliza el procesador de cobertura de código integrado de Go, por lo que es necesario activar la recopilación de cobertura de código en el comando `go test`.

2. `-covermode`: debe ser `count` o `atomic`. Dado que `set` no es compatible, al establecer este valor se desactiva Test Impact Analysis.

3. `-coverpkg`: el análisis de cobertura de código para cada test debe configurarse para que se aplique en todas las dependencias de paquete y no sólo para el paquete que se está probando. De esta manera, si una dependencia cambia, se puede realizar un seguimiento del test afectado por este cambio. Si ejecutas el comando del test desde la raíz del proyecto (donde se encuentra el archivo go.mod), puedes utilizar el comodín `./...`. En caso contrario, deberás enumerar manualmente todas las dependencias de paquete separadas por comas (`pattern1, pattern2, pattern3, ...`). Para ello, puedes utilizar el comando `go list ./...` para obtener todos los nombres de paquete.

<div class="alert alert-danger">Tener un valor -coverpkg incorrecto afecta a la capacidad de Test Impact Analysis para realizar un seguimiento correcto de la cobertura de los tests.</div>

## Desactivar la omisión de tests específicos

Puedes anular el comportamiento de Test Impact Analysis y evitar que se omitan tests específicos. Estos tests se denominan tests no omitibles.

### ¿Por qué no se pueden omitir los tests?

Test Impact Analysis utiliza datos de cobertura de código para determinar si deben omitirse tests o no. En algunos casos, estos datos pueden no ser suficientes para tomar esta determinación.

Algunos ejemplos son:

- Tests que leen datos de archivos de texto.
- Tests que interactúan con APIs ajenas al código que se está testeando (como las APIs REST remotas).
- Designar los tests como no omitibles garantiza que Test Impact Analysis los ejecute independientemente de los datos de cobertura.

### Marcar tests como no omitibles

#### Caso de test individual

Añadr el comentario `//dd:test.unskippable` a tu caso de test para marcarlo como no omitible.

```go
import (
    "testing"
)

//dd:test.unskippable
func TestMyCustomTest(t *testing.T) {
  ...
}

```

#### Conjunto de tests

Añade el comentario `//dd:suite.unskippable` al principio del archivo para marcarlo como no omitible.

Si un conjunto está marcado como no omitible, ninguno de los casos de test de ese conjunto puede ser omitido por Test Impact Analysis.

```csharp
import (
    "testing"
)

//dd:suite.unskippable

func TestMyCustomTest(t *testing.T) {
  ...
}

func TestMyCustomTest2(t *testing.T) {
  ...
}
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/continuous_integration/tests/go