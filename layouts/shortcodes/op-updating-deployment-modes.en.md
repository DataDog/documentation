
After deploying a pipeline, you can also switch deployment methods, such as going from a manually managed pipeline to a remote configuration enabled pipeline or vice versa. 

If you want to switch from a remote configuration deployment to a manually managed deployment:
1. Navigate to Observability Pipelines and select the pipeline.
2. Click the settings cog.
3. In **Deployment Mode**, select **manual** to enable it.
4. Set the `DD_OP_REMOTE_CONFIGURATION_ENABLED` flag to `false` and restart the Worker. Workers that are not restarted with this flag continue to be remote configuration enabled, which means that the Workers are not updated manually through a local configuration file.

If you want to switch from manually managed deployment to a remote configuration deployment:
1. Navigate to Observability Pipelines and select the pipeline.
2. Click the settings cog.
3. In **Deployment Mode**, select **Remote Configuration** to enable it.
4. Set the `DD_OP_REMOTE_CONFIGURATION_ENABLED` flag to `true` and restart the Worker. Workers that are not restarted with this flag are not polled for configurations deployed in the UI. 
6. Deploy a version in your version history, so that the Workers receive the new version configuration. Click on a version. Click **Edit as Draft** and then click **Deploy**. 