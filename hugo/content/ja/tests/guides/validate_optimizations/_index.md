---
description: Early Flake Detection、Auto Test Retries、Flaky Test Management を含む Test
  Optimization 機能がリポジトリで正しく動作していることを検証します。
further_reading:
- link: /tests/guides/setup_new_flaky_pr_gate
  tag: ドキュメント
  text: 新しい Flaky Test PR Gate をセットアップする
- link: /tests/flaky_tests/early_flake_detection
  tag: ドキュメント
  text: Early Flake Detection について
- link: /tests/flaky_tests/auto_test_retries
  tag: ドキュメント
  text: Auto Test Retries について
- link: /tests/flaky_management
  tag: ドキュメント
  text: 不安定なテストの管理について
title: 最適化を検証する
---
このページでは、Test Optimization が提供する最適化が意図した通りに機能しているかをチェックする方法を説明します。このガイドは、[Test Optimization][12] が検証対象のリポジトリですでに機能していることを前提としており、**単一のリポジトリ**の最適化を検証する手順を示しています。

<div class="alert alert-warning">これらの検証はフィーチャーブランチでのみ実行し、デフォルトブランチやメインブランチにはマージしないでください。</div>

## 前提条件 {#prerequisites}

これらの最適化には、[サポートされているネイティブライブラリ][12] が必要です。JUnit XML のアップロードはサポートされていません。

## オプション 1: コーディングエージェントを使用してローカルで検証する {#option-1-validate-locally-with-a-coding-agent}

{{< callout url="#" btn_hidden="true" header="プレビューに参加しましょう。" >}}
  ローカルコーディングエージェントによる検証はプレビュー版であり、npm [`dd-trace` パッケージ][15]を使用する JavaScript および TypeScript プロジェクトのみをサポートしています。
  
  [15]: https://www.npmjs.com/package/dd-trace
{{< /callout >}}

以下のプロンプトを使用して、インストール済みの `dd-trace` パッケージを検査し、Test Optimization 検証ランブックを実行するようローカルコーディングエージェント (ローカルリポジトリ内の検査やコマンドの実行が可能な AI アシスタント) に依頼してください。この方法により、ローカルライブラリの互換性と CI 構成をチェックします。また、Datadog の設定を変更したり、検証結果を Datadog に送信したりすることなく、Early Flake Detection、Auto Test Retries、Test Management をチェックします。

ランブックは、インストールされた `ci/runbook.md` パッケージルートから見て `dd-trace` にあります。

このプロンプトをローカルコーディングエージェントに渡します。

```text
Locate the installed dd-trace package, then read and execute its ci/runbook.md.
```

このコーディングエージェントによる方法はローカルチェックであり、Datadog のワークフロー全体を実行するものではありません。[Prevention](#step-2-prevention)、[Mitigation](#step-3-mitigation)、[Remediation](#step-4-remediation) のワークフロー全体を検証する場合、または JavaScript や TypeScript 以外の言語を検証する場合は、以下の[オプション 2](#option-2-validate-the-full-workflow) を使用してください。

## オプション 2: ワークフロー全体を検証する {#option-2-validate-the-full-workflow}

この検証ワークフローは、Datadog における Test Optimization ワークフロー全体をチェックします。これらの検証 ([Prevention](#step-2-prevention)、[Mitigation](#step-3-mitigation)、および [Remediation](#step-4-remediation)) は同じブランチとテストを使用するため、順番に実行してください。

### ステップ 1: 検証をセットアップする {#step-1-set-up-validation}

このガイドでは、ローカルでの変更と、CI で実行するためのコミットの手順を説明します。リポジトリ内の他の開発者への検証ワークフローの影響を最小限に抑えるため、専用のテストサービスとブランチを使用します。

1. テストコマンドを実行する前に、`DD_SERVICE` を設定するために CI テストジョブを構成します。

   ```bash
   export DD_SERVICE=validate-test-optimization
   ```

2. 検証ブランチを作成します。

   ```bash
   git checkout -b validate-test-optimization
   ```

3. `DD_SERVICE` を設定する CI 構成の変更をコミットし、検証ブランチをプッシュしてテスト実行をトリガーします。

   ```bash
   git add -A
   git commit -m "Configure Test Optimization validation service"
   git push -u origin validate-test-optimization
   ```

   テストがその名前で報告されると、Datadog は `validate-test-optimization` サービスを検出します。

4. CI が完了したら、[CI/CD リポジトリ設定][3] に移動し、検証対象のリポジトリを選択します。

   {{< img src="pr_gates/setup/ci_cd_repositories_settings.png" alt="検証対象のリポジトリでフィルタリングされた CI/CD リポジトリ設定" style="width:100%" >}}

5. スライドアウトパネルの右上隅にある {{< ui >}}Test Service{{< /ui >}} をクリックします。

   {{< img src="pr_gates/setup/repository_settings_test_services.png" alt="右上隅にテストサービスボタンがあるリポジトリ設定" style="width:100%" >}}

6. {{< ui >}}Test service overrides{{< /ui >}} で、`validate-test-optimization` サービスを選択します。

   {{< img src="pr_gates/setup/test_service_overrides.png" alt="リポジトリで検出されたテストサービスを表示するテストサービスオーバーライド" style="width:100%" >}}

7. 以下のサービスオーバーライドを構成します。
   - [Early Flake Detection][1] を有効にします。
   - [Auto Test Retrries][4] を有効にします。
   - [Test Impact Analysis][13] を無効にします (検証テストがスキップされないようにするため)。
8. リポジトリ設定に戻ります。[Flaky Test Policies][6] は、個々のテストサービスではなく、リポジトリ内のすべてのテストサービスに適用されます。検証ポリシーの影響を制限するには、`validate-test-optimization` ブランチに対してのみ構成してください。{{< ui >}}Flaky Test Policies{{< /ui >}} の {{< ui >}}Quarantine{{< /ui >}} タイルで、{{< ui >}}Configure{{< /ui >}} をクリックします。

   {{< img src="pr_gates/setup/flaky_test_policies_quarantine.png" alt="Quarantine の不安定なテストポリシーの [構成] ボタンを表示するリポジトリ設定" style="width:100%" >}}

9. 2 番目の自動ルールを有効にします。**`validate-test-optimization` ブランチでアクティブの不安定なテストが発生した場合、Quarantined に移動します**。

   {{< img src="pr_gates/setup/quarantine_branch_policy.png" alt="validate-test-optimization ブランチのアクティブの不安定なテストに対して構成された Quarantine ポリシー" style="width:100%" >}}

10. {{< ui >}}Save{{< /ui >}} をクリックします。
11. [New Flaky Test PR Gate][11] を作成し、検証対象のリポジトリにスコープを設定します。

   {{< img src="pr_gates/setup/pr_gate_scope.png" alt="新しい Flaky PR ゲートのスコープ" style="width:100%" >}}

### ステップ 2: Prevention {#step-2-prevention}

[Early Flake Detection][1] は、新しい不安定なテストを検出します。[New Flaky Test PR Gates][2] は、それらがデフォルトブランチに到達するのをブロックします。

1. 最初の試行で失敗し、再試行で成功するテストを追加します (必要に応じて、以下に提供されているコードを使用してください)。Datadog で識別できるように、テスト名には `flaky` と `validation` の両方を含める必要があります。

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

2. テストをコミットしてプッシュし、検証ブランチからプルリクエストを開きます。

   ```bash
   git add -A
   git commit -m "Validate Test Optimization prevention"
   git push origin validate-test-optimization
   ```

3. CI が実行されるのを待ちます。Early Flake Detection が新しいテストを再試行し、New Flaky Test PR Gate がその結果を評価します。プルリクエストの GitHub チェックで、New Flaky Test PR Gate が失敗することを確認します。

   {{< img src="pr_gates/setup/failed_pr_gate.png" alt="新しい不安定なテストが検出されるために失敗する GitHub プルリクエストチェック" style="width:100%" >}}

4. 失敗する GitHub チェックをクリックし、そのテストが新しい不安定なテストのリストに含まれていることを確認します。

   {{< img src="pr_gates/setup/pr_gate_detail.png" alt="Datadog PR ゲート詳細ビュー" style="width:100%" >}}

5. [Test Runs][7] で、Early Flake Detection がテストを再試行し、以下のフィルターを使用する [このクエリ][7] によって、それが新しい不安定なテストとして検出されたことを確認します。

   - `@test.name:*flaky*validation*`
   - `@git.branch:validate-test-optimization`
   - `@test.retry_reason:early_flake_detection`
   - `@test.test_management.is_new_flaky:true`

### ステップ 3: Mitigation {#step-3-mitigation}

Mitigation は、[Auto Test Retries][4]、[Flaky Test Management][5]、および [Flaky Test Policies][6] を通じて実現されます。これらの機能は、不安定なテストを再試行し、既知の不安的な障害を隔離することで、CI をブロックしないようにします。

1. 追加した [Prevention](#step-2-prevention) と同じテストで、マーカーのファイル名を `dd-validation-flaky` から `dd-validation-flaky-mitigation` に変更します。テスト関数やテストケースの名前は変更しないでください。新しいマーカーにより、意図的に初回試行で再度失敗が発生します。テスト名を変更しないことで、Datadog は実行結果を [Prevention](#step-2-prevention) 中に検出された不安定なテストと関連付けることができます。Datadog の追加構成不要です。Auto Test Retries と Flaky Test Management がこの実行中のテストを処理します。希望の言語に合わせてテストを更新します。。

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

2. 同じブランチで変更をコミットしてプッシュします。

   ```bash
   git add -A
   git commit -m "Validate Test Optimization mitigation"
   git push origin validate-test-optimization
   ```

3. CI の実行を待ち、以下の結果を確認します。

   - [Test Runs][8] において、Auto Test Retries が最初の失敗後にテストを再実行し、再試行でテストが成功します。以下のフィルターを使用して [このクエリ][8] を実行します。
     - `@test.name:*flaky*validation*`
     - `@git.branch:validate-test-optimization`
     - `@test.retry_reason:auto_test_retry`
   - [Flaky Test Management][9] において、テストが {{< ui >}}QUARANTINED{{< /ui >}} として表示されます。その失敗は、テストジョブをブロックしなくなります。以下のフィルターを使用して [このクエリ][9] を実行します。
     - `@test.name:*flaky*validation*`
     - `first_flaked_branch:validate-test-optimization`
     - `flaky_test_state:quarantined`

### ステップ 4: Remediation {#step-4-remediation}

Test Optimization は、Attempt to Fix および [Bits AI を活用した不安定なテストの修正][16] を通じて、不安定なテストの修復をサポートします。このセクションでは、[Prevention](#step-2-prevention) および [Mitigation](#step-3-mitigation) で使用されたものと同じテストを修正することで、Attempt to Fix ワークフローを検証します。

1. [Flaky Test Management][9] で、隔離された検証テストを開きます。
2. {{< ui >}}Actions{{< /ui >}} をクリックし、{{< ui >}}Link commit to fix{{< /ui >}} を選択して、生成されたキー (`DD_` で始まる) をコピーします。

   {{< img src="pr_gates/setup/attempt_to_fix_modal.png" alt="Attempt to Fix モーダル" style="width:50%" >}}

3. 不安定なテストを、希望の言語の合格バージョンに置き換えてください。

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

4. コミット本文に生成されたキーを含めて修正をコミットします。`<YOUR_DD_KEY>` をコピーしたキーに置き換えます。

   ```bash
   git add -A
   git commit -m "Fix flaky validation test" -m "<YOUR_DD_KEY>"
   git push origin validate-test-optimization
   ```

5. CI が完了するのを待ち、以下の結果を確認します。

   - [Test Runs][10] において、Attempt to Fix が修正候補を再試行し、すべての試行が合格したことを確認します。以下のフィルターを持つ [このクエリ][10] を使用します。
     - `@test.name:*flaky*validation*`
     - `@git.branch:validate-test-optimization`
     - `@test.test_management.is_attempt_to_fix:true`
   - [Flaky Test Management][14] において、そのテストは {{< ui >}}Fix in progress{{< /ui >}} とマークされます。以下のフィルターを持つ [このクエリ][14] を使用します。
     - `@test.name:*flaky*validation*`
     - `first_flaked_branch:validate-test-optimization`
     - `fix_in_progress:true`

### ステップ 5: 検証後のクリーンアップ {#step-5-post-validation-cleanup}

1. プルリクエストをマージせずにクローズします。
2. `validate-test-optimization` ブランチを削除します。ブランチが削除されると、そのブランチ固有の Quarantine 自動ルールは適用されなくなり、専用の検証サービスはテスト実行を受け取らなくなります。
3. [New Flaky Test PR Gate][2] がリポジトリ全体に対して有効なままであることを、リポジトリを所有するチームに通知します。このゲートはデフォルトでは非ブロッキングです。
4. オプションとして、リポジトリレベルで `validate-test-optimization` サービス用に構成された Test Optimization 機能を有効にします。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tests/flaky_tests/early_flake_detection
[2]: /ja/tests/guides/setup_new_flaky_pr_gate
[3]: https://app.datadoghq.com/ci/settings/ci-cd/repositories?tab=repository
[4]: /ja/tests/flaky_tests/auto_test_retries
[5]: /ja/tests/flaky_management
[6]: /ja/tests/flaky_management/#configure-policies-to-automate-the-flaky-test-lifecycle
[7]: https://app.datadoghq.com/ci/test/runs?query=test_level%3Atest%20%40test.name%3A%2Aflaky%2Avalidation%2A%20%40git.branch%3Avalidate-test-optimization%20%40test.retry_reason%3Aearly_flake_detection%20%40test.test_management.is_new_flaky%3Atrue
[8]: https://app.datadoghq.com/ci/test/runs?query=test_level%3Atest%20%40test.name%3A%2Aflaky%2Avalidation%2A%20%40git.branch%3Avalidate-test-optimization%20%40test.retry_reason%3Aauto_test_retry
[9]: https://app.datadoghq.com/ci/test/flaky/explorer?query=%40test.name%3A%2Aflaky%2Avalidation%2A%20first_flaked_branch%3Avalidate-test-optimization%20flaky_test_state%3Aquarantined
[10]: https://app.datadoghq.com/ci/test/runs?query=test_level%3Atest%20%40test.name%3A%2Aflaky%2Avalidation%2A%20%40git.branch%3Avalidate-test-optimization%20%40test.test_management.is_attempt_to_fix%3Atrue
[11]: https://app.datadoghq.com/ci/pr-gates/rule/create?dataSource=test_optimization
[12]: /ja/tests/
[13]: /ja/tests/test_impact_analysis/
[14]: https://app.datadoghq.com/ci/test/flaky/explorer?query=%40test.name%3A%2Aflaky%2Avalidation%2A%20first_flaked_branch%3Avalidate-test-optimization%20fix_in_progress%3Atrue
[16]: /ja/tests/flaky_management/#bits-ai-powered-flaky-test-fixes