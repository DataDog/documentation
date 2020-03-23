import com.datadog.api.v1.client.api.OrgsApi;

public class OrgsApiExample {

    public static void main(String[] args) {
        OrgsApi apiInstance = new OrgsApi();
        String publicId = abc123; // String | The public_id of the org you are operating with
        Org body = ; // Org | 
        try {
            OrgResponse result = apiInstance.updateOrg(publicId, body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling OrgsApi#updateOrg");
            e.printStackTrace();
        }
    }
}