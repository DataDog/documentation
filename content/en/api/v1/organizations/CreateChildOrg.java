import com.datadog.api.v1.client.api.OrganizationsApi;

public class OrganizationsApiExample {

    public static void main(String[] args) {
        OrganizationsApi apiInstance = new OrganizationsApi();
        OrganizationCreateBody body = ; // OrganizationCreateBody | 
        try {
            OrganizationCreateResponse result = apiInstance.createChildOrg(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling OrganizationsApi#createChildOrg");
            e.printStackTrace();
        }
    }
}