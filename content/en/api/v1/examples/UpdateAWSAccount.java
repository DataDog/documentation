import com.datadog.api.v1.client.api.AWSIntegrationApi;

public class AWSIntegrationApiExample {

    public static void main(String[] args) {
        AWSIntegrationApi apiInstance = new AWSIntegrationApi();
        AWSAccount body = ; // AWSAccount | 
        String accountId = accountId_example; // String | Only return AWS accounts that matches this account_id.
        String roleName = roleName_example; // String | Only return AWS accounts that matches this role_name. *It is required if account_id is specified.*
        String accessKeyId = accessKeyId_example; // String | Only return AWS accounts that matches this access_key_id.
*It is required if none of the other two options are specified.*
        try {
            Object result = apiInstance.updateAWSAccount(body, accountId, roleName, accessKeyId);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling AWSIntegrationApi#updateAWSAccount");
            e.printStackTrace();
        }
    }
}