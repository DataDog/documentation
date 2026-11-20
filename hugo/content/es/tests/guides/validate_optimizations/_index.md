---
description: Valide que las funciones de Test Optimization (incluyendo Early Flake
  Detection, Auto Test Retries y Flaky Test Management) funcionen correctamente en
  su repositorio.
further_reading:
- link: /tests/guides/setup_new_flaky_pr_gate
  tag: Documentación
  text: Configure un [New Flaky Test PR Gate]
- link: /tests/flaky_tests/early_flake_detection
  tag: Documentación
  text: Obtenga información sobre Early Flake Detection
- link: /tests/flaky_tests/auto_test_retries
  tag: Documentación
  text: Obtenga información sobre Auto Test Retries
- link: /tests/flaky_management
  tag: Documentación
  text: Obtenga información sobre Flaky Test Management
title: Valide Test Optimization
---
Esta página explica cómo verificar que las optimizaciones ofrecidas por [Test Optimization][12] funcionen según lo previsto para **un solo repositorio**. Utilice la validación local para verificar la compatibilidad de la biblioteca y las funciones admitidas, o valide el flujo de trabajo completo en Datadog después de configurar Test Optimization.

<div class="alert alert-warning">Ejecute estas validaciones en una rama de desarrollo de funcionalidades. No fusione las pruebas temporales ni la configuración de servicio dedicada de la opción 2 con su rama predeterminada o principal.</div>

## Requisitos previos {#prerequisites}

Estas optimizaciones requieren una [biblioteca nativa compatible][12]. Las cargas de archivos XML de JUnit no son compatibles.

## Opción 1: Validar localmente con ddtest {#option-1-validate-locally-with-ddtest}

{{< callout url="#" btn_hidden="true" header="¡Únase a la vista previa!" >}}
  La validación local con ddtest está en Preview.
{{< /callout >}}

Utilice [ddtest][15] para verificar Test Optimization localmente. Compara los resultados de las pruebas con y sin instrumentación. Luego utiliza pruebas temporales para verificar las funciones admitidas, incluidas Early Flake Detection, Auto Test Retries y Test Management. La validación utiliza una ingesta local y no requiere una cuenta de Datadog, clave de API ni Datadog Agent. No envía resultados de validación a Datadog ni cambia la configuración de Datadog.

Datadog recomienda utilizar un agente de codificación local para la incorporación y la validación local. El agente sigue las instrucciones de ddtest para configurar la instrumentación, ejecutar la validación, resolver bloqueos y explicar los resultados. Para ejecutar los comandos usted mismo, utilice las [instrucciones manuales](#run-ddtest-yourself).

La validación local admite estos lenguajes y frameworks:

| Lenguaje | Frameworks de pruebas |
| --- | --- |
| JavaScript y TypeScript | Jest, Vitest, Mocha, Playwright, Cypress, Cucumber, WebdriverIO |
| Python | pytest |
| Ruby | RSpec, Minitest |
| Java (Maven o Gradle) | JUnit 4, JUnit 5, TestNG, Spock, Cucumber JVM, Karate, ScalaTest, MUnit |

Consulte la [documentación de ddtest][15] para conocer los requisitos de tiempo de ejecución, la configuración específica de cada framework y las limitaciones de las funciones.

### Instale ddtest {#install-ddtest}

La validación local requiere [ddtest v1.16.0][18] o posterior. Si ddtest ya está instalado, verifique su versión con `ddtest --version` y vuelva a ejecutar el instalador para actualizar.

Instale la versión más reciente en macOS o Linux:

```bash
curl -fsSL https://github.com/DataDog/ddtest/releases/latest/download/install.sh | bash
export PATH="$HOME/.local/bin:$PATH"
```

En Windows, ejecute el instalador en PowerShell:

```powershell
irm https://github.com/DataDog/ddtest/releases/latest/download/install.ps1 | iex
```

Los instaladores verifican la descarga comparándola con las sumas de verificación de la versión. Consulte [instalación de ddtest][17] para la selección de versiones y directorios de instalación personalizados.

### Use un agente de codificación local (recomendado) {#use-a-local-coding-agent-recommended}

Abra una copia de trabajo local del repositorio de Git en un agente de codificación que pueda inspeccionar archivos y ejecutar comandos. Después de instalar ddtest, proporcione este prompt:

```text
Use ddtest to onboard this repository to Test Optimization.
```

Revise los cambios propuestos y proporcione cualquier detalle del entorno solicitado por el agente. El agente ejecuta la validación local e informa los resultados, incluyendo enlaces a informes HTML y cualquier verificación fallida o no validada.

### Ejecute ddtest usted mismo {#run-ddtest-yourself}

#### Paso 1: Inspeccione la configuración de las pruebas {#step-1-inspect-the-test-setup}

Comience con una copia de trabajo local del repositorio de Git. Instale las dependencias de prueba del proyecto y prepare cualquier navegador, base de datos u otros servicios que requieran las pruebas. Luego ejecute:

```bash
ddtest onboard
```

El comando detecta el lenguaje, el framework de pruebas y el proveedor de CI, luego devuelve la siguiente acción de configuración o validación.

Para configuraciones de JavaScript compatibles, obtenga una vista previa de las ediciones de configuración exactas con `--apply`. Por ejemplo:

```bash
ddtest onboard --framework jest --apply
```

Después de revisar las ediciones, agregue `--yes` para aplicarlas y ejecutar la validación local:

```bash
ddtest onboard --framework jest --apply --yes
```

Si la validación tiene éxito, continúe con [Revise los resultados](#step-3-review-the-results).

Para configuraciones sin edición automática, siga las instrucciones de configuración devueltas por `ddtest onboard`. Para imprimir instrucciones detalladas de configuración manual, ejecute `ddtest onboard --instructions`.

Si el repositorio contiene varios frameworks de pruebas o proveedores de CI, seleccione uno explícitamente. Por ejemplo:

```bash
ddtest onboard --framework jest --ci-provider github
```

Use la misma selección para los comandos de validación posteriores. Ejecute la validación por separado para cada framework de pruebas y proveedor de CI que desee verificar.

#### Paso 2: Ejecute la validación local {#step-2-run-local-validation}

Para inspeccionar todas las configuraciones de prueba de CI descubiertas sin instalar un SDK de Datadog ni ejecutar pruebas, ejecute:

```bash
ddtest testdrive --all --check-only
```

Las comprobaciones de configuración por sí solas no validan el comportamiento de las funciones. Ejecute la validación local completa:

```bash
ddtest testdrive --all
```

Revise la vista previa de los comandos y cambios, luego confirme la ejecución. En una terminal no interactiva, agregue `--yes` después de revisar la vista previa.

Para validar un comando de prueba específico, use `--command` en lugar de `--all`. Por ejemplo:

```bash
ddtest testdrive --framework jest --command "npm test"
```

Una comprobación exitosa de un comando no valida otras configuraciones de CI. Resuelva cualquier dependencia faltante, configuración no admitida u otros bloqueos informados por ddtest, luego vuelva a ejecutar la validación.

#### Paso 3: Revise los resultados {#step-3-review-the-results}

Abra el informe HTML vinculado en la salida del comando, normalmente `.testoptimization/report.html`. El `.testoptimization/testdrive.json` correspondiente contiene resultados legibles por máquina. Revise la comparación de referencia, las comprobaciones de funciones y cualquier configuración que permanezca sin validar. La compatibilidad de funciones varía según el framework y el SDK de Datadog; las funciones no compatibles se enumeran en el informe.

Conserve los informes para su revisión y vuelva a ejecutar la validación completa después de cambiar los archivos fuente, las dependencias o los entornos de ejecución. Agregue `.testoptimization/` a `.gitignore` para mantener los informes locales fuera de las confirmaciones.

La validación local verifica el comportamiento de la biblioteca y la configuración de CI. Para validar el procesamiento de Datadog, PR Gates y los flujos de trabajo completos de [Prevention](#step-2-prevention), [Mitigation](#step-3-mitigation) y [Remediation](#step-4-remediation), o para validar un lenguaje o framework no compatible, utilice [Opción 2](#option-2-validate-the-full-workflow).

## Opción 2: Validar el flujo de trabajo completo {#option-2-validate-the-full-workflow}

Este flujo de trabajo de validación comprueba el flujo de trabajo completo de Test Optimization en Datadog. Realice estas validaciones ([Prevención](#step-2-prevention), [Mitigación](#step-3-mitigation) y [Remediación](#step-4-remediation)) en orden, ya que utilizan la misma rama y la prueba.

### Paso 1: Configurar la validación {#step-1-set-up-validation}

Esta guía lo lleva a través de la realización de cambios locales y su confirmación para que la CI los ejecute. Utiliza un servicio de pruebas y una rama dedicados para minimizar el impacto del flujo de trabajo de validación en otros desarrolladores del repositorio.

1. Configure su trabajo de prueba de CI para establecer `DD_SERVICE` antes de que ejecute el comando de prueba:

   ```bash
   export DD_SERVICE=validate-test-optimization
   ```

2. Cree la rama de validación:

   ```bash
   git checkout -b validate-test-optimization
   ```

3. Confirme el cambio de configuración de CI que establece `DD_SERVICE`, luego envíe la rama de validación para activar una ejecución de prueba:

   ```bash
   git add -A
   git commit -m "Configure Test Optimization validation service"
   git push -u origin validate-test-optimization
   ```

   Datadog detecta el `validate-test-optimization`servicio cuando las pruebas se reportan bajo ese nombre.

4. Después de que finalice la CI, vaya a la [configuración de repositorios de CI/CD][3] y seleccione el repositorio que está validando.

   {{< img src="pr_gates/setup/ci_cd_repositories_settings.png" alt="Configuración de repositorios de CI/CD filtrada al repositorio que se está validando" style="width:100%" >}}

5. En la esquina superior derecha del panel deslizante, haga clic en {{< ui >}}Test Service{{< /ui >}}.

   {{< img src="pr_gates/setup/repository_settings_test_services.png" alt="Configuración del repositorio con el botón de servicio de pruebas en la esquina superior derecha" style="width:100%" >}}

6. En {{< ui >}}Test service overrides{{< /ui >}}, seleccione el `validate-test-optimization` servicio.

   {{< img src="pr_gates/setup/test_service_overrides.png" alt="Anulaciones de servicio de pruebas que muestran los servicios de pruebas detectados para un repositorio" style="width:100%" >}}

7. Configure las siguientes anulaciones de servicio de pruebas:
   - Habilite [Early Flake Detection][1].
   - Habilite [Auto Test Retries][4].
   - Deshabilite [Test Impact Analysis][13] (para que no omita la prueba de validación).
8. Regrese a la configuración del repositorio. [Flaky Test Policies][6] se aplican a cada servicio de pruebas en el repositorio, no a un servicio de pruebas individual. Para limitar el impacto de la política de validación, configúrela solo para la rama `validate-test-optimization`. En {{< ui >}}Flaky Test Policies{{< /ui >}}, en el mosaico {{< ui >}}Quarantine{{< /ui >}}, haga clic en {{< ui >}}Configure{{< /ui >}}.

   {{< img src="pr_gates/setup/flaky_test_policies_quarantine.png" alt="Configuración del repositorio que muestra el botón Configurar para la política de pruebas inestables en cuarentena" style="width:100%" >}}

9. Habilite la segunda regla automática: **Si una prueba inestable activa falla en la rama `validate-test-optimization`, muévala a Cuarentena**.

   {{< img src="pr_gates/setup/quarantine_branch_policy.png" alt="Política de cuarentena configurada para pruebas inestables activas en la rama validate-test-optimization" style="width:100%" >}}

10. Haga clic en {{< ui >}}Save{{< /ui >}}. 
11. Cree un [New Flaky Test PR Gate][11] y asígnele el contexto del repositorio que está validando.

   {{< img src="pr_gates/setup/pr_gate_scope.png" alt="Contexto de la nueva puerta de PR para pruebas inestables" style="width:100%" >}}

### Paso 2: Prevención {#step-2-prevention}

[Early Flake Detection][1] detecta nuevas pruebas inestables. [New Flaky Test PR Gates][2] evitan que las nuevas pruebas inestables lleguen a su rama predeterminada.

1. Agregue una prueba que falle en el primer intento y pase en los reintentos (opcionalmente usando el código proporcionado a continuación). El nombre de la prueba debe contener tanto `flaky` como `validation` para que pueda identificarla en Datadog.

   {{< tabs >}}
   {{% tab "JavaScript" %}}

   ```javascript
   const fs = require('node:fs');
   const os = require('node:os');
   const path = require('node:path');

   test('flaky validation test', () => {
       const marker = path.join(os.tmpdir(), 'dd-validation-flaky');
       if (!fs.existsSync(marker)) {
           fs.writeFileSync(marker, '1');
           throw new Error('first attempt fails so Datadog can retry it');
       }
   });
   ```

   {{% /tab %}}
   {{% tab "Python" %}}

   ```python
   from pathlib import Path
   from tempfile import gettempdir


   def test_flaky_validation_test():
       marker = Path(gettempdir()) / "dd-validation-flaky"
       if not marker.exists():
           marker.write_text("1")
           raise AssertionError("first attempt fails so Datadog can retry it")
   ```

   {{% /tab %}}
   {{% tab "Java" %}}

   ```java
   import static org.junit.jupiter.api.Assertions.fail;

   import java.io.IOException;
   import java.nio.file.Files;
   import java.nio.file.Path;
   import java.nio.file.Paths;
   import org.junit.jupiter.api.Test;

   class ValidationFlakyTest {
       @Test
       void flakyValidationTest() throws IOException {
           Path marker = Paths.get(
               System.getProperty("java.io.tmpdir"),
               "dd-validation-flaky"
           );
           if (Files.notExists(marker)) {
               Files.write(marker, new byte[] { '1' });
               fail("first attempt fails so Datadog can retry it");
           }
       }
   }
   ```

   {{% /tab %}}
   {{% tab "Ruby" %}}

   ```ruby
   require 'tmpdir'

   RSpec.describe 'validation flaky tests' do
     it 'flaky validation test' do
       marker = File.join(Dir.tmpdir, 'dd-validation-flaky')
       unless File.exist?(marker)
         File.write(marker, '1')
         raise 'first attempt fails so Datadog can retry it'
       end
     end
   end
   ```

   {{% /tab %}}
   {{% tab ".NET" %}}

   ```csharp
   using System.IO;
   using Xunit;

   public class ValidationFlakyTests
   {
       [Fact]
       public void FlakyValidationTest()
       {
           var marker = Path.Combine(Path.GetTempPath(), "dd-validation-flaky");
           if (!File.Exists(marker))
           {
               File.WriteAllText(marker, "1");
               throw new System.Exception("first attempt fails so Datadog can retry it");
           }
       }
   }
   ```

   {{% /tab %}}
   {{% tab "Go" %}}

   ```go
   package validation

   import (
       "errors"
       "os"
       "path/filepath"
       "testing"
   )

   func TestFlakyValidationTest(t *testing.T) {
       marker := filepath.Join(os.TempDir(), "dd-validation-flaky")
       if _, err := os.Stat(marker); errors.Is(err, os.ErrNotExist) {
           if writeErr := os.WriteFile(marker, []byte("1"), 0600); writeErr != nil {
               t.Fatal(writeErr)
           }
           t.Fatal("first attempt fails so Datadog can retry it")
       }
   }
   ```

   {{% /tab %}}
   {{% tab "Swift" %}}

   ```swift
   import XCTest

   final class ValidationFlakyTests: XCTestCase {
       func testFlakyValidationTest() throws {
           let marker = FileManager.default.temporaryDirectory
               .appendingPathComponent("dd-validation-flaky")
           if !FileManager.default.fileExists(atPath: marker.path) {
               try "1".write(to: marker, atomically: true, encoding: .utf8)
               XCTFail("first attempt fails so Datadog can retry it")
           }
       }
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}

2. Confirme y envíe (push) la prueba, luego abra una solicitud de extracción (pull request) desde la rama de validación:

   ```bash
   git add -A
   git commit -m "Validate Test Optimization prevention"
   git push origin validate-test-optimization
   ```

3. Espere a que se ejecute la CI. La detección temprana de inestabilidad (Early Flake Detection) reintenta la nueva prueba, y la puerta de PR de nueva prueba inestable (New Flaky Test PR Gate) evalúa el resultado. En las verificaciones de GitHub para su solicitud de extracción, confirme que la puerta de PR de nueva prueba inestable (New Flaky Test PR Gate) falle:

   {{< img src="pr_gates/setup/failed_pr_gate.png" alt="La verificación de solicitud de extracción de GitHub fallida porque se detectó una nueva prueba inestable." style="width:100%" >}}

4. Haga clic en la verificación de GitHub fallida y confirme que la prueba esté incluida en la lista de nuevas pruebas inestables:

   {{< img src="pr_gates/setup/pr_gate_detail.png" alt="Vista detallada de la puerta de PR de Datadog" style="width:100%" >}}

5. En [Test Runs][7], confirme que la detección temprana de inestabilidad (Early Flake Detection) reintentó la prueba y la detectó como una nueva prueba inestable usando [esta consulta][7], que utiliza los siguientes filtros:

   - `@test.name:*flaky*validation*`
   - `@git.branch:validate-test-optimization`
   - `@test.retry_reason:early_flake_detection`
   - `@test.test_management.is_new_flaky:true`

### Paso 3: Mitigación {#step-3-mitigation}

La mitigación se logra a través de [Auto Test Retries][4], [Flaky Test Management][5] y [Flaky Test Policies][6]. Estas funciones reintentan las pruebas inestables y ponen en cuarentena las fallas inestables conocidas para que no bloqueen la CI.

1. En la misma prueba que agregó para [Prevención](#step-2-prevention), cambie el nombre del archivo de marcador de `dd-validation-flaky` a `dd-validation-flaky-mitigation`. No cambie el nombre de la función de prueba ni del caso de prueba. El nuevo marcador provoca otra falla intencional en el primer intento. Mantener el nombre de la prueba sin cambios permite que Datadog asocie la ejecución con la prueba inestable detectada durante la [Prevención](#step-2-prevention). No se requiere configuración adicional de Datadog; Auto Test Retries y Flaky Test Management manejan la prueba durante esta ejecución. Actualice la prueba para su idioma:

   {{< tabs >}}
   {{% tab "JavaScript" %}}

   ```javascript
   const fs = require('node:fs');
   const os = require('node:os');
   const path = require('node:path');

   test('flaky validation test', () => {
       // Changed from dd-validation-flaky.
       const marker = path.join(os.tmpdir(), 'dd-validation-flaky-mitigation');
       if (!fs.existsSync(marker)) {
           fs.writeFileSync(marker, '1');
           throw new Error('first attempt fails so Datadog can retry it');
       }
   });
   ```

   {{% /tab %}}
   {{% tab "Python" %}}

   ```python
   from pathlib import Path
   from tempfile import gettempdir


   def test_flaky_validation_test():
       # Changed from dd-validation-flaky.
       marker = Path(gettempdir()) / "dd-validation-flaky-mitigation"
       if not marker.exists():
           marker.write_text("1")
           raise AssertionError("first attempt fails so Datadog can retry it")
   ```

   {{% /tab %}}
   {{% tab "Java" %}}

   ```java
   import static org.junit.jupiter.api.Assertions.fail;

   import java.io.IOException;
   import java.nio.file.Files;
   import java.nio.file.Path;
   import java.nio.file.Paths;
   import org.junit.jupiter.api.Test;

   class ValidationFlakyTest {
       @Test
       void flakyValidationTest() throws IOException {
           // Changed from dd-validation-flaky.
           Path marker = Paths.get(
               System.getProperty("java.io.tmpdir"),
               "dd-validation-flaky-mitigation"
           );
           if (Files.notExists(marker)) {
               Files.write(marker, new byte[] { '1' });
               fail("first attempt fails so Datadog can retry it");
           }
       }
   }
   ```

   {{% /tab %}}
   {{% tab "Ruby" %}}

   ```ruby
   require 'tmpdir'

   RSpec.describe 'validation flaky tests' do
     it 'flaky validation test' do
       # Changed from dd-validation-flaky.
       marker = File.join(Dir.tmpdir, 'dd-validation-flaky-mitigation')
       unless File.exist?(marker)
         File.write(marker, '1')
         raise 'first attempt fails so Datadog can retry it'
       end
     end
   end
   ```

   {{% /tab %}}
   {{% tab ".NET" %}}

   ```csharp
   using System.IO;
   using Xunit;

   public class ValidationFlakyTests
   {
       [Fact]
       public void FlakyValidationTest()
       {
           // Changed from dd-validation-flaky.
           var marker = Path.Combine(Path.GetTempPath(), "dd-validation-flaky-mitigation");
           if (!File.Exists(marker))
           {
               File.WriteAllText(marker, "1");
               throw new System.Exception("first attempt fails so Datadog can retry it");
           }
       }
   }
   ```

   {{% /tab %}}
   {{% tab "Go" %}}

   ```go
   package validation

   import (
       "errors"
       "os"
       "path/filepath"
       "testing"
   )

   func TestFlakyValidationTest(t *testing.T) {
       // Changed from dd-validation-flaky.
       marker := filepath.Join(os.TempDir(), "dd-validation-flaky-mitigation")
       if _, err := os.Stat(marker); errors.Is(err, os.ErrNotExist) {
           if writeErr := os.WriteFile(marker, []byte("1"), 0600); writeErr != nil {
               t.Fatal(writeErr)
           }
           t.Fatal("first attempt fails so Datadog can retry it")
       }
   }
   ```

   {{% /tab %}}
   {{% tab "Swift" %}}

   ```swift
   import XCTest

   final class ValidationFlakyTests: XCTestCase {
       func testFlakyValidationTest() throws {
           // Changed from dd-validation-flaky.
           let marker = FileManager.default.temporaryDirectory
               .appendingPathComponent("dd-validation-flaky-mitigation")
           if !FileManager.default.fileExists(atPath: marker.path) {
               try "1".write(to: marker, atomically: true, encoding: .utf8)
               XCTFail("first attempt fails so Datadog can retry it")
           }
       }
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}

2. Confirme y envíe (push) el cambio en la misma rama:

   ```bash
   git add -A
   git commit -m "Validate Test Optimization mitigation"
   git push origin validate-test-optimization
   ```

3. Espere a que se ejecute la CI y, a continuación, confirme los siguientes resultados:

   - En [Test Runs][8], Auto Test Retries vuelve a ejecutar la prueba después de su primer intento fallido, y la prueba pasa en el reintento. Utilice [esta consulta][8], con los siguientes filtros:
     - `@test.name:*flaky*validation*`
     - `@git.branch:validate-test-optimization`
     - `@test.retry_reason:auto_test_retry`
   - En [Flaky Test Management][9], la prueba aparece como {{< ui >}}QUARANTINED{{< /ui >}}. Sus fallos ya no bloquean el trabajo de prueba. Utilice [esta consulta][9], con los siguientes filtros:
     - `@test.name:*flaky*validation*`
     - `first_flaked_branch:validate-test-optimization`
     - `flaky_test_state:quarantined`

### Paso 4: Remediación {#step-4-remediation}

Test Optimization ayuda a corregir pruebas inestables mediante Attempt to Fix y [correcciones de pruebas inestables con Bits AI][16]. Esta sección valida el flujo de trabajo Attempt to Fix corrigiendo la misma prueba utilizada para [Prevención](#step-2-prevention) y [Mitigación](#step-3-mitigation).

1. En [Flaky Test Management][9], abra la prueba de validación en cuarentena.
2. Haga clic en {{< ui >}}Actions{{< /ui >}}, seleccione {{< ui >}}Link commit to fix{{< /ui >}} y copie la clave generada (comienza con `DD_`).

   {{< img src="pr_gates/setup/attempt_to_fix_modal.png" alt="Modal de Attempt to Fix" style="width:50%" >}}

3. Reemplace la prueba inestable con la versión aprobada para su idioma:

   {{< tabs >}}
   {{% tab "JavaScript" %}}

   ```javascript
   test('flaky validation test', () => {
       expect(true).toBe(true);
   });
   ```

   {{% /tab %}}
   {{% tab "Python" %}}

   ```python
   def test_flaky_validation_test():
       assert True
   ```

   {{% /tab %}}
   {{% tab "Java" %}}

   ```java
   @Test
   void flakyValidationTest() {
       // intentionally empty - the test passes
   }
   ```

   {{% /tab %}}
   {{% tab "Ruby" %}}

   ```ruby
   it 'flaky validation test' do
     expect(true).to be(true)
   end
   ```

   {{% /tab %}}
   {{% tab ".NET" %}}

   ```csharp
   [Fact]
   public void FlakyValidationTest()
   {
       Assert.True(true);
   }
   ```

   {{% /tab %}}
   {{% tab "Go" %}}

   ```go
   func TestFlakyValidationTest(t *testing.T) {
   }
   ```

   {{% /tab %}}
   {{% tab "Swift" %}}

   ```swift
   func testFlakyValidationTest() {
       XCTAssertTrue(true)
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}

4. Confirme la corrección con la clave generada en el cuerpo de la confirmación. Reemplace `<YOUR_DD_KEY>` con la clave que copió:

   ```bash
   git add -A
   git commit -m "Fix flaky validation test" -m "<YOUR_DD_KEY>"
   git push origin validate-test-optimization
   ```

5. Espere a que finalice la CI y, a continuación, confirme los siguientes resultados:

   - En [Test Runs][10], Attempt to Fix volvió a intentar el candidato a corrección y todos los intentos fueron exitosos. Utilice [esta consulta][10], que tiene los siguientes filtros:
     - `@test.name:*flaky*validation*`
     - `@git.branch:validate-test-optimization`
     - `@test.test_management.is_attempt_to_fix:true`
   - En [Flaky Test Management][14], la prueba está marcada como {{< ui >}}Fix in progress{{< /ui >}}. Utilice [esta consulta][14], que tiene los siguientes filtros:
     - `@test.name:*flaky*validation*`
     - `first_flaked_branch:validate-test-optimization`
     - `fix_in_progress:true`

### Paso 5: Limpieza posterior a la validación {#step-5-post-validation-cleanup}

1. Cierre la solicitud de extracción sin fusionar.
2. Elimine la rama `validate-test-optimization`. La regla automática de cuarentena específica de la rama ya no se aplica después de que se elimina la rama, y el servicio de validación dedicado ya no recibe ejecuciones de prueba.
3. Notifique al equipo propietario del repositorio que el [New Flaky Test PR Gate][2] permanece activo para todo el repositorio. La puerta no es bloqueante de forma predeterminada.
4. Opcionalmente, habilite las funciones de Test Optimization configuradas para el servicio `validate-test-optimization` a nivel de repositorio.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tests/flaky_tests/early_flake_detection
[2]: /es/tests/guides/setup_new_flaky_pr_gate
[3]: https://app.datadoghq.com/ci/settings/ci-cd/repositories?tab=repository
[4]: /es/tests/flaky_tests/auto_test_retries
[5]: /es/tests/flaky_management
[6]: /es/tests/flaky_management/#configure-policies-to-automate-the-flaky-test-lifecycle
[7]: https://app.datadoghq.com/ci/test/runs?query=test_level%3Atest%20%40test.name%3A%2Aflaky%2Avalidation%2A%20%40git.branch%3Avalidate-test-optimization%20%40test.retry_reason%3Aearly_flake_detection%20%40test.test_management.is_new_flaky%3Atrue
[8]: https://app.datadoghq.com/ci/test/runs?query=test_level%3Atest%20%40test.name%3A%2Aflaky%2Avalidation%2A%20%40git.branch%3Avalidate-test-optimization%20%40test.retry_reason%3Aauto_test_retry
[9]: https://app.datadoghq.com/ci/test/flaky/explorer?query=%40test.name%3A%2Aflaky%2Avalidation%2A%20first_flaked_branch%3Avalidate-test-optimization%20flaky_test_state%3Aquarantined
[10]: https://app.datadoghq.com/ci/test/runs?query=test_level%3Atest%20%40test.name%3A%2Aflaky%2Avalidation%2A%20%40git.branch%3Avalidate-test-optimization%20%40test.test_management.is_attempt_to_fix%3Atrue
[11]: https://app.datadoghq.com/ci/pr-gates/rule/create?dataSource=test_optimization
[12]: /es/tests/
[13]: /es/tests/test_impact_analysis/
[14]: https://app.datadoghq.com/ci/test/flaky/explorer?query=%40test.name%3A%2Aflaky%2Avalidation%2A%20first_flaked_branch%3Avalidate-test-optimization%20fix_in_progress%3Atrue
[15]: https://github.com/DataDog/ddtest#try-test-optimization-locally
[16]: /es/tests/flaky_management/#bits-ai-powered-flaky-test-fixes
[17]: https://github.com/DataDog/ddtest#installation
[18]: https://github.com/DataDog/ddtest/releases/tag/v1.16.0