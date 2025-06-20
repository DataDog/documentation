
1. ドロップダウンから、パイプラインで想定されるログの量を選択します。
1. Worker のインストールに使用する AWS リージョンを選択します。
1. **Select API key** をクリックして、使用する Datadog API キーを選択します。
1. **Launch CloudFormation Template** をクリックして AWS コンソールに移動し、スタックの構成を確認してから起動します。CloudFormation パラメーターが想定通りに設定されていることを確認してください。
1. Worker のインストールに使用する VPC とサブネットを選択します。
1. IAM の必要な権限のチェックボックスを見直して確認します。**Submit** をクリックしてスタックを作成します。ここでは、CloudFormation がインストールを処理し、Worker インスタンスが起動され、必要なソフトウェアがダウンロードされ、Worker が自動的に開始します。
1. 以前の CloudFormation スタックとそれに関連するリソースを削除します。
1. **Navigate Back** をクリックして、Observability Pipelines のパイプライン編集ページに戻ります。
1. **Deploy Changes** をクリックします。