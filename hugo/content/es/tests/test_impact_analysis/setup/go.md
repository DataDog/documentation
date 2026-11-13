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
  text: Explorar resultados de pruebas y rendimiento
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solución de problemas de CI Visibility
title: Test Impact Analysis para Go
type: multi-code-lang
---
## Compatibilidad {#compatibility}

Test Impact Analysis requiere `ddtest >= 1.14.0`.

## Configuración {#setup}

### Test Optimization {#test-optimization}

Antes de configurar Test Impact Analysis, configure [Test Optimization for Go][1]. Si envía datos mediante el Agent, use la versión v6.40 o posterior, o la versión v7.40 o posterior.

{{% ci-itr-activation-instructions %}}

## Ejecute pruebas con Test Impact Analysis habilitado {#run-tests-with-test-impact-analysis-enabled}

Después de completar la configuración, ejecute sus pruebas usando `ddtest instrument go test` con las siguientes opciones de cobertura de código:

```bash
ddtest instrument go test -cover -covermode=count -coverpkg=./... ./...
```

1. `-cover`: La función Test Impact Analysis utiliza el procesador de cobertura de código integrado de Go, por lo que debe habilitar la recopilación de cobertura de código en el comando `go test`.

2. `-covermode`: debe ser `count` o `atomic`. Debido a que `set` no es compatible, establecer este valor deshabilita Test Impact Analysis.

3. `-coverpkg`: el análisis de cobertura de código para cada prueba debe configurarse para aplicarse en todas las dependencias del paquete y no solo para el paquete que se está probando. De esta manera, si una dependencia cambia, puede rastrear la prueba afectada por este cambio. Si ejecuta el comando de prueba desde la raíz del proyecto (donde se encuentra el archivo go.mod), puede usar el comodín `./...`. Si no, debe listar manualmente todas las dependencias del paquete separadas por comas (`pattern1, pattern2, pattern3, ...`). Para ello, podría usar el comando `go list ./...` para obtener todos los nombres de los paquetes.

<div class="alert alert-danger">Un valor incorrecto de -coverpkg afecta la capacidad de Test Impact Analysis para rastrear correctamente la cobertura de las pruebas.</div>

## Deshabilitar la omisión para pruebas específicas {#disable-skipping-for-specific-tests}

Puede anular el comportamiento de Test Impact Analysis y evitar que se omitan pruebas específicas. Estas pruebas se denominan pruebas no omitibles.

### ¿Por qué marcar pruebas como no omitibles? {#why-make-tests-unskippable}

Test Impact Analysis utiliza datos de cobertura de código para determinar si las pruebas deben omitirse o no. En algunos casos, estos datos pueden no ser suficientes para determinarlo.

Algunos ejemplos incluyen:

- Pruebas que leen datos de archivos de texto.
- Pruebas que interactúan con APIs fuera del código que se está probando (como APIs REST remotas).
- Designar pruebas como no omitibles garantiza que Test Impact Analysis las ejecute independientemente de los datos de cobertura.

### Marcar pruebas como no omitibles {#marking-tests-as-unskippable}

#### Caso de prueba individual {#individual-test-case}

Agregue el comentario `//dd:test.unskippable` a su caso de prueba para marcarlo como no omitible.

```go
import (
	"testing"
)

//dd:test.unskippable
func TestMyCustomTest(t *testing.T) {
  ...
}

```

#### Conjunto de pruebas {#test-suite}

Agregue el comentario `//dd:suite.unskippable` al principio del archivo para marcarlo como no omitible.

Si un conjunto de pruebas está marcado como no omitible, Test Impact Analysis no puede omitir ninguno de sus casos de prueba.

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

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/continuous_integration/tests/go