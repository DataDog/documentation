---
dependencies: []
disable_edit: true
---
# azure_virtual_machine_instance

## `availability_set`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.availabilitySet`<br>
**説明**: 仮想マシンを割り当てるべきアベイラビリティセットに関する情報を指定します。同じアベイラビリティセットに指定された仮想マシンは、異なるノードに割り当てられて、アベイラビリティを最大化します。アベイラビリティセットの詳細については、[仮想マシンのアベイラビリティを管理する](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-windows-manage-availability?toc=%2fazure%2fvirtual-machines%2fwindows%2ftoc.json)を参照してください。 <br><br> Azure の計画的メンテナンスについては、[Azure の仮想マシンの計画的メンテナンス](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-windows-planned-maintenance?toc=%2fazure%2fvirtual-machines%2fwindows%2ftoc.json)をご参照ください。 <br><br> 現在、VM は作成時にのみアベイラビリティセットに追加することができます。VM を追加するアベイラビリティセットは、アベイラビリティセットのリソースと同じリソースグループ下にある必要があります。既存の VM をアベイラビリティセットに追加することはできません。 <br><br>このプロパティは、非 NULL の properties.virtualMachineScaleSet 参照と一緒に存在することはできません。<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `id`<br>
    **説明**: リソース ID<br>
## `diagnostics_profile`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.diagnosticsProfile`<br>
**説明**: ブート診断の設定状態を指定します。 <br><br>最小 api バージョン: 2015-06-15<br>
   - `boot_diagnostics`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `bootDiagnostics`<br>
    **説明**: Boot Diagnostics は、コンソール出力やスクリーンショットを表示して VM のステータスを診断できるデバッグ機能です。 <br><br> コンソールログの出力を簡単に確認することができます。 <br><br> Azure では、ハイパーバイザーから VM のスクリーンショットを確認することも可能です。<br>
       - `enabled`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `enabled`<br>
        **説明**: 仮想マシンでブート診断を有効にするかどうか。<br>
       - `storage_uri`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `storageUri`<br>
        **説明**: コンソール出力とスクリーンショットを配置するために使用するストレージアカウントの Uri。 <br><br>ブート診断を有効にする際に storageUri が指定されない場合、マネージドストレージが使用されます。<br>
## `hardware_profile`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.hardwareProfile`<br>
**説明**: 仮想マシンのハードウェア設定を指定します。<br>
   - `vm_size`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `vmSize`<br>
    **説明**: 仮想マシンのサイズを指定します。 <br><br> enum データタイプは現在非推奨であり、2023 年 12 月 23 日までに削除される予定です。 <br><br> 利用可能なサイズのリストを取得するには、これらの API を使用することをお勧めします: <br><br> [アベイラビリティセットで利用可能なすべての仮想マシンサイズをリストアップします](https://docs.microsoft.com/rest/api/compute/availabilitysets/listavailablesizes) <br><br> [リージョン内で利用可能なすべての仮想マシンサイズをリストアップします]( https://docs.microsoft.com/en-us/rest/api/compute/resourceskus/list) <br><br> [リサイズに使用できるすべての仮想マシンサイズをリストアップします](https://docs.microsoft.com/rest/api/compute/virtualmachines/listavailablesizes)。仮想マシンのサイズについては、[仮想マシンのサイズ](https://docs.microsoft.com/en-us/azure/virtual-machines/sizes)を参照してください。 <br><br> 利用可能な VM サイズは、リージョンとアベイラビリティセットによって異なります。<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `id`<br>
**説明**: リソース ID<br>
## `identity`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `identity`<br>
**説明**: 構成されている場合は、仮想マシンのアイデンティティ。<br>
   - `principal_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `principalId`<br>
    **説明**: 仮想マシンアイデンティティのプリンシパル ID。このプロパティは、システムに割り当てられたアイデンティティに対してのみ提供されます。<br>
   - `tenant_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `tenantId`<br>
    **説明**: 仮想マシンに関連付けられたテナント ID。このプロパティは、システムに割り当てられたアイデンティティに対してのみ提供されます。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: 仮想マシンに使用されるアイデンティティのタイプ。'SystemAssigned, UserAssigned' タイプには、暗黙のうちに作成されたアイデンティティと、ユーザーに割り当てられたアイデンティティのセットの両方が含まれます。'None' タイプは、仮想マシンからすべてのアイデンティティを削除します。<br>
## `license_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.licenseType`<br>
**説明**: 使用するイメージまたはディスクがオンプレミスでライセンスされたものであることを指定します。 <br><br> Windows Server オペレーティングシステムで可能な値は、以下のとおりです。 <br><br> Windows_Client <br><br> Windows_Server <br><br> Linux Server オペレーティングシステムで可能な値は、以下のとおりです。 <br><br> RHEL_BYOS (RHEL 用) <br><br> SLES_BYOS (SUSE 用) <br><br> 詳しくは、こちらをご覧ください: [Windows サーバーにおける Azure ハイブリッド利用メリット](https://docs.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing) <br><br> [Linux サーバーにおける Azure ハイブリッド利用メリット](https://docs.microsoft.com/azure/virtual-machines/linux/azure-hybrid-benefit-linux) <br><br> 最小 api バージョン: 2015-06-15<br>
## `location`
**タイプ**: `STRING`<br>
**プロバイダー名**: `location`<br>
**説明**: リソースロケーション<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `name`<br>
**説明**: リソース名<br>
## `network_profile`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.networkProfile`<br>
**説明**: 仮想マシンのネットワークインターフェイスを指定します。<br>
   - `network_interfaces`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `networkInterfaces`<br>
    **説明**: 仮想マシンに関連するネットワークインターフェイスのリソース ID のリストを指定します。<br>
       - `primary`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `properties.primary`<br>
        **説明**: 仮想マシンに複数のネットワークインターフェイスがある場合に、プライマリネットワークインターフェイスを指定します。<br>
## `os_profile`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.osProfile`<br>
**説明**: 仮想マシンの作成時に使用されるオペレーティングシステムの設定を指定します。一部の設定は、仮想マシンがプロビジョニングされると変更できなくなります。<br>
   - `admin_username`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `adminUsername`<br>
    **説明**: 管理者アカウントの名前を指定します。 <br><br> このプロパティは、VM の作成後に更新することはできません。 <br><br> **Windows のみの制限:** "." で終わることはできません。 <br><br> **禁止される値:** "administrator"、"admin"、"user"、"user1"、"test"、"user2"、"test1"、"user3"、"admin1"、"1"、"123"、"a"、"actuser"、"adm"、"admin2"、"aspnet"、"backup"、"console"、"david"、"guest"、"john"、"owner"、"root"、"server"、"sql"、"support"、"support_388945a0"、"sys"、"test2"、"test3"、"user4"、"user5" <br><br> **最小長 (Linux):** 1  文字 <br><br> **最大長 (Linux):** 64 文字 <br><br> **最大長 (Windows):** 20 文字  <br><br><li> Linux VM の root 権限については、[Azure で Linux 仮想マシンの root 権限を使う](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-linux-use-root-privileges?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json)を参照してください。<br><li> このフィールドに使用すべきでない Linux 上の組み込みシステムユーザーのリストについては、[Azure 上の Linux のユーザー名を選択する](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-linux-usernames?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json)を参照してください。<br>
   - `allow_extension_operations`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `allowExtensionOperations`<br>
    **説明**: 仮想マシンで拡張操作を許可するかどうかを指定します。 <br><br>これは、仮想マシンに拡張機能が存在しない場合にのみ、False に設定することができます。<br>
   - `computer_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `computerName`<br>
    **説明**: 仮想マシンのホスト OS 名を指定します。 <br><br> この名前は、VM の作成後に更新することはできません。 <br><br> **最大長 (Windows):** 15 文字 <br><br> **最大長 (Linux):** 64 文字 <br><br> 命名規則や制限事項については、[Azure インフラストラクチャーサービス実装ガイドライン](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-linux-infrastructure-subscription-accounts-guidelines?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json#1-naming-conventions)を参照してください。<br>
   - `linux_configuration`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `linuxConfiguration`<br>
    **説明**: 仮想マシンの Linux オペレーティングシステムの設定を指定します。 <br><br>対応する Linux ディストリビューションの一覧は、[Linux on Azure-Endorsed Distributions](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-linux-endorsed-distros?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json)を参照してください。 <br><br> 非エンドース型ディストリビューションの実行については、[非エンドース型ディストリビューションに関する情報](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-linux-create-upload-generic?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json)を参照してください。<br>
       - `disable_password_authentication`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `disablePasswordAuthentication`<br>
        **説明**: パスワード認証を無効にするかどうかを指定します。<br>
       - `patch_settings`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `patchSettings`<br>
        **説明**: [プレビュー機能] Linux の VM Guest Patching に関する設定を指定します。<br>
           - `patch_mode`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `patchMode`<br>
            **説明**: IaaS 仮想マシンに対する VM Guest Patching のモードを指定します。<br /><br /> 可能な値は以下の通りです。<br /><br /> **ImageDefault** - 仮想マシンのデフォルトのパッチ構成が使用されます。 <br /><br /> **AutomaticByPlatform** - 仮想マシンは、プラットフォームによって自動的に更新されます。provisionVMAgent というプロパティは true でなければなりません<br>
       - `provision_vm_agent`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `provisionVMAgent`<br>
        **説明**: 仮想マシン Agent を仮想マシン上にプロビジョニングするかどうかを示します。 <br><br> リクエスト本文にこのプロパティが指定されていない場合、デフォルトの動作は true に設定されます。 これにより、VM Agent が VM にインストールされ、後で拡張機能を VM に追加することができるようになります。<br>
       - `ssh`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `ssh`<br>
        **説明**: Linux OS の ssh キーの構成を指定します。<br>
           - `public_keys`<br>
            **タイプ**: `UNORDERED_LIST_STRUCT`<br>
            **プロバイダー名**: `publicKeys`<br>
            **説明**: Linux ベースの VM との認証に使用される SSH 公開キーのリスト。<br>
               - `key_data`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `keyData`<br>
                **説明**: ssh で VM と認証するために使用する SSH 公開キー証明書。キーは少なくとも 2048 ビットで、ssh-rsa 形式である必要があります。 <br><br> ssh キーの作成については、[Azure の Linux VM のために Linux と Mac で SSH キーを作成する](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/mac-create-ssh-keys?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json)を参照してください。<br>
               - `path`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `path`<br>
                **説明**: 作成された VM 上で、ssh 公開キーが保存されているフルパスを指定します。ファイルが既に存在する場合は、指定されたキーがファイルに追加されます。例: /home/user/.ssh/authorized_keys<br>
   - `require_guest_provision_signal`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `requireGuestProvisionSignal`<br>
    **説明**: 仮想マシンのプロビジョニングの成功を推測するために、ゲストのプロビジョニングシグナルが必要であるかを指定します。 **注: このプロパティは非公開テスト用であり、すべての顧客はこのプロパティを false に設定してはなりません。**<br>
   - `secrets`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `secrets`<br>
    **説明**: 仮想マシンにインストールする証明書のセットを指定します。<br>
       - `source_vault`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `sourceVault`<br>
        **説明**: VaultCertificates のすべての証明書を含む Key Vault の相対 URL。<br>
           - `id`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `id`<br>
            **説明**: リソース ID<br>
       - `vault_certificates`<br>
        **タイプ**: `UNORDERED_LIST_STRUCT`<br>
        **プロバイダー名**: `vaultCertificates`<br>
        **説明**: 証明書を含む SourceVault の Key Vault 参照のリスト。<br>
           - `certificate_store`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `certificateStore`<br>
            **説明**: Windows VM の場合、証明書を追加する仮想マシンの証明書ストアを指定します。指定した証明書ストアは、暗黙のうちに LocalMachine アカウント内に存在します。 <br><br>Linux VM の場合、証明書ファイルは /var/lib/waagent ディレクトリの下に置かれ、ファイル名は X509 証明書ファイルが&lt;UppercaseThumbprint&gt;.crt、秘密キーが &lt;UppercaseThumbprint&gt;.prv です。いずれも .pem 形式のファイルです。<br>
           - `certificate_url`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `certificateUrl`<br>
            **説明**: Key Vault にシークレットとしてアップロードされている証明書の URL です。Key Vault へのシークレットの追加については、[Key Vault にキーやシークレットを追加する。](https://docs.microsoft.com/azure/key-vault/key-vault-get-started/#add)を参照してください。この場合、証明書は UTF-8 でエンコードされた以下の JSON Object の Base64 エンコーディングです。 <br><br> {<br>  "data":"<Base64-encoded-certificate>",<br>  "dataType":"pfx",<br>  "password":"<pfx-file-password>"<br>}<br>
   - `windows_configuration`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `windowsConfiguration`<br>
    **説明**: 仮想マシンの Windows オペレーティングシステムの設定を指定します。<br>
       - `additional_unattend_content`<br>
        **タイプ**: `UNORDERED_LIST_STRUCT`<br>
        **プロバイダー名**: `additionalUnattendContent`<br>
        **説明**: Windows Setup で使用される Unattend.xml ファイルに含めることができる、Base-64 エンコードされた XML 形式の追加情報を指定します。<br>
           - `component_name`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `componentName`<br>
            **説明**: コンポーネント名。現在、許可される値は Microsoft-Windows-Shell-Setup のみです。<br>
           - `content`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `content`<br>
            **説明**: 指定されたパスとコンポーネントの unattend.xml ファイルに追加される XML 形式のコンテンツを指定します。XML は 4KB 未満で、挿入される設定または機能のルート要素を含む必要があります。<br>
           - `pass_name`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `passName`<br>
            **説明**: パス名。現在、許容される値は OobeSystem のみです。<br>
           - `setting_name`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `settingName`<br>
            **説明**: コンテンツが適用される設定の名前を指定します。指定できる値は FirstLogonCommands および AutoLogon です。<br>
       - `enable_automatic_updates`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `enableAutomaticUpdates`<br>
        **説明**: Windows 仮想マシンで自動更新が有効かどうかを示します。デフォルト値は true です。 <br><br> 仮想マシンのスケールセットでは、このプロパティを更新することができ、更新は OS の再ビジョニング時に有効になります。<br>
       - `patch_settings`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `patchSettings`<br>
        **説明**: [プレビュー機能] Windows の VM Guest Patching に関する設定を指定します。<br>
           - `enable_hotpatching`<br>
            **タイプ**: `BOOLEAN`<br>
            **プロバイダー名**: `enableHotpatching`<br>
            **説明**: 顧客が再起動を必要とせずに Azure VM にパッチを当てることを可能にします。enableHotpatching では、'provisionVMAgent' を true に設定し、'patchMode' を 'AutomaticByPlatform' に設定する必要があります。<br>
           - `patch_mode`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `patchMode`<br>
            **説明**: IaaS 仮想マシンに対する VM Guest Patching のモードを指定します。<br /><br /> 可能な値は以下の通りです。<br /><br /> **Manual** - 仮想マシンへのパッチの適用を制御します。この場合、VM の内部でパッチを手動で適用します。このモードでは、自動更新は無効です。プロパティ WindowsConfiguration.enableAutomaticUpdates は false である必要があります。<br /><br /> **AutomaticByOS** - 仮想マシンは OS によって自動的に更新されます。プロパティ WindowsConfiguration.enableAutomaticUpdates は true である必要があります。 <br /><br /> **AutomaticByPlatform** - 仮想マシンはプラットフォームによって自動的に更新されます。プロパティ provisionVMAgent および WindowsConfiguration.enableAutomaticUpdates は true でなければなりません。<br>
       - `provision_vm_agent`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `provisionVMAgent`<br>
        **説明**: 仮想マシン Agent を仮想マシン上にプロビジョニングするかどうかを示します。 <br><br> リクエスト本文にこのプロパティが指定されていない場合、デフォルトの動作は true に設定されます。 これにより、VM Agent が VM にインストールされ、後で拡張機能を VM に追加することができるようになります。<br>
       - `time_zone`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `timeZone`<br>
        **説明**: 仮想マシンのタイムゾーンを指定します (例: "太平洋標準時")。 <br><br> 可能な値は、[TimeZoneInfo.GetSystemTimeZones](https://docs.microsoft.com/en-us/dotnet/api/system.timezoneinfo.getsystemtimezones) で返されるタイムゾーンの [TimeZoneInfo.Id](https://docs.microsoft.com/en-us/dotnet/api/system.timezoneinfo.id?#System_TimeZoneInfo_Id) 値です。<br>
       - `win_rm`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `winRM`<br>
        **説明**: Windows リモート管理リスナーを指定します。これにより、リモートの Windows PowerShell が有効になります。<br>
           - `listeners`<br>
            **タイプ**: `UNORDERED_LIST_STRUCT`<br>
            **プロバイダー名**: `listeners`<br>
            **説明**: Windows リモート管理リスナーのリスト<br>
               - `certificate_url`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `certificateUrl`<br>
                **説明**: Key Vault にシークレットとしてアップロードされている証明書の URL です。Key Vault へのシークレットの追加については、[Key Vault にキーやシークレットを追加する。](https://docs.microsoft.com/azure/key-vault/key-vault-get-started/#add)を参照してください。この場合、証明書は UTF-8 でエンコードされた以下の JSON Object の Base64 エンコーディングです。 <br><br> {<br>  "data":"<Base64-encoded-certificate>",<br>  "dataType":"pfx",<br>  "password":"<pfx-file-password>"<br>}<br>
               - `protocol`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `protocol`<br>
                **説明**: WinRM リスナーのプロトコルを指定します。 <br><br> 可能な値は以下のとおりです。 <br>**http** <br><br> **https**<br>
## `plan`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `plan`<br>
**説明**: 仮想マシンの作成に使用されるマーケットプレイスイメージに関する情報を指定します。この要素は、マーケットプレイスイメージにのみ使用されます。API からマーケットプレイスイメージを使用する前に、そのイメージをプログラム的に使用できるようにする必要があります。 Azure ポータルで、使用するマーケットプレイス イメージを見つけ、**Want to deploy programmatically, Get Started ->** をクリックします。必要な情報を入力し、**Save** をクリックします。<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: プラン ID。<br>
   - `product`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `product`<br>
    **説明**: マーケットプレイスからイメージの製品を指定します。imageReference 要素の下にある Offer と同じ値です。<br>
   - `promotion_code`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `promotionCode`<br>
    **説明**: プロモーションコード。<br>
   - `publisher`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `publisher`<br>
    **説明**: パブリッシャー ID。<br>
## `priority`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.priority`<br>
**説明**: 仮想マシンの優先度を指定します。 最小 api バージョン: 2019-03-01<br>
## `provisioning_state`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.provisioningState`<br>
**説明**: プロビジョニング状態。レスポンスにのみ表示されます。<br>
## `resource_group`
**タイプ**: `STRING`<br>
## `resources`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `resources`<br>
**説明**: 仮想マシンの子拡張機能リソース。<br>
   - `auto_upgrade_minor_version`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `properties.autoUpgradeMinorVersion`<br>
    **説明**: デプロイ時に新しいマイナーバージョンが利用可能な場合、拡張機能を使用するかどうかを示します。ただし、デプロイ後は、このプロパティが true に設定されていても、再デプロイされない限り、拡張機能はマイナーバージョンをアップグレードすることはありません。<br>
   - `force_update_tag`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.forceUpdateTag`<br>
    **説明**: 拡張機能の構成が変わっていない場合でも、拡張機能ハンドラーを強制的に更新させる方法。<br>
   - `id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `id`<br>
    **説明**: リソース ID<br>
   - `location`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `location`<br>
    **説明**: リソースロケーション<br>
   - `name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `name`<br>
    **説明**: リソース名<br>
   - `provisioning_state`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.provisioningState`<br>
    **説明**: プロビジョニング状態。レスポンスにのみ表示されます。<br>
   - `publisher`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.publisher`<br>
    **説明**: 拡張機能ハンドラーパブリッシャーの名前。<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.type`<br>
    **説明**: 拡張機能の種類を指定します。例として、"CustomScriptExtension" が挙げられます。<br>
   - `type_handler_version`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `properties.typeHandlerVersion`<br>
    **説明**: スクリプトハンドラーのバージョンを指定します。<br>
## `storage_profile`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `properties.storageProfile`<br>
**説明**: 仮想マシンディスクのストレージ設定を指定します。<br>
   - `data_disks`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `dataDisks`<br>
    **説明**: 仮想マシンにデータディスクを追加する際に使用するパラメーターを指定します。 <br><br> ディスクについては、[Azure 仮想マシンのディスクと VHD について](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-windows-about-disks-vhds?toc=%2fazure%2fvirtual-machines%2fwindows%2ftoc.json)を参照してください。<br>
       - `caching`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `caching`<br>
        **説明**: キャッシングの要件を指定します。 <br><br> 可能な値は以下のとおりです。 <br><br> **None** <br><br> **ReadOnly** <br><br> **ReadWrite** <br><br> デフォルト: **標準ストレージ は None、プレミアムストレージは ReadOnly**<br>
       - `create_option`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `createOption`<br>
        **説明**: 仮想マシンの作成方法を指定します。<br><br> 可能な値は以下のとおりです。<br><br> **Attach** \u2013 この値は、仮想マシンの作成に専用ディスクを使用する場合に使用します。<br><br> **FromImage** \u2013 この値は、仮想マシンの作成にイメージを使用する場合に使用します。プラットフォームイメージを使用する場合は、前述の imageReference 要素も使用します。マーケットプレイスイメージを使用する場合は、前述の plan 要素も使用します。<br>
       - `detach_option`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `detachOption`<br>
        **説明**: 仮想マシンからディスクを切り離すときに使用する切り離し動作、またはすでに切り離し中のディスクを指定します。サポートされている値: **ForceDetach** <br><br> detachOption: **ForceDetach** は、管理されたデータディスクにのみ適用されます。仮想マシンの予期せぬ障害によりデータディスクの切り離しが完了せず、ディスクがまだ解放されていない場合、最後の手段として強制切り離しを使用し、仮想マシンからディスクを強制的に切り離します。この切り離し動作を使用する場合、すべての書き込みがフラッシュされない可能性があります。 <br><br> この機能はまだプレビューモードであり、VirtualMachineScaleSet ではサポートされていません。データディスクを強制的に切り離すには、toBeDetached を 'true' に更新し、detachOption: 'ForceDetach' を設定します。<br>
       - `disk_iops_read_write`<br>
        **タイプ**: `INT64`<br>
        **プロバイダー名**: `diskIOPSReadWrite`<br>
        **説明**: StorageAccountType が UltraSSD_LRS の場合の管理対象ディスクの Read-Write IOPS を指定します。VirtualMachine ScaleSet の VM ディスクに対してのみ返されます。VirtualMachine Scale Set の更新によってのみ更新可能です。<br>
       - `disk_mbps_read_write`<br>
        **タイプ**: `INT64`<br>
        **プロバイダー名**: `diskMBpsReadWrite`<br>
        **説明**: StorageAccountType が UltraSSD_LRS の場合の管理対象ディスクの帯域幅を MB/秒で指定します。VirtualMachine ScaleSet の VM ディスクに対してのみ返されます。VirtualMachine Scale Set の更新によってのみ更新可能です。<br>
       - `disk_size_gb`<br>
        **タイプ**: `INT64`<br>
        **プロバイダー名**: `diskSizeGB`<br>
        **説明**: 空のデータディスクのサイズをギガバイト単位で指定します。この要素は、仮想マシンイメージのディスクのサイズを上書きするために使用できます。 <br><br> この値は、1023 GB より大きくすることはできません<br>
       - `lun`<br>
        **タイプ**: `INT64`<br>
        **プロバイダー名**: `lun`<br>
        **説明**: データディスクの論理ユニット番号を指定します。この値は VM 内のデータディスクを識別するために使用されるため、VM にアタッチされた各データディスクで一意である必要があります。<br>
       - `managed_disk`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `managedDisk`<br>
        **説明**: 管理対象ディスクのパラメーター。<br>
           - `id`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `id`<br>
            **説明**: リソース ID<br>
           - `storage_account_type`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `storageAccountType`<br>
            **説明**: 管理対象ディスクのストレージアカウントの種類を指定します。管理対象 OS ディスクのストレージアカウントタイプは、スケールセットを作成するときにのみ設定できます。注: UltraSSD_LRS はデータディスクでのみ使用でき、OS ディスクでは使用できません。<br>
       - `name`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `name`<br>
        **説明**: ディスク名。<br>
       - `to_be_detached`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `toBeDetached`<br>
        **説明**: データディスクが VirtualMachine/VirtualMachineScaleset から切り離し中であるかどうかを指定します<br>
       - `write_accelerator_enabled`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `writeAcceleratorEnabled`<br>
        **説明**: ディスク上で writeAccelerator を有効または無効にするかどうかを指定します。<br>
   - `image_reference`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `imageReference`<br>
    **説明**: 使用するイメージの情報を指定します。プラットフォームイメージ、マーケットプレイスイメージ、または仮想マシンイメージの情報を指定できます。この要素は、プラットフォームイメージ、マーケットプレイスイメージ、または仮想マシンイメージを使用する場合に必要ですが、他の作成操作では使用されません。<br>
       - `exact_version`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `exactVersion`<br>
        **説明**: 仮想マシンの作成に使用するプラットフォームイメージまたはマーケットプレイスイメージのバージョンを 10 進数で指定します。この読み取り専用フィールドは、'version' フィールドで指定された値が 'latest' である場合のみ、'version' とは異なります。<br>
       - `id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `id`<br>
        **説明**: リソース ID<br>
       - `offer`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `offer`<br>
        **説明**: 仮想マシンの作成に使用するプラットフォームイメージまたはマーケットプレイスイメージのオファーを指定します。<br>
       - `publisher`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `publisher`<br>
        **説明**: イメージパブリッシャー。<br>
       - `sku`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `sku`<br>
        **説明**: イメージ SKU。<br>
       - `version`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `version`<br>
        **説明**: 仮想マシンの作成に使用するプラットフォームイメージまたはマーケットプレイスイメージのバージョンを指定します。指定できる形式は、Major.Minor.Build または 'latest' です。Major、Minor、Build は 10 進数です。デプロイ時に利用可能なイメージの最新バージョンを使用する場合は、'latest' を指定します。'latest' を指定しても、デプロイ後に新しいバージョンが利用可能になっても、VM イメージは自動的に更新されません。<br>
   - `os_disk`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `osDisk`<br>
    **説明**: 仮想マシンが使用するオペレーティングシステムディスクに関する情報を指定します。 <br><br> ディスクについては、[Azure 仮想マシンのディスクと VHD について](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-windows-about-disks-vhds?toc=%2fazure%2fvirtual-machines%2fwindows%2ftoc.json)を参照してください。<br>
       - `caching`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `caching`<br>
        **説明**: キャッシングの要件を指定します。 <br><br> 可能な値は以下のとおりです。 <br><br> **None** <br><br> **ReadOnly** <br><br> **ReadWrite** <br><br> デフォルト: 標準ストレージ は **None**、プレミアムストレージは **ReadOnly**<br>
       - `create_option`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `createOption`<br>
        **説明**: 仮想マシンの作成方法を指定します。<br><br> 可能な値は以下のとおりです。<br><br> **Attach** \u2013 この値は、仮想マシンの作成に専用ディスクを使用する場合に使用します。<br><br> **FromImage** \u2013 この値は、仮想マシンの作成にイメージを使用する場合に使用します。プラットフォームイメージを使用する場合は、前述の imageReference 要素も使用します。マーケットプレイスイメージを使用する場合は、前述の plan 要素も使用します。<br>
       - `diff_disk_settings`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `diffDiskSettings`<br>
        **説明**: 仮想マシンが使用するオペレーティングシステムディスクのエフェメラル Disk Settings を指定します。<br>
           - `option`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `option`<br>
            **説明**: オペレーティングシステムディスクのエフェメラルディスク設定を指定します。<br>
           - `placement`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `placement`<br>
            **説明**: オペレーティングシステムディスクのエフェメラルディスク配置を指定します。<br><br> 可能な値は以下のとおりです。 <br><br> **CacheDisk** <br><br> **ResourceDisk** <br><br> デフォルト: VM サイズに構成されている場合は **CacheDisk**、それ以外は **ResourceDisk** が使用されます。<br><br> どの VM サイズがキャッシュディスクを公開するかは、Windows VM のドキュメント (https://docs.microsoft.com/en-us/azure/virtual-machines/windows/sizes) および Linux VM のドキュメント (https://docs.microsoft.com/en-us/azure/virtual-machines/linux/sizes) を参照してください。<br>
       - `disk_size_gb`<br>
        **タイプ**: `INT64`<br>
        **プロバイダー名**: `diskSizeGB`<br>
        **説明**: 空のデータディスクのサイズをギガバイト単位で指定します。この要素は、仮想マシンイメージのディスクのサイズを上書きするために使用できます。 <br><br> この値は、1023 GB より大きくすることはできません<br>
       - `managed_disk`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `managedDisk`<br>
        **説明**: 管理対象ディスクのパラメーター。<br>
           - `id`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `id`<br>
            **説明**: リソース ID<br>
           - `storage_account_type`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `storageAccountType`<br>
            **説明**: 管理対象ディスクのストレージアカウントの種類を指定します。管理対象 OS ディスクのストレージアカウントタイプは、スケールセットを作成するときにのみ設定できます。注: UltraSSD_LRS はデータディスクでのみ使用でき、OS ディスクでは使用できません。<br>
       - `name`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `name`<br>
        **説明**: ディスク名。<br>
       - `os_type`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `osType`<br>
        **説明**: このプロパティでは、ユーザーイメージや専用 VHD から VM を作成する場合に、ディスクに含まれる OS の種類を指定することができます。 <br><br> 可能な値は以下のとおりです。 <br><br> **Windows** <br><br> **Linux**<br>
       - `vhd`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `vhd`<br>
        **説明**: 仮想ハードディスク。<br>
           - `uri`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `uri`<br>
            **説明**: 仮想ハードディスクの uri を指定します。<br>
       - `write_accelerator_enabled`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `writeAcceleratorEnabled`<br>
        **説明**: ディスク上で writeAccelerator を有効または無効にするかどうかを指定します。<br>
## `subscription_id`
**タイプ**: `STRING`<br>
## `subscription_name`
**タイプ**: `STRING`<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `type`<br>
**説明**: リソースタイプ<br>
## `vm_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `properties.vmId`<br>
**説明**: VM ユニーク ID を指定します。この ID は 128 ビットの識別子で、すべての Azure IaaS VM の SMBIOS にエンコードされて格納され、プラットフォーム BIOS コマンドを使用して読み取ることができます。<br>
## `zones`
**タイプ**: `UNORDERED_LIST_STRING`<br>
**プロバイダー名**: `zones`<br>
**説明**: 仮想マシンゾーン。<br>