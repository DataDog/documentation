import com.datadog.api.v2.client.api.AWSIntegrationApi;

public class AWSIntegrationApiExample {

    public static void main(String[] args) {
        AWSIntegrationApi apiInstance = new AWSIntegrationApi();
        String accountId = accountId_example; // String | Only return AWS accounts that matches this account_id.
        String roleName = roleName_example; // String | Only return AWS accounts that matches this role_name.
        String accessKeyId = accessKeyId_example; // String | Only return AWS accounts that matches this access_key_id.
        try {
            AWSAccountListResponse result = apiInstance.getAllAWSAccounts(accountId, roleName, accessKeyId);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling AWSIntegrationApi#getAllAWSAccounts");
            e.printStackTrace();
        }
    }
}