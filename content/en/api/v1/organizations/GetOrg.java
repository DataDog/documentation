import com.datadog.api.v1.client.api.OrganizationsApi;

public class OrganizationsApiExample {

    public static void main(String[] args) {
        OrganizationsApi apiInstance = new OrganizationsApi();
        String publicId = abc123; // String | The public_id of the org you are operating within.
        try {
            OrganizationResponse result = apiInstance.getOrg(publicId);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling OrganizationsApi#getOrg");
            e.printStackTrace();
        }
    }
}