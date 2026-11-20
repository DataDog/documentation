---
description: Validez que les fonctionnalités Test Optimization — incluant Early Flake
  Detection, Auto Test Retries et Flaky Test Management — fonctionnent correctement
  dans votre dépôt.
further_reading:
- link: /tests/guides/setup_new_flaky_pr_gate
  tag: Documentation
  text: Configurez un New Flaky Test PR Gate.
- link: /tests/flaky_tests/early_flake_detection
  tag: Documentation
  text: En savoir plus sur Early Flake Detection.
- link: /tests/flaky_tests/auto_test_retries
  tag: Documentation
  text: En savoir plus sur Auto Test Retries.
- link: /tests/flaky_management
  tag: Documentation
  text: En savoir plus sur la Gestion des tests irréguliers
title: Validez les optimisations.
---
Cette page explique comment vérifier que les optimisations offertes par [Test Optimization][12] fonctionnent comme prévu pour un **dépôt unique**. Utilisez la validation locale pour vérifier la compatibilité des bibliothèques et les fonctionnalités prises en charge, ou validez le workflow complet dans Datadog après avoir configuré Test Optimization.

<div class="alert alert-warning">Exécutez ces validations dans une branche de fonctionnalité. Ne fusionnez pas les tests temporaires ou la configuration de service dédiée de l'Option 2 dans votre branche par défaut ou principale.</div>

## Prérequis {#prerequisites}

Ces optimisations nécessitent une [bibliothèque native prise en charge][12]. Les téléchargements de fichiers XML JUnit ne sont pas pris en charge.

## Option 1 : Validez localement avec ddtest {#option-1-validate-locally-with-ddtest}

{{< callout url="#" btn_hidden="true" header="Rejoignez la Preview !" >}}
  La validation locale avec ddtest est en préversion.
{{< /callout >}}

Utilisez [ddtest][15] pour vérifier Test Optimization localement. Il compare les résultats des tests avec et sans instrumentation. Il utilise ensuite des tests temporaires pour vérifier les fonctionnalités prises en charge, notamment Early Flake Detection, Auto Test Retries et Test Management. La validation utilise un point de réception local et ne nécessite ni compte Datadog, ni clé d'API, ni Datadog Agent. Elle n'envoie pas les résultats de validation à Datadog et ne modifie pas les paramètres Datadog.

Datadog recommande d'utiliser un agent de codage local pour la mise en place et la validation locale. L'agent suit les instructions de ddtest pour configurer l'instrumentation, exécuter la validation, résoudre les blocages et expliquer les résultats. Pour exécuter les commandes vous-même, utilisez les [instructions manuelles](#run-ddtest-yourself).

La validation locale prend en charge ces langages et frameworks :

| Langage | Frameworks de test |
| --- | --- |
| JavaScript et TypeScript | Jest, Vitest, Mocha, Playwright, Cypress, Cucumber, WebdriverIO |
| Python | pytest |
| Ruby | RSpec, Minitest |
| Java (Maven ou Gradle) | JUnit 4, JUnit 5, TestNG, Spock, Cucumber JVM, Karate, ScalaTest, MUnit |

Consultez la [documentation ddtest][15] pour connaître les exigences d'exécution, la configuration spécifique au framework et les limitations des fonctionnalités.

### Installez ddtest {#install-ddtest}

La validation locale nécessite [ddtest v1.16.0][18] ou une version ultérieure. Si ddtest est déjà installé, vérifiez sa version avec `ddtest --version` et relancez l'installateur pour effectuer la mise à niveau.

Installez la dernière version sur macOS ou Linux :

```bash
curl -fsSL https://github.com/DataDog/ddtest/releases/latest/download/install.sh | bash
export PATH="$HOME/.local/bin:$PATH"
```

Sur Windows, exécutez l'installateur dans PowerShell :

```powershell
irm https://github.com/DataDog/ddtest/releases/latest/download/install.ps1 | iex
```

Les installateurs vérifient le téléchargement par rapport aux sommes de contrôle de la version. Consultez [l'installation de ddtest][17] pour la sélection de la version et les répertoires d'installation personnalisés.

### Utilisez un agent de codage local (recommandé) {#use-a-local-coding-agent-recommended}

Ouvrez une copie locale Git du dépôt dans un agent de codage capable d'inspecter les fichiers et d'exécuter des commandes. Après avoir installé ddtest, fournissez cette invite :

```text
Use ddtest to onboard this repository to Test Optimization.
```

Examinez les modifications proposées et fournissez tous les détails d'environnement demandés par l'agent. L'agent exécute la validation locale et rapporte les résultats, y compris les liens vers les rapports HTML et toutes les vérifications ayant échoué ou non validées.

### Exécutez ddtest vous-même {#run-ddtest-yourself}

#### Étape 1 : Inspectez la configuration des tests {#step-1-inspect-the-test-setup}

Commencez à partir d'une copie locale Git du dépôt. Installez les dépendances de test du projet et préparez tous les navigateurs, bases de données ou autres services requis par les tests. Exécutez ensuite :

```bash
ddtest onboard
```

La commande détecte le langage, le framework de test et le fournisseur CI, puis renvoie l'action de configuration ou de validation suivante.

Pour les configurations JavaScript prises en charge, prévisualisez les modifications exactes de configuration avec `--apply`. Par exemple :

```bash
ddtest onboard --framework jest --apply
```

Après avoir examiné les modifications, ajoutez `--yes` pour les appliquer et exécutez la validation locale :

```bash
ddtest onboard --framework jest --apply --yes
```

Si la validation réussit, passez à [Examiner les résultats](#step-3-review-the-results).

Pour les configurations sans édition automatique, suivez les instructions de configuration renvoyées par `ddtest onboard`. Pour afficher des instructions de configuration manuelle détaillées, exécutez `ddtest onboard --instructions`.

Si le dépôt contient plusieurs frameworks ou fournisseurs CI, sélectionnez-en un explicitement. Par exemple :

```bash
ddtest onboard --framework jest --ci-provider github
```

Utilisez la même sélection pour les commandes de validation ultérieures. Exécutez la validation séparément pour chaque framework et fournisseur CI que vous souhaitez vérifier.

#### Étape 2 : Exécutez la validation locale {#step-2-run-local-validation}

Pour inspecter toutes les configurations de test CI découvertes sans installer de SDK Datadog ni exécuter de tests, exécutez :

```bash
ddtest testdrive --all --check-only
```

Les vérifications de configuration seules ne valident pas le comportement des fonctionnalités. Exécutez la validation locale complète :

```bash
ddtest testdrive --all
```

Examinez l'aperçu des commandes et des modifications, puis confirmez l'exécution. Dans un terminal non interactif, ajoutez `--yes` après avoir examiné l'aperçu.

Pour valider une commande de test spécifique, utilisez `--command` au lieu de `--all`. Par exemple :

```bash
ddtest testdrive --framework jest --command "npm test"
```

Une vérification réussie d'une commande ne valide pas les autres configurations CI. Résolvez toute dépendance manquante, configuration non prise en charge ou autre blocage signalé par ddtest, puis relancez la validation.

#### Étape 3 : Examinez les résultats {#step-3-review-the-results}

Ouvrez le rapport HTML lié dans la sortie de la commande, généralement `.testoptimization/report.html`. Le `.testoptimization/testdrive.json` correspondant contient des résultats lisibles par machine. Examinez la comparaison de référence, les vérifications des fonctionnalités et toutes les configurations qui restent non validées. La prise en charge des fonctionnalités varie selon le framework et le SDK Datadog ; les fonctionnalités non prises en charge sont listées dans le rapport.

Conservez les rapports pour examen et relancez une validation complète après avoir modifié les fichiers sources, les dépendances ou les runtimes. Ajoutez `.testoptimization/` à `.gitignore` pour exclure les rapports locaux des commits.

La validation locale vérifie le comportement de la bibliothèque et la configuration CI. Pour valider le traitement Datadog, les PR Gates et les workflows complets de [Prevention](#step-2-prevention), [Mitigation](#step-3-mitigation) et [Remediation](#step-4-remediation), ou pour valider un langage ou un framework non pris en charge, utilisez [Option 2](#option-2-validate-the-full-workflow).

## Option 2 : Valider le workflow complet {#option-2-validate-the-full-workflow}

Ce workflow de validation vérifie le workflow Test Optimization complet dans Datadog. Effectuez ces validations ([Prévention](#step-2-prevention), [Atténuation](#step-3-mitigation) et [Remédiation](#step-4-remediation)) dans l'ordre, car elles utilisent la même branche et le même test.

### Étape 1 : Configurer la validation {#step-1-set-up-validation}

Ce guide vous accompagne dans la réalisation de modifications locales et leur validation pour l'exécution de la CI. Il utilise un service de test et une branche dédiés afin de minimiser l'impact du workflow de validation sur les autres développeurs du dépôt.

1. Configurez votre job de test CI pour définir `DD_SERVICE` avant l'exécution de la commande de test :

   ```bash
   export DD_SERVICE=validate-test-optimization
   ```

2. Créez la branche de validation :

   ```bash
   git checkout -b validate-test-optimization
   ```

3. Validez la modification de configuration CI qui définit `DD_SERVICE`, puis poussez la branche de validation pour déclencher une exécution de test :

   ```bash
   git add -A
   git commit -m "Configure Test Optimization validation service"
   git push -u origin validate-test-optimization
   ```

   Datadog détecte le service `validate-test-optimization` lorsque les tests sont signalés sous ce nom.

4. Une fois l'intégration continue terminée, accédez aux [paramètres des dépôts CI/CD][3] et sélectionnez le dépôt que vous validez.

   {{< img src="pr_gates/setup/ci_cd_repositories_settings.png" alt="Paramètres des dépôts CI/CD filtrés sur le dépôt en cours de validation" style="width:100%" >}}

5. Dans le coin supérieur droit du panneau coulissant, cliquez sur {{< ui >}}Test Service{{< /ui >}}.

   {{< img src="pr_gates/setup/repository_settings_test_services.png" alt="Paramètres du dépôt avec le bouton Test Service dans le coin supérieur droit." style="width:100%" >}}

6. Dans {{< ui >}}Test service overrides{{< /ui >}}, sélectionnez le service `validate-test-optimization`.

   {{< img src="pr_gates/setup/test_service_overrides.png" alt="Remplacements du Test Service affichant les services de test détectés pour un dépôt." style="width:100%" >}}

7. Configurez les remplacements de service suivants :
   - Activez [Early Flake Detection][1].
   - Activez [Auto Test Retries][4].
   - Désactivez [Test Impact Analysis][13] (afin qu'il ne passe pas à côté du test de validation).
8. Retournez aux paramètres du dépôt. Les [Flaky Test Policies][6] s'appliquent à chaque service de test du dépôt, et non à un service de test individuel. Pour limiter l'impact de la politique de validation, configurez-la uniquement pour la branche `validate-test-optimization`. Sous {{< ui >}}Flaky Test Policies{{< /ui >}}, sur la tuile {{< ui >}}Quarantine{{< /ui >}}, cliquez sur {{< ui >}}Configure{{< /ui >}}.

   {{< img src="pr_gates/setup/flaky_test_policies_quarantine.png" alt="Paramètres du dépôt affichant le bouton Configurer pour la politique Quarantine flaky test." style="width:100%" >}}

9. Activez la deuxième règle automatique : **Si un Active flaky test échoue dans la branche `validate-test-optimization`, alors déplacez-le vers Quarantined**.

   {{< img src="pr_gates/setup/quarantine_branch_policy.png" alt="Politique Quarantine configurée pour les Active flaky tests sur la branche validate-test-optimization." style="width:100%" >}}

10. Cliquez sur {{< ui >}}Save{{< /ui >}}. 
11. Créez un [New Flaky Test PR Gate][11] et limitez-le au dépôt que vous validez.

   {{< img src="pr_gates/setup/pr_gate_scope.png" alt="Périmètre du New Flaky Test PR Gate." style="width:100%" >}}

### Étape 2 : Prevention {#step-2-prevention}

[Early Flake Detection][1] détecte les nouveaux tests instables. [New Flaky Test PR Gates][2] les empêchent d'atteindre votre branche par défaut.

1. Ajoutez un test qui échoue à la première tentative et réussit lors des nouvelles tentatives (en utilisant éventuellement le code fourni ci-dessous). Le nom du test doit contenir à la fois `flaky` et `validation` afin que vous puissiez l'identifier dans Datadog.

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

2. Commitez et poussez le test, puis ouvrez une pull request depuis la branche de validation :

   ```bash
   git add -A
   git commit -m "Validate Test Optimization prevention"
   git push origin validate-test-optimization
   ```

3. Attendez que la CI s'exécute. Early Flake Detection relance le nouveau test, et le New Flaky Test PR Gate évalue le résultat. Dans les checks GitHub de votre pull request, confirmez que le New Flaky Test PR Gate échoue :

   {{< img src="pr_gates/setup/failed_pr_gate.png" alt="Check de la pull request GitHub échouant car un nouveau test instable est détecté" style="width:100%" >}}

4. Cliquez sur le check GitHub en échec et confirmez que le test est inclus dans la liste des nouveaux tests instables :

   {{< img src="pr_gates/setup/pr_gate_detail.png" alt="Vue détaillée de la porte de PR Datadog" style="width:100%" >}}

5. Dans [Test Runs][7], confirmez qu'Early Flake Detection a relancé le test et l'a détecté comme un nouveau test instable en utilisant [cette requête][7], qui utilise les filtres suivants :

   - `@test.name:*flaky*validation*`
   - `@git.branch:validate-test-optimization`
   - `@test.retry_reason:early_flake_detection`
   - `@test.test_management.is_new_flaky:true`

### Étape 3 : Mitigation {#step-3-mitigation}

La mitigation est obtenue grâce à [Auto Test Retries][4], [Flaky Test Management][5] et [Flaky Test Policies][6]. Ces fonctionnalités relancent les tests instables et mettent en quarantaine les échecs instables connus afin qu'ils ne bloquent pas l'intégration continue (CI).

1. Dans le même test que celui ajouté pour la [Prévention](#step-2-prevention), remplacez le nom de fichier du marqueur `dd-validation-flaky` par `dd-validation-flaky-mitigation`. Ne renommez pas la fonction de test ou le cas de test. Le nouveau marqueur provoque un autre échec intentionnel lors de la première tentative. Le maintien du nom de test inchangé permet à Datadog d'associer l'exécution au test instable détecté lors de la [Prévention](#step-2-prevention). Aucune configuration Datadog supplémentaire n'est requise ; [Auto Test Retries] et [Flaky Test Management] prennent en charge le test lors de cette exécution. Mettez à jour le test pour votre langage :

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

2. Commitez et poussez la modification sur la même branche :

   ```bash
   git add -A
   git commit -m "Validate Test Optimization mitigation"
   git push origin validate-test-optimization
   ```

3. Attendez l'exécution de l'intégration continue (CI), puis confirmez les résultats suivants :

   - Dans [Test Runs][8], [Auto Test Retries] relance le test après son premier échec, et le test réussit lors de la nouvelle tentative. Utilisez [cette requête][8], avec les filtres suivants :
     - `@test.name:*flaky*validation*`
     - `@git.branch:validate-test-optimization`
     - `@test.retry_reason:auto_test_retry`
   - Dans [Flaky Test Management][9], le test apparaît comme {{< ui >}}QUARANTINED{{< /ui >}}. Ses échecs ne bloquent plus le job de test. Utilisez [cette requête][9], avec les filtres suivants :
     - `@test.name:*flaky*validation*`
     - `first_flaked_branch:validate-test-optimization`
     - `flaky_test_state:quarantined`

### Étape 4 : Remediation {#step-4-remediation}

Test Optimization aide à remédier aux flaky tests grâce à Attempt to Fix et aux [Bits AI-powered flaky test fixes][16]. Cette section valide le workflow Attempt to Fix en corrigeant le même test utilisé pour [Prevention](#step-2-prevention) et [Mitigation](#step-3-mitigation).

1. Dans [Flaky Test Management][9], ouvrez le test de validation mis en quarantaine.
2. Cliquez sur {{< ui >}}Actions{{< /ui >}}, sélectionnez {{< ui >}}Link commit to fix{{< /ui >}} et copiez la clé générée (elle commence par `DD_`).

   {{< img src="pr_gates/setup/attempt_to_fix_modal.png" alt="Modale Attempt to Fix." style="width:50%" >}}

3. Remplacez le flaky test par la version réussie pour votre langage :

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

4. Commitez la correction avec la clé générée dans le corps du commit. Remplacez `<YOUR_DD_KEY>` par la clé que vous avez copiée :

   ```bash
   git add -A
   git commit -m "Fix flaky validation test" -m "<YOUR_DD_KEY>"
   git push origin validate-test-optimization
   ```

5. Attendez la fin de l'intégration continue (CI), puis confirmez les résultats suivants :

   - Dans [Test Runs][10], [Attempt to Fix] a relancé le fix candidate, et chaque tentative a réussi. Utilisez [cette requête][10], qui comporte les filtres suivants :
     - `@test.name:*flaky*validation*`
     - `@git.branch:validate-test-optimization`
     - `@test.test_management.is_attempt_to_fix:true`
   - Dans [Flaky Test Management][14], le test est marqué {{< ui >}}Fix in progress{{< /ui >}}. Utilisez [cette requête][14], qui comporte les filtres suivants :
     - `@test.name:*flaky*validation*`
     - `first_flaked_branch:validate-test-optimization`
     - `fix_in_progress:true`

### Étape 5 : Nettoyage post-validation {#step-5-post-validation-cleanup}

1. Fermez le pull request sans le fusionner.
2. Supprimez la `validate-test-optimization`branche. La règle automatique Quarantine spécifique à la branche ne s'applique plus une fois la branche supprimée, et le service de validation dédié ne reçoit plus d'exécutions de test.
3. Informez l'équipe propriétaire du dépôt que le [New Flaky Test PR Gate][2] reste actif pour l'ensemble du dépôt. La gate est non-blocking par défaut.
4. Optionnellement, activez les fonctionnalités Test Optimization configurées pour le `validate-test-optimization` service au niveau du dépôt.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tests/flaky_tests/early_flake_detection
[2]: /fr/tests/guides/setup_new_flaky_pr_gate
[3]: https://app.datadoghq.com/ci/settings/ci-cd/repositories?tab=repository
[4]: /fr/tests/flaky_tests/auto_test_retries
[5]: /fr/tests/flaky_management
[6]: /fr/tests/flaky_management/#configure-policies-to-automate-the-flaky-test-lifecycle
[7]: https://app.datadoghq.com/ci/test/runs?query=test_level%3Atest%20%40test.name%3A%2Aflaky%2Avalidation%2A%20%40git.branch%3Avalidate-test-optimization%20%40test.retry_reason%3Aearly_flake_detection%20%40test.test_management.is_new_flaky%3Atrue
[8]: https://app.datadoghq.com/ci/test/runs?query=test_level%3Atest%20%40test.name%3A%2Aflaky%2Avalidation%2A%20%40git.branch%3Avalidate-test-optimization%20%40test.retry_reason%3Aauto_test_retry
[9]: https://app.datadoghq.com/ci/test/flaky/explorer?query=%40test.name%3A%2Aflaky%2Avalidation%2A%20first_flaked_branch%3Avalidate-test-optimization%20flaky_test_state%3Aquarantined
[10]: https://app.datadoghq.com/ci/test/runs?query=test_level%3Atest%20%40test.name%3A%2Aflaky%2Avalidation%2A%20%40git.branch%3Avalidate-test-optimization%20%40test.test_management.is_attempt_to_fix%3Atrue
[11]: https://app.datadoghq.com/ci/pr-gates/rule/create?dataSource=test_optimization
[12]: /fr/tests/
[13]: /fr/tests/test_impact_analysis/
[14]: https://app.datadoghq.com/ci/test/flaky/explorer?query=%40test.name%3A%2Aflaky%2Avalidation%2A%20first_flaked_branch%3Avalidate-test-optimization%20fix_in_progress%3Atrue
[15]: https://github.com/DataDog/ddtest#try-test-optimization-locally
[16]: /fr/tests/flaky_management/#bits-ai-powered-flaky-test-fixes
[17]: https://github.com/DataDog/ddtest#installation
[18]: https://github.com/DataDog/ddtest/releases/tag/v1.16.0