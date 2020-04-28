import com.datadog.api.v1.client.api.OrganizationsApi;

public class OrganizationsApiExample {

    public static void main(String[] args) {
        OrganizationsApi apiInstance = new OrganizationsApi();
        try {
            OrganizationListResponse result = apiInstance.listOrgs();
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling OrganizationsApi#listOrgs");
            e.printStackTrace();
        }
    }
}